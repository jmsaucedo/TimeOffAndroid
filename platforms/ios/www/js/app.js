/// <reference path="../templates/tab-login.html" />
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function ($ionicPlatform, $ionicPopup) {
    $ionicPlatform.ready(function () {

    //if (window.Connection) {
    //    if (navigator.connection.type == Connection.NONE) {
    //        $ionicPopup.confirm({
    //            title: "Internet Disconnected",
    //            content: "The internet is disconnected on your device."
    //        })
    //        .then(function (result) {
    //            if (!result) {
    //                ionic.Platform.exitApp();
    //            }
    //        });
    //    }
    //}
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})
.config(function ($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
    $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

  // Each tab has its own nav history stack:

    .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
    })
    .state('tab.home', {
        url: '/home',
        views: {
            'tab-home': {
                templateUrl: 'templates/tab-home.html',
                controller: 'HomeCtrl'
            }
        }
    })
    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })
    .state('tab.login', {
        url: '/login',
        views: {
            'tab-login': {
                templateUrl: 'templates/tab-login.html',
                controller: 'LoginCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise('/tab/dash');

    // if none of the above states are matched, use this as the fallback
    //window.localStorage.setItem("loginInfo", "dcosio@gcib.net");
    var keyname = window.localStorage.key(0);
    // keyname is now equal to "key"
    var value = window.localStorage.getItem("loginInfo");
    console.log(value);
    if (value == null) {
        // alert(value)
        // // localStorage is now empty
        // // $state.go('tab.login');
        // $urlRouterProvider.otherwise('/tabs/login');
    }
    //localStorage.clear();

});

