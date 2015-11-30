App.Views.games = Backbone.View.extend({
    tagName: 'div',
    id: 'games-view',

    initialize: function() {
        $('#main-container').append(this.el);
        this.render();
    },

    render: function() {
        this.$el.html('games rendered yo');
        return this;
    },
    
    leave: function() {
        this.remove();
    }    
});
