/* ========================================
   CART BADGE
   ======================================== */
export function updateCartBadge() {
  const cartBadge = document.querySelector(".cart-badge");

  if (!cartBadge) {
    return;
  }

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) ?? [];
  cartBadge.hidden = cartItems.length === 0;
}

updateCartBadge();

/* ========================================
   CART TOAST STATE
   ======================================== */
let toastTimeout;

/* ========================================
   SHOW CART TOAST
   ======================================== */
export function showCartToast() {
  updateCartBadge();

  const cartToast = document.querySelector(".cart-toast");

  if (!cartToast) {
    return;
  }

  cartToast.textContent = "Item added to cart";
  cartToast.classList.add("show");

  // Reset the timer so rapid clicks don't hide the toast early
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    cartToast.classList.remove("show");
  }, 2000);
}
