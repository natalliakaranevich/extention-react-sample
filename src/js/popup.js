import $ from 'jquery';
import '../scss/styles.scss';
import React from 'react';

class PopUpClass {
  constructor() {
    this.popup = $(document.querySelector('#main-popup'));

    chrome.runtime.onMessage.addListener(request => {
      const {data, name} = request;
      switch (name) {
        case 'offer_password_save':
          Popup.savePasswordSuggestion(data);
          break;

        default:
          chrome.browserAction.setPopup({
            popup: chrome.browserAction.getPopup({})
          })
      }
    });
  }

  savePasswordSuggestion(data) {
    this.popup.append(`<div class="save-passwors">
      <h2 class="title">Would you like to save this credentials?</h2>
      <p>Username : ${data.username}</p>
      <p>Password : ${data.password}</p>
    </div>`)
  }
}

const Popup = new PopUpClass();