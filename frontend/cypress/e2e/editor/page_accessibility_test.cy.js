describe('Editor Page Accessibility', function() {
    it('front page can be opened', function() {
        cy.visit('http://localhost:3000')
        cy.get('#popup').contains('Kirjaudu').click(500)
        cy.get("#navbar").contains('Koodieditori')
        cy.get("#editor").contains('Kirjoita koodia tähän')
        cy.get("#editorview").contains('Lähetä koodi kääntäjälle')
        cy.get("#editorview").contains('Lähetä koodi robotille')
    })
});
