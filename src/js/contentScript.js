import $ from 'jquery';

const chromeStorage = chrome.storage.local;
const form = document.querySelector('#login_form');

function setChromeStorageData(data) {
  return new Promise((resolve) => {
    chromeStorage.set(data, () => {
      resolve(data);
    });
  });
}

function getChromeStorageData (key) {
  return new Promise((resolve) => {
    chromeStorage.get(key, (result) => {
      resolve(result);
    });
  });
}


function getLoginData() {
  form && form.addEventListener('submit', function (e) {
    const form = $(e.currentTarget),
      password = form.find('[type="password"]'),
      username = form.find('[type="email"]').length ? form.find('[type="email"]') : form.find('[id="email"]').length ? form.find('[id="email"]') : null;

    setChromeStorageData({
      lastPass : {
        password: password && password.val(),
        username: username && username.val()
      }
    });
  });
}

function showLoginData () {
  getChromeStorageData('lastPass').then((data) => {
    const {password, username} = data.lastPass;
    const $form = $(form);
    const passwordField = $form.find('[type="password"]');
    const usernameField = $form.find('[type="email"]').length ? $form.find('[type="email"]') : $form.find('[id="email"]').length ? $form.find('[id="email"]') : null;

    if (password || username && passwordField.length && usernameField.length) {
      passwordField.val(password);
      usernameField.val(username)
    }
  });
}

// function getContentScriptHtmlWrapper (iframeUrl) {
//   return `<div id="customPopup" style="position: fixed !important;z-index: 2147483647 !important;display: block !important; width: 100% !important;
//     height: 100% !important;top: 10px !important;right: 10px !important;max-height: 182px !important;max-width: 368px !important;" >
//     <iframe src="${iframeUrl}" frameborder="0" scrolling="no" style="border: none !important; position: relative !important; height: 100% !important; width: 100% !important; visibility: visible !important;"></iframe>
// </div>`
// }


getLoginData();
form && showLoginData();