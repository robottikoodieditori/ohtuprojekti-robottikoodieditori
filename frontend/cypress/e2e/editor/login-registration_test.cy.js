describe('Login functionality', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
    });

    it('Attempting to login without giving name does not let through to editor', function() {
        cy.get('#popup').contains('Kirjaudu').click(500)
        cy.get('#popup').contains('Et voi kirjautua nimettömänä!')
    })

    it('Changing language changes text to English', function() {
        cy.get('#registration-language-toggle-button').click()
        cy.get('#popup').should('contain', 'Log in')
        
    })

    it('Attempting to login without giving name does not let through to editor (ENGLISH)', function() {
        cy.get('#registration-language-toggle-button').click()
        cy.get('#popup').contains('Log in').click(500)
        cy.get('#popup').contains('You can\'t login without a name!')
    })

    it('Attempting to login with name lets user through to editor', function() {
        cy.get('#registration-name-input').type('example')
        cy.get('#popup').contains('Kirjaudu').click(500)
        cy.get('#popup').should('not.exist')
    })
})