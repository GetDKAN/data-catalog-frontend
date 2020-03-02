context('Search', () => {

 beforeEach(() => {
    cy.visit("http://dkan/search")
    cy.wait(5000)
  })

  //Search Page Text Input Filter
  it('When I enter text into the search input field on the search page, I should see the number of datasets that match.', () => {
    cy.get('#inputSearch').type('election')
    cy.get('.search-results-message > p').should('contain', 'datasets found for "election"')
    // Pluck the number from the results summary message.
    cy.get('.search-results-message').as('count')
    cy.get('@count').invoke('text')
        .then((count) => {
          count = parseInt(count.substr(0,5));
          cy.log('message', count)
          // The summary number should equal the datasets returned.
          cy.get('.dc-results-list ol').children().its('length').should('eq', count)
        })
    // Results list.
    cy.get('.dc-results-list ol').children().each(function($el, i) {
        let index = i + 1;
        if (index < 3) {
          // Each result has a heading.
          cy.get('.dc-results-list ol div.dc-search-list-item:nth-child(' + index + ')').find('h2')
          // Each result has file formats.
          cy.get('.dc-results-list ol div.dc-search-list-item:nth-child(' + index + ') .format-types').then((element) => {
            assert.isNotNull(element.text())
          })
        }
    })
  })


  // SORTING
  it('Sort results alphabetically', () => {
    cy.get('.dc-results-list ol div.dc-search-list-item:nth-child(1) h2')
        .should('contain', 'U.S. Tobacco Usage Statistics')
    cy.get('select#search-list-sort').select('title')
    cy.get('.dc-results-list ol div.dc-search-list-item:nth-child(1) h2')
      .should('contain', 'Afghanistan Election Districts')
    cy.get('.dc-results-list ol div.dc-search-list-item:nth-child(2) h2')
      .should('contain', 'Crime Data for the Ten Most Populous Cities in the U.S.')
    cy.get('.dc-results-list ol div.dc-search-list-item:nth-child(3) h2')
      .should('contain', 'Florida Bike Lanes')
  })


  // TOPIC FILTER
  it('The topics facet block should contain 5 topics and one legend', () => {
    cy.get('h2.facet-block-topics-inner').should('have.text','Topics')
    cy.get('.inner-topics-facets .show-more-container').children().should('have.length', 5)
  })

  it.skip('wip - Get expected values from the data.json', () => {
    let jsonTopics = [];
    cy.fixture('data.json').then((data) => {
      Cypress._.each(data, (d) => {
        Cypress._.each(d.theme, (theme) => {
          if (!jsonTopics.includes(theme.title)) {
            jsonTopics.push(theme.title)
          }
        })
      })
      console.log(jsonTopics)
    })
  })

  it('The topic terms should match the expected POD themes', () => {
    cy.get('.inner-topics-facets .show-more-container').children().then(($li) => {
      cy.fixture('topics.json').then((topics) => {
        Cypress._.each(topics, (category) => {
          expect($li).to.contain(category)
        })
      })
    })
  })

  it('Check results are returned when filtering for topic 1', () => {
    cy.get('.inner-topics-facets .show-more-container > :nth-child(1) > input').click()
    cy.get('.search-results-message').should('not.contain', '0')
    cy.get('.search-results-message').should('contain', 'dataset')
  })

  it('Check results are returned when filtering for topic 2', () => {
    cy.get('.inner-topics-facets .show-more-container > :nth-child(2) > input').click()
    cy.get('.search-results-message').should('not.contain', '0')
    cy.get('.search-results-message').should('contain', 'dataset')
  })

  it('Check results are returned when filtering for topic 3', () => {
    cy.get('.inner-topics-facets .show-more-container > :nth-child(3) > input').click()
    cy.get('.search-results-message').should('not.contain', '0')
    cy.get('.search-results-message').should('contain', 'dataset')
  })

  it('Check results are returned when filtering for topic 4', () => {
    cy.get('.inner-topics-facets .show-more-container > :nth-child(4) > input').click()
    cy.get('.search-results-message').should('not.contain', '0')
    cy.get('.search-results-message').should('contain', 'dataset')
  })

  it('Check results are returned when filtering for topic 5', () => {
    cy.get('.inner-topics-facets .show-more-container > :nth-child(5) > input').click()
    cy.get('.search-results-message').should('not.contain', '0')
    cy.get('.search-results-message').should('contain', 'dataset')
  })

  // KEYWORD FILTER
  // Not implemented by default in demo build
  it.skip('Check that the tags facet block has options', () => {
    cy.get('.inner-tags-facets .show-more-container').children()
      .its('length')
      .should('be.gt', 0)
    cy.get('h2.facet-block-tags-inner').should('have.text', 'Tags')
  })

  it.skip('When filtering by keyword I should get a smaller results list', () => {
    let results = 0;
    cy.get('.dc-results-list ol').children().each((item) => {
      results += 1;
    }).then(() => {
      cy.get('.inner-tags-facets .show-more-container > :nth-child(1) > input').click()
      cy.wait(1000)

      let filtered = 0;
      cy.get('.dc-results-list ol').children().each((element) => {
        filtered += 1;
      }).then(() => {
        expect(filtered).to.be.lessThan(results)
      })
    })
  })


  // FORMAT FILTER

  it.skip('Check that the Format facet block has options', () => {
    cy.get(':nth-child(3) > .list-group').children()
      .its('length')
      .should('be.gt', 0)
    cy.get(':nth-child(3) > h3').should('have.text','Format')
  })

  it.skip('When filtering by format I should get a smaller results list', () => {
    cy.get('.search-list').children()
      .its('length').as('results')
    cy.get(':nth-child(2) > .list-group > :nth-child(1) > a').click()
    cy.get('.search-list').children()
      .its('length').as('filtered')
    expect('@filtered').to.be.lessThan('@results')
  })
})
