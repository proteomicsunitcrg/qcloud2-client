(function (window) {
  window['environment'] = window['environment'] || {};

  // Environment variables
  window.environment.apiPrefix = 'http://localhost:8090';

  // Retrieval of messages
  fetch('assets/messages.json').then(response => {
    return response.json();
  }).then(data => {
    window['environment']['messages'] = data;
  }).catch(err => {
    // Do something for an error here
  });

})(this);

