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
   PRODUCT CARD
   ======================================== */
export function createProductCard(product, pathToRoot = "") {
  const card = document.createElement("article");
  card.classList.add("product-card");

  const cardMedia = document.createElement("div");
  cardMedia.classList.add("card-media");
  card.appendChild(cardMedia);

  const link = document.createElement("a");
  link.href = `${pathToRoot}product/index.html?id=${product.id}`;
  cardMedia.appendChild(link);

  const image = document.createElement("img");
  image.src = product.image.url;
  image.alt = product.image.alt;
  link.appendChild(image);

  const cardTitle = document.createElement("div");
  cardTitle.classList.add("card-title");
  card.appendChild(cardTitle);

  const title = document.createElement("h3");
  title.textContent = product.title;
  cardTitle.appendChild(title);

  const cardFooter = document.createElement("div");
  cardFooter.classList.add("card-footer");
  card.appendChild(cardFooter);

  /* ========================================
     DISPLAY PRODUCT PRICE
     ======================================== */
  const price = document.createElement("span");
  price.classList.add("price");
  const isOnSale = product.onSale === true;
  if (isOnSale) {
    const originalPrice = document.createElement("span");
    originalPrice.classList.add("price", "original-price");
    originalPrice.textContent = `${product.price} €`;
    cardFooter.appendChild(originalPrice);
  }

  price.textContent = `${isOnSale ? product.discountedPrice : product.price} €`;
  price.classList.toggle("sale-price", isOnSale);
  cardFooter.appendChild(price);

  const cardButton = document.createElement("button");
  cardButton.classList.add("card-button");
  cardButton.type = "button";

  const cartIcon = document.createElement("i");
  cartIcon.classList.add("fa", "fa-solid", "fa-cart-shopping");

  cardButton.appendChild(cartIcon);
  cardFooter.appendChild(cardButton);

  const cardBase = document.createElement("div");
  cardBase.classList.add("card-base");
  card.appendChild(cardBase);

  /* ========================================
     DISPLAY SIZE OPTIONS
     ======================================== */
  const cardSizes = document.createElement("div");
  cardSizes.classList.add("card-sizes");

  for (const size of product.sizes) {
    const sizeBox = document.createElement("div");
    sizeBox.classList.add("size-box");

    const sizeInput = document.createElement("input");
    sizeInput.type = "radio";
    sizeInput.id = `size-${product.id}-${size}`;
    sizeInput.name = `size-${product.id}`;
    sizeInput.value = size;

    const sizeLabel = document.createElement("label");
    sizeLabel.htmlFor = sizeInput.id;
    sizeLabel.textContent = size;

    sizeBox.appendChild(sizeInput);
    sizeBox.appendChild(sizeLabel);
    cardSizes.appendChild(sizeBox);
  }

  cardBase.appendChild(cardSizes);

  /* ========================================
     ADD PRODUCT TO CART
     ======================================== */
  cardButton.addEventListener("click", () => {
    const selectedSize = card.querySelector(
      `input[name="size-${product.id}"]:checked`,
    );

    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const cartItem = {
      productId: product.id,
      size: selectedSize.value,
      quantity: 1,
    };

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) ?? [];

    if (
      cartItems.some(
        (item) =>
          item.productId === cartItem.productId && item.size === cartItem.size,
      )
    ) {
      const existingItem = cartItems.find(
        (item) =>
          item.productId === cartItem.productId && item.size === cartItem.size,
      );

      existingItem.quantity += cartItem.quantity;
    } else {
      cartItems.push(cartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    showCartToast();
  });

  return card;
}

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
