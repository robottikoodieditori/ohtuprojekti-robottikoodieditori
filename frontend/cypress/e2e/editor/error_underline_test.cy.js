describe('Text Manipulation', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#registration-name-input').type('admin')
        cy.get('#registration-password-input').type('password')        
        cy.get('#popup').contains('Kirjaudu').click(500)
    });


    it('error is underlined and normal text is not', function() {
        cy.get("#editor").type('{selectall}').type('asdf tulosta 1');
        cy.get('#COMPILEBUTTON').click().wait(100);
        cy.get("#editor").contains("asdf").get('.cm-underline').should('contain', 'asdf')
        cy.get("#editor").contains("tulosta").get('.cm-underline').should('not.contain', 'tulosta')

    });

});
