import React from 'react';
import PropTypes from 'prop-types';
// import Table from '../../Table';

const ResourceInfoTable = ({
  statistics, title, th1, th2, tableclass,
}) => {
  const numRows = 'rows' in statistics ? statistics.rows : '';
  const numColumns = 'columns' in statistics ? statistics.columns : '';
  const labelsT1 = {
    rows: {
      label: numRows.toString(),
    },
  };
  const valuesT1 = {
    rows: numColumns.toString(),
  };

  return (
    <p>table</p>
    // <Table
    //   configuration={labelsT1}
    //   data={valuesT1}
    //   title={title}
    //   th1={th1}
    //   th2={th2}
    //   tableclass={tableclass}
    // />
  );
};

ResourceInfoTable.defaultProps = {
  th1: 'Rows',
  th2: 'Columns',
  tableclass: 'table-one',
};

ResourceInfoTable.propTypes = {
  statistics: PropTypes.shape({
    columns: PropTypes.number,
    rows: PropTypes.number,
  }).isRequired,
  title: PropTypes.string.isRequired,
  th1: PropTypes.string,
  th2: PropTypes.string,
  tableclass: PropTypes.string,
};

export default ResourceInfoTable;
