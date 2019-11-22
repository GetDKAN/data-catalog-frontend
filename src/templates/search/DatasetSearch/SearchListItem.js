import React from 'react';
import { Link } from 'gatsby';

const buildFormats = (distribution) => {
  if (!distribution) {
    return null;
  }
  else {
    let i = 0;
    return distribution.map((dist) => {
      i++
      const format = dist.format === undefined ? '' : dist.format.toLowerCase();
      return <div title={`format: ${dist.format}`}
        key={`dist-id-${dist.identifier}-${i}`}
        className="label"
        data-format={format}>{format}</div>
    })
  }
}

const buildThemes = (theme) => {
  if (!theme) {
    return null;
  }
  else {
    let i = 0;
    return theme.map(function(topic) {
      i++
      // if (topic.icon) {
      //   return <div key={`dist-${topic.identifier}-${i}`}>
      //     <img src={topic.icon} height="16px" width="16px" alt={topic.alt} /> 
      //     {topic.title}
      //   </div>
      // }
      // else {
        return <Link key={`dist-${topic.identifier}-${i}`} to={`search?theme=${topic.title}`}>
          {/* <TopicImage title={topic.title} height="16" width="16"/> */}
          {topic.title}
        </Link>
        
      //}
    })
  }
}

const SearchListItem = ({
  item
}) => {
  const description = item.description ? 
    <div className="item-description" dangerouslySetInnerHTML={{__html: item.description}} />
    : '';
  const publisher = item.publisher ? 
    <div className="item-publisher">
      {/* <DataIcon icon="group" height="20" width="20" color="#A7AAAC"/> */}
      <i>{item.publisher.name}</i>
    </div>
    : '';
  const formats = item.format ?
    <div className="format-types">
      {buildFormats(item.format)}
    </div>
    : '';
  const themes = item.theme ?
    <div className="item-theme">
      {buildThemes(item.theme)}
    </div>
    : '';
  return (
    <li>
      <Link to={item.ref}>
        <h2>{item.title}</h2>
      </Link>
      {publisher}
      {themes}
      {description}
      {formats}
    </li>
  );
}

export default SearchListItem;
