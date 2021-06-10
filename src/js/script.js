let body = document.querySelector('.body');
// функция которая при каждой перезагрузке странницы кидает пользователя к верху страницы
// *TODO: change from jquery to vanila JS
// $(window).on('beforeunload', function () {
//     $(window).scrollTop(0);
// });
// *TODO: maybe fix this func and optimization
window.document.addEventListener('DOMContentLoaded', () => {
    window.document.scrollY = '0';
});
// задержка на прокрутку страницы чтобы успел прогрузиться 'loader'
// *TODO: change from jquery to vanila JS
// $(window).on('load', function () {
//     $('.loader-wrapper').fadeOut(2500);
// });
let loader = document.querySelector('.loader-wrapper');
console.log(loader);
let disableLoader = () => {
    loader.parentNode.removeChild(loader);
    // loader.classList.toggle('loader-wrapper');
};
setTimeout(disableLoader, 2500);
// по умолчанию у боди класс хидден, функции с задержкой в 2.5 сек убираем этот класс чтобы успела закончиться анимация
// !my function
let disableScroll = () => body.classList.remove('hidden');
setTimeout(disableScroll, 2500);
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
span.onclick = function () {
    modal.style.display = 'none';
    body.classList.remove('hidden');
};
// *TODO: change from jquery to vanila JS
// !Select all links with hashes
// $('a[href*="#"]')
//     // !Remove links that don't actually link to anything
//     .not('[href="#"]')
//     .not('[href="#0"]')
//     .click(function (event) {
//         // On-page links
//         if (
//             location.pathname.replace(/^\//, '') ==
//                 this.pathname.replace(/^\//, '') &&
//             location.hostname == this.hostname
//         ) {
//             // Figure out element to scroll to
//             var target = $(this.hash);
//             target = target.length
//                 ? target
//                 : $('[name=' + this.hash.slice(1) + ']');
//             // Does a scroll target exist?
//             if (target.length) {
//                 // Only prevent default if animation is actually gonna happen
//                 event.preventDefault();
//                 $('html, body').animate(
//                     {
//                         scrollTop: target.offset().top,
//                     },
//                     1000,
//                     function () {
//                         // Callback after animation
//                         // Must change focus!
//                         var $target = $(target);
//                         $target.focus();
//                         if ($target.is(':focus')) {
//                             // Checking if the target was focused
//                             return false;
//                         } else {
//                             $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
//                             $target.focus(); // Set focus again
//                         }
//                     }
//                 );
//             }
//         }
//     });
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
