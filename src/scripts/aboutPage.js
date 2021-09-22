import shared from './modules/shared.js';
import setVideoControls from './modules/setVideoControls.js';
import SimpleBar from 'simplebar';
import Swiper, { Navigation, Scrollbar } from 'swiper';

const wrapVideoElements = document.getElementsByClassName("list-videos__item");
const hideIconClass = 'list-videos__play--opacity-0';
const videoElementClass = 'list-videos__video';
const iconPlayClass = 'list-videos__play';

shared();

setVideoControls({
  wrapVideoElements,
  hideIconClass,
  videoElementClass,
  iconPlayClass
});

const descriptionElement = document.querySelector('.article-about__description');
new SimpleBar(descriptionElement, {
  autoHide: false,
  scrollbarMinSize: 90,
});

Swiper.use([Navigation, Scrollbar]);

const swiper = new Swiper('#swiper-other-bloggers', {
  direction: 'horizontal',

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
    snapOnRelease: true,
  },

  breakpoints: {

    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },

    1200: {
      slidesPerView: 4,
      spaceBetween: 20,
    }
  }
});
