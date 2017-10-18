import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render () {
    return  <div id="main-popup" className="main-popup">
      <h1 className="title">My saved passwords</h1>
      <p className="passwords">You have no saved passwords</p>
    </div>
  }
}

export default connect(
  state => {
    return ({

    })
  },
  dispatch => ({

  })
)(App);