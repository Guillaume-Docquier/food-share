# Data Model: Tic Tac Toe

## Entities

### GameState
- currentPlayer: "X" | "O"
- winner: "X" | "O" | null
- isDraw: boolean
- isOver: boolean
- moveCount: 0..9

### Board
- cells: Array<Cell> length 9 (indexes 0..8)

### Cell
- index: number (0..8)
- value: "X" | "O" | null

## Rules
- Start: X to move; all cells null; moveCount=0, isOver=false.
- Move: only on empty cell and when not isOver.
- Win: any of 8 lines (3 rows, 3 cols, 2 diagonals) becomes same non-null value -> winner, isOver=true.
- Draw: moveCount==9 and winner==null -> isDraw=true, isOver=true.
- Restart: reset to initial state.
