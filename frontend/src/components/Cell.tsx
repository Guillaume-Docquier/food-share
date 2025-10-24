import React from 'react'
import { Cell as CellValue } from '../lib/game'

type Props = {
  value: CellValue
  index: number
  onClick: () => void
}

/**
 * Renders a square button that displays a cell value and invokes a callback when clicked.
 *
 * @param value - The cell content to display
 * @param onClick - Callback invoked when the button is clicked
 * @returns The button element displaying `value` that triggers `onClick` when pressed
 */
export default function Cell({ value, onClick }: Props) {
  return (
    <button
      className="w-full aspect-square bg-white text-3xl font-bold flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={onClick}
    >
      {value}
    </button>
  )
}