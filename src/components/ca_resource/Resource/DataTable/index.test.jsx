import React from 'react';
import { mount } from 'enzyme';
import DataTable from '.';

describe('<DataTable />', () => {
  const data = [
    {
      column1: 'alpha',
      column2: 'beta',
      column3: 'gamma',
    },
    {
      column1: 'alpha',
      column2: 'beta',
      column3: 'gamma',
    },
  ];
  const columns = [
    { Header: 'column1', accessor: 'column1' },
    { Header: 'column2', accessor: 'column2' },
    { Header: 'column3', accessor: 'column3' },
  ];

  const defaultWrapper = mount(
    <DataTable
      data={data}
      loading={false}
      columns={columns}
      pageSize={1}
      pages={1}
      sortedChange={() => true}
      pageChange={() => true}
      filterChange={() => true}
      index={1}
    />,
  );

  it('renders correctly', () => {
    expect(defaultWrapper.exists('div')).toBe(true);
  });

  it('renders with stripe and highlight classes', () => {
    expect(defaultWrapper.exists('div.ReactTable.-striped.-highlight')).toBe(true);
  });

  it('renders with density classes', () => {
    defaultWrapper.setProps({ density: 'density-3' });
    expect(defaultWrapper.exists('div.ReactTable.density-3')).toBe(true);
  });
});
