describe('Login functionality', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
    });

    it('Changing language changes text to English', function() {
        cy.get('#registration-language-toggle-button').click()
        cy.get('#popup').should('contain', 'Log in')
    })

    it('Attempting to login afterwards', function() {
        cy.get('#popup').contains('X').click(500)
        cy.get('#navbar').contains('Kirjaudu').click(500)
        cy.get('#registration-name-input').type('admin')
        cy.get('#registration-password-input').type('password')
        cy.get('#popup').contains('Kirjaudu').click(500)
        cy.get('#navbar').should('contain', 'admin')
    })

    it('Attempting to login afterwards (ENGLISH)', function() {
        cy.get('#popup').contains('X').click(500)
        cy.get('#navbar').contains('Switch to English').click(500)
        cy.get('#navbar').contains('Log in').click(500)
        cy.get('#registration-name-input').type('admin')
        cy.get('#registration-password-input').type('password')        
        cy.get('#popup').contains('Log in').click(500)
        cy.get('#navbar').should('contain', 'admin')
    })

    it('Logout from editor', function() {
        cy.get('#registration-name-input').type('admin')
        cy.get('#registration-password-input').type('password')        
        cy.get('#popup').contains('Kirjaudu').click(500)
        cy.get('#navbar').should('contain', 'admin')
        cy.get('#navbar').contains('Kirjaudu ulos').click(500)
        cy.get('#navbar').should('contain', 'Kirjaudu')
    })

    it('Logout from editor (ENGLISH)', function() {
        cy.get('#popup').contains('Switch to English').click(500)
        cy.get('#registration-name-input').type('admin')
        cy.get('#registration-password-input').type('password')        
        cy.get('#popup').contains('Log in').click(500)
        cy.get('#navbar').should('contain', 'admin')
        cy.get('#navbar').contains('Log out').click(500)
        cy.get('#navbar').should('contain', 'Log in')
    })
})