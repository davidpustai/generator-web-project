import { defineConfig } from 'cypress';
import execa from 'execa';

const findBrowser = () => {
	const browserPath = '/usr/bin/brave-browser'

	return execa(browserPath, ['--version']).then((result) => {
		// STDOUT will be like "Brave Browser 77.0.69.135"
		const [, version] = /Brave Browser (\d+\.\d+\.\d+\.\d+)/.exec(result.stdout)
		const majorVersion = parseInt(version.split('.')[0])

		return {
			name: 'Brave',
			channel: 'stable',
			family: 'chromium',
			displayName: 'Brave',
			version,
			path: browserPath,
			majorVersion
		}
	})
}

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:8000',
		pageLoadTimeout: 5000,
		setupNodeEvents(on, config) {
			return findBrowser().then((browser) => {
				return {
					browsers: config.browsers.concat(browser),
				}
			})
		}
	},
	viewportHeight: 360,
	viewportWidth: 640
})
