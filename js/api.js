// --- STATE --- (Variabler som lagrer appens data, f.eks. den fulle listen med jakker)



// --- DOM ELEMENTS --- (Elementer du henter fra HTML-en med querySelector)



// --- FUNCTIONS --- (Logikken og funksjonene dine)
const url = "https://v2.api.noroff.dev/rainy-days";

export async function fetchProducts() {
  try {
    const response = await fetch(url);
    
    // Sjekker om vi fikk et vellykket svar fra serveren
    if (!response.ok) {
      throw new Error(`Klarte ikke hente data. Status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data; // Sender selve arrayen med jakker tilbake

  } catch (error) {
    console.error("Feil ved henting av produkter:", error);
    return [];
  }
}


// --- EVENT LISTENERS --- (Lytting etter knappetrykk, endringer, osv.)



// --- INITIAL LOAD --- (Oppstarts-koden som kjører med en gang siden lastes)