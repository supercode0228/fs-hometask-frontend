import React from 'react';
import PropTypes from 'prop-types';

import './StaticModal.css';

// Sum of top and bottom paddings (50px + 50px)
const TOP_BOTTOM_PADDING = 100;

class StaticModal extends React.Component {
  static propTypes = {
    header: PropTypes.string,
    content: PropTypes.node,
    close: PropTypes.func,
    modalId: PropTypes.number,
    showShadow: PropTypes.bool,
    zIndex: PropTypes.number,
    size: PropTypes.string,
    visible: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    header: null,
    content: null,
    close: null,
    modalId: null,
    showShadow: true,
    zIndex: null,
    size: 'auto',
    visible: true,
    className: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      scrollable: false,
    };

    this.check_timeout = false;
    this.ref_container = false;
    this.ref_content = false;
  }

  componentDidMount() {
    window.addEventListener('resize', this.checkContainerSize);
    this.check_timeout = setInterval(this.checkContainerSize, 300);
    this.checkContainerSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkContainerSize);
    clearInterval(this.check_timeout);

    this.ref_container = null;
    this.ref_content = null;
  }

  handleCloseModal = () => {
    const { close, modalId } = this.props;

    if (close) {
      close(modalId || null);
    }
  };

  handleContainerClick = (e) => {
    const { className } = e.target;

    if (
      typeof className !== 'string' ||
      className.indexOf('static-modal-body-container') !== 0
    ) {
      return;
    }

    this.handleCloseModal();
  };

  setRefContainer = (c) => {
    this.ref_container = c;
  };

  setRefContent = (c) => {
    this.ref_content = c;
  };

  checkContainerSize = () => {
    if (!this.ref_container || !this.ref_content) {
      return;
    }

    const content_height = this.ref_content.offsetHeight || 0;
    const container_height = this.ref_container.offsetHeight || 0;

    const scrollable = content_height > container_height - TOP_BOTTOM_PADDING;

    if (scrollable !== this.state.scrollable) {
      this.setState({ scrollable });
    }
  };

  render() {
    const {
      size,
      content,
      zIndex,
      showShadow,
      visible,
      className,
    } = this.props;

    const bodyProps = {
      className: `static-modal-body static-modal-body--${size} static-modal-body--${
        visible ? 'visible' : 'hidden'
      }`,
      ref: this.setRefContent,
    };

    const containerProps = {
      className: `static-modal-body-container ${className}`,
      onClick: this.handleContainerClick,
      ref: this.setRefContainer,
      style: {},
    };

    const shadowProps = {
      className: 'static-modal-background',
      onClick: this.handleCloseModal,
      style: {},
    };

    if (this.state.scrollable) {
      containerProps.className += ` static-modal-body-container--with-scroll`;
    }

    if (zIndex) {
      containerProps.style.zIndex = zIndex;
      shadowProps.style.zIndex = zIndex;
    }

    return (
      <>
        {showShadow && <div {...shadowProps} />}
        <div {...containerProps}>
          <div {...bodyProps}>{content}</div>
        </div>
      </>
    );
  }
}

export default StaticModal;
