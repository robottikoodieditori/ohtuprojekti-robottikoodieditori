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
        cy.get('#filename').click()
        cy.get('#files-body').first().as('firstFileRow')
        cy.get('@firstFileRow').should("contain", 'Zigzag_Henry.logo')
    })

    it('Sorting files by user', function() {
        cy.get('#username').click()
        cy.get('#files-body').first().as('firstFileRow')
        cy.get('@firstFileRow').should("contain", 'Henry')
    })

    it('Sorting files by last date modified', function() {
        cy.get('#date').click()
        cy.get('#files-body').first().as('firstFileRow')
        cy.get('@firstFileRow').should("contain", 'MoonCrescent_Bob.logo')
    })

    it('Sorting files by filename double', function() {
        cy.get('#filename').click()
        cy.get('#filename').click()
        cy.get('#files-body').first().as('firstFileRow')
        cy.get('@firstFileRow').should("contain", 'CircleDrawing_Bob.logo')
    })

})