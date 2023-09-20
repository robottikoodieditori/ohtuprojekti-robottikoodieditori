describe('Syntax Highlighting', function() {
    it('syntax is highlighted', function() {
        cy.visit('http://localhost:3000')
        cy.get("#editor").type('{selectall}').type("eteen hellou")
        cy.get("#editor").contains("eteen").should("have.css", "color", "rgb(255, 0, 0)")
        cy.get("#editor").contains("hellou").should("have.css", "color", "rgb(0, 0, 255)")
    })

    it('syntax is highlighted reverse', function() {
        cy.visit('http://localhost:3000')
        cy.get("#editor").type('{selectall}').type("hellou eteen")
        cy.get("#editor").contains("eteen").should("have.css", "color", "rgb(255, 0, 0)")
        cy.get("#editor").contains("hellou").should("have.css", "color", "rgb(0, 0, 255)")
    })
});
