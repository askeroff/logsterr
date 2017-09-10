import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';

class App extends React.Component {
  render() {
    return (
      <Layout>
        <h1>My App Works!</h1>
      </Layout>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
