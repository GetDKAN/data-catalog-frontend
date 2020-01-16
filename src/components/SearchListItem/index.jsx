/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import excerpts from 'excerpts';
import TopicImage from '../TopicImage';
import { DataIcon, Text } from '@civicactions/data-catalog-components'
import { Link } from "gatsby";
const SearchListItem = ({
  className,
  item,
}) => {
  const { ref, title, description, publisher, format, theme, identifier } = item;
  function formats(distribution) {
    if (!distribution) {
      return null;
    }
    if(typeof distribution === 'object') {
      distribution = Object.entries(distribution);
      return distribution.map((dist) => {
        const type = (dist[1] && dist[1].mediaType) ? dist[1].mediaType.split('/') :'';
        const backup = type ? type[1] : 'data';
        const format = (dist.format) ? dist.format : backup;
        return (
          <div title={`format: ${format}`}
            key={`dist-id-${identifier}-${Math.random() * 10}`}
            className="label"
            data-format={format}>{format}
          </div>
        );
      })
    }
    if(Array.isArray(distribution)) {
      return distribution.map((dist) => {
        const type = dist[1].mediaType ? dist[1].mediaType.split('/') :'';
        const backup = type ? type[1] : 'data';
        const format = (dist.format) ? dist.format : backup;
        return (
          <div title={`format: ${format}`}
            key={`dist-id-${identifier}-${Math.random() * 10}`}
            className="label"
            data-format={format}>{format}
          </div>
        );
      });
    }
  }
  function themes(theme) {
    if (!theme) {
      return null;
    } else {
      return theme.map((topic) => {
        if(typeof topic === 'object') {
          return(
            <Link
              key={`dist-${topic.identifier}-${Math.random() * 10}`}
              to={"search?topics=" + topic.title}
            >
              <TopicImage title={topic.title} height="16" width="16"/>
              {topic.title}
            </Link>
          );
        }
        return(
          <Link
            key={`dist-${topic}-${Math.random() * 10}`}
            to={"search?topics=" + topic}
          >
            <TopicImage title={topic} height="16" width="16"/>
            {topic}
          </Link>
        );
      })
    }
  }
  function publishers(publisher) {
    if (!publisher) {
      return null;      
    } else {
        return (
          <span>
            <DataIcon icon="group" height="20" width="20" />
            {publisher}
          </span>
        );
    }
  }
  return(
    <Wrapper className={className}>
      <h2><Link to={ref}>{title}</Link></h2>
      {publisher !== 'undefined' &&
        <div className="item-publisher">
          {publishers(publisher)}
        </div>
      }
      {theme &&
        <div className="item-theme">
          {themes(theme)}
        </div>
      }
      {description &&
        <Text className="item-description">
          {excerpts(description, {words: 35})}
        </Text>
      }
      {format &&
        <div className="format-types">
          {formats(format)}
        </div>
      }
    </Wrapper>
  );
}
SearchListItem.defaultProps = {
  className: 'search-list-item',
};
SearchListItem.propTypes = {
  className: PropTypes.string,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default SearchListItem;
