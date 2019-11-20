import React from 'react';
import PropTypes from 'prop-types';
import { ChoiceList } from '@cmsgov/design-system-core';
import ShowMore from './ShowMore';
import FacetBlock from './FacetBlock';

const FacetBlocks = ({
  facetTypes,
  facets,
  searchFunctions,
  searchParams,
  total,
  selectedFacets,
}) => {

  return(
    <div>
      { facetTypes.map((facetKey) => {
        const title = facets[facetKey].label;
        const filteredFacetList = searchFunctions.filteredFacets(facetKey);
        let hasSelection = selectedFacets.filter((facet) => facet[0] === facetKey) || [];
        const choices = filteredFacetList.map((item, index) => {
          const type = 'checkbox';
          let selected = selectedFacets.filter((facet) => facet[1] === item[0]).length > 0 || false;

          let disabled = item[1] === 0 ? true : false;
          let label = item[0];

          let onChangeFunction = (event) => searchFunctions.facetChange(event);
          let key = `${facetKey}-${label.replace(/\s/g, '')}`;

          return(
            <>
              <input
                key={key}
                type={type}
                name={facetKey}
                value={label}
                checked={selected}
                onChange={onChangeFunction}
              />
              {label}
            </>
          );

        })

        return(
          <div>
            <h2>{title}</h2>
            <ul>
              {choices.map((choice) => <li>{choice}</li>)}
            </ul>
          </div>
        );
      })}
    </div>
  );

}

// function FacetBlocks({ term, sort, title, items, totalFacets, facetKey, selectedFacets, url, facetCallback, showAllToggle, Link, isOpen}) {
//   // let content = (<ul></ul>);
//   let toggleButton = null;

//   // Removes other items in the active category. TODO: move to HOC.
//   let filtered = items.filter((item, facetCategory) => {
//     let flagged = false;
//     const facetName = item[0];
//     selectedFacets.forEach((facet) => {
//       const selectedFacetCategory = facet[0];
//       const selectedFacetName = facet[1];
//       if (facetName !== selectedFacetName && selectedFacetCategory === facetKey) {
//         flagged = true;
//       }
//     });
//     return !flagged;
//   });

//   const content = filtered.map(function callback(facet, i) {
//     const name = facet[0];
//     var value = "(" + facet[1] + ")";
//     selectedFacets.forEach((facet) => {
//       if (facetKey === facet[0] && name === facet[1]) {
//         value = ""
//       }
//     });
//     let isSelected = selectedFacets.find(element => element[1] === name);
//     return {
//       defaultChecked: isSelected ? true : false,
//       value: name,
//       label: `${name} ${value}`
//     }

//   });

//   if (filtered.length >= 10) {
//     if (!isOpen) {
//       toggleButton = <ShowMore className={`facet-block-showmore`} onClick={showAllToggle}>Show {totalFacets - items.length} more</ShowMore>
//     } else {
//       toggleButton = <ShowMore className={`facet-block-showmore`} onClick={showAllToggle}>Show Less</ShowMore>
//     }
//   }
//   return (
//     <FacetBlock id={`facet-block-${facetKey}`}>
//       <div className={`facet-block-${facetKey}-inner`}>
//         <div className="list-group">
//           <ChoiceList
//             choices={content}
//             label={title}
//             onChange={facetCallback}
//             multiple
//             name={facetKey}
//           />
//         </div>
//         {toggleButton}
//       </div>
//     </FacetBlock>);
// }

// FacetBlocks.propTypes = {
//   facetCallback: PropTypes.func,
//   facetKey: PropTypes.string,
//   isOpen: PropTypes.bool,
//   items: PropTypes.array,
//   Link: PropTypes.func,
//   selectedFacets: PropTypes.array,
//   showAllToggle: PropTypes.func,
//   sort: PropTypes.string,
//   term: PropTypes.string,
//   title: PropTypes.string,
//   totalFacets: PropTypes.number,
//   url: PropTypes.string,
// };

export default FacetBlocks;
