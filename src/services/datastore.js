import Papa from 'papaparse';
import _ from "lodash";
import axios from 'axios';

class Datastore {

  async query(query = null, fields = null, facets = null, range = null, page = null, sort = null) {}

  async update() {}

  async remove() {}
}

export class file extends Datastore {

  columns = null

  constructor(uri) {
    super()
    this.uri = uri;
  }

  async getColumns() {
    return new Promise((resolve, reject) => {

      if (this.columns !== null) {
        resolve(this.columns)
      }

      Papa.parse(this.uri, {
        complete: (data) => {
          this.columns = Object.keys(data.data[0]);
          resolve(this.columns);
        },
        download: true,
        preview: 1,
        header: true
      });
    });
  }

  /**
   * Queries the records.
   *
   * @param {string | array} query - Query item to search with. Can be a string
   * to search through all records or an array of objects [{field: X, value: Y}]
   * to search through.
   */
  async query(query = null, fields = null, facets = null, range = null, page = null, sort = null, count = false) {

    return new Promise( (resolve, reject) => {
      this._fetch().then(
        (data) => {
          console.log(data)
          data = this._query(data, query)

          if (count) {
            let count = data.length
            if (count < 100) {
              // we get an empty record at the end, if less than a hundred.
              count = count - 1
            }
            resolve(count)
          }

          data = this._sort(data, sort)

          data = this._page(data, page, range)

          resolve(data)
        }
      )
    })
  }

  async update() {}

  async remove() {}

  async _fetch () {
    return new Promise((resolve, reject) => {

      if (typeof this.data !== 'undefined') {
        resolve(this.data)
      }

      Papa.parse(this.uri, {
        complete: (data) => {
          this.data = data.data;
          resolve(this.data);
        },
        download: true,
        preview: 100,
        header: true
      });
    });
  }

  _query(data, query) {
    let queried = data
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
    return queried
  }

  _page(data, page, range) {
    let paged = data;
    if (page !== null && range !== null) {
      paged = paged.slice(range * page, range * page + range);
    }
    return paged
  }

  _sort(data, sort) {
    let sorted = data;
    if (sort) {
      sorted = _.orderBy(
          sorted,
          sort.map(srt => {
            return row => {
              if (row[srt.id] === null || row[srt.id] === undefined) {
                return -Infinity;
              }
              return typeof row[srt.id] === "string"
                  ? row[srt.id]//.toLowerCase()
                  : row[srt.id];
            };
          }),
          sort.map(d => (d.desc ? "desc" : "asc"))
      );
    }
    return sorted
  }
}


export class dkan extends Datastore {

  id = null
  columns = null

  constructor (id, columns, rootUrl) {
    super();
    this.id = id;
    this.columns = columns;
    this.rootUrl = rootUrl;
  }

  async getColumns() {
    return new Promise((resolve, reject) => {
      resolve(this.columns)
    })
  }

  async query(q = null, fields = null, facets = null, range = 0, page = null, sort = null, count = false) {
    if (sort === null) {
      sort = []
    }

    let new_q = []
    if (q !== null) {
      new_q = JSON.parse(JSON.stringify(q));
    }

    new_q.map((v) => {
      v.value = "%25" + v.value + "%25"
      return v
    })

    return this._fetch(range, page * range, new_q, sort[0], count)
  }

  async update() {}

  async remove() {}

  async _fetch(limit, offset, where, sort, count) {
    let query  = ""

    let where_string = ''

    if (where.length !== 0) {
      let where_clauses = [];

      where.forEach((v, i) => {
        where_clauses[i] = v.id + " = '" + v.value + "'"
      });

      where_string = "[WHERE " + where_clauses.join(" AND ") + "]";
    }

    let sort_string = ""

    if (typeof(sort) === 'object') {
      sort_string = "[ORDER BY " + sort.id;
      if (sort.desc === false) {
        sort_string += " ASC]"
      }
      else {
        sort_string += " DESC]"
      }
    }
    let fields = ""
    let limit_string = ""

    if (count) {
      fields = 'COUNT(*)'
    }
    else {
      fields = '*'
      limit_string = '[LIMIT '+ limit +' OFFSET '+ offset +']'
    }
    query = '/datastore/sql?query=[SELECT ' + fields + ' FROM ' + this.id +']' + where_string + sort_string + limit_string + ';'
    return new Promise((resolve, reject) => {
      axios.get(this.rootUrl + query).then(
          (response) => {
            if (count && response.data[0]) {
              resolve(response.data[0].expression)
            }
            else {
              this.data = response.data
              resolve(this.data);
            }
          },
          (error) => {
            this.data = []
            resolve(error);
          }
      );
    });
  }
}

const datastore = {
  file,
  dkan,
};

export default datastore;
