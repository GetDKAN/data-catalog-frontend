import React from 'react';
import { mount } from 'enzyme';
import ResourceInfoTable from '.';

describe('<DataTable />', () => {
  const defaultWrapper = mount(
    <ResourceInfoTable
      statistics={{ columns: 10, rows: 99 }}
      title="dkan2"
    />,
  );

  it('renders correctly', () => {
    expect(defaultWrapper.exists('div.table-one')).toBe(true);
    expect(defaultWrapper.exists('div table')).toBe(true);
  });

  it('has a custom title', () => {
    expect(defaultWrapper.find('div h3').text()).toBe('dkan2');
  });

  it('has correct rows and column information', () => {
    expect(defaultWrapper.find('table thead tr th:first-child').text()).toBe('Rows');
    expect(defaultWrapper.find('table thead tr th:last-child').text()).toBe('Columns');
    expect(defaultWrapper.find('table tbody tr td:first-child').text()).toBe('99');
    expect(defaultWrapper.find('table tbody tr td:last-child').text()).toBe('10');
  });
});
