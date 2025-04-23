import base_url from "./helper.js";

const favorites = JSON.parse(localStorage.getItem("favs")) || [];

function getData() {
    fetch(base_url)
        .then(res => {
            if (!res.ok) throw new Error("Some error occurred.");
            return res.json();
        })
        .then(data => drawCards(data))
        .catch(err => console.log(err))
}

function drawCards(products) {
    const cards = document.querySelector(".cards");

    products.forEach(product => {
        const card_wrapper = document.createElement("div");
        card_wrapper.className = "card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center";

        card_wrapper.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <div class="card-img">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">

                        <button>
                            <i class="${favorites.find(q => q === product.id) ? "fa-solid" : "fa-regular"} fa-heart card-icon" data-id="${product.id}"></i>
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
            const idx = favorites.findIndex(product => product == id);

            if (idx === -1) {
                const product = products.find(product => product.id == id);
                favorites.push(product.id);

                btn.classList.replace("fa-regular", "fa-solid");
            } else {
                favorites.splice(idx, 1);

                btn.classList.replace("fa-solid", "fa-regular");
            }

            localStorage.setItem("favs", JSON.stringify(favorites));
        })
    })
}


export default getData;