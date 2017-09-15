/* eslint react/prop-types: 0 */
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = props => (
  <div>
    <Header user={props.user} history={props.history} />
    { props.children }
    <Footer />
  </div>
);

export default Layout;
