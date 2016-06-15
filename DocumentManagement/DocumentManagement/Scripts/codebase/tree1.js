if (typeof (window.dhx4) == "undefined") {
    window.dhx4 = {
        version: "4.6",
        skin: null,
        skinDetect: function (a) {
            return {
                10: "dhx_skyblue",
                20: "dhx_web",
                30: "dhx_terrace"
            }[this.readFromCss(a + "_skin_detect")] || null
        },
        readFromCss: function (e, g) {
            var c = document.createElement("DIV");
            c.className = e;
            if (document.body.firstChild != null) {
                document.body.insertBefore(c, document.body.firstChild)
            } else {
                document.body.appendChild(c)
            }
            var a = c[g || "offsetWidth"];
            c.parentNode.removeChild(c);
            c = null;
            return a
        },
        lastId: 1,
        newId: function () {
            return this.lastId++
        },
        zim: {
            data: {},
            step: 5,
            first: function () {
                return 100
            },
            last: function () {
                var e = this.first();
                for (var c in this.data) {
                    e = Math.max(e, this.data[c])
                }
                return e
            },
            reserve: function (a) {
                this.data[a] = this.last() + this.step;
                return this.data[a]
            },
            clear: function (a) {
                if (this.data[a] != null) {
                    this.data[a] = null;
                    delete this.data[a]
                }
            }
        },
        s2b: function (a) {
            if (typeof (a) == "string") {
                a = a.toLowerCase()
            }
            return (a == true || a == 1 || a == "true" || a == "1" || a == "yes" || a == "y" || a == "on")
        },
        s2j: function (s) {
            var obj = null;
            dhx4.temp = null;
            try {
                eval("dhx4.temp=" + s)
            } catch (e) {
                dhx4.temp = null
            }
            obj = dhx4.temp;
            dhx4.temp = null;
            return obj
        },
        absLeft: function (a) {
            if (typeof (a) == "string") {
                a = document.getElementById(a)
            }
            return this.getOffset(a).left
        },
        absTop: function (a) {
            if (typeof (a) == "string") {
                a = document.getElementById(a)
            }
            return this.getOffset(a).top
        },
        _aOfs: function (a) {
            var e = 0,
                c = 0;
            while (a) {
                e = e + parseInt(a.offsetTop);
                c = c + parseInt(a.offsetLeft);
                a = a.offsetParent
            }
            return {
                top: e,
                left: c
            }
        },
        _aOfsRect: function (g) {
            var l = g.getBoundingClientRect();
            var m = document.body;
            var c = document.documentElement;
            var a = window.pageYOffset || c.scrollTop || m.scrollTop;
            var h = window.pageXOffset || c.scrollLeft || m.scrollLeft;
            var j = c.clientTop || m.clientTop || 0;
            var n = c.clientLeft || m.clientLeft || 0;
            var o = l.top + a - j;
            var e = l.left + h - n;
            return {
                top: Math.round(o),
                left: Math.round(e)
            }
        },
        getOffset: function (a) {
            if (a.getBoundingClientRect) {
                return this._aOfsRect(a)
            } else {
                return this._aOfs(a)
            }
        },
        _isObj: function (a) {
            return (a != null && typeof (a) == "object" && typeof (a.length) == "undefined")
        },
        _copyObj: function (g) {
            if (this._isObj(g)) {
                var e = {};
                for (var c in g) {
                    if (typeof (g[c]) == "object" && g[c] != null) {
                        e[c] = this._copyObj(g[c])
                    } else {
                        e[c] = g[c]
                    }
                }
            } else {
                var e = [];
                for (var c = 0; c < g.length; c++) {
                    if (typeof (g[c]) == "object" && g[c] != null) {
                        e[c] = this._copyObj(g[c])
                    } else {
                        e[c] = g[c]
                    }
                }
            }
            return e
        },
        screenDim: function () {
            var a = (navigator.userAgent.indexOf("MSIE") >= 0);
            var c = {};
            c.left = document.body.scrollLeft;
            c.right = c.left + (window.innerWidth || document.body.clientWidth);
            c.top = Math.max((a ? document.documentElement : document.getElementsByTagName("html")[0]).scrollTop, document.body.scrollTop);
            c.bottom = c.top + (a ? Math.max(document.documentElement.clientHeight || 0, document.documentElement.offsetHeight || 0) : window.innerHeight);
            return c
        },
        selectTextRange: function (h, l, c) {
            h = (typeof (h) == "string" ? document.getElementById(h) : h);
            var a = h.value.length;
            l = Math.max(Math.min(l, a), 0);
            c = Math.min(c, a);
            if (h.setSelectionRange) {
                try {
                    h.setSelectionRange(l, c)
                } catch (j) { }
            } else {
                if (h.createTextRange) {
                    var g = h.createTextRange();
                    g.moveStart("character", l);
                    g.moveEnd("character", c - a);
                    try {
                        g.select()
                    } catch (j) { }
                }
            }
        },
        transData: null,
        transDetect: function () {
            if (this.transData == null) {
                this.transData = {
                    transProp: false,
                    transEv: null
                };
                var e = {
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd",
                    OTransition: "oTransitionEnd",
                    msTransition: "transitionend",
                    transition: "transitionend"
                };
                for (var c in e) {
                    if (this.transData.transProp == false && document.documentElement.style[c] != null) {
                        this.transData.transProp = c;
                        this.transData.transEv = e[c]
                    }
                }
                e = null
            }
            return this.transData
        },
        _xmlNodeValue: function (a) {
            var e = "";
            for (var c = 0; c < a.childNodes.length; c++) {
                e += (a.childNodes[c].nodeValue != null ? a.childNodes[c].nodeValue.toString().replace(/^[\n\r\s]{0,}/, "").replace(/[\n\r\s]{0,}$/, "") : "")
            }
            return e
        }
    };
    window.dhx4.isIE = (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0);
    window.dhx4.isIE6 = (window.XMLHttpRequest == null && navigator.userAgent.indexOf("MSIE") >= 0);
    window.dhx4.isIE7 = (navigator.userAgent.indexOf("MSIE 7.0") >= 0 && navigator.userAgent.indexOf("Trident") < 0);
    window.dhx4.isIE8 = (navigator.userAgent.indexOf("MSIE 8.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0);
    window.dhx4.isIE9 = (navigator.userAgent.indexOf("MSIE 9.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0);
    window.dhx4.isIE10 = (navigator.userAgent.indexOf("MSIE 10.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0 && window.navigator.pointerEnabled != true);
    window.dhx4.isIE11 = (navigator.userAgent.indexOf("Trident") >= 0 && window.navigator.pointerEnabled == true);
    window.dhx4.isEdge = (navigator.userAgent.indexOf("Edge") >= 0);
    window.dhx4.isOpera = (navigator.userAgent.indexOf("Opera") >= 0);
    window.dhx4.isChrome = (navigator.userAgent.indexOf("Chrome") >= 0) && !window.dhx4.isEdge;
    window.dhx4.isKHTML = (navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent.indexOf("Konqueror") >= 0) && !window.dhx4.isEdge;
    window.dhx4.isFF = (navigator.userAgent.indexOf("Firefox") >= 0);
    window.dhx4.isIPad = (navigator.userAgent.search(/iPad/gi) >= 0);
    window.dhx4.dnd = {
        evs: {},
        p_en: ((window.dhx4.isIE || window.dhx4.isEdge) && (window.navigator.pointerEnabled || window.navigator.msPointerEnabled)),
        _mTouch: function (a) {
            return (window.dhx4.isIE10 && a.pointerType == a.MSPOINTER_TYPE_MOUSE || window.dhx4.isIE11 && a.pointerType == "mouse" || window.dhx4.isEdge && a.pointerType == "mouse")
        },
        _touchOn: function (a) {
            if (a == null) {
                a = document.body
            }
            a.style.touchAction = a.style.msTouchAction = "";
            a = null
        },
        _touchOff: function (a) {
            if (a == null) {
                a = document.body
            }
            a.style.touchAction = a.style.msTouchAction = "none";
            a = null
        }
    };
    if (window.navigator.pointerEnabled == true) {
        window.dhx4.dnd.evs = {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup"
        }
    } else {
        if (window.navigator.msPointerEnabled == true) {
            window.dhx4.dnd.evs = {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            }
        } else {
            if (typeof (window.addEventListener) != "undefined") {
                window.dhx4.dnd.evs = {
                    start: "touchstart",
                    move: "touchmove",
                    end: "touchend"
                }
            }
        }
    }
}


if (typeof (window.dhx4._enableDataLoading) == "undefined") {
    window.dhx4._enableDataLoading = function (l, e, j, h, m) {
        if (m == "clear") {
            for (var c in l._dhxdataload) {
                l._dhxdataload[c] = null;
                delete l._dhxdataload[c]
            }
            l._loadData = null;
            l._dhxdataload = null;
            l.load = null;
            l.loadStruct = null;
            l = null;
            return
        }
        l._dhxdataload = {
            initObj: e,
            xmlToJson: j,
            xmlRootTag: h,
            onBeforeXLS: null
        };
        l._loadData = function (u, v, w) {
            if (arguments.length == 2) {
                w = v;
                v = null
            }
            var s = null;
            if (arguments.length == 3) {
                w = arguments[2]
            }
            if (typeof (u) == "string") {
                var r = u.replace(/^\s{1,}/, "").replace(/\s{1,}$/, "");
                var A = new RegExp("^<" + this._dhxdataload.xmlRootTag);
                if (A.test(r.replace(/^<\?xml[^\?]*\?>\s*/, ""))) {
                    s = dhx4.ajax.parse(u);
                    if (s != null) {
                        s = this[this._dhxdataload.xmlToJson].apply(this, [s])
                    }
                }
                if (s == null && (r.match(/^[\s\S]*{[.\s\S]*}[\s\S]*$/) != null || r.match(/^[\s\S]*\[[.\s\S]*\][\s\S]*$/) != null)) {
                    s = dhx4.s2j(r)
                }
                if (s == null) {
                    this.callEvent("onXLS", []);
                    var o = [];
                    if (typeof (this._dhxdataload.onBeforeXLS) == "function") {
                        var r = this._dhxdataload.onBeforeXLS.apply(this, [u]);
                        if (r != null && typeof (r) == "object") {
                            if (r.url != null) {
                                u = r.url
                            }
                            if (r.params != null) {
                                for (var x in r.params) {
                                    o.push(x + "=" + encodeURIComponent(r.params[x]))
                                }
                            }
                        }
                    }
                    var y = this;
                    var n = function (a) {
                        var C = null;
                        if ((a.xmlDoc.getResponseHeader("Content-Type") || "").search(/xml/gi) >= 0 || (a.xmlDoc.responseText.replace(/^\s{1,}/, "")).match(/^</) != null) {
                            C = y[y._dhxdataload.xmlToJson].apply(y, [a.xmlDoc.responseXML])
                        } else {
                            C = dhx4.s2j(a.xmlDoc.responseText)
                        }
                        if (C != null) {
                            y[y._dhxdataload.initObj].apply(y, [C, u])
                        }
                        y.callEvent("onXLE", []);
                        if (w != null) {
                            if (typeof (w) == "function") {
                                w.apply(y, [])
                            } else {
                                if (typeof (window[w]) == "function") {
                                    window[w].apply(y, [])
                                }
                            }
                        }
                        n = w = null;
                        C = a = y = null
                    };
                    o = o.join("&") + (typeof (v) == "string" ? "&" + v : "");
                    if (dhx4.ajax.method == "post") {
                        dhx4.ajax.post(u, o, n)
                    } else {
                        if (dhx4.ajax.method == "get") {
                            dhx4.ajax.get(u + (o.length > 0 ? (u.indexOf("?") > 0 ? "&" : "?") + o : ""), n)
                        }
                    }
                    return
                }
            } else {
                if (typeof (u.documentElement) == "object" || (typeof (u.tagName) != "undefined" && typeof (u.getElementsByTagName) != "undefined" && u.getElementsByTagName(this._dhxdataload.xmlRootTag).length > 0)) {
                    s = this[this._dhxdataload.xmlToJson].apply(this, [u])
                } else {
                    s = window.dhx4._copyObj(u)
                }
            }
            if (s != null) {
                this[this._dhxdataload.initObj].apply(this, [s])
            }
            if (w != null) {
                if (typeof (w) == "function") {
                    w.apply(this, [])
                } else {
                    if (typeof (window[w]) == "function") {
                        window[w].apply(this, [])
                    }
                }
                w = null
            }
        };
        if (m != null) {
            var g = {
                struct: "loadStruct",
                data: "load"
            };
            for (var c in m) {
                if (m[c] == true) {
                    l[g[c]] = function () {
                        return this._loadData.apply(this, arguments)
                    }
                }
            }
        }
        l = null
    }
}


if (typeof (window.dhx4) == "undefined") {
    window.dhx4 = {
        version: "4.6",
        skin: null,
        skinDetect: function(a) {
            return {
                10: "dhx_skyblue",
                20: "dhx_web",
                30: "dhx_terrace"
            }[this.readFromCss(a + "_skin_detect")] || null
        },
        readFromCss: function(e, g) {
            var c = document.createElement("DIV");
            c.className = e;
            if (document.body.firstChild != null) {
                document.body.insertBefore(c, document.body.firstChild)
            } else {
                document.body.appendChild(c)
            }
            var a = c[g || "offsetWidth"];
            c.parentNode.removeChild(c);
            c = null;
            return a
        },
        lastId: 1,
        newId: function() {
            return this.lastId++
        },
        zim: {
            data: {},
            step: 5,
            first: function() {
                return 100
            },
            last: function() {
                var e = this.first();
                for (var c in this.data) {
                    e = Math.max(e, this.data[c])
                }
                return e
            },
            reserve: function(a) {
                this.data[a] = this.last() + this.step;
                return this.data[a]
            },
            clear: function(a) {
                if (this.data[a] != null) {
                    this.data[a] = null;
                    delete this.data[a]
                }
            }
        },
        s2b: function(a) {
            if (typeof(a) == "string") {
                a = a.toLowerCase()
            }
            return (a == true || a == 1 || a == "true" || a == "1" || a == "yes" || a == "y" || a == "on")
        },
        s2j: function(s) {
            var obj = null;
            dhx4.temp = null;
            try {
                eval("dhx4.temp=" + s)
            } catch (e) {
                dhx4.temp = null
            }
            obj = dhx4.temp;
            dhx4.temp = null;
            return obj
        },
        absLeft: function(a) {
            if (typeof(a) == "string") {
                a = document.getElementById(a)
            }
            return this.getOffset(a).left
        },
        absTop: function(a) {
            if (typeof(a) == "string") {
                a = document.getElementById(a)
            }
            return this.getOffset(a).top
        },
        _aOfs: function(a) {
            var e = 0,
                c = 0;
            while (a) {
                e = e + parseInt(a.offsetTop);
                c = c + parseInt(a.offsetLeft);
                a = a.offsetParent
            }
            return {
                top: e,
                left: c
            }
        },
        _aOfsRect: function(g) {
            var l = g.getBoundingClientRect();
            var m = document.body;
            var c = document.documentElement;
            var a = window.pageYOffset || c.scrollTop || m.scrollTop;
            var h = window.pageXOffset || c.scrollLeft || m.scrollLeft;
            var j = c.clientTop || m.clientTop || 0;
            var n = c.clientLeft || m.clientLeft || 0;
            var o = l.top + a - j;
            var e = l.left + h - n;
            return {
                top: Math.round(o),
                left: Math.round(e)
            }
        },
        getOffset: function(a) {
            if (a.getBoundingClientRect) {
                return this._aOfsRect(a)
            } else {
                return this._aOfs(a)
            }
        },
        _isObj: function(a) {
            return (a != null && typeof(a) == "object" && typeof(a.length) == "undefined")
        },
        _copyObj: function(g) {
            if (this._isObj(g)) {
                var e = {};
                for (var c in g) {
                    if (typeof(g[c]) == "object" && g[c] != null) {
                        e[c] = this._copyObj(g[c])
                    } else {
                        e[c] = g[c]
                    }
                }
            } else {
                var e = [];
                for (var c = 0; c < g.length; c++) {
                    if (typeof(g[c]) == "object" && g[c] != null) {
                        e[c] = this._copyObj(g[c])
                    } else {
                        e[c] = g[c]
                    }
                }
            }
            return e
        },
        screenDim: function() {
            var a = (navigator.userAgent.indexOf("MSIE") >= 0);
            var c = {};
            c.left = document.body.scrollLeft;
            c.right = c.left + (window.innerWidth || document.body.clientWidth);
            c.top = Math.max((a ? document.documentElement : document.getElementsByTagName("html")[0]).scrollTop, document.body.scrollTop);
            c.bottom = c.top + (a ? Math.max(document.documentElement.clientHeight || 0, document.documentElement.offsetHeight || 0) : window.innerHeight);
            return c
        },
        selectTextRange: function(h, l, c) {
            h = (typeof(h) == "string" ? document.getElementById(h) : h);
            var a = h.value.length;
            l = Math.max(Math.min(l, a), 0);
            c = Math.min(c, a);
            if (h.setSelectionRange) {
                try {
                    h.setSelectionRange(l, c)
                } catch (j) {}
            } else {
                if (h.createTextRange) {
                    var g = h.createTextRange();
                    g.moveStart("character", l);
                    g.moveEnd("character", c - a);
                    try {
                        g.select()
                    } catch (j) {}
                }
            }
        },
        transData: null,
        transDetect: function() {
            if (this.transData == null) {
                this.transData = {
                    transProp: false,
                    transEv: null
                };
                var e = {
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd",
                    OTransition: "oTransitionEnd",
                    msTransition: "transitionend",
                    transition: "transitionend"
                };
                for (var c in e) {
                    if (this.transData.transProp == false && document.documentElement.style[c] != null) {
                        this.transData.transProp = c;
                        this.transData.transEv = e[c]
                    }
                }
                e = null
            }
            return this.transData
        },
        _xmlNodeValue: function(a) {
            var e = "";
            for (var c = 0; c < a.childNodes.length; c++) {
                e += (a.childNodes[c].nodeValue != null ? a.childNodes[c].nodeValue.toString().replace(/^[\n\r\s]{0,}/, "").replace(/[\n\r\s]{0,}$/, "") : "")
            }
            return e
        }
    };
    window.dhx4.isIE = (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0);
    window.dhx4.isIE6 = (window.XMLHttpRequest == null && navigator.userAgent.indexOf("MSIE") >= 0);
    window.dhx4.isIE7 = (navigator.userAgent.indexOf("MSIE 7.0") >= 0 && navigator.userAgent.indexOf("Trident") < 0);
    window.dhx4.isIE8 = (navigator.userAgent.indexOf("MSIE 8.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0);
    window.dhx4.isIE9 = (navigator.userAgent.indexOf("MSIE 9.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0);
    window.dhx4.isIE10 = (navigator.userAgent.indexOf("MSIE 10.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0 && window.navigator.pointerEnabled != true);
    window.dhx4.isIE11 = (navigator.userAgent.indexOf("Trident") >= 0 && window.navigator.pointerEnabled == true);
    window.dhx4.isEdge = (navigator.userAgent.indexOf("Edge") >= 0);
    window.dhx4.isOpera = (navigator.userAgent.indexOf("Opera") >= 0);
    window.dhx4.isChrome = (navigator.userAgent.indexOf("Chrome") >= 0) && !window.dhx4.isEdge;
    window.dhx4.isKHTML = (navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent.indexOf("Konqueror") >= 0) && !window.dhx4.isEdge;
    window.dhx4.isFF = (navigator.userAgent.indexOf("Firefox") >= 0);
    window.dhx4.isIPad = (navigator.userAgent.search(/iPad/gi) >= 0);
    window.dhx4.dnd = {
        evs: {},
        p_en: ((window.dhx4.isIE || window.dhx4.isEdge) && (window.navigator.pointerEnabled || window.navigator.msPointerEnabled)),
        _mTouch: function(a) {
            return (window.dhx4.isIE10 && a.pointerType == a.MSPOINTER_TYPE_MOUSE || window.dhx4.isIE11 && a.pointerType == "mouse" || window.dhx4.isEdge && a.pointerType == "mouse")
        },
        _touchOn: function(a) {
            if (a == null) {
                a = document.body
            }
            a.style.touchAction = a.style.msTouchAction = "";
            a = null
        },
        _touchOff: function(a) {
            if (a == null) {
                a = document.body
            }
            a.style.touchAction = a.style.msTouchAction = "none";
            a = null
        }
    };
    if (window.navigator.pointerEnabled == true) {
        window.dhx4.dnd.evs = {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup"
        }
    } else {
        if (window.navigator.msPointerEnabled == true) {
            window.dhx4.dnd.evs = {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            }
        } else {
            if (typeof(window.addEventListener) != "undefined") {
                window.dhx4.dnd.evs = {
                    start: "touchstart",
                    move: "touchmove",
                    end: "touchend"
                }
            }
        }
    }
}


if (typeof (window.dhx4.ajax) == "undefined") {
    window.dhx4.ajax = {
        cache: false,
        method: "get",
        parse: function (a) {
            if (typeof a !== "string") {
                return a
            }
            a = a.replace(/^[\s]+/, "");
            if (window.DOMParser && !dhx4.isIE) {
                var c = (new window.DOMParser()).parseFromString(a, "text/xml")
            } else {
                if (window.ActiveXObject !== window.undefined) {
                    var c = new window.ActiveXObject("Microsoft.XMLDOM");
                    c.async = "false";
                    c.loadXML(a)
                }
            }
            return c
        },
        xmltop: function (a, h, g) {
            if (typeof h.status == "undefined" || h.status < 400) {
                xml = (!h.responseXML) ? dhx4.ajax.parse(h.responseText || h) : (h.responseXML || h);
                if (xml && xml.documentElement !== null) {
                    try {
                        if (!xml.getElementsByTagName("parsererror").length) {
                            return xml.getElementsByTagName(a)[0]
                        }
                    } catch (c) { }
                }
            }
            if (g !== -1) {
                dhx4.callEvent("onLoadXMLError", ["Incorrect XML", arguments[1], g])
            }
            return document.createElement("DIV")
        },
        xpath: function (g, a) {
            if (!a.nodeName) {
                a = a.responseXML || a
            }
            if (dhx4.isIE) {
                try {
                    return a.selectNodes(g) || []
                } catch (j) {
                    return []
                }
            } else {
                var h = [];
                var l;
                var c = (a.ownerDocument || a).evaluate(g, a, null, XPathResult.ANY_TYPE, null);
                while (l = c.iterateNext()) {
                    h.push(l)
                }
                return h
            }
        },
        query: function (a) {
            dhx4.ajax._call((a.method || "GET"), a.url, a.data || "", (a.async || true), a.callback, null, a.headers)
        },
        get: function (a, c) {
            return this._call("GET", a, null, true, c)
        },
        getSync: function (a) {
            return this._call("GET", a, null, false)
        },
        put: function (c, a, e) {
            return this._call("PUT", c, a, true, e)
        },
        del: function (c, a, e) {
            return this._call("DELETE", c, a, true, e)
        },
        post: function (c, a, e) {
            if (arguments.length == 1) {
                a = ""
            } else {
                if (arguments.length == 2 && (typeof (a) == "function" || typeof (window[a]) == "function")) {
                    e = a;
                    a = ""
                } else {
                    a = String(a)
                }
            }
            return this._call("POST", c, a, true, e)
        },
        postSync: function (c, a) {
            a = (a == null ? "" : String(a));
            return this._call("POST", c, a, false)
        },
        getLong: function (a, c) {
            this._call("GET", a, null, true, c, {
                url: a
            })
        },
        postLong: function (c, a, e) {
            if (arguments.length == 2 && (typeof (a) == "function" || typeof (window[a]))) {
                e = a;
                a = ""
            }
            this._call("POST", c, a, true, e, {
                url: c,
                postData: a
            })
        },
        _call: function (a, c, e, h, l, o, g) {
            var n = (window.XMLHttpRequest && !dhx4.isIE ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
            var j = (navigator.userAgent.match(/AppleWebKit/) != null && navigator.userAgent.match(/Qt/) != null && navigator.userAgent.match(/Safari/) != null);
            if (h == true) {
                n.onreadystatechange = function () {
                    if ((n.readyState == 4) || (j == true && n.readyState == 3)) {
                        if (n.status != 200 || n.responseText == "") {
                            if (!dhx4.callEvent("onAjaxError", [{
                                xmlDoc: n,
                                filePath: c,
                                async: h
                            }])) {
                                return
                            }
                        }
                        window.setTimeout(function () {
                            if (typeof (l) == "function") {
                                l.apply(window, [{
                                    xmlDoc: n,
                                    filePath: c,
                                    async: h
                                }])
                            }
                            if (o != null) {
                                if (typeof (o.postData) != "undefined") {
                                    dhx4.ajax.postLong(o.url, o.postData, l)
                                } else {
                                    dhx4.ajax.getLong(o.url, l)
                                }
                            }
                            l = null;
                            n = null
                        }, 1)
                    }
                }
            }
            if (a == "GET") {
                c += this._dhxr(c)
            }
            n.open(a, c, h);
            if (g != null) {
                for (var m in g) {
                    n.setRequestHeader(m, g[m])
                }
            } else {
                if (a == "POST" || a == "PUT" || a == "DELETE") {
                    n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                } else {
                    if (a == "GET") {
                        e = null
                    }
                }
            }
            n.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            n.send(e);
            if (h != true) {
                if ((n.readyState == 4) || (j == true && n.readyState == 3)) {
                    if (n.status != 200 || n.responseText == "") {
                        dhx4.callEvent("onAjaxError", [{
                            xmlDoc: n,
                            filePath: c,
                            async: h
                        }])
                    }
                }
            }
            return {
                xmlDoc: n,
                filePath: c,
                async: h
            }
        },
        _dhxr: function (a, c) {
            if (this.cache != true) {
                if (a.match(/^[\?\&]$/) == null) {
                    a = (a.indexOf("?") >= 0 ? "&" : "?")
                }
                if (typeof (c) == "undefined") {
                    c = true
                }
                return a + "dhxr" + new Date().getTime() + (c == true ? "=1" : "")
            }
            return ""
        }
    }
}

if (typeof (window.dhtmlx) == "undefined") {
    window.dhtmlx = {
        extend: function (e, c) {
            for (var g in c) {
                if (!e[g]) {
                    e[g] = c[g]
                }
            }
            return e
        },
        extend_api: function (a, g, e) {
            var c = window[a];
            if (!c) {
                return
            }
            window[a] = function (l) {
                if (l && typeof l == "object" && !l.tagName) {
                    var j = c.apply(this, (g._init ? g._init(l) : arguments));
                    for (var h in dhtmlx) {
                        if (g[h]) {
                            this[g[h]](dhtmlx[h])
                        }
                    }
                    for (var h in l) {
                        if (g[h]) {
                            this[g[h]](l[h])
                        } else {
                            if (h.indexOf("on") === 0) {
                                this.attachEvent(h, l[h])
                            }
                        }
                    }
                } else {
                    var j = c.apply(this, arguments)
                }
                if (g._patch) {
                    g._patch(this)
                }
                return j || this
            };
            window[a].prototype = c.prototype;
            if (e) {
                dhtmlx.extend(window[a].prototype, e)
            }
        },
        url: function (a) {
            if (a.indexOf("?") != -1) {
                return "&"
            } else {
                return "?"
            }
        }
    }
}

dhtmlXPopup.prototype._attach_init_tree = function (a) {
    this._nodeObj = new dhtmlXTreeObject(this._nodeId, "100%", "100%", (a.rootId))
};

function dhtmlXPopup(e) {
    var g = this;
    this.conf = e || {};
    e = null;
    this.mode = (this.conf.mode || "bottom");
    this.conf.zi = window.dhx4.newId();
    this.conf.context = (this.conf.context == null ? true : window.dhx4.s2b(this.conf.context));
    this.conf.IE6_display_fix = (this.conf.IE6_display_fix == null ? false : window.dhx4.s2b(this.conf.IE6_display_fix));
    this.conf.last_p_click = this.conf.last_body_click = null;
    this.p = document.createElement("DIV");
    this.p.style.display = "none";
    this.p.innerHTML = "<div class='dhx_popup_area" + (window.dhx4.isIE ? " dhx_popup_area_ie" : "") + "'><table cellspacing='0' cellpadding='0' border='0' class='dhx_popup_table'><tbody></tbody></table></div><div class='dhx_popup_arrow dhx_popup_arrow_" + this.mode + "'></div>";
    document.body.appendChild(this.p);
    this.p.oncontextmenu = function (a) {
        if (g.conf.context == false) {
            a = a || event;
            a.returnValue = false;
            return false
        }
    };
    this.skinParams = {
        dhx_terrace: {
            t0: 19,
            t1: 9,
            t2: 19,
            t3: 9
        },
        dhx_skyblue: {
            t0: 12,
            t1: 9,
            t2: 12,
            t3: 9
        },
        dhx_web: {
            t0: 12,
            t1: 9,
            t2: 12,
            t3: 9
        }
    };
    this.p.ontouchstart = this.p.onclick = function (j) {
        j = j || event;
        var h = (g.conf.last_p_click != null && g.conf.last_p_click != j.type);
        g.conf.last_p_click = j.type;
        if (h == true) {
            return
        }
        g._clearClick = true;
        if (g._nodeObj != null) {
            g.callEvent("onContentClick", []);
            return true
        }
        var a = (j.target || j.srcElement);
        var l = null;
        while (a != g.p && a != null) {
            if (typeof (a._idd) != "undefined" && !a._isSeparator) {
                l = a._idd;
                a = null
            } else {
                a = a.parentNode
            }
        }
        a = null;
        if (l != null) {
            g.callEvent("onClick", [l]);
            if (g != null && g.isVisible != null && g.isVisible() && g.callEvent("onBeforeHide", ["select", j, l]) === true) {
                j.cancelBubble = true;
                g.hide()
            }
        }
    };
    this.separator = "DHXSEP_" + window.dhx4.newId();
    this.tpl = [];
    this._setTemplate = function (a) {
        this.tpl = a.split(",")
    };
    this.show = function (h) {
        var a = null;
        if (arguments.length == 1) {
            if (!h) {
                h = this.conf.id[0]
            } else {
                if (!this._idExists(h)) {
                    return
                }
            }
            if (this.conf.toolbar) {
                a = this.conf.toolbar._getItemDim(h)
            }
            if (this.conf.ribbon) {
                a = this.conf.ribbon._getItemDim(h)
            }
            if (this.conf.form) {
                a = this.conf.form._getItemDim(h)
            }
        } else {
            if (arguments.length == 4) {
                this._clearClick = true;
                a = {
                    left: arguments[0],
                    top: arguments[1],
                    width: arguments[2],
                    height: arguments[3]
                };
                h = null
            }
        }
        if (!a) {
            return
        }
        this.p.style.visibility = "hidden";
        this.p.style.display = "";
        this._setPos(a);
        this.p.style.zIndex = window.dhx4.zim.reserve(this.conf.zi);
        this.p.style.visibility = "visible";
        this._lastId = h;
        this.callEvent("onShow", [h])
    };
    this._setPos = function (I, m) {
        var v = I.left;
        var s = I.top;
        var C = I.width;
        var L = I.height;
        this._posData = {
            left: v,
            top: s,
            width: C,
            height: L
        };
        var N = window.dhx4.screenDim();
        var F = m || this.mode;
        if (typeof (m) == "undefined") {
            m = false
        }
        var P = {
            top: (s - this.p.offsetHeight) - N.top,
            bottom: N.bottom - (s + L + this.p.offsetHeight),
            left: v - this.p.offsetWidth - N.left,
            right: N.right - (v + C + this.p.offsetWidth)
        };
        if (!m && P[F] < 0) {
            var J = this._getAvailPos(F, P);
            if (J !== false) {
                this._setPos(I, J);
                return
            }
        }
        if (F == "top" || F == "bottom") {
            var D = this.skinParams[this.conf.skin].t2;
            var A = this.skinParams[this.conf.skin].t3;
            var r = Math.round(this.p.offsetWidth / 2);
            var a = Math.round(this.p.lastChild.offsetWidth / 2);
            if (v < N.left) {
                var M = Math.min(v + C, N.left);
                C = v + C - M;
                v = M
            }
            if (v + C > N.right) {
                C = N.right - v
            }
            var u = Math.round(v + C / 2);
            var l = u - r;
            var K = u - D - a;
            var o = u + a + D - this.p.offsetWidth;
            if (l < N.left - A) {
                l = Math.min(N.left - A, K)
            } else {
                if (l + this.p.offsetWidth > N.right + A) {
                    l = Math.max(o, N.right + A - this.p.offsetWidth)
                }
            }
            this.p.style.left = l + "px";
            this.p.style.top = (F == "top" ? s - this.p.offsetHeight : s + L) + "px";
            u = u - l - a;
            this.p.lastChild.className = "dhx_popup_arrow dhx_popup_arrow_" + F;
            this.p.lastChild.style.top = (F == "top" ? this.p.offsetHeight - this.p.lastChild.offsetHeight : 0) + "px";
            this.p.lastChild.style.left = u + "px"
        }
        if (F == "left" || F == "right") {
            var D = this.skinParams[this.conf.skin].t0;
            var A = this.skinParams[this.conf.skin].t1;
            var n = Math.round(this.p.offsetHeight / 2);
            var S = Math.round(this.p.lastChild.offsetHeight / 2);
            if (s < N.top) {
                var j = Math.min(s + L, N.top);
                L = s + L - j;
                s = j
            }
            if (s + L > N.bottom) {
                L = N.bottom - s
            }
            var u = Math.round(s + L / 2);
            var H = u - n;
            var Q = u - D - S;
            var O = u + S + D - this.p.offsetHeight;
            if (H < N.top - A) {
                H = Math.min(N.top - A, Q)
            } else {
                if (H + this.p.offsetHeight > N.bottom + A) {
                    H = Math.max(O, N.bottom + A - this.p.offsetHeight)
                }
            }
            this.p.style.left = (F == "left" ? v - this.p.offsetWidth : v + C) + "px";
            this.p.style.top = H + "px";
            u = u - H - S;
            this.p.lastChild.className = "dhx_popup_arrow dhx_popup_arrow_" + F;
            this.p.lastChild.style.left = (F == "left" ? this.p.offsetWidth - this.p.lastChild.offsetWidth : 0) + "px";
            this.p.lastChild.style.top = u + "px"
        }
        if (this._IEDisp && this._nodeId != null) {
            var E = document.getElementById(this._nodeId);
            if (this.conf.IE6_display_fix == true) {
                E.style.visibility = "hidden"
            }
            window.setTimeout(function () {
                E.style.visibility = "visible";
                E = null
            }, 1)
        }
    };
    this._getAvailPos = function (o, n) {
        var j = {
            top: ["bottom", "right", "left"],
            bottom: ["top", "right", "left"],
            left: ["right", "bottom", "top"],
            right: ["left", "bottom", "top"]
        };
        var l = null;
        for (var m = 0; m < j[o].length; m++) {
            if (l == null && n[j[o][m]] > 0) {
                l = j[o][m]
            }
        }
        if (l == null) {
            l = "bottom";
            for (var h in n) {
                if (n[h] > n[l]) {
                    l = h
                }
            }
        }
        if (l == o) {
            return false
        }
        return l
    };
    this._repaint = function () {
        if (this.isVisible()) {
            this._setPos(this._posData)
        }
    };
    this.clear = function () {
        if (this._nodeObj) {
            if (window.dhx4.isIE && typeof (window.dhtmlXLayoutObject) == "function" && this._nodeObj instanceof window.dhtmlXLayoutObject) {
                this.p.onmousedown = null
            }
            if (this._nodeObj.unload) {
                this._nodeObj.unload()
            } else {
                if (this._nodeObj.destruct) {
                    this._nodeObj.destruct()
                }
            }
            this._nodeObj = this._nodeId = null;
            if (this._nodeObjEv != null) {
                for (var h = 0; h < this._nodeObjEv.length; h++) {
                    this.detachEvent(this._nodeObjEv[h])
                }
                this._nodeObjEv = null
            }
        }
        if (this._IEHoverInited) {
            this._IEHoverClear()
        }
        var a = this.p.firstChild.firstChild.firstChild;
        while (a.childNodes.length > 0) {
            a.removeChild(a.lastChild)
        }
        a = null;
        this.itemData = {}
    };
    this.hide = function () {
        if (this.p.style.display != "none") {
            this.p.style.display = "none";
            window.dhx4.zim.clear(this.conf.zi);
            var a = this._lastId;
            this._lastId = null;
            this.callEvent("onHide", [a]);
            this.conf.last_p_click = this.conf.last_body_click = null
        }
    };
    this.isVisible = function () {
        return (this.p.style.display == "")
    };
    this.itemData = {};
    this.getItemData = function (a) {
        if (!a) {
            return this.itemData
        }
        if (this.itemData[a]) {
            return this.itemData[a]
        }
        return {}
    };
    this.setSkin = function (a) {
        this.conf.skin = a;
        this.p.className = "dhx_popup_" + this.conf.skin;
        if (this._nodeObj != null && typeof (this._nodeObj.setSkin) == "function") {
            this._nodeObj.setSkin(this.conf.skin)
        }
        this._repaint()
    };
    this.attachList = function (j, o) {
        this._setTemplate(j);
        this.clear();
        var l = this.p.firstChild.firstChild.firstChild;
        for (var n = 0; n < o.length; n++) {
            var m = document.createElement("TR");
            if (o[n] != this.separator) {
                if (typeof (o[n].id) == "undefined" || o[n].id == null) {
                    m._idd = window.dhx4.newId();
                    while (this.itemData[m._idd] != null) {
                        m._idd = window.dhx4.newId()
                    }
                } else {
                    m._idd = o[n].id
                }
                this.itemData[m._idd] = o[n]
            }
            l.appendChild(m);
            if (o[n] == this.separator) {
                m.className = "dhx_popup_sep";
                m._isSeparator = true;
                var s = document.createElement("TD");
                s.className = "dhx_popup_sep";
                s.colSpan = this.tpl.length;
                s.innerHTML = "<div class='dhx_popup_sep'>&nbsp;</div>";
                m.appendChild(s);
                s = null
            } else {
                for (var a = 0; a < this.tpl.length; a++) {
                    var h = "dhx_popup_td";
                    if (this._IEFirstLast && (this.tpl.length == 1 || a == 0 || a == this.tpl.length - 1)) {
                        if (this.tpl.length == 1) {
                            h += " dhx_popup_td_single"
                        } else {
                            h += (a == 0 ? " dhx_popup_td_first" : " dhx_popup_td_last")
                        }
                    }
                    var s = document.createElement("TD");
                    s.className = h;
                    s.innerHTML = o[n][this.tpl[a]] || "&nbsp;";
                    m.appendChild(s);
                    s = null
                }
                if (this._IEHover) {
                    m._IEHover = true;
                    if (!this._IEHoverInited) {
                        this._IEHoverInit()
                    }
                }
            }
            m = null
        }
        l = null;
        this._repaint()
    };
    this._attachNode = function (l, j) {
        this.clear();
        this._nodeId = "dhxpopup_node_" + window.dhx4.newId();
        var a = this.p.firstChild.firstChild.firstChild;
        var h = document.createElement("TR");
        h.className = "dhxnode";
        a.appendChild(h);
        var m = document.createElement("TD");
        m.className = "dhx_popup_td";
        m.innerHTML = "<div id='" + this._nodeId + "' style='position:relative;'></div>";
        if (j.width) {
            m.firstChild.style.width = j.width + "px"
        }
        if (j.height) {
            m.firstChild.style.height = j.height + "px"
        }
        h.appendChild(m);
        m = h = a = null;
        if (typeof (this["_attach_init_" + l]) == "function") {
            this["_attach_init_" + l](j);
            this._enableIEVFix()
        }
        this._repaint();
        return this._nodeObj
    };
    this.unload = function () {
        if (typeof (window.addEventListener) == "function") {
            window.removeEventListener("touchstart", this._doOnClick, false);
            window.removeEventListener("click", this._doOnClick, false);
            window.removeEventListener("keyup", this._doOnKeyUp, false);
            window.removeEventListener("unload", this._doOnUnload, false)
        } else {
            document.body.detachEvent("onclick", this._doOnClick, false);
            document.body.detachEvent("onkeyup", this._doOnKeyUp, false);
            document.body.detachEvent("onunload", this._doOnUnload, false)
        }
        window.dhx4.detachEvent(this.conf.ev_grid_click);
        this.clear();
        if (this.conf.toolbarEvent != null && this.conf.toolbar != null) {
            if (this.conf.toolbar.detachEvent != null) {
                this.conf.toolbar.detachEvent(this.conf.toolbarEvent)
            } else {
                this.conf.toolbar._getItemDim = null
            }
        }
        if (this.conf.ribbonEvent != null && this.conf.ribbon != null) {
            if (this.conf.ribbon.detachEvent != null) {
                this.conf.ribbon.detachEvent(this.conf.ribbonEvent)
            } else {
                this.conf.ribbon._getItemDim = null
            }
        }
        if (this.conf.slider != null) {
            for (var j = 0; j < this.conf.slider_events.length; j++) {
                this.conf.slider.detachEvent(this.conf.slider_events[j])
            }
            this.conf.slider_events = null;
            this._sliderShow = this._sliderHide = null;
            this.conf.slider = null
        }
        window.dhx4._eventable(this, "clear");
        this.p.onclick = this.p.ontouchstart = this.p.oncontextmenu = null;
        this.p.parentNode.removeChild(this.p);
        this.p = null;
        for (var h in this.conf) {
            this.conf[h] = null
        }
        for (var h in this) {
            this[h] = null
        }
        g = null
    };
    window.dhx4._eventable(this);
    this._doOnClick = function (o) {
        o = o || event;
        var a = (g.conf.last_body_click != null && g.conf.last_body_click != o.type);
        g.conf.last_body_click = o.type;
        if (a == true) {
            return
        }
        if (g._clearClick == true) {
            g._clearClick = false;
            return
        }
        if (g.conf.form != null) {
            var j;
            var s = (o.target || o.srcElement);
            if ((s.tagName || "").toLowerCase() == "option") {
                s = s.parentNode
            }
            if (s.className != null && s.className.search("dhxform") >= 0) {
                if (s.parentNode != null && s.parentNode.parentNode != null && s.parentNode.parentNode._idd != null) {
                    j = s.parentNode.parentNode._idd;
                    if (s.parentNode.parentNode._type == "ra") {
                        j = [s.parentNode.parentNode._group, s.parentNode.parentNode._value]
                    }
                }
            } else {
                var m = true;
                var n = false;
                while (m && !n) {
                    var l = (s.className || "").toLowerCase();
                    if (l.length > 0) {
                        n = (l == "dhxform_btn" || l.search(/dhxeditor_inside/gi) >= 0 || l == "dhxcombo_input" || l.search(/dhxcombolist/gi) >= 0)
                    }
                    s = s.parentNode;
                    m = (s != null)
                }
                if (n) {
                    return
                }
            }
            s = null;
            if (j != null && g._idExists(j)) {
                return
            }
        }
        if (typeof (window.dhtmlXForm) == "function" && g._nodeObj instanceof window.dhtmlXForm) {
            var u = {};
            var l = 0;
            var h = g._nodeObj;
            h.forEachItem(function (r) {
                if (h.getItemType(r) == "combo") {
                    u[h.getCombo(r).list._listId] = true;
                    l++
                }
            });
            h = null;
            if (l > 0) {
                var s = (o.target || o.srcElement);
                var m = true;
                var n = false;
                while (m == true && n != true) {
                    var l = (s.className || "").toLowerCase();
                    if (l.length > 0 && l.search(/^dhxcombolist/gi) >= 0 && s._listId != null && u[s._listId] == true) {
                        n = true;
                        s = null
                    } else {
                        s = s.parentNode;
                        m = (s != null)
                    }
                }
                if (n == true) {
                    return
                }
            }
        }
        if (g.isVisible() && g.callEvent("onBeforeHide", ["click", o]) === true) {
            g.hide()
        }
    };
    this._doOnKeyUp = function (a) {
        a = a || event;
        if (a.keyCode == 27) {
            if (g.isVisible() && g.callEvent("onBeforeHide", ["esc", a]) === true) {
                g.hide()
            }
        }
    };
    this._doOnUnload = function () {
        g.unload()
    };
    if (typeof (window.addEventListener) == "function") {
        window.addEventListener("touchstart", this._doOnClick, false);
        window.addEventListener("click", this._doOnClick, false);
        window.addEventListener("keyup", this._doOnKeyUp, false);
        window.addEventListener("unload", this._doOnUnload, false)
    } else {
        document.body.attachEvent("onclick", this._doOnClick, false);
        document.body.attachEvent("onkeyup", this._doOnKeyUp, false);
        document.body.attachEvent("onunload", this._doOnUnload, false)
    }
    this.conf.ev_grid_click = window.dhx4.attachEvent("_onGridClick", function (h, a) {
        if (g._nodeObj != null && (g._nodeObj == a || g._findGrid(g._nodeObj, a) == true)) { } else {
            g._clearClick = false;
            g._doOnClick(h)
        }
        a = null
    });
    this._findGrid = function (h, a) {
        var j = false;
        if (typeof (window.dhtmlXTabBar) == "function" && h instanceof window.dhtmlXTabBar) {
            h.forEachTab(function (l) {
                var m = l.getAttachedObject();
                if (j == false && m != null) {
                    j = j || (m == a) || this._findGrid(m);
                    m = null
                }
            })
        }
        return j
    };
    this._idExists = function (j) {
        var a = false;
        for (var h = 0; h < this.conf.id.length; h++) {
            if (this.conf.id[h] instanceof Array) {
                a = a || (this.conf.id[h][0] == j[0] && this.conf.id[h][1] == j[1])
            } else {
                a = a || this.conf.id[h] == j
            }
        }
        return a
    };
    this._IEDisp = (window.dhx4.isIE6 || document.compatMode != "CSS1Compat");
    this._IEHover = (window.dhx4.isIE6 == true);
    if (this._IEHover) {
        this._IEHoverInit = function () {
            this.p.onmouseover = function () {
                var a = event.srcElement;
                while (a != this && a._IEHover != true) {
                    a = a.parentNode
                }
                if (a._IEHover) {
                    if (g._IEHoverTM) {
                        window.clearTimeout(g._IEHoverTM)
                    }
                    if (g._lastIEHover == a) {
                        return
                    }
                    g._IEHoverRender(a);
                    a = null
                }
            };
            this.p.onmouseout = function () {
                if (g._IEHoverTM) {
                    window.clearTimeout(g._IEHoverTM)
                }
                g._IEHoverTM = window.setTimeout(function () {
                    g._IEHoverRender(null)
                }, 1)
            };
            this._IEHoverRender = function (a) {
                if (this._lastIEHover != null) {
                    if (this._lastIEHover.className.search(/tr_hover/gi) >= 0) {
                        this._lastIEHover.className = this._lastIEHover.className.replace(/\s{0,}tr_hover/gi, "");
                        this._lastIEHover = null
                    }
                }
                if (a != null && a.className.search(/tr_hover/gi) < 0) {
                    a.className += " tr_hover";
                    g._lastIEHover = a
                }
            };
            this._IEHoverInited = true
        };
        this._IEHoverClear = function () {
            this.p.onmouseover = null;
            this.p.onmouseout = null;
            this._IEHoverInited = false
        }
    }
    this._IEFirstLast = (window.dhx4.isIE6 || window.dhx4.isIE7 || window.dhx4.isIE8);
    this._enableIEVFix = function () {
        if (window.dhx4.isIE6 || window.dhx4.isIE7) {
            var h = this.attachEvent("onHide", function () {
                document.getElementById(this._nodeId).style.visibility = "hidden"
            });
            var a = this.attachEvent("onShow", function () {
                document.getElementById(this._nodeId).style.visibility = "visible"
            });
            if (this._nodeObjEv == null) {
                this._nodeObjEv = []
            }
            this._nodeObjEv.push(h, a)
        }
    };
    if (typeof (window.dhtmlXToolbarObject) == "function" && this.conf.toolbar != null && this.conf.toolbar instanceof window.dhtmlXToolbarObject && this.conf.id != null) {
        if (!(this.conf.id instanceof Array)) {
            this.conf.id = [this.conf.id]
        }
        this.skinParent = this.conf.toolbar.conf.skin;
        this._doOnToolbarClick = function (h) {
            for (var a = 0; a < g.conf.id.length; a++) {
                if (h == g.conf.id[a]) {
                    if (h != g._lastId) {
                        g.show(h);
                        g._clearClick = true
                    }
                }
            }
        };
        if (typeof (dhtmlXToolbarObject.prototype._getItemDim) == "undefined") {
            dhtmlXToolbarObject.prototype._getItemDim = function (j) {
                var a = this.objPull[this.idPrefix + j];
                var h = {
                    left: window.dhx4.absLeft(a.obj),
                    top: window.dhx4.absTop(a.obj),
                    width: a.obj.offsetWidth + (a.arw ? a.arw.offsetWidth : 0),
                    height: a.obj.offsetHeight
                };
                a = null;
                return h
            }
        }
        this.conf.toolbarEvent = this.conf.toolbar.attachEvent("onClick", this._doOnToolbarClick)
    }
    if (typeof (window.dhtmlXRibbon) == "function" && this.conf.ribbon != null && this.conf.ribbon instanceof window.dhtmlXRibbon && this.conf.id != null) {
        if (!(this.conf.id instanceof Array)) {
            this.conf.id = [this.conf.id]
        }
        this.skinParent = this.conf.ribbon.conf.skin;
        this._doOnRibbonClick = function (h) {
            for (var a = 0; a < g.conf.id.length; a++) {
                if (h == g.conf.id[a]) {
                    if (h != g._lastId) {
                        g.show(h);
                        g._clearClick = true
                    }
                }
            }
        };
        if (typeof (dhtmlXRibbon.prototype._getItemDim) == "undefined") {
            dhtmlXRibbon.prototype._getItemDim = function (j) {
                var a = this._items[j].base;
                var h = {
                    left: window.dhx4.absLeft(a),
                    top: window.dhx4.absTop(a),
                    width: a.offsetWidth,
                    height: a.offsetHeight
                };
                a = null;
                return h
            }
        }
        this.conf.ribbonEvent = this.conf.ribbon.attachEvent("_showPopup", this._doOnRibbonClick)
    }
    if (typeof (window.dhtmlXForm) == "function" && this.conf.form != null && this.conf.form instanceof window.dhtmlXForm && this.conf.id != null) {
        if (!(this.conf.id instanceof Array)) {
            this.conf.id = [this.conf.id]
        }
        if (!this.conf.mode) {
            this.mode = "right"
        }
        this.skinParent = this.conf.form.skin;
        if (typeof (dhtmlXForm.prototype._getItemDim) == "undefined") {
            dhtmlXForm.prototype._getItemDim = function (a, h) {
                return this.doWithItem(a, "_getDim")
            };
            for (var c in {
                input: 1,
                password: 1,
                select: 1,
                multiselect: 1,
                checkbox: 1,
                radio: 1,
                button: 1,
                combo: 1,
                btn2state: 1,
                calendar: 1,
                colorpicker: 1,
                editor: 1
            }) {
                if (dhtmlXForm.prototype.items[c] != null) {
                    dhtmlXForm.prototype.items[c]._getDim = function (h) {
                        var a = h;
                        if ({
                            ta: true,
                            pw: true,
                            se: true,
                            calendar: true,
                            colorpicker: 1,
                            editor: true
                        }[h._type]) {
                            a = h.childNodes[h._ll ? 1 : 0].childNodes[0]
                        }
                        if ({
                            ch: true,
                            ra: true,
                            btn2state: true
                        }[h._type]) {
                            a = h.childNodes[h._ll ? 1 : 0].childNodes[1]
                        }
                        if ({
                            bt: true
                        }[h._type]) {
                            a = h.firstChild
                        }
                        if ({
                            combo: true
                        }[h._type]) {
                            a = h._combo.DOMParent.firstChild
                        }
                        var j = {
                            left: window.dhx4.absLeft(a),
                            top: window.dhx4.absTop(a),
                            width: a.offsetWidth,
                            height: a.offsetHeight
                        };
                        a = null;
                        return j
                    }
                }
            }
        }
    }
    if (typeof (window.dhtmlXSlider) == "function" && this.conf.slider != null && this.conf.slider instanceof window.dhtmlXSlider) {
        if (!this.conf.mode) {
            this.mode = "top"
        }
        this.conf.slider_tm = null;
        this._sliderShow = function () {
            if (g.conf.slider_tm) {
                window.clearTimeout(g.conf.slider_tm)
            }
            var a = g.conf.slider._r_actv;
            if (a != null) {
                var h = {
                    left: window.dhx4.absLeft(a),
                    top: window.dhx4.absTop(a),
                    width: a.offsetWidth,
                    height: a.offsetHeight
                };
                g.show(h.left, h.top, h.width, h.height);
                a = null
            }
        };
        this._sliderHide = function () {
            g.conf.slider_tm = window.setTimeout(function () {
                g.hide()
            }, 200)
        };
        this.conf.slider_events = [this.conf.slider.attachEvent("onMouseDown", this._sliderShow), this.conf.slider.attachEvent("onMouseUp", this._sliderHide), this.conf.slider.attachEvent("onChange", this._sliderShow)]
    }
    this.setSkin(this.skinParent || this.conf.skin || window.dhx4.skin || (typeof (dhtmlx) != "undefined" ? dhtmlx.skin : null) || window.dhx4.skinDetect("dhx_popup") || "dhx_skyblue");
    return this
}

dhtmlXPopup.prototype.attachObject = function (a) {
    return this._attachNode("object", {
        obj: a
    })
};
dhtmlXPopup.prototype._attach_init_object = function (a) {
    this._nodeObj = (typeof (a.obj) == "string" ? document.getElementById(a.obj) : a.obj);
    a.obj = null;
    document.getElementById(this._nodeId).appendChild(this._nodeObj);
    this._nodeObj.style.display = "";
    this._nodeObj.style.visibility = "visible"
};
dhtmlXPopup.prototype.attachHTML = function (a) {
    return this._attachNode("html", {
        html: a
    })
};
dhtmlXPopup.prototype._attach_init_html = function (a) {
    document.getElementById(this._nodeId).innerHTML = a.html;
    this._nodeObj = {
        text: a.html
    }
};
dhtmlXPopup.prototype.attachForm = function (c, a) {
    return this._attachNode("form", {
        struct: c,
        width: a
    })
};
dhtmlXPopup.prototype._attach_init_form = function (c) {
    var a = this;
    this._nodeObj = new dhtmlXForm(this._nodeId, c.struct);
    this._nodeObj.setSkin(this.conf.skin);
    this._nodeObj.attachEvent("_onBeforeEditorAccess", function () {
        a._clearClick = true
    });
    if (this.conf.editorEv != null && this.checkEvent(this.conf.editorEv) == false) {
        this.conf.editorEv = null
    }
    if (dhtmlXForm.prototype.items.editor != null && this.conf.editorEv == null) {
        this.conf.editorEv = this.attachEvent("onShow", function () {
            var h = dhtmlXForm.prototype.items.editor.editor;
            for (var e in h) {
                var j = h[e].base;
                var g = false;
                while (j != null) {
                    if (j == this.p) {
                        g = true;
                        j = null
                    } else {
                        j = j.parentNode
                    }
                }
                j = null;
                if (g == true) {
                    h[e].cell.conf.cells_cont = null;
                    h[e].setSizes()
                }
            }
            h = null;
            this.detachEvent(this.conf.editorEv);
            this.conf.editorEv = null
        });
        if (this._nodeObjEv == null) {
            this._nodeObjEv = []
        }
        this._nodeObjEv.push(this.conf.editorEv)
    }
};
dhtmlXPopup.prototype.attachCalendar = function (a) {
    return this._attachNode("calendar", a || {})
};
dhtmlXPopup.prototype._attach_init_calendar = function (a) {
    if (a["double"] == true) {
        this._nodeObj = new dhtmlXDoubleCalendarObject(this._nodeId);
        this._nodeObj.leftCalendar.setSkin(this.conf.skin);
        this._nodeObj.rightCalendar.setSkin(this.conf.skin)
    } else {
        this._nodeObj = new dhtmlXCalendarObject(this._nodeId);
        this._nodeObj.setSkin(this.conf.skin)
    }
    this._nodeObj.show()
};
dhtmlXPopup.prototype.attachGrid = function (c, a) {
    return this._attachNode("grid", {
        width: c || 400,
        height: a || 200
    })
};
dhtmlXPopup.prototype._attach_init_grid = function () {
    this._nodeObj = new dhtmlXGridObject(this._nodeId);
    this._nodeObj.setSkin(this.conf.skin)
};
dhtmlXPopup.prototype.attachTree = function (e, c, a) {
    return this._attachNode("tree", {
        width: e || 400,
        height: c || 200,
        rootId: a || 0
    })
};
dhtmlXPopup.prototype._attach_init_tree = function (a) {
    this._nodeObj = new dhtmlXTreeObject(this._nodeId, "100%", "100%", (a.rootId))
};
dhtmlXPopup.prototype.attachLayout = function (c, a, e) {
    return this._attachNode("layout", {
        width: c || 400,
        height: a || 200,
        pattern: e || "3L"
    })
};
dhtmlXPopup.prototype._attach_init_layout = function (a) {
    this._nodeObj = new dhtmlXLayoutObject(this._nodeId, a.pattern, this.conf.skin)
};
dhtmlXPopup.prototype.attachAccordion = function (e, a, c) {
    return this._attachNode("accordion", {
        width: e || 400,
        height: a || 200,
        conf: c || {}
    })
};
dhtmlXPopup.prototype._attach_init_accordion = function (a) {
    a.conf.parent = this._nodeId;
    a.conf.skin = this.conf.skin;
    this._nodeObj = new dhtmlXAccordion(a.conf)
};
dhtmlXPopup.prototype.attachTabbar = function (e, a, c) {
    if (typeof (c) == "string") {
        c = {
            mode: c
        }
    } else {
        if (typeof (c) != "object" || c == null) {
            c = {}
        }
    }
    return this._attachNode("tabbar", {
        width: e || 400,
        height: a || 200,
        conf: c
    })
};
dhtmlXPopup.prototype._attach_init_tabbar = function (a) {
    a.conf.parent = this._nodeId;
    a.conf.skin = this.conf.skin;
    this._nodeObj = new dhtmlXTabBar(a.conf)
};
dhtmlXPopup.prototype.attachSidebar = function (e, a, c) {
    if (c == null) {
        c = {}
    }
    return this._attachNode("sidebar", {
        width: e || 400,
        height: a || 200,
        conf: c
    })
};
dhtmlXPopup.prototype._attach_init_sidebar = function (a) {
    a.conf.parent = this._nodeId;
    a.conf.skin = this.conf.skin;
    this._nodeObj = new dhtmlXSideBar(a.conf)
};
dhtmlXPopup.prototype.attachEditor = function (e, a, c) {
    return this._attachNode("editor", {
        width: e || 400,
        height: a || 200,
        conf: c || {}
    })
};
dhtmlXPopup.prototype._attach_init_editor = function (c) {
    document.getElementById(this._nodeId).className = "dhxeditor_" + this.conf.skin;
    c.conf.parent = this._nodeId;
    if (c.conf.skin == null) {
        c.conf.skin = this.conf.skin
    }
    this._nodeObj = new dhtmlXEditor(c.conf);
    var a = this.attachEvent("onShow", function () {
        if (this._nodeObj instanceof window.dhtmlXEditor) {
            this._nodeObj.setSizes()
        }
    });
    if (this._nodeObjEv == null) {
        this._nodeObjEv = []
    }
    this._nodeObjEv.push(a)
};
dhtmlXPopup.prototype.attachColorPicker = function (a) {
    if (typeof (a) != "object" || a == null) {
        a = {}
    }
    return this._attachNode("colorpicker", {
        conf: a
    })
};
dhtmlXPopup.prototype._attach_init_colorpicker = function (a) {
    a.conf.skin = this.conf.skin;
    a.conf.parent = this._nodeId;
    this._nodeObj = new dhtmlXColorPicker(a.conf)
};
dhtmlXPopup.prototype.attachCarousel = function (e, a, c) {
    if (c == null) {
        c = {}
    }
    return this._attachNode("carousel", {
        width: e || 400,
        height: a || 300,
        conf: c
    })
};
dhtmlXPopup.prototype._attach_init_carousel = function (a) {
    a.conf.parent = this._nodeId;
    a.conf.skin = this.conf.skin;
    this._nodeObj = new dhtmlXCarousel(a.conf)
};

dhtmlx.DataLoader = {
    _init: function (a) {
        a = a || "";
        this.name = "DataStore";
        this.data = (a.datastore) || (new dhtmlx.DataStore());
        this._readyHandler = this.data.attachEvent("onStoreLoad", dhtmlx.bind(this._call_onready, this))
    },
    load: function (a, c) {
        dhtmlx.AtomDataLoader.load.apply(this, arguments);
        if (!this.data.feed) {
            this.data.feed = function (g, e) {
                if (this._load_count) {
                    return this._load_count = [g, e]
                } else {
                    this._load_count = true
                }
                this.load(a + ((a.indexOf("?") == -1) ? "?" : "&") + "posStart=" + g + "&count=" + e, function () {
                    var h = this._load_count;
                    this._load_count = false;
                    if (typeof h == "object") {
                        this.data.feed.apply(this, h)
                    }
                })
            }
        }
    },
    _onLoad: function (e, c, a) {
        this.data._parse(this.data.driver.toObject(e, c));
        this.callEvent("onXLE", []);
        if (this._readyHandler) {
            this.data.detachEvent(this._readyHandler);
            this._readyHandler = null
        }
    },
    dataFeed_setter: function (a) {
        this.data.attachEvent("onBeforeFilter", dhtmlx.bind(function (l, j) {
            if (this._settings.dataFeed) {
                var h = {};
                if (!l && !h) {
                    return
                }
                if (typeof l == "function") {
                    if (!j) {
                        return
                    }
                    l(j, h)
                } else {
                    h = {
                        text: j
                    }
                }
                this.clearAll();
                var c = this._settings.dataFeed;
                if (typeof c == "function") {
                    return c.call(this, j, h)
                }
                var g = [];
                for (var e in h) {
                    g.push("dhx_filter[" + e + "]=" + encodeURIComponent(h[e]))
                }
                this.load(c + (c.indexOf("?") < 0 ? "?" : "&") + g.join("&"), this._settings.datatype);
                return false
            }
        }, this));
        return a
    },
    _call_onready: function () {
        if (this._settings.ready) {
            var a = dhtmlx.toFunctor(this._settings.ready);
            if (a && a.call) {
                a.apply(this, arguments)
            }
        }
    }
};

dhtmlx.AtomDataLoader = {
    _init: function (a) {
        this.data = {};
        if (a) {
            this._settings.datatype = a.datatype || "json";
            this._after_init.push(this._load_when_ready)
        }
    },
    _load_when_ready: function () {
        this._ready_for_data = true;
        if (this._settings.url) {
            this.url_setter(this._settings.url)
        }
        if (this._settings.data) {
            this.data_setter(this._settings.data)
        }
    },
    url_setter: function (a) {
        if (!this._ready_for_data) {
            return a
        }
        this.load(a, this._settings.datatype);
        return a
    },
    data_setter: function (a) {
        if (!this._ready_for_data) {
            return a
        }
        this.parse(a, this._settings.datatype);
        return true
    },
    load: function (a, c) {
        this.callEvent("onXLS", []);
        if (typeof c == "string") {
            this.data.driver = dhtmlx.DataDriver[c];
            c = arguments[2]
        } else {
            this.data.driver = dhtmlx.DataDriver[this._settings.datatype || "xml"]
        }
        if (window.dhx4) {
            dhx4.ajax.get(a, dhtmlx.bind(function (g) {
                var e = g.xmlDoc;
                var j = e.responseText;
                var h = e.responseXML;
                if (this._onLoad) {
                    this._onLoad.call(this, j, h, e)
                }
                if (c) {
                    c.call(this, j, h, e)
                }
            }, this))
        } else {
            dhtmlx.ajax(a, [this._onLoad, c], this)
        }
    },
    parse: function (c, a) {
        this.callEvent("onXLS", []);
        this.data.driver = dhtmlx.DataDriver[a || "xml"];
        this._onLoad(c, null)
    },
    _onLoad: function (h, c, a) {
        var e = this.data.driver;
        var g = e.getRecords(e.toObject(h, c))[0];
        this.data = (e ? e.getDetails(g) : h);
        this.callEvent("onXLE", [])
    },
    _check_data_feed: function (c) {
        if (!this._settings.dataFeed || this._ignore_feed || !c) {
            return true
        }
        var a = this._settings.dataFeed;
        if (typeof a == "function") {
            return a.call(this, (c.id || c), c)
        }
        a = a + (a.indexOf("?") == -1 ? "?" : "&") + "action=get&id=" + encodeURIComponent(c.id || c);
        this.callEvent("onXLS", []);
        dhtmlx.ajax(a, function (g, e) {
            this._ignore_feed = true;
            this.setValues(dhtmlx.DataDriver.json.toObject(g)[0]);
            this._ignore_feed = false;
            this.callEvent("onXLE", [])
        }, this);
        return false
    }
};
dhtmlx.EventSystem = {
    _init: function () {
        this._events = {};
        this._handlers = {};
        this._map = {}
    },
    block: function () {
        this._events._block = true
    },
    unblock: function () {
        this._events._block = false
    },
    mapEvent: function (a) {
        dhtmlx.extend(this._map, a)
    },
    callEvent: function (e, h) {
        if (this._events._block) {
            return true
        }
        e = e.toLowerCase();
        dhtmlx.assert_event_call(this, e, h);
        var g = this._events[e.toLowerCase()];
        var a = true;
        if (dhtmlx.debug) {
            dhtmlx.log("info", "[" + this.name + "] event:" + e, h)
        }
        if (g) {
            for (var c = 0; c < g.length; c++) {
                if (g[c].apply(this, (h || [])) === false) {
                    a = false
                }
            }
        }
        if (this._map[e] && !this._map[e].callEvent(e, h)) {
            a = false
        }
        return a
    },
    attachEvent: function (c, a, g) {
        c = c.toLowerCase();
        dhtmlx.assert_event_attach(this, c);
        g = g || dhtmlx.uid();
        a = dhtmlx.toFunctor(a);
        var e = this._events[c] || dhtmlx.toArray();
        e.push(a);
        this._events[c] = e;
        this._handlers[g] = {
            f: a,
            t: c
        };
        return g
    },
    detachEvent: function (g) {
        if (this._handlers[g]) {
            var c = this._handlers[g].t;
            var a = this._handlers[g].f;
            var e = this._events[c];
            e.remove(a);
            delete this._handlers[g]
        }
    }
};
if (typeof (window.dhtmlxEvent) == "undefined") {
    function dhtmlxEvent(c, e, a) {
        if (c.addEventListener) {
            c.addEventListener(e, a, false)
        } else {
            if (c.attachEvent) {
                c.attachEvent("on" + e, a)
            }
        }
    }
}
if (dhtmlxEvent.touchDelay == null) {
    dhtmlxEvent.touchDelay = 2000
}
if (typeof (dhtmlxEvent.initTouch) == "undefined") {
    dhtmlxEvent.initTouch = function () {
        var g;
        var h;
        var c, a;
        dhtmlxEvent(document.body, "touchstart", function (j) {
            h = j.touches[0].target;
            c = j.touches[0].clientX;
            a = j.touches[0].clientY;
            g = window.setTimeout(e, dhtmlxEvent.touchDelay)
        });

        function e() {
            if (h) {
                var j = document.createEvent("HTMLEvents");
                j.initEvent("dblclick", true, true);
                h.dispatchEvent(j);
                g = h = null
            }
        }
        dhtmlxEvent(document.body, "touchmove", function (j) {
            if (g) {
                if (Math.abs(j.touches[0].clientX - c) > 50 || Math.abs(j.touches[0].clientY - a) > 50) {
                    window.clearTimeout(g);
                    g = h = false
                }
            }
        });
        dhtmlxEvent(document.body, "touchend", function (j) {
            if (g) {
                window.clearTimeout(g);
                g = h = false
            }
        });
        dhtmlxEvent.initTouch = function () { }
    }
}

if (typeof (window.dhx4._eventable) == "undefined") {
    window.dhx4._eventable = function (a, c) {
        if (c == "clear") {
            a.detachAllEvents();
            a.dhxevs = null;
            a.attachEvent = null;
            a.detachEvent = null;
            a.checkEvent = null;
            a.callEvent = null;
            a.detachAllEvents = null;
            a = null;
            return
        }
        a.dhxevs = {
            data: {}
        };
        a.attachEvent = function (e, h) {
            e = String(e).toLowerCase();
            if (!this.dhxevs.data[e]) {
                this.dhxevs.data[e] = {}
            }
            var g = window.dhx4.newId();
            this.dhxevs.data[e][g] = h;
            return g
        };
        a.detachEvent = function (j) {
            for (var g in this.dhxevs.data) {
                var h = 0;
                for (var e in this.dhxevs.data[g]) {
                    if (e == j) {
                        this.dhxevs.data[g][e] = null;
                        delete this.dhxevs.data[g][e]
                    } else {
                        h++
                    }
                }
                if (h == 0) {
                    this.dhxevs.data[g] = null;
                    delete this.dhxevs.data[g]
                }
            }
        };
        a.checkEvent = function (e) {
            e = String(e).toLowerCase();
            return (this.dhxevs.data[e] != null)
        };
        a.callEvent = function (g, j) {
            g = String(g).toLowerCase();
            if (this.dhxevs.data[g] == null) {
                return true
            }
            var h = true;
            for (var e in this.dhxevs.data[g]) {
                h = this.dhxevs.data[g][e].apply(this, j) && h
            }
            return h
        };
        a.detachAllEvents = function () {
            for (var g in this.dhxevs.data) {
                for (var e in this.dhxevs.data[g]) {
                    this.dhxevs.data[g][e] = null;
                    delete this.dhxevs.data[g][e]
                }
                this.dhxevs.data[g] = null;
                delete this.dhxevs.data[g]
            }
        };
        a = null
    };
    dhx4._eventable(dhx4)
}

function xmlPointer(a) {
    this.d = a
}
xmlPointer.prototype = {
    text: function () {
        if (!_isFF) {
            return this.d.xml
        }
        var a = new XMLSerializer();
        return a.serializeToString(this.d)
    },
    get: function (a) {
        return this.d.getAttribute(a)
    },
    exists: function () {
        return !!this.d
    },
    content: function () {
        return this.d.firstChild ? (this.d.firstChild.wholeText || this.d.firstChild.data) : ""
    },
    each: function (g, l, j, h) {
        var e = this.d.childNodes;
        var m = new xmlPointer();
        if (e.length) {
            for (h = h || 0; h < e.length; h++) {
                if (e[h].tagName == g) {
                    m.d = e[h];
                    if (l.apply(j, [m, h]) == -1) {
                        return
                    }
                }
            }
        }
    },
    get_all: function () {
        var e = {};
        var c = this.d.attributes;
        for (var g = 0; g < c.length; g++) {
            e[c[g].name] = c[g].value
        }
        return e
    },
    sub: function (g) {
        var e = this.d.childNodes;
        var j = new xmlPointer();
        if (e.length) {
            for (var h = 0; h < e.length; h++) {
                if (e[h].tagName == g) {
                    j.d = e[h];
                    return j
                }
            }
        }
    },
    up: function (a) {
        return new xmlPointer(this.d.parentNode)
    },
    set: function (a, c) {
        this.d.setAttribute(a, c)
    },
    clone: function (a) {
        return new xmlPointer(this.d)
    },
    sub_exists: function (e) {
        var c = this.d.childNodes;
        if (c.length) {
            for (var g = 0; g < c.length; g++) {
                if (c[g].tagName == e) {
                    return true
                }
            }
        }
        return false
    },
    through: function (e, l, o, h, r) {
        var m = this.d.childNodes;
        if (m.length) {
            for (var g = 0; g < m.length; g++) {
                if (m[g].tagName == e && m[g].getAttribute(l) != null && m[g].getAttribute(l) != "" && (!o || m[g].getAttribute(l) == o)) {
                    var j = new xmlPointer(m[g]);
                    h.apply(r, [j, g])
                }
                var n = this.d;
                this.d = m[g];
                this.through(e, l, o, h, r);
                this.d = n
            }
        }
    }
};


function dhtmlXTreeObject(l, h, c, a) {
    if (dhtmlxEvent.initTouch) {
        dhtmlxEvent.initTouch()
    }
    //if (_isIE) {
    //    try {
    //        document.execCommand("BackgroundImageCache", false, true)
    //    } catch (j) {}
    //}
    if (typeof(l) != "object") {
        this.parentObject = document.getElementById(l)
    } else {
        this.parentObject = l
    }
    this.parentObject.style.overflow = "hidden";
    this._itim_dg = true;
    this.dlmtr = ",";
    this.dropLower = false;
    this.enableIEImageFix(true);
    this.xmlstate = 0;
    this.mytype = "tree";
    this.smcheck = true;
    this.width = h;
    this.height = c;
    this.rootId = a;
    this.childCalc = null;
    this.def_img_x = "18px";
    this.def_img_y = "18px";
    this.def_line_img_x = "18px";
    this.def_line_img_y = "24px";
    this._dragged = new Array();
    this._selected = new Array();
    this.style_pointer = "pointer";
    this._aimgs = true;
    this.htmlcA = " [";
    this.htmlcB = "]";
    this.lWin = window;
    this.cMenu = 0;
    this.mlitems = 0;
    this.iconURL = "";
    this.dadmode = 0;
    this.slowParse = false;
    this.autoScroll = true;
    this.hfMode = 0;
    this.nodeCut = new Array();
    this.XMLsource = 0;
    this.XMLloadingWarning = 0;
    this._idpull = {};
    this._pullSize = 0;
    this.treeLinesOn = true;
    this.tscheck = false;
    this.timgen = true;
    this.dpcpy = false;
    this._ld_id = null;
    this._dynDeleteBranches = {};
    this._oie_onXLE = [];
    this.imPath = window.dhx_globalImgPath || "";
    this.checkArray = new Array("iconUncheckAll.gif", "iconCheckAll.gif", "iconCheckGray.gif", "iconUncheckDis.gif", "iconCheckDis.gif", "iconCheckDis.gif");
    this.radioArray = new Array("radio_off.gif", "radio_on.gif", "radio_on.gif", "radio_off.gif", "radio_on.gif", "radio_on.gif");
    this.lineArray = new Array("line2.gif", "line3.gif", "line4.gif", "blank.gif", "blank.gif", "line1.gif");
    this.minusArray = new Array("minus2.gif", "minus3.gif", "minus4.gif", "minus.gif", "minus5.gif");
    this.plusArray = new Array("plus2.gif", "plus3.gif", "plus4.gif", "plus.gif", "plus5.gif");
    this.imageArray = new Array("leaf.gif", "folderOpen.gif", "folderClosed.gif");
    this.cutImg = new Array(0, 0, 0);
    this.cutImage = "but_cut.gif";
    dhx4._eventable(this);
//    this.dragger = new dhtmlDragAndDropObject();
    this.htmlNode = new dhtmlXTreeItemObject(this.rootId, "", 0, this);
    this.htmlNode.htmlNode.childNodes[0].childNodes[0].style.display = "none";
    this.htmlNode.htmlNode.childNodes[0].childNodes[0].childNodes[0].className = "hiddenRow";
    this.allTree = this._createSelf();
    this.allTree.appendChild(this.htmlNode.htmlNode);
    //if (dhtmlx.$customScroll) {
    //    dhtmlx.CustomScroll.enable(this)
    //}
    //if (_isFF) {
    //    this.allTree.childNodes[0].width = "100%";
    //    this.allTree.childNodes[0].style.overflow = "hidden"
    //}
    var g = this;
    this.allTree.onselectstart = new Function("return false;");
    //if (_isMacOS) {
    //    this.allTree.oncontextmenu = function(m) {
    //        return g._doContClick(m || window.event, true)
    //    }
    //}
    this.allTree.onmousedown = function(m) {
        return g._doContClick(m || window.event)
    };
    this.XMLLoader = this._parseXMLTree;
    //if (_isIE) {
    //    this.preventIECashing(true)
    //}
    this.selectionBar = document.createElement("DIV");
    this.selectionBar.className = "selectionBar";
    this.selectionBar.innerHTML = "&nbsp;";
    this.selectionBar.style.display = "none";
    this.allTree.appendChild(this.selectionBar);
    if (window.addEventListener) {
        window.addEventListener("unload", function() {
            try {
                g.destructor()
            } catch (m) {}
        }, false)
    }
    if (window.attachEvent) {
        window.attachEvent("onunload", function() {
            try {
                g.destructor()
            } catch (m) {}
        })
    }
    this.setImagesPath = this.setImagePath;
    this.setIconsPath = this.setIconPath;
    //if (dhtmlx.image_path) {
    //    this.setImagePath(dhtmlx.image_path)
    //}
    this.setSkin(window.dhx4.skin || (typeof(dhtmlx) != "undefined" ? dhtmlx.skin : null) || window.dhx4.skinDetect("dhxtree") || "dhx_skyblue");
    return this
}

dhtmlXTreeObject.prototype.setDataMode = function(a) {
    this._datamode = a
};
dhtmlXTreeObject.prototype._doContClick = function(l, a) {
    if (!a && l.button != 2) {
        if (this._acMenu) {
            if (this._acMenu.hideContextMenu) {
                this._acMenu.hideContextMenu()
            } else {
                this.cMenu._contextEnd()
            }
        }
        return true
    }
    var c = (_isIE ? l.srcElement : l.target);
    while ((c) && (c.tagName != "BODY")) {
        if (c.parentObject) {
            break
        }
        c = c.parentNode
    }
    if ((!c) || (!c.parentObject)) {
        return true
    }
    var h = c.parentObject;
    if (!this.callEvent("onRightClick", [h.id, l])) {
        (l.srcElement || l.target).oncontextmenu = function(o) {
            (o || event).cancelBubble = true;
            return false
        }
    }
    this._acMenu = (h.cMenu || this.cMenu);
    if (this._acMenu) {
        if (!(this.callEvent("onBeforeContextMenu", [h.id]))) {
            return true
        }
        if (!_isMacOS) {
            (l.srcElement || l.target).oncontextmenu = function(o) {
                (o || event).cancelBubble = true;
                return false
            }
        }
        if (this._acMenu.showContextMenu) {
            var g = window.document.documentElement;
            var e = window.document.body;
            var m = new Array((g.scrollLeft || e.scrollLeft), (g.scrollTop || e.scrollTop));
            if (_isIE) {
                var n = l.clientX + m[0];
                var j = l.clientY + m[1]
            } else {
                var n = l.pageX;
                var j = l.pageY
            }
            this._acMenu.showContextMenu(n - 1, j - 1);
            this.contextID = h.id;
            l.cancelBubble = true;
            this._acMenu._skip_hide = true
        } else {
            c.contextMenuId = h.id;
            c.contextMenu = this._acMenu;
            c.a = this._acMenu._contextStart;
            c.a(c, l);
            c.a = null
        }
        return false
    }
    return true
};
dhtmlXTreeObject.prototype.enableIEImageFix = function(a) {
    if (!a) {
        this._getImg = function(c) {
            return document.createElement((c == this.rootId) ? "div" : "img")
        };
        this._setSrc = function(e, c) {
            e.src = c
        };
        this._getSrc = function(c) {
            return c.src
        }
    } else {
        this._getImg = function() {
            var c = document.createElement("DIV");
            c.innerHTML = "&nbsp;";
            c.className = "dhx_bg_img_fix";
            return c
        };
        this._setSrc = function(e, c) {
            e.style.backgroundImage = "url(" + c + ")"
        };
        this._getSrc = function(c) {
            var e = c.style.backgroundImage;
            return e.substr(4, e.length - 5).replace(/(^")|("$)/g, "")
        }
    }
};
dhtmlXTreeObject.prototype.destructor = function() {
    for (var c in this._idpull) {
        var e = this._idpull[c];
        if (!e) {
            continue
        }
        e.parentObject = null;
        e.treeNod = null;
        e.childNodes = null;
        e.span = null;
        e.tr.nodem = null;
        e.tr = null;
        e.htmlNode.objBelong = null;
        e.htmlNode = null;
        this._idpull[c] = null
    }
    this.parentObject.innerHTML = "";
    this.allTree.onselectstart = null;
    this.allTree.oncontextmenu = null;
    this.allTree.onmousedown = null;
    for (var c in this) {
        this[c] = null
    }
};

function cObject() {
    return this
}
cObject.prototype = new Object;
cObject.prototype.clone = function() {
    function a() {}
    a.prototype = this;
    return new a()
};

function dhtmlXTreeItemObject(j, c, e, a, g, h) {
    this.htmlNode = "";
    this.acolor = "";
    this.scolor = "";
    this.tr = 0;
    this.childsCount = 0;
    this.tempDOMM = 0;
    this.tempDOMU = 0;
    this.dragSpan = 0;
    this.dragMove = 0;
    this.span = 0;
    this.closeble = 1;
    this.childNodes = new Array();
    this.userData = new cObject();
    this.checkstate = 0;
    this.treeNod = a;
    this.label = c;
    this.parentObject = e;
    this.actionHandler = g;
    this.images = new Array(a.imageArray[0], a.imageArray[1], a.imageArray[2]);
    this.id = a._globalIdStorageAdd(j, this);
    if (this.treeNod.checkBoxOff) {
        this.htmlNode = this.treeNod._createItem(1, this, h)
    } else {
        this.htmlNode = this.treeNod._createItem(0, this, h)
    }
    this.htmlNode.objBelong = this;
    return this
}
dhtmlXTreeObject.prototype._globalIdStorageAdd = function(c, a) {
    if (this._globalIdStorageFind(c, 1, 1)) {
        c = c + "_" + (new Date()).valueOf();
        return this._globalIdStorageAdd(c, a)
    }
    this._idpull[c] = a;
    this._pullSize++;
    return c
};
dhtmlXTreeObject.prototype._globalIdStorageSub = function(a) {
    if (this._idpull[a]) {
        this._unselectItem(this._idpull[a]);
        this._idpull[a] = null;
        this._pullSize--
    }
    if ((this._locker) && (this._locker[a])) {
        this._locker[a] = false
    }
};
dhtmlXTreeObject.prototype._globalIdStorageFind = function(l, a, e, g) {
    var h = this._idpull[l];
    if (h) {
        if ((h.unParsed) && (!e)) {
            this.reParse(h, 0)
        }
        if (this._srnd && !h.htmlNode) {
            this._buildSRND(h, e)
        }
        if ((g) && (this._edsbpsA)) {
            for (var c = 0; c < this._edsbpsA.length; c++) {
                if (this._edsbpsA[c][2] == l) {
                    dhx4.callEvent("ongetItemError", ["Requested item still in parsing process.", l]);
                    return null
                }
            }
        }
        return h
    }
    if ((this.slowParse) && (l != 0) && (!a)) {
        return this.preParse(l)
    } else {
        return null
    }
};
dhtmlXTreeObject.prototype._getSubItemsXML = function(a) {
    var c = [];
    a.each("item", function(e) {
        c.push(e.get("id"))
    }, this);
    return c.join(this.dlmtr)
};
dhtmlXTreeObject.prototype.enableSmartXMLParsing = function(a) {
    this.slowParse = dhx4.s2b(a)
};
dhtmlXTreeObject.prototype.findXML = function(c, a, e) {};
dhtmlXTreeObject.prototype._getAllCheckedXML = function(c, a, g) {
    var e = [];
    if (g == 2) {
        c.through("item", "checked", -1, function(h) {
            e.push(h.get("id"))
        }, this)
    }
    if (g == 1) {
        c.through("item", "id", null, function(h) {
            if (h.get("checked") && (h.get("checked") != -1)) {
                e.push(h.get("id"))
            }
        }, this)
    }
    if (g == 0) {
        c.through("item", "id", null, function(h) {
            if (!h.get("checked") || h.get("checked") == 0) {
                e.push(h.get("id"))
            }
        }, this)
    }
    if (e.length) {
        return a + (a ? this.dlmtr : "") + e.join(this.dlmtr)
    }
    if (a) {
        return a
    } else {
        return ""
    }
};
dhtmlXTreeObject.prototype._setSubCheckedXML = function(a, c) {
    var e = a ? "1" : "";
    c.through("item", "id", null, function(g) {
        if (!g.get("disabled") || g.get("disabled") == 0) {
            g.set("checked", e)
        }
    }, this)
};
dhtmlXTreeObject.prototype._getAllScraggyItemsXML = function(e, a) {
    var g = [];
    var c = function(h) {
        if (!h.sub_exists("item")) {
            g.push(h.get("id"))
        } else {
            h.each("item", c, this)
        }
    };
    c(e);
    return g.join(",")
};
dhtmlXTreeObject.prototype._getAllFatItemsXML = function(e, a) {
    var g = [];
    var c = function(h) {
        if (!h.sub_exists("item")) {
            return
        }
        g.push(h.get("id"));
        h.each("item", c, this)
    };
    c(e);
    return g.join(",")
};
dhtmlXTreeObject.prototype._getAllSubItemsXML = function(e, c, a) {
    var c = [];
    a.through("item", "id", null, function(g) {
        c.push(g.get("id"))
    }, this);
    return c.join(",")
};
dhtmlXTreeObject.prototype.reParse = function(e) {
    var j = this;
    if (!this.parsCount) {
        j.callEvent("onXLS", [j, e.id])
    }
    this.xmlstate = 1;
    var g = e.unParsed;
    e.unParsed = 0;
    this.XMLloadingWarning = 1;
    var a = this.parsingOn;
    var l = this.waitUpdateXML;
    var m = this.parsedArray;
    this.parsedArray = new Array();
    this.waitUpdateXML = false;
    this.parsingOn = e.id;
    this.parsedArray = new Array();
    this.setCheckList = "";
    this._parse(g, e.id, 2);
    var o = this.setCheckList.split(this.dlmtr);
    for (var h = 0; h < this.parsedArray.length; h++) {
        e.htmlNode.childNodes[0].appendChild(this.parsedArray[h])
    }
    if (g.get("order") && g.get("order") != "none") {
        this._reorderBranch(e, g.get("order"), true)
    }
    this.oldsmcheck = this.smcheck;
    this.smcheck = false;
    for (var c = 0; c < o.length; c++) {
        if (o[c]) {
            this.setCheck(o[c], 1)
        }
    }
    this.smcheck = this.oldsmcheck;
    this.parsingOn = a;
    this.waitUpdateXML = l;
    this.parsedArray = m;
    this.XMLloadingWarning = 0;
    this._redrawFrom(this, e);
    if (this._srnd && !e._sready) {
        this.prepareSR(e.id)
    }
    this.xmlstate = 0;
    return true
};
dhtmlXTreeObject.prototype.preParse = function(c) {
    if (!c || !this._p) {
        return null
    }
    var a = false;
    this._p.clone().through("item", "id", c, function(g) {
        this._globalIdStorageFind(g.up().get("id"));
        return a = true
    }, this);
    if (a) {
        var e = this._globalIdStorageFind(c, true, false);
        if (!e) {
            dhx4.callEvent("ongetItemError", ["The item " + c + " not operable. Seems you have non-unique|incorrect IDs in tree's XML.", c])
        }
    }
    return e
};
dhtmlXTreeObject.prototype._escape = function(a) {
    switch (this.utfesc) {
        case "none":
            return a;
            break;
        case "utf8":
            return encodeURIComponent(a);
            break;
        default:
            return escape(a);
            break
    }
};
dhtmlXTreeObject.prototype._drawNewTr = function(h, e) {
    var g = document.createElement("tr");
    var c = document.createElement("td");
    var a = document.createElement("td");
    c.appendChild(document.createTextNode(" "));
    a.colSpan = 3;
    a.appendChild(h);
    g.appendChild(c);
    g.appendChild(a);
    return g
};


dhtmlXTreeObject.prototype._loadJSONObject = function (a, c) {
    if (!this.parsCount) {
        this.callEvent("onXLS", [this, null])
    }
    this.xmlstate = 1;
    var e = new jsonPointer(a);
    this._parse(e);
    this._p = e;
    if (c) {
        c()
    }
};

dhtmlXTreeObject.prototype.parse = function(g, e, a) {
    if (typeof e == "string") {
        a = e;
        e = null
    }
    if (a === "json") {
        return this._loadJSONObject(g, e)
    } else {
        if (a === "csv") {
            return this._loadCSVString(g, e)
        } else {
            if (a === "jsarray") {
                return this._loadJSArray(g, e)
            }
        }
    }
    var c = this;
    if (!this.parsCount) {
        this.callEvent("onXLS", [c, null])
    }
    this.xmlstate = 1;
    this.XMLLoader({
        responseXML: dhx4.ajax.parse(g)
    }, e)
};
dhtmlXTreeObject.prototype.loadXMLString = function() {
    if (window.console && window.console.info) {
        window.console.info("loadXMLString was deprecated", "http://docs.dhtmlx.com/migration__index.html#migrationfrom43to44")
    }
    return this.parse.apply(this, arguments)
};
dhtmlXTreeObject.prototype.load = function(c, h, e) {
    if (typeof h == "string") {
        e = h;
        h = null
    }
    e = e || this._datamode;
    if (e === "json") {
        return this._loadJSON(c, h)
    } else {
        if (e === "csv") {
            return this._loadCSV(c, h)
        } else {
            if (e === "jsarray") {
                return this._loadJSArrayFile(xmlString, h)
            }
        }
    }
    var g = this;
    if (!this.parsCount) {
      //  console.log(this.constructor.name);
        this.callEvent("onXLS", [g, this._ld_id])
    }
    this._ld_id = null;
    this.xmlstate = 1;
    this.XMLLoader = this._parseXMLTree;
    var a = this;
    dhx4.ajax.get(c, function(j) {
        a.XMLLoader(j.xmlDoc, h);
        a = null
    })
};
dhtmlXTreeObject.prototype.loadXML = function() {
    if (window.console && window.console.info) {
        window.console.info("loadXML was deprecated", "http://docs.dhtmlx.com/migration__index.html#migrationfrom43to44")
    }
    return this.load.apply(this, arguments)
};
dhtmlXTreeObject.prototype._attachChildNode = function(l, j, g, m, D, C, A, o, e, u, v) {
    if (u && u.parentObject) {
        l = u.parentObject
    }
    if (((l.XMLload == 0) && (this.XMLsource)) && (!this.XMLloadingWarning)) {
        l.XMLload = 1;
        this._loadDynXML(l.id)
    }
    var r = l.childsCount;
    var E = l.childNodes;
    if (v && v.tr.previousSibling) {
        if (v.tr.previousSibling.previousSibling) {
            u = v.tr.previousSibling.nodem
        } else {
            o = o.replace("TOP", "") + ",TOP"
        }
    }
    if (u) {
        var h, y;
        for (h = 0; h < r; h++) {
            if (E[h] == u) {
                for (y = r; y != h; y--) {
                    E[1 + y] = E[y]
                }
                break
            }
        }
        h++;
        r = h
    }
    if (o) {
        var w = o.split(",");
        for (var x = 0; x < w.length; x++) {
            switch (w[x]) {
                case "TOP":
                    if (l.childsCount > 0) {
                        u = new Object;
                        u.tr = l.childNodes[0].tr.previousSibling
                    }
                    l._has_top = true;
                    for (h = r; h > 0; h--) {
                        E[h] = E[h - 1]
                    }
                    r = 0;
                    break
            }
        }
    }
    var s;
    if (!(s = this._idpull[j]) || s.span != -1) {
        s = E[r] = new dhtmlXTreeItemObject(j, g, l, this, m, 1);
        j = E[r].id;
        l.childsCount++
    }
    if (!s.htmlNode) {
        s.label = g;
        s.htmlNode = this._createItem((this.checkBoxOff ? 1 : 0), s);
        s.htmlNode.objBelong = s
    }
    if (D) {
        s.images[0] = D
    }
    if (C) {
        s.images[1] = C
    }
    if (A) {
        s.images[2] = A
    }
    var c = this._drawNewTr(s.htmlNode);
    if ((this.XMLloadingWarning) || (this._hAdI)) {
        s.htmlNode.parentNode.parentNode.style.display = "none"
    }
    if ((u) && u.tr && (u.tr.nextSibling)) {
        l.htmlNode.childNodes[0].insertBefore(c, u.tr.nextSibling)
    } else {
        if (this.parsingOn == l.id) {
            this.parsedArray[this.parsedArray.length] = c
        } else {
            l.htmlNode.childNodes[0].appendChild(c)
        }
    }
    if ((u) && (!u.span)) {
        u = null
    }
    if (this.XMLsource) {
        if ((e) && (e != 0)) {
            s.XMLload = 0
        } else {
            s.XMLload = 1
        }
    }
    s.tr = c;
    c.nodem = s;
    if (l.itemId == 0) {
        c.childNodes[0].className = "hiddenRow"
    }
    if ((l._r_logic) || (this._frbtr)) {
        this._setSrc(s.htmlNode.childNodes[0].childNodes[0].childNodes[1].childNodes[0], this.imPath + this.radioArray[0])
    }
    if (o) {
        var w = o.split(",");
        for (var x = 0; x < w.length; x++) {
            switch (w[x]) {
                case "SELECT":
                    this.selectItem(j, false);
                    break;
                case "CALL":
                    this.selectItem(j, true);
                    break;
                case "CHILD":
                    s.XMLload = 0;
                    break;
                case "CHECKED":
                    if (this.XMLloadingWarning) {
                        this.setCheckList += this.dlmtr + j
                    } else {
                        this.setCheck(j, 1)
                    }
                    break;
                case "HCHECKED":
                    this._setCheck(s, "unsure");
                    break;
                case "OPEN":
                    s.openMe = 1;
                    break
            }
        }
    }
    if (!this.XMLloadingWarning) {
        if ((this._getOpenState(l) < 0) && (!this._hAdI)) {
            this.openItem(l.id)
        }
        if (u) {
            this._correctPlus(u);
            this._correctLine(u)
        }
        this._correctPlus(l);
        this._correctLine(l);
        this._correctPlus(s);
        if (l.childsCount >= 2) {
            this._correctPlus(E[l.childsCount - 2]);
            this._correctLine(E[l.childsCount - 2])
        }
        if (l.childsCount != 2) {
            this._correctPlus(E[0])
        }
        if (this.tscheck) {
            this._correctCheckStates(l)
        }
        if (this._onradh) {
            if (this.xmlstate == 1) {
                var a = this.onXLE;
                this.onXLE = function(n) {
                    this._onradh(j);
                    if (a) {
                        a(n)
                    }
                }
            } else {
                this._onradh(j)
            }
        }
    }
    return s
};
dhtmlXTreeObject.prototype.enableContextMenu = function(a) {
    if (a) {
        this.cMenu = a
    }
};
dhtmlXTreeObject.prototype.setItemContextMenu = function(h, g) {
    var a = h.toString().split(this.dlmtr);
    for (var e = 0; e < a.length; e++) {
        var c = this._globalIdStorageFind(a[e]);
        if (!c) {
            continue
        }
        c.cMenu = g
    }
};
dhtmlXTreeObject.prototype.insertNewItem = function(g, m, o, e, l, j, h, c, a) {
    var r = this._globalIdStorageFind(g);
    if (!r) {
        return (-1)
    }
    var n = this._attachChildNode(r, m, o, e, l, j, h, c, a);
    if (!this._idpull[this.rootId].XMLload) {
        this._idpull[this.rootId].XMLload = 1
    }
    if ((!this.XMLloadingWarning) && (this.childCalc)) {
        this._fixChildCountLabel(r)
    }
    return n
};
dhtmlXTreeObject.prototype.insertNewChild = function(g, m, n, e, l, j, h, c, a) {
    return this.insertNewItem(g, m, n, e, l, j, h, c, a)
};
dhtmlXTreeObject.prototype._parseXMLTree = function(a, e) {
    var c = new xmlPointer(dhx4.ajax.xmltop("tree", a));
    this._parse(c);
    this._p = c;
    if (e) {
        e.call(this, a)
    }
};
dhtmlXTreeObject.prototype._parseItem = function(j, o, h, m) {
    var e;
    if (this._srnd && (!this._idpull[e = j.get("id")] || !this._idpull[e].span)) {
        this._addItemSRND(o.id, e, j);
        return
    }
    var l = j.get_all();
    if ((typeof(this.waitUpdateXML) == "object") && (!this.waitUpdateXML[l.id])) {
        this._parse(j, l.id, 1);
        return
    }
    if ((l.text === null) || (typeof(l.text) == "undefined")) {
        l.text = j.sub("itemtext");
        if (l.text) {
            l.text = l.text.content()
        }
    }
    var s = [];
    if (l.select) {
        s.push("SELECT")
    }
    if (l.top) {
        s.push("TOP")
    }
    if (l.call) {
        this.nodeAskingCall = l.id
    }
    if (l.checked == -1) {
        s.push("HCHECKED")
    } else {
        if (l.checked) {
            s.push("CHECKED")
        }
    }
    if (l.open) {
        s.push("OPEN")
    }
    if (this.waitUpdateXML) {
        if (this._globalIdStorageFind(l.id)) {
            var n = this.updateItem(l.id, l.text, l.im0, l.im1, l.im2, l.checked, l.child)
        } else {
            if (this.npl == 0) {
                s.push("TOP")
            } else {
                h = o.childNodes[this.npl]
            }
            var n = this._attachChildNode(o, l.id, l.text, 0, l.im0, l.im1, l.im2, s.join(","), l.child, 0, h);
            l.id = n.id;
            h = null
        }
    } else {
        var n = this._attachChildNode(o, l.id, l.text, 0, l.im0, l.im1, l.im2, s.join(","), l.child, (m || 0), h)
    }
    if (l.tooltip) {
        n.span.parentNode.parentNode.title = l.tooltip
    }
    if (l.style) {
        if (n.span.style.cssText) {
            n.span.style.cssText += (";" + l.style)
        } else {
            n.span.setAttribute("style", n.span.getAttribute("style") + "; " + l.style)
        }
    }
    if (l.radio) {
        n._r_logic = true
    }
    if (l.nocheckbox) {
        var r = n.span.parentNode.previousSibling.previousSibling;
        r.style.display = "none";
        n.nocheckbox = true
    }
    if (l.disabled) {
        if (l.checked != null) {
            this._setCheck(n, l.checked)
        }
        this.disableCheckbox(n, 1)
    }
    n._acc = l.child || 0;
    if (this.parserExtension) {
        this.parserExtension._parseExtension.call(this, j, l, (o ? o.id : 0))
    }
    this.setItemColor(n, l.aCol, l.sCol);
    if (l.locked == "1") {
        this.lockItem(n.id, true, true)
    }
    if ((l.imwidth) || (l.imheight)) {
        this.setIconSize(l.imwidth, l.imheight, n)
    }
    if ((l.closeable == "0") || (l.closeable == "1")) {
        this.setItemCloseable(n, l.closeable)
    }
    var g = "";
    if (l.topoffset) {
        this.setItemTopOffset(n, l.topoffset)
    }
    if ((!this.slowParse) || (typeof(this.waitUpdateXML) == "object")) {
        if (j.sub_exists("item")) {
            g = this._parse(j, l.id, 1)
        }
    } else {
        if ((!n.childsCount) && j.sub_exists("item")) {
            n.unParsed = j.clone()
        }
        j.each("userdata", function(a) {
            this.setUserData(l.id, a.get("name"), a.content())
        }, this)
    }
    if (g != "") {
        this.nodeAskingCall = g
    }
    j.each("userdata", function(a) {
        this.setUserData(j.get("id"), a.get("name"), a.content())
    }, this)
};
dhtmlXTreeObject.prototype._parse = function(e, j, a, c) {
    if (this._srnd && !this.parentObject.offsetHeight) {
        var v = this;
        return window.setTimeout(function() {
            v._parse(e, j, a, c)
        }, 100)
    }
    //if (!e.exists()) {
    //    return
    //}
    this.skipLock = true;
    if (!j) {
        j = e.get("id");
        if (this._dynDeleteBranches[j]) {
            this.deleteChildItems(j);
            this._dynDeleteBranches[j]--;
            if (!this._dynDeleteBranches[j]) {
                delete this._dynDeleteBranches[j]
            }
        }
        var s = e.get("dhx_security");
        if (s) {
            dhtmlx.security_key = s
        }
        if (e.get("radio")) {
            this.htmlNode._r_logic = true
        }
        this.parsingOn = j;
        this.parsedArray = new Array();
        this.setCheckList = "";
        this.nodeAskingCall = ""
    }
    var u = this._globalIdStorageFind(j);
    if (!u) {
        return dhx4.callEvent("onDataStructureError", ["XML refers to not existing parent"])
    }
    this.parsCount = this.parsCount ? (this.parsCount + 1) : 1;
    this.XMLloadingWarning = 1;
    if ((u.childsCount) && (!c) && (!this._edsbps) && (!u._has_top)) {
        var l = 0
    } else {
        var l = 0
    }
    this.npl = 0;
    e.each("item", function(w, n) {
        u.XMLload = 1;
        this._parseItem(w, u, 0, l);
        if ((this._edsbps) && (this.npl == this._edsbpsC)) {
            this._distributedStart(e, n + 1, j, a, u.childsCount);
            return -1
        }
        this.npl++
    }, this, c);
    if (!a) {
        e.each("userdata", function(n) {
            this.setUserData(e.get("id"), n.get("name"), n.content())
        }, this);
        u.XMLload = 1;
        if (this.waitUpdateXML) {
            this.waitUpdateXML = false;
            for (var h = u.childsCount - 1; h >= 0; h--) {
                if (u.childNodes[h]._dmark) {
                    this.deleteItem(u.childNodes[h].id)
                }
            }
        }
        var o = this._globalIdStorageFind(this.parsingOn);
        for (var h = 0; h < this.parsedArray.length; h++) {
            u.htmlNode.childNodes[0].appendChild(this.parsedArray[h])
        }
        this.parsedArray = [];
        this.lastLoadedXMLId = j;
        this.XMLloadingWarning = 0;
        var r = this.setCheckList.split(this.dlmtr);
        for (var g = 0; g < r.length; g++) {
            if (r[g]) {
                this.setCheck(r[g], 1)
            }
        }
        if ((this.XMLsource) && (this.tscheck) && (this.smcheck) && (u.id != this.rootId)) {
            if (u.checkstate === 0) {
                this._setSubChecked(0, u)
            } else {
                if (u.checkstate === 1) {
                    this._setSubChecked(1, u)
                }
            }
        }
        this._redrawFrom(this, null, c);
        if (e.get("order") && e.get("order") != "none") {
            this._reorderBranch(u, e.get("order"), true)
        }
        if (this.nodeAskingCall != "") {
            this.callEvent("onClick", [this.nodeAskingCall, this.getSelectedItemId()])
        }
        if (this._branchUpdate) {
            this._branchUpdateNext(e)
        }
    }
    if (this.parsCount == 1) {
        this.parsingOn = null;
        if (this._srnd && u.id != this.rootId) {
            this.prepareSR(u.id);
            if (this.XMLsource) {
                this.openItem(u.id)
            }
        }
        e.through("item", "open", null, function(n) {
            this.openItem(n.get("id"))
        }, this);
        if ((!this._edsbps) || (!this._edsbpsA.length)) {
            var m = this;
            window.setTimeout(function() {
                m.callEvent("onXLE", [m, j])
            }, 1);
            this.xmlstate = 0
        }
        this.skipLock = false
    }
    this.parsCount--;
    var m = this;
    if (this._edsbps) {
        window.setTimeout(function() {
            m._distributedStep(j)
        }, this._edsbpsD)
    }
    if (!a && this.onXLE) {
        this.onXLE(this, j)
    }
    return this.nodeAskingCall
};
dhtmlXTreeObject.prototype._branchUpdateNext = function(a) {
    a.each("item", function(g) {
        var e = g.get("id");
        if (this._idpull[e] && (!this._idpull[e].XMLload)) {
            return
        }
        this._branchUpdate++;
        this.smartRefreshItem(g.get("id"), g)
    }, this);
    this._branchUpdate--
};
dhtmlXTreeObject.prototype.checkUserData = function(c, e) {
    if ((c.nodeType == 1) && (c.tagName == "userdata")) {
        var a = c.getAttribute("name");
        if ((a) && (c.childNodes[0])) {
            this.setUserData(e, a, c.childNodes[0].data)
        }
    }
};
dhtmlXTreeObject.prototype._redrawFrom = function(m, c, l, e) {
    if (!c) {
        var h = m._globalIdStorageFind(m.lastLoadedXMLId);
        m.lastLoadedXMLId = -1;
        if (!h) {
            return 0
        }
    } else {
        h = c
    }
    var j = 0;
    for (var g = (l ? l - 1 : 0); g < h.childsCount; g++) {
        if ((!this._branchUpdate) || (this._getOpenState(h) == 1)) {
            if ((!c) || (e == 1)) {
                h.childNodes[g].htmlNode.parentNode.parentNode.style.display = ""
            }
        }
        if (h.childNodes[g].openMe == 1) {
            this._openItem(h.childNodes[g]);
            h.childNodes[g].openMe = 0
        }
        m._redrawFrom(m, h.childNodes[g]);
        if (this.childCalc != null) {
            if ((h.childNodes[g].unParsed) || ((!h.childNodes[g].XMLload) && (this.XMLsource))) {
                if (h.childNodes[g]._acc) {
                    h.childNodes[g].span.innerHTML = h.childNodes[g].label + this.htmlcA + h.childNodes[g]._acc + this.htmlcB
                } else {
                    h.childNodes[g].span.innerHTML = h.childNodes[g].label
                }
            }
            if ((h.childNodes[g].childNodes.length) && (this.childCalc)) {
                if (this.childCalc == 1) {
                    h.childNodes[g].span.innerHTML = h.childNodes[g].label + this.htmlcA + h.childNodes[g].childsCount + this.htmlcB
                }
                if (this.childCalc == 2) {
                    var a = h.childNodes[g].childsCount - (h.childNodes[g].pureChilds || 0);
                    if (a) {
                        h.childNodes[g].span.innerHTML = h.childNodes[g].label + this.htmlcA + a + this.htmlcB
                    }
                    if (h.pureChilds) {
                        h.pureChilds++
                    } else {
                        h.pureChilds = 1
                    }
                }
                if (this.childCalc == 3) {
                    h.childNodes[g].span.innerHTML = h.childNodes[g].label + this.htmlcA + h.childNodes[g]._acc + this.htmlcB
                }
                if (this.childCalc == 4) {
                    var a = h.childNodes[g]._acc;
                    if (a) {
                        h.childNodes[g].span.innerHTML = h.childNodes[g].label + this.htmlcA + a + this.htmlcB
                    }
                }
            } else {
                if (this.childCalc == 4) {
                    j++
                }
            }
            j += h.childNodes[g]._acc;
            if (this.childCalc == 3) {
                j++
            }
        }
    }
    if ((!h.unParsed) && ((h.XMLload) || (!this.XMLsource))) {
        h._acc = j
    }
    m._correctLine(h);
    m._correctPlus(h);
    if ((this.childCalc) && (!c)) {
        m._fixChildCountLabel(h)
    }
};
dhtmlXTreeObject.prototype._createSelf = function() {
    var a = document.createElement("div");
    a.className = "containerTableStyle";
    a.style.width = this.width;
    a.style.height = this.height;
    this.parentObject.appendChild(a);
    return a
};
dhtmlXTreeObject.prototype._xcloseAll = function(c) {
    if (c.unParsed) {
        return
    }
    if (this.rootId != c.id) {
        if (!c.htmlNode) {
            return
        }
        var g = c.htmlNode.childNodes[0].childNodes;
        var a = g.length;
        for (var e = 1; e < a; e++) {
            g[e].style.display = "none"
        }
        this._correctPlus(c)
    }
    for (var e = 0; e < c.childsCount; e++) {
        if (c.childNodes[e].childsCount) {
            this._xcloseAll(c.childNodes[e])
        }
    }
};
dhtmlXTreeObject.prototype._xopenAll = function(a) {
    this._HideShow(a, 2);
    for (var c = 0; c < a.childsCount; c++) {
        this._xopenAll(a.childNodes[c])
    }
};
dhtmlXTreeObject.prototype._correctPlus = function(c) {
    if (!c.htmlNode) {
        return
    }
    var e = c.htmlNode.childNodes[0].childNodes[0].childNodes[0].lastChild;
    var h = c.htmlNode.childNodes[0].childNodes[0].childNodes[2].childNodes[0];
    var a = this.lineArray;
    if ((this.XMLsource) && (!c.XMLload)) {
        var a = this.plusArray;
        this._setSrc(h, this.iconURL + c.images[2]);
        if (this._txtimg) {
            return (e.innerHTML = "[+]")
        }
    } else {
        if ((c.childsCount) || (c.unParsed)) {
            if ((c.htmlNode.childNodes[0].childNodes[1]) && (c.htmlNode.childNodes[0].childNodes[1].style.display != "none")) {
                if (!c.wsign) {
                    var a = this.minusArray
                }
                this._setSrc(h, this.iconURL + c.images[1]);
                if (this._txtimg) {
                    return (e.innerHTML = "[-]")
                }
            } else {
                if (!c.wsign) {
                    var a = this.plusArray
                }
                this._setSrc(h, this.iconURL + c.images[2]);
                if (this._txtimg) {
                    return (e.innerHTML = "[+]")
                }
            }
        } else {
            this._setSrc(h, this.iconURL + c.images[0])
        }
    }
    var g = 2;
    if (!c.treeNod.treeLinesOn) {
        this._setSrc(e, this.imPath + a[3])
    } else {
        if (c.parentObject) {
            g = this._getCountStatus(c.id, c.parentObject)
        }
        this._setSrc(e, this.imPath + a[g])
    }
};
dhtmlXTreeObject.prototype._correctLine = function(c) {
    if (!c.htmlNode) {
        return
    }
    var a = c.parentObject;
    if (a) {
        if ((this._getLineStatus(c.id, a) == 0) || (!this.treeLinesOn)) {
            for (var e = 1; e <= c.childsCount; e++) {
                if (!c.htmlNode.childNodes[0].childNodes[e]) {
                    break
                }
                c.htmlNode.childNodes[0].childNodes[e].childNodes[0].style.backgroundImage = "";
                c.htmlNode.childNodes[0].childNodes[e].childNodes[0].style.backgroundRepeat = ""
            }
        } else {
            for (var e = 1; e <= c.childsCount; e++) {
                if (!c.htmlNode.childNodes[0].childNodes[e]) {
                    break
                }
                c.htmlNode.childNodes[0].childNodes[e].childNodes[0].style.backgroundImage = "url(" + this.imPath + this.lineArray[5] + ")";
                c.htmlNode.childNodes[0].childNodes[e].childNodes[0].style.backgroundRepeat = "repeat-y"
            }
        }
    }
};
dhtmlXTreeObject.prototype._getCountStatus = function(c, a) {
    if (a.childsCount <= 1) {
        if (a.id == this.rootId) {
            return 4
        } else {
            return 0
        }
    }
    if (a.childNodes[0].id == c) {
        if (a.id == this.rootId) {
            return 2
        } else {
            return 1
        }
    }
    if (a.childNodes[a.childsCount - 1].id == c) {
        return 0
    }
    return 1
};
dhtmlXTreeObject.prototype._getLineStatus = function(c, a) {
    if (a.childNodes[a.childsCount - 1].id == c) {
        return 0
    }
    return 1
};
dhtmlXTreeObject.prototype._HideShow = function(c, h) {
    if ((this.XMLsource) && (!c.XMLload)) {
        if (h == 1) {
            return
        }
        c.XMLload = 1;
        this._loadDynXML(c.id);
        return
    }
    if (c.unParsed) {
        this.reParse(c)
    }
    var g = c.htmlNode.childNodes[0].childNodes;
    var a = g.length;
    if (a > 1) {
        if (((g[1].style.display != "none") || (h == 1)) && (h != 2)) {
            this.allTree.childNodes[0].border = "1";
            this.allTree.childNodes[0].border = "0";
            nodestyle = "none"
        } else {
            nodestyle = ""
        }
        for (var e = 1; e < a; e++) {
            g[e].style.display = nodestyle
        }
    }
    this._correctPlus(c)
};
dhtmlXTreeObject.prototype._getOpenState = function(a) {
    if (!a.htmlNode) {
        return 0
    }
    var c = a.htmlNode.childNodes[0].childNodes;
    if (c.length <= 1) {
        return 0
    }
    if (c[1].style.display != "none") {
        return 1
    } else {
        return -1
    }
};
dhtmlXTreeObject.prototype.onRowClick2 = function() {
    var a = this.parentObject.treeNod;
    if (!a.callEvent("onDblClick", [this.parentObject.id, a])) {
        return false
    }
    if ((this.parentObject.closeble) && (this.parentObject.closeble != "0")) {
        a._HideShow(this.parentObject)
    } else {
        a._HideShow(this.parentObject, 2)
    }
    if (a.checkEvent("onOpenEnd")) {
        if (!a.xmlstate) {
            a.callEvent("onOpenEnd", [this.parentObject.id, a._getOpenState(this.parentObject)])
        } else {
            a._oie_onXLE.push(a.onXLE);
            a.onXLE = a._epnFHe
        }
    }
    return false
};
dhtmlXTreeObject.prototype.onRowClick = function() {
    var a = this.parentObject.treeNod;
    if (!a.callEvent("onOpenStart", [this.parentObject.id, a._getOpenState(this.parentObject)])) {
        return 0
    }
    if ((this.parentObject.closeble) && (this.parentObject.closeble != "0")) {
        a._HideShow(this.parentObject)
    } else {
        a._HideShow(this.parentObject, 2)
    }
    if (a.checkEvent("onOpenEnd")) {
        if (!a.xmlstate) {
            a.callEvent("onOpenEnd", [this.parentObject.id, a._getOpenState(this.parentObject)])
        } else {
            a._oie_onXLE.push(a.onXLE);
            a.onXLE = a._epnFHe
        }
    }
};
dhtmlXTreeObject.prototype._epnFHe = function(c, e, a) {
    if (e != this.rootId) {
        this.callEvent("onOpenEnd", [e, c.getOpenState(e)])
    }
    c.onXLE = c._oie_onXLE.pop();
    if (!a && !c._oie_onXLE.length) {
        if (c.onXLE) {
            c.onXLE(c, e)
        }
    }
};
dhtmlXTreeObject.prototype.onRowClickDown = function(c) {
    c = c || window.event;
    var a = this.parentObject.treeNod;
    a._selectItem(this.parentObject, c)
};
dhtmlXTreeObject.prototype.getSelectedItemId = function() {
    var c = new Array();
    for (var a = 0; a < this._selected.length; a++) {
        c[a] = this._selected[a].id
    }
    return (c.join(this.dlmtr))
};
dhtmlXTreeObject.prototype._selectItem = function(l, m) {
    if (this.checkEvent("onSelect")) {
        this._onSSCFold = this.getSelectedItemId()
    }
    if ((!this._amsel) || (!m) || ((!m.ctrlKey) && (!m.metaKey) && (!m.shiftKey))) {
        this._unselectItems()
    }
    if ((l.i_sel) && (this._amsel) && (m) && (m.ctrlKey || m.metaKey)) {
        this._unselectItem(l)
    } else {
        if ((!l.i_sel) && ((!this._amselS) || (this._selected.length == 0) || (this._selected[0].parentObject == l.parentObject))) {
            if ((this._amsel) && (m) && (m.shiftKey) && (this._selected.length != 0) && (this._selected[this._selected.length - 1].parentObject == l.parentObject)) {
                var h = this._getIndex(this._selected[this._selected.length - 1]);
                var g = this._getIndex(l);
                if (g < h) {
                    var o = h;
                    h = g;
                    g = o
                }
                for (var j = h; j <= g; j++) {
                    if (!l.parentObject.childNodes[j].i_sel) {
                        this._markItem(l.parentObject.childNodes[j])
                    }
                }
            } else {
                this._markItem(l)
            }
        }
    }
    if (this.checkEvent("onSelect")) {
        var n = this.getSelectedItemId();
        if (n != this._onSSCFold) {
            this.callEvent("onSelect", [n])
        }
    }
};
dhtmlXTreeObject.prototype._markItem = function(a) {
    if (a.scolor) {
        a.span.style.color = a.scolor
    }
    a.span.className = "selectedTreeRow";
    a.i_sel = true;
    this._selected[this._selected.length] = a
};
dhtmlXTreeObject.prototype.getIndexById = function(c) {
    var a = this._globalIdStorageFind(c);
    if (!a) {
        return null
    }
    return this._getIndex(a)
};
dhtmlXTreeObject.prototype._getIndex = function(a) {
    var e = a.parentObject;
    for (var c = 0; c < e.childsCount; c++) {
        if (e.childNodes[c] == a) {
            return c
        }
    }
};
dhtmlXTreeObject.prototype._unselectItem = function(c) {
    if ((c) && (c.i_sel)) {
        c.span.className = "standartTreeRow";
        if (c.acolor) {
            c.span.style.color = c.acolor
        }
        c.i_sel = false;
        for (var a = 0; a < this._selected.length; a++) {
            if (!this._selected[a].i_sel) {
                this._selected.splice(a, 1);
                break
            }
        }
    }
};
dhtmlXTreeObject.prototype._unselectItems = function() {
    for (var a = 0; a < this._selected.length; a++) {
        var c = this._selected[a];
        c.span.className = "standartTreeRow";
        if (c.acolor) {
            c.span.style.color = c.acolor
        }
        c.i_sel = false
    }
    this._selected = new Array()
};
dhtmlXTreeObject.prototype.onRowSelect = function(h, g, l) {
    h = h || window.event;
    var c = this.parentObject;
    if (g) {
        c = g.parentObject
    }
    var a = c.treeNod;
    var j = a.getSelectedItemId();
    if ((!h) || (!h.skipUnSel)) {
        a._selectItem(c, h)
    }
    if (!l) {
        if (c.actionHandler) {
            c.actionHandler(c.id, j)
        } else {
            a.callEvent("onClick", [c.id, j])
        }
    }
};
dhtmlXTreeObject.prototype._correctCheckStates = function(h) {
    if (!this.tscheck) {
        return
    }
    if (!h) {
        return
    }
    if (h.id == this.rootId) {
        return
    }
    var e = h.childNodes;
    var c = 0;
    var a = 0;
    if (h.childsCount == 0) {
        return
    }
    for (var g = 0; g < h.childsCount; g++) {
        if (e[g].dscheck) {
            continue
        }
        if (e[g].checkstate == 0) {
            c = 1
        } else {
            if (e[g].checkstate == 1) {
                a = 1
            } else {
                c = 1;
                a = 1;
                break
            }
        }
    }
    if ((c) && (a)) {
        this._setCheck(h, "unsure")
    } else {
        if (c) {
            this._setCheck(h, false)
        } else {
            this._setCheck(h, true)
        }
    }
    this._correctCheckStates(h.parentObject)
};
dhtmlXTreeObject.prototype.onCheckBoxClick = function(a) {
    if (!this.treeNod.callEvent("onBeforeCheck", [this.parentObject.id, this.parentObject.checkstate])) {
        return
    }
    if (this.parentObject.dscheck) {
        return true
    }
    if (this.treeNod.tscheck) {
        if (this.parentObject.checkstate == 1) {
            this.treeNod._setSubChecked(false, this.parentObject)
        } else {
            this.treeNod._setSubChecked(true, this.parentObject)
        }
    } else {
        if (this.parentObject.checkstate == 1) {
            this.treeNod._setCheck(this.parentObject, false)
        } else {
            this.treeNod._setCheck(this.parentObject, true)
        }
    }
    this.treeNod._correctCheckStates(this.parentObject.parentObject);
    return this.treeNod.callEvent("onCheck", [this.parentObject.id, this.parentObject.checkstate])
};
dhtmlXTreeObject.prototype._createItem = function(s, r, m) {
    var u = document.createElement("table");
    u.cellSpacing = 0;
    u.cellPadding = 0;
    u.border = 0;
    if (this.hfMode) {
        u.style.tableLayout = "fixed"
    }
    u.style.margin = 0;
    u.style.padding = 0;
    var l = document.createElement("tbody");
    var o = document.createElement("tr");
    var g = document.createElement("td");
    g.className = "standartTreeImage";
    if (this._txtimg) {
        var h = document.createElement("div");
        g.appendChild(h);
        h.className = "dhx_tree_textSign"
    } else {
        var h = this._getImg(r.id);
        h.border = "0";
        if (h.tagName == "IMG") {
            h.align = "absmiddle"
        }
        g.appendChild(h);
        h.style.padding = 0;
        h.style.margin = 0;
        h.style.width = this.def_line_img_x
    }
    var e = document.createElement("td");
    var n = this._getImg(this.cBROf ? this.rootId : r.id);
    n.checked = 0;
    this._setSrc(n, this.imPath + this.checkArray[0]);
    n.style.width = "18px";
    n.style.height = "18px";
    if (!s) {
        e.style.display = "none"
    }
    e.appendChild(n);
    if ((!this.cBROf) && (n.tagName == "IMG")) {
        n.align = "absmiddle"
    }
    n.onclick = this.onCheckBoxClick;
    n.treeNod = this;
    n.parentObject = r;
    if (!window._KHTMLrv) {
        e.width = "20px"
    } else {
        e.width = "16px"
    }
    var c = document.createElement("td");
    c.className = "standartTreeImage";
    var j = this._getImg(this.timgen ? r.id : this.rootId);
    j.onmousedown = this._preventNsDrag;
    j.ondragstart = this._preventNsDrag;
    j.border = "0";
    if (this._aimgs) {
        j.parentObject = r;
        if (j.tagName == "IMG") {
            j.align = "absmiddle"
        }
        j.onclick = this.onRowSelect
    }
    if (!m) {
        this._setSrc(j, this.iconURL + this.imageArray[0])
    }
    c.appendChild(j);
    j.style.padding = 0;
    j.style.margin = 0;
    if (this.timgen) {
        c.style.width = j.style.width = this.def_img_x;
        j.style.height = this.def_img_y
    } else {
        j.style.width = "0px";
        j.style.height = "0px";
        if (_isOpera || window._KHTMLrv) {
            c.style.display = "none"
        }
    }
    var a = document.createElement("td");
    a.className = "standartTreeRow";
    r.span = document.createElement("span");
    r.span.className = "standartTreeRow";
    if (this.mlitems) {
        r.span.style.width = this.mlitems;
        r.span.style.display = "block"
    } else {
        a.noWrap = true
    }
    if (dhx4.isIE8) {
        a.style.width = "99999px"
    } else {
        if (!window._KHTMLrv) {
            a.style.width = "100%"
        }
    }
    r.span.innerHTML = r.label;
    a.appendChild(r.span);
    a.parentObject = r;
    g.parentObject = r;
    a.onclick = this.onRowSelect;
    g.onclick = this.onRowClick;
    a.ondblclick = this.onRowClick2;
    if (this.ettip) {
        o.title = r.label
    }
    if (this.dragAndDropOff) {
        if (this._aimgs) {
            this.dragger.addDraggableItem(c, this);
            c.parentObject = r
        }
        this.dragger.addDraggableItem(a, this)
    }
    r.span.style.paddingLeft = "5px";
    r.span.style.paddingRight = "5px";
    a.style.verticalAlign = "";
    a.style.fontSize = "10pt";
    a.style.cursor = this.style_pointer;
    o.appendChild(g);
    o.appendChild(e);
    o.appendChild(c);
    o.appendChild(a);
    l.appendChild(o);
    u.appendChild(l);
    //if (this.ehlt || this.checkEvent("onMouseIn") || this.checkEvent("onMouseOut")) {
    //    o.onmousemove = this._itemMouseIn;
    //    o[(_isIE) ? "onmouseleave" : "onmouseout"] = this._itemMouseOut
    //}
    return u
};
dhtmlXTreeObject.prototype.setImagePath = function(a) {
    this.imPath = a;
    this.iconURL = a
};
dhtmlXTreeObject.prototype.setIconPath = function(a) {
    this.iconURL = a
};
dhtmlXTreeObject.prototype._getLeafCount = function(g) {
    var e = 0;
    for (var c = 0; c < g.childsCount; c++) {
        if (g.childNodes[c].childsCount == 0) {
            e++
        }
    }
    return e
};
dhtmlXTreeObject.prototype._getChildCounterValue = function(c) {
    var a = this._globalIdStorageFind(c);
    if (!a) {
        return 0
    }
    if ((a.unParsed) || ((!a.XMLload) && (this.XMLsource))) {
        return a._acc
    }
    switch (this.childCalc) {
        case 1:
            return a.childsCount;
            break;
        case 2:
            return this._getLeafCount(a);
            break;
        case 3:
            return a._acc;
            break;
        case 4:
            return a._acc;
            break
    }
};
dhtmlXTreeObject.prototype._fixChildCountLabel = function(j, g) {
    if (this.childCalc == null) {
        return
    }
    if ((j.unParsed) || ((!j.XMLload) && (this.XMLsource))) {
        if (j._acc) {
            j.span.innerHTML = j.label + this.htmlcA + j._acc + this.htmlcB
        } else {
            j.span.innerHTML = j.label
        }
        return
    }
    switch (this.childCalc) {
        case 1:
            if (j.childsCount != 0) {
                j.span.innerHTML = j.label + this.htmlcA + j.childsCount + this.htmlcB
            } else {
                j.span.innerHTML = j.label
            }
            break;
        case 2:
            var h = this._getLeafCount(j);
            if (h != 0) {
                j.span.innerHTML = j.label + this.htmlcA + h + this.htmlcB
            } else {
                j.span.innerHTML = j.label
            }
            break;
        case 3:
            if (j.childsCount != 0) {
                var e = 0;
                for (var c = 0; c < j.childsCount; c++) {
                    if (!j.childNodes[c]._acc) {
                        j.childNodes[c]._acc = 0
                    }
                    e += j.childNodes[c]._acc * 1
                }
                e += j.childsCount * 1;
                j.span.innerHTML = j.label + this.htmlcA + e + this.htmlcB;
                j._acc = e
            } else {
                j.span.innerHTML = j.label;
                j._acc = 0
            }
            if ((j.parentObject) && (j.parentObject != this.htmlNode)) {
                this._fixChildCountLabel(j.parentObject)
            }
            break;
        case 4:
            if (j.childsCount != 0) {
                var e = 0;
                for (var c = 0; c < j.childsCount; c++) {
                    if (!j.childNodes[c]._acc) {
                        j.childNodes[c]._acc = 1
                    }
                    e += j.childNodes[c]._acc * 1
                }
                j.span.innerHTML = j.label + this.htmlcA + e + this.htmlcB;
                j._acc = e
            } else {
                j.span.innerHTML = j.label;
                j._acc = 1
            }
            if ((j.parentObject) && (j.parentObject != this.htmlNode)) {
                this._fixChildCountLabel(j.parentObject)
            }
            break
    }
};
dhtmlXTreeObject.prototype.setChildCalcMode = function(a) {
    switch (a) {
        case "child":
            this.childCalc = 1;
            break;
        case "leafs":
            this.childCalc = 2;
            break;
        case "childrec":
            this.childCalc = 3;
            break;
        case "leafsrec":
            this.childCalc = 4;
            break;
        case "disabled":
            this.childCalc = null;
            break;
        default:
            this.childCalc = 4
    }
};
dhtmlXTreeObject.prototype.setChildCalcHTML = function(c, a) {
    this.htmlcA = c;
    this.htmlcB = a
};
dhtmlXTreeObject.prototype.setOnRightClickHandler = function(a) {
    this.attachEvent("onRightClick", a)
};
dhtmlXTreeObject.prototype.setOnClickHandler = function(a) {
    this.attachEvent("onClick", a)
};
dhtmlXTreeObject.prototype.setOnSelectStateChange = function(a) {
    this.attachEvent("onSelect", a)
};
dhtmlXTreeObject.prototype.setXMLAutoLoading = function(a) {
    this.XMLsource = a
};
dhtmlXTreeObject.prototype.setOnCheckHandler = function(a) {
    this.attachEvent("onCheck", a)
};
dhtmlXTreeObject.prototype.setOnOpenHandler = function(a) {
    this.attachEvent("onOpenStart", a)
};
dhtmlXTreeObject.prototype.setOnOpenStartHandler = function(a) {
    this.attachEvent("onOpenStart", a)
};
dhtmlXTreeObject.prototype.setOnOpenEndHandler = function(a) {
    this.attachEvent("onOpenEnd", a)
};
dhtmlXTreeObject.prototype.setOnDblClickHandler = function(a) {
    this.attachEvent("onDblClick", a)
};
dhtmlXTreeObject.prototype.openAllItems = function(c) {
    var a = this._globalIdStorageFind(c);
    if (!a) {
        return 0
    }
    this._xopenAll(a)
};
dhtmlXTreeObject.prototype.getOpenState = function(c) {
    var a = this._globalIdStorageFind(c);
    if (!a) {
        return ""
    }
    return this._getOpenState(a)
};
dhtmlXTreeObject.prototype.closeAllItems = function(c) {
    if (c === window.undefined) {
        c = this.rootId
    }
    var a = this._globalIdStorageFind(c);
    if (!a) {
        return 0
    }
    this._xcloseAll(a);
    this.allTree.childNodes[0].border = "1";
    this.allTree.childNodes[0].border = "0"
};
dhtmlXTreeObject.prototype.setUserData = function(g, c, e) {
    var a = this._globalIdStorageFind(g, 0, true);
    if (!a) {
        return
    }
    if (c == "hint") {
        a.htmlNode.childNodes[0].childNodes[0].title = e
    }
    if (typeof(a.userData["t_" + c]) == "undefined") {
        if (!a._userdatalist) {
            a._userdatalist = c
        } else {
            a._userdatalist += "," + c
        }
    }
    a.userData["t_" + c] = e
};
dhtmlXTreeObject.prototype.getUserData = function(e, c) {
    var a = this._globalIdStorageFind(e, 0, true);
    if (!a) {
        return
    }
    return a.userData["t_" + c]
};
dhtmlXTreeObject.prototype.getItemColor = function(e) {
    var a = this._globalIdStorageFind(e);
    if (!a) {
        return 0
    }
    var c = new Object();
    if (a.acolor) {
        c.acolor = a.acolor
    }
    if (a.scolor) {
        c.scolor = a.scolor
    }
    return c
};
dhtmlXTreeObject.prototype.setItemColor = function(e, c, g) {
    if ((e) && (e.span)) {
        var a = e
    } else {
        var a = this._globalIdStorageFind(e)
    }
    if (!a) {
        return 0
    } else {
        if (a.i_sel) {
            if (g || c) {
                a.span.style.color = g || c
            }
        } else {
            if (c) {
                a.span.style.color = c
            }
        }
        if (g) {
            a.scolor = g
        }
        if (c) {
            a.acolor = c
        }
    }
};
dhtmlXTreeObject.prototype.getItemText = function(c) {
    var a = this._globalIdStorageFind(c);
    if (!a) {
        return 0
    }
    return (a.htmlNode.childNodes[0].childNodes[0].childNodes[3].childNodes[0].innerHTML)
};
dhtmlXTreeObject.prototype.getParentId = function(c) {
    var a = this._globalIdStorageFind(c);
    if ((!a) || (!a.parentObject)) {
        return ""
    }
    return a.parentObject.id
};
dhtmlXTreeObject.prototype.changeItemId = function(c, e) {
    if (c == e) {
        return
    }
    var a = this._globalIdStorageFind(c);
    if (!a) {
        return 0
    }
    a.id = e;
    a.span.contextMenuId = e;
    this._idpull[e] = this._idpull[c];
    delete this._idpull[c]
};
dhtmlXTreeObject.prototype.doCut = function() {
    if (this.nodeCut) {
        this.clearCut()
    }
    this.nodeCut = (new Array()).concat(this._selected);
    for (var a = 0; a < this.nodeCut.length; a++) {
        var c = this.nodeCut[a];
        c._cimgs = new Array();
        c._cimgs[0] = c.images[0];
        c._cimgs[1] = c.images[1];
        c._cimgs[2] = c.images[2];
        c.images[0] = c.images[1] = c.images[2] = this.cutImage;
        this._correctPlus(c)
    }
};
dhtmlXTreeObject.prototype.doPaste = function(e) {
    var a = this._globalIdStorageFind(e);
    if (!a) {
        return 0
    }
    for (var c = 0; c < this.nodeCut.length; c++) {
        if (this._checkPNodes(a, this.nodeCut[c])) {
            continue
        }
        this._moveNode(this.nodeCut[c], a)
    }
    this.clearCut()
};
dhtmlXTreeObject.prototype.clearCut = function() {
    for (var a = 0; a < this.nodeCut.length; a++) {
        var c = this.nodeCut[a];
        c.images[0] = c._cimgs[0];
        c.images[1] = c._cimgs[1];
        c.images[2] = c._cimgs[2];
        this._correctPlus(c)
    }
    this.nodeCut = new Array()
};
dhtmlXTreeObject.prototype._moveNode = function(a, c) {
    var j = this.dadmodec;
    if (j == 1) {
        var h = c;
        if (this.dadmodefix < 0) {
            while (true) {
                h = this._getPrevNode(h);
                if ((h == -1)) {
                    h = this.htmlNode;
                    break
                }
                if ((h.tr == 0) || (h.tr.style.display == "") || (!h.parentObject)) {
                    break
                }
            }
            var g = h;
            var e = c
        } else {
            if ((h.tr) && (h.tr.nextSibling) && (h.tr.nextSibling.nodem) && (this._getOpenState(h) < 1)) {
                h = h.tr.nextSibling.nodem
            } else {
                h = this._getNextNode(h);
                if ((h == -1)) {
                    h = this.htmlNode
                }
            }
            var e = h;
            var g = c
        }
        if (this._getNodeLevel(g, 0) > this._getNodeLevel(e, 0)) {
            if (!this.dropLower) {
                return this._moveNodeTo(a, g.parentObject)
            } else {
                if (e.id != this.rootId) {
                    return this._moveNodeTo(a, e.parentObject, e)
                } else {
                    return this._moveNodeTo(a, this.htmlNode, null)
                }
            }
        } else {
            return this._moveNodeTo(a, e.parentObject, e)
        }
    } else {
        return this._moveNodeTo(a, c)
    }
};
dhtmlXTreeObject.prototype._fixNodesCollection = function(m, j) {
    var c = 0;
    var g = 0;
    var l = m.childNodes;
    var a = m.childsCount - 1;
    if (j == l[a]) {
        return
    }
    for (var h = 0; h < a; h++) {
        if (l[h] == l[a]) {
            l[h] = l[h + 1];
            l[h + 1] = l[a]
        }
    }
    for (var h = 0; h < a + 1; h++) {
        if (c) {
            var e = l[h];
            l[h] = c;
            c = e
        } else {
            if (l[h] == j) {
                c = l[h];
                l[h] = l[a]
            }
        }
    }
};
dhtmlXTreeObject.prototype._recreateBranch = function(j, m, h, a) {
    var c;
    var n = "";
    if (h) {
        for (c = 0; c < m.childsCount; c++) {
            if (m.childNodes[c] == h) {
                break
            }
        }
        if (c != 0) {
            h = m.childNodes[c - 1]
        } else {
            n = "TOP";
            h = ""
        }
    }
    var e = this._onradh;
    this._onradh = null;
    var l = this._attachChildNode(m, j.id, j.label, 0, j.images[0], j.images[1], j.images[2], n, 0, h);
    l._userdatalist = j._userdatalist;
    l.userData = j.userData.clone();
    if (j._attrs) {
        l._attrs = {};
        for (var g in j._attrs) {
            l._attrs[g] = j._attrs[g]
        }
    }
    l.XMLload = j.XMLload;
    if (e) {
        this._onradh = e;
        this._onradh(l.id)
    }
    if (j.treeNod.dpcpy) {
        j.treeNod._globalIdStorageFind(j.id)
    } else {
        l.unParsed = j.unParsed
    }
    this._correctPlus(l);
    for (var c = 0; c < j.childsCount; c++) {
        this._recreateBranch(j.childNodes[c], l, 0, 1)
    }
    if ((!a) && (this.childCalc)) {
        this._redrawFrom(this, m)
    }
    return l
};
dhtmlXTreeObject.prototype._moveNodeTo = function(s, v, r) {
    if (s.treeNod._nonTrivialNode) {
        return s.treeNod._nonTrivialNode(this, v, r, s)
    }
    if (this._checkPNodes(v, s)) {
        return false
    }
    if (v.mytype) {
        var l = (s.treeNod.lWin != v.lWin)
    } else {
        var l = (s.treeNod.lWin != v.treeNod.lWin)
    }
    if (!this.callEvent("onDrag", [s.id, v.id, (r ? r.id : null), s.treeNod, v.treeNod])) {
        return false
    }
    if ((v.XMLload == 0) && (this.XMLsource)) {
        v.XMLload = 1;
        this._loadDynXML(v.id)
    }
    this.openItem(v.id);
    var e = s.treeNod;
    var n = s.parentObject.childsCount;
    var o = s.parentObject;
    if ((l) || (e.dpcpy)) {
        var g = s.id;
        s = this._recreateBranch(s, v, r);
        if (!e.dpcpy) {
            e.deleteItem(g)
        }
    } else {
        var h = v.childsCount;
        var u = v.childNodes;
        if (h == 0) {
            v._open = true
        }
        e._unselectItem(s);
        u[h] = s;
        s.treeNod = v.treeNod;
        v.childsCount++;
        var m = this._drawNewTr(u[h].htmlNode);
        if (!r) {
            v.htmlNode.childNodes[0].appendChild(m);
            if (this.dadmode == 1) {
                this._fixNodesCollection(v, r)
            }
        } else {
            v.htmlNode.childNodes[0].insertBefore(m, r.tr);
            this._fixNodesCollection(v, r);
            u = v.childNodes
        }
    }
    if ((!e.dpcpy) && (!l)) {
        var a = s.tr;
        if ((document.all) && (navigator.appVersion.search(/MSIE\ 5\.0/gi) != -1)) {
            window.setTimeout(function() {
                a.parentNode.removeChild(a)
            }, 250)
        } else {
            s.parentObject.htmlNode.childNodes[0].removeChild(s.tr)
        }
        if ((!r) || (v != s.parentObject)) {
            for (var j = 0; j < o.childsCount; j++) {
                if (o.childNodes[j].id == s.id) {
                    o.childNodes[j] = 0;
                    break
                }
            }
        } else {
            o.childNodes[o.childsCount - 1] = 0
        }
        e._compressChildList(o.childsCount, o.childNodes);
        o.childsCount--
    }
    if ((!l) && (!e.dpcpy)) {
        s.tr = m;
        m.nodem = s;
        s.parentObject = v;
        if (e != v.treeNod) {
            if (s.treeNod._registerBranch(s, e)) {
                return
            }
            this._clearStyles(s);
            this._redrawFrom(this, s.parentObject);
            if (this._onradh) {
                this._onradh(s.id)
            }
        }
        this._correctPlus(v);
        this._correctLine(v);
        this._correctLine(s);
        this._correctPlus(s);
        if (r) {
            this._correctPlus(r)
        } else {
            if (v.childsCount >= 2) {
                this._correctPlus(u[v.childsCount - 2]);
                this._correctLine(u[v.childsCount - 2])
            }
        }
        this._correctPlus(u[v.childsCount - 1]);
        if (this.tscheck) {
            this._correctCheckStates(v)
        }
        if (e.tscheck) {
            e._correctCheckStates(o)
        }
    }
    if (n > 1) {
        e._correctPlus(o.childNodes[n - 2]);
        e._correctLine(o.childNodes[n - 2])
    }
    e._correctPlus(o);
    e._correctLine(o);
    this._fixChildCountLabel(v);
    e._fixChildCountLabel(o);
    this.callEvent("onDrop", [s.id, v.id, (r ? r.id : null), e, v.treeNod]);
    return s.id
};
dhtmlXTreeObject.prototype._clearStyles = function(a) {
    if (!a.htmlNode) {
        return
    }
    var g = a.htmlNode.childNodes[0].childNodes[0].childNodes[1];
    var c = g.nextSibling.nextSibling;
    a.span.innerHTML = a.label;
    a.i_sel = false;
    if (a._aimgs) {
        this.dragger.removeDraggableItem(g.nextSibling)
    }
    if (this.checkBoxOff) {
        g.childNodes[0].style.display = "";
        g.childNodes[0].onclick = this.onCheckBoxClick;
        this._setSrc(g.childNodes[0], this.imPath + this.checkArray[a.checkstate])
    } else {
        g.style.display = "none"
    }
    g.childNodes[0].treeNod = this;
    this.dragger.removeDraggableItem(c);
    if (this.dragAndDropOff) {
        this.dragger.addDraggableItem(c, this)
    }
    if (this._aimgs) {
        this.dragger.addDraggableItem(g.nextSibling, this)
    }
    c.childNodes[0].className = "standartTreeRow";
    c.onclick = this.onRowSelect;
    c.ondblclick = this.onRowClick2;
    g.previousSibling.onclick = this.onRowClick;
    this._correctLine(a);
    this._correctPlus(a);
    for (var e = 0; e < a.childsCount; e++) {
        this._clearStyles(a.childNodes[e])
    }
};
dhtmlXTreeObject.prototype._registerBranch = function(c, a) {
    if (a) {
        a._globalIdStorageSub(c.id)
    }
    c.id = this._globalIdStorageAdd(c.id, c);
    c.treeNod = this;
    for (var e = 0; e < c.childsCount; e++) {
        this._registerBranch(c.childNodes[e], a)
    }
    return 0
};
dhtmlXTreeObject.prototype.enableThreeStateCheckboxes = function(a) {
    this.tscheck = dhx4.s2b(a)
};
dhtmlXTreeObject.prototype.setOnMouseInHandler = function(a) {
    this.ehlt = true;
    this.attachEvent("onMouseIn", a)
};
dhtmlXTreeObject.prototype.setOnMouseOutHandler = function(a) {
    this.ehlt = true;
    this.attachEvent("onMouseOut", a)
};
dhtmlXTreeObject.prototype.enableMercyDrag = function(a) {
    this.dpcpy = dhx4.s2b(a)
};
dhtmlXTreeObject.prototype.enableTreeImages = function(a) {
    this.timgen = dhx4.s2b(a)
};
dhtmlXTreeObject.prototype.enableFixedMode = function(a) {
    this.hfMode = dhx4.s2b(a)
};
dhtmlXTreeObject.prototype.enableCheckBoxes = function(c, a) {
    this.checkBoxOff = dhx4.s2b(c);
    this.cBROf = (!(this.checkBoxOff || dhx4.s2b(a)))
};
dhtmlXTreeObject.prototype.setStdImages = function(a, e, c) {
    this.imageArray[0] = a;
    this.imageArray[1] = e;
    this.imageArray[2] = c
};
dhtmlXTreeObject.prototype.enableTreeLines = function(a) {
    this.treeLinesOn = dhx4.s2b(a)
};
dhtmlXTreeObject.prototype.setImageArrays = function(g, a, j, h, e, c) {
    switch (g) {
        case "plus":
            this.plusArray[0] = a;
            this.plusArray[1] = j;
            this.plusArray[2] = h;
            this.plusArray[3] = e;
            this.plusArray[4] = c;
            break;
        case "minus":
            this.minusArray[0] = a;
            this.minusArray[1] = j;
            this.minusArray[2] = h;
            this.minusArray[3] = e;
            this.minusArray[4] = c;
            break
    }
};
dhtmlXTreeObject.prototype.openItem = function(c) {
    this.skipLock = true;
    var a = this._globalIdStorageFind(c);
    if (!a) {
        return 0
    } else {
        return this._openItem(a)
    }
    this.skipLock = false
};
dhtmlXTreeObject.prototype._openItem = function(a) {
    var c = this._getOpenState(a);
    if ((c < 0) || (((this.XMLsource) && (!a.XMLload)))) {
        if (!this.callEvent("onOpenStart", [a.id, c])) {
            return 0
        }
        this._HideShow(a, 2);
        if (this.checkEvent("onOpenEnd")) {
            if (this.onXLE == this._epnFHe) {
                this._epnFHe(this, a.id, true)
            }
            if (!this.xmlstate || !this.XMLsource) {
                this.callEvent("onOpenEnd", [a.id, this._getOpenState(a)])
            } else {
                this._oie_onXLE.push(this.onXLE);
                this.onXLE = this._epnFHe
            }
        }
    } else {
        if (this._srnd) {
            this._HideShow(a, 2)
        }
    }
    if (a.parentObject && !this._skip_open_parent) {
        this._openItem(a.parentObject)
    }
};
dhtmlXTreeObject.prototype.closeItem = function(c) {
    if (this.rootId == c) {
        return 0
    }
    this.skipLock = true;
    var a = this._globalIdStorageFind(c);
    if (!a) {
        return 0
    }
    if (a.closeble) {
        this._HideShow(a, 1)
    }
    this.skipLock = false
};
dhtmlXTreeObject.prototype.getLevel = function(c) {
    var a = this._globalIdStorageFind(c);
    if (!a) {
        return 0
    }
    return this._getNodeLevel(a, 0)
};
dhtmlXTreeObject.prototype.setItemCloseable = function(e, a) {
    a = dhx4.s2b(a);
    if ((e) && (e.span)) {
        var c = e
    } else {
        var c = this._globalIdStorageFind(e)
    }
    if (!c) {
        return 0
    }
    c.closeble = a
};
dhtmlXTreeObject.prototype._getNodeLevel = function(a, c) {
    if (a.parentObject) {
        return this._getNodeLevel(a.parentObject, c + 1)
    }
    return (c)
};
dhtmlXTreeObject.prototype.hasChildren = function(c) {
    var a = this._globalIdStorageFind(c);
    if (!a) {
        return 0
    } else {
        if ((this.XMLsource) && (!a.XMLload)) {
            return true
        } else {
            return a.childsCount
        }
    }
};
dhtmlXTreeObject.prototype._getLeafCount = function(g) {
    var e = 0;
    for (var c = 0; c < g.childsCount; c++) {
        if (g.childNodes[c].childsCount == 0) {
            e++
        }
    }
    return e
};
dhtmlXTreeObject.prototype.setItemText = function(g, e, c) {
    var a = this._globalIdStorageFind(g);
    if (!a) {
        return 0
    }
    a.label = e;
    a.span.innerHTML = e;
    if (this.childCalc) {
        this._fixChildCountLabel(a)
    }
    a.span.parentNode.parentNode.title = c || ""
};
dhtmlXTreeObject.prototype.getItemTooltip = function(c) {
    var a = this._globalIdStorageFind(c);
    if (!a) {
        return ""
    }
    return (a.span.parentNode.parentNode._dhx_title || a.span.parentNode.parentNode.title || "")
};
dhtmlXTreeObject.prototype.refreshItem = function(c) {
    if (!c) {
        c = this.rootId
    }
    var a = this._globalIdStorageFind(c);
    this._dynDeleteBranches[c] = (this._dynDeleteBranches[c] || 0) + 1;
    this._loadDynXML(c)
};
dhtmlXTreeObject.prototype.setItemImage2 = function(g, a, h, e) {
    var c = this._globalIdStorageFind(g);
    if (!c) {
        return 0
    }
    c.images[1] = h;
    c.images[2] = e;
    c.images[0] = a;
    this._correctPlus(c)
};
dhtmlXTreeObject.prototype.setItemImage = function(e, a, g) {
    var c = this._globalIdStorageFind(e);
    if (!c) {
        return 0
    }
    if (g) {
        c.images[1] = a;
        c.images[2] = g
    } else {
        c.images[0] = a
    }
    this._correctPlus(c)
};
dhtmlXTreeObject.prototype.getSubItems = function(e) {
    var a = this._globalIdStorageFind(e, 0, 1);
    if (!a) {
        return 0
    }
    if (a.unParsed) {
        return (this._getSubItemsXML(a.unParsed))
    }
    var c = "";
    for (i = 0; i < a.childsCount; i++) {
        if (!c) {
            c = "" + a.childNodes[i].id
        } else {
            c += this.dlmtr + a.childNodes[i].id
        }
    }
    return c
};
dhtmlXTreeObject.prototype._getAllScraggyItems = function(e) {
    var g = "";
    for (var c = 0; c < e.childsCount; c++) {
        if ((e.childNodes[c].unParsed) || (e.childNodes[c].childsCount > 0)) {
            if (e.childNodes[c].unParsed) {
                var a = this._getAllScraggyItemsXML(e.childNodes[c].unParsed, 1)
            } else {
                var a = this._getAllScraggyItems(e.childNodes[c])
            }
            if (a) {
                if (g) {
                    g += this.dlmtr + a
                } else {
                    g = a
                }
            }
        } else {
            if (!g) {
                g = "" + e.childNodes[c].id
            } else {
                g += this.dlmtr + e.childNodes[c].id
            }
        }
    }
    return g
};
dhtmlXTreeObject.prototype._getAllFatItems = function(e) {
    var g = "";
    for (var c = 0; c < e.childsCount; c++) {
        if ((e.childNodes[c].unParsed) || (e.childNodes[c].childsCount > 0)) {
            if (!g) {
                g = "" + e.childNodes[c].id
            } else {
                g += this.dlmtr + e.childNodes[c].id
            }
            if (e.childNodes[c].unParsed) {
                var a = this._getAllFatItemsXML(e.childNodes[c].unParsed, 1)
            } else {
                var a = this._getAllFatItems(e.childNodes[c])
            }
            if (a) {
                g += this.dlmtr + a
            }
        }
    }
    return g
};
dhtmlXTreeObject.prototype._getAllSubItems = function(j, h, g) {
    if (g) {
        c = g
    } else {
        var c = this._globalIdStorageFind(j)
    }
    if (!c) {
        return 0
    }
    h = "";
    for (var e = 0; e < c.childsCount; e++) {
        if (!h) {
            h = "" + c.childNodes[e].id
        } else {
            h += this.dlmtr + c.childNodes[e].id
        }
        var a = this._getAllSubItems(0, h, c.childNodes[e]);
        if (a) {
            h += this.dlmtr + a
        }
    }
    if (c.unParsed) {
        h = this._getAllSubItemsXML(j, h, c.unParsed)
    }
    return h
};
dhtmlXTreeObject.prototype.selectItem = function(g, e, c) {
    e = dhx4.s2b(e);
    var a = this._globalIdStorageFind(g);
    if ((!a) || (!a.parentObject)) {
        return 0
    }
    if (this.XMLloadingWarning) {
        a.parentObject.openMe = 1
    } else {
        this._openItem(a.parentObject)
    }
    var h = null;
    if (c) {
        h = new Object;
        h.ctrlKey = true;
        if (a.i_sel) {
            h.skipUnSel = true
        }
    }
    if (e) {
        this.onRowSelect(h, a.htmlNode.childNodes[0].childNodes[0].childNodes[3], false)
    } else {
        this.onRowSelect(h, a.htmlNode.childNodes[0].childNodes[0].childNodes[3], true)
    }
};
dhtmlXTreeObject.prototype.getSelectedItemText = function() {
    var c = new Array();
    for (var a = 0; a < this._selected.length; a++) {
        c[a] = this._selected[a].span.innerHTML
    }
    return (c.join(this.dlmtr))
};
dhtmlXTreeObject.prototype._compressChildList = function(a, e) {
    a--;
    for (var c = 0; c < a; c++) {
        if (e[c] == 0) {
            e[c] = e[c + 1];
            e[c + 1] = 0
        }
    }
};
dhtmlXTreeObject.prototype._deleteNode = function(l, h, n) {
    if ((!h) || (!h.parentObject)) {
        return 0
    }
    var a = 0;
    var c = 0;
    if (h.tr.nextSibling) {
        a = h.tr.nextSibling.nodem
    }
    if (h.tr.previousSibling) {
        c = h.tr.previousSibling.nodem
    }
    var j = h.parentObject;
    var e = j.childsCount;
    var m = j.childNodes;
    for (var g = 0; g < e; g++) {
        if (m[g].id == l) {
            if (!n) {
                j.htmlNode.childNodes[0].removeChild(m[g].tr)
            }
            m[g] = 0;
            break
        }
    }
    this._compressChildList(e, m);
    if (!n) {
        j.childsCount--
    }
    if (a) {
        this._correctPlus(a);
        this._correctLine(a)
    }
    if (c) {
        this._correctPlus(c);
        this._correctLine(c)
    }
    if (this.tscheck) {
        this._correctCheckStates(j)
    }
    if (!n) {
        this._globalIdStorageRecSub(h)
    }
};
dhtmlXTreeObject.prototype.setCheck = function(e, c) {
    var a = this._globalIdStorageFind(e, 0, 1);
    if (!a) {
        return
    }
    if (c === "unsure") {
        this._setCheck(a, c)
    } else {
        c = dhx4.s2b(c);
        if ((this.tscheck) && (this.smcheck)) {
            this._setSubChecked(c, a)
        } else {
            this._setCheck(a, c)
        }
    }
    if (this.smcheck) {
        this._correctCheckStates(a.parentObject)
    }
};
dhtmlXTreeObject.prototype._setCheck = function(a, e) {
    if (!a) {
        return
    }
    if (((a.parentObject._r_logic) || (this._frbtr)) && (e)) {
        if (this._frbtrs) {
            if (this._frbtrL) {
                this.setCheck(this._frbtrL.id, 0)
            }
            this._frbtrL = a
        } else {
            for (var c = 0; c < a.parentObject.childsCount; c++) {
                this._setCheck(a.parentObject.childNodes[c], 0)
            }
        }
    }
    var g = a.htmlNode.childNodes[0].childNodes[0].childNodes[1].childNodes[0];
    if (e == "unsure") {
        a.checkstate = 2
    } else {
        if (e) {
            a.checkstate = 1
        } else {
            a.checkstate = 0
        }
    }
    if (a.dscheck) {
        a.checkstate = a.dscheck
    }
    this._setSrc(g, this.imPath + ((a.parentObject._r_logic || this._frbtr) ? this.radioArray : this.checkArray)[a.checkstate])
};
dhtmlXTreeObject.prototype.setSubChecked = function(e, c) {
    var a = this._globalIdStorageFind(e);
    this._setSubChecked(c, a);
    this._correctCheckStates(a.parentObject)
};
dhtmlXTreeObject.prototype._setSubChecked = function(e, a) {
    e = dhx4.s2b(e);
    if (!a) {
        return
    }
    if (((a.parentObject._r_logic) || (this._frbtr)) && (e)) {
        for (var c = 0; c < a.parentObject.childsCount; c++) {
            this._setSubChecked(0, a.parentObject.childNodes[c])
        }
    }
    if (a.unParsed) {
        this._setSubCheckedXML(e, a.unParsed)
    }
    if (a._r_logic || this._frbtr) {
        this._setSubChecked(e, a.childNodes[0])
    } else {
        for (var c = 0; c < a.childsCount; c++) {
            this._setSubChecked(e, a.childNodes[c])
        }
    }
    var g = a.htmlNode.childNodes[0].childNodes[0].childNodes[1].childNodes[0];
    if (e) {
        a.checkstate = 1
    } else {
        a.checkstate = 0
    }
    if (a.dscheck) {
        a.checkstate = a.dscheck
    }
    this._setSrc(g, this.imPath + ((a.parentObject._r_logic || this._frbtr) ? this.radioArray : this.checkArray)[a.checkstate])
};
dhtmlXTreeObject.prototype.isItemChecked = function(c) {
    var a = this._globalIdStorageFind(c);
    if (!a) {
        return
    }
    return a.checkstate
};
dhtmlXTreeObject.prototype.deleteChildItems = function(g) {
    var a = this._globalIdStorageFind(g);
    if (!a) {
        return
    }
    var c = a.childsCount;
    for (var e = 0; e < c; e++) {
        this._deleteNode(a.childNodes[0].id, a.childNodes[0])
    }
};
dhtmlXTreeObject.prototype.deleteItem = function(e, a) {
    if ((!this._onrdlh) || (this._onrdlh(e))) {
        var c = this._deleteItem(e, a);
        if (c) {
            this._fixChildCountLabel(c)
        }
    }
    this.allTree.childNodes[0].border = "1";
    this.allTree.childNodes[0].border = "0"
};
dhtmlXTreeObject.prototype._deleteItem = function(j, c, h) {
    c = dhx4.s2b(c);
    var a = this._globalIdStorageFind(j);
    if (!a) {
        return
    }
    var e = this.getParentId(j);
    var g = a.parentObject;
    this._deleteNode(j, a, h);
    if (this._editCell && this._editCell.id == j) {
        this._editCell = null
    }
    this._correctPlus(g);
    this._correctLine(g);
    if ((c) && (e != this.rootId)) {
        this.selectItem(e, 1)
    }
    return g
};
dhtmlXTreeObject.prototype._globalIdStorageRecSub = function(a) {
    for (var c = 0; c < a.childsCount; c++) {
        this._globalIdStorageRecSub(a.childNodes[c]);
        this._globalIdStorageSub(a.childNodes[c].id)
    }
    this._globalIdStorageSub(a.id);
    var e = a;
    e.span = null;
    e.tr.nodem = null;
    e.tr = null;
    e.htmlNode = null
};
dhtmlXTreeObject.prototype.insertNewNext = function(m, r, o, e, j, h, g, c, a) {
    var l = this._globalIdStorageFind(m);
    if ((!l) || (!l.parentObject)) {
        return (0)
    }
    var n = this._attachChildNode(0, r, o, e, j, h, g, c, a, l);
    if ((!this.XMLloadingWarning) && (this.childCalc)) {
        this._fixChildCountLabel(l.parentObject)
    }
    return n
};
dhtmlXTreeObject.prototype.getItemIdByIndex = function(e, a) {
    var c = this._globalIdStorageFind(e);
    if ((!c) || (a >= c.childsCount)) {
        return null
    }
    return c.childNodes[a].id
};
dhtmlXTreeObject.prototype.getChildItemIdByIndex = function(e, a) {
    var c = this._globalIdStorageFind(e);
    if ((!c) || (a >= c.childsCount)) {
        return null
    }
    return c.childNodes[a].id
};
dhtmlXTreeObject.prototype.setDragHandler = function(a) {
    this.attachEvent("onDrag", a)
};
dhtmlXTreeObject.prototype._clearMove = function() {
    if (this._lastMark) {
        this._lastMark.className = this._lastMark.className.replace(/dragAndDropRow/g, "");
        this._lastMark = null
    }
    this.selectionBar.style.display = "none";
    this.allTree.className = this.allTree.className.replace(" selectionBox", "")
};
//dhtmlXTreeObject.prototype.enableDragAndDrop = function(c, a) {
//    if (c == "temporary_disabled") {
//        this.dADTempOff = false;
//        c = true
//    } else {
//        this.dADTempOff = true
//    }
//    this.dragAndDropOff = dhx4.s2b(c);
//    if (this.dragAndDropOff) {
//        this.dragger.addDragLanding(this.allTree, this)
//    }
//    if (arguments.length > 1) {
//        this._ddronr = (!dhx4.s2b(a))
//    }
//};
dhtmlXTreeObject.prototype._setMove = function(h, e, l) {
    if (h.parentObject.span) {
        var g = dhx4.absTop(h);
        var c = dhx4.absTop(this.allTree) - this.allTree.scrollTop;
        this.dadmodec = this.dadmode;
        this.dadmodefix = 0;
        if (this.dadmode == 2) {
            var j = l - g + (document.body.scrollTop || document.documentElement.scrollTop) - 2 - h.offsetHeight / 2;
            if ((Math.abs(j) - h.offsetHeight / 6) > 0) {
                this.dadmodec = 1;
                if (j < 0) {
                    this.dadmodefix = 0 - h.offsetHeight
                }
            } else {
                this.dadmodec = 0
            }
        }
        if (this.dadmodec == 0) {
            var a = h.parentObject.span;
            a.className += " dragAndDropRow";
            this._lastMark = a
        } else {
            this._clearMove();
            this.selectionBar.style.top = (g - c + ((parseInt(h.parentObject.span.parentNode.previousSibling.childNodes[0].style.height) || 18) - 1) + this.dadmodefix) + "px";
            this.selectionBar.style.left = "5px";
            if (this.allTree.offsetWidth > 20) {
                this.selectionBar.style.width = (this.allTree.offsetWidth - (_isFF ? 30 : 25)) + "px"
            }
            this.selectionBar.style.display = ""
        }
        this._autoScroll(null, g, c)
    }
};
dhtmlXTreeObject.prototype._autoScroll = function(e, c, a) {
    if (this.autoScroll) {
        if (e) {
            c = dhx4.absTop(e);
            a = dhx4.absTop(this.allTree) - this.allTree.scrollTop
        }
        if ((c - a - parseInt(this.allTree.scrollTop)) > (parseInt(this.allTree.offsetHeight) - 50)) {
            this.allTree.scrollTop = parseInt(this.allTree.scrollTop) + 20
        }
        if ((c - a) < (parseInt(this.allTree.scrollTop) + 30)) {
            this.allTree.scrollTop = parseInt(this.allTree.scrollTop) - 20
        }
    }
};
dhtmlXTreeObject.prototype._createDragNode = function(j, h) {
    if (!this.dADTempOff) {
        return null
    }
    var g = j.parentObject;
    if (!this.callEvent("onBeforeDrag", [g.id, h])) {
        return null
    }
    if (!g.i_sel) {
        this._selectItem(g, h)
    }
    this._checkMSelectionLogic();
    var c = document.createElement("div");
    var l = new Array();
    if (this._itim_dg) {
        for (var a = 0; a < this._selected.length; a++) {
            l[a] = "<table cellspacing='0' cellpadding='0'><tr><td><img width='18px' height='18px' src='" + this._getSrc(this._selected[a].span.parentNode.previousSibling.childNodes[0]) + "'></td><td>" + this._selected[a].span.innerHTML + "</td></tr></table>"
        }
    } else {
        l = this.getSelectedItemText().split(this.dlmtr)
    }
    c.innerHTML = l.join("");
    c.style.position = "absolute";
    c.className = "dragSpanDiv";
    this._dragged = (new Array()).concat(this._selected);
    return c
};
dhtmlXTreeObject.prototype._focusNode = function(a) {
    var c = dhx4.absTop(a.htmlNode) - dhx4.absTop(this.allTree);
    if ((c > (this.allTree.offsetHeight - 30)) || (c < 0)) {
        this.allTree.scrollTop = c + this.allTree.scrollTop
    }
};
dhtmlXTreeObject.prototype._preventNsDrag = function(a) {
    if ((a) && (a.preventDefault)) {
        a.preventDefault();
        return false
    }
    return false
};
dhtmlXTreeObject.prototype._drag = function(l, m, a) {
    if (this._autoOpenTimer) {
        clearTimeout(this._autoOpenTimer)
    }
    if (!a.parentObject) {
        a = this.htmlNode.htmlNode.childNodes[0].childNodes[0].childNodes[1].childNodes[0];
        this.dadmodec = 0
    }
    this._clearMove();
    var j = l.parentObject.treeNod;
    if ((j) && (j._clearMove)) {
        j._clearMove("")
    }
    if ((!this.dragMove) || (this.dragMove())) {
        if ((!j) || (!j._clearMove) || (!j._dragged)) {
            var g = new Array(l.parentObject)
        } else {
            var g = j._dragged
        }
        var c = a.parentObject;
        for (var h = 0; h < g.length; h++) {
            var e = this._moveNode(g[h], c);
            if ((this.dadmodec) && (e !== false)) {
                c = this._globalIdStorageFind(e, true, true)
            }
            if ((e) && (!this._sADnD)) {
                this.selectItem(e, 0, 1)
            }
        }
    }
    if (j) {
        j._dragged = new Array()
    }
};
dhtmlXTreeObject.prototype._dragIn = function(g, c, j, h) {
    if (!this.dADTempOff) {
        return 0
    }
    var l = c.parentObject;
    var a = g.parentObject;
    if ((!a) && (this._ddronr)) {
        return
    }
    if (!this.callEvent("onDragIn", [l.id, a ? a.id : null, l.treeNod, this])) {
        if (a) {
            this._autoScroll(g)
        }
        return 0
    }
    if (!a) {
        this.allTree.className += " selectionBox"
    } else {
        if (l.childNodes == null) {
            this._setMove(g, j, h);
            return g
        }
        var n = l.treeNod;
        for (var e = 0; e < n._dragged.length; e++) {
            if (this._checkPNodes(a, n._dragged[e])) {
                this._autoScroll(g);
                return 0
            }
        }
        this.selectionBar.parentNode.removeChild(this.selectionBar);
        a.span.parentNode.appendChild(this.selectionBar);
        this._setMove(g, j, h);
        if (this._getOpenState(a) <= 0) {
            var m = this;
            this._autoOpenId = a.id;
            this._autoOpenTimer = window.setTimeout(function() {
                m._autoOpenItem(null, m);
                m = null
            }, 1000)
        }
    }
    return g
};
dhtmlXTreeObject.prototype._autoOpenItem = function(c, a) {
    a.openItem(a._autoOpenId)
};
dhtmlXTreeObject.prototype._dragOut = function(a) {
    this._clearMove();
    if (this._autoOpenTimer) {
        clearTimeout(this._autoOpenTimer)
    }
};
dhtmlXTreeObject.prototype._getNextNode = function(a, c) {
    if ((!c) && (a.childsCount)) {
        return a.childNodes[0]
    }
    if (a == this.htmlNode) {
        return -1
    }
    if ((a.tr) && (a.tr.nextSibling) && (a.tr.nextSibling.nodem)) {
        return a.tr.nextSibling.nodem
    }
    return this._getNextNode(a.parentObject, true)
};
dhtmlXTreeObject.prototype._lastChild = function(a) {
    if (a.childsCount) {
        return this._lastChild(a.childNodes[a.childsCount - 1])
    } else {
        return a
    }
};
dhtmlXTreeObject.prototype._getPrevNode = function(a, c) {
    if ((a.tr) && (a.tr.previousSibling) && (a.tr.previousSibling.nodem)) {
        return this._lastChild(a.tr.previousSibling.nodem)
    }
    if (a.parentObject) {
        return a.parentObject
    } else {
        return -1
    }
};
dhtmlXTreeObject.prototype.findItem = function(a, e, c) {
    var g = this._findNodeByLabel(a, e, (c ? this.htmlNode : null));
    if (g) {
        this.selectItem(g.id, true);
        this._focusNode(g);
        return g.id
    } else {
        return null
    }
};
dhtmlXTreeObject.prototype.findItemIdByLabel = function(a, e, c) {
    var g = this._findNodeByLabel(a, e, (c ? this.htmlNode : null));
    if (g) {
        return g.id
    } else {
        return null
    }
};
dhtmlXTreeObject.prototype.findStrInXML = function(c, e, h) {
    if (!c.childNodes && c.item) {
        return this.findStrInJSON(c, e, h)
    }
    if (!c.childNodes) {
        return false
    }
    for (var a = 0; a < c.childNodes.length; a++) {
        if (c.childNodes[a].nodeType == 1) {
            var g = c.childNodes[a].getAttribute(e);
            if (!g && c.childNodes[a].tagName == "itemtext") {
                g = c.childNodes[a].firstChild.data
            }
            if ((g) && (g.toLowerCase().search(h) != -1)) {
                return true
            }
            if (this.findStrInXML(c.childNodes[a], e, h)) {
                return true
            }
        }
    }
    return false
};
dhtmlXTreeObject.prototype.findStrInJSON = function(c, e, h) {
    for (var a = 0; a < c.item.length; a++) {
        var g = c.item[a].text;
        if ((g) && (g.toLowerCase().search(h) != -1)) {
            return true
        }
        if (c.item[a].item && this.findStrInJSON(c.item[a], e, h)) {
            return true
        }
    }
    return false
};
dhtmlXTreeObject.prototype._findNodeByLabel = function(a, h, g) {
    var a = a.replace(new RegExp("^( )+"), "").replace(new RegExp("( )+$"), "");
    a = new RegExp(a.replace(/([\^\.\?\*\+\\\[\]\(\)]{1})/gi, "\\$1").replace(/ /gi, ".*"), "gi");
    if (!g) {
        g = this._selected[0];
        if (!g) {
            g = this.htmlNode
        }
    }
    var c = g;
    if (!h) {
        if ((g.unParsed) && (this.findStrInXML(g.unParsed.d, "text", a))) {
            this.reParse(g)
        }
        g = this._getNextNode(c);
        if (g == -1) {
            g = this.htmlNode.childNodes[0]
        }
    } else {
        var e = this._getPrevNode(c);
        if (e == -1) {
            e = this._lastChild(this.htmlNode)
        }
        if ((e.unParsed) && (this.findStrInXML(e.unParsed.d, "text", a))) {
            this.reParse(e);
            g = this._getPrevNode(c)
        } else {
            g = e
        }
        if (g == -1) {
            g = this._lastChild(this.htmlNode)
        }
    }
    while ((g) && (g != c)) {
        if ((g.label) && (g.label.search(a) != -1)) {
            return (g)
        }
        if (!h) {
            if (g == -1) {
                if (c == this.htmlNode) {
                    break
                }
                g = this.htmlNode.childNodes[0]
            }
            if ((g.unParsed) && (this.findStrInXML(g.unParsed.d, "text", a))) {
                this.reParse(g)
            }
            g = this._getNextNode(g);
            if (g == -1) {
                g = this.htmlNode
            }
        } else {
            var e = this._getPrevNode(g);
            if (e == -1) {
                e = this._lastChild(this.htmlNode)
            }
            if ((e.unParsed) && (this.findStrInXML(e.unParsed.d, "text", a))) {
                this.reParse(e);
                g = this._getPrevNode(g)
            } else {
                g = e
            }
            if (g == -1) {
                g = this._lastChild(this.htmlNode)
            }
        }
    }
    return null
};
dhtmlXTreeObject.prototype.moveItem = function(m, c, n, a) {
    var h = this._globalIdStorageFind(m);
    if (!h) {
        return (0)
    }
    var j = null;
    switch (c) {
        case "right":
            alert("Not supported yet");
            break;
        case "item_child":
            var e = (a || this)._globalIdStorageFind(n);
            if (!e) {
                return (0)
            }
            j = (a || this)._moveNodeTo(h, e, 0);
            break;
        case "item_sibling":
            var e = (a || this)._globalIdStorageFind(n);
            if (!e) {
                return (0)
            }
            j = (a || this)._moveNodeTo(h, e.parentObject, e);
            break;
        case "item_sibling_next":
            var e = (a || this)._globalIdStorageFind(n);
            if (!e) {
                return (0)
            }
            if ((e.tr) && (e.tr.nextSibling) && (e.tr.nextSibling.nodem)) {
                j = (a || this)._moveNodeTo(h, e.parentObject, e.tr.nextSibling.nodem)
            } else {
                j = (a || this)._moveNodeTo(h, e.parentObject)
            }
            break;
        case "left":
            if (h.parentObject.parentObject) {
                j = this._moveNodeTo(h, h.parentObject.parentObject, h.parentObject)
            }
            break;
        case "up":
            var l = this._getPrevNode(h);
            if ((l == -1) || (!l.parentObject)) {
                return null
            }
            j = this._moveNodeTo(h, l.parentObject, l);
            break;
        case "up_strict":
            var l = this._getIndex(h);
            if (l != 0) {
                j = this._moveNodeTo(h, h.parentObject, h.parentObject.childNodes[l - 1])
            }
            break;
        case "down_strict":
            var l = this._getIndex(h);
            var g = h.parentObject.childsCount - 2;
            if (l == g) {
                j = this._moveNodeTo(h, h.parentObject)
            } else {
                if (l < g) {
                    j = this._moveNodeTo(h, h.parentObject, h.parentObject.childNodes[l + 2])
                }
            }
            break;
        case "down":
            var l = this._getNextNode(this._lastChild(h));
            if ((l == -1) || (!l.parentObject)) {
                return
            }
            if (l.parentObject == h.parentObject) {
                var l = this._getNextNode(l)
            }
            if (l == -1) {
                j = this._moveNodeTo(h, h.parentObject)
            } else {
                if ((l == -1) || (!l.parentObject)) {
                    return
                }
                j = this._moveNodeTo(h, l.parentObject, l)
            }
            break
    }
    if (_isIE && _isIE < 8) {
        this.allTree.childNodes[0].border = "1";
        this.allTree.childNodes[0].border = "0"
    }
    return j
};
dhtmlXTreeObject.prototype.setDragBehavior = function(c, a) {
    this._sADnD = (!dhx4.s2b(a));
    switch (c) {
        case "child":
            this.dadmode = 0;
            break;
        case "sibling":
            this.dadmode = 1;
            break;
        case "complex":
            this.dadmode = 2;
            break
    }
};
dhtmlXTreeObject.prototype._loadDynXML = function(e, c) {
    c = c || this.XMLsource;
    var a = (new Date()).valueOf();
    this._ld_id = e;
    if (this.xmlalb == "function") {
        if (c) {
            c(this._escape(e))
        }
    } else {
        if (this.xmlalb == "name") {
            this.load(c + this._escape(e))
        } else {
            if (this.xmlalb == "xmlname") {
                this.load(c + this._escape(e) + ".xml?uid=" + a)
            } else {
                this.load(c + dhtmlx.url(c) + "uid=" + a + "&id=" + this._escape(e))
            }
        }
    }
};
dhtmlXTreeObject.prototype.enableMultiselection = function(c, a) {
    this._amsel = dhx4.s2b(c);
    this._amselS = dhx4.s2b(a)
};
dhtmlXTreeObject.prototype._checkMSelectionLogic = function() {
    var e = new Array();
    for (var c = 0; c < this._selected.length; c++) {
        for (var a = 0; a < this._selected.length; a++) {
            if ((c != a) && (this._checkPNodes(this._selected[a], this._selected[c]))) {
                e[e.length] = this._selected[a]
            }
        }
    }
    for (var c = 0; c < e.length; c++) {
        this._unselectItem(e[c])
    }
};
dhtmlXTreeObject.prototype._checkPNodes = function(c, a) {
    if (this._dcheckf) {
        return false
    }
    if (a == c) {
        return 1
    }
    if (c.parentObject) {
        return this._checkPNodes(c.parentObject, a)
    } else {
        return 0
    }
};
dhtmlXTreeObject.prototype.disableDropCheck = function(a) {
    this._dcheckf = dhx4.s2b(a)
};
dhtmlXTreeObject.prototype.enableDistributedParsing = function(e, c, a) {
    this._edsbps = dhx4.s2b(e);
    this._edsbpsA = new Array();
    this._edsbpsC = c || 10;
    this._edsbpsD = a || 250
};
dhtmlXTreeObject.prototype.getDistributedParsingState = function() {
    return (!((!this._edsbpsA) || (!this._edsbpsA.length)))
};
dhtmlXTreeObject.prototype.getItemParsingState = function(e) {
    var c = this._globalIdStorageFind(e, true, true);
    if (!c) {
        return 0
    }
    if (this._edsbpsA) {
        for (var a = 0; a < this._edsbpsA.length; a++) {
            if (this._edsbpsA[a][2] == e) {
                return -1
            }
        }
    }
    return 1
};
dhtmlXTreeObject.prototype._distributedStart = function(c, h, g, e, a) {
    if (!this._edsbpsA) {
        this._edsbpsA = new Array()
    }
    this._edsbpsA[this._edsbpsA.length] = [c, h, g, e, a]
};
dhtmlXTreeObject.prototype._distributedStep = function(g) {
    var c = this;
    if ((!this._edsbpsA) || (!this._edsbpsA.length)) {
        c.XMLloadingWarning = 0;
        return
    }
    var h = this._edsbpsA[0];
    this.parsedArray = new Array();
    this._parse(h[0], h[2], h[3], h[1]);
    var a = this._globalIdStorageFind(h[2]);
    this._redrawFrom(this, a, h[4], this._getOpenState(a));
    var e = this.setCheckList.split(this.dlmtr);
    for (var j = 0; j < e.length; j++) {
        if (e[j]) {
            this.setCheck(e[j], 1)
        }
    }
    this._edsbpsA = (new Array()).concat(this._edsbpsA.slice(1));
    if ((!this._edsbpsA.length)) {
        window.setTimeout(function() {
            if (c.onXLE) {
                c.onXLE(c, g)
            }
            c.callEvent("onXLE", [c, g])
        }, 1);
        c.xmlstate = 0
    }
};
dhtmlXTreeObject.prototype.enableTextSigns = function(a) {
    this._txtimg = dhx4.s2b(a)
};
dhtmlXTreeObject.prototype.preventIECaching = function(a) {
    dhx4.ajax.cache = !a
};
dhtmlXTreeObject.prototype.preventIECashing = dhtmlXTreeObject.prototype.preventIECaching;
dhtmlXTreeObject.prototype.disableCheckbox = function(e, c) {
    if (typeof(e) != "object") {
        var a = this._globalIdStorageFind(e, 0, 1)
    } else {
        var a = e
    }
    if (!a) {
        return
    }
    a.dscheck = dhx4.s2b(c) ? (((a.checkstate || 0) % 3) + 3) : ((a.checkstate > 2) ? (a.checkstate - 3) : a.checkstate);
    this._setCheck(a);
    if (a.dscheck < 3) {
        a.dscheck = false
    }
};
dhtmlXTreeObject.prototype.smartRefreshBranch = function(c, a) {
    this._branchUpdate = 1;
    this.smartRefreshItem(c, a)
};
dhtmlXTreeObject.prototype.smartRefreshItem = function(g, e) {
    var a = this._globalIdStorageFind(g);
    for (var c = 0; c < a.childsCount; c++) {
        a.childNodes[c]._dmark = true
    }
    this.waitUpdateXML = true;
    if (e && e.exists) {
        this._parse(e, g)
    } else {
        this._loadDynXML(g, e)
    }
};
dhtmlXTreeObject.prototype.refreshItems = function(c, e) {
    var g = c.toString().split(this.dlmtr);
    this.waitUpdateXML = new Array();
    for (var a = 0; a < g.length; a++) {
        this.waitUpdateXML[g[a]] = true
    }
    this.load((e || this.XMLsource) + dhtmlx.url(e || this.XMLsource) + "ids=" + this._escape(c))
};
dhtmlXTreeObject.prototype.updateItem = function(l, j, g, e, c, h, m) {
    var a = this._globalIdStorageFind(l);
    a.userData = new cObject();
    if (j) {
        a.label = j
    }
    a.images = new Array(g || this.imageArray[0], e || this.imageArray[1], c || this.imageArray[2]);
    this.setItemText(l, j);
    if (h) {
        this._setCheck(a, true)
    }
    if (m == "1" && !this.hasChildren(l)) {
        a.XMLload = 0
    }
    this._correctPlus(a);
    a._dmark = false;
    return a
};
dhtmlXTreeObject.prototype.setDropHandler = function(a) {
    this.attachEvent("onDrop", a)
};
dhtmlXTreeObject.prototype.setOnLoadingStart = function(a) {
    this.attachEvent("onXLS", a)
};
dhtmlXTreeObject.prototype.setOnLoadingEnd = function(a) {
    this.attachEvent("onXLE", a)
};
dhtmlXTreeObject.prototype.setXMLAutoLoadingBehaviour = function(a) {
    this.xmlalb = a
};
dhtmlXTreeObject.prototype.enableSmartCheckboxes = function(a) {
    this.smcheck = dhx4.s2b(a)
};
dhtmlXTreeObject.prototype.getXMLState = function() {
    return (this.xmlstate == 1)
};
dhtmlXTreeObject.prototype.setItemTopOffset = function(j, g) {
    var e;
    if (typeof(j) != "object") {
        e = this._globalIdStorageFind(j)
    } else {
        e = j
    }
    var h = e.span.parentNode.parentNode;
    e.span.style.paddingBottom = "1px";
    for (var c = 0; c < h.childNodes.length; c++) {
        if (c != 0) {
            if (_isIE) {
                h.childNodes[c].style.height = "18px";
                h.childNodes[c].style.paddingTop = parseInt(g) + "px"
            } else {
                h.childNodes[c].style.height = 18 + parseInt(g) + "px"
            }
        } else {
            var a = h.childNodes[c].firstChild;
            if (h.childNodes[c].firstChild.tagName != "DIV") {
                a = document.createElement("DIV");
                h.childNodes[c].insertBefore(a, h.childNodes[c].firstChild)
            }
            if ((e.parentObject.id != this.rootId || e.parentObject.childNodes[0] != e) && this.treeLinesOn) {
                h.childNodes[c].style.backgroundImage = "url(" + this.imPath + this.lineArray[5] + ")"
            }
            a.innerHTML = "&nbsp;";
            a.style.overflow = "hidden"
        }
        a.style.verticalAlign = h.childNodes[c].style.verticalAlign = "bottom";
        if (_isIE) {
            this.allTree.childNodes[0].border = "1";
            this.allTree.childNodes[0].border = "0"
        }
    }
};
dhtmlXTreeObject.prototype.setIconSize = function(g, c, h) {
    if (h) {
        if ((h) && (h.span)) {
            var a = h
        } else {
            var a = this._globalIdStorageFind(h)
        }
        if (!a) {
            return (0)
        }
        var e = a.span.parentNode.previousSibling.childNodes[0];
        if (g) {
            e.style.width = g + "px";
            if (window._KHTMLrv) {
                e.parentNode.style.width = g + "px"
            }
        }
        if (c) {
            e.style.height = c + "px";
            if (window._KHTMLrv) {
                e.parentNode.style.height = c + "px"
            }
        }
    } else {
        this.def_img_x = g;
        this.def_img_y = c
    }
};
dhtmlXTreeObject.prototype.getItemImage = function(h, g, c) {
    var e = this._globalIdStorageFind(h);
    if (!e) {
        return ""
    }
    var a = e.images[g || 0];
    if (c) {
        a = this.iconURL + a
    }
    return a
};
dhtmlXTreeObject.prototype.enableRadioButtons = function(g, e) {
    if (arguments.length == 1) {
        this._frbtr = dhx4.s2b(g);
        this.checkBoxOff = this.checkBoxOff || this._frbtr;
        return
    }
    var c = this._globalIdStorageFind(g);
    if (!c) {
        return ""
    }
    e = dhx4.s2b(e);
    if ((e) && (!c._r_logic)) {
        c._r_logic = true;
        for (var a = 0; a < c.childsCount; a++) {
            this._setCheck(c.childNodes[a], c.childNodes[a].checkstate)
        }
    }
    if ((!e) && (c._r_logic)) {
        c._r_logic = false;
        for (var a = 0; a < c.childsCount; a++) {
            this._setCheck(c.childNodes[a], c.childNodes[a].checkstate)
        }
    }
};
dhtmlXTreeObject.prototype.enableSingleRadioMode = function(a) {
    this._frbtrs = dhx4.s2b(a)
};
dhtmlXTreeObject.prototype.openOnItemAdded = function(a) {
    this._hAdI = !dhx4.s2b(a)
};
dhtmlXTreeObject.prototype.openOnItemAdding = function(a) {
    this._hAdI = !dhx4.s2b(a)
};
dhtmlXTreeObject.prototype.enableMultiLineItems = function(a) {
    if (a === true) {
        this.mlitems = "100%"
    } else {
        this.mlitems = a
    }
};
dhtmlXTreeObject.prototype.enableAutoTooltips = function(a) {
    this.ettip = dhx4.s2b(a)
};
dhtmlXTreeObject.prototype.clearSelection = function(a) {
    if (a) {
        this._unselectItem(this._globalIdStorageFind(a))
    } else {
        this._unselectItems()
    }
};
dhtmlXTreeObject.prototype.showItemSign = function(g, c) {
    var a = this._globalIdStorageFind(g);
    if (!a) {
        return 0
    }
    var e = a.span.parentNode.previousSibling.previousSibling.previousSibling;
    if (!dhx4.s2b(c)) {
        this._openItem(a);
        a.closeble = false;
        a.wsign = true
    } else {
        a.closeble = true;
        a.wsign = false
    }
    this._correctPlus(a)
};
dhtmlXTreeObject.prototype.showItemCheckbox = function(h, g) {
    if (!h) {
        for (var c in this._idpull) {
            this.showItemCheckbox(this._idpull[c], g)
        }
    }
    if (typeof(h) != "object") {
        h = this._globalIdStorageFind(h, 0, 0)
    }
    if (!h) {
        return 0
    }
    h.nocheckbox = !dhx4.s2b(g);
    var e = h.span.parentNode.previousSibling.previousSibling.childNodes[0];
    e.parentNode.style.display = (!h.nocheckbox) ? "" : "none"
};
dhtmlXTreeObject.prototype.setListDelimeter = function(a) {
    this.dlmtr = a
};
dhtmlXTreeObject.prototype.setEscapingMode = function(a) {
    this.utfesc = a
};
dhtmlXTreeObject.prototype.enableHighlighting = function(a) {
    this.ehlt = true;
    this.ehlta = dhx4.s2b(a)
};
dhtmlXTreeObject.prototype._itemMouseOut = function() {
    var c = this.childNodes[3].parentObject;
    var a = c.treeNod;
    a.callEvent("onMouseOut", [c.id]);
    if (c.id == a._l_onMSI) {
        a._l_onMSI = null
    }
    if (!a.ehlta) {
        return
    }
    c.span.className = c.span.className.replace("_lor", "")
};
dhtmlXTreeObject.prototype._itemMouseIn = function() {
    var c = this.childNodes[3].parentObject;
    var a = c.treeNod;
    if (a._l_onMSI != c.id) {
        a.callEvent("onMouseIn", [c.id])
    }
    a._l_onMSI = c.id;
    if (!a.ehlta) {
        return
    }
    c.span.className = c.span.className.replace("_lor", "");
    c.span.className = c.span.className.replace(/((standart|selected)TreeRow)/, "$1_lor")
};
dhtmlXTreeObject.prototype.enableActiveImages = function(a) {
    this._aimgs = dhx4.s2b(a)
};
dhtmlXTreeObject.prototype.focusItem = function(c) {
    var a = this._globalIdStorageFind(c);
    if (!a) {
        return (0)
    }
    this._focusNode(a)
};
dhtmlXTreeObject.prototype.getAllSubItems = function(a) {
    return this._getAllSubItems(a)
};
dhtmlXTreeObject.prototype.getAllChildless = function() {
    return this._getAllScraggyItems(this.htmlNode)
};
dhtmlXTreeObject.prototype.getAllLeafs = dhtmlXTreeObject.prototype.getAllChildless;
dhtmlXTreeObject.prototype._getAllScraggyItems = function(e) {
    var g = "";
    for (var c = 0; c < e.childsCount; c++) {
        if ((e.childNodes[c].unParsed) || (e.childNodes[c].childsCount > 0)) {
            if (e.childNodes[c].unParsed) {
                var a = this._getAllScraggyItemsXML(e.childNodes[c].unParsed, 1)
            } else {
                var a = this._getAllScraggyItems(e.childNodes[c])
            }
            if (a) {
                if (g) {
                    g += this.dlmtr + a
                } else {
                    g = a
                }
            }
        } else {
            if (!g) {
                g = "" + e.childNodes[c].id
            } else {
                g += this.dlmtr + e.childNodes[c].id
            }
        }
    }
    return g
};
dhtmlXTreeObject.prototype._getAllFatItems = function(e) {
    var g = "";
    for (var c = 0; c < e.childsCount; c++) {
        if ((e.childNodes[c].unParsed) || (e.childNodes[c].childsCount > 0)) {
            if (!g) {
                g = "" + e.childNodes[c].id
            } else {
                g += this.dlmtr + e.childNodes[c].id
            }
            if (e.childNodes[c].unParsed) {
                var a = this._getAllFatItemsXML(e.childNodes[c].unParsed, 1)
            } else {
                var a = this._getAllFatItems(e.childNodes[c])
            }
            if (a) {
                g += this.dlmtr + a
            }
        }
    }
    return g
};
dhtmlXTreeObject.prototype.getAllItemsWithKids = function() {
    return this._getAllFatItems(this.htmlNode)
};
dhtmlXTreeObject.prototype.getAllFatItems = dhtmlXTreeObject.prototype.getAllItemsWithKids;
dhtmlXTreeObject.prototype.getAllChecked = function() {
    return this._getAllChecked("", "", 1)
};
dhtmlXTreeObject.prototype.getAllUnchecked = function(a) {
    if (a) {
        a = this._globalIdStorageFind(a)
    }
    return this._getAllChecked(a, "", 0)
};
dhtmlXTreeObject.prototype.getAllPartiallyChecked = function() {
    return this._getAllChecked("", "", 2)
};
dhtmlXTreeObject.prototype.getAllCheckedBranches = function() {
    var a = [this._getAllChecked("", "", 1)];
    var c = this._getAllChecked("", "", 2);
    if (c) {
        a.push(c)
    }
    return a.join(this.dlmtr)
};
dhtmlXTreeObject.prototype._getAllChecked = function(g, e, h) {
    if (!g) {
        g = this.htmlNode
    }
    if (g.checkstate == h) {
        if (!g.nocheckbox) {
            if (e) {
                e += this.dlmtr + g.id
            } else {
                e = "" + g.id
            }
        }
    }
    var a = g.childsCount;
    for (var c = 0; c < a; c++) {
        e = this._getAllChecked(g.childNodes[c], e, h)
    }
    if (g.unParsed) {
        e = this._getAllCheckedXML(g.unParsed, e, h)
    }
    if (e) {
        return e
    } else {
        return ""
    }
};
dhtmlXTreeObject.prototype.setItemStyle = function(g, e, c) {
    var c = c || false;
    var a = this._globalIdStorageFind(g);
    if (!a) {
        return 0
    }
    if (!a.span.style.cssText) {
        a.span.setAttribute("style", a.span.getAttribute("style") + "; " + e)
    } else {
        a.span.style.cssText = c ? e : a.span.style.cssText + ";" + e
    }
};
dhtmlXTreeObject.prototype.enableImageDrag = function(a) {
    this._itim_dg = dhx4.s2b(a)
};
dhtmlXTreeObject.prototype.setOnDragIn = function(a) {
    this.attachEvent("onDragIn", a)
};
dhtmlXTreeObject.prototype.enableDragAndDropScrolling = function(a) {
    this.autoScroll = dhx4.s2b(a)
};
dhtmlXTreeObject.prototype.setSkin = function(a) {
    var c = this.parentObject.className.replace(/dhxtree_[^ ]*/gi, "");
    this.parentObject.className = c + " dhxtree_" + a;
    if (a == "dhx_terrace" || a == "dhx_web") {
        this.enableTreeLines(false)
    }
};
if (!window.dhtmlx) {
    window.dhtmlx = {}
}
dhtmlx.AtomDataLoader = {
    _init: function (a) {
        this.data = {};
        if (a) {
            this._settings.datatype = a.datatype || "json";
            this._after_init.push(this._load_when_ready)
        }
    },
    _load_when_ready: function () {
        this._ready_for_data = true;
        if (this._settings.url) {
            this.url_setter(this._settings.url)
        }
        if (this._settings.data) {
            this.data_setter(this._settings.data)
        }
    },
    url_setter: function (a) {
        if (!this._ready_for_data) {
            return a
        }
        this.load(a, this._settings.datatype);
        return a
    },
    data_setter: function (a) {
        if (!this._ready_for_data) {
            return a
        }
        this.parse(a, this._settings.datatype);
        return true
    },
    load: function (a, c) {
        this.callEvent("onXLS", []);
        if (typeof c == "string") {
            this.data.driver = dhtmlx.DataDriver[c];
            c = arguments[2]
        } else {
            this.data.driver = dhtmlx.DataDriver[this._settings.datatype || "xml"]
        }
        if (window.dhx4) {
            dhx4.ajax.get(a, dhtmlx.bind(function (g) {
                var e = g.xmlDoc;
                var j = e.responseText;
                var h = e.responseXML;
                if (this._onLoad) {
                    this._onLoad.call(this, j, h, e)
                }
                if (c) {
                    c.call(this, j, h, e)
                }
            }, this))
        } else {
            dhtmlx.ajax(a, [this._onLoad, c], this)
        }
    },
    parse: function (c, a) {
        this.callEvent("onXLS", []);
        this.data.driver = dhtmlx.DataDriver[a || "xml"];
        this._onLoad(c, null)
    },
    _onLoad: function (h, c, a) {
        var e = this.data.driver;
        var g = e.getRecords(e.toObject(h, c))[0];
        this.data = (e ? e.getDetails(g) : h);
        this.callEvent("onXLE", [])
    },
    _check_data_feed: function (c) {
        if (!this._settings.dataFeed || this._ignore_feed || !c) {
            return true
        }
        var a = this._settings.dataFeed;
        if (typeof a == "function") {
            return a.call(this, (c.id || c), c)
        }
        a = a + (a.indexOf("?") == -1 ? "?" : "&") + "action=get&id=" + encodeURIComponent(c.id || c);
        this.callEvent("onXLS", []);
        dhtmlx.ajax(a, function (g, e) {
            this._ignore_feed = true;
            this.setValues(dhtmlx.DataDriver.json.toObject(g)[0]);
            this._ignore_feed = false;
            this.callEvent("onXLE", [])
        }, this);
        return false
    }
};


(function () {
    dhtmlx.extend_api("dhtmlXTreeObject", {
        _init: function (a) {
            return [a.parent, (a.width || "100%"), (a.height || "100%"), (a.root_id || 0)]
        },
        auto_save_selection: "enableAutoSavingSelected",
        auto_tooltip: "enableAutoTooltips",
        checkbox: "enableCheckBoxes",
        checkbox_3_state: "enableThreeStateCheckboxes",
        checkbox_smart: "enableSmartCheckboxes",
        context_menu: "enableContextMenu",
        distributed_parsing: "enableDistributedParsing",
        drag: "enableDragAndDrop",
        drag_copy: "enableMercyDrag",
        drag_image: "enableImageDrag",
        drag_scroll: "enableDragAndDropScrolling",
        editor: "enableItemEditor",
        hover: "enableHighlighting",
        images: "enableTreeImages",
        image_fix: "enableIEImageFix",
        image_path: "setImagePath",
        lines: "enableTreeLines",
        loading_item: "enableLoadingItem",
        multiline: "enableMultiLineItems",
        multiselect: "enableMultiselection",
        navigation: "enableKeyboardNavigation",
        radio: "enableRadioButtons",
        radio_single: "enableSingleRadioMode",
        rtl: "enableRTL",
        search: "enableKeySearch",
        smart_parsing: "enableSmartXMLParsing",
        smart_rendering: "enableSmartRendering",
        text_icons: "enableTextSigns",
        xml: "loadXML",
        skin: "setSkin"
    }, {})
})();




(function () {
    dhtmlx.extend_api("dhtmlXTreeObject", {
        _init: function (a) {
            return [a.parent, (a.width || "100%"), (a.height || "100%"), (a.root_id || 0)]
        },
        auto_save_selection: "enableAutoSavingSelected",
        auto_tooltip: "enableAutoTooltips",
        checkbox: "enableCheckBoxes",
        checkbox_3_state: "enableThreeStateCheckboxes",
        checkbox_smart: "enableSmartCheckboxes",
        context_menu: "enableContextMenu",
        distributed_parsing: "enableDistributedParsing",
        drag: "enableDragAndDrop",
        drag_copy: "enableMercyDrag",
        drag_image: "enableImageDrag",
        drag_scroll: "enableDragAndDropScrolling",
        editor: "enableItemEditor",
        hover: "enableHighlighting",
        images: "enableTreeImages",
        image_fix: "enableIEImageFix",
        image_path: "setImagePath",
        lines: "enableTreeLines",
        loading_item: "enableLoadingItem",
        multiline: "enableMultiLineItems",
        multiselect: "enableMultiselection",
        navigation: "enableKeyboardNavigation",
        radio: "enableRadioButtons",
        radio_single: "enableSingleRadioMode",
        rtl: "enableRTL",
        search: "enableKeySearch",
        smart_parsing: "enableSmartXMLParsing",
        smart_rendering: "enableSmartRendering",
        text_icons: "enableTextSigns",
        xml: "loadXML",
        skin: "setSkin"
    }, {})
})();
    dhtmlXTreeObject.prototype._dp_init = function (a) {
        a.attachEvent("insertCallback", function (g, j, c) {
            var e = dhx4.ajax.xpath(".//item", g);
            var h = e[0].getAttribute("text");
            this.obj.insertNewItem(c, j, h, 0, 0, 0, 0, "CHILD")
        });
        a.attachEvent("updateCallback", function (g, j, c) {
            var e = dhx4.ajax.xpath(".//item", g);
            var h = e[0].getAttribute("text");
            this.obj.setItemText(j, h);
            if (this.obj.getParentId(j) != c) {
                this.obj.moveItem(j, "item_child", c)
            }
            this.setUpdated(j, true, "updated")
        });
        a.attachEvent("deleteCallback", function (e, g, c) {
            this.obj.setUserData(g, this.action_param, "true_deleted");
            this.obj.deleteItem(g, false)
        });
        a._methods = ["setItemStyle", "", "changeItemId", "deleteItem"];
        this.attachEvent("onEdit", function (c, e) {
            if (c == 3) {
                a.setUpdated(e, true)
            }
            return true
        });
        this.attachEvent("onDrop", function (j, h, g, e, c) {
            if (e == c) {
                a.setUpdated(j, true)
            }
        });
        this._onrdlh = function (c) {
            var e = a.getState(c);
            if (e == "inserted") {
                a.set_invalid(c, false);
                a.setUpdated(c, false);
                return true
            }
            if (e == "true_deleted") {
                a.setUpdated(c, false);
                return true
            }
            a.setUpdated(c, true, "deleted");
            return false
        };
        this._onradh = function (c) {
            a.setUpdated(c, true, "inserted")
        };
        a._getRowData = function (h) {
            var g = {};
            var j = this.obj._globalIdStorageFind(h);
            var e = j.parentObject;
            var c = 0;
            for (c = 0; c < e.childsCount; c++) {
                if (e.childNodes[c] == j) {
                    break
                }
            }
            g.tr_id = j.id;
            g.tr_pid = e.id;
            g.tr_order = c;
            g.tr_text = j.span.innerHTML;
            e = (j._userdatalist || "").split(",");
            for (c = 0; c < e.length; c++) {
                g[e[c]] = j.userData["t_" + e[c]]
            }
            return g
        }
    };
    if (typeof (window.dhtmlXCellObject) != "undefined") {
        dhtmlXCellObject.prototype.attachTree = function (a) {
            this.callEvent("_onBeforeContentAttach", ["tree"]);
            var c = document.createElement("DIV");
            c.style.width = "100%";
            c.style.height = "100%";
            c.style.position = "relative";
            c.style.overflow = "hidden";
            this._attachObject(c);
            this.dataType = "tree";
            this.dataObj = new dhtmlXTreeObject(c, "100%", "100%", (a || 0));
            this.dataObj.setSkin(this.conf.skin);
            this.dataObj.allTree.childNodes[0].style.marginTop = "2px";
            this.dataObj.allTree.childNodes[0].style.marginBottom = "2px";
            c = null;
            this.callEvent("_onContentAttach", []);
            return this.dataObj
        }
    }
    dhtmlXTreeObject.prototype.makeDraggable = function (c, a) {
        if (typeof (c) != "object") {
            c = document.getElementById(c)
        }
        dragger = new dhtmlDragAndDropObject();
        dropper = new dhx_dragSomethingInTree();
        dragger.addDraggableItem(c, dropper);
        c.dragLanding = null;
        c.ondragstart = dropper._preventNsDrag;
        c.onselectstart = new Function("return false;");
        c.parentObject = new Object;
        c.parentObject.img = c;
        c.parentObject.treeNod = dropper;
        dropper._customDrop = a
    };
    dhtmlXTreeObject.prototype.makeDragable = dhtmlXTreeObject.prototype.makeDraggable;
    dhtmlXTreeObject.prototype.makeAllDraggable = function (c) {
        var e = document.getElementsByTagName("div");
        for (var a = 0; a < e.length; a++) {
            if (e[a].getAttribute("dragInDhtmlXTree")) {
                this.makeDragable(e[a], c)
            }
        }
    };

    function dhx_dragSomethingInTree() {
        this.lWin = window;
        this._createDragNode = function (c) {
            var a = document.createElement("div");
            a.style.position = "absolute";
            a.innerHTML = (c.innerHTML || c.value);
            a.className = "dragSpanDiv";
            return a
        };
        this._preventNsDrag = function (a) {
            (a || window.event).cancelBubble = true;
            if ((a) && (a.preventDefault)) {
                a.preventDefault();
                return false
            }
            return false
        };
        this._nonTrivialNode = function (c, e, a, g) {
            if (this._customDrop) {
                return this._customDrop(c, g.img.id, e.id, a ? a.id : null)
            }
            var h = (g.img.getAttribute("image") || "");
            var l = g.img.id || "new";
            var j = (g.img.getAttribute("text") || (_isIE ? g.img.innerText : g.img.textContent));
            c[a ? "insertNewNext" : "insertNewItem"](a ? a.id : e.id, l, j, "", h, h, h)
        }
    }
    dhtmlXTreeObject.prototype.enableItemEditor = function (a) {
        this._eItEd = dhx4.s2b(a);
        if (!this._eItEdFlag) {
            this._edn_click_IE = true;
            this._edn_dblclick = true;
            this._ie_aFunc = this.aFunc;
            this._ie_dblclickFuncHandler = this.dblclickFuncHandler;
            this.setOnDblClickHandler(function (e, c) {
                if (this._edn_dblclick) {
                    this._editItem(e, c)
                }
                return true
            });
            this.setOnClickHandler(function (e, c) {
                this._stopEditItem(e, c);
                if ((this.ed_hist_clcik == e) && (this._edn_click_IE)) {
                    this._editItem(e, c)
                }
                this.ed_hist_clcik = e;
                return true
            });
            this._eItEdFlag = true
        }
    };
    dhtmlXTreeObject.prototype.setOnEditHandler = function (a) {
        this.attachEvent("onEdit", a)
    };
    dhtmlXTreeObject.prototype.setEditStartAction = function (a, c) {
        this._edn_click_IE = dhx4.s2b(a);
        this._edn_dblclick = dhx4.s2b(c)
    };
    dhtmlXTreeObject.prototype._stopEdit = function (c, j) {
        if (this._editCell) {
            this.dADTempOff = this.dADTempOffEd;
            if (this._editCell.id != c) {
                var g = true;
                if (!j) {
                    g = this.callEvent("onEdit", [2, this._editCell.id, this, this._editCell.span.childNodes[0].value])
                } else {
                    g = false;
                    this.callEvent("onEditCancel", [this._editCell.id, this._editCell._oldValue])
                }
                if (g === true) {
                    g = this._editCell.span.childNodes[0].value
                } else {
                    if (g === false) {
                        g = this._editCell._oldValue
                    }
                }
                var h = (g != this._editCell._oldValue);
                this._editCell.span.innerHTML = g;
                this._editCell.label = this._editCell.span.innerHTML;
                var e = this._editCell.i_sel ? "selectedTreeRow" : "standartTreeRow";
                this._editCell.span.className = e;
                this._editCell.span.parentNode.className = "standartTreeRow";
                this._editCell.span.style.paddingRight = this._editCell.span.style.paddingLeft = "5px";
                this._editCell.span.onclick = this._editCell.span.ondblclick = function () { };
                var l = this._editCell.id;
                if (this.childCalc) {
                    this._fixChildCountLabel(this._editCell)
                }
                this._editCell = null;
                if (!j) {
                    this.callEvent("onEdit", [3, l, this, h])
                }
                if (this._enblkbrd) {
                    this.parentObject.lastChild.focus();
                    this.parentObject.lastChild.focus()
                }
            }
        }
    };
    dhtmlXTreeObject.prototype._stopEditItem = function (c, a) {
        this._stopEdit(c)
    };
    dhtmlXTreeObject.prototype.stopEdit = function (a) {
        if (this._editCell) {
            this._stopEdit(this._editCell.id + "_non", a)
        }
    };
    dhtmlXTreeObject.prototype.editItem = function (a) {
        this._editItem(a, this)
    };
    dhtmlXTreeObject.prototype._editItem = function (h, a) {
        if (this._eItEd) {
            this._stopEdit();
            var e = this._globalIdStorageFind(h);
            if (!e) {
                return
            }
            var g = this.callEvent("onEdit", [0, h, this, e.span.innerHTML]);
            if (g === true) {
                g = (typeof e.span.innerText != "undefined" ? e.span.innerText : e.span.textContent)
            } else {
                if (g === false) {
                    return
                }
            }
            this.dADTempOffEd = this.dADTempOff;
            this.dADTempOff = false;
            this._editCell = e;
            e._oldValue = g;
            e.span.innerHTML = "<input type='text' class='intreeeditRow' />";
            e.span.style.paddingRight = e.span.style.paddingLeft = "0px";
            e.span.onclick = e.span.ondblclick = function (j) {
                (j || event).cancelBubble = true
            };
            e.span.childNodes[0].value = g;
            e.span.childNodes[0].onselectstart = function (j) {
                (j || event).cancelBubble = true;
                return true
            };
            e.span.childNodes[0].onmousedown = function (j) {
                (j || event).cancelBubble = true;
                return true
            };
            e.span.childNodes[0].focus();
            e.span.childNodes[0].focus();
            e.span.onclick = function (j) {
                (j || event).cancelBubble = true;
                return false
            };
            e.span.className = "";
            e.span.parentNode.className = "";
            var c = this;
            e.span.childNodes[0].onkeydown = function (j) {
                if (!j) {
                    j = window.event
                }
                if (j.keyCode == 13) {
                    j.cancelBubble = true;
                    c._stopEdit(window.undefined)
                } else {
                    if (j.keyCode == 27) {
                        c._stopEdit(window.undefined, true)
                    }
                } (j || event).cancelBubble = true
            };
            this.callEvent("onEdit", [1, h, this])
        }
    };

    function jsonPointer(c, a) {
        this.d = c;
        this.dp = a
    }
    jsonPointer.prototype = {
        text: function () {
            var a = function (h) {
                var g = [];
                for (var e = 0; e < h.length; e++) {
                    g.push("{" + c(h[e]) + "}")
                }
                return g.join(",")
            };
            var c = function (h) {
                var g = [];
                for (var e in h) {
                    if (typeof (h[e]) == "object") {
                        if (e.length) {
                            g.push('"' + e + '":[' + a(h[e]) + "]")
                        } else {
                            g.push('"' + e + '":{' + c(h[e]) + "}")
                        }
                    } else {
                        g.push('"' + e + '":"' + h[e] + '"')
                    }
                }
                return g.join(",")
            };
            return "{" + c(this.d) + "}"
        },
        get: function (a) {
            return this.d[a]
        },
        exists: function () {
            return !!this.d
        },
        content: function () {
            return this.d.content
        },
        each: function (g, l, j) {
            var e = this.d[g];
            var m = new jsonPointer();
            if (e) {
                for (var h = 0; h < e.length; h++) {
                    m.d = e[h];
                    l.apply(j, [m, h])
                }
            }
        },
        get_all: function () {
            return this.d
        },
        sub: function (a) {
            return new jsonPointer(this.d[a], this.d)
        },
        sub_exists: function (a) {
            return !!this.d[a]
        },
        each_x: function (g, m, l, j, h) {
            var e = this.d[g];
            var n = new jsonPointer(0, this.d);
            if (e) {
                for (h = h || 0; h < e.length; h++) {
                    if (e[h][m]) {
                        n.d = e[h];
                        if (l.apply(j, [n, h]) == -1) {
                            return
                        }
                    }
                }
            }
        },
        up: function (a) {
            return new jsonPointer(this.dp, this.d)
        },
        set: function (a, c) {
            this.d[a] = c
        },
        clone: function (a) {
            return new jsonPointer(this.d, this.dp)
        },
        through: function (e, l, o, h, r) {
            var m = this.d[e];
            if (m.length) {
                for (var g = 0; g < m.length; g++) {
                    if (m[g][l] != null && m[g][l] != "" && (!o || m[g][l] == o)) {
                        var j = new jsonPointer(m[g], this.d);
                        h.apply(r, [j, g])
                    }
                    var n = this.d;
                    this.d = m[g];
                    if (this.sub_exists(e)) {
                        this.through(e, l, o, h, r)
                    }
                    this.d = n
                }
            }
        }
    };
    dhtmlXTreeObject.prototype.loadJSArrayFile = function (a, c) {
        if (window.console && window.console.info) {
            window.console.info("loadJSArrayFile was deprecated", "http://docs.dhtmlx.com/migration__index.html#migrationfrom43to44")
        }
        return this._loadJSArrayFile(a, c)
    };
    dhtmlXTreeObject.prototype._loadJSArrayFile = function (file, callback) {
        if (!this.parsCount) {
            this.callEvent("onXLS", [this, this._ld_id])
        }
        this._ld_id = null;
        this.xmlstate = 1;
        var that = this;
        this.XMLLoader = function (xml, callback) {
            eval("var z=" + xml.responseText);
            this._loadJSArray(z);
            if (callback) {
                callback.call(this, xml)
            }
        };
        dhx4.ajax.get(file, function (obj) {
            that.XMLLoader(obj.xmlDoc, callback)
        })
    };
    dhtmlXTreeObject.prototype.loadCSV = function (a, c) {
        if (window.console && window.console.info) {
            window.console.info("loadCSV was deprecated", "http://docs.dhtmlx.com/migration__index.html#migrationfrom43to44")
        }
        return this._loadCSV(a, c)
    };
    dhtmlXTreeObject.prototype._loadCSV = function (a, e) {
        if (!this.parsCount) {
            this.callEvent("onXLS", [this, this._ld_id])
        }
        this._ld_id = null;
        this.xmlstate = 1;
        var c = this;
        this.XMLLoader = function (g, h) {
            this._loadCSVString(g.responseText);
            if (h) {
                h.call(this, g)
            }
        };
        dhx4.ajax.get(a, function (g) {
            c.XMLLoader(g.xmlDoc, e)
        })
    };
    dhtmlXTreeObject.prototype.loadJSArray = function (a, c) {
        if (window.console && window.console.info) {
            window.console.info("loadJSArray was deprecated", "http://docs.dhtmlx.com/migration__index.html#migrationfrom43to44")
        }
        return this._loadJSArray(a, c)
    };
    dhtmlXTreeObject.prototype._loadJSArray = function (a, g) {
        var j = [];
        for (var c = 0; c < a.length; c++) {
            if (!j[a[c][1]]) {
                j[a[c][1]] = []
            }
            j[a[c][1]].push({
                id: a[c][0],
                text: a[c][2]
            })
        }
        var h = {
            id: this.rootId
        };
        var e = function (n, m) {
            if (j[n.id]) {
                n.item = j[n.id];
                for (var l = 0; l < n.item.length; l++) {
                    m(n.item[l], m)
                }
            }
        };
        e(h, e);
        this._loadJSONObject(h, g)
    };

    dhtmlXTreeObject.prototype.loadJSONObject = function (a, c) {
        if (window.console && window.console.info) {
            window.console.info("loadJSONObject was deprecated", "http://docs.dhtmlx.com/migration__index.html#migrationfrom43to44")
        }
        return this._loadJSONObject(a, c)
    };
    dhtmlXTreeObject.prototype._loadJSONObject = function (a, c) {
        if (!this.parsCount) {
            this.callEvent("onXLS", [this, null])
        }
        this.xmlstate = 1;
        var e = new jsonPointer(a);
        this._parse(e);
        this._p = e;
        if (c) {
            c()
        }
    };


    dhtmlXTreeObject.prototype.loadCSVString = function (a, c) {
        if (window.console && window.console.info) {
            window.console.info("loadCSVString was deprecated", "http://docs.dhtmlx.com/migration__index.html#migrationfrom43to44")
        }
        return this._loadCSVString(a, c)
    };
    dhtmlXTreeObject.prototype._loadCSVString = function (a, j) {
        var m = [];
        var c = a.split("\n");
        for (var g = 0; g < c.length; g++) {
            var e = c[g].split(",");
            if (!m[e[1]]) {
                m[e[1]] = []
            }
            m[e[1]].push({
                id: e[0],
                text: e[2]
            })
        }
        var l = {
            id: this.rootId
        };
        var h = function (r, o) {
            if (m[r.id]) {
                r.item = m[r.id];
                for (var n = 0; n < r.item.length; n++) {
                    o(r.item[n], o)
                }
            }
        };
        h(l, h);
        this._loadJSONObject(l, j)
    };
    dhtmlXTreeObject.prototype.loadJSONObject = function (a, c) {
        if (window.console && window.console.info) {
            window.console.info("loadJSONObject was deprecated", "http://docs.dhtmlx.com/migration__index.html#migrationfrom43to44")
        }
        return this._loadJSONObject(a, c)
    };
  
    dhtmlXTreeObject.prototype.loadJSON = function (a, c) {
        if (window.console && window.console.info) {
            window.console.info("loadJSON was deprecated", "http://docs.dhtmlx.com/migration__index.html#migrationfrom43to44")
        }
        return this._loadJSON(a, c)
    };
    dhtmlXTreeObject.prototype._loadJSON = function (file, callback) {
        if (!this.parsCount) {
            this.callEvent("onXLS", [this, this._ld_id])
        }
        this._ld_id = null;
        this.xmlstate = 1;
        var that = this;
        this.XMLLoader = function (xml, callback) {
            try {
                eval("var t=" + xml.responseText)
            } catch (e) {
                dhx4.callEvent("onLoadXMLerror", ["Incorrect JSON", (xml), this]);
                return
            }
            var p = new jsonPointer(t);
            this._parse(p);
            this._p = p;
            if (callback) {
                callback.call(this, xml)
            }
        };
        dhx4.ajax.get(file, function (obj) {
            that.XMLLoader(obj.xmlDoc, callback)
        })
    };
    dhtmlXTreeObject.prototype.serializeTreeToJSON = function () {
        var a = ['{"id":"' + this.rootId + '", "item":['];
        var e = [];
        for (var c = 0; c < this.htmlNode.childsCount; c++) {
            e.push(this._serializeItemJSON(this.htmlNode.childNodes[c]))
        }
        a.push(e.join(","));
        a.push("]}");
        return a.join("")
    };
    dhtmlXTreeObject.prototype._serializeItemJSON = function (l) {
        var a = [];
        if (l.unParsed) {
            return (l.unParsed.text())
        }
        if (this._selected.length) {
            var e = this._selected[0].id
        } else {
            e = ""
        }
        var j = l.span.innerHTML;
        j = j.replace(/\"/g, '\\"', j);
        if (!this._xfullXML) {
            a.push('{ "id":"' + l.id + '", ' + (this._getOpenState(l) == 1 ? ' "open":"1", ' : "") + (e == l.id ? ' "select":"1",' : "") + ' "text":"' + j + '"' + (((this.XMLsource) && (l.XMLload == 0)) ? ', "child":"1" ' : ""))
        } else {
            a.push('{ "id":"' + l.id + '", ' + (this._getOpenState(l) == 1 ? ' "open":"1", ' : "") + (e == l.id ? ' "select":"1",' : "") + ' "text":"' + j + '", "im0":"' + l.images[0] + '", "im1":"' + l.images[1] + '", "im2":"' + l.images[2] + '" ' + (l.acolor ? (', "aCol":"' + l.acolor + '" ') : "") + (l.scolor ? (', "sCol":"' + l.scolor + '" ') : "") + (l.checkstate == 1 ? ', "checked":"1" ' : (l.checkstate == 2 ? ', "checked":"-1"' : "")) + (l.closeable ? ', "closeable":"1" ' : "") + (((this.XMLsource) && (l.XMLload == 0)) ? ', "child":"1" ' : ""))
        }
        if ((this._xuserData) && (l._userdatalist)) {
            a.push(', "userdata":[');
            var h = l._userdatalist.split(",");
            var g = [];
            for (var c = 0; c < h.length; c++) {
                g.push('{ "name":"' + h[c] + '" , "content":"' + l.userData["t_" + h[c]] + '" }')
            }
            a.push(g.join(","));
            a.push("]")
        }
        if (l.childsCount) {
            a.push(', "item":[');
            var g = [];
            for (var c = 0; c < l.childsCount; c++) {
                g.push(this._serializeItemJSON(l.childNodes[c]))
            }
            a.push(g.join(","));
            a.push("]\n")
        }
        a.push("}\n");
        return a.join("")
    };

    function dhtmlXTreeFromHTML(obj) {
        if (typeof (obj) != "object") {
            obj = document.getElementById(obj)
        }
        var n = obj;
        var id = n.id;
        var cont = "";
        for (var j = 0; j < obj.childNodes.length; j++) {
            if (obj.childNodes[j].nodeType == "1") {
                if (obj.childNodes[j].tagName == "XMP") {
                    var cHead = obj.childNodes[j];
                    for (var m = 0; m < cHead.childNodes.length; m++) {
                        cont += cHead.childNodes[m].data
                    }
                } else {
                    if (obj.childNodes[j].tagName.toLowerCase() == "ul") {
                        cont = dhx_li2trees(obj.childNodes[j], new Array(), 0)
                    }
                }
                break
            }
        }
        obj.innerHTML = "";
        var t = new dhtmlXTreeObject(obj, "100%", "100%", 0);
        var z_all = new Array();
        for (b in t) {
            z_all[b.toLowerCase()] = b
        }
        var atr = obj.attributes;
        for (var a = 0; a < atr.length; a++) {
            if ((atr[a].name.indexOf("set") == 0) || (atr[a].name.indexOf("enable") == 0)) {
                var an = atr[a].name;
                if (!t[an]) {
                    an = z_all[atr[a].name]
                }
                t[an].apply(t, atr[a].value.split(","))
            }
        }
        if (typeof (cont) == "object") {
            t.XMLloadingWarning = 1;
            for (var i = 0; i < cont.length; i++) {
                var n = t.insertNewItem(cont[i][0], cont[i][3], cont[i][1]);
                if (cont[i][2]) {
                    t._setCheck(n, cont[i][2])
                }
            }
            t.XMLloadingWarning = 0;
            t.lastLoadedXMLId = 0;
            t._redrawFrom(t)
        } else {
            t.parse("<tree id='0'>" + cont + "</tree>")
        }
        window[id] = t;
        var oninit = obj.getAttribute("oninit");
        if (oninit) {
            eval(oninit)
        }
        return t
    }

    if (window.dhtmlXTreeObject) {
        dhtmlXTreeObject.prototype.bind = function () {
            dhx.BaseBind.bind.apply(this, arguments)
        };
        dhtmlXTreeObject.prototype.unbind = function (a) {
            dhx.BaseBind._unbind.call(this, a)
        };
        dhtmlXTreeObject.prototype.dataFeed = function (a) {
            if (this._settings) {
                this._settings.dataFeed = a
            } else {
                this._server_feed = a
            }
        };
        dhtmlXTreeObject.prototype._initBindSource = function () {
            if (dhx.isUndefined(this._settings)) {
                this._settings = {
                    id: dhx.uid(),
                    dataFeed: this._server_feed
                };
                dhx.ui.views[this._settings.id] = this;
                this.data = {
                    silent: dhx.bind(function (a) {
                        a.call(this)
                    }, this)
                };
                dhx4._eventable(this.data);
                this.attachEvent("onSelect", function (a) {
                    this.callEvent("onSelectChange", [a])
                });
                this.attachEvent("onEdit", function (a, c) {
                    if (a === 2) {
                        if (c && c == this.getCursor()) {
                            this._update_binds()
                        }
                    }
                    return true
                })
            }
        };
        dhtmlXTreeObject.prototype.item = function (a) {
            if (a === null) {
                return null
            }
            return {
                id: a,
                text: this.getItemText(a)
            }
        };
        dhtmlXTreeObject.prototype.getSelected = function () {
            return this.getSelectedItemId()
        };
        dhtmlXTreeObject.prototype.isVisible = function () {
            return true
        };
        dhtmlXTreeObject.prototype.refresh = function () { };
        dhtmlXTreeObject.prototype.filter = function (j, h) {
            if (this._settings.dataFeed) {
                var g = {};
                if (!j && !h) {
                    return
                }
                if (typeof j == "function") {
                    if (!h) {
                        return
                    }
                    j(h, g)
                } else {
                    if (dhx.isUndefined(j)) {
                        g = h
                    } else {
                        g[j] = h
                    }
                }
                this.deleteChildItems(0);
                var a = this._settings.dataFeed;
                if (typeof a == "function") {
                    return a.call(this, [(data.id || data), data])
                }
                var e = [];
                for (var c in g) {
                    e.push("dhx_filter[" + c + "]=" + encodeURIComponent(g[c]))
                }
                this.loadXML(a + (a.indexOf("?") < 0 ? "?" : "&") + e.join("&"));
                return false
            }
        };
        dhtmlXTreeObject.prototype.update = function (c, a) {
            if (!dhx.isUndefined(a.text)) {
                this.setItemText(c, a.text)
            }
        };
    }
