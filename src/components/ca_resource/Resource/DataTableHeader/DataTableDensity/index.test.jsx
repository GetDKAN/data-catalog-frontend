import React from 'react';
import { shallow } from 'enzyme';
import DataTableDensity from '.';

describe('<DataTableDensity />', () => {
  const defaultWrapper = shallow(
    <DataTableDensity
      densityChange={() => () => true}
    />,
  );

  const customWrapper = shallow(
    <DataTableDensity
      densityChange={() => () => true}
      title="Foobar"
      items={[
        { icon: <span>Icon </span>, text: 'first' },
        { icon: <span>Icon </span>, text: 'second' },
        { icon: <span>Icon </span>, text: 'third' },
      ]}
    />,
  );

  it('renders correct initial results', () => {
    expect(defaultWrapper.find('.density-buttons-title').text()).toBe('Display Density');
    expect(defaultWrapper.find('.density-buttons button:first-child').text()).toBe('expanded');
    expect(defaultWrapper.find('.density-buttons button:last-child').text()).toBe('tight');
  });

  it('renders correct custom results', () => {
    expect(customWrapper.find('.density-buttons-title').text()).toBe('Foobar');
    expect(customWrapper.find('.density-buttons button:first-child').text()).toBe('Icon first');
    expect(customWrapper.find('.density-buttons button:last-child').text()).toBe('Icon third');
  });
});
