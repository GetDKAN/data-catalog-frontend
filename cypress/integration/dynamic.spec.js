context('Dynamic Dataset', () => {
  let dataset_identifier;
  let user_credentials = {
    "user": "testuser",
    "pass": "2jqzOAnXS9mmcLasy"
  };

  const reqBody = (uuid, title) => {
    return {
      title: title + uuid,
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

  function createDataset() {
    let endpoint = 'http://dkan/api/1/metastore/schemas/dataset/items';
    let json1 = json("Title for ");
    cy.request({
      method: 'POST',
      url: endpoint,
      auth: user_credentials,
      body: json1
    })
  }

  function updateDataset() {
    let endpoint = 'http://dkan/api/1/metastore/schemas/dataset/items';
    let json1 = json("Title for updated ");
    cy.request({
      method: 'PUT',
      url: endpoint + '/' + dataset_identifier,
      auth: user_credentials,
      body: json1
    })
  }

  function removeDataset() {
    let endpoint = 'http://dkan/api/1/metastore/schemas/dataset/items';
    cy.request({
      method: 'DELETE',
      url: endpoint + "/" + dataset_identifier,
      auth: user_credentials,
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

  // Generate a data item.
  function json(title){
    dataset_identifier = uuid4();
    let uuid =  dataset_identifier;
    return reqBody(uuid, title)
  }

  before(() => {
    createDataset();
  });

  it('I see the title and description', () => {
    cy.visit(`http://dkan/dataset/${dataset_identifier}`)
    cy.wait(6000)
    cy.get('h1').should('have.text', 'Title for ' + dataset_identifier,)
  })

  it('I see an updated title', () => {
    updateDataset()
    cy.wait(6000)
    cy.visit(`http://dkan/dataset/${dataset_identifier}`)
    cy.get('h1').should('have.text', 'Title for updated ' + dataset_identifier,)
  })
  after(() => {
    removeDataset();
  });
})


