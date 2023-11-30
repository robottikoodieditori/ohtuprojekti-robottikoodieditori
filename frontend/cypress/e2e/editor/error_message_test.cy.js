describe('Error Message Functionality', () => {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#registration-name-input').type('admin')
        cy.get('#registration-password-input').type('password')
        cy.get('#popup').contains('Kirjaudu').click(500)
    });


    it('should display error messages appropriately', () => {
        cy.get('[data-testid="toggleLanguageButton"]').invoke('text').then((text) => {
            if(text.includes('Switch to English')) {
                cy.get('#editor').type('{selectall}').type('Tämä viesti lähetetään.');
                cy.get('#COMPILEBUTTON').click().wait(100);
                cy.get('#error').should('contain', 'Palvelin vastasi:');
            }
        });
    });
});