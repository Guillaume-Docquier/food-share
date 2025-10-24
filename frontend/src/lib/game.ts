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

export const initialState = (size: number = 3): GameState => ({
  cells: Array(size * size).fill(null),
  currentPlayer: 'X',
  winner: null,
  isDraw: false,
  isOver: false,
  moveCount: 0,
})

function generateLines(size: number): number[][] {
  const lines: number[][] = []
  // rows
  for (let r = 0; r < size; r++) {
    const row: number[] = []
    for (let c = 0; c < size; c++) row.push(r * size + c)
    lines.push(row)
  }
  // cols
  for (let c = 0; c < size; c++) {
    const col: number[] = []
    for (let r = 0; r < size; r++) col.push(r * size + c)
    lines.push(col)
  }
  // main diag
  const d1: number[] = []
  for (let i = 0; i < size; i++) d1.push(i * (size + 1))
  lines.push(d1)
  // anti diag
  const d2: number[] = []
  for (let i = 1; i <= size; i++) d2.push(i * (size - 1))
  lines.push(d2)
  return lines
}

export function isWin(cells: Cells, size: number): Player | null {
  for (const line of generateLines(size)) {
    const first = cells[line[0]]
    if (!first) continue
    if (line.every((idx) => cells[idx] === first)) return first
  }
  return null
}

export function isDraw(cells: Cells, size: number): boolean {
  return cells.every((c) => c !== null) && !isWin(cells, size)
}

export function nextPlayer(p: Player): Player {
  return p === 'X' ? 'O' : 'X'
}

export function availableMoves(cells: Cells): number[] {
  const idxs: number[] = []
  for (let i = 0; i < cells.length; i++) if (cells[i] === null) idxs.push(i)
  return idxs
}

export function getBestMove(cells: Cells, ai: Player, size: number): number {
  const opp: Player = nextPlayer(ai)
  const moves = availableMoves(cells)
  // 1) Win if possible
  for (const i of moves) {
    const t = cells.slice(); t[i] = ai
    if (isWin(t, size) === ai) return i
  }
  // 2) Block opponent win
  for (const i of moves) {
    const t = cells.slice(); t[i] = opp
    if (isWin(t, size) === opp) return i
  }
  // 3) Preference: centers, corners, then others
  const centers: number[] = []
  if (size % 2 === 1) {
    const m = Math.floor(size / 2)
    centers.push(m * size + m)
  } else {
    const a = size / 2 - 1, b = size / 2
    centers.push(a * size + a, a * size + b, b * size + a, b * size + b)
  }
  const corners = [0, size - 1, size * (size - 1), size * size - 1]
  const pref = [...centers, ...corners]
  for (const i of pref) if (i >= 0 && i < cells.length && cells[i] === null) return i
  // 4) Fallback
  return moves[0] ?? -1
}
