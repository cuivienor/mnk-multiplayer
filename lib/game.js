"use strict"

function MnkGame(spec) {
    this.board = [];
    this.m = spec.m;
    this.n = spec.n;
    this.k = spec.k;
    this.p = spec.p || 1;
    this.q = spec.q || 1;
    this.maxPlayers = spec.maxPlayers || 2;
    this.players = [];
    this.isWon = false;
    this.isDraw = false;
    this.isOver = false;
    
    (() => {
        for (var row = 0; row < this.m; row++) {
            this.board.push([]);
            for (var col = 0; col < this.n; col++) {
                this.board[row].push(0);
            }
        }
    })();

    // current player makes a move
    // returns false if space is taken
    // returns true if move is made
    this.move = function(moveSpec) {
        if (!this.isFull()) {
            console.log('Game is not full yet');
            return false;
        }
        if (this.isOver) {
            console.log('Game is over. Can\'t move');
            return false;
        }
        let row = moveSpec.row,
            col = moveSpec.col;
        
        if (this.board[row][col] !== 0) {
            console.log('Move Forbidden (Board space not empty)');
            return false;
        }
        
        this.board[row][col] = this.currentPlayer.value;
        let newSpec = moveSpec;
        moveSpec.player = this.currentPlayer.value;
        this.emit('move', moveSpec);
        this.checkWin(row, col);
        this.checkDraw(row, col);
        if (!this.isOver) {
            this.nextPlayer();
        }
        return true;
    };

    // changes currentPlayer to the next one
    this.nextPlayer = function() {
        this.currentPlayer = this.players[(this.players.indexOf(this.currentPlayer) + 1) % this.players.length];
        this.emit('notification', 'Player ' + this.currentPlayer.value + '\s turn');
    };

    this.removePlayer = function(player) {
        this.players.splice(this.players.indexOf(player), 1);
    };

    // adds player to the game
    // if game full returns false
    // if success return true
    this.addPlayer = function(player) {
        if (this.isFull()) {
            console.log('Game full');
            return false;
        }
        
        this.players.push(player);
        if (this.isFull()) {
            var random = Math.floor((Math.random() * 2));
            this.currentPlayer = this.players[random];
        } else {
            this.emit('notification', 'Waiting for other player to connect');
        }
        console.log('Player ' + player.name + ' added');
        this.players[this.players.length - 1].setValue(this.players.length);
        return true;
    };

    // is the game full?
    this.isFull = function() {
        if (this.players.length === this.maxPlayers) {
            return true;
        } else {
            return false;
        }
    };

    // is the game empty
    this.isEmpty = function() {
        return !this.players.length;
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

    this.score = (i, j) => {
        return Math.max(this.lengthOfStreak(this.getHorizontal(i, j), this.board[i][j]),
		        this.lengthOfStreak(this.getVertical(i, j), this.board[i][j]),
		        this.lengthOfStreak(this.getLeftDiagonal(i, j), this.board[i][j]),
		        this.lengthOfStreak(this.getRightDiagonal(i, j), this.board[i][j]));
    };

    // does (i, j) win
    this.checkWin = (i, j) => {
        if (this.score(i, j) === this.k) {
            this.isOver = true;
            this.isWon = true;
            return true;
        } else {
            return false;
        }
    };

    this.checkDraw = function() {
        if (!this.isWon && this.moves === (this.m * this.k)) {
            this.isDraw = true;
            this.isOver = true;
            return true;
        } else {
            return false;
        }
    };

    this.setRadio = function(radio, url) {
        this.url = url;
        this.radio = radio;
    };

    this.emit = function(name, msg) {
        if (this.radio) {
            this.radio.to(this.url).emit(name, msg);
        }
    };
}

module.exports = MnkGame;
