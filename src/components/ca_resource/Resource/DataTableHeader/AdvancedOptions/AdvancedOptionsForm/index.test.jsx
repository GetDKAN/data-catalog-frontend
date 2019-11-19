import React from 'react';
import { mount } from 'enzyme';
import AdvancedOptionsForm from '.';

const excludedColumns = {
  bar: true,
  getDKAN: false,
};

const items = [
  { Header: 'foo', accessor: 'bar' },
  { Header: 'dkan', accessor: 'getDKAN' },
];

describe('<AdvancedOptionsForm />', () => {
  const identity = (el) => el;
  const form = mount(
    <AdvancedOptionsForm
      columnOrder={[]}
      columns={items}
      excludedColumns={{}}
      reorderColumns={identity}
      toggleColumns={identity}
    />,
  );

  const customForm = mount(
    <AdvancedOptionsForm
      columnOrder={[]}
      columns={items}
      excludedColumns={excludedColumns}
      reorderColumns={identity}
      toggleColumns={identity}
    />,
  );

  it('renders correct initial results', () => {
    expect(form.exists('div')).toBe(true);
    expect(form.exists('form')).toBe(true);
    expect(form.find('fieldset div')).toHaveLength(2);
    expect(form.find('fieldset div label').first().text()).toBe('foo');
    expect(form.state('excludedColumns')).toStrictEqual({ bar: true, getDKAN: true });
    expect(form.state('columnOrder')).toBe(items);
  });
  it('intial excluded column state is set as each {column: true}', () => {
    expect(customForm.state('excludedColumns')).toStrictEqual({ bar: true, getDKAN: false });
  });
  it('updates excluded column state when handleColumnChnage is called', () => {
    form.find('fieldset div input').first().simulate('change', { target: { value: 'bar' } });
    expect(form.state('excludedColumns')).toStrictEqual({ bar: false, getDKAN: true });
  });
  it('updates column order when a column card is moved', () => {
    form.instance().moveCard(1, 0);
    expect(form.state('columnOrder')).toStrictEqual([
      { Header: 'dkan', accessor: 'getDKAN' },
      { Header: 'foo', accessor: 'bar' },
    ]);
  });
  it('without columns, no form is rendered', () => {
    form.setProps({ columns: [] });
    expect(form.exists('div')).toBe(true);
    expect(form.exists('form')).toBe(false);
  });
});
