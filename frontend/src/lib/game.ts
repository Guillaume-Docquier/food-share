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

export function availableMoves(cells: Cells): number[] {
  const idxs: number[] = []
  for (let i = 0; i < cells.length; i++) if (cells[i] === null) idxs.push(i)
  return idxs
}

export function getBestMove(cells: Cells, ai: Player): number {
  const opp: Player = nextPlayer(ai)
  // 1) Win if possible
  for (const i of availableMoves(cells)) {
    const t = cells.slice(); t[i] = ai
    if (isWin(t) === ai) return i
  }
  // 2) Block opponent win
  for (const i of availableMoves(cells)) {
    const t = cells.slice(); t[i] = opp
    if (isWin(t) === opp) return i
  }
  // 3) Heuristic preference: center, corners, edges
  const pref = [4, 0, 2, 6, 8, 1, 3, 5, 7]
  for (const i of pref) if (cells[i] === null) return i
  // 4) Fallback
  return availableMoves(cells)[0] ?? -1
}
