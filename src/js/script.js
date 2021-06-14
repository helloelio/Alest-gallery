const body = document.querySelector('.body');
// функция которая при каждой перезагрузке странницы кидает пользователя к верху страницы
// *TODO: optimization
const scrollToTop = () => {
    window.scrollTo({ top: 0 });
};
window.document.addEventListener('DOMContentLoaded', scrollToTop);
// задержка на прокрутку страницы чтобы успел прогрузиться 'loader'
// *TODO: optimization

//*             Loader

let loader = document.querySelector('.loader-wrapper');
let deleteLoader = () => loader.parentNode.removeChild(loader);
setTimeout(deleteLoader, 3500);
// *TODO: optimization

//*             Disable Scroll

let disableScroll = () => body.classList.remove('hidden');
setTimeout(disableScroll, 3500);
// запрещаем при нажатии правой кнопкой на картинку сохранять ее
// *TODO: change from jquery to vanila JS (disable download images)

// $('img').mousedown(function (e) {
//     if (e.button == 2) {
//         // right click
//         return false; // do nothing!
//     }
// });

//*             Modal

let modal = document.getElementById('myModal');
let modalImg = document.getElementById('img01');
let captionText = document.getElementById('caption');
let myImages = document.querySelectorAll('.myImg');
myImages.forEach((myImage) => {
    myImage.addEventListener('click', () => {
        body.classList.add('hidden');
        modal.style.display = 'block';
        modalImg.src = myImage.src;
        captionText.innerHTML = myImage.alt;
    });
});

let openModal = () => {};

//*           Close Modal by button

let closeModalButton = document.getElementsByClassName('close')[0];
let closeModalByButton = () => {
    modal.style.display = 'none';
    body.classList.remove('hidden');
};
closeModalButton.addEventListener('click', closeModalByButton);

//*           Close Modal by ESCAPE

let closeModalByEscape = (e) => {
    if (e.key == 'Escape') {
        modal.style.display = 'none';
        body.classList.remove('hidden');
    }
};
window.addEventListener('keydown', closeModalByEscape);

// *TODO: change from jquery to vanila JS
// !Select all links with hashes
// !smooth block arrow-button

//*             Anchors

const anchors = document.querySelectorAll('a[href*="#"]');
anchors.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const blockID = anchor.getAttribute('href').substr(1);
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    });
});
//*        Hide ArrowToTop by default

let arrowToTop = document.getElementById('arrow');
arrowToTop.style.display = 'none';
arrowToTop.classList.add('arrow-hide');
let hideButton = () => {
    if (arrowToTop.classList[1] == 'arrow-hide') {
        arrowToTop.style.display = 'none';
    }
};

//*        Hide arrowToTop

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        arrowToTop.style.display = 'flex';
        arrowToTop.classList.remove('arrow-hide');
    } else {
        arrowToTop.classList.add('arrow-hide');
        setTimeout(hideButton, 3500);
    }
});

//*         add alert to redirect

let socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach((socialLink) => {
    socialLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (document.documentElement.lang == 'ru') {
            let applyRu = confirm(
                'Вы уверены что хотите перейти на: ' + e.currentTarget.href
            );
            if (applyRu) {
                window.location = e.currentTarget.href;
            }
        }
        if (document.documentElement.lang == 'en') {
            let applyEn = confirm('You sure to go: ' + e.currentTarget.href);
            if (applyEn) {
                window.location = e.currentTarget.href;
            }
        }
    });
});
