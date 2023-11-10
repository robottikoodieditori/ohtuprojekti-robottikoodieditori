describe('Language translation', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#registration-name-input').type('example')
        cy.get('#popup').contains('Kirjaudu').click(500)
    });


    it('should toggle to Finnish when clicking "Switch to English"', function() {
        cy.get('[data-testid=toggleLanguageButton]').contains('Switch to English').click();
        cy.get('[data-testid=toggleLanguageButton]').should('contain', 'Vaihda Suomeksi');
    });

    it('should toggle to English when clicking "Vaihda suomeksi"', function() {
        cy.get('[data-testid=toggleLanguageButton]').contains('Switch to English').click();
        cy.get('[data-testid=toggleLanguageButton]').contains('Vaihda Suomeksi').click();
        
        // Pausing here to manually inspect the state
        cy.pause();
        
        cy.get('[data-testid=toggleLanguageButton]').should('contain', 'Switch to English');
    });
});
