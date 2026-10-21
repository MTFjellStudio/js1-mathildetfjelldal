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

    for (let i = 0; i < womenProducts.length; i++) {
      const product = womenProducts[i];
      // womenProducts.length = 6
      console.log(product);
    }

    // 3. CREATE one product card

    // 4. CREATE its title

    // 5. CREATE its image

    // 6. CREATE its price

    // 7. CREATE its link

    // 8. PUT the current product's API data into those elements

    // 9. PUT those elements inside the card

    // 10. PUT the card inside womenProductGrid
  }
}

displayWomenProducts();
