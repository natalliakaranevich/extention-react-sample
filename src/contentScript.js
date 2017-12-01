import $ from 'jquery';
import {setChromeStorageData, getChromeStorageData} from "./helpers";
import './scss/styles.scss';
import {PASSWORDS, SAVEPOPUP} from "./constants/chromeStorageKeys";
import {SAVEPASSWORD, LOGINSUBMIT} from "./constants/messages";
import _ from 'lodash';

const offerPopupData = [SAVEPOPUP, PASSWORDS, 'passSaved'];
let offerSave = true;

class ContentScript {
  constructor (document) {
    this.form = document.querySelector('#login_form');
    this.getLoginData();
    this.form && this.showLoginData();
    this.showOfferPopup(getChromeStorageData(offerPopupData));
  }

  getLoginData() {
    this.form && this.form.addEventListener('submit', function (e) {
      const form = $(e.currentTarget),
        password = form.find('[type="password"]'),
        username = form.find('[type="email"]').length ? form.find('[type="email"]') : form.find('[id="email"]').length ? form.find('[id="email"]') : null;

      const newData = {
        password: password && password.val(),
        username: username && username.val(),
        saved: false,
        url: window.location.host
      };

      getChromeStorageData(PASSWORDS).then((data) => {
        const creds = data[PASSWORDS] && data[PASSWORDS].find(item => item.url === window.location.host);
        if (creds && creds.url !== newData.url && creds.password !== newData.password && creds.username !== newData.username) {
          chrome.runtime.sendMessage({name: LOGINSUBMIT, data: newData});
          setChromeStorageData(PASSWORDS, [newData]);
        }
      });
    });
  }

  showLoginData () {
    getChromeStorageData(PASSWORDS).then((data) => {
      if (!data[PASSWORDS] || !data[PASSWORDS].find(item => item.url === window.location.host)) return false;
      const {password, username} = data[PASSWORDS].find(item => item.url === window.location.host);
      const $form = $(this.form);
      const passwordField = $form.find('[type="password"]');
      const usernameField = $form.find('[type="email"]').length ? $form.find('[type="email"]') : $form.find('[id="email"]').length ? $form.find('[id="email"]') : null;

      if (password || username && passwordField.length && usernameField.length) {
        passwordField.val(password);
        usernameField.val(username);
      }
    });
  }

  showOfferPopup(promise) {
    promise.then((data) => {
      offerSave = !data.passSaved;
      if (data[SAVEPOPUP] && offerSave) {
        let popup = $('.sub-popup');
        !popup.length ? $('body').append(data[SAVEPOPUP]) : popup.replaceWith(data[SAVEPOPUP]);
        $('#savePassword').click((e) => {
          chrome.runtime.sendMessage({name: SAVEPASSWORD, data: data[PASSWORDS]});
          this.hideOfferPopup($(e.currentTarget))
        });

        $('#notSavePassword').click((e) => {
          this.hideOfferPopup($(e.currentTarget))
        })
      }
    });
  }

  hideOfferPopup($context) {
    $context.closest('.sub-popup').addClass('-hide');
    offerSave = false;
  }
}



const ContentScriptClass = new ContentScript(document);

window.setInterval(() => {
  offerSave && ContentScriptClass.showOfferPopup(getChromeStorageData(offerPopupData));
}, 5000);