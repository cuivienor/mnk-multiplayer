App.Routers.main = Support.SwappingRouter.extend({
    initialize: function(options) {
        this.el = $('#main-container');
    },
    
    routes: {
        "games": "games",
        "modes": "modes"
    },

    games: function() {
        var view = new App.Views.games();
        this.swap(view);
    },

    modes: function() {
        var view = new App.Views.modes();
        this.swap(view);
    }
});
