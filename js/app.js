// Import the product-fetching function from api.js.
import { fetchProducts } from "./api.js";

// Create a function that:
async function displayProducts() {
  // 1. calls the API function
  // 2. waits for the products
  const products = await fetchProducts();
  // 3. logs the products so I can inspect the API data
  console.log(products);

  const heroPrice = document.querySelector(".hero-price-tag");
  const heroLink = document.querySelector(".hero-media a");
  console.log(heroPrice, heroLink);
  if (heroPrice && heroLink) {
    const product = products[3]; // I am keeping the fourth product from the API for the hero section, to keep the promotional imagery intact.
    heroPrice.textContent = `${product.price} NOK`;
    heroLink.href = `product/index.html?id=${product.id}`;
  }

  // THE .featured-one CARD I SELECTED HERE
  const featuredOneProduct = document.querySelector(".featured-one");
  // log and inspect it
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
}

// Run the function.
displayProducts();
