import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Board from './Board'
import { type Cells } from '../lib/game'

describe('Board Component', () => {
  describe('rendering', () => {
    it('should render 3x3 grid with 9 cells', () => {
      const cells: Cells = Array(9).fill(null)
      const onCellClick = vi.fn()
      render(<Board size={3} cells={cells} onCellClick={onCellClick} />)
      
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(9)
    })

    it('should render 4x4 grid with 16 cells', () => {
      const cells: Cells = Array(16).fill(null)
      const onCellClick = vi.fn()
      render(<Board size={4} cells={cells} onCellClick={onCellClick} />)
      
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(16)
    })

    it('should render cells with correct values', () => {
      const cells: Cells = [
        'X', 'O', 'X',
        'O', 'X', null,
        null, null, 'O'
      ]
      const onCellClick = vi.fn()
      render(<Board size={3} cells={cells} onCellClick={onCellClick} />)
      
      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toHaveTextContent('X')
      expect(buttons[1]).toHaveTextContent('O')
      expect(buttons[2]).toHaveTextContent('X')
      expect(buttons[3]).toHaveTextContent('O')
      expect(buttons[4]).toHaveTextContent('X')
      expect(buttons[5]).toHaveTextContent('')
      expect(buttons[8]).toHaveTextContent('O')
    })

    it('should apply grid template columns style', () => {
      const cells: Cells = Array(9).fill(null)
      const onCellClick = vi.fn()
      const { container } = render(<Board size={3} cells={cells} onCellClick={onCellClick} />)
      
      const grid = container.querySelector('.grid')
      expect(grid).toHaveStyle({ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' })
    })

    it('should render empty board', () => {
      const cells: Cells = Array(9).fill(null)
      const onCellClick = vi.fn()
      render(<Board size={3} cells={cells} onCellClick={onCellClick} />)
      
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button.textContent).toBe('')
      })
    })

    it('should render full board', () => {
      const cells: Cells = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X']
      const onCellClick = vi.fn()
      render(<Board size={3} cells={cells} onCellClick={onCellClick} />)
      
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button.textContent).toMatch(/^[XO]$/)
      })
    })
  })

  describe('interactions when not locked', () => {
    it('should call onCellClick with correct index when cell clicked', async () => {
      const user = userEvent.setup()
      const cells: Cells = Array(9).fill(null)
      const onCellClick = vi.fn()
      render(<Board size={3} cells={cells} onCellClick={onCellClick} />)
      
      const buttons = screen.getAllByRole('button')
      await user.click(buttons[0])
      expect(onCellClick).toHaveBeenCalledWith(0)
    })

    it('should call onCellClick with correct indices for different cells', async () => {
      const user = userEvent.setup()
      const cells: Cells = Array(9).fill(null)
      const onCellClick = vi.fn()
      render(<Board size={3} cells={cells} onCellClick={onCellClick} />)
      
      const buttons = screen.getAllByRole('button')
      await user.click(buttons[4])
      expect(onCellClick).toHaveBeenCalledWith(4)
      
      await user.click(buttons[8])
      expect(onCellClick).toHaveBeenCalledWith(8)
    })

    it('should handle clicks on all cells', async () => {
      const user = userEvent.setup()
      const cells: Cells = Array(9).fill(null)
      const onCellClick = vi.fn()
      render(<Board size={3} cells={cells} onCellClick={onCellClick} />)
      
      const buttons = screen.getAllByRole('button')
      for (let i = 0; i < buttons.length; i++) {
        await user.click(buttons[i])
      }
      
      expect(onCellClick).toHaveBeenCalledTimes(9)
      for (let i = 0; i < 9; i++) {
        expect(onCellClick).toHaveBeenCalledWith(i)
      }
    })
  })

  describe('interactions when locked', () => {
    it('should not call onCellClick when locked', async () => {
      const user = userEvent.setup()
      const cells: Cells = Array(9).fill(null)
      const onCellClick = vi.fn()
      render(<Board size={3} cells={cells} onCellClick={onCellClick} locked={true} />)
      
      const buttons = screen.getAllByRole('button')
      await user.click(buttons[0])
      expect(onCellClick).not.toHaveBeenCalled()
    })

    it('should not call onCellClick for any cell when locked', async () => {
      const user = userEvent.setup()
      const cells: Cells = Array(9).fill(null)
      const onCellClick = vi.fn()
      render(<Board size={3} cells={cells} onCellClick={onCellClick} locked={true} />)
      
      const buttons = screen.getAllByRole('button')
      await user.click(buttons[4])
      await user.click(buttons[8])
      await user.click(buttons[0])
      
      expect(onCellClick).not.toHaveBeenCalled()
    })

    it('should still render cells but ignore clicks when locked', async () => {
      const user = userEvent.setup()
      const cells: Cells = ['X', 'O', 'X', null, null, null, null, null, null]
      const onCellClick = vi.fn()
      render(<Board size={3} cells={cells} onCellClick={onCellClick} locked={true} />)
      
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(9)
      expect(buttons[0]).toHaveTextContent('X')
      
      await user.click(buttons[3])
      expect(onCellClick).not.toHaveBeenCalled()
    })
  })

  describe('dynamic updates', () => {
    it('should update when cells change', () => {
      const onCellClick = vi.fn()
      const { rerender } = render(<Board size={3} cells={Array(9).fill(null)} onCellClick={onCellClick} />)
      
      const newCells: Cells = ['X', null, null, null, null, null, null, null, null]
      rerender(<Board size={3} cells={newCells} onCellClick={onCellClick} />)
      
      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toHaveTextContent('X')
    })

    it('should update when locked state changes', async () => {
      const user = userEvent.setup()
      const cells: Cells = Array(9).fill(null)
      const onCellClick = vi.fn()
      const { rerender } = render(<Board size={3} cells={cells} onCellClick={onCellClick} locked={false} />)
      
      const buttons = screen.getAllByRole('button')
      await user.click(buttons[0])
      expect(onCellClick).toHaveBeenCalledTimes(1)
      
      rerender(<Board size={3} cells={cells} onCellClick={onCellClick} locked={true} />)
      await user.click(buttons[1])
      expect(onCellClick).toHaveBeenCalledTimes(1)
    })

    it('should handle size changes', () => {
      const onCellClick = vi.fn()
      const { rerender } = render(<Board size={3} cells={Array(9).fill(null)} onCellClick={onCellClick} />)
      
      rerender(<Board size={4} cells={Array(16).fill(null)} onCellClick={onCellClick} />)
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(16)
    })
  })

  describe('edge cases', () => {
    it('should handle 1x1 board', () => {
      const cells: Cells = [null]
      const onCellClick = vi.fn()
      render(<Board size={1} cells={cells} onCellClick={onCellClick} />)
      
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(1)
    })

    it('should handle 2x2 board', () => {
      const cells: Cells = [null, null, null, null]
      const onCellClick = vi.fn()
      render(<Board size={2} cells={cells} onCellClick={onCellClick} />)
      
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(4)
    })

    it('should handle mismatched size and cells length gracefully', () => {
      const cells: Cells = Array(9).fill(null)
      const onCellClick = vi.fn()
      render(<Board size={4} cells={cells} onCellClick={onCellClick} />)
      
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(9)
    })

    it('should handle rapid cell clicks', async () => {
      const user = userEvent.setup()
      const cells: Cells = Array(9).fill(null)
      const onCellClick = vi.fn()
      render(<Board size={3} cells={cells} onCellClick={onCellClick} />)
      
      const buttons = screen.getAllByRole('button')
      await user.tripleClick(buttons[0])
      
      expect(onCellClick).toHaveBeenCalledWith(0)
      expect(onCellClick).toHaveBeenCalledTimes(3)
    })
  })

  describe('grid styling', () => {
    it('should apply correct grid columns for 3x3', () => {
      const cells: Cells = Array(9).fill(null)
      const onCellClick = vi.fn()
      const { container } = render(<Board size={3} cells={cells} onCellClick={onCellClick} />)
      
      const grid = container.querySelector('.grid')
      expect(grid).toHaveStyle({ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' })
    })

    it('should apply correct grid columns for 4x4', () => {
      const cells: Cells = Array(16).fill(null)
      const onCellClick = vi.fn()
      const { container } = render(<Board size={4} cells={cells} onCellClick={onCellClick} />)
      
      const grid = container.querySelector('.grid')
      expect(grid).toHaveStyle({ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' })
    })

    it('should have gap-2 class', () => {
      const cells: Cells = Array(9).fill(null)
      const onCellClick = vi.fn()
      const { container } = render(<Board size={3} cells={cells} onCellClick={onCellClick} />)
      
      const grid = container.querySelector('.grid')
      expect(grid).toHaveClass('gap-2')
    })
  })
})