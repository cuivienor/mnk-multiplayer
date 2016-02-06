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
        // App.socket = App.socket.to(challangeId);
        //test
        App.socket.on('move', function(msg) {
            console.log(msg);
        });
    }
};
var Support = {};
