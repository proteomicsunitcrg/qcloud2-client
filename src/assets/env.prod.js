(function (window) {
  window['environment'] = window['environment'] || {};

  // Environment variables
  window['environment']['apiPrefix'] = '${QCLOUD2_API_PREFIX}';

  fetch('assets/messages.json').then(response => {
    return response.json();
  }).then(data => {
    window['environment']['messages'] = data;
  }).catch(err => {
    // Do something for an error here
  });

})(this);

