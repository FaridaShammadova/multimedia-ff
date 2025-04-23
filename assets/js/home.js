import getData from "./services.js";

getData();


new Swiper('.swiper', {
  slidesPerView: 2,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


window.onscroll = function () {
  const btn = document.getElementById("scrollTopBtn");
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

document.getElementById("scrollTopBtn").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const favIcon = document.querySelector(".header-icon.fa-heart");

  favIcon.addEventListener("click", () => {
    window.location.href = "favorites.html";
  });
});
