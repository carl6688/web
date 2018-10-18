'use strict';
//var url = "http://172.21.101.101:365";
//var url = "http://localhost:9409/";

var url = "http://ig128.com:8080";
var autho = localStorage.getItem('token');

localStorage.setItem('url', url);

App.service('loginService', function ($http) {

    $http.defaults.headers.common['Content-Type'] = "application/json, text/json";
    $http.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";

    this.loginModel = function (data) {
        return $http({
            method: "POST",
            url: url + "/api/loginAccount",
            data: data
        });
    };

    this.SendInquery = function (data) {
        return $http({
            method: "POST",
            url: url + "/api/SendInquery",
            data: data
        });
    };


});

App.service('logoutService', function ($http) {

    $http.defaults.headers.common['Content-Type'] = "application/json, text/json";
    $http.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
    $http.defaults.headers.common['Authorization'] = autho;

    this.logoutModel = function (id) {
        return $http({
            method: "POST",
            url: url + "/api/logout?id=" + id
        });
    };
});


App.service('AgentService', function ($http) {

    $http.defaults.headers.common['Content-Type'] = "application/json, text/json";
    $http.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
    $http.defaults.headers.common['Authorization'] = autho;

    this.AccountDataModel = function (id) {
        return $http({
            method: "GET",
            url: url + "/api/getAccountData?id=" + id
        });
    };

    this.AgentDataModel = function (id) {
        return $http({
            method: "GET",
            url: url + "/api/getAgentData?id=" + id
        });
    };

    this.UpdateContantInfoModel = function (data) {
        return $http({
            method: "POST",
            url: url + "/api/updateAgentContactInfo",
            data: data
        });
    };

    this.UpdateAgentInfoModel = function (data) {
        return $http({
            method: "POST",
            url: url + "/api/updateAgentInfo",
            data: data
        });
    };

    this.UpdateAccountInfoModel = function (data) {
        return $http({
            method: "POST",
            url: url + "/api/updateAccountData",
            data: data
        });
    };

    this.UpdatePasswordModel = function (data) {
        return $http({
            method: "POST",
            url: url + "/api/changePassword",
            data: data
        });
    };
});

App.service('PlatformService', function ($http) {

    $http.defaults.headers.common['Content-Type'] = "application/json, text/json";
    $http.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
    $http.defaults.headers.common['Authorization'] = autho;

    this.getAllPlatform = function (id) {
        return $http({
            method: "GET",
            url: url + "/api/getAllPlatform?id=" + id
        });
    };

    this.UpdatePlatformModel = function (data) {
        return $http({
            method: "POST",
            url: url + "/api/savePlatformAttr",
            data: data
        });
    };
});

App.service('APIDocumentService', function ($http) {

    $http.defaults.headers.common['Content-Type'] = "application/json, text/json";
    $http.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
    $http.defaults.headers.common['Authorization'] = autho;

    this.getAPIDocumentModel = function (id) {
        return $http({
            method: "GET",
            url: url + "/api/getAllPlatformFile?id=" + id
        });
    };
});

App.service('MessageService', function ($http) {

    $http.defaults.headers.common['Content-Type'] = "application/json, text/json";
    $http.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
    $http.defaults.headers.common['Authorization'] = autho;

    this.getMessageModel = function (id, size, number, subject) {
        return $http({
            method: "GET",
            url: url + "/api/getMessage?id=" + id + "&PageSize=" + size + "&PageNumber=" + number + "&subject=" + subject
        });
    };

    this.deleteMessageModel = function (id) {
        return $http({
            method: "POST",
            url: url + "/api/DeleteMessage?id=" + id
        });
    };

    this.readMessageModel = function (id) {
        return $http({
            method: "POST",
            url: url + "/api/readMessage?id=" + id
        });
    };

    this.UnreadMessagesModel = function (id) {
        return $http({
            method: "GET",
            url: url + "/api/countUnreadMessages?agentId=" + id
        });
    };

    this.sendMessageModel = function (data) {
        return $http({
            method: "POST",
            url: url + "/api/SendOrReplyMessage",
            data: data
        });
    };
});

App.service('WhitelistService', function ($http) {

    $http.defaults.headers.common['Content-Type'] = "application/json, text/json";
    $http.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
    $http.defaults.headers.common['Authorization'] = autho;

    this.getWhitelistModel = function (id, size, number, ip, platform) {
        return $http({
            method: "GET",
            url: url + "/api/getWhiteList?Agentid=" + id + "&PageSize=" + size + "&PageNumber=" + number + "&ipsearch=" + ip + "&platform=" + platform
        });
    };

    this.addAgentIPModel = function (data) {
        return $http({
            method: "POST",
            url: url + "/api/addAgentIP",
            data: data
        });
    };

    this.updateAgentIPModel = function (data) {
        return $http({
            method: "POST",
            url: url + "/api/updateAgentIP",
            data: data
        });
    };

    this.deleteAgentIPModel = function (id) {
        return $http({
            method: "POST",
            url: url + "/api/DeleteAgentIp?AgentIpID=" + id
        });
    };
});
