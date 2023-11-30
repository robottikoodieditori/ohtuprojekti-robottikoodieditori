describe('sidebar Functionality', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#registration-name-input').type('admin')
        cy.get('#registration-password-input').type('password')        
        cy.get('#popup').contains('Kirjaudu').click(500)
    });


  it('clicking command reveals documentation', function() {
      cy.get("#sidebar").contains("eteen").click();
      cy.wait(100);
      cy.get('#sidebar').contains("lauseke et lauseke");
  });

  it('clicking takaisin revels commands', function() {
    cy.get("#sidebar").contains("eteen").click();
    cy.get("#sidebar").contains("Takaisin").click();
    cy.get('#sidebar').contains("taakse");
  });


  it('commands shown', function() {
    cy.get('#sidebar').contains("et");
    });

  it('searchbar does not show not searched commands', function() {
      cy.get("#searchbar").type('{selectall}').type('ta');
      cy.get('#sidebar').should('not.contain', "oikealle");
  });
  

  it('searchbar contains right commands', function() {
    cy.get("#searchbar").type('{selectall}').type('ta');
    cy.get('#sidebar').contains('taakse');
  });

  it('clicking command does not show searchbar', function() {
    cy.get("#sidebar").contains("eteen").click();
    cy.get('#sidebar').should('not.contain', '#searchbar');
  });

  it('clicking on keyword in editor displays command on sidebar', function () {
      cy.get("#editor").type('{selectall}').type("eteen");
      cy.get("#editor").contains("eteen").click().wait(1500).click();
      cy.get("#sidebar").should('contain', 'eteen lauseke')
  })

  });

// in english
describe('sidebar Functionality', function() {
  beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#registration-name-input').type('admin')
        cy.get('#registration-password-input').type('password') 
        cy.get('#popup').contains('Kirjaudu').click(500)

        cy.get("#navbar").contains("Switch to English").click();
  });

    it('clicking command reveals documentation in english', function() {
      cy.get("#sidebar").contains("forward").click();
      cy.get('#sidebar').contains("expr fd expr");
    });

    it('clicking return revels commands in english', function() {
    cy.get("#sidebar").contains("forward").click();
    cy.get("#sidebar").contains("Return").click();
    cy.get('#sidebar').contains("forward");
    });


    it('commands shown in english', function() {
    cy.get('#sidebar').contains("fd");
    });

    it('searchbar does not show not searched commands in english', function() {
    cy.get("#searchbar").type('{selectall}').type('fd');
    cy.get('#sidebar').should('not.contain', "right");
    });

    it('searchbar contains right commands in english', function() {
    cy.get("#searchbar").type('{selectall}').type('fo');
    cy.get('#sidebar').contains('forward');
    });

    it('clicking command does not show searchbar in english', function() {
    cy.get("#sidebar").contains("forward").click();
    cy.get('#sidebar').should('not.contain', '#searchbar');
    });

    it('clicking translate goes back to finnish', function() {
      cy.get("#navbar").contains("Vaihda Suomeksi").click();
      cy.get('#sidebar').contains('eteen');
      });

});
