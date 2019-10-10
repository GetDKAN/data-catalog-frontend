import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import backend from '../../services/backend';
import { SearchList } from '@civicactions/data-catalog-components'

class FeaturedDatasets extends Component {

  state = {
    items: [],
  }

  async fetchData() {
    const { data } = await backend.get("/dataset/")
    if (Array.isArray(data)) {
      const items = data.map(x => {
        let id = 'identifier' in x ? x.identifier : '';
        let item = {
          publisher: 'publisher' in x ? x.publisher.name : '',
          identifier: {id},
          modified: 'modified' in x ? x.modified : '',
          description: 'description' in x ? x.description : '',
          theme: 'theme' in x ? x.theme : '',
          format: 'distribution' in x ? x.distribution : '',
          title: 'title' in x ? x.title : '',
          ref: `/dataset/${id}`,
        }
        return item;
      });
      let d = items.length > 3 ? items.slice(items.length -3, items.length) : items;
      d = d.sort(function(a,b) {
        return a.title - b.title;
    });
      this.setState({
        items: d,
      });
    }
    else {
      console.error('Data is not an array');
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { items } = this.state;
    return (
      <Wrapper className='container-fluid'>
        <h2 className="section-title">Featured Datasets</h2>
        <div className="section-content">
          <SearchList items={ items } />
        </div>
      </Wrapper>
    );
  }
}

FeaturedDatasets.propTypes = {
  items: PropTypes.any,
};

export default FeaturedDatasets;
