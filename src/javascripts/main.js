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
                console.log(err);
            },
        });
    });
    // trebuie alta metoda (sa nu trebuiasca neaparat sa dea refresh)
    $('.face').on('click', function(e) {
        let $target = $(e.target);
        const id = $target.attr('data-id'); // db index
        $.ajax({
            type: 'POST',
            url: '/goals/increment/'+id,
            beforeSend() {
                window.location.href = '/goals';
            },
            error(err) {
                console.log(err);
            },
        });
    });
})
function toggleDetails(e) {
    const index = this.parentNode.dataset.index;
    
    const firstPart = document.querySelector(`.goal-box[data-index="${index}"]`);
    const secondPart = document.querySelector(`.goal-details[data-index="${index}"]`);

    firstPart.classList.toggle('active');
    secondPart.classList.toggle('active');
}

function toggleAnimation(e) {
    const goalBox = this.parentNode;
    console.log(goalBox);
    goalBox.classList.add('active-click');
    // refactor -> transitionend event listener
    setTimeout(()=> {
        goalBox.classList.remove('active-click');
    }, 300)
}

const goalBoxIcons = document.querySelectorAll('.goal-box-icon');
const goalDetailsIcons = document.querySelectorAll('.goal-details-icon');
const faces = document.querySelectorAll('.face'); 

goalBoxIcons.forEach(icon => {
    icon.addEventListener('click', toggleDetails);
});
goalDetailsIcons.forEach(icon => {
    icon.addEventListener('click', toggleDetails);
});
faces.forEach(face => { 
    face.addEventListener('click', toggleAnimation);
});