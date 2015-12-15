App.Views.Game = Backbone.View.extend({
    tagName: 'div',
    id: 'game',

    initialize: function(m, n) {
        this.m = m;
        this.n = n;
        this.render();
    },

    render: function() {
        var lastClicked;
        var grid = this.createGrid(this.m, this.n, function(el,row,col,i){
            console.log("You clicked on element:",el);
            console.log("You clicked on row:",row);
            console.log("You clicked on col:",col);
            console.log("You clicked on item #:",i);

            el.className='clicked';
            if (lastClicked) lastClicked.className='';
            lastClicked = el;
        });
        this.$el.append(grid);
        return this;
    },

    createGrid: function ( rows, cols, callback ){
        var i=0;
        var $grid = $('<table>');
        $grid.attr('class', 'grid');
        for (var r = 0; r < rows; ++r){
            var tr = $('<tr>');
            $grid.append(tr);
            for (var c = 0; c < cols; ++c){
                var cell = $('<td>');
                tr.append(cell);
                cell.html = ++i;
                cell.on('click',(function(el,r,c,i){
                    return function(){
                        callback(el,r,c,i);
                    };
                })(cell,r,c,i));
            }
        }
        return $grid;
    },

    leave: function() {
        this.off();
        this.remove();
    }
});
