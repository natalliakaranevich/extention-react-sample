import React, {Component} from 'react';
import {connect} from 'react-redux';
import SavePasswordProvider from './providers/savePassword.js';
import OfferSavePassword from "./components/offerSavePassword.jsx";
import ExtensionPopup from "./components/extentionPopup.jsx";
import ReactDOM from 'react-dom';
import {setChromeStorageData, clearSrotage} from "./helpers";
import {SAVEPOPUP, PASSWORDS} from "./constants/chromeStorageKeys";
import {SHOWMAINPOPUP, SAVEPASSWORD, LOGINSUBMIT} from "./constants/messages";
import {getChromeStorageData} from "./helpers";

class App extends Component {
  constructor(props) {
    super(props);
    // clearSrotage();
  }

  componentDidMount() {
    const {savePasswordProvider} = this.props;

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      switch (request.name) {
        case SAVEPASSWORD:
          savePasswordProvider.savePassword(request);
          break;
        case LOGINSUBMIT:
          const a = document.createElement('div');
          a.className = 'sub-popup';
          ReactDOM.render(<OfferSavePassword data={request.data} />, a);
          setChromeStorageData(SAVEPOPUP, a.outerHTML);
          break;
      }
    });

    chrome.browserAction.onClicked.addListener(() => {
      const {creads} = this.props;
      const a = document.createElement('div');
      a.className = 'extension-popup';

      ReactDOM.render(<ExtensionPopup data={creads} />, a);
      chrome.runtime.sendMessage({name: SHOWMAINPOPUP, data: a.outerHTML});
    });

    getChromeStorageData(null).then((data) => {
      savePasswordProvider.savePassword({data: data[PASSWORDS]});
    });
  }

  render() {
    console.log(this.props);
    return <div>
      Hello React World!
    </div>
  }
}

export default connect(
  state => ({
    creads: state.savePassword.creads
  }),
  dispatch => ({
    savePasswordProvider: new SavePasswordProvider(dispatch)
  })
)(App);