import { fetchProducts } from "./api.js";

async function displayCheckoutItems() {
  const products = await fetchProducts();
  console.log(products);

  const summaryItems = document.querySelector(".summary-items");

  if (!summaryItems) {
    return;
  }

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) ?? [];

  console.log(cartItems);

  const cartItemCount = document.querySelector(".cart-item-count");

  function getCartCount() {
    let total = 0;

    for (const cartItem of cartItems) {
      total = total + cartItem.quantity;
    }
    return total;
  }
  cartItemCount.textContent = `${getCartCount()} Items`;

  function updateCartCount() {
    const total = getCartCount();

    if (total === 1) {
      cartItemCount.textContent = "1 Item";
    } else {
      cartItemCount.textContent = `${total} Items`;
    }
  }

  for (const cartItem of cartItems) {
    const product = products.find((p) => p.id === cartItem.productId);
    if (!product) {
      continue;
    }
  }
}
displayCheckoutItems();
