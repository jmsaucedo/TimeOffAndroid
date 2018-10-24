angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function ($scope, $http, $filter, $rootScope, $location, $cordovaNetwork) {
    checkConnection($rootScope, $cordovaNetwork);
    //$scope.today = "2015-01-12"
    $scope.medition = {
        repeatSelect: null,
        availableOptions: [
          { id: 'Minutes', name: 'Minutes' },
          { id: 'Hours', name: 'Hours' }
        ],
    };

    $scope.reasonList = [
          { type: 'Car Trouble' },
          { type: 'Traffic' },
          { type: 'Weather' }
    ];

    $scope.data = {
        today: $filter('date')(new Date(), "yyyy-MM-dd"),
        date: new Date(),
        requestType: "",
        employeeID: $rootScope.profile.EmployeeID,
        reasonSelect: "",
        reason: "",
        repeatSelect: "15",
        meditionSelect: "Minutes",
        remarks: ""
    };

    $scope.data.reasonSelect = $scope.reasonList[0].type;

    $scope.range = {
        repeatSelect: null,
        availableOptions: [
          { id: '15', name: '15' },
          { id: '30', name: '30' },
          { id: '45', name: '45' }
        ],
    };

    $scope.data.repeatSelect = "15";

    $scope.updateDDL = function () {
        var scope = $scope.data;
        var options = []
        scope.meditionSelect;
        console.log(scope);
        if (scope.meditionSelect == "Minutes") {
            options = [
                { id: '15', name: '15' },
                { id: '30', name: '30' },
                { id: '45', name: '45' }
            ];
            $scope.data.repeatSelect = "15";
        }
        else if (scope.meditionSelect == "Hours") {
            options = [
                { id: '1', name: '1' },
                { id: '2', name: '2' },
                { id: '3', name: '3' },
                { id: '4', name: '4' },
                { id: '5', name: '5' },
                { id: '6', name: '6' },
                { id: '7', name: '7' },
                { id: '8', name: '8' }
            ];
            $scope.data.repeatSelect = "1";
        }
        else if (scope.meditionSelect == "Day Off") {
            options = [

            ]
        } else {
            options = [
                { id: '15', name: '15' },
                { id: '30', name: '30' },
                { id: '45', name: '45' }
            ];
            $scope.data.repeatSelect = "15";
        }

        $scope.range = {
            repeatSelect: null,
            availableOptions: options
        };
    }

    $scope.saveRequest = function (ldata, type) {
        var employeeEmail = window.localStorage.getItem("loginEmail");
        var companyName = window.localStorage.getItem("loginCompany");
        var locationName = window.localStorage.getItem("loginLocation");
        var employeeID = window.localStorage.getItem("loginID");

        if (employeeEmail == null ||
                companyName == null || locationName == null ||
                    employeeID == null || employeeID == "undefined" || employeeID == 0)
            $location.path("/tab/login");

        else {
            ldata.requestType = type;
            ldata.date = new Date();

            ldata.employeeID = employeeID;
            console.log(ldata);
            //console.log($rootScope.Settings);
            //}).error(function(response) {
            //    alert("Sending Request Failed");
            //});
            if (type == "Road")
                ldata.reason = ldata.reasonSelect;
            if (ldata.meditionSelect == "Day Off")
                ldata.repeatSelect = 0;

            checkConnection($rootScope, $cordovaNetwork);


            $.ajax({
                url: 'http://gcib.net/TimeOffRequestAPI/SendRequest.php?action=get_user',
                data: {
                    employeeID: ldata.employeeID,
                    date: ldata.date,
                    meditionSelect: ldata.meditionSelect,
                    reason: ldata.reason,
                    remarks: ldata.remarks,
                    repeatSelect: ldata.repeatSelect,
                    requestType: ldata.requestType,
                    today: ldata.today
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: 'jsonpCallback',
                success: function (data) {
                    if (ldata.meditionSelect == "Hours" && ldata.repeatSelect >= 2) {
                        alert("Please Contact Your Supervisor, Work, Email and Phone Back Up");
                    }

                    if (ldata.meditionSelect == "Day Off") {
                        alert("Please Contact Your Supervisor, Work, Email and Phone Back Up");
                    }

                    alert("Thank You , Your Request Has Been Sent Successfully");
                    $scope.data.remarks = "";
                    $scope.data.reasonSelect = $scope.reasonList[0].type;

                    $scope.data.meditionSelect = "Minutes";
                    $scope.updateDDL();

                    $scope.data.reason = "";

                    $scope.$apply();
                },
                error: function (data) {
                    alert("Error Sending The Request Please Contact IT");
                }
            })

            //$http({
            //    method: "post",
            //    url: 'http://gcib.net/TimeOffRequestAPI/SendRequest.php?action=get_user',
            //    data: $.param({
            //        employeeID: ldata.employeeID,
            //        date: ldata.date,
            //        meditionSelect: ldata.meditionSelect,
            //        reason: ldata.reason,
            //        remarks: ldata.remarks,
            //        repeatSelect: ldata.repeatSelect,
            //        requestType: ldata.requestType,
            //        today: ldata.today
            //    }),
            //    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            //})
            //    .success(function (data) {
            //    alert("Thank You , Your Request Has Been Sent Successfully");
            //    $scope.data.remarks = "";
            //    $scope.data.reasonSelect = $scope.reasonList[0].type;

            //    $scope.data.meditionSelect = "Minutes";
            //    $scope.updateDDL();

            //    $scope.data.reason = "";
            //});
        }
    }
})

