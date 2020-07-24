context('Publishers', () => {

  let baseUrl = Cypress.config().baseUrl;

  beforeEach(() => {
      cy.visit(baseUrl + "/home")
    })

    it.only('When I click the main menu Publishers link I should end up on the Publishers page', () => {
      cy.get('.navbar .nav').contains('Publishers').click({ force: true })
      cy.wait(5000)
      cy.get('h1').contains('Dataset Publishers')
      cy.get('.dc-publisher-list > :nth-child(1) > a > img').should('have.attr', 'src').should('include','group.png')
    })

  })
