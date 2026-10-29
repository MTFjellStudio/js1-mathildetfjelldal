let toastTimeout;

export function showCartToast() {
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
