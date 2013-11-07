/**
 * Created by Administrator on 13-11-5.
 */
if (!window.console) {
    window.console = {};
    window.console.log = window.console.error = function () {
    }
}
if (!window.SEARCH) {
    window.SEARCH = {}
}
function html_chars_decode(a) {
    return !a ? "" : a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0*39;/g, "'")
}
function strip_tags(a, c) {
    c = (((c || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join("");
    var b = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, d = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return a.replace(d, "").replace(b, function (f, e) {
        return c.indexOf("<" + e.toLowerCase() + ">") > -1 ? f : ""
    })
}
function getQueryString(b, a) {
    var c = new RegExp("(^|\\?|&)" + b + "=([^&]*)(\\s|&|$)", "i");
    var d;
    if (a) {
        d = a
    } else {
        d = window.location.search
    }
    if (c.test(d)) {
        return RegExp.$2
    }
    return""
}
function bind_attr_href(a, b) {
    var c = MS.open ? $("#filter") : $("#select,#filter");
    c.unbind("click").bind("click", function (g) {
        var d = $(g.target), f = d.attr("href");
        if (!f) {
            d = d.parents("a");
            f = d.attr("href")
        }
        if (f && f != "javascript:;") {
            window.location.href = filtUrl(f, a) + (b ? "&" + a + "=" + b : "");
            return false
        }
    })
}
QUERY_KEYWORD = html_chars_decode(window.QUERY_KEYWORD);
REAL_KEYWORD = html_chars_decode(window.REAL_KEYWORD);
$("#key").val(QUERY_KEYWORD);
String.prototype.trim = function () {
    return this.replace(/^\s*(.*?)\s*$/, "$1")
};
String.prototype.isEmpty = function () {
    if (0 == this.length) {
        return true
    } else {
        return false
    }
};
$.extend({scriptsArray: [], delayLoad: function (g, a, b, k, c) {
    if (c !== undefined) {
        if ($(c).length == 0) {
            return false
        }
    }
    for (var f = 0, d = $.scriptsArray.length; f < d; f++) {
        if ($.scriptsArray[f] == a) {
            if (typeof(k) == "function") {
                k()
            }
            return true
        }
    }
    var h = document.getElementsByTagName("head")[0], e;
    if (g) {
        e = document.createElement("script");
        e.type = "text/javascript";
        e.charset = b || "gbk";
        e.src = a
    } else {
        e = document.createElement("link");
        e.type = "text/css";
        e.rel = "stylesheet";
        e.href = a
    }
    e.onload = e.onreadystatechange = function () {
        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
            $.scriptsArray.push(a);
            if (typeof(k) == "function") {
                k()
            }
        }
    };
    h.appendChild(e);
    return false
}});
function template(a, b) {
    if (typeof b != "object") {
        return""
    }
    return a.replace(/{#(.*?)#}/g, function () {
        var c = arguments[1];
        if ("undefined" != typeof(b[c]) && b[c] != null) {
            return b[c]
        } else {
            return""
        }
    })
}
function sGetScript(b, e, d) {
    e = e || "GBK";
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.charset = e;
    a.src = b;
    if (d == true) {
        a.async = true
    }
    var c = document.getElementsByTagName("head")[0];
    c.appendChild(a)
}
function htmlspecialchars(a, b) {
    a = a.replace("<", "&lt;").replace(">", "&gt;").replace("&", "&amp;").replace('"', "&quot;");
    return b == true ? a.replace("'", "&#0*39;") : a
}
(function () {
    var g = $("#refilter");
    if (g.length < 1) {
        return
    }
    var b = g.find("div.item"), e = g.find("a.more");
    var a = function (j) {
        var h = b.length;
        for (var k = 0; k < h; k++) {
            if (k >= 10) {
                if (!j) {
                    $(b[k]).hide()
                } else {
                    $(b[k]).show()
                }
            }
        }
    };
    e.bind("click", function () {
        if ((!$(this).attr("s") || $(this).attr("s") == null || $(this).attr("s") == "1")) {
            $(this).html("<span>收起</span><b class='close'></b>");
            a(true);
            $(this).attr({s: "0"})
        } else {
            $(this).html("<span>显示全部分类</span><b class='open'></b>");
            a(false);
            $(this).attr({s: "1"})
        }
    });
    g.find("h3").each(function () {
        $(this).click(function () {
            $(this).parent().toggleClass("hover")
        })
    });
    g.find("h3 a").click(function (h) {
        h.stopPropagation()
    });
    if (CS.list_category) {
        var f = CS.list_category.split(";");
        for (var d = 0, c = f.length; d < c; d++) {
            $("#category-2-" + f[d]).parents("div.item").addClass("hover").show()
        }
    }
})();
RelationalSearch = {html: null, init: function () {
    if (this.html === null) {
        var a = QUERY_KEYWORD;
        if ("" == a) {
            return
        } else {
            a = encodeURIComponent(a).toLocaleLowerCase();
            var c = "http://qpsearch.jd.com/relationalSearch?keyword={keyword}&callback=?", b = c.replace(/\{keyword}/, a), d = this;
            $.ajax({url: b, async: true, scriptCharset: "utf-8", dataType: "jsonp", success: function (e) {
                d.callback(e)
            }})
        }
    } else {
        if (this.html == "") {
            $("#dialogbox-gift").hide()
        } else {
            $("#dialogbox-gift").append(this.html)
        }
    }
}, callback: function (g) {
    var e = true, f = $("#dialogbox-gift");
    if (f.length < 1) {
        e = false;
        f = $(".recommend")
    }
    if ("string" == typeof(g) && g.length > 0) {
        var j = g.replace(/\*$/, "").split("*"), c = [], l = j.length;
        for (var h = 0; h < l; h++) {
            if ("" == b) {
                continue
            }
            c.push(j[h])
        }
        var a = c.length;
        if (a > 7) {
            a = 7
        }
        if (a > 0) {
            var k = '<div class="related-search"><span>相关搜索：</span>';
            for (var h = 0; h < a; h++) {
                var b = c[h];
                if (e) {
                    var d = "", m = "<b></b>";
                    if (h == 0) {
                        d = ' class="fore"'
                    } else {
                        if (h == a - 1) {
                            m = ""
                        }
                    }
                    sAnchorNode = "<a onclick='searchlog(1, 0, " + h + ', 52, "' + b + "\");' href='search?keyword=" + encodeURIComponent(b) + "&enc=utf-8'" + d + ">" + b + "</a>" + m
                } else {
                    sAnchorNode = "<a onclick='searchlog(1, 0, " + h + ', 52, "' + b + "\");' href='search?keyword=" + encodeURIComponent(b) + "&enc=utf-8'>" + b + "</a>"
                }
                k += sAnchorNode
            }
            k += "</div>";
            f.append(k);
            this.html = k
        }
    } else {
        this.html = "";
        f.hide()
    }
}};
var showBookSummary = function () {
    this.fragment = ['<div class="img"><img src="{img}" width="280" height="280" alt="" /></div><div class="text"><table cellpadding="0" cellspacing="0" border="0" width="100%">{detaile}</table></div>', '<div class="summary"><div class="i-summary"><div class="close" onclick="$(this).parent().parent().hide()"></div><div class="arrow"></div><div class="con"><div class="iloading">\u6b63\u5728\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u5019...</div></div></div></div>', "<tr><td>{name}{value}</td></tr>"];
    this.object = $("#plist").find("li.item-book");
    this.dataUrl = "http://d.360buy.com/bookExt/get?skuId=";
    this.edataUrl = "http://e.jd.com/ebook/ExteBookService.aspx?stype=search&skuid=";
    this.setPosition = function (a) {
        var c = $(a.get(0)).position(), b = screen.width > 1200 ? 360 : 120;
        if (c.left > b) {
            a.find(".summary").addClass("direct-left")
        }
    };
    this.init = function () {
        var a = this;
        this.object.each(function (b) {
            var c = $(this);
            c.find("img").bind("mouseover",function () {
                if ($("#plist").hasClass("plist-book")) {
                    return
                }
                var g = c.attr("bookid");
                c.css({"z-index": 4});
                if (c.find(".summary").length == 1) {
                    c.find(".summary").show()
                }
                if (!g) {
                    return false
                } else {
                    c.append(a.fragment[1]);
                    a.setPosition(c);
                    c.removeAttr("bookid");
                    var d = c.find(".con");
                    var f = (c.attr("e-tag") == "1");
                    var e = (!f ? a.dataUrl : a.edataUrl) + g + "&callback=?";
                    $.getJSON(e, function (r) {
                        r = r || {};
                        if (!r.img) {
                            r.img = c.find("img").attr("src").replace("/n2/", "/n1/")
                        } else {
                            r.img = "http://img10.360buyimg.com/n1/" + r.img
                        }
                        var k = "";
                        var h = "";
                        var m = "";
                        var p = "";
                        var n = f ? $.trim(r.FileFormat) : "";
                        var q = r.Author ? $.trim(r.Author) + " 著 " : "";
                        var l = r.Editer ? $.trim(r.Editer) + " 编 " : "";
                        var o = r.Transfer ? $.trim(r.Transfer) + " 译 " : "";
                        var j = r.Drawer ? $.trim(r.Drawer) + " 绘 " : "";
                        h = q + l + o + j;
                        h = $.trim(h);
                        if (!h) {
                            h = "暂无"
                        }
                        if (n) {
                            if (n == "PDF" || n == "EXE" || n == "SWF" || n == "EPUB") {
                                m += '<b class="pc"></b>'
                            }
                            if (n == "EPUB" || n == "PDF") {
                                m += '<b class="iphone"></b><b class="ipad"></b>'
                            }
                            if (n == "APK" || n == "EPUB" || n == "PDF") {
                                m += '<b class="android"></b>'
                            }
                        }
                        if (h) {
                            p += a.fragment[2].replace("{name}", "作　　者：").replace("{value}", h)
                        }
                        if (r.Publishers) {
                            p += a.fragment[2].replace("{name}", "出 &nbsp;版 &nbsp;社：").replace("{value}", r.Publishers)
                        }
                        if (r.PublishTime) {
                            p += a.fragment[2].replace("{name}", "出版时间：").replace("{value}", r.PublishTime)
                        }
                        if (r.BatchNo > 0) {
                            p += a.fragment[2].replace("{name}", "版　　次：").replace("{value}", r.BatchNo)
                        }
                        if (r.Pages) {
                            p += a.fragment[2].replace("{name}", "页　　数：").replace("{value}", r.Pages)
                        }
                        if (r.PrintTime) {
                            p += a.fragment[2].replace("{name}", "印刷时间：").replace("{value}", r.PrintTime)
                        }
                        if (r.Format) {
                            p += a.fragment[2].replace("{name}", "开　　本：").replace("{value}", r.Format)
                        }
                        if (r.Papers) {
                            p += a.fragment[2].replace("{name}", "纸　　张：").replace("{value}", r.Papers)
                        }
                        if (r.PrintNo > 0) {
                            p += a.fragment[2].replace("{name}", "印　　数：").replace("{value}", r.PrintNo)
                        }
                        if (r.WordCount > 0) {
                            p += a.fragment[2].replace("{name}", "字　　数：").replace("{value}", r.WordCount)
                        }
                        if (n) {
                            p += a.fragment[2].replace("{name}", "文件格式：").replace("{value}", n)
                        }
                        if (r.ISBN) {
                            p += a.fragment[2].replace("{name}", "ＩＳＢＮ：").replace("{value}", r.ISBN)
                        }
                        if (r.FileSize > 0) {
                            p += a.fragment[2].replace("{name}", "文件大小：").replace("{value}", r.FileSize + "M")
                        }
                        if (m) {
                            p += a.fragment[2].replace("{name}", '<span class="carrier">\u652F\u6301\u8f7d\u4F53\uff1a</span>').replace("{value}", m)
                        }
                        k = a.fragment[0].replace(/\{img\}/, r.img).replace(/\{detaile\}/, p);
                        d.html(k)
                    })
                }
            }).bind("mouseout", function () {
                c.css({"z-index": 0}).find(".summary").hide()
            })
        })
    }
};
(function () {
    if (typeof LogParm == "undefined") {
        LogParm = {ab: 0, result_count: 0}
    }
    if (!LogParm.rec_type) {
        LogParm.rec_type = getQueryString("nr") == "" ? "0" : "10"
    }
    LogParm.ev = LogParm.ev || 0;
    if (getQueryString("cid3")) {
        LogParm.cid = getQueryString("cid3")
    } else {
        if (getQueryString("cid2")) {
            LogParm.cid = getQueryString("cid2")
        } else {
            if (getQueryString("cid1")) {
                LogParm.cid = getQueryString("cid1")
            } else {
                LogParm.cid = ""
            }
        }
    }
    LogParm.psort = getQueryString("psort");
    LogParm.page = getQueryString("page") ? getQueryString("page") : "1";
    LogParm.sig = LogParm.sig || ""
})();
window.searchlog = function () {
    var k = Array.prototype.slice.call(arguments, 0), a, l = k[0] == 0 ? QUERY_KEYWORD : window.REAL_KEYWORD || QUERY_KEYWORD;
    var m = {sig: LogParm.sig, referer: window.location.href};
    if (k[0] == "e") {
        var g = encodeURIComponent(LogParm.ekey) + "^#psort#^#page#^#cid#^" + encodeURIComponent(window.location.href);
        k.shift();
        k.push(QUERY_KEYWORD);
        m.keyword = LogParm.ekey
    } else {
        var g = encodeURIComponent(l) + "^#psort#^#page#^#cid#^" + encodeURIComponent(window.location.href);
        m.keyword = l
    }
    var b = "http://sstat.jd.com/scslog?args=", c = k.length;
    if (c > 0) {
        if (k[0] == 0) {
            m.front_cost = LogParm.front_cost = LogParm.front_cost || "0";
            m.back_cost = LogParm.back_cost = LogParm.back_cost || "0";
            m.ip = LogParm.ip = LogParm.ip || "";
            m.rec_type = LogParm.rec_type;
            m.result_count = LogParm.result_count;
            a = b + LogParm.rec_type + "^" + g + "^^^" + LogParm.result_count + "^^" + LogParm.ev + "^" + LogParm.ab + "^" + LogParm.back_cost + "^" + LogParm.front_cost + "^" + LogParm.ip
        } else {
            if (k[0] == 1) {
                if (LogParm.rec_type != 10) {
                    a = b + "1^" + g + "^";
                    m.rec_type = 1
                } else {
                    a = b + "11^" + g + "^";
                    m.rec_type = 11
                }
                for (var d = 1; d < c; d++) {
                    a += encodeURI(k[d]) + "^"
                }
                if (c > 3) {
                    if (k[3] == "51") {
                        LogParm.cid = k[1]
                    } else {
                        if (k[3] == "55") {
                            LogParm.psort = k[1]
                        } else {
                            if (k[3] == "56") {
                                LogParm.page = k[1]
                            } else {
                                m.wid = k[1]
                            }
                        }
                    }
                }
                if (c >= 5) {
                    m.word = k[4]
                }
                m.pos = k[2];
                m.type = k[3];
                for (var d = 0, f = (5 - c); d < f; d++) {
                    a += "^"
                }
                a += LogParm.ev + "^" + LogParm.ab
            }
        }
    }
    a = a.replace("#cid#", LogParm.cid);
    a = a.replace("#psort#", LogParm.psort);
    a = a.replace("#page#", LogParm.page);
    m.cid = LogParm.cid;
    m.sort = LogParm.psort;
    m.page = LogParm.page;
    m.ev = LogParm.ev;
    m.ab = LogParm.ab;
    $.getScript(a + "&sig=" + encodeURIComponent(LogParm.sig));
    try {
        JA.tracker.ngloader("search.000001", m)
    } catch (h) {
    }
};
$(document).ready(function () {
    searchlog(0, 0, window.REAL_KEYWORD || QUERY_KEYWORD)
});
GS = window.GS || {};
GS.collocation = [
    {"爸爸": ["春节", "中秋", "新年", "生日"], "妈妈": ["春节", "中秋", "新年", "生日"], "丈夫": ["春节", "中秋", "新年", "情人节", "生日"], "妻子": ["春节", "中秋", "新年", "情人节", "生日"], "男朋友": ["春节", "中秋", "新年", "情人节", "生日"], "女朋友": ["春节", "中秋", "新年", "情人节", "生日"], "老人": ["春节", "中秋", "新年", "生日"], "小孩": ["春节", "中秋", "新年", "生日"], "领导": ["春节", "中秋", "新年", "生日"]},
    {"春节": ["爸爸", "妈妈", "丈夫", "妻子", "男朋友", "女朋友", "老人", "小孩", "领导"], "中秋": ["爸爸", "妈妈", "丈夫", "妻子", "男朋友", "女朋友", "老人", "小孩", "领导"], "新年": ["爸爸", "妈妈", "丈夫", "妻子", "男朋友", "女朋友", "老人", "小孩", "领导"], "情人节": ["丈夫", "妻子", "男朋友", "女朋友"], "生日": ["爸爸", "妈妈", "丈夫", "妻子", "男朋友", "女朋友", "老人", "小孩", "领导"]},
    ["春节", "中秋", "新年", "情人节", "生日"],
    ["爸爸", "妈妈", "丈夫", "妻子", "男朋友", "女朋友", "老人", "小孩", "领导"]
];
GS.init = function () {
    GS.obj = $("#dialogbox-gift").find("div.gift");
    if (GS.obj.length == 0) {
        return false
    }
    var c = "";
    for (var b = 0, a = GS.collocation[3].length; b < a; b++) {
        c += '<div><a href="javascript:;" onclick="GS.click(this)" title="' + GS.collocation[3][b] + '">' + GS.collocation[3][b] + "</a></div>"
    }
    GS.obj.find("dl:eq(0) dd").html(c);
    c = "";
    for (var b = 0, a = GS.collocation[2].length; b < a; b++) {
        c += '<div><a href="javascript:;" onclick="GS.click(this)" title="' + GS.collocation[2][b] + '">' + GS.collocation[2][b] + "</a></div>"
    }
    GS.obj.find("dl:eq(1) dd").html(c);
    GS.obj.children("a").bind("mouseenter",function () {
        if (GS.delytime) {
            clearTimeout(GS.delytime)
        }
        $(this).parent().addClass("hover")
    }).bind("mouseleave",function () {
        GS.delytime = setTimeout(function () {
            GS.obj.removeClass("hover")
        }, 500)
    }).next("div.prompt").bind("mouseenter",function () {
        clearTimeout(GS.delytime)
    }).bind("mouseleave", function () {
        $(this).parent().removeClass("hover")
    })
};
GS.click = function (b) {
    var a = GS.obj.find("dl").index($(b).parents("dl"));
    if ($(b).hasClass("curr")) {
        $(b).removeClass("curr");
        GS.html(GS.collocation[a + 2], a)
    } else {
        $(b).addClass("curr").parent("div").siblings().find("a").removeClass("curr");
        GS.html(GS.collocation[a][$(b).html()], a)
    }
};
GS.html = function (a, c) {
    c = c === 0 ? 1 : 0;
    var e = "", g, h = GS.obj.find("dl:eq(" + c + ")"), f = h.find("a.curr").html();
    for (var d = 0, b = a.length; d < b; d++) {
        if (f == a[d]) {
            g = "curr"
        } else {
            g = ""
        }
        e += '<div><a class="' + g + '" href="javascript:;" onclick="GS.click(this)" title="' + a[d] + '">' + a[d] + "</a></div>"
    }
    h.find("dd").html(e)
};
GS.search = function () {
    var a, b = GS.obj.find("dl:eq(0) a.curr").html(), c = GS.obj.find("dl:eq(1) a.curr").html();
    if (b && c) {
        a = "送" + b + c + "礼物"
    } else {
        if (b) {
            a = "送" + b + "礼物"
        } else {
            if (c) {
                a = c + "礼物"
            } else {
                return false
            }
        }
    }
    GS.obj.removeClass("hover");
    searchlog(1, 0, 0, 26);
    window.open("/Search?keyword=" + encodeURIComponent(a) + "&enc=utf-8")
};
function shop_search(b, a) {
    if (b == "") {
        return
    }
    $.ajax({url: "shop.php", data: {shop_id: b}, dataType: "json", success: function (d) {
        if (typeof d != "object" || !d.name) {
            return
        }
        d.score = d.score || 0;
        d.full_score = (Math.floor(d.score * 10000) / 10000).toFixed(4);
        d.star = Math.round(14 * d.full_score);
        d.score = Math.floor(d.score * 100) / 100;
        d.visible = d.score > 0 ? "" : 'style="visibility:hidden"';
        d.score = d.score.toFixed(2);
        d.title = d.name;
        d.name = screen.width >= 1200 ? d.name.substr(0, 14) : d.name.substr(0, 10);
        if (d.brief && d.brief.length > 20) {
            d.brief = d.brief.substr(0, 20) + "..."
        }
        if (!a) {
            var c = '<div class="store-logo"><a href="{#url#}" onclick="searchlog(1, \'{#shop_id#}\', 0, 58)" target="_blank"><img data-img="2" data-lazyload="{#logo#}"></a></div><div class="store-info"><h2><a href="{#url#}" title="{#title#}" onclick="searchlog(1, \'{#shop_id#}\', 0, 58)" target="_blank">{#name#}</a></h2><div class="shop-about">{#brief#}</div></div><div class="store-number" {#visible#}><dl><dd id="evaluate" title="{#full_score#}分">{#evaluate#}</dd></dl></div><a href="{#url#}" class="go-store" onclick="searchlog(1, \'{#shop_id#}\', 0, 58)" target="_blank">进入店铺</a>';
            var f = ((10 - d.full_score) * 10).toFixed(0);
            d.evaluate = '<em>服务评价：</em><span class="grade"><em style="left:-' + f + 'px"></em></span> ' + (Math.floor(10 * d.full_score) / 10).toFixed(1) + "分";
            c = template(c, d);
            if (c != "") {
                $("#flagship-store").html(c).show()
            }
        } else {
            var e = $("#plist-shop").find('div[shop-id="' + b + '"] > .shop-info');
            if (d.logo) {
                e.find(".shop-logo").html('<a href="' + d.url + '" title="' + d.title + '" target="_blank"><img data-img="2" width="135" height="45" data-lazyload="' + d.logo + '"></a>').show()
            } else {
                e.find(".shop-logo").html('<a href="' + d.url + '" title="' + d.title + '" target="_blank"></a>').show()
            }
            e.find(".shop-sname a:eq(0)").html(d.name).attr({title: d.title, href: d.url}).parent().show();
            e.find(".phrase").html(d.brief).show();
            var f = ((10 - d.full_score) * 10).toFixed(0);
            e.find("dl.evaluate > dd").html('<span class="grade"><em style="left:-' + f + 'px"></em></span> ' + (Math.floor(10 * d.full_score) / 10).toFixed(1) + "分").attr("title", d.full_score + "分");
            if (d.visible) {
                e.find("dl.evaluate").hide()
            } else {
                e.find("em.evaluate-grade").find("strong").attr("title", d.full_score).find("a").html(d.score)
            }
            e.find("a.go-shop").attr("href", d.url)
        }
        $("img[data-lazyload]").Jlazyload({type: "image", placeholderClass: "err-product"})
    }})
}
function multi_shop_search() {
    $("#plist-shop").find("div[shop-id]").each(function () {
        var a = this.getAttribute("shop-id");
        if (a) {
            shop_search(a, true)
        }
    })
}
multi_shop_search();
function filtUrl(d, c) {
    var e, f;
    if (!d && !c) {
        return""
    } else {
        if (!c) {
            e = window.location.pathname + window.location.search;
            f = d
        } else {
            e = d;
            f = c
        }
    }
    return e.replace(new RegExp("(^|\\?|&)" + f + "=([^&]*)", "gi"), "")
}
function ajax_jumpto() {
    var a = parseInt($("#pagin-btm .jumpto").val(), 10);
    SS.page(a, true)
}
function shop_name() {
    var c = $("div.service,div.shop-name").filter("[shop_id]"), d = 0;
    if (!c || (d = c.length) < 1) {
        return
    }
    for (var b = 0, a = []; b < d; b++) {
        a.push(c[b].getAttribute("shop_id"))
    }
    $.getJSON("ShopName.php", {ids: a.join(",")}, function (g) {
        if (typeof g != "object") {
            return
        }
        var h = {};
        for (var f = 0, e = g.length; f < e; f++) {
            h[g[f].id] = g[f]
        }
        for (var f = 0; f < d; f++) {
            var k = c.eq(f);
            curr = h[k.attr("shop_id")], html = '<a target="_blank" onclick="searchlog(1, ' + curr.id + ', 0, 58)" href="' + curr.url + '" title="' + curr.title + '">' + curr.title + "</a>";
            if (k.attr("tpl") == "2") {
                html = "由 " + html + " 发货"
            }
            k.html(html)
        }
        $("li.summary-service[shop_id]").remove()
    })
}
shop_name();
function priceSelect() {
    var b = $("#select"), a = b.find("input.price-range");
    if (a.length < 1) {
        return
    }
    a.keypress(function (d) {
        var c = d.keyCode || d.charCode;
        if (c && (c < 48 || c > 57) && c != 46) {
            d.preventDefault()
        }
    });
    a.blur(function (g) {
        var d = $(this), c = $.trim(d.val()), f = new RegExp("^[0-9]+(.[0-9]{2})?$", "g");
        if (!f.test(c)) {
            d.val("")
        }
        g.stopPropagation()
    });
    b.find("input.btn-determine").click(function () {
        var f = a.eq(0).val(), c = a.eq(1).val(), d = $(this).attr("url");
        f = parseInt(f, 10);
        c = parseInt(c, 10);
        if (!isNaN(f) && !isNaN(c)) {
            if (f > c) {
                var e = f;
                f = c;
                c = e
            }
            searchlog(1, 0, 0, 22, "价格::" + f + "-" + c);
            d = d.replace("min", f).replace("max", c)
        } else {
            if (!isNaN(f)) {
                searchlog(1, 0, 0, 22, "价格::" + f + "gt");
                d = d.replace("min", f).replace("-max", "gt")
            } else {
                if (!isNaN(c)) {
                    searchlog(1, 0, 0, 22, "价格::0-" + c);
                    d = d.replace("min", 0).replace("max", c)
                } else {
                    return false
                }
            }
        }
        d = filtUrl(d, "psort") + "&psort=" + SS.psort;
        window.location.href = filtUrl(d, "ms")
    })
}
priceSelect();
function brandFolded() {
    $("#select").find("dl").eq(0).addClass("fore");
    var a = $("#select-brand");
    if (a.length == 0) {
        return false
    }
    var e = $("#select-hold"), d = $("#brand-search"), c = a.find("ul"), k = a.find("div.content"), l = k.find("div"), m = screen.width >= 1200, h = m ? l.slice(15).css("display", "none") : l.slice(12).css("display", "none"), j = [], g = "可搜索拼音、汉字查找品牌", f;
    if ((m && l.length > 15) || (!m && l.length > 12)) {
        c.find("li").bind("click", function () {
            $(this).addClass("curr").siblings().removeClass("curr");
            d.val(g);
            var b = $(this).attr("rel");
            if (b == "0") {
                l.css("display", "block")
            } else {
                l.css("display", "none").filter("[rel='" + b + "']").css("display", "block")
            }
        });
        e.html("<b></b>展开").attr("class", "open").bind("click", function (n, b) {
            if (this.className != "close") {
                if ($.trim(window.brand_ids)) {
                    d.css("display", "inline-block")
                }
                c.css("display", "block");
                k.css({height: "150px", "overflow-y": "auto", border: "1px solid #ddd", padding: "3px 0 3px 10px", margin: "0 0 8px"});
                if (MS.selected_dl[0] && MS.selected_dl[0][0]) {
                    a.removeClass("brand-selected-fold").addClass("brand-selected-unfold")
                }
                l.css("display", "block");
                this.innerHTML = "<b></b>收起";
                this.className = "close"
            } else {
                if (b === undefined) {
                    d.css("display", "none");
                    if (MS.selected_dl[0] && MS.selected_dl[0][0]) {
                        a.removeClass("brand-selected-unfold").addClass("brand-selected-fold")
                    }
                    c.css("display", "none").find("li[rel='0']").addClass("curr").siblings().removeClass("curr");
                    k.css({height: "auto", "overflow-y": "visible", border: "none", padding: "0", margin: "0"});
                    l.css("display", "none").slice(0, m ? 15 : 12).css("display", "block");
                    this.innerHTML = "<b></b>展开";
                    this.className = "open"
                }
            }
            if (b === undefined) {
                searchlog(1, 0, 0, 50)
            }
        });
        window.brand_search_result = function (o) {
            if (typeof o != "object") {
                return
            }
            l.css("display", "none");
            var b = o.length;
            if (b) {
                for (var n = 0; n < b; n++) {
                    if (o[n].id) {
                        $("#brand_id_" + o[n].id).css("display", "block")
                    }
                }
            }
        };
        d.val(g).click(function () {
            if (this.value == g) {
                this.value = "";
                var b = c.find(".curr");
                if (b.attr("rel") != "0") {
                    b.removeClass("curr");
                    c.find("li[rel='0']").addClass("curr");
                    l.css("display", "block")
                }
            }
            searchlog(1, 0, 0, 49)
        }).blur(function () {
            if (this.value == "") {
                this.value = g
            }
        }).keyup(function (n) {
            if (n.keyCode == 13) {
                var b = k.find("div:visible");
                if (b.length == 1) {
                    window.location.href = b.find("a").attr("href");
                    return false
                }
            }
            var o = $.trim(this.value);
            if (o == f) {
                return
            }
            if (o != "") {
                sGetScript("http://bsearch.jd.com/?callback=brand_search_result&ids=" + brand_ids + "&key=" + encodeURIComponent(o), "UTF-8", true)
            } else {
                l.css("display", "block")
            }
            f = o
        })
    }
}
brandFolded();
function viewTypeSelect() {
    window.view_type = 1;
    if ($("#grid-unselected").hasClass("grid-curr")) {
        window.view_type = 2
    } else {
        if ($("#shop-unselected").hasClass("shop-curr")) {
            window.view_type = 3
        }
    }
    $("#list-unselected").click(function () {
        $(this).addClass("list-curr");
        $("#grid-unselected").removeClass("grid-curr").addClass("grid-unselected");
        $("#plist").addClass("plist-book");
        window.view_type = 1;
        bind_attr_href("vt", window.view_type)
    });
    $("#grid-unselected").click(function () {
        $(this).addClass("grid-curr");
        $("#list-unselected").removeClass("list-curr").addClass("list-unselected");
        $("#plist").removeClass("plist-book");
        window.view_type = 2;
        bind_attr_href("vt", window.view_type)
    })
}
viewTypeSelect();
DigitallMusicSummmary = {init: function () {
    if ($("#list-unselected").length < 1) {
        return false
    }
    var a = "";
    $("#plist").find("div.p-summary").each(function (b) {
        var c = this.id.split("-")[1];
        if (c >= 60000000 && c < 70000000) {
            a += c + ","
        }
    });
    if (a) {
        $.ajax({url: "DigitalMusicSummary.php", cache: false, timeout: 5000, data: {ids: a}, dataType: "json", success: function (b) {
            DigitallMusicSummmary.callback(b)
        }})
    }
}, callback: function (a) {
    if (!a) {
        return
    }
    for (i in a) {
        if (a[i]) {
            $("#summary-" + i).html("<p>" + a[i] + "</p>")
        }
    }
}};
CS = window.CS || {};
CS.load = function (a) {
    CS.loading = true;
    var b = $("#plist");
    b.prepend('<div class="loading-in"><div>正在加载中，请稍候~~</div></div><div class="clr"></div>');
    a = filtUrl(a, "cs") + "&cs=Y";
    a = filtUrl(a, "vt") + "&vt=" + window.view_type;
    a = filtUrl(a, "psort") + "&psort=" + SS.psort;
    a = filtUrl(a, "ms");
    if (MS.open) {
        a += "&ms=Y"
    }
    $.ajax({url: a, cache: true, timeout: 10000, error: function () {
        var c = '<div id="notfound"><h2>抱歉，没有找到符合条件的商品！</h2><h3>建议您：</h3><ul>';
        c += "<li>1.适当减少筛选条件，可以获得更多结果</li><li>2.调整价格区间</li><li>3.尝试其他关键字</li>";
        c += "</ul><b></b></div>";
        b.html(c)
    }, success: function (d) {
        $(".right-extra").html(d);
        iplocation();
        RelationalSearch.init();
        brandFolded();
        priceSelect();
        viewTypeSelect();
        MS.auto_click();
        SS.success_js();
        ware_type_fit_screen();
        reSearch();
        GS.init();
        var e = $("#category-" + CS.click_index), c = CS.click_index.indexOf("2-") == 0;
        if (c) {
            e.attr("class", "curr").parent().parent().addClass("hover")
        } else {
            e.parent().attr("class", "curr").parent().prev().find("a").attr("class", "curr")
        }
    }, complete: function () {
        CS.loading = false
    }})
};
CS.query = function (b, a) {
    if (CS.loading) {
        return
    }
    var c = $("#refilter");
    c.find("h2").html('<a href="' + CS.top_url + '">查看所有类目</a>');
    c.find("h3 a, li").removeClass("curr");
    CS.click_index = b;
    if (CS.click_index) {
        var d = $("#category-" + CS.click_index);
        if (d.length && d.offset().top > $(window).height()) {
            window.scrollTo(0, $("#select").offset().top)
        }
    }
    $("#shop-choice").html("").hide();
    $("#ad_left").html("").hide();
    CS.load(a)
};
SS = window.SS || {};
SS.base_url = filtUrl(filtUrl(SS.base_url || window.location.search.substr(1), "page"), "psort");
SS.load = function (a) {
    if (SS.loading) {
        return
    }
    a = filtUrl(a, "cs");
    a = filtUrl(a, "vt") + "&vt=" + window.view_type;
    SS.loading = true;
    var b = $("#plist");
    b.prepend('<div class="loading-in"><div>正在加载中，请稍候~~</div></div><div class="clr"></div>');
    $.ajax({url: a.replace(/[\s&]*$/g, ""), cache: true, timeout: 10000, error: function () {
        var c = '<div id="notfound"><h2>抱歉，没有找到符合条件的商品！</h2><h3>建议您：</h3><ul>';
        c += "<li>1.适当减少筛选条件，可以获得更多结果</li><li>2.调整价格区间</li><li>3.尝试其他关键字</li>";
        c += "</ul><b></b></div>";
        b.html(c)
    }, success: function (c) {
        b.html(c);
        SS.success_js()
    }, complete: function () {
        SS.loading = false
    }})
};
SS.success_js = function () {
    pageConfig.FN_ImgError(document);
    digital_price();
    get_stock();
    prompt_info();
    multi_shop_search();
    $("img[data-lazyload]").Jlazyload({type: "image", placeholderClass: "err-product"});
    pageConfig.isInitContrast = false;
    pageConfig.FN_InitContrast();
    shop_name();
    if (!window._new_stock) {
        ware_stock()
    }
    image_scroll("#plist .p-scroll");
    DigitallMusicSummmary.init();
    $.delayLoad(true, "script/digital_music_download.js", "gbk", "", 'li[e-tag!="1"] a.free-download');
    new showBookSummary().init();
    searchlog(0, 0)
};
SS.top_page_html = function (b, c, d) {
    var a = '<span class="text"><i>' + b + "</i>/" + c + "</span>";
    if (b <= 1) {
        a += '<span class="prev-disabled">上一页<b></b></span>'
    } else {
        a += '<a onclick="SS.page(' + (b - 1) + ')" href="javascript:;" class="prev" title="使用方向键左键也可翻到上一页哦！">上一页<b></b></a>'
    }
    if (b >= c) {
        a += '<span class="next-disabled">下一页<b></b></span>'
    } else {
        a += '<a onclick="SS.page(' + (b + 1) + ')" href="javascript:;" class="next" title="使用方向键右键也可翻到下一页哦！">下一页<b></b></a>'
    }
    $("#top_pagi").html(a).next(".total").html("<span>共<strong>" + d + "</strong>个" + SS.search_type + "</span>")
};
SS.bottom_page_html = function (d, e) {
    if (e < 0) {
        return""
    }
    var g = 1 > d - 3 ? 1 : d - 3, a = e < d + 2 ? e : d + 2, b = "";
    if (a < 6) {
        a = 6 < e ? 6 : e
    }
    if (d <= 1) {
        b += '<span class="prev-disabled">上一页<b></b></span>'
    } else {
        b += '<a onclick="SS.page(' + (d - 1) + ', true)" href="javascript:;" class="prev" title="使用方向键左键也可翻到上一页哦！">上一页<b></b></a>'
    }
    for (var f = g; f <= a; f++) {
        if (d == f) {
            b += '<a href="javascript:;" class="current">' + f + "</a>"
        } else {
            b += '<a onclick="SS.page(' + f + ', true)" href="javascript:;">' + f + "</a>"
        }
    }
    if (a < e) {
        b += '<span class="text">…</span>'
    }
    if (d >= e) {
        b += '<span class="next-disabled">下一页<b></b></span>'
    } else {
        b += '<a onclick="SS.page(' + (d + 1) + ', true)" href="javascript:;" class="next" title="使用方向键右键也可翻到下一页哦！">下一页<b></b></a>'
    }
    b += '<span class="page-skip"><em>&nbsp;&nbsp;共' + e + '页&nbsp;&nbsp;&nbsp;&nbsp;到第</em><input class="jumpto" type="text" value="' + d + '" onkeydown="javascript:if(event.keyCode==13){ajax_jumpto();return false;}"/><em>页</em><a class="btn-skipsearch" value="确定" onclick="ajax_jumpto()" href="javascript:;">确定</a></span>';
    $("#pagin-btm").html(b)
};
SS.page = function (b, a) {
    b = parseInt(b, 10);
    if (b < 1) {
        b = 1
    }
    window.location.hash = SS.base_url + "&psort=" + SS.psort + "&page=" + b;
    if (a) {
        window.scrollTo(0, $("#filter").offset().top)
    }
    searchlog(1, b, 0, 56)
};
SS.sort_html = function (c) {
    c = c || "";
    if (c == "0") {
        c = ""
    }
    var b = "<dt>排序：</dt>", a = '<dd class="#class#"><a href="javascript:;" onclick="#click#">#name#</a><b></b></dd>', d = class_name = "";
    if (c == "") {
        class_name = "curr"
    } else {
        d = "SS.sort('')"
    }
    b += a.replace("#class#", class_name).replace("#click#", d).replace("#name#", "相关度");
    class_name = d = "";
    if (c == "3") {
        class_name = "curr down"
    } else {
        d = "SS.sort('3')"
    }
    b += a.replace("#class#", class_name).replace("#click#", d).replace("#name#", "销量");
    if (c == "2") {
        class_name = "price curr up";
        d = "SS.sort('1')"
    } else {
        if (c == "1") {
            class_name = "price curr down";
            d = "SS.sort('2')"
        } else {
            class_name = "";
            d = "SS.sort('2')"
        }
    }
    b += a.replace("#class#", class_name).replace("#click#", d).replace("#name#", "价格");
    class_name = d = "";
    if (c == "4") {
        class_name = "curr"
    } else {
        d = "SS.sort('4')"
    }
    b += a.replace("#class#", class_name).replace("#click#", d).replace("#name#", "评论数");
    if ($("#list-unselected").length > 0) {
        class_name = d = "";
        if (c == "6") {
            class_name = "curr"
        } else {
            d = "SS.sort('6')"
        }
        b += a.replace("#class#", class_name).replace("#click#", d).replace("#name#", "出版时间")
    } else {
        class_name = d = "";
        if (c == "5") {
            class_name = "curr"
        } else {
            d = "SS.sort('5')"
        }
        b += a.replace("#class#", class_name).replace("#click#", d).replace("#name#", "上架时间")
    }
    $("#filter").find("dl.order").html(b)
};
SS.sort = function (a) {
    a = a || "";
    if (a == "0") {
        a = ""
    }
    window.location.hash = SS.base_url + "&psort=" + a;
    searchlog(1, a, 0, 55);
    bind_attr_href("psort", a)
};
SS.get_last_attr = function (b) {
    if (b) {
        var a = b.split("%40");
        return a[a.length - 2]
    } else {
        return""
    }
};
MS = window.MS || {};
MS.interval_time = 0;
MS.tag_html = $("#select h1 strong").html();
MS.button_click = function (e) {
    var g = $("#select div.extra a");
    var b = $("#more-options");
    var a = $("#select-price").find("input,i");
    var c = $("#select dd").not($("#selected_attrs dd")).find("div:not(.content)");
    var d = '<span class="s-brands"><span>已选品牌：</span></span>';
    var h = '<dl id="submit-reset"><dt></dt><dd><input type="button" class="btn-determine disabled" value="确定" onclick="MS.submit_click(this)"><input type="button" class="btn-determine" value="重置" onclick="MS.reset_click()"></dd></dl>';
    if (g.html() == "关闭多选模式") {
        MS.open = false;
        g.html("开启多选模式");
        $("#select h1 strong").html(MS.tag_html);
        $("#select-brand").removeClass("brand-selected-fold brand-selected-unfold");
        c.removeClass("attr-select selected");
        $("span.s-brands").remove();
        $("dd.select-color").find("a").removeClass("curr");
        a.show();
        $("#submit-reset").remove();
        MS.selected_dl = [];
        bind_attr_href("ms")
    } else {
        MS.open = true;
        g.html("关闭多选模式");
        $("#select h1 strong").html("多选模式, 每个属性最多可同时选5个选项");
        c.addClass("attr-select");
        $("#select-brand > dd").append(d);
        a.hide();
        if (b.is(":visible")) {
            b.trigger("click", [1])
        }
        var f = $("#select-hold");
        if (f.is(":visible")) {
            f.trigger("click", [1])
        }
        $("#select").append(h)
    }
    if (e === undefined) {
        searchlog(1, 0, 0, 24)
    }
};
MS.auto_click = function () {
    if (MS.select_dl_obj && MS.select_dl_obj.length == 0) {
        $("#select").find("div.extra").hide()
    } else {
        if (getQueryString("ms", SS.base_url)) {
            MS.button_click("1")
        }
    }
};
MS.auto_click();
MS.attr_click = function (g, q) {
    if (MS.open) {
        var k = window.event || arguments.callee.caller.arguments[0];
        if (k.preventDefault) {
            k.preventDefault();
            k.stopPropagation()
        } else {
            k.returnValue = false;
            k.cancelBubble = true
        }
        var l, f, h, j = $(g);
        h = MS.select_dl_obj.index(j.parents("dl"));
        if (MS.selected_dl[h] == undefined) {
            MS.selected_dl[h] = [0, []]
        }
        if (j.parent().attr("class") == "select-color") {
            l = j;
            f = "curr"
        } else {
            l = j.parent();
            f = "selected"
        }
        j.trigger("blur");
        var d = j.offset(), n = d.left - 50, m = d.top - 26;
        var b = $('<span id="max-notice" style="position:absolute;left:' + n + "px;top:" + m + 'px;z-index:100;border:1px solid #EDD28B;background:#FFFDEE;">已超过可选选项个数最大值喽！</span>');
        if (l.hasClass(f)) {
            MS.selected_dl[h][0]--;
            l.removeClass(f);
            if (j.parent().attr("rel")) {
                $("span.s-brands div").each(function () {
                    if ($(this).find("a").attr("title") == j.attr("title")) {
                        $(this).remove();
                        return false
                    }
                });
                if (MS.selected_dl[h][0] == 0) {
                    $("#select-brand").removeClass("brand-selected-fold brand-selected-unfold")
                }
            } else {
                var o = j.parents("dd").find("a").index(j);
                MS.selected_dl[h][1][o] = ""
            }
        } else {
            if (MS.selected_dl[h][0] >= 5) {
                if ($("#max-notice").is(":visible")) {
                    return false
                }
                b.prependTo("body");
                setTimeout(function () {
                    b.animate({opacity: 0}, 500, function () {
                        b.remove()
                    })
                }, 2000);
                return false
            } else {
                MS.selected_dl[h][0]++;
                l.addClass(f);
                if (j.parent().attr("rel")) {
                    var a = '<div class="attr-select selected"><a href="' + j.attr("href") + '" icon="' + j.parent().attr("id") + '" title="' + j.attr("title") + '" onclick="MS.selected_brand_click(this);return false;">' + j.text() + "</a></div>";
                    $("span.s-brands").append(a);
                    if ($("#select-hold").attr("class") == "close") {
                        $("#select-brand").addClass("brand-selected-unfold")
                    } else {
                        $("#select-brand").addClass("brand-selected-fold")
                    }
                } else {
                    var o = j.parents("dd").find("a").index(j);
                    MS.selected_dl[h][1][o] = SS.get_last_attr(getQueryString("ev", j.attr("href")))
                }
            }
        }
        MS.submit_style();
        var c = new Date().getTime();
        if (c - MS.interval_time > 800) {
            $.get("WareCount.php?" + MS.submit_url(), (function (e) {
                return function (p) {
                    if (MS.LastModified > e || !p) {
                        return
                    }
                    MS.LastModified = e;
                    b.html("当前选择条件下，约有" + p + "个" + SS.search_type).prependTo("body");
                    setTimeout(function () {
                        b.animate({opacity: 0}, 500, function () {
                            b.remove()
                        })
                    }, 2000)
                }
            })(c));
            MS.interval_time = c
        }
    } else {
        searchlog(1, 0, 0, 71, q)
    }
};
MS.selected_brand_click = function (a) {
    $(a).parent().remove();
    MS.selected_dl[0][0]--;
    if (MS.selected_dl[0][0] == 0) {
        $("#select-brand").removeClass("brand-selected-fold brand-selected-unfold")
    }
    $("#" + $(a).attr("icon")).removeClass("selected");
    MS.submit_style()
};
MS.submit_style = function () {
    var b = 0, c = $("#submit-reset").find("input.btn-determine").eq(0);
    for (var a in MS.selected_dl) {
        b += MS.selected_dl[a][0]
    }
    if (b) {
        c.removeClass("disabled")
    } else {
        c.addClass("disabled")
    }
};
MS.submit_url = function () {
    var e = "", g = "", b = filtUrl(SS.base_url, "click");
    $("span.s-brands").find("a").each(function () {
        g += SS.get_last_attr(getQueryString("ev", this.getAttribute("href"))) + "%7C%7C"
    });
    if (g) {
        g = g.substring(0, g.lastIndexOf("%7C%7C")).replace(/exbrand_/g, "");
        e += "exbrand_" + g + "%40"
    }
    for (var c in MS.selected_dl) {
        var d = "";
        for (var a in MS.selected_dl[c][1]) {
            if (MS.selected_dl[c][1][a]) {
                d += MS.selected_dl[c][1][a] + "%7C%7C"
            }
        }
        if (d) {
            var f = d.substring(0, d.indexOf("_") + 1);
            d = d.substring(0, d.lastIndexOf("%7C%7C")).replace(new RegExp(f, "g"), "");
            e += f + d + "%40"
        }
    }
    b += "&psort=" + SS.psort;
    b = filtUrl(b, "ev") + "&ev=" + getQueryString("ev", b) + e;
    b = filtUrl(b, "ms") + "&ms=Y";
    b = filtUrl(b, "vt") + "&vt=" + window.view_type;
    return b
};
MS.submit_click = function (a) {
    if ($(a).hasClass("disabled")) {
        return false
    } else {
        searchlog(1, 0, 0, 25);
        window.location.href = window.location.pathname + "?" + MS.submit_url();
        return false
    }
};
MS.reset_click = function () {
    $("span.s-brands").find("div").remove();
    $("#select").find("div").removeClass("selected");
    $("#select-brand").removeClass("brand-selected-fold brand-selected-unfold");
    $("dd.select-color").find("a").removeClass("curr");
    $("#submit-reset").find("input.btn-determine").eq(0).addClass("disabled");
    MS.selected_dl = []
};
(function (a) {
    a.fn.imgScroll = function (b, e) {
        var d = {evtType: "click", visible: 1, direction: "x", next: "#next", prev: "#prev", disableClass: "disabled", disableClassPerfix: false, speed: 300, step: 1, showControl: false, width: null, height: null, navItems: false, navItmesWrapClass: "scroll-nav-wrap", navItemActivedClass: "current"};
        var c = a.extend(d, b);
        return this.each(function () {
            var t = a(this), w = t.find("ul").eq(0), f = w.find("li"), E = f.length, p = null, l = null, k = typeof c.next == "string" ? a(c.next) : c.next, h = typeof c.prev == "string" ? a(c.prev) : c.prev, z = 0, q = c.step, j = c.visible, H = Math.ceil((E - j) / q) + 1, y = c.direction, x = c.evtType, o = c.disableClass, F = c.disableClassPerfix ? "prev-" + o : o, G = c.disableClassPerfix ? "next-" + o : o, s = c.navItems, B = c.navItmesWrapClass, v = c.navItemActivedClass, u = false, r = true, D = (E - j) % q == 0;

            function C(I) {
                if (E >= q + j) {
                    h.addClass(F);
                    k.removeClass(G)
                } else {
                    k.addClass(G)
                }
                if (f.eq(0).css("float") !== "left") {
                    f.css("float", "left")
                }
                p = c.width || f.eq(0).outerWidth();
                l = c.height || f.eq(0).outerHeight();
                t.css({position: t.css("position") == "static" ? "relative" : t.css("position"), width: I == "x" ? p * j : p, height: I == "x" ? l : l * j, overflow: "hidden"});
                w.css({position: "absolute", width: I == "x" ? p * E : p, height: I == "x" ? l : l * E, top: 0, left: 0})
            }

            function n(I, J) {
                if (w.is(":animated")) {
                    return false
                }
                if (r && J || u && !J) {
                    return false
                } else {
                    I = J ? --z : ++z
                }
                w.animate(y == "x" ? {left: I >= (H - 1) ? -(E - j) * p : -I * q * p} : {top: I >= (H - 1) ? -(E - j) * l : -I * q * l}, b.speed, function () {
                    if (E - I * q <= j) {
                        k.addClass(G);
                        u = true
                    } else {
                        k.removeClass(G);
                        u = false
                    }
                    if (I <= 0) {
                        h.addClass(F);
                        r = true
                    } else {
                        h.removeClass(F);
                        r = false
                    }
                    if (s) {
                        A(I)
                    }
                    if (typeof e == "function") {
                        e.apply(t, [I, H, f.slice(I * q, I * q + j), f.slice(I * q + j - q, I * q + j)])
                    }
                })
            }

            function g(K, I) {
                var K = a('<div class="' + K + '"></div>');
                for (var J = 0; J < H; J++) {
                    K.append("<em " + (J == 0 ? " class=" + I : "") + ' title="' + (J + 1) + '">' + (J + 1) + "</em>")
                }
                t.after(K)
            }

            function A(I) {
                if (a("." + B).length > 0) {
                    a("." + B).find("em").removeClass(v).eq(I).addClass(v)
                }
            }

            function m() {
                h.unbind(x).bind(x, function () {
                    n(z, true)
                });
                k.unbind(x).bind(x, function () {
                    n(z, false)
                })
            }

            if (E > j && j >= q) {
                C(y);
                m();
                if (s) {
                    g(B, v)
                }
            } else {
                if (c.showControl) {
                    k.add(h).show()
                } else {
                    k.add(h).hide()
                }
                h.addClass(F);
                k.addClass(G)
            }
        })
    }
})(jQuery);
var imgSize = $("#plist").hasClass("plist-n2") ? "n2" : "n7";
function image_scroll(a) {
    $(a).each(function () {
        var c = $(this).find(".p-scroll-wrap"), f = $(this).find(".p-scroll-prev"), e = $(this).find(".p-scroll-next"), b = $(this).find("li").length;
        if (b > 5) {
            f.css("display", "inline");
            e.css("display", "inline");
            c.imgScroll({visible: 5, showControl: false, next: e, prev: f})
        }
        var d = c.find("img");
        d.each(function () {
            $(this).mouseover(function () {
                var l = $(this).attr("src"), m = $(this).attr("data-skuid");
                c.find("a").removeClass("curr");
                $(this).parent("a").addClass("curr");
                var k = $(this).parents("li").find(".p-img img").eq(0), j = $(this).parents("li").find(".p-img a").eq(0), h = $(this).parents("li").find(".p-name a").eq(0), g = $(this).parents("li").find(".product-follow a").eq(0);
                k.attr("src", l.replace("/n5/", "/" + imgSize + "/"));
                j.attr("href", j.attr("href").replace(/\/\d{6,}/, "/" + m));
                h.attr("href", h.attr("href").replace(/\/\d{6,}/, "/" + m));
                if (g.length > 0) {
                    g.attr("id", g.attr("id").replace(/coll\d{6,}/, "coll" + m))
                }
            })
        })
    });
    $("#plist.plist-n7 .list-h>li").hover(function () {
        $(this).addClass("hover").find(".product-follow,.shop-name").show();
        $(this).find(".item-wrap").addClass("item-hover")
    }, function () {
        $(this).removeClass("hover").find(".item-wrap").removeClass("item-hover");
        $(this).find(".product-follow,.shop-name").hide()
    })
}
image_scroll("#plist .p-scroll");
var surveyShowIndex = 0;
function surveyShow() {
    var a = $.delayLoad(false, "survey/css/surveyShowWindow.css"), b = $.delayLoad(true, "survey/js/surveyShowWindow.js?1.js", "gbk");
    if (surveyShowIndex === 0 && a && b) {
        surveyWindowShow()
    } else {
        if (surveyShowIndex == 1) {
            surveyWindowHide()
        }
    }
}
function IsCheckPc() {
    var a = confirm("如您已安装京东LeBook客户端，请点击“确定”自动启动客户端\n如您尚未安装京东LeBook客户端，请点击“取消”将引导您免费安装客户端");
    if (a == true) {
        window.location = "LEBK:///Bought"
    } else {
        if (confirm('如果您没有安装LeBook客户端，请点击"确定"按钮到京东网站下载\n如果您不需要安装，请点击"取消"按钮')) {
            window.open("http://e.jd.com/ebook/lebook_pc.aspx")
        }
    }
    return
}
function CanSent(a) {
    if (a.code == 1) {
        IsCheckPc()
    } else {
        alert(a.message)
    }
}
function eBookSentMsg(c, a) {
    var b = "http://gw.e.jd.com/downrecord/downrecord_insert.action?ebookId=" + c + "&key=" + a + "&callback=CanSent";
    $.getJSONP(b, CanSent)
}
$.extend(jdModelCallCenter, {doDownLoad: function (b, a) {
    $.login({modal: true, complete: function (c) {
        if (c != null && c.IsAuthenticated != null && c.IsAuthenticated) {
            if (b && a) {
                eBookSentMsg(b, a)
            } else {
                if (b && !a) {
                    var d = CookieUtil.getCookie("pin");
                    if (d) {
                        ditigalMusicSendMsg(d, b)
                    }
                }
            }
        }
    }})
}});
function ebook_download(b, a) {
    $.extend(jdModelCallCenter.settings, {id: b, key: a, fn: function () {
        jdModelCallCenter.doDownLoad(this.id, this.key)
    }});
    jdModelCallCenter.settings.fn()
}
$.delayLoad(true, "script/digital_music_download.js", "gbk", "", 'li[e-tag!="1"] a.free-download');
function ware_stock() {
    var c = $("#plist").find("a.notice-store"), a = "", b = "";
    if (c.length == 0) {
        return false
    }
    c.each(function () {
        b = this.getAttribute("ware-type");
        if (b == "book" || b == "mvd") {
            a += this.getAttribute("data-sku") + ","
        }
    });
    if (a) {
        $.getJSON("WareStock.php?wids=" + a, function (e) {
            if (typeof e == "object") {
                for (var d in e) {
                    if (e[d] == 0) {
                        $("#store" + d).before('<a href="javascript:;" class="btn-buy disabled">加入购物车</a>').remove()
                    }
                }
            }
        })
    }
}
function digital_price() {
    var a = "";
    $("strong[class^='J_']").each(function () {
        a += this.className + ","
    });
    if (a) {
        var b = CookieUtil.getCookie("ipLoc-djd");
        b = b ? "&area=" + b.replace(/-/g, "_") : "";
        $.getJSON("http://p.3.cn/prices/mgets?skuids=" + a + b + "&type=1&callback=?", function (e) {
            if (typeof e == "object") {
                for (var d = 0, c = e.length, f = ""; d < c; d++) {
                    if (e[d].p < 0) {
                        f = "暂无报价"
                    } else {
                        if (e[d].p == 0) {
                            f = "免费"
                        } else {
                            f = "￥" + e[d].p
                        }
                    }
                    $("strong." + e[d].id).html(f)
                }
            }
        })
    }
}
function box_search() {
    var a = $("#box-search");
    if (a.length) {
        $.get("hub.php?key=" + encodeURIComponent(QUERY_KEYWORD), function (b) {
            if (b) {
                $("#virtualWareIFrame").hide();
                a.after(b).remove();
                $("#complex-onebox").each(function () {
                    var c = $(this);
                    c.Jtab({compatible: true}, function () {
                        c.find("div.extra").find("a").hide().eq(arguments[2]).show()
                    })
                })
            }
        })
    }
}
function ware_type_fit_screen() {
    if (screen.width <= 1200) {
        var a = $("#ware_type");
        a.attr("class", "type").Jdropdown();
        var b = a.find('a[class="selected"]').html().substr(7);
        if (b != "全部") {
            a.find("div").html(b + "<i>：</i><b></b>")
        }
    }
}
function prompt_flag_cb(e) {
    if (!e || typeof e !== "object") {
        return
    }
    function b(o, c) {
        if (!o) {
            return
        }
        var j = ["", "", "", ""];
        for (var n = 0, h = o.length; n < h; n++) {
            switch (o[n]) {
                case 1:
                    j[2] += '<a class="pt1" title="本商品正在降价销售中">直降</a>';
                    break;
                case 5:
                    j[1] += '<a class="pt2" title="购买本商品送赠品">赠品</a>';
                    break;
                case 3:
                    j[0] += '<a class="pt3" title="购买本商品返优惠券">返券</a>';
                    break;
                case 4:
                    j[3] += '<a class="pt4" title="购买本商品送京豆">送京豆</a>';
                    break;
                default:
                    break
            }
        }
        if (c) {
            var m = [], k = 0;
            for (var n = 0; n < 4; n++) {
                if (j[n] && ++k < 3) {
                    m.push(j[n])
                }
            }
            return m.join("") + '<a class="pt5">环球BUY</a>'
        }
        return j.join("")
    }

    for (var d = 0, a = e.length; d < a; d++) {
        var g = e[d], f = $("#p" + g.pid);
        f.html(b(g.pf, f.find(".pt5").length))
    }
}
function prompt_adwords_cb(d) {
    if (!d) {
        return
    }
    for (var c = 0, a = d.length; c < a; c++) {
        var f = d[c].id || "", e = $("#plist li[sku='" + f.substr(3) + "']"), b = strip_tags(d[c].ad);
        if (e.length && b !== "") {
            e.find(".p-img").find("img").attr("title", b);
            e.find(".p-name").find("a").attr("title", b);
            e.find(".adwords").html(b)
        }
    }
}
function prompt_info() {
    var a = "";
    $("span[id^=p]").each(function () {
        a += this.id
    });
    if (!a) {
        return
    }
    $.getJSONP("http://ad.3.cn/flags/mgets?callback=prompt_flag_cb&skuids=" + a.replace(/p/g, ",J_").substr(1));
    $.getJSONP("http://ad.3.cn/ads/mgets?skuids=" + a.replace(/p/g, ",AD_").substr(1) + "&callback=prompt_adwords_cb")
}
function get_stock_cb(k) {
    if (!k || typeof k != "object") {
        return
    }
    var a = $("a[stock]"), h = readCookie("ipLoc-djd"), e = h[0] ? json_city[0][h[0]] : "";
    for (var f = 0, c = a.length; f < c; f++) {
        var n = a.eq(f), m = n.attr("stock"), b = k[m], g = n.attr("tpl"), j = null, d = "btn btn-nostore notice-store";
        if (!b) {
            continue
        }
        if (g == 1) {
            j = n.parent().siblings(".stocklist")
        } else {
            if (g == 2) {
                d = "btn btn-nostore notice-store";
                j = n.parent().siblings("ul").find(".summary-stock .dd")
            } else {
                if (g == 3) {
                    d = "btn-text btn-nostore notice-store"
                }
            }
        }
        switch (b.stockvalue & 65535) {
            case 0:
            case 18:
            case 34:
                if (g == 3) {
                    n.attr({href: "javascript:;", "class": d, "data-type": 2, "data-sku": m}).removeAttr("target").html("<b></b>到货通知")
                } else {
                    n.attr({href: "javascript:;", "class": d, "data-type": 2, "data-sku": m, id: "store" + m}).removeAttr("target").html("<b></b>到货通知")
                }
                j && j.html('<span class="st34">' + e + "无货</span>");
                break;
            case 36:
                j && j.html('<span class="st36">' + e + "预定</span>");
                break;
            case 40:
                j && j.html('<span class="st40">' + e + "有货 <b>下单后2-6天发货</b></span>");
                break;
            default:
                break
        }
    }
    ware_stock()
}
function get_stock() {
    if (!window._new_stock) {
        return
    }
    var d = $("a[stock]"), a = "", e = readCookie("ipLoc-djd");
    if (!e) {
        return
    }
    e = e.split("-").slice(0, 3).join("_");
    for (var c = 0, b = d.length; c < b; c++) {
        a += d[c].getAttribute("stock") + ","
    }
    if (!a) {
        return
    }
    $.getJSONP("http://search.jd.com/stock?skus=" + encodeURIComponent(a) + "&district=" + e + "&callback=get_stock_cb")
}
digital_price();
get_stock();
prompt_info();
$(document).ready(function () {
    $("#key").val(QUERY_KEYWORD);
    box_search();
    ware_type_fit_screen();
    DigitallMusicSummmary.init();
    NotifyPop.init($(".notice-store"));
    if (!window._new_stock) {
        ware_stock()
    }
    GS.init();
    reSearch();
    pageConfig.isInitContrast = false;
    pageConfig.FN_InitContrast();
    var a = new pageConfig.FN_InitSidebar();
    a.setTop();
    a.scroll()
});
function reSearch() {
    var d = $("#text-stock-search"), c = $("#btn-stock-search"), a = "在结果中搜索";

    function b() {
        if (d.val().trim() != "" && d.val().trim() != a) {
            searchlog(1, 0, 0, 27);
            window.location.href = c.attr("url") + encodeURIComponent(d.val().trim())
        }
    }

    d.focus(function () {
        if (d.val().trim() == a) {
            d.val("")
        }
    }).blur(function () {
        if (d.val().trim() == "") {
            d.val(a)
        }
    }).keydown(function (f) {
        if (f.keyCode == 13) {
            b()
        }
    });
    c.click(function () {
        b()
    })
}
$(document).keyup(function (d) {
    var f = document.activeElement.tagName.toLowerCase();
    if (f == "input" || f == "textarea") {
        return
    }
    var a = 0, d = d || event, c = $("#filter"), b = 0;
    a = d.keyCode || d.which || d.charCode;
    if (c.length) {
        b = c.offset().top
    }
    switch (a) {
        case 37:
            window.scrollTo(0, b);
            $("#top_pagi a.prev").trigger("click");
            break;
        case 39:
            window.scrollTo(0, b);
            $("#top_pagi a.next").trigger("click");
            break;
        default:
            break
    }
});
(function () {
    if (typeof(SEARCH.isCorrectHash) == "function") {
        $(window).hashchange(function () {
            var b = SEARCH.getRealHash() || window.location.search.substr(1);
            if (SEARCH.isCorrectHash(b)) {
                var a = getQueryString("click", b);
                CS.click_index = CS.click_index || getQueryString("click");
                if (a != CS.click_index) {
                    CS.query(a, "s.php?" + b)
                } else {
                    SS.load("s.php?" + b)
                }
            }
        })
    }
})();
var iplocation = (function (g) {
    var c = g("#store-selector");
    if (c.length == 0) {
        return function () {
        }
    }
    var d = {"0": {"1": "北京", "2": "上海", "3": "天津", "4": "重庆", "5": "河北", "6": "山西", "7": "河南", "8": "辽宁", "9": "吉林", "10": "黑龙江", "11": "内蒙古", "12": "江苏", "13": "山东", "14": "安徽", "15": "浙江", "16": "福建", "17": "湖北", "18": "湖南", "19": "广东", "20": "广西", "21": "江西", "22": "四川", "23": "海南", "24": "贵州", "25": "云南", "26": "西藏", "27": "陕西", "28": "甘肃", "29": "青海", "30": "宁夏", "31": "新疆", "32": "台湾", "42": "香港", "43": "澳门", "84": "钓鱼岛"}, "1": {"72": "朝阳区", "2800": "海淀区", "2801": "西城区", "2802": "东城区", "2803": "崇文区", "2804": "宣武区", "2805": "丰台区", "2806": "石景山区", "2807": "门头沟", "2808": "房山区", "2809": "通州区", "2810": "大兴区", "2812": "顺义区", "2814": "怀柔区", "2816": "密云区", "2901": "昌平区", "2953": "平谷区", "3065": "延庆县"}, "2": {"2811": "卢湾区", "2813": "徐汇区", "2815": "长宁区", "2817": "静安区", "2820": "闸北区", "2822": "虹口区", "2823": "杨浦区", "2824": "宝山区", "2825": "闵行区", "2826": "嘉定区", "2830": "浦东新区", "2833": "青浦区", "2834": "松江区", "2835": "金山区", "2836": "南汇区", "2837": "奉贤区", "2841": "普陀区", "2919": "崇明县", "78": "黄浦区"}, "3": {"51035": "东丽区", "51036": "和平区", "51037": "河北区", "51038": "河东区", "51039": "河西区", "51040": "红桥区", "51041": "蓟县", "51042": "静海县", "51043": "南开区", "51044": "塘沽区", "51045": "西青区", "51046": "武清区", "51047": "津南区", "51048": "汉沽区", "51049": "大港区", "51050": "北辰区", "51051": "宝坻区", "51052": "宁河县"}, "4": {"113": "万州区", "114": "涪陵区", "115": "梁平县", "119": "南川区", "123": "潼南县", "126": "大足区", "128": "黔江区", "129": "武隆县", "130": "丰都县", "131": "奉节县", "132": "开县", "133": "云阳县", "134": "忠县", "135": "巫溪县", "136": "巫山县", "137": "石柱县", "138": "彭水县", "139": "垫江县", "140": "酉阳县", "141": "秀山县", "48131": "璧山县", "48132": "荣昌县", "48133": "铜梁县", "48201": "合川区", "48202": "巴南区", "48203": "北碚区", "48204": "江津区", "48205": "渝北区", "48206": "长寿区", "48207": "永川区", "50950": "江北区", "50951": "南岸区", "50952": "九龙坡区", "50953": "沙坪坝区", "50954": "大渡口区", "50995": "綦江区", "51026": "渝中区", "51027": "高新区", "51028": "北部新区", "4164": "城口县", "3076": "高新区"}, "5": {"142": "石家庄市", "148": "邯郸市", "164": "邢台市", "199": "保定市", "224": "张家口市", "239": "承德市", "248": "秦皇岛市", "258": "唐山市", "264": "沧州市", "274": "廊坊市", "275": "衡水市"}, "6": {"303": "太原市", "309": "大同市", "318": "阳泉市", "325": "晋城市", "330": "朔州市", "336": "晋中市", "350": "忻州市", "368": "吕梁市", "379": "临汾市", "398": "运城市", "3074": "长治市"}, "7": {"412": "郑州市", "420": "开封市", "427": "洛阳市", "438": "平顶山市", "446": "焦作市", "454": "鹤壁市", "458": "新乡市", "468": "安阳市", "475": "濮阳市", "482": "许昌市", "489": "漯河市", "495": "三门峡市", "502": "南阳市", "517": "商丘市", "527": "周口市", "538": "驻马店市", "549": "信阳市", "2780": "济源市"}, "8": {"560": "沈阳市", "573": "大连市", "579": "鞍山市", "584": "抚顺市", "589": "本溪市", "593": "丹东市", "598": "锦州市", "604": "葫芦岛市", "609": "营口市", "613": "盘锦市", "617": "阜新市", "621": "辽阳市", "632": "朝阳市", "6858": "铁岭市"}, "9": {"639": "长春市", "644": "吉林市", "651": "四平市", "2992": "辽源市", "657": "通化市", "664": "白山市", "674": "松原市", "681": "白城市", "687": "延边州"}, "10": {"727": "鹤岗市", "731": "双鸭山市", "737": "鸡西市", "742": "大庆市", "753": "伊春市", "757": "牡丹江市", "765": "佳木斯市", "773": "七台河市", "776": "黑河市", "782": "绥化市", "793": "大兴安岭地区", "698": "哈尔滨市", "712": "齐齐哈尔市"}, "11": {"799": "呼和浩特市", "805": "包头市", "810": "乌海市", "812": "赤峰市", "823": "乌兰察布市", "835": "锡林郭勒盟", "848": "呼伦贝尔市", "870": "鄂尔多斯市", "880": "巴彦淖尔市", "891": "阿拉善盟", "895": "兴安盟", "902": "通辽市"}, "12": {"904": "南京市", "911": "徐州市", "919": "连云港市", "925": "淮安市", "933": "宿迁市", "939": "盐城市", "951": "扬州市", "959": "泰州市", "965": "南通市", "972": "镇江市", "978": "常州市", "984": "无锡市", "988": "苏州市"}, "13": {"2900": "济宁市", "1000": "济南市", "1007": "青岛市", "1016": "淄博市", "1022": "枣庄市", "1025": "东营市", "1032": "潍坊市", "1042": "烟台市", "1053": "威海市", "1058": "莱芜市", "1060": "德州市", "1072": "临沂市", "1081": "聊城市", "1090": "滨州市", "1099": "菏泽市", "1108": "日照市", "1112": "泰安市"}, "14": {"1151": "黄山市", "1159": "滁州市", "1167": "阜阳市", "1174": "亳州市", "1180": "宿州市", "1201": "池州市", "1206": "六安市", "2971": "宣城市", "1114": "铜陵市", "1116": "合肥市", "1121": "淮南市", "1124": "淮北市", "1127": "芜湖市", "1132": "蚌埠市", "1137": "马鞍山市", "1140": "安庆市"}, "15": {"1158": "宁波市", "1273": "衢州市", "1280": "丽水市", "1290": "台州市", "1298": "舟山市", "1213": "杭州市", "1233": "温州市", "1243": "嘉兴市", "1250": "湖州市", "1255": "绍兴市", "1262": "金华市"}, "16": {"1303": "福州市", "1315": "厦门市", "1317": "三明市", "1329": "莆田市", "1332": "泉州市", "1341": "漳州市", "1352": "南平市", "1362": "龙岩市", "1370": "宁德市"}, "17": {"1432": "孝感市", "1441": "黄冈市", "1458": "咸宁市", "1466": "恩施州", "1475": "鄂州市", "1477": "荆门市", "1479": "随州市", "3154": "神农架林区", "1381": "武汉市", "1387": "黄石市", "1396": "襄阳市", "1405": "十堰市", "1413": "荆州市", "1421": "宜昌市", "2922": "潜江市", "2980": "天门市", "2983": "仙桃市"}, "18": {"4250": "耒阳市", "1482": "长沙市", "1488": "株洲市", "1495": "湘潭市", "1499": "韶山市", "1501": "衡阳市", "1511": "邵阳市", "1522": "岳阳市", "1530": "常德市", "1540": "张家界市", "1544": "郴州市", "1555": "益阳市", "1560": "永州市", "1574": "怀化市", "1586": "娄底市", "1592": "湘西州"}, "19": {"1601": "广州市", "1607": "深圳市", "1609": "珠海市", "1611": "汕头市", "1617": "韶关市", "1627": "河源市", "1634": "梅州市", "1709": "揭阳市", "1643": "惠州市", "1650": "汕尾市", "1655": "东莞市", "1657": "中山市", "1659": "江门市", "1666": "佛山市", "1672": "阳江市", "1677": "湛江市", "1684": "茂名市", "1690": "肇庆市", "1698": "云浮市", "1704": "清远市", "1705": "潮州市"}, "20": {"3168": "崇左市", "1715": "南宁市", "1720": "柳州市", "1726": "桂林市", "1740": "梧州市", "1746": "北海市", "1749": "防城港市", "1753": "钦州市", "1757": "贵港市", "1761": "玉林市", "1792": "贺州市", "1806": "百色市", "1818": "河池市", "3044": "来宾市"}, "21": {"1827": "南昌市", "1832": "景德镇市", "1836": "萍乡市", "1842": "新余市", "1845": "九江市", "1857": "鹰潭市", "1861": "上饶市", "1874": "宜春市", "1885": "抚州市", "1898": "吉安市", "1911": "赣州市"}, "22": {"2103": "凉山州", "1930": "成都市", "1946": "自贡市", "1950": "攀枝花市", "1954": "泸州市", "1960": "绵阳市", "1962": "德阳市", "1977": "广元市", "1983": "遂宁市", "1988": "内江市", "1993": "乐山市", "2005": "宜宾市", "2016": "广安市", "2022": "南充市", "2033": "达州市", "2042": "巴中市", "2047": "雅安市", "2058": "眉山市", "2065": "资阳市", "2070": "阿坝州", "2084": "甘孜州"}, "23": {"3690": "三亚市", "3698": "文昌市", "3699": "五指山市", "3701": "临高县", "3702": "澄迈县", "3703": "定安县", "3704": "屯昌县", "3705": "昌江县", "3706": "白沙县", "3707": "琼中县", "3708": "陵水县", "3709": "保亭县", "3710": "乐东县", "3711": "三沙市", "2121": "海口市", "3115": "琼海市", "3137": "万宁市", "3173": "东方市", "3034": "儋州市"}, "24": {"2144": "贵阳市", "2150": "六盘水市", "2155": "遵义市", "2169": "铜仁市", "2180": "毕节市", "2189": "安顺市", "2196": "黔西南州", "2205": "黔东南州", "2222": "黔南州"}, "25": {"4108": "迪庆州", "2235": "昆明市", "2247": "曲靖市", "2258": "玉溪市", "2270": "昭通市", "2281": "普洱市", "2291": "临沧市", "2298": "保山市", "2304": "丽江市", "2309": "文山州", "2318": "红河州", "2332": "西双版纳州", "2336": "楚雄州", "2347": "大理州", "2360": "德宏州", "2366": "怒江州"}, "26": {"3970": "阿里地区", "3971": "林芝地区", "2951": "拉萨市", "3107": "那曲地区", "3129": "山南地区", "3138": "昌都地区", "3144": "日喀则地区"}, "27": {"2428": "延安市", "2442": "汉中市", "2454": "榆林市", "2468": "商洛市", "2476": "安康市", "2376": "西安市", "2386": "铜川市", "2390": "宝鸡市", "2402": "咸阳市", "2416": "渭南市"}, "28": {"2525": "庆阳市", "2534": "陇南市", "2544": "武威市", "2549": "张掖市", "2556": "酒泉市", "2564": "甘南州", "2573": "临夏州", "3080": "定西市", "2487": "兰州市", "2492": "金昌市", "2495": "白银市", "2501": "天水市", "2509": "嘉峪关市", "2518": "平凉市"}, "29": {"2580": "西宁市", "2585": "海东地区", "2592": "海北州", "2597": "黄南州", "2603": "海南州", "2605": "果洛州", "2612": "玉树州", "2620": "海西州"}, "30": {"2628": "银川市", "2632": "石嘴山市", "2637": "吴忠市", "2644": "固原市", "3071": "中卫市"}, "31": {"4110": "五家渠市", "4163": "博尔塔拉蒙古自治州阿拉山口口岸", "15945": "阿拉尔市", "15946": "图木舒克市", "2652": "乌鲁木齐市", "2654": "克拉玛依市", "2656": "石河子市", "2658": "吐鲁番地区", "2662": "哈密地区", "2666": "和田地区", "2675": "阿克苏地区", "2686": "喀什地区", "2699": "克孜勒苏州", "2704": "巴音郭楞州", "2714": "昌吉州", "2723": "博尔塔拉州", "2727": "伊犁州", "2736": "塔城地区", "2744": "阿勒泰地区"}, "32": {"2768": "台湾市"}, "42": {"2754": "香港特别行政区"}, "43": {"2770": "澳门市"}, "84": {"1310": "钓鱼岛"}}, o = '<div data-widget="tabs" class="m JD-stock" id="JD-stock"><div class="mt">    <ul class="tab">        <li data-index="0" data-widget="tab-item" class="curr"><a href="javascript:;" class="hover"><em>请选择</em><i></i></a></li>        <li data-index="1" data-widget="tab-item" style="display:none;"><a href="javascript:;" class=""><em>请选择</em><i></i></a></li>        <li data-index="2" data-widget="tab-item" style="display:none;"><a href="javascript:;" class=""><em>请选择</em><i></i></a></li>        <li data-index="3" data-widget="tab-item" style="display:none;"><a href="javascript:;" class=""><em>请选择</em><i></i></a></li>    </ul>    <div class="stock-line"></div></div><div class="mc" data-area="0" data-widget="tab-content">    <ul class="area-list">       <li><a href="javascript:;" data-value="1">北京</a></li><li><a href="javascript:;" data-value="2">上海</a></li><li><a href="javascript:;" data-value="3">天津</a></li><li><a href="javascript:;" data-value="4">重庆</a></li><li><a href="javascript:;" data-value="5">河北</a></li><li><a href="javascript:;" data-value="6">山西</a></li><li><a href="javascript:;" data-value="7">河南</a></li><li><a href="javascript:;" data-value="8">辽宁</a></li><li><a href="javascript:;" data-value="9">吉林</a></li><li><a href="javascript:;" data-value="10">黑龙江</a></li><li><a href="javascript:;" data-value="11">内蒙古</a></li><li><a href="javascript:;" data-value="12">江苏</a></li><li><a href="javascript:;" data-value="13">山东</a></li><li><a href="javascript:;" data-value="14">安徽</a></li><li><a href="javascript:;" data-value="15">浙江</a></li><li><a href="javascript:;" data-value="16">福建</a></li><li><a href="javascript:;" data-value="17">湖北</a></li><li><a href="javascript:;" data-value="18">湖南</a></li><li><a href="javascript:;" data-value="19">广东</a></li><li><a href="javascript:;" data-value="20">广西</a></li><li><a href="javascript:;" data-value="21">江西</a></li><li><a href="javascript:;" data-value="22">四川</a></li><li><a href="javascript:;" data-value="23">海南</a></li><li><a href="javascript:;" data-value="24">贵州</a></li><li><a href="javascript:;" data-value="25">云南</a></li><li><a href="javascript:;" data-value="26">西藏</a></li><li><a href="javascript:;" data-value="27">陕西</a></li><li><a href="javascript:;" data-value="28">甘肃</a></li><li><a href="javascript:;" data-value="29">青海</a></li><li><a href="javascript:;" data-value="30">宁夏</a></li><li><a href="javascript:;" data-value="31">新疆</a></li><li><a href="javascript:;" data-value="32">台湾</a></li><li><a href="javascript:;" data-value="42">香港</a></li><li><a href="javascript:;" data-value="43">澳门</a></li><li><a href="javascript:;" data-value="84">钓鱼岛</a></li>    </ul></div><div class="mc" data-area="1" data-widget="tab-content"></div><div class="mc" data-area="2" data-widget="tab-content"></div><div class="mc" data-area="3" data-widget="tab-content"></div></div><span class="clr"></span>';
    window.json_city = d;
    c.children(".content").html(o);
    var j = c.find("li[data-widget]"), f = c.find('div[data-widget="tab-content"]'), k = 3, e = "", b = [], h = true;

    function l(r) {
        var q = b[r], p = b[r - 1] || 0;
        return d[p][q] || ""
    }

    function a(p) {
        g(f[p - 1]).hide();
        g(f[p]).html('<div class="iloading">正在加载中，请稍候...</div>').show()
    }

    function n(s, p, q, r) {
        if (!p) {
            return
        }
        b[s - 1] = p;
        if (d[p]) {
            m(d[p], s, q, r)
        } else {
            if (s < k) {
                a(s);
                window.getAreaList_callback = function (w) {
                    if (!w) {
                        return
                    }
                    var t = {};
                    for (var v = 0, u = w.length; v < u; v++) {
                        t[String(w[v]["id"])] = w[v]["name"]
                    }
                    d[String(p)] = t;
                    m(t, s, q, r)
                };
                g.getJSONP("http://d.360buy.com/area/get?fid=" + p + "&callback=getAreaList_callback")
            } else {
                m([], s, q, r)
            }
        }
    }

    function m(z, p, B, D) {
        var v = l(p - 1);
        if (p > 0) {
            g(j[p - 1]).find("a").attr("title", v);
            g(j[p - 1]).find("em").html(v.substr(0, 6))
        }
        if (p >= k) {
            if (D) {
                var A = "";
                for (var w = 0; w < 4; w++) {
                    if (b[w]) {
                        A += b[w] + "-"
                    } else {
                        A += "0-"
                    }
                }
                setCookie("ipLoc-djd", A.substring(0, A.length - 1), 30);
                setCookie("ipLocation", d[0][b[0]]);
                c.removeClass("hover");
                var u = SS.base_url + "&psort=" + SS.psort;
                window.location.href = window.location.pathname + "?" + (b[0] ? filtUrl(u, "area") + "&area=" + b[0] : u)
            }
            var y = "";
            for (var w = 0, t = 3, r = 0; w < t; w++) {
                if (d[r] && b[w] && d[r][b[w]]) {
                    y += d[r][b[w]]
                }
                r = b[w]
            }
            y = y.substr(0, 13) + "<b/>";
            c.children(".text").html(y);
            return
        } else {
            g(f[p - 1]).hide();
            g(j[p - 1]).removeClass("curr")
        }
        var x = '<ul class="area-list">', s = "", C = "";
        for (var q in z) {
            z[q] = z[q].replace(" ", "");
            if (z[q].length > 12) {
                C += "<li class='longer-area'><a href='javascript:;' data-value='" + q + "'>" + z[q] + "</a></li>"
            } else {
                if (z[q].length > 5) {
                    s += "<li class='long-area'><a href='javascript:;' data-value='" + q + "'>" + z[q] + "</a></li>"
                } else {
                    x += "<li><a href='javascript:;' data-value='" + q + "'>" + z[q] + "</a></li>"
                }
            }
        }
        x += s + C + "</ul>";
        g(f[p]).html(x).show();
        g(j[p]).addClass("curr").show().find("em").html("请选择");
        if (B) {
            B()
        }
    }

    return function () {
        c = g("#store-selector");
        c.children(".content").html(o);
        j = c.find("li[data-widget]");
        f = c.find('div[data-widget="tab-content"]');
        b = [];
        h = true;
        f.click(function (s) {
            h = false;
            var r = g(s.srcElement || s.target), q = parseInt(r.attr("data-value"), 10);
            if (!q) {
                return
            }
            n(parseInt(r.parent().parent().parent().attr("data-area")) + 1, q, "", 1);
            return false
        });
        j.click(function (s) {
            h = false;
            var r = g(this), t = parseInt(r.attr("data-index"));
            if (t >= k - 1) {
                return
            }
            for (var q = t + 1; q < k; q++) {
                g(j[q]).hide();
                g(f[q]).hide()
            }
            g(j[t]).addClass("curr");
            g(f[t]).show();
            return false
        });
        var p = (readCookie("ipLoc-djd") || e).split("-");
        if (p.length <= k) {
            p = e.split("-")
        }
        n(1, p[0], (function (q) {
            var r = 1, s = function () {
                r++;
                n(r, q[r - 1], s)
            };
            return s
        })(p));
        c.mouseover(function () {
            c.addClass("hover")
        }).mouseout(function () {
            if (h) {
                c.removeClass("hover")
            }
        })
    }
})($);
iplocation();