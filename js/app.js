// Import the product-fetching function from api.js.
import { fetchProducts } from "./api.js";

async function displayProducts() {
  const products = await fetchProducts();
  console.log(products);

  const heroPrice = document.querySelector(".hero-price-tag");
  const heroLink = document.querySelector(".hero-media a");
  console.log(heroPrice, heroLink);
  if (heroPrice && heroLink) {
    const product = products[3]; // I am keeping the fourth product from the API for the hero section, to keep the promotional imagery intact.
    heroPrice.textContent = `${product.price} €`;
    heroLink.href = `product/index.html?id=${product.id}`;
  }

  // THE .featured-one CARD I SELECTED HERE
  const featuredOneProduct = document.querySelector(".featured-one");
  console.log(featuredOneProduct);

  if (featuredOneProduct) {
    const productTitle = featuredOneProduct.querySelector(".card-title h3");
    const productImage = featuredOneProduct.querySelector(".card-media img");
    const productPrice = featuredOneProduct.querySelector(".price");
    const productLink = featuredOneProduct.querySelector(".card-media a");
    console.log({ productTitle, productImage, productPrice, productLink }); //Better way to inspect all elements at once than the 4 separate console.logs I originally had.

    const product = products[1];
    productTitle.textContent = product.title;
    productPrice.textContent = product.price;
    productImage.src = product.image.url;
    productImage.alt = product.image.alt;
    productLink.href = `product/index.html?id=${product.id}`;
  } else {
    console.log("No featured product card on this page.");
  } //A suggestion that was made to prevents errors from trying to access the card’s content on pages where that card doesn’t exist.

  const featuredTwoProduct = document.querySelector(".featured-two");
  console.log(featuredTwoProduct);

  if (featuredTwoProduct) {
    const productTitle = featuredTwoProduct.querySelector(".card-title h3");
    const productImage = featuredTwoProduct.querySelector(".card-media img");
    const productPrice = featuredTwoProduct.querySelector(".price");
    const productLink = featuredTwoProduct.querySelector(".card-media a");
    console.log({ productTitle, productImage, productPrice, productLink });

    const product = products[4];
    productTitle.textContent = product.title;
    productPrice.textContent = product.price;
    productImage.src = product.image.url;
    productImage.alt = product.image.alt;
    productLink.href = `product/index.html?id=${product.id}`;
  } else {
    console.log("No featured product card on this page.");
  }

  //The new product grid on the bottom of homepage. Will perhaps shrink it later.
  const HomeProductGrid = document.querySelector(".home-product-grid");
  if (HomeProductGrid) {
    function isCorrectPrice(product) {
      return product.onSale === true;
    }

    const homeProducts = products.filter(isCorrectPrice);

    for (const product of homeProducts) {
      const card = document.createElement("article");
      card.classList.add("product-card");
      HomeProductGrid.appendChild(card);

      const cardMedia = document.createElement("div");
      cardMedia.classList.add("card-media");
      card.appendChild(cardMedia);

      const link = document.createElement("a");
      link.href = `product/index.html?id=${product.id}`;
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
      price.textContent = `${product.discountedPrice} €`;
      price.style.color = "var(--color-alert)";
      cardFooter.appendChild(price);
    }
  }
}

// Run the function.
displayProducts();
