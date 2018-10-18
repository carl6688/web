//var url = "http://172.21.101.101:365";
//var url = "http://122.53.101.101:5501";

var url = localStorage.getItem("url");

var InitLoginValidate = function () {
    $("#form-login").validate({
        highlight: function (element) {
            $(element).closest('div').removeClass('has-success').addClass('error');
        },
        success: function (element) {
            $(element).closest('div').removeClass('error');
            $(element).remove();
        },
        errorPlacement: function (error, element) {
            element.parent().append(error);
        },
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            }
        }
    });
};


var InitAgentInfo = function () {
    $("#form-personalinfo").validate({
        highlight: function (element) {
            $(element).closest('div').removeClass('has-success').addClass('error');
        },
        success: function (element) {
            $(element).closest('div').removeClass('error');
            $(element).remove();
        },
        errorPlacement: function (error, element) {
            element.parent().append(error);
        },
        rules: {
            companyname: {
                required: true,
                maxlength: 50,
                remote: {
                    url: url + "/api/CheckAgentExist",
                    type: "GET",
                    data: {
                        agentId: function () {
                            return $("#agentId").val();
                        }
                    }
                }
            },
            companyaddress: {
                required: true,
                maxlength: 50,
            },
            agentdomain: {
                required: true,
                maxlength: 50,
                url: true
            },
            agentmdomain: {
                required: true,
                maxlength: 50,
                url: true
            },
            myFile: {
                accept: "image/*"
            }
        }
    });

    $("#form-accountinfo").validate({
        highlight: function (element) {
            $(element).closest('div').removeClass('has-success').addClass('error');
        },
        success: function (element) {
            $(element).closest('div').removeClass('error');
            $(element).remove();
        },
        errorPlacement: function (error, element) {
            element.parent().append(error);
        },
        rules: {
            username: {
                required: true,
                maxlength: 50,
                remote: {
                    url: url + "/api/AgentAccountExist",
                    type: "GET",
                    data: {
                        accId: function () {
                            return $("#acctId").val();
                        }
                    }
                }
            },
            fullname: {
                required: true,
                maxlength: 50,
            },
            phone: {
                required: true,
                maxlength: 50,
                number: true
            },
            skype: {
                required: true,
                maxlength: 50,
            },
            email: {
                required: true,
                maxlength: 50,
                email: true
            }
        }
    });

    $("#form-passwordinfo").validate({
        highlight: function (element) {
            $(element).closest('div').removeClass('has-success').addClass('error');
        },
        success: function (element) {
            $(element).closest('div').removeClass('error');
            $(element).remove();
        },
        errorPlacement: function (error, element) {
            element.parent().append(error);
        },
        rules: {
            oldpassword: {
                required: true
            },
            newpassword: {
                required: true,
                maxlength: 50
            },
            confirmpassword: {
                required: true,
                maxlength: 50,
                equalTo: ".new-password"
            }
        },
        messages: {
            confirmpassword: {
                equalTo: "新密码和确认密码不匹配"
            }
        }
    });

    $("#form-contactinfo").validate({
        highlight: function (element) {
            $(element).closest('div').removeClass('has-success').addClass('error');
        },
        success: function (element) {
            $(element).closest('div').removeClass('error');
            $(element).remove();
        },
        errorPlacement: function (error, element) {
            element.parent().append(error);
        },
        rules: {
            cIntegratorName: {
                maxlength: 50,
                required: true
            },
            cIntergratorMsgApp: {
                maxlength: 50,
                required: true
            },
            cIntegratorEmail: {
                maxlength: 50,
                required: true,
                email: true
            },
            cAcctingName: {
                maxlength: 50,
                required: true
            },
            cAcctingMsgApp: {
                maxlength: 50,
                required: true
            },
            cAcctingEmail: {
                maxlength: 50,
                required: true,
                email: true
            },
            cAcctManagerName: {
                maxlength: 50,
                required: true
            },
            cAcctManagerMsgApp: {
                maxlength: 50,
                required: true
            },
            cAcctManagerEmail: {
                maxlength: 50,
                required: true,
                email: true
            },
            remarks: {
                maxlength: 200,
                required: true
            }
        }
    });
};


var InitMessageValidate = function () {
    $("#form-message").validate({
        highlight: function (element) {
            $(element).closest('div').removeClass('has-success').addClass('error');
        },
        success: function (element) {
            $(element).closest('div').removeClass('error');
            $(element).remove();
        },
        errorPlacement: function (error, element) {
            element.closest('div').append(error);
        },
        rules: {
            subject: {
                maxlength: 50,
                required: true
            },
            content: {
                maxlength: 200,
                required: true
            }
        }
    });
};


$.validator.addMethod('IPChecker', function (value) {
    var reg = new RegExp("^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$");
    var ipString = value.replace(" ", "").split(',');
    var ipLength = ipString.length;
    console.log(ipLength);
    var res = $.grep(ipString, function (e) {
        if (reg.test(e)) {
            return value;
        } else {
            return null;
        }
    });

    if (res.length === ipLength) {
        return value;
    } else {
        return null;
    }

}, '无效的IP地址');

$(".ipaddresses ").blur(function () {
    this.value = $.map(this.value.split(","), $.trim).join(", ");
});


var InitWhitelistValidate = function () {
    $("#form-whitelist").validate({
        highlight: function (element) {
            $(element).closest('div').removeClass('has-success').addClass('error');
        },
        success: function (element) {
            $(element).closest('div').removeClass('error');
            $(element).remove();
        },
        errorPlacement: function (error, element) {
            element.closest("div").append(error);
        },
        rules: {
            ip: {
                maxlength: 200,
                required: true,
                IPChecker: true,
                remote: {
                    url: url + "/api/checkIpExist",
                    type: "GET",
                    data: {
                        ipid: function () {
                            return $("#ipId").val();
                        }
                    }
                }
            },
            platforms: {
                required: true
            }
        },
        messages: {
            ip: {
                remote: "你的IP已经存在"
            }
        }
    });
};