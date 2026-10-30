/* ========================================
   IMPORTS
   ======================================== */
import { fetchProducts } from "./api.js";
import { createProductCard } from "./ui.js";

/* ========================================
   DISPLAY CATEGORY PRODUCTS
   ======================================== */
async function displayCategoryProducts() {
  // Loading products BEFORE fetching them from the API
  const productStatus = document.querySelector(".product-status");

  /* ========================================
     SELECT CATEGORY GRID
     ======================================== */
  const womenProductGrid = document.querySelector(".women-product-grid");
  const menProductGrid = document.querySelector(".men-product-grid");

  let productGrid = null; //Easier to make it explicit that it starts at null so that I remember it's reason for being there.
  let gender = null;

  if (womenProductGrid) {
    productGrid = womenProductGrid;
    gender = "Female";
  } else if (menProductGrid) {
    productGrid = menProductGrid;
    gender = "Male";
  } else {
    return;
  }

  if (productStatus) {
    productStatus.textContent = "Loading products...";
  }

  /* ========================================
     FETCH AND FILTER PRODUCTS
     ======================================== */
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

  function isCorrectGender(product) {
    return product.gender === gender;
  }

  const categoryProducts = products.filter(isCorrectGender);

  //Added so that filtering doesn't get mistaken for an error
  if (categoryProducts.length === 0) {
    if (productStatus) {
      productStatus.textContent = "No products found in this category.";
    }
    return;
  }

  /* ========================================
     BUILD PRODUCT CARDS
     ======================================== */
  const productCount = document.querySelector(".product-count");
  if (productCount) {
    productCount.textContent = `${categoryProducts.length} items`;
  }

  for (const product of categoryProducts) {
    const card = createProductCard(product, "../");
    productGrid.appendChild(card);
  }

  /* ========================================
     IDENTIFY AND FILTER CATEGORY PRODUCTS
     ======================================== */

  const productColors = [];

  for (const product of categoryProducts) {
    const productColor = product.baseColor;

    if (!productColors.includes(productColor)) {
      productColors.push(productColor);
    }
  }

  const colorOptions = document.querySelector("#color-options");

  for (const productColor of productColors) {
    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "color";
    checkbox.value = productColor;

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(productColor));
    colorOptions.appendChild(label);
  }

  function getCheckedColors() {
    return [...document.querySelectorAll('input[name="color"]:checked')].map(
      (checkbox) => checkbox.value,
    );
  }

  colorOptions.addEventListener("click", () => {
    // When should something happen? Apply filters whenever a color checkbox is clicked
    applyFilters();
  });

  function applyFilters() {
    const checkedColors = getCheckedColors();
    const filteredProducts = categoryProducts.filter((product) => {
      const matchesSelectedColor =
        checkedColors.length === 0 || checkedColors.includes(product.baseColor);
      const matchesOnSale = !onSaleCheckbox.checked || product.onSale;
      return matchesSelectedColor && matchesOnSale;
    });

    // Clear the product grid and rebuild it with filtered products
    productGrid.innerHTML = "";
    for (const product of filteredProducts) {
      const card = createProductCard(product, "../");
      productGrid.appendChild(card);
    }
  }

  // Sale true or false via type = checkbox
  const onSaleCheckbox = document.querySelector('input[name="onSale"]');
  onSaleCheckbox.addEventListener("change", applyFilters);

  // Clear All filters functionality

  document.querySelector(".filter-clear").addEventListener("click", () => {
    for (const input of document.querySelectorAll(".filter-menu input")) {
      input.checked = false;
    }
  });
}

/* ========================================
   INITIALIZE
   ======================================== */
displayCategoryProducts();
