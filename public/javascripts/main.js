$(document).ready(function() {
    $('.delete-goal').on('click', function(e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        
        $.ajax({
            type: 'DELETE',
            url: '/goals/delete/'+id,
            success: function(response) {
                window.location.href = '/goals';
            },
            error: function(err) {
                console.log('dasdada');
                console.log(err);
            },
        });
    });
})