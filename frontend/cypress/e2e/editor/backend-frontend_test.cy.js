
describe('Communication between Front- and backend', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
    });

    it('typing in editor and pressing send displays server response on screen', function() {
        cy.get('#editor').type('{selectall}').type('This message will be sent.');
        cy.get('#SENDBUTTON').click().wait(100);
        cy.get('#sResponse').should('contain','Server responded: This message will be sent.')
    })
})

/*
describe('Communication between Front- and backend', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
    });

    it('typing in editor and pressing send displays server response on screen', function() {
        // Forcing the type action regardless of the element’s actionability
        cy.get('#editor').type('{selectall}', {force: true}).type('This message will be sent.', {force: true});
        
        // You might also want to force the click action if needed
        cy.get('#SENDBUTTON').click({force: true}).wait(100);

        cy.get('#sResponse').should('contain','Server responded: This message will be sent.')
    })
})
*/