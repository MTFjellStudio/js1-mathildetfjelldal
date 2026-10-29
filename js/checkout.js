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
  updateCartCount();

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

    const miniCartItem = document.createElement("div");
    miniCartItem.classList.add("mini-cart-item");

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

    topRow.appendChild(cartTitle);

    //Middle Row - Color, Size and Quantity
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

    const quantityDivider = document.createElement("span");
    quantityDivider.classList.add("divider");

    const cartQuantity = document.createElement("span");
    cartQuantity.classList.add("variant-text");

    // Bottom Row - Displays the price of the cart item
    const bottomRow = document.createElement("div");
    bottomRow.classList.add("cart-row", "bottom");

    const cartPrice = document.createElement("span");
    cartPrice.classList.add("price");

    variantText.appendChild(cartColor);
    variantText.appendChild(divider);
    variantText.appendChild(cartSize);
    variantText.appendChild(quantityDivider);
    variantText.appendChild(cartQuantity);
    middleRow.appendChild(variantText);
    bottomRow.appendChild(cartPrice);

    // Assemble cart info section
    cartInfo.appendChild(topRow);
    cartInfo.appendChild(middleRow);
    cartInfo.appendChild(bottomRow);

    // Assemble cart tile
    miniCartItem.appendChild(cartMedia);
    miniCartItem.appendChild(cartInfo);

    // Add tile to page
    summaryItems.appendChild(miniCartItem);

    if (product) {
      cartImage.src = product.image.url;
      cartImage.alt = product.image.alt;

      cartLink.href = `../product/index.html?id=${product.id}`;

      cartTitleLink.href = cartLink.href;
      cartTitleLink.textContent = product.title;

      cartColor.textContent = `Color: ${product.baseColor}`;
      cartSize.textContent = `Size: ${cartItem.size}`;
      cartQuantity.textContent = `Quantity: ${cartItem.quantity}`;

      if (product.onSale) {
        cartPrice.textContent = `${product.discountedPrice} €`;
        cartPrice.style.color = "var(--color-alert)";
      } else {
        cartPrice.textContent = `${product.price} €`;
      }
    }
  }

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
    const selectExpress = document.querySelector("#express-shipping");
    const expressShippingCost = 19;
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');

    // Shipping price change at EXPRESS selected
    let shipping = 0;

    subtotalPrice.textContent = `${subtotal.toFixed(2)} €`;
    shippingPrice.textContent = `${shipping.toFixed(2)} €`;
    totalPrice.textContent = `${(subtotal + shipping).toFixed(2)} €`;

    for (const option of shippingOptions) {
      option.addEventListener("change", () => {
        if (selectExpress.checked) {
          shipping = expressShippingCost;
        } else {
          shipping = 0;
        }

        shippingPrice.textContent = `${shipping.toFixed(2)} €`;
        totalPrice.textContent = `${(subtotal + shipping).toFixed(2)} €`;
      });
    }

    return subtotal;
  }

  console.log(summaryCost());

  const payNowButton = document.querySelector("#pay-now-button");

  payNowButton.addEventListener("click", (event) => {
    event.preventDefault();

    const requiredInputs = document.querySelectorAll(
      ".checkout-forms input[required]",
    );

    for (const input of requiredInputs) {
      if (!input.reportValidity()) {
        return;
      }
    }

    localStorage.removeItem("cartItems");

    window.location.href = "confirmation/index.html";
  });
}
displayCheckoutItems();
