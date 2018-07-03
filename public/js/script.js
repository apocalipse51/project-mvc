let $ = document.querySelector.bind(document);

let btn = $('.change-bg');

btn.addEventListener('click', (e) => {
    let container = $('.container');
    if(container.classList.contains('red')) {
        container.classList.remove('red');
        container.classList.add('blue');
    } else {
        container.classList.remove('blue');
        container.classList.add('red');
    }    
});