import { fetchProducts } from "./api.js";

async function displayProduct() {
  const products = await fetchProducts();
  console.log(products);

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  const productContainer = document.querySelector(
    ".product-specific-container",
  );

  if (productContainer) {
    const productTitle = productContainer.querySelector(".product-info h1");
    const productImage = productContainer.querySelector(
      ".product-gallery .gallery-main img",
    );
    const productDescription = productContainer.querySelector(".product-intro");
    console.log({
      productTitle,
      productImage,
      productDescription,
    });

    function isCorrectProduct(product) {
      return product.id === productId;
    }
    const product = products.find(isCorrectProduct);
    if (!product) {
      productTitle.textContent = "Product not found";
      return;
    } //This is a guard so a bad or missing id doesn't crash the page.

    productTitle.textContent = product.title;
    productImage.src = product.image.url;
    productImage.alt = product.image.alt;
    productDescription.textContent = product.description;

    //Add to cart functionality will be implemented here
    //API finds current product - Done
    //        ↓
    //user selects SIZE
    const addToCartButton = productContainer.querySelector(".add-to-cart");
    addToCartButton.addEventListener("click", () => {
      event.preventDefault();

      const selectedSize = productContainer.querySelector(
        'input[name="size"]:checked',
      );
      if (!selectedSize) {
        alert("Please select a size");
        return;
      }

      console.log({
        selectedSize: selectedSize.value,
      });
    });
    //user enters QUANTITY
    //        ↓
    //user clicks ADD TO CART
    //        ↓
    //create cartItem DATA object
    //        ↓
    //save it to localStorage

    //B. STORAGE
    //──────────

    //"cart"

    //[
    //  cartItem,
    //  cartItem,
    //  cartItem
    //]

    //The price onSale and full price
    const isOnSale = product.onSale;
    const originalPrice = productContainer.querySelector(".original-price");
    const currentPrice = productContainer.querySelector(".current-price");
    currentPrice.classList.toggle("sale-price", isOnSale);

    if (isOnSale) {
      originalPrice.textContent = `${product.price} NOK`;
      currentPrice.textContent = `${product.discountedPrice} NOK`;
    } else {
      originalPrice.textContent = ""; // Clears the original price if not on sale
      currentPrice.textContent = `${product.price} NOK`;
    }
    console.log({
      product,
      isOnSale,
      originalPrice,
      currentPrice,
    });

    //The color picker on the product page
    const productColor = product.baseColor;

    const colorOptions = productContainer.querySelector(".color-options");

    const colorOption = colorOptions.querySelector(".color-radio");

    const colorInput = colorOption.querySelector("input");

    const colorText = colorOption.querySelector(".sr-only");

    colorInput.value = productColor;
    colorOption.className = "color-radio"; // Drops the hardcoded "black" class from the HTML
    colorOption.style.backgroundColor = productColor;
    colorText.textContent = productColor;

    // Product sizes on the product page
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

    // "You might also like": four other products of the same gender, which replaces the hardcoded Reviews section.
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
      price.textContent = `${related.price} NOK`;

      link.appendChild(image);
      cardMedia.appendChild(link);
      cardTitle.appendChild(title);
      cardFooter.appendChild(price);
      card.append(cardMedia, cardTitle, cardFooter);
      relatedGrid.appendChild(card);
    }

    //Added breadcrumb change for male products. Adjusts the breadcrumb link and text if the product is for men.
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

displayProduct();
