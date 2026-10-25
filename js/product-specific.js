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
      //Changed this for readability. I did not feel I understood the other code well enough to implement it. const product = products.find((p) => String(p.id) === productId); originally.
      return product.id === productId;
    }
    const product = products.find(isCorrectProduct);

    productTitle.textContent = product.title;
    productImage.src = product.image.url;
    productImage.alt = product.image.alt;
    productDescription.textContent = product.description;

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
    colorOptions.innerHTML = ""; // Clear existing color options before adding new ones
    const colorOption = productContainer.querySelector(".color-radio");
    const colorInput = productContainer.querySelector(".color-radio input");
    const colorLabel = productContainer.querySelector(".color-radio label");
    const colorText = productContainer.querySelector(".color-radio .sr-only");

    // Product sizes on the product page
    const sizeOptions = productContainer.querySelector(".size-options");
    for (const size of product.sizes) {
    }

    //Added breadcrumb change for male products. Adjusts the breadcrumb link and text if the product is for men.
    // Will look for a solution that dynamically updates the breadcrumb based on the product's gender instead of specifically setting a rule for only one of the genders but not the other.
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
