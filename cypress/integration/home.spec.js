context('Home', () => {

beforeEach(() => {
    cy.visit("http://dkan/home")
  })

  it('I should see a logo in the header region', () => {
    cy.get('.branding a.dc-logo img').should('be.visible')
  })

  it('I should see the main menu links in the navbar', () => {
    var links = [
      'Home',
      'Datasets',
      'Publishers',
      'About',
      'API'
    ]
    for (var key in links) {
      var value = links[key]
      var index = parseInt(key) + 1
      cy.get('.nav > li:nth-child(' + index + ') > a').should('have.text', value)
    }
  })

  it('Clicking the mobile menu toggle button should reveal the main menu links', () => {
    cy.viewport(550, 750)
    cy.get('button.navbar-toggler').click()
    cy.get('.navbar .nav').contains('About').click({ force: true })
    cy.wait(5000)
    cy.get('h1').contains('About this site')
    cy.viewport('macbook-13')
  })

  it('When I click the main menu Publishers link I should end up on the Publishers page', () => {
    cy.get('.navbar .nav').contains('Publishers').click({ force: true })
    cy.wait(5000)
    cy.get('h1').contains('Dataset Publishers')
  })

  it('I should see the expected custom text on the home page', () => {
    cy.get('.dc-hero-title').should('contain', 'Welcome to DKAN');
    cy.get('.dc-hero-search button').should('contain', 'Go');
  })

  it('When on the home page I can search for some text', () => {
    cy.get('#hero_search').type('Gold')
    cy.get('.dc-hero button[type="submit"]').click()
    cy.wait(5000)
    cy.get('.dc-search-results-message > p').should('contain', '1 dataset found')
    cy.get('.dc-search-list-item > h2 > a').should('contain', 'Gold Prices in London')
  })

  it('When on the home page I should see 5 topics in the Dataset Topics region', () => {
    cy.wait(6000)
    var topics = [
      'Transportation',
      'City Planning',
      'Finance and Budgeting',
      'Public Safety',
      'Health Care'
    ]

    for (var key in topics) {
      var value = topics[key]
      var index = parseInt(key) + 1
      cy.get(':nth-child(' + index  + ') > a > div').should('have.text', value)
    }
  })

  it('When I click on a topic button I should end up on the search page filtered by that topic', () => {
    cy.wait(2000)
    cy.get(':nth-child(1) > a > div').invoke('text').then(topicClicked => {
      cy.get(':nth-child(1) > a > div').click()
      cy.wait(2000)
      cy.get('.inner-topics-facets > .show-more-wrapper > .show-more-container > :nth-child(1) > input').should('be.checked')
      cy.get('.dc-facet-option > label').invoke('text').should('contain', topicClicked)
    })
  })

  it('The featured datasets region should contain 3 datasets', () => {
    cy.get('.dc-featured-datasets ol').children().should('have.length', 3)
  })

  it('When on the home page I can see the elements on the leftnav footer menu', () => {
    cy.wait(6000)
    cy.get('#leftnav > ul').children().its('length').should('eq', 4)
  })

})
