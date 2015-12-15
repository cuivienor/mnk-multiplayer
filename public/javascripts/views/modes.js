App.Views.modes = Backbone.View.extend({
    tagName: 'div',
    id: 'modes-view',

    initialize: function() {
        // $('#main-container').append(this.el);
        // this.render();
    },

    render: function() {
        var button = $('<a>').attr('href', 'games/1/modes/1')
            .attr('class', 'pure-button')
            .text('Play On This Computer');
        this.$el.append(button);
        return this;
    },
    
    leave: function() {
        this.off();
        this.remove();
    }    
});
