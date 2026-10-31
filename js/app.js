/* ========================================
   IMPORTS
   ======================================== */
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
     UPDATE FEATURED PRODUCTS
     ======================================== */
  const featuredOneProduct = document.querySelector(".featured-one");

  if (featuredOneProduct) {
    const card = createProductCard(products[1]);
    card.classList.add("featured-one");
    featuredOneProduct.replaceWith(card);
  }

  const featuredTwoProduct = document.querySelector(".featured-two");

  if (featuredTwoProduct) {
    const card = createProductCard(products[4]);
    card.classList.add("featured-two");
    featuredTwoProduct.replaceWith(card);
  }

  /* ========================================
     DISPLAY SALE PRODUCTS
     ======================================== */
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
displayProducts();
