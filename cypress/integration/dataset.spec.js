context('Dataset', () => {
  const rootURL = 'http://dkan'
  const table1 = '#resource_e4854391-e248-5eca-88ce-7b41d3bc02da';
  const table2 = '#resource_eed01862-e6c0-5aa6-8c2b-91cca5108ed3';

  beforeEach(() => {
    cy.visit(`${rootURL}/dataset/1f2042ad-c513-4fcf-a933-cae6c6fd35e6`)
  })

  it('I see the title and description', () => {
    cy.get('h1').should('have.text', 'U.S. Tobacco Usage Statistics')
    cy.get('.col-md-9').contains('Statistics on U.S. smoking rates')
  })

  it('I see the file is available to download for each dataset', () => {
    cy.get('.dc-resource:first-of-type > svg').should('have.attr', 'class', 'dkan-icon')
    cy.get(`${table1} .dc-resource > a`).should('have.attr', 'href', 'http://dkan/sites/default/files/distribution/1f2042ad-c513-4fcf-a933-cae6c6fd35e6/TobaccoTaxes2016_2_1.csv');
    cy.get(`${table2} .dc-resource > a`).should('have.attr', 'href', 'http://dkan/sites/default/files/distribution/1f2042ad-c513-4fcf-a933-cae6c6fd35e6/CDCSmokingRates.csv');
  })

  // add check to make sure message updates to correct amount of rows
  it('I can filter the each table individually', () => {
    cy.wait(6000)
    cy.get(`${table1} .dc-datatable > .dc-table > :nth-child(2) .tr > :nth-child(3) input`).type('Washington')
    cy.wait(3000)
    cy.get(`${table2} .dc-datatable > .dc-table > :nth-child(2) .tr > :nth-child(3) input`).type('California')
    cy.wait(3000)
    cy.get(`${table1} .dc-table .dc-tbody > :nth-child(1) > :nth-child(2)`).should('contain', 'WA')
    cy.get(`${table1} .data-table-results`).contains('1 - 1 of 1 rows')
    cy.wait(3000)
    cy.get(`${table2} .dc-table .dc-tbody > :nth-child(1) > :nth-child(2)`).should('contain', 'CA')
    cy.get(`${table2} .data-table-results`).contains('1 - 1 of 1 rows')
  })

  it('I can sort each table individually', () => {
    cy.wait(6000)
    cy.get(`${table1} .dc-table > :nth-child(1) .tr > :nth-child(2)`).click()
    cy.wait(3000)
    cy.get(`${table1} .dc-table .dc-tbody > :nth-child(1) > :nth-child(2)`).should('contain', 'AK')
    cy.get(`${table2} .dc-table > :nth-child(1) .tr > :nth-child(2)`).click()
    cy.get(`${table2} .dc-table > :nth-child(1) .tr > :nth-child(2)`).click()
    cy.wait(5000)
    cy.get(`${table2} .dc-table .dc-tbody > :nth-child(1) > :nth-child(2)`).should('contain', 'WY')
  })

  it('I see the tags.', () => {
    cy.get('.dc-tag-wrapper > :nth-child(2) > a').contains("demographics");
    cy.get('.dc-tag-wrapper > :nth-child(3) > a').contains("health");
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
      'Advisory Council for Infectious Disease',
      '1f2042ad-c513-4fcf-a933-cae6c6fd35e6',
      '2016-04-10',
      '2019-06-06',
      'CDC INFO',
      'mailto:cdcinfo@cdc.gov',
      'public'
    ]

    keys.forEach((value, index) => {
      var final = index + 1;
      cy.get('.table-three > .table > tbody > :nth-child(' + final + ') > :nth-child(1)').contains(value);
      cy.get('.table-three > .table > tbody > :nth-child(' + final + ') > :nth-child(2)').contains(values[index]);
    })
  })

  // Add check to make sure message updates correctly
  it('I can select the number of rows per page in each table.', () => {
    cy.wait(6000)
    cy.get(`${table1} .-pageInfo`).should('contain', 'Page 1 of 3')
    cy.get(`${table1} .page-size-select`).select('50')
    cy.get(`${table1} .-pageInfo`).should('contain', 'Page 1 of 2')
    cy.get(`${table1} .page-size-select`).select('100')
    cy.get(`${table1} .-pageInfo`).should('contain', 'Page 1 of 1')

    cy.get(`${table2} .-pageInfo`).should('contain', 'Page 1 of 3')
    cy.get(`${table2} .page-size-select`).select('50')
    cy.get(`${table2} .-pageInfo`).should('contain', 'Page 1 of 2')
    cy.get(`${table2} .page-size-select`).select('100')
    cy.get(`${table2} .-pageInfo`).should('contain', 'Page 1 of 1')
  })

  it('I can change the density of the data table rows', () => {
    cy.wait(3000)
    cy.get(`${table1} .dc-tbody > .dc-tr > :nth-child(1)`).should('have.css', 'padding', '5px')
    cy.get(`${table1} [title="expanded"]`).click()
    cy.get(`${table1} .dc-tbody > .dc-tr > :nth-child(1)`).should('have.css', 'padding', '21px 5px')
    cy.get(`${table1} [title="normal"]`).click()
    cy.get(`${table1} .dc-tbody > .dc-tr > :nth-child(1)`).should('have.css', 'padding', '14px 5px')

    cy.get(`${table2} .dc-tbody > .dc-tr > :nth-child(1)`).should('have.css', 'padding', '5px')
    cy.get(`${table2} [title="expanded"]`).click()
    cy.get(`${table2} .dc-tbody > .dc-tr > :nth-child(1)`).should('have.css', 'padding', '21px 5px')
    cy.get(`${table2} [title="normal"]`).click()
    cy.get(`${table2} .dc-tbody > .dc-tr > :nth-child(1)`).should('have.css', 'padding', '14px 5px')
  })

  it('I can resize the data preview columns without changing the other table.', () => {
    cy.wait(3000)
    cy.get(`${table1} .dc-table > :nth-child(1) .tr > :nth-child(1)`).should('have.css', 'flex', '150 0 auto')
    cy.get(`${table1} :nth-child(1) > .resizer`)
      .trigger('mousedown', { which: 1 })
    cy.get(`${table1} :nth-child(2) > .resizer`)
      .trigger("mousemove")
      .trigger("mouseup")
    cy.get(`${table1} .dc-table > :nth-child(1) .tr > :nth-child(1)`).should('not.have.css', 'flex', '150 0 auto')
    // Column width is consistent.
    cy.get(`${table1} .dc-tbody > .tr > :nth-child(1)`).should('not.have.css', 'flex', '150 0 auto')
    cy.get(`${table2} .dc-tbody > .tr > :nth-child(1)`).should('have.css', 'flex', '150 0 auto')
  })

  it('I can open and close Manage Columns', () => {
    cy.wait(6000)
    cy.get(`${table2} #dc-modal-manage_columns-open`).click()
    // cy.get('#react-aria-modal-dialog #dialog-title').should('contain', 'Display column')
    // Test close button in top right
    cy.get(`#dc-modal-manage_columns-header-close`).click()
    cy.get(`#dc-modal-manage_columns`).should('not.exist');
    // Test Done button
    cy.get(`${table1} #dc-modal-manage_columns-open`).click()
    cy.get(`#dc-modal-manage_columns-close`).click()
    cy.get(`#dc-modal-manage_columns`).should('not.exist');
    // Test Esc to close
    cy.get(`${table2} #dc-modal-manage_columns-open`).click()
    cy.get(`body`).type('{esc}')
    cy.get(`#dc-modal-manage_columns`).should('not.exist');
  })

  it('I can remove and add back data table columns on just one table', () => {
    cy.wait(6000)
    cy.get(`${table1} .dc-table > :nth-child(1) .tr`).children('.th').should('have.length', 4)
    cy.get(`${table2} .dc-table > :nth-child(1) .tr`).children('.th').should('have.length', 8)
    cy.get(`.dc-table > :nth-child(1) .tr .th`).should('contain', 'record_number')
    cy.get(`${table1} #dc-modal-manage_columns-open`).click()
    cy.get(`#dc-modal-manage_columns .dc-modal-body > :nth-child(1) label`).should('contain', 'record_number')
    cy.get(`#dc-modal-manage_columns .dc-modal-body > :nth-child(1) label`).click()
    cy.get(`#dc-modal-manage_columns-header-close`).click()
    cy.get(`${table1} .dc-table > :nth-child(1) .tr .th`).should('contain', 'code')
    cy.get(`${table1} .dc-table > :nth-child(1) .tr`).children('.th').should('have.length', 3)
    cy.get(`${table2} .dc-table > :nth-child(1) .tr`).children('.th').should('have.length', 8)
    cy.get(`${table1} #dc-modal-manage_columns-open`).click()
    cy.get('#dc-modal-manage_columns .dc-modal-body > :nth-child(1) label').should('contain', 'record_number')
    cy.get('#dc-modal-manage_columns .dc-modal-body > :nth-child(1) label').click()
    cy.get('#dc-modal-manage_columns-header-close').click()
    cy.get(`${table1} .dc-table > :nth-child(1) .tr`).children('.th').should('have.length', 4)
    cy.get(`${table2} .dc-table > :nth-child(1) .tr`).children('.th').should('have.length', 8)
    cy.get(`${table1} .dc-table > :nth-child(1) .tr .th`).should('contain', 'record_number')
  })

  it('I can reorder table columns on just one table', () => {
    cy.wait(6000)
    cy.get(`${table2} .dc-table:first-of-type > :nth-child(1) > .tr > :nth-child(1)`).should('contain', 'record_number')
    cy.get(`${table1} .dc-table:first-of-type > :nth-child(1) > .tr > :nth-child(1)`).should('contain', 'record_number')
    cy.get(`${table2} #dc-modal-manage_columns-open`).click()
    cy.get(`#dc-modal-manage_columns .dc-modal-body > :nth-child(2)`)
      .trigger('dragstart')
    cy.get(`#dc-modal-manage_columns .dc-modal-body > :nth-child(1)`)
      .trigger('dragover')
      .trigger('drop')
    cy.get(`#dc-modal-manage_columns-close`).click()
    cy.get(`${table1} .dc-table:first-of-type > :nth-child(1) > .tr > :nth-child(1)`).should('contain', 'record_number')
    cy.get(`${table2} .dc-table:first-of-type > :nth-child(1) .tr > :nth-child(1)`).should('contain', 'state_abbreviation')
  })

  it('I don\'t see a datatable if a distribution doesn\'t contain a csv file.', () => {
    cy.visit(`${rootURL}/dataset/fb3525f2-d32a-451e-8869-906ed41f7695`)
    cy.wait(6000)
    cy.get(`.dc-datatable`).should('not.exist');
  })
})
