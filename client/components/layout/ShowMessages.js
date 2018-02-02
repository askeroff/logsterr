import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MessageItem from './MessageItem';
import { removeMessage } from '../../actions/messages';

class ShowMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'block',
    };
    this.close = this.close.bind(this);
  }
  close(name) {
    this.props.handleRemoveMessage(name);
  }
  render() {
    const messages = this.props.messages.map(item => (
      <MessageItem
        key={item.name}
        id={item.name}
        close={() => this.close(item.name)}
        message={item.message}
      />
    ));
    return messages;
  }
}

ShowMessages.defaultProps = {
  messages: [],
  handleRemoveMessage: () => 0,
};

ShowMessages.propTypes = {
  messages: PropTypes.array,
  handleRemoveMessage: PropTypes.func,
};

const mapStateToProps = state => ({
  messages: state.messages,
});

const mapDispatchToProps = dispatch => ({
  handleRemoveMessage(name) {
    dispatch(removeMessage(name));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowMessages);
