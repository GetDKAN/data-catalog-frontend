context('Dataset', () => {

  beforeEach(() => {
    cy.visit("http://dkan/dataset/5dc1cfcf-8028-476c-a020-f58ec6dd621c")
  })

  it('I see the title and description', () => {
    cy.wait(6000)
    cy.get('h1').should('have.text', 'Gold Prices in London 1950-2008 (Monthly)')
    cy.get('.col-md-9').contains('Monthly gold prices (USD) in London from Bundesbank.')
  })

  it.skip('I see the file is available to download', () => {
    cy.get('.dc-resource > svg').should('have.attr', 'class', 'dkan-icon')
    cy.get('.dc-resource > a').should('have.attr', 'href', 'http://dkan/sites/default/files/distribution/5dc1cfcf-8028-476c-a020-f58ec6dd621c/data_0_0.csv')
  })

  it('I can filter the data by year', () => {
    cy.get('.ReactTable .rt-tr > :nth-child(2) > input').type('1952-01')
    cy.get('.ReactTable .rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)').should('contain', '1952-01')
    // Uncomment when pager is fixed.
    // cy.get('.-pagination .-pageInfo .-totalPages').should('contain','2')
  })

  it('I can sort the data by price', () => {
    cy.get('.ReactTable :nth-child(3) > .rt-resizable-header-content').click()
    cy.get('.ReactTable .rt-tbody > :nth-child(1) > .rt-tr > :nth-child(3)').should('contain', '101.623')
  })

  it('I see the tags.', () => {
    cy.get('.tag-wrapper > :nth-child(1) > a').contains("economy");
    cy.get('.tag-wrapper > :nth-child(2) > a').contains("price");
    cy.get('.tag-wrapper > :nth-child(3) > a').contains("time-series");
  })

  it('I see the release and update date, identifier, and contact information.', () => {
    var keys = [
      "Publisher",
      "Identifier",
      "Issued",
      "Last Update",
      "Contact",
      "Contact E-mail",
      "Public Access Level"
    ]

    var values = [
      'State Economic Council',
      '5dc1cfcf-8028-476c-a020-f58ec6dd621c',
      '2013-02-10',
      '2019-06-06',
      'Gray, Stefanie',
      'mailto:datademo@example.com',
      'public'
    ]

    keys.forEach((value, index) => {
      var final = index + 1;
      cy.get('.table-three > .table > tbody > :nth-child(' + final + ') > :nth-child(1)').contains(value);
      cy.get('.table-three > .table > tbody > :nth-child(' + final + ') > :nth-child(2)').contains(values[index]);
    })
  })
})
