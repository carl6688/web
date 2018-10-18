var App = angular.module("SystemApp", ["checklist-model", "lr.upload"]);


App.directive('uploadFile', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var file_uploaded = $parse(attrs.uploadFile);

            element.bind('change', function () {
                scope.$apply(function () {
                    file_uploaded.assign(scope, element[0].files[0]);
                });
            });
        }
    };
}]);


App.controller("loginCtrl", function ($scope, $compile, loginService, $window, $filter, $location) {

    var m = $scope.login = [];

    $scope.buttonDisabled = false;
    $scope.IsRequesting = false;

    function resetLogin() {
        m.userData = {
            "username": "",
            "password": ""
        }
    }

    m.doLogin = function () {
        InitLoginValidate();

        var loginValidate = $("#form-login").valid();

        if (loginValidate) {
            $scope.buttonDisabled = true;
            $scope.IsRequesting = true;

            loginService.loginModel(m.userData).then(function (e) {

                $scope.buttonDisabled = false;
                var response = e.data;

                if ((response.banner_path === null) || (response.banner_path === "")) {
                    response.banner_path = "default-banner.jpg";
                }

                if ((e.status === 200) && (e.data.token !== null) && (typeof e.data.token !== "undefined")) {

                    $.ajax({
                        type: "POST",
                        url: "/socket/socket.aspx?action=setsession",
                        data: {
                            user_name: response.username,
                            token: response.token,
                            name: response.name,
                            account_id: response.account_id,
                            bannerUrl: response.banner_path
                        },
                        success: function (result) {
                            if (result === "success") {
                                localStorage.setItem('token', (response.token));
                                localStorage.setItem("accountId", response.account_id);
                                localStorage.setItem("name", response.name);
                                localStorage.setItem("initials", response.initials);
                                localStorage.setItem("company_name", response.company_name);

                                $window.location.href = "member/index.aspx";

                            } else {
                                $(".error-message").text("请再试一次");//Please Try Again
                                $scope.IsRequesting = false;
                            }
                        }
                    }).fail(function () {
                        $(".error-message").text("请再试一次");//Please Try Again
                        $scope.IsRequesting = false;
                    });
                    resetLogin();

                } else {
                    $(".error-message").text("用户名或密码无效");
                    $scope.IsRequesting = false;
                }

            }, function (x) {
                $scope.buttonDisabled = false;
                $scope.IsRequesting = false;
                if (x.status === 400) {
                    $(".error-message").text("用户名或密码无效");//Username or Password is Invalid
                } else {
                    $(".error-message").text("错误：请联系您的客户服务！");//Contact Customer Service
                }
            });

        }
    };

    function resetInq() {
        m.InqueryData = {
            "fullname": "",
            "phone": "",
            "email": "",
            "msqInquiry": "",
            "isDeleted": false,
            "isRead": false
        }
    }

    m.DoSendInquery = function ($event) {
        $event.preventDefault();
        var validateform = $("#contactForm").valid();

        if (validateform) {
            loginService.SendInquery(m.InqueryData).then(function (e) {
                console.log(e);
                if (e.data.ErrorCode === 0 && e.status === 200) {
                    $window.location.href = "/index.aspx?action=success";
                    resetInq()
                }
            })
        }
    }

});

App.controller("logoutCtrl", function ($scope, $compile, logoutService, $window, $filter, $location) {

    var m = $scope.logout = [];

    m.doLogout = function () {

        logoutService.logoutModel(localStorage.getItem("accountId")).then(function (e) {
            var response = e.data;
            if (response.ErrorCode === 0) {
                localStorage.clear();
                localStorage.clear();

                $.ajax({
                    url: "/socket/socket.aspx?action=logout",
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                    }
                });
                window.location.href = "/";
            }
        }, function (x) {
            if (x.data.ErrorCode == -1) {
                alert(x.data.ErrorDescription);
                clearAll();
                return;
            }
        });
    };
});


