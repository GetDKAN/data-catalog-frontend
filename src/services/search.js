import lunr from 'lunr';

//import elasticsearch from 'elasticsearch';

class Search {
  async init() {
    return {};
  }

 /**
   * Queries the records.
   *
   * @param {string} term - Query string to search with.
   * @param {array | string} fields - Array of arrays, [field, value] to
   * search through or a single string.
   * facets.
   * @param {number} pageSize - Number of results to return.
   * @param {number} page - The offset of results to return.
   * @param {array} sort - An array of sorts [field, sortType].
   *
   * @return {object}
   *  Object with {
   *    time: query time (number)
   *    total: total number of results (number)
   *    error: errors (boolean)
   *    errorMessage: error message (string)
   *    results: array of results (array)
   *  Array of object results.
   */
  async query(term = null, fields = null, pageSize = null, page = null, sort = null) {}

  /**
   * Validates methods for funcitons.
   */
  static validate(items, types) {}

  static querObjDefaults () {
    return {
      time: null,
      total: null,
      error: false,
      errorMessage: "",
      results: []
    }
  }

  static error(message) {
    return {errorMessage: `Error ${message}`, error: true};
  }

  async loadFacets(items, facets) {
    const that = this;
    const pageSizeFacets = 100;
    const facetsTotal = that.getFacetInitialTotal(facets, items);

    var facetsResults = {};

    for (var facet in this.facets) {
      facetsResults[facet] = {};
      if (facetsTotal[facet]) {
        facetsTotal[facet].forEach((i) => { // eslint-disable-line no-loop-func
          facetsResults[facet][i] = (facetsResults[facet][i]||0)+1;
        });
      }
    };

    // TODO: separate into func.
    let facetsSorted = {};
    for (var fact in this.facets) {
      facetsSorted[fact] = [];
      facetsSorted[fact] = Object.entries(facetsResults[fact]).sort((a,b) => {
        return (a[1] > b[1]) ? -1 : ((b[1] > a[1]) ? 1 : 0)
      });
    };

    // TODO:
    let facetsPaged = {};
    for (var fac in facets) {
      facetsPaged[fac] = facetsSorted[fac].slice(0, pageSizeFacets);
    };
    return facetsPaged;
  }

  getFacetValueHelper(doc, field) {
    if ((typeof doc) == "object") {
      let pieces = field.split('.');
      let current = pieces.shift();

      if (current === '*') {
        if (Array.isArray(doc)) {
          let values = []
          let i

          let join = pieces.join('.')

            for (i = 0; i < doc.length; i++) {
            values = values.concat(this.getFacetValueHelper(doc, i + "." + join));
          }

          return values;
        }
        else {
          return [];
        }
      }

      if (doc[current] !== undefined) {
        // This is the property no need to recurse further.
        if (pieces.length === 0) {
          let value = doc[current]
          return [value]
        }
        else {
          return [].concat(this.getFacetValueHelper(doc[current], pieces.join('.')))
        }
      }
      else {
        return [];
      }
    }
    else {
      return []
    }
  }

  getFacetValue(doc, facet, facets) {
    let value = this.getFacetValueHelper(doc, facets[facet].field)
    return value
  }

  getFacetInitialTotal(facets, results) {

    const that = this;
    let facetsTotal = [];
    results.forEach((result) => {
      for (var facet in facets) {
        const doc = that.getFacetValue(result, facet, facets);

        facetsTotal[facet] = !facetsTotal[facet] ? [] : facetsTotal[facet];
        // We want to flatten the results so there is one big array instead of a
        // combo of array results.
        if (Array.isArray(doc)) {
          doc.forEach((item, x) => { // eslint-disable-line no-loop-func
            facetsTotal[facet].push(item);
          });
        }
        else {
          if (doc && Object.keys(doc).length !== 0 ) {
            facetsTotal[facet].push(doc);
          }
        }
      }
    });
    return facetsTotal;
  }


  sort(sort, items) {
    const that = this;
    if (sort === "date") {
      return items.sort(that.dateCompare);
    }
    else if (sort === "alpha") {
      return items.sort(that.alphaCompare);
    }
    else if (sort === "relevance") {
      return items.sort(that.relatCompare);
    }
    return items;
  }

  relatCompare(a,b) {
    if (a.score < b.score)
      return -1;
    if (a.score > b.score)
      return 1;
    return 0;
  }

  dateCompare(a,b) {
    if (a.modified > b.modified)
      return -1;
    if (a.modified < b.modified)
      return 1;
    return 0;
  }

  alphaCompare(a,b) {
    if (a.title < b.title)
      return -1;
    if (a.title > b.title)
      return 1;
    return 0;
  }

}

export class Lunr extends Search {
  async init(data, facets = null) {
    this.facets = facets;
    this.index = lunr.Index.load(data.index);
    this.docs = data.docs;
  }

