describe('Error Message Translation Functionality', () => {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#registration-name-input').type('admin')
        cy.get('#registration-password-input').type('password')
        cy.get('#popup').contains('Kirjaudu').click(500)
    });


    it('should display error messages in English and Finnish appropriately', () => {
        cy.get('[data-testid="toggleLanguageButton"]').invoke('text').then((text) => {
            if(text.includes('Vaihda suomeksi')) {
                cy.get('#editor').type('{selectall}').type('This message will be sent.');
                cy.get('#COMPILEBUTTON').click().wait(100);
                cy.get('#error').should('contain', 'Palvelin vastasi:');
            }
        });

        cy.get('[data-testid="toggleLanguageButton"]').click();
        cy.get('#editor').type('{selectall}').type('Tämä viesti lähetetään.');
        cy.get('#COMPILEBUTTON').click().wait(100);
        cy.get('#error').should('contain', 'Server responded:');
    });
});
