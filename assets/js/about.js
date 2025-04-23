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

new Swiper('.swiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    slidesPerGroup: 1,
    loop: true,
    speed: 500,
    loopedSlides: 4,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


document.addEventListener("DOMContentLoaded", () => {
    const favIcon = document.querySelector(".header-icon.fa-heart");

    favIcon.addEventListener("click", () => {
        window.location.href = "favorites.html";
    });
});
