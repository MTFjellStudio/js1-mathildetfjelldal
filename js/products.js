import { fetchProducts } from "./api.js";

async function displayCategoryProducts() {
  const products = await fetchProducts();

  const womenProductGrid = document.querySelector(".women-product-grid");
  const menProductGrid = document.querySelector(".men-product-grid");

  let productGrid;
  let gender;

  if (womenProductGrid) {
    productGrid = womenProductGrid;
    gender = "Female";
  } else if (menProductGrid) {
    productGrid = menProductGrid;
    gender = "Male";
  } else {
    return;
  }

  function isCorrectGender(product) {
    return product.gender === gender;
  }

  const categoryProducts = products.filter(isCorrectGender);

  for (const product of categoryProducts) {
    console.log(product);

    const card = document.createElement("article");
    card.classList.add("product-card");
    productGrid.appendChild(card);

    const cardMedia = document.createElement("div");
    cardMedia.classList.add("card-media");
    card.appendChild(cardMedia);

    const link = document.createElement("a");
    link.href = `../product/index.html?id=${product.id}`;
    cardMedia.appendChild(link);

    const image = document.createElement("img");
    image.src = product.image.url;
    image.alt = product.image.alt;
    link.appendChild(image);

    const cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title");
    card.appendChild(cardTitle);

    const title = document.createElement("h3");
    title.textContent = product.title;
    cardTitle.appendChild(title);

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");
    card.appendChild(cardFooter);

    const price = document.createElement("span");
    price.classList.add("price");
    price.textContent = `${product.price} NOK`;
    cardFooter.appendChild(price);
  }
}

displayCategoryProducts();
