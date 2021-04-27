import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModal, openModal } from '../../../actions/modal';
import StaticModal from '../StaticModal';

const Z_INDEX_BASE = 1100;
const Z_INDEX_GAIN = 1;

class Modals extends React.PureComponent {
  static MODALS = {};

  static propTypes = {
    modals: PropTypes.array.isRequired,
    closeModal: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    setInterval(this.checkDismissModals, 500);
  }

  componentWillUnmount() {
    clearInterval(this.checkDismissModals);
  }

  checkDismissModals = () => {
    const { modals, closeModal } = this.props;
    const now = Date.now();

    modals.forEach(({ onDismissByTimeout, dismissAt, modalId }) => {
      if (!dismissAt || now < dismissAt) {
        return;
      }

      if (onDismissByTimeout) {
        onDismissByTimeout();
      }

      closeModal(modalId);
    });
  };

  handleDismissByUser = (closeModalID) => {
    const { modals, closeModal } = this.props;
    let closeCallback = null;

    modals.forEach(({ modalId, onDismissByUser }) => {
      if (closeModalID === modalId) {
        closeCallback = onDismissByUser;
      }
    });

    if (closeCallback) {
      closeCallback();
    }

    closeModal(closeModalID);
  };

  modalSpinnerOverlay = () => {
    return (
      <div className="modalOverlay">
        <div>Loading...</div>
      </div>
    );
  };

  renderModals() {
    const { MODALS } = this.constructor;
    const { modals, closeModal, openModal } = this.props;

    return modals.map(
      (
        { modalType, modalId, modalProps, size, userCanClose, wrapped },
        index
      ) => {
        if (MODALS[modalType] === undefined) {
          return null;
        }

        const Component = MODALS[modalType].component;

        let content = (
          <Component
            key={modalId}
            modalId={modalId}
            zIndex={Z_INDEX_BASE + index * Z_INDEX_GAIN}
            onDismissByUser={() => {
              this.handleDismissByUser(modalId);
            }}
            userCanClose={userCanClose}
            closeModal={closeModal}
            openModal={openModal}
            modalSpinnerOverlay={this.modalSpinnerOverlay}
            {...modalProps}
          />
        );
        if (wrapped !== false && MODALS[modalType].wrapped !== false) {
          const is_last = index === modals.length - 1;

          content = (
            <StaticModal
              key={modalId}
              modalId={modalId}
              zIndex={Z_INDEX_BASE + index * Z_INDEX_GAIN}
              close={userCanClose !== false ? this.handleDismissByUser : null}
              size={size || MODALS[modalType].size || 'auto'}
              showShadow={is_last}
              visible={is_last}
              content={content}
            />
          );
        }

        return content;
      }
    );
  }

  render() {
    return this.renderModals();
  }
}

export default connect(
  (state) => ({
    modals: state.modals,
  }),
  (dispatch) => {
    return {
      closeModal: (id_or_type) => {
        return dispatch(closeModal(id_or_type));
      },
      openModal: (data) => {
        return dispatch(openModal(data));
      },
    };
  }
)(Modals);
