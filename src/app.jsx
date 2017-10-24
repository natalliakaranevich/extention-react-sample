import React, { Component } from 'react';
import { connect } from 'react-redux';
import SavePasswordProvider from './providers/savePassword.js';
import OfferSavePassword from "./components/offerSavePassword.jsx";
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);

    chrome.runtime.onMessage.addListener(function(request,sender, sendResponse) {
      switch (request.name) {
        case 'login_submit':
          const { data } = request;
          const a =  document.createElement('div');
          ReactDOM.render(<OfferSavePassword/>, a);
          debugger
          sendResponse(a.outerHTML);
          break;
      }
    });
  }

  render () {
    return <div>
      Hello React World!
    </div>
  }
}

export default connect(
  state => {
    return ({

    })
  },
  dispatch => ({
    savePasswordProvider: new SavePasswordProvider(dispatch)
  })
)(App);