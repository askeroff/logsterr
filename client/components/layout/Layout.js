/* eslint react/prop-types: 0 */
import React from 'react';
import Header from './Header';
import Footer from './Footer';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this);
  }
  render() {
    return (
      <div>
        <Header />
        {React.cloneElement(this.props.children, this.props)}
        <Footer />
      </div>
    );
  }
}

export default Layout;