.controller('HomeCtrl', function ($scope, $http, $filter, $rootScope, $location, $cordovaNetwork) {

    checkConnection($rootScope, $cordovaNetwork);
    //$scope.today = "2015-01-12"
    $scope.medition = {
        repeatSelect: null,
        availableOptions: [
          { id: 'Minutes', name: 'Minutes' },
          { id: 'Hours', name: 'Hours' },
          { id: 'Day Off', name: 'Day Off' }
        ],
    };

    $scope.reasonList = [
          { type: 'Car Trouble' },
          { type: 'Doctor\'s\ Appointment' },
          { type: 'Child Care' }
    ];

    $scope.data = {
        today: $filter('date')(new Date(), "yyyy-MM-dd"),
        date: new Date(),
        requestType: "",
        employeeID: $rootScope.profile.EmployeeID,
        reasonSelect: "",
        reason: "",
        repeatSelect: "15",
        meditionSelect: "Minutes",
        remarks: ""
    };

    // $scope.data.reasonSelect = $scope.reasonList[0].type;

    $scope.range = {
        repeatSelect: null,
        availableOptions: [
          { id: '15', name: '15' },
          { id: '30', name: '30' },
          { id: '45', name: '45' }
        ],
    };

    $scope.data.repeatSelect = "15";

    $scope.updateDDL = function () {
        var scope = $scope.data;
        var options = []
        scope.meditionSelect;
        console.log(scope);
        if (scope.meditionSelect == "Minutes") {
            options = [
                { id: '15', name: '15' },
                { id: '30', name: '30' },
                { id: '45', name: '45' }
            ];
            $scope.data.repeatSelect = "15";
            $("#lblTimeMedition").html("<b>I Will Be (Approx):</b>")
            $("#lblLate").html("<b>Late:</b>")
        }
        else if (scope.meditionSelect == "Hours") {
            options = [
                { id: '1', name: '1' },
                { id: '2', name: '2' },
                { id: '3', name: '3' },
                { id: '4', name: '4' },
                { id: '5', name: '5' },
                { id: '6', name: '6' },
                { id: '7', name: '7' },
                { id: '8', name: '8' },
                { id: '9', name: '9' },
                { id: '10', name: '10' }
            ];
            $scope.data.repeatSelect = "1";
            $("#lblTimeMedition").html("<b>I Will Be (Approx):</b>")
            $("#lblLate").html("<b>Late:</b>")
        }
        else if (scope.meditionSelect == "Day Off") {
            options = [
                { id: '1', name: '1' },
                { id: '2', name: '2' }
            ]
            $scope.data.repeatSelect = "1";
            $("#lblTimeMedition").html("<b>I Will Be Taking</b>")
            $("#lblLate").html("")

        } else {
            options = [
                { id: '15', name: '15' },
                { id: '30', name: '30' },
                { id: '45', name: '45' }
            ];
            $scope.data.repeatSelect = "15";
            $("#lblTimeMedition").html("<b>I Will Be (Approx):</b>")
        }

        $scope.range = {
            repeatSelect: null,
            availableOptions: options
        };
    }

    $scope.saveRequest = function (ldata, type) {
        var employeeEmail = window.localStorage.getItem("loginEmail");
        var companyName = window.localStorage.getItem("loginCompany");
        var locationName = window.localStorage.getItem("loginLocation");
        var employeeID = window.localStorage.getItem("loginID");

        if (employeeEmail == null ||
                companyName == null || locationName == null ||
                    employeeID == null || employeeID == "undefined" || employeeID == 0)
            $location.path("/tab/login");

        else {
            ldata.requestType = type;
            ldata.date = new Date();

            ldata.employeeID = employeeID;
            console.log(ldata);
            //console.log($rootScope.Settings);
            //}).error(function(response) {
            //    alert("Sending Request Failed");
            //});
            if (type == "Road")
                ldata.reason = ldata.reasonSelect;
            if (ldata.meditionSelect == "Day Off")
                ldata.repeatSelect = ldata.repeatSelect;

            checkConnection($rootScope, $cordovaNetwork);


            $.ajax({
                url: 'http://gcib.net/TimeOffRequestAPI/SendRequest.php?action=get_user',
                data: {
                    employeeID: ldata.employeeID,
                    date: ldata.date,
                    meditionSelect: ldata.meditionSelect,
                    reason: ldata.reason,
                    remarks: ldata.remarks,
                    repeatSelect: ldata.repeatSelect,
                    requestType: ldata.requestType,
                    today: ldata.today
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: 'jsonpCallback',
                success: function (data) {

                    if (ldata.meditionSelect == "Hours" && ldata.repeatSelect >= 2) {
                        alert("Please Contact Your Supervisor, Work, Email and Phone Back Up");
                    }

                    if (ldata.meditionSelect == "Day Off") {
                        alert("Please Contact Your Supervisor, Work, Email and Phone Back Up, So They Can Take Your Work");
                    }


                    alert("Thank You , Your Request Has Been Sent Successfully");
                    $scope.data.remarks = "";
                    $scope.data.reasonSelect = $scope.reasonList[0].type;

                    $scope.data.meditionSelect = "Minutes";
                    $scope.updateDDL();

                    $scope.data.reason = "";

                    $scope.$apply();
                },
                error: function (data) {
                    alert("Error Sending The Request Please Contact IT");
                }
            })
        }
    }
})

.controller('AccountCtrl', function ($scope, $http, $rootScope, $location, $cordovaNetwork) {

    checkConnection($rootScope, $cordovaNetwork);

    $scope.logOff = function (ldata) {
        $rootScope.Settings = [];
        $rootScope.profile = [];
        localStorage.clear();
        $location.path("/tab/login");
    }

    reloadMyInfo($scope, $http, $rootScope, $location);
})

.controller('LoginCtrl', function ($scope, $http, $rootScope, $location, $cordovaNetwork, $window) {

    checkConnection($rootScope, $cordovaNetwork)
    var flag = 0;
    $scope.items = [];
    $scope.companies = [];
    $scope.locations = [];

   
    //$scope.selected = $scope.items[0];

    $scope.data = {
        EmailSelect: ""
    };

    //$.ajax({
    //    type: "GET",
    //    dataType: "json",
    //    url: "http://192.168.30.34/HumanResourcesEP/api/Employees/12",
    //    success: function (data) {
    //        console.log(data)
    //    },
    //    error: function (data) {
    //        console.log(data);
    //        alert("Error");
    //    }
    //});



    $.ajax({
        url: 'http://gcib.net/TimeOffRequestAPI/GetEmployeeInfo.php?action=get_user_email',
        data: {},
        type: "GET",
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'GetEmailList',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $scope.items.push(data[i].Email);
            }
            //$scope.data.EmailSelect = $scope.items[0];
            $scope.$apply();
            //data.forEach(function (name) {

            //    $scope.items.push(name.Email);
            //    $scope.data.EmailSelect = $scope.items[0];
            //})
        },
        error: function(data) {
            alert("Check Internet Connection");
        }  
    })

    $scope.findID = function () {
        $scope.companies = [];
        $scope.locations = [];
        var emailType = $scope.data.EmailSelect;
        //alert(emailType);
        $.ajax({
            url: 'http://gcib.net/TimeOffRequestAPI/GetEmployeeInfo.php?action=get_companies',
            data: { email: emailType },
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'jsonpCallback',
            success: function (data) {
                $scope.companies = data;
                $scope.data.CompanySelect = $scope.companies[0].CompanyID
                $scope.$apply();
                $scope.findLocationID();
                flag = 1;
            }
        })

        //$("#mydiv").show();
        //Change if YOu Want To Select From List Email
        //if (emailType.indexOf("@") > -1) {
        //    $.ajax({
        //        url: 'http://gcib.net/TimeOffRequestAPI/GetEmployeeInfo.php?action=get_user_emailText',
        //        data: { email: emailType },
        //        dataType: 'jsonp',
        //        jsonp: 'callback',
        //        jsonpCallback: 'jsonpCallback',
        //        success: function (data) {
        //            if (data != "Email Doesn't Exist") {
        //                $.ajax({
        //                    url: 'http://gcib.net/TimeOffRequestAPI/GetEmployeeInfo.php?action=get_companies',
        //                    data: { email: emailType },
        //                    dataType: 'jsonp',
        //                    jsonp: 'callback',
        //                    jsonpCallback: 'jsonpCallback',
        //                    success: function (data) {
        //                        $scope.companies = data;
        //                        $scope.data.CompanySelect = $scope.companies[0].CompanyID
        //                        $scope.findLocationID();
        //                        flag = 1;
        //                    }
        //                })
        //            }
        //            else {
        //                flag = 0;
        //                //alert("Employee Not Found with That Email")
        //            }

        //            //$("#mydiv").hide();
        //        }
        //    });
        //}

    }

    $scope.findLocationID = function () {
        $scope.locations = [];
        var companyID = $scope.data.CompanySelect;

        $.ajax({
            url: 'http://gcib.net/TimeOffRequestAPI/GetEmployeeInfo.php?action=get_locations',
            data: { company: companyID },
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'jsonpCallback',
            success: function (data) {
                $scope.locations = data;
                $scope.data.LocationSelect = $scope.locations[0].LocationID;
                $scope.$apply();
            }
        });

    }

    $scope.login = function (ldata) {
        if (flag == 1) {
            window.localStorage.setItem("loginEmail", ldata.EmailSelect);
            window.localStorage.setItem("loginCompany", ldata.CompanySelect);
            window.localStorage.setItem("loginLocation", ldata.LocationSelect);

            alert("Settings Updated");
            reloadMyInfo($scope, $http, $rootScope, $location)
        } else {
            alert("Email Doesn't Exist");
        }

    }
});

