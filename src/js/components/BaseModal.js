import React from 'react';
import Modal from 'react-modal';
import _ from 'underscore';

module.exports = React.createBackboneClass({
  render: function() {
    var style = {
      overlay: {
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0, 0.5)'
      },
      content: {
        position: 'fixed',
        left: '0px',
        right: '0px',
        bottom: 'auto'
      }
    };
    var propsStyle = this.props.style || {};

    // Extend the differnet branches of the style object with
    // what, if anything, was passed from props
    style.overlay = _.extend({}, style.overlay, propsStyle.overlay);
    style.content = _.extend({}, style.content, propsStyle.content);

    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        style={style}
        onAfterOpen={this.props.onAfterOpen}
        closeTimeoutMS={this.props.closeTimeoutMS}
        shouldCloseOnOverlayClick={this.props.shouldCloseOnOverlayClick}>
        <i
          onClick={this.props.onRequestClose}
          className="fa fa-times pull-right"></i>
        <br /><br />
        {this.props.children}
      </Modal>
    );
  }
})
