import React from 'react';
import PropTypes from 'prop-types';

const MessageItem = props => (
  <div className="warning-message">
    <p>{props.message}</p>
    <input
      type="button"
      className="button--info"
      value="Dismiss!"
      onClick={props.close}
    />
  </div>
);

MessageItem.propTypes = {
  close: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default MessageItem;
