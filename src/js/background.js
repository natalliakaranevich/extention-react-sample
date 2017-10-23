const chromeStorage = chrome.storage.local;

chrome.runtime.onMessage.addListener(function(request) {
  switch (request.name) {
    case 'login_submit':
      const { data } = request;
      chromeStorage.set({'lastPass': data});
      break;
  }
});

