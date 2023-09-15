describe('Editor ', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('navbar')
    cy.contains('Koodieditori')
    cy.contains('Kirjoita koodia:')
    cy.contains('\\tekstiä tähän')
    cy.contains('Lähetä koodi kääntäjälle')
    cy.contains('Lähetä koodi robotille')
  })

  it('syntax is highlighted', function() {
    cy.visit('http://localhost:3000')
    cy.get("#editor").type("{selectall}{backspace}").type("eteen hellou")
    cy.contains("eteen").should("have.css", "color", "rgb(255, 0, 0)")
    cy.contains("hellou").should("have.css", "color", "rgb(0, 0, 255)")
  })

  it('syntax is highlighted reverse', function() {
    cy.visit('http://localhost:3000')
    cy.get("#editor").type("{selectall}{backspace}").type("hellou eteen")
    cy.contains("eteen").should("have.css", "color", "rgb(255, 0, 0)")
    cy.contains("hellou").should("have.css", "color", "rgb(0, 0, 255)")
  })

  it('hovering reveals documentation', function() {
    cy.visit('http://localhost:3000')
    cy.get("#editor").type("{selectall}{backspace}").type("eteen")
    cy.contains("eteen").click()
    cy.contains("lauseke et lauseke")
  })

  it('hovering on non keyword does not reveal documentation', function() {
    cy.visit('http://localhost:3000')
    cy.get("#editor").type("{selectall}{backspace}").type("hellou")
    cy.contains("hellou").click()
    cy.contains("lauseke et lauseke").should('not.exist')
  })
})