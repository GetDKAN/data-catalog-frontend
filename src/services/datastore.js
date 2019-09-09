import Papa from 'papaparse';
import _ from "lodash";

//
// init ()
//  csv -> uri
//  dkan -> uri
//
// query (q, field, range, facets, join)
// update ()
// remove ()
//
//
//
class Datastore {
  constructor(uri) {
    this.uri = uri;
  }
  async init() {}

  async query() {}

  async update() {}

  async remove() {}
}


export class file extends Datastore {

  async fetch () {
    return new Promise((res, rej) => {
      Papa.parse(this.uri, {
        complete: (data) => {
          this.data = data.data;
          res(data.data);
        },
        download: true,
        preview: 100,
        header: true
      });
    });
  }

  /**
   *
   *
   */
  pages() {
    return this.data.length
  }

  /**
   * Queries the records.
   *
   * @param {string | array} query - Query item to search with. Can be a string
   * to search through all records or an array of objects [{field: X, value: Y}]
   * to search through.
   */
  async query(query = null, fields = null, facets = null, range = null, page = null, sort = null) {
    // SELECT {fields} FROM this.table WHERE {q} / {facets} LIMIT = {range}
    // OFFSET {page} ORDER BY {sort}
    let queried = this.data //await this.fetch(this.uri);
    if (query) {
      // Searches across fields.
      if (Array.isArray(query)) {
        queried = query.reduce((filteredSoFar, nextFilter) => {
          return filteredSoFar.filter(row => {
            return (row[nextFilter.id] + "").includes(nextFilter.value);
          });
        }, queried);
      }
      // Searches across all data.
      else {
        queried = queried.reduce((acc, doc) => {
          const haystack = JSON.stringify(doc);
          const needleRegExp = new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i");
          const result = needleRegExp.test(haystack);
          if (result) {
            acc.push(doc);
          }
          return acc;
        }, []);
      }
    }
    /**
    let fielded = queried;
    if (fields) {
    }
    let faceted = queried;
    if (facets) {
    }
    */
    let paged = queried;
    if (page && range) {
      paged = paged.slice(range * page, range * page + range);
    }
    let sorted = paged;
    if (sort) {
      sorted = _.orderBy(
        sorted,
        sort.map(srt => {
          return row => {
            if (row[srt.id] === null || row[srt.id] === undefined) {
              return -Infinity;
            }
            return typeof row[srt.id] === "string"
              ? row[srt.id].toLowerCase()
              : row[srt.id];
          };
        }),
        sort.map(d => (d.desc ? "desc" : "asc"))
      );
    }
    return sorted;
  }

  async update() {}

  async remove() {}
}

export class dkan extends Datastore {

  async init() {
  }

  async query(q = null, fields = null, facets = null, range = null, page = null) {
  }

  async update() {}

  async remove() {}
}

const datastore = {
  file,
  dkan,
};

export default datastore;
