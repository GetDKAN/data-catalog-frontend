context('Dataset', () => {

  beforeEach(() => {
    cy.visit("http://dkan/dataset/d460252e-d42c-474a-9ea9-5287b1d595f6")
  })

  it('I see the title and description', () => {
    cy.get('h1').should('have.text', 'Crime Data for the Ten Most Populous Cities in the U.S.')
    cy.get('.col-md-9').contains('Source: FBI Uniform Crime Report')
  })

  it('I see the file is available to download', () => {
    cy.get('.dc-resource:first-of-type > svg').should('have.attr', 'class', 'dkan-icon')
    cy.get('.dc-resource:first-of-type > a').should('have.attr', 'href', 'http://dkan/sites/default/files/distribution/d460252e-d42c-474a-9ea9-5287b1d595f6/ViolentCrimeRates.csv')
  })

  // add check to make sure message updates to correct amount of rows
  it.only('I can filter the data by year', () => {
    cy.wait(6000)
    cy.get('#resource_186e26a4-f05b-5783-9ea8-4d1750c887b6 .dc-datatable > .dc-table > :nth-child(2) .tr > :nth-child(2) input').type('Dallas')
    cy.wait(6000)
    cy.get('#resource_186e26a4-f05b-5783-9ea8-4d1750c887b6 .dc-table .dc-tbody > :nth-child(1) > :nth-child(2)').should('contain', 'Dallas')
    // Uncomment when pager is fixed.
    // cy.get('.-pagination .-pageInfo .-totalPages').should('contain','2')
  })

  it('I can sort the data by price', () => {
    cy.get('.dc-table > :nth-child(1) .tr > :nth-child(3)').click()
    cy.wait(3000)
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

  // Add check to make sure message updates correctly
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

  it('I can resize the data preview columns.', () => {
    cy.wait(3000)
    cy.get('.dc-table > :nth-child(1) .tr > :nth-child(1)').should('have.css', 'flex', '150 0 auto')
    cy.get(':nth-child(1) > .resizer')
      .trigger('mousedown', { which: 1 })
    cy.get(':nth-child(2) > .resizer')
      .trigger("mousemove")
      .trigger("mouseup")
    cy.get('.dc-table > :nth-child(1) .tr > :nth-child(1)').should('not.have.css', 'flex', '150 0 auto')
    // Column width is consistent.
    cy.get('.dc-tbody > .tr > :nth-child(1)').should('not.have.css', 'flex', '150 0 auto')
  })

  it('I can open and close Manage Columns', () => {
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

  it('I can remove and add back data table columns', () => {
    cy.wait(3000)
    cy.get('.dc-table:first-of-type > :nth-child(1) .tr').children('.th').should('have.length', 16)
    cy.get('.dc-table > :nth-child(1) .tr .th').should('contain', 'record_number')
    cy.get('#dc-modal-manage_columns-open').click()
    cy.get('#dc-modal-manage_columns .dc-modal-body > :nth-child(1) label').should('contain', 'record_number')
    cy.get('#dc-modal-manage_columns .dc-modal-body > :nth-child(1) label').click()
    cy.get('#dc-modal-manage_columns-header-close').click()
    cy.get('.dc-table > :nth-child(1) .tr .th').should('contain', 'date')
    cy.get('.dc-table > :nth-child(1) .tr').children('.th').should('have.length', 15)
    cy.get('#dc-modal-manage_columns-open').click()
    cy.get('#dc-modal-manage_columns .dc-modal-body > :nth-child(1) label').should('contain', 'record_number')
    cy.get('#dc-modal-manage_columns .dc-modal-body > :nth-child(1) label').click()
    cy.get('#dc-modal-manage_columns-header-close').click()
    cy.get('.dc-table > :nth-child(1) .tr').children('.th').should('have.length', 16)
    cy.get('.dc-table > :nth-child(1) .tr .th').should('contain', 'record_number')
  })

  it('I can reorder table columns', () => {
    cy.get('.dc-table:first-of-type > :nth-child(1) > .tr > :nth-child(1)').should('contain', 'record_number')
    cy.get('#dc-modal-manage_columns-open').click()
    cy.get(`#dc-modal-manage_columns .dc-modal-body > :nth-child(2)`)
      .trigger('dragstart')
    cy.get(`#dc-modal-manage_columns .dc-modal-body > :nth-child(1)`)
      .trigger('dragover')
      .trigger('drop')
    cy.get('#dc-modal-manage_columns-close').click()
    cy.get('.dc-table:first-of-type > :nth-child(1) .tr > :nth-child(1)').should('contain', 'city')
  })
})
