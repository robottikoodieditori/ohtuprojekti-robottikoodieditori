describe('sidebar Functionality', function() {
  beforeEach(function() {
      cy.visit('http://localhost:3000');
  });

  it('clicking command reveals documentation', function() {
      cy.get("#sidebar").contains("eteen").click();
      cy.wait(100);
      cy.get('#sidebar').contains("lauseke et lauseke");
  });

  it('clicking takaisin revels commands', function() {
    cy.get("#sidebar").contains("eteen").click();
    cy.wait(100);
    cy.get("#sidebar").contains("Takaisin").click();
    cy.get('#sidebar').contains("taakse");
  });


it('commands shown', function() {
  cy.get('#sidebar').contains("et");
  });

});
