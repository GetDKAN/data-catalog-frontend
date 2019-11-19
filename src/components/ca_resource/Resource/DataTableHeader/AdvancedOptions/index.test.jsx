import React from 'react';
import { mount } from 'enzyme';
import AdvancedOptions from '.';

const excludedColumns = {
  bar: true,
  getDKAN: false,
};

const items = [
  { Header: 'foo', accessor: 'bar' },
  { Header: 'dkan', accessor: 'getDKAN' },
];

describe('<AdvancedOptions />', () => {
  const identity = (el) => el;
  const wrapper = mount(
    <AdvancedOptions
      columns={items}
      excludedColumns={excludedColumns}
      columnOrder={items}
      toggleColumns={identity}
      reorderColumns={identity}
    />,
  );
  it('renders correctly without modal open', () => {
    expect(wrapper.exists('.data-table-adv-options')).toBe(true);
    expect(wrapper.exists('.data-table-adv-modal')).toBe(false);
  });

  it('opens and closes the modal window', () => {
    wrapper.find('.data-table-adv-options button').simulate('click');
    expect(wrapper.exists('.data-table-adv-modal')).toBe(true);
    wrapper.find('.advanced-options-modal-close').simulate('click');
    expect(wrapper.exists('.data-table-adv-modal')).toBe(false);
  });
});
