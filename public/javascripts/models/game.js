App.Models.Game = Backbone.Model.extend({
    initialize: function(attrs, ops) {
        this.set({board: new App.Models.Board(attrs.m, attrs.n)});
    }
});
