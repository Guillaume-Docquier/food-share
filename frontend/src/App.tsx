import React, { useCallback, useState } from 'react'
import Board from './components/Board'
import { GameState, initialState, isWin, nextPlayer, Cells } from './lib/game'

export default function App() {
  const [state, setState] = useState<GameState>(initialState())
  const [message, setMessage] = useState<string>('')

  const handleCellClick = useCallback((idx: number) => {
    setState((prev) => {
      if (prev.isOver) return prev
      if (prev.cells[idx]) {
        setMessage('Cell occupied')
        setTimeout(() => setMessage(''), 600)
        return prev
      }
      const cells: Cells = prev.cells.slice()
      cells[idx] = prev.currentPlayer
      const winner = isWin(cells)
      const moveCount = prev.moveCount + 1
      const draw = !winner && moveCount === 9
      return {
        cells,
        currentPlayer: winner || draw ? prev.currentPlayer : nextPlayer(prev.currentPlayer),
        winner,
        isDraw: draw,
        isOver: !!winner || draw,
        moveCount,
      }
    })
  }, [])

  const reset = () => {
    setState(initialState())
    setMessage('')
  }

  const status = state.isOver ? (state.winner ? `${state.winner} wins` : 'Draw') : `${state.currentPlayer} to play`

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4">Tic Tac Toe</h1>
      <div className="mb-2 text-gray-700" role="status" aria-live="polite">{status}</div>
      {message && <div className="text-sm text-amber-600 mb-2">{message}</div>}
      <Board cells={state.cells} onCellClick={handleCellClick} locked={state.isOver} />
      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500" onClick={reset}>
          Restart
        </button>
      </div>
    </div>
  )
}
