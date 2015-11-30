App.Views.modes = Backbone.View.extend({
    tagName: 'div',
    id: 'modes-view',

    initialize: function() {
        $('#main-container').append(this.el);
        this.render();
    },

    render: function() {
        this.$el.html('modes rendered yo');
        return this;
    },
    
    leave: function() {
        this.off();
        this.remove();
    }    
});
