describe('Syntax Highlighting', function() {

    beforeEach(function() {
        cy.visit('http://localhost:3000');
    });

    it('syntax is highlighted', function() {
        cy.get('#popup').contains('Kirjaudu').click(500)
        cy.get("#editor").type('{selectall}').type("eteen hellou")
        cy.get("#editor").contains("eteen").should("have.css", "color", "rgb(255, 0, 0)")
        cy.get("#editor").contains("hellou").should("have.css", "color", "rgb(0, 0, 255)")
    })

    it('syntax is highlighted reverse', function() {
        cy.get('#popup').contains('Kirjaudu').click(500)
        cy.get("#editor").type('{selectall}').type("hellou eteen")
        cy.get("#editor").contains("eteen").should("have.css", "color", "rgb(255, 0, 0)")
        cy.get("#editor").contains("hellou").should("have.css", "color", "rgb(0, 0, 255)")
    })

    it('syntax is highlighted (ENGLISH)', function() {
        cy.get('[data-testid=toggleLanguageButton]').contains('Switch to English').click();
        cy.get("#editor").type('{selectall}').type("forward hellou")
        cy.get("#editor").contains("forward").should("have.css", "color", "rgb(255, 0, 0)")
        cy.get("#editor").contains("hellou").should("have.css", "color", "rgb(0, 0, 255)")
    })

    it('syntax is highlighted reverse (ENGLISH)', function() {
        cy.get('[data-testid=toggleLanguageButton]').contains('Switch to English').click();
        cy.get("#editor").type('{selectall}').type("hellou if")
        cy.get("#editor").contains("if").should("have.css", "color", "rgb(255, 0, 0)")
        cy.get("#editor").contains("hellou").should("have.css", "color", "rgb(0, 0, 255)")
    })
});
