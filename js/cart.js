// --- STATE --- (Variabler som lagrer appens data, f.eks. den fulle listen med jakker)



// --- DOM ELEMENTS --- (Elementer du henter fra HTML-en med querySelector)



// --- FUNCTIONS --- (Logikken og funksjonene dine)



// --- EVENT LISTENERS --- (Lytting etter knappetrykk, endringer, osv.)



// --- INITIAL LOAD --- (Oppstarts-koden som kjører med en gang siden lastes)

const CART_KEY = "rainydays_cart";

export function getCart() {
	try {
		const raw = localStorage.getItem(CART_KEY);
		const parsed = JSON.parse(raw || "[]");
		return Array.isArray(parsed) ? parsed : [];
	} catch (error) {
		return [];
	}
}

export function getCartCount() {
	return getCart().reduce((sum, item) => {
		const quantity = Number(item?.quantity) || 0;
		return sum + quantity;
	}, 0);
}