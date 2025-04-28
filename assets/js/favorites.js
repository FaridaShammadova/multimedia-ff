import base_url from "./helper.js";

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelector(".cards");
  const favoriteIds = (JSON.parse(localStorage.getItem("favs")) || []).map(String);

  const favIcon = document.querySelector(".header-icon.fa-heart");
  if (favIcon) {
    favIcon.addEventListener("click", () => {
      window.location.href = "favorites.html";
    });
  }

  if (window.location.pathname.includes("favorites.html")) {
    fetch(base_url)
      .then(res => {
        if (!res.ok) throw new Error("Some error occurred.");
        return res.json();
      })
      .then(products => {
        const favoriteProducts = products.filter(product =>
          favoriteIds.includes(String(product.id))
        );

        if (favoriteProducts.length === 0) {
          cards.innerHTML = "<p>No favorites added yet.</p>";
          return;
        }

        favoriteProducts.forEach(product => {
          const card_wrapper = document.createElement("div");
          card_wrapper.className = "card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center";

          card_wrapper.innerHTML = `
            <div class="card" style="width: 18rem;">
              <div class="card-img">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <!-- Favori ikonu -->
                <button class="favorite-btn">
                  <i class="${favoriteIds.includes(String(product.id)) ? "fa-solid" : "fa-regular"} fa-heart card-icon" data-id="${product.id}"></i>
                </button>
              </div>
              
              <div class="card-body">
                <p class="rating-star">&#11088; &#11088; &#11088; &#11088; &#11088;</p>
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">$ ${product.price}</p>
              </div>
            </div>
          `;

          cards.appendChild(card_wrapper);
        });


        const allFavBtns = document.querySelectorAll(".card-icon");
        allFavBtns.forEach((btn) => {
          btn.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            let favorites = JSON.parse(localStorage.getItem("favs")) || [];

            if (!favorites.includes(id)) {
              favorites.push(id);
              e.target.classList.replace("fa-regular", "fa-solid");
            }
            else {
              favorites = favorites.filter(favId => favId !== id);
              e.target.classList.replace("fa-solid", "fa-regular");
            }

            localStorage.setItem("favs", JSON.stringify(favorites));

            if (window.location.pathname.includes("favorites.html")) {
              e.target.closest(".card-wrapper").remove();

              if (cards.children.length === 0) {
                cards.innerHTML = "<p>No favorites added yet.</p>";
              }
            }
          });
        });
      })
      .catch(err => {
        console.log(err);
        cards.innerHTML = "<p>Error loading favorites.</p>";
      });
  }

  const btn = document.getElementById("scrollTopBtn");
  window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };

  btn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
