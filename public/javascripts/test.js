console.log('test be linked');

var socket = io();

var App = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    
    initialize: function() {
        App.router = new App.Routers.TestRouter();
        Backbone.history.start();
    }
};


var Support = {};

Support.SwappingRouter = function(options) {
    Backbone.Router.apply(this, [options]);
};

_.extend(Support.SwappingRouter.prototype, Backbone.Router.prototype, {
    swap: function(newView) {
        if (this.currentView && this.currentView.leave) {
            this.currentView.leave();
        }

        this.currentView = newView;

        $(this.el).empty().append(this.currentView.render().el);
    }
});
    
Support.SwappingRouter.extend = Backbone.Router.extend;


App.Views.Cell = Backbone.View.extend({
    className: 'cell',

    events: {
        'click': 'move'
    },
    
    initialize: function(options) {
        this.options = options;
    },
    
    render: function() {
        this.options.parrent.append(this.el);
    },

    move: function() {
        socket.emit('move', JSON.stringify(this.options));
    }
});

App.Views.Game = Backbone.View.extend({
    
    className: 'game-container',

    initialize: function(options) {
        for (var i = 0; i < 3; i++) {
            for(var j = 0; j < 3; j++) {
                var cell = new App.Views.Cell({parrent: this.$el, row: i, column: j});
                cell.render();
            }
        }
    },

    render: function() {
        return this;
    },

    leave: function() {
        this.off();
        this.remove();
    }
    
});

App.Views.NamePrompt = Backbone.View.extend({
    tagName: 'input',
    
    id: 'prompt',

    initialize: function() {
    },
    
    events: {
        'keydown': 'startGame'
    },

    startGame: function(evt) {
        console.log(evt.which);
        if (evt.which === 13) {
            App.router.navigate('play', true);
        }
    },

    render: function() {
        return this;
    },

    leave: function() {
        this.off();
        this.remove();
    }
    
});


App.Routers.TestRouter = Support.SwappingRouter.extend({
    initialize: function(options) {
        var that = this;
        this.el = $('#main-container');
    },

    routes: {
        "": "name",
        "play": "play"
    },

    name: function() {
        var view = new App.Views.NamePrompt({attributes: {type: 'text', placeholder: 'Name'}});
        this.swap(view);
        console.log(view);
    },

    play: function() {
        var view = new App.Views.Game();
        this.swap(view);
        console.log(view);
    }    
});

