import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Cell from './Cell'

describe('Cell Component', () => {
  describe('rendering', () => {
    it('should render empty cell', () => {
      const onClick = vi.fn()
      render(<Cell value={null} index={0} onClick={onClick} />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button.textContent).toBe('')
    })

    it('should render X value', () => {
      const onClick = vi.fn()
      render(<Cell value="X" index={0} onClick={onClick} />)
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('X')
    })

    it('should render O value', () => {
      const onClick = vi.fn()
      render(<Cell value="O" index={0} onClick={onClick} />)
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('O')
    })

    it('should apply correct CSS classes', () => {
      const onClick = vi.fn()
      render(<Cell value={null} index={0} onClick={onClick} />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('w-full')
      expect(button).toHaveClass('aspect-square')
      expect(button).toHaveClass('bg-white')
      expect(button).toHaveClass('text-3xl')
      expect(button).toHaveClass('font-bold')
    })
  })

  describe('interactions', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(<Cell value={null} index={0} onClick={onClick} />)
      const button = screen.getByRole('button')
      
      await user.click(button)
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should call onClick when cell has value', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(<Cell value="X" index={0} onClick={onClick} />)
      const button = screen.getByRole('button')
      
      await user.click(button)
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple clicks', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(<Cell value={null} index={0} onClick={onClick} />)
      const button = screen.getByRole('button')
      
      await user.click(button)
      await user.click(button)
      await user.click(button)
      expect(onClick).toHaveBeenCalledTimes(3)
    })
  })

  describe('accessibility', () => {
    it('should be accessible as button', () => {
      const onClick = vi.fn()
      render(<Cell value={null} index={0} onClick={onClick} />)
      const button = screen.getByRole('button')
      expect(button.tagName).toBe('BUTTON')
    })

    it('should be focusable', () => {
      const onClick = vi.fn()
      render(<Cell value={null} index={0} onClick={onClick} />)
      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })

    it('should trigger onClick on Enter key', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(<Cell value={null} index={0} onClick={onClick} />)
      const button = screen.getByRole('button')
      
      button.focus()
      await user.keyboard('{Enter}')
      expect(onClick).toHaveBeenCalled()
    })

    it('should trigger onClick on Space key', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(<Cell value={null} index={0} onClick={onClick} />)
      const button = screen.getByRole('button')
      
      button.focus()
      await user.keyboard(' ')
      expect(onClick).toHaveBeenCalled()
    })
  })

  describe('edge cases', () => {
    it('should handle rapid successive clicks', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(<Cell value={null} index={0} onClick={onClick} />)
      const button = screen.getByRole('button')
      
      await user.tripleClick(button)
      expect(onClick).toHaveBeenCalledTimes(3)
    })

    it('should not break with different index values', () => {
      const onClick = vi.fn()
      const { rerender } = render(<Cell value={null} index={0} onClick={onClick} />)
      
      rerender(<Cell value={null} index={8} onClick={onClick} />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should update when value changes', () => {
      const onClick = vi.fn()
      const { rerender } = render(<Cell value={null} index={0} onClick={onClick} />)
      let button = screen.getByRole('button')
      expect(button.textContent).toBe('')
      
      rerender(<Cell value="X" index={0} onClick={onClick} />)
      button = screen.getByRole('button')
      expect(button).toHaveTextContent('X')
      
      rerender(<Cell value="O" index={0} onClick={onClick} />)
      button = screen.getByRole('button')
      expect(button).toHaveTextContent('O')
    })
  })
})