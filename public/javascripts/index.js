$(function() {
    $('#main-container').on('click', function(evt) {
        $.ajax({
            method: 'GET',
            url: '/getLink/' + evt.target.id,
            dataType: 'json',
            
            success: function() {
            },

            error: function() {

            }
            
        });
    });
});


