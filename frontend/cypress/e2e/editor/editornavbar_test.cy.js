describe('Login functionality', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#registration-name-input').type('admin')
        cy.get('#registration-password-input').type('password')
        cy.get('#popup').contains('Kirjaudu').click(50)
    });

    it('Attempting to make a new file', function() {
        cy.get('#editor').type('oikealle 20')
        cy.get('#editornavbar').contains('Uusi Tiedosto').click(50)
        cy.get("#editor").contains('Logo...')
    })

    it('Attempting to save a new file', function() {
        cy.get('#editor').type('eteen 10')
        cy.get('#editornavbar').contains('Tallenna').click(50)
        cy.get('#content-saveNew').contains('Anna uusi tiedostonimi')
        cy.get('#newFileNameInput').type('testi', {force:true})
        cy.get('#content-saveNew').contains('Tallenna nimellä').click(50)
        cy.get("#editor").should('contain', 'eteen 10')
    })

    it('Attempting to open a file', function() {
        cy.get('#editornavbar').contains('Avaa Tiedosto').click(500).wait(800)
        cy.get("#content-file-select").contains('Valitse tiedosto')
        cy.get('.file-row')
        .contains('.left-td', 'testi')
        .parent('.file-row')
        .within(() => {
          cy.get('.file-open-td').click();
        });        
        cy.get("#editor").should('contain', 'eteen 10')
    })

    it('Attempting to save an existing file', function() {
        cy.get('#editor').type('taakse 10')
        cy.get('#editornavbar').contains('Tallenna').click()
        cy.get('#content-saveNew').contains('Anna uusi tiedostonimi')
        cy.get('#newFileNameInput').type('testi2', {force:true})
        cy.get('#content-saveNew').contains('Tallenna nimellä').click()
        cy.wait(500)

        cy.get('#editor').type('{selectall}eteen 10')
        cy.get('#editornavbar').contains('Tallenna').click().wait(800)

        cy.get('#editornavbar').contains('Uusi Tiedosto').click()
        cy.get('#editor').contains('Logo...')

        cy.get('#editornavbar').contains('Avaa Tiedosto').click().wait(800)
        cy.get("#content-file-select").contains('Valitse tiedosto')
        cy.get('.file-row')
        .contains('.left-td', 'testi2')
        .parent('.file-row')
        .within(() => {
          cy.get('.file-open-td').click();
        });    
        cy.get('#editor').should('contain', 'eteen 10')
    })

    it('Attempting to hide a file', function() {
        cy.get('#editornavbar').contains('Avaa Tiedosto').click().wait(800)
        cy.get("#content-file-select").contains('Valitse tiedosto')
        cy.get('.file-row')
        .contains('.left-td', 'testi2')
        .parent('.file-row')
        .within(() => {
          cy.get('.file-hide-td').click();
        });    
        cy.get('#editornavbar').contains('Avaa Tiedosto').click().wait(800)
        cy.get('.file-row')
        .should('not.contain', '.left-td', 'testi2')
    })
})