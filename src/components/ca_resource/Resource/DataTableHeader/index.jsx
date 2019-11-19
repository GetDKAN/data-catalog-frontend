import React from 'react';
import PropTypes from 'prop-types';
import DataTablePageResults from './DataTablePageResults';
import DataTableDensity from './DataTableDensity';
import DataTablePageSizer from './DataTablePageSizer';
import AdvancedOptions from './AdvancedOptions';
import Wrapper from './Wrapper';

const DataTableHeader = ({
  dataPreview,
  id,
  dataFunctions,
  className,
  hideDisplayDensity,
  hidePageResults,
  hidePageSizer,
  hideAdvancedOptions,
  pageResultsOptions,
  pageSizerOptions,
  displayDensityOptions,
}) => {
  const { className: pageResultsClass } = pageResultsOptions;
  const { label, options, className: pageSizerClass } = pageSizerOptions;
  const {
    items, className: densityClass, screenReaderClass, title,
  } = displayDensityOptions;
  return (
    <Wrapper>
      <div className={className}>
        { !hidePageResults
          && (
            <DataTablePageResults
              total={parseInt(dataPreview.rowsTotal, 10)}
              pageSize={dataPreview.pageSize}
              currentPage={dataPreview.currentPage}
              className={pageResultsClass}
            />
          )}
        { !hidePageSizer
          && (
            <DataTablePageSizer
              pageSizeChange={dataFunctions.pageSizeChange}
              currentOption={dataPreview.pageSize.toString()}
              label={label}
              options={options}
              className={pageSizerClass}
              id={id}
            />
          )}
        { !hideDisplayDensity
        && (
          <DataTableDensity
            densityChange={dataFunctions.densityChange}
            items={items}
            className={densityClass}
            screenReaderClass={screenReaderClass}
            title={title}
          />
        )}
        { !hideAdvancedOptions
        && (
          <AdvancedOptions
            columns={dataPreview.columns}
            excludedColumns={dataPreview.excludedColumns}
            columnOrder={dataPreview.columnOrder}
            toggleColumns={dataFunctions.toggleColumns}
            reorderColumns={dataFunctions.reorderColumns}
          />
        )}
      </div>
    </Wrapper>
  );
};

DataTableHeader.defaultProps = {
  className: 'data-table-header',
  hidePageResults: false,
  hidePageSizer: false,
  hideDisplayDensity: false,
  hideAdvancedOptions: false,
  pageResultsOptions: {
    className: 'data-table-results',
  },
  pageSizerOptions: {
    label: 'Rows per page',
    options: [
      { defaultChecked: true, label: '20', value: '20' },
      { label: '50', value: '50' },
      { label: '100', value: '100' },
    ],
    className: 'page-size-options',
  },
  displayDensityOptions: {
    items: [
      { icon: null, text: 'expanded' },
      { icon: null, text: 'normal' },
      { icon: null, text: 'tight' },
    ],
    className: 'data-table-density',
    screenReaderClass: 'sr-only sr-only-focusable',
    title: 'Display Density',
  },
};

DataTableHeader.propTypes = {
  hidePageResults: PropTypes.bool,
  hidePageSizer: PropTypes.bool,
  hideDisplayDensity: PropTypes.bool,
  hideAdvancedOptions: PropTypes.bool,
  className: PropTypes.string,
  dataPreview: PropTypes.shape({
    columnOrder: PropTypes.array,
    columns: PropTypes.array,
    currentPage: PropTypes.number,
    density: PropTypes.string,
    excludedColumns: PropTypes.objectOf(PropTypes.bool),
    filters: PropTypes.array,
    pageSize: PropTypes.number,
    rowsTotal: PropTypes.string,
    sort: PropTypes.array,
    values: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  pageResultsOptions: PropTypes.shape({
    className: PropTypes.string,
  }),
  pageSizerOptions: PropTypes.shape({
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
  }),
  id: PropTypes.string.isRequired,
  dataFunctions: PropTypes.objectOf(PropTypes.func).isRequired,
  displayDensityOptions: PropTypes.shape({
    screenReaderClass: PropTypes.string,
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.node,
      text: PropTypes.string,
    })),
    title: PropTypes.string,
  }),
};

export default DataTableHeader;
