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

    for (const product of womenProducts) {
      console.log(product);

      const card = document.createElement("article");
      card.classList.add("product-card");
      womenProductGrid.appendChild(card);

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
      price.textContent = `${product.price} NOK`;
      cardFooter.appendChild(price);

      const rating = document.createElement("div");
      rating.classList.add("rating");
      cardFooter.appendChild(rating);

      for (let i = 0; i < 5; i++) {
        const star = document.createElement("i");
        star.classList.add("fa-solid", "fa-star");
        rating.appendChild(star);
      }

      const count = document.createElement("span");
      count.classList.add("count");
      count.textContent = "(128)";
      rating.appendChild(count);
    }
  }
}

displayWomenProducts();
