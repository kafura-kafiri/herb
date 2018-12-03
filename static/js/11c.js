! function e(t, i, n) {
    function a(o, r) {
        if (!i[o]) {
            if (!t[o]) {
                var l = "function" == typeof require && require;
                if (!r && l) return l(o, !0);
                if (s) return s(o, !0);
                var u = new Error("Cannot find module '" + o + "'");
                throw u.code = "MODULE_NOT_FOUND", u
            }
            var c = i[o] = {
                exports: {}
            };
            t[o][0].call(c.exports, function(e) {
                var i = t[o][1][e];
                return a(i ? i : e)
            }, c, c.exports, e, t, i, n)
        }
        return i[o].exports
    }
    for (var s = "function" == typeof require && require, o = 0; o < n.length; o++) a(n[o]);
    return a
}({
    1: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var a = e("./modules/date-clock"),
            s = n(a);
        $(window).on("load", function() {
            var e = $(".model-properties-clock-footer");
            e.length && new s["default"](e)
        })
    }, {
        "./modules/date-clock": 6
    }],
    2: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var a = e("./modules/utilities"),
            s = n(a),
            o = e("./modules/polyfills"),
            r = n(o),
            l = e("./modules/site-search.js"),
            u = n(l),
            c = e("./modules/share-page-catalog"),
            d = n(c),
            h = e("./modules/my-account-dropdown"),
            p = n(h),
            f = e("./modules/sticky-header-navigation"),
            g = n(f),
            v = e("./modules/free-shipping-message"),
            m = n(v),
            w = e("./modules/tablet-helpers"),
            y = n(w),
            _ = e("./modules/fill-compact-cart");
        n(_);
        r["default"].includesPolyfill();
        var b = void 0;
        $(function() {
            var e = $("#nav-language-code").val(),
                t = e + "-dropdown",
                i = window.sessionStorage;
            new u["default"];
            if (b = new p["default"], s["default"].isPageAny("home Catalog CustomBlog info contact me topsellers brandsaz")) {
                new d["default"]
            }
            if (null === i.getItem(t)) $.ajax({
                datatype: "html",
                url: "/pro/dropdown",
                type: "POST",
                success: function(e) {
                    i.setItem(t, e), $("#catA-Z").after(e), P()
                }
            });
            else {
                var n = i.getItem(t);
                $("#catA-Z").after(n), P()
            }
            new m["default"], new g["default"]
        });
        var k, C, x = function(e) {
            this.settings.isMobile = 0 != $("html.android").length || 0 != $("html.ios").length || 0 != $("html#android").length || 0 != $("html#ios").length, this.actionhost = e, this.init()
        };
        x.prototype = {
            settings: {
                form: "#reset-password",
                camForm: "#CamResetTempCode",
                submit_form: "#submit-reset-pw",
                code: ".forgot-pw-six",
                customer: "#curr-customer",
                device: "#curr-device",
                token: "#curr-token",
                username: "#ResetUserName",
                try_again: "#send-email-popup .btn-link",
                url: "/pro/validatepwtoken",
                error_class: "danger",
                hide: "hide",
                m_form_hint: ".form-hint",
                m_form_error: ".form-error"
            },
            init: function() {
                C = this, k = this.settings, k.url = this.actionhost + k.url, $(k.submit_form).on("click", C.validate_form), $(k.try_again).attr("href", $(k.try_again).siblings("a").attr("href"))
            },
            validate_form: function(e) {
                e.preventDefault();
                var t = {
                        token: $(k.code).val(),
                        deviceid: $(k.device).val()
                    },
                    i = ($("#domainHelper").val(), window.location.host.split(".")),
                    n = "https://secure." + i[1] + "." + i[2] + "/pro/validatepwtoken";
                $.ajax({
                    type: "POST",
                    xhrFields: {
                        withCredentials: !0
                    },
                    url: n,
                    data: t,
                    cache: !1,
                    success: function(e) {
                        e.ValidToken ? ($(k.customer).val(e.CustomerID), $(k.token).val(e.customerToken), C.code_success()) : C.code_error()
                    }
                })
            },
            code_success: function(e) {
                k.isMobile ? ($(k.form + " " + k.m_form_hint).removeClass(k.hide), $(k.form + " " + k.m_form_error).addClass(k.hide), $(k.camForm + " " + k.m_form_hint).removeClass(k.hide), $(k.camForm + " " + k.m_form_error).addClass(k.hide)) : $(k.code).removeClass(k.error_class);
                var t = "/tr/resetpassword?token=" + $(k.token).val();
                window.location = t
            },
            code_error: function() {
                k.isMobile ? ($(k.camForm + " " + k.m_form_error).removeClass(k.hide), $(k.camForm + " " + k.m_form_hint).addClass(k.hide)) : ($(k.code).val(""), $(k.code).addClass(k.error_class), $("#sixDigitCode-pw").siblings("label").removeClass("hide"))
            }
        };
        var D = function() {
            new x(Window.iHerb_ActionHost)
        };
        window.loginPopupLoaded = !1, window.loginHeaderCalled = !1, window._captchaVerified = function() {
            $("#header-reset-pw-button").prop("disabled", !1)
        };
        var P = function T() {
            function e(e) {
                var i = $(".my-account-menu");
                try {
                    m = !0, clearTimeout(u), c != e && ($("#li_" + c).removeClass("section-hover"), h.hide()), c = e, l = setTimeout(t.bind(null, e), 200), i.hide()
                } catch (n) {}
            }

            function t(e) {
                try {
                    h.hide(), $("#li_" + e).removeClass("section-hover"), m ? ($("#dd_" + e).show(), $("#dd_" + e).not(".first-tab").find(".tablet-actions").after(d), d.show(), $("#li_" + e).addClass("section-hover")) : $("#iherb-products-menu").removeClass("on")
                } catch (t) {}
            }

            function i(e) {
                m = !1, clearTimeout(l), c != e && ($("#li_" + c).removeClass("section-hover"), h.hide()), c = e, u = setTimeout(t.bind(null, e), 200)
            }

            function n() {
                $(".raysNav li").on("mouseenter touchstart", function() {
                    var e = $(this).data("dropdown"),
                        t = $("#dd_" + e + " .dropdown-banner [data-banner]");
                    t.length > 0 && t.each(function() {
                        var e = $(this);
                        e.html('<img src="' + e.data("banner") + '" />')
                    })
                })
            }

            function a() {
                w = y["default"].mobileTabletCheck()
            }

            function o() {
                var e = $(".my-account-button");
                p.toggleClass("hidden", w), f.toggleClass("visible", w), g.toggleClass("tablet-navigation", w), v.toggleClass("visible", w), e.toggleClass("disable-link", w), $(".raysNav li a").toggleClass("disable-link", w)
            }

            function r(t, n) {
                t.hasClass("section-hover") ? i(n) : e(n)
            }
            $(document).ready(function() {
                var e = void 0 != window.screenLeft ? window.screenLeft : screen.left,
                    t = void 0 != window.screenTop ? window.screenTop : screen.top,
                    i = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
                    n = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
                    a = i / 2 - 500 + e,
                    s = n / 2 - 300 + t;
                if (!$("#logged-out-menu").hasClass("hide") && !$("#logged-out-menu2").hasClass("hide")) {
                    var o;
                    $(".oauth-signin-link").click(function() {
                        o = window.open($(this).attr("href"), "google-connect", "width=900, height=600, left=" + a + ", top=" + s, !0);
                        var e = window.location.host.split(".");
                        document.cookie = "loginSource=" + window.location.href + ";domain=." + e[1] + "." + e[2] + ";expires=Thu, 18 Dec 2021 12:00:00 UTC";
                        var t = window.setInterval(function() {
                            if (o.closed !== !1)
                                if (window.clearInterval(t), document.cookie = "loginSource=; expires=Thu, 18 Dec 2010 12:00:00 UTC; path=/", document.cookie.includes("wechat")) window.location.pathname.includes("/account/login") || window.location.pathname.includes("/account/register") ? ($("#main-login-container").addClass("hide"), $("#main-wechat-container").toggleClass("hide"), $("#wechat-content").removeClass("hide"), $("#signin-acc-title").addClass("hide")) : ($("#main-signin-popup-content").addClass("hide"), $("#wechat-content").toggleClass("hide"), $("#loginHeader").css("width", "400px"));
                                else {
                                    var e = $("#domainHelper").val(),
                                        i = (e.substring(0, e.length - 1) + "header", window.location.pathname);
                                    "/account/login" === i || "/account/register" === i ? window.location.href = window.location.origin + "/transactions/checkout" : window.location.pathname.toLowerCase().includes("/editcart") ? window.location.reload() : window.location.reload()
                                }
                        }, 200);
                        return !1
                    })
                }
            });
            var l, u, c, d = $("#catA-Z"),
                h = $(".dropDownWrap"),
                p = $(".conditions-link-container"),
                f = $(".view-category-button-container"),
                g = $("#iherb-main-nav"),
                v = $(".tablet-actions"),
                m = !1,
                w = !1;
            $("#catA-Z a").addClass("top-link"), $("#a-z a").addClass("top-link"), $('.dropdown-menu-container ul[class^="col"] a').addClass("middle-link"), $(".banner a").addClass("bottom-link"), $(".btn").mouseup(function() {
                $(this).blur()
            }), a(), o(), $("#dd_herb").prepend(d), n(), $(document).on("mouseenter", "#a-z", function() {
                clearTimeout(u)
            }).on("mouseenter", ".dropDownWrap, .raysNav li", function() {
                var t = $(this).data("dropdown");
                w ? r($(this), t) : e(t)
            }).on("touchstart", ".raysNav li", function(t) {
                var i = $(this).data("dropdown");
                w ? r($(this), i) : e(i), t.stopPropagation()
            }).on("touchstart", ".icon-exit", function(e) {
                var t = $(this).closest(".dropDownWrap").data("dropdown");
                $("#dd_" + t).hide(), $("#li_" + t).removeClass("section-hover"), e.preventDefault()
            }).on("mouseleave", ".dropDownWrap, .raysNav li", function() {
                var e = $(this).data("dropdown");
                i(e)
            });
            var _ = function(e) {
                    e && e.preventDefault(), $("#loginLoader").css("display", "block");
                    var t = {},
                        i = $("#domainHelper").val();
                    i.substring(0, i.length - 1) + "header";
                    t.username = $("#UserNameLogin").val(), t.password = $("#Password").val(), x(), $.ajax({
                        data: t,
                        datatype: "html",
                        headers: {
                            "x-ajax": "1"
                        },
                        xhrFields: {
                            withCredentials: !0
                        },
                        type: "POST",
                        cache: !1,
                        url: i,
                        success: function(e) {
                            $("#loginLoader").css("display", "none"), "success" === e.result ? (s["default"].isPageAny("shopping-cart") && null != sessionStorage.getItem("login-share") && b(), window.location.reload()) : "empty" === e.result ? ("" === $("#UserNameLogin").val() && ($("#username-default-label").removeClass("show").addClass("hide"), $("#username-warning-label").removeClass("hide").addClass("show")), "" === $("#Password").val() && ($("#password-default-label").removeClass("show").addClass("hide"), $("#password-warning-label").removeClass("hide").addClass("show"))) : "nomatch" === e.result ? ($("#login-nomatch-warning").removeClass("hide"), $(".alert-warning").removeClass("hide")) : "failed" === e.result ? ($("#login-failed-warning").removeClass("hide"), $(".alert-warning").removeClass("hide")) : ($("#login-inactive-warning").removeClass("hide"), $(".alert-warning").removeClass("hide"))
                        },
                        error: function(e) {
                            $("#loginLoader").css("display", "none")
                        }
                    })
                },
                b = function() {
                    $("#btnShareBasket").trigger("click"), sessionStorage.removeItem("logged-share"), sessionStorage.setItem("logged-in-cart", "success"), setTimeout(function() {
                        $(".now-signed-in").fadeOut()
                    }, 6e3)
                },
                k = function() {
                    var e = $("#domainHelper").val(),
                        t = e.slice(0, e.length - 14) + "pro/iel/";
                    $("#loginLoader").css("display", "block"), $.ajax({
                        data: {
                            username: $("#RegUserName").val()
                        },
                        datatype: "html",
                        headers: {
                            "x-ajax": "1"
                        },
                        xhrFields: {
                            withCredentials: !0
                        },
                        type: "POST",
                        cache: !1,
                        url: t,
                        success: function(e) {
                            $("#loginLoader").css("display", "none"), 4 === e.loginresult ? ($(".customer-email").text($("#RegUserName").val()), $("#loginHeader").width("450px"), $("#forgot-pass-content").addClass("hide"), 0 !== $("#temp-code-email").length ? $("#temp-code-email").removeClass("hide") : $("#temp-code-content").removeClass("hide"), $("#curr-device").val(e.device)) : $("#email-first-warning").removeClass("hide")
                        },
                        error: function(e) {
                            $("#loginLoader").css("display", "none")
                        }
                    })
                },
                C = function() {
                    var e = $("#domainHelper").val();
                    if (void 0 !== $(".g-recaptcha").val()) {
                        D();
                        var t = e.slice(0, e.length - 14) + "account/VerifiedInitializeReset/",
                            i = e.slice(0, e.length - 14) + "account/verifycaptcha/";
                        $("#forgot-pw-warning").addClass("hide"), $("#forgot-pw-bad-code").addClass("hide"), $("#forgot-pw-no-email").addClass("hide"), $("#loginLoader").css("display", "block"), $.ajax({
                            data: {
                                response: $("#g-recaptcha-response")[0].value
                            },
                            datatype: "jsonp",
                            headers: {
                                "x-ajax": "1"
                            },
                            xhrFields: {
                                withCredentials: !0
                            },
                            type: "POST",
                            cache: !1,
                            url: i,
                            success: function(e) {
                                $("#loginLoader").css("display", "none"), e.result !== !1 ? $.ajax({
                                    data: {
                                        resetusername: $("#ResetUserName").val()
                                    },
                                    headers: {
                                        "x-ajax": "1"
                                    },
                                    xhrFields: {
                                        withCredentials: !0
                                    },
                                    type: "POST",
                                    cache: !1,
                                    url: t,
                                    success: function(e) {
                                        "Success" === e.result ? ($("#curr-device").val(e.deviceId), $(".customer-email").text($("#ResetUserName").val()), $("#loginHeader").width("450px"), $("#forgot-pass-content").addClass("hide"), $("#forgot-code-content").removeClass("hide")) : ($("#forgot-pw-no-email").removeClass("hide"), $("#forgot-pw-warning").removeClass("hide"))
                                    }
                                }) : ($("#forgot-pw-warning").removeClass("hide"), $("#forgot-pw-bad-code").removeClass("hide"))
                            },
                            error: function(e) {
                                $("#loginLoader").css("display", "none")
                            }
                        })
                    } else {
                        var n = window.location.host.split(".");
                        document.cookie = "resetemail=" + $("#ResetUserName").val() + ";domain=." + n[1] + "." + n[2] + ";expires=Thu, 18 Dec 2021 12:00:00 UTC", window.location = e.slice(0, e.length - 6) + "initializeresetpassword"
                    }
                },
                x = function(e) {
                    window.loginPopupLoaded ? (I(), A()) : window.location = $("#domainHelper").val()
                },
                P = function() {
                    $("#transBG").hide(), $("#loginHeader").removeClass("show"), $("#create-acc-popup-content, #wechat-content, #forgot-pass-content").addClass("hide"), $("#main-signin-popup-content").removeClass("hide"), sessionStorage.removeItem("login-share")
                },
                S = function() {
                    $(event.target).find("i").toggleClass("hide"), $(event.target).siblings("input").prop("type", function(e, t) {
                        return "password" == t ? "text" : "password"
                    })
                },
                E = function(e) {
                    x(e), $("#main-signin-popup-content, #quick-reg-warning, #quick-reg-invalid").addClass("hide"), $("#create-acc-popup-content").removeClass("hide"), $("#loginHeader").css("width", "820px")
                },
                I = function() {
                    $("#transBG").removeClass("hide").show(), void 0 !== $("#oauth-disabled").val() ? ($("#loginHeader").css("width", "420px"), $("#sign-in-outer").addClass("inactive")) : $("#loginHeader").css("width", "820px"), $("#loginHeader").removeClass("hide").addClass("show"), $("#wechat-email-screen").removeClass("hide"), $("#login-inactive-warning, #login-failed-warning, #login-nomatch-warning, #username-warning-label, #password-warning-label, .alert-warning, #temp-code-content, #temp-code-email, #forgot-code-content, #forgot-pw-warning, #forgot-pw-bad-code, #forgot-pw-no-email, #wechat-pw-screen").addClass("hide"), $("#username-default-label").addClass("show").removeClass("hide"), $("#password-default-label").addClass("show").removeClass("hide")
                },
                A = function() {
                    $("#UserNameReg, #PasswordReg, #ConfirmPassword, #QuickRegUserName").val(""), $("#quick-reg-warning, #quick-reg-invalid, #quick-reg-exists, #create-acc-warning, #create-acc-exists, #create-acc-invalid, #create-acc-pwlength, #create-user-empty").addClass("hide"), $("#create-user-default").removeClass("hide"), $("#create-pw-default").removeClass("hide").addClass("show"), $("#create-pw-empty").removeClass("show").addClass("hide"), $("#create-confirm-default").removeClass("hide").addClass("show"), $("#create-confirm-empty").removeClass("show").addClass("hide")
                },
                L = function(e) {
                    e.preventDefault(), $("#loginLoader").css("display", "block");
                    var t;
                    t = "quick-checkout-btn" === $(e.target).attr("id") ? {
                        UserNameQuickReg: $("#QuickRegUserName").val()
                    } : {
                        usernamereg: $("#UserNameReg").val(),
                        passwordreg: $("#PasswordReg").val(),
                        confirmpassword: $("#ConfirmPassword").val()
                    };
                    var i = $("#domainHelper").val(),
                        n = i.slice(0, i.length - 6) + "registerajax";
                    $.ajax({
                        data: t,
                        datatype: "html",
                        headers: {
                            "x-ajax": "1"
                        },
                        xhrFields: {
                            withCredentials: !0
                        },
                        type: "POST",
                        cache: !1,
                        url: n,
                        success: function(t) {
                            if ($("#loginLoader").css("display", "none"), "success" === t.result && window.location.reload(), "quick-checkout-btn" !== $(e.target).attr("id")) switch (A(), t.result) {
                                case "empty":
                                    "" === $("#UserNameReg").val() ? ($("#create-user-default").addClass("hide").removeClass("show"), $("#create-user-empty").addClass("show").removeClass("hide")) : ($("#create-user-default").removeClass("hide").addClass("show"), $("#create-user-empty").addClass("hide").removeClass("show")), "" === $("#PasswordReg").val() ? ($("#create-pw-default").addClass("hide").removeClass("show"), $("#create-pw-empty").addClass("show").removeClass("hide")) : ($("#create-pw-default").removeClass("hide").addClass("show"), $("#create-pw-empty").removeClass("show").addClass("hide")), "" === $("#ConfirmPassword").val() ? ($("#create-confirm-default").addClass("hide").removeClass("show"), $("#create-confirm-empty").addClass("show").removeClass("hide")) : ($("#create-confirm-default").removeClass("hide").addClass("show"), $("#create-confirm-empty").removeClass("show").addClass("hide"));
                                    break;
                                case "LogonNameAlreadyExist":
                                    $("#create-acc-warning, #create-acc-exists").removeClass("hide");
                                    break;
                                case "invalidemail":
                                    $("#create-acc-warning, #create-acc-invalid").removeClass("hide");
                                    break;
                                case "InvalidPasswordLength":
                                    $("#create-acc-warning, #create-acc-pwlength").removeClass("hide");
                                    break;
                                case "InvalidPassword2":
                                    $("#create-acc-warning, #create-acc-nomatch").removeClass("hide")
                            } else switch (A(), t.result) {
                                case "invalidemail":
                                case "empty":
                                    $("#quick-reg-warning, #quick-reg-invalid").removeClass("hide");
                                    break;
                                case "LogonNameAlreadyExist":
                                    $("#quick-reg-warning, #quick-reg-exists").removeClass("hide")
                            }
                        }
                    })
                },
                q = function(e) {
                    e.preventDefault();
                    var t, i = {};
                    i.weChatInfo = {}, document.cookie.split(";").forEach(function(e) {
                        e.includes("wechat") && (t = e)
                    }), $("#wechat-email-warning").addClass("hide"), $("#wechat-invalid-email").addClass("hide"), $("#wechat-pw-warning").addClass("hide"), $("#wechat-no-match").addClass("hide"), t = t.slice(8);
                    var n = t.split("&");
                    n.forEach(function(e) {
                        var t = e.split("=");
                        i.weChatInfo[t[0]] = t[1]
                    }), i.email = $("#WeChatEmail").val(), $("#wechat-email-screen").hasClass("hide") && (i.password = $("#WeChatPassword").val());
                    var a = $("#domainHelper").val(),
                        s = a.substring(0, a.length - 6) + "wechatlink";
                    $.ajax({
                        data: i,
                        datatype: "html",
                        headers: {
                            "x-ajax": "1"
                        },
                        xhrFields: {
                            withCredentials: !0
                        },
                        type: "POST",
                        cache: !1,
                        url: s,
                        success: function(e) {
                            if ($("#wechat-email-warning").addClass("hide"), $("#wechat-invalid-email").addClass("hide"), $("#wechat-pw-warning").addClass("hide"), $("#wechat-no-match").addClass("hide"), "exist" === e.result) $("#wechat-email-screen").addClass("hide"), $("#wechat-pw-screen").toggleClass("hide");
                            else if ("invalid" === e.result) $("#wechat-email-warning").removeClass("hide"), $("#wechat-invalid-email").removeClass("hide");
                            else if ("failed" === e.result) $("#wechat-pw-warning").removeClass("hide"), $("#wechat-no-match").removeClass("hide");
                            else {
                                var t = a.substring(0, a.length - 1) + "header",
                                    n = window.location.host.split("."),
                                    s = "." + n[1] + "." + n[2];
                                document.cookie = "wechat=;domain=" + s + ";expires=Thu, 18 Dec 2010 12:00:00 UTC; path=/;", window.location.pathname.includes("/account/login") || window.location.pathname.includes("/account/register") ? window.location = window.location.origin + "/transactions/checkout" : $.ajax({
                                    data: i,
                                    datatype: "html",
                                    headers: {
                                        "x-ajax": "1"
                                    },
                                    xhrFields: {
                                        withCredentials: !0
                                    },
                                    type: "POST",
                                    cache: !1,
                                    url: t,
                                    success: function(e) {
                                        var t = $(e),
                                            i = t.find(".cart-container");
                                        $(".cart-container").html(i.html());
                                        var n = $(".language-select-wrap.hidden-xs.hidden-sm");
                                        $(".language-select-wrap.hidden-xs.hidden-sm").replaceWith(n), $("#loginHeader").removeClass("show"), $("#transBG").hide(), T()
                                    }
                                })
                            }
                        }
                    })
                },
                O = function() {
                    if ("CN" === $("#countryHelper").text()) {
                        var e = $("#domainHelper").val();
                        window.location = e.slice(0, e.length - 6) + "InitializeResetPassword";
                        var t = window.location.host.split(".");
                        document.cookie = "forgotpw=true;domain=." + t[1] + "." + t[2] + ";expires=Thu, 18 Dec 2021 12:00:00 UTC"
                    } else x(), $("#header-reset-pw-button").prop("disabled", !0), $.getScript("https://www.google.com/recaptcha/api.js?hl=" + $("#countryHelper").text()), 0 !== $("#temp-code-email").length ? ($("#reset-pw").removeClass("hide"), $("#loginHeader").css("width", "420px")) : $("#loginHeader").css("width", "820px"), $("#main-signin-popup-content").addClass("hide"), $("#forgot-pass-content").toggleClass("hide")
                },
                F = function() {
                    if (window.location.pathname.includes("/account/login") || window.location.pathname.includes("/account/register") || window.location.pathname.includes("/account/initializeresetpassword"))
                        if ("/account/initializeresetpassword" === window.location.pathname.toLowerCase()) window.location.href = window.location.origin + "/account/login";
                        else if ($(".login-with-password").hasClass("hide")) $("#main-login-container").css("width", "780px"), $(".login-with-password, #main-left-container, .login-new-customer-text-static, .oauth-signin-link, #signin-acc-title, #quick-reg").removeClass("hide"), $(".register-account, #temp-center-container, #main-center-container, #social-right, #oauth-create-link, .signin-tempcode, #forgot-pass-block, #social-right, #oauth-create-link").addClass("hide"), $("#main-left-container").removeClass("inactive"), $("#main-login-container").css("margin-top", "0px");
                    else if ($("#signin-acc-title").hasClass("hide")) window.location.href = window.location.origin + "/account/login";
                    else {
                        var e, t = "; " + document.cookie,
                            i = t.split("; ihr-lac=");
                        2 == i.length && (e = i.pop().split(";").shift()), void 0 === e || e.includes("/transactions/checkout") ? window.location.href = window.location.origin + "/editcart/" : window.location.href = e.split("=")[1]
                    } else {
                        var n = !1;
                        $("#wechat-pw-screen").hasClass("hide") || (n = !0), P(), x(), n && ($("#wechat-content").toggleClass("hide"), $("#wechat-email-warning, #wechat-invalid-email, #wechat-pw-warning, #wechat-no-match, #main-signin-popup-content").addClass("hide"), $("#loginHeader").css("height", "350px"), $("#loginHeader").css("width", "400px"))
                    }
                },
                j = function(e) {
                    e.preventDefault();
                    var t = $("#domainHelper").val(),
                        i = t.slice(0, t.length - 6) + "FinalizeEmailLogIn";
                    $.ajax({
                        data: {
                            username: $("#RegUserName").val(),
                            nonce: $("#sixDigitCode").val(),
                            deviceid: $("#curr-device").val()
                        },
                        datatype: "html",
                        headers: {
                            "x-ajax": "1"
                        },
                        xhrFields: {
                            withCredentials: !0
                        },
                        type: "POST",
                        cache: !1,
                        url: i,
                        success: function(e) {
                            null !== e.redirect ? window.location.reload() : ($("#sixDigitCode").val(""), $("#sixDigitCode").addClass("danger"), $("#sixDigitCode").siblings("label").removeClass("hide"))
                        }
                    })
                },
                M = function(e) {
                    e.preventDefault()
                },
                R = function() {
                    $("#temp-code-content").hasClass("hide") && $("#forgot-code-content").hasClass("hide") && ($("#transBG").hide(), $("#loginHeader").removeClass("show"), $("#create-acc-popup-content, #wechat-content, #forgot-pass-content").addClass("hide"), $("#main-signin-popup-content").removeClass("hide"), sessionStorage.removeItem("login-share"))
                },
                B = function() {
                    x(), $("#loginHeader").css("width", "420px"), $("#main-signin-popup-content").addClass("hide"), $("#temp-code-content").removeClass("hide"), $("#forgot-pass-content").toggleClass("hide"), $("#reset-pw").addClass("hide")
                };
            $("#header-sign-in-button").on("click", _.bind("#header-sign-in-button")), $("#login-password-form2").on("submit", _.bind("#header-sign-in-button")), $(".sign-in").click(x.bind(this)), $(".dropdown-signin-link").click(x.bind(this)), $(".popup-close, .btnCancel").click(P.bind(this)), $(".show-hide-pw").click(S.bind(this)), $("#header-create-acc-button").click(E.bind(this)), $(".dropdown-createacc-link").click(E.bind(this)), $("#create-acc-button").click(L.bind(this)), $("#quick-checkout-btn").click(L.bind(this)), $("#forgot-pw-trigger").click(O.bind(this)), $(".back-button").click(F.bind(this)), $("#wechat-pw-submit-btn").click(q.bind(this)), $("#wechat-email-submit-btn").click(q.bind(this)), $("#header-sign-in-email-button").click(k.bind(this)), "/account/login" !== window.location.pathname && $("#sign-in-code-form").submit(j.bind(this)), $("#try-again-header").find("a").click(O.bind(this)), $("#try-again-code").find("a").click(O.bind(this)), $("#wechat-pw-form").submit(q.bind(this)), $("#wechat-email-form").submit(q.bind(this)), $("#header-reset-pw-button").click(C.bind(this)), $("#forgot-code-form").submit(M.bind(this)), $(".transparency").click(R.bind(this)), window.location.host.includes("checkout") && !window.location.pathname.toLowerCase().includes("editcart") || $("#temp-code-trigger").click(B.bind(this)), 0 !== $("#temp-code-email").length && $("#login-forgot-password").click(O.bind(this)), window.showLoginPopup = function() {
                x()
            }
        }
    }, {
        "./modules/fill-compact-cart": 7,
        "./modules/free-shipping-message": 8,
        "./modules/my-account-dropdown": 11,
        "./modules/polyfills": 12,
        "./modules/share-page-catalog": 14,
        "./modules/site-search.js": 17,
        "./modules/sticky-header-navigation": 18,
        "./modules/tablet-helpers": 19,
        "./modules/utilities": 20
    }],
    3: [function(e, t, i) {
        "use strict";
        e("./modules/polyfills.js"), e("./modules/ccl.js"), e("./header.js"), e("./footer.js")
    }, {
        "./footer.js": 1,
        "./header.js": 2,
        "./modules/ccl.js": 4,
        "./modules/polyfills.js": 12
    }],
    4: [function(e, t, i) {
        "use strict";
        $(function() {
                $(".language-select-wrap").removeClass("hover"), $(".selected-country-wrapper").css({
                    "pointer-events": "all"
                })
            }),
            function(e) {
                $(window).load(function() {
                    var t = $(".selected-country-wrapper");
                    window.cclSelector = new e.LoadCCL(t), $(document).on("click.iherb.ccl", '.selected-country-wrapper[data-on="off"]', function() {
                        $(this);
                        window.cclSelector.data.done(function(e) {
                            window.cclSelector.renderCCL(e)
                        })
                    })
                })
            }(window.iHerb = window.iHerb || {}, jQuery),
            function(e, t) {
                var i = function(e) {
                    this.$ccl = t(".language-menu"), this.url = "/Pro/CountrySelection/", this.$selectedWrapper = e, this.data = this.ajaxCCL()
                };
                e.LoadCCL = i, i.prototype = {
                    ajaxCCL: function() {
                        return t.ajax({
                            url: this.url,
                            cache: !1,
                            type: "GET"
                        })
                    },
                    renderCCL: function(t) {
                        this.$ccl.append(t), e.ccl = new e.CCL(this.$ccl), e.ccl.open(), this.$selectedWrapper.attr("data-on", "on")
                    }
                }
            }(window.iHerb = window.iHerb || {}, jQuery),
            function(e) {
                var t = function(e) {
                    this.$elem = $(e), this.url = $(".language-select-wrap").data("url"), this.init()
                };
                e.CCL = t, t.prototype = {
                    init: function() {
                        this.$btnSavePreferences = $(".save-selection"), this._countryDropdown = new e.DropdownSearch(".select-country"), this._countryVal = this._countryDropdown.val(), this._languageDropdown = new e.Dropdown(".select-language"), this._languageVal = this._languageDropdown.val(), this._currencyDropdown = new e.DropdownSearch(".select-currency"), this._currencyVal = this._currencyDropdown.val(), this._isWaiting = !1, this.promo(this._countryVal, this._languageVal), this._attach("_selectCountry", "close", this._countryDropdown), this._attach("_selectLanguage", "close", this._languageDropdown), this._attach("_selectCurrency", "close", this._currencyDropdown), this._attach("wait", "open", this._countryDropdown), this._attach("wait", "open", this._languageDropdown), this._attach("wait", "open", this._currencyDropdown), $(".country-close").click(function(e) {
                            e.preventDefault()
                        }), $(".title-english").toggle("en-US" !== this._languageVal), $(document).on("click.iherb.ccl", '.selected-country-wrapper[data-on="on"]', this.open.bind(this)).on("click.iherb.ccl", ".country-close, #ccl-modal-background, .cc-close", this.close.bind(this))
                    },
                    wait: function() {
                        this._isWaiting = !0
                    },
                    promo: function(e, t) {
                        var i = ["AU", "CN", "SG", "KR", "JP", "RU", "HK"],
                            n = e;
                        return $(".country-footer span").addClass(e + " " + t), "US" == n ? $(".country-us").removeClass("hide") : i.indexOf(n) !== -1 ? $(".country-major").removeClass("hide") : $(".country-others").removeClass("hide")
                    },
                    open: function() {
                        this.createModalBackground(), $(".country-menu").addClass("on"), this._$modalBackground.show()
                    },
                    close: function(e) {
                        this._isWaiting || (e.preventDefault(), $(".country-menu").removeClass("on"), this._$modalBackground.hide())
                    },
                    createModalBackground: function(e) {
                        $("#ccl-modal-background").length || (this._$modalBackground = $("<div />", {
                            id: "ccl-modal-background",
                            "class": "transparency"
                        }), $("body").append(this._$modalBackground))
                    },
                    country: function(e) {
                        return arguments.length && (this._countryVal = this._countryDropdown.val(e)), this._countryVal
                    },
                    language: function(e) {
                        return arguments.length && (this._languageVal = this._languageDropdown.val(e)), this._languageVal
                    },
                    currency: function(e) {
                        return arguments.length && (this._currencyVal = this._currencyDropdown.val(e)), this._currencyVal
                    },
                    _selectCountry: function() {
                        this._countryVal != this._countryDropdown.val() ? this._getCountry() : this._isWaiting = !1
                    },
                    _selectLanguage: function() {
                        this._languageVal != this._languageDropdown.val() ? this._getLanguage() : this._isWaiting = !1
                    },
                    _selectCurrency: function() {
                        this._currencyVal != this._currencyDropdown.val() ? this._getCurrency() : this._isWaiting = !1
                    },
                    _getCountry: function() {
                        this._countryVal = this._countryDropdown.val(), this.$elem.load(this.url + "/?CountryCode=" + this._countryVal, function() {
                            this.init(), this.open()
                        }.bind(this))
                    },
                    _getLanguage: function() {
                        this._countryVal = this._countryDropdown.val(), this._languageVal = this._languageDropdown.val(), this._currencyVal = this._currencyDropdown.val(), this.$elem.load(this.url + "/?CountryCode=" + this._countryVal + "&CurrencyCode=" + this._currencyVal + "&LanguageCode=" + this._languageVal, function(e, t, i) {
                            this.init(), this.open()
                        }.bind(this))
                    },
                    _getCurrency: function() {
                        this._countryVal = this._countryDropdown.val(), this._languageVal = this._languageDropdown.val(), this._currencyVal = this._currencyDropdown.val(), this.$elem.load(this.url + "/?CountryCode=" + this._countryVal + "&CurrencyCode=" + this._currencyVal + "&LanguageCode=" + this._languageVal, function() {
                            this.init(), this.open()
                        }.bind(this))
                    },
                    _attach: function(e, t, i) {
                        var n = i[t];
                        i[t] = function() {
                            n.apply(i, arguments), this[e].apply(this, arguments)
                        }.bind(this)
                    }
                }
            }(window.iHerb || {}, jQuery),
            function(e) {
                var t = function(e) {
                    this.$elem = $(e), this.$list = this.$elem.find(".search-list"), this.$text = this.$elem.find(".dropdown-text"), this.$value = this.$elem.find(".dropdown-value"), this._timer = !1, this._text = "", this.init()
                };
                e.Dropdown = t, t.prototype = {
                    init: function() {
                        this.list = new e.List(this.$list), this._attach("_setDropdownVal", "selectItem", this.list), this.$value.prop("disabled", !1), this.val(this.$value.val()), this.$elem.on("click.iherb.dropdown", this._click.bind(this)).on("keypress.iherb.dropdown", this._keypress.bind(this)).on("keydown.iherb.dropdown", this._keydown.bind(this)), $(document).on("click", this._close.bind(this))
                    },
                    val: function(e) {
                        return arguments.length && this.list.$items.each(function(t, i) {
                            var n = $(i);
                            e.toUpperCase() == n.data("val").toUpperCase() && this.select(n)
                        }.bind(this)), this.$value.val()
                    },
                    search: function(e) {
                        var t = [];
                        this.list.$items.each(function(i) {
                            var n = $.trim($(this).text().replace("\n", "").replace("\r", "")).toLocaleUpperCase();
                            0 == n.indexOf(e.toLocaleUpperCase()) && t.push(this)
                        });
                        var i = $(t);
                        i.length > 0 && this.select(i.eq(0))
                    },
                    select: function(e) {
                        this.list.selectItem(e)
                    },
                    open: function() {
                        this.list.addClass("open"), this.list.scrollTop(this.list.selected), this.list.hasFocus(!0)
                    },
                    close: function() {
                        this.list.hasFocus(!1), this.list.removeClass("open")
                    },
                    toggle: function() {
                        this.list.hasClass("open") ? this.close() : this.open()
                    },
                    _clear: function() {
                        this._text = "", this._timer = !1
                    },
                    _keypress: function(e) {
                        this._timer || (this._timer = !0, setTimeout(function() {
                            this._clear()
                        }.bind(this), 500)), this._text += String.fromCharCode(e.which), this.search(this._text)
                    },
                    _setDropdownVal: function(e) {
                        this.$value.val(e.data("val")), this.$text.html(e.html())
                    },
                    _click: function(e) {
                        this.toggle()
                    },
                    _keydown: function(e) {
                        switch (e.keyCode) {
                            case 9:
                                this.close();
                                break;
                            case 13:
                                this.close()
                        }
                    },
                    _close: function(e) {
                        this.$elem.is(e.target) || 0 != this.$elem.has(e.target).length || this.list.hasClass("open") && this.close(), this.$elem.trigger("change.iherb.dropdown")
                    },
                    _attach: function(e, t, i) {
                        var n = i[t];
                        i[t] = function() {
                            n.apply(i, arguments), this[e].apply(this, arguments)
                        }.bind(this)
                    }
                }
            }(window.iHerb = window.iHerb || {}, jQuery),
            function(e) {
                var t = function(e) {
                    this.$elem = $(e), this.$value = this.$elem.find(".dropdown-value"), this.init()
                };
                e.DropdownSearch = t, t.prototype = {
                    init: function() {
                        this.search = new e.Search(this.$elem), this._attach("_setVal", "_setSearchText", this.search), this.$value.prop("disabled", !1), this.val(this.$value.val()), this.$elem.on("click.iherb.dropdown", this._click.bind(this)).on("keydown.iherb.dropdown", this._keydown.bind(this)), $(document).on("click", this._close.bind(this))
                    },
                    val: function(e) {
                        return arguments.length && this.search.list.$items.each(function(t, i) {
                            var n = $(i),
                                a = /^\d+$/.test(e);
                            a ? this.select(n) : e.toUpperCase() == n.data("val").toUpperCase() && this.select(n)
                        }.bind(this)), this.$value.val()
                    },
                    select: function(e) {
                        this.search.select(e)
                    },
                    open: function() {
                        this.search.list.addClass("open"), this.search.list.scrollTop(this.search.list.selected), this.search.hasFocus(!0)
                    },
                    close: function() {
                        this.search.hasFocus(!1), this.search.list.hasFocus(!1), this.search.list.removeClass("open"), this.search.reset(), this.$elem.trigger("change.iherb.dropdown")
                    },
                    toggle: function() {
                        this.search.list.hasClass("open") ? this.close() : this.open()
                    },
                    _setVal: function(e) {
                        this.$value.val(e.data("val"))
                    },
                    _click: function(e) {
                        this.search.hasFocus() && this.search.list.hasClass("open") || this.toggle()
                    },
                    _keydown: function(e) {
                        switch (e.keyCode) {
                            case 9:
                                this.close();
                                break;
                            case 13:
                                this.close()
                        }
                    },
                    _close: function(e) {
                        this.$elem.is(e.target) || 0 != this.$elem.has(e.target).length || this.search.list.hasClass("open") && this.close()
                    },
                    _attach: function(e, t, i) {
                        var n = i[t];
                        i[t] = function() {
                            n.apply(i, arguments), this[e].apply(this, arguments)
                        }.bind(this)
                    }
                }
            }(window.iHerb = window.iHerb || {}, jQuery),
            function(e) {
                var t = function(e) {
                    this.$elem = e, this.$input = this.$elem.find(".search-input"), this.$text = this.$elem.find(".dropdown-text"), this.$list = this.$elem.find(".search-list"), this.$items = this.$list.find(".item"), this.$included = $(), this.$excluded = $(), this._hasFocus = this.$elem.is(":focus"), this.init()
                };
                e.Search = t, t.prototype = {
                    init: function() {
                        this.list = new e.List(this.$list), this.$elem.on("focus.iherb.search", ".search-input", this._focus.bind(this)).on("blur.iherb.search", ".search-input", this._blur.bind(this)).on("keyup.iherb.search", ".search-input", this._keyup.bind(this)).on("keydown.iherb.search", this._keydown.bind(this)), this._attach("_setSearchText", "selectItem", this.list)
                    },
                    search: function(e) {
                        arguments.length || (e = this.$input.val());
                        var t = [],
                            i = [],
                            n = new RegExp("(?:^|\\W|\\s)" + e.toLocaleUpperCase(), "g");
                        this.$items.each(function(e, a) {
                            var s = $.trim($(a).text().replace("\n", "").replace("\r", "")).toLocaleUpperCase();
                            s.search(n) != -1 ? t.push(a) : i.push(a)
                        }), this.$included = this.list.$items = $(t), this.$excluded = $(i), this.filter(), this.list.$items = this.list.$list.find(".item"), this.$included.length > 0 && this.select(this.$included.eq(0))
                    },
                    filter: function() {
                        this.$included.show(), this.$excluded.hide()
                    },
                    select: function(e) {
                        this.list.selectItem(e), this.list.scrollTop(e)
                    },
                    reset: function() {
                        this.$input.val(""), this.$included = this.$items, this.$excluded = $(), this.filter()
                    },
                    hasFocus: function(e) {
                        return arguments.length && (this._hasFocus = e, this._hasFocus ? this.$input.focus() : this.$input.blur()), this._hasFocus
                    },
                    _setSearchText: function(e) {
                        this.$text.html(e.html())
                    },
                    _focus: function(e) {
                        this._hasFocus = !0, this.$text.addClass("fade")
                    },
                    _blur: function(e) {
                        this._hasFocus = !1, this.$input.val(""), this.$input.removeClass("searching"), this.$text.removeClass("fade")
                    },
                    _keyup: function(e) {
                        this.search(), this.$input.val().length <= 0 ? this.$input.removeClass("searching") : this.$input.addClass("searching")
                    },
                    _keydown: function(e) {
                        switch (e.keyCode) {
                            case 38:
                                e.preventDefault(), this.list.hasFocus(!0);
                                break;
                            case 40:
                                e.preventDefault(), this.list.hasFocus(!0);
                                break;
                            case 9:
                                this.list.hasFocus(!1), this.hasFocus(!1);
                                break;
                            default:
                                this.hasFocus(!0)
                        }
                    },
                    _attach: function(e, t, i) {
                        var n = i[t];
                        i[t] = function() {
                            n.apply(i, arguments), this[e].apply(this, arguments)
                        }.bind(this)
                    }
                }
            }(window.iHerb = window.iHerb || {}, jQuery),
            function(e) {
                var t = function(e) {
                    this.$list = $(e), this.$items = this.$list.find(".item"), this.selected = this.$items.eq(0), this._hasFocus = this.$list.is(":focus"), this.init()
                };
                e.List = t, t.prototype = {
                    init: function() {
                        this.$list.on("focus.iherb.list", this._focus.bind(this)).on("blur.iherb.list", this._blur.bind(this)).on("keydown.iherb.list", this._keydown.bind(this)).on("click.iherb.list", this._click.bind(this))
                    },
                    selectItem: function(e) {
                        return this.$items.removeClass("selected"), this.selected = e.addClass("selected"), this.selected
                    },
                    scrollTo: function(e) {
                        e.offset().top + e.outerHeight() > this.$list.offset().top + this.$list.height() && this.scrollBottom(e), e.offset().top < this.$list.offset().top && this.scrollTop(e)
                    },
                    scrollTop: function(e) {
                        var t = e.offset().top - (this.$list.offset().top - this.$list.scrollTop());
                        this.$list.scrollTop(t)
                    },
                    scrollBottom: function(e) {
                        var t = e.offset().top + e.outerHeight() - this.$list.height() - (this.$list.offset().top - this.$list.scrollTop());
                        this.$list.scrollTop(t)
                    },
                    hasFocus: function(e) {
                        return arguments.length && (this._hasFocus = e, this._hasFocus ? this.$list.focus() : this.$list.blur()), this._hasFocus
                    },
                    addClass: function(e) {
                        this.$list.hasClass(e) || this.$list.addClass(e)
                    },
                    hasClass: function(e) {
                        return this.$list.hasClass(e)
                    },
                    removeClass: function(e) {
                        this.$list.removeClass(e)
                    },
                    toggleClass: function(e) {
                        this.$list.toggleClass(e)
                    },
                    next: function() {
                        var e = this.$items.filter(":visible"),
                            t = this.$items.filter(":visible").index(this.selected) + 1;
                        t < e.length && e.length > 0 && (this.selectItem(e.eq(t)), this.scrollTo(this.selected))
                    },
                    previous: function() {
                        var e = this.$items.filter(":visible"),
                            t = this.$items.filter(":visible").index(this.selected) - 1;
                        t >= 0 && (this.selectItem(e.eq(t)), this.scrollTo(this.selected))
                    },
                    _keydown: function(e) {
                        switch (e.keyCode) {
                            case 38:
                                e.preventDefault(), this.previous();
                                break;
                            case 40:
                                e.preventDefault(), this.next();
                                break;
                            default:
                                return
                        }
                    },
                    _focus: function(e) {
                        this._hasFocus = !0
                    },
                    _blur: function(e) {
                        this._hasFocus = !1
                    },
                    _click: function(e) {
                        this.$items.each(function(t, i) {
                            var n = $(i);
                            if (n.is(e.target) || n.has(e.target).length > 0) return void this.selectItem(n)
                        }.bind(this))
                    }
                }
            }(window.iHerb = window.iHerb || {}, jQuery)
    }, {}],
    5: [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i["default"] = {
            api: {
                facebook: "http://www.facebook.com/share.php?",
                twitter: "http://www.twitter.com/intent/tweet?",
                googlePlus: "https://plus.google.com/share?",
                pinterest: "https://pinterest.com/pin/create/bookmarklet/?",
                weibo: "http://service.weibo.com/share/share.php?",
                qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?",
                qq: "http://connect.qq.com/widget/shareqq/index.html?",
                douban: "https://www.douban.com/share/service?",
                naver: "http://share.naver.com/web/shareView.nhn?",
                vk: "https://vk.com/share.php?",
                ok: "https://odnoklassniki.ru/dk?"
            }
        }
    }, {}],
    6: [function(e, t, i) {
        "use strict";

        function n(e) {
            this.$clockElem = e, this._init()
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i["default"] = n, n.prototype = {
            _cacheDOM: function() {
                this.$clock = $("#clock"), this.daysArray = this.$clockElem.data("days-array"), this.pstText = this.$clockElem.data("pst"), this.isLangEnKr = $("html").is(".en, .ko")
            },
            _init: function() {
                var e = this,
                    t = this.$clockElem.data("year"),
                    i = this.$clockElem.data("month"),
                    n = this.$clockElem.data("day"),
                    a = this.$clockElem.data("hour"),
                    s = this.$clockElem.data("minute");
                this._cacheDOM(), this.$clock.length > 0 && setInterval(function() {
                    var o = new Date(t, i - 1, n, a, s);
                    e._render(o, t, i, n, e._setTimeFormat(o))
                }, 1e3)
            },
            _render: function(e, t, i, n, a) {
                var s = this.daysArray[e.getDay()];
                this.$clock.text(s + ", " + t + "/" + i + "/" + n + ", " + a + ", " + this.pstText)
            },
            _setTimeFormat: function(e) {
                var t = e.getHours(),
                    i = ("0" + e.getMinutes()).slice(-2),
                    n = void 0,
                    a = void 0;
                return this.isLangEnKr ? (t > 12 ? (n = "PM", a = t - 12) : (n = 12 == t ? "PM" : "AM", a = t), a + ":" + i + " " + n) : t + ":" + i
            }
        }
    }, {}],
    7: [function(e, t, i) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = function() {
                function e() {
                    n(this, e), this.settings = {
                        cart: "#cart-wrap",
                        subtotal: "#subtotal-wrap",
                        cart_qty: "#cart-qty",
                        cart_qty_class: "cart-qty",
                        cart_sub: "#cart-subtotal",
                        cart_sub_class: "cart-click cart-subtotal"
                    }, this.getValues()
                }
                return a(e, [{
                    key: "getValues",
                    value: function() {
                        var e = this.settings,
                            t = this;
                        $.ajax({
                            headers: {
                                "x-ajax": "1"
                            },
                            url: "/pro/gcc",
                            type: "POST",
                            cache: !1,
                            success: function(i) {
                                t.fillElements(i, e)
                            }
                        })
                    }
                }, {
                    key: "fillElements",
                    value: function(e, t) {
                        var e = $("<div></div>").html(e),
                            i = $(t.cart, e).html(),
                            n = $(t.subtotal, e).html();
                        $(t.cart).html(i), $(t.subtotal).html(n), $(t.cart_qty).length && ($(t.cart_qty)[0].className = t.cart_qty_class, $(t.cart_sub)[0].className = t.cart_sub_class)
                    }
                }]), e
            }();
        i["default"] = s
    }, {}],
    8: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = e("./utilities"),
            o = n(s),
            r = function l() {
                var e = this;
                a(this, l), this.countryCode = window.COUNTRY_CODE, this.languageCode = window.LANGUAGE_CODE, this.currencyCode = window.CURRENCY_CODE, this.type = "desktop", this.key = "free-shipping-message-" + this.countryCode + "-" + this.languageCode + "-" + this.currencyCode + "-" + this.type, this.message = sessionStorage.getItem(this.key), this.hideBanner = o["default"].getCookie("banneralert"), this.$header = $("header"), this.$iherbHeader = $(".iherb-header"), this.$bannerAlert = $(".banner-alert");
                var t = $(".free-shipping-message-placeholder");
                t.length && (this.message ? (t.replaceWith(this.message), $(".message-value").text($(this.message).find("bdi").text())) : $.ajax({
                    method: "GET",
                    headers: {
                        "x-ajax": "1"
                    },
                    xhrFields: {
                        withCredentials: !0
                    },
                    dataType: "html",
                    crossDomain: !0,
                    url: window.IHERB_CATALOG_HOST + "/Catalog/GetFreeShippingMessage/",
                    success: function(i) {
                        i ? (t.replaceWith(e.message || i), sessionStorage.setItem(e.key, i), $(".message-value").text($(i).find("bdi").text())) : (t.removeClass("hide"), e.$bannerAlert.hide())
                    },
                    error: function() {
                        t.removeClass("hide"), e.$bannerAlert.hide()
                    }
                })), $(window).on("resize", function() {
                    e.$bannerAlert.is(":visible") ? ($("html").hasClass("CustomBlog") || $("html").hasClass("productreviews") || e.$iherbHeader.css("top", "30px"), e.$header.css("height", "118px")) : (e.$iherbHeader.removeAttr("style"), e.$header.removeAttr("style"))
                }), this.hideBanner || (this.$bannerAlert.removeClass("hide"), $(".free-shipping-close").on("click", function() {
                    e.$iherbHeader.removeAttr("style"), e.$header.removeAttr("style"), e.$bannerAlert.slideUp("fast"), o["default"].setCookie("banneralert", "true")
                })), $(window).trigger("resize")
            };
        i["default"] = r
    }, {
        "./utilities": 20
    }],
    9: [function(e, t, i) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = function() {
                function e(t, i) {
                    n(this, e), this.$menu = $(t), this.activeRow = null, this.mouseLocs = [], this.lastDelayLoc = null, this.timeoutId = null, this.MOUSE_LOCS_TRACKED = 3, this.DELAY = 300, this.options = Object.assign({
                        rowSelector: "> li",
                        submenuSelector: "*",
                        submenuDirection: "right",
                        tolerance: 85,
                        enter: $.noop,
                        exit: $.noop,
                        activate: $.noop,
                        deactivate: $.noop,
                        exitMenu: $.noop
                    }, i), this._init()
                }
                return a(e, [{
                    key: "_init",
                    value: function() {
                        this._bindEvents()
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        this.$menu.mouseleave(this.mouseleaveMenu.bind(this)).find(this.options.rowSelector).mouseenter(this.mouseenterRow.bind(this)).mouseleave(this.mouseleaveRow.bind(this)).click(this.clickRow.bind(this)), $(document).mousemove(this.mousemoveDocument.bind(this))
                    }
                }, {
                    key: "mousemoveDocument",
                    value: function(e) {
                        this.mouseLocs.push({
                            x: e.pageX,
                            y: e.pageY
                        }), this.mouseLocs.length > this.MOUSE_LOCS_TRACKED && this.mouseLocs.shift()
                    }
                }, {
                    key: "mouseleaveMenu",
                    value: function() {
                        this.timeoutId && clearTimeout(this.timeoutId), this.options.exitMenu(this.$menu) && (this.activeRow && this.options.deactivate(this.activeRow), this.activeRow = null)
                    }
                }, {
                    key: "mouseenterRow",
                    value: function(e) {
                        this.timeoutId && clearTimeout(this.timeoutId), this.options.enter(e.currentTarget), this.possiblyActivate(e.currentTarget)
                    }
                }, {
                    key: "mouseleaveRow",
                    value: function(e) {
                        this.options.exit(e.currentTarget)
                    }
                }, {
                    key: "clickRow",
                    value: function(e) {
                        this.activate(e.currentTarget)
                    }
                }, {
                    key: "activate",
                    value: function(e) {
                        e != this.activeRow && (this.activeRow && this.options.deactivate(this.activeRow), this.options.activate(e), this.activeRow = e)
                    }
                }, {
                    key: "possiblyActivate",
                    value: function(e) {
                        var t = this,
                            i = this.activationDelay();
                        i ? this.timeoutId = setTimeout(function() {
                            t.possiblyActivate(e)
                        }, i) : this.activate(e)
                    }
                }, {
                    key: "activationDelay",
                    value: function() {
                        function e(e, t) {
                            return (t.y - e.y) / (t.x - e.x)
                        }
                        if (!this.activeRow || !$(this.activeRow).is(this.options.submenuSelector)) return 0;
                        var t = this.$menu.offset(),
                            i = {
                                x: t.left,
                                y: t.top - this.options.tolerance
                            },
                            n = {
                                x: t.left + this.$menu.outerWidth(),
                                y: i.y
                            },
                            a = {
                                x: t.left,
                                y: t.top + this.$menu.outerHeight() + this.options.tolerance
                            },
                            s = {
                                x: t.left + this.$menu.outerWidth(),
                                y: a.y
                            },
                            o = this.mouseLocs[this.mouseLocs.length - 1],
                            r = this.mouseLocs[0];
                        if (!o) return 0;
                        if (r || (r = o), r.x < t.left || r.x > s.x || r.y < t.top || r.y > s.y) return 100;
                        if (this.lastDelayLoc && o.x == this.lastDelayLoc.x && o.y == this.lastDelayLoc.y) return 0;
                        var l = n,
                            u = s;
                        "left" == this.options.submenuDirection ? (l = a, u = i) : "below" == this.options.submenuDirection ? (l = s, u = a) : "above" == this.options.submenuDirection && (l = i, u = n);
                        var c = e(o, l),
                            d = e(o, u),
                            h = e(r, l),
                            p = e(r, u);
                        return c < h && d > p ? (this.lastDelayLoc = o, this.DELAY) : (this.lastDelayLoc = null, 0)
                    }
                }]), e
            }();
        i["default"] = s
    }, {}],
    10: [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = function() {
            return $.ajax({
                url: window.IHERB_MYACCOUNT_HOST + "/myaccount/HasUnreadMessages",
                type: "GET",
                data: {
                    isAjax: !0
                },
                xhrFields: {
                    withCredentials: !0
                },
                cache: !1
            })
        };
        i["default"] = {
            getUnreadMessagesCount: n
        }
    }, {}],
    11: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./message-center"),
            r = n(o),
            l = e("./utilities"),
            u = n(l),
            c = function() {
                function e() {
                    a(this, e), this._cacheDOM(), this._bindEvents()
                }
                return s(e, [{
                    key: "_cacheDOM",
                    value: function() {
                        this.$button = $(".my-account-button"), this.$menu = $(".my-account-menu"), this.isLoggedIn = !!u["default"].getCookie("ihr-usr").length, this.$messageCounter = $(".message-counter")
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        var e = this;
                        this.$button.on("mouseenter touchstart", this.showMenu.bind(this)), this.$menu.on("mouseenter", function() {
                            clearTimeout(e.timer)
                        }), this.$menu.on("mouseleave", this.hideMenu.bind(this)), this.$button.on("mouseleave", this.hideMenu.bind(this)), $(".account-icon").on("click", function() {
                            e.$menu.fadeToggle()
                        })
                    }
                }, {
                    key: "showMenu",
                    value: function(e) {
                        clearTimeout(this.timer), this.$menu.show(), this.getUnreadMessagesCount()
                    }
                }, {
                    key: "hideMenu",
                    value: function(e) {
                        var t = this;
                        clearTimeout(this.timer), this.timer = setTimeout(function() {
                            t.$menu.hide()
                        }, 500)
                    }
                }, {
                    key: "getUnreadMessagesCount",
                    value: function() {
                        var e = this;
                        this.isLoggedIn && null == this.messageCountCached && r["default"].getUnreadMessagesCount().then(function(t) {
                            e.messageCount = t, e.$messageCounter.text(t)
                        }).always(function() {
                            e.messageCountCached = !0
                        })
                    }
                }]), e
            }();
        i["default"] = c
    }, {
        "./message-center": 10,
        "./utilities": 20
    }],
    12: [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = function() {
            String.prototype.includes || (String.prototype.includes = function(e, t) {
                return "number" != typeof t && (t = 0), !(t + e.length > this.length) && this.indexOf(e, t) !== -1
            })
        };
        i["default"] = {
            includesPolyfill: n
        }
    }, {}],
    13: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("../modules/utilities"),
            r = n(o),
            l = function() {
                function e(t, i, n) {
                    var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : function() {},
                        o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 300;
                    a(this, e), this.$element = $(t), this.$scrollPastElement = $(i), this._actionType = n || "fixed", this.callback = s, this.delay = o, this._threshold = 0, this.$window = $(window), this._init()
                }
                return s(e, [{
                    key: "_init",
                    value: function() {
                        this._elementsExist() && (this._setThreshold(), this._setEventType(), $(window).on("touchmove scroll load", r["default"].throttle(this._event, this.delay).bind(this)))
                    }
                }, {
                    key: "_setThreshold",
                    value: function() {
                        this._threshold = this.$scrollPastElement.offset().top + this.$scrollPastElement.outerHeight()
                    }
                }, {
                    key: "_setEventType",
                    value: function() {
                        switch (this._actionType) {
                            case "fixed":
                                this._event = this._eventFixed;
                                break;
                            case "show":
                                this._event = this._eventShow;
                                break;
                            case "hide":
                                this._event = this._eventHide;
                                break;
                            case "slide":
                                this._event = this._eventSlide
                        }
                    }
                }, {
                    key: "_elementsExist",
                    value: function() {
                        return this.$element.length && this.$scrollPastElement.length
                    }
                }, {
                    key: "_isScrolledPast",
                    value: function() {
                        return this.$window.scrollTop() >= this._threshold
                    }
                }, {
                    key: "_eventFixed",
                    value: function() {
                        var e = this._isScrolledPast();
                        this.$element.toggleClass("fixed", e)
                    }
                }, {
                    key: "_eventShow",
                    value: function() {
                        var e = this._isScrolledPast();
                        this._toggle(e)
                    }
                }, {
                    key: "_eventHide",
                    value: function() {
                        var e = this._isScrolledPast();
                        this._toggle(!e)
                    }
                }, {
                    key: "_eventSlide",
                    value: function(e) {
                        var t = this._isScrolledPast();
                        this.$element.toggleClass("fixed", t), this.callback(t)
                    }
                }, {
                    key: "_toggle",
                    value: function(e) {
                        this.$element.toggle(e)
                    }
                }]), e
            }();
        i["default"] = l
    }, {
        "../modules/utilities": 20
    }],
    14: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./utilities"),
            r = n(o),
            l = e("./share-social"),
            u = n(l),
            c = function() {
                function e() {
                    a(this, e), this.init()
                }
                return s(e, [{
                    key: "init",
                    value: function() {
                        this._cacheDom(), this._bindEvents(), this._setRewardCode(), this._checkRedirect(), this._isUserLoggedIn()
                    }
                }, {
                    key: "_cacheDom",
                    value: function() {
                        this.$shareWrapper = $(".share-wrapper:first"), this.$shareInput = $("#share-url"), this.$rewardCode = $("#welcomeName").data("share-code") || $("#share-code").data("share-code") || "", this.$redirectKey = $("share-redirect"), this.alertKey = "alert-signin-message", this.$alertSignIn = $(".alert-signed-in"), this.isLoggedIn = $("#welcomeName").attr("value") || "true" === $('[name="isLoggedIn"]').val(), this.longUrl, this.shortUrl
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        $(".share-page").click(this._toggleSharePage.bind(this)), $(".share-close, #transBG").click(this._closeSharePage.bind(this)), $(".check-shorturl :checkbox").change(this._toggleCheckBox.bind(this)), $(".copy-link").click(this.copyButton.bind(this)), $(".share-facebook").click(this.shareFaceBook.bind(this)), $(".share-twitter").click(this.shareTwitter.bind(this)), $(".share-googleplus").click(this.shareGooglePlus.bind(this)), $(".share-pinterest").click(this.sharePinterest.bind(this)), $(".share-weibo").click(this.shareWeibo.bind(this)), $(".share-qzone").click(this.shareQZone.bind(this)), $(".share-qq").click(this.shareQQ.bind(this)), $(".share-douban").click(this.shareDouban.bind(this)), $(".share-naver").click(this.shareNaver.bind(this)), $(".share-vk").click(this.shareVk.bind(this)), $(".share-ok").click(this.shareOk.bind(this)), $(".share-sign-in a:first-child").click(this._setRedirectKey.bind(this)), $(".show-hide-pw").click(this._hidePassword), this.$shareWrapper.on("click", function(e) {
                            e.stopPropagation()
                        })
                    }
                }, {
                    key: "_isUserLoggedIn",
                    value: function() {
                        var e = $("#welcomeName").data("share-code"),
                            t = $("#welcomeName").attr("value") || $(".iherb-header-account-name").text().trim();
                        t && ($(".not-signed-in").hide(), $(".signed-in").show()), e && e.length > 0 && $(".copy-share-text .coupon-code").text(e)
                    }
                }, {
                    key: "_hidePassword",
                    value: function() {
                        $(this).find("i").toggleClass("hide"), $("#" + $(this).data("id")).prop("type", function(e, t) {
                            return "password" == t ? "text" : "password"
                        })
                    }
                }, {
                    key: "_setRewardCode",
                    value: function() {
                        var e = window.location.href;
                        0 !== this.$rewardCode.length ? this.longUrl = e.indexOf("?") > -1 ? e + "&rcode=" + this.$rewardCode : e + "?rcode=" + this.$rewardCode : this.longUrl = e, this.shortUrl = encodeURIComponent(this.longUrl)
                    }
                }, {
                    key: "shareFaceBook",
                    value: function() {
                        var e = $(".preloaded-text").data("facebook-message") || "";
                        u["default"].shareFacebook(decodeURIComponent(this.shortUrl), e)
                    }
                }, {
                    key: "shareTwitter",
                    value: function() {
                        var e = {
                            url: this.shortUrl,
                            text: $(".preloaded-text").data("twitter-message") || "",
                            via: "iherb"
                        };
                        u["default"].shareTwitter(e)
                    }
                }, {
                    key: "shareGooglePlus",
                    value: function() {
                        var e = {
                            url: this.shortUrl,
                            prefilltext: $(".preloaded-text").data("google-message") || ""
                        };
                        u["default"].shareGooglePlus(e)
                    }
                }, {
                    key: "sharePinterest",
                    value: function() {
                        var e = $("#iherb-product-image").attr("src") || $(".product-inner a > img:first").attr("src"),
                            t = {
                                media: e,
                                description: $(".preloaded-text").data("pinterest-message") || "",
                                url: this.shortUrl
                            };
                        u["default"].sharePinterest(t)
                    }
                }, {
                    key: "shareWeibo",
                    value: function() {
                        var e = {
                            url: this.shortUrl,
                            language: "zh",
                            title: $(".preloaded-text").data("weibo-message") || "",
                            pic: null,
                            appkey: "",
                            ralateUid: 3181420415
                        };
                        u["default"].shareWeibo(e)
                    }
                }, {
                    key: "shareQZone",
                    value: function() {
                        var e = {
                            url: this.shortUrl,
                            title: "分享标题",
                            pics: null,
                            summary: "分享描述(分享窗口中默认的文字内容)",
                            desc: $(".preloaded-text").data("qzone-message") || ""
                        };
                        u["default"].shareQzone(e)
                    }
                }, {
                    key: "shareQQ",
                    value: function() {
                        var e = {
                            url: this.shortUrl,
                            title: "分享标题",
                            pics: null,
                            summary: "分享描述(分享窗口中默认的文字内容)",
                            site: "网站名称",
                            desc: $(".preloaded-text").data("qq-message") || ""
                        };
                        u["default"].shareQQ(e)
                    }
                }, {
                    key: "shareDouban",
                    value: function() {
                        var e = {
                            href: this.shortUrl,
                            image: null,
                            name: " 分享标题",
                            text: $(".preloaded-text").data("douban-message") || ""
                        };
                        u["default"].shareDouban(e)
                    }
                }, {
                    key: "shareNaver",
                    value: function() {
                        var e = {
                            url: this.shortUrl,
                            title: $(".preloaded-text").data("naver-message") || ""
                        };
                        u["default"].shareNaver(e)
                    }
                }, {
                    key: "shareVk",
                    value: function() {
                        var e = {
                            url: this.shortUrl
                        };
                        u["default"].shareVk(e)
                    }
                }, {
                    key: "shareOk",
                    value: function() {
                        var e = {
                            "st.cmd": "addShare",
                            "st._surl": this.shortUrl,
                            "st.title": $(".preloaded-text").data("ok-message") || ""
                        };
                        u["default"].shareOk(e)
                    }
                }, {
                    key: "copyButton",
                    value: function() {
                        this.$shareInput.select(), document.execCommand("copy")
                    }
                }, {
                    key: "_toggleCheckBox",
                    value: function(e) {
                        var t = $(e.target);
                        t.is(":checked") ? this.$shareInput.val(this.shortUrl) : this.$shareInput.val(this.longUrl)
                    }
                }, {
                    key: "_toggleSharePage",
                    value: function(e) {
                        var t = this;
                        e && e.stopPropagation(), this._shortenerAjax(), this.$shareInput.val(this.longUrl), this.$shareWrapper.show(), this._toggleAlertSignIn();
                        var i = function n() {
                            $(document).one("click", function(e) {
                                e.originalEvent ? t.$shareWrapper.hide() : n()
                            })
                        };
                        i()
                    }
                }, {
                    key: "_toggleAlertSignIn",
                    value: function() {
                        var e = this,
                            t = r["default"].quickStorage.get(this.alertKey);
                        this.isLoggedIn && (t ? this.$alertSignIn.delay(2e3).fadeOut(1e3, function() {
                            e.$alertSignIn.remove()
                        }) : this.$alertSignIn.hide()), r["default"].quickStorage.clear(this.alertKey), r["default"].quickStorage.set(this.alertKey, !1)
                    }
                }, {
                    key: "_closeSharePage",
                    value: function() {
                        this.$shareWrapper.hide(), $(".check-shorturl :checkbox").attr("checked", !1)
                    }
                }, {
                    key: "_shortenerAjax",
                    value: function() {
                        $(".shorten input");
                        $.ajax({
                            type: "GET",
                            url: "/Catalog/ShortenUrl/?url=" + this.longUrl,
                            cache: !1
                        }).done(function(e) {
                            this.shortUrl = e.shortUrl
                        }.bind(this))
                    }
                }, {
                    key: "_checkRedirect",
                    value: function() {
                        var e = r["default"].quickStorage.get(this.$redirectKey);
                        e && this._toggleSharePage(), r["default"].quickStorage.clear(this.$redirectKey)
                    }
                }, {
                    key: "_setRedirectKey",
                    value: function() {
                        r["default"].quickStorage.set(this.$redirectKey, !0), r["default"].quickStorage.set(this.alertKey, !0)
                    }
                }]), e
            }();
        i["default"] = c
    }, {
        "./share-social": 15,
        "./utilities": 20
    }],
    15: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("./constants"),
            s = n(a),
            o = "http://s.images-iherb.com/i/images/share-image-default.png",
            r = function(e, t) {
                FB.ui({
                    method: "share",
                    href: e,
                    quote: t,
                    display: "popup"
                }, function(e) {})
            },
            l = function(e) {
                var t = w(s["default"].api.twitter, e);
                return y(t)
            },
            u = function(e) {
                var t = w(s["default"].api.googlePlus, e);
                return y(t)
            },
            c = function(e) {
                null == e.media && (e.media = o);
                var t = w(s["default"].api.pinterest, e);
                return y(t)
            },
            d = function(e) {
                null == e.pic && (e.pic = o);
                var t = w(s["default"].api.weibo, e);
                return window.open(t)
            },
            h = function(e) {
                null == e.pics && (e.pics = o);
                var t = w(s["default"].api.qzone, e);
                return y(t)
            },
            p = function(e) {
                null == e.pics && (e.pics = o);
                var t = w(s["default"].api.qq, e);
                return y(t)
            },
            f = function(e) {
                null == e.image && (e.image = o);
                var t = w(s["default"].api.douban, e);
                return window.open(t)
            },
            g = function(e) {
                var t = w(s["default"].api.naver, e);
                return y(t)
            },
            v = function(e) {
                var t = w(s["default"].api.vk, e);
                return y(t)
            },
            m = function(e) {
                var t = w(s["default"].api.ok, e);
                return y(t)
            },
            w = function(e, t) {
                var i = [],
                    n = void 0;
                for (var a in t) t.hasOwnProperty(a) && i.push(a + "=" + t[a]);
                return n = i.join("&"), e.indexOf("?") == -1 ? e + "?" + n : e + n
            },
            y = function(e) {
                var t = void 0 != window.screenLeft ? window.screenLeft : screen.left,
                    i = void 0 != window.screenTop ? window.screenTop : screen.top,
                    n = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
                    a = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
                    s = n / 2 - 313 + t,
                    o = a / 2 - 218 + i;
                window.open(e, "Sharing", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=626, height=436, top=" + o + ", left=" + s)
            };
        i["default"] = {
            shareFacebook: r,
            shareTwitter: l,
            shareGooglePlus: u,
            sharePinterest: c,
            shareWeibo: d,
            shareQzone: h,
            shareQQ: p,
            shareDouban: f,
            shareNaver: g,
            shareVk: v,
            shareOk: m
        }
    }, {
        "./constants": 5
    }],
    16: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e
        }

        function s(e) {
            if (Array.isArray(e)) {
                for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
                return i
            }
            return Array.from(e)
        }

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
                }
                return e
            },
            l = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            u = e("./utilities"),
            c = n(u),
            d = function() {
                function e() {
                    o(this, e), this._cacheDom(), this._bindEvents(), this._renderSearchHistory(this._buildSearchHistory(this._getSearchHistory()), this._checkTrendingKeywords()), this.countryCode = window.COUNTRY_CODE, this.searchHistorySize = "CN" === this.countryCode ? 5 : 4
                }
                return l(e, [{
                    key: "_cacheDom",
                    value: function() {
                        this.$searchField = $("#txtSearch"), this.$quickLinksContainer = $("#quick-links-container"), this.$quickLinksWrapper = $("#quick-links-wrapper"), this.$trendingLinksWrapper = $("#trending-links-wrapper"), this.$searchHistoryEle = $("#search-history-wrapper")
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        var e = this;
                        $(document).on("click touchstart", function(t) {
                            0 == $(t.target).closest("#searchForm").length ? e.$quickLinksContainer.hide() : e._renderSearchHistory(e._buildSearchHistory(e._getSearchHistory()), e._checkTrendingKeywords())
                        }), this.$searchHistoryEle.on("click", ".search-history-clear", function() {
                            e._clearSearchHistory()
                        }), this.$searchField.on("keyup", c["default"].debounce(function(t) {
                            e._eventHandling(t)
                        }, 100)), this.$searchField.on("focus keyup", function(t) {
                            var i = $(t.target);
                            i.val() ? e.$quickLinksContainer.hide() : (e.$quickLinksContainer.show(), e._resize(i))
                        }), $(window).on("resize", c["default"].throttle(function() {
                            return e._resize(e.$searchField.filter(":visible"))
                        }, 200))
                    }
                }, {
                    key: "_resize",
                    value: function(e) {
                        var t = $(window).width();
                        t >= 1200 && this.$quickLinksContainer.outerWidth(e.outerWidth())
                    }
                }, {
                    key: "_eventHandling",
                    value: function(e) {
                        var t = e.keyCode;
                        switch (t) {
                            case 27:
                                this.$quickLinksContainer.hide(), $(e.target).blur()
                        }
                    }
                }, {
                    key: "_clearSearchHistory",
                    value: function() {
                        c["default"].setCookie("ih-site-search-hist", null, new Date(0)), this._renderSearchHistory(null, this._checkTrendingKeywords())
                    }
                }, {
                    key: "_renderSearchHistory",
                    value: function(e, t) {
                        e && e.length && t ? (this.$searchHistoryEle.removeClass("col-xs-12").addClass("col-xs-8").find(".results-container").html(e).show(), this.$trendingLinksWrapper.removeClass("col-xs-12").addClass("col-xs-8").show(), this.$quickLinksWrapper.removeClass("col-xs-12").removeClass("col-xs-24").addClass("col-xs-8")) : e && e.length && 0 == t ? (this.$searchHistoryEle.removeClass("col-xs-8").addClass("col-xs-12").find(".results-container").html(e).show(), this.$trendingLinksWrapper.hide(), this.$quickLinksWrapper.removeClass("col-xs-8").removeClass("col-xs-24").addClass("col-xs-12")) : 1 == t ? (this.$searchHistoryEle.hide(), this.$trendingLinksWrapper.removeClass("col-xs-8").addClass("col-xs-12").show(), this.$quickLinksWrapper.removeClass("col-xs-8").addClass("col-xs-12")) : 0 == t && (this.$searchHistoryEle.hide(), this.$trendingLinksWrapper.hide(), this.$quickLinksWrapper.removeClass("col-xs-8").removeClass("col-xs-12").addClass("col-xs-24"))
                    }
                }, {
                    key: "_checkTrendingKeywords",
                    value: function() {
                        var e = [];
                        return this.$trendingLinksWrapper.find(".keyword").each(function(t, i) {
                            var n = i.textContent.replace(/\s/g, "");
                            n && e.push(n)
                        }), e.length > 0
                    }
                }, {
                    key: "_buildSearchHistory",
                    value: function(e) {
                        var t = this;
                        return e.map(function(e) {
                            return t._buildSearchItem(e)
                        })
                    }
                }, {
                    key: "_buildSearchItem",
                    value: function(e) {
                        var t = e.searchTerm,
                            i = (e.type, e.rank),
                            n = (e.title, e.keyword),
                            a = e.brandCategoryURL,
                            s = e.searchKeyword,
                            o = a ? "/" + encodeURIComponent(a) : s ? "/search?kw=" + s : "/search?sug=" + encodeURIComponent(t) + "&kw=" + encodeURIComponent(n) + "&rank=" + (i.toString() + 1),
                            r = $("<div>").text(decodeURIComponent(t)).html();
                        return "<li data-history-url=" + o + ">\n                    <div>\n                        " + r + "\n                    </div>\n                </li>"
                    }
                }, {
                    key: "storeSearchHistory",
                    value: function(e) {
                        var t = this._getSearchHistory();
                        e.searchTerm = encodeURIComponent(e.searchTerm.trim()), e.searchKeyword = encodeURIComponent(e.searchKeyword.trim().split(" ").join("+")), e.searchTerm && e.searchKeyword && (t = [e].concat(s(t)).filter(this._filterEmpty).slice(0, this.searchHistorySize), t = this._removeDuplicates(t, "searchTerm"), c["default"].setCookie("ih-site-search-hist", JSON.stringify(t)))
                    }
                }, {
                    key: "_removeDuplicates",
                    value: function(e, t) {
                        var i = e.reduce(function(e, i) {
                                return r({}, e, a({}, decodeURIComponent(i[t]).trim(), i))
                            }, {}),
                            n = Object.keys(i).map(function(e) {
                                return i[e]
                            });
                        return n
                    }
                }, {
                    key: "_getSearchHistory",
                    value: function() {
                        var e = c["default"].getCookie("ih-site-search-hist");
                        return e = e ? JSON.parse(e) : [], this._cleanEmpty(e), e = this._removeDuplicates(e, "searchTerm")
                    }
                }, {
                    key: "_cleanEmpty",
                    value: function(e) {
                        return e.filter(function(e) {
                            return !!e.searchTerm && !!e.searchKeyword
                        })
                    }
                }, {
                    key: "_filterEmpty",
                    value: function(e) {
                        return void 0 != e && "" != e
                    }
                }]), e
            }();
        i["default"] = d
    }, {
        "./utilities": 20
    }],
    17: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./utilities"),
            r = n(o),
            l = e("./site-search-history"),
            u = n(l),
            c = function() {
                function e() {
                    a(this, e), this._cacheDom(), this._bindEvents(), window.iHerbSearchCompletion = this.iHerbSearchCompletion.bind(this), this.siteSearchHistory = new u["default"]
                }
                return s(e, [{
                    key: "_cacheDom",
                    value: function() {
                        this.$searchForm = $("#searchForm"), this.$searchField = $("#txtSearch"), this.$sugElement = $("#sug-results"), this.$country = this.$sugElement.data("sug-country"), this.position = -1
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        var e = this;
                        this.$searchForm.on("submit", function(t) {
                            if (e.$searchField.val().trim()) {
                                var i = $("#sug-results .active");
                                e.siteSearchHistory.storeSearchHistory({
                                    searchTerm: e.$searchField.val(),
                                    searchKeyword: e.$searchField.val()
                                }), i.length > 0 && t.preventDefault(), e._sanitizeSpaces(e.$searchField), e._submitSelection(t, i)
                            } else t.preventDefault()
                        }), this.$searchField.on("keyup", r["default"].debounce(function(t) {
                            var i = $(t.target);
                            e.$searchField.val(i.val()), e._eventHandling(t)
                        }, 100)), $(document).on("click", ".results-container div", function(t) {
                            e._submitSelection(t)
                        }), $(document).on("click touchstart", function(t) {
                            0 == $(t.target).closest("#searchForm").length && e.$sugElement.hide()
                        }), this.$searchField.on("focus", function(t) {
                            var i = $(t.target);
                            $("#sug-results > .wrapper").length > 0 && i.val().length && e.$sugElement.show()
                        })
                    }
                }, {
                    key: "_sanitizeSpaces",
                    value: function(e) {
                        var t = e.val();
                        e.val(t.trim())
                    }
                }, {
                    key: "_eventHandling",
                    value: function(e) {
                        var t = $(e.target).val(),
                            i = e.keyCode;
                        switch (i) {
                            case 27:
                                this.$sugElement.hide(), $(e.target).blur();
                                break;
                            case 40:
                                this.position++, this._setFocusByKeyPress();
                                break;
                            case 38:
                                this.position--, this._setFocusByKeyPress();
                                break;
                            case 37:
                            case 39:
                            case 16:
                            case 18:
                            case 9:
                                e.preventDefault();
                                break;
                            case 13:
                                this.$sugElement.hide();
                                break;
                            default:
                                this.position = -1, this._getSugResults(t)
                        }
                    }
                }, {
                    key: "_setFocusByKeyPress",
                    value: function() {
                        var e = this.$sugElement.find("li:visible").not(".suggested-products");
                        e.removeClass("active"), this.position <= -1 ? this.position = e.length - 1 : this.position == e.length && (this.position = 0), $(e[this.position]).addClass("active"), this.$searchField.val($.trim($(e[this.position]).text()))
                    }
                }, {
                    key: "_getSugResults",
                    value: function(e) {
                        var t = this._setSugApi() + "?kw=" + encodeURIComponent(e) + "&countrycode=" + encodeURIComponent(COUNTRY_CODE.toLowerCase()),
                            i = void 0,
                            n = $("#sug-results");
                        this.keyword = e, 0 == e.length ? n.hide() : i = $.getScript(t)
                    }
                }, {
                    key: "_setSugApi",
                    value: function() {
                        var e = document.location.protocol;
                        var hostname = document.location.hostname;
                        var port = document.location.port;
                        return "CN" == this.$country ? e + "//" + hostname + ":" + port + "/sug/" : e + "//" + hostname + ":" + port + "/sug/";
                    }
                }, {
                    key: "_submitSelection",
                    value: function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                            i = t.length > 0 ? t : $(e.target).is("li") ? $(e.target) : $(e.target).closest("li"),
                            n = this.$searchForm.attr("action"),
                            a = i.text().trim(),
                            s = i.data("rank"),
                            o = i.data("type"),
                            r = i.data("url"),
                            l = i.data("history-url"),
                            u = this.$searchField.val().trim();
                        "keywords" == o || "general" == o ? (this.siteSearchHistory.storeSearchHistory({
                            searchTerm: a,
                            type: o,
                            rank: s,
                            searchKeyword: u
                        }), document.location = n + "?sug=" + encodeURIComponent(a) + "&kw=" + encodeURIComponent(u) + "&category=&brand=&page=1&pagesize=24" + "&rank=" + (s.toString() + 1)) : r ? (this.siteSearchHistory.storeSearchHistory({
                            searchTerm: a,
                            searchKeyword: u,
                            brandCategoryURL: r
                        }), document.location = "/" + encodeURIComponent(r)) : l && (document.location = l)
                    }
                }, {
                    key: "iHerbSearchCompletion",
                    value: function(e) {
                        function t() {
                            i();
                            for (var e in d) {
                                if (null !== d[e] && d[e].length > 0) {
                                    var t = n(e, d[e]);
                                    u++, a.append(t)
                                }
                                if ("categories" == e || "brands" == e) {
                                    var c = n(e, d[e], !0);
                                    d[e].length > 0 && (l = !0, s.append(c))
                                }
                            }
                            0 !== r.length && (o.html(a).show(), l && (0 == $("#suggested-products-wrapper").length ? s.insertAfter("#keywords-wrapper") : s.insertBefore("#suggested-products-wrapper")))
                        }

                        function i() {
                            var e = 0;
                            for (var t in d) d[t].length > 0 && e++;
                            switch (e) {
                                case 1:
                                    c = ["col-xs-24"];
                                    break;
                                case 2:
                                    c = ["col-xs-18", "col-xs-6"];
                                    break;
                                case 3:
                                    c = ["col-xs-12", "col-xs-6", "col-xs-6"];
                                    break;
                                case 4:
                                    c = ["col-md-8 col-xs-12", "col-xs-5", "col-xs-5", "col-xs-6"];
                                    break;
                                default:
                                    o.hide(), a.hide()
                            }
                        }

                        function n(e, t) {
                            function i(e) {
                                return $("#sug-results").data("sug-" + e)
                            }

                            function n(e) {
                                return e.replace(/<\/?[^>]+>/gi, "")
                            }
                            var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                                s = t.length,
                                o = 0,
                                r = t.map(function(t) {
                                    return "<li data-type=" + e + " " + ("keywords" == e ? "data-rank=" + o++ + ' title="' + n(t) + '"' : "data-url=" + t[1] + ' title="' + t[0] + '"') + ' data-ga-event="click" data-ga-event-category="Ecommerce" data-ga-event-action="Internal Search Functionality" data-ga-event-label="Suggest Search:' + e + '">\n                            <div>\n                                ' + ("keywords" == e ? "" + t : "" + t[0]) + "\n                            </div>\n\n                        </li>"
                                }),
                                l = t.map(function(t) {
                                    return '<li class="suggested-products" title="' + t.dname + '" data-ga-event="click" data-ga-event-category="Ecommerce" data-ga-event-action="Internal Search Functionality" data-ga-event-label="Suggest Search:' + e + '">\n                            <div class="row">\n                                <div class="col-xs-7 text-center">\n                                    <img src="/media/r/' + t.img + '.jpg" class="suggested-image">\n                                </div>\n                                <div class="col-xs-17">\n                                    <a href="/' + t.url + '">\n                                        ' + t.dname + "\n                                    </a>\n                                </div>\n                            </div>\n                        </li>"
                                }),
                                d = '\n                    <div>\n                        <div class="wrapper-title">' + e + '</div>\n                        <ul class ="results-container">\n                            ' + r.filter(function(e, t) {
                                    return t <= 2
                                }).join("") + "\n                        </ul>\n                    </div>\n                ",
                                h = '\n            <div \n                id="' + e + '-wrapper" \n                class="column-results ' + c[u] + " " + ("categories" == e || "brands" == e ? "hidden-xs hidden-sm" : " ") + '">\n                        ' + (0 == s ? '<div class="hidden"></div>' : '<div class="wrapper-title">' + i(e) + "</div>") + '\n                        <ul class ="results-container">\n                            ' + ("suggested-products" == e ? l.filter(function(e, t) {
                                    return t <= 2
                                }).join("") : r.filter(function(e, t) {
                                    return t <= 4
                                }).join("")) + "\n                        </ul>\n                    </div>\n                ";
                            return 1 == a ? d : h
                        }
                        var a = $("<div class='wrapper row'></div>"),
                            s = $("<div id='tablet-wrapper' class='column-results col-xs-6 hidden-md hidden-lg hidden-xl'></div>"),
                            o = $("#sug-results"),
                            r = (o.data("sug-country"), this.keyword),
                            l = !1,
                            u = 0,
                            c = [],
                            d = void 0;
                        if (e) {
                            e = e.replace('"general":', '"keywords":'), e = e.replace('"products":', '"suggested-products":'), d = $.parseJSON(e);
                            for (var h in d) null == d[h] && delete d[h];
                            t.bind(this)()
                        }
                    }
                }]), e
            }();
        i["default"] = c
    }, {
        "./site-search-history": 16,
        "./utilities": 20
    }],
    18: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./utilities"),
            r = (n(o), e("./scroll-event")),
            l = n(r),
            u = e("./menu-dropdown-mousepath"),
            c = n(u),
            d = {
                categories: ["/c/supplements", "/c/herbs", "/c/bath-beauty", "/c/beauty-bath", "/c/food-grocery-items", "/c/children-s-health", "/c/sports-fitness-athletic", "/c/healthy-home", "/c/pets"],
                brands: "/BrandsAZ",
                conditions: "/info/links"
            },
            h = function() {
                function e() {
                    var t = this;
                    a(this, e);
                    new l["default"](".iherb-header", ".banner-alert", "slide", this._onScroll.bind(this), 100);
                    this.buttonTimer = null, this.CLOSE_DELAY = 300, this.OPEN_DELAY = 100, this._cacheDom(), this._initializeContainers(function() {
                        t._bindEvents(), t._setDefaultUI(), t._attachGA()
                    })
                }
                return s(e, [{
                    key: "_initializeContainers",
                    value: function(e) {
                        var t = window.LANGUAGE_CODE + "-sticky-header";
                        if (window.sessionStorage.getItem(t)) {
                            var i = window.sessionStorage.getItem(t);
                            $(".sticky-header-menu-navigation-containers").append(i), e && e()
                        } else $.ajax({
                            datatype: "html",
                            url: "/pro/sticky-header",
                            type: "POST",
                            success: function(i) {
                                window.sessionStorage.setItem(t, i), $(".sticky-header-menu-navigation-containers").append(i), e && e()
                            }
                        })
                    }
                }, {
                    key: "_cacheDom",
                    value: function() {
                        this.$overlay = $(".iherb-header-overlay"), this.$html = $("html"), this.$button = $(".iherb-header-navigation-dropdown"), this.$menu = $(".sticky-header-menu"), this.$menuSpecials = $(".iherb-header-menu.iherb-header-menu-specials"), this.$categories = this.$menu.find(".sticky-header-menu-categories"), this.$categoriesList = this.$categories.find(".sticky-header-menu-categories-list"), this.$categoriesListItems = this.$categoriesList.find(".sticky-header-menu-categories-list-item"), this.$categoriesListItemBrands = this.$categoriesListItems.eq(0), this.$categoriesListItemSupplements = this.$categoriesListItems.eq(1), this.$categoriesListItemConditions = this.$categoriesListItems.eq(-1), this.$navigation = this.$menu.find(".sticky-header-menu-navigation"), this.$navigationFooter = this.$navigation.find(".sticky-header-menu-navigation-footer"), this.$quickLinks = $("#quick-links-container"), this.$suggestions = $("#sug-results"), this.$overlay = $(".iherb-header-overlay"), this.$navigationTitle = this.$navigation.find(".sticky-header-menu-navigation-title a").eq(0), this.$navigationAZ = this.$navigation.find(".sticky-header-menu-navigation-a-z"), this.$navigationViewAll = this.$navigation.find(".sticky-header-menu-navigation-title a").eq(1), this.$searchQuickLinks = $("#quick-links-container"), this.$searchSuggestions = $("#sug-results")
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        var e = this;
                        this.$button.on("mouseenter touchstart", function(t) {
                            var i = $(t.currentTarget);
                            t.stopPropagation(), "touchstart" === t.type ? (i.hasClass("active") ? (e.closeMenu(), e.$button.removeClass("active")) : (e.openMenu(i), e.$button.removeClass("active"), i.addClass("active")), $(document).one("touchstart", function() {
                                e.$button.removeClass("active"), e.closeMenu()
                            })) : (clearTimeout(e.buttonTimer), e.buttonTimer = setTimeout(function() {
                                e.$button.removeClass("active"), i.addClass("active"), e.openMenu(i)
                            }, e.OPEN_DELAY))
                        }), this.$button.on("mouseleave", function() {
                            clearTimeout(e.buttonTimer), e.buttonTimer = setTimeout(function() {
                                e.$button.removeClass("active"), e.closeMenu()
                            }, e.CLOSE_DELAY)
                        }), this.$menu.on("touchstart", function(e) {
                            e.stopPropagation()
                        }), this.$menu.on("mouseenter", function() {
                            clearTimeout(e.buttonTimer)
                        }), this.$menu.on("mouseleave", function() {
                            clearTimeout(e.buttonTimer), e.buttonTimer = setTimeout(function() {
                                e.closeMenu(), e.$button.removeClass("active")
                            }, e.CLOSE_DELAY)
                        }), this.$categoriesList.on("click touchstart", "a", function(t) {
                            var i = $(t.currentTarget);
                            if ("touchstart" === t.type) {
                                var n = i.data("has-click");
                                n || (t.preventDefault(), e.mousePath.activate(i.parent()), e.$categoriesList.find("a").data("has-click", null), i.data("has-click", !0))
                            }
                        }), this.mousePath = new c["default"](this.$categoriesList, {
                            activate: this.activateSubmenu.bind(this),
                            deactivate: this.deactivateSubmenu.bind(this),
                            submenuDirection: $("html").is("[dir=rtl]") ? "left" : "right"
                        })
                    }
                }, {
                    key: "_setDefaultUI",
                    value: function() {
                        this.$categoriesListItemBrands.hide(), this.$categoriesListItemConditions.hide(), this.deactivateSubmenu()
                    }
                }, {
                    key: "_attachGA",
                    value: function() {
                        $.each(this.$categoriesListItems, function(e, t) {
                            var i = $(t),
                                n = i.find("a"),
                                a = i.find("a").attr("href");
                            a = a.substring(a.lastIndexOf("/") + 1).toLowerCase(), n.attr("data-ga-event", "click"), n.attr("data-ga-event-category", "Ecommerce"), n.attr("data-ga-event-label", a), n.attr("data-ga-event-action", a)
                        }), $.each(this.$categoriesListItems, function(e, t) {
                            var i = $(t),
                                n = i.data("sticky-header-menu-category"),
                                a = i.find("a").attr("href").toLowerCase();
                            a = a === d.conditions ? "conditions" : a.substring(a.lastIndexOf("/") + 1);
                            var s = $(".sticky-header-menu-navigation-container").filter('[data-sticky-header-menu-category="' + n + '"]'),
                                o = s.find("a");
                            $.each(o, function(e, t) {
                                var i = $(t),
                                    n = i.attr("href");
                                n = n.substring(n.lastIndexOf("/") + 1).toLowerCase(), i.attr("data-ga-event", "click"), i.attr("data-ga-event-category", "Ecommerce"), i.attr("data-ga-event-label", n), i.attr("data-ga-event-action", a)
                            })
                        })
                    }
                }, {
                    key: "_onScroll",
                    value: function(e) {
                        this.$searchQuickLinks.hide(), this.$searchSuggestions.hide(), this.$html.toggleClass("has-sticky-header", e)
                    }
                }, {
                    key: "closeMenu",
                    value: function() {
                        this.$menu.removeClass("active"), this.$menuSpecials.hide(), this.$overlay.addClass("hide")
                    }
                }, {
                    key: "openMenu",
                    value: function(e) {
                        if (this.menuType = e.data("iherb-header-navigation-dropdown"), "specials" === this.menuType) this.$menu.removeClass("active"), this.$menuSpecials.show();
                        else {
                            switch (this.$menuSpecials.hide(), "categories" === this.menuType ? this.$categories.show() : this.$categories.hide(), "categories" === this.menuType ? (this.$navigation.removeClass("col-xs-24").addClass("col-xs-18 col-lg-20"), this.$navigation.css("border-radius", "0px 0px 10px 0px")) : (this.$navigation.removeClass("col-xs-18 col-lg-20").addClass("col-xs-24"), this.$navigation.css("border-radius", "0px 0px 10px 10px")), "conditions" === this.menuType ? this.$navigationFooter.show() : this.$navigationFooter.hide(), this.menuType) {
                                case "categories":
                                    this.$selectedCategory ? this.$selectedCategory.trigger("click", [!1]) : this.$categoriesListItemSupplements.trigger("click", [!1]);
                                    break;
                                case "brands":
                                    this.$categoriesListItemBrands.trigger("click", [!1]);
                                    break;
                                case "conditions":
                                    this.$categoriesListItemConditions.trigger("click", [!1])
                            }
                            this.$menu.addClass("active")
                        }
                        this.$overlay.removeClass("hide")
                    }
                }, {
                    key: "deactivateSubmenu",
                    value: function() {
                        this.$menu.removeClass("is-brands is-category"), $(".sticky-header-menu-navigation-container").removeClass("active"), this.$categoriesListItems.removeClass("active")
                    }
                }, {
                    key: "activateSubmenu",
                    value: function(e) {
                        var t = $(e),
                            i = t.data("sticky-header-menu-category"),
                            n = $(".sticky-header-menu-navigation-container").filter('[data-sticky-header-menu-category="' + i + '"]');
                        n.addClass("active"), t.addClass("active"), this.$navigationAZ.hide(), "categories" === this.menuType && (this.$menu.addClass("is-category"), this.$selectedCategory = t), "brands" === this.menuType && (this.$navigationAZ.show(), this.$menu.addClass("is-brands")), this.setNavigationTitle(t, i)
                    }
                }, {
                    key: "setNavigationTitle",
                    value: function(e, t) {
                        this.$navigationTitle.text(e.text().trim()), "categories" === this.menuType ? this.$navigationTitle.attr("href", d.categories[t - 1]) : this.$navigationTitle.attr("href", d[this.menuType]);
                        var i = this.$navigationTitle.attr("href").toLowerCase();
                        i = i === d.conditions ? "conditions" : i.substring(i.lastIndexOf("/") + 1), this.$navigationTitle.attr("data-ga-event", "click"), this.$navigationTitle.attr("data-ga-event-category", "Ecommerce"), this.$navigationTitle.attr("data-ga-event-label", i), this.$navigationTitle.attr("data-ga-event-action", i)
                    }
                }]), e
            }();
        i["default"] = h
    }, {
        "./menu-dropdown-mousepath": 9,
        "./scroll-event": 13,
        "./utilities": 20
    }],
    19: [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = function() {
            var e = !1;
            return function(t) {
                (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0)
            }(navigator.userAgent || navigator.vendor || window.opera), e
        };
        i["default"] = {
            mobileTabletCheck: n
        }
    }, {}],
    20: [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            a = $("html"),
            s = function(e) {
                var t = e.split(" ").map(function(e) {
                    return $.inArray(e, a.attr("class").split(" ")) > -1
                });
                return t
            },
            o = function(e) {
                return s(e).some(function(e) {
                    return e === !0
                })
            },
            r = function(e) {
                return s(e).every(function(e) {
                    return e === !0
                })
            },
            l = {
                updateValue: function(e, t, i) {
                    var n = new RegExp("([?&])" + e + "=.*?(&|$)", "i"),
                        i = i || window.location.href,
                        a = i.indexOf("?") !== -1 ? "&" : "?";
                    return i.match(n) ? i.replace(n, "$1" + e + "=" + t + "$2") : i + a + e + "=" + t
                },
                removeKeyValuePair: function(e, t) {
                    var t = t || window.location.href;
                    return t.replace(new RegExp("[?&]" + e + "=[^&#]*(#.*)?$"), "$1").replace(new RegExp("([?&])" + e + "=[^&]*&"), "$1")
                },
                removeKeys: function(e) {
                    for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) i[n - 1] = arguments[n];
                    return i.forEach(function(t) {
                        e = e.replace(new RegExp("[?&]" + t + "=[^&#]*(#.*)?$"), "$1").replace(new RegExp("([?&])" + t + "=[^&]*&"), "$1")
                    }), e
                },
                getQueryValue: function(e) {
                    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                    var t = new RegExp("[\\?&]" + e + "=([^&#]*)"),
                        i = t.exec(location.search);
                    return null === i ? "" : decodeURIComponent(i[1].replace(/\+/g, " "))
                }
            },
            u = {
                set: function(e, t, i, a, s) {
                    if (!this.supportsLocalStorage() || "undefined" == typeof t || "" == e || "" == t) return !1;
                    var o = i ? sessionStorage : localStorage;
                    a && o.getItem(e) && (t = o.getItem(e) + "," + t), t = "number" == typeof s ? {
                        __data: t,
                        __expiry: Date.now() + 1e3 * parseInt(s)
                    } : {
                        __data: t,
                        __expiry: null
                    };
                    try {
                        return "object" === ("undefined" == typeof t ? "undefined" : n(t)) ? o.setItem(e, JSON.stringify(t)) : o.setItem(e, t), !0
                    } catch (r) {
                        return console.log("Unable to store " + e + " in storage due to " + r.name), !1
                    }
                },
                get: function(e) {
                    var t = null,
                        i = null,
                        n = null;
                    if (!this.supportsLocalStorage()) return null;
                    if (t = null, sessionStorage.getItem(e) ? t = sessionStorage.getItem(e) : localStorage.getItem(e) && (t = localStorage.getItem(e)), null == t) return null;
                    try {
                        var a = JSON.parse(t);
                        return a.hasOwnProperty("__expiry") ? (i = a.__expiry, n = Date.now(), null != i && n >= i ? (this.clear(e), null) : a.__data) : t
                    } catch (s) {
                        return t
                    }
                },
                clear: function(e) {
                    this.supportsLocalStorage() && (e ? (localStorage.removeItem(e), sessionStorage.removeItem(e)) : (localStorage.clear(), sessionStorage.clear()))
                },
                supportsLocalStorage: function() {
                    try {
                        return localStorage.setItem("_", "_"), localStorage.removeItem("_"), !0
                    } catch (e) {
                        return !1
                    }
                }
            },
            c = function(e, t, i) {
                var n, a, s, o = null,
                    r = 0,
                    l = Date.now || function() {
                        return (new Date).getTime()
                    };
                i || (i = {});
                var u = function() {
                    r = i.leading === !1 ? 0 : l(), o = null, s = e.apply(n, a), o || (n = a = null)
                };
                return function() {
                    var c = l();
                    r || i.leading !== !1 || (r = c);
                    var d = t - (c - r);
                    return n = this, a = arguments, d <= 0 || d > t ? (o && (clearTimeout(o), o = null), r = c, s = e.apply(n, a), o || (n = a = null)) : o || i.trailing === !1 || (o = setTimeout(u, d)), s
                }
            },
            d = function(e, t, i) {
                var n = void 0;
                return function() {
                    var a = this,
                        s = arguments,
                        o = function() {
                            n = null, i || e.apply(a, s)
                        },
                        r = i && !n;
                    clearTimeout(n), n = setTimeout(o, t), r && e.apply(a, s)
                }
            },
            h = function(e) {
                for (var t = e + "=", i = document.cookie.split(";"), n = 0; n < i.length; n++) {
                    for (var a = i[n];
                        " " == a.charAt(0);) a = a.substring(1);
                    if (0 === a.indexOf(t)) return a.substring(t.length, a.length)
                }
                return ""
            },
            p = function(e, t) {
                var i = "",
                    n = "",
                    a = !1;
                return a = document.cookie.match(new RegExp(e + "=([^;]+)")), a && (i = a[1]), i.split("&").forEach(function(e) {
                    var i = e.split("=");
                    i[0] === t && (n = i[1])
                }), n
            },
            f = function(e, t, i) {
                var n = location.hostname.split("."),
                    a = (n.shift(), n.join(".")),
                    s = "expires=;";
                if ("" !== i) {
                    var o = new Date;
                    o.setTime(o.getTime() + 24 * i * 60 * 60 * 1e3), s = "expires=" + o.toUTCString()
                }
                document.cookie = e + "=" + t + "; domain=" + a + "; path=/; " + s
            };
        i["default"] = {
            isPageAny: o,
            isPageAll: r,
            queryString: l,
            quickStorage: u,
            throttle: c,
            debounce: d,
            getCookieVal: p,
            getCookie: h,
            setCookie: f
        }
    }, {}],
    21: [function(e, t, i) {
        "use strict";
        e("../../HeaderFooter/Desktop/JS/index.js"), e("./catalog/pages/all-pages"), e("./catalog/pages/category-store"), e("./catalog/pages/doctor-murray"), e("./catalog/pages/home"), e("./catalog/pages/iherb-coupon"), e("./catalog/pages/info-links"), e("./catalog/pages/info"), e("./catalog/pages/apps-landing"), e("./catalog/pages/my-page"), e("./catalog/pages/product-details"), e("./catalog/pages/product-list"), e("./catalog/pages/product-reviews"), e("./catalog/pages/product-question"), e("./catalog/pages/product-answers"), e("./catalog/pages/top-sellers"), e("./catalog/pages/blog")
    }, {
        "../../HeaderFooter/Desktop/JS/index.js": 3,
        "./catalog/pages/all-pages": 74,
        "./catalog/pages/apps-landing": 75,
        "./catalog/pages/blog": 76,
        "./catalog/pages/category-store": 77,
        "./catalog/pages/doctor-murray": 78,
        "./catalog/pages/home": 79,
        "./catalog/pages/iherb-coupon": 80,
        "./catalog/pages/info": 82,
        "./catalog/pages/info-links": 81,
        "./catalog/pages/my-page": 83,
        "./catalog/pages/product-answers": 84,
        "./catalog/pages/product-details": 85,
        "./catalog/pages/product-list": 86,
        "./catalog/pages/product-question": 87,
        "./catalog/pages/product-reviews": 88,
        "./catalog/pages/top-sellers": 89
    }],
    22: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.componentConfirmationPopup = i.componentSubmitSuccess = i.componentBackToProductDetails = i.componentPostedBy = i.componentPagingButtons = i.componentAccessDenied = i.componentNoResults = i.componentHelpful = i.dropdownOptions = void 0;
        var a = e("../modules/utilities"),
            s = n(a),
            o = e("../modules/popup"),
            r = n(o);
        i.dropdownOptions = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            return e.map(function(e) {
                var i = e.id == t ? 'selected="true"' : "",
                    n = e.id ? 'value="' + e.id + '"' : "";
                return "<option " + i + " " + n + ">" + e.name + "</option>"
            }).join("")
        }, i.componentHelpful = function(e) {
            return '\n        <div class="component-helpful">\n            <div class="row thanks-feedback" style="display: none">\n                <div class="col-xs-24">\n                    <span class="color-primary">' + e.textThanksFeedback + '</span>\n                </div>\n            </div>\n            <div class="row feedback">\n                <div class="col-xs-24">\n                    <p class="title-helpful"><strong>' + e.textWasHelpful + '</strong></p>\n                </div>\n                <div class="col-xs-24 col-buffer">\n                    <button class="btn btn-default btn-narrow btn-helpful" data-type="true">' + e.textYes + "(" + e.textHelpfulYes + ')</button>\n                    <button class="btn btn-default btn-narrow btn-helpful" data-type="false">' + e.textNo + "(" + e.textHelpfulNo + ')</button>\n                </div>\n                <div class="col-xs-24">\n                    <p>\n                        <button class="btn btn-link btn-report-abuse"><strong>' + e.textReportAbuse + "</strong></button>\n                    </p>\n                </div>\n            </div>\n        </div>\n    "
        }, i.componentNoResults = function(e) {
            var t = e.itemCount ? "none" : "block";
            return '\n        <div class="no-results" style="display:' + t + ';">\n            <div class="row row-buffer">\n                <div class="col-xs-24 text-center">\n                    <h4 class="h4">' + e.message + "</h4>\n                </div>\n            </div>\n        </div>\n    "
        }, i.componentAccessDenied = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.title,
                i = void 0 === t ? "" : t,
                n = e.message,
                a = void 0 === n ? "" : n,
                s = e.showPopupButton,
                o = void 0 !== s && s;
            new r["default"](".popup-modal-qna", ".qna-popup-message");
            return '\n        <div class="row row-buffer">\n            <div class="col-xs-24 text-danger">\n                <div class="access-denied">\n                    <strong>' + i + "</strong>\n                        " + (o ? '\n                            &nbsp;<span class="question-mark popup-modal popup-modal-qna">?</span>' : "") + "\n                    <br />\n                    " + a + "\n                </div>\n            </div>\n        </div>\n    "
        }, i.componentPagingButtons = function(e) {
            var t = 1,
                i = "",
                n = '<a href="#" class="btn-page" data-page-number="{0}">{1}</a>',
                a = '<span class="pagination-{0}"><i class="icon-recentlyviewedarrow{0}"></i></span>',
                o = s["default"].stringFormat(a, "left"),
                r = s["default"].stringFormat(a, "right"),
                l = Math.ceil(e.totalCount / 10);
            if (1 === l) return "";
            for (; t <= l; t++) 1 === t && 1 !== e.currentPage && (i += s["default"].stringFormat(n, e.currentPage - 1, o)), (l <= 5 || t >= e.currentPage - 2 && t <= e.currentPage || t <= e.currentPage + 2 && t > e.currentPage || t <= 5 && e.currentPage <= 2 || l - t < 5 && l - e.currentPage <= 2) && (i += t === e.currentPage ? '<span class="selected-page">' + t + "</span>" : s["default"].stringFormat(n, t, '<span class="pagination">' + t + "</span>")), t === l && e.currentPage !== l && (i += s["default"].stringFormat(n, e.currentPage + 1, r));
            return i
        }, i.componentPostedBy = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.postedBy,
                i = void 0 === t ? "" : t,
                n = e.customerProfileLink,
                a = void 0 === n ? "" : n,
                o = e.customerNickname,
                r = void 0 === o ? "" : o,
                l = e.postedDate,
                u = void 0 === l ? "" : l;
            return '\n        <span class="small posted-by">\n            ' + s["default"].stringFormat(i, "/me/" + a, r, s["default"].getShortDateString(new Date(u))) + "\n        </span>\n    "
        }, i.componentBackToProductDetails = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.productUrl,
                i = void 0 === t ? "" : t,
                n = e.retinaImage,
                a = void 0 === n ? "" : n,
                s = e.imageUrl,
                o = void 0 === s ? "" : s,
                r = e.productName,
                l = void 0 === r ? "" : r;
            return '\n        <div class="back-to-product-title">\n            <a href="' + i + '">\n                <i class="icon-recentlyviewedarrowleft"></i>\n                <img src="' + a + '" srcset="' + o + " 1x, " + a + ' 1.5x"\n                        width="50" height="50" />\n                <div class="line-clamp">\n                    ' + l + "\n                </div>\n            </a>\n        </div>\n    "
        }, i.componentSubmitSuccess = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.title,
                i = void 0 === t ? "" : t,
                n = e.message,
                a = void 0 === n ? "" : n;
            return '\n        <div class="submitted-message" style="display: none">\n            <i class="icon-circlecheck pull-left" />\n            <div class="title"><strong>' + i + '</strong></div>\n            <div class="message">' + a + "</div>\n        </div>\n    "
        }, i.componentConfirmationPopup = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.type,
                i = void 0 === t ? "answer" : t,
                n = e.text,
                a = void 0 === n ? "" : n;
            return '\n        <div class="popup-container popup-delete-' + i + '-confirm">                                \n        <div class="popup-title">' + a + '</div> \n        <div class="popup-content text-center"> \n            <p>&nbsp;</p>\n            <button class="btn btn-primary btn-delete-' + i + '">Delete</button>\n            <button class="btn btn-default btnCancel">Cancel</button>\n        </div>\n    </div> \n'
        }
    }, {
        "../modules/popup": 44,
        "../modules/utilities": 71
    }],
    23: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./utilities"),
            r = n(o),
            l = function() {
                function e() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "https://s.images-iherb.com";
                    a(this, e), this.urlHelper = t, this.$cartPopup = $(".add-to-cart-pop"), this.$cart = $(".iherb-header-cart"), this.$container = $(".add-to-cart-container"), this.bindEvents()
                }
                return s(e, [{
                    key: "bindEvents",
                    value: function() {
                        $(document).on("click.add-to-cart", ".btn-add-to-cart", this.addToCart.bind(this)).on("click.add-both-to-cart", "#btn-add-both-to-cart", this.addBothToCart.bind(this)).on("click", $(".close", this.$cartPopup), this.closePopup.bind(this)), $(window).on("scroll.add-to-cart resize.add-to-cart load.add-to-cart", r["default"].debounce(this.popupPosition.bind(this), 50))
                    }
                }, {
                    key: "addToCart",
                    value: function(e) {
                        var t = this,
                            i = $(e.currentTarget),
                            n = i.data("product-id");
                        this.populateRelatedProducts(n), window.ih.ga.prod.addToCart(i.closest(".ga-product")), e.preventDefault(), this.addToCartAjax(n).done(function(e) {
                            var n = JSON.parse(e);
                            "error" != n.status ? t.showPopUpSingleItem(n) : t.fadeMessage(i.siblings(".out-of-stock-message"))
                        }).fail(function(e, t, i) {
                            $(".add-to-cart-pop").addClass("is-closed"), $(".form-add-to-cart").submit()
                        })
                    }
                }, {
                    key: "addBothToCart",
                    value: function(e) {
                        var t = this,
                            i = $("#hidPid1").val(),
                            n = $("#hidPid2").val();
                        $(".add-to-cart-header").addClass("bundle"), e.preventDefault(), this.populateRelatedProducts(i), this.addBothToCartAjax(i, n).done(function(e) {
                            var i = JSON.parse(e);
                            "error" != i.status ? t.showPopUpBundleItem(i) : t.fadeMessage($(".out-of-stock-message-add-both"))
                        }).fail(function() {
                            $(".add-to-cart-pop, .add-to-cart-container").addClass("is-closed"), $("#form-add-both-to-cart").submit()
                        })
                    }
                }, {
                    key: "closePopup",
                    value: function() {
                        this.$cartPopup.hasClass("is-closed") || this.$cartPopup.removeClass("is-open").addClass("is-closed")
                    }
                }, {
                    key: "popupPosition",
                    value: function() {
                        var e = $(window).scrollTop() >= $("#iherb-header").height(),
                            t = $(".add-to-cart-container");
                        t.position({ of: this.$cart,
                            using: function(e, i) {
                                e.top = 70, e.left = i.target.left - $(".add-to-cart-container .icon-uparrow").position().left, t.css(e)
                            }
                        }), t.toggleClass("fixed", e)
                    }
                }, {
                    key: "toggleAddToCartPopup",
                    value: function(e) {
                        e ? this.$container.show() : this.$container.hide(), this.popupPosition(), this.$cartPopup.toggleClass("is-closed", !e).toggleClass("is-open", e)
                    }
                }, {
                    key: "populateRelatedProducts",
                    value: function(e) {
                        var t = this;
                        e > 0 && this.relatedItemsAjax(e).done(function(e) {
                            "" != e ? t.showRelatedItems(e) : $(".add-to-cart-extra").addClass("is-closed")
                        })
                    }
                }, {
                    key: "fadeMessage",
                    value: function(e) {
                        $(".info-popup").hide(), e.fadeIn().hover(function() {
                            clearTimeout(t)
                        }, function() {
                            e.fadeOut()
                        });
                        var t = setTimeout(function() {
                            e.fadeOut()
                        }, 6e3)
                    }
                }, {
                    key: "showRelatedItems",
                    value: function(e) {
                        $(".add-to-cart-extra").removeClass("hide"), $(".add-to-cart-related").html(e);
                        for (var t = 0; t <= 3; t += 3) $(".add-to-cart-extra .product").slice(t, t + 3).wrapAll('<div class="item"></div>');
                        $(".add-to-cart-extra .item").each(function() {
                            $(".add-to-cart-extra .carousel-indicators").append('<li data-target="#recommendCarousel" data-slide-to="' + $(this).index() + '"></li>')
                        }), 1 == $(".add-to-cart-extra .item").length && ($(".add-to-cart-extra .carousel-indicators").hide(), $(".carousel-control").addClass("cursor-off"), $(".add-to-cart-extra .scroll-l").addClass("scroll-l-off"), $(".add-to-cart-extra .scroll-r").addClass("scroll-r-off")), $(".add-to-cart-extra .item:first-child, .add-to-cart-extra .carousel-indicators li:first-child").addClass("active")
                    }
                }, {
                    key: "relatedItemsAjax",
                    value: function(e) {
                        return $.ajax({
                            type: "POST",
                            xhrFields: {
                                withCredentials: !0
                            },
                            headers: {
                                "x-ajax": "1"
                            },
                            url: "/pro/recentproductselection?pid=" + e + "&items=3&cart=1",
                            cache: !1
                        })
                    }
                }, {
                    key: "addToCartAjax",
                    value: function(e) {
                        var t = $("#ddlQty").val();
                        return $.ajax({
                            xhrFields: {
                                withCredentials: !0
                            },
                            headers: {
                                "x-ajax": "1"
                            },
                            url: window.iHerb_ActionHost + "/pro/AddToCart",
                            method: "POST",
                            data: {
                                pid: e,
                                qty: t
                            }
                        })
                    }
                }, {
                    key: "addBothToCartAjax",
                    value: function(e, t) {
                        return $.ajax({
                            xhrFields: {
                                withCredentials: !0
                            },
                            headers: {
                                "x-ajax": "1"
                            },
                            url: window.iHerb_ActionHost + "/pro/AddBothToCart",
                            method: "POST",
                            data: {
                                pid1: e,
                                pid2: t
                            }
                        })
                    }
                }, {
                    key: "showPopUpSingleItem",
                    value: function(e) {
                        var t = this,
                            i = $(".add-to-cart-info .savings"),
                            n = $(".add-to-cart-info .crossed-out"),
                            a = 3e3,
                            s = void 0;
                        $("#cart-qty").text(e.cqty > 99 ? "99+" : e.cqty), $("#cart-subtotal").text(e.ctotal), $("#popup-cart-subtotal").text(e.ctotal), e.ctotal.length > 10 ? $("#cart-subtotal").hide() : $("#cart-subtotal").show(), e.ctotal.length > 7 && $("#popup-cart-subtotal").addClass("subtotal-wrap"), $(".num-items").html("<bdi>( " + e.qty + " of " + e.cqty + " items )</bdi>"), $(".add-to-cart-pop, .add-to-cart-header").removeClass("hide bundle"), $(".qty-amt").text(e.qty), $(".add-to-cart-info .title").text(e.name), null == e.iURLSmall || "" == e.iURLSmall ? $(".add-to-cart-img").html($("#add-cart-new-img").clone().show()) : $(".add-to-cart-img").html('<img src="' + e.iURLMedium + '" srcset="' + e.iURLSmall + " 1x, " + e.iURLMedium + ' 1.5x" />'), $(".add-to-cart-info .price").text(e.price), e.isspecialitem ? (n.html(e.listprice).show(), i.show(), $(".add-to-cart-info .amount-savings").text(e.discount)) : (n.hide(), i.hide()), this.toggleAddToCartPopup(!0), s = setTimeout(function() {
                            t.toggleAddToCartPopup(!1)
                        }, a), $("#add-to-cart-popup").hover(function() {
                            clearTimeout(s)
                        }, function() {
                            s = setTimeout(function() {
                                t.toggleAddToCartPopup(!1)
                            }, a)
                        })
                    }
                }, {
                    key: "showPopUpBundleItem",
                    value: function(e) {
                        var t = this,
                            i = $("#add-to-cart-popup"),
                            n = $("#model-properties-add-both-to-cart"),
                            a = n.data("add-both-price-separate"),
                            s = n.data("add-both-price-discount"),
                            o = n.data("add-both-price-together"),
                            r = 3e3,
                            l = void 0;
                        if (this.toggleAddToCartPopup(!0), l = setTimeout(function() {
                                t.toggleAddToCartPopup(!1)
                            }, r), i.hover(function() {
                                clearTimeout(l)
                            }, function() {
                                l = setTimeout(function() {
                                    t.toggleAddToCartPopup(!1)
                                }, r)
                            }), $("#cart-qty").text(e.cqty > 99 ? "99+" : e.cqty), $("#cart-subtotal").text(e.ctotal), $("#popup-cart-subtotal").text(e.ctotal), e.ctotal.length > 7 && $("#popup-cart-subtotal").addClass("subtotal-wrap"), $(".num-items").text("( 2 of " + e.cqty + " items )"), $(".add-to-cart-pop").removeClass("hide").addClass("bundle"), $(".qty-amt").text(2), $(".add-to-cart-info .crossed-out").text($(".price-separate").text()), $(".add-to-cart-info .price").text($(".price-together").text()), $(".add-to-cart-info .amount-total").text(a), $(".add-to-cart-info .amount-discount").text("- " + s), $(".add-to-cart-info .amount-together").text(o), null == e.productList[0].iURLSmall || "" == e.productList[0].iURLSmall);
                        else {
                            var u = '<img src="' + e.productList[0].iURLMedium + '" srcset="' + e.productList[0].iURLSmall + " 1x, " + e.productList[0].iURLMedium + ' 1.5x" />',
                                c = '<img src="' + e.productList[1].iURLMedium + '" srcset="' + e.productList[1].iURLSmall + " 1x, " + e.productList[1].iURLMedium + ' 1.5x" />',
                                d = '<img src="' + this.urlHelper + '/i/ui/icons/item-together.png" class="plus" />';
                            $(".add-to-cart-img").html(u + d + c)
                        }
                    }
                }]), e
            }();
        i["default"] = l
    }, {
        "./utilities": 71
    }],
    24: [function(e, t, i) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = function() {
                function e(t) {
                    n(this, e), this.$paginationEle = t.find(".carousel-pagination"), this.$carousel = t.find(".carousel"), this.totalRowCount = t.find(".item").length, this._init(t), this._bindEvents()
                }
                return a(e, [{
                    key: "_init",
                    value: function(e) {
                        this.$paginationEle.text("1 of " + this.totalRowCount)
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        var e = this;
                        this.$carousel.on("slid.bs.carousel", function(t) {
                            e._updatePaginationCount(t)
                        })
                    }
                }, {
                    key: "_updatePaginationCount",
                    value: function(e) {
                        var t = $(e.target).data("bs.carousel"),
                            i = t.getItemIndex(t.$element.find(".item.active"));
                        this._renderPagination(i)
                    }
                }, {
                    key: "_renderPagination",
                    value: function(e) {
                        this.$paginationEle.text(e + 1 + " of " + this.totalRowCount)
                    }
                }]), e
            }();
        i["default"] = s
    }, {}],
    25: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e) {
            if (Array.isArray(e)) {
                for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
                return i
            }
            return Array.from(e)
        }

        function s(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            r = e("./utilities"),
            l = n(r),
            u = e("../modules/popup"),
            c = n(u),
            d = "ihr-compare-pids",
            h = function() {
                function e() {
                    s(this, e), this.$container = $("#mainWrapper"), this.$target = $(), this.$tooltip = $(".compare-tooltip"), this.$form = this.$tooltip.find("form"), this.$list = $(".compare-product-list"), this.productDetails = [], this.mouseTimeout = null, this.toolTipTimeout = null, this.compareErrorPopup = new c["default"](".this-element-doesnt-exist", ".modal-compare-error"), this.isRTL = "rtl" === $("html").attr("dir"), this._init()
                }
                return o(e, [{
                    key: "_init",
                    value: function() {
                        this._getStateFromStorage(), this._toggleCheckBoxes(), this._render(), this._bindEvents()
                    }
                }, {
                    key: "_showMaxItemsError",
                    value: function(e) {
                        this.compareErrorPopup.openPopup(e)
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        var e = this;
                        $(document).on("mouseover.iherb.toolTip", ".compare-action", l["default"].throttle(function(t) {
                            e.mouseTimeout = setTimeout(function() {
                                return $(t.currentTarget).trigger("change.iherb.compareProducts")
                            }, 400)
                        }, 600)), $(document).on("mouseleave.iherb.toolTip", ".compare-action, .compare-tooltip", function(t) {
                            clearTimeout(e.mouseTimeout), e.toolTipTimeout = setTimeout(function() {
                                return e._hideToolTip()
                            }, 500)
                        }), $(document).on("mouseenter.iherb.toolTip", ".compare-action, .compare-tooltip", function(t) {
                            clearTimeout(e.toolTipTimeout)
                        }), $(document).on("change.iherb.compareProducts", ".compare-action", function(t) {
                            e.$target = $(t.currentTarget);
                            var i = $(t.target),
                                n = i.is(":checked"),
                                a = i.attr("id");
                            n ? e.productDetails.length >= 5 ? (i.prop("checked", !1), e._showMaxItemsError(i, t)) : e._addProductDetail(a) : e._removeProductDetail(a), e.productDetails.length && e._moveToolTip(), t.stopImmediatePropagation()
                        }), $(".compare-product-list").on("click.iherb.compareProducts", ".js-delete-item", function(t) {
                            var i = String($(t.target).data("pid"));
                            e._removeProductDetail(i), e._moveToolTip()
                        }), $(".compare-tooltip").on("click.iherb.compareProducts", ".compare-buttons button[name=reset]", function(t) {
                            e._removeAll()
                        }), $("html.productcomparison").on("click.iherb.comparePage", "th.product .js-delete-item", function(t) {
                            var i = $(t.target).data("pid");
                            e._removeProductDetail(i), e._storeToClient(), e._removeProductColumn(i), window.history.replaceState(null, null, "ProductComparison?" + e._regenerateQueryString())
                        })
                    }
                }, {
                    key: "_regenerateQueryString",
                    value: function() {
                        return this.productDetails.map(function(e) {
                            return "pids=" + e.productId
                        }).join("&")
                    }
                }, {
                    key: "_toggleCheckBoxes",
                    value: function() {
                        $(".compare-action input").prop("checked", !1), this.productDetails.map(function(e) {
                            return $("#" + e.productId)
                        }).filter(function(e) {
                            return e.length
                        }).forEach(function(e) {
                            return e.prop("checked", !0)
                        })
                    }
                }, {
                    key: "_moveToolTip",
                    value: function() {
                        this.isRTL ? this.$tooltip.position({ of: this.$target,
                            my: "left bottom",
                            at: "right+18 bottom+18",
                            collision: "flip flip",
                            within: this.$container
                        }) : this.$tooltip.position({ of: this.$target,
                            my: "right bottom",
                            at: "left-15 bottom+18",
                            collision: "flip flip",
                            within: this.$container
                        });
                        var e = this.$target.offset(),
                            t = this.$tooltip.offset();
                        e.left < t.left ? (this.$tooltip.removeClass("compare-tooltip-right"), this.$tooltip.addClass("compare-tooltip-left")) : (this.$tooltip.removeClass("compare-tooltip-left"), this.$tooltip.addClass("compare-tooltip-right"))
                    }
                }, {
                    key: "_showToolTip",
                    value: function() {
                        this.$tooltip.addClass("show active")
                    }
                }, {
                    key: "_hideToolTip",
                    value: function() {
                        this.$tooltip.removeClass("show active")
                    }
                }, {
                    key: "_removeAll",
                    value: function() {
                        var e = this;
                        this.productDetails.forEach(function(t) {
                            return e._removeProductDetail(t.productId)
                        })
                    }
                }, {
                    key: "_getStateFromStorage",
                    value: function() {
                        var e = l["default"].quickStorage.get(d);
                        this.productDetails = e || []
                    }
                }, {
                    key: "_storeToClient",
                    value: function() {
                        this.productDetails.length ? l["default"].quickStorage.set(d, this.productDetails, !1, !1, 86400) : l["default"].quickStorage.clear(d)
                    }
                }, {
                    key: "_addProductDetail",
                    value: function(e) {
                        var t = this._getProductDetail(e);
                        this.productDetails = [].concat(a(this.productDetails), [t]), this._storeToClient(), this._render(), this.productDetails.length ? this._showToolTip() : this._hideToolTip()
                    }
                }, {
                    key: "_removeProductDetail",
                    value: function(e) {
                        this.productDetails = this.productDetails.filter(function(t) {
                            return t.productId != e
                        }), this._uncheckDomCheckbox(e), this._storeToClient(), this.productDetails.length || this._hideToolTip(), this._render(), this.productDetails.length ? this._showToolTip() : this._hideToolTip()
                    }
                }, {
                    key: "_removeProductColumn",
                    value: function(e) {
                        $('[data-pid="' + e + '"]').remove()
                    }
                }, {
                    key: "_getProductDetail",
                    value: function(e) {
                        var t = $("#pid_" + e),
                            i = t.find(".product-title").text(),
                            n = t.find("img").attr("src");
                        return {
                            productId: e,
                            productTitle: i,
                            productImageUrl: n
                        }
                    }
                }, {
                    key: "_uncheckDomCheckbox",
                    value: function(e) {
                        var t = $("#" + e);
                        !!t.length && t.prop("checked", !1)
                    }
                }, {
                    key: "_renderProduct",
                    value: function(e) {
                        return '\n        <div class="product-item">\n            <img src="' + e.productImageUrl + '"/>\n            <div class="product-title">' + e.productTitle + '</div>\n            <i class="icon-exit js-delete-item" data-pid="' + e.productId + '"></i>\n        </div>\n    '
                    }
                }, {
                    key: "_renderProducts",
                    value: function(e) {
                        return e.map(this._renderProduct)
                    }
                }, {
                    key: "_renderProductInput",
                    value: function(e) {
                        return '<input type="hidden" name="pids" value="' + e.productId + '" />'
                    }
                }, {
                    key: "_renderProductInputs",
                    value: function(e) {
                        return e.map(this._renderProductInput)
                    }
                }, {
                    key: "_render",
                    value: function() {
                        this.$list.html(this._renderProducts(this.productDetails)), this.$form.find("input").remove(), this.$form.append(this._renderProductInputs(this.productDetails))
                    }
                }]), e
            }();
        i["default"] = h
    }, {
        "../modules/popup": 44,
        "./utilities": 71
    }],
    26: [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i["default"] = {
            url: {
                addToWishList: "/wishlist/AddProducts",
                removeWishListItem: "/wishlist/RemoveProducts",
                getWishList: "/wishlist/getfoldersforproduct",
                recentlyViewed: "/pro/recentlyviewedNew",
                iherbLive: "/catalog/iHerbLive",
                getRelatedBlogArticles: "/catalog/GetRelatedBlogArticles",
                getLatestBlogArticles: "/catalog/GetBlogArticles",
                getCustomerAlsoBought: "/pro/recentproductselection"
            },
            api: {
                facebook: "http://www.facebook.com/share.php?",
                twitter: "http://www.twitter.com/intent/tweet?",
                googlePlus: "https://plus.google.com/share?",
                pinterest: "https://pinterest.com/pin/create/bookmarklet/?",
                weibo: "http://service.weibo.com/share/share.php?",
                qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?",
                qq: "http://connect.qq.com/widget/shareqq/index.html?",
                douban: "https://www.douban.com/share/service?",
                naver: "http://share.naver.com/web/shareView.nhn?",
                vk: "https://vk.com/share.php?",
                ok: "https://odnoklassniki.ru/dk?",
                ugcEmail: "https://ugc-api.iherbtest.io/api/emaillink",
                qanda: {
                    helpful: "/api/product/{0}/question/{1}/answer/{2}/helpful",
                    reportAbuse: "/api/product/{0}/question/{1}/answer/{2}/abuse",
                    questionsForProduct: "/api/product/{0}/question",
                    questionDetailForProduct: "/api/product/{0}/question/{1}",
                    answersForQuestion: "/api/product/{0}/question/{1}/answer",
                    moreAnswers: "/api/product/{0}/question/{1}/answer",
                    questionCategory: "/question-category",
                    canAskQuestion: "/api/product/canAskQuestion",
                    canAnswerQuestion: "/api/product/{0}/canAnswerQuestion",
                    deleteQuestion: "/api/product/{0}/question/{1}",
                    deleteAnswer: "/api/product/{0}/question/{1}/answer/{2}",
                    editAnswer: "/api/product/{0}/question/{1}/answer"
                },
                recRelatedProducts: "https://iherb-ds.com/rec/gr"
            }
        }
    }, {}],
    27: [function(e, t, i) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = function() {
                function e(t) {
                    n(this, e), this.$clock = $("#" + t), this.$daysSpan = this.$clock.find(".days"), this.$hoursSpan = this.$clock.find(".hours"), this.$minutesSpan = this.$clock.find(".minutes"), this.$secondsSpan = this.$clock.find(".seconds"), this.$daysTitle = this.$clock.find(".days-title"), this.$hoursTitle = this.$clock.find(".hours-title"), this.timeData = parseInt(this.$clock.data("time"), 10), this.endtime = new Date(Date.parse(new Date) + 1e3 * this.timeData), this.timeInterval, this.init()
                }
                return a(e, [{
                    key: "init",
                    value: function() {
                        this.updateClock(this.endtime), this.timeinterval = setInterval(this.updateClock.bind(this, this.endtime), 1e3)
                    }
                }, {
                    key: "updateClock",
                    value: function(e) {
                        var t = this.getTimeRemaining(e);
                        this.$daysSpan.text(t.days), t.hours < 10 ? this.$hoursSpan.text("0" + t.hours) : this.$hoursSpan.text(t.hours), t.minutes < 10 ? this.$minutesSpan.text(": 0" + t.minutes + " :") : this.$minutesSpan.text(": " + t.minutes + " :"), t.seconds < 10 ? this.$secondsSpan.text("0" + t.seconds) : this.$secondsSpan.text(t.seconds), this.showTimeFormat(t), t.total <= 0 && clearInterval(this.timeinterval)
                    }
                }, {
                    key: "showTimeFormat",
                    value: function(e) {
                        e.days > 0 ? (this.$daysSpan.show(), this.$daysTitle.show(), e.hours > 0 ? (this.$hoursSpan.show(), this.$hoursTitle.show()) : (this.$hoursSpan.hide(), this.$hoursTitle.hide()), this.$minutesSpan.hide(), this.$secondsSpan.hide()) : (this.$daysSpan.hide(), this.$daysTitle.hide(), this.$hoursTitle.hide(), this.$hoursSpan.show(), this.$minutesSpan.show(), this.$secondsSpan.show())
                    }
                }, {
                    key: "getTimeRemaining",
                    value: function(e) {
                        var t = Date.parse(e) - Date.parse(new Date),
                            i = Math.floor(t / 1e3 % 60),
                            n = Math.floor(t / 1e3 / 60 % 60),
                            a = Math.floor(t / 36e5 % 24),
                            s = Math.floor(t / 864e5);
                        return {
                            total: t,
                            days: s,
                            hours: a,
                            minutes: n,
                            seconds: i
                        }
                    }
                }]), e
            }();
        i["default"] = s
    }, {}],
    28: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e
        }

        function s(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
                }
                return e
            },
            r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            l = e("./constants"),
            u = n(l),
            c = e("./http"),
            d = n(c),
            h = e("./utilities"),
            p = n(h),
            f = e("./product-cell.js"),
            g = n(f),
            v = e("./lazyload-carousel-images"),
            m = n(v);
        e("./jquery.swipe");
        var w = function() {
            function e() {
                s(this, e), this._cacheDOM(), this._init(), this.productCell = new g["default"]
            }
            return r(e, [{
                key: "_cacheDOM",
                value: function() {
                    this.$productCarousel = $("#customer-related-products").find(".carousel-wrapper"), this.$pid = $("#modelProperties").data("product-id"), this.$leaf = $("#customer-related-products").find(".leaf-carousel-loader"), this.customerAlsoBought = "#customer-also-bought", this.relatedProducts = "#related-products"
                }
            }, {
                key: "_bindEvents",
                value: function() {
                    var e = this;
                    $(this.customerAlsoBought).on("click", function(t) {
                        e._toggleTabs(t)
                    }), $(this.relatedProducts).on("click", function(t) {
                        e._toggleTabs(t)
                    })
                }
            }, {
                key: "_init",
                value: function() {
                    p["default"].quickStorage.clear("customer-also-bought"), p["default"].quickStorage.clear("related-products"), this._loadData(), this._bindEvents()
                }
            }, {
                key: "_toggleTabs",
                value: function(e) {
                    var t = $("#customer-related-products-tabs div"),
                        i = p["default"].quickStorage.get(e.target.id);
                    this._initTab(this.$productCarousel, i), t.removeClass("active"), $(e.target).addClass("active")
                }
            }, {
                key: "_initTab",
                value: function(e, t) {
                    e.html(t).responsiveCarousel({
                        update: !0
                    }), $("[id^=carousel-]").each(function(e, t) {
                        $(t).swipe({
                            threshold: 90
                        }), new m["default"](t)
                    })
                }
            }, {
                key: "_buildCarousel",
                value: function(e, t, i, n) {
                    var a = i(t),
                        s = e + "-inner";
                    this.$product = this.productCell.getProductElements(a), $(s).empty().append(this.$product), this._appendClass(e, n)
                }
            }, {
                key: "_loadData",
                value: function() {
                    var e = this;
                    $.when(this._fetchCustomerBoughtData(), this._fetchRelatedProducts()).done(function(t, i) {
                        if (t[0] && t[0].ItemsList.length) {
                            e._buildCarousel(e.customerAlsoBought, t[0].ItemsList, e._dataMappingCustomer, 0);
                            var n = $("#customer-also-bought-carousel").prop("outerHTML");
                            p["default"].quickStorage.set("customer-also-bought", n, !0)
                        }
                        if (i[0].Products.length) {
                            e._buildCarousel(e.relatedProducts, i[0], e._dataMappingRelated, 1);
                            var a = $("#related-products-carousel").prop("outerHTML");
                            p["default"].quickStorage.set("related-products", a, !0)
                        }
                        e._displayTabs()
                    }).fail(function(e) {
                        console.error(e), $("#customer-related-products").hide()
                    })
                }
            }, {
                key: "_displayTabs",
                value: function() {
                    var e = this,
                        t = ["customer-also-bought", "related-products"],
                        i = !1;
                    t.map(function(t) {
                        var n = p["default"].quickStorage.get(t),
                            a = $("#" + t);
                        n && ($("#customer-related-products-tabs").show(), a.css("display", "inline-block")), !i && n && (e._initTab(e.$productCarousel, n), a.addClass("active"), e.$productCarousel.removeClass("hide"), e.$leaf.hide(), i = !0)
                    })
                }
            }, {
                key: "_appendClass",
                value: function(e, t) {
                    var i = $(e + "-carousel").find(".product-card"),
                        n = $(e + "-carousel").find(".carousel-control"),
                        a = $(e + "-wrapper").find("a"),
                        s = e.replace("#", ""),
                        o = s + "-click";
                    a.attr("data-ga-event", "click"), a.attr("data-ga-event-category", "Ecommerce"), a.attr("data-ga-event-action", o), $.each(n, function(e, t) {
                        $(t).hasClass("prevArrow") ? $(t).attr("data-ga-event-label", s + "-old-left-arrow") : $(t).attr("data-ga-event-label", s + "-old-right-arrow")
                    }), $.each(i, function(e, i) {
                        var n = t ? s + "-new-" + (e + 1) : s + "-old-" + (e + 1);
                        $(i).find("a").attr("data-ga-event-label", n).attr("data-ga-event-pid", $(i).attr("id").substring(7))
                    }), i.addClass("product col-xs-8 col-sm-8 col-md-6 col-lg-5th")
                }
            }, {
                key: "_ajax",
                value: function(e, t) {
                    return d["default"].get(e, t)
                }
            }, {
                key: "_fetchCustomerBoughtData",
                value: function() {
                    return this._ajax(u["default"].url.getCustomerAlsoBought, {
                        pid: this.$pid
                    })
                }
            }, {
                key: "_fetchRelatedProducts",
                value: function() {
                    var e = p["default"].getCookieVal("ihr-temse", "tempses"),
                        t = $("#related-products-carousel"),
                        i = $("#modelProperties").data("product-id"),
                        n = t.data("product") || void 0,
                        a = {
                            custID: e,
                            pid: $("#modelProperties").data("product-id"),
                            kw: t.data("keyword") || void 0,
                            catID: t.data("category") || void 0,
                            prevPid: i == n ? void 0 : n,
                            currCode: window.CURRENCY_CODE,
                            countryCode: window.COUNTRY_CODE,
                            lc: window.LANGUAGE_CODE,
                            recType: 0
                        };
                    return this._ajax(u["default"].api.recRelatedProducts, a)
                }
            }, {
                key: "_dataMappingCustomer",
                value: function(e) {
                    return e.map(function(e) {
                        var t;
                        return o({}, e, (t = {
                            Id: e.ProductID,
                            ProductUrl: e.ProductURLName,
                            ListPrice: e.ListPrice,
                            DiscountPrice: e.DiscountedPrice,
                            ProductImage: e.ProductImageUrl,
                            ProductImageRetina: e.ProductImageUrlRetina
                        }, a(t, "ProductImage", e.ProductImageUrl), a(t, "ProductURL", e.ProductUrl), a(t, "Name", e.DisplayName), a(t, "HasRating", !0), a(t, "Rating", e.AverageRating), a(t, "RatingText", e.RatingsText), a(t, "RatingCount", e.RatingsCount), t))
                    })
                }
            }, {
                key: "_dataMappingRelated",
                value: function(e) {
                    var t = e.Products;
                    return t.map(function(e) {
                        return o({}, e, {
                            Id: e.ID,
                            ProductUrl: e.ProductURL,
                            ListPrice: e.ListPrice,
                            DiscountPrice: e.DiscountedPrice
                        })
                    })
                }
            }]), e
        }();
        i["default"] = w
    }, {
        "./constants": 26,
        "./http": 34,
        "./jquery.swipe": 39,
        "./lazyload-carousel-images": 41,
        "./product-cell.js": 48,
        "./utilities": 71
    }],
    29: [function(e, t, i) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = function() {
                function e() {
                    n(this, e), this._init()
                }
                return a(e, [{
                    key: "_init",
                    value: function() {
                        var e = this;
                        $(function() {
                            var t = $(window),
                                i = $("#js-scroll-location-check");
                            i.length ? t.scrollTop() + t.height() >= $("#js-scroll-location-check").position().top ? e.loadImages() : t.on("load.iherb.deferimages", function() {
                                e.loadImages()
                            }) : e.loadImages()
                        })
                    }
                }, {
                    key: "loadImages",
                    value: function() {
                        $(".js-defer-image").each(function(e, t) {
                            var i = $(t),
                                n = i.data("image-retina-src"),
                                a = i.data("image-src") ? i.data("image-src") + " 1x, " + n + " 1.5x" : "";
                            if ("IMG" !== i[0].nodeName) {
                                var s = i.prop("attributes"),
                                    o = $("<img>");
                                $.each(s, function() {
                                    o.attr(this.name, this.value)
                                }), i.replaceWith(o), i = o
                            }
                            i.attr("src", n), a && i.attr("srcset", a), i.removeAttr("data-image-retina-src").removeAttr("data-image-src").removeClass("js-defer-image")
                        })
                    }
                }]), e
            }();
        i["default"] = s
    }, {}],
    30: [function(e, t, i) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = function() {
                function e(t) {
                    n(this, e), this.$elem = t, this.$list = this.$elem.find(".search-list"), this.$text = this.$elem.find(".dropdown-text"), this.$value = this.$elem.find(".dropdown-value"), this._timer = !1, this._text = "", this.init()
                }
                return a(e, [{
                    key: "init",
                    value: function() {
                        this.list = new o(this.$list), this._attach("select", "_select", this.list), this.$value.prop("disabled", !1), this.$elem.on("click.iherb.dropdown", $.proxy(this._click, this)).on("keypress.iherb.dropdown", $.proxy(this._keypress, this)).on("keydown.iherb.dropdown", $.proxy(this._keydown, this)), $(document).on("click", $.proxy(this._close, this)), this.$value.length && this.$value.data("val") && this.$text.html(this.$value.data("val"))
                    }
                }, {
                    key: "search",
                    value: function(e) {
                        var t = [];
                        this.list.$items.each(function(i) {
                            var n = $.trim($(this).text().replace("\n", "").replace("\r", "")).toLocaleUpperCase();
                            0 == n.indexOf(e.toLocaleUpperCase()) && t.push(this)
                        });
                        var i = $(t);
                        i.length > 0 && this.select(i.eq(0))
                    }
                }, {
                    key: "select",
                    value: function(e) {
                        this.list.select(e)
                    }
                }, {
                    key: "open",
                    value: function() {
                        this.list.addClass("open"), this.list.scrollTop(this.list.selected), this.list.hasFocus(!0)
                    }
                }, {
                    key: "close",
                    value: function() {
                        this.list.hasFocus(!1), this.list.removeClass("open")
                    }
                }, {
                    key: "toggle",
                    value: function() {
                        this.list.hasClass("open") ? this.close() : this.open()
                    }
                }, {
                    key: "_clear",
                    value: function() {
                        this._text = "", this._timer = !1
                    }
                }, {
                    key: "_keypress",
                    value: function(e) {
                        if (!this._timer) {
                            var t = this;
                            this._timer = !0, setTimeout(function() {
                                t._clear()
                            }, 500)
                        }
                        this._text += String.fromCharCode(e.which), this.search(this._text)
                    }
                }, {
                    key: "_select",
                    value: function(e) {
                        this.$value.val(e.data("val")), this.$text.html(e.data("val"))
                    }
                }, {
                    key: "_click",
                    value: function(e) {
                        this.toggle()
                    }
                }, {
                    key: "_keydown",
                    value: function(e) {
                        switch (e.keyCode) {
                            case 9:
                                this.close();
                                break;
                            case 13:
                                this.close();
                                break;
                            case 27:
                                this.close()
                        }
                    }
                }, {
                    key: "_close",
                    value: function(e) {
                        this.$elem.is(e.target) || 0 != this.$elem.has(e.target).length || this.list.hasClass("open") && this.close(), this.$elem.trigger("change.iherb.dropdown")
                    }
                }, {
                    key: "_attach",
                    value: function(e, t, i) {
                        var n = this,
                            a = i[e];
                        i[e] = function() {
                            a.apply(i, arguments), n[t].apply(n, arguments)
                        }
                    }
                }]), e
            }();
        i["default"] = s;
        var o = function() {
            function e(t) {
                n(this, e), this.$elem = $(t), this.$items = this.$elem.find(".item"), this.selected = this.$items.filter(".combo-selected"), this._hasFocus = this.$elem.is(":focus"), this.init()
            }
            return a(e, [{
                key: "init",
                value: function() {
                    this.$elem.on("focus.iherb.list", $.proxy(this._focus, this)).on("blur.iherb.list", $.proxy(this._blur, this)).on("keydown.iherb.list", $.proxy(this._keydown, this)).on("click.iherb.list", $.proxy(this._click, this))
                }
            }, {
                key: "select",
                value: function(e) {
                    return this.selected
                }
            }, {
                key: "scrollTo",
                value: function(e) {
                    e.offset().top + e.outerHeight() > this.$elem.offset().top + this.$elem.height() && this.scrollBottom(e), e.offset().top < this.$elem.offset().top && this.scrollTop(e)
                }
            }, {
                key: "scrollTop",
                value: function(e) {
                    if (e.length) {
                        var t = e.offset().top - (this.$elem.offset().top - this.$elem.scrollTop());
                        this.$elem.scrollTop(t)
                    }
                }
            }, {
                key: "scrollBottom",
                value: function(e) {
                    var t = e.offset().top + e.outerHeight() - this.$elem.height() - (this.$elem.offset().top - this.$elem.scrollTop());
                    this.$elem.scrollTop(t)
                }
            }, {
                key: "next",
                value: function() {
                    var e = this.$items.index(this.selected) + 1;
                    e < this.$items.length && this.$items.length > 0 && (this.select(this.$items.eq(e)), this.scrollTo(this.selected))
                }
            }, {
                key: "previous",
                value: function() {
                    var e = this.$items.index(this.selected) - 1;
                    e >= 0 && (this.select(this.$items.eq(e)), this.scrollTo(this.selected))
                }
            }, {
                key: "hasFocus",
                value: function(e) {
                    return arguments.length && (this._hasFocus = e, this._hasFocus ? this.$elem.focus() : this.$elem.blur()), this._hasFocus
                }
            }, {
                key: "addClass",
                value: function(e) {
                    this.$elem.hasClass(e) || this.$elem.addClass(e)
                }
            }, {
                key: "hasClass",
                value: function(e) {
                    return this.$elem.hasClass(e)
                }
            }, {
                key: "removeClass",
                value: function(e) {
                    this.$elem.removeClass(e)
                }
            }, {
                key: "toggleClass",
                value: function(e) {
                    this.$elem.toggleClass(e)
                }
            }, {
                key: "_focus",
                value: function(e) {
                    this._hasFocus = !0
                }
            }, {
                key: "_blur",
                value: function(e) {
                    this._hasFocus = !1
                }
            }, {
                key: "_click",
                value: function(e) {
                    var t = this;
                    this.$items.each(function() {
                        var i = $(this);
                        if (i.is(e.target) || i.has(e.target).length > 0) return void t.select(i)
                    })
                }
            }, {
                key: "_keydown",
                value: function(e) {
                    switch (e.keyCode) {
                        case 38:
                            e.preventDefault(), this.previous();
                            break;
                        case 40:
                            e.preventDefault(), this.next();
                            break;
                        default:
                            return
                    }
                }
            }]), e
        }()
    }, {}],
    31: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./utilities"),
            r = n(o),
            l = function() {
                function e(t) {
                    a(this, e), this.name = t, this.variants = []
                }
                return s(e, [{
                    key: "getSelectedVariant",
                    value: function() {
                        var e = r["default"].getCookie(this.name);
                        return e || "0"
                    }
                }, {
                    key: "addVariant",
                    value: function(e) {
                        this.variants.push(e)
                    }
                }, {
                    key: "start",
                    value: function() {
                        var e = this.getSelectedVariant();
                        if (this.variants.length) {
                            var t = this.variants[e];
                            t && t()
                        }
                    }
                }]), e
            }();
        i["default"] = l
    }, {
        "./utilities": 71
    }],
    32: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./http"),
            r = n(o),
            l = e("./loader"),
            u = n(l),
            c = e("./popup"),
            d = n(c),
            h = function() {
                function e() {
                    a(this, e), this._bindEvents(), this._getWhiteList(), this.popupTriggerClass = ".popup-leaving-iherb", this.popupContainerClass = ".exit-iherb-message", this.externalUrl = null, this.warningModal = null
                }
                return s(e, [{
                    key: "_bindEvents",
                    value: function() {
                        $("a").on("click", this._interceptLinkClick.bind(this))
                    }
                }, {
                    key: "_interceptLinkClick",
                    value: function(e) {
                        var t = this,
                            i = $(e.currentTarget);
                        this.externalUrl = i.attr("href"), this._isUrlExternal(this.externalUrl) && (e.preventDefault(), u["default"].show(), this.warningModal ? ($(this.popupTriggerClass).trigger("click"), u["default"].hide()) : r["default"].get("/catalog/GetExternalWarning", {
                            url: this.externalUrl
                        }).then(function(e) {
                            t._renderWarningModal(e), t._bindModalEventHandlers(), u["default"].hide()
                        }))
                    }
                }, {
                    key: "_renderWarningModal",
                    value: function(e) {
                        $("body").append(e), this.warningModal = this.warningModal || new d["default"](this.popupTriggerClass, this.popupContainerClass), $(this.popupTriggerClass).trigger("click")
                    }
                }, {
                    key: "_bindModalEventHandlers",
                    value: function() {
                        var e = this;
                        $("#exit-iherb-message").on("click", "button[name=leave-iherb], a", function(t) {
                            t.preventDefault(), window.open(e.externalUrl, "_blank"), e._closeWarningModal()
                        }), $("button[name=stay-on-page]").on("click", function() {
                            e._closeWarningModal()
                        })
                    }
                }, {
                    key: "_closeWarningModal",
                    value: function() {
                        $(".popup-close").trigger("click")
                    }
                }, {
                    key: "_isUrlExternal",
                    value: function(e) {
                        var t = this,
                            i = function(e) {
                                var i = window.location.hostname;
                                if (/^https?:\/\//.test(e)) {
                                    var n = document.createElement("a");
                                    n.href = e, i = n.hostname
                                }
                                return t._getDomainName(i)
                            }(e);
                        return $.inArray(i, this.whiteList) === -1 && this._getDomainName(window.location.hostname) !== i
                    }
                }, {
                    key: "_getDomainName",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                            t = e.split(".");
                        return t.slice(-2)[0] + "." + t.slice(-1)[0]
                    }
                }, {
                    key: "_getWhiteList",
                    value: function() {
                        var e = this,
                            t = ["iherb.jobs", "iherb.com", , "images-iherb.com", "iherb.cn", "iherblibrary.com", "iherblibrary.epnet.com", "www.madrelabs.com", "californiagoldnutrition.com", "justaleaf.com", "mildbynature.com", "www.sierrabees.com", "www.fungiology.com", "azelique.com", "herbalgram.org", "pinterest.com", "facebook.com", "twitter.com", "google.com", "youtube.com", "instagram.com", "apple.com"];
                        this.whiteList = t.map(function(t) {
                            return e._getDomainName(t)
                        })
                    }
                }]), e
            }();
        i["default"] = h
    }, {
        "./http": 34,
        "./loader": 42,
        "./popup": 44
    }],
    33: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
                }
                return e
            },
            o = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            r = e("./constants"),
            l = n(r),
            u = e("./http"),
            c = n(u),
            d = e("./product-cell.js"),
            h = n(d),
            p = e("./utilities"),
            f = n(p),
            g = e("./lazyload-carousel-images"),
            v = n(g);
        e("./jquery.swipe");
        var m = function() {
            function e() {
                a(this, e), this.productCell = new h["default"], this._cacheDOM(), this._loadData()
            }
            return o(e, [{
                key: "_cacheDOM",
                value: function() {
                    this.$featuredCarousel = $("#featured-carousel"), this.$featuredInner = $("#featured-inner"), this.$featuredTitle = $("#featured-title"), this.$featuredContainer = $("#featured-products-container"), this.$leaf = this.$featuredContainer.find(".leaf-carousel-loader"), this.$wrapper = $(".featured-wrapper")
                }
            }, {
                key: "_loadData",
                value: function() {
                    var e = this;
                    this.$featuredInner.length ? this._getData().then(function(t) {
                        t = e._dataMapping(t), t && t.length && (e.$products = e.productCell.getProductElements(t), e._loadScrollerWithData(), e._appendClass(), e._initCarousel(), e.$featuredInner.removeClass("hide"), e.$featuredCarousel.removeClass("hide"), e.$featuredTitle.show(), e.$leaf.hide(), e.$wrapper.removeClass("hide"))
                    }).fail(function(t) {
                        console.error(t), e.$featuredContainer.hide()
                    }) : this.$featuredContainer.hide()
                }
            }, {
                key: "_appendClass",
                value: function() {
                    var e = this.$featuredInner.find(".product-card"),
                        t = this.$wrapper.find(".carousel-control"),
                        i = this.$wrapper.find("a");
                    i.attr("data-ga-event", "click"), i.attr("data-ga-event-category", "Ecommerce"), i.attr("data-ga-event-action", "featured-products-click"), $.each(e, function(e, t) {
                        $(t).find("a").attr("data-ga-event-label", "featured-products-old-" + (e + 1)).attr("data-ga-event-pid", $(t).attr("id").substring(7))
                    }), $.each(t, function(e, t) {
                        $(t).hasClass("prevArrow") ? $(t).attr("data-ga-event-label", "featured-products-click-old-left-arrow") : $(t).attr("data-ga-event-label", "featured-products-click-old-right-arrow")
                    }), e.addClass("product col-xs-8 col-sm-8 col-md-6 col-lg-5th")
                }
            }, {
                key: "_initCarousel",
                value: function() {
                    $("#featured-products-wrapper").responsiveCarousel({
                        update: !0
                    }), $("[id^=carousel-]").each(function(e, t) {
                        $(t).swipe({
                            threshold: 90
                        }), new v["default"](t)
                    })
                }
            }, {
                key: "_dataMapping",
                value: function(e) {
                    var t = e.Products;
                    return t.map(function(e) {
                        return s({}, e, {
                            Id: e.ID,
                            ProductUrl: e.ProductURL,
                            ListPrice: e.ListPrice,
                            DiscountPrice: e.DiscountedPrice
                        })
                    })
                }
            }, {
                key: "_removeExistingProducts",
                value: function() {
                    this.$featuredInner.empty()
                }
            }, {
                key: "_getData",
                value: function() {
                    var e = f["default"].getCookieVal("ihr-temse", "tempses"),
                        t = $("#modelProperties").data("product-id"),
                        i = this.$featuredCarousel.data("product") || void 0,
                        n = {
                            custID: e,
                            pid: $("#modelProperties").data("product-id"),
                            kw: this.$featuredCarousel.data("keyword") || void 0,
                            catID: this.$featuredCarousel.data("category") || void 0,
                            prevPid: t == i ? void 0 : i,
                            currCode: window.CURRENCY_CODE,
                            countryCode: window.COUNTRY_CODE,
                            lc: window.LANGUAGE_CODE,
                            recType: 1
                        };
                    return c["default"].get(l["default"].api.recRelatedProducts, n, !1).fail(function(e) {
                        console.log(e)
                    })
                }
            }, {
                key: "_loadScrollerWithData",
                value: function() {
                    this.$products !== [] && this.$featuredInner.empty().append(this.$products)
                }
            }]), e
        }();
        i["default"] = m
    }, {
        "./constants": 26,
        "./http": 34,
        "./jquery.swipe": 39,
        "./lazyload-carousel-images": 41,
        "./product-cell.js": 48,
        "./utilities": 71
    }],
    34: [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = function(e, t) {
                var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                    n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                    a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
                return $.ajax({
                    xhrFields: {
                        withCredentials: a
                    },
                    type: "GET",
                    url: e,
                    cache: i,
                    data: t,
                    headers: n
                })
            },
            a = function(e, t) {
                var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                    n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                return $.ajax({
                    type: "GET",
                    url: e,
                    cache: i,
                    data: t,
                    headers: Object.assign({}, n, u())
                })
            },
            s = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return $.ajax({
                    type: "POST",
                    url: e,
                    data: t,
                    headers: i
                })
            },
            o = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return $.ajax({
                    type: "POST",
                    url: e,
                    data: JSON.stringify(t),
                    headers: Object.assign({}, i, u())
                })
            },
            r = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return $.ajax({
                    type: "DELETE",
                    url: e,
                    data: JSON.stringify(t),
                    headers: Object.assign({}, i, u())
                })
            },
            l = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return $.ajax({
                    type: "PUT",
                    url: e,
                    data: JSON.stringify(t),
                    headers: Object.assign({}, i, u())
                })
            },
            u = function() {
                var e = {};
                return e.Accept = "application/json", e["Content-Type"] = "application/json", e
            };
        i["default"] = {
            get: n,
            post: s,
            postJSON: o,
            getJSON: a,
            deleteJSON: r,
            putJSON: l
        }
    }, {}],
    35: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e) {
            if (Array.isArray(e)) {
                for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
                return i
            }
            return Array.from(e)
        }

        function s(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e
        }

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            l = e("./utilities"),
            u = n(l),
            c = e("./constants"),
            d = n(c),
            h = e("./http"),
            p = n(h),
            f = function() {
                function e() {
                    o(this, e), this.$liveContainer = $(".live-container"), this.$scroller = $(".live-scroller"), this.$buttonBack = this.$liveContainer.find(".iherb-live-navigation.scroll-left"), this.$buttonPlayPause = this.$liveContainer.find(".iherb-live-navigation.scroll-right"), this.$iconPlayPause = this.$buttonPlayPause.find("i"), this.isRightToLeft = $("html").hasClass("ar"), this.animateDirection = this.isRightToLeft ? "marginRight" : "marginLeft", this.cssProp = this.isRightToLeft ? "margin-right" : "margin-left", this.getDataCount = 1, this.stopCarouselCount = 10, this.numVisibleItems = 8, this.maxItems = 16, this.numHiddenItems = 0, this.refreshItemsCount = this.numVisibleItems, this.apiNumberOfProducts = 50, this.timerInterval = 5e3, this.scrollDuration = 400, this.itemWidth = "171.25", this._init()
                }
                return r(e, [{
                    key: "_init",
                    value: function() {
                        var e = this;
                        this._getData().then(function(t) {
                            t && t[0] && t[0].Product && (e.$products = e._getProductElements(t), e._recalculateNumVisibleItems(), e._loadScrollerWithData(), e._adjustItemWith(), e._bindEvents(), e._startSlideshow())
                        })
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        var e = this;
                        $(window).on("resize", u["default"].debounce(function() {
                            e._recalculateNumVisibleItems(), e.numHiddenItems = e._getCurrentCount() - e.numVisibleItems, e._adjustItemWith(), e._calculateMarginOffset(), e._shiftScroller()
                        }, 200));
                        var t = "disable-navigation disabled-style";
                        this.$liveContainer.on("click.iherb.jumpToStart", ".scroll-left:not(.disable-navigation)", function(i) {
                            e.$buttonBack.addClass(t), e._stopSlideshow(), e.prev(), e.$iconPlayPause.attr("class", "icon-play"), e.$liveContainer.find(".scroll-right").removeClass(t)
                        }), this.$liveContainer.on("click.iherb.jumpToEnd", ".scroll-right:not(.disable-navigation)", function(i) {
                            var n = e.$iconPlayPause.hasClass("icon-play");
                            n ? (e.jumpToEnd(), e._startSlideshow(), e.numHiddenItems && e.$liveContainer.find(".scroll-left").removeClass(t), e.$iconPlayPause.attr("class", "icon-pause")) : (e._stopSlideshow(), e.$iconPlayPause.attr("class", "icon-play"))
                        })
                    }
                }, {
                    key: "_getData",
                    value: function(e) {
                        var t = this,
                            i = null;
                        return e && (i = {
                            index: e,
                            nop: this.apiNumberOfProducts
                        }), p["default"].get(d["default"].url.iherbLive, i).fail(function(e) {
                            t._stopSlideshow()
                        })
                    }
                }, {
                    key: "_getProductElements",
                    value: function(e) {
                        var t = this;
                        return e.map(function(e) {
                            return $(t._generateProductHtml(e))
                        })
                    }
                }, {
                    key: "_generateProductHtml",
                    value: function(e) {
                        var t = e.Product,
                            i = e.Country,
                            n = void 0 === i ? "" : i;
                        if (t) return '\n            <div id="product' + t.Id + '" class="product live-item" data-item-index="' + e.Index + '">\n                <div class="product-inner">\n                    <a class="product-image" data-prodhref="prodHref" href="' + t.ProductUrl + '" data-ga-event="click" data-ga-event-category="Ecommerce" data-ga-event-action="Clicks Homepage iHerb Live" data-ga-event-label="Product Click">\n                        <img src="' + t.ProductImage + '" srcset="' + t.ProductImageRetina + " 1x, " + t.ProductImage + ' 1.5x" alt="' + t.Name + '" itemprop="image" data-img="img" data-imgtitle="title" title="' + t.Name + '" width="120" height="120">\n                    </a>\n\n                    <a data-content="title" data-prodhref="prodHref" href="' + t.ProductUrl + '" data-ga-event="click" data-ga-event-category="Ecommerce" data-ga-event-action="Clicks Homepage iHerb Live" data-ga-event-label="Product Click">\n                        <span itemprop="name" class="product-title">\n                            <bdi>' + t.Name + '</bdi>\n                        </span>\n                    </a>\n                        \n                    <div class="rating">\n                        ' + this._generateRatingHtml(t) + '\n                    </div>\n\n                    <div class="product-price">\n                        ' + this._generatePricingHtml(t) + '\n                    </div>  \n                </div>\n                <div class="text-center location">\n                    <span class="flag-sprite ' + e.CountryCode + '"></span><span class="country-name">' + n + "</span>\n                </div>\n            </div>\n        "
                    }
                }, {
                    key: "_generateRatingHtml",
                    value: function(e) {
                        var t = e.HasRating,
                            i = e.Rating,
                            n = e.ProductUrl,
                            a = e.RatingText,
                            s = e.RatingCount;
                        if (t && i > 0) {
                            var o = u["default"].roundRating(i).replace(/[-.]/g, "");
                            return '\n                <a class="stars" href="' + n + '#product-detail-reviews">\n                    <i class="icon-stars_' + o + ' full" title="' + a + '"></i>\n                    <i class="icon-stars_50 empty"></i>\n                </a>\n                <a class="rating-count" href="' + n + '#product-detail-reviews" title="' + a + '">\n                    <span>' + s + "</span>\n                </a>\n            "
                        }
                        return '<div class="no-rating"></div>'
                    }
                }, {
                    key: "_generatePricingHtml",
                    value: function(e) {
                        var t = e.DiscountPrice,
                            i = e.ListPrice;
                        return t != i ? '\n                <span class="price discount-green">\n                    <bdi>' + t + "</bdi>\n                </span>\n            " : '\n                <span class="price">\n                    <bdi>' + i + "</bdi>\n                </span>\n            "
                    }
                }, {
                    key: "_loadScrollerWithData",
                    value: function() {
                        var e = this;
                        if (this.$products !== []) {
                            var t = this.$products.splice(0, this.numVisibleItems);
                            t.forEach(function(t) {
                                t.css("width", e.itemWidth + "px")
                            }), this.$scroller.append(t), this.$liveContainer.show()
                        }
                    }
                }, {
                    key: "_recalculateNumVisibleItems",
                    value: function() {
                        var e = $(window).width();
                        e <= 640 ? this.numVisibleItems = 4 : e >= 641 && e <= 768 ? this.numVisibleItems = 4 : e >= 769 && e <= 1199 ? this.numVisibleItems = 5 : e >= 1200 && e <= 1399 ? this.numVisibleItems = 8 : e >= 1400 && (this.numVisibleItems = 8)
                    }
                }, {
                    key: "_adjustItemWith",
                    value: function() {
                        var e = $(".live-item"),
                            t = e.closest(".row").width() - 30;
                        this.itemWidth = t / this.numVisibleItems, e.outerWidth(this.itemWidth)
                    }
                }, {
                    key: "_stopSlideshow",
                    value: function() {
                        clearInterval(this.scrollerIntervalTimer)
                    }
                }, {
                    key: "_startSlideshow",
                    value: function() {
                        var e = this;
                        this.scrollerIntervalTimer = setInterval(function() {
                            e._getAdditionalProducts(), e.$products.length ? (e.$products[0].css("width", e.itemWidth + "px"), e.$scroller.find(">:last-child").after(e.$products.splice(0, 1)), e.next()) : e._stopSlideshow()
                        }, this.timerInterval)
                    }
                }, {
                    key: "prev",
                    value: function() {
                        this.numHiddenItems && --this.numHiddenItems, this._scroll(this.itemWidth)
                    }
                }, {
                    key: "next",
                    value: function() {
                        var e = this.itemWidth * -1;
                        this.numHiddenItems < this.numVisibleItems && (this.numHiddenItems = this._getCurrentCount() - this.numVisibleItems), this._scroll(e)
                    }
                }, {
                    key: "jumpToEnd",
                    value: function() {
                        var e = (this._getCurrentCount() - this.numVisibleItems - this.numHiddenItems) * this.itemWidth * -1;
                        this._scroll(e), this.numHiddenItems < this.numVisibleItems && (this.numHiddenItems = this._getCurrentCount() - this.numVisibleItems)
                    }
                }, {
                    key: "_scroll",
                    value: function(e) {
                        var t = this;
                        this.$scroller.animate(s({}, this.animateDirection, "+=" + e + "px"), {
                            duration: this.scrollDuration,
                            complete: function() {
                                t._removeFirstItem(), t._calculateMarginOffset(), t._shiftScroller(), window.setTimeout(function() {
                                    t.numHiddenItems && t.$buttonBack.removeClass("disabled-style disable-navigation")
                                }, 100)
                            }
                        })
                    }
                }, {
                    key: "_calculateMarginOffset",
                    value: function() {
                        this.marginOffset = this.numHiddenItems * this.itemWidth * -1
                    }
                }, {
                    key: "_shiftScroller",
                    value: function() {
                        this.$scroller.css(this.cssProp, this.marginOffset)
                    }
                }, {
                    key: "_removeFirstItem",
                    value: function() {
                        this._getCurrentCount() > this.maxItems && this.$scroller.find(">:first-child").remove()
                    }
                }, {
                    key: "_getAdditionalProducts",
                    value: function() {
                        var e = this,
                            t = this.$products.length <= this.refreshItemsCount && this.getDataCount <= this.stopCarouselCount;
                        if (t) {
                            var i = this.$products[this.$products.length - 1].data("item-index") + 1;
                            this._getData(i).then(function(t) {
                                t && t[0] && t[0].Product ? (e.$products = [].concat(a(e.$products), a(e._getProductElements(t))), e.getDataCount++) : e._stopSlideshow()
                            })
                        }
                    }
                }, {
                    key: "_getCurrentCount",
                    value: function() {
                        return this.$scroller.children().length
                    }
                }]), e
            }();
        i["default"] = f
    }, {
        "./constants": 26,
        "./http": 34,
        "./utilities": 71
    }],
    36: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
                }
                return e
            },
            o = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            r = e("./utilities"),
            l = n(r),
            u = function() {
                function e(t, i) {
                    a(this, e), this.element = $(t), this.options = this._setOptions(i), this.init()
                }
                return o(e, [{
                    key: "init",
                    value: function() {
                        this._cacheDom(), this._bindEvents(), this._isOneImage(), this._toggleLoop(), this._formatSlides(), this.options.indicators && this._showIndicators(this.slidesCount), this.options.thumbNails && this._showThumbnails(this.slidesCount), this.options.controls && this._showControls(), this.options.autoPlay && this._toggleAutoPlay()
                    }
                }, {
                    key: "_cacheDom",
                    value: function() {
                        this.slider = this.element, this.slideContainer = this.slider.find(".img-slider-container"), this.slideWrapper = this.slider.find(".img-wrapper"), this.slideIndicators = this.slider.find(".img-slider-indicators"), this.slideControls = this.slider.find(".img-slider-controls"), this.slideThumbnails = this.slider.find(".img-slider-thumbnails"), this.slideImages = this.slider.find("img, iframe"), this.slidesCount = this.slideWrapper.length - 1, this.slideWidth = this.options.slideWidth.width(), this.touchstart, this.distance, this.longTouch, this.longTouchTimer, this.index = 1, this.scroll, this.isScroll
                    }
                }, {
                    key: "_setOptions",
                    value: function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                            indicators: !1,
                            thumbNails: !1,
                            autoPlay: !1,
                            controls: !1,
                            swipeSensitivity: 25,
                            slideAnimation: .2,
                            slideAnimationType: "linear",
                            slideInterval: 6e3,
                            slideWidth: this.element,
                            longTouchTreshold: 30
                        };
                        return s({}, t, e)
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        var e = this;
                        this.slideContainer.on({
                            touchstart: function(t) {
                                e._start(t)
                            },
                            touchmove: function(t) {
                                e._move(t)
                            },
                            touchend: function(t) {
                                e._end(t), clearTimeout(e.longTouchTimer)
                            }
                        }), $(window).resize(function() {
                            e.slideWidth = e.options.slideWidth.width(), e._formatSlides(e.index, !0)
                        })
                    }
                }, {
                    key: "_start",
                    value: function(e) {
                        var t = this;
                        this.touchstart = e.originalEvent.touches[0].pageX, this.scroll = e.originalEvent.touches[0].pageY, this.isScroll = !1, this.longTouchTimer = setTimeout(function() {
                            t.longTouch = !0
                        }, this.options.longTouchTreshold), this.slideContainer.css("transition", "")
                    }
                }, {
                    key: "_move",
                    value: function(e) {
                        var t = this;
                        this.scrollY = this.scroll - e.originalEvent.touches[0].pageY, this.scroll = e.originalEvent.touches[0].pageY, $(window).one("scroll", l["default"].throttle(function(e) {
                            t.isScroll = !0
                        }, 400)), this.longTouch && !this.isScroll && (e.preventDefault(), this.distance = this._calculateDistanceToSlide(e), this.distance <= this.slideWidth * (this.index + 1) && this.slideContainer.css("transform", "" + this._setDirection(this.distance)))
                    }
                }, {
                    key: "_end",
                    value: function(e) {
                        var t = this._calculateDistanceSwiped(),
                            i = this.options.swipeSensitivity;
                        this.isScroll = !1, t > i && 1 == this.longTouch && (this.distance > this.index * this.slideWidth && this.index < this.slidesCount ? this.index += 1 : this.distance < this.index * this.slideWidth && this.index > 0 && (this.index -= 1)), this._toggleSlide(this.index), this.distance = 0, this.longTouch = !1
                    }
                }, {
                    key: "_showControls",
                    value: function() {
                        var e = this;
                        this.slideControls.show().on("click", function(t) {
                            e._toggleControls(t)
                        })
                    }
                }, {
                    key: "_showThumbnails",
                    value: function(e) {
                        for (var t = this, i = this.slideImages.not(".clone"), n = 1; n < e; n++) this.slideThumbnails.append('\n                <img class="' + (1 == n ? "active" : " ") + '" \n                     src=' + ($(i[n - 1]).is("img") ? $(i[n - 1]).attr("src") : $(i[n - 1]).data("video-thumbnail")) + " \n                     data-video = " + !!$(i[n - 1]).is("iframe") + "\n                     data-slide=" + n + "\n                     width=75\n                     height=75\n                />\n            ");
                        this.slideThumbnails.on("click", "img", function(e) {
                            t._toggleThumbnails(e)
                        }), this.slideContainer.on("slid.image.carousel", function() {
                            t._toggleActive(".img-slider-thumbnails img")
                        })
                    }
                }, {
                    key: "_showIndicators",
                    value: function(e) {
                        for (var t = this, i = $("<ul></ul>"), n = 1; n < e; n++) i.append('\n                <li class="' + (1 == n ? "active" : " ") + '" \n                    data-slide=' + n + ">\n                </li>\n            ");
                        this.slideIndicators.append(i), this.slideIndicators.on("click", "li", function(e) {
                            t._toggleIndicators(e)
                        }), this.slideContainer.on("slid.image.carousel", function() {
                            t._toggleActive(".img-slider-indicators li")
                        })
                    }
                }, {
                    key: "_toggleThumbnails",
                    value: function(e) {
                        var t = $(e.target).data("slide");
                        this.slideThumbnails.children().removeClass("active"), $(e.target).addClass("active"), this._toggleSlide(this.index = t)
                    }
                }, {
                    key: "_toggleIndicators",
                    value: function(e) {
                        e.stopPropagation();
                        var t = $(e.target).data("slide");
                        this._toggleSlide(this.index = t)
                    }
                }, {
                    key: "_toggleControls",
                    value: function(e) {
                        e.stopPropagation(), this.index < this.slideWrapper.length - 1 && ("rtl" == $("html").attr("dir") ? $(e.target).hasClass("right") || $(e.target).parent().hasClass("right") ? this._toggleSlide(this.index -= 1) : this._toggleSlide(this.index += 1) : $(e.target).hasClass("right") || $(e.target).parent().hasClass("right") ? this._toggleSlide(this.index += 1) : this._toggleSlide(this.index -= 1))
                    }
                }, {
                    key: "_toggleLoop",
                    value: function() {
                        for (var e = this.slideWrapper.filter(":first"), t = this.slideWrapper.filter(":last"), i = 0; i < this.slideWrapper.length; i++) this.slideWrapper.eq(i).attr("data-slide", i);
                        e.before(t.clone(!0).addClass("clone")), t.after(e.clone(!0).addClass("clone")), this.slideWrapper = this.slider.find(".img-wrapper"), this.slidesCount = this.slideWrapper.length - 1
                    }
                }, {
                    key: "_toggleAutoPlay",
                    value: function() {
                        var e = this,
                            t = this.slider.find(".img-slider-container, .img-slider-controls, .img-slider-indicators li"),
                            i = this.index,
                            n = function() {
                                e._toggleSlide(e.index += 1), i = e.index, i++, i > e.slidesCount && (clearInterval(a), e.slideContainer.addClass("disable-autoplay"))
                            },
                            a = setInterval(n, this.options.slideInterval);
                        t.on("click mouseenter touchstart mouseleave", function() {
                            clearInterval(a)
                        }), t.on("mouseleave touchend", function() {
                            i < e.slidesCount && !e.slideContainer.hasClass("disable-autoplay") ? a = setInterval(n, e.options.slideInterval) : (e.slideContainer.addClass("disable-autoplay"), clearInterval(a))
                        }), $(window).one("blur", function() {
                            clearInterval(a)
                        })
                    }
                }, {
                    key: "_toggleSlide",
                    value: function(e) {
                        var t = this,
                            i = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
                        this.index = e, this.slideContainer.css("transition", "transform " + this.options.slideAnimation + "s " + this.options.slideAnimationType).css("transform", "" + this._setDirection(e * this.slideWidth)).one(i, function(i) {
                            t.slideWrapper.eq(t.index).addClass("active"), t._checkLoopIndex(e), t.slideContainer.trigger("slid.image.carousel")
                        })
                    }
                }, {
                    key: "_toggleActive",
                    value: function(e) {
                        var t = this.slider.find(e).not(".clone"),
                            i = this.slideWrapper.eq(this.index).data("slide");
                        $(t).removeClass("active"), t.eq(i).addClass("active")
                    }
                }, {
                    key: "_setDirection",
                    value: function(e) {
                        return "rtl" == $("html").attr("dir") ? "translate3d(" + e + "px, 0px, 0px)" : "translate3d(-" + e + "px, 0px, 0px)"
                    }
                }, {
                    key: "_checkLoopIndex",
                    value: function(e) {
                        if (e == this.slidesCount || 0 == e) {
                            var t = void 0;
                            e == this.slidesCount ? (t = this.slideWrapper.width(), this.index = 1) : (t = this.slideWidth * (this.slidesCount - 1), this.index = this.slidesCount - 1), this.slideContainer.css("transition", ""), this.slideContainer.css("transform", "" + this._setDirection(t))
                        }
                        this.slideWrapper.removeClass("active"), this.slideWrapper.eq(this.index).addClass("active")
                    }
                }, {
                    key: "_formatSlides",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                            t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                            i = this.slideWrapper.length,
                            n = e * this.slideWidth;
                        this.slideWrapper.css("display", "block").css("width", 100 / i + "%"), t && this.slideContainer.css("transition", ""), this.slideContainer.css("width", 100 * i + "%").css("transform", "" + this._setDirection(n))
                    }
                }, {
                    key: "_calculateDistanceSwiped",
                    value: function() {
                        return this.distance ? Math.abs(this.index * this.slideWidth - this.distance) : 0
                    }
                }, {
                    key: "_calculateDistanceToSlide",
                    value: function(e) {
                        var t = e.originalEvent.touches[0].pageX;
                        return 0 == this.index && (this.index = this.slidesCount), this.index == this.slidesCount && (this.index = 1), "rtl" == $("html").attr("dir") ? this.index * this.slideWidth + (-this.touchstart + t) : this.index * this.slideWidth + (this.touchstart - t)
                    }
                }, {
                    key: "_isOneImage",
                    value: function() {
                        var e = {
                            controls: !1,
                            autoPlay: !1
                        };
                        this.slideWrapper.length <= 1 && (this.options = this._setOptions(e, this.options), this.slideContainer.off())
                    }
                }]), e
            }();
        i["default"] = u
    }, {
        "./utilities": 71
    }],
    37: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./utilities"),
            r = n(o),
            l = e("./image-slider"),
            u = n(l),
            c = function() {
                function e() {
                    a(this, e), this.init()
                }
                return s(e, [{
                    key: "init",
                    value: function() {
                        this._cacheDom(), this._bindEvents(), this.generateThumbnailIndexes(), this.$initEasyZoom = $(".product-easyzoom").easyZoom(), this.$initEazyZoomImageViewer = $(".popup-easyzoom").easyZoom(), this.easyZoomApi = this.$initEasyZoom.data("easyZoom"), this.imageSliderApi
                    }
                }, {
                    key: "_cacheDom",
                    value: function() {
                        this.$summaryThumbnails = $(".thumbnail-container img"), this.$summaryVideoThumbnails = $(".thumbnail-container").find(".video-container img"), this.$summaryImage = $(".product-summary-image"), this.$ImageViewerContainer = $(".full-image-container"), this.$imageViewerThumbnails = $(".thumbnails img"), this.isImageSliderLoaded = !1, this.togglePlayPause = !1, this.$transBG = $("#transBG")
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        var e = this;
                        this.$summaryThumbnails.on("click.iherb", this._switchSummaryImage.bind(this)), this.$summaryVideoThumbnails.on("click.iherb", this._playLargeVideo.bind(this)), this.$summaryImage.on("click.iherb", this._openImageViewer.bind(this)), this.$summaryImage.on("mouseenter", this._updateFlyOut.bind(this)), this.$transBG.on("click.iherb", this._closeImageViewer.bind(this)), $(window).on("resize", r["default"].debounce(this._reInitEasyZoom.bind(this), 200)), $(".icon-circlex").on("click.iherb", this._closeImageViewer.bind(this)), $("#image-viewer .img-wrapper").on("click", function(t) {
                            e._togglePlayPause(t)
                        })
                    }
                }, {
                    key: "_initImageSlider",
                    value: function() {
                        this.imageSliderApi = new u["default"]("#image-viewer", {
                            indicators: !0,
                            slideAnimation: .6,
                            controls: !0,
                            slideInterval: 6e3,
                            thumbNails: !0,
                            slideWidth: $("#image-viewer .img-slider")
                        })
                    }
                }, {
                    key: "_playLargeVideo",
                    value: function(e) {
                        this.$summaryThumbnails.removeClass("selected");
                        var t = $(e.target).addClass("selected").data("index"),
                            i = $("#image-viewer").find(".img-wrapper").not(".clone").eq(t).find("iframe").data("video-index");
                        this._openImageViewer(), this.imageSliderApi._toggleSlide(t + 1), this.imageSliderApi._toggleActive(".img-slider-thumbnails img"), setTimeout(function() {
                            window.youtubeVideos.players[0][i].playVideo && window.youtubeVideos.players[0][i].playVideo()
                        }, 500)
                    }
                }, {
                    key: "_togglePlayPause",
                    value: function(e) {
                        var t = $(e.target).find("iframe"),
                            i = t.data("video-index");
                        t.length > 0 && (this.togglePlayPause ? (window.youtubeVideos.players[0][i].pauseVideo(), this.togglePlayPause = !1) : (window.youtubeVideos.players[0][i].playVideo(), this.togglePlayPause = !0))
                    }
                }, {
                    key: "_pauseAllVideos",
                    value: function() {
                        window.youtubeVideos.players[0].forEach(function(e) {
                            e.pauseVideo && e.pauseVideo()
                        })
                    }
                }, {
                    key: "_switchSummaryImage",
                    value: function(e) {
                        function t() {
                            this._appendImage(n), this._reInitEasyZoom()
                        }
                        var i = $(e.target),
                            n = i.data("largeImg");
                        n && (t.call(this), this._updateSelectedSummaryThumbnail(i))
                    }
                }, {
                    key: "_updateSelectedSummaryThumbnail",
                    value: function(e) {
                        this.$summaryThumbnails.removeClass("selected"), e.addClass("selected")
                    }
                }, {
                    key: "_appendImage",
                    value: function(e) {
                        var t = this.$summaryImage.find("img").attr("alt"),
                            i = '\n            <a href="' + e + '">\n                <img id="iherb-product-image"\n                    src="' + e + '" \n                    srcset="' + e + '" \n                    width="300"\n                    height="300"\n                    alt="' + t + '">\n            </a>\n        ';
                        this.$summaryImage.addClass("easyzoom"), this.$summaryImage.html(i)
                    }
                }, {
                    key: "generateThumbnailIndexes",
                    value: function() {
                        var e = $(".thumbnails").find("img"),
                            t = $(".thumbnail-container").find("img");
                        this.appendIndexes(e), this.appendIndexes(t)
                    }
                }, {
                    key: "appendIndexes",
                    value: function(e) {
                        e.each(function(e, t) {
                            t.dataset.index = e
                        })
                    }
                }, {
                    key: "_reInitEasyZoom",
                    value: function() {
                        this.easyZoomApi.teardown(), this.easyZoomApi._init()
                    }
                }, {
                    key: "_openImageViewer",
                    value: function(e) {
                        this._checkWindowSize(), this.$ImageViewerContainer.show(), this._lazyLoadImages(".img-wrapper"), this.$transBG.removeClass("hide").show(), this.isImageSliderLoaded || (this._initImageSlider(), this.isImageSliderLoaded = !0);
                        var t = $(".thumbnail-container").find(".selected").data("index");
                        this.imageSliderApi._toggleSlide(t + 1), this.imageSliderApi._toggleActive(".img-slider-thumbnails img")
                    }
                }, {
                    key: "_closeImageViewer",
                    value: function(e) {
                        this.$transBG.hide(), this.$ImageViewerContainer.hide(), this._pauseAllVideos();
                        var t = $(".img-slider-thumbnails").find("active"),
                            i = (t.data("slide"), t.data("video"));
                        i || this._reInitEasyZoom()
                    }
                }, {
                    key: "_checkWindowSize",
                    value: function() {
                        $(window).height() <= 901 || $(window).width() <= 801 ? this.$ImageViewerContainer.addClass("container-small") : this.$ImageViewerContainer.removeClass("container-small")
                    }
                }, {
                    key: "_updateFlyOut",
                    value: function() {
                        setTimeout(function() {
                            var e = $(".product-description-specifications").width(),
                                t = $(".easyzoom-flyout"),
                                i = t.offset() || 0,
                                n = ($(window).height() - i.top, $(window).width() - i.left);
                            $(window).width() > 1125 ? t.css("width", e) : t.css("width", n - 15), t.css("height", 415)
                        }, 250)
                    }
                }, {
                    key: "_lazyLoadImages",
                    value: function(e) {
                        $(e).find("img").each(function() {
                            var e = $(this).attr("data-lazyload");
                            $(this).attr("src", e).removeAttr("data-src")
                        })
                    }
                }]), e
            }();
        i["default"] = c
    }, {
        "./image-slider": 36,
        "./utilities": 71
    }],
    38: [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i["default"] = $.fn.responsiveCarousel = function(e) {
            function t() {
                return r.each(function() {
                    var e = $(this);
                    e.find(".item > .product").unwrap(), setTimeout(function() {
                        var t = e.find('[class*="-inner"]'),
                            o = 0;
                        i(e, t), o = t.children(".item").length, s(e, o), a(e, o), n(e, o)
                    }, l.delay)
                })
            }

            function i(e, t) {
                for (var i = o(e), n = t.children(".product"), a = $("<div />").addClass("item carouselRow"), s = 0 == e.find(".item.active").length, r = 0; r < $(n).length; r += i) $(n).slice(r, r + i).wrapAll(a);
                s && e.find(".item:first-child").addClass("active")
            }

            function n(e, t) {
                var i = 0,
                    n = e.find(".carousel-indicators"),
                    a = void 0;
                if (t <= 1) e.find(".control-bar").hide(), e.find(".carousel-control").hide();
                else if (n.length && (a = n.data("target"), n.empty(), n.length)) {
                    for (; i < t; i++) {
                        var s = $("<li />", {
                            "data-slide-to": i,
                            "data-target": a,
                            "class": 0 === i ? "active" : ""
                        });
                        n.append(s)
                    }
                    $(".control-bar a").addClass("show-inline-block"), e.find(".carousel-control").show()
                }
            }

            function a(e, t) {
                var i, n = e.find(".carousel-pagination");
                n.length && (i = e.find(".carousel"), n.text("1 of " + t), i.on("slid.bs.carousel", function(e) {
                    var t = $(e.target).data("bs.carousel"),
                        i = t.getItemIndex(t.$element.find(".item.active")),
                        a = t.$items.length,
                        s = "";
                    s = i + 1 + " of " + a, n.text(s)
                }))
            }

            function s(e, t) {
                var i = e.find(".controls");
                t < 2 ? i.hide() : i.show()
            }

            function o(e) {
                var t = window.innerWidth,
                    i = l.imagePerRow;
                return t >= l.windowMediumMin ? 12 == l.imagePerRow ? 11 : i : t >= l.windowSmallMax && t < l.windowMediumMin ? 12 == l.imagePerRow ? 8 : i - 1 : 12 == l.imagePerRow ? 6 : i - 1
            }
            var r = this,
                l = $.extend({}, $.fn.responsiveCarousel.defaults, e);
            0 != r.length && ($(window).on("load resize", function() {
                t()
            }), l.update === !0 && t())
        }, $.fn.responsiveCarousel.defaults = {
            delay: 100,
            imagePerRow: 5,
            windowSmallMax: 991,
            windowMediumMin: 1200
        }
    }, {}],
    39: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("./utilities"),
            s = n(a);
        i["default"] = $.fn.swipe = function(e) {
            var t = {
                threshold: 50
            };
            return e && $.extend(t, e), this.each(function() {
                function e(e) {
                    1 == e.touches.length && (a = e.touches[0].pageX, o = !0, this.addEventListener("touchmove", s["default"].debounce(i, 100), !1))
                }

                function i(e) {
                    if (o) {
                        var i = e.touches[0].pageX,
                            s = a - i;
                        Math.abs(s) >= t.threshold && (n.call(this), s > 0 ? $(this).carousel("next") : $(this).carousel("prev"))
                    }
                }

                function n() {
                    this.removeEventListener("touchmove", i), a = null, o = !1
                }
                var a, o = !1;
                "ontouchstart" in window && this.addEventListener("touchstart", e, !1)
            }), this
        }
    }, {
        "./utilities": 71
    }],
    40: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./http"),
            r = n(o),
            l = e("./constants"),
            u = n(l),
            c = function() {
                function e(t) {
                    a(this, e), this.$latestBlogContainer = t, this.init()
                }
                return s(e, [{
                    key: "init",
                    value: function() {
                        var e = this;
                        this.$latestBlogContainer.length && r["default"].get("" + u["default"].url.getLatestBlogArticles).then(function(t) {
                            e.renderToDOM(t)
                        })
                    }
                }, {
                    key: "renderToDOM",
                    value: function(e) {
                        var t = this;
                        if (e.length >= 6) {
                            var i = "",
                                n = e.map(function(e, i) {
                                    return t.createBlogCard(e, i)
                                });
                            i = '<div class="left-articles col-xs-11">\n                            ' + this.innerHTML(n) + "\n                          </div>", this.$latestBlogContainer.show().find(".flex-container").html(i)
                        }
                    }
                }, {
                    key: "createBlogCard",
                    value: function(e, t) {
                        return '<div class="article-card col-xs-12 col-lg-8 ' + (2 == t || 5 == t ? "visible-lg visible-xl" : "") + '">\n                    <div class="link-overlay-container">\n                        <a href="' + e.BlogURL + '" class="link-overlay" data-ga-event="click" data-ga-event-category="Ecommerce" data-ga-event-action="Clicks Blog" data-ga-event-label="Blog Article Click"></a>\n                        <img class="img-responsive" src="' + e.ImageURL + '">\n                        <a href="' + e.BlogURL + '" class="article-title line-clamp-2" data-ga-event="click" data-ga-event-category="Ecommerce" data-ga-event-action="Clicks Blog" data-ga-event-label="Blog Article Click">\n                            ' + e.ArticleTitle + "\n                        </a>\n                    </div>\n                </div>"
                    }
                }, {
                    key: "innerHTML",
                    value: function(e) {
                        var t = this,
                            i = "";
                        return e.forEach(function(e, n) {
                            i += e, 2 == n && (i += t.createBlogLink())
                        }), i
                    }
                }, {
                    key: "createBlogLink",
                    value: function() {
                        var e = this.$latestBlogContainer.data("icon-url");
                        return '</div>\n                    <div class="blog-link-container">\n                        <a href="/blog" data-ga-event="click" data-ga-event-category="Ecommerce" data-ga-event-action="Clicks Blog" data-ga-event-label="Visits Our Blog">\n                            <img src="' + e + '">\n                        </a>\n                    </div>\n                <div class="right-articles col-xs-11">'
                    }
                }]), e
            }();
        i["default"] = c
    }, {
        "./constants": 26,
        "./http": 34
    }],
    41: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./utilities"),
            r = n(o),
            l = function() {
                function e(t) {
                    a(this, e), this._bindEvents(t)
                }
                return s(e, [{
                    key: "_bindEvents",
                    value: function(e) {
                        var t = this;
                        $(e).on("click.iherb", "[data-slide], .carousel-indicators li", function(i) {
                            t.loadCarouselImages(i, e.id)
                        }), $(e)[0].addEventListener("touchmove", r["default"].debounce(function(i) {
                            t.loadCarouselImages(i, e.id)
                        }, 100), !1)
                    }
                }, {
                    key: "loadCarouselImages",
                    value: function(e, t) {
                        var i = $(e.target).closest("[id$=" + t + "]"),
                            n = i.find(".product [data-image]");
                        n.length > 0 && (this._appendImageLink(n), this._disableLazyLoad(n))
                    }
                }, {
                    key: "_appendImageLink",
                    value: function(e) {
                        e.each(function(e, t) {
                            var i = $(t);
                            i.html('<img src="' + i.data("image") + '" />')
                        })
                    }
                }, {
                    key: "_disableLazyLoad",
                    value: function(e) {
                        e.removeAttr("data-image")
                    }
                }]), e
            }();
        i["default"] = l
    }, {
        "./utilities": 71
    }],
    42: [function(e, t, i) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t
            }
        }();
        i["default"] = new(function() {
            function e() {
                n(this, e), this.timers = []
            }
            return a(e, [{
                key: "show",
                value: function() {
                    this.$loader = $(".loader"), this.timers.push(setTimeout(this._execute.bind(this), 0))
                }
            }, {
                key: "hide",
                value: function() {
                    this.timers.length > 0 && (clearTimeout(this.timers[0]), this.timers.splice(0, 1), this.$loader.removeClass("loading"))
                }
            }, {
                key: "_execute",
                value: function() {
                    this.$loader.addClass("loading")
                }
            }]), e
        }())
    }, {}],
    43: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./loader"),
            r = n(o),
            l = e("./http"),
            u = n(l),
            c = function() {
                function e() {
                    a(this, e), this._bindEvents()
                }
                return s(e, [{
                    key: "_bindEvents",
                    value: function() {
                        $(".bloghome").on("click.iherb.xpagination", ".xpagination a", this._getArticles.bind(this))
                    }
                }, {
                    key: "_getArticles",
                    value: function(e) {
                        var t = $(e.target),
                            i = t.is("a") && t || t.closest("a");
                        r["default"].show(), e.preventDefault(), u["default"].get(this._generateUrl(i)).done(function(e) {
                            var t = $(".explore-articles");
                            t.replaceWith(e), setTimeout(function() {
                                r["default"].hide()
                            }, 400)
                        })
                    }
                }, {
                    key: "_generateUrl",
                    value: function(e) {
                        var t = $(".explore-articles").data("blog-id"),
                            i = new RegExp("/blog\\?p=(\\d+)"),
                            n = e.data("url").match(i);
                        return "/CustomBlog/BlogAjax?p=" + n[1] + "&bid=" + t
                    }
                }]), e
            }();
        i["default"] = c
    }, {
        "./http": 34,
        "./loader": 42
    }],
    44: [function(e, t, i) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = function() {
                function e() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ".popup-modal",
                        i = this,
                        a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ".popup-container",
                        s = arguments[2];
                    n(this, e), this.openPopup = function(e) {
                        i._showPopupModal(e), i.callback && i.callback()
                    }, this._cacheDOM(t, a, s), $(document).on("click", this.popupTriggerClass, this.openPopup.bind(this))
                }
                return a(e, [{
                    key: "_cacheDOM",
                    value: function(e, t, i) {
                        this.popupTriggerClass = e, this.popupContainerClass = t, this.callback = i, this.size = "500px", this.$containerDiv = $("<div />", {
                            "class": "popup-close"
                        }), this.popupButton = $(this.$containerDiv.append($("<i />", {
                            "class": "icon-circlex"
                        })))
                    }
                }, {
                    key: "_showPopupModal",
                    value: function(e) {
                        var t = void 0;
                        $("#transBG").removeClass("hide").show(), t = ".popup-container" == this.popupContainerClass ? $(e.target).closest(this.popupTriggerClass).next() : $(this.popupContainerClass), t.prepend(this.popupButton).addClass("show").css("width", this.size), this._bindCloseEvent()
                    }
                }, {
                    key: "_bindCloseEvent",
                    value: function() {
                        var e = this;
                        $(".transparency, .popup-close, .btnCancel").on("click", function() {
                            e.close()
                        })
                    }
                }, {
                    key: "close",
                    value: function() {
                        $("#transBG").hide(), $(this.popupContainerClass).removeClass("show"), $(this.popupContainerClass).css("display", "none"), $(".popup-close").remove()
                    }
                }]), e
            }();
        i["default"] = s
    }, {}],
    45: [function(e, t, i) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = function() {
                function e() {
                    n(this, e), this.$modelPropsProduct = $(".model-properties-product-history");
                    var t = this.$modelPropsProduct.data("product-isloggedin");
                    "TRUE" == t.toUpperCase() && this._ajax().done(this.success)
                }
                return a(e, [{
                    key: "_ajax",
                    value: function() {
                        var e = this.$modelPropsProduct.data("product-ordered-url"),
                            t = this.$modelPropsProduct.data("product-ordered-customerid"),
                            i = this.$modelPropsProduct.data("product-ordered-id");
                        return $.ajax({
                            headers: {
                                "x-ajax": "1"
                            },
                            xhrFields: {
                                withCredentials: !0
                            },
                            url: e + "cid=" + t + "&pid=" + i,
                            type: "GET",
                            cache: !1
                        })
                    }
                }, {
                    key: "success",
                    value: function(e) {
                        if (!$.isEmptyObject(e)) {
                            var t = e.custPH._orderNumber,
                                i = e.custPH._orderDate,
                                n = e.custPH._productId;
                            $(".product-ordered-date").text(i), $(".product-ordered-link").prop("href", "/myaccount/ordersummary?on=" + t), $(".product-past-purchased").removeClass("hide"), $(".product-review-link").prop("href", "/Write-Review?pid=" + n), $(".product-bdi").find("span").removeClass("hide")
                        }
                    }
                }]), e
            }();
        i["default"] = s
    }, {}],
    46: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./dropdown"),
            r = n(o),
            l = e("./product-attribute-tiles"),
            u = n(l),
            c = e("./loader"),
            d = n(c),
            h = e("./utilities"),
            p = n(h),
            f = function() {
                function e(t) {
                    a(this, e), this.$dropdownElement = $(".product-grouping-row"), this.$tileElements = $(".attribute-tile-group"), (this.$dropdownElement.length || this.$tileElements.length) && (this.init(), this.reinitCallback = t.bind(this))
                }
                return s(e, [{
                    key: "init",
                    value: function() {
                        this.moveGroupingElement(), this.createDropdowns(), this.createTileGroupings(), this.bindEvents()
                    }
                }, {
                    key: "bindEvents",
                    value: function() {
                        var e = this;
                        $(window).on("resize", p["default"].throttle(this.moveGroupingElement.bind(this), 200)), this.$dropdownElement.on("click", ".item", function(t) {
                            return e.loadNewProduct(e.reinitCallback, t)
                        })
                    }
                }, {
                    key: "moveGroupingElement",
                    value: function() {
                        window.innerWidth < 992 ? $(".product-attribute-grouping").insertAfter($(".product-description-specifications")) : $(".product-attribute-grouping").insertAfter($(".product-description-stock-status"))
                    }
                }, {
                    key: "createTileGroupings",
                    value: function() {
                        var e = this;
                        this.$tileElements.each(function(t, i) {
                            e["productAttrTiles-" + t] = new u["default"](i, function(t) {
                                return e.loadNewProduct(e.reinitCallback, t)
                            })
                        })
                    }
                }, {
                    key: "createDropdowns",
                    value: function() {
                        this.$dropdownElement.each(function(e, t) {
                            var i = $(t).find(".selection.dropdown");
                            this["productAttrDropdown-" + e] = new r["default"](i)
                        })
                    }
                }, {
                    key: "loadNewProduct",
                    value: function(e, t) {
                        var i = $(t.currentTarget),
                            n = i.data("pid"),
                            a = /pr\/.*\/(\d+)/g.exec(document.location.pathname),
                            s = i.data("url");
                        a[1] != n && (d["default"].show(), $(".product-grouping-wrapper").load(s + " .product-grouping-refresh", function() {
                            $(document).off(".add-to-cart .add-both-to-cart"), history.replaceState({}, "", s), e(), d["default"].hide()
                        }))
                    }
                }]), e
            }();
        i["default"] = f
    }, {
        "./dropdown": 30,
        "./loader": 42,
        "./product-attribute-tiles": 47,
        "./utilities": 71
    }],
    47: [function(e, t, i) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = function() {
                function e(t, i) {
                    n(this, e), this.$tileGroup = $(t), this.defaultOption = this.$tileGroup.siblings(".current-item").data("current-item"), this.loadNewProduct = i, this.bindEvents()
                }
                return a(e, [{
                    key: "bindEvents",
                    value: function() {
                        var e = this;
                        this.$tileGroup.on("click", ".attribute-tile, .thumbnail-tile", this.loadNewProduct.bind(this)), this.$tileGroup.on("mouseenter", ".attribute-tile, .thumbnail-tile", function(t) {
                            e.populateAttributeTitle(e.generateLabel(t))
                        }), this.$tileGroup.on("mouseleave", ".attribute-tile, .thumbnail-tile", this.populateAttributeTitle.bind(this, this.defaultOption))
                    }
                }, {
                    key: "populateAttributeTitle",
                    value: function(e) {
                        var t = this.$tileGroup.closest(".product-grouping-row").find(".current-item");
                        t.html(e)
                    }
                }, {
                    key: "generateLabel",
                    value: function(e) {
                        var t = $(e.target),
                            i = t.find(".attribute-name"),
                            n = i.data("availability"),
                            a = i.data("stock-status"),
                            s = n && n.length > 1,
                            o = a && a.length > 1;
                        return i.text() + " " + (s ? '<span class="availability-message">(' + n + ")</span>" : "") + " " + (o ? '- <span class="stock-message">' + a + "</span>" : "")
                    }
                }]), e
            }();
        i["default"] = s
    }, {}],
    48: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./utilities"),
            r = n(o),
            l = e("./constants"),
            u = (n(l), e("./http")),
            c = (n(u), function() {
                function e() {
                    a(this, e)
                }
                return s(e, [{
                    key: "getProductElements",
                    value: function(e) {
                        var t = this;
                        return e.map(function(e) {
                            return $(t._generateProductCard(e))
                        })
                    }
                }, {
                    key: "_generateProductCard",
                    value: function(e) {
                        if (e) return '\n            <div id="product' + e.Id + '" class="product-card">\n                ' + this._generateProductInnerHtml(e) + "\n            </div>\n        "
                    }
                }, {
                    key: "_generateCountryFlag",
                    value: function(e, t) {
                        return '\n            <div class="text-center location">\n                <span class="flag-sprite ' + e + '"></span><span class="country-name">' + t + "</span>\n            </div>"
                    }
                }, {
                    key: "_generateProductInnerHtml",
                    value: function(e) {
                        var t = e.Name,
                            i = e.ProductURL,
                            n = e.ProductImage,
                            a = e.ProductImageRetina;
                        return '\n            <div class="product-inner">\n                <a class="product-image" data-prodhref="prodHref" href="' + i + '">\n                    <img src="' + n + '" srcset="' + a + " 1x, " + n + ' 1.5x" alt="' + t + '" itemprop="image" data-img="img" data-imgtitle="title" title="' + t + '" width="120" height="120">\n                </a>\n\n                <a data-content="title" data-prodhref="prodHref" href="' + i + '">\n                    <span itemprop="name" class="product-title">\n                        <bdi>' + t + '</bdi>\n                    </span>\n                </a>\n                        \n                <div class="rating">\n                    ' + this._generateRatingHtml(e) + '\n                </div>\n\n                <div class="product-price">\n                    ' + this._generatePricingHtml(e) + "\n                </div>  \n            </div>\n        "
                    }
                }, {
                    key: "_generateRatingHtml",
                    value: function(e) {
                        var t = e.HasRating,
                            i = e.Rating,
                            n = e.ProductURL,
                            a = e.RatingText,
                            s = e.RatingCount;
                        if (t && i > 0) {
                            var o = r["default"].roundRating(i).replace(/[-.]/g, "");
                            return '\n                <a class="stars" href="' + n + '#product-detail-reviews">\n                    <i class="icon-stars_' + o + ' full" title="' + a + '"></i>\n                    <i class="icon-stars_50 empty"></i>\n                </a>\n                <a class="rating-count" href="' + n + '#product-detail-reviews" title="' + a + '">\n                    <span>' + s + "</span>\n                </a>\n            "
                        }
                        return '<div class="no-rating"></div>'
                    }
                }, {
                    key: "_generatePricingHtml",
                    value: function(e) {
                        var t = e.DiscountPrice,
                            i = e.ListPrice;
                        return t != i ? '\n                <span class="price discount-green">\n                    <bdi>' + t + "</bdi data-duncan>\n                </span>\n            " : '\n                <span class="price">\n                    <bdi>' + i + "</bdi>\n                </span>\n            "
                    }
                }]), e
            }());
        i["default"] = c
    }, {
        "./constants": 26,
        "./http": 34,
        "./utilities": 71
    }],
    49: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./loader"),
            r = n(o),
            l = e("./http"),
            u = n(l),
            c = e("./related-blog-articles"),
            d = n(c),
            h = e("../modules/compare-products"),
            p = n(h),
            f = function() {
                function e(t, i) {
                    a(this, e), this.productFilters = t, this.deferImages = i, this._getList = window.history && history.pushState ? this._ajax : this._nonAjax, this.init()
                }
                return s(e, [{
                    key: "init",
                    value: function() {
                        d["default"]._showHideBlogsSection(), $(document).on("click.iherb.xpagination", ".xpagination-link, .xpagination-next, .xpagination-last", $.proxy(this._click, this))
                    }
                }, {
                    key: "_click",
                    value: function(e) {
                        var t = $(e.target),
                            i = t.is("a") && t || t.closest("a"),
                            n = i.data("url");
                        e.preventDefault(), this._getList(n)
                    }
                }, {
                    key: "_nonAjax",
                    value: function(e) {
                        window.location.href = e
                    }
                }, {
                    key: "_updateResultsCount",
                    value: function() {
                        var e = $("#product-count"),
                            t = $(".display-items"),
                            i = e.data("count"),
                            n = e.text();
                        0 !== i ? t.text(n) : t.text("")
                    }
                }, {
                    key: "_ajax",
                    value: function(e) {
                        var t = this;
                        r["default"].show(), u["default"].get(e).then(function(i) {
                            var n = document.getElementById("ProductsPage");
                            history.pushState(e, null, e), n.innerHTML = i, t.productFilters.init(), t._updateResultsCount();
                            new p["default"];
                            t.deferImages.loadImages(), d["default"]._showHideBlogsSection(), r["default"].hide(), n.getBoundingClientRect().top <= 0 && n.scrollIntoView()
                        })
                    }
                }]), e
            }();
        i["default"] = f
    }, {
        "../modules/compare-products": 25,
        "./http": 34,
        "./loader": 42,
        "./related-blog-articles": 56
    }],
    50: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("../modules/utilities"),
            r = n(o),
            l = e("../modules/loader"),
            u = n(l),
            c = e("../modules/search-filter"),
            d = n(c),
            h = e("../modules/compare-products"),
            p = n(h),
            f = e("../modules/product-list-pagination"),
            g = n(f),
            v = function() {
                function e(t) {
                    a(this, e), this.deferImages = t, this._pagination = new g["default"](this, this.deferImages), this._popups, this._search, this.getList, this.filtersUIState = {}, window.history && history.pushState ? (this.getList = this._ajax, history.replaceState(document.location.href, null, document.location.href)) : this.getList = this._nonAjax, $(document).on("click.iherb.product-filter", ".filter-item", $.proxy(this._filterClick, this)).on("click.iherb.product-filter", ".search-within", $.proxy(this._searchWithinClick, this)).on("click.iherb.product-filter", ".toggle-view-type", $.proxy(this._duder, this)).on("click.iherb.product-filter", ".toggle-weight-preference", $.proxy(this._duder, this)).on("click.iherb.product-filter", ".filter-toggle .filter-header", $.proxy(this.collapseExpand, this)).on("click.iherb.product-filter", ".applied-filter, .applied-filter-clear", $.proxy(this._appliedFilter, this)).on("click.iherb.product-filter", ".range-filter", $.proxy(this._range, this)).on("change.iherb.product-filter", ".dropdown-sort", $.proxy(this._sort, this)).on("click.iherb.brands-of-week-filter", ".multi-image", function(e) {
                        var t = $(e.target).data("brand-id"),
                            i = window.location.pathname + "?bids=" + t;
                        this._ajax(i)
                    }.bind(this)), window.onpopstate = function(e) {
                        e.state && this.back(e.state)
                    }.bind(this), this.init()
                }
                return s(e, [{
                    key: "init",
                    value: function() {
                        this._popups = new iHerb.Popup, this._search = new d["default"](".brands-search"), this._categorySearch = new d["default"](".health-topic-search"), this._checkScroll(), this.queryParamCpt = "cpt", this.queryParamWpc = "wpc", this.initialFiltersState()
                    }
                }, {
                    key: "collapseExpand",
                    value: function(e) {
                        var t = $(e.currentTarget).closest(".filter-section");
                        t.hasClass("filter-collapse") ? (t.removeClass("filter-collapse"), t.addClass("filter-expand")) : this.collapseFilter(t), this.setFilterState(t)
                    }
                }, {
                    key: "collapseFilter",
                    value: function(e) {
                        e.removeClass("filter-expand"), e.addClass("filter-collapse")
                    }
                }, {
                    key: "openFilter",
                    value: function(e) {
                        e.addClass("filter-expand"), e.removeClass("filter-collapse")
                    }
                }, {
                    key: "_range",
                    value: function(e) {
                        var t = $(e.target),
                            i = t.parent(),
                            n = i.find(".range-min"),
                            a = i.find(".range-max"),
                            s = parseInt(n.val(), 10) || 0,
                            o = parseInt(a.val(), 10) || 0,
                            r = 0;
                        s > o && (r = s, s = o, o = r), this.getList(n.data("url") + s + a.data("url") + o)
                    }
                }, {
                    key: "_sort",
                    value: function(e) {
                        var t = $(e.target),
                            i = t.hasClass("dropdown-sort") && t || t.closest(".dropdown-sort"),
                            n = i.data("url"),
                            a = i.val();
                        this.getList(n + a)
                    }
                }, {
                    key: "_filterClick",
                    value: function(e) {
                        var t = $(e.target);
                        t.is("input") || t.find("input").length > 0 ? this._inputFilter(e) : this._linkFilter(e)
                    }
                }, {
                    key: "_searchWithinClick",
                    value: function(e) {
                        var t = $(e.target).prev(".form-control"),
                            i = this._getQueryStringValue("swkw"),
                            n = i.length > 0 ? "," : "";
                        e.preventDefault(), t.val().length > 0 && this.getList(t.data("url") + n + t.val())
                    }
                }, {
                    key: "_duder",
                    value: function(e) {
                        var t = $(e.target);
                        this._customFilterAction(e, t)
                    }
                }, {
                    key: "_appliedFilter",
                    value: function(e) {
                        var t = $(e.currentTarget),
                            i = t.data("url");
                        e.preventDefault(), this.getList(i)
                    }
                }, {
                    key: "_linkFilter",
                    value: function(e) {
                        e.preventDefault(), this._selectFilter(e)
                    }
                }, {
                    key: "_inputFilter",
                    value: function(e) {
                        var t = $(e.target);
                        "LABEL" !== t.prop("tagName") && (t.hasClass("custom-action") ? this._customFilterAction(e, t) : this._selectFilter(e))
                    }
                }, {
                    key: "_customFilterAction",
                    value: function(e, t) {
                        this._isUpdateHistory = !1;
                        var i = t.attr("name");
                        switch (i) {
                            case this.queryParamWpc:
                                var n = $("#weight-preference"),
                                    a = "",
                                    s = "";
                                if (!t.is(":checkbox")) {
                                    var o = t.data("current-wpc");
                                    n.prop("checked", 1 === o)
                                }
                                s = n.is(":checked") ? 2 : 1, a = r["default"].queryString.updateValue(this.queryParamWpc, s), this._selectFilter(e, a);
                                break;
                            case this.queryParamCpt:
                                var l = t.data("view-type"),
                                    a = r["default"].queryString.updateValue(this.queryParamCpt, l);
                                this._selectFilter(e, a)
                        }
                    }
                }, {
                    key: "_filter",
                    value: function(e) {
                        var t = this._getFilter(e),
                            i = t.data("url");
                        this.getList(i)
                    }
                }, {
                    key: "_selectFilter",
                    value: function(e, t) {
                        var i = this._getFilter(e),
                            n = i.data("url");
                        this._select(i), this.getList(n || t)
                    }
                }, {
                    key: "_select",
                    value: function(e) {
                        e.hasClass("selected-filter") ? e.removeClass("selected-filter") : e.addClass("selected-filter")
                    }
                }, {
                    key: "_getFilter",
                    value: function(e) {
                        var t = $(e.target),
                            i = t.hasClass("filter") && t || t.closest(".filter"),
                            n = e.target.tagName.toUpperCase();
                        return "LI" != n && "DIV" != n || (i = t.find(".filter")), i
                    }
                }, {
                    key: "_checkScroll",
                    value: function() {
                        var e = $(".filter-column .filter-list"),
                            t = 279;
                        $(e).each(function() {
                            $(this).height() > t ? $(this).addClass("scroll") : $(this).addClass("no-scroll")
                        })
                    }
                }, {
                    key: "_getQueryStringValue",
                    value: function(e) {
                        for (var t = location.search.substring(1), i = t.split("&"), n = 0; n < i.length; n++) {
                            var a = i[n].split("=");
                            if (a[0] == e) return a[1]
                        }
                        return !1
                    }
                }, {
                    key: "_validateInput",
                    value: function(e) {
                        return e.replace(/[^a-z\d\s]/gi, "")
                    }
                }, {
                    key: "_nonAjax",
                    value: function(e) {
                        window.location.href = e
                    }
                }, {
                    key: "_ajax",
                    value: function(e) {
                        u["default"].show(), $.ajax({
                            url: e,
                            cache: !1,
                            type: "GET",
                            success: function(t) {
                                var i = r["default"].queryString.removeKeys(e, this.queryParamWpc, this.queryParamCpt);
                                history.pushState(e, null, i), $("#ProductsPage").html(this.updateFiltersUI(t)), this.init(), u["default"].hide(), this._updateResults(), this._checkScroll();
                                new p["default"];
                                this.deferImages.loadImages()
                            }.bind(this)
                        })
                    }
                }, {
                    key: "_updateResults",
                    value: function() {
                        var e = $("#product-count"),
                            t = $(".display-items"),
                            i = e.data("count"),
                            n = e.text();
                        0 !== i ? t.text(n) : t.text("")
                    }
                }, {
                    key: "initialFiltersState",
                    value: function() {
                        var e = this._filtersStateStorage("get");
                        e && (this.filtersUIState = e, $.each(this.filtersUIState, function(e, t) {
                            t ? this.collapseFilter($("#" + e)) : this.openFilter($("#" + e))
                        }.bind(this)))
                    }
                }, {
                    key: "_filtersStateStorage",
                    value: function(e, t) {
                        var i = "filterState";
                        switch (e) {
                            case "set":
                                r["default"].quickStorage.set(i, t, "session");
                                break;
                            case "get":
                                return r["default"].quickStorage.get(i)
                        }
                    }
                }, {
                    key: "setFilterState",
                    value: function(e) {
                        var t = e.attr("id"),
                            i = e.hasClass("filter-collapse");
                        this.filtersUIState[t] = i, this._filtersStateStorage("set", this.filtersUIState)
                    }
                }, {
                    key: "updateFiltersUI",
                    value: function(e) {
                        var t = $(e);
                        return $.each(this.filtersUIState, function(e, i) {
                            i ? this.collapseFilter(t.find("#" + e)) : this.openFilter(t.find("#" + e))
                        }.bind(this)), t
                    }
                }, {
                    key: "back",
                    value: function(e) {
                        u["default"].show(), $.ajax({
                            url: e,
                            cache: !1,
                            type: "GET",
                            success: function(e) {
                                $("#ProductsPage").html(e), this.init(), u["default"].hide()
                            }.bind(this)
                        })
                    }
                }]), e
            }();
        i["default"] = v
    }, {
        "../modules/compare-products": 25,
        "../modules/loader": 42,
        "../modules/product-list-pagination": 49,
        "../modules/search-filter": 64,
        "../modules/utilities": 71
    }],
    51: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./http"),
            r = n(o),
            l = e("./constants"),
            u = n(l),
            c = function() {
                function e() {
                    a(this, e), this.init()
                }
                return s(e, [{
                    key: "init",
                    value: function() {
                        this._cacheDom(), this._bindEvents()
                    }
                }, {
                    key: "_cacheDom",
                    value: function() {
                        this.shareEmailPopup = $("#share-email-popup"), this.emailContainer = $(".share-email-container"), this.confirmation = $(".email-sent-confirmation"), this.transBG = $("#transBG"), this._ugcToken = this.emailContainer.data("token"), this._bearerToken = {
                            Authorization: "Bearer " + this._ugcToken
                        }, this.incorrectPassword = $(".incorrect-password"), this.setTimeOut
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        var e = this;
                        $(".share-email, .icon-exit, #transBG").on("click", function() {
                            e._toggleShareEmail()
                        }), $(".submit-email").on("click", function() {
                            e._sendEmail()
                        }), this.incorrectPassword.on("click", function() {
                            e.incorrectPassword.hide()
                        })
                    }
                }, {
                    key: "_toggleShareEmail",
                    value: function() {
                        this.confirmation.is(":visible") && (this.confirmation.hide(), this.emailContainer.show()), $("#share-page-container").is(":visible") || $(".product-share").is(":visible") ? this.shareEmailPopup.is(":visible") ? (this.shareEmailPopup.hide(), this.transBG.hide()) : (this.shareEmailPopup.show(), this.transBG.show()) : (this.shareEmailPopup.hide(), this.transBG.hide()), $(".share-wrapper").hide(), clearTimeout(this.setTimeOut)
                    }
                }, {
                    key: "_sendEmail",
                    value: function() {
                        var e = this,
                            t = $("#share-email-model"),
                            i = {
                                recepients: $("#target-email").val(),
                                personalMessage: $("#personal-message").val(),
                                languageCode: $("#nav-language-code").val(),
                                senderName: $("#user-name").val(),
                                subjectTitle: $("#user-name").val() + " " + t.data("subject-email"),
                                productImageUrl: t.data("image-url"),
                                productTitle: t.data("title"),
                                discountPrice: t.data("discount-price"),
                                listPrice: t.data("list-price"),
                                savings: t.data("savings"),
                                productUrl: t.data("product-url")
                            };
                        if (!this._validateEmail(i.recepients)) return void this.incorrectPassword.show();
                        var n = this._post(u["default"].api.ugcEmail, i);
                        n.done(function(e) {
                            $(".input-field input").val(""), $(".input-field textarea").val("")
                        }), this.emailContainer.hide(), this.confirmation.show(), this.setTimeOut = setTimeout(function() {
                            e._toggleShareEmail()
                        }, 5e3)
                    }
                }, {
                    key: "_post",
                    value: function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return r["default"].postJSON(e, t, this._bearerToken).fail(function(e, t, i) {
                            console.error(e, i)
                        })
                    }
                }, {
                    key: "_validateEmail",
                    value: function(e) {
                        var t = /\S+@\S+\.\S+/;
                        return t.test(e)
                    }
                }]), e
            }();
        i["default"] = c
    }, {
        "./constants": 26,
        "./http": 34
    }],
    52: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e) {
            if (Array.isArray(e)) {
                for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
                return i
            }
            return Array.from(e)
        }

        function s(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            r = e("./utilities"),
            l = n(r),
            u = e("./constants"),
            c = n(u),
            d = e("./http"),
            h = n(d),
            p = e("./loader"),
            f = n(p),
            g = e("../modules/popup"),
            v = n(g),
            m = e("./sanitize-input"),
            w = e("../components/comp-qna"),
            y = function() {
                function e() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "qna-container";
                    s(this, e), this.$container = $("." + t), this._limit = 50, this._selectedSortID = "1", this._answerLengthMax = 2e3, this._answerLengthMin = 1, this._validationTimeout, this._popupQuestion = new v["default"](".popup-delete-question", ".popup-delete-question-confirm"), this._popupAnswer = new v["default"](".popup-delete-answer", ".popup-delete-answer-confirm"), this._popupEdit = new v["default"](".popup-edit-answer", ".popup-edit-answer-confirm"), this._getModelProperties(), this._isEnabled && (this._bindEvents(), this._init())
                }
                return o(e, [{
                    key: "_getModelProperties",
                    value: function() {
                        var e = $(".qna-razor-properties").data("properties");
                        Object.assign(this, e), this._ugcToken = this._ugcToken || 0, this._bearerToken = this._ugcToken ? {
                            Authorization: "Bearer " + this._ugcToken
                        } : {}, this._isLoggedIn = this._ugcToken, this._textCustomerNickname = this._textCustomerNickname || this._textiHerbCustomer, this._textValidationMax = l["default"].stringFormat(this._textValidationMessage, this._answerLengthMax)
                    }
                }, {
                    key: "_getSortingDropdown",
                    value: function() {
                        var e = [{
                            name: "" + this._textSortHelpful,
                            id: "1"
                        }, {
                            name: this._textSortDate + " - " + this._textSortNewest,
                            id: "2"
                        }, {
                            name: this._textSortDate + " - " + this._textSortOldest,
                            id: "3"
                        }];
                        this._sortingDropdownOptions = (0, w.dropdownOptions)(e, this._selectedSortID)
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        $(document).unbind("click.qna submit.qna change.qna keyup.qna").on("click.qna", ".btn-page", this._pagination.bind(this)).on("click.qna", ".btn-report-abuse", this._reportAbuse.bind(this)).on("click.qna", ".btn-delete-question", this._deleteQuestion.bind(this)).on("click.qna", ".btn-delete-answer", this._deleteAnswer.bind(this)).on("click.qna", ".btn-edit-answer", this._updateAnswer.bind(this)).on("click.qna", ".btn-show-delete-answer", this._showDeleteAnswer.bind(this)).on("click.qna", ".btn-show-edit-answer", this._showEditAnswer.bind(this)).on("click.qna", ".btn-helpful", this._helpful.bind(this)).on("keyup.qna", "#answer-content", this._sanitizeInput.bind(this)).on("submit.qna", "#form-answer", this._submitAnswer.bind(this)).on("change.qna", "#ddl-sort", this._sort.bind(this))
                    }
                }, {
                    key: "_init",
                    value: function() {
                        var e = this;
                        f["default"].show(), $.when(this._getAnswers(), this._getQuestionDetail(), this._setCanAnswerQuestion()).done(function(t, i, n) {
                            n && (e._canAnswerQuestion = n[0]), i && (e._questionDetail = i[0], e._componentAnswerForm()), t && (e._currentPage = 1, e._getSortingDropdown(), e._setPlaceholderText(), e._data = t[0], e._getPagination()), f["default"].hide()
                        }).fail(function(e, t, i) {
                            console.error(t, i), f["default"].hide()
                        })
                    }
                }, {
                    key: "_getAnswers",
                    value: function() {
                        var e = this._getApiUrl(c["default"].api.qanda.answersForQuestion, this._productID, this._questionID),
                            t = l["default"].cleanObjProperties({
                                limit: this._limit,
                                languageCode: this._languageCode,
                                sortid: this._selectedSortID,
                                npt: this._pagingNextPageToken
                            });
                        return e = e + "?" + $.param(t), this._get(e)
                    }
                }, {
                    key: "_getQuestionDetail",
                    value: function() {
                        var e = this._getApiUrl(c["default"].api.qanda.questionDetailForProduct, this._productID, this._questionID);
                        return this._get(e)
                    }
                }, {
                    key: "_setCanAnswerQuestion",
                    value: function() {
                        if (this._isLoggedIn) {
                            var e = this._getApiUrl(c["default"].api.qanda.canAnswerQuestion, this._productID);
                            return this._get(e)
                        }
                    }
                }, {
                    key: "_getPagination",
                    value: function() {
                        var e = this,
                            t = 10,
                            i = (this._currentPage - 1) * t,
                            n = t + i;
                        this._pagedData = this._data.items.slice(i, n), this._currentPageText = Math.min(this._data.totalCount, n), this._pagedData.length <= 0 && this._data && this._data.nextPageToken && (this._pagingNextPageTokenQuestions = this._data.nextPageToken, f["default"].show(), this._getAnswers().then(function(t) {
                            var i;
                            (i = e._data.items).push.apply(i, a(t.items)), e._data.nextPageToken = t.nextPageToken, e._getPagination(), f["default"].hide()
                        })), this._getPagingButtons(), this._textPageCounter = l["default"].stringFormat(this._textHeaderTitleCount, i + 1, this._currentPageText, this._data.totalCount), this.$container.html(this._componentContainer())
                    }
                }, {
                    key: "_pagination",
                    value: function(e) {
                        e.preventDefault();
                        var t = $(e.target);
                        this._currentPage = parseInt(t.closest(".btn-page").data("page-number"), 10), this._getPagination(), $("html,body").scrollTop(0)
                    }
                }, {
                    key: "_getPagingButtons",
                    value: function() {
                        this._componentPaginationButtons = "", this._componentPaginationButtons = (0, w.componentPagingButtons)({
                            totalCount: this._data.totalCount,
                            currentPage: this._currentPage
                        })
                    }
                }, {
                    key: "_submitAnswer",
                    value: function(e) {
                        var t = this;
                        e.preventDefault();
                        var i = this._getApiUrl(c["default"].api.qanda.answersForQuestion, this._productID, this._questionID),
                            n = $("#answer-content"),
                            a = n.val(),
                            s = {};
                        a.length >= this._answerLengthMin && a.length <= this._answerLengthMax ? (s = {
                            content: a,
                            customerProfileLink: this._textCustomerProfileLink,
                            languageCode: this._languageCode
                        }, this._post(i, s).then(function(e) {
                            e && (n.val(""), t._selectedSortID = "1", $(".submitted-message").show())
                        })) : this._showValidationError()
                    }
                }, {
                    key: "_showValidationError",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._textValidationMax,
                            t = $(".form-validation");
                        clearTimeout(this._validationTimeout), t.find("strong").text(e), t.fadeIn(), this._validationTimeout = setTimeout(function() {
                            t.fadeOut()
                        }, 6e3)
                    }
                }, {
                    key: "_sort",
                    value: function(e) {
                        f["default"].show(), this._selectedSortID = $(e.target).find(":selected").val(), this._init()
                    }
                }, {
                    key: "_setSelectedSort",
                    value: function() {
                        $("#ddl-sort").val(this._selectedSortID)
                    }
                }, {
                    key: "_setPlaceholderText",
                    value: function() {
                        this._isLoggedIn ? this._canAnswerQuestion ? this._textPlaceholder = this._textPlaceholderWriteAnswer + ". " + l["default"].stringFormat(this._textValidationMessage, this._answerLengthMax) : this._textPlaceholder = this._textAccessDeniedAnswerMessage : this._textPlaceholder = this._textAccessDeniedLoginMessage
                    }
                }, {
                    key: "_helpful",
                    value: function(e) {
                        var t = this;
                        if (!this._isLoggedIn) return void this._showLoginPopup();
                        var i = $(e.target),
                            n = {
                                response: i.data("type")
                            },
                            a = $(e.target).closest(".answer").data("answer-id"),
                            s = this._getApiUrl(c["default"].api.qanda.helpful, this._productID, this._questionID, a);
                        this._post(s, n).then(function(e) {
                            t._hideHelpfulButtons(i)
                        })
                    }
                }, {
                    key: "_reportAbuse",
                    value: function(e) {
                        var t = this;
                        if (!this._isLoggedIn) return void this._showLoginPopup();
                        var i = $(e.target),
                            n = $(e.target).closest(".answer").data("answer-id"),
                            a = ({
                                postedDate: new Date
                            }, this._getApiUrl(c["default"].api.qanda.reportAbuse, this._productID, this._questionID, n));
                        this._post(a).then(function(e) {
                            t._hideHelpfulButtons(i)
                        })
                    }
                }, {
                    key: "_sanitizeInput",
                    value: function() {
                        (0, m.sanitize)($("#answer-content"))
                    }
                }, {
                    key: "_sanitizeInput",
                    value: function() {
                        (0, m.sanitize)($("#answer-content"))
                    }
                }, {
                    key: "_deleteQuestion",
                    value: function(e) {
                        var t = this;
                        e.preventDefault();
                        var i = this._getApiUrl(c["default"].api.qanda.deleteQuestion, this._productID, this._questionID);
                        this._delete(i).then(function(e) {
                            window.location = t._productUrl
                        })
                    }
                }, {
                    key: "_showDeleteAnswer",
                    value: function(e) {
                        e.preventDefault(), this._deleteAnswerID = $(e.target).data("answer-id")
                    }
                }, {
                    key: "_deleteAnswer",
                    value: function(e) {
                        var t = this;
                        e.preventDefault();
                        var i = this._getApiUrl(c["default"].api.qanda.deleteAnswer, this._productID, this._questionID, this._deleteAnswerID);
                        this._deleteAnswerID && this._delete(i).then(function(e) {
                            var i = $('[data-answer-id="' + t._deleteAnswerID + '"');
                            t._popupAnswer.close(), t._deleteAnswerID = null, i.slideUp(function() {
                                $(this).remove()
                            })
                        })
                    }
                }, {
                    key: "_showEditAnswer",
                    value: function(e) {
                        e.preventDefault();
                        var t = $(".edit-answer-content"),
                            i = $(e.target).closest(".answer").find(".answer-content").text();
                        t.val($.trim(i)), this._editAnswerID = $(e.target).data("answer-id"), clearTimeout(this._editPopupTimeout), this._toggleEditForms()
                    }
                }, {
                    key: "_updateAnswer",
                    value: function(e) {
                        var t = this;
                        e.preventDefault();
                        var i = this._getApiUrl(c["default"].api.qanda.editAnswer, this._productID, this._questionID),
                            n = {
                                id: this._editAnswerID,
                                content: $(".edit-answer-content").val(),
                                languageCode: this._languageCode
                            };
                        this._editAnswerID && this._put(i, n).then(function(e) {
                            t._editAnswerID = null, t._toggleEditForms(!1), t._editPopupTimeout = setTimeout(function() {
                                t._popupEdit.close(), t._toggleEditForms()
                            }, 6e3)
                        })
                    }
                }, {
                    key: "_toggleEditForms",
                    value: function() {
                        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                        $(".edit-form-container").css("display", "" + (e ? "block" : "none")), $(".edit-form-complete-container").css("display", "" + (e ? "none" : "block"))
                    }
                }, {
                    key: "_hideHelpfulButtons",
                    value: function(e) {
                        var t = e.closest(".component-helpful");
                        t.find(".feedback").hide(), t.find(".thanks-feedback").show()
                    }
                }, {
                    key: "_getApiUrl",
                    value: function(e) {
                        for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) i[n - 1] = arguments[n];
                        return "" + this._ugcApiUrl + l["default"].stringFormat.apply(l["default"], [e].concat(i))
                    }
                }, {
                    key: "_post",
                    value: function(e) {
                        var t = this,
                            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return h["default"].postJSON(e, i, this._bearerToken).fail(function(e, i, n) {
                            console.error(i, n), t._showValidationError(t._textErrorMessage)
                        })
                    }
                }, {
                    key: "_get",
                    value: function(e) {
                        var t = this,
                            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return h["default"].getJSON(e, i, !1, this._bearerToken).fail(function(e, i, n) {
                            console.error(i, n), t._showValidationError(t._textErrorMessage)
                        })
                    }
                }, {
                    key: "_delete",
                    value: function(e) {
                        var t = this,
                            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return h["default"].deleteJSON(e, i, this._bearerToken).fail(function(e, i, n) {
                            console.error(i, n), t._showValidationError(t._textErrorMessage)
                        })
                    }
                }, {
                    key: "_put",
                    value: function(e) {
                        var t = this,
                            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return h["default"].putJSON(e, i, this._bearerToken).fail(function(e, i, n) {
                            console.error(i, n), t._showValidationError(t._textErrorMessage)
                        })
                    }
                }, {
                    key: "_showLoginPopup",
                    value: function() {
                        window.location = window.iHerb_ActionHost + "/account/login/?referrerRedirect=true"
                    }
                }, {
                    key: "_componentContainer",
                    value: function() {
                        var e = this;
                        return "\n            " + this._componentBackButtonContainer() + '\n            <div class="questions-and-answers">\n                <div class="qna-content">\n\n                    ' + this._componentAnswerForm() + '\n\n                    <div class="container">\n                        ' + (this._data.items.length ? '\n                        <div class="row">\n                            <div class="col-xs-12">\n                                <strong>' + this._titleAnswers + ":&nbsp;</strong><span>" + this._textPageCounter + '</span>\n                            </div>\n                            <div class="col-xs-12">\n                                    <div class="form-inline pull-right">\n                                        <div class="form-group">\n                                            <label>\n                                                ' + this._titleSort + ' &nbsp;\n                                            </label>\n                                            <select class="form-control" id="ddl-sort">\n                                                ' + this._sortingDropdownOptions + "\n                                            </select>\n                                        </div>\n                                    </div>\n                            </div>\n                        </div>\n\n                        " + this._pagedData.map(function(t) {
                            return e._componentAnswersForQuestion(t)
                        }).join("") + '\n\n                        <div class="row row-buffer-lg">\n                            <div class="col-xs-24">\n                                <div class="separator"></div>\n                            </div>\n                            <div class="col-xs-8 col-lg-4">\n                                ' + this._textPageCounter + '\n                            </div>\n                            <div class="col-xs-8 col-lg-16 text-center">\n                                <div class="pagination-row">\n                                    ' + this._componentPaginationButtons + "\n                                </div>\n                            </div>\n                        </div>\n                        " : '\n                        <div class="row row-buffer-lg">\n                            <div class="col-xs-12">\n                                <strong>' + this._titleNoAnswers + '</strong>\n                            </div>\n                            <div class="col-xs-24">\n                                <div class="separator"></div>\n                            </div>\n                        </div>\n                        ') + '\n                    </div>\n                </div>\n                <div class="popup-container popup-delete-question-confirm">                                \n                    <div class="popup-title">' + this._textConfirmDeleteQuestion + '</div> \n                    <div class="popup-content text-center"> \n                        <p>&nbsp;</p>\n                        <button class="btn btn-primary btn-delete-question">Delete</button>\n                        <button class="btn btn-default btnCancel">Cancel</button>\n                    </div>\n                </div> \n                <div class="popup-container popup-delete-answer-confirm">                                \n                    <div class="popup-title">' + this._textConfirmDeleteAnswer + '</div> \n                    <div class="popup-content text-center"> \n                        <p>&nbsp;</p>\n                        <button class="btn btn-primary btn-delete-answer">Delete</button>\n                        <button class="btn btn-default btnCancel">Cancel</button>\n                    </div>\n                </div>\n                <div class="popup-container popup-edit-answer-confirm">\n                    <div class="edit-form-container" style="display: block">\n                        <div class="popup-title">' + this._textConfirmEditAnswer + '</div> \n                        <div class="popup-content text-center"> \n                            <p>&nbsp;</p>\n                            <textarea rows="6" class="edit-answer-content"></textarea>\n                            <button class="btn btn-primary btn-edit-answer">Save</button>\n                            <button class="btn btn-default btnCancel">Cancel</button>\n                        </div>\n                    </div>\n                    <div class="edit-form-complete-container" style="display: none">\n                        <i class="icon-circlecheck"></i><strong>' + this._titleEditThankYouMessage + "</strong>\n                        <p>" + this._textEditThankYouMessage + "</p>\n                    </div>\n                </div> \n            </div>\n        "
                    }
                }, {
                    key: "_componentBackButtonContainer",
                    value: function() {
                        return '\n            <div class="container questions-and-answers">\n                <div class="row">\n                    <div class="col-xs-24 col-buffer">\n                        &nbsp;\n                    </div>\n                    <div class="col-xs-24">\n                        ' + (0, w.componentBackToProductDetails)({
                            productUrl: this._productUrl,
                            retinaImage: this._productImageRetina,
                            imageUrl: this._productImageUrl,
                            productName: this._textProductName
                        }) + '\n                    </div>\n                    <div class="col-xs-24 col-buffer">\n                        <div class="separator"></div>\n                    </div>\n                </div>\n            </div>  \n        '
                    }
                }, {
                    key: "_componentAnswerForm",
                    value: function() {
                        return '\n            <div class="container container-buffer qna-header">\n                <form id="form-answer" method="post">\n                    <fieldset ' + (this._isLoggedIn && this._canAnswerQuestion ? "" : 'disabled="disabled"') + '>\n                    <div class="row">\n                        <div class="col-xs-7 col-md-6 col-lg-4 text-center">\n                            <img src="' + this._productImageRetina + '" srcset="' + this._productImageUrl + " 1x, " + this._productImageRetina + ' 1.5x"\n                                 width="200" height="200" alt="' + this._textProductName + '" class="col-buffer">\n                            <p class="text-left">' + this._textProductName + '</p>\n                        </div>\n                        <div class="col-xs-17 col-md-18 col-lg-16 col-lg-offset-1">\n                            <div class="row">\n                                <div class="col-xs-24 col-buffer">\n                                    <h3 class="h3">' + this._questionDetail.content + "</h3>\n                                    <div>\n                                        " + (0, w.componentPostedBy)({
                            postedBy: this._textPostedBy,
                            customerProfileLink: this._questionDetail.customerProfileLink,
                            customerNickname: this._questionDetail.customerNickname,
                            postedDate: this._questionDetail.postedDate
                        }) + "\n                                        " + (this._questionDetail.canWrite ? '<span class="edit-container"><a href="#" class="popup-delete-question">' + this._textDelete + "</a></span>" : "") + '\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class="row row-buffer">\n                                <div class="col-xs-24 col-buffer">\n                                    <textarea class="form-control" id="answer-content" placeholder="' + this._textPlaceholder + '" rows="5"></textarea>\n                                </div>\n                                <div class="col-xs-16 col-md-18">\n                                    ' + (0, w.componentSubmitSuccess)({
                            title: this._textAnswerSubmittedTitle,
                            message: this._textAnswerSubmittedMessage
                        }) + '\n                                    <div class="text-danger form-validation" style="display: none;">\n                                        <i class="icon-conewarningfat" />\n                                        <strong></strong>\n                                    </div>\n                                </div>\n                                <div class="col-xs-8 col-md-6">\n                                    <button class="btn btn-primary btn-md pull-right">' + this._textSubmit + "</button>\n                                </div>\n                            </div>\n\n                        </div>\n                    </div>\n                    </fieldset>\n                </form>\n            </div>\n        "
                    }
                }, {
                    key: "_componentAnswersForQuestion",
                    value: function(e) {
                        var t = {
                            textThanksFeedback: this._textThanksFeedback,
                            textWasHelpful: this._textWasAnswerHelpful,
                            textYes: this._textYes,
                            textNo: this._textNo,
                            textHelpfulYes: e.helpfulYes,
                            textHelpfulNo: e.helpfulNo,
                            textReportAbuse: this._textReportAbuse
                        };
                        return '\n            <div class="answer" data-answer-id="' + e.id + '">\n                <div class="row">\n                    <div class="col-xs-24">\n                        <div class="separator"></div>\n                    </div>\n                </div>\n                <div class="row row-buffer-lg">\n                    <div class="col-xs-24 col-lg-13 col-lg-offset-2">\n                        <p class="answer-content">\n                            ' + e.content + "\n                        </p>\n                        " + (0, w.componentPostedBy)({
                            postedBy: this._textPostedBy,
                            customerProfileLink: e.customerProfileLink,
                            customerNickname: e.customerNickname,
                            postedDate: e.postedDate
                        }) + "\n            " + (e.canWrite ? '<span class="edit-container">\n                    <a href="#" class="popup-edit-answer btn-show-edit-answer" data-answer-id="' + e.id + '">' + this._textEdit + '</a>\n                </span>\n                <span class="edit-container">\n                    <a href="#" class="popup-delete-answer btn-show-delete-answer" data-answer-id="' + e.id + '">' + this._textDelete + "</a>\n                </span>" : "") + '\n                    </div>\n                    <div class="col-xs-24 col-lg-5 col-lg-offset-3">\n                        ' + (0, w.componentHelpful)(t) + "\n                    </div>\n                </div>\n            </div>\n        "
                    }
                }]), e
            }();
        i["default"] = y
    }, {
        "../components/comp-qna": 22,
        "../modules/popup": 44,
        "./constants": 26,
        "./http": 34,
        "./loader": 42,
        "./sanitize-input": 62,
        "./utilities": 71
    }],
    53: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e) {
            if (Array.isArray(e)) {
                for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
                return i
            }
            return Array.from(e)
        }

        function s(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            r = e("./utilities"),
            l = n(r),
            u = e("./constants"),
            c = n(u),
            d = e("./http"),
            h = n(d),
            p = e("./loader"),
            f = n(p),
            g = e("./sanitize-input"),
            v = e("../components/comp-qna"),
            m = function() {
                function e() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "qna-container";
                    s(this, e), this.$container = $("." + t), this._questionCategoryID = "", this._questionLength = 0, this._questionLengthMin = 1, this._questionLengthMax = 500, this._questionMaxRequestCount = 100, this._filterBySelected = "", this._selectedCategoryID = "", this._isLoggedIn = !1, this._itemsExist = !1, this._shouldGenerateForm = !0, this._getModelProperties(), this._isEnabled && (this._setRequestLimit(), this._bindEvents(), this._init())
                }
                return o(e, [{
                    key: "_setRequestLimit",
                    value: function() {
                        this._isProductDetails = l["default"].isPageAny("productdetails"), this._limit = this._isProductDetails ? "3" : this._questionMaxRequestCount
                    }
                }, {
                    key: "_getModelProperties",
                    value: function() {
                        var e = $(".qna-razor-properties").data("properties");
                        Object.assign(this, e), this._ugcToken = this._ugcToken || 0, this._bearerToken = this._ugcToken ? {
                            Authorization: "Bearer " + this._ugcToken
                        } : {}, this._isLoggedIn = !!this._ugcToken, this._textCustomerNickname = this._textCustomerNickname || this._textiHerbCustomer, this._textNoResults = this._textBeFirstToAskQuestion, this._textValidationMessageRequiredMax = l["default"].stringFormat(this._textValidationMessage, this._questionLengthMax)
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        $(document).unbind("click.qna submit.qna change.qna keyup.qna").on("click.qna", ".btn-report-abuse", this._reportAbuse.bind(this)).on("click.qna", ".btn-helpful", this._helpful.bind(this)).on("click.qna", ".btn-see-more-answers", this._seeMoreAnswers.bind(this)).on("click.qna", ".btn-collapse-answers", this._collapseAnswers.bind(this)).on("click.qna", ".btn-page", this._pagination.bind(this)).on("click.qna", ".btn-toggle-form", this._toggleForm.bind(this)).on("click.qna", ".question-count", this._scrollToQuestions.bind(this)).on("keyup.qna", "#ask-question-content", this._sanitizeInput.bind(this)).on("submit.qna", "#form-ask-question", this._submitQuestion.bind(this)).on("change.qna", "#ddl-question-topic", this._setQuestionTopic.bind(this)).on("change.qna", "#ddl-filter-by", this._filterByCategory.bind(this))
                    }
                }, {
                    key: "_init",
                    value: function() {
                        var e = this;
                        this._shouldGenerateForm = !0, this._isProductDetails || f["default"].show(), $.when(this._getQuestions(), this._getCategoryDropdowns()).done(function(t, i) {
                            i && (e._categoryDropdownOptions = (0, v.dropdownOptions)(i[0]), e._filterByOptions = (0, v.dropdownOptions)(i[0], e._selectedCategoryID)), t && (e._currentPage = 1, e._data = t[0], e._itemsExist = e._data.items && e._data.items.length > 0, e._hideFilterDropdown = !e._itemsExist && ("" === e._selectedCategoryID || "0" === e._selectedCategoryID), e._getPagination(), e._setLoginSessionState(), e._setProductDetailsCount()), f["default"].hide()
                        }).fail(function(e, t, i) {
                            console.error(e), f["default"].hide()
                        })
                    }
                }, {
                    key: "_getQuestions",
                    value: function() {
                        var e = this._getApiUrl(c["default"].api.qanda.questionsForProduct, this._productID),
                            t = l["default"].cleanObjProperties({
                                limit: this._limit,
                                cid: "0" === this._selectedCategoryID ? null : this._selectedCategoryID,
                                languageCode: this._languageCode,
                                npt: this._pagingNextPageTokenQuestions
                            });
                        return e = e + "?" + $.param(t), this._get(e)
                    }
                }, {
                    key: "_getCategoryDropdowns",
                    value: function() {
                        var e = this._ugcApiUrl + "/api" + c["default"].api.qanda.questionCategory;
                        return this._get(e)
                    }
                }, {
                    key: "_getPagination",
                    value: function() {
                        var e = this,
                            t = 10,
                            i = (this._currentPage - 1) * t,
                            n = t + i;
                        this._pagedData = this._data.items.slice(i, n), this._currentPageText = Math.min(this._data.totalCount, n), this._pagedData.length <= 0 && this._data && this._data.nextPageToken && (this._pagingNextPageTokenQuestions = this._data.nextPageToken, f["default"].show(), this._getQuestions().then(function(t) {
                            var i;
                            (i = e._data.items).push.apply(i, a(t.items)), e._data.nextPageToken = t.nextPageToken, e._getPagination(), f["default"].hide()
                        })), this._getPagingButtons(), this._textPageCounter = l["default"].stringFormat(this._textHeaderTitleCount, i + 1, this._currentPageText, this._data.totalCount), this.$container.html(this._componentQuestionsAndAnswers())
                    }
                }, {
                    key: "_getPagingButtons",
                    value: function() {
                        this._componentPaginationButtons = "", this._componentPaginationButtons = (0, v.componentPagingButtons)({
                            totalCount: this._data.totalCount,
                            currentPage: this._currentPage
                        })
                    }
                }, {
                    key: "_setLoginSessionState",
                    value: function() {
                        this._isLoggedIn && "true" === sessionStorage.getItem("qna-login") && this._setFormState(), sessionStorage.setItem("qna-login", "false")
                    }
                }, {
                    key: "_setFormState",
                    value: function() {
                        var e = this,
                            t = this._getApiUrl(c["default"].api.qanda.canAskQuestion);
                        this.$askQuestionForm = $("#ask-question-form"), this._shouldGenerateForm ? null == this._canAskQuestion ? this._get(t).then(function(t) {
                            e._canAskQuestion = t, e._getFormComponent()
                        }) : this._getFormComponent() : this.$askQuestionForm.slideToggle()
                    }
                }, {
                    key: "_getFormComponent",
                    value: function() {
                        var e = this._canAskQuestion ? this._componentAskQuestionForm() : (0, v.componentAccessDenied)({
                            title: this._textAskQuestionDeniedMessage,
                            message: "",
                            showPopupButton: !0
                        });
                        $(".can-ask-question-container").append(e), this._shouldGenerateForm = !1, this.$askQuestionForm.slideToggle()
                    }
                }, {
                    key: "_setProductDetailsCount",
                    value: function() {
                        var e = $("#product-summary-header .rating"),
                            t = "",
                            i = '<span class="text-uppercase text-new text-danger small">' + this._textNew + "</span>",
                            n = function(e) {
                                return $('<span class="question-count" style="display: none"><span>|</span><a href="#">' + e + i + "</a></span>")
                            };
                        if (e.length) {
                            switch ($(".question-count").remove(), this._data.totalCount) {
                                case 0:
                                    t = this._titleQuestions;
                                    break;
                                case 1:
                                    t = this._textQuestionCountSingle;
                                    break;
                                default:
                                    t = l["default"].stringFormat(this._textQuestionCountMultiple, this._data.totalCount)
                            }
                            e.append(n(t)), $(".question-count").fadeIn()
                        }
                    }
                }, {
                    key: "_helpful",
                    value: function(e) {
                        var t = this;
                        if (!this._isLoggedIn) return void this._showLoginPopup();
                        var i = $(e.target),
                            n = {
                                response: i.data("type")
                            },
                            a = this._getAnswerProperties(e),
                            s = this._getApiUrl(c["default"].api.qanda.helpful, a.productID, a.questionID, a.answerID);
                        this._post(s, n).then(function(e) {
                            t._hideHelpfulButtons(i)
                        })
                    }
                }, {
                    key: "_reportAbuse",
                    value: function(e) {
                        var t = this;
                        if (!this._isLoggedIn) return void this._showLoginPopup();
                        var i = $(e.target),
                            n = this._getAnswerProperties(e),
                            a = ({
                                postedDate: new Date
                            }, this._getApiUrl(c["default"].api.qanda.reportAbuse, n.productID, n.questionID, n.answerID));
                        this._post(a).then(function(e) {
                            t._hideHelpfulButtons(i)
                        })
                    }
                }, {
                    key: "_getAnswerProperties",
                    value: function(e) {
                        var t = $(e.target).closest(".answer");
                        return {
                            productID: this._productID,
                            questionID: t.data("question-id"),
                            answerID: t.data("answer-id")
                        }
                    }
                }, {
                    key: "_hideHelpfulButtons",
                    value: function(e) {
                        var t = e.closest(".component-helpful");
                        t.find(".feedback").hide(), t.find(".thanks-feedback").show()
                    }
                }, {
                    key: "_filterByCategory",
                    value: function(e) {
                        f["default"].show(), this._textNoResults = this._textNoResultsFromFilter, this._selectedCategoryID = $(e.target).find(":selected").val(), this._init()
                    }
                }, {
                    key: "_setQuestionTopic",
                    value: function(e) {
                        this._questionCategoryID = $(e.target).find(":selected").val(), this._dataBind()
                    }
                }, {
                    key: "_dataBind",
                    value: function() {
                        $(".btn-submit-question").prop("disabled", "-1" === this._questionCategoryID), $("#ddl-question-topic").val(this._questionCategoryID)
                    }
                }, {
                    key: "_submitQuestion",
                    value: function(e) {
                        var t = this;
                        e.preventDefault(), this._sanitizeInput();
                        var i = this._getApiUrl(c["default"].api.qanda.questionsForProduct, this._productID),
                            n = $("#ask-question-content"),
                            a = n.val(),
                            s = {};
                        a.length >= this._questionLengthMin && a.length <= this._questionLengthMax ? (s = {
                            categoryId: this._questionCategoryID,
                            content: a,
                            customerProfileLink: this._textCustomerProfileLink,
                            languageCode: this._languageCode
                        }, this._post(i, s).then(function(e) {
                            e.postedDate && (n.val(""), t._questionCategoryID = "-1", t._dataBind(), $(".submitted-message").show())
                        })) : this._showValidationError()
                    }
                }, {
                    key: "_showValidationError",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._textValidationMessageRequiredMax,
                            t = $(".form-validation");
                        clearTimeout(this._validationTimeout), t.find("strong").text(e), t.fadeIn(), this._validationTimeout = setTimeout(function() {
                            t.fadeOut()
                        }, 6e3)
                    }
                }, {
                    key: "_seeMoreAnswers",
                    value: function(e) {
                        var t = this;
                        e.preventDefault();
                        var i = $(e.target),
                            n = i.data("question-id");
                        if ("" !== n) {
                            var a = i.find(".see-more-answer-count"),
                                s = i.find(".remaining-answer-count"),
                                o = i.next(".btn-collapse-answers"),
                                r = i.find(".is-first-request"),
                                l = i.find(".next-page-token-answers"),
                                u = "true" === r.val(),
                                d = l.val(),
                                p = a.text(),
                                f = s.val() - p,
                                g = this._getApiUrl(c["default"].api.qanda.moreAnswers, this._productID, n),
                                v = {
                                    limit: p,
                                    sortID: 1
                                };
                            u && v.limit++, "" !== d && (v.npt = d), h["default"].get(g, v).then(function(e) {
                                e && e.items && (e.items.forEach(function(e, n) {
                                    if (u && 0 === n) return void r.val("false");
                                    var a = t._componentAnswer(e, 1);
                                    $(a).hide().insertBefore(i.closest(".row")).slideDown()
                                }), f > 0 ? (l.val(e.nextPageToken), s.val(f), a.text(Math.min(5, f))) : (i.hide(), o.show()))
                            })
                        }
                    }
                }, {
                    key: "_collapseAnswers",
                    value: function(e) {
                        e.preventDefault();
                        var t = $(e.target),
                            i = t.prev(".btn-see-more-answers"),
                            n = i.find(".see-more-answer-count"),
                            a = i.data("question-id"),
                            s = i.find(".total-answer-count").val();
                        t.hide(), i.show(), i.find(".is-first-request").val("true"), i.find(".next-page-token-answers").val(""), i.find(".remaining-answer-count").val(s), n.text(Math.min(5, s)), this._scrollToQuestions(e, function() {
                            $(".answer[data-question-id=" + a + '][data-is-first="false"]').slideUp(function() {
                                $(this).remove()
                            })
                        })
                    }
                }, {
                    key: "_getApiUrl",
                    value: function(e) {
                        for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) i[n - 1] = arguments[n];
                        return "" + this._ugcApiUrl + l["default"].stringFormat.apply(l["default"], [e].concat(i))
                    }
                }, {
                    key: "_toggleForm",
                    value: function() {
                        this._isLoggedIn ? this._setFormState() : (sessionStorage.setItem("qna-login", "true"), this._showLoginPopup())
                    }
                }, {
                    key: "_scrollToQuestions",
                    value: function(e, t) {
                        e.preventDefault();
                        var i = $(".qna-container");
                        i.length && $("html, body").animate({
                            scrollTop: i.offset().top - 200
                        }, 600), t && t()
                    }
                }, {
                    key: "_sanitizeInput",
                    value: function() {
                        (0, g.sanitize)($("#ask-question-content"))
                    }
                }, {
                    key: "_pagination",
                    value: function(e) {
                        e.preventDefault();
                        var t = $(e.target);
                        this._currentPage = parseInt(t.closest(".btn-page").data("page-number"), 10), this._getPagination(), $("html,body").scrollTop(0)
                    }
                }, {
                    key: "_post",
                    value: function(e) {
                        var t = this,
                            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return h["default"].postJSON(e, i, this._bearerToken).fail(function(e, i, n) {
                            console.error(e, n), t._showValidationError(t._textErrorMessage)
                        })
                    }
                }, {
                    key: "_get",
                    value: function(e) {
                        var t = this,
                            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return h["default"].getJSON(e, i, !1, this._bearerToken).fail(function(e, i, n) {
                            console.error(e, n), t._showValidationError(t._textErrorMessage)
                        })
                    }
                }, {
                    key: "_showLoginPopup",
                    value: function() {
                        window.location = window.iHerb_ActionHost + "/account/login/?referrerRedirect=true"
                    }
                }, {
                    key: "_componentBackButtonContainer",
                    value: function() {
                        return '\n            <div class="container questions-for-product">\n                <div class="row">\n                    <div class="col-xs-24 col-buffer">\n                        <h4 class="h4">' + this._textHeaderTitle + '</h4>\n                    </div>\n                    <div class="col-xs-24">\n                        ' + (0, v.componentBackToProductDetails)({
                            productUrl: this._productUrl,
                            retinaImage: this._productImageRetina,
                            imageUrl: this._productImageUrl,
                            productName: this._textProductName
                        }) + "\n                    </div>\n                </div>\n            </div> \n        "
                    }
                }, {
                    key: "_componentQuestionsAndAnswers",
                    value: function() {
                        var e = this;
                        return "\n            " + (this._isProductDetails ? "" : "\n                " + this._componentBackButtonContainer() + "\n            ") + '\n            \n            <div class="questions-and-answers">\n                <a id="questions-and-answers"></a>\n                <div class="container">\n                    <div class="content-frame">\n                        <section class="content-wrapper">\n                            <div class="title-bar">\n                                <div class="qna-header">\n                                    <div class="row row-buffer">\n                                        <div class="col-xs-12">\n                                            ' + (this._isProductDetails ? "\n                                                <strong>" + this._textHeaderTitle + "</strong>\n                                            " : '\n                                                <span class="page-counter">' + this._textPageCounter + "</span>\n                                            ") + '\n                                        </div>\n                                        <div class="col-xs-6 col-lg-4 pull-right">\n                                                <button class="btn btn-primary btn-block pull-right btn-toggle-form">' + this._textAskQuestion + '</button>\n                                        </div>\n                                    </div>\n                                    <div class="row">\n                                        <div class="col-xs-24">\n                                            ' + (this._hideFilterDropdown ? "" : '\n                                                <div class="form-inline">\n                                                    <div class="form-group">\n                                                        <label>\n                                                            ' + this._textFilterBy + ' &nbsp;\n                                                        </label>\n                                                        <select class="form-control" id="ddl-filter-by" name="ddl-filter-questions">\n                                                            <option value="0">Newest</option>\n                                                            ' + this._filterByOptions + "\n                                                        </select>\n                                                    </div>\n                                                </div>\n                                            ") + '\n                                        </div>\n                                    </div>\n                                    <div id="ask-question-form" class="collapse">\n                                        <div class="row">\n                                            <div class="col-xs-24">\n                                                <div class="separator"></div>\n                                            </div>\n                                        </div>\n                                        <div class="can-ask-question-container">\n                                            \n                                        </div>\n                    \n                                    </div>\n                                </div>\n                            </div>\n                            <div class="inner-content">\n                                <div class="qna-content">\n                                    <div class="row">\n                                        <div class="col-xs-24">\n                                            ' + this._pagedData.map(function(t) {
                            return e._componentQandARow(t)
                        }).join("") + "\n                                        </div>\n                                    </div>\n\n                                    " + (0, v.componentNoResults)({
                            itemCount: this._data.items.length,
                            message: this._textNoResults
                        }) + '\n\n                                    <div class="row">\n                                        ' + (this._isProductDetails ? '\n                                            <div class="col-xs-6">\n                                                ' + (this._itemsExist ? '\n                                                    <a href="' + this._questionsForProductLink + '" class="btn btn-default">' + this._textViewAllQuestions + "</a>\n                                                " : "") + "\n                                            </div>\n                                        " : '\n                                            <div class="col-xs-5">\n                                                ' + this._textPageCounter + '\n                                            </div>\n                                            <div class="col-xs-14 text-center">\n                                                <div class="pagination-row">\n                                                    ' + this._componentPaginationButtons + "\n                                                </div>\n                                            </div>\n                                        ") + "\n                                    </div>\n                                </div>\n                            </div>\n                        </section>\n                    </div>\n                </div>\n            </div>\n        "
                    }
                }, {
                    key: "_componentAskQuestionForm",
                    value: function() {
                        return '\n            <form id="form-ask-question" method="post" display="none">\n                <div class="row row-buffer">\n                    ' + (this._isProductDetails ? '\n                        <div class="col-xs-24">\n                            <h4 class="h4">' + this._textAskQuestion + ": </h4>\n                        </div>\n                    " : "") + '\n                    <div class="col-xs-8 col-lg-5">\n                        <select class="form-control" id="ddl-question-topic" name="ddl-question-answer">\n                            <option value="-1">' + this._textQuestionTopic + "</option>\n                            " + this._categoryDropdownOptions + '\n                        </select>\n                    </div>\n                    <div class="col-xs-16 col-lg-19">\n                        <div class="text-danger form-validation" style="display: none;">\n                            <i class="icon-conewarningfat" />\n                            <strong></strong>\n                        </div>\n                    </div>\n                </div>\n                <div class="row row-buffer">\n                    <div class="col-xs-14 col-lg-10">\n                        <input type="text" id="ask-question-content" value="" class="form-control" placeholder="' + this._textPlaceholderWriteQuestion + '" />\n                    </div>\n                    <div class="col-xs-6 col-lg-4">\n                        <button class="btn btn-primary btn-block btn-submit-question" disabled>' + this._textSubmit + '</button>\n                    </div>\n                    <div class="col-xs-4 col-lg-3">\n                        <button class="btn btn-default btn-block btn-toggle-form" type="button">' + this._textCancel + '</button>\n                    </div>\n                </div>\n                <div class="row row-buffer">\n                    <div class="col-xs-24">\n                        ' + (0, v.componentSubmitSuccess)({
                            title: this._textQuestionSubmittedTitle,
                            message: this._textQuestionSubmittedMessage
                        }) + "\n                    </div>\n                </div>\n            </form>\n        "
                    }
                }, {
                    key: "_componentQandARow",
                    value: function(e) {
                        var t = this,
                            i = e.answerCount - 1,
                            n = Math.min(5, i);
                        return '\n            <div class="row row-buffer-lg">\n                <div class="col-xs-3">\n                    <strong class="title-small">' + this._titleQuestion + ':</strong>\n                </div>\n                <div class="col-xs-18">\n                    <a href="' + this._questionsForProductLink + "/q/" + e.id + '" class="title-small"><strong>' + e.content + "</strong></a>\n                    <div>\n                   " + (0, v.componentPostedBy)({
                            postedBy: this._textPostedBy,
                            customerProfileLink: e.customerProfileLink,
                            customerNickname: e.customerNickname,
                            postedDate: e.postedDate
                        }) + "\n                   </div>\n                </div>\n            </div>\n            " + (e.answerCount > 0 ? "\n                " + e.topAnswers.map(function(e, i) {
                            return t._componentAnswer(e, i)
                        }).join("") + "\n            " : '\n                <div class="answer">\n                    <div class="row">\n                        <div class="col-xs-3">\n                            <strong class="title-small">' + this._titleAnswers + ':</strong>\n                        </div>\n                        <div class="col-xs-20 col-lg-12">\n                            <p>\n                                <a href="' + this._questionsForProductLink + "/q/" + e.id + '" class="title-small"><strong>' + this._textBeFirstToAnswerQuestion + "</strong></a>\n                            </p>\n                        </div>\n                    </div>\n                </div>\n            ") + '\n\n            <div class="row">\n                ' + (i >= 1 ? '\n                    <div class="col-xs-21 col-xs-offset-3">\n                        <a href="#" class="btn-see-more-answers" data-question-id="' + e.id + '">\n                            <input type="hidden" value="' + i + '" class="total-answer-count" />\n                            <input type="hidden" value="' + i + '" class="remaining-answer-count" />\n                            <input type="hidden" value="true" class="is-first-request" />\n                            <input type="hidden" value="" class="next-page-token-answers" />\n                            ' + this._textSeeMoreAnswers + ' (<span class="see-more-answer-count">' + n + '</span>)\n                        </a>\n                        <a href="#" class="btn-collapse-answers" style="display: none;" data-question-id="' + e.id + '">\n                            ' + this._textCollapseAnswers + "\n                        </a>\n                    </div>\n                " : "") + '\n                <div class="col-xs-24">\n                    <div class="separator"></div>\n                </div>\n            </div>\n        '
                    }
                }, {
                    key: "_componentAnswer",
                    value: function(e, t) {
                        var i = 0 === t,
                            n = {
                                textThanksFeedback: this._textThanksFeedback,
                                textWasHelpful: this._textWasAnswerHelpful,
                                textYes: this._textYes,
                                textNo: this._textNo,
                                textHelpfulYes: e.helpfulYes,
                                textHelpfulNo: e.helpfulNo,
                                textReportAbuse: this._textReportAbuse
                            };
                        return '\n            <div class="answer" data-is-first="' + i + '" data-question-id="' + e.questionId + '" data-answer-id="' + e.id + '">\n                ' + (i ? "" : '\n                    <div class="row row-buffer-lg">\n                        <div class="col-xs-19 col-xs-offset-3">\n                            <div class="separator"></div>\n                        </div>\n                    </div>\n                ') + '\n                <div class="row">\n                    <div class="col-xs-3">\n                        ' + (i ? '\n                            <strong class="title-small">' + this._titleAnswers + ":</strong>\n                        " : "") + '\n                    </div>\n                    <div class="col-xs-20 col-lg-12">\n                        <p>\n                            ' + e.content + "\n                        </p>\n                        " + (0,
                            v.componentPostedBy)({
                            postedBy: this._textPostedBy,
                            customerProfileLink: e.customerProfileLink,
                            customerNickname: e.customerNickname,
                            postedDate: e.postedDate
                        }) + '\n                    </div>\n                     <div class="col-xs-20 col-xs-offset-3 col-lg-5 col-lg-offset-3">\n                        ' + (0, v.componentHelpful)(n) + "\n                    </div>\n                </div>\n            </div>\n        "
                    }
                }]), e
            }();
        i["default"] = m
    }, {
        "../components/comp-qna": 22,
        "./constants": 26,
        "./http": 34,
        "./loader": 42,
        "./sanitize-input": 62,
        "./utilities": 71
    }],
    54: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./lazyload-carousel-images"),
            r = n(o),
            l = e("./http"),
            u = n(l),
            c = e("./constants"),
            d = n(c),
            h = function() {
                function e(t) {
                    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
                    a(this, e), this.$recentlyViewedEle = t, this.callback = i, this.init()
                }
                return s(e, [{
                    key: "init",
                    value: function() {
                        var e = this;
                        if (this.$recentlyViewedEle.length) {
                            var t = d["default"].url.recentlyViewed + "?isHome=true";
                            u["default"].get(t).then(function(t) {
                                return e.renderToDOM(t), t
                            }).then(this.callback)
                        }
                    }
                }, {
                    key: "renderToDOM",
                    value: function(e) {
                        if (this.$recentlyViewedEle.html(e), this.$recentlyViewedEle.find(".product").length >= 6) {
                            var t = $("#carousel-recently-viewed");
                            t.responsiveCarousel({
                                imagePerRow: 12,
                                update: !0
                            }), t.swipe({
                                threshold: 90
                            }), new r["default"](t.get(0)), this.$recentlyViewedEle.show()
                        } else this.$recentlyViewedEle.remove()
                    }
                }]), e
            }();
        i["default"] = h
    }, {
        "./constants": 26,
        "./http": 34,
        "./lazyload-carousel-images": 41
    }],
    55: [function(e, t, i) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = function() {
                function e() {
                    n(this, e)
                }
                return a(e, [{
                    key: "useStorage",
                    value: function(e, t) {
                        var i = !1,
                            n = "iHerb_";
                        switch (e) {
                            case "set":
                                i = sessionStorage.setItem(n + t.key, t.data);
                                break;
                            case "get":
                                return i = sessionStorage.getItem(n + t);
                            case "exist":
                                if (sessionStorage.getItem(n + t)) return !0
                        }
                    }
                }, {
                    key: "initRecommendationsCarousel",
                    value: function(e) {
                        var t = "#" + e,
                            i = $(t + "-model-properties");
                        this.$body = $("body"), this.regionClick = "iherb.region.click", this._setDailyActiveTab(i, e), this._bindEvents(i, e)
                    }
                }, {
                    key: "_setDailyActiveTab",
                    value: function(e, t) {
                        var i, n, a = e.data("active-tab");
                        a && (i = $("." + t + "-nav  li  a[data-category=" + a + "]"), n = $("." + t + "-nav li:first-child"), i.parent().is(":hidden") ? n.addClass("active") : i.parent().addClass("active"))
                    }
                }, {
                    key: "_bindEvents",
                    value: function(e, t) {
                        var i = this,
                            n = "#" + t,
                            a = $(n + "-categories ." + t + "-available-category-tab"),
                            s = $(".filter-" + t + ".region-filter input");
                        a.length && (a.on("click", function(i) {
                            $(n + "-inner").html(""), this._loadCategoryData(t, e, i)
                        }.bind(this)), $("#carousel-" + t).on("slide.bs.carousel", function() {
                            a.addClass("disabled")
                        }), $("#carousel-" + t).on("slid.bs.carousel", function() {
                            a.removeClass("disabled")
                        })), s.length && (this.$body.on(this.regionClick, function(n, a) {
                            i._toggleCountryRegion($(a), t, e), i._toggleDisplayRegion(s)
                        }), s.on("click", function(e) {
                            i.$body.trigger(i.regionClick, e.currentTarget)
                        }))
                    }
                }, {
                    key: "_loadCategoryData",
                    value: function(e, t, i) {
                        var n, a = $(i.target).data("category"),
                            s = $(i.target).data("category-link"),
                            o = $(".filter-" + e + " input:visible").data("value"),
                            r = t.data("country-code");
                        "global" == o ? (r = "%%", n = "global") : n = "country", this._fetchProductData(e, r, a, s, t)
                    }
                }, {
                    key: "_toggleDisplayRegion",
                    value: function(e) {
                        var t = e;
                        t.toggle()
                    }
                }, {
                    key: "_toggleCountryRegion",
                    value: function(e, t, i) {
                        var n, a, s = $("." + t + "-nav > .active > a"),
                            o = "#" + t,
                            r = i.data("country-code"),
                            l = e.data("value") || e.siblings("input:visible").data("value"),
                            u = "country" == l ? "%%" : r;
                        n = s.data("category"), a = s.data("category-link"), $(o + "-inner").html(""), this._fetchProductData(t, u, n, a, i)
                    }
                }, {
                    key: "_ajax",
                    value: function(e, t, i, n, a) {
                        var s = e.data("language-code"),
                            o = this.useStorage("exist", n),
                            r = "conditions" == t ? "true" : "false",
                            l = "/Catalog/GetTrendingProduct?countryCode=" + a + "&languageCode=" + s + "&imgSize=m",
                            u = "/Catalog/GetBestSellingProduct/?countryCode=" + a + "&languageCode=" + s + "&imgSize=m&webCategory=" + i + "&conditions=" + r,
                            c = "trending" == t ? l : u;
                        return $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: c,
                            beforeSend: function(e) {
                                o && e.abort()
                            }
                        })
                    }
                }, {
                    key: "_fetchProductData",
                    value: function(e, t, i, n, a) {
                        var s, o = "%%" == t ? "_global" : "_country",
                            r = i + o,
                            l = "trending" == e ? "trending_carousel_" + t : r;
                        s = this._ajax(a, e, i, l, t), s.always(function(t) {
                            t && ("canceled" == s.statusText ? (t = this.useStorage("get", l), this._renderCarouselRow(a, e, JSON.parse(t), l, n)) : (this.useStorage("set", {
                                key: l,
                                data: JSON.stringify(t)
                            }), this._renderCarouselRow(a, e, t, r, n)))
                        }.bind(this))
                    }
                }, {
                    key: "_renderCarouselRow",
                    value: function(e, t, i, n, a) {
                        var s, o, r, l = e.data("link-see-all"),
                            u = e.data("message-try-again"),
                            c = e.data("error-no-data-selected"),
                            d = "#" + t,
                            h = "#carousel-" + t,
                            p = $(d + "-inner");
                        if (i.BestSellingProducts ? s = i.Products : i && (s = i.Products), null != i && 0 != s.length) $.each(s, function(e, i) {
                            o = this._createProductCell(i, t), p.append(o.fadeIn(200)), e == s.length - 1 && "trending" !== t ? (r = this._createSeeAllLink(a, l, t), p.append(r), $(h).responsiveCarousel({
                                update: !0
                            })) : "trending" === t && $(h).responsiveCarousel({
                                update: !0
                            })
                        }.bind(this));
                        else if (i.BestSellingProduct) {
                            var f = t + "-available-category-tab";
                            p.html('<div class="dataError">' + c + '<span><a class="' + f + '" href="#supplements" data-toggle="tab" data-category=' + n + ">" + u + "</a></span> </div>")
                        } else p.html('<div class="dataError">' + c + "</div>")
                    }
                }, {
                    key: "_createSeeAllLink",
                    value: function(e, t, i) {
                        return e.indexOf("_") > -1 && (e = e.replace("_", "-")), '\n            <div id="seeAllLink" class="product see-all col-xs-6 col-md-5th col-lg-4">\n                <div class="product-inner">\n                    <a href="' + e + '" data-ga-event="click" data-ga-event-category="Ecommerce" data-ga-event-action="Clicks Homepage ' + i + '" data-ga-event-label="See All">\n                        ' + t + "\n                    </a>\n                </div>\n            </div>\n        "
                    }
                }, {
                    key: "_createProductCell",
                    value: function(e, t) {
                        var i, n = (e.$id, e.Id),
                            a = e.Name,
                            s = e.ProductImage,
                            o = e.ProductImageRetina,
                            r = s + " 1x, " + o + " 1.5x",
                            l = e.ProductUrl,
                            u = e.ListPrice,
                            c = e.Rating,
                            d = e.RatingCount,
                            h = e.DiscountPrice,
                            p = e.ShowDiscount,
                            f = "";
                        if (i = $("#product-template").clone(), i.hide(), i.attr("id", "product" + n), i.attr("class", "product col-xs-8 col-sm-6 col-md-6 col-lg-5th"), i.find("a").attr("data-ga-event", "click").attr("data-ga-event-category", "Ecommerce").attr("data-ga-event-action", "Clicks Homepage " + t).attr("data-ga-event-label", "Product Click"), i.find("[data-pid=pid]").attr("data-pid", n), i.find("[data-form-pid=pid]").attr("data-form-pid", n), i.find("[data-product-title] span").text(a), i.find("[data-product-url]").attr("href", l), i.find("[data-img]").attr("src", o), i.find("[data-img]").attr("srcset", r), i.find("[data-img-title]").attr("title", a), i.find("[data-review-url]").attr("href", "/p/" + n + "#product-detail-reviews"), i.find("[data-review-url]").attr("title", c + "/5-" + d), i.find("[data-avgRating]").text(c), i.find("[data-ratingCount]").text(d), i.find("[data-discount-price]").text(h), p ? (i.find("[data-list-price]").text(u), i.find("[data-list-price]").addClass("price-olp "), i.find("[data-discount-price]").addClass("discount-green")) : i.find("[data-list-price]").css({
                                display: "none"
                            }), s.length ? (i.find(".image-coming").hide(), i.find(".image-available").css("display", "block")) : (i.find(".image-coming").css("display", "block"), i.find(".image-available").hide()), void 0 !== c && d > 0) {
                            var g = Math.round(c);
                            f = g == c || 5 == g ? "0 full" : "5 full", i.find("[data-star-font]").addClass("icon-stars_" + g + f)
                        }
                        return 0 == d && (i.find(".rating a").remove(), i.find(".rating").append('<div class="no-rating"></div>')), i
                    }
                }]), e
            }();
        i["default"] = s
    }, {}],
    56: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./http"),
            r = n(o),
            l = e("./constants"),
            u = n(l),
            c = e("./utilities"),
            d = n(c),
            h = function() {
                function e(t) {
                    a(this, e), this.$relatedBlogContainer = t, this.keyword = t.data("keyword"), this.readMoreText = t.data("articles-link"), this.init()
                }
                return s(e, [{
                    key: "init",
                    value: function() {
                        var e = this;
                        this.$relatedBlogContainer.length && r["default"].get(u["default"].url.getRelatedBlogArticles + "?kw=" + this.keyword).then(function(t) {
                            e.renderToDOM(t)
                        })
                    }
                }, {
                    key: "renderToDOM",
                    value: function(t) {
                        var i = this;
                        if (t.length) {
                            var n = t.map(function(e, t) {
                                return i.createBlogCard(e, t)
                            });
                            this.$relatedBlogContainer.find(".blog-articles").html(n), e._showHideBlogsSection()
                        }
                    }
                }, {
                    key: "createBlogCard",
                    value: function(e, t) {
                        return '<div class="blog-card col-xs-12 col-md-8 col-lg-6 ' + (t > 1 ? "hidden-xs hidden-sm" : "") + " " + (t > 2 ? "hidden-md" : "") + '">\n                    <div class="link-overlay-container">\n                        <a href="' + e.BlogURL + '" class="link-overlay"></a>\n                        <img src="' + e.ImageURL + '" alt="' + e.ArticleTitle + '" class="rounded-top img-responsive" />\n                        <div class="content">\n                            <div class="h4 text-ellipsis">' + e.ArticleTitle + '</div>\n                            <p class="p line-clamp-2">' + e.ArticleContent + '</p>\n                            <a href="' + e.BlogURL + '" class="link">' + this.readMoreText + " &raquo;</a>\n                        </div>\n                    </div>\n                </div>"
                    }
                }], [{
                    key: "_showHideBlogsSection",
                    value: function() {
                        var e = $("#related-blog-articles-container"),
                            t = d["default"].queryString.getQueryValue("p"),
                            i = e.find(".blog-articles").children().length;
                        i < 1 || t > 1 ? e.hide() : e.show()
                    }
                }]), e
            }();
        i["default"] = h
    }, {
        "./constants": 26,
        "./http": 34,
        "./utilities": 71
    }],
    57: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./utilities"),
            r = n(o),
            l = e("./reviews-helpfulness"),
            u = n(l),
            c = e("./reviews-share"),
            d = n(c),
            h = e("./loader"),
            p = n(h),
            f = e("./http"),
            g = n(f),
            v = e("../modules/reviews-language"),
            m = n(v),
            w = function() {
                function e() {
                    a(this, e), this.init()
                }
                return s(e, [{
                    key: "init",
                    value: function() {
                        this._cachDom(), this._bindEvents(), this.isSearchActive(), document.location.toString().indexOf("kw") !== -1 && this.highlightSearchTerms()
                    }
                }, {
                    key: "reinit",
                    value: function() {
                        this.highlightSearchTerms(), this.isSearchActive(), this.isTranslateActive(), this.init(), new d["default"], new u["default"], new m["default"]
                    }
                }, {
                    key: "_cachDom",
                    value: function() {
                        this.iconSearch = $(".icon-search"), this.iconClose = $(".icon-close"), this.translateReviews = $(".translate-reviews-check")
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        var e = this;
                        $("#ddlsr").on("change", function(t) {
                            e._renderDOM(e.setQueryParams(t, "#ddlsr option:selected"))
                        }), $("#search-term").on("keyup", function(t) {
                            13 == t.keyCode && e._renderDOM(e.setQueryParams(t, "#search-term")), e.iconSearch.removeClass("hidden"), e.iconClose.addClass("hidden")
                        }), $(".review-search-button").on("click", function(t) {
                            e._renderDOM(e.setQueryParams(t, "#search-term"))
                        }), $(".search-field .icon-close").on("click", function() {
                            e._resetSearch()
                        }), $(".currentLanguage").on("click", function() {
                            $(".selected-country-wrapper").trigger("click")
                        })
                    }
                }, {
                    key: "setQueryParams",
                    value: function(e, t) {
                        var i = $(t).val(),
                            n = $(e.target).closest(".filter").data("qry"),
                            a = "",
                            s = document.location.toString();
                        if (0 == i.trim().length) return !1;
                        var o = s.indexOf("?"),
                            l = s.indexOf(n);
                        return a = o == -1 ? s + "?p=1&" + n + "=" + i : l == -1 ? s + "&" + n + "=" + i : r["default"].queryString.updateValue(n, i, s)
                    }
                }, {
                    key: "isTranslateActive",
                    value: function() {
                        $("#translate-reviews").is(":checked") && ($(".translation-warning-message").addClass("translated"), $("#search-term").prop("disabled", !0))
                    }
                }, {
                    key: "_resetSearch",
                    value: function(e) {
                        var t = r["default"].queryString.removeKeyValuePair("kw", document.location.toString());
                        $("#search-term").val(""), this.translateReviews.removeClass("hidden"), this.iconClose.addClass("hidden"), this.iconSearch.removeClass("hidden"), this._renderDOM(t)
                    }
                }, {
                    key: "_renderDOM",
                    value: function(e) {
                        var t = this;
                        return 0 != e && (p["default"].show(), void g["default"].get(e).done(function(i) {
                            $(".product-review-container").html(i), history.replaceState(e, null, e), t._renderPageIndex(), t.reinit(), p["default"].hide()
                        }))
                    }
                }, {
                    key: "_renderPageIndex",
                    value: function() {
                        var e = $(".display-items-L"),
                            t = e.text();
                        e.data("count");
                        $(".display-numbers-of-items").text(t)
                    }
                }, {
                    key: "isSearchActive",
                    value: function() {
                        var e = r["default"].queryString.getQueryValue("kw");
                        0 !== e.length && ($("#search-term").val(e), this.translateReviews.addClass("hidden"), this.iconClose.removeClass("hidden"), this.iconSearch.addClass("hidden"))
                    }
                }, {
                    key: "highlightSearchTerms",
                    value: function() {
                        if (document.location.toString().indexOf("kw") !== -1) {
                            var e = r["default"].queryString.getQueryValue("kw").replace(/(\s+)/, "(<[^>]+>)*$1(<[^>]+>)*");
                            this.wrapMarkHTML(e, $(".review-headline")), this.wrapMarkHTML(e, $(".review-text"))
                        }
                    }
                }, {
                    key: "wrapMarkHTML",
                    value: function(e, t) {
                        var i = new RegExp("(" + e + ")(?![^<]*>)", "gi");
                        t.each(function(e, t) {
                            var n = $(t).html();
                            n = n.replace(i, "<mark>$1</mark>"), n = n.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/, "$1</mark>$2<mark>$4"), $(t).html(n)
                        })
                    }
                }]), e
            }();
        i["default"] = w
    }, {
        "../modules/reviews-language": 60,
        "./http": 34,
        "./loader": 42,
        "./reviews-helpfulness": 59,
        "./reviews-share": 61,
        "./utilities": 71
    }],
    58: [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i["default"] = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1e3,
                t = $(".graph-row"),
                i = "swing";
            t.length && t.each(function(t, n) {
                var a = $(n),
                    s = $(this).data("percent"),
                    o = a.find(".right-container a span"),
                    r = a.find(".bar");
                r.animate({
                    width: s + "%"
                }, {
                    duration: e,
                    easing: i
                }), $({
                    val: 0
                }).animate({
                    val: s
                }, {
                    duration: e,
                    easing: i,
                    step: function() {
                        o.text(Math.round(this.val) + "%")
                    }
                })
            })
        }
    }, {}],
    59: [function(e, t, i) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = function() {
                function e() {
                    n(this, e), this._cacheDom(), this._bindEvents()
                }
                return a(e, [{
                    key: "_cacheDom",
                    value: function() {
                        this.$reviewModel = $("#reviewProperties"), this.$accountLogin = this.$reviewModel.data("login-url"), this.$submitFeedback = this.$reviewModel.data("submit-feedback"), this.$reportAbuse = this.$reviewModel.data("report-abuse"), this.$productId = this.$reviewModel.data("pid")
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        $(".helpfulness").on("click", this._checkLogin.bind(this))
                    }
                }, {
                    key: "_ajax",
                    value: function(e, t) {
                        return $.ajax({
                            xhrFields: {
                                withCredentials: !0
                            },
                            headers: {
                                "x-ajax": "1"
                            },
                            method: "POST",
                            crossDomain: !0,
                            url: e,
                            data: t,
                            dataType: "json"
                        })
                    }
                }, {
                    key: "_submitFeedBack",
                    value: function(e, t, i, n, a) {
                        var s, o;
                        1 == e ? (s = {
                            fb: t,
                            rid: i,
                            pid: n
                        }, o = this._ajax(this.$submitFeedback, s)) : 2 == e && (s = {
                            rid: i,
                            pid: n
                        }, o = this._ajax(this.$reportAbuse, s)), o.always(function(e) {
                            this._toggleMessage(a)
                        }.bind(this))
                    }
                }, {
                    key: "_checkLogin",
                    value: function(e) {
                        var t, i, n = 1,
                            a = $(e.target),
                            s = a.data("type"),
                            o = a.data("helpful"),
                            r = a.closest(".question").data("review-id");
                        o == -1 && (n = 3), t = {
                            lac: n,
                            rid: r,
                            pid: this.$productId
                        }, i = this._ajax(this.$accountLogin, t), i.always(function(t) {
                            "-1" != t.responseText.toString().indexOf("https://") ? window.location = t.responseText.toString() : this._submitFeedBack(s, o, r, this.$productId, e)
                        }.bind(this))
                    }
                }, {
                    key: "_toggleMessage",
                    value: function(e) {
                        var t = $(e.target).closest(".question"),
                            i = t.next();
                        t.addClass("hide"), i.removeClass("hide")
                    }
                }]), e
            }();
        i["default"] = s
    }, {}],
    60: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./utilities"),
            r = n(o),
            l = e("../modules/loader"),
            u = n(l),
            c = e("../modules/reviews-share"),
            d = n(c),
            h = e("../modules/reviews-helpfulness"),
            p = n(h),
            f = e("../modules/reviews-filters"),
            g = n(f),
            v = function() {
                function e() {
                    a(this, e), this._init()
                }
                return s(e, [{
                    key: "_init",
                    value: function() {
                        this._bindEvents(), this._showCheckBox(), this._setCheckboxCheck()
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        var e = this;
                        $("#translate-reviews").on("click", function() {
                            e._translateReviews()
                        }), $("#language-sort").on("change", function(t) {
                            e._changeReviewsLanguage()
                        })
                    }
                }, {
                    key: "_changeReviewsLanguage",
                    value: function() {
                        var e = $("#language-sort option:selected").val();
                        $("#translate-reviews").prop("checked", !1), $("#search-term").prop("disabled", !1), this._ajax(e)
                    }
                }, {
                    key: "_showWarningMessage",
                    value: function() {
                        $(".translation-warning-message").addClass("translated")
                    }
                }, {
                    key: "_translateReviews",
                    value: function() {
                        var e = $("#translate-reviews"),
                            t = $("#search-term"),
                            i = e.is(":checked") ? 1 : 0,
                            n = document.location.toString(),
                            a = void 0;
                        e.is(":checked") ? t.prop("disabled", !0) : t.prop("disabled", !1), a = r["default"].queryString.updateValue("tr", i, n), this._ajax(a)
                    }
                }, {
                    key: "_showCheckBox",
                    value: function(e) {
                        var t = $("#language-sort option:selected").data("language"),
                            i = $(".language-bar").data("current-language"),
                            n = window.location.href,
                            a = "";
                        t != i ? $(".translate-reviews-check").addClass("translate") : (a = r["default"].queryString.removeKeys(n, "tr"), $(".translate-reviews-check").removeClass("translate"))
                    }
                }, {
                    key: "_setCheckboxCheck",
                    value: function() {
                        var e = new RegExp("tr=([0|1])"),
                            t = (location.search.match(e), RegExp.$1);
                        1 == t ? ($("#translate-reviews").prop("checked", !0), this._showWarningMessage()) : $("#translate-reviews").prop("checked", !1)
                    }
                }, {
                    key: "_renderPageIndex",
                    value: function() {
                        var e = $(".display-items-L").text();
                        $(".display-numbers-of-items").text(e)
                    }
                }, {
                    key: "_ajax",
                    value: function(e) {
                        u["default"].show(), $.ajax({
                            url: e,
                            cache: !1,
                            type: "GET",
                            success: function(t) {
                                $(".product-review-container").html(t), this._showWarningMessage(), this._init(), new d["default"], new p["default"], new g["default"], this._renderPageIndex(), history.pushState(e, null, e), this._showCheckBox(), u["default"].hide()
                            }.bind(this)
                        })
                    }
                }]), e
            }();
        i["default"] = v
    }, {
        "../modules/loader": 42,
        "../modules/reviews-filters": 57,
        "../modules/reviews-helpfulness": 59,
        "../modules/reviews-share": 61,
        "./utilities": 71
    }],
    61: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./share-social"),
            r = n(o),
            l = function() {
                function e() {
                    a(this, e), this._cacheDom(), this._bindEvents()
                }
                return s(e, [{
                    key: "_cacheDom",
                    value: function() {
                        this.$model = $("#shareProperties"), this.$url = encodeURI(this.$model.data("product-page")), this.$checkOutReview = this.$model.data("checkout-review"), this.$container = $(".share-review-container"), this.$shareCode = $("#share-code").data("share-code"), this._getShareURL
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        $(".btn-share-review").on("click", this._toggleShare.bind(this)), $(".facebook-review").on("click", this._facebook.bind(this)), $(".twitter-review").on("click", this._twitter.bind(this)), $(".gplus-review").on("click", this._google.bind(this)), $(".pinterest-review").on("click", this._pinterest.bind(this)), $(".weibo-review").click(this.shareWeibo.bind(this)), $(".qzone-review").click(this.shareQZone.bind(this)), $(".qq-review").click(this.shareQQ.bind(this)), $(".douban-review").click(this.shareDouban.bind(this)), $(".naver-review").click(this.shareNaver.bind(this)), $(".vk-review").click(this.shareVk.bind(this)), $(".ok-review").click(this.shareOk.bind(this)), $(".shortener").on("click", this._swapUrl.bind(this)), $(".copy-link").on("click", this._copyShare.bind(this)), $(".icon-circlex").on("click", this._hideShareContainer.bind(this)), this.$container.on("click", function(e) {
                            return e.stopPropagation()
                        })
                    }
                }, {
                    key: "_toggleShare",
                    value: function(e) {
                        var t = this;
                        e && (e.stopPropagation(), $(document).one("click", function() {
                            return t.$container.hide()
                        }));
                        var i = $(e.target).closest(".share-this-review").find(this.$container),
                            n = this._getShareReviewId(e),
                            a = i.find(".input-field");
                        i.attr("data-long-url", n), a.val(n), void 0 == i.data("shorten-url") && this._getShortenLink(n, i), i.toggle()
                    }
                }, {
                    key: "_swapUrl",
                    value: function(e) {
                        var t = $(e.target).closest(".share-review-container").find(".input-field"),
                            i = t.closest(this.$container);
                        $(e.target).is(":checked") ? t.val(i.data("shorten-url")) : t.val(i.data("long-url"))
                    }
                }, {
                    key: "_hideShareContainer",
                    value: function() {
                        this.$container.hide()
                    }
                }, {
                    key: "_getShareReviewId",
                    value: function(e) {
                        var t = $(e.target).closest(".textcontainer").data("review-id"),
                            i = this.$url;
                        return this.$shareCode ? i + "?rid=" + t + "&rcode=" + this.$shareCode : i + "?rid=" + t
                    }
                }, {
                    key: "_getShareReview",
                    value: function(e) {
                        return $(e.target).closest(".review-row").find(".review-text").text()
                    }
                }, {
                    key: "_getShareURL",
                    value: function(e) {
                        var t = $(e.target).closest(this.$container).data("shorten-url"),
                            i = $(e.target).closest(this.$container).data("long-url");
                        return void 0 !== t ? encodeURIComponent(t) : encodeURIComponent(i)
                    }
                }, {
                    key: "_getShortenLink",
                    value: function(e, t) {
                        $.ajax({
                            type: "GET",
                            url: "/Catalog/ShortenUrl/?url=" + encodeURIComponent(e),
                            cache: !1
                        }).done(function(e) {
                            $(t).attr("data-shorten-url", e.shortUrl)
                        }.bind(this))
                    }
                }, {
                    key: "_facebook",
                    value: function(e) {
                        var t = this._getShareURL(e),
                            i = this._getShareReview(e);
                        r["default"].shareFacebook(decodeURIComponent(t), i)
                    }
                }, {
                    key: "_twitter",
                    value: function(e) {
                        var t = {
                            url: this._getShareURL(e),
                            text: this.$checkOutReview,
                            via: "iherb"
                        };
                        r["default"].shareTwitter(t)
                    }
                }, {
                    key: "_google",
                    value: function(e) {
                        var t = {
                            url: this._getShareURL(e),
                            prefilltext: this.$checkOutReview + " " + this._getShareReview(e)
                        };
                        r["default"].shareGooglePlus(t)
                    }
                }, {
                    key: "_pinterest",
                    value: function(e) {
                        var t = this.$model.data("product-image"),
                            i = {
                                media: t || $("#iherb-product-image").attr("src"),
                                description: this._getShareReview(e),
                                url: this._getShareURL(e)
                            };
                        r["default"].sharePinterest(i)
                    }
                }, {
                    key: "shareWeibo",
                    value: function(e) {
                        var t = {
                            url: this._getShareURL(e),
                            language: "zh",
                            title: this._getShareReview(e),
                            pic: null
                        };
                        r["default"].shareWeibo(t)
                    }
                }, {
                    key: "shareQZone",
                    value: function(e) {
                        var t = {
                            url: this._getShareURL(e),
                            pics: null,
                            desc: this._getShareReview(e)
                        };
                        r["default"].shareQzone(t)
                    }
                }, {
                    key: "shareQQ",
                    value: function(e) {
                        var t = {
                            url: this._getShareURL(e),
                            pics: null,
                            desc: this._getShareReview(e)
                        };
                        r["default"].shareQQ(t)
                    }
                }, {
                    key: "shareDouban",
                    value: function(e) {
                        var t = {
                            href: this._getShareURL(e),
                            text: this._getShareReview(e),
                            image: null
                        };
                        r["default"].shareDouban(t)
                    }
                }, {
                    key: "shareNaver",
                    value: function(e) {
                        var t = {
                            url: this._getShareURL(e),
                            title: this._getShareReview(e)
                        };
                        r["default"].shareNaver(t)
                    }
                }, {
                    key: "shareVk",
                    value: function(e) {
                        var t = {
                            url: this._getShareURL(e)
                        };
                        r["default"].shareVk(t)
                    }
                }, {
                    key: "shareOk",
                    value: function(e) {
                        var t = {
                            "st.cmd": "addShare",
                            "st._surl": this._getShareURL(e),
                            "st.title": this._getShareReview(e)
                        };
                        r["default"].shareOk(t)
                    }
                }, {
                    key: "_copyShare",
                    value: function(e) {
                        $(e.target).closest(this.$container).find(".input-field").select(), document.execCommand("copy")
                    }
                }]), e
            }();
        i["default"] = l
    }, {
        "./share-social": 65
    }],
    62: [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        i.sanitize = function(e) {
            var t = /(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\u9785\u9786\u9937\u9975\u55356\u57239\u55356\u57246\u55356\u57247\u55357\u56764\u55357\u57037\u55357\u56694\u9976\u55356\u57238\u55357\u56697\u9829\u55356\u57242\u9824\u9827\u55356\u57243\u55356\u57241\u55357\u57056\u9881\u9879\u55357\u57057\u9876\u55357\u56796\u9935\u55357\u56797\u9874\u55357\u57058\u9878\u9939\u55357\u56801\u55357\u56744\u55357\u56754\u55357\u56573\u9000\u9904\u9742\u9905\u55357\u56741\u55357\u56753\u55356\u57335\u55357\u56798\u55357\u56687\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\uFFFD\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F/g,
                i = e.val();
            i = i.replace(t, ""), e.val(i)
        }
    }, {}],
    63: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("../modules/utilities"),
            r = n(o),
            l = function() {
                function e(t, i, n) {
                    a(this, e), this.$element = $(t), this.$scrollPastElement = $(i), this._actionType = n || "fixed", this._threshold = 0, this.$window = $(window), this._init()
                }
                return s(e, [{
                    key: "_init",
                    value: function() {
                        this._elementsExist() && (this._setThreshold(), this._setEventType(), $(window).on("touchmove scroll load", r["default"].throttle(this._event, 300).bind(this)))
                    }
                }, {
                    key: "_setThreshold",
                    value: function() {
                        this._threshold = this.$scrollPastElement.offset().top + this.$scrollPastElement.outerHeight()
                    }
                }, {
                    key: "_setEventType",
                    value: function() {
                        switch (this._actionType) {
                            case "fixed":
                                this._event = this._eventFixed;
                                break;
                            case "show":
                                this._event = this._eventShow;
                                break;
                            case "hide":
                                this._event = this._eventHide
                        }
                    }
                }, {
                    key: "_elementsExist",
                    value: function() {
                        return this.$element.length && this.$scrollPastElement.length
                    }
                }, {
                    key: "_isScrolledPast",
                    value: function() {
                        return this.$window.scrollTop() >= this._threshold
                    }
                }, {
                    key: "_eventFixed",
                    value: function() {
                        var e = this._isScrolledPast();
                        this.$element.toggleClass("fixed", e)
                    }
                }, {
                    key: "_eventShow",
                    value: function() {
                        var e = this._isScrolledPast();
                        this._toggle(e)
                    }
                }, {
                    key: "_eventHide",
                    value: function() {
                        var e = this._isScrolledPast();
                        this._toggle(!e)
                    }
                }, {
                    key: "_toggle",
                    value: function(e) {
                        this.$element.toggle(e)
                    }
                }]), e
            }();
        i["default"] = l
    }, {
        "../modules/utilities": 71
    }],
    64: [function(e, t, i) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = function() {
                function e(t) {
                    n(this, e), this.$elem = $(t), this.$input = this.$elem.find(".search-input"), this.$text = this.$elem.find(".search-text"), this.$list = this.$elem.find(".search-list"), this.$items = this.$list.find(this.$list.data("matches")), this.$included = $(), this.$excluded = $(), this.searched = "", this._hasFocus = this.$input.is(":focus"), this.init()
                }
                return a(e, [{
                    key: "init",
                    value: function() {
                        this.$input.val(""), this.$elem.on("click.iherb.searchfilter", ".search-clear", $.proxy(this._clear, this)).on("focus.iherb.searchfilter", ".search-input", $.proxy(this._focus, this)).on("blur.iherb.searchfilter", ".search-input", $.proxy(this._blur, this)).on("keyup input.iherb.searchfilter", ".search-input", $.proxy(this._keyup, this)).on("keydown.iherb.searchfilter", $.proxy(this._keydown, this))
                    }
                }, {
                    key: "search",
                    value: function(e) {
                        if (arguments.length || (e = this.$input.val()), this.searched != e) {
                            this.searched = e;
                            var t = [],
                                i = [],
                                n = new RegExp("(?:^|\\W|\\s)" + e.toLocaleUpperCase(), "g");
                            this.$items.each(function(e) {
                                var a = $.trim($(this).data("keyword").replace("\n", "").replace("\r", "")).toLocaleUpperCase();
                                a.search(n) != -1 ? t.push(this) : i.push(this)
                            }), this.$included = $(t), this.$excluded = $(i), this.filter(), this.$included.length > 0 ? (this.$list.removeClass("empty"), this.$list.scrollTop(0)) : this.$list.addClass("empty")
                        }
                    }
                }, {
                    key: "filter",
                    value: function() {
                        this.$included.show(), this.$excluded.hide()
                    }
                }, {
                    key: "reset",
                    value: function() {
                        this.$included = this.$items, this.$excluded = $(), this.filter(), this.$list.removeClass("empty"), this.$text.removeClass("searching")
                    }
                }, {
                    key: "hasFocus",
                    value: function(e) {
                        return arguments.length && (this._hasFocus = e, this._hasFocus ? this.$input.focus() : this.$input.blur()), this._hasFocus
                    }
                }, {
                    key: "_clear",
                    value: function(e) {
                        e.preventDefault(), this.$input.val(""), this.hasFocus(!1)
                    }
                }, {
                    key: "_focus",
                    value: function(e) {
                        this._hasFocus = !0
                    }
                }, {
                    key: "_blur",
                    value: function(e) {
                        this._hasFocus = !1, this.$input.val() || this.reset()
                    }
                }, {
                    key: "_keyup",
                    value: function(e) {
                        this.search(), this.$input.val().length <= 0 ? this.$text.removeClass("searching") : this.$text.addClass("searching")
                    }
                }, {
                    key: "_keydown",
                    value: function(e) {
                        switch (e.keyCode) {
                            case 38:
                                e.preventDefault();
                                break;
                            case 40:
                                e.preventDefault();
                                break;
                            case 9:
                                this.hasFocus(!1);
                                break;
                            default:
                                this.hasFocus(!0)
                        }
                    }
                }]), e
            }();
        i["default"] = s
    }, {}],
    65: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = e("./constants"),
            s = n(a),
            o = "http://s.images-iherb.com/i/images/share-image-default.png",
            r = function(e, t) {
                FB.ui({
                    method: "share",
                    href: e,
                    quote: t,
                    display: "popup"
                }, function(e) {})
            },
            l = function(e) {
                var t = w(s["default"].api.twitter, e);
                return y(t)
            },
            u = function(e) {
                var t = w(s["default"].api.googlePlus, e);
                return y(t)
            },
            c = function(e) {
                null == e.media && (e.media = o);
                var t = w(s["default"].api.pinterest, e);
                return y(t)
            },
            d = function(e) {
                null == e.pic && (e.pic = o);
                var t = w(s["default"].api.weibo, e);
                return window.open(t)
            },
            h = function(e) {
                null == e.pics && (e.pics = o);
                var t = w(s["default"].api.qzone, e);
                return y(t)
            },
            p = function(e) {
                null == e.pics && (e.pics = o);
                var t = w(s["default"].api.qq, e);
                return y(t)
            },
            f = function(e) {
                null == e.image && (e.image = o);
                var t = w(s["default"].api.douban, e);
                return window.open(t)
            },
            g = function(e) {
                var t = w(s["default"].api.naver, e);
                return y(t)
            },
            v = function(e) {
                var t = w(s["default"].api.vk, e);
                return y(t)
            },
            m = function(e) {
                var t = w(s["default"].api.ok, e);
                return y(t)
            },
            w = function(e, t) {
                var i = [],
                    n = void 0;
                for (var a in t) t.hasOwnProperty(a) && i.push(a + "=" + t[a]);
                return n = i.join("&"), e.indexOf("?") == -1 ? e + "?" + n : e + n
            },
            y = function(e) {
                var t = void 0 != window.screenLeft ? window.screenLeft : screen.left,
                    i = void 0 != window.screenTop ? window.screenTop : screen.top,
                    n = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
                    a = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
                    s = n / 2 - 313 + t,
                    o = a / 2 - 218 + i;
                window.open(e, "Sharing", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=626, height=436, top=" + o + ", left=" + s)
            };
        i["default"] = {
            shareFacebook: r,
            shareTwitter: l,
            shareGooglePlus: u,
            sharePinterest: c,
            shareWeibo: d,
            shareQzone: h,
            shareQQ: p,
            shareDouban: f,
            shareNaver: g,
            shareVk: v,
            shareOk: m
        }
    }, {
        "./constants": 26
    }],
    66: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./share-social"),
            r = n(o),
            l = function() {
                function e() {
                    a(this, e), this.couponCode = $(".coupon-code").text() || "", this.title = $(".product-title-text").text() || "", this.currentPath = "" == this.couponCode ? encodeURIComponent(window.location.href) : encodeURIComponent(window.location.href + "?rcode=" + this.couponCode), this._bindEvents()
                }
                return s(e, [{
                    key: "_bindEvents",
                    value: function() {
                        $(".product-share .icon-facebook").on("click", this.shareFaceBook.bind(this)), $(".product-share .icon-twitter").on("click", this.shareTwitter.bind(this)), $(".product-share .icon-googleplus").on("click", this.shareGooglePlus.bind(this)), $(".product-share .icon-facebookmessenger").on("click", this.fbMessenger.bind(this)), $(".product-share .icon-smsmessenger").on("click", this.smsMessenger.bind(this)), $(".product-share .icon-vk").on("click", this.shareVk.bind(this)), $(".product-share .icon-ok").on("click", this.shareOk.bind(this)), $(".product-share .icon-naver").on("click", this.shareNaver.bind(this)), $(".product-share .icon-pinterest").on("click", this.sharePinterest.bind(this)), $(".product-share .icon-weibo").on("click", this.shareWeibo.bind(this)), $(".product-share .icon-qzone").on("click", this.shareQZone.bind(this)), $(".product-share .icon-qq").on("click", this.shareQQ.bind(this)), $(".product-share .icon-douban").on("click", this.shareDouban.bind(this))
                    }
                }, {
                    key: "fbMessenger",
                    value: function() {
                        window.location.href = "fb-messenger://share?link=" + this.currentPath
                    }
                }, {
                    key: "smsMessenger",
                    value: function() {
                        var e = navigator.userAgent.toLowerCase();
                        e.indexOf("iphone") > -1 || e.indexOf("ipad") > -1 ? window.location.href = "sms:&body=" + this.currentPath : window.location.href = "sms:?&body=" + this.currentPath
                    }
                }, {
                    key: "shareFaceBook",
                    value: function() {
                        var e = $(".preloaded-text").data("facebook-message") || "";
                        r["default"].shareFacebook(decodeURIComponent(this.currentPath), e)
                    }
                }, {
                    key: "shareTwitter",
                    value: function() {
                        var e = {
                            url: this.currentPath,
                            text: $(".preloaded-text").data("twitter-message") || "",
                            via: "iherb"
                        };
                        r["default"].shareTwitter(e)
                    }
                }, {
                    key: "shareGooglePlus",
                    value: function() {
                        var e = {
                            url: this.currentPath,
                            prefilltext: $(".preloaded-text").data("google-message") || ""
                        };
                        r["default"].shareGooglePlus(e)
                    }
                }, {
                    key: "sharePinterest",
                    value: function() {
                        var e = $("#iherb-product-image").attr("src") || $(".product-inner a > img:first").attr("src"),
                            t = ($("#name").text(), {
                                media: e,
                                description: $(".preloaded-text").data("pinterest-message") || "",
                                url: this.currentPath
                            });
                        r["default"].sharePinterest(t)
                    }
                }, {
                    key: "shareWeibo",
                    value: function() {
                        var e = {
                            url: this.currentPath,
                            language: "zh",
                            title: $(".preloaded-text").data("weibo-message") || "",
                            pic: null,
                            appkey: "",
                            ralateUid: 3181420415
                        };
                        r["default"].shareWeibo(e)
                    }
                }, {
                    key: "shareQZone",
                    value: function() {
                        var e = {
                            url: this.currentPath,
                            title: "分享标题",
                            pics: null,
                            summary: "分享描述(分享窗口中默认的文字内容)",
                            desc: $(".preloaded-text").data("qzone-message") || ""
                        };
                        r["default"].shareQzone(e)
                    }
                }, {
                    key: "shareQQ",
                    value: function() {
                        var e = {
                            url: this.currentPath,
                            title: "分享标题",
                            pics: null,
                            summary: "分享描述(分享窗口中默认的文字内容)",
                            site: "网站名称",
                            desc: $(".preloaded-text").data("qq-message") || ""
                        };
                        r["default"].shareQQ(e)
                    }
                }, {
                    key: "shareDouban",
                    value: function() {
                        var e = {
                            href: this.currentPath,
                            image: null,
                            name: " 分享标题",
                            text: $(".preloaded-text").data("douban-message") || ""
                        };
                        r["default"].shareDouban(e)
                    }
                }, {
                    key: "shareNaver",
                    value: function() {
                        var e = {
                            url: this.currentPath,
                            title: $(".preloaded-text").data("naver-message") || ""
                        };
                        r["default"].shareNaver(e)
                    }
                }, {
                    key: "shareVk",
                    value: function() {
                        var e = {
                            url: this.currentPath,
                            description: $(".preloaded-text").data("vk-message") || ""
                        };
                        r["default"].shareVk(e)
                    }
                }, {
                    key: "shareOk",
                    value: function() {
                        var e = {
                            "st.cmd": "addShare",
                            "st._surl": this.currentPath,
                            "st.title": $(".preloaded-text").data("ok-message") || ""
                        };
                        r["default"].shareOk(e)
                    }
                }]), e
            }();
        i["default"] = l
    }, {
        "./share-social": 65
    }],
    67: [function(e, t, i) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = function() {
                function e(t) {
                    n(this, e);
                    var i = t.find("a"),
                        a = this.createSlides(i);
                    t.append('\n            <div id=\'carousel-brands-banner\' class=\'img-slider\'>\n                <div class=\'img-slider-container\'>\n                </div>\n                <div class=\'img-slider-indicators\'>\n                </div>\n                <div class="img-slider-controls">\n                    <span class="right controls">\n                        <i class="icon-recentlyviewedarrowright"></i>\n                    </span>\n                    <span class="left controls">\n                        <i class="icon-recentlyviewedarrowleft"></i>\n                    </span>\n                </div>\n            </div>\n        '), t.find(".img-slider-container").append(a), i.removeClass("hide")
                }
                return a(e, [{
                    key: "createSlides",
                    value: function(e) {
                        var t = $.map(e, function(e, t) {
                            var i = $("\n                <div class='img-wrapper'>\n                    <div class='slide'>\n                        \n                    </div>\n                </div>\n            ");
                            return 0 === t && i.addClass("active"), i.find(".slide").append(e), i
                        });
                        return t
                    }
                }]), e
            }();
        i["default"] = s
    }, {}],
    68: [function(e, t, i) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = function() {
                function e() {
                    n(this, e), this.$toaster = $("#toaster")
                }
                return a(e, [{
                    key: "toggle",
                    value: function(e) {
                        var t = this;
                        this.$toaster.text(e).show(), clearTimeout(this.timer), this.timer = setTimeout(function() {
                            t.$toaster.hide()
                        }, 2e3)
                    }
                }]), e
            }();
        i["default"] = s
    }, {}],
    69: [function(e, t, i) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = function() {
                function e() {
                    n(this, e), this.init()
                }
                return a(e, [{
                    key: "init",
                    value: function() {
                        this.bindEvents(), this.cacheDOM()
                    }
                }, {
                    key: "cacheDOM",
                    value: function() {
                        this.$modelProperties = $("#modelProperties"), this.isImperial = "True" === this.$modelProperties.data("imperial"), this.shippingWeightLb = this.$modelProperties.data("shipping-weight-lb"), this.actualWeightLb = this.$modelProperties.data("actual-weight-lb"), this.dimensionsIn = this.$modelProperties.data("dimensions-in"), this.dimensionsCm = this.$modelProperties.data("dimensions-cm"), this.hasDimensions = "True" === this.$modelProperties.data("has-dimensions"), this.shippingWeightKg = this.$modelProperties.data("shipping-weight-kg"), this.actualWeightKg = this.$modelProperties.data("actual-weight-kg"), this.seeUnitsMetric = this.$modelProperties.data("toggle-metric"), this.seeUnitsImperial = this.$modelProperties.data("toggle-imperial"), this.$shippingWeight = $(".dimensions-popup-wrapper.weight .product-weight"), this.$toolTip = $(".dimensions-units-popup"), this.$actualWeight = $("#actual-weight"), this.$dimensions = $("#dimensions")
                    }
                }, {
                    key: "bindEvents",
                    value: function() {
                        $(".product-weight").on("click", function() {
                            this._ajax().done(function() {
                                this._toggleUnits()
                            }.bind(this))
                        }.bind(this))
                    }
                }, {
                    key: "_toggleUnits",
                    value: function() {
                        var e, t, i, n;
                        this.isImperial = !this.isImperial, this.isImperial ? (e = this.shippingWeightLb, n = this.seeUnitsMetric, this.hasDimensions && (t = this.actualWeightLb, i = this.dimensionsIn)) : (e = this.shippingWeightKg, n = this.seeUnitsImperial, this.hasDimensions && (t = this.actualWeightKg, i = this.dimensionsCm)), this._updateDOM(e, t, n, i)
                    }
                }, {
                    key: "_updateDOM",
                    value: function(e, t, i, n) {
                        this.$shippingWeight.text(e), this.$toolTip.text(i), this.hasDimensions && (this.$actualWeight.text(t), this.$dimensions.text(n))
                    }
                }, {
                    key: "_ajax",
                    value: function() {
                        return $.ajax({
                            url: "/Catalog/ChangeShippingWeightPreference?isImperial=" + this.isImperial,
                            type: "GET",
                            dataType: "json"
                        })
                    }
                }]), e
            }();
        i["default"] = s
    }, {}],
    70: [function(e, t, i) {
        "use strict";
        $(window).load(function() {
            var e = window.iHerb_ActionHost + "/pro/SetCartCookies";
            ($(".iherb-header-cart-quantity").hasClass("cart-hide") || $(".iherb-header-amount").hasClass("cart-hide")) && $.ajax({
                type: "GET",
                xhrFields: {
                    withCredentials: !0
                },
                dataType: "text",
                url: e,
                data: {
                    isAjax: !0
                },
                cache: !1,
                success: function(e) {
                    var t = location.hostname.split;
                    e && (document.cookie = "ihr-temse=" + e + "; domain=." + t[1] + "." + t[2] + "; path=/", window.displayCart(), $(".iherb-header-amount").removeClass("cart-hide").addClass("cart-pop"), $(".iherb-header-cart-quantity").removeClass("cart-hide").addClass("cart-pop"))
                }
            })
        })
    }, {}],
    71: [function(e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        ! function() {
            String.prototype.supplant = function(e) {
                return this.replace(/{([^{}]*)}/g, function(t, i) {
                    var n = e[i];
                    return "string" == typeof n || "number" == typeof n ? n : t
                })
            }
        }();
        var a = $("html"),
            s = function(e) {
                var t = e.split(" ").map(function(e) {
                    return $.inArray(e, a.attr("class").split(" ")) > -1
                });
                return t
            },
            o = function(e) {
                return s(e).some(function(e) {
                    return e === !0
                })
            },
            r = function(e) {
                return s(e).every(function(e) {
                    return e === !0
                })
            },
            l = function(e) {
                for (var t = e + "=", i = document.cookie.split(";"), n = 0; n < i.length; n++) {
                    for (var a = i[n];
                        " " == a.charAt(0);) a = a.substring(1);
                    if (0 === a.indexOf(t)) return a.substring(t.length, a.length)
                }
                return ""
            },
            u = function(e, t) {
                var i = "",
                    n = "",
                    a = !1;
                return a = document.cookie.match(new RegExp(e + "=([^;]+)")), a && (i = a[1]), i.split("&").forEach(function(e) {
                    var i = e.split("=");
                    i[0] === t && (n = i[1])
                }), n
            },
            c = function(e, t, i) {
                var n = location.hostname.split("."),
                    a = (n.shift(), n.join(".")),
                    s = "expires=;";
                if ("" !== i) {
                    var o = new Date;
                    o.setTime(o.getTime() + 24 * i * 60 * 60 * 1e3), s = "expires=" + o.toUTCString()
                }
                document.cookie = e + "=" + t + "; domain=" + a + "; path=/; " + s
            },
            d = function(e, t, i) {
                var n, a, s, o = null,
                    r = 0,
                    l = Date.now || function() {
                        return (new Date).getTime()
                    };
                i || (i = {});
                var u = function() {
                    r = i.leading === !1 ? 0 : l(), o = null, s = e.apply(n, a), o || (n = a = null)
                };
                return function() {
                    var c = l();
                    r || i.leading !== !1 || (r = c);
                    var d = t - (c - r);
                    return n = this, a = arguments, d <= 0 || d > t ? (o && (clearTimeout(o), o = null), r = c, s = e.apply(n, a), o || (n = a = null)) : o || i.trailing === !1 || (o = setTimeout(u, d)), s
                }
            },
            h = function(e, t, i) {
                var n = void 0;
                return function() {
                    var a = this,
                        s = arguments,
                        o = function() {
                            n = null, i || e.apply(a, s)
                        },
                        r = i && !n;
                    clearTimeout(n), n = setTimeout(o, t), r && e.apply(a, s)
                }
            },
            p = {
                updateValue: function(e, t, i) {
                    var n = new RegExp("([?&])" + e + "=.*?(&|$)", "i"),
                        i = i || window.location.href,
                        a = i.indexOf("?") !== -1 ? "&" : "?";
                    return i.match(n) ? i.replace(n, "$1" + e + "=" + t + "$2") : i + a + e + "=" + t
                },
                removeKeyValuePair: function(e, t) {
                    var t = t || window.location.href;
                    return t.replace(new RegExp("[?&]" + e + "=[^&#]*(#.*)?$"), "$1").replace(new RegExp("([?&])" + e + "=[^&]*&"), "$1")
                },
                removeKeys: function(e) {
                    for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) i[n - 1] = arguments[n];
                    return i.forEach(function(t) {
                        e = e.replace(new RegExp("[?&]" + t + "=[^&#]*(#.*)?$"), "$1").replace(new RegExp("([?&])" + t + "=[^&]*&"), "$1")
                    }), e
                },
                getQueryValue: function(e) {
                    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                    var t = new RegExp("[\\?&]" + e + "=([^&#]*)"),
                        i = t.exec(location.search);
                    return null === i ? "" : decodeURIComponent(i[1].replace(/\+/g, " "))
                }
            },
            f = {
                set: function(e, t, i, a, s) {
                    if (!this.supportsLocalStorage() || "undefined" == typeof t || "" == e || "" == t) return !1;
                    var o = i ? sessionStorage : localStorage;
                    a && o.getItem(e) && (t = o.getItem(e) + "," + t), t = "number" == typeof s ? {
                        __data: t,
                        __expiry: Date.now() + 1e3 * parseInt(s)
                    } : {
                        __data: t,
                        __expiry: null
                    };
                    try {
                        return "object" === ("undefined" == typeof t ? "undefined" : n(t)) ? o.setItem(e, JSON.stringify(t)) : o.setItem(e, t), !0
                    } catch (r) {
                        return console.log("Unable to store " + e + " in storage due to " + r.name), !1
                    }
                },
                get: function(e) {
                    var t = null,
                        i = null,
                        n = null;
                    if (!this.supportsLocalStorage()) return null;
                    if (t = null, sessionStorage.getItem(e) ? t = sessionStorage.getItem(e) : localStorage.getItem(e) && (t = localStorage.getItem(e)), null == t) return null;
                    try {
                        var a = JSON.parse(t);
                        return a.hasOwnProperty("__expiry") ? (i = a.__expiry, n = Date.now(), null != i && n >= i ? (this.clear(e), null) : a.__data) : t
                    } catch (s) {
                        return t
                    }
                },
                clear: function(e) {
                    this.supportsLocalStorage() && (e ? (localStorage.removeItem(e), sessionStorage.removeItem(e)) : (localStorage.clear(), sessionStorage.clear()))
                },
                regexClear: function(e, t) {
                    var i = t ? sessionStorage : localStorage,
                        n = i.length,
                        a = null,
                        e = new RegExp(e, "g");
                    if (e)
                        for (; n--;) a = i.key(n), a.match(e) && this.clear(a)
                },
                supportsLocalStorage: function() {
                    try {
                        return localStorage.setItem("_", "_"), localStorage.removeItem("_"), !0
                    } catch (e) {
                        return !1
                    }
                }
            },
            g = {
                set: function(e, t, i, n) {
                    var a = i ? sessionStorage : localStorage;
                    n && a.getItem(e) && (t = a.getItem(e) + "," + t), a.setItem(e, t)
                },
                get: function(e) {
                    var t = null;
                    return sessionStorage.getItem(e) ? t = sessionStorage.getItem(e) : localStorage.getItem(e) && (t = localStorage.getItem(e)), t
                },
                clear: function(e) {
                    var t = localStorage.getItem("redirect");
                    e ? (localStorage.removeItem(e), sessionStorage.removeItem(e)) : (localStorage.clear(), sessionStorage.clear(), t && localStorage.setItem("redirect", 1))
                }
            },
            v = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                return (Math.round(2 * Math.abs(e)) / 2).toFixed(1)
            },
            m = function(e) {
                for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) i[n - 1] = arguments[n];
                return e.replace(/\{(\d+)\}/g, function(e, t) {
                    return i[t]
                })
            },
            w = function(e) {
                return Object.keys(e).forEach(function(t) {
                    return (null == e[t] || "" === e[t]) && delete e[t]
                }), e
            },
            y = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date,
                    t = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    i = t[e.getMonth()];
                return i + " " + e.getDate() + ", " + e.getFullYear()
            };
        i["default"] = {
            isPageAny: o,
            isPageAll: r,
            debounce: h,
            throttle: d,
            getCookieVal: u,
            getCookie: l,
            setCookie: c,
            productQuickStorage: g,
            queryString: p,
            quickStorage: f,
            roundRating: v,
            stringFormat: m,
            cleanObjProperties: w,
            getShortDateString: y
        }
    }, {}],
    72: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("./toaster"),
            r = n(o),
            l = e("./constants"),
            u = n(l),
            c = e("./utilities"),
            d = n(c),
            h = function() {
                function e() {
                    a(this, e), this.init()
                }
                return s(e, [{
                    key: "init",
                    value: function() {
                        this._cacheDom(), this._bindEvents(), this.toast = new r["default"](this.$items), this._checkLoginRedirect()
                    }
                }, {
                    key: "_cacheDom",
                    value: function() {
                        this.$model = $(".wishlist-model"), this.$addWishListButton = $(".btn-add-wishlist, .wishlist-arrow"), this.$dropDownWrapper = $(".dropdown-wrapper"), this.$wishListSubItems = $(".wishlist-sub-items"), this.$createList = $(".create-new-list"), this.$items = $(".item"), this.$createButton = $(".create-list-button"), this.$inputWrapper = $(".input-new-list"), this.$inputField = $(".list-input"), this.$error = $(".list-input-blank"), this.$pid = this.$model.val(), this.$folders
                    }
                }, {
                    key: "_bindEvents",
                    value: function() {
                        var e = this;
                        this.$addWishListButton.on("click", this._showWishList.bind(this)), this.$wishListSubItems.on("click", ".item", this._updateWishList.bind(this)), this.$createList.on("click", this._toggleCreateList.bind(this)), this.$createButton.on("click", this._submitNewList.bind(this)), this.$inputField.on("keypress", this._submitNewList.bind(this)), this.$error.on("click", function() {
                            e.$error.hide()
                        }), $(document).on("click", this._hideWishList.bind(this))
                    }
                }, {
                    key: "_checkLoginRedirect",
                    value: function() {
                        var e = d["default"].quickStorage.get("wishlist-redirect"),
                            t = $(".model-properties-product-history").data("product-isauthenticated");
                        e && "False" !== t && this._showWishList(), d["default"].quickStorage.clear("wishlist-redirect")
                    }
                }, {
                    key: "_updateWishList",
                    value: function(e) {
                        var t = $(e.target),
                            i = t.closest(".item").find("input:checkbox"),
                            n = t.closest(".item").attr("fid");
                        if (i.is(":checked")) {
                            var a = this.$model.data("item-removed");
                            this._updateItem(n, "remove"), i.attr("checked", !1), this.toast.toggle(a)
                        } else {
                            var s = this.$model.data("item-added");
                            this._updateItem(n, "add"), i.prop("checked", !0), this.toast.toggle(s)
                        }
                    }
                }, {
                    key: "_updateItem",
                    value: function(e, t) {
                        var i = {
                            pids: [this.$pid],
                            fid: e
                        };
                        "add" == t ? this._ajax(u["default"].url.addToWishList, i, "POST") : this._ajax(u["default"].url.removeWishListItem, i, "POST")
                    }
                }, {
                    key: "_showWishList",
                    value: function() {
                        var e = this._ajax(u["default"].url.getWishList, {
                            pid: this.$pid
                        }, "GET");
                        e.done(function(e) {
                            this._buildList(e, this.$wishListSubItems), this.$wishListSubItems.show(), this.$dropDownWrapper.show().addClass("active")
                        }.bind(this)), e.fail(function(e) {
                            d["default"].quickStorage.set("wishlist-redirect", 1), window.location.href = e.responseJSON.loginUrl
                        })
                    }
                }, {
                    key: "_hideWishList",
                    value: function(e) {
                        var t = $(e.target);
                        this.$dropDownWrapper.hasClass("active") && !t.hasClass("btn-add-wishlist") && 0 == t.closest(this.$dropDownWrapper).length && (this.$dropDownWrapper.hide().removeClass("active"), this.$inputWrapper.hide())
                    }
                }, {
                    key: "_submitNewList",
                    value: function(e) {
                        var t = this,
                            i = this.$inputField,
                            n = this.$error,
                            a = i.val().trim().toLowerCase();
                        if (13 === e.keyCode || void 0 === e.keyCode) {
                            if (this._checkDuplicate(a) !== -1) return void i.val("");
                            if (0 === a.length) n.show();
                            else {
                                var s = this._ajax(u["default"].url.addToWishList, {
                                        pids: [this.$pid],
                                        fid: null,
                                        fn: i.val()
                                    }, "POST"),
                                    o = this.$model.data("new-list");
                                this.$createButton.hide(), $(".load-button").show(), s.done(function(e) {
                                    t._showWishList(), t.toast.toggle(o), t.$createButton.show(), $(".load-button").hide(), i.val("")
                                })
                            }
                        }
                    }
                }, {
                    key: "_checkDuplicate",
                    value: function(e) {
                        return this.$folders.map(function(e) {
                            return null !== e.folderName ? e.folderName.toLowerCase() : e.folderName
                        }).indexOf(e)
                    }
                }, {
                    key: "_toggleCreateList",
                    value: function(e) {
                        this.$inputWrapper.hasClass("active") ? this.$inputWrapper.hide().removeClass("active") : this.$inputWrapper.show().addClass("active")
                    }
                }, {
                    key: "_buildList",
                    value: function(e, t) {
                        function i(e, t) {
                            return void 0 == e ? t : e
                        }
                        var n = $('<div class="item-container"></div>'),
                            a = this.$model.data("my-list"),
                            s = e;
                        this.$folders = e.folders, $.each(s.folders, function(e, t) {
                            n.append('\n                <div class="item" fid=' + t.folderId + '>\n                    <input type="checkbox" ' + (t.containsProduct ? "checked=checked" : "") + '>\n                    <i class="icon-check"></i>\n                    <label for=' + t.folderName + ">\n                        " + i(t.folderName, a) + "\n                    </label>\n                </div>\n                ")
                        }), t.html(n)
                    }
                }, {
                    key: "_ajax",
                    value: function(e, t, i) {
                        var n = this.$model.data("account");
                        return $.ajax({
                            xhrFields: {
                                withCredentials: !0
                            },
                            dataType: "json",
                            headers: {
                                "x-ajax": "1"
                            },
                            method: i,
                            crossDomain: !0,
                            url: n + e,
                            data: t
                        })
                    }
                }]), e
            }();
        i["default"] = h
    }, {
        "./constants": 26,
        "./toaster": 68,
        "./utilities": 71
    }],
    73: [function(e, t, i) {
        "use strict";

        function n(e) {
            if (Array.isArray(e)) {
                for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
                return i
            }
            return Array.from(e)
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
                }
                return e
            },
            o = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            r = function() {
                function e(t, i) {
                    a(this, e);
                    var n = {
                        height: 170,
                        width: 300
                    };
                    this.settings = s({}, n, i), this.players = null, this.init(t)
                }
                return o(e, [{
                    key: "init",
                    value: function(e) {
                        this.createPlayersFromIDs(e)
                    }
                }, {
                    key: "createPlayersFromIDs",
                    value: function(e) {
                        var t = this;
                        this.players = e.map(function(e) {
                            for (var i = [], a = 0; a < $("[id^=" + e + "]").length; a++) i = [].concat(n(i), [t.createPlayer($("#" + e + a))]);
                            return i
                        })
                    }
                }, {
                    key: "createPlayer",
                    value: function(e) {
                        return new window.YT.Player(e.attr("id"), {
                            height: this.settings.height,
                            width: this.settings.width,
                            videoId: e.data("video-id"),
                            playerVars: {
                                showinfo: 0,
                                rel: 0,
                                modestbranding: 1,
                                autoplay: 0
                            },
                            events: {
                                onReady: this.onPlayerReady.bind(this)
                            }
                        })
                    }
                }, {
                    key: "onPlayerReady",
                    value: function() {
                        this._removeDefaultDimensions()
                    }
                }, {
                    key: "_removeDefaultDimensions",
                    value: function() {
                        var e = $(this.elementId);
                        setTimeout(function() {
                            e.removeAttr("width"), e.removeAttr("height")
                        }, 0)
                    }
                }], [{
                    key: "loadYoutubeApi",
                    value: function() {
                        var e = document.createElement("script"),
                            t = document.getElementsByTagName("body")[0];
                        e.id = "youtube-api-script", e.src = "https://www.youtube.com/iframe_api", t.appendChild(e)
                    }
                }]), e
            }();
        i["default"] = r
    }, {}],
    74: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        e("../modules/update-basket"), e("../modules/popup"), e("../modules/jquery.responsive-carousel");
        var a = e("../modules/iherb-live"),
            s = n(a),
            o = e("../modules/latest-blog-articles"),
            r = n(o),
            l = e("../modules/external-link-redirect"),
            u = n(l);
        $(function() {
            new s["default"], new r["default"]($(".latest-blog-articles-container")), new u["default"]
        })
    }, {
        "../modules/external-link-redirect": 32,
        "../modules/iherb-live": 35,
        "../modules/jquery.responsive-carousel": 38,
        "../modules/latest-blog-articles": 40,
        "../modules/popup": 44,
        "../modules/update-basket": 70
    }],
    75: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var a = e("../modules/utilities"),
            s = n(a);
        s["default"].isPageAll("info applanding") && $(function() {
            var e = s["default"].quickStorage.get("apps_first_visit"),
                t = $("#transBG"),
                i = $(".app-promo-container");
            e || (s["default"].quickStorage.set("apps_first_visit", !0), setTimeout(function() {
                i.show(), t.removeClass("hide")
            }, 3e3)), $("#transBG, .icon-circlex").on("click", function() {
                i.hide(), t.addClass("hide")
            })
        })
    }, {
        "../modules/utilities": 71
    }],
    76: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var a = e("../modules/utilities"),
            s = n(a),
            o = e("../modules/pagination-ajax"),
            r = n(o);
        e("../modules/jquery.swipe");
        var l = e("../modules/carousel-pagination"),
            u = n(l),
            c = e("../modules/scroll-event"),
            d = n(c),
            h = e("../modules/dropdown"),
            p = n(h);
        if (s["default"].isPageAny("customblog CustomBlog") && $(function() {
                new d["default"](".navbar", ".iherb-header-threshold", "fixed"), new p["default"]($(".tablet-category-dropdown")), new p["default"]($(".desktop-category-dropdown"));
                $(".CustomBlog").on("click.iherb.search-submit", ".js-search-submit-navbar, .js-search-submit-sidebar", function(e) {
                    var t = $(e.target),
                        i = t.parent();
                    i.find("input").val() && i.submit()
                }), $("#SelectedCategoryPath").on("change", function(e) {
                    window.ih.ga.action.changeDropdown(e)
                })
            }), s["default"].isPageAny("blogarticle") && $(function() {
                $(".article").find("a").not(".xpagination-links").attr("target", "_blank")
            }), s["default"].isPageAny("bloghome")) {
            var f = function() {
                var e = $("#carousel-popular-articles");
                e.carousel({
                    interval: !1,
                    pause: "hover",
                    ride: "carousel"
                }), e.swipe({
                    threshold: 90
                }), e.on("slide.bs.carousel", function(e) {
                    if ("slide-1" == e.relatedTarget.id) {
                        var t = $(this).data("bs.carousel");
                        t.options.interval = !1
                    }
                })
            };
            $(function() {
                f();
                new u["default"]($(".popular-articles")), new r["default"]
            })
        }
    }, {
        "../modules/carousel-pagination": 24,
        "../modules/dropdown": 30,
        "../modules/jquery.swipe": 39,
        "../modules/pagination-ajax": 43,
        "../modules/scroll-event": 63,
        "../modules/utilities": 71
    }],
    77: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var a = e("../modules/utilities"),
            s = n(a),
            o = e("../modules/search-filter"),
            r = n(o),
            l = e("../modules/popup"),
            u = n(l);
        e("../../lazyload"), s["default"].isPageAll("rootcategorypage") && $(function() {
            $(".carousel-container .carousel").carousel({
                interval: !1
            }), $(".carousel-container").responsiveCarousel(), new u["default"](".popup-view-all-categories", ".modal-view-all-categories");
            new r["default"](".modal-view-all-categories")
        })
    }, {
        "../../lazyload": 90,
        "../modules/popup": 44,
        "../modules/search-filter": 64,
        "../modules/utilities": 71
    }],
    78: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var a = e("../modules/utilities"),
            s = n(a);
        s["default"].isPageAll("doctormurray") && $(function() {
            function e() {
                var e = document.location.hash,
                    t = new RegExp("#id=", "gi").exec(e),
                    i = t && e.replace(t[0], "");
                $(".conditionsMenu li").removeClass("current"), $("conditionsMenu li.current").removeClass("current"), i && $("#" + i).addClass("current").siblings().removeClass("current"), i && $("[data-tab=" + i + "]").addClass("current")
            }
            $(".conditionsMenu").on("click", "li", function(e) {
                e.preventDefault();
                var t = $(this).attr("data-tab");
                document.location.hash = "id=" + t
            }), $(window).on("load.hash hashchange", e.bind(void 0))
        })
    }, {
        "../modules/utilities": 71
    }],
    79: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var a = e("../modules/utilities"),
            s = n(a),
            o = e("../modules/defer-load-images"),
            r = n(o),
            l = e("../modules/recommendation-module"),
            u = n(l),
            c = e("../modules/lazyload-carousel-images"),
            d = n(c),
            h = e("../modules/popup"),
            p = n(h);
        e("../modules/jquery.swipe");
        var f = e("../modules/recently-viewed"),
            g = n(f),
            v = e("../modules/image-slider"),
            m = n(v);
        if (s["default"].isPageAll("home")) {
            new r["default"];
            $(function() {
                var e = (new m["default"]("#carousel-main-banner", {
                    indicators: !0,
                    slideAnimation: .6,
                    controls: !0,
                    autoPlay: !0,
                    slideAnimationType: "ease-in-out"
                }), new u["default"]);
                if ($("#carousel-trending").length) {
                    new p["default"](".popup-trending", ".modal-trending");
                    e.initRecommendationsCarousel("trending")
                }
                $("#carousel-best-selling").length && e.initRecommendationsCarousel("best-selling"), $(".carousel-container").responsiveCarousel(), $("[id^=carousel-]").each(function(e, t) {
                    $(t).swipe({
                        threshold: 90
                    }), new d["default"](t)
                });
                new g["default"]($(".recently-viewed-placeholder"), function(e) {
                    var t = $(e);
                    t.find(".product").length >= 12 && e && $(".grey-gutter.hide").show()
                })
            })
        }
    }, {
        "../modules/defer-load-images": 29,
        "../modules/image-slider": 36,
        "../modules/jquery.swipe": 39,
        "../modules/lazyload-carousel-images": 41,
        "../modules/popup": 44,
        "../modules/recently-viewed": 54,
        "../modules/recommendation-module": 55,
        "../modules/utilities": 71
    }],
    80: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var a = e("../modules/utilities"),
            s = n(a),
            o = e("../modules/recommendation-module"),
            r = n(o);
        s["default"].isPageAll("iherbcoupon") && $(function() {
            var e = new r["default"];
            $("#carousel-trending").length && e.initRecommendationsCarousel("trending"), $(".carousel-container").responsiveCarousel(), $(".apply-coupon").on("click", function() {
                var e = $(this).data("applied"),
                    t = s["default"].getCookie("iher-pref1");
                s["default"].setCookie("iher-pref1", t + "&ihr-pcode1=WELCOME5"), $(this).removeClass("btn-primary").addClass("btn-default disabled").text(e)
            })
        })
    }, {
        "../modules/recommendation-module": 55,
        "../modules/utilities": 71
    }],
    81: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var a = e("../modules/utilities"),
            s = n(a);
        s["default"].isPageAll("info links") && $(function() {
            $(".MainContent a").each(function() {
                var e = $(this),
                    t = e.attr("href");
                e.attr("data-ga-event", "click").attr("data-ga-event-category", "Info Links").attr("data-ga-event-action", "Link Click").attr("data-ga-event-label", "Click - " + t).attr("data-ga-event-value", "")
            })
        })
    }, {
        "../modules/utilities": 71
    }],
    82: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var a = e("../modules/utilities"),
            s = n(a),
            o = e("../modules/popup"),
            r = n(o);
        s["default"].isPageAll("info") && $(function() {
            new r["default"](".popup-dutytaxes", ".modal-dutytaxes")
        })
    }, {
        "../modules/popup": 44,
        "../modules/utilities": 71
    }],
    83: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var a = e("../modules/utilities"),
            s = n(a),
            o = e("../modules/reviews-helpfulness"),
            r = n(o),
            l = e("../modules/reviews-share"),
            u = n(l);
        s["default"].isPageAll("me index") && $(function() {
            new r["default"], new u["default"];
            $(".carousel-container").responsiveCarousel({
                update: !0,
                imagePerRow: 4
            });
            var e = $(".follow-me-links");
            0 == e.children().length && $(".social-icons > h1").addClass("hide"), $("#myreviews").change(function() {
                var e = document.location.toString(),
                    t = void 0;
                if (e.indexOf("?") != -1) {
                    var i = $("#myreviews option:selected").val();
                    t = s["default"].queryString.updateValue("src", i, e)
                } else t = e + "?src=" + $("#myreviews option:selected").val();
                window.location = t
            })
        })
    }, {
        "../modules/reviews-helpfulness": 59,
        "../modules/reviews-share": 61,
        "../modules/utilities": 71
    }],
    84: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var a = e("../modules/utilities"),
            s = n(a),
            o = e("../modules/qna-answers"),
            r = n(o);
        s["default"].isPageAll("QandA question") && $(function() {
            new r["default"]
        })
    }, {
        "../modules/qna-answers": 52,
        "../modules/utilities": 71
    }],
    85: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var a = e("../modules/utilities"),
            s = n(a),
            o = e("../modules/reviews-graph"),
            r = n(o),
            l = e("../modules/popup"),
            u = n(l),
            c = e("../modules/reviews-helpfulness"),
            d = n(c),
            h = e("../modules/product-attribute-groupings"),
            p = n(h),
            f = e("../modules/previously-ordered-products"),
            g = n(f),
            v = e("../modules/toggle-weight-units"),
            m = n(v),
            w = e("../modules/social-links.js"),
            y = n(w),
            _ = e("../modules/add-to-cart"),
            b = n(_),
            k = e("../modules/youtube-players"),
            C = n(k),
            x = e("../modules/image-viewer"),
            D = n(x),
            P = e("../modules/lazyload-carousel-images"),
            T = (n(P), e("../modules/wishlist.js")),
            S = n(T),
            E = e("../modules/reviews-share"),
            I = n(E),
            A = e("../modules/recently-viewed"),
            L = n(A),
            q = e("../modules/qna-question"),
            O = n(q);
        e("../modules/jquery.swipe");
        var F = e("../modules/product-share-email"),
            j = n(F),
            M = e("../modules/customer-related-products"),
            R = n(M),
            B = e("../modules/featured-products"),
            U = n(B),
            H = e("../modules/experiment");
        n(H);
        if (s["default"].isPageAll("productdetails")) {
            var W = function() {
                    var e = $(".review-popup");
                    e.length > 0 && (e.show(), $("#transBG").show())
                },
                N = function(e) {
                    s["default"].productQuickStorage.set("iherb_" + e, "true")
                },
                V = function() {
                    var e = $(".model-properties-product-history").data("product-ordered-customerid").length,
                        t = $(".model-properties-product-history").data("product-isauthenticated"),
                        i = s["default"].productQuickStorage.get("iherb_wishlist"),
                        n = s["default"].productQuickStorage.get("iherb_notificationlist");
                    "true" == i && e && "True" == t && z("wishlist-message-added"), "true" == n && e && z("notify-me-message-added"), s["default"].quickStorage.regexClear("iherb_")
                },
                z = function(e) {
                    var t = $(".info-popup"),
                        i = void 0;
                    t.hide();
                    var n = $("#" + e);
                    n.fadeIn(), n.mouseenter(function() {
                        clearTimeout(i)
                    }), n.mouseleave(function() {
                        Q(t)
                    }), i = Q(t, 4e3)
                },
                Q = function(e, t) {
                    return t = t || 2e3, setTimeout(function() {
                        e.fadeOut()
                    }, t)
                },
                G = function K() {
                    var e = $("#modelProperties"),
                        t = e.data("product-id"),
                        i = e.data("url-helper"),
                        n = e.data("visited-product"),
                        a = ($(".prodOverview-text"), $(".customer-review-block")),
                        s = $(".image-container").outerHeight(),
                        o = $("#product-action").outerHeight(),
                        l = $(".product-description-specifications"),
                        c = $(".triple-guarantee"),
                        h = ($(), new j["default"], new R["default"], new U["default"], new p["default"](function() {
                            K(), $(window).trigger("load"), window.onYouTubeIframeAPIReady()
                        }), new d["default"], new m["default"], new b["default"](i), new g["default"], new y["default"], new D["default"], new S["default"], new u["default"], new u["default"](".popup-modal-shipping", ".shipping-weight-message"), new u["default"](".popup-shipping-saver", ".modal-shipping-saver"), void 0),
                        f = void 0;
                    new I["default"], new L["default"]($(".recently-viewed-placeholder")), new O["default"];
                    window.youtubeVideos = [], $("#youtube-api-script").length || "CN" == window.COUNTRY_CODE || C["default"].loadYoutubeApi(), window.onYouTubeIframeAPIReady = function() {
                        var e = {};
                        e = $(window).height() <= 901 || $(window).width() <= 1200 ? {
                            height: 500,
                            width: 500
                        } : {
                            height: 700,
                            width: 700
                        }, window.youtubeVideos = new C["default"](["zoom-viewer-video-"], e)
                    }, V(), W(), h = new u["default"](".popup-special-note", ".modal-special-note", function() {
                        c.find(".spinner").length && $.get("/catalog/getTripleGuarantee", function(e) {
                            c.html(e)
                        })
                    }), f = new u["default"](".popup-guarantee-note", ".modal-guarantee-note", function() {
                        c.find(".spinner").length && $.get("/catalog/getTripleGuarantee", function(e) {
                            c.html(e)
                        })
                    }), "" === t && "" === n || $.ajax({
                        type: "POST",
                        url: n + "?pid=" + t,
                        data: t.toString()
                    }), $(window).on("resize", function() {
                        o > s && window.innerWidth < 992 ? l.addClass("clear-both") : l.removeClass("clear-both")
                    }), a.length && $(document).on("scroll.reviews-animation load.reviews-animation", function() {
                        var e = (a.offset().top, $(window).height() - a.height());
                        $(this).scrollTop() >= a.offset().top - e && ((0, r["default"])(), $(document).off("scroll.reviews-animation"))
                    }).load(), $(".btn-notify-add-to-list").on("click", function() {
                        N("notificationlist")
                    }), $(".btn-notify-is-in-list").on("click", function() {
                        z("notify-me-message-in-list")
                    }), $("#notify-me-message-in-list").on("click", function() {
                        $("#form-notify-me").submit()
                    }), $("#whoIsEligible").on("click", function() {
                        $("#whoIsEligible2").show(), $("#transBG").show()
                    }), $(".btnClose, #transBG, .icon-circlex").on("click", function() {
                        $("#transBG").hide(), $(".popup").hide(), $(".review-popup").hide()
                    })
                };
            $(function() {
                G()
            })
        }
    }, {
        "../modules/add-to-cart": 23,
        "../modules/customer-related-products": 28,
        "../modules/experiment": 31,
        "../modules/featured-products": 33,
        "../modules/image-viewer": 37,
        "../modules/jquery.swipe": 39,
        "../modules/lazyload-carousel-images": 41,
        "../modules/popup": 44,
        "../modules/previously-ordered-products": 45,
        "../modules/product-attribute-groupings": 46,
        "../modules/product-share-email": 51,
        "../modules/qna-question": 53,
        "../modules/recently-viewed": 54,
        "../modules/reviews-graph": 58,
        "../modules/reviews-helpfulness": 59,
        "../modules/reviews-share": 61,
        "../modules/social-links.js": 66,
        "../modules/toggle-weight-units": 69,
        "../modules/utilities": 71,
        "../modules/wishlist.js": 72,
        "../modules/youtube-players": 73
    }],
    86: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var a = e("../modules/utilities"),
            s = n(a),
            o = e("../modules/defer-load-images"),
            r = n(o),
            l = e("../modules/http"),
            u = (n(l), e("../modules/countdown-timer")),
            c = n(u),
            d = e("../modules/add-to-cart"),
            h = n(d),
            p = e("../modules/compare-products"),
            f = n(p),
            g = e("../modules/popup"),
            v = n(g),
            m = e("../modules/toggle-weight-units"),
            w = n(m),
            y = e("../modules/recently-viewed"),
            _ = n(y),
            b = e("../modules/product-list-product-filters"),
            k = n(b),
            C = e("../modules/related-blog-articles"),
            x = n(C),
            D = e("../modules/store-page-carousel"),
            P = n(D),
            T = e("../modules/image-slider"),
            S = n(T);
        if (s["default"].isPageAny("search") && $(function() {
                new x["default"]($("#related-blog-articles-container"))
            }), s["default"].isPageAny("productlist search specialproductlist productcomparison")) {
            var E = new r["default"];
            $(function() {
                    new h["default"], new w["default"], new v["default"], new v["default"](".popup-modal-shipping", ".shipping-weight-message"), new v["default"](".popup-supplement", ".modal-supplement"), new v["default"](".popup-shipping-saver", ".modal-shipping-saver"), new f["default"], new _["default"]($(".recently-viewed-placeholder")), new P["default"]($(".storepage-carousel"));
                    new k["default"](E);
                    new S["default"](".storepage-carousel", {
                        indicators: !0,
                        controls: !0,
                        slideAnimation: .6,
                        autoPlay: !0,
                        slideAnimationType: "ease-in-out"
                    })
                }),
                function(e, t) {
                    var i = function() {
                        this.init()
                    };
                    i.prototype = {
                        init: function() {
                            t(document).on("click.iherb.popup", ".popup-link", t.proxy(this._show, this)).on("click.iherb.popup", ".viewAll-close", t.proxy(this._close, this)).on("click.iherb.popup", ".popup", t.proxy(this._hideAll, this)).on("mousewheel.iherb.popup", ".viewAll-body", this._stop).on("click", "#transBG", t.proxy(this._close, this))
                        },
                        _show: function(e) {
                            var i = t(e.currentTarget).siblings(".popup"),
                                n = i.find(".viewAll-body");
                            t("#transBG").show(), e.preventDefault(), i.show(), n.scrollTop(0)
                        },
                        _close: function(e) {
                            var i = t("#CategoryLinks .popup");
                            t("#transBG").hide(), e.preventDefault(), i.hide()
                        },
                        _hideAll: function(e) {
                            var i = t(".viewAll-container"),
                                n = i.closest(".popup");
                            !i.is(e.target) && !i.has(e.target).length > 0 && n.hide()
                        },
                        _stop: function(e) {
                            var t = e.originalEvent,
                                i = t.wheelDelta || -t.detail;
                            this.scrollTop += 30 * (i < 0 ? 1 : -1), e.preventDefault()
                        }
                    }, e.Popup = i
                }(window.iHerb || {}, jQuery),
                function(e, t) {
                    t(document).ready(function() {
                        if (t("html.specialproductlist").length || t("#brands-of-week").length) {
                            var e = t("#daily-deals-timer");
                            e.data("countdown"), new c["default"]("daily-deals-timer"), new c["default"]("weekly-deals-timer")
                        }
                    })
                }(window.iHerb || {}, jQuery),
                function(e, t) {
                    var i = function(e) {
                        this.$carouselElement = t(e), this.updateDelay = 700, this.leftArrow, this.rightArrow, this.init()
                    };
                    i.prototype = {
                        init: function() {
                            this.bindEvents(), this.updateCounts()
                        },
                        bindEvents: function() {
                            this.leftArrow = this.$carouselElement.find("#specials-category-controls a[data-slide=prev]"), this.rightArrow = this.$carouselElement.find("#specials-category-controls a[data-slide=next]"), this.leftArrow.on("click.xpagination", function() {
                                setTimeout(function() {
                                    this.updateCounts()
                                }.bind(this), this.updateDelay)
                            }.bind(this)), this.rightArrow.on("click.xpagination", function() {
                                setTimeout(function() {
                                    this.updateCounts()
                                }.bind(this), this.updateDelay)
                            }.bind(this)), t(".carousel-container").on("slid.bs.carousel", function() {
                                this.updateCounts()
                            }.bind(this))
                        },
                        updateCounts: function() {
                            var e = this.$carouselElement.find("#specials-inner"),
                                t = this.$carouselElement.find("#specials-category-controls .count"),
                                i = e.find("div[data-pagination]").length,
                                n = e.find("div[data-pagination].active").data("pagination");
                            t.find(".index").text(n), t.find(".total").text(i)
                        }
                    }, t(document).ready(function() {
                        if (t("html.specialproductlist").length) {
                            t(".carousel-container .carousel").carousel({
                                interval: 4e3
                            });
                            new i(".deals-clearance"), new i(".deals-weekly")
                        }
                    })
                }(window.iHerb || {}, jQuery)
        }
    }, {
        "../modules/add-to-cart": 23,
        "../modules/compare-products": 25,
        "../modules/countdown-timer": 27,
        "../modules/defer-load-images": 29,
        "../modules/http": 34,
        "../modules/image-slider": 36,
        "../modules/popup": 44,
        "../modules/product-list-product-filters": 50,
        "../modules/recently-viewed": 54,
        "../modules/related-blog-articles": 56,
        "../modules/store-page-carousel": 67,
        "../modules/toggle-weight-units": 69,
        "../modules/utilities": 71
    }],
    87: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var a = e("../modules/utilities"),
            s = n(a),
            o = e("../modules/qna-question"),
            r = n(o);
        s["default"].isPageAll("QandA questions") && $(function() {
            new r["default"]
        })
    }, {
        "../modules/qna-question": 53,
        "../modules/utilities": 71
    }],
    88: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var a = e("../modules/utilities"),
            s = n(a),
            o = e("../modules/reviews-graph"),
            r = n(o),
            l = e("../modules/reviews-helpfulness"),
            u = n(l),
            c = e("../modules/scroll-event"),
            d = n(c),
            h = e("../modules/add-to-cart"),
            p = n(h),
            f = e("../modules/reviews-language"),
            g = n(f),
            v = e("../modules/reviews-share"),
            m = n(v),
            w = e("../modules/popup"),
            y = n(w),
            _ = e("../modules/reviews-filters"),
            b = n(_);
        if (s["default"].isPageAll("productreviews")) {
            $(function() {
                var e = (new d["default"](".review-sticky-header", ".review-sticky-header", "fixed"), new u["default"], new p["default"], new g["default"], new m["default"], new b["default"], k().fr);
                $(".stars[data-review-rating = " + e + "]").addClass("bold"), setTimeout(r["default"], 1e3), new y["default"]
            });
            var k = function() {
                for (var e = [], t = void 0, i = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), n = 0; n < i.length; n++) t = i[n].split("="), e.push(t[0]), e[t[0]] = t[1];
                return e
            }
        }
    }, {
        "../modules/add-to-cart": 23,
        "../modules/popup": 44,
        "../modules/reviews-filters": 57,
        "../modules/reviews-graph": 58,
        "../modules/reviews-helpfulness": 59,
        "../modules/reviews-language": 60,
        "../modules/reviews-share": 61,
        "../modules/scroll-event": 63,
        "../modules/utilities": 71
    }],
    89: [function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            o = e("../modules/loader"),
            r = n(o),
            l = e("../modules/utilities"),
            u = n(l);
        u["default"].isPageAll("topsellers") && $(function() {
            new c
        });
        var c = function() {
            function e() {
                a(this, e), this.cacheDOM(), this.bindEvents(), this.scrollOnLoad()
            }
            return s(e, [{
                key: "cacheDOM",
                value: function() {
                    var e = $(".sticky");
                    this.headerHeight = e.height(), this.stickyOffset = e.offset().top - this.headerHeight, this.$link = $('a[href*="#"]:not([href="#"])'), this.$regionFilter = $(".filter-best-selling.region-filter"), this.$modelProps = $("#best-selling-model-properties")
                }
            }, {
                key: "bindEvents",
                value: function() {
                    var e = this;
                    $(window).on("scroll", function() {
                        e.stickyHeader()
                    }), this.$link.length && this.$link.on("click", function(t) {
                        e.clickScroll(t)
                    }), this.$regionFilter.length && this.$regionFilter.on("click", function(t) {
                        e._switchCountryRegion($(t.target)), e.$regionFilter.find("input").toggle()
                    })
                }
            }, {
                key: "_switchCountryRegion",
                value: function(e) {
                    var t = e.find("input:visible"),
                        i = this.$modelProps.data("country-code"),
                        n = t.data("value"),
                        a = "country" == n ? void 0 : i;
                    this._fetchProductData(a).then(function(e) {
                        $(".top-sellers-row.panel-container").html(e), r["default"].hide()
                    })
                }
            }, {
                key: "_fetchProductData",
                value: function(e) {
                    var t = "/Catalog/TopSellers/";
                    return r["default"].show(), $.ajax({
                        type: "GET",
                        url: t,
                        data: {
                            countryCode: e
                        }
                    })
                }
            }, {
                key: "stickyHeader",
                value: function() {
                    var e = $(".sticky"),
                        t = $(window).scrollTop();
                    t >= this.stickyOffset ? e.addClass("fixed") : e.removeClass("fixed")
                }
            }, {
                key: "smoothScroll",
                value: function(e) {
                    var t = $(e).offset().top - this.headerHeight;
                    return $(".sticky").hasClass("fixed") || (t -= this.headerHeight), $("html, body").animate({
                        scrollTop: t
                    }, 500, function() {
                        window.location.hash = e
                    }), !1
                }
            }, {
                key: "scrollOnLoad",
                value: function() {
                    var e = location.hash;
                    e && this.smoothScroll(e)
                }
            }, {
                key: "clickScroll",
                value: function(e) {
                    var t = $(e.target).attr("href");
                    e.preventDefault(), this.smoothScroll(t)
                }
            }]), e
        }()
    }, {
        "../modules/loader": 42,
        "../modules/utilities": 71
    }],
    90: [function(e, t, i) {
        "use strict";
        ! function() {
            $(document).on("click.iherb", "[data-lazyload] [data-slide]", function(e) {
                var t, i = $(this),
                    n = $(t = i.attr("href")),
                    a = (i.data("slide"), n.find("." + n.data("lazyload") + " [data-image]"));
                a.length > 0 && (a.each(function() {
                    var e = $(this);
                    e.html('<img src="' + e.data("image") + '" />')
                }), a.removeAttr("data-image"))
            })
        }()
    }, {}]
}, {}, [21]),
function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], function(e) {
        t(e)
    }) : "object" == typeof module && module.exports ? module.exports = e.EasyZoom = t(require("jquery")) : e.EasyZoom = t(e.jQuery)
}(this, function(e) {
    "use strict";

    function t(t, i) {
        this.$target = e(t), this.opts = e.extend({}, g, i, this.$target.data()), void 0 === this.isOpen && this._init()
    }
    var i, n, a, s, o, r, l, u, c, d, h, p, f = !0,
        g = {
            loadingNotice: "",
            errorNotice: "The image could not be loaded",
            errorDuration: 2500,
            linkAttribute: "href",
            preventClicks: !0,
            beforeShow: e.noop,
            beforeHide: e.noop,
            onShow: e.noop,
            onHide: e.noop,
            onMove: e.noop
        };
    t.prototype._init = function() {
        this.$link = this.$target.find("a"), this.$image = this.$target.find("img"), this.$flyout = e('<div class="easyzoom-flyout" />'), this.$notice = e('<div class="easyzoom-notice" />'), this.$target.on({
            "mousemove.easyzoom touchmove.easyzoom": e.proxy(this._onMove, this),
            "mouseleave.easyzoom": e.proxy(this._onLeave, this),
            "touchend.easyzoom": e.proxy(this._onTouchLeave, this),
            "touchstart.easyzoom": e.proxy(this._onEnter, this),
            "mouseenter.easyzoom": e.proxy(this._onEnterMouse, this)
        }), this.opts.preventClicks && this.$target.on("click.easyzoom", function(e) {
            e.preventDefault()
        })
    }, t.prototype.show = function(e, t) {
        var o, r, l, u, c = this;
        if (this.opts.beforeShow.call(this) !== !1) {
            if (!this.isReady) return this._loadImage(this.$link.attr(this.opts.linkAttribute), function() {
                !c.isMouseOver && t || c.show(e)
            });
            this.$target.append(this.$flyout), o = this.$target.width(), r = this.$target.height(), l = 0 == this.$flyout.width() ? 400 : this.$flyout.width(), u = 0 == this.$flyout.height() ? 400 : this.$flyout.height(), i = this.$zoom.width() - l, n = this.$zoom.height() - u, i < 0 && (i = 0), n < 0 && (n = 0), a = i / o, s = n / r, this.isOpen = !0, this.opts.onShow.call(this), e && this._move(e)
        }
    }, t.prototype._onEnterMouse = function(e) {
        function t() {
            return "undefined" != typeof window.ontouchstart
        }
        t() || (e.preventDefault(), this.isMouseOver = !0, u ? (this.isOpen && this.hide(), this.isMouseOver = !1, u = !1) : (u = !0, this.show(e, !0)))
    }, t.prototype._onEnter = function(e) {
        function t(e) {
            var t = (new Date).getTime();
            return e.length > 1 && (l = null), t - l < 300 || void(1 === e.length && (l = t))
        }
        var i = e.originalEvent.touches;
        this.isMouseOver = !0, void 0 !== i && t(i) && (e.preventDefault(), u ? (this.isMouseOver = !1, this.isOpen && this.hide(), u = !1) : (this.show(e, !0), u = !0))
    }, t.prototype._onMove = function(e) {
        e.preventDefault(), this.isOpen && this._move(e)
    }, t.prototype._onLeave = function() {
        u = !1, this.isMouseOver = !1, this.isOpen && this.hide()
    }, t.prototype._onTouchLeave = function() {}, t.prototype._onLoad = function(e) {
        e.currentTarget.width && (this.isReady = !0, this.$notice.detach(), this.$flyout.html(this.$zoom), this.$target.removeClass("is-loading").addClass("is-ready"), e.data.call && e.data())
    }, t.prototype._onError = function() {
        var e = this;
        this.$notice.text(this.opts.errorNotice), this.$target.removeClass("is-loading").addClass("is-error"), this.detachNotice = setTimeout(function() {
            e.$notice.detach(), e.detachNotice = null
        }, this.opts.errorDuration)
    }, t.prototype._loadImage = function(t, i) {
        var n = new Image;
        this.$target.addClass("is-loading").append(this.$notice.text(this.opts.loadingNotice)), this.$zoom = e(n).on("error", e.proxy(this._onError, this)).on("load", i, e.proxy(this._onLoad, this)), n.style.position = "absolute", n.src = t
    }, t.prototype._dragOffset = function(e, t) {
        if (void 0 != c) {
            var i = {
                x: -(c - e),
                y: -(d - t)
            };
            return c = e, d = t, (i.x > 50 || i.x < -50 || i.y > 50 || i.y < -50) && (i = {
                x: 0,
                y: 0
            }), i
        }
        c = e, d = t
    }, t.prototype._updateDrag = function(e, t) {
        if (void 0 == t) var i = {
            x: e.x,
            y: e.y
        };
        else var i = {
            x: e.x + t.x,
            y: e.y + t.y
        };
        return i
    }, t.prototype._move = function(e) {
        if (e.stopPropagation(), 0 === e.type.indexOf("touch")) {
            var t = e.touches || e.originalEvent.touches;
            o = t[0].pageX, r = t[0].pageY
        } else o = e.pageX || o, r = e.pageY || r;
        var l = this.$target.offset(),
            u = r - l.top,
            c = o - l.left,
            d = Math.ceil(u * s),
            g = Math.ceil(c * a);
        if (g < 0 || d < 0 || g > i || d > n) this.hide();
        else {
            var v = d * -1,
                m = g * -1;
            if (0 === e.type.indexOf("touch"))
                if (f) this.$zoom.css({
                    top: v,
                    left: m
                }), f = !1, h = v, p = m;
                else {
                    var w = this._updateDrag({
                        x: h,
                        y: p
                    }, this._dragOffset(r, o));
                    this.$zoom.css({
                        top: w.x,
                        left: w.y
                    }), h = w.x, p = w.y
                }
            else this.$zoom.css({
                top: v,
                left: m
            });
            this.opts.onMove.call(this, v, m)
        }
    }, t.prototype.hide = function() {
        u = !1, this.isOpen && this.opts.beforeHide.call(this) !== !1 && (this.$flyout.detach(), this.isOpen = !1, f = !0, this.opts.onHide.call(this))
    }, t.prototype.swap = function(t, i, n) {
        this.hide(), this.isReady = !1, this.detachNotice && clearTimeout(this.detachNotice), this.$notice.parent().length && this.$notice.detach(), this.$target.removeClass("is-loading is-ready is-error"), this.$image.attr({
            src: t,
            srcset: e.isArray(n) ? n.join() : n
        }), this.$link.attr(this.opts.linkAttribute, i)
    }, t.prototype.teardown = function() {
        this.hide(), this.$target.off(".easyzoom").removeClass("is-loading is-ready is-error"), this.detachNotice && clearTimeout(this.detachNotice), delete this.$link, delete this.$zoom, delete this.$image, delete this.$notice, delete this.$flyout, delete this.isOpen, delete this.isReady
    }, e.fn.easyZoom = function(i) {
        return this.each(function() {
            var n = e.data(this, "easyZoom");
            n ? void 0 === n.isOpen && n._init() : e.data(this, "easyZoom", new t(this, i))
        })
    }
});