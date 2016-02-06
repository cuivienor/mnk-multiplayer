var App = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    
    initialize: function() {

        var mainRouter = new App.Routers.Main();
        Backbone.history.start();
        var challangeId = $(location).attr('href').split('/').pop();
        App.socket = io();
        App.socket.emit('register', challangeId);

    }
};
var Support = {};
