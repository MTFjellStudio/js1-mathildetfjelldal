// --- STATE --- (Variabler som lagrer appens data, f.eks. den fulle listen med jakker)



// --- DOM ELEMENTS --- (Elementer du henter fra HTML-en med querySelector)



// --- FUNCTIONS --- (Logikken og funksjonene dine)



// --- EVENT LISTENERS --- (Lytting etter knappetrykk, endringer, osv.)



// --- INITIAL LOAD --- (Oppstarts-koden som kjører med en gang siden lastes)

export function renderCartBadge(count) {
	const badges = document.querySelectorAll(".cart-badge");

	badges.forEach((badge) => {
		badge.textContent = count > 0 ? String(count) : "";
	});
}