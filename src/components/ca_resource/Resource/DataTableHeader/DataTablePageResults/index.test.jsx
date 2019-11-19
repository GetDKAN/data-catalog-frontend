import React from 'react';
import { shallow } from 'enzyme';
import DataTablePageResults from '.';

describe('<DataTablePageResults />', () => {
  const defaultWrapper = shallow(
    <DataTablePageResults
      total={100}
      pageSize={10}
      currentPage={0}
    />,
  );

  const customWrapper = shallow(
    <DataTablePageResults
      total={100}
      pageSize={10}
      currentPage={4}
    />,
  );

  it('renders correct initial results', () => {
    expect(defaultWrapper.find('p').text()).toBe('1 - 10 of 100 datasets');
  });

  it('renders correct results on subsequent pages', () => {
    expect(customWrapper.find('p').text()).toBe('41 - 50 of 100 datasets');
  });
});
