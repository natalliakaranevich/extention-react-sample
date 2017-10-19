import $ from 'jquery';

const chromeStorage = chrome.storage.local;
const form = document.querySelector('#login_form');
const passwordField = '[type="password"]';

chrome.storage.local.set({
  lastPass : {
    password: null,
    username: null
  }
});

function getLoginData() {
  form && form.addEventListener('submit', function (e) {
    const form = $(e.currentTarget),
      password = form.find(passwordField),
      username = form.find('[type="email"]').length ? form.find('[type="email"]') : form.find('[id="email"]').length ? form.find('[id="email"]') : null;

    const data = {
      'password': password.val(),
      'username': username.val()
    };

    // data && data.password && data.username && offerSavePassword(data);

    chrome.runtime.sendMessage({'name': 'login_submit', site: window.origin, 'data': data});
  });
}

function getData (key) {
  return new Promise((resolve) => {
    chromeStorage.get(key, (result) => {
      resolve(result);
    });
  });
}

function showLoginData () {
  const $form = $(form);
  const passwordField = $form.find(passwordField);
  const usernameField = $form.find('[type="email"]').length ? $form.find('[type="email"]') : $form.find('[id="email"]').length ? $form.find('[id="email"]') : null;

  getData('lastPass').then((data) => {
    const {password, username} = data.lastPass;
debugger
    if (password || username && passwordField.length && usernameField.length) {
      passwordField.val(password);
      usernameField.val(username)
    }
  });
}

function offerSavePassword () {
  debugger
  document.appendChild(getContentScriptHtmlWrapper('chrome-extension://mjdegdkpaklicobnfjaejhcadijkhjef/build/contentScriptDialog.html'))
}

function getContentScriptHtmlWrapper (iframeUrl) {
  return `<div id="customPopup" style="position: fixed !important;z-index: 2147483647 !important;display: block !important; width: 100% !important;
    height: 100% !important;top: 10px !important;right: 10px !important;max-height: 182px !important;max-width: 368px !important;" >
    <iframe src="${iframeUrl}" frameborder="0" scrolling="no" style="border: none !important; position: relative !important; height: 100% !important; width: 100% !important; visibility: visible !important;"></iframe>
</div>`
}


getLoginData();
showLoginData();