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
    console.log({ productTitle, productImage, productPrice });

    const product = products.find((p) => String(p.id) === productId);
    productTitle.textContent = product.title;
    productPrice.textContent = product.price;
    productImage.src = product.image.url;
    productImage.alt = product.image.alt;

    //Added breadcrumb change for male products. Adjusts the breadcrumb link and text if the product is for men.
    const categoryBreadcrumb = productContainer.querySelector(
      '.breadcrumbs a[href="../category/products-women.html"]',
    );
    if (product.gender === "Male" && categoryBreadcrumb) {
      categoryBreadcrumb.href = "../category/products-men.html";
      categoryBreadcrumb.textContent = "Jackets for Men";
    }
  }
}

displayProduct();
