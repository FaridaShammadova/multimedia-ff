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

  fetch(base_url)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch products");
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
    })
    .catch(err => {
      console.log(err);
      cards.innerHTML = "<p>Error loading favorites.</p>";
    });



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


document.addEventListener("DOMContentLoaded", () => {
  const favIcon = document.querySelector(".header-icon.fa-heart");

  favIcon.addEventListener("click", () => {
    window.location.href = "favorites.html";
  });
});
