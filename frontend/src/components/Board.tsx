import React, { useEffect } from 'react'
import { Cell as CellValue } from '../lib/game'
import Cell from './Cell'

type Props = {
  size: number
  cells: CellValue[]
  onCellClick: (index: number) => void
  locked?: boolean
  winningLine?: number[]
}

/**
 * Render a responsive grid of cells representing the game board.
 *
 * @param size - Number of columns in the grid.
 * @param cells - Array of cell values for the board, indexed by cell position.
 * @param onCellClick - Callback invoked with the cell index when a cell is clicked.
 * @param locked - When true, disables invoking `onCellClick` for clicks.
 * @returns A React element containing the board grid with one Cell component per entry in `cells`.
 */
export default function Board({ size, cells, onCellClick, locked, winningLine }: Props) {
  useEffect(() => {
    if (locked) return;
    const allEmpty = cells.every((c) => c === null);
    if (!allEmpty) return;
    const idx = 0;
    const el = document.getElementById(`cell-${idx}`) as HTMLButtonElement | null;
    el?.focus();
  }, [size, locked, cells]);
  return (
    <div className="w-full max-w-xs sm:max-w-sm">
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
        {cells.map((v, i) => (
          <Cell key={i} index={i} size={size} value={v} isWinning={!!winningLine && winningLine.includes(i)} onClick={() => !locked && onCellClick(i)} />
        ))}
      </div>
    </div>
  )
}