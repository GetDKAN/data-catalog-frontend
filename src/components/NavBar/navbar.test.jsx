import React from 'react';
import renderer from 'react-test-renderer';
import NavBar from './index';

const baseItems = [
  {
    "label": "Google",
    "url": "https://google.com"
  },
  {
    "label": "CivicActions",
    "url": "https://civicactions.com/"
  },
  {
    "label": "Github",
    "url": "https://github.com/"
  }
];

const items = baseItems.map(item => (<a href={item.url}>{item.label}</a>))


describe('NavBar', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<NavBar navItems={items} />)
      .toJSON();
    // expect(tree).toMatchSnapshot();
  });
});
