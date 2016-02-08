App.Views.Game = Support.CompositeView.extend({
    tagName: 'div',
    id: 'game',


    initialize: function() {
        this.template = _.template($('#game-template').text());
        _.bindAll(this, 'render');
    },

    render: function() {
        this.renderLayout();
        this.renderTitle();
        this.renderNotification();
        this.renderBoard();
        return this;
    },

    renderLayout: function() {
        this.$el.html(this.template());
    },

    renderTitle: function() {
        var title = new App.Views.Title();
        var titleContainer = this.$('#title');
        this.renderChildInto(title, titleContainer);
    },

    renderNotification: function() {
        var notification = new App.Views.Notification();
        var notContainer = this.$('#notification');
        this.renderChildInto(notification, notContainer);
        App.socket.on('notification', notification.update);
    },

    renderBoard: function() {
        var board = new App.Views.Board();
        var boardContainer = this.$('#board');
        this.renderChildInto(board, boardContainer);
        App.socket.on('move', board.update);
    },

    update: function(spec) {
    }
    
});
