import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Draggable from '../Draggable';

class AdvancedOptionsForm extends React.Component {
  constructor(props) {
    super(props);
    const { excludedColumns, columns } = props;
    let { columnOrder } = props;

    if (Object.keys(excludedColumns).length === 0 && excludedColumns.constructor === Object) {
      columns.map((column) => {
        const columnKey = column.accessor;
        excludedColumns[columnKey] = true;
        return excludedColumns;
      });
    }

    if (columnOrder.length === 0) {
      columnOrder = columns;
    }
    this.state = {
      excludedColumns,
      columnOrder,
    };

    this.moveCard = this.moveCard.bind(this);
    this.handleColumnChange = this.handleColumnChange.bind(this);
  }

  moveCard(oldIndex, newIndex) {
    const { columnOrder } = this.state;
    const { reorderColumns } = this.props;
    const localColumnOrder = _.concat([], columnOrder);
    _.remove(localColumnOrder, (n, index) => {
      if (index === oldIndex) {
        return true;
      }
      return false;
    });
    const componentToMove = columnOrder[oldIndex];
    if (oldIndex < newIndex) {
      // 2 to 4
      const modifiedNewIndex = newIndex;
      localColumnOrder.splice(modifiedNewIndex, 0, componentToMove);
    } else if (oldIndex > newIndex) {
      // 4 to 2
      localColumnOrder.splice(newIndex, 0, componentToMove);
    } else if (oldIndex === newIndex) {
      return;
    }
    this.setState(() => ({
      columnOrder: localColumnOrder,
    }), () => reorderColumns(localColumnOrder));
  }

  handleColumnChange(event) {
    const { target } = event;
    const { value } = target;
    const { toggleColumns } = this.props;
    const { excludedColumns } = this.state;
    this.setState((prevState) => ({
      excludedColumns: {
        ...prevState.excludedColumns,
        [value]: !prevState.excludedColumns[value],
      },
    }), () => toggleColumns(excludedColumns));
  }

  render() {
    const { excludedColumns, columnOrder } = this.state;
    const { columns } = this.props;
    return (
      <div className="advanced_table_setting_modal">
        {columns.length
        && (
        <form>
          <Draggable
            moveCard={this.moveCard}
            onchange={this.handleColumnChange}
            excludedColumns={excludedColumns}
            columns={columnOrder}
          />
        </form>
        )}
      </div>
    );
  }
}

AdvancedOptionsForm.defaultProps = {
  columnOrder: [],
  excludedColumns: {},
};

AdvancedOptionsForm.propTypes = {
  columnOrder: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  excludedColumns: PropTypes.objectOf(PropTypes.bool),
  toggleColumns: PropTypes.func.isRequired,
  reorderColumns: PropTypes.func.isRequired,
};

export default AdvancedOptionsForm;
