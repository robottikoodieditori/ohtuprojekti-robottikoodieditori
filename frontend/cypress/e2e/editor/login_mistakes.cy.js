describe('Login functionality', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
    });

    it('Attempting to login without giving name does not let through to editor', function() {
        cy.get('#popup').contains('Kirjaudu').click(500)
        cy.get('#popup').should('contain', 'Et voi kirjautua nimettömänä!')
    })

    it('Attempting to login without password does not let through to editor', function() {
        cy.get('#registration-name-input').type('admin')
        cy.get('#popup').contains('Kirjaudu').click(500)
        cy.get('#popup').should('contain', 'Et voi kirjautua ilman salasanaa!')
    })

    it('Attempting to login with wrong password', function() {
        cy.get('#registration-name-input').type('admin')
        cy.get('#registration-password-input').type('salasana')  
        cy.get('#popup').contains('Kirjaudu').click(500)
        cy.get('#popup').should('contain', 'Väärät kirjautumistiedot!')
    })

})