/* ========================================
   API CONFIGURATION
   ======================================== */
// Store the Rainy Days API URL.
const API_URL = "https://v2.api.noroff.dev/rainy-days";

/* ========================================
   FETCH PRODUCTS
   ======================================== */
export async function fetchProducts() {
  // 1. fetches the products
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } // 2. checks that the response was successful

    const json = await response.json(); // 3. converts the response to JSON
    const products = json.data;
    // The API response contains the products inside its "data" property.
    // Store that array in a descriptive variable for readability.

    return products; // 4. returns the product data
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return []; // 5. handles errors
  }
}
