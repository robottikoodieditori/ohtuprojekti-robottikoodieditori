describe('Editor Page Accessibility', function() {
    it('front page can be opened', function() {
        cy.visit('http://localhost:3000')
        cy.get("#navbar").contains('navbar')
        cy.get("#editorview").contains('Koodieditori')
        cy.get("#editorview").contains('Kirjoita koodia:')
        cy.get("#editor").contains('\\tekstiä tähän')
        cy.get("#editorview").contains('Lähetä koodi kääntäjälle')
        cy.get("#editorview").contains('Lähetä koodi robotille')
    })
});
