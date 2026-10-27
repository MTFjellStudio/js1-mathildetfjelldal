import { fetchProducts } from "./api.js";

async function displayCartProduct() {
  //Get stored cart from localStorage

  // Get product data if needed / Load Cart

  // Loop through cart items

  //Build one cart tile per item

  // Remove-button functionality
  const removeButtons = document.querySelectorAll(".btn-remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const cartItemId = event.target.dataset.id;
      // Remove the item from localStorage cart
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = cart.filter((item) => item.id !== cartItemId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      // Refresh the page or update the cart display
      location.reload();
    });
  });
}
displayCartProduct();
