describe('Admin functionality', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#registration-name-input').type('admin')
        cy.get('#registration-password-input').type('password')
        cy.get('#popup').contains('Kirjaudu').click().wait(50)
        cy.wait(1000)
        cy.get('#admin-view-button').contains('Vaihda näkymää').click().wait(500)
    })

    it('Attempting to make a new file deletes editor text', function() {
        cy.get('#editor').type("eteen 10")
        cy.get('#editor-toolbar').contains("Uusi Tiedosto").click()
        cy.get('#editor').should("contain", "Logo...")
    })

    it('Attempting to save a modified file', function() {
        cy.get('#all-files-section').first().as('firstFileRow')
        cy.get('@firstFileRow').contains('Avaa').click()
        cy.get('#editor').type(' eteen 20')
        cy.get('#editor-toolbar').contains('Tallenna').click()
        cy.get('#editor-toolbar').contains('Uusi Tiedosto').click()
        cy.get('#all-files-section').first().as('firstFileRow')
        cy.get('@firstFileRow').contains('Avaa').click()
        cy.get('#editor').should("contain","eteen 20")
        
    })

    it('Attempting to delete a file', function() {
        cy.get('#all-files-section').contains("TurtleDrawing_Alice.logo")
        cy.get('#all-files-section').first().as('firstFileRow')
        cy.get('@firstFileRow').contains('Avaa').click()
        cy.get('#editor').should('not.contain', 'Logo...')
        cy.get('#editor-toolbar').contains("Poista").click()
        cy.get('#all-files-section').should("not.contain", "TurtleDrawing_Alice.logo")
    })

})