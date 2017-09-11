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

/* children basically means anything that goes into the layout,
  react components, html or whatever. */

Layout.defaultProps = {
  children: 'Hello, world!',
};

Layout.propTypes = {
  children: PropTypes.array,
};

export default Layout;
