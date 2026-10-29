import { fetchProducts } from "./api.js";
import { showCartToast } from "./ui.js";

async function displayCategoryProducts() {
  // Loading products BEFORE fetching them from the API
  const productStatus = document.querySelector(".product-status");

  const womenProductGrid = document.querySelector(".women-product-grid");
  const menProductGrid = document.querySelector(".men-product-grid");

  let productGrid = null; //Easier to make it explicit that it starts at null so that I remember it's reason for being there.
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

  const products = await fetchProducts();

  // Error check
  if (products.length === 0) {
    if (productStatus) {
      productStatus.textContent = "Unable to load products. Please try again.";
    }
    return;
  }

  // Clears the loading message once products are fetched successfully
  if (productStatus) {
    productStatus.textContent = "";
  }

  function isCorrectGender(product) {
    return product.gender === gender;
  }

  const categoryProducts = products.filter(isCorrectGender);

  //Added so that filtering doesn't get mistaken for an error
  if (categoryProducts.length === 0) {
    if (productStatus) {
      productStatus.textContent = "No products found in this category.";
    }
    return;
  }

  for (const product of categoryProducts) {
    console.log(product);

    const card = document.createElement("article");
    card.classList.add("product-card");
    productGrid.appendChild(card);

    const cardMedia = document.createElement("div");
    cardMedia.classList.add("card-media");
    card.appendChild(cardMedia);

    const link = document.createElement("a");
    link.href = `../product/index.html?id=${product.id}`;
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

    //Made a 4th row for the size input selections
    const cardBase = document.createElement("div");
    cardBase.classList.add("card-base");
    card.appendChild(cardBase);

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

    // I have copied from add-to-cart functionality on the product-specific page for handling size selection and cart updates.
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
            item.productId === cartItem.productId &&
            item.size === cartItem.size,
        )
      ) {
        const existingItem = cartItems.find(
          (item) =>
            item.productId === cartItem.productId &&
            item.size === cartItem.size,
        );

        existingItem.quantity += cartItem.quantity;
      } else {
        cartItems.push(cartItem);
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      showCartToast();
    });
  }
}

displayCategoryProducts();
