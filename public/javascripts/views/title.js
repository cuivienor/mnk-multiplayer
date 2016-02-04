App.Views.Title = Support.CompositeView.extend({
    tagName: 'h1',

    template: _.template('<%= title %>'),

    render: function() {
        this.$el.html(this.template({title: 'Tic-Tac-Toe'}));
        return this;
    }
});
