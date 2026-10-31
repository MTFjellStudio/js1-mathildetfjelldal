/* ========================================
   IMPORTS
   ======================================== */
import { fetchProducts } from "./api.js";
import { showCartToast } from "./ui.js";

/* ========================================
   DISPLAY PRODUCT DETAILS
   ======================================== */
async function displayProduct() {
  const productStatus = document.querySelector(".product-status");

  if (productStatus) {
    productStatus.textContent = "Loading product...";
  }

  const products = await fetchProducts();

  if (products.length === 0) {
    if (productStatus) {
      productStatus.textContent = "Unable to load product. Please try again.";
    }
    return;
  }

  if (productStatus) {
    productStatus.textContent = "";
  }

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  const productContainer = document.querySelector(
    ".product-specific-container",
  );

  if (productContainer) {
    /* ========================================
       FIND AND DISPLAY SELECTED PRODUCT
       ======================================== */
    const productTitle = productContainer.querySelector(".product-info h1");
    const productImage = productContainer.querySelector(
      ".product-gallery .gallery-main img",
    );
    const productDescription = productContainer.querySelector(".product-intro");

    function isCorrectProduct(product) {
      return product.id === productId;
    }
    const product = products.find(isCorrectProduct);
    if (!product) {
      productTitle.textContent = "Product not found";
      return;
    }

    productTitle.textContent = product.title;
    productImage.src = product.image.url;
    productImage.alt = product.image.alt;
    productDescription.textContent = product.description;

    /* ========================================
       DISPLAY PRODUCT PRICE
       ======================================== */
    const isOnSale = product.onSale;
    const originalPrice = productContainer.querySelector(".original-price");
    const currentPrice = productContainer.querySelector(".current-price");
    currentPrice.classList.toggle("sale-price", isOnSale);

    if (isOnSale) {
      originalPrice.textContent = `${product.price} €`;
      currentPrice.textContent = `${product.discountedPrice} €`;
    } else {
      originalPrice.textContent = "";
      currentPrice.textContent = `${product.price} €`;
    }

    /* ========================================
       DISPLAY COLOR AND SIZE OPTIONS
       ======================================== */
    const productColor = product.baseColor;

    const colorOptions = productContainer.querySelector(".color-options");

    const colorOption = colorOptions.querySelector(".color-radio");

    const colorInput = colorOption.querySelector("input");

    const colorText = colorOption.querySelector(".sr-only");

    colorInput.value = productColor;
    colorOption.className = "color-radio"; // Drops the hardcoded "black" class from the HTML
    colorOption.style.backgroundColor = productColor;
    colorText.textContent = productColor;

    const productSizes = product.sizes;
    const sizeOptions = productContainer.querySelector(".size-options");
    sizeOptions.innerHTML = ""; // Removes the hardcoded sizes from the HTML

    for (const size of productSizes) {
      const sizeOption = document.createElement("div");
      sizeOption.classList.add("size-box");

      const sizeInput = document.createElement("input");
      sizeInput.type = "radio";
      sizeInput.id = `size-${size.toLowerCase()}`;
      sizeInput.name = "size";
      sizeInput.value = size;

      const sizeLabel = document.createElement("label");
      sizeLabel.htmlFor = sizeInput.id;
      sizeLabel.textContent = size;

      sizeOption.appendChild(sizeInput);
      sizeOption.appendChild(sizeLabel);
      sizeOptions.appendChild(sizeOption);
    }

    /* ========================================
       QUANTITY AND ADD TO CART
       ======================================== */
    const addToCartButton = productContainer.querySelector(".add-to-cart");

    const quantityInput = productContainer.querySelector(
      'input[name="quantity"]',
    );

    const decreaseButton = productContainer.querySelector(
      'button[aria-label="Decrease quantity"]',
    );
    const increaseButton = productContainer.querySelector(
      'button[aria-label="Increase quantity"]',
    );

    decreaseButton.addEventListener("click", () => {
      const minimum = Number(quantityInput.min) || 1;
      const current = Number(quantityInput.value) || minimum;
      quantityInput.value = Math.max(minimum, current - 1);
    });

    increaseButton.addEventListener("click", () => {
      const minimum = Number(quantityInput.min) || 1;
      const current = Number(quantityInput.value) || minimum;
      quantityInput.value = current + 1;
    });

    addToCartButton.addEventListener("click", (event) => {
      event.preventDefault();

      const selectedSize = productContainer.querySelector(
        'input[name="size"]:checked',
      );

      if (!selectedSize) {
        alert("Please select a size");
        return;
      }

      const cartItem = {
        productId: product.id,
        size: selectedSize.value,
        quantity: Number(quantityInput.value),
      };

      const cartItems = JSON.parse(localStorage.getItem("cartItems")) ?? [];

      if (
        cartItems.some(
          (item) =>
            item.productId === cartItem.productId &&
            item.size === cartItem.size,
        )
      ) {
        // Same product and size: increase the quantity instead of adding a duplicate line.
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

    /* ========================================
       RELATED PRODUCTS
       ======================================== */
    // "You might also like": four other products of the same gender.
    const relatedGrid = document.querySelector(".related-products-grid");
    const relatedProducts = products
      .filter((p) => p.id !== product.id && p.gender === product.gender)
      .slice(0, 4);

    for (const related of relatedProducts) {
      const card = document.createElement("article");
      card.classList.add("product-card");

      const cardMedia = document.createElement("div");
      cardMedia.classList.add("card-media");

      const link = document.createElement("a");
      link.href = `index.html?id=${related.id}`;

      const image = document.createElement("img");
      image.src = related.image.url;
      image.alt = related.image.alt;

      const cardTitle = document.createElement("div");
      cardTitle.classList.add("card-title");

      const title = document.createElement("h3");
      title.textContent = related.title;

      const cardFooter = document.createElement("div");
      cardFooter.classList.add("card-footer");

      const price = document.createElement("span");
      price.classList.add("price");
      price.textContent = `${related.price} €`;

      link.appendChild(image);
      cardMedia.appendChild(link);
      cardTitle.appendChild(title);
      cardFooter.appendChild(price);
      card.append(cardMedia, cardTitle, cardFooter);
      relatedGrid.appendChild(card);
    }

    /* ========================================
       UPDATE CATEGORY BREADCRUMB
       ======================================== */
    const categoryBreadcrumb = productContainer.querySelector(
      '.breadcrumbs a[href="../category/products-women.html"]',
    );
    if (categoryBreadcrumb) {
      if (product.gender === "Male") {
        categoryBreadcrumb.href = "../category/products-men.html";
        categoryBreadcrumb.textContent = "Jackets for Men";
      } else {
        categoryBreadcrumb.href = "../category/products-women.html";
        categoryBreadcrumb.textContent = "Jackets for Women";
      }
    }
  }
}

/* ========================================
   INITIALIZE
   ======================================== */
displayProduct();
