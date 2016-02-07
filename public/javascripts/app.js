var App = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    socket: io(),
    
    initialize: function() {

        var mainRouter = new App.Routers.Main();
        Backbone.history.start();
        var url = $(location).attr('href').split('/').pop();

        App.socket.emit('register', url);
    }
};
var Support = {};
