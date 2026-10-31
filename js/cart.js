/* ========================================
   IMPORTS
   ======================================== */
import { fetchProducts } from "./api.js";
import { updateCartBadge } from "./ui.js";

/* ========================================
   DISPLAY CART
   ======================================== */
async function displayCart() {
  const productStatus = document.querySelector(".product-status");

  if (productStatus) {
    productStatus.textContent = "Loading cart...";
  }

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

  const cartList = document.querySelector(".cart-list");

  if (!cartList) {
    return;
  }

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) ?? [];

  if (cartItems.length === 0) {
    if (productStatus) {
      productStatus.textContent =
        "Your cart is empty. Add a product to proceed to checkout.";
    }
    return;
  }

  /* ========================================
     CART COUNT AND ORDER TOTALS
     ======================================== */
  const cartItemCount = document.querySelector(".cart-item-count");
  function getCartCount() {
    let total = 0;

    for (const cartItem of cartItems) {
      total = total + cartItem.quantity;
    }
    return total;
  }
  cartItemCount.textContent = `${getCartCount()} Items`;

  function summaryCost() {
    let subtotal = 0;

    for (const cartItem of cartItems) {
      const product = products.find((p) => p.id === cartItem.productId);

      if (!product) {
        continue;
      }

      let productPrice;

      if (product.onSale) {
        productPrice = product.discountedPrice;
      } else {
        productPrice = product.price;
      }

      subtotal = subtotal + productPrice * cartItem.quantity;
    }

    const subtotalPrice = document.querySelector(".subtotal-price");
    const shippingPrice = document.querySelector(".shipping-price");
    const totalPrice = document.querySelector(".total-price");
    const shipping = 0; // Standard delivery is free. Express is chosen at checkout.

    subtotalPrice.textContent = `${subtotal.toFixed(2)} €`;
    shippingPrice.textContent = `${shipping.toFixed(2)} €`;
    totalPrice.textContent = `${(subtotal + shipping).toFixed(2)} €`;
  }

  summaryCost();

  function updateCartCount() {
    const total = getCartCount();

    if (total === 1) {
      cartItemCount.textContent = "1 Item";
    } else {
      cartItemCount.textContent = `${total} Items`;
    }

    summaryCost();
    updateCartBadge();
  }

  /* ========================================
     BUILD CART ITEMS
     ======================================== */
  for (const cartItem of cartItems) {
    const product = products.find((p) => p.id === cartItem.productId);
    if (!product) {
      continue;
    }

    const cartTile = document.createElement("div");
    cartTile.classList.add("cart-tile");

    // Media and Image
    const cartMedia = document.createElement("div");
    cartMedia.classList.add("cart-media");
    const cartLink = document.createElement("a");
    const cartImage = document.createElement("img");

    cartLink.appendChild(cartImage);
    cartMedia.appendChild(cartLink);

    //Cart Info (Contains top, middle and bottom row)
    const cartInfo = document.createElement("div");
    cartInfo.classList.add("cart-info");

    //Top Row - Includes Title + remove button
    const topRow = document.createElement("div");
    topRow.classList.add("cart-row", "top");

    const cartTitle = document.createElement("h3");
    const cartTitleLink = document.createElement("a");
    cartTitle.appendChild(cartTitleLink);

    const removeButton = document.createElement("button");
    removeButton.classList.add("btn-remove");

    topRow.appendChild(cartTitle);
    topRow.appendChild(removeButton);

    //Middle Row - Color and Size
    const middleRow = document.createElement("div");
    middleRow.classList.add("cart-row", "middle");

    const variantText = document.createElement("p");
    variantText.classList.add("variant-text");

    const cartColor = document.createElement("span");
    cartColor.classList.add("variant-text");

    const divider = document.createElement("span");
    divider.classList.add("divider");

    const cartSize = document.createElement("span");
    cartSize.classList.add("variant-text");

    variantText.appendChild(cartColor);
    variantText.appendChild(divider);
    variantText.appendChild(cartSize);
    middleRow.appendChild(variantText);

    //Bottom Row - Quantity and Price
    const bottomRow = document.createElement("div");
    bottomRow.classList.add("cart-row", "bottom");

    const formActions = document.createElement("div");
    formActions.classList.add("form-actions");

    const quantitySelector = document.createElement("div");
    quantitySelector.classList.add("quantity-selector");

    const decreaseButton = document.createElement("button");

    const quantityInput = document.createElement("input");

    const increaseButton = document.createElement("button");

    quantitySelector.appendChild(decreaseButton);
    quantitySelector.appendChild(quantityInput);
    quantitySelector.appendChild(increaseButton);

    const cartPrice = document.createElement("span");
    cartPrice.classList.add("price");

    formActions.appendChild(quantitySelector);
    bottomRow.appendChild(formActions);
    bottomRow.appendChild(cartPrice);

    // Assemble cart info section
    cartInfo.appendChild(topRow);
    cartInfo.appendChild(middleRow);
    cartInfo.appendChild(bottomRow);

    // Assemble cart tile
    cartTile.appendChild(cartMedia);
    cartTile.appendChild(cartInfo);

    cartList.appendChild(cartTile);

    if (product) {
      cartImage.src = product.image.url;
      cartImage.alt = product.image.alt;

      cartLink.href = `../product/index.html?id=${product.id}`;

      cartTitleLink.href = cartLink.href;
      cartTitleLink.textContent = product.title;

      cartColor.textContent = `Color: ${product.baseColor}`;
      cartSize.textContent = `Size: ${cartItem.size}`;

      quantityInput.type = "number";
      quantityInput.min = "1";
      quantityInput.value = cartItem.quantity;
      decreaseButton.textContent = "-";
      increaseButton.textContent = "+";
      decreaseButton.type = "button";
      increaseButton.type = "button";

      if (product.onSale) {
        cartPrice.textContent = `${product.discountedPrice} €`;
        cartPrice.style.color = "var(--color-alert)";
      } else {
        cartPrice.textContent = `${product.price} €`;
      }

      removeButton.textContent = "×";
      removeButton.type = "button";
    }

    /* ========================================
       CART ITEM CONTROLS
       ======================================== */
    removeButton.addEventListener("click", () => {
      const cartItemIndex = cartItems.indexOf(cartItem);
      if (cartItemIndex !== -1) {
        cartItems.splice(cartItemIndex, 1);
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartCount();

      cartTile.remove();
    });

    increaseButton.addEventListener("click", () => {
      cartItem.quantity = cartItem.quantity + 1;

      quantityInput.value = cartItem.quantity;

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartCount();
    });

    decreaseButton.addEventListener("click", () => {
      const minimum = Number(quantityInput.min) || 1;

      cartItem.quantity = Math.max(minimum, cartItem.quantity - 1);

      quantityInput.value = cartItem.quantity;

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartCount();
    });
  }

  /* ========================================
     CHECKOUT NAVIGATION
     ======================================== */
  const checkoutButton = document.querySelector(".go-to-checkout");

  checkoutButton.addEventListener("click", (event) => {
    if (cartItems.length === 0) {
      event.preventDefault();
      alert("Your cart is empty. Add a product before going to checkout.");
    }
  });
}

/* ========================================
   INITIALIZE
   ======================================== */
displayCart();
