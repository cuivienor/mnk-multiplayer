App.Views.Notification = Support.CompositeView.extend({
    tagName: 'p',
    id: 'msg',

    initialize: function() {
        _.bindAll(this, 'update');
    },

    render: function() {
        this.template = _.template($('#notification-template').text());
        this.$el.html(this.template());
        return this;
    },

    update: function(msg) {
        console.log('msg was received');
        this.$el.text(msg);
    }
});
