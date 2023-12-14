describe('Get to Admin view', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#registration-name-input').type('admin')
        cy.get('#registration-password-input').type('password')        
        cy.get('#popup').contains('Kirjaudu').click(50)
        cy.wait(300)

    })

    it('Attempting to get to admin view (FINNISH)', function() {
        cy.get('#admin-view-button').contains('Vaihda näkymää').click()
        cy.get('#admin-view').should('contain', 'Admin näkymä')
    })

    it('Attempting to get out of admin view (FINNISH)', function() {
        cy.get('#admin-view-button').contains('Vaihda näkymää').click()
        cy.get('#admin-view').should('contain', 'Admin näkymä')
        cy.get('#admin-view-button').contains('Vaihda näkymää').click()
        cy.get('#editorview').should('not.contain', 'Admin näkymä')
    })

    it('Attempting to get to admin view (ENGLISH)', function() {
        cy.get('#navbar').contains('Switch to English').click()
        cy.get('#admin-view-button').contains('Change view').click()
        cy.get('#admin-view').should('contain', 'Admin Dashboard')
    })

    it('Attempting to get out of admin view (ENGLISH)', function() {
        cy.get('#navbar').contains('Switch to English').click()
        cy.get('#admin-view-button').contains('Change view').click()
        cy.get('#admin-view').should('contain', 'Admin Dashboard')
        cy.get('#admin-view-button').contains('Change view').click()
        cy.get('#editorview').should('not.contain', 'Admin Dashboard')
    })
})