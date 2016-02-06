App.Views.Board = Support.CompositeView.extend({
    tagName: 'table',

    events: {
        'click': 'handleClick'
    },
    
    
    render: function() {
        this.template = _.template($('#board-template').text());
        this.$el.html(this.template());
        return this;
    },

    handleClick: function(evt) {
        var column = evt.target.cellIndex;
        var row = $(evt.target.parentNode).index();
        App.socket.emit('move', column);
        console.log('column: ' + column);
        console.log('row: ' + row);
    }
});
