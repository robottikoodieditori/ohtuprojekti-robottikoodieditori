describe('Error Message Functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('#popup').contains('Kirjaudu').click(500);
    });

    it('should display error messages appropriately', () => {
        // Scenario: Validate Error Message in Finnish
        cy.get('[data-testid="toggleLanguageButton"]').invoke('text').then((text) => {
            if(text.includes('Switch to English')) {
                // If English, send a message and check response text
                cy.get('#editor').type('{selectall}').type('Tämä viesti lähetetään.');
                cy.get('#COMPILEBUTTON').click().wait(100);
                cy.get('#sResponse').should('contain', 'Palvelin vastasi:');
            }
        });
    });
});