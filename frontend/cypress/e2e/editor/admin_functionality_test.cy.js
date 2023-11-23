describe('Admin functionality', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#registration-name-input').type('admin')
        cy.get('#popup').contains('Kirjaudu').click(50)
        cy.wait(1000)
        cy.get('#app-footer').contains('Open Admin').click(500)
    })

    it('Attempting to show students', function() {
        cy.get('.user-list .user-item').should('have.length.greaterThan', 1)
    })

    it('Attempting to show student files (FINNISH)', function() {
        cy.contains('.user-item', 'Alice').within(() => {
            cy.get('.user-action-button:contains("Näytä tiedostot")').click()
          })
        cy.get('.user-files-section').should('be.visible')
        cy.get('#user-files-section').should('have.length.greaterThan', 0)
    })

    it('Attempting to show student info (FINNISH)', function() {
        cy.contains('.user-item', 'Alice').within(() => {
            cy.get('.user-action-button:contains("Näytä käyttäjän tiedot")').click()
          })
        cy.get('.user-info').should('be.visible')
        cy.get('.user-info p:contains("Käyttäjä:")').should('contain', 'Alice')
        cy.get('.user-info p:contains("Salasana:")').should('contain', 'password123')
        cy.get('.change-password-button').should('be.visible')
    })

    it('Attempting to show student files (ENGLISH)', function() {
        cy.get('.navbar').contains('Switch to English').click()
        cy.contains('.user-item', 'Alice').within(() => {
            cy.get('.user-action-button:contains("Show Files")').click()
          })
        cy.get('.user-files-section').should('be.visible')
        cy.get('#user-files-section').should('have.length.greaterThan', 0)
    })

    it('Attempting to show student info (ENGLISH)', function() {
        cy.get('.navbar').contains('Switch to English').click()
        cy.contains('.user-item', 'Alice').within(() => {
            cy.get('.user-action-button:contains("Show User Info")').click()
          })
        cy.get('.user-info').should('be.visible')
        cy.get('.user-info p:contains("Username:")').should('contain', 'Alice')
        cy.get('.user-info p:contains("Password:")').should('contain', 'password123')
        cy.get('.change-password-button').should('be.visible')
    })

})