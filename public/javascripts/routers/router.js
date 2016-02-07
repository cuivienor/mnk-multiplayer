App.Routers.Main = Support.SwappingRouter.extend({

    initialize: function(options) {
        this.el = $('#main-container');
    },

    
    routes: {
        "": "index"
    },


    index: function() {
        var view = new App.Views.Game();
        this.swap(view);
        App.socket.on('move', view.update);

    },
    
    games: function() {
        var view = new App.Views.games();
        this.swap(view);
    },

    modes: function(game_id) {
        var view = new App.Views.modes();
        this.swap(view);
    },

    play: function(game_id, mode_id) {
        console.log(game_id, mode_id);
        if ((game_id === 1) && (mode_id === 1)) {
        //     var game = new App.Models.Game({m: 3, n: 3, k: 3, p: 1, q: 1});
        //     var player1 = new App.Models.Player({name: "Peter", token: "X"});
        //     var player2 = new App.Models.Player({name: "George", token: "O"});
            //     game.set({p1: player1, p2: player2});
            var view = new App.Views.Game(3, 3);
            this.swap(view);
        }
        
    }
});