App.controller("sessionCtrl", function ($scope, $compile, logoutService, $window, $filter, $location) {

    var m = $scope.Users = [];

    m.memberSession = function () {
        m.name = localStorage.getItem("name");
        m.initials = localStorage.getItem("initials");
        m.company_name = localStorage.getItem("company_name");
    };

    m.publicSession = function () {
        m.memberSession();

        if ((m.initials != "") && (m.initials != null)) {
            $(".login").hide();
            $(".after-login, .public-logout").show();

        } else {
            $(".login").show();
            $(".after-login, .public-logout").hide();
            m.initials = "";
        }
    };

});


App.controller("AgentCtrl", function ($scope, $compile, AgentService, $window, $filter, $location, upload) {

    var m = $scope.Agent = [];

    $scope.IsRequesting = false;
    $scope.buttonDisabled = false;

    function resetPassword() {
        m.password = {
            "agentAcctId": 0,
            "oldpassword": "",
            "newpassword": "",
            "cfmpassword": ""
        };
    }

    $scope.doEdit = function ($event, x) {
        $("." + x).attr("disabled", false);
        $("." + x).removeClass("field-disabled");
        $($event.target).hide();
        $($event.target).siblings(".agent-cancel,.agent-save").show();
    }

    $scope.cancelEdit = function ($event, x) {
        $("." + x).attr("disabled", true);
        $("." + x).addClass("field-disabled");
        $($event.target).hide();
        $($event.target).siblings(".agent-save").hide();
        $($event.target).siblings(".agent-edit").show();
        m.accountData();

        $(".error").removeClass("error");
        $(".errorMsg").remove();
        $("#form-passwordinfo input").val("");
    }


    m.accountData = function () {
        InitAgentInfo();

        $scope.IsRequesting = true;
        AgentService.AccountDataModel(localStorage.getItem("accountId")).then(function (e) {
            $scope.IsRequesting = false;
            var response = e.data;
            if (e.status === 200) {
                m.accountResult = response.Data;
                localStorage.setItem("agentId", m.accountResult.agentId);
                AgentService.AgentDataModel(localStorage.getItem("agentId")).then(function (e) {
                    var response = e.data;
                    if (e.status === 200) {
                        m.agentResult = response.Data;
                        $("#agentId").val(localStorage.getItem("agentId"));
                        $("#acctId").val(localStorage.getItem("accountId"));
                    }
                });
            }
        }, function (x) {
            if (x.data.ErrorCode == -1) {
                alert(x.data.ErrorDescription);
                clearAll();
                return;
            }
            errorMessage(x.data.ErrorDescription);
        });
    };

    m.agentUpdate = function () {

        var personalValidate = $("#form-personalinfo").valid();

        if (personalValidate) {
            $scope.IsRequesting = true;
            $scope.buttonDisabled = true;
            upload({
                url: '/socket/socket.aspx?action=uploadBanner',
                method: 'POST',
                data: {
                    aFile: $scope.myFile
                },
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(function (response) {

                if (response.data !== "") {
                    m.agentResult.bannerUrl = response.data;
                }

                AgentService.UpdateAgentInfoModel(m.agentResult).then(function (e) {
                    $scope.IsRequesting = false;
                    $scope.buttonDisabled = false;

                    var response = e.data;
                    if (e.status === 200) {
                        successMessage("代理已成功更新");//Agent Successfully Updateds
                        setTimeout(function () {
                            localStorage.removeItem("company_name");
                            localStorage.setItem("company_name", m.agentResult.companyName);
                            location.reload();
                        }, 2000);
                    }
                }, function (x) {
                    $scope.IsRequesting = false;
                    $scope.buttonDisabled = false;

                    if (x.data.ErrorCode == -1) {
                        alert(x.data.ErrorDescription);
                        clearAll();
                        return;
                    }
                    errorMessage(x.data.ErrorDescription);
                });
            }, function (response) {
                console.log(response);
            });
        }
    };

    m.accountUpdate = function () {

        var accountValidate = $("#form-accountinfo").valid();

        if (accountValidate) {
            $scope.IsRequesting = true;
            $scope.buttonDisabled = true;

            AgentService.UpdateAccountInfoModel(m.accountResult).then(function (e) {
                $scope.IsRequesting = false;
                $scope.buttonDisabled = false;

                var response = e.data;
                if (e.status === 200) {
                    successMessage("帐户已成功更新");//Account Successfully Updated
                }
            }, function (x) {
                $scope.IsRequesting = false;
                $scope.buttonDisabled = false;

                if (x.data.ErrorCode == -1) {
                    alert(x.data.ErrorDescription);
                    clearAll();
                    return;
                }
                errorMessage(x.data.ErrorDescription);
            });
        }
    };

    m.contactUpdate = function () {

        var contactValidate = $("#form-contactinfo").valid();

        if (contactValidate) {
            $scope.IsRequesting = true;
            $scope.buttonDisabled = true;

            AgentService.UpdateContantInfoModel(m.agentResult).then(function (e) {
                $scope.IsRequesting = false;
                $scope.buttonDisabled = false;

                var response = e.data;
                if (e.status === 200) {
                    successMessage("联系人已成功更新");//Contact Successfully Updated
                }
            }, function (x) {
                $scope.IsRequesting = false;
                $scope.buttonDisabled = false;

                if (x.data.ErrorCode == -1) {
                    alert(x.data.ErrorDescription);
                    clearAll();
                    return;
                }
                errorMessage(x.data.ErrorDescription);
            });
        }
    };

    m.passwordUpdate = function () {
        resetPassword();

        var passwordValidate = $("#form-passwordinfo").valid();

        if (passwordValidate) {
            m.password.agentAcctId = parseInt(localStorage.getItem("accountId"));
            m.password.oldpassword = $(".old-password").val();
            m.password.newpassword = $(".new-password").val();
            m.password.cfmpassword = $(".confirm-password").val();

            $scope.IsRequesting = true;
            $scope.buttonDisabled = true;

            AgentService.UpdatePasswordModel(m.password).then(function (e) {
                $scope.IsRequesting = false;
                $scope.buttonDisabled = false;
                var response = e.data;

                if ((e.status === 200) && (response.ErrorCode === 0)) {
                    successMessage("密码成功更新");//Password Successfully Updated
                } else {
                    errorMessage("旧密码不匹配");//Old password does not match
                }
            }, function (x) {
                $scope.IsRequesting = false;
                $scope.buttonDisabled = false;

                if (x.data.ErrorCode == -1) {
                    alert(x.data.ErrorDescription);
                    clearAll();
                    return;
                }
                errorMessage(x.data.ErrorDescription);
            });
        }
    };
});


App.controller("PlatformCtrl", function ($scope, $compile, PlatformService, AgentService, $window, $filter, $location) {

    var m = $scope.Platform = [];
    $scope.buttonDisabled = false;
    $scope.IsRequesting = false;
    m.count = 0;

    m.perPlatform = [];

    m.platformData = function () {
        AgentService.AccountDataModel(localStorage.getItem("accountId")).then(function (e) {
            var response = e.data;
            if (e.status === 200) {
                m.accountResult = response.Data;
                localStorage.setItem("agentId", m.accountResult.agentId);
                PlatformService.getAllPlatform(localStorage.getItem("agentId")).then(function (e) {
                    var response = e.data;
                    if (e.status === 200) {
                        m.platformResult = response.Data;
                    }
                });
            }
        }, function (x) {
            if (x.data.ErrorCode == -1) {
                alert(x.data.ErrorDescription);
                clearAll();
                return;
            }
            errorMessage(x.data.ErrorDescription);
        });
    };

    m.UpdatePlatformData = function (attribs, event) {
        $(".errorMsg").remove();
        var x = $(event.target).closest("li").find("input").filter(function () {
            if (this.value === "") {
                $(this).parent().append("<span class='errorMsg'>这是必填栏.</span>");
            }
            return this.value === "";
        });

        var y = $(event.target).closest("li").find("input").filter(function () {
            if (this.value.length >= 50) {
                $(this).parent().append("<span class='errorMsg'>请输入不超过50个字符.</span>");
            }
            return this.value.length >= 50;
        });

        if ((x.length === 0) && (y.length === 0)) {
            $scope.IsRequesting = true;
            $scope.buttonDisabled = true;
            PlatformService.UpdatePlatformModel(attribs).then(function (e) {
                $scope.IsRequesting = false;
                $scope.buttonDisabled = false;
                var response = e.data;
                if (e.status === 200) {
                    successMessage("平台已成功更新");
                }
            }, function (x) {
                $scope.buttonDisabled = false;
                $scope.IsRequesting = false;
                if (x.data.ErrorCode == -1) {
                    alert(x.data.ErrorDescription);
                    clearAll();
                    return;
                }
                errorMessage(x.data.ErrorDescription);
            });
        }
    };
});


App.controller("APIDocumentCtrl", function ($scope, $compile, APIDocumentService, AgentService, $window, $filter, $location) {

    var m = $scope.Docs = [];

    m.usId = "";
    m.agId = "";
    m.token = "";
    m.url = "";

    m.APIDocument = function () {
        AgentService.AccountDataModel(localStorage.getItem("accountId")).then(function (e) {
            var response = e.data;
            if (e.status === 200) {
                m.accountResult = response.Data;
                localStorage.setItem("agentId", m.accountResult.agentId);
                APIDocumentService.getAPIDocumentModel(localStorage.getItem("agentId")).then(function (e) {
                    var response = e.data;
                    if (e.status === 200) {
                        m.documents = response.Data;
                        m.usId = localStorage.getItem("accountId");
                        m.agId = localStorage.getItem("agentId");
                        m.token = localStorage.getItem("token");
                        m.url = localStorage.getItem("url");
                    }
                });
            }
        }, function (x) {
            if (x.data.ErrorCode == -1) {
                alert(x.data.ErrorDescription);
                clearAll();
                return;
            }
            errorMessage(x.data.ErrorDescription);
        });
    };
});

App.controller("MessageCtrl", function ($scope, $compile, MessageService, AgentService, $window, $filter, $location, $interval) {
    var size = 3;
    var number = 1;
    var subject = "";

    var m = $scope.Message = [];

    $scope.buttonDisabled = false;
    $scope.IsRequesting = false;

    function resetSend() {
        m.sendMessage = {
            "msgId": "",
            "msgSubject": "",
            "msgContent": "",
            "msgDate": "",
            "agentId": "",
            "userId": "",
            "isDeleted": false,
            "isAll": false
        };
    }

    m.Messages = function () {
        InitMessageValidate();

        $scope.IsRequesting = true;

        MessageService.getMessageModel(localStorage.getItem("agentId"), size, number, subject).then(function (e) {
            $scope.IsRequesting = false;
            var response = e.data;
            if (e.status === 200) {
                m.messageResult = response.Data.List;

                $("#paging-container").pagination({
                    items: response.Data.Paging.TotalRecordCount,
                    itemsOnPage: size,
                    cssStyle: 'compact-theme',
                    onPageClick: function (number) {
                        MessageService.getMessageModel(localStorage.getItem("agentId"), size, number, subject).then(function (e) {
                            var response = e.data;
                            m.messageResult = response.Data.List;
                        });
                    },
                    nextText: '下一页',
                    prevText: '上一页'
                });
            }
        }, function (x) {
            if (x.data.ErrorCode == -1) {
                alert(x.data.ErrorDescription);
                clearAll();
                return;
            }
            errorMessage(x.data.ErrorDescription);
        });
    };

    m.ViewMessage = function ($event, msgId) {
        $(".view-msg").show();
        $(".create-msg").hide();

        MessageService.readMessageModel(msgId).then(function (e) {
            var response = e.data;
            if (response.ErrorCode === 0) {
                m.UnreadMessages();
                $($event.currentTarget).parent().removeClass("notread");
            }
        }, function (x) {
            errorMessage(x.data.ErrorDescription);
        });

        $(".display-email").text($($event.currentTarget).find(".sender").text());
        $(".display-name").text($($event.currentTarget).find(".subject").text());
        $(".display-date").text($($event.currentTarget).find(".date").text());
        $(".display-content").text($($event.currentTarget).find(".text-message").text());
        $(".view-profile-logo").text($($event.currentTarget).find(".sender").text().slice(0, 2));
    };

    m.ReplyMessage = function ($event) {
        $(".view-msg").hide();
        $(".create-msg").show();

        $(".subject-box").val("RE:" + $($event.currentTarget).parent().siblings().find(".subject").text());
    };

    m.DeleteMessage = function (msgId) {
        if (confirm("你确定要删除这条消息吗？") == true) {
            MessageService.deleteMessageModel(msgId).then(function (e) {
                var response = e.data;
                if (response.ErrorCode === 0) {
                    successMessage("消息成功删除");
                }
            }, function (x) {
                if (x.data.ErrorCode == -1) {
                    alert(x.data.ErrorDescription);
                    clearAll();
                    return;
                }
                errorMessage(x.data.ErrorDescription);
            });
            m.Messages();
        }
    };

    m.SendMessage = function ($event) {
        resetSend();

        m.sendMessage.msgSubject = $(".subject-box").val();
        m.sendMessage.msgContent = $(".text-area").val();
        m.sendMessage.agentId = localStorage.getItem("agentId");

        var messageValidate = $("#form-message").valid();

        if (messageValidate) {
            $scope.buttonDisabled = true;

            MessageService.sendMessageModel(m.sendMessage).then(function (e) {
                $scope.buttonDisabled = false;

                var response = e.data;
                if (response.ErrorCode === 0) {
                    successMessage("消息已发送");
                    $(".subject-box").val("");
                    $(".text-area").val("");
                } else {
                    errorMessage("消息未发送");
                }

            }, function (x) {
                $scope.buttonDisabled = false;

                if (x.data.ErrorCode == -1) {
                    alert(x.data.ErrorDescription);
                    clearAll();
                    return;
                }
                errorMessage(x.data.ErrorDescription);
            });
        }
    };

    m.UnreadMessages = function () {

        AgentService.AccountDataModel(localStorage.getItem("accountId")).then(function (e) {
            $scope.IsRequesting = false;
            var response = e.data;
            if (e.status === 200) {
                m.accountResult = response.Data;
                localStorage.setItem("agentId", m.accountResult.agentId);

                MessageService.UnreadMessagesModel(localStorage.getItem("agentId")).then(function (b) {
                    m.MessageCount = b.data.count;
                });
            }
        }, function (x) {
            if (x.data.ErrorCode == -1) {
                alert(x.data.ErrorDescription);
                clearAll();
                return;
            }
            errorMessage(x.data.ErrorDescription);
        });


    };
});

App.controller("WhitelistCtrl", function ($scope, $compile, WhitelistService, PlatformService, $window, $filter, $location) {
    var size = 10;
    var number = 1;

    var m = $scope.Whitelist = [];
    m.getPlatformSelected = [];

    $scope.IsRequesting = false;
    $scope.SubmitLabel = "Save";

    m.ip = "";
    m.platform = "";

    function resetAgentIP() {
        m.agentIP = {
            "ipwhitelisted": "",
            "agentId": "",
            "agentAccId": "",
            "isActive": false,
            "platformCollect": ""
        };
    }

    m.platformList = [];

    m.InitWhitelist = function () {
        InitWhitelistValidate();
        PlatformService.getAllPlatform(localStorage.getItem("agentId")).then(function (e) {
            var response = e.data;
            if (e.status === 200) {
                m.getPlatform = response.Data;
            }
        }, function (x) {
            if (x.data.ErrorCode == -1) {
                alert(x.data.ErrorDescription);
                clearAll();
                return;
            }
            errorMessage(x.data.ErrorDescription);
        });

        $scope.IsRequesting = true;
        WhitelistService.getWhitelistModel(localStorage.getItem("agentId"), size, number, m.ip, m.platform).then(function (e) {
            $scope.IsRequesting = false;
            var response = e.data;
            if (e.status === 200) {
                m.whitelistResult = response.Data.List;
                $("#paging-container").pagination({
                    items: response.Data.Paging.TotalRecordCount,
                    itemsOnPage: size,
                    cssStyle: 'compact-theme',
                    onPageClick: function (number) {
                        $scope.IsRequesting = true;
                        WhitelistService.getWhitelistModel(localStorage.getItem("agentId"), size, number, m.ip, m.platform).then(function (e) {
                            $scope.IsRequesting = false;
                            var response = e.data;
                            m.whitelistResult = response.Data.List;
                        });
                    }
                });
            }
        }, function (x) {
            if (x.data.ErrorCode == -1) {
                alert(x.data.ErrorDescription);
                clearAll();
                return;
            }
            errorMessage(x.data.ErrorDescription);
        });
    };

    m.ToDoIP = function (labelName, data) {

        m.getPlatformSelected = [];
        $scope.SubmitLabel = labelName;
        $(".wl-pop-up").show();

        if (labelName == "Save") {
            $("#ipId").val("");
            m.inputIP = "";
        }

        if (labelName == "Update") {
            $("#ipId").val(data.agentIPId);
            m.inputIP = data.ipwhitelisted;
            m.agentIPId = data.agentIPId;

            for (var x = 0; x < data.platformList.length; x++) {
                m.getPlatformSelected.push({platformId: data.platformList[x].platformId});
            }
        }
    };

    m.AddUpdateIP = function () {
        resetAgentIP();

        m.agentIP.ipwhitelisted = m.inputIP;
        m.agentIP.agentId = localStorage.getItem("agentId");
        m.agentIP.agentAcctId = localStorage.getItem("accountId");
        m.agentIP.platformCollect = m.getPlatformSelected;

        var whitelistValidate = $("#form-whitelist").valid();

        if (whitelistValidate) {
            $scope.buttonDisabled = true;
            if ($scope.SubmitLabel === "Save") {
                WhitelistService.addAgentIPModel(m.agentIP).then(function (e) {
                    $scope.IsRequesting == true;

                    var response = e.data;
                    if (e.status === 200) {
                        $(".wl-pop-up").hide();
                        $scope.IsRequesting = false
                        $scope.buttonDisabled = false;
                        successMessage("新增成功");
                        m.InitWhitelist();
                    }
                }, function (x) {
                    if (x.data.ErrorCode == -1) {
                        alert(x.data.ErrorDescription);
                        clearAll();
                        return;
                    }
                    errorMessage(x.data.ErrorDescription);
                });
                return;
            }

            if ($scope.SubmitLabel === "Update") {
                m.agentIP.agentIPId = m.agentIPId;
                WhitelistService.updateAgentIPModel(m.agentIP).then(function (e) {
                    $scope.IsRequesting == true;
                    $scope.buttonDisabled = true;
                    var response = e.data;
                    if (e.status === 200) {
                        $scope.IsRequesting = false
                        $scope.buttonDisabled = false;
                        $(".wl-pop-up").hide();
                        successMessage("更新成功");
                        m.InitWhitelist();
                    }
                }, function (x) {
                    if (x.data.ErrorCode == -1) {
                        alert(x.data.ErrorDescription);
                        clearAll();
                        return;
                    }
                    errorMessage(x.data.ErrorDescription);
                });
                return;
            }
        }


    };

    m.DeleteIP = function (id) {
        if (confirm("您确定要删除此IP地址吗？") == true) {
            $scope.buttonDisabled = true;
            WhitelistService.deleteAgentIPModel(id).then(function (e) {
                $scope.buttonDisabled = false;
                var response = e.data;
                if (response.ErrorCode === 0) {
                    successMessage("删除成功");
                    m.InitWhitelist();
                }
            }, function (x) {
                if (x.data.ErrorCode == -1) {
                    alert(x.data.ErrorDescription);
                    clearAll();
                    return;
                }
                errorMessage(x.data.ErrorDescription);
            });
        }
    };
});

function errorMessage(errorText) {
    new PNotify({
        title: 'Error',
        text: errorText,
        type: 'custom',
        addclass: 'notification-error'
    });
}

function successMessage(successText) {
    new PNotify({
        title: 'Success',
        text: successText,
        type: 'custom',
        addclass: 'notification-success'
    });
}

function clearAll() {
    window.location.href = "/";
    localStorage.clear();
    localStorage.clear();
}
