/* eslint react/prop-types: 0 */
import React from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    axios
    .get('/auth')
    .then((res) => {
      console.log(res.data.user);
      this.setState({
        user: res.data.user,
      });
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Header />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}

export default Layout;
