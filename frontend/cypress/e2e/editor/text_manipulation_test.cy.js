describe('Text Manipulation', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#popup').contains('Kirjaudu').click()
    });
  
    it('allows text to be typed into the editor', function() {
        cy.get("#editor").type('Hello, world!').should('contain', 'Hello, world!');
    });
  
    it('allows text to be deleted from the editor', function() {
        cy.get("#editor").type('Hello, world!{backspace}{backspace}{backspace}{backspace}{backspace}').should('not.contain', 'world!');
    });

    it('writing produces automcompletion hints', function() {
        cy.get('#editor').type('olk').should('contain', 'olkoon');
    })

    it('switching to English and writing produces autocompletion hints for English', function() {
        cy.get('#navbar').contains('Switch to English').click()
        cy.get('#editor').type('forw').should('contain', 'forward');
    })

    it('defining a command produces autocompletion hints for said command (Finnish)', function() {
        cy.get('#editor').type('miten uusi_funktio{enter}uus').get('.cm-tooltip-autocomplete').should('contain', 'uusi_funktio')
    }),

    it('defining a command produces autocompletion hints for said command (English)', function() {
        cy.get('#navbar').contains('Switch to English').click()
        cy.get('#editor').type('to new_function{enter}new').get('.cm-tooltip-autocomplete').should('contain', 'new_function')
    })
});
  