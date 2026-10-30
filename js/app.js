/* ========================================
   IMPORTS
   ======================================== */
// Import the product-fetching function from api.js.
import { fetchProducts } from "./api.js";
import { createProductCard } from "./ui.js";

/* ========================================
   DISPLAY HOMEPAGE PRODUCTS
   ======================================== */
async function displayProducts() {
  const productStatus = document.querySelector(".product-status");

  if (productStatus) {
    productStatus.textContent = "Loading products...";
  }

  const products = await fetchProducts();

  // Error check
  if (products.length === 0) {
    if (productStatus) {
      productStatus.textContent = "Unable to load products. Please try again.";
    }
    return;
  }

  // Clears the loading message once products are fetched successfully
  if (productStatus) {
    productStatus.textContent = "";
  }

  /* ========================================
     UPDATE HERO PRODUCT
     ======================================== */
  console.log(products);

  /* ========================================
     UPDATE FEATURED PRODUCTS
     ======================================== */
  // THE .featured-one CARD I SELECTED HERE
  const featuredOneProduct = document.querySelector(".featured-one");
  console.log(featuredOneProduct);

  if (featuredOneProduct) {
    const card = createProductCard(products[1]);
    card.classList.add("featured-one");
    featuredOneProduct.replaceWith(card);
  } else {
    console.log("No featured product card on this page.");
  } //A suggestion that was made to prevents errors from trying to access the card’s content on pages where that card doesn’t exist.

  const featuredTwoProduct = document.querySelector(".featured-two");
  console.log(featuredTwoProduct);

  if (featuredTwoProduct) {
    const card = createProductCard(products[4]);
    card.classList.add("featured-two");
    featuredTwoProduct.replaceWith(card);
  } else {
    console.log("No featured product card on this page.");
  }

  /* ========================================
     DISPLAY SALE PRODUCTS
     ======================================== */
  //The new product grid on the bottom of homepage. Will perhaps shrink it later.
  const HomeProductGrid = document.querySelector(".home-product-grid");
  if (HomeProductGrid) {
    function isCorrectPrice(product) {
      return product.onSale === true;
    }

    const homeProducts = products.filter(isCorrectPrice);

    for (const product of homeProducts) {
      const card = createProductCard(product);
      HomeProductGrid.appendChild(card);
    }
  }
}

/* ========================================
   INITIALIZE
   ======================================== */
// Run the function.
displayProducts();
