import React from 'react';
import { mount } from 'enzyme';
import Resource from '.';

const dataPreview = {
  columnOrder: [],
  columns: [],
  currentPage: 0,
  density: 'density-3',
  excludedColumns: {},
  filters: [],
  pageSize: 20,
  rowsTotal: '100',
  sort: [],
  values: [{ foo: 'bar' }],
};
const noValuesDataPreview = {
  columnOrder: [],
  columns: [],
  currentPage: 0,
  density: 'density-3',
  excludedColumns: {},
  filters: [],
  pageSize: 20,
  rowsTotal: '100',
  sort: [],
  values: [],
};
const dataFunctions = {
  pageSizeChange: (elem) => elem,
  densityChange: (elem) => elem,
  toggleColumns: (elem) => elem,
  reorderColumns: (elem) => elem,
  activeColumns: (elem) => elem,
  filterChange: (elem) => elem,
  pageChange: (elem) => elem,
  sortChange: (elem) => elem,

};

jest.mock('./withResource', () => (component) => {
  const myComponent = component;
  myComponent.defaultProps = {
    ...myComponent.defaultProps,
    dataInfo: {
      columns: ['foo', 'bar'],
      data: {
        title: 'foo',
        downloadURL: 'http://test.com',
        format: 'csv',
      },
      datastore_statistics: {
        columns: 1,
        rows: 10,
      },
      indentifier: 'dkan2',
    },
  };
  return myComponent;
});

describe('<Resource />', () => {
  const defaultWrapper = mount(
    <Resource
      dataFunctions={dataFunctions}
      dataPreview={dataPreview}
      datasetId="dkan-id"
    />,
  );
  it('renders correctly', () => {
    expect(defaultWrapper.exists('.file-download')).toBe(true);
    expect(defaultWrapper.exists('.data-table-header')).toBe(true);
    expect(defaultWrapper.exists('div.ReactTable.-striped.-highlight')).toBe(true);
    expect(defaultWrapper.exists('div.table-one')).toBe(true);
  });
  it('renders without the info table', () => {
    defaultWrapper.setProps({ infoTableOptions: { hideTable: true } });
    expect(defaultWrapper.exists('div.table-one')).toBe(false);
  });
  it('renders without the datatable header but default row statement', () => {
    defaultWrapper.setProps({ headerOptions: { hideHeader: true } });
    expect(defaultWrapper.exists('.data-table-header')).toBe(false);
    expect(defaultWrapper.find('.row-results').text()).toBe('Rows: 100');
  });
  it('renders without file download if no data is given', () => {
    defaultWrapper.setProps({ dataInfo: { } });
    expect(defaultWrapper.exists('.file-download')).toBe(false);
  });
});
