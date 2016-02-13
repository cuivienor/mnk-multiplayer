# mnk-multiplayer

List of references to used code

[Backbone Push State Pattern](http://stackoverflow.com/questions/9328513/backbone-js-and-pushstate)

[Backbone Rails Book](http://stackoverflow.com/questions/9328513/backbone-js-and-pushstate)


## Mnk-Game Object

### Own Properties
- `board`
- `m`
- `n`
- `k`
- `p`
- `q`
- `maxPlayers`
- `players`
- `isWon`
- `isDraw`
- `isOver`

### Methods
- `move(moveSpec)` current player makes a move
- `nextPlayer()` switches current player to next player
- `addPlayer(player)`
- `isFull()`
- `isEmpty()`
- `getHorizontal(i, j)`
- `getVertical(i, j)`
- `getRightDiagonal(i, j)`
- `getLeftDiagonal(i, j)`
- `lengthOfStreak(array, value)`
- `score(i, j)`
- `checkWin(i, j)`
- `checkDraw()`
- `setRadio(radio, url)`
- `emit(name msg)`

### Public
- `move(moveSpec)`
- `addPlayer(player)`
- `removePlayer(player)` *To be Implemented*


## Player Object

### Own Properties
- `name`

### Methods
- `setValue(value)`
- `addToGame(game)`
- `move(spec)`
