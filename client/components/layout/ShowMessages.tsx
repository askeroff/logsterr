import * as React from 'react';
import { connect } from 'react-redux';
import MessageItem from './MessageItem';
import { removeMessage } from '../../actions/messages';

interface IMessage {
  message: string;
  name: string;
  type: string;
}

interface State { show: string }

interface Props {
  messages: IMessage[];
  handleRemoveMessage: (name: string) => void;
}

class ShowMessages extends React.Component<Props, State> {
  static defaultProps = {
    messages: [],
    handleRemoveMessage: null
  };

  state = {
    show: 'block'
  };

  close = (name): void => {
    this.props.handleRemoveMessage(name);
  };

  render(): JSX.Element[] {
    const messages = this.props.messages.map(item => (
      <MessageItem
        key={item.name}
        id={item.name}
        close={() => this.close(item.name)}
        message={item.message}
        type={item.type}
      />
    ));
    return messages;
  }
}

const mapStateToProps = state => ({
  messages: state.messages
});

const mapDispatchToProps = dispatch => ({
  handleRemoveMessage(name) {
    dispatch(removeMessage(name));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowMessages);
