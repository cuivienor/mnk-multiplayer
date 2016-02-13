App.Models.Board = Backbone.Model.extend({
    initialize: function(attrs, ops) {
        var that = this;
        
        App.socket.emit('getState', 'Boo');
        
        App.socket.on('state', function(board) {
            console.log('Setting Model Board');
            that.set({board: board});
        });

        App.socket.on('move', function(board){
            that.set({board: board});
        });
    }    
});
