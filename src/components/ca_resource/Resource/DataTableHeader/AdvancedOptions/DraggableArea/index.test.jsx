import React from 'react';
import { wrapInTestContext } from 'react-dnd-test-utils';
import { mount } from 'enzyme';
import DraggableArea from '.';

const excludedColumns = {
  foo: true,
  dkan: true,
};

const items = [
  { Header: 'foo', accessor: 'bar' },
  { Header: 'dkan', accessor: 'getDKAN' },
];

describe('<DraggableArea />', () => {
  const DraggableContent = wrapInTestContext(DraggableArea);
  const identity = (el) => el;
  const area = mount(
    <DraggableContent
      onchange={identity}
      items={items}
      excludedColumns={excludedColumns}
      connectDropTarget={identity}
      moveCard={identity}
      onDrop={identity}
    />,
  );

  it('renders correct initial results', () => {
    expect(area.exists('fieldset')).toBe(true);
    expect(area.find('div')).toHaveLength(2);
    expect(area.find('div label').first().text()).toBe('foo');
  });
});
