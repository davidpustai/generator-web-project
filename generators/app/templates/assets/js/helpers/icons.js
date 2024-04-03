const icons = {}
const icon = name => {
	if (icons.hasOwnProperty(name)) {
		return icons[name].outerHTML
	} else {
		const xhr = new XMLHttpRequest()
		xhr.addEventListener('load', e => {
			const parser = new DOMParser()
			icons[name] = parser.parseFromString(e.target.responseText, 'image/svg+xml').lastChild
			for (const $icon of document.querySelectorAll(`[data-icon="${name}"]`)) {
				$icon.parentNode.insertBefore(icons[name].cloneNode(true), $icon)
				$icon.remove()
			}
		})
		xhr.open('GET', `${basePath}/assets/img/icons/${name}.svg`)
		xhr.send()
		return `<i data-icon="${name}" hidden></i>`
	}
}
