describe('Login functionality', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#registration-name-input').type('Jaakko')
        cy.get('#popup').contains('Kirjaudu').click(500)
    });

    it('Attempting to make a new file', function() {
        cy.get('#editor').type('oikealle 20')
        cy.get('#editornavbar').contains('Uusi Tiedosto').click(500)
        cy.get("#editor").contains('Logo...')
    })

    it('Attempting to save a new file', function() {
        cy.get('#editor').type('eteen 10')
        cy.get('#editornavbar').contains('Tallenna').click(500)
        cy.get('#content-saveNew').contains('Anna uusi tiedostonimi')
        cy.get('#newFileNameInput').type('testi', {force:true})
        cy.get('#content-saveNew').contains('Tallenna nimellä').click(500)
        cy.get("#editor").should('contain', 'eteen 10')
    })
    it('Attempting to open a file', function() {
        cy.get('#editornavbar').contains('Avaa Tiedosto').click(500).wait(500)
        cy.get("#overlay").contains('Valitse tiedosto')
        cy.get("#overlay").contains('testi').click(1000)
        cy.get("#editor").should('contain', 'eteen 10')
    })
})