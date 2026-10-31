/* ========================================
   IMPORTS
   ======================================== */
import { fetchProducts } from "./api.js";
import { createProductCard } from "./ui.js";

/* ========================================
   DISPLAY CATEGORY PRODUCTS
   ======================================== */
async function displayCategoryProducts() {
  const productStatus = document.querySelector(".product-status");

  /* ========================================
     SELECT CATEGORY GRID
     ======================================== */
  const womenProductGrid = document.querySelector(".women-product-grid");
  const menProductGrid = document.querySelector(".men-product-grid");

  let productGrid = null;
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

  if (products.length === 0) {
    if (productStatus) {
      productStatus.textContent = "Unable to load products. Please try again.";
    }
    return;
  }

  if (productStatus) {
    productStatus.textContent = "";
  }

  function isCorrectGender(product) {
    return product.gender === gender;
  }

  const categoryProducts = products.filter(isCorrectGender);

  // An empty category is reported separately from a failed fetch
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

  //Color filter
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

    productGrid.innerHTML = "";
    for (const product of filteredProducts) {
      const card = createProductCard(product, "../");
      productGrid.appendChild(card);
    }
  }

  // On sale filter
  const onSaleCheckbox = document.querySelector('input[name="onSale"]');
  onSaleCheckbox.addEventListener("change", applyFilters);

  // Clear filters
  const clearFiltersButton = document.querySelector(".filter-clear");

  clearFiltersButton.addEventListener("click", () => {
    for (const input of document.querySelectorAll(".filter-menu input")) {
      input.checked = false;
    }
    applyFilters();
  });
}

/* ========================================
   INITIALIZE
   ======================================== */
displayCategoryProducts();
