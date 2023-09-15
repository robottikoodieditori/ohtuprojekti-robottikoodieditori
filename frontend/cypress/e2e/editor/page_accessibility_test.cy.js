describe('Editor Page Accessibility', function() {
    it('front page can be opened', function() {
        cy.visit('http://localhost:3000')
        cy.contains('navbar')
        cy.contains('Koodieditori')
        cy.contains('Kirjoita koodia:')
        cy.contains('\\tekstiä tähän')
        cy.contains('Lähetä koodi kääntäjälle')
        cy.contains('Lähetä koodi robotille')
    })
});
