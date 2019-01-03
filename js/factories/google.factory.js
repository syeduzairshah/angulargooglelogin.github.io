(function(){
  googleSsoApp.factory("Google",['$http', '$q', function ($http, $q) {
      var currentWindowUrl = location.protocol + '//' + location.host + location.pathname;
      var accessType =  'offline';
      var state =  encodeURIComponent(currentWindowUrl);
      var responseType =  'code';
      // var scope =  'https://www.googleapis.com/auth/userinfo.profile'; // https://www.googleapis.com/auth/userinfo.profile
      var scope = 'https://www.googleapis.com/auth/plus.login  https://www.googleapis.com/auth/userinfo.email'

      return{
          authenticate: function(clientId, redirectUri){
              var googleBaseUrl =
                  "https://accounts.google.com/o/oauth2/v2/auth?" +
                  "access_type="+ accessType +
                  "&state="+ state +
                  "&client_id=" + clientId +
                  "&redirect_uri=" + redirectUri +
                  "&response_type=" + responseType +
                  "&scope=" + scope +
                  "&include_granted_scopes=true";
              window.location = googleBaseUrl;
          },

          authToken: function(clientId, clientSecret, code){
            var defer = $q.defer();
            console.log(clientId)
            $http.post(
              'https://www.googleapis.com/oauth2/v4/token',
              {
                code: code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code'
              }
            ).success(function(data, status, headers, config){
              defer.resolve(data.access_token);
            }).error(function(data, status, headers, config){
              defer.reject(data);
            });
            return defer.promise;
          },

          fetchProfile: function(authCode){
            var defer = $q.defer();
            $http({
              method: "GET",
              url:"https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+authCode
            }).success(function(data, status, headers, config){
              defer.resolve(data);
            }).error(function(data, status, headers, config){
              defer.reject(data);
            });
            return defer.promise;
          }
      }
  }]);
})();