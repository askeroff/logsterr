import * as React from 'react';

interface Props {
  close: (event: React.MouseEvent<HTMLInputElement>) => void,
  type: string,
  id: string,
  message: string
}

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
