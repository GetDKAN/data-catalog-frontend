import React from 'react';
import PropTypes from 'prop-types';

const DataTablePageResults = ({
  total,
  pageSize,
  currentPage,
  className,
}) => {
  // Add one to offset the 0 array index.
  const page = currentPage + 1;
  const currentLowestResult = 1 + ((pageSize * page) - pageSize);
  let currentHighestResult = (pageSize * page);
  if (currentHighestResult > total) {
    currentHighestResult = total;
  }
  return (
    <div className={className}>
      <p>
        <span className="low-result">{currentLowestResult}</span>
        {' '}
        -
        {' '}
        <span className="high-result">{currentHighestResult}</span>
        {' '}
        of
        {' '}
        <span className="total">{total}</span>
        {' '}
        datasets
      </p>
    </div>
  );
};

DataTablePageResults.defaultProps = {
  className: 'data-table-results',
};

DataTablePageResults.propTypes = {
  className: PropTypes.string,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default DataTablePageResults;