//.controller('MyController', function($scope, $http) {
//    $scope.items = [1,2,3];
//    $scope.doRefresh = function() {
//        $.ajax({
//            url: 'http://gcib.net/TimeOffRequestAPI/GetEmployeeInfo.php?action=get_user_email',
//            data: {},
//            dataType: 'jsonp',
//            jsonp: 'callback',
//            jsonpCallback: 'jsonpCallback',
//            success: function (newItems) {
//                $scope.items = newItems;
//            },
//            finally: function () {
//                // Stop the ion-refresher from spinning
//                $scope.$broadcast('scroll.refreshComplete');
//            }
//        });
//    };
//});

function reloadMyInfo($scope, $http, $rootScope, $location) {

    var employeeEmail = window.localStorage.getItem("loginEmail");
    var companyName = window.localStorage.getItem("loginCompany");
    var locationName = window.localStorage.getItem("loginLocation");

    if (employeeEmail != null && companyName != null && locationName != null)
    {
        $.ajax({
            url: 'http://gcib.net/TimeOffRequestAPI/GetEmployeeInfo.php?action=get_user',
            data: { id:0, email: employeeEmail, com: companyName, loca: locationName },
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'jsonpCallback',
            success: function (data) {
                
                $rootScope.profile = {

                    EmployeeID: data[0].EmployeeID,
                    EmployeeName: data[0].EmployeeName,
                    EmailID: data[0].EmailID,
                    Email: data[0].Email,
                    CompanyID: data[0].CompanyID,
                    CompanyName: data[0].CompanyName,
                    LocationID: data[0].LocationID,
                    LocationName: data[0].LocationName,
                    Department: data[0].Department,
                    Position: data[0].Position,
                }
                window.localStorage.setItem("loginID", data[0].EmployeeID);
                //$("#mydiv").hide();
                $location.path("/tab/account");

                $scope.$apply();
            },
            error: function (data) {
                console.log(data);
                alert("Error Ocurred Please Contact IT")
                $location.path("/tab/login");
                //$("#mydiv").hide();
            }
        })

        
    }

    else {
        $location.path("/tab/login");
    }
}

function checkConnection($rootScope, $cordovaNetwork) {
    document.addEventListener("deviceready", function () {

        var type = $cordovaNetwork.getNetwork()
        var isOnline = $cordovaNetwork.isOnline()
        var isOffline = $cordovaNetwork.isOffline()

        console.log(type); console.log(isOnline); console.log(isOffline);
        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
            var onlineState = networkState;
            //alert(onlineState);
        })

        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
            var offlineState = networkState;
            alert("Please Check Your Internet Connection");
        })

    }, false);
}

function GetEmailList(data) {

}

function jsonpCallback(data) {
    //console.log(data);
}

//.controller('ChatsCtrl', function($scope, Chats) {
//  $scope.chats = Chats.all();
//  $scope.remove = function(chat) {
//    Chats.remove(chat);
//  }
//})
//.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//  $scope.chat = Chats.get($stateParams.chatId);
//})

function ajaxHelper(uri, method, data) {
    self.error(''); // Clear error message
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        //data: data ? JSON.stringify(data) : null
        data: data ? data : null
    }).fail(function (jqXHR, textStatus, errorThrown) {
        self.error(errorThrown);
    });
}
