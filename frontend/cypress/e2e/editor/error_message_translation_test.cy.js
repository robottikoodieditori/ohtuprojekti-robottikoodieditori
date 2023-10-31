describe('Error Message Translation Functionality', () => {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#registration-name-input').type('example')
        cy.get('#popup').contains('Kirjaudu').click(500)
    });


    it('should display error messages in English and Finnish appropriately', () => {
        // Scenario: Validate Error Message in English
        // Ensure English is set by checking the toggle button text
        cy.get('[data-testid="toggleLanguageButton"]').invoke('text').then((text) => {
            if(text.includes('Vaihda suomeksi')) {
                // If English, send a message and check response text
                cy.get('#editor').type('{selectall}').type('This message will be sent.');
                cy.get('#COMPILEBUTTON').click().wait(100);
                cy.get('#sResponse').should('contain', 'Palvelin vastasi:');
            }
        });

        // Scenario: Validate Error Message in Finnish
        // Switch language
        cy.get('[data-testid="toggleLanguageButton"]').click();

        // Check the message in Finnish
        cy.get('#editor').type('{selectall}').type('Tämä viesti lähetetään.');
        cy.get('#COMPILEBUTTON').click().wait(100);
        cy.get('#sResponse').should('contain', 'Server responded:');
    });
});
