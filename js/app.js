var googleSsoApp = angular.module('googleSsoApp', []);

var initGoogleAuthentication = function() {
  if (window.processAuthentication)
    window.processAuthentication();
}