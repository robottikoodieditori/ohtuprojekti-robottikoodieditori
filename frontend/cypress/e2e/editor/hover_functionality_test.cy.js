describe('Hover Functionality', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#popup').contains('Kirjaudu').click(500)
    });

    it('hovering reveals documentation', function() {
        cy.get("#editor").type('{selectall}').type("eteen ja pois");
        cy.get('#editor').contains('eteen').click()
        cy.get('#tooltip').should('exist').should('contain', 'Liiku')
    });

    it('does not show documentation for non-command words', function() {

        const commands = ['tulosta', 'eteen', 'taakse', 'vasemmalle', 'oikealle', 'jos', 'riippuen', 'olkoon', 'miten', 'anna', 'toista', 'luvuille'];

        cy.get("#editor").type('{selectall}').type('nonCommandWord');
        cy.get("#editor").contains('nonCommandWord').click();
        commands.forEach(command => {
            cy.get('#editor').should('not.contain', command);
        });
    });
});
