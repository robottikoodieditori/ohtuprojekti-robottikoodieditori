describe('Error Message Translation Functionality', () => {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#registration-name-input').type('admin')
        cy.get('#registration-password-input').type('password')
        cy.get('#popup').contains('Kirjaudu').click(500)
    });


    it('should display error messages in English and Finnish appropriately', () => {
        // Scenario: Validate Error Message in English
        // Ensure English is set by checking the toggle button text
        cy.get('[data-testid="toggleLanguageButton"]').invoke('text').then((text) => {
            if(text.includes('Vaihda suomeksi')) {
                // If English, send a message and check response text
                cy.get('#editor').type('{selectall}').type('fd 10');
                cy.get('#COMPILEBUTTON').click().wait(100);
                cy.get('#confirmation').should('contain', 'Palvelin vastasi:');
            }
        });

        // Scenario: Validate Error Message in Finnish
        // Switch language
        cy.get('[data-testid="toggleLanguageButton"]').click();

        // Check the message in Finnish
        cy.get('#editor').type('{selectall}').type('eteen 10');
        cy.get('#COMPILEBUTTON').click().wait(100);
        cy.get('#confirmation').should('contain', 'Server responded:');
    });
});