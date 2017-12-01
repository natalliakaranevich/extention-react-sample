import $ from 'jquery';

import React from 'react';

class PopUpClass {
  constructor() {
    this.popup = $(document.querySelector('#popupWin'));

    chrome.runtime.onMessage.addListener(request => {
      const {data, name} = request;
      switch (name) {
        case 'save_password':
          Popup.savePasswordSuggestion(data);
          break;
      }
    });
  }

  savePasswordSuggestion(data) {
    this.popup.append(``)
  }
}

console.log('opened')

const Popup = new PopUpClass();