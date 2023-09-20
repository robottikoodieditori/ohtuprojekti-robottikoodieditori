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

  it('searchbar does not show not searched commands', function() {
    cy.get("#searchbar").type('{selectall}').type('ta');
    cy.wait(100);
    cy.get('#sidebar').should('not.contain', "oikealle");
  });

  it('searchbar contains right commands', function() {
    cy.get("#searchbar").type('{selectall}').type('ta');
    cy.wait(100);
    cy.get('#sidebar').contains('taakse');
  });

  it('clicking command does not show searchbar', function() {
    cy.get("#sidebar").contains("eteen").click();
    cy.wait(100);
    cy.get('#sidebar').should('not.contain', '#searchbar');
});

    it('clicking on keyword in editor displays command on sidebar', function () {
        cy.get("#editor").type('{selectall}').type("eteen");
        cy.get("#editor").contains("eteen").click().wait(1500).click();
        cy.get("#sidebar").should('contain', 'eteen lauseke')
    })
});
