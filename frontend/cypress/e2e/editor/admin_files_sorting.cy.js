describe('Admin functionality', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#registration-name-input').type('admin')
        cy.get('#registration-password-input').type('password')
        cy.get('#popup').contains('Kirjaudu').click().wait(50)
        cy.wait(1000)
        cy.get('#admin-view-button').contains('Vaihda näkymää').click().wait(500)
    })

    it('Sorting files by filename', function() {
        cy.get('#all-files-section').contains('#file').click()
        cy.get('#files-body').first().as('firstFileRow')
        cy.get('@firstFileRow').contains('Zigzag_Henry.logo')
    })

    it('Sorting files by user', function() {
        
    })

    it('Sorting files by last date modified', function() {
        
    })
})