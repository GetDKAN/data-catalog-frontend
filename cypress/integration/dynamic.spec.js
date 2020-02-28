context('Datastore API', () => {
  let expected_columns;
  let dataset_identifier;
  let user_credentials = {
    "user": "testuser",
    "pass": "2jqzOAnXS9mmcLasy"
  };
  let apiUri = Cypress.config().apiUri;

  function createDataset() {
    let endpoint = 'http://dkan/api/1/metastore/schemas/dataset/items';
    let json1 = json();
    cy.request({
      method: 'POST',
      url: endpoint,
      auth: user_credentials,
      body: json1
    })
  }

  function removeDatasets() {
    let endpoint = 'http://dkan/api/1/metastore/schemas/dataset/items';
    cy.request({
      method: 'GET',
      url: endpoint,
    }).then((response) => {
      let datasets = response.body;
      cy.log(datasets);
      datasets.forEach((dataset) => {
        cy.request({
          method: 'DELETE',
          url: endpoint + "/" + dataset.identifier,
          auth: user_credentials,
        })
      });
    })
  }

  // Generate a random uuid.
  // Credit: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  function uuid4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  async function getResourceIdentifier() {
    return cy.request(apiUri + '/metastore/schemas/dataset/items/' + dataset_identifier + '?show-reference-ids').then((response) => {
        expect(response.status).eql(200);
        return response.body.distribution[0].identifier;
      });
  }

  // Generate a data item.
  function json(){
    dataset_identifier = uuid4();
    let uuid =  dataset_identifier;
    return {
      title: "Title for " + uuid,
      description: "Description for " + uuid,
      identifier: uuid,
      accessLevel: "public",
      bureauCode: ["1234:56"],
      "@type": "dcat:Dataset",
      distribution: [
        {
          "@type": "dcat:Distribution",
          downloadURL: "https://dkan-default-content-files.s3.amazonaws.com/district_centerpoints_small.csv",
          mediaType: "text/csv",
          format: "csv",
          description: "<p>Nah.</p>",
          title: "District Names"
        }
      ],
      keyword: [
        "firsttag",
        "secondtag",
        "thirdtag"
      ],
      contactPoint: {
        "@type": "vcard:Contact",
        fn: "Firstname Lastname",
        hasEmail: "mailto:first.last@example.com"
      }
    }
  }

  before(() => {
    cy.log(user_credentials)
    // removeDatasets();
    createDataset();
  });

  beforeEach(() => {
    cy.visit(`http://dkan/dataset/${dataset_identifier}`)
  })

  it('I see the title and description', () => {
    cy.wait(6000)
    cy.get('h1').should('have.text', 'Title for ' + uuid,)
    // cy.get('.col-md-9').contains('Monthly gold prices (USD) in London from Bundesbank.')
  })

})


