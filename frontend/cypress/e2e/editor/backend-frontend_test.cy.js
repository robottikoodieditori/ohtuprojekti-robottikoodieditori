
describe('Communication between Front- and backend', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.get('#popup').contains('Kirjaudu').click(500)
    });

    it('typing in editor and pressing send displays server response on screen', function() {
        cy.get('#editor').type('{selectall}').type('This message will be sent.');
        cy.get('#SENDBUTTON').click().wait(100);
        cy.get('#sResponse').should('contain','Server responded:')
    })
})