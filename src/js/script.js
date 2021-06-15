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

//*             Disable image downloads

const images = document.querySelectorAll('img');
images.forEach((image) => {
    image.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
});

//*             Modal

const modal = document.getElementById('myModal');
const modalImg = document.getElementById('img01');
const captionText = document.getElementById('caption');
const myImages = document.querySelectorAll('.myImg');
const closeModalButton = document.getElementsByClassName('close')[0];

//*           Open modal

myImages.forEach((myImage) => {
    myImage.addEventListener('click', () => {
        body.classList.add('hidden');
        modal.style.display = 'block';
        modalImg.src = myImage.src;
        captionText.innerHTML = myImage.alt;
    });
});

//*           Close Modal by button

let closeModalByButton = () => {
    modal.style.display = 'none';
    body.classList.remove('hidden');
};
closeModalButton.addEventListener('click', closeModalByButton);

//*           Close Modal by ESCAPE

let closeModalByEscape = (event) => {
    if (event.key == 'Escape') {
        modal.style.display = 'none';
        body.classList.remove('hidden');
    }
};
window.addEventListener('keydown', closeModalByEscape);

// !Select all links with hashes
// !smooth block arrow-button

//*             Anchors

const anchors = document.querySelectorAll('a[href*="#"]');
anchors.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        event.preventDefault();
        const blockID = anchor.getAttribute('href').substr(1);
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    });
});
//*        Hide ArrowToTop by default

const arrowToTop = document.getElementById('arrow');
const arrowClassLists = arrowToTop.classList;
arrowToTop.style.display = 'none';

arrowClassLists.forEach((arrowClassList) => {
    if (arrowClassList == 'arrow-hide') {
        arrowToTop.style.display = 'none';
    }
});

//*        Hide arrowToTop

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        arrowToTop.style.display = 'flex';
        arrowToTop.classList.remove('arrow-hide');
    } else {
        arrowToTop.classList.add('arrow-hide');
    }
});

//*         add alert to redirect to social

let socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach((socialLink) => {
    socialLink.addEventListener('click', (event) => {
        event.preventDefault();
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
                window.location = event.currentTarget.href;
            }
        }
    });
});
