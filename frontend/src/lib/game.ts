export type Player = 'X' | 'O'
export type Cell = Player | null
export type Cells = Cell[]

export interface GameState {
  cells: Cells
  currentPlayer: Player
  winner: Player | null
  isDraw: boolean
  isOver: boolean
  moveCount: number
}

export const initialState = (): GameState => ({
  cells: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  isDraw: false,
  isOver: false,
  moveCount: 0,
})

const lines: [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export function isWin(cells: Cells): Player | null {
  for (const [a, b, c] of lines) {
    const v = cells[a]
    if (v && v === cells[b] && v === cells[c]) return v
  }
  return null
}

export function isDraw(cells: Cells): boolean {
  return cells.every((c) => c !== null) && !isWin(cells)
}

export function nextPlayer(p: Player): Player {
  return p === 'X' ? 'O' : 'X'
}
