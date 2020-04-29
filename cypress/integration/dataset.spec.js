context('Dataset', () => {

  beforeEach(() => {
    cy.visit("http://localhost:8000/dataset/5dc1cfcf-8028-476c-a020-f58ec6dd621c")
  })

  it('I see the title and description', () => {
    cy.wait(6000)
    cy.get('h1').should('have.text', 'Gold Prices in London 1950-2008 (Monthly)')
    cy.get('.col-md-9').contains('Monthly gold prices (USD) in London from Bundesbank.')
  })

  it('I see the file is available to download', () => {
    cy.get('.dc-resource > svg').should('have.attr', 'class', 'dkan-icon')
    cy.get('.dc-resource > a').should('have.attr', 'href', 'http://dkan/sites/default/files/distribution/5dc1cfcf-8028-476c-a020-f58ec6dd621c/data_0.csv')
  })

  it('I can filter the data by year', () => {
    cy.get('.dc-table > :nth-child(2) .tr > :nth-child(2) input').type('1952-01')
    cy.wait(3000)
    cy.get('.dc-table .dc-tbody > :nth-child(1) > :nth-child(2)').should('contain', '1952-01')
    // Uncomment when pager is fixed.
    // cy.get('.-pagination .-pageInfo .-totalPages').should('contain','2')
  })

  it('I can sort the data by price', () => {
    cy.get('.dc-table > :nth-child(1) .tr > :nth-child(3)').click()
    cy.get('.dc-table .dc-tbody > :nth-child(1) > :nth-child(3)').should('contain', '101.623')
  })

  it('I see the tags.', () => {
    cy.get('.dc-tag-wrapper > :nth-child(2) > a').contains("economy");
    cy.get('.dc-tag-wrapper > :nth-child(3) > a').contains("price");
    cy.get('.dc-tag-wrapper > :nth-child(4) > a').contains("time-series");
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

  it('I can select the number of rows per page in the data preview.', () => {
    cy.get('.-pageInfo').should('contain', 'Page 1 of 38')
    cy.get('.page-size-select').select('50')
    cy.get('.-pageInfo').should('contain', 'Page 1 of 15')
    cy.get('.page-size-select').select('100')
    cy.get('.-pageInfo').should('contain', 'Page 1 of 8')
  })

  it('I can change the density of the data table rows', () => {
    cy.wait(3000)
    cy.get('.dc-tbody > .dc-tr > :nth-child(1)').should('have.css', 'padding', '5px')
    cy.get('[title="expanded"]').click()
    cy.get('.dc-tbody > .dc-tr > :nth-child(1)').should('have.css', 'padding', '21px 5px')
    cy.get('[title="normal"]').click()
    cy.get('.dc-tbody > .dc-tr > :nth-child(1)').should('have.css', 'padding', '14px 5px')
  })

  it.skip('I can resize the data preview columns.', () => {
    cy.get(':nth-child(1) > .rt-resizable-header').should('have.css', 'width', '100px')
    cy.get(':nth-child(1) > .rt-resizer')
      .trigger('mousedown', { which: 1 })
    cy.get(':nth-child(2) > .rt-resizer')
      .trigger("mousemove")
      .trigger("mouseup")
    cy.get(':nth-child(1) > .rt-resizable-header').should('have.css', 'width', '200px')
    // Column width is consistent.
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)').should('have.css', 'width', '200px')
  })

  it.only('I can open and close Advanced Table Config', () => {
    cy.get('#dc-modal-manage_columns-open').click()
    // cy.get('#react-aria-modal-dialog #dialog-title').should('contain', 'Display column')
    // Test close button in top right
    cy.get('#dc-modal-manage_columns-header-close').click()
    cy.get('#dc-modal-manage_columns').should('not.exist');
    // Test Done button
    cy.get('#dc-modal-manage_columns-open').click()
    cy.get('#dc-modal-manage_columns-close').click()
    cy.get('#dc-modal-manage_columns').should('not.exist');
    // Test Esc to close
    cy.get('#dc-modal-manage_columns-open').click()
    cy.get('body').type('{esc}')
    cy.get('#dc-modal-manage_columns').should('not.exist');
  })

  it.skip('I can remove and add back data table columns', () => {
    cy.get('.ReactTable .rt-tr').children('.rt-resizable-header').should('have.length', 9)
    cy.get('.ReactTable .rt-tr > .rt-resizable-header > .rt-resizable-header-content').should('contain', 'record_number')
    cy.get('#advanced_table_settings').click()
    cy.get('#react-aria-modal-dialog .target > :nth-child(1) .ds-c-label > span').should('contain', 'record_number')
    cy.get('#react-aria-modal-dialog .target > :nth-child(1) .ds-c-label').click()
    cy.get('#react-aria-modal-dialog .ds-c-button--primary').click()
    cy.get('.ReactTable .rt-tr > .rt-resizable-header > .rt-resizable-header-content').should('contain', 'org_nm')
    cy.get('.ReactTable .rt-tr').children('.rt-resizable-header').should('have.length', 8)
    cy.get('#advanced_table_settings').click()
    cy.get('#react-aria-modal-dialog .target > :nth-child(1) .ds-c-label').click()
    cy.get('#react-aria-modal-dialog .ds-c-button--primary').click()
    cy.get('.ReactTable .rt-tr > .rt-resizable-header > .rt-resizable-header-content').should('contain', 'record_number')
    cy.get('.ReactTable .rt-tr').children('.rt-resizable-header').should('have.length', 9)
  })

  it('I can reorder table columns', () => {
    cy.get('.dc-table > :nth-child(1) .tr > :nth-child(1)').should('contain', 'record_number')
    cy.get('#dc-modal-manage_columns-open').click()
    cy.get(`#dc-modal-manage_columns .dc-modal-body > :nth-child(2)`)
      .trigger('dragstart')
    cy.get(`#dc-modal-manage_columns .dc-modal-body > :nth-child(1)`)
      .trigger('dragover')
      .trigger('drop')
      
    cy.get('#dc-modal-manage_columns-close').click()
    cy.get('.dc-table > :nth-child(1) .tr > :nth-child(1)').should('contain', 'date')
  })
})
