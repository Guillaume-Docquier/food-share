import React from 'react'
import { Cell as CellValue } from '../lib/game'

type Props = {
  value: CellValue
  index: number
  size: number
  onClick: () => void
  isWinning?: boolean
}

/**
 * Renders a square button that displays a cell value and invokes a callback when clicked.
 *
 * @param value - The cell content to display
 * @param onClick - Callback invoked when the button is clicked
 * @returns The button element displaying `value` that triggers `onClick` when pressed
 */
export default function Cell({ value, index, size, onClick, isWinning }: Props) {
  return (
    <button
      id={`cell-${index}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); return; }
        const total = size * size;
        const row = Math.floor(index / size), col = index % size;
        let ni = index;
        if (e.key === 'ArrowRight') ni = row * size + Math.min(size - 1, col + 1);
        else if (e.key === 'ArrowLeft') ni = row * size + Math.max(0, col - 1);
        else if (e.key === 'ArrowDown') ni = Math.min(total - 1, (row + 1) * size + col);
        else if (e.key === 'ArrowUp') ni = Math.max(0, (row - 1) * size + col);
        if (ni !== index) { e.preventDefault(); (document.getElementById(`cell-${ni}`) as HTMLButtonElement | null)?.focus(); }
      }}
      className={`w-full aspect-square bg-white text-3xl font-bold flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isWinning ? 'ring-4 ring-emerald-400 animate-win-cell' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  )
}