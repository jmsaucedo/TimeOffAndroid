angular.module('starter.services', ['ngCordova'])

.run(function ($rootScope) {
    $rootScope.profile = {
        EmployeeID: 0,
        EmployeeName: "",
        EmailID: 0,
        Email: "",
        CompanyID: 0,
        CompanyName: "",
        LocationID: 0,
        LocationName: "",
        Department: "",
        Position: "",
    }
})
    
//.factory('Chats', function() {
//  // Might use a resource here that returns a JSON arra
//  // Some fake testing data
//  var chats = [{
//    id: 0,
//    name: 'Crash Car',
//    lastText: '1-5-2015 8:00 A.M. - 1-5-2015 2:00 P.M. ',
//    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
//  }, {
//    id: 1,
//    name: 'My Son wake up Sick',
//    lastText: '1-4-2015 8:00 A.M. - 1-4-2015 5:00 P.M. ',
//    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
//  }, {
//    id: 2,
//    name: 'I Got Robbed',
//    lastText: '12-22-2015 8:00 A.M. - 12-22-2015 3:00 P.M. ',
//    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
//  }];
//  return {
//    all: function() {
//      return chats;
//    },
//    remove: function(chat) {
//      chats.splice(chats.indexOf(chat), 1);
//    },
//    get: function(chatId) {
//      for (var i = 0; i < chats.length; i++) {
//        if (chats[i].id === parseInt(chatId)) {
//          return chats[i];
//        }
//      }
//      return null;
//    }
//  };
//});