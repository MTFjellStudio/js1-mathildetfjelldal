import { fetchProducts } from "./api.js";

async function displayProduct() {
  const products = await fetchProducts();
  console.log(products);

  const cartTile = document.querySelector(".cart-tile");
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (cartTile) {
    const cartTitle = cartTile.querySelector(".cart-row h3");
    const cartImage = cartTile.querySelector(".cart-media img");

    console.log(cartTitle, cartImage);

    function isCorrectProduct(product) {
      return product.id === productId;
    }
    const product = products.find(isCorrectProduct);
    if (!product) {
      cartTitle.textContent = "Product not found";
      return;
    }

    cartTitle.textContent = product.title;
    cartImage.src = product.image.url;
    cartImage.alt = product.image.alt;
    // Cart price

    // 1. CLICK/BUTTON
    // User presses Add to Cart
    const addToCartButton = cartTile.querySelector(".add-to-cart");

    function handleAddToCart() {
      console.log("Add to Cart clicked");
    }

    addToCartButton.addEventListener("click", handleAddToCart);

    // 2. COLLECT
    // Which product? - Already defined
    // Which size?
    // What quantity?
    const sizeInput = cartTile.querySelector('input[name="size"]');
  }
}
displayProduct();
// 3. PACKAGE
// Create one cart-item object from those values

// 4. CART ARRAY
// Put that object into a cart array

// 5. PERSIST
// Save the cart array in localStorage

// 6. CART PAGE
// Read localStorage
// Render cart items

// 7. INTERACTION
// Remove items
// Change quantities

// 8. CHECKOUT
// Use the same cart data for summary + total

displayProduct();
