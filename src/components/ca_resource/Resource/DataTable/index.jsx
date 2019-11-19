import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import Wrapper from './Wrapper';
import 'react-table/react-table.css';

const DataTable = ({
  data,
  loading,
  columns,
  pageSize,
  pages,
  sortedChange,
  pageChange,
  filterChange,
  index,
  density,
}) => {
  const style = density ? `${density} -striped -highlight` : '-striped -highlight';
  return (
    <Wrapper>
      <ReactTable
        loading={loading}
        index={index}
        data={data}
        filterable
        pages={pages}
        pageSize={pageSize}
        manual
        showPageJump={false}
        showPageSizeOptions={false}
        onPageChange={pageChange}
        onSortedChange={sortedChange}
        onFilteredChange={filterChange}
        columns={columns}
        className={style}
      />
    </Wrapper>
  );
};

DataTable.defaultProps = {
  density: '',
};

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSize: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  sortedChange: PropTypes.func.isRequired,
  pageChange: PropTypes.func.isRequired,
  filterChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  density: PropTypes.string,
};

export default DataTable;
