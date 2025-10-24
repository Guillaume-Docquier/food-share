import React, { useCallback, useState, useEffect } from 'react'
import Board from './components/Board'
import { GameState, initialState, isWin, nextPlayer, Cells, getBestMove } from './lib/game'

/**
 * Top-level Tic Tac Toe application component that manages game state, player interaction, AI turns, and UI controls.
 *
 * Manages board cells, current player, move count, win/draw detection, transient UI messages, AI mode (AI plays as 'O'), and board size; provides controls to restart the game, toggle AI/2-player mode, and change the board size.
 *
 * @returns The root React element rendering the game UI.
 */
export default function App() {
  const [state, setState] = useState<GameState>(initialState(3))
  const [message, setMessage] = useState<string>('')
  const [vsAI, setVsAI] = useState<boolean>(true) // AI plays as 'O'
  const [size, setSize] = useState<number>(3)

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
      const winner = isWin(cells, Math.sqrt(cells.length))
      const moveCount = prev.moveCount + 1
      const draw = !winner && moveCount === prev.cells.length
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

  // AI turn: AI plays as 'O'
  useEffect(() => {
    if (!vsAI || state.isOver || state.currentPlayer !== 'O') return
    const idx = getBestMove(state.cells, 'O', Math.sqrt(state.cells.length))
    const timer = setTimeout(() => {
      setState((prev) => {
        if (!vsAI || prev.isOver || prev.currentPlayer !== 'O') return prev
        if (idx < 0 || prev.cells[idx]) return prev
        const cells: Cells = prev.cells.slice()
        cells[idx] = 'O'
        const winner = isWin(cells, Math.sqrt(cells.length))
        const moveCount = prev.moveCount + 1
        const draw = !winner && moveCount === prev.cells.length
        return {
          cells,
          currentPlayer: winner || draw ? prev.currentPlayer : nextPlayer(prev.currentPlayer),
          winner,
          isDraw: draw,
          isOver: !!winner || draw,
          moveCount,
        }
      })
    }, 250)
    return () => clearTimeout(timer)
  }, [vsAI, state])

  const reset = () => {
    setState(initialState(size))
    setMessage('')
  }

  const status = state.isOver ? (state.winner ? `${state.winner} wins` : 'Draw') : `${state.currentPlayer} to play`

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4">Tic Tac Toe</h1>
      <div className="mb-2 text-gray-700" role="status" aria-live="polite">{status}</div>
      {message && <div className="text-sm text-amber-600 mb-2">{message}</div>}
      <Board size={size} cells={state.cells} onCellClick={handleCellClick} locked={state.isOver || (vsAI && state.currentPlayer === 'O')} />
      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500" onClick={reset}>
          Restart
        </button>
        <button className="px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50" onClick={() => setVsAI(v => !v)}>
          Mode: {vsAI ? 'vs Computer (O)' : '2 Players'}
        </button>
        <button className="px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50" onClick={() => { const ns = size === 3 ? 4 : 3; setSize(ns); setState(initialState(ns)); setMessage('') }}>
          Board: {size}x{size}
        </button>
      </div>
    </div>
  )
}

