import React from 'react';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';
import DraggableArea from '../DraggableArea';

const Draggable = ({ onchange, excludedColumns, columns, moveCard }) => (
  <DndProvider backend={MultiBackend} options={HTML5toTouch}>
    <DraggableArea
      onchange={onchange}
      excludedColumns={excludedColumns}
      items={columns}
      moveCard={moveCard}
    />
  </DndProvider>
);

Draggable.propTypes = {
  onchange: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  excludedColumns: PropTypes.objectOf(PropTypes.bool).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default Draggable;
