import $ from 'jquery';
import {setChromeStorageData, getChromeStorageData} from "../helpers";

class ContentScript {
  constructor (document) {
    this.form = document.querySelector('#login_form');

    this.getLoginData();
    this.form && this.showLoginData();
  }

  getLoginData() {
    this.form && this.form.addEventListener('submit', function (e) {
      const form = $(e.currentTarget),
        password = form.find('[type="password"]'),
        username = form.find('[type="email"]').length ? form.find('[type="email"]') : form.find('[id="email"]').length ? form.find('[id="email"]') : null;

debugger
      chrome.runtime.sendMessage({name: "login_submit"}, function(response) {
        debugger
      });
      setChromeStorageData({
        lastPass : {
          password: password && password.val(),
          username: username && username.val()
        }
      });
    });
  }

  showLoginData () {
    getChromeStorageData('lastPass').then((data) => {
      const {password, username} = data.lastPass;
      const $form = $(this.form);
      const passwordField = $form.find('[type="password"]');
      const usernameField = $form.find('[type="email"]').length ? $form.find('[type="email"]') : $form.find('[id="email"]').length ? $form.find('[id="email"]') : null;

      if (password || username && passwordField.length && usernameField.length) {
        passwordField.val(password);
        usernameField.val(username)
      }
    });
  }

}

const ContentScriptClass = new ContentScript(document);

// function getContentScriptHtmlWrapper (iframeUrl) {
//   return `<div id="customPopup" style="position: fixed !important;z-index: 2147483647 !important;display: block !important; width: 100% !important;
//     height: 100% !important;top: 10px !important;right: 10px !important;max-height: 182px !important;max-width: 368px !important;" >
//     <iframe src="${iframeUrl}" frameborder="0" scrolling="no" style="border: none !important; position: relative !important; height: 100% !important; width: 100% !important; visibility: visible !important;"></iframe>
// </div>`
// }