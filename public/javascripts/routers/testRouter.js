App.Routers.TestRouter = Support.SwappingRouter.extend({
    initialize: function(options) {
        var that = this;
        this.el = $('#main-container');

        $(document).on('click', 'a:not([data-bypass])', function (evt) {
            
            var href = $(this).attr('href');
            var protocol = this.protocol + '//';

            if (href.slice(protocol.length) !== protocol) {
                evt.preventDefault();
                that.navigate(href, true);
            }
        });
    },

    routes: {
        "": "name",
        "play": "play"
    },

    name: function() {
        var view = new App.Views.namePrompt();
    },

    play: function() {
        
    }    
});
