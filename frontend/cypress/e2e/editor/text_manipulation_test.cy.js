describe('Text Manipulation', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000');
    });
  
    it('allows text to be typed into the editor', function() {
      cy.get("#editor").type('Hello, world!').should('contain', 'Hello, world!');
    });
  
    it('allows text to be deleted from the editor', function() {
      cy.get("#editor").type('Hello, world!{backspace}{backspace}{backspace}{backspace}{backspace}').should('not.contain', 'world!');
    });
  });
  