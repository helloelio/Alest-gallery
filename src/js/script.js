let body = document.querySelector('.body');
// функция которая при каждой перезагрузке странницы кидает пользователя к верху страницы
// *TODO: maybe fix this func and optimization
window.document.addEventListener('DOMContentLoaded', () =>
    window.scrollTo({ top: 0 })
);
// задержка на прокрутку страницы чтобы успел прогрузиться 'loader'
// *TODO: maybe fix this func and optimization
let loader = document.querySelector('.loader-wrapper');
let deleteLoader = () => loader.parentNode.removeChild(loader);
let removeLoader = () => {
    loader.addEventListener('transitionend', deleteLoader());
};
setTimeout(removeLoader, 3500);

let disableScroll = () => body.classList.remove('hidden');
setTimeout(disableScroll, 3500);
// запрещаем при нажатии правой кнопкой на картинку сохранять ее
// *TODO: change from jquery to vanila JS
// $('img').mousedown(function (e) {
//     if (e.button == 2) {
//         // right click
//         return false; // do nothing!
//     }
// });
// modal
let modal = document.getElementById('myModal');
let modalImg = document.getElementById('img01');
let captionText = document.getElementById('caption');
const myImages = document.querySelectorAll('.myImg');
// !my function
for (let myImage of myImages) {
    myImage.addEventListener('click', function (e) {
        e.preventDefault();
        body.classList.add('hidden');
        modal.style.display = 'block';
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    });
}
let span = document.getElementsByClassName('close')[0];
span.onclick = () => {
    modal.style.display = 'none';
    body.classList.remove('hidden');
};
// *TODO: change from jquery to vanila JS
// !Select all links with hashes
// document.querySelectorAll('a[href^="#"').forEach((link) => {
//     link.addEventListener('click', function (e) {
//         e.preventDefault();
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     });
// });
const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const blockID = anchor.getAttribute('href').substr(1);
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    });
}
// !smooth block arrow-button

// !my function
let arrowToTop = document.getElementById('arrow');
arrowToTop.style.display = 'none';
arrowToTop.classList.add('arrow-hide');
let hideButton = () => {
    if (arrowToTop.classList[1] == 'arrow-hide') {
        arrowToTop.style.display = 'none';
    }
};
// !my function
window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
        arrowToTop.style.display = 'flex';
        arrowToTop.classList.remove('arrow-hide');
    } else {
        arrowToTop.classList.add('arrow-hide');
        setTimeout(hideButton, 3500);
        // arrowToTop.style.display = 'none';
    }
});
