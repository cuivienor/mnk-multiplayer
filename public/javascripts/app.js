var App = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    
    initialize: function() {

        var mainRouter = new App.Routers.Main();
        Backbone.history.start();

    }
};
var Support = {};
