import React from 'react'
import { Cell as CellValue } from '../lib/game'
import Cell from './Cell'

type Props = {
  size: number
  cells: CellValue[]
  onCellClick: (index: number) => void
  locked?: boolean
}

export default function Board({ size, cells, onCellClick, locked }: Props) {
  return (
    <div className="w-full max-w-xs sm:max-w-sm">
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
        {cells.map((v, i) => (
          <Cell key={i} index={i} value={v} onClick={() => !locked && onCellClick(i)} />
        ))}
      </div>
    </div>
  )
}
