describe('Homepage', () => {
	it('loads', () => {
		cy.visit('/')
		cy.contains('Hello world!')
	})
})
