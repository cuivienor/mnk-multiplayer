var App = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    
    initialize: function() {
        var mainRouter = new App.Routers.main();
        Backbone.history.start();
    }
};

var Support = {};
