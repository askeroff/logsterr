import React from 'react';
import PropTypes from 'prop-types';

const MessageItem = props => (
  <div className={`message message--${props.type}`}>
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
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default MessageItem;
