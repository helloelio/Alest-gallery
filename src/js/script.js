const body = document.querySelector('.body');
let loader = document.querySelector('.loader-wrapper');
let closeModalButton = document.getElementsByClassName('close')[0];
// функция которая при каждой перезагрузке странницы кидает пользователя к верху страницы
// *TODO: optimization
window.document.addEventListener('DOMContentLoaded', () =>
    window.scrollTo({ top: 0 })
);
// задержка на прокрутку страницы чтобы успел прогрузиться 'loader'
// *TODO: optimization
let deleteLoader = () => loader.parentNode.removeChild(loader);
setTimeout(deleteLoader, 3500);
// *TODO: optimization
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

//*                     MODAL

let modal = document.getElementById('myModal');
let modalImg = document.getElementById('img01');
let captionText = document.getElementById('caption');
const myImages = document.querySelectorAll('.myImg');
for (let myImage of myImages) {
    myImage.addEventListener('click', function (e) {
        e.preventDefault();
        body.classList.add('hidden');
        modal.style.display = 'block';
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    });
}
let closeModal = (e) => {
    modal.style.display = 'none';
    body.classList.remove('hidden');
};
closeModalButton.addEventListener('click', closeModal);

// *TODO: change from jquery to vanila JS
// !Select all links with hashes
const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const blockID = anchor.getAttribute('href').substr(1);
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    });
}
// !smooth block arrow-button
//*my
let arrowToTop = document.getElementById('arrow');
arrowToTop.style.display = 'none';
arrowToTop.classList.add('arrow-hide');
let hideButton = () => {
    if (arrowToTop.classList[1] == 'arrow-hide') {
        arrowToTop.style.display = 'none';
    }
};
//*my
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        arrowToTop.style.display = 'flex';
        arrowToTop.classList.remove('arrow-hide');
    } else {
        arrowToTop.classList.add('arrow-hide');
        setTimeout(hideButton, 3500);
    }
});
