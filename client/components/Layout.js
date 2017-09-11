import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';


const Layout = props => (
  <div>
    <Header />
    {props.children}
    <Footer />
  </div>
);

Layout.defaultProps = {
  children: 'Hello, world!',
};

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
