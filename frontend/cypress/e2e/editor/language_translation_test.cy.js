describe('Language translation', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#popup').contains('Kirjaudu').click()

    });

    it('should toggle to Finnish when clicking "Switch to English"', function() {
        cy.get('[data-testid=toggleLanguageButton]').contains('Switch to English').click();
        cy.get('[data-testid=toggleLanguageButton]').should('contain', 'Vaihda suomeksi');
    });

    it('should toggle to English when clicking "Vaihda suomeksi"', function() {
        cy.get('[data-testid=toggleLanguageButton]').contains('Switch to English').click();
        cy.get('[data-testid=toggleLanguageButton]').contains('Vaihda suomeksi').click();
        
        // Pausing here to manually inspect the state
        cy.pause();
        
        cy.get('[data-testid=toggleLanguageButton]').should('contain', 'Switch to English');
    });
});
