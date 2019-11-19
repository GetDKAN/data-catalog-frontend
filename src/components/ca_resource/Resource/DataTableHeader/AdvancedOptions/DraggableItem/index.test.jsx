import React from 'react';
import { shallow } from 'enzyme';
import DraggableItem from '.';

describe('<DraggableItem />', () => {
  const DefaultWrapper = DraggableItem.DecoratedComponent;
  const identity = (el) => el;
  const item = shallow(
    <DefaultWrapper
      onchange={() => () => true}
      item={{ Header: 'Foo', accessor: 'bar' }}
      isVisible
      isOver={false}
      isDragging={false}
      connectDragPreview={() => () => true}
      connectDragSource={identity}
      connectDropTarget={identity}
    />,
  );

  it('renders correct initial results', () => {
    expect(item.exists('div')).toBe(true);
    expect(item.find('label').text()).toBe('Foo');
    expect(item.find('input').props().value).toBe('bar');
    expect(item.find('div').props().style.boxShadow).toBe('none');
    expect(item.find('div').props().style.background).toBe('transparent');
    expect(item.find('div').props().style.cursor).toBe('grab');
  });

  it('renders with new background shadow and color when hovered over', () => {
    item.setProps({ isOver: true });
    expect(item.find('div').props().style.background).toBe('rgba(0,0,0,0.3)');
  });

  it('renders with new background shadow and color when hovered over', () => {
    item.setProps({ isDragging: true });
    expect(item.find('div').props().style.boxShadow).toBe('2px 2px 2px rgba(0,0,0,.5)');
    expect(item.find('div').props().style.cursor).toBe('grabbing');
  });
});
