import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AriaModal from 'react-aria-modal';
import AdvancedOptionsForm from './AdvancedOptionsForm';
import Wrapper from './Wrapper';
import ModalWrapper from './ModalWrapper';

const AdvancedOptions = ({
  excludedColumns,
  columnOrder,
  columns,
  reorderColumns,
  toggleColumns,
  modalOpenBtnText,
  className,
  modalClass,
  closeModalBtnText,
  closeModalClasses,
  ariaTitleText,
  appNode,
}) => {
  const [modalOpen, toggleModal] = useState(false);
  return (
    <Wrapper className={className}>
      {!modalOpen
        && <button type="button" onClick={() => toggleModal(!modalOpen)}>{modalOpenBtnText}</button>}
      {modalOpen
        && (
          <AriaModal
            onExit={() => toggleModal(!modalOpen)}
            getApplicationNode={() => document.getElementById(appNode)}
            alert
            focusDialog
            titleText={ariaTitleText}
            underlayClickExits={false}
            verticallyCenter
          >
            <ModalWrapper className={modalClass}>
              <button
                type="button"
                className={closeModalClasses}
                onClick={() => toggleModal(!modalOpen)}
              >
                {closeModalBtnText}
              </button>
              <div style={{ outline: 0 }}>
                <AdvancedOptionsForm
                  columns={columns}
                  excludedColumns={excludedColumns}
                  columnOrder={columnOrder}
                  toggleColumns={toggleColumns}
                  reorderColumns={reorderColumns}
                />
              </div>
            </ModalWrapper>
          </AriaModal>
        )}
    </Wrapper>
  );
};

AdvancedOptions.defaultProps = {
  modalOpenBtnText: 'Manage Columns',
  className: 'data-table-adv-options',
  modalClass: 'data-table-adv-modal',
  closeModalBtnText: 'Close',
  closeModalClasses: 'advanced-options-modal-close',
  ariaTitleText: 'Manage Columns',
  appNode: '___gatsby',
};

AdvancedOptions.propTypes = {
  modalOpenBtnText: PropTypes.string,
  className: PropTypes.string,
  closeModalBtnText: PropTypes.string,
  closeModalClasses: PropTypes.string,
  ariaTitleText: PropTypes.string,
  appNode: PropTypes.string,
  excludedColumns: PropTypes.objectOf(PropTypes.bool).isRequired,
  columnOrder: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  reorderColumns: PropTypes.func.isRequired,
  toggleColumns: PropTypes.func.isRequired,
  modalClass: PropTypes.string,
};

export default AdvancedOptions;
