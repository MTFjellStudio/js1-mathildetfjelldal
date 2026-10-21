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

            const card = document.createElement("div");

            card.classList.add("product-card");
            womenProductGrid.appendChild(card);

            const title = document.createElement("h3");
            title.textContent = product.title;
            card.appendChild(title);

            const image = document.createElement("img");
            image.src = product.image.url;
            image.alt = product.image.alt;
            card.appendChild(image);

            const price = document.createElement("p");
            price.textContent = `$${product.price}`;
            card.appendChild(price);

            const link = document.createElement("a");
            link.href = `product/index.html?id=${product.id}`;
            link.textContent = "View Product";
            card.appendChild(link);

            
        }


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
