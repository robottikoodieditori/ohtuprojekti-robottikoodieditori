describe('Hover Functionality', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
    });

    it('hovering reveals documentation', function() {
        cy.get("#editor").type('{selectall}').type("eteen");
        cy.get("#editor").contains("eteen").click();
        cy.wait(100);
        cy.get("#editor").contains("lauseke et lauseke");
    });

    it('does not show documentation for non-command words', function() {

        const commands = ['tulosta', 'eteen', 'taakse', 'vasemmalle', 'oikealle', 'jos', 'riippuen', 'olkoon', 'miten', 'anna', 'toista', 'luvuille'];

        cy.get("#editor").type('{selectall}').type('nonCommandWord');
        cy.get("#editor").contains('nonCommandWord').click();
        cy.wait(100);
        commands.forEach(command => {
            cy.get('#editor').should('not.contain', command);
        });
    });
});
