// Import the product-fetching function from api.js.
import { fetchProducts } from "./api.js";

// Create a function that:
async function displayProducts() {
  // 1. calls the API function
  // 2. waits for the products
  const products = await fetchProducts();
  // 3. logs the products so I can inspect the API data
  console.log(products);

  // THE .featured-one CARD I SELECTED HERE
  const featuredOneCard = document.querySelector(".featured-one");
  // log and inspect it
  console.log(featuredOneCard);

  if (featuredOneCard) {
    const productTitle = featuredOneCard.querySelector(".card-title h3");
    const productImage = featuredOneCard.querySelector(".card-media img");
    const productPrice = featuredOneCard.querySelector(".price");
    const productLink = featuredOneCard.querySelector(".card-media a");
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

  const featuredTwoCard = document.querySelector(".featured-two");
  console.log(featuredTwoCard);

  if (featuredTwoCard) {
    const productTitle = featuredTwoCard.querySelector(".card-title h3");
    const productImage = featuredTwoCard.querySelector(".card-media img");
    const productPrice = featuredTwoCard.querySelector(".price");
    const productLink = featuredTwoCard.querySelector(".card-media a");
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
