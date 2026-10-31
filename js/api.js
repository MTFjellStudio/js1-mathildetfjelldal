/* ========================================
   API CONFIGURATION
   ======================================== */
const API_URL = "https://v2.api.noroff.dev/rainy-days";

/* ========================================
   FETCH PRODUCTS
   ======================================== */
export async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    const products = json.data;

    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}
