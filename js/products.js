import { fetchProducts } from "./api.js";

async function displayWomenProducts() {
  const products = await fetchProducts();
  console.log(products);

  const womenProductGrid = document.querySelector(".women-product-grid");
  console.log(womenProductGrid);

  if (womenProductGrid) {
    //FILTER the products to only include female products
    function isFemaleProduct(product) {
      return product.gender === "Female";
    }
    const womenProducts = products.filter(isFemaleProduct); //Makes sure womenProducts filters only the female products through the gender property
    console.log(womenProducts);

    const productTitle = womenProductGrid.querySelector(".card-title h3");
    const productImage = womenProductGrid.querySelector(".card-media img");
    const productPrice = womenProductGrid.querySelector(".price");
    const productLink = womenProductGrid.querySelector(".card-media a");
    console.log({ productTitle, productImage, productPrice, productLink });

    const product = womenProducts[0]; // Get the first female product
    if (product) {
      productTitle.textContent = product.title;
      productPrice.textContent = product.price;
      productImage.src = product.image.url;
      productImage.alt = product.image.alt;
      productLink.href = `../product/index.html?id=${product.id}`;
    }

    //FOR EACH product inside womenProducts:

    //CREATE a product card

    //CREATE its image
    //use product.image.url

    //CREATE its title
    //use product.title

    //CREATE its price
    //use product.price

    //CREATE its link
    //use product.id

    //ADD completed card to womenProductGrid
  }
}

displayWomenProducts();
