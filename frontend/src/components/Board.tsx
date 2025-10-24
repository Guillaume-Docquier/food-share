import React from 'react'
import { Cell as CellValue } from '../lib/game'
import Cell from './Cell'

type Props = {
  cells: CellValue[]
  onCellClick: (index: number) => void
  locked?: boolean
}

export default function Board({ cells, onCellClick, locked }: Props) {
  return (
    <div className="w-full max-w-xs sm:max-w-sm">
      <div className="grid grid-cols-3 gap-2">
        {cells.map((v, i) => (
          <Cell key={i} index={i} value={v} onClick={() => !locked && onCellClick(i)} />
        ))}
      </div>
    </div>
  )
}