  async query(term = null, fields = null, pageSize = null, page = null, sort = null) {
    const start = performance.now();
    let where = [];
    let paged = [];
    let sorted = [];

    const	searchResults = term ? this.index.search(`*${term}*`) : this.index.search("");
    const items = await this.mapResults(searchResults);

    if (fields && fields.length > 0) {
      fields.forEach((field) => {
        let key = field[0];
        let value = field[1];
        where = items.filter((item) => {
          const facetValue = this.getFacetValue(item, key, this.facets);
          if (facetValue === value) {
            return true;
          }
          else if (Array.isArray(facetValue) && facetValue.indexOf(value) > -1) {
            return true;
          }
          if (key in item) {
            if (item[key] === value) {
              return true;
            }
            else if (Array.isArray(item[key])) {
              if (item[key].indexOf(value) > -1) {
                return true;
              }
            }
          }
          return false;
        });
      });
    }
    else {
      where = items;
    }

    sorted = this.sort(sort, where);
    const offset = (page - 1) * pageSize;
    paged = paged && pageSize ? sorted.slice(offset, offset + pageSize) : sorted;

    const facetsResults = this.facets ? await this.loadFacets(items, this.facets) : [];
    const total = where.length;
    const results = paged;
    const end = performance.now();
    const time = end - start;
    const error = {};
    return {
      time,
      facetsResults,
      total,
      error,
      // TODO: Only return selected fields.
      fields: [],
      results
    }
  }

  async mapResults(items) {
    return items.map((item) => {
      let result = this.docs.find((doc) => item.ref === doc.ref);
      const doc = Object.assign(result.doc, item);
      return doc;
    });
  }

  async resultCount(results) {
    return results.length;
  }


}

export class simpleSearch extends Search {

  async query(term = null, fields = null, pageSize = null, page = null, sort = null) {
    const start = performance.now();
    let fieldsToReturn = null;
    let where = [];
    let queried = [];
    let paged = [];
    let sorted = [];

    if (fields) {
      fieldsToReturn = Object.keys(fields).map(key => fields[key]);
    }
    if (fields && fields.length > 0) {
      fields.forEach((field) => {
        let key = field[0];
        let value = field[1];
        where = this.index.filter((item) => {
          const facetValue = this.getFacetValue(item, key, this.facets);
          if (facetValue === value) {
            return true;
          }
          else if (Array.isArray(facetValue) && facetValue.indexOf(value) > -1) {
            return true;
          }
          if (key in item) {
            if (item[key] === value) {
              return true;
            }
            else if (Array.isArray(item[key])) {
              if (item[key].indexOf(value) > -1) {
                return true;
              }
            }
          }
          return false;
        });
      });
    }
    else {
      where = this.index;
    }
    if (term) {
      queried = where.reduce((acc, doc) => {
        const haystack = JSON.stringify(doc);
        const needleRegExp = new RegExp(term.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i");
        const result = needleRegExp.test(haystack);
        if (result) {
          acc.push(doc);
        }
        return acc;
      }, []);
    }
    else {
      queried = where;
    }
    const total = queried.length;

    const facetsResults = this.facets ? await this.loadFacets(queried, this.facets) : [];
    sorted = this.sort(sort, queried);
    const offset = (page - 1) * pageSize;
    paged = paged && pageSize ? sorted.slice(offset, offset + pageSize) : sorted;

    const results = paged;
    const end = performance.now();
    const time = end - start;
    const error = false;
    return {
      time,
      facetsResults,
      total,
      error,
      // TODO: Only return selected fields.
      fields: fieldsToReturn,
      results
    }

  }

  async init(data, facets = null) {
    this.facets = facets;
    this.index = data.docs.map((item) => item.doc);
  }

  async getAll(index) {
    return index;
  }

  async resultCount(results) {
    return results.length;
  }

}
/**
export class elasticSearch extends Search {
  *init() {
    const index = elasticsearch.Client({
      host: 'https://ENDPOINT.REGION.es.amazonaws.com/INDEX',
    });
    return index;
  }
  *query(query, index) {
    const docs = yield this.esSearch(query, index);
  }
  *getAll(index) {
    const that = this;
    const docs = yield this.esSearch("*", index);
    return docs;
  }
  esSearch(query, index) {
    const body = {
      "query": {
        "match": {
          "title": "*" + query + "*"
        }
      }
    };
    const that = this;
    return index.search({
      body: body
    }).then(function (docs) {
      that.count = docs.hits.total;
      const items = docs.hits.hits.map((index) => {
      const item = {
        doc: index._source,
        score: index._score,
        ref: index._source.interra.id,
      }
      return item;
    });
      return items;
    }, function (error) {
    });
  }
  *resultCount(results) {
    return this.count;
  }
}
*/

const search = {
//  elasticSearch,
  simpleSearch,
  Lunr,
};

export default search;
