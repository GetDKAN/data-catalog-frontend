/* eslint react/prop-types: 0 */
import React from 'react';
import axios from 'axios';
import datastore from '../../services/datastore';

export default function withResource(
  OriginalComponent
) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.store = null;
      this.storeType = null;
      this.columns = [];

      this.state = {
        dataPreview: {
          values: [],
          pageSize: 20,
          rowsTotal: '0',
          currentPage: 0,
          filters: [],
          sort: [],
          columns: this.columns,
          density: 'density-3',
          columnOrder: [],
          excludedColumns: {},
        },
        dataInfo: {},
        dataFunctions: {
          pageChange: (page) => this.pageChange(page),
          sortChange: (sort) => this.sortChange(sort),
          filterChange: (filters) => this.filterChange(filters),
          densityChange: (value) => this.densityChange(value),
          pageSizeChange: (event) => this.pageSizeChange(event),
          reorderColumns: (columns) => this.reorderColumns(columns),
          toggleColumns: (columns) => this.toggleColumns(columns),
          activeColumns: (columns) => this.activeColumns(columns)
        },
      };

      this.activeColumns = this.activeColumns.bind(this);
      this.prepareColumns = this.prepareColumns.bind(this);
      this.pageChange = this.pageChange.bind(this);
      this.filterChange = this.filterChange.bind(this);
      this.sortChange = this.sortChange.bind(this);
      this.densityChange = this.densityChange.bind(this);
      this.pageSizeChange = this.pageSizeChange.bind(this);
      this.reorderColumns = this.reorderColumns.bind(this);
      this.toggleColumns = this.toggleColumns.bind(this);
    }

    componentDidMount() {
      this.fetchData();
    }

    render() {
      return (
        <OriginalComponent
          {...this.props}
          {...this.state}
        />
      );
    }

    async fetchData() {
      const { dataPreview } = this.state;
      const { data, rootUrl } = this.props;
      let columns = null;

      if(data.identifier !== undefined) {
        await axios.get(`${rootUrl}/datastore/imports/${data.identifier}`)
        .then((response) => {
          this.columns = response.data.columns ? response.data.columns : [];
          columns = this.columns;
          this.setState({dataInfo: {
            columns: columns,
            data: data.data,
            datastore_statistics: {
              rows: response.data.numOfRows,
              columns: response.data.columns
            },
            indentifier: data.identifier,
          }})
        })
        .catch(function (error) {
          console.log(error)
        })
      } 
      let store = await this.getStore();
      if (columns ===  null) {
        columns = await store.getColumns();
      }
      // dataPreview.columns = this.activeColumns(this.prepareColumns(columns));
      dataPreview.columns = await this.activeColumns(this.prepareColumns(columns));
      await this.getData(null, null, dataPreview.pageSize, dataPreview.currentPage, true);
      this.setState({dataPreview})
    }

    async getStore() {
      const { data, rootUrl } = this.props;
      return new Promise((resolve, reject) => {
        if (this.store !== null) {
          resolve(this.store);
        } else {
          if (this.columns.length > 0) {
            let store = new datastore['dkan'](data.identifier, this.columns, rootUrl);
            store.query(null, null, null, 0, null, null, true)
            .then((data) => {
              this.store = store;
              this.storeType = 'dkan'
              resolve(store);
              })
            } else {
              let store = new datastore['file'](data.distribution.downloadURL);
              store.query(null, null, null, 0, null, null, true)
              .then((data) => {
                if(data) {
                  this.store = store;
                  this.storeType = 'file'
                  this.setState({store: store})
                  resolve(store);
                }
                else {
                  reject("No datastore available.")
                }
              })
            }
        }
      });
    }

    async getData(fields = null, facets = null, range = null, page = null, count = false) {
      const { dataPreview } = this.state;
      const { sort } = dataPreview;
      const query = dataPreview.filters.length ? dataPreview.filters : null;
      if (count) {
        await this.store.query(query, fields, facets, range, page, sort, count).then((data) => {
          dataPreview.rowsTotal = data;
        });
        await this.store.query(query, fields, facets, range, page, sort).then((data) => {
          dataPreview.values = data;
        });
      } else {
        await this.store.query(query, fields, facets, range, page, sort).then((data) => {
          dataPreview.values = data;
        });
      }
      this.setState({ dataPreview });
    }

    prepareColumns(columns) {
      return columns.map((column) => {
        return {
          Header: column,
          accessor: column
        }
      })
    }

    // TABLE FUNCTIONS
    async pageChange(page) {
      const { dataPreview } = this.state;
      dataPreview.currentPage = page;
      this.getData(null, null, dataPreview.pageSize, dataPreview.currentPage)
    }

    async filterChange(filters) {
      const { dataPreview } = this.state;
      dataPreview.filters = filters;
      // When filtering the pages gets reset.
      dataPreview.currentPage = 0;
      this.getData(null, null, dataPreview.pageSize, dataPreview.currentPage, true);
    }

    async sortChange(sort) {
      const { dataPreview } = this.state;
      dataPreview.sort = sort;
      // When sorting the pages gets reset.
      dataPreview.currentPage = 0;
      this.getData(null, null, dataPreview.pageSize, dataPreview.currentPage);
    }

    // TABLE HEADER FUNCTIONS
    async densityChange(value) {
      const { dataPreview } = this.state;
      dataPreview.density = `density-${value + 1}`;
      this.setState({ dataPreview });
    }

    async pageSizeChange(event) {
      const { dataPreview } = this.state;
      dataPreview.pageSize = event.target.value;
      dataPreview.currentPage = 0;
      this.getData(null, null, dataPreview.pageSize, dataPreview.currentPage);
    }

    // ADVANCED OPTIONS
    async reorderColumns(columns) {
      const { dataPreview } = this.state;
      dataPreview.columnOrder = columns;
      this.setState({ dataPreview });
    }

    async toggleColumns(columnsData) {
      const { dataPreview } = this.state;
      dataPreview.excludedColumns = columnsData;
      this.setState({ dataPreview });
    }

    activeColumns(items, newExcluded = null) {
      const { excludedColumns, columnOrder } = this.state.dataPreview;
      const excludedColumnsData = newExcluded || excludedColumns;
      const excludedArray = [];
      let newItems = items;
      if (columnOrder.length) {
        newItems = columnOrder;
      }
      Object.keys(excludedColumnsData)
        .forEach(function eachKey(key) {
          if(!excludedColumnsData[key]) {
            excludedArray.push(key);
          }
        });
      return newItems.reduce((columns, item) => {
        if (!excludedArray.includes(item.accessor)) {
          columns.push(item);
        }
        return columns;
      }, []);
    }
  };
}
