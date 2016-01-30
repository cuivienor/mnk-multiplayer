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
            return 'Wrong Player';
        }
        if (this.board[i][j] !== 0) {
            return 'Can\'t make a move';
        }
        this.board[i][j] = this.currentPlayer.value;
        this.changePlayer();
        return 'Moved';
    };

    this.changePlayer = function() {
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1;
        }
    };

    
}

