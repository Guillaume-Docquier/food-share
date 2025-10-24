import { describe, it, expect } from 'vitest'
import {
  initialState,
  isWin,
  isDraw,
  nextPlayer,
  availableMoves,
  getBestMove,
  type Player,
  type Cells,
} from './game'

describe('game.ts - Core Logic', () => {
  describe('initialState', () => {
    it('should create initial state for 3x3 board by default', () => {
      const state = initialState()
      expect(state.cells).toHaveLength(9)
      expect(state.cells.every(cell => cell === null)).toBe(true)
      expect(state.currentPlayer).toBe('X')
      expect(state.winner).toBeNull()
      expect(state.isDraw).toBe(false)
      expect(state.isOver).toBe(false)
      expect(state.moveCount).toBe(0)
    })

    it('should create initial state for 4x4 board', () => {
      const state = initialState(4)
      expect(state.cells).toHaveLength(16)
      expect(state.cells.every(cell => cell === null)).toBe(true)
    })

    it('should create initial state for 5x5 board', () => {
      const state = initialState(5)
      expect(state.cells).toHaveLength(25)
    })

    it('should handle size 1', () => {
      const state = initialState(1)
      expect(state.cells).toHaveLength(1)
    })

    it('should handle size 2', () => {
      const state = initialState(2)
      expect(state.cells).toHaveLength(4)
    })
  })

  describe('isWin', () => {
    describe('3x3 board wins', () => {
      it('should detect row 0 win for X', () => {
        const cells: Cells = [
          'X', 'X', 'X',
          'O', 'O', null,
          null, null, null
        ]
        expect(isWin(cells, 3)).toBe('X')
      })

      it('should detect row 1 win for O', () => {
        const cells: Cells = [
          'X', 'X', null,
          'O', 'O', 'O',
          'X', null, null
        ]
        expect(isWin(cells, 3)).toBe('O')
      })

      it('should detect row 2 win for X', () => {
        const cells: Cells = [
          'O', 'O', null,
          null, 'O', null,
          'X', 'X', 'X'
        ]
        expect(isWin(cells, 3)).toBe('X')
      })

      it('should detect column 0 win for X', () => {
        const cells: Cells = [
          'X', 'O', 'O',
          'X', null, null,
          'X', null, null
        ]
        expect(isWin(cells, 3)).toBe('X')
      })

      it('should detect column 1 win for O', () => {
        const cells: Cells = [
          'X', 'O', 'X',
          null, 'O', null,
          'X', 'O', null
        ]
        expect(isWin(cells, 3)).toBe('O')
      })

      it('should detect column 2 win for X', () => {
        const cells: Cells = [
          'O', 'O', 'X',
          null, null, 'X',
          null, null, 'X'
        ]
        expect(isWin(cells, 3)).toBe('X')
      })

      it('should detect main diagonal win for X', () => {
        const cells: Cells = [
          'X', 'O', 'O',
          null, 'X', null,
          'O', null, 'X'
        ]
        expect(isWin(cells, 3)).toBe('X')
      })

      it('should detect anti-diagonal win for O', () => {
        const cells: Cells = [
          'X', 'X', 'O',
          null, 'O', 'X',
          'O', null, null
        ]
        expect(isWin(cells, 3)).toBe('O')
      })
    })

    describe('4x4 board wins', () => {
      it('should detect row win on 4x4 board', () => {
        const cells: Cells = [
          'X', 'X', 'X', 'X',
          'O', 'O', null, null,
          null, null, null, null,
          null, null, null, null
        ]
        expect(isWin(cells, 4)).toBe('X')
      })

      it('should detect column win on 4x4 board', () => {
        const cells: Cells = [
          'O', 'X', null, null,
          'O', 'X', null, null,
          'O', null, null, null,
          'O', null, null, null
        ]
        expect(isWin(cells, 4)).toBe('O')
      })

      it('should detect main diagonal win on 4x4 board', () => {
        const cells: Cells = [
          'X', 'O', null, null,
          'O', 'X', null, null,
          null, null, 'X', 'O',
          null, null, 'O', 'X'
        ]
        expect(isWin(cells, 4)).toBe('X')
      })

      it('should detect anti-diagonal win on 4x4 board', () => {
        const cells: Cells = [
          null, null, null, 'O',
          null, null, 'O', 'X',
          null, 'O', 'X', null,
          'O', 'X', null, null
        ]
        expect(isWin(cells, 4)).toBe('O')
      })
    })

    describe('no win scenarios', () => {
      it('should return null for empty board', () => {
        const cells: Cells = Array(9).fill(null)
        expect(isWin(cells, 3)).toBeNull()
      })

      it('should return null for incomplete line', () => {
        const cells: Cells = [
          'X', 'X', null,
          'O', 'O', null,
          null, null, null
        ]
        expect(isWin(cells, 3)).toBeNull()
      })

      it('should return null for mixed line', () => {
        const cells: Cells = [
          'X', 'O', 'X',
          'O', 'X', 'O',
          'O', 'X', 'O'
        ]
        expect(isWin(cells, 3)).toBeNull()
      })

      it('should return null when line has null value', () => {
        const cells: Cells = [
          'X', 'X', null,
          'O', 'O', 'X',
          'X', 'O', 'O'
        ]
        expect(isWin(cells, 3)).toBeNull()
      })
    })

    describe('edge cases', () => {
      it('should handle 1x1 board with X', () => {
        expect(isWin(['X'], 1)).toBe('X')
      })

      it('should handle 1x1 board with O', () => {
        expect(isWin(['O'], 1)).toBe('O')
      })

      it('should handle 2x2 board row win', () => {
        const cells: Cells = ['X', 'X', 'O', 'O']
        expect(isWin(cells, 2)).toBe('X')
      })

      it('should handle 2x2 board column win', () => {
        const cells: Cells = ['X', 'O', 'X', 'O']
        expect(isWin(cells, 2)).toBe('X')
      })

      it('should handle 2x2 board diagonal win', () => {
        const cells: Cells = ['X', 'O', 'O', 'X']
        expect(isWin(cells, 2)).toBe('X')
      })
    })
  })

  describe('isDraw', () => {
    it('should return true for full board with no winner', () => {
      const cells: Cells = [
        'X', 'O', 'X',
        'X', 'O', 'O',
        'O', 'X', 'X'
      ]
      expect(isDraw(cells, 3)).toBe(true)
    })

    it('should return false for board with winner', () => {
      const cells: Cells = [
        'X', 'X', 'X',
        'O', 'O', null,
        null, null, null
      ]
      expect(isDraw(cells, 3)).toBe(false)
    })

    it('should return false for incomplete board', () => {
      const cells: Cells = [
        'X', 'O', null,
        'O', 'X', null,
        null, null, null
      ]
      expect(isDraw(cells, 3)).toBe(false)
    })

    it('should return false for empty board', () => {
      const cells: Cells = Array(9).fill(null)
      expect(isDraw(cells, 3)).toBe(false)
    })

    it('should detect draw on 4x4 board', () => {
      const cells: Cells = [
        'X', 'O', 'X', 'O',
        'O', 'X', 'O', 'X',
        'X', 'O', 'X', 'O',
        'O', 'X', 'O', 'X'
      ]
      expect(isDraw(cells, 4)).toBe(true)
    })

    it('should return false when one cell is empty', () => {
      const cells: Cells = [
        'X', 'O', 'X',
        'X', 'O', 'O',
        'O', 'X', null
      ]
      expect(isDraw(cells, 3)).toBe(false)
    })
  })

  describe('nextPlayer', () => {
    it('should return O when given X', () => {
      expect(nextPlayer('X')).toBe('O')
    })

    it('should return X when given O', () => {
      expect(nextPlayer('O')).toBe('X')
    })

    it('should alternate correctly multiple times', () => {
      let player: Player = 'X'
      player = nextPlayer(player)
      expect(player).toBe('O')
      player = nextPlayer(player)
      expect(player).toBe('X')
      player = nextPlayer(player)
      expect(player).toBe('O')
    })
  })

  describe('availableMoves', () => {
    it('should return all indices for empty board', () => {
      const cells: Cells = Array(9).fill(null)
      const moves = availableMoves(cells)
      expect(moves).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])
    })

    it('should return empty array for full board', () => {
      const cells: Cells = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X']
      expect(availableMoves(cells)).toEqual([])
    })

    it('should return correct indices for partially filled board', () => {
      const cells: Cells = [
        'X', null, 'O',
        null, 'X', null,
        'O', null, null
      ]
      expect(availableMoves(cells)).toEqual([1, 3, 5, 7, 8])
    })

    it('should return single index when only one move left', () => {
      const cells: Cells = [
        'X', 'O', 'X',
        'O', 'X', 'O',
        'O', 'X', null
      ]
      expect(availableMoves(cells)).toEqual([8])
    })

    it('should work with 4x4 board', () => {
      const cells: Cells = Array(16).fill(null)
      cells[0] = 'X'
      cells[5] = 'O'
      cells[10] = 'X'
      expect(availableMoves(cells)).toEqual([1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 15])
    })
  })

  describe('getBestMove', () => {
    describe('winning moves', () => {
      it('should choose winning move for X', () => {
        const cells: Cells = [
          'X', 'X', null,
          'O', 'O', null,
          null, null, null
        ]
        expect(getBestMove(cells, 'X', 3)).toBe(2)
      })

      it('should choose winning move for O', () => {
        const cells: Cells = [
          'X', 'X', null,
          'O', 'O', null,
          'X', null, null
        ]
        expect(getBestMove(cells, 'O', 3)).toBe(5)
      })

      it('should prioritize diagonal win', () => {
        const cells: Cells = [
          'X', 'O', null,
          'O', 'X', null,
          null, null, null
        ]
        expect(getBestMove(cells, 'X', 3)).toBe(8)
      })

      it('should win on column', () => {
        const cells: Cells = [
          'X', 'O', null,
          'X', 'O', null,
          null, null, null
        ]
        expect(getBestMove(cells, 'X', 3)).toBe(6)
      })
    })

    describe('blocking moves', () => {
      it('should block opponent row win', () => {
        const cells: Cells = [
          'X', 'X', null,
          'O', null, null,
          null, null, null
        ]
        expect(getBestMove(cells, 'O', 3)).toBe(2)
      })

      it('should block opponent diagonal win', () => {
        const cells: Cells = [
          'X', 'O', null,
          null, 'X', null,
          null, null, null
        ]
        expect(getBestMove(cells, 'O', 3)).toBe(8)
      })

      it('should block opponent column win', () => {
        const cells: Cells = [
          'X', 'O', null,
          null, 'O', null,
          null, null, 'X'
        ]
        expect(getBestMove(cells, 'X', 3)).toBe(7)
      })
    })

    describe('strategic moves', () => {
      it('should prefer center on empty 3x3 board', () => {
        const cells: Cells = Array(9).fill(null)
        expect(getBestMove(cells, 'X', 3)).toBe(4)
      })

      it('should prefer center when available on 3x3', () => {
        const cells: Cells = [
          'X', null, null,
          null, null, null,
          null, null, 'O'
        ]
        expect(getBestMove(cells, 'X', 3)).toBe(4)
      })

      it('should prefer corner when center taken', () => {
        const cells: Cells = [
          null, null, null,
          null, 'X', null,
          null, null, null
        ]
        const move = getBestMove(cells, 'O', 3)
        expect([0, 2, 6, 8]).toContain(move)
      })

      it('should choose from available centers on 4x4 board', () => {
        const cells: Cells = Array(16).fill(null)
        const move = getBestMove(cells, 'X', 4)
        // Centers on 4x4 are: 5, 6, 9, 10
        expect([5, 6, 9, 10]).toContain(move)
      })

      it('should fall back to any available move', () => {
        const cells: Cells = [
          'X', 'O', 'X',
          'X', 'O', 'O',
          'O', 'X', null
        ]
        expect(getBestMove(cells, 'X', 3)).toBe(8)
      })
    })

    describe('edge cases', () => {
      it('should return -1 when no moves available', () => {
        const cells: Cells = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X']
        expect(getBestMove(cells, 'X', 3)).toBe(-1)
      })

      it('should handle 1x1 board', () => {
        expect(getBestMove([null], 'X', 1)).toBe(0)
      })

      it('should handle 2x2 board', () => {
        const cells: Cells = [null, null, null, null]
        const move = getBestMove(cells, 'X', 2)
        // On 2x2, centers are [0,1,2,3] and corners are [0,1,2,3]
        expect([0, 1, 2, 3]).toContain(move)
      })

      it('should work correctly on 4x4 board with complex state', () => {
        const cells: Cells = [
          'X', 'O', null, null,
          'O', 'X', null, null,
          null, null, null, null,
          null, null, null, null
        ]
        const move = getBestMove(cells, 'X', 4)
        expect(move).toBeGreaterThanOrEqual(0)
        expect(move).toBeLessThan(16)
        expect(cells[move]).toBeNull()
      })
    })
  })
})