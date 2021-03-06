context('Dataset', () => {
  const dataset_identifier = '1f2042ad-c513-4fcf-a933-cae6c6fd35e6';
  async function getResourceIdentifier() {
    return cy.request(Cypress.config().baseUrl + '/api/1/metastore/schemas/dataset/items/' + dataset_identifier + '?show-reference-ids').then((response) => {
        expect(response.status).eql(200);
        return response.body.distribution[0].identifier;
      });
  }


  beforeEach(() => {
    cy.visit('dataset/1f2042ad-c513-4fcf-a933-cae6c6fd35e6')
  })

  it('I see the title and description', () => {
    cy.get('h1').should('have.text', 'U.S. Tobacco Usage Statistics')
    cy.get('.col-md-9').contains('Statistics on U.S. smoking rates')
  })

  it('I see the file is available to download for each dataset', () => {
    cy.request(Cypress.config().baseUrl + '/api/1/metastore/schemas/dataset/items/' + dataset_identifier + '?show-reference-ids')
      .then((response) => {
        const tables = [...response.body.distribution];
        cy.request(Cypress.config().baseUrl + '/api/1/datastore/imports/' + tables[0].identifier).then(() => {
          cy.get('.dc-resource:first-of-type > svg').should('have.attr', 'class', 'dkan-icon')
          cy.get(`#resource_${tables[0].identifier} .dc-resource > a`).should('have.attr', 'href').and('include', '/sites/default/files/distribution/1f2042ad-c513-4fcf-a933-cae6c6fd35e6/TobaccoTaxes2016_2_1.csv');
          cy.get(`#resource_${tables[1].identifier} .dc-resource > a`).should('have.attr', 'href').and('include', '/sites/default/files/distribution/1f2042ad-c513-4fcf-a933-cae6c6fd35e6/CDCSmokingRates.csv');
        });
      })
  })

  // add check to make sure message updates to correct amount of rows
  it('I can filter the each table individually', () => {
    cy.request(Cypress.config().baseUrl + '/api/1/metastore/schemas/dataset/items/' + dataset_identifier + '?show-reference-ids')
      .then((response) => {
        const tables = [...response.body.distribution];
        cy.request(Cypress.config().baseUrl + '/api/1/datastore/imports/' + tables[0].identifier).then(() => {
          cy.get(`#resource_${tables[0].identifier} .dc-datatable > .dc-table > :nth-child(2) .tr > :nth-child(3) input`).type('Washington')
          cy.wait(3000)
          cy.get(`#resource_${tables[1].identifier} .dc-datatable > .dc-table > :nth-child(2) .tr > :nth-child(3) input`).type('California')
          cy.wait(3000)
          cy.get(`#resource_${tables[0].identifier} .dc-table .dc-tbody > :nth-child(1) > :nth-child(2)`).should('contain', 'WA')
          cy.get(`#resource_${tables[0].identifier} .data-table-results`).contains('1 - 1 of 1 rows')
          cy.wait(3000)
          cy.get(`#resource_${tables[1].identifier} .dc-table .dc-tbody > :nth-child(1) > :nth-child(2)`).should('contain', 'CA')
          cy.get(`#resource_${tables[1].identifier} .data-table-results`).contains('1 - 1 of 1 rows')
        });
      })
  })

  it('I can sort each table individually', () => {
    cy.request(Cypress.config().baseUrl + '/api/1/metastore/schemas/dataset/items/' + dataset_identifier + '?show-reference-ids')
      .then((response) => {
        const tables = [...response.body.distribution];
        cy.request(Cypress.config().baseUrl + '/api/1/datastore/imports/' + tables[0].identifier).then(() => {
          cy.get(`#resource_${tables[0].identifier} .dc-table > :nth-child(1) .tr > :nth-child(2)`).click()
          cy.wait(3000)
          cy.get(`#resource_${tables[0].identifier} .dc-table .dc-tbody > :nth-child(1) > :nth-child(2)`).should('contain', 'AK')
          cy.get(`#resource_${tables[1].identifier} .dc-table > :nth-child(1) .tr > :nth-child(2)`).click()
          cy.get(`#resource_${tables[1].identifier} .dc-table > :nth-child(1) .tr > :nth-child(2)`).click()
          cy.wait(5000)
          cy.get(`#resource_${tables[1].identifier} .dc-table .dc-tbody > :nth-child(1) > :nth-child(2)`).should('contain', 'WY')
        });
      })
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
    cy.request(Cypress.config().baseUrl + '/api/1/metastore/schemas/dataset/items/' + dataset_identifier + '?show-reference-ids')
      .then((response) => {
        const tables = [...response.body.distribution];
        cy.request(Cypress.config().baseUrl + '/api/1/datastore/imports/' + tables[0].identifier).then(() => {
          cy.get(`#resource_${tables[0].identifier} .-pageInfo`).should('contain', 'Page 1 of 3')
          cy.get(`#resource_${tables[0].identifier} .page-size-select`).select('50')
          cy.get(`#resource_${tables[0].identifier} .-pageInfo`).should('contain', 'Page 1 of 2')
          cy.get(`#resource_${tables[0].identifier} .page-size-select`).select('100')
          cy.get(`#resource_${tables[0].identifier} .-pageInfo`).should('contain', 'Page 1 of 1')

          cy.get(`#resource_${tables[1].identifier} .-pageInfo`).should('contain', 'Page 1 of 3')
          cy.get(`#resource_${tables[1].identifier} .page-size-select`).select('50')
          cy.get(`#resource_${tables[1].identifier} .-pageInfo`).should('contain', 'Page 1 of 2')
          cy.get(`#resource_${tables[1].identifier} .page-size-select`).select('100')
          cy.wait(6000)
          cy.get(`#resource_${tables[1].identifier} .-pageInfo`).should('contain', 'Page 1 of 1')
        });
      })
  })

  it('I can change the density of the data table rows', () => {
    cy.request(Cypress.config().baseUrl + '/api/1/metastore/schemas/dataset/items/' + dataset_identifier + '?show-reference-ids')
      .then((response) => {
        const tables = [...response.body.distribution];
        cy.request(Cypress.config().baseUrl + '/api/1/datastore/imports/' + tables[0].identifier).then(() => {
          cy.get(`#resource_${tables[0].identifier} .dc-tbody > .dc-tr > :nth-child(1)`).should('have.css', 'padding', '5px')
          cy.get(`#resource_${tables[0].identifier} [title="expanded"]`).click()
          cy.get(`#resource_${tables[0].identifier} .dc-tbody > .dc-tr > :nth-child(1)`).should('have.css', 'padding', '21px 5px')
          cy.get(`#resource_${tables[0].identifier} [title="normal"]`).click()
          cy.get(`#resource_${tables[0].identifier} .dc-tbody > .dc-tr > :nth-child(1)`).should('have.css', 'padding', '14px 5px')

          cy.get(`#resource_${tables[1].identifier} .dc-tbody > .dc-tr > :nth-child(1)`).should('have.css', 'padding', '5px')
          cy.get(`#resource_${tables[1].identifier} [title="expanded"]`).click()
          cy.get(`#resource_${tables[1].identifier} .dc-tbody > .dc-tr > :nth-child(1)`).should('have.css', 'padding', '21px 5px')
          cy.get(`#resource_${tables[1].identifier} [title="normal"]`).click()
          cy.get(`#resource_${tables[1].identifier} .dc-tbody > .dc-tr > :nth-child(1)`).should('have.css', 'padding', '14px 5px')
        });
      })
  })

  it('I can resize the data preview columns without changing the other table.', () => {
    cy.request(Cypress.config().baseUrl + '/api/1/metastore/schemas/dataset/items/' + dataset_identifier + '?show-reference-ids')
      .then((response) => {
        const tables = [...response.body.distribution];
        cy.request(Cypress.config().baseUrl + '/api/1/datastore/imports/' + tables[0].identifier).then(() => {
          cy.get(`#resource_${tables[0].identifier} .dc-table > :nth-child(1) .tr > :nth-child(1)`).should('have.css', 'flex', '150 0 auto')
          cy.get(`#resource_${tables[0].identifier} :nth-child(1) > .resizer`)
            .trigger('mousedown', { which: 1 })
          cy.get(`#resource_${tables[0].identifier} :nth-child(2) > .resizer`)
            .trigger("mousemove")
            .trigger("mouseup")
          cy.get(`#resource_${tables[0].identifier} .dc-table > :nth-child(1) .tr > :nth-child(1)`).should('not.have.css', 'flex', '150 0 auto')
          // Column width is consistent.
          cy.get(`#resource_${tables[0].identifier} .dc-tbody > .tr > :nth-child(1)`).should('not.have.css', 'flex', '150 0 auto')
          cy.get(`#resource_${tables[1].identifier} .dc-tbody > .tr > :nth-child(1)`).should('have.css', 'flex', '150 0 auto')
        });
      })
  })

  it('I can open and close Manage Columns', () => {
    cy.request(Cypress.config().baseUrl + '/api/1/metastore/schemas/dataset/items/' + dataset_identifier + '?show-reference-ids')
      .then((response) => {
        const tables = [...response.body.distribution];
        cy.request(Cypress.config().baseUrl + '/api/1/datastore/imports/' + tables[0].identifier).then(() => {
          cy.get(`#resource_${tables[1].identifier} #dc-modal-manage_columns-open`).click()
          // cy.get('#react-aria-modal-dialog #dialog-title').should('contain', 'Display column')
          // Test close button in top right
          cy.get(`#dc-modal-manage_columns-header-close`).click()
          cy.get(`#dc-modal-manage_columns`).should('not.exist');
          // Test Done button
          cy.get(`#resource_${tables[0].identifier} #dc-modal-manage_columns-open`).click()
          cy.get(`#dc-modal-manage_columns-close`).click()
          cy.get(`#dc-modal-manage_columns`).should('not.exist');
          // Test Esc to close
          cy.get(`#resource_${tables[1].identifier} #dc-modal-manage_columns-open`).click()
          cy.get(`body`).type('{esc}')
          cy.get(`#dc-modal-manage_columns`).should('not.exist');
        });
      })
  })

  it('I can remove and add back data table columns on just one table', () => {
    cy.request(Cypress.config().baseUrl + '/api/1/metastore/schemas/dataset/items/' + dataset_identifier + '?show-reference-ids')
      .then((response) => {
        const tables = [...response.body.distribution];
        cy.request(Cypress.config().baseUrl + '/api/1/datastore/imports/' + tables[0].identifier).then(() => {
          cy.get(`#resource_${tables[0].identifier} .dc-table > :nth-child(1) .tr`).children('.th').should('have.length', 4)
          cy.get(`#resource_${tables[1].identifier} .dc-table > :nth-child(1) .tr`).children('.th').should('have.length', 8)
          cy.get(`.dc-table > :nth-child(1) .tr .th`).should('contain', 'record_number')
          cy.get(`#resource_${tables[0].identifier} #dc-modal-manage_columns-open`).click()
          cy.get(`#dc-modal-manage_columns .dc-modal-body > :nth-child(1) label`).should('contain', 'record_number')
          cy.get(`#dc-modal-manage_columns .dc-modal-body > :nth-child(1) label`).click()
          cy.get(`#dc-modal-manage_columns-header-close`).click()
          cy.get(`#resource_${tables[0].identifier} .dc-table > :nth-child(1) .tr .th`).should('contain', 'code')
          cy.get(`#resource_${tables[0].identifier} .dc-table > :nth-child(1) .tr`).children('.th').should('have.length', 3)
          cy.get(`#resource_${tables[1].identifier} .dc-table > :nth-child(1) .tr`).children('.th').should('have.length', 8)
          cy.get(`#resource_${tables[0].identifier} #dc-modal-manage_columns-open`).click()
          cy.get('#dc-modal-manage_columns .dc-modal-body > :nth-child(1) label').should('contain', 'record_number')
          cy.get('#dc-modal-manage_columns .dc-modal-body > :nth-child(1) label').click()
          cy.get('#dc-modal-manage_columns-header-close').click()
          cy.get(`#resource_${tables[0].identifier} .dc-table > :nth-child(1) .tr`).children('.th').should('have.length', 4)
          cy.get(`#resource_${tables[1].identifier} .dc-table > :nth-child(1) .tr`).children('.th').should('have.length', 8)
          cy.get(`#resource_${tables[0].identifier} .dc-table > :nth-child(1) .tr .th`).should('contain', 'record_number')
        });
      })
  })

  it('I can reorder table columns on just one table', () => {
    cy.request(Cypress.config().baseUrl + '/api/1/metastore/schemas/dataset/items/' + dataset_identifier + '?show-reference-ids')
      .then((response) => {
        const tables = [...response.body.distribution];
        cy.request(Cypress.config().baseUrl + '/api/1/datastore/imports/' + tables[0].identifier).then(() => {
          cy.get(`#resource_${tables[1].identifier} .dc-table:first-of-type > :nth-child(1) > .tr > :nth-child(1)`).should('contain', 'record_number')
          cy.get(`#resource_${tables[0].identifier} .dc-table:first-of-type > :nth-child(1) > .tr > :nth-child(1)`).should('contain', 'record_number')
          cy.get(`#resource_${tables[1].identifier} #dc-modal-manage_columns-open`).click()
          cy.get(`#dc-modal-manage_columns .dc-modal-body > :nth-child(2)`)
            .trigger('dragstart')
          cy.get(`#dc-modal-manage_columns .dc-modal-body > :nth-child(1)`)
            .trigger('dragover')
            .trigger('drop')
          cy.get(`#dc-modal-manage_columns-close`).click()
          cy.get(`#resource_${tables[0].identifier} .dc-table:first-of-type > :nth-child(1) > .tr > :nth-child(1)`).should('contain', 'record_number')
          cy.get(`#resource_${tables[1].identifier} .dc-table:first-of-type > :nth-child(1) .tr > :nth-child(1)`).should('contain', 'state_abbreviation')
        });
      })
  })

  it('I don\'t see a datatable if a distribution doesn\'t contain a csv file.', () => {
    cy.visit(`dataset/fb3525f2-d32a-451e-8869-906ed41f7695`)
    cy.wait(6000)
    cy.get(`.dc-datatable`).should('not.exist');
  })
})
