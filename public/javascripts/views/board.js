App.Views.Board = Support.CompositeView.extend({
    tagName: 'table',

    // template: _.template($('#board-template').text()),
    
    render: function() {
        this.template = _.template($('#board-template').text());
        this.$el.html(this.template());
        return this;
    }
});
