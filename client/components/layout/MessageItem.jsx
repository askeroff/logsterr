// @flow
import React from 'react';

type Props = {
  close: (name: string) => void,
  type: string,
  message: string
};

const MessageItem = (props: Props) => (
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

export default MessageItem;
