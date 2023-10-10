describe('Editor Page Accessibility', function() {

    beforeEach(function() {
        cy.visit('http://localhost:3000');
    });

    it('front page can be opened', function() {
        cy.get('#popup').contains('Kirjaudu').click()
        cy.get("#navbar").contains('Koodieditori')
        cy.get("#editor").contains('Kirjoita koodia tähän')
        cy.get("#editorview").contains('Lähetä koodi kääntäjälle')
        cy.get("#editorview").contains('Lähetä koodi robotille')
    })

    it('front page can be opened (ENGLISH)', function() {
        cy.get('#popup').contains('Kirjaudu').click()
        cy.get('[data-testid=toggleLanguageButton]').contains('Switch to English').click();
        cy.get("#navbar").contains('Code Editor')
        cy.get("#editor").contains('Write code here')
        cy.get("#editorview").contains('Send code to compiler')
        cy.get("#editorview").contains('Send code to robot')
    })
});
