describe('Communication between Front- and backend', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#popup').contains('Kirjaudu').click(500)
    });

    it('typing in editor and pressing send displays server response on screen', function() {
        cy.get('#editor').type('{selectall}').type('This message will be sent.');
        cy.get('#COMPILEBUTTON').click().wait(100);

        cy.get('[data-testid="toggleLanguageButton"]').invoke('text').then((text) => {
            const isFinnish = text.includes('Switch to English');
            const responseText = isFinnish ? 'Palvelin vastasi:' : 'Server responded:';
            cy.get('#sResponse').should('contain', responseText);
        });
    })
})
