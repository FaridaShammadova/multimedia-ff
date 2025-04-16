import { getData, getNewData } from "./services.js";

getData();
getNewData();


new Swiper('.swiper', {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });