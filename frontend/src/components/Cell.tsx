import React from 'react'
import { Cell as CellValue } from '../lib/game'

type Props = {
  value: CellValue
  index: number
  onClick: () => void
}

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
