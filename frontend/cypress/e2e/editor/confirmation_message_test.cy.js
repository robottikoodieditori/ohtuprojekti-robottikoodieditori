describe('Error Message Functionality', () => {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#registration-name-input').type('admin')
        cy.get('#registration-password-input').type('password')
        cy.get('#popup').contains('Kirjaudu').click(500)
    });


    it('should display error messages appropriately', () => {
        // Scenario: Validate Error Message in Finnish
        cy.get('[data-testid="toggleLanguageButton"]').invoke('text').then((text) => {
            if(text.includes('Switch to English')) {
                // If English, send a message and check response text
                cy.get('#editor').type('{selectall}').type('eteen 10');
                cy.get('#COMPILEBUTTON').click().wait(100);
                cy.get('#confirmation').should('contain', 'Palvelin vastasi:');
            }
        });
    });
});