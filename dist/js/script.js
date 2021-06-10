"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var body = document.querySelector('.body'); // функция которая при каждой перезагрузке странницы кидает пользователя к верху страницы
// *TODO: change from jquery to vanila JS
// $(window).on('beforeunload', function () {
//     $(window).scrollTop(0);
// });
// *TODO: maybe fix this func and optimization

window.document.addEventListener('DOMContentLoaded', function () {
  window.document.scrollY = '0';
}); // задержка на прокрутку страницы чтобы успел прогрузиться 'loader'
// *TODO: change from jquery to vanila JS
// $(window).on('load', function () {
//     $('.loader-wrapper').fadeOut(2500);
// });

var loader = document.querySelector('.loader-wrapper');
console.log(loader);

var disableLoader = function disableLoader() {
  loader.parentNode.removeChild(loader); // loader.classList.toggle('loader-wrapper');
};

setTimeout(disableLoader, 2500); // по умолчанию у боди класс хидден, функции с задержкой в 2.5 сек убираем этот класс чтобы успела закончиться анимация
// !my function

var disableScroll = function disableScroll() {
  return body.classList.remove('hidden');
};

setTimeout(disableScroll, 2500); // запрещаем при нажатии правой кнопкой на картинку сохранять ее
// *TODO: change from jquery to vanila JS
// $('img').mousedown(function (e) {
//     if (e.button == 2) {
//         // right click
//         return false; // do nothing!
//     }
// });
// modal

var modal = document.getElementById('myModal');
var modalImg = document.getElementById('img01');
var captionText = document.getElementById('caption');
var myImages = document.querySelectorAll('.myImg'); // !my function

var _iterator = _createForOfIteratorHelper(myImages),
    _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var myImage = _step.value;
    myImage.addEventListener('click', function (e) {
      e.preventDefault();
      body.classList.add('hidden');
      modal.style.display = 'block';
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    });
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

var span = document.getElementsByClassName('close')[0];

span.onclick = function () {
  modal.style.display = 'none';
  body.classList.remove('hidden');
}; // *TODO: change from jquery to vanila JS
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


var arrowToTop = document.getElementById('arrow');
arrowToTop.style.display = 'none';
arrowToTop.classList.add('arrow-hide');

var hideButton = function hideButton() {
  if (arrowToTop.classList[1] == 'arrow-hide') {
    arrowToTop.style.display = 'none';
  }
}; // !my function


window.addEventListener('scroll', function () {
  if (window.scrollY > 500) {
    arrowToTop.style.display = 'flex';
    arrowToTop.classList.remove('arrow-hide');
  } else {
    arrowToTop.classList.add('arrow-hide');
    setTimeout(hideButton, 3500); // arrowToTop.style.display = 'none';
  }
});