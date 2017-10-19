const chromeStorage = chrome.storage.local;

chrome.runtime.onMessage.addListener(function(request) {
  switch (request.name) {
    case 'login_submit':
      const { data } = request;
      chromeStorage.set({'lastPass': data});
      // chrome.runtime.sendMessage({'name': 'offer_password_save', 'data': data});
      break;
  }
});

