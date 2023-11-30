describe('Editor Page Accessibility', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#registration-name-input').type('admin')
        cy.get('#registration-password-input').type('password')        
        cy.get('#popup').contains('Kirjaudu').click(500)
    });

    it('front page can be opened', function() {
        cy.get("#navbar").contains('Koodieditori')
        cy.get("#editor").contains('Logo...')
        cy.get("#editorview").contains('Lähetä koodi kääntäjälle')
        cy.get("#editorview").contains('Lähetä koodi robotille')
    })

    it('front page can be opened (ENGLISH)', function() {
        cy.get('[data-testid=toggleLanguageButton]').contains('Switch to English').click();
        cy.get("#navbar").contains('Code Editor')
        cy.get("#editor").contains('Logo...')
        cy.get("#editorview").contains('Send code to compiler')
        cy.get("#editorview").contains('Send code to robot')
    })
});
