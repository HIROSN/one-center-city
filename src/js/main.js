(function() {
  var href = 'css.css';
  var head = document.getElementsByTagName('head')[0];
  if (head.querySelector('link[href="' + href + '"]')) {
    return;
  }
  var link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', href);
  head.appendChild(link);
})();
