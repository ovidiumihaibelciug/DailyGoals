import '../stylesheets/style.scss';

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
function showDetails(e) {
    const index = this.parentNode.dataset.index;
    
    const firstPart = document.querySelector(`.goal-box[data-index="${index}"]`);
    const secondPart = document.querySelector(`.goal-details[data-index="${index}"]`);

    firstPart.classList.remove('active');
    secondPart.classList.add('active');
}
function hideDetails(e) {
    const index = this.parentNode.dataset.index;
    
    const firstPart = document.querySelector(`.goal-box[data-index="${index}"]`);
    const secondPart = document.querySelector(`.goal-details[data-index="${index}"]`);

    firstPart.classList.add('active');
    secondPart.classList.remove('active');
}

let goalBoxIcons = document.querySelectorAll('.goal-box-icon');
let goalDetailsIcons = document.querySelectorAll('.goal-details-icon');

goalBoxIcons.forEach(icon => {
    icon.addEventListener('click', showDetails);
});
goalDetailsIcons.forEach(icon => {
    icon.addEventListener('click', hideDetails);
});