import React from 'react';
import PropTypes from 'prop-types';

const DataTableDensity = ({
  items,
  densityChange,
  className,
  screenReaderClass,
  title,
}) => (
  <div className={className}>
    <span className="density-buttons-title">{title}</span>
    <div className="density-buttons">
      {items.map((item, index) => {
        let srClass = screenReaderClass;
        if (!item.icon) {
          srClass = '';
        }
        return (
          <button type="button" key={item.text} onClick={() => densityChange(index)}>
            {item.icon
              && (
                <>
                  {item.icon}
                </>
              )}
            <span className={srClass}>{item.text}</span>
          </button>
        );
      })}
    </div>
  </div>
);

DataTableDensity.defaultProps = {
  items: [
    { icon: null, text: 'expanded' },
    { icon: null, text: 'normal' },
    { icon: null, text: 'tight' },
  ],
  className: 'data-table-density',
  screenReaderClass: 'sr-only sr-only-focusable',
  title: 'Display Density',
};

DataTableDensity.propTypes = {
  densityChange: PropTypes.func.isRequired,
  screenReaderClass: PropTypes.string,
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.node,
    text: PropTypes.string,
  })),
  title: PropTypes.string,
};

export default DataTableDensity;
