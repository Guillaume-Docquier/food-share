import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App Component', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  describe('initial render', () => {
    it('renders title and initial status', () => {
      render(<App />)
      expect(screen.getByText('Tic Tac Toe')).toBeInTheDocument()
      expect(screen.getByRole('status')).toHaveTextContent('X to play')
      expect(screen.getByText('Restart')).toBeInTheDocument()
      expect(screen.getByText(/Mode:/)).toBeInTheDocument()
      expect(screen.getByText(/Board: 3x3/)).toBeInTheDocument()
    })

    it('renders 9 empty cells for 3x3 board', () => {
      render(<App />)
      // Board renders before control buttons; first 9 buttons are cells
      const cellButtons = screen.getAllByRole('button').slice(0, 9)
      expect(cellButtons).toHaveLength(9)
      cellButtons.forEach(b => expect(b.textContent).toBe(''))
    })

    it('starts in AI mode (O plays AI)', () => {
      render(<App />)
      expect(screen.getByText(/vs Computer \(O\)/)).toBeInTheDocument()
    })
  })

  describe('2-player gameplay', () => {
    it('X moves first and status flips to O', async () => {
      const user = userEvent.setup()
      render(<App />)
      // toggle to 2 players
      await user.click(screen.getByText(/Mode:/))
      const cells = screen.getAllByRole('button').slice(0, 9)
      await user.click(cells[0])
      expect(cells[0]).toHaveTextContent('X')
      expect(screen.getByRole('status')).toHaveTextContent('O to play')
    })

    it('alternates turns X -> O -> X', async () => {
      const user = userEvent.setup()
      render(<App />)
      await user.click(screen.getByText(/Mode:/))
      const cells = screen.getAllByRole('button').slice(0, 9)
      await user.click(cells[0]) // X
      await user.click(cells[1]) // O
      await user.click(cells[2]) // X
      expect(cells[0]).toHaveTextContent('X')
      expect(cells[1]).toHaveTextContent('O')
      expect(cells[2]).toHaveTextContent('X')
    })

    it('prevents marking occupied cell and shows transient message', async () => {
      const user = userEvent.setup()
      render(<App />)
      await user.click(screen.getByText(/Mode:/))
      const cells = screen.getAllByRole('button').slice(0, 9)
      await user.click(cells[0]) // X
      await user.click(cells[0]) // invalid
      expect(screen.getByText('Cell occupied')).toBeInTheDocument()
      await vi.advanceTimersByTimeAsync(650)
      expect(screen.queryByText('Cell occupied')).not.toBeInTheDocument()
    })

    it('declares winner and locks board', async () => {
      const user = userEvent.setup()
      render(<App />)
      await user.click(screen.getByText(/Mode:/))
      const c = screen.getAllByRole('button').slice(0, 9)
      // X row win on top: X0 O3 X1 O4 X2
      await user.click(c[0]); await user.click(c[3]); await user.click(c[1]); await user.click(c[4]); await user.click(c[2])
      expect(screen.getByText('X wins')).toBeInTheDocument()
      const before = c[5].textContent
      await user.click(c[5])
      expect(c[5].textContent).toBe(before) // no change after game end
    })

    it('detects draw', async () => {
      const user = userEvent.setup()
      render(<App />)
      await user.click(screen.getByText(/Mode:/))
      const c = screen.getAllByRole('button').slice(0, 9)
      // X O X / X O O / O X X
      await user.click(c[0]); await user.click(c[1]); await user.click(c[2])
      await user.click(c[4]); await user.click(c[3]); await user.click(c[5])
      await user.click(c[7]); await user.click(c[6]); await user.click(c[8])
      expect(screen.getByText('Draw')).toBeInTheDocument()
    })
  })

  describe('AI gameplay (O is AI)', () => {
    it('AI responds after X move', async () => {
      const user = userEvent.setup()
      render(<App />)
      const cells = screen.getAllByRole('button').slice(0, 9)
      await user.click(cells[0]) // X
      await vi.advanceTimersByTimeAsync(300) // AI delay is 250ms
      const filled = cells.filter(b => b.textContent !== '')
      expect(filled.length).toBe(2)
      expect(filled.some(b => b.textContent === 'O')).toBe(true)
    })

    it('locks board during AI turn', async () => {
      const user = userEvent.setup()
      render(<App />)
      const cells = screen.getAllByRole('button').slice(0, 9)
      await user.click(cells[0]) // triggers AI turn
      await user.click(cells[1]) // attempt during AI
      expect(cells[1].textContent).toBe('') // unchanged
      await vi.advanceTimersByTimeAsync(300)
    })
  })

  describe('controls', () => {
    it('restart resets the board and status', async () => {
      const user = userEvent.setup()
      render(<App />)
      await user.click(screen.getByText(/Mode:/))
      const cells = screen.getAllByRole('button').slice(0, 9)
      await user.click(cells[0]); await user.click(cells[1])
      await user.click(screen.getByText('Restart'))
      cells.forEach(b => expect(b.textContent).toBe(''))
      expect(screen.getByRole('status')).toHaveTextContent('X to play')
    })

    it('mode toggle switches between AI and 2 Players', async () => {
      const user = userEvent.setup()
      render(<App />)
      expect(screen.getByText(/vs Computer \(O\)/)).toBeInTheDocument()
      await user.click(screen.getByText(/Mode:/))
      expect(screen.getByText(/2 Players/)).toBeInTheDocument()
      await user.click(screen.getByText(/Mode:/))
      expect(screen.getByText(/vs Computer \(O\)/)).toBeInTheDocument()
    })

    it('board size toggles 3x3 <-> 4x4 and reinitializes state', async () => {
      const user = userEvent.setup()
      render(<App />)
      // Before
      let cellButtons = screen.getAllByRole('button').slice(0, 9)
      expect(cellButtons).toHaveLength(9)
      // Toggle
      await user.click(screen.getByText(/Board: 3x3/))
      await waitFor(() => expect(screen.getByText(/Board: 4x4/)).toBeInTheDocument())
      // After
      const buttons = screen.getAllByRole('button')
      const cellCount = buttons.filter(b => !b.className.includes('px-')).length
      expect(cellCount).toBeGreaterThanOrEqual(16)
    })
  })

  describe('a11y', () => {
    it('status region uses aria-live polite', () => {
      render(<App />)
      const status = screen.getByRole('status')
      expect(status).toHaveAttribute('aria-live', 'polite')
    })

    it('status text updates on valid move', async () => {
      const user = userEvent.setup()
      render(<App />)
      await user.click(screen.getByText(/Mode:/))
      expect(screen.getByRole('status')).toHaveTextContent('X to play')
      const cells = screen.getAllByRole('button').slice(0, 9)
      await user.click(cells[0])
      expect(screen.getByRole('status')).toHaveTextContent('O to play')
    })
  })
})