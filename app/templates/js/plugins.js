// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// private Fast Selector wrapper,
// returns jQuery object. Only use where
// getElementById is not available.
var S = function (selector, context) {
	if (typeof selector === 'string') {
		if (context) {
			var cont;
			if (context.jquery) {
				cont = context[0];
				if (!cont) return context;
			} else {
				cont = context;
			}
			return $(cont.querySelectorAll(selector));
		}

		return $(document.querySelectorAll(selector));
	}

	return $(selector, context);
};