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
    const productTitle = productContainer.querySelector(".card-title h3");
    const productImage = productContainer.querySelector(".card-media img");
    const productPrice = productContainer.querySelector(".price");
    const productLink = productContainer.querySelector(".card-media a");
    console.log({ productTitle, productImage, productPrice, productLink }); //Better way to inspect all elements at once than the 4 separate console.logs I originally had.

    const product = products.find((p) => p.id === productId);
    productTitle.textContent = product.title;
    productPrice.textContent = product.price;
    productImage.src = product.image.url;
    productImage.alt = product.image.alt;
    productLink.href = `product/index.html?id=${product.id}`;
  }
}

displayProduct();
