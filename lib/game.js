"use strict"

function Game(m, n, k, p, q, player1, player2) {
    this.board = [];
    this.m = m;
    this.n = n;
    this.k = k;
    this.p = p || 1;
    this.q = q || 1;
    
    this.player1 = player1;
    this.player2 = player2;

    this.currentPlayer = this.player1;

    (() => {
        for (var i = 0; i < m; i++) {
            this.board.push([]);
            for (var j = 0; j < n; j++) {
                this.board[i].push(0);
            }
        }
    })();


    this.move = function(i, j, player) {
        if (player !== this.currentPlayer) {
            return false;
        }
        if (this.board[i][j] !== 0) {
            return false;
        }
        this.board[i][j] = this.currentPlayer.value;
        if (this.win(i, j, player)) {
            return 'End';
        }
        this.changePlayer();
        return true;
    };

    this.changePlayer = function() {
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1;
        }
    };

    this.getHorizontal = (i, j) => {
	var start = Math.max(0, j - this.k + 1);
	var end = Math.min(j + this.k, this.m);
	return this.board[i].slice(start, end);
    };
    
    // get vertical
    this.getVertical = (i, j) => {
	var array = [];
	var start = Math.max(0, i - this.k + 1);
	var end = Math.min(i + this.k, this.n);
	for (var row = start; row < end; row++) {
	    array.push(this.board[row][j]);
	}
	return array;
    };

    
    // get right diagonal
    this.getRightDiagonal = (i, j) => {
	var array = [];
	var startColumn = Math.max(0, j - this.k + 1);
	var endColumn = Math.min(j + this.k, this.m);
	var startRow = Math.max(0, i - this.k + 1);
	var endRow = Math.min(i + this.k, this.n);
	var startDistance = Math.min(j - startColumn, i - startRow);
	startColumn = j - startDistance;
	startRow = i - startDistance;
	endRow = i + Math.min(endColumn - j, endRow - i);
	
	for (var row = startRow, column = startColumn; row < endRow; row++) {
	    array.push(this.board[row][column]);
	    column++;
	}
	return array;
    };
    
    // get left diagonal
    this.getLeftDiagonal = (i, j) => {
	var array = [];
	var startColumn = Math.max(0, j - this.k + 1);
	var endColumn = Math.min(j + this.k, this.m - 1);
	var startRow = Math.max(0, i - this.k + 1);
	var endRow = Math.min(i + this.k, this.n - 1);
	var startDistance = Math.min(j - startColumn, endRow - i);

	startColumn = j - startDistance;
	endRow = i + startDistance;
	endColumn = j + Math.min(endColumn - j, i - startRow);

	for (var row = endRow, column = startColumn; column <= endColumn; column++) {
	    array.push(this.board[row][column]);
	    row--;
	}
	return array;
    };


    // max sequence in an array returns the length of a streak
    this.lengthOfStreak = (array, value) => {
	var hot = false;
	var length = 0;
	var maxLength = 0;
	for (var i = 0; i < array.length; i++) {
	    if (array[i] === value) {
		length++;
		if (length > maxLength) {
		    maxLength = length;
		}
	    } else {
		length = 0;
	    }
	    hot = array[i];
	}
	return maxLength;
    };

    this.moveScore = (i, j, player) => {
        return Math.max(this.lengthOfStreak(this.getHorizontal(i, j), player.value),
		        this.lengthOfStreak(this.getVertical(i, j), player.value),
		        this.lengthOfStreak(this.getLeftDiagonal(i, j), player.value),
		        this.lengthOfStreak(this.getRightDiagonal(i, j), player.value));
    };

    this.win = (i, j, player) => {
        if (this.moveScore(i, j, player) === this.k) {
            return true;
        } else {
            return false;
        }
    };

}

module.exports.Game = Game;

// var p1 = new Player('Peter', 1);
// var p2 = new Player('George', 2);
// var game = new Game(3, 3, 3, 1, 1, p1, p2);
// game.move(0, 0, p1);
// game.move(1, 1, p2);
// game.move(0, 1, p1);
// game.move(1, 2, p2);
// game.move(0, 2, p1);

