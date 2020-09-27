describe('App', function() {
  it('Visits the Application page', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Williams-Sonoma Coding Challenge');
    cy.get('.App').find('[data-testid=Products] > :nth-child(1) > :nth-child(1)').click();
  });
})