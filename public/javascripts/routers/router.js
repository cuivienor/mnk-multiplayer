App.Routers.main = Support.SwappingRouter.extend({
    initialize: function(options) {
        var that = this;
        
        this.el = $('#main-container');

        $(document).on('click', 'a:not([data-bypass])', function (evt) {

            var href = $(this).attr('href');
            var protocol = this.protocol + '//';

            if (href.slice(protocol.length) !== protocol) {
                evt.preventDefault();
                that.navigate(href, true);
            }
        });
    },

    
    routes: {
        "": "index",
        "games": "games",
        "games/:game_id/modes": "modes",
        "games/:game_id/modes/:mode_id": "play"
    },

    index: function() {
        this.navigate("games", {trigger: true});
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
