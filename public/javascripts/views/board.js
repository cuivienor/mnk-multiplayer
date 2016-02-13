App.Views.Board = Support.CompositeView.extend({

    initialize: function() {
        _.bindAll(this, 'update', 'render');
        this.model.on('change', this.update);
    },
    
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
        var col = evt.target.cellIndex;
        var row = $(evt.target.parentNode).index();
        var moveSpec = {row: row, col: col};
        App.socket.emit('move', moveSpec);
    },

    update: function(spec) {
        this.model.get('board').forEach(function(row, rowIndex) {
            row.forEach(function(cell, colIndex) {
                if (cell === 1){
                    $('tbody tr').eq(rowIndex).find('td').eq(colIndex).attr('class', 'green');
                } else if (cell === 2) {
                    $('tbody tr').eq(rowIndex).find('td').eq(colIndex).attr('class', 'red');
                } else {
                    $('tbody tr').eq(rowIndex).find('td').eq(colIndex).attr('class', '');
                }
            });
        });
    }
});
