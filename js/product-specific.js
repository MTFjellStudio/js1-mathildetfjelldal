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
    const productPrice = productContainer.querySelector(".price-large");
    const productDescription = productContainer.querySelector(".product-intro");
    console.log({
      productTitle,
      productImage,
      productPrice,
      productDescription,
    });

    function isCorrectProduct(product) {
      //Changed this for readability. I did not feel I understood the other code well enough to implement it. const product = products.find((p) => String(p.id) === productId); originally.
      return product.id === productId;
    }
    const product = products.find(isCorrectProduct);

    productTitle.textContent = product.title;
    productPrice.textContent = `${product.price} NOK`;
    productImage.src = product.image.url;
    productImage.alt = product.image.alt;
    productDescription.textContent = product.description;

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
