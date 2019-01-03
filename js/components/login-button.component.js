function GoogleLoginController($scope, $window,  Google, $timeout) {
  var currentWindowUrl = location.protocol + '//' + location.host + location.pathname;
  $scope.loadingAuthenticationStatus = true;
  $scope.alreadyLoggedIn = false;
  $scope.user = {};
  $scope.loading = false;


  var clientId = '7340060436-95l82uqmnpvfumc00ftvndlmb9o6kv4d.apps.googleusercontent.com';
  var clientSecret = 'E29i5BjiGCMBqph7Vbyv9iXM'
  var redirectUri = 'DEFINE_YOUR_REDIRECT_URI';


  var redirectToCurrentWindowUrl = function(){
    location.href = currentWindowUrl;
  }


  $scope.authenticate = function() {
    HelperService.showMessage('You will be soon redirected to google for the authentication', 'success')
    Google.authenticate(clientId, redirectUri)
  };


  var fetchProfile = function(authCode){
    var onProfileSunccess = function(data){
    }

    var onProfileError = function(){
      HelperService.showMessage('Authentication Failed', 'error')
    }

    Google.fetchProfile(authCode)
          .then(onProfileSunccess, onProfileError);
  }

  var fetchAuthCode = function(){
    var urlParams = new URLSearchParams(window.location.search);
    var code = urlParams.get('code');
    if (code){

      var onSuccess = function(data){
        updateUserSession(data);
        $scope.loading = false;
      }

      var onError = function(){
        HelperService.showMessage('Authentication Failed, Please link your google profile in the settings page.', 'error');
        $scope.loading = false;
        redirectToCurrentWindowUrl();
      }
      Google.authToken(code)
                 .then(onSuccess, onError)
    }
  }

  $window.processAuthentication = function() {
    fetchAuthCode();
  }
}

cialfoSharedApp.component('googleLogin',  {
  restrict: 'AE',
  templateUrl: 'google/signin.html',
  controller: GoogleLoginController
});