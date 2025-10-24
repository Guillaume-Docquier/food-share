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

/**
 * Builds the index sets representing every row, column, and the two diagonals for a size×size board.
 *
 * @param size - Number of rows and columns of the square board
 * @returns An array of lines where each line is an array of cell indices for a row, a column, the main diagonal, or the anti-diagonal (rows first, then columns, then main diagonal, then anti-diagonal)
 */
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

/**
 * Determines the winning player on the board, if any.
 *
 * @param cells - Row-major array of cells representing the board
 * @param size - Number of cells per row/column (board side length)
 * @returns `'X'` or `'O'` when a complete winning line is present, `null` otherwise
 */
export function isWin(cells: Cells, size: number): Player | null {
  for (const line of generateLines(size)) {
    const first = cells[line[0]]
    if (!first) continue
    if (line.every((idx) => cells[idx] === first)) return first
  }
  return null
}

/**
 * Determines whether the game is a draw (the board is full and there is no winner).
 *
 * @param cells - Flat array of board cells
 * @param size - Side length of the square board (number of rows/columns)
 * @returns `true` if every cell is occupied and no winning line exists, `false` otherwise
 */
export function isDraw(cells: Cells, size: number): boolean {
  return cells.every((c) => c !== null) && !isWin(cells, size)
}

/**
 * Get the opposing player for a given player.
 *
 * @param p - The current player ('X' or 'O')
 * @returns `'O'` if `p` is `'X'`, `'X'` if `p` is `'O'`
 */
export function nextPlayer(p: Player): Player {
  return p === 'X' ? 'O' : 'X'
}

/**
 * Get the indices of empty board cells.
 *
 * @param cells - Flat array of board cells in row-major order
 * @returns Indices of cells that are empty (`null`)
 */
export function availableMoves(cells: Cells): number[] {
  const idxs: number[] = []
  for (let i = 0; i < cells.length; i++) if (cells[i] === null) idxs.push(i)
  return idxs
}

/**
 * Selects the best move index for the given AI player on the current board.
 *
 * Chooses a winning move if available, otherwise blocks an immediate opponent win,
 * then prefers center(s) and corners, and finally falls back to the first available cell.
 *
 * @param cells - The current board cells array where each element is `'X'`, `'O'`, or `null`
 * @param ai - The AI player (`'X'` or `'O'`) for which to choose a move
 * @param size - The board dimension (e.g., 3 for a 3x3 board)
 * @returns The chosen cell index for the move, or `-1` if no moves are available
 */
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