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
}

// Run the function.
displayProducts();
