import Popup from './popup';
debugger
chrome.runtime.onMessage.addListener(function(request) {
  console.log('here');
  switch (request.name) {
    case 'login_submit':
      const { data } = request;
      debugger
      Popup.savePasswordSuggestion(data);
      break;
  }
});