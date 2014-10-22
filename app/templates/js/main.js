$(function() {
	// Enable FastClick if present
	if (typeof FastClick !== 'undefined') {
		// Don't attach to body if undefined
		if (typeof document.body !== 'undefined') {
			FastClick.attach(document.body);
		}
	}
});