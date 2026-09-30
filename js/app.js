// --- STATE --- (Variabler som lagrer appens data, f.eks. den fulle listen med jakker)



// --- DOM ELEMENTS --- (Elementer du henter fra HTML-en med querySelector)



// --- FUNCTIONS --- (Logikken og funksjonene dine)



// --- EVENT LISTENERS --- (Lytting etter knappetrykk, endringer, osv.)



// --- INITIAL LOAD --- (Oppstarts-koden som kjører med en gang siden lastes)

import { getCartCount } from "./cart.js";
import { renderCartBadge } from "./ui.js";

function initGlobalUi() {
	renderCartBadge(getCartCount());
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initGlobalUi);
} else {
	initGlobalUi();
}