import { fetchProducts } from "./api.js";

//C. CART PAGE — cart.js
//──────────────────────

//read "cart"
//        ↓
const cartList = document.querySelector(".cart-list");

//JSON.parse
//        ↓
const cartItems = JSON.parse(localStorage.getItem("cartItems")) ?? [];

console.log(cartItems);

//FOR LOOP
//        ↓
//create cartTile HTML
//        ↓
//cartList.appendChild(cartTile)
for (const cartItem of cartItems) {
  const cartTile = document.createElement("div");
  cartTile.classList.add("cart-tile");

  // Media and Image
  const cartMedia = document.createElement("img");
  cartMedia.classList.add("cart-media");

  const cartImage = document.createElement("img");

  cartMedia.appendChild(cartImage);

  //Cart Info (Contains top, middle and bottom row)
  const cartInfo = document.createElement("div");
  cartInfo.classList.add("cart-info");

  //Top Row - Includes Title + remove button
  const topRow = document.createElement("div");
  topRow.classList.add("cart-row", "top");

  const cartTitle = document.createElement("h3");

  const removeButton = document.createElement("button");
  removeButton.classList.add("btn-remove");

  topRow.appendChild(cartTitle);
  topRow.appendChild(removeButton);

  //Middle Row - Color and Size
  const middleRow = document.createElement("div");
  middleRow.classList.add("cart-row", "middle");

  const cartColor = document.createElement("span");
  cartColor.classList.add("variant-text");

  const divider = document.createElement("span");
  divider.classList.add("divider");

  const cartSize = document.createElement("span");
  cartSize.classList.add("variant-text");

  middleRow.appendChild(cartColor);
  middleRow.appendChild(divider);
  middleRow.appendChild(cartSize);

  //Bottom Row - Quantity and Price
  const bottomRow = document.createElement("div");
  bottomRow.classList.add("cart-row", "bottom");

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

  bottomRow.appendChild(quantitySelector);
  bottomRow.appendChild(cartPrice);

  // Assemble cart info section
  cartInfo.appendChild(topRow);
  cartInfo.appendChild(middleRow);
  cartInfo.appendChild(bottomRow);

  // Assemble cart tile
  cartTile.appendChild(cartMedia);
  cartTile.appendChild(cartInfo);

  // Add tile to page
  cartList.appendChild(cartTile);
}

//D. REMOVE
//─────────

//user clicks X
//        ↓
//identify which cartItem
//        ↓
//remove from array
//        ↓
//save array
//        ↓
//remove/re-render HTML
