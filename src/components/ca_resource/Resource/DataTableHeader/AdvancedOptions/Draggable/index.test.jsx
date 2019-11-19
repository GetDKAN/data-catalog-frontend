import React from 'react';
import { wrapInTestContext } from 'react-dnd-test-utils';
import { mount } from 'enzyme';
import Draggable from '.';

const excludedColumns = {
  foo: true,
  dkan: true,
};

const items = [
  { Header: 'foo', accessor: 'bar' },
  { Header: 'dkan', accessor: 'getDKAN' },
];

describe('<Draggable />', () => {
  const DraggableContent = wrapInTestContext(Draggable);
  const identity = (el) => el;
  const drag = mount(
    <DraggableContent
      onchange={identity}
      excludedColumns={excludedColumns}
      moveCard={identity}
      onDrop={identity}
      columns={items}
    />,
  );

  it('renders correct initial results', () => {
    expect(drag.exists('fieldset')).toBe(true);
    expect(drag.find('fieldset div')).toHaveLength(2);
    expect(drag.find('fieldset div label').first().text()).toBe('foo');
  });
});
