
(function() {
    var f;
    function aa(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }
    var ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        a != Array.prototype && a != Object.prototype && (a[b] = c.value)
    }
      , h = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
    function ca() {
        ca = function() {}
        ;
        h.Symbol || (h.Symbol = da)
    }
    var da = function() {
        var a = 0;
        return function(b) {
            return "jscomp_symbol_" + (b || "") + a++
        }
    }();
    function ea() {
        ca();
        var a = h.Symbol.iterator;
        a || (a = h.Symbol.iterator = h.Symbol("iterator"));
        "function" != typeof Array.prototype[a] && ba(Array.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function() {
                return fa(aa(this))
            }
        });
        ea = function() {}
    }
    function fa(a) {
        ea();
        a = {
            next: a
        };
        a[h.Symbol.iterator] = function() {
            return this
        }
        ;
        return a
    }
    function l(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return b ? b.call(a) : {
            next: aa(a)
        }
    }
    var ha = "function" == typeof Object.create ? Object.create : function(a) {
        function b() {}
        b.prototype = a;
        return new b
    }
    , ja;
    if ("function" == typeof Object.setPrototypeOf)
        ja = Object.setPrototypeOf;
    else {
        var ka;
        a: {
            var la = {
                a: !0
            }
              , ma = {};
            try {
                ma.__proto__ = la;
                ka = ma.a;
                break a
            } catch (a) {}
            ka = !1
        }
        ja = ka ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b)
                throw new TypeError(a + " is not extensible");
            return a
        }
        : null
    }
    var na = ja;
    function oa(a, b) {
        a.prototype = ha(b.prototype);
        a.prototype.constructor = a;
        if (na)
            na(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else
                        a[c] = b[c];
        a.superClass_ = b.prototype
    }
    function n(a, b) {
        if (b) {
            var c = h;
            a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                e in c || (c[e] = {});
                c = c[e]
            }
            a = a[a.length - 1];
            d = c[a];
            b = b(d);
            b != d && null != b && ba(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            })
        }
    }
    function p(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
    var pa = "function" == typeof Object.assign ? Object.assign : function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d)
                for (var e in d)
                    p(d, e) && (a[e] = d[e])
        }
        return a
    }
    ;
    n("Object.assign", function(a) {
        return a || pa
    }, "es6", "es3");
    n("WeakMap", function(a) {
        function b(a) {
            this.id_ = (k += Math.random() + 1).toString();
            if (a) {
                a = l(a);
                for (var b; !(b = a.next()).done; )
                    b = b.value,
                    this.set(b[0], b[1])
            }
        }
        function c() {}
        function d(a) {
            if (!p(a, g)) {
                var b = new c;
                ba(a, g, {
                    value: b
                })
            }
        }
        function e(a) {
            var b = Object[a];
            b && (Object[a] = function(a) {
                if (a instanceof c)
                    return a;
                d(a);
                return b(a)
            }
            )
        }
        if (function() {
            if (!a || !Object.seal)
                return !1;
            try {
                var b = Object.seal({})
                  , c = Object.seal({})
                  , d = new a([[b, 2], [c, 3]]);
                if (2 != d.get(b) || 3 != d.get(c))
                    return !1;
                d["delete"](b);
                d.set(c, 4);
                return !d.has(b) && 4 == d.get(c)
            } catch (ze) {
                return !1
            }
        }())
            return a;
        var g = "$jscomp_hidden_" + Math.random();
        e("freeze");
        e("preventExtensions");
        e("seal");
        var k = 0;
        b.prototype.set = function(a, b) {
            d(a);
            if (!p(a, g))
                throw Error("WeakMap key fail: " + a);
            a[g][this.id_] = b;
            return this
        }
        ;
        b.prototype.get = function(a) {
            return p(a, g) ? a[g][this.id_] : void 0
        }
        ;
        b.prototype.has = function(a) {
            return p(a, g) && p(a[g], this.id_)
        }
        ;
        b.prototype["delete"] = function(a) {
            return p(a, g) && p(a[g], this.id_) ? delete a[g][this.id_] : !1
        }
        ;
        return b
    }, "es6", "es3");
    n("Map", function(a) {
        function b() {
            var a = {};
            return a.previous = a.next = a.head = a
        }
        function c(a, b) {
            var c = a.head_;
            return fa(function() {
                if (c) {
                    for (; c.head != a.head_; )
                        c = c.previous;
                    for (; c.next != c.head; )
                        return c = c.next,
                        {
                            done: !1,
                            value: b(c)
                        };
                    c = null
                }
                return {
                    done: !0,
                    value: void 0
                }
            })
        }
        function d(a, b) {
            var c = b && typeof b;
            "object" == c || "function" == c ? g.has(b) ? c = g.get(b) : (c = "" + ++k,
            g.set(b, c)) : c = "p_" + b;
            var d = a.data_[c];
            if (d && p(a.data_, c))
                for (a = 0; a < d.length; a++) {
                    var e = d[a];
                    if (b !== b && e.key !== e.key || b === e.key)
                        return {
                            id: c,
                            list: d,
                            index: a,
                            entry: e
                        }
                }
            return {
                id: c,
                list: d,
                index: -1,
                entry: void 0
            }
        }
        function e(a) {
            this.data_ = {};
            this.head_ = b();
            this.size = 0;
            if (a) {
                a = l(a);
                for (var c; !(c = a.next()).done; )
                    c = c.value,
                    this.set(c[0], c[1])
            }
        }
        if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal)
                return !1;
            try {
                var b = Object.seal({
                    x: 4
                })
                  , c = new a(l([[b, "s"]]));
                if ("s" != c.get(b) || 1 != c.size || c.get({
                    x: 4
                }) || c.set({
                    x: 4
                }, "t") != c || 2 != c.size)
                    return !1;
                var d = c.entries()
                  , e = d.next();
                if (e.done || e.value[0] != b || "s" != e.value[1])
                    return !1;
                e = d.next();
                return e.done || 4 != e.value[0].x || "t" != e.value[1] || !d.next().done ? !1 : !0
            } catch (Ae) {
                return !1
            }
        }())
            return a;
        ea();
        var g = new WeakMap;
        e.prototype.set = function(a, b) {
            a = 0 === a ? 0 : a;
            var c = d(this, a);
            c.list || (c.list = this.data_[c.id] = []);
            c.entry ? c.entry.value = b : (c.entry = {
                next: this.head_,
                previous: this.head_.previous,
                head: this.head_,
                key: a,
                value: b
            },
            c.list.push(c.entry),
            this.head_.previous.next = c.entry,
            this.head_.previous = c.entry,
            this.size++);
            return this
        }
        ;
        e.prototype["delete"] = function(a) {
            a = d(this, a);
            return a.entry && a.list ? (a.list.splice(a.index, 1),
            a.list.length || delete this.data_[a.id],
            a.entry.previous.next = a.entry.next,
            a.entry.next.previous = a.entry.previous,
            a.entry.head = null,
            this.size--,
            !0) : !1
        }
        ;
        e.prototype.clear = function() {
            this.data_ = {};
            this.head_ = this.head_.previous = b();
            this.size = 0
        }
        ;
        e.prototype.has = function(a) {
            return !!d(this, a).entry
        }
        ;
        e.prototype.get = function(a) {
            return (a = d(this, a).entry) && a.value
        }
        ;
        e.prototype.entries = function() {
            return c(this, function(a) {
                return [a.key, a.value]
            })
        }
        ;
        e.prototype.keys = function() {
            return c(this, function(a) {
                return a.key
            })
        }
        ;
        e.prototype.values = function() {
            return c(this, function(a) {
                return a.value
            })
        }
        ;
        e.prototype.forEach = function(a, b) {
            for (var c = this.entries(), d; !(d = c.next()).done; )
                d = d.value,
                a.call(b, d[1], d[0], this)
        }
        ;
        e.prototype[Symbol.iterator] = e.prototype.entries;
        var k = 0;
        return e
    }, "es6", "es3");
    n("Set", function(a) {
        function b(a) {
            this.map_ = new Map;
            if (a) {
                a = l(a);
                for (var b; !(b = a.next()).done; )
                    this.add(b.value)
            }
            this.size = this.map_.size
        }
        if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal)
                return !1;
            try {
                var b = Object.seal({
                    x: 4
                })
                  , d = new a(l([b]));
                if (!d.has(b) || 1 != d.size || d.add(b) != d || 1 != d.size || d.add({
                    x: 4
                }) != d || 2 != d.size)
                    return !1;
                var e = d.entries()
                  , g = e.next();
                if (g.done || g.value[0] != b || g.value[1] != b)
                    return !1;
                g = e.next();
                return g.done || g.value[0] == b || 4 != g.value[0].x || g.value[1] != g.value[0] ? !1 : e.next().done
            } catch (k) {
                return !1
            }
        }())
            return a;
        ea();
        b.prototype.add = function(a) {
            a = 0 === a ? 0 : a;
            this.map_.set(a, a);
            this.size = this.map_.size;
            return this
        }
        ;
        b.prototype["delete"] = function(a) {
            a = this.map_["delete"](a);
            this.size = this.map_.size;
            return a
        }
        ;
        b.prototype.clear = function() {
            this.map_.clear();
            this.size = 0
        }
        ;
        b.prototype.has = function(a) {
            return this.map_.has(a)
        }
        ;
        b.prototype.entries = function() {
            return this.map_.entries()
        }
        ;
        b.prototype.values = function() {
            return this.map_.values()
        }
        ;
        b.prototype.keys = b.prototype.values;
        b.prototype[Symbol.iterator] = b.prototype.values;
        b.prototype.forEach = function(a, b) {
            var c = this;
            this.map_.forEach(function(d) {
                return a.call(b, d, d, c)
            })
        }
        ;
        return b
    }, "es6", "es3");
    n("Object.is", function(a) {
        return a ? a : function(a, c) {
            return a === c ? 0 !== a || 1 / a === 1 / c : a !== a && c !== c
        }
    }, "es6", "es3");
    n("Array.prototype.includes", function(a) {
        return a ? a : function(a, c) {
            var b = this;
            b instanceof String && (b = String(b));
            var e = b.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                var g = b[c];
                if (g === a || Object.is(g, a))
                    return !0
            }
            return !1
        }
    }, "es7", "es3");
    n("String.prototype.includes", function(a) {
        return a ? a : function(a, c) {
            if (null == this)
                throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");
            if (a instanceof RegExp)
                throw new TypeError("First argument to String.prototype.includes must not be a regular expression");
            return -1 !== (this + "").indexOf(a, c || 0)
        }
    }, "es6", "es3");
    var qa = qa || {}
      , q = this;
    function r(a) {
        return void 0 !== a
    }
    function t(a) {
        return "string" == typeof a
    }
    function ra(a) {
        return "number" == typeof a
    }
    function u(a, b) {
        a = a.split(".");
        b = b || q;
        for (var c = 0; c < a.length; c++)
            if (b = b[a[c]],
            null == b)
                return null;
        return b
    }
    function sa() {}
    function v(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array)
                    return "array";
                if (a instanceof Object)
                    return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c)
                    return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))
                    return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))
                    return "function"
            } else
                return "null";
        else if ("function" == b && "undefined" == typeof a.call)
            return "object";
        return b
    }
    function ta(a) {
        return "array" == v(a)
    }
    function w(a) {
        var b = v(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }
    function ua(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }
    function va(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
    function wa(a, b, c) {
        if (!a)
            throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }
    function x(a, b, c) {
        x = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? va : wa;
        return x.apply(null, arguments)
    }
    function xa(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var b = c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b)
        }
    }
    var y = Date.now || function() {
        return +new Date
    }
    ;
    function z(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.superClass_ = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.base = function(a, c, g) {
            for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++)
                d[e - 2] = arguments[e];
            return b.prototype[c].apply(a, d)
        }
    }
    ;function ya(a) {
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, ya);
        else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a));
        this.reportErrorToServer = !0
    }
    z(ya, Error);
    ya.prototype.name = "CustomError";
    function za(a, b) {
        ya.call(this, Aa(a, b));
        this.messagePattern = a
    }
    z(za, ya);
    za.prototype.name = "AssertionError";
    function Aa(a, b) {
        a = a.split("%s");
        for (var c = "", d = a.length - 1, e = 0; e < d; e++)
            c += a[e] + (e < b.length ? b[e] : "%s");
        return c + a[d]
    }
    function Ba(a, b, c, d) {
        var e = "Assertion failed";
        if (c) {
            e += ": " + c;
            var g = d
        } else
            a && (e += ": " + a,
            g = b);
        throw new za("" + e,g || []);
    }
    function A(a, b, c) {
        a || Ba("", null, b, Array.prototype.slice.call(arguments, 2));
        return a
    }
    function Ca(a, b) {
        throw new za("Failure" + (a ? ": " + a : ""),Array.prototype.slice.call(arguments, 1));
    }
    function Da(a, b, c) {
        ra(a) || Ba("Expected number but got %s: %s.", [v(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    }
    function Ea(a, b, c) {
        t(a) || Ba("Expected string but got %s: %s.", [v(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    }
    ;var Fa = Array.prototype.indexOf ? function(a, b, c) {
        A(null != a.length);
        return Array.prototype.indexOf.call(a, b, c)
    }
    : function(a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (t(a))
            return t(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    }
      , Ga = Array.prototype.forEach ? function(a, b, c) {
        A(null != a.length);
        Array.prototype.forEach.call(a, b, c)
    }
    : function(a, b, c) {
        for (var d = a.length, e = t(a) ? a.split("") : a, g = 0; g < d; g++)
            g in e && b.call(c, e[g], g, a)
    }
    ;
    function Ha(a, b, c) {
        a: {
            for (var d = a.length, e = t(a) ? a.split("") : a, g = 0; g < d; g++)
                if (g in e && b.call(c, e[g], g, a)) {
                    b = g;
                    break a
                }
            b = -1
        }
        return 0 > b ? null : t(a) ? a.charAt(b) : a[b]
    }
    function Ia(a, b) {
        b = Fa(a, b);
        var c;
        (c = 0 <= b) && Ja(a, b);
        return c
    }
    function Ja(a, b) {
        A(null != a.length);
        return 1 == Array.prototype.splice.call(a, b, 1).length
    }
    function Ka(a) {
        return Array.prototype.concat.apply([], arguments)
    }
    function La(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)
                c[d] = a[d];
            return c
        }
        return []
    }
    ;function Ma(a, b, c) {
        this.limit_ = c;
        this.create_ = a;
        this.reset_ = b;
        this.occupants_ = 0;
        this.head_ = null
    }
    Ma.prototype.get = function() {
        if (0 < this.occupants_) {
            this.occupants_--;
            var a = this.head_;
            this.head_ = a.next;
            a.next = null
        } else
            a = this.create_();
        return a
    }
    ;
    Ma.prototype.put = function(a) {
        this.reset_(a);
        this.occupants_ < this.limit_ && (this.occupants_++,
        a.next = this.head_,
        this.head_ = a)
    }
    ;
    Ma.prototype.occupants = function() {
        return this.occupants_
    }
    ;
    function B(a) {
        this.tagName_ = a
    }
    B.prototype.toString = function() {
        return this.tagName_
    }
    ;
    new B("A");
    new B("ABBR");
    new B("ACRONYM");
    new B("ADDRESS");
    new B("APPLET");
    new B("AREA");
    new B("ARTICLE");
    new B("ASIDE");
    new B("AUDIO");
    new B("B");
    new B("BASE");
    new B("BASEFONT");
    new B("BDI");
    new B("BDO");
    new B("BIG");
    new B("BLOCKQUOTE");
    new B("BODY");
    new B("BR");
    new B("BUTTON");
    new B("CANVAS");
    new B("CAPTION");
    new B("CENTER");
    new B("CITE");
    new B("CODE");
    new B("COL");
    new B("COLGROUP");
    new B("COMMAND");
    new B("DATA");
    new B("DATALIST");
    new B("DD");
    new B("DEL");
    new B("DETAILS");
    new B("DFN");
    new B("DIALOG");
    new B("DIR");
    new B("DIV");
    new B("DL");
    new B("DT");
    new B("EM");
    new B("EMBED");
    new B("FIELDSET");
    new B("FIGCAPTION");
    new B("FIGURE");
    new B("FONT");
    new B("FOOTER");
    new B("FORM");
    new B("FRAME");
    new B("FRAMESET");
    new B("H1");
    new B("H2");
    new B("H3");
    new B("H4");
    new B("H5");
    new B("H6");
    new B("HEAD");
    new B("HEADER");
    new B("HGROUP");
    new B("HR");
    new B("HTML");
    new B("I");
    new B("IFRAME");
    new B("IMG");
    new B("INPUT");
    new B("INS");
    new B("ISINDEX");
    new B("KBD");
    new B("KEYGEN");
    new B("LABEL");
    new B("LEGEND");
    new B("LI");
    new B("LINK");
    new B("MAIN");
    new B("MAP");
    new B("MARK");
    new B("MATH");
    new B("MENU");
    new B("MENUITEM");
    new B("META");
    new B("METER");
    new B("NAV");
    new B("NOFRAMES");
    new B("NOSCRIPT");
    new B("OBJECT");
    new B("OL");
    new B("OPTGROUP");
    new B("OPTION");
    new B("OUTPUT");
    new B("P");
    new B("PARAM");
    new B("PICTURE");
    new B("PRE");
    new B("PROGRESS");
    new B("Q");
    new B("RP");
    new B("RT");
    new B("RTC");
    new B("RUBY");
    new B("S");
    new B("SAMP");
    new B("SCRIPT");
    new B("SECTION");
    new B("SELECT");
    new B("SMALL");
    new B("SOURCE");
    new B("SPAN");
    new B("STRIKE");
    new B("STRONG");
    new B("STYLE");
    new B("SUB");
    new B("SUMMARY");
    new B("SUP");
    new B("SVG");
    new B("TABLE");
    new B("TBODY");
    new B("TD");
    new B("TEMPLATE");
    new B("TEXTAREA");
    new B("TFOOT");
    new B("TH");
    new B("THEAD");
    new B("TIME");
    new B("TITLE");
    new B("TR");
    new B("TRACK");
    new B("TT");
    new B("U");
    new B("UL");
    new B("VAR");
    new B("VIDEO");
    new B("WBR");
    var Na = String.prototype.trim ? function(a) {
        return a.trim()
    }
    : function(a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    }
    ;
    function Oa(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }
    function Pa(a, b, c) {
        a = a.split(b);
        for (var d = []; 0 < c && a.length; )
            d.push(a.shift()),
            c--;
        a.length && d.push(a.join(b));
        return d
    }
    ;var Qa;
    a: {
        var Ra = q.navigator;
        if (Ra) {
            var Sa = Ra.userAgent;
            if (Sa) {
                Qa = Sa;
                break a
            }
        }
        Qa = ""
    }
    function D(a) {
        return -1 != Qa.indexOf(a)
    }
    function Ta(a) {
        var b = Qa.toLowerCase();
        a = a.toLowerCase();
        return -1 != b.indexOf(a)
    }
    ;function Ua(a, b, c) {
        var d = {}, e;
        for (e in a)
            d[e] = b.call(c, a[e], e, a);
        return d
    }
    function Va(a, b, c) {
        for (var d in a)
            if (b.call(c, a[d], d, a))
                return !0;
        return !1
    }
    function E(a) {
        var b = {}, c;
        for (c in a)
            b[a[c]] = c;
        return b
    }
    var Wa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    function Xa(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)
                a[c] = d[c];
            for (var g = 0; g < Wa.length; g++)
                c = Wa[g],
                Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }
    ;function Ya() {
        this.workTail_ = this.workHead_ = null
    }
    var $a = new Ma(function() {
        return new Za
    }
    ,function(a) {
        a.reset()
    }
    ,100);
    Ya.prototype.add = function(a, b) {
        var c = this.getUnusedItem_();
        c.set(a, b);
        this.workTail_ ? this.workTail_.next = c : (A(!this.workHead_),
        this.workHead_ = c);
        this.workTail_ = c
    }
    ;
    Ya.prototype.remove = function() {
        var a = null;
        this.workHead_ && (a = this.workHead_,
        this.workHead_ = this.workHead_.next,
        this.workHead_ || (this.workTail_ = null),
        a.next = null);
        return a
    }
    ;
    Ya.prototype.returnUnused = function(a) {
        $a.put(a)
    }
    ;
    Ya.prototype.getUnusedItem_ = function() {
        return $a.get()
    }
    ;
    function Za() {
        this.next = this.scope = this.fn = null
    }
    Za.prototype.set = function(a, b) {
        this.fn = a;
        this.scope = b;
        this.next = null
    }
    ;
    Za.prototype.reset = function() {
        this.next = this.scope = this.fn = null
    }
    ;
    new Ya;
    function ab() {
        return D("iPhone") && !D("iPod") && !D("iPad")
    }
    ;function bb(a) {
        bb[" "](a);
        return a
    }
    bb[" "] = sa;
    function cb(a, b, c, d) {
        d = d ? d(b) : b;
        return Object.prototype.hasOwnProperty.call(a, d) ? a[d] : a[d] = c(b)
    }
    ;var db = D("Opera")
      , F = D("Trident") || D("MSIE")
      , eb = D("Edge")
      , fb = D("Gecko") && !(Ta("WebKit") && !D("Edge")) && !(D("Trident") || D("MSIE")) && !D("Edge")
      , G = Ta("WebKit") && !D("Edge");
    G && D("Mobile");
    var gb = D("Macintosh");
    D("Windows");
    D("Linux") || D("CrOS");
    var hb = q.navigator || null;
    hb && (hb.appVersion || "").indexOf("X11");
    D("Android");
    ab();
    D("iPad");
    D("iPod");
    ab() || D("iPad") || D("iPod");
    Ta("KaiOS");
    function ib() {
        var a = q.document;
        return a ? a.documentMode : void 0
    }
    var jb;
    a: {
        var kb = ""
          , lb = function() {
            var a = Qa;
            if (fb)
                return /rv:([^\);]+)(\)|;)/.exec(a);
            if (eb)
                return /Edge\/([\d\.]+)/.exec(a);
            if (F)
                return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (G)
                return /WebKit\/(\S+)/.exec(a);
            if (db)
                return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        lb && (kb = lb ? lb[1] : "");
        if (F) {
            var mb = ib();
            if (null != mb && mb > parseFloat(kb)) {
                jb = String(mb);
                break a
            }
        }
        jb = kb
    }
    var nb = jb
      , ob = {};
    function H(a) {
        return cb(ob, a, function() {
            for (var b = 0, c = Na(String(nb)).split("."), d = Na(String(a)).split("."), e = Math.max(c.length, d.length), g = 0; 0 == b && g < e; g++) {
                var k = c[g] || ""
                  , m = d[g] || "";
                do {
                    k = /(\d*)(\D*)(.*)/.exec(k) || ["", "", "", ""];
                    m = /(\d*)(\D*)(.*)/.exec(m) || ["", "", "", ""];
                    if (0 == k[0].length && 0 == m[0].length)
                        break;
                    b = 0 == k[1].length ? 0 : parseInt(k[1], 10);
                    var ia = 0 == m[1].length ? 0 : parseInt(m[1], 10);
                    b = Oa(b, ia) || Oa(0 == k[2].length, 0 == m[2].length) || Oa(k[2], m[2]);
                    k = k[3];
                    m = m[3]
                } while (0 == b)
            }
            return 0 <= b
        })
    }
    var pb;
    var qb = q.document
      , rb = ib();
    pb = qb && F ? rb || ("CSS1Compat" == qb.compatMode ? parseInt(nb, 10) : 5) : void 0;
    var sb = Object.freeze || function(a) {
        return a
    }
    ;
    function tb(a, b, c, d, e) {
        this.reset(a, b, c, d, e)
    }
    tb.prototype.sequenceNumber_ = 0;
    tb.prototype.exception_ = null;
    var ub = 0;
    f = tb.prototype;
    f.reset = function(a, b, c, d, e) {
        this.sequenceNumber_ = "number" == typeof e ? e : ub++;
        this.time_ = d || y();
        this.level_ = a;
        this.msg_ = b;
        this.loggerName_ = c;
        delete this.exception_
    }
    ;
    f.getLoggerName = function() {
        return this.loggerName_
    }
    ;
    f.getException = function() {
        return this.exception_
    }
    ;
    f.setException = function(a) {
        this.exception_ = a
    }
    ;
    f.setLoggerName = function(a) {
        this.loggerName_ = a
    }
    ;
    f.getLevel = function() {
        return this.level_
    }
    ;
    f.setLevel = function(a) {
        this.level_ = a
    }
    ;
    f.getMessage = function() {
        return this.msg_
    }
    ;
    f.setMessage = function(a) {
        this.msg_ = a
    }
    ;
    f.getMillis = function() {
        return this.time_
    }
    ;
    f.setMillis = function(a) {
        this.time_ = a
    }
    ;
    f.getSequenceNumber = function() {
        return this.sequenceNumber_
    }
    ;
    function vb(a) {
        this.name_ = a;
        this.handlers_ = this.children_ = this.level_ = this.parent_ = null
    }
    function I(a, b) {
        this.name = a;
        this.value = b
    }
    I.prototype.toString = function() {
        return this.name
    }
    ;
    new I("OFF",Infinity);
    var wb = new I("SHOUT",1200)
      , xb = new I("SEVERE",1E3)
      , yb = new I("WARNING",900)
      , zb = new I("INFO",800)
      , Ab = new I("CONFIG",700)
      , Bb = new I("FINE",500)
      , Cb = new I("FINER",400)
      , Db = new I("FINEST",300);
    new I("ALL",0);
    f = vb.prototype;
    f.getName = function() {
        return this.name_
    }
    ;
    f.addHandler = function(a) {
        this.handlers_ || (this.handlers_ = []);
        this.handlers_.push(a)
    }
    ;
    f.removeHandler = function(a) {
        var b = this.handlers_;
        return !!b && Ia(b, a)
    }
    ;
    f.getParent = function() {
        return this.parent_
    }
    ;
    f.getChildren = function() {
        this.children_ || (this.children_ = {});
        return this.children_
    }
    ;
    f.setLevel = function(a) {
        this.level_ = a
    }
    ;
    f.getLevel = function() {
        return this.level_
    }
    ;
    f.getEffectiveLevel = function() {
        if (this.level_)
            return this.level_;
        if (this.parent_)
            return this.parent_.getEffectiveLevel();
        Ca("Root logger has no level set.");
        return null
    }
    ;
    f.isLoggable = function(a) {
        return a.value >= this.getEffectiveLevel().value
    }
    ;
    f.log = function(a, b, c) {
        this.isLoggable(a) && ("function" == v(b) && (b = b()),
        this.doLogRecord_(this.getLogRecord(a, b, c)))
    }
    ;
    f.getLogRecord = function(a, b, c) {
        a = new tb(a,String(b),this.name_);
        c && a.setException(c);
        return a
    }
    ;
    f.shout = function(a, b) {
        this.log(wb, a, b)
    }
    ;
    f.severe = function(a, b) {
        this.log(xb, a, b)
    }
    ;
    f.warning = function(a, b) {
        this.log(yb, a, b)
    }
    ;
    f.info = function(a, b) {
        this.log(zb, a, b)
    }
    ;
    f.config = function(a, b) {
        this.log(Ab, a, b)
    }
    ;
    f.fine = function(a, b) {
        this.log(Bb, a, b)
    }
    ;
    f.finer = function(a, b) {
        this.log(Cb, a, b)
    }
    ;
    f.finest = function(a, b) {
        this.log(Db, a, b)
    }
    ;
    f.logRecord = function(a) {
        this.isLoggable(a.getLevel()) && this.doLogRecord_(a)
    }
    ;
    f.doLogRecord_ = function(a) {
        for (var b = this; b; )
            b.callPublish_(a),
            b = b.getParent()
    }
    ;
    f.callPublish_ = function(a) {
        if (this.handlers_)
            for (var b = 0, c; c = this.handlers_[b]; b++)
                c(a)
    }
    ;
    f.setParent_ = function(a) {
        this.parent_ = a
    }
    ;
    f.addChild_ = function(a, b) {
        this.getChildren()[a] = b
    }
    ;
    var Eb = {}
      , Fb = null;
    function Gb(a) {
        Fb || (Fb = new vb(""),
        Eb[""] = Fb,
        Fb.setLevel(Ab));
        var b;
        if (!(b = Eb[a])) {
            b = new vb(a);
            var c = a.lastIndexOf(".")
              , d = a.substr(0, c);
            c = a.substr(c + 1);
            d = Gb(d);
            d.addChild_(c, b);
            b.setParent_(d);
            Eb[a] = b
        }
        return b
    }
    ;function J() {
        this.disposed_ = this.disposed_;
        this.onDisposeCallbacks_ = this.onDisposeCallbacks_
    }
    f = J.prototype;
    f.disposed_ = !1;
    f.isDisposed = function() {
        return this.disposed_
    }
    ;
    f.getDisposed = J.prototype.isDisposed;
    f.dispose = function() {
        this.disposed_ || (this.disposed_ = !0,
        this.disposeInternal())
    }
    ;
    f.registerDisposable = function(a) {
        this.addOnDisposeCallback(xa(Hb, a))
    }
    ;
    f.addOnDisposeCallback = function(a, b) {
        this.disposed_ ? r(b) ? a.call(b) : a() : (this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []),
        this.onDisposeCallbacks_.push(r(b) ? x(a, b) : a))
    }
    ;
    f.disposeInternal = function() {
        if (this.onDisposeCallbacks_)
            for (; this.onDisposeCallbacks_.length; )
                this.onDisposeCallbacks_.shift()()
    }
    ;
    function Hb(a) {
        a && "function" == typeof a.dispose && a.dispose()
    }
    ;function Ib(a, b) {
        this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = a === Jb && b || "";
        this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = Kb
    }
    Ib.prototype.implementsGoogStringTypedString = !0;
    Ib.prototype.getTypedStringValue = function() {
        return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_
    }
    ;
    Ib.prototype.toString = function() {
        return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}"
    }
    ;
    var Kb = {}
      , Jb = {};
    new Ib(Jb,"");
    function Lb() {
        this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = "";
        this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = Mb
    }
    Lb.prototype.implementsGoogStringTypedString = !0;
    var Mb = {};
    Lb.prototype.getTypedStringValue = function() {
        return this.privateDoNotAccessOrElseSafeScriptWrappedValue_
    }
    ;
    Lb.prototype.toString = function() {
        return "SafeScript{" + this.privateDoNotAccessOrElseSafeScriptWrappedValue_ + "}"
    }
    ;
    Lb.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
        this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = a;
        return this
    }
    ;
    (new Lb).initSecurityPrivateDoNotAccessOrElse_("");
    function K() {
        this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
        this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = Nb
    }
    f = K.prototype;
    f.implementsGoogStringTypedString = !0;
    f.getTypedStringValue = function() {
        return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
    }
    ;
    f.implementsGoogI18nBidiDirectionalString = !0;
    f.getDirection = function() {
        return 1
    }
    ;
    f.toString = function() {
        return "SafeUrl{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
    }
    ;
    var Ob = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i
      , Nb = {};
    function Pb(a) {
        var b = new K;
        b.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
        return b
    }
    Pb("about:blank");
    function Qb() {
        this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "";
        this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = Rb
    }
    Qb.prototype.implementsGoogStringTypedString = !0;
    var Rb = {};
    Qb.prototype.getTypedStringValue = function() {
        return this.privateDoNotAccessOrElseSafeStyleWrappedValue_
    }
    ;
    Qb.prototype.toString = function() {
        return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}"
    }
    ;
    Qb.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
        this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = a;
        return this
    }
    ;
    (new Qb).initSecurityPrivateDoNotAccessOrElse_("");
    function Sb() {
        this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = "";
        this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = Tb
    }
    Sb.prototype.implementsGoogStringTypedString = !0;
    var Tb = {};
    Sb.prototype.getTypedStringValue = function() {
        return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_
    }
    ;
    Sb.prototype.toString = function() {
        return "SafeStyleSheet{" + this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ + "}"
    }
    ;
    Sb.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
        this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = a;
        return this
    }
    ;
    (new Sb).initSecurityPrivateDoNotAccessOrElse_("");
    function Ub() {
        this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
        this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = Vb;
        this.dir_ = null
    }
    f = Ub.prototype;
    f.implementsGoogI18nBidiDirectionalString = !0;
    f.getDirection = function() {
        return this.dir_
    }
    ;
    f.implementsGoogStringTypedString = !0;
    f.getTypedStringValue = function() {
        return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
    }
    ;
    f.toString = function() {
        return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
    }
    ;
    var Vb = {};
    Ub.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a, b) {
        this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
        this.dir_ = b;
        return this
    }
    ;
    (new Ub).initSecurityPrivateDoNotAccessOrElse_("<!DOCTYPE html>", 0);
    (new Ub).initSecurityPrivateDoNotAccessOrElse_("", 0);
    (new Ub).initSecurityPrivateDoNotAccessOrElse_("<br>", 0);
    (function(a) {
        var b = !1, c;
        return function() {
            b || (c = a(),
            b = !0);
            return c
        }
    }
    )(function() {
        if ("undefined" === typeof document)
            return !1;
        var a = document.createElement("div");
        a.innerHTML = "<div><div></div></div>";
        if (!a.firstChild)
            return !1;
        var b = a.firstChild.firstChild;
        a.innerHTML = "";
        return !b.parentElement
    });
    var Wb = !F || 9 <= Number(pb)
      , Xb = !F || 9 <= Number(pb)
      , Yb = F && !H("9");
    !G || H("528");
    fb && H("1.9b") || F && H("8") || db && H("9.5") || G && H("528");
    fb && !H("8") || F && H("9");
    var Zb = function() {
        if (!q.addEventListener || !Object.defineProperty)
            return !1;
        var a = !1
          , b = Object.defineProperty({}, "passive", {
            get: function() {
                a = !0
            }
        });
        try {
            q.addEventListener("test", sa, b),
            q.removeEventListener("test", sa, b)
        } catch (c) {}
        return a
    }();
    function L(a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = this.propagationStopped_ = !1;
        this.returnValue_ = !0
    }
    L.prototype.stopPropagation = function() {
        this.propagationStopped_ = !0
    }
    ;
    L.prototype.preventDefault = function() {
        this.defaultPrevented = !0;
        this.returnValue_ = !1
    }
    ;
    function $b(a) {
        return G ? "webkit" + a : db ? "o" + a.toLowerCase() : a.toLowerCase()
    }
    $b("AnimationStart");
    $b("AnimationEnd");
    $b("AnimationIteration");
    $b("TransitionEnd");
    function M(a, b) {
        L.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.key = "";
        this.charCode = this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.platformModifierKey = !1;
        this.pointerId = 0;
        this.pointerType = "";
        this.event_ = null;
        a && this.init(a, b)
    }
    z(M, L);
    var ac = sb([1, 4, 2])
      , bc = sb({
        2: "touch",
        3: "pen",
        4: "mouse"
    });
    f = M.prototype;
    f.init = function(a, b) {
        var c = this.type = a.type
          , d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        if (b = a.relatedTarget) {
            if (fb) {
                a: {
                    try {
                        bb(b.nodeName);
                        var e = !0;
                        break a
                    } catch (g) {}
                    e = !1
                }
                e || (b = null)
            }
        } else
            "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
        this.relatedTarget = b;
        d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX,
        this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY,
        this.screenX = d.screenX || 0,
        this.screenY = d.screenY || 0) : (this.offsetX = G || void 0 !== a.offsetX ? a.offsetX : a.layerX,
        this.offsetY = G || void 0 !== a.offsetY ? a.offsetY : a.layerY,
        this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX,
        this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY,
        this.screenX = a.screenX || 0,
        this.screenY = a.screenY || 0);
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.key = a.key || "";
        this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.platformModifierKey = gb ? a.metaKey : a.ctrlKey;
        this.pointerId = a.pointerId || 0;
        this.pointerType = t(a.pointerType) ? a.pointerType : bc[a.pointerType] || "";
        this.state = a.state;
        this.event_ = a;
        a.defaultPrevented && this.preventDefault()
    }
    ;
    f.isButton = function(a) {
        return Wb ? this.event_.button == a : "click" == this.type ? 0 == a : !!(this.event_.button & ac[a])
    }
    ;
    f.isMouseActionButton = function() {
        return this.isButton(0) && !(G && gb && this.ctrlKey)
    }
    ;
    f.stopPropagation = function() {
        M.superClass_.stopPropagation.call(this);
        this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0
    }
    ;
    f.preventDefault = function() {
        M.superClass_.preventDefault.call(this);
        var a = this.event_;
        if (a.preventDefault)
            a.preventDefault();
        else if (a.returnValue = !1,
        Yb)
            try {
                if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)
                    a.keyCode = -1
            } catch (b) {}
    }
    ;
    f.getBrowserEvent = function() {
        return this.event_
    }
    ;
    var cc = "closure_listenable_" + (1E6 * Math.random() | 0)
      , dc = 0;
    function ec(a, b, c, d, e, g) {
        this.listener = a;
        this.proxy = b;
        this.src = c;
        this.type = d;
        this.capture = !!e;
        this.handler = g;
        this.key = ++dc;
        this.removed = this.callOnce = !1
    }
    ec.prototype.markAsRemoved = function() {
        this.removed = !0;
        this.handler = this.src = this.proxy = this.listener = null
    }
    ;
    function fc(a) {
        this.src = a;
        this.listeners = {};
        this.typeCount_ = 0
    }
    f = fc.prototype;
    f.getTypeCount = function() {
        return this.typeCount_
    }
    ;
    f.getListenerCount = function() {
        var a = 0, b;
        for (b in this.listeners)
            a += this.listeners[b].length;
        return a
    }
    ;
    f.add = function(a, b, c, d, e) {
        var g = a.toString();
        a = this.listeners[g];
        a || (a = this.listeners[g] = [],
        this.typeCount_++);
        var k = gc(a, b, d, e);
        -1 < k ? (b = a[k],
        c || (b.callOnce = !1)) : (b = new ec(b,null,this.src,g,!!d,e),
        b.callOnce = c,
        a.push(b));
        return b
    }
    ;
    f.remove = function(a, b, c, d) {
        a = a.toString();
        if (!(a in this.listeners))
            return !1;
        var e = this.listeners[a];
        b = gc(e, b, c, d);
        return -1 < b ? (e[b].markAsRemoved(),
        Ja(e, b),
        0 == e.length && (delete this.listeners[a],
        this.typeCount_--),
        !0) : !1
    }
    ;
    f.removeByKey = function(a) {
        var b = a.type;
        if (!(b in this.listeners))
            return !1;
        var c = Ia(this.listeners[b], a);
        c && (a.markAsRemoved(),
        0 == this.listeners[b].length && (delete this.listeners[b],
        this.typeCount_--));
        return c
    }
    ;
    f.removeAll = function(a) {
        a = a && a.toString();
        var b = 0, c;
        for (c in this.listeners)
            if (!a || c == a) {
                for (var d = this.listeners[c], e = 0; e < d.length; e++)
                    ++b,
                    d[e].markAsRemoved();
                delete this.listeners[c];
                this.typeCount_--
            }
        return b
    }
    ;
    f.getListeners = function(a, b) {
        a = this.listeners[a.toString()];
        var c = [];
        if (a)
            for (var d = 0; d < a.length; ++d) {
                var e = a[d];
                e.capture == b && c.push(e)
            }
        return c
    }
    ;
    f.getListener = function(a, b, c, d) {
        a = this.listeners[a.toString()];
        var e = -1;
        a && (e = gc(a, b, c, d));
        return -1 < e ? a[e] : null
    }
    ;
    f.hasListener = function(a, b) {
        var c = r(a)
          , d = c ? a.toString() : ""
          , e = r(b);
        return Va(this.listeners, function(a) {
            for (var g = 0; g < a.length; ++g)
                if (!(c && a[g].type != d || e && a[g].capture != b))
                    return !0;
            return !1
        })
    }
    ;
    function gc(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var g = a[e];
            if (!g.removed && g.listener == b && g.capture == !!c && g.handler == d)
                return e
        }
        return -1
    }
    ;var hc = "closure_lm_" + (1E6 * Math.random() | 0)
      , ic = {}
      , jc = 0;
    function kc(a, b, c, d, e) {
        if (d && d.once)
            return lc(a, b, c, d, e);
        if (ta(b)) {
            for (var g = 0; g < b.length; g++)
                kc(a, b[g], c, d, e);
            return null
        }
        c = mc(c);
        return a && a[cc] ? (d = ua(d) ? !!d.capture : !!d,
        a.listen(b, c, d, e)) : nc(a, b, c, !1, d, e)
    }
    function nc(a, b, c, d, e, g) {
        if (!b)
            throw Error("Invalid event type");
        var k = ua(e) ? !!e.capture : !!e
          , m = oc(a);
        m || (a[hc] = m = new fc(a));
        c = m.add(b, c, d, k, g);
        if (c.proxy)
            return c;
        d = pc();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener)
            Zb || (e = k),
            void 0 === e && (e = !1),
            a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent)
            a.attachEvent(qc(b.toString()), d);
        else if (a.addListener && a.removeListener)
            A("change" === b, "MediaQueryList only has a change event"),
            a.addListener(d);
        else
            throw Error("addEventListener and attachEvent are unavailable.");
        jc++;
        return c
    }
    function pc() {
        var a = rc
          , b = Xb ? function(c) {
            return a.call(b.src, b.listener, c)
        }
        : function(c) {
            c = a.call(b.src, b.listener, c);
            if (!c)
                return c
        }
        ;
        return b
    }
    function lc(a, b, c, d, e) {
        if (ta(b)) {
            for (var g = 0; g < b.length; g++)
                lc(a, b[g], c, d, e);
            return null
        }
        c = mc(c);
        return a && a[cc] ? (d = ua(d) ? !!d.capture : !!d,
        a.listenOnce(b, c, d, e)) : nc(a, b, c, !0, d, e)
    }
    function sc(a, b, c, d, e) {
        if (ta(b)) {
            for (var g = 0; g < b.length; g++)
                sc(a, b[g], c, d, e);
            return null
        }
        d = ua(d) ? !!d.capture : !!d;
        c = mc(c);
        if (a && a[cc])
            return a.unlisten(b, c, d, e);
        if (!a)
            return !1;
        if (a = oc(a))
            if (b = a.getListener(b, c, d, e))
                return tc(b);
        return !1
    }
    function tc(a) {
        if (ra(a) || !a || a.removed)
            return !1;
        var b = a.src;
        if (b && b[cc])
            return b.unlistenByKey(a);
        var c = a.type
          , d = a.proxy;
        b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(qc(c), d) : b.addListener && b.removeListener && b.removeListener(d);
        jc--;
        (c = oc(b)) ? (c.removeByKey(a),
        0 == c.getTypeCount() && (c.src = null,
        b[hc] = null)) : a.markAsRemoved();
        return !0
    }
    function qc(a) {
        return a in ic ? ic[a] : ic[a] = "on" + a
    }
    function uc(a, b, c, d) {
        var e = !0;
        if (a = oc(a))
            if (b = a.listeners[b.toString()])
                for (b = b.concat(),
                a = 0; a < b.length; a++) {
                    var g = b[a];
                    g && g.capture == c && !g.removed && (g = vc(g, d),
                    e = e && !1 !== g)
                }
        return e
    }
    function vc(a, b) {
        var c = a.listener
          , d = a.handler || a.src;
        a.callOnce && tc(a);
        return c.call(d, b)
    }
    function rc(a, b) {
        if (a.removed)
            return !0;
        if (!Xb) {
            var c = b || u("window.event");
            b = new M(c,this);
            var d = !0;
            if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                a: {
                    var e = !1;
                    if (0 == c.keyCode)
                        try {
                            c.keyCode = -1;
                            break a
                        } catch (k) {
                            e = !0
                        }
                    if (e || void 0 == c.returnValue)
                        c.returnValue = !0
                }
                c = [];
                for (e = b.currentTarget; e; e = e.parentNode)
                    c.push(e);
                a = a.type;
                for (e = c.length - 1; !b.propagationStopped_ && 0 <= e; e--) {
                    b.currentTarget = c[e];
                    var g = uc(c[e], a, !0, b);
                    d = d && g
                }
                for (e = 0; !b.propagationStopped_ && e < c.length; e++)
                    b.currentTarget = c[e],
                    g = uc(c[e], a, !1, b),
                    d = d && g
            }
            return d
        }
        return vc(a, new M(b,this))
    }
    function oc(a) {
        a = a[hc];
        return a instanceof fc ? a : null
    }
    var wc = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
    function mc(a) {
        A(a, "Listener can not be null.");
        if ("function" == v(a))
            return a;
        A(a.handleEvent, "An object listener must have handleEvent method.");
        a[wc] || (a[wc] = function(b) {
            return a.handleEvent(b)
        }
        );
        return a[wc]
    }
    ;function N() {
        J.call(this);
        this.eventTargetListeners_ = new fc(this);
        this.actualEventTarget_ = this;
        this.parentEventTarget_ = null
    }
    z(N, J);
    N.prototype[cc] = !0;
    f = N.prototype;
    f.getParentEventTarget = function() {
        return this.parentEventTarget_
    }
    ;
    f.setParentEventTarget = function(a) {
        this.parentEventTarget_ = a
    }
    ;
    f.addEventListener = function(a, b, c, d) {
        kc(this, a, b, c, d)
    }
    ;
    f.removeEventListener = function(a, b, c, d) {
        sc(this, a, b, c, d)
    }
    ;
    f.dispatchEvent = function(a) {
        this.assertInitialized_();
        var b = this.getParentEventTarget();
        if (b) {
            var c = [];
            for (var d = 1; b; b = b.getParentEventTarget())
                c.push(b),
                A(1E3 > ++d, "infinite loop")
        }
        b = this.actualEventTarget_;
        d = a.type || a;
        if (t(a))
            a = new L(a,b);
        else if (a instanceof L)
            a.target = a.target || b;
        else {
            var e = a;
            a = new L(d,b);
            Xa(a, e)
        }
        e = !0;
        if (c)
            for (var g = c.length - 1; !a.propagationStopped_ && 0 <= g; g--) {
                var k = a.currentTarget = c[g];
                e = k.fireListeners(d, !0, a) && e
            }
        a.propagationStopped_ || (k = a.currentTarget = b,
        e = k.fireListeners(d, !0, a) && e,
        a.propagationStopped_ || (e = k.fireListeners(d, !1, a) && e));
        if (c)
            for (g = 0; !a.propagationStopped_ && g < c.length; g++)
                k = a.currentTarget = c[g],
                e = k.fireListeners(d, !1, a) && e;
        return e
    }
    ;
    f.disposeInternal = function() {
        N.superClass_.disposeInternal.call(this);
        this.removeAllListeners();
        this.parentEventTarget_ = null
    }
    ;
    f.listen = function(a, b, c, d) {
        this.assertInitialized_();
        return this.eventTargetListeners_.add(String(a), b, !1, c, d)
    }
    ;
    f.listenOnce = function(a, b, c, d) {
        return this.eventTargetListeners_.add(String(a), b, !0, c, d)
    }
    ;
    f.unlisten = function(a, b, c, d) {
        return this.eventTargetListeners_.remove(String(a), b, c, d)
    }
    ;
    f.unlistenByKey = function(a) {
        return this.eventTargetListeners_.removeByKey(a)
    }
    ;
    f.removeAllListeners = function(a) {
        return this.eventTargetListeners_ ? this.eventTargetListeners_.removeAll(a) : 0
    }
    ;
    f.fireListeners = function(a, b, c) {
        a = this.eventTargetListeners_.listeners[String(a)];
        if (!a)
            return !0;
        a = a.concat();
        for (var d = !0, e = 0; e < a.length; ++e) {
            var g = a[e];
            if (g && !g.removed && g.capture == b) {
                var k = g.listener
                  , m = g.handler || g.src;
                g.callOnce && this.unlistenByKey(g);
                d = !1 !== k.call(m, c) && d
            }
        }
        return d && 0 != c.returnValue_
    }
    ;
    f.getListeners = function(a, b) {
        return this.eventTargetListeners_.getListeners(String(a), b)
    }
    ;
    f.getListener = function(a, b, c, d) {
        return this.eventTargetListeners_.getListener(String(a), b, c, d)
    }
    ;
    f.hasListener = function(a, b) {
        a = r(a) ? String(a) : void 0;
        return this.eventTargetListeners_.hasListener(a, b)
    }
    ;
    f.setTargetForTesting = function(a) {
        this.actualEventTarget_ = a
    }
    ;
    f.assertInitialized_ = function() {
        A(this.eventTargetListeners_, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
    }
    ;
    var O = "StopIteration"in q ? q.StopIteration : {
        message: "StopIteration",
        stack: ""
    };
    function P() {}
    P.prototype.next = function() {
        throw O;
    }
    ;
    P.prototype.__iterator__ = function() {
        return this
    }
    ;
    function xc(a) {
        if (a instanceof P)
            return a;
        if ("function" == typeof a.__iterator__)
            return a.__iterator__(!1);
        if (w(a)) {
            var b = 0
              , c = new P;
            c.next = function() {
                for (; ; ) {
                    if (b >= a.length)
                        throw O;
                    if (b in a)
                        return a[b++];
                    b++
                }
            }
            ;
            return c
        }
        throw Error("Not implemented");
    }
    function yc(a, b, c) {
        if (w(a))
            try {
                Ga(a, b, c)
            } catch (d) {
                if (d !== O)
                    throw d;
            }
        else {
            a = xc(a);
            try {
                for (; ; )
                    b.call(c, a.next(), void 0, a)
            } catch (d) {
                if (d !== O)
                    throw d;
            }
        }
    }
    function zc(a) {
        if (w(a))
            return La(a);
        a = xc(a);
        var b = [];
        yc(a, function(a) {
            b.push(a)
        });
        return b
    }
    ;function Ac(a) {
        return /^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
    }
    function Bc(a) {
        a = String(a);
        if (Ac(a))
            try {
                return eval("(" + a + ")")
            } catch (b) {}
        throw Error("Invalid JSON string: " + a);
    }
    function Cc(a, b) {
        return (new Q(b)).serialize(a)
    }
    function Q(a) {
        this.replacer_ = a
    }
    Q.prototype.serialize = function(a) {
        var b = [];
        this.serializeInternal(a, b);
        return b.join("")
    }
    ;
    Q.prototype.serializeInternal = function(a, b) {
        if (null == a)
            b.push("null");
        else {
            if ("object" == typeof a) {
                if (ta(a)) {
                    this.serializeArray(a, b);
                    return
                }
                if (a instanceof String || a instanceof Number || a instanceof Boolean)
                    a = a.valueOf();
                else {
                    this.serializeObject_(a, b);
                    return
                }
            }
            switch (typeof a) {
            case "string":
                this.serializeString_(a, b);
                break;
            case "number":
                this.serializeNumber_(a, b);
                break;
            case "boolean":
                b.push(String(a));
                break;
            case "function":
                b.push("null");
                break;
            default:
                throw Error("Unknown type: " + typeof a);
            }
        }
    }
    ;
    var Dc = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
    }
      , Ec = /\uffff/.test("\uffff") ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g;
    Q.prototype.serializeString_ = function(a, b) {
        b.push('"', a.replace(Ec, function(a) {
            var b = Dc[a];
            b || (b = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1),
            Dc[a] = b);
            return b
        }), '"')
    }
    ;
    Q.prototype.serializeNumber_ = function(a, b) {
        b.push(isFinite(a) && !isNaN(a) ? String(a) : "null")
    }
    ;
    Q.prototype.serializeArray = function(a, b) {
        var c = a.length;
        b.push("[");
        for (var d = "", e = 0; e < c; e++)
            b.push(d),
            d = a[e],
            this.serializeInternal(this.replacer_ ? this.replacer_.call(a, String(e), d) : d, b),
            d = ",";
        b.push("]")
    }
    ;
    Q.prototype.serializeObject_ = function(a, b) {
        b.push("{");
        var c = "", d;
        for (d in a)
            if (Object.prototype.hasOwnProperty.call(a, d)) {
                var e = a[d];
                "function" != typeof e && (b.push(c),
                this.serializeString_(d, b),
                b.push(":"),
                this.serializeInternal(this.replacer_ ? this.replacer_.call(a, d, e) : e, b),
                c = ",")
            }
        b.push("}")
    }
    ;
    function R(a, b, c) {
        a && a.fine(b, c)
    }
    ;function Fc(a) {
        this.document_ = a || {
            cookie: ""
        }
    }
    f = Fc.prototype;
    f.isEnabled = function() {
        return navigator.cookieEnabled
    }
    ;
    f.isValidName = function(a) {
        return !/[;=\s]/.test(a)
    }
    ;
    f.isValidValue = function(a) {
        return !/[;\r\n]/.test(a)
    }
    ;
    f.set = function(a, b, c, d, e, g) {
        if (!this.isValidName(a))
            throw Error('Invalid cookie name "' + a + '"');
        if (!this.isValidValue(b))
            throw Error('Invalid cookie value "' + b + '"');
        r(c) || (c = -1);
        e = e ? ";domain=" + e : "";
        d = d ? ";path=" + d : "";
        g = g ? ";secure" : "";
        c = 0 > c ? "" : 0 == c ? ";expires=" + (new Date(1970,1,1)).toUTCString() : ";expires=" + (new Date(y() + 1E3 * c)).toUTCString();
        this.setCookie_(a + "=" + b + e + d + c + g)
    }
    ;
    f.get = function(a, b) {
        for (var c = a + "=", d = this.getParts_(), e = 0, g; e < d.length; e++) {
            g = Na(d[e]);
            if (0 == g.lastIndexOf(c, 0))
                return g.substr(c.length);
            if (g == a)
                return ""
        }
        return b
    }
    ;
    f.remove = function(a, b, c) {
        var d = this.containsKey(a);
        this.set(a, "", 0, b, c);
        return d
    }
    ;
    f.getKeys = function() {
        return this.getKeyValues_().keys
    }
    ;
    f.getValues = function() {
        return this.getKeyValues_().values
    }
    ;
    f.isEmpty = function() {
        return !this.getCookie_()
    }
    ;
    f.getCount = function() {
        return this.getCookie_() ? this.getParts_().length : 0
    }
    ;
    f.containsKey = function(a) {
        return r(this.get(a))
    }
    ;
    f.containsValue = function(a) {
        for (var b = this.getKeyValues_().values, c = 0; c < b.length; c++)
            if (b[c] == a)
                return !0;
        return !1
    }
    ;
    f.clear = function() {
        for (var a = this.getKeyValues_().keys, b = a.length - 1; 0 <= b; b--)
            this.remove(a[b])
    }
    ;
    f.setCookie_ = function(a) {
        this.document_.cookie = a
    }
    ;
    f.getCookie_ = function() {
        return this.document_.cookie
    }
    ;
    f.getParts_ = function() {
        return (this.getCookie_() || "").split(";")
    }
    ;
    f.getKeyValues_ = function() {
        for (var a = this.getParts_(), b = [], c = [], d, e, g = 0; g < a.length; g++)
            e = Na(a[g]),
            d = e.indexOf("="),
            -1 == d ? (b.push(""),
            c.push(e)) : (b.push(e.substring(0, d)),
            c.push(e.substring(d + 1)));
        return {
            keys: b,
            values: c
        }
    }
    ;
    var Gc = new Fc("undefined" == typeof document ? null : document);
    function Hc() {}
    Hc.prototype.cachedOptions_ = null;
    Hc.prototype.getOptions = function() {
        return this.cachedOptions_ || (this.cachedOptions_ = this.internalGetOptions())
    }
    ;
    var Ic;
    function Jc() {}
    z(Jc, Hc);
    Jc.prototype.createInstance = function() {
        var a = this.getProgId_();
        return a ? new ActiveXObject(a) : new XMLHttpRequest
    }
    ;
    Jc.prototype.internalGetOptions = function() {
        var a = {};
        this.getProgId_() && (a[0] = !0,
        a[1] = !0);
        return a
    }
    ;
    Jc.prototype.getProgId_ = function() {
        if (!this.ieProgId_ && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var a = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], b = 0; b < a.length; b++) {
                var c = a[b];
                try {
                    return new ActiveXObject(c),
                    this.ieProgId_ = c
                } catch (d) {}
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return this.ieProgId_
    }
    ;
    Ic = new Jc;
    function S(a, b) {
        this.map_ = {};
        this.keys_ = [];
        this.version_ = this.count_ = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2)
                throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2)
                this.set(arguments[d], arguments[d + 1])
        } else
            a && this.addAll(a)
    }
    f = S.prototype;
    f.getCount = function() {
        return this.count_
    }
    ;
    f.getValues = function() {
        this.cleanupKeysArray_();
        for (var a = [], b = 0; b < this.keys_.length; b++)
            a.push(this.map_[this.keys_[b]]);
        return a
    }
    ;
    f.getKeys = function() {
        this.cleanupKeysArray_();
        return this.keys_.concat()
    }
    ;
    f.containsKey = function(a) {
        return T(this.map_, a)
    }
    ;
    f.containsValue = function(a) {
        for (var b = 0; b < this.keys_.length; b++) {
            var c = this.keys_[b];
            if (T(this.map_, c) && this.map_[c] == a)
                return !0
        }
        return !1
    }
    ;
    f.equals = function(a, b) {
        if (this === a)
            return !0;
        if (this.count_ != a.getCount())
            return !1;
        b = b || Kc;
        this.cleanupKeysArray_();
        for (var c, d = 0; c = this.keys_[d]; d++)
            if (!b(this.get(c), a.get(c)))
                return !1;
        return !0
    }
    ;
    function Kc(a, b) {
        return a === b
    }
    f.isEmpty = function() {
        return 0 == this.count_
    }
    ;
    f.clear = function() {
        this.map_ = {};
        this.version_ = this.count_ = this.keys_.length = 0
    }
    ;
    f.remove = function(a) {
        return T(this.map_, a) ? (delete this.map_[a],
        this.count_--,
        this.version_++,
        this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(),
        !0) : !1
    }
    ;
    f.cleanupKeysArray_ = function() {
        if (this.count_ != this.keys_.length) {
            for (var a = 0, b = 0; a < this.keys_.length; ) {
                var c = this.keys_[a];
                T(this.map_, c) && (this.keys_[b++] = c);
                a++
            }
            this.keys_.length = b
        }
        if (this.count_ != this.keys_.length) {
            var d = {};
            for (b = a = 0; a < this.keys_.length; )
                c = this.keys_[a],
                T(d, c) || (this.keys_[b++] = c,
                d[c] = 1),
                a++;
            this.keys_.length = b
        }
    }
    ;
    f.get = function(a, b) {
        return T(this.map_, a) ? this.map_[a] : b
    }
    ;
    f.set = function(a, b) {
        T(this.map_, a) || (this.count_++,
        this.keys_.push(a),
        this.version_++);
        this.map_[a] = b
    }
    ;
    f.addAll = function(a) {
        if (a instanceof S)
            for (var b = a.getKeys(), c = 0; c < b.length; c++)
                this.set(b[c], a.get(b[c]));
        else
            for (b in a)
                this.set(b, a[b])
    }
    ;
    f.forEach = function(a, b) {
        for (var c = this.getKeys(), d = 0; d < c.length; d++) {
            var e = c[d]
              , g = this.get(e);
            a.call(b, g, e, this)
        }
    }
    ;
    f.clone = function() {
        return new S(this)
    }
    ;
    f.transpose = function() {
        for (var a = new S, b = 0; b < this.keys_.length; b++) {
            var c = this.keys_[b];
            a.set(this.map_[c], c)
        }
        return a
    }
    ;
    f.toObject = function() {
        this.cleanupKeysArray_();
        for (var a = {}, b = 0; b < this.keys_.length; b++) {
            var c = this.keys_[b];
            a[c] = this.map_[c]
        }
        return a
    }
    ;
    f.getKeyIterator = function() {
        return this.__iterator__(!0)
    }
    ;
    f.getValueIterator = function() {
        return this.__iterator__(!1)
    }
    ;
    f.__iterator__ = function(a) {
        this.cleanupKeysArray_();
        var b = 0
          , c = this.version_
          , d = this
          , e = new P;
        e.next = function() {
            if (c != d.version_)
                throw Error("The map has changed since the iterator was created");
            if (b >= d.keys_.length)
                throw O;
            var e = d.keys_[b++];
            return a ? e : d.map_[e]
        }
        ;
        return e
    }
    ;
    function T(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
    ;function Lc(a) {
        if (a.getValues && "function" == typeof a.getValues)
            return a.getValues();
        if (t(a))
            return a.split("");
        if (w(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++)
                b.push(a[d]);
            return b
        }
        b = [];
        c = 0;
        for (d in a)
            b[c++] = a[d];
        return b
    }
    function Mc(a, b, c) {
        if (a.forEach && "function" == typeof a.forEach)
            a.forEach(b, c);
        else if (w(a) || t(a))
            Ga(a, b, c);
        else {
            if (a.getKeys && "function" == typeof a.getKeys)
                var d = a.getKeys();
            else if (a.getValues && "function" == typeof a.getValues)
                d = void 0;
            else if (w(a) || t(a)) {
                d = [];
                for (var e = a.length, g = 0; g < e; g++)
                    d.push(g)
            } else
                for (g in d = [],
                e = 0,
                a)
                    d[e++] = g;
            e = Lc(a);
            g = e.length;
            for (var k = 0; k < g; k++)
                b.call(c, e[k], d && d[k], a)
        }
    }
    ;function Nc() {
        this.next = this.context = this.onRejected = this.onFulfilled = this.child = null;
        this.always = !1
    }
    Nc.prototype.reset = function() {
        this.context = this.onRejected = this.onFulfilled = this.child = null;
        this.always = !1
    }
    ;
    new Ma(function() {
        return new Nc
    }
    ,function(a) {
        a.reset()
    }
    ,100);
    function Oc(a, b, c) {
        if ("function" == v(a))
            c && (a = x(a, c));
        else if (a && "function" == typeof a.handleEvent)
            a = x(a.handleEvent, a);
        else
            throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : q.setTimeout(a, b || 0)
    }
    ;var Pc = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
    function Qc(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("=")
                  , e = null;
                if (0 <= d) {
                    var g = a[c].substring(0, d);
                    e = a[c].substring(d + 1)
                } else
                    g = a[c];
                b(g, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
            }
        }
    }
    ;function U(a) {
        N.call(this);
        this.headers = new S;
        this.xmlHttpFactory_ = a || null;
        this.active_ = !1;
        this.xhrOptions_ = this.xhr_ = null;
        this.lastMethod_ = this.lastUri_ = "";
        this.lastErrorCode_ = 0;
        this.lastError_ = "";
        this.inAbort_ = this.inOpen_ = this.inSend_ = this.errorDispatched_ = !1;
        this.timeoutInterval_ = 0;
        this.timeoutId_ = null;
        this.responseType_ = "";
        this.useXhr2Timeout_ = this.progressEventsEnabled_ = this.withCredentials_ = !1
    }
    z(U, N);
    var Rc = U.prototype
      , Sc = Gb("goog.net.XhrIo");
    Rc.logger_ = Sc;
    var Tc = /^https?$/i
      , Uc = ["POST", "PUT"]
      , Vc = [];
    f = U.prototype;
    f.cleanupSend_ = function() {
        this.dispose();
        Ia(Vc, this)
    }
    ;
    f.getTimeoutInterval = function() {
        return this.timeoutInterval_
    }
    ;
    f.setTimeoutInterval = function(a) {
        this.timeoutInterval_ = Math.max(0, a)
    }
    ;
    f.setResponseType = function(a) {
        this.responseType_ = a
    }
    ;
    f.getResponseType = function() {
        return this.responseType_
    }
    ;
    f.setWithCredentials = function(a) {
        this.withCredentials_ = a
    }
    ;
    f.getWithCredentials = function() {
        return this.withCredentials_
    }
    ;
    f.setProgressEventsEnabled = function(a) {
        this.progressEventsEnabled_ = a
    }
    ;
    f.getProgressEventsEnabled = function() {
        return this.progressEventsEnabled_
    }
    ;
    f.send = function(a, b, c, d) {
        if (this.xhr_)
            throw Error("[goog.net.XhrIo] Object is active with another request=" + this.lastUri_ + "; newUri=" + a);
        b = b ? b.toUpperCase() : "GET";
        this.lastUri_ = a;
        this.lastError_ = "";
        this.lastErrorCode_ = 0;
        this.lastMethod_ = b;
        this.errorDispatched_ = !1;
        this.active_ = !0;
        this.xhr_ = this.createXhr();
        this.xhrOptions_ = this.xmlHttpFactory_ ? this.xmlHttpFactory_.getOptions() : Ic.getOptions();
        this.xhr_.onreadystatechange = x(this.onReadyStateChange_, this);
        this.getProgressEventsEnabled() && "onprogress"in this.xhr_ && (this.xhr_.onprogress = x(function(a) {
            this.onProgressHandler_(a, !0)
        }, this),
        this.xhr_.upload && (this.xhr_.upload.onprogress = x(this.onProgressHandler_, this)));
        try {
            R(this.logger_, this.formatMsg_("Opening Xhr")),
            this.inOpen_ = !0,
            this.xhr_.open(b, String(a), !0),
            this.inOpen_ = !1
        } catch (g) {
            R(this.logger_, this.formatMsg_("Error opening Xhr: " + g.message));
            this.error_(5, g);
            return
        }
        a = c || "";
        var e = this.headers.clone();
        d && Mc(d, function(a, b) {
            e.set(b, a)
        });
        d = Ha(e.getKeys(), Wc);
        c = q.FormData && a instanceof q.FormData;
        !(0 <= Fa(Uc, b)) || d || c || e.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        e.forEach(function(a, b) {
            this.xhr_.setRequestHeader(b, a)
        }, this);
        this.responseType_ && (this.xhr_.responseType = this.responseType_);
        "withCredentials"in this.xhr_ && this.xhr_.withCredentials !== this.withCredentials_ && (this.xhr_.withCredentials = this.withCredentials_);
        try {
            this.cleanUpTimeoutTimer_(),
            0 < this.timeoutInterval_ && (this.useXhr2Timeout_ = Xc(this.xhr_),
            R(this.logger_, this.formatMsg_("Will abort after " + this.timeoutInterval_ + "ms if incomplete, xhr2 " + this.useXhr2Timeout_)),
            this.useXhr2Timeout_ ? (this.xhr_.timeout = this.timeoutInterval_,
            this.xhr_.ontimeout = x(this.timeout_, this)) : this.timeoutId_ = Oc(this.timeout_, this.timeoutInterval_, this)),
            R(this.logger_, this.formatMsg_("Sending request")),
            this.inSend_ = !0,
            this.xhr_.send(a),
            this.inSend_ = !1
        } catch (g) {
            R(this.logger_, this.formatMsg_("Send error: " + g.message)),
            this.error_(5, g)
        }
    }
    ;
    function Xc(a) {
        return F && H(9) && ra(a.timeout) && r(a.ontimeout)
    }
    function Wc(a) {
        return "content-type" == a.toLowerCase()
    }
    f.createXhr = function() {
        return this.xmlHttpFactory_ ? this.xmlHttpFactory_.createInstance() : Ic.createInstance()
    }
    ;
    f.timeout_ = function() {
        "undefined" != typeof qa && this.xhr_ && (this.lastError_ = "Timed out after " + this.timeoutInterval_ + "ms, aborting",
        this.lastErrorCode_ = 8,
        R(this.logger_, this.formatMsg_(this.lastError_)),
        this.dispatchEvent("timeout"),
        this.abort(8))
    }
    ;
    f.error_ = function(a, b) {
        this.active_ = !1;
        this.xhr_ && (this.inAbort_ = !0,
        this.xhr_.abort(),
        this.inAbort_ = !1);
        this.lastError_ = b;
        this.lastErrorCode_ = a;
        this.dispatchErrors_();
        this.cleanUpXhr_()
    }
    ;
    f.dispatchErrors_ = function() {
        this.errorDispatched_ || (this.errorDispatched_ = !0,
        this.dispatchEvent("complete"),
        this.dispatchEvent("error"))
    }
    ;
    f.abort = function(a) {
        this.xhr_ && this.active_ && (R(this.logger_, this.formatMsg_("Aborting")),
        this.active_ = !1,
        this.inAbort_ = !0,
        this.xhr_.abort(),
        this.inAbort_ = !1,
        this.lastErrorCode_ = a || 7,
        this.dispatchEvent("complete"),
        this.dispatchEvent("abort"),
        this.cleanUpXhr_())
    }
    ;
    f.disposeInternal = function() {
        this.xhr_ && (this.active_ && (this.active_ = !1,
        this.inAbort_ = !0,
        this.xhr_.abort(),
        this.inAbort_ = !1),
        this.cleanUpXhr_(!0));
        U.superClass_.disposeInternal.call(this)
    }
    ;
    f.onReadyStateChange_ = function() {
        if (!this.isDisposed())
            if (this.inOpen_ || this.inSend_ || this.inAbort_)
                this.onReadyStateChangeHelper_();
            else
                this.onReadyStateChangeEntryPoint_()
    }
    ;
    f.onReadyStateChangeEntryPoint_ = function() {
        this.onReadyStateChangeHelper_()
    }
    ;
    f.onReadyStateChangeHelper_ = function() {
        if (this.active_ && "undefined" != typeof qa)
            if (this.xhrOptions_[1] && 4 == this.getReadyState() && 2 == this.getStatus())
                R(this.logger_, this.formatMsg_("Local request error detected and ignored"));
            else if (this.inSend_ && 4 == this.getReadyState())
                Oc(this.onReadyStateChange_, 0, this);
            else if (this.dispatchEvent("readystatechange"),
            this.isComplete()) {
                R(this.logger_, this.formatMsg_("Request complete"));
                this.active_ = !1;
                try {
                    this.isSuccess() ? (this.dispatchEvent("complete"),
                    this.dispatchEvent("success")) : (this.lastErrorCode_ = 6,
                    this.lastError_ = this.getStatusText() + " [" + this.getStatus() + "]",
                    this.dispatchErrors_())
                } finally {
                    this.cleanUpXhr_()
                }
            }
    }
    ;
    f.onProgressHandler_ = function(a, b) {
        A("progress" === a.type, "goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");
        this.dispatchEvent(Yc(a, "progress"));
        this.dispatchEvent(Yc(a, b ? "downloadprogress" : "uploadprogress"))
    }
    ;
    function Yc(a, b) {
        return {
            type: b,
            lengthComputable: a.lengthComputable,
            loaded: a.loaded,
            total: a.total
        }
    }
    f.cleanUpXhr_ = function(a) {
        if (this.xhr_) {
            this.cleanUpTimeoutTimer_();
            var b = this.xhr_
              , c = this.xhrOptions_[0] ? sa : null;
            this.xhrOptions_ = this.xhr_ = null;
            a || this.dispatchEvent("ready");
            try {
                b.onreadystatechange = c
            } catch (d) {
                (a = this.logger_) && a.severe("Problem encountered resetting onreadystatechange: " + d.message, void 0)
            }
        }
    }
    ;
    f.cleanUpTimeoutTimer_ = function() {
        this.xhr_ && this.useXhr2Timeout_ && (this.xhr_.ontimeout = null);
        this.timeoutId_ && (q.clearTimeout(this.timeoutId_),
        this.timeoutId_ = null)
    }
    ;
    f.isActive = function() {
        return !!this.xhr_
    }
    ;
    f.isComplete = function() {
        return 4 == this.getReadyState()
    }
    ;
    f.isSuccess = function() {
        var a = this.getStatus();
        a: switch (a) {
        case 200:
        case 201:
        case 202:
        case 204:
        case 206:
        case 304:
        case 1223:
            var b = !0;
            break a;
        default:
            b = !1
        }
        return b || 0 === a && !this.isLastUriEffectiveSchemeHttp_()
    }
    ;
    f.isLastUriEffectiveSchemeHttp_ = function() {
        var a = String(this.lastUri_).match(Pc)[1] || null;
        !a && q.self && q.self.location && (a = q.self.location.protocol,
        a = a.substr(0, a.length - 1));
        a = a ? a.toLowerCase() : "";
        return Tc.test(a)
    }
    ;
    f.getReadyState = function() {
        return this.xhr_ ? this.xhr_.readyState : 0
    }
    ;
    f.getStatus = function() {
        try {
            return 2 < this.getReadyState() ? this.xhr_.status : -1
        } catch (a) {
            return -1
        }
    }
    ;
    f.getStatusText = function() {
        try {
            return 2 < this.getReadyState() ? this.xhr_.statusText : ""
        } catch (a) {
            return R(this.logger_, "Can not get status: " + a.message),
            ""
        }
    }
    ;
    f.getLastUri = function() {
        return String(this.lastUri_)
    }
    ;
    f.getResponseText = function() {
        try {
            return this.xhr_ ? this.xhr_.responseText : ""
        } catch (a) {
            return R(this.logger_, "Can not get responseText: " + a.message),
            ""
        }
    }
    ;
    f.getResponseBody = function() {
        try {
            if (this.xhr_ && "responseBody"in this.xhr_)
                return this.xhr_.responseBody
        } catch (a) {
            R(this.logger_, "Can not get responseBody: " + a.message)
        }
        return null
    }
    ;
    f.getResponseXml = function() {
        try {
            return this.xhr_ ? this.xhr_.responseXML : null
        } catch (a) {
            return R(this.logger_, "Can not get responseXML: " + a.message),
            null
        }
    }
    ;
    f.getResponseJson = function(a) {
        if (this.xhr_) {
            var b = this.xhr_.responseText;
            a && 0 == b.indexOf(a) && (b = b.substring(a.length));
            a: {
                a = b;
                if (q.JSON)
                    try {
                        var c = q.JSON.parse(a);
                        A("object" == typeof c);
                        var d = c;
                        break a
                    } catch (e) {}
                d = Bc(a)
            }
            return d
        }
    }
    ;
    f.getResponse = function() {
        try {
            if (!this.xhr_)
                return null;
            if ("response"in this.xhr_)
                return this.xhr_.response;
            switch (this.responseType_) {
            case "":
            case "text":
                return this.xhr_.responseText;
            case "arraybuffer":
                if ("mozResponseArrayBuffer"in this.xhr_)
                    return this.xhr_.mozResponseArrayBuffer
            }
            var a = this.logger_;
            a && a.severe("Response type " + this.responseType_ + " is not supported on this browser", void 0);
            return null
        } catch (b) {
            return R(this.logger_, "Can not get response: " + b.message),
            null
        }
    }
    ;
    f.getResponseHeader = function(a) {
        if (this.xhr_ && this.isComplete())
            return a = this.xhr_.getResponseHeader(a),
            null === a ? void 0 : a
    }
    ;
    f.getAllResponseHeaders = function() {
        return this.xhr_ && this.isComplete() ? this.xhr_.getAllResponseHeaders() || "" : ""
    }
    ;
    f.getResponseHeaders = function() {
        for (var a = {}, b = this.getAllResponseHeaders().split("\r\n"), c = 0; c < b.length; c++)
            if (!/^[\s\xa0]*$/.test(b[c])) {
                var d = Pa(b[c], ":", 1)
                  , e = d[0];
                d = d[1];
                if (t(d)) {
                    d = d.trim();
                    var g = a[e] || [];
                    a[e] = g;
                    g.push(d)
                }
            }
        return Ua(a, function(a) {
            return a.join(", ")
        })
    }
    ;
    f.getStreamingResponseHeader = function(a) {
        return this.xhr_ ? this.xhr_.getResponseHeader(a) : null
    }
    ;
    f.getAllStreamingResponseHeaders = function() {
        return this.xhr_ ? this.xhr_.getAllResponseHeaders() : ""
    }
    ;
    f.getLastErrorCode = function() {
        return this.lastErrorCode_
    }
    ;
    f.getLastError = function() {
        return t(this.lastError_) ? this.lastError_ : String(this.lastError_)
    }
    ;
    f.formatMsg_ = function(a) {
        return a + " [" + this.lastMethod_ + " " + this.lastUri_ + " " + this.getStatus() + "]"
    }
    ;
    function Zc(a) {
        this.mechanism = a
    }
    Zc.prototype.set = function(a, b) {
        r(b) ? this.mechanism.set(a, Cc(b)) : this.mechanism.remove(a)
    }
    ;
    Zc.prototype.get = function(a) {
        try {
            var b = this.mechanism.get(a)
        } catch (c) {
            return
        }
        if (null !== b)
            try {
                return JSON.parse(b)
            } catch (c) {
                throw "Storage: Invalid value was encountered";
            }
    }
    ;
    Zc.prototype.remove = function(a) {
        this.mechanism.remove(a)
    }
    ;
    function V(a) {
        this.mechanism = a
    }
    z(V, Zc);
    function $c(a) {
        this.data = a
    }
    function ad(a) {
        return !r(a) || a instanceof $c ? a : new $c(a)
    }
    V.prototype.set = function(a, b) {
        V.superClass_.set.call(this, a, ad(b))
    }
    ;
    V.prototype.getWrapper = function(a) {
        a = V.superClass_.get.call(this, a);
        if (!r(a) || a instanceof Object)
            return a;
        throw "Storage: Invalid value was encountered";
    }
    ;
    V.prototype.get = function(a) {
        if (a = this.getWrapper(a)) {
            if (a = a.data,
            !r(a))
                throw "Storage: Invalid value was encountered";
        } else
            a = void 0;
        return a
    }
    ;
    function W(a) {
        this.mechanism = a
    }
    z(W, V);
    W.prototype.set = function(a, b, c) {
        if (b = ad(b)) {
            if (c) {
                if (c < y()) {
                    W.prototype.remove.call(this, a);
                    return
                }
                b.expiration = c
            }
            b.creation = y()
        }
        W.superClass_.set.call(this, a, b)
    }
    ;
    W.prototype.getWrapper = function(a, b) {
        var c = W.superClass_.getWrapper.call(this, a);
        if (c) {
            if (b = !b) {
                b = c.creation;
                var d = c.expiration;
                b = !!d && d < y() || !!b && b > y()
            }
            if (b)
                W.prototype.remove.call(this, a);
            else
                return c
        }
    }
    ;
    function bd() {}
    ;function cd() {}
    z(cd, bd);
    cd.prototype.getCount = function() {
        var a = 0;
        yc(this.__iterator__(!0), function(b) {
            Ea(b);
            a++
        });
        return a
    }
    ;
    cd.prototype.clear = function() {
        var a = zc(this.__iterator__(!0))
          , b = this;
        Ga(a, function(a) {
            b.remove(a)
        })
    }
    ;
    function dd(a) {
        this.storage_ = a
    }
    z(dd, cd);
    f = dd.prototype;
    f.isAvailable = function() {
        if (!this.storage_)
            return !1;
        try {
            return this.storage_.setItem("__sak", "1"),
            this.storage_.removeItem("__sak"),
            !0
        } catch (a) {
            return !1
        }
    }
    ;
    f.set = function(a, b) {
        try {
            this.storage_.setItem(a, b)
        } catch (c) {
            if (0 == this.storage_.length)
                throw "Storage mechanism: Storage disabled";
            throw "Storage mechanism: Quota exceeded";
        }
    }
    ;
    f.get = function(a) {
        a = this.storage_.getItem(a);
        if (!t(a) && null !== a)
            throw "Storage mechanism: Invalid value was encountered";
        return a
    }
    ;
    f.remove = function(a) {
        this.storage_.removeItem(a)
    }
    ;
    f.getCount = function() {
        return this.storage_.length
    }
    ;
    f.__iterator__ = function(a) {
        var b = 0
          , c = this.storage_
          , d = new P;
        d.next = function() {
            if (b >= c.length)
                throw O;
            var d = Ea(c.key(b++));
            if (a)
                return d;
            d = c.getItem(d);
            if (!t(d))
                throw "Storage mechanism: Invalid value was encountered";
            return d
        }
        ;
        return d
    }
    ;
    f.clear = function() {
        this.storage_.clear()
    }
    ;
    f.key = function(a) {
        return this.storage_.key(a)
    }
    ;
    function ed() {
        var a = null;
        try {
            a = window.localStorage || null
        } catch (b) {}
        this.storage_ = a
    }
    z(ed, dd);
    function fd(a, b) {
        this.storageKey_ = a;
        this.storageNode_ = null;
        if (F && !(9 <= Number(pb))) {
            gd || (gd = new S);
            this.storageNode_ = gd.get(a);
            this.storageNode_ || (b ? this.storageNode_ = document.getElementById(b) : (this.storageNode_ = document.createElement("userdata"),
            this.storageNode_.addBehavior("#default#userData"),
            document.body.appendChild(this.storageNode_)),
            gd.set(a, this.storageNode_));
            try {
                this.loadNode_()
            } catch (c) {
                this.storageNode_ = null
            }
        }
    }
    z(fd, cd);
    var hd = {
        ".": ".2E",
        "!": ".21",
        "~": ".7E",
        "*": ".2A",
        "'": ".27",
        "(": ".28",
        ")": ".29",
        "%": "."
    }
      , gd = null;
    function id(a) {
        return "_" + encodeURIComponent(a).replace(/[.!~*'()%]/g, function(a) {
            return hd[a]
        })
    }
    f = fd.prototype;
    f.isAvailable = function() {
        return !!this.storageNode_
    }
    ;
    f.set = function(a, b) {
        this.storageNode_.setAttribute(id(a), b);
        this.saveNode_()
    }
    ;
    f.get = function(a) {
        a = this.storageNode_.getAttribute(id(a));
        if (!t(a) && null !== a)
            throw "Storage mechanism: Invalid value was encountered";
        return a
    }
    ;
    f.remove = function(a) {
        this.storageNode_.removeAttribute(id(a));
        this.saveNode_()
    }
    ;
    f.getCount = function() {
        return this.getNode_().attributes.length
    }
    ;
    f.__iterator__ = function(a) {
        var b = 0
          , c = this.getNode_().attributes
          , d = new P;
        d.next = function() {
            if (b >= c.length)
                throw O;
            var d = A(c[b++]);
            if (a)
                return decodeURIComponent(d.nodeName.replace(/\./g, "%")).substr(1);
            d = d.nodeValue;
            if (!t(d))
                throw "Storage mechanism: Invalid value was encountered";
            return d
        }
        ;
        return d
    }
    ;
    f.clear = function() {
        for (var a = this.getNode_(), b = a.attributes.length; 0 < b; b--)
            a.removeAttribute(a.attributes[b - 1].nodeName);
        this.saveNode_()
    }
    ;
    f.loadNode_ = function() {
        this.storageNode_.load(this.storageKey_)
    }
    ;
    f.saveNode_ = function() {
        try {
            this.storageNode_.save(this.storageKey_)
        } catch (a) {
            throw "Storage mechanism: Quota exceeded";
        }
    }
    ;
    f.getNode_ = function() {
        return this.storageNode_.XMLDocument.documentElement
    }
    ;
    function jd(a, b) {
        this.mechanism_ = a;
        this.prefix_ = b + "::"
    }
    z(jd, cd);
    jd.prototype.set = function(a, b) {
        this.mechanism_.set(this.prefix_ + a, b)
    }
    ;
    jd.prototype.get = function(a) {
        return this.mechanism_.get(this.prefix_ + a)
    }
    ;
    jd.prototype.remove = function(a) {
        this.mechanism_.remove(this.prefix_ + a)
    }
    ;
    jd.prototype.__iterator__ = function(a) {
        var b = this.mechanism_.__iterator__(!0)
          , c = this
          , d = new P;
        d.next = function() {
            for (var d = b.next(); d.substr(0, c.prefix_.length) != c.prefix_; )
                d = b.next();
            return a ? d.substr(c.prefix_.length) : c.mechanism_.get(d)
        }
        ;
        return d
    }
    ;
    function kd(a, b) {
        this.domain_ = this.userInfo_ = this.scheme_ = "";
        this.port_ = null;
        this.fragment_ = this.path_ = "";
        this.ignoreCase_ = this.isReadOnly_ = !1;
        var c;
        a instanceof kd ? (this.ignoreCase_ = r(b) ? b : a.getIgnoreCase(),
        this.setScheme(a.getScheme()),
        this.setUserInfo(a.getUserInfo()),
        this.setDomain(a.getDomain()),
        this.setPort(a.getPort()),
        this.setPath(a.getPath()),
        this.setQueryData(a.getQueryData().clone()),
        this.setFragment(a.getFragment())) : a && (c = String(a).match(Pc)) ? (this.ignoreCase_ = !!b,
        this.setScheme(c[1] || "", !0),
        this.setUserInfo(c[2] || "", !0),
        this.setDomain(c[3] || "", !0),
        this.setPort(c[4]),
        this.setPath(c[5] || "", !0),
        this.setQueryData(c[6] || "", !0),
        this.setFragment(c[7] || "", !0)) : (this.ignoreCase_ = !!b,
        this.queryData_ = new ld(null,null,this.ignoreCase_))
    }
    f = kd.prototype;
    f.toString = function() {
        var a = []
          , b = this.getScheme();
        b && a.push(md(b, nd, !0), ":");
        var c = this.getDomain();
        if (c || "file" == b)
            a.push("//"),
            (b = this.getUserInfo()) && a.push(md(b, nd, !0), "@"),
            a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
            c = this.getPort(),
            null != c && a.push(":", String(c));
        if (c = this.getPath())
            this.hasDomain() && "/" != c.charAt(0) && a.push("/"),
            a.push(md(c, "/" == c.charAt(0) ? od : pd, !0));
        (c = this.getEncodedQuery()) && a.push("?", c);
        (c = this.getFragment()) && a.push("#", md(c, qd));
        return a.join("")
    }
    ;
    f.resolve = function(a) {
        var b = this.clone()
          , c = a.hasScheme();
        c ? b.setScheme(a.getScheme()) : c = a.hasUserInfo();
        c ? b.setUserInfo(a.getUserInfo()) : c = a.hasDomain();
        c ? b.setDomain(a.getDomain()) : c = a.hasPort();
        var d = a.getPath();
        if (c)
            b.setPort(a.getPort());
        else if (c = a.hasPath()) {
            if ("/" != d.charAt(0))
                if (this.hasDomain() && !this.hasPath())
                    d = "/" + d;
                else {
                    var e = b.getPath().lastIndexOf("/");
                    -1 != e && (d = b.getPath().substr(0, e + 1) + d)
                }
            e = d;
            if (".." == e || "." == e)
                d = "";
            else if (-1 != e.indexOf("./") || -1 != e.indexOf("/.")) {
                d = 0 == e.lastIndexOf("/", 0);
                e = e.split("/");
                for (var g = [], k = 0; k < e.length; ) {
                    var m = e[k++];
                    "." == m ? d && k == e.length && g.push("") : ".." == m ? ((1 < g.length || 1 == g.length && "" != g[0]) && g.pop(),
                    d && k == e.length && g.push("")) : (g.push(m),
                    d = !0)
                }
                d = g.join("/")
            } else
                d = e
        }
        c ? b.setPath(d) : c = a.hasQuery();
        c ? b.setQueryData(a.getQueryData().clone()) : c = a.hasFragment();
        c && b.setFragment(a.getFragment());
        return b
    }
    ;
    f.clone = function() {
        return new kd(this)
    }
    ;
    f.getScheme = function() {
        return this.scheme_
    }
    ;
    f.setScheme = function(a, b) {
        this.enforceReadOnly();
        if (this.scheme_ = b ? rd(a, !0) : a)
            this.scheme_ = this.scheme_.replace(/:$/, "");
        return this
    }
    ;
    f.hasScheme = function() {
        return !!this.scheme_
    }
    ;
    f.getUserInfo = function() {
        return this.userInfo_
    }
    ;
    f.setUserInfo = function(a, b) {
        this.enforceReadOnly();
        this.userInfo_ = b ? rd(a) : a;
        return this
    }
    ;
    f.hasUserInfo = function() {
        return !!this.userInfo_
    }
    ;
    f.getDomain = function() {
        return this.domain_
    }
    ;
    f.setDomain = function(a, b) {
        this.enforceReadOnly();
        this.domain_ = b ? rd(a, !0) : a;
        return this
    }
    ;
    f.hasDomain = function() {
        return !!this.domain_
    }
    ;
    f.getPort = function() {
        return this.port_
    }
    ;
    f.setPort = function(a) {
        this.enforceReadOnly();
        if (a) {
            a = Number(a);
            if (isNaN(a) || 0 > a)
                throw Error("Bad port number " + a);
            this.port_ = a
        } else
            this.port_ = null;
        return this
    }
    ;
    f.hasPort = function() {
        return null != this.port_
    }
    ;
    f.getPath = function() {
        return this.path_
    }
    ;
    f.setPath = function(a, b) {
        this.enforceReadOnly();
        this.path_ = b ? rd(a, !0) : a;
        return this
    }
    ;
    f.hasPath = function() {
        return !!this.path_
    }
    ;
    f.hasQuery = function() {
        return "" !== this.queryData_.toString()
    }
    ;
    f.setQueryData = function(a, b) {
        this.enforceReadOnly();
        a instanceof ld ? (this.queryData_ = a,
        this.queryData_.setIgnoreCase(this.ignoreCase_)) : (b || (a = md(a, sd)),
        this.queryData_ = new ld(a,null,this.ignoreCase_));
        return this
    }
    ;
    f.setQuery = function(a, b) {
        return this.setQueryData(a, b)
    }
    ;
    f.getEncodedQuery = function() {
        return this.queryData_.toString()
    }
    ;
    f.getDecodedQuery = function() {
        return this.queryData_.toDecodedString()
    }
    ;
    f.getQueryData = function() {
        return this.queryData_
    }
    ;
    f.getQuery = function() {
        return this.getEncodedQuery()
    }
    ;
    f.setParameterValue = function(a, b) {
        this.enforceReadOnly();
        this.queryData_.set(a, b);
        return this
    }
    ;
    f.setParameterValues = function(a, b) {
        this.enforceReadOnly();
        ta(b) || (b = [String(b)]);
        this.queryData_.setValues(a, b);
        return this
    }
    ;
    f.getParameterValues = function(a) {
        return this.queryData_.getValues(a)
    }
    ;
    f.getParameterValue = function(a) {
        return this.queryData_.get(a)
    }
    ;
    f.getFragment = function() {
        return this.fragment_
    }
    ;
    f.setFragment = function(a, b) {
        this.enforceReadOnly();
        this.fragment_ = b ? rd(a) : a;
        return this
    }
    ;
    f.hasFragment = function() {
        return !!this.fragment_
    }
    ;
    f.hasSameDomainAs = function(a) {
        return (!this.hasDomain() && !a.hasDomain() || this.getDomain() == a.getDomain()) && (!this.hasPort() && !a.hasPort() || this.getPort() == a.getPort())
    }
    ;
    f.makeUnique = function() {
        this.enforceReadOnly();
        this.setParameterValue("zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ y()).toString(36));
        return this
    }
    ;
    f.removeParameter = function(a) {
        this.enforceReadOnly();
        this.queryData_.remove(a);
        return this
    }
    ;
    f.setReadOnly = function(a) {
        this.isReadOnly_ = a;
        return this
    }
    ;
    f.isReadOnly = function() {
        return this.isReadOnly_
    }
    ;
    f.enforceReadOnly = function() {
        if (this.isReadOnly_)
            throw Error("Tried to modify a read-only Uri");
    }
    ;
    f.setIgnoreCase = function(a) {
        this.ignoreCase_ = a;
        this.queryData_ && this.queryData_.setIgnoreCase(a);
        return this
    }
    ;
    f.getIgnoreCase = function() {
        return this.ignoreCase_
    }
    ;
    function rd(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    }
    function md(a, b, c) {
        return t(a) ? (a = encodeURI(a).replace(b, td),
        c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        a) : null
    }
    function td(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }
    var nd = /[#\/\?@]/g
      , pd = /[#\?:]/g
      , od = /[#\?]/g
      , sd = /[#\?@]/g
      , qd = /#/g;
    function ld(a, b, c) {
        this.count_ = this.keyMap_ = null;
        this.encodedQuery_ = a || null;
        this.ignoreCase_ = !!c
    }
    f = ld.prototype;
    f.ensureKeyMapInitialized_ = function() {
        if (!this.keyMap_ && (this.keyMap_ = new S,
        this.count_ = 0,
        this.encodedQuery_)) {
            var a = this;
            Qc(this.encodedQuery_, function(b, c) {
                a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
            })
        }
    }
    ;
    f.getCount = function() {
        this.ensureKeyMapInitialized_();
        return this.count_
    }
    ;
    f.add = function(a, b) {
        this.ensureKeyMapInitialized_();
        this.invalidateCache_();
        a = this.getKeyName_(a);
        var c = this.keyMap_.get(a);
        c || this.keyMap_.set(a, c = []);
        c.push(b);
        this.count_ = Da(this.count_) + 1;
        return this
    }
    ;
    f.remove = function(a) {
        this.ensureKeyMapInitialized_();
        a = this.getKeyName_(a);
        return this.keyMap_.containsKey(a) ? (this.invalidateCache_(),
        this.count_ = Da(this.count_) - this.keyMap_.get(a).length,
        this.keyMap_.remove(a)) : !1
    }
    ;
    f.clear = function() {
        this.invalidateCache_();
        this.keyMap_ = null;
        this.count_ = 0
    }
    ;
    f.isEmpty = function() {
        this.ensureKeyMapInitialized_();
        return 0 == this.count_
    }
    ;
    f.containsKey = function(a) {
        this.ensureKeyMapInitialized_();
        a = this.getKeyName_(a);
        return this.keyMap_.containsKey(a)
    }
    ;
    f.containsValue = function(a) {
        var b = this.getValues();
        return 0 <= Fa(b, a)
    }
    ;
    f.forEach = function(a, b) {
        this.ensureKeyMapInitialized_();
        this.keyMap_.forEach(function(c, d) {
            Ga(c, function(c) {
                a.call(b, c, d, this)
            }, this)
        }, this)
    }
    ;
    f.getKeys = function() {
        this.ensureKeyMapInitialized_();
        for (var a = this.keyMap_.getValues(), b = this.keyMap_.getKeys(), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], g = 0; g < e.length; g++)
                c.push(b[d]);
        return c
    }
    ;
    f.getValues = function(a) {
        this.ensureKeyMapInitialized_();
        var b = [];
        if (t(a))
            this.containsKey(a) && (b = Ka(b, this.keyMap_.get(this.getKeyName_(a))));
        else {
            a = this.keyMap_.getValues();
            for (var c = 0; c < a.length; c++)
                b = Ka(b, a[c])
        }
        return b
    }
    ;
    f.set = function(a, b) {
        this.ensureKeyMapInitialized_();
        this.invalidateCache_();
        a = this.getKeyName_(a);
        this.containsKey(a) && (this.count_ = Da(this.count_) - this.keyMap_.get(a).length);
        this.keyMap_.set(a, [b]);
        this.count_ = Da(this.count_) + 1;
        return this
    }
    ;
    f.get = function(a, b) {
        if (!a)
            return b;
        a = this.getValues(a);
        return 0 < a.length ? String(a[0]) : b
    }
    ;
    f.setValues = function(a, b) {
        this.remove(a);
        0 < b.length && (this.invalidateCache_(),
        this.keyMap_.set(this.getKeyName_(a), La(b)),
        this.count_ = Da(this.count_) + b.length)
    }
    ;
    f.toString = function() {
        if (this.encodedQuery_)
            return this.encodedQuery_;
        if (!this.keyMap_)
            return "";
        for (var a = [], b = this.keyMap_.getKeys(), c = 0; c < b.length; c++) {
            var d = b[c]
              , e = encodeURIComponent(String(d));
            d = this.getValues(d);
            for (var g = 0; g < d.length; g++) {
                var k = e;
                "" !== d[g] && (k += "=" + encodeURIComponent(String(d[g])));
                a.push(k)
            }
        }
        return this.encodedQuery_ = a.join("&")
    }
    ;
    f.toDecodedString = function() {
        return rd(this.toString())
    }
    ;
    f.invalidateCache_ = function() {
        this.encodedQuery_ = null
    }
    ;
    f.filterKeys = function(a) {
        this.ensureKeyMapInitialized_();
        this.keyMap_.forEach(function(b, c) {
            0 <= Fa(a, c) || this.remove(c)
        }, this);
        return this
    }
    ;
    f.clone = function() {
        var a = new ld;
        a.encodedQuery_ = this.encodedQuery_;
        this.keyMap_ && (a.keyMap_ = this.keyMap_.clone(),
        a.count_ = this.count_);
        return a
    }
    ;
    f.getKeyName_ = function(a) {
        a = String(a);
        this.ignoreCase_ && (a = a.toLowerCase());
        return a
    }
    ;
    f.setIgnoreCase = function(a) {
        a && !this.ignoreCase_ && (this.ensureKeyMapInitialized_(),
        this.invalidateCache_(),
        this.keyMap_.forEach(function(a, c) {
            var b = c.toLowerCase();
            c != b && (this.remove(c),
            this.setValues(b, a))
        }, this));
        this.ignoreCase_ = a
    }
    ;
    f.extend = function(a) {
        for (var b = 0; b < arguments.length; b++)
            Mc(arguments[b], function(a, b) {
                this.add(b, a)
            }, this)
    }
    ;
    /*
 Copyright (c) Microsoft Corporation. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 this file except in compliance with the License. You may obtain a copy of the
 License at http://www.apache.org/licenses/LICENSE-2.0

 THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
 WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 MERCHANTABLITY OR NON-INFRINGEMENT.

 See the Apache Version 2.0 License for specific language governing permissions
 and limitations under the License.
*/
    var ud = window.yt && window.yt.config_ || window.ytcfg && window.ytcfg.data_ || {}
      , vd = ["yt", "config_"]
      , X = q;
    vd[0]in X || "undefined" == typeof X.execScript || X.execScript("var " + vd[0]);
    for (var Y; vd.length && (Y = vd.shift()); )
        !vd.length && r(ud) ? X[Y] = ud : X = X[Y] && X[Y] !== Object.prototype[Y] ? X[Y] : X[Y] = {};
    function wd(a) {
        var b = arguments;
        if (1 < b.length)
            ud[b[0]] = b[1];
        else {
            b = b[0];
            for (var c in b)
                ud[c] = b[c]
        }
    }
    ;function xd(a, b) {
        b ? a = null : (b = new ed,
        (b = b.isAvailable() ? a ? new jd(b,a) : b : null) || (a = new fd(a || "UserDataSharedStore"),
        b = a.isAvailable() ? a : null),
        a = b);
        this.expiringStorage_ = a ? new W(a) : null;
        this.domain_ = document.domain || window.location.hostname
    }
    f = xd.prototype;
    f.hasLocalStorage = function() {
        return !!this.expiringStorage_
    }
    ;
    f.set = function(a, b, c, d) {
        c = c || 31104E3;
        this.remove(a);
        if (this.hasLocalStorage())
            try {
                this.expiringStorage_.set(a, b, y() + 1E3 * c);
                return
            } catch (g) {}
        var e = "";
        if (d)
            try {
                e = escape(Cc(b))
            } catch (g) {
                return
            }
        else
            e = escape(b);
        b = this.domain_;
        Gc.set("yt-dev." + a, e, c, "/", void 0 === b ? "google.com" : b, !1)
    }
    ;
    f.get = function(a, b) {
        var c = void 0
          , d = !this.hasLocalStorage();
        if (!d)
            try {
                c = this.expiringStorage_.get(a)
            } catch (e) {
                d = !0
            }
        if (d && (c = Gc.get("yt-dev." + a, void 0)) && (c = unescape(c),
        b))
            try {
                c = JSON.parse(c)
            } catch (e) {
                this.remove(a),
                c = void 0
            }
        return c
    }
    ;
    f.remove = function(a) {
        this.hasLocalStorage() && this.expiringStorage_.remove(a);
        var b = this.domain_;
        Gc.remove("yt-dev." + a, "/", void 0 === b ? "google.com" : b)
    }
    ;
    f.getCreationTime = function(a) {
        return this.hasLocalStorage() && (a = (this.expiringStorage_.getWrapper(a) || {}).creation,
        ra(a)) ? a : null
    }
    ;
    f.getExpirationTime = function(a) {
        return this.hasLocalStorage() && (a = (this.expiringStorage_.getWrapper(a) || {}).expiration,
        ra(a)) ? a : null
    }
    ;
    ca();
    var yd = Symbol("inject");
    function zd(a, b) {
        a[yd] = b;
        return a
    }
    ;function Ad() {
        J.apply(this, arguments);
        this.handlersMap = {}
    }
    oa(Ad, J);
    Ad.prototype.on = function(a, b) {
        var c = this
          , d = this.handlersMap[a];
        d || (d = new Set,
        this.handlersMap[a] = d);
        d.add(b);
        return function() {
            d["delete"](b);
            0 === d.size && delete c.handlersMap[a]
        }
    }
    ;
    Ad.prototype.triggerEvent = function(a, b) {
        for (var c = [], d = 1; d < arguments.length; ++d)
            c[d - 1] = arguments[d];
        if (d = this.handlersMap[a]) {
            d = l(d);
            for (var e = d.next(); !e.done; e = d.next()) {
                e = e.value;
                try {
                    e.apply(null, c)
                } catch (m) {
                    e = m;
                    var g = u("yt.logging.errors.log");
                    if (g) {
                        var k = window.environment || {};
                        g(e, "ERROR", k.client_name, k.client_version)
                    }
                }
            }
        }
    }
    ;
    Ad.prototype.disposeInternal = function() {
        var a = this.handlersMap, b;
        for (b in a)
            delete a[b];
        J.prototype.disposeInternal.call(this)
    }
    ;
    function Bd(a) {
        this.progressHandler = a
    }
    oa(Bd, Jc);
    Bd.prototype.createInstance = function() {
        var a = new XMLHttpRequest;
        a.upload.addEventListener("progress", this.progressHandler, !1);
        return a
    }
    ;
    function Cd(a) {
        U.call(this, Dd(a))
    }
    oa(Cd, U);
    function Dd(a) {
        var b = void 0;
        a && (b = new Bd(function(b) {
            b && a(b.loaded, b.total)
        }
        ));
        return b
    }
    Cd.prototype.getResponse = function() {
        var a = this.getResponseHeader("content-type");
        if (null == a)
            return "";
        if ("arraybuffer" === this.getResponseType())
            var b = U.prototype.getResponse.call(this);
        else if (a && a.includes("xml"))
            b = this.getResponseXml();
        else if (a && a.includes("html"))
            b = this.getResponseText();
        else if (a && !a.includes("image"))
            try {
                b = this.getResponseJson()
            } catch (c) {
                b = this.getResponseText()
            }
        return b
    }
    ;
    zd(Cd, ["opt_progressHandler"]);
    function Ed(a) {
        function b() {
            c.onUnload()
        }
        Ad.call(this);
        var c = this;
        this.hasShutdown = !1;
        a.addEventListener && (a.addEventListener("beforeunload", b, !1),
        a.addEventListener("unload", b, !1))
    }
    oa(Ed, Ad);
    Ed.prototype.onUnload = function() {
        this.hasShutdown || (this.triggerEvent("shutdown"),
        this.hasShutdown = !0)
    }
    ;
    zd(Ed, ["window"]);
    function Fd(a, b) {
        (b = u("ytcsi.tick", b)) && b(a)
    }
    function Gd(a, b, c) {
        (c = u("ytcsi.info", c)) && c(a, b)
    }
    ;q.CLOSURE_UNCOMPILED_DEFINES = {
        BEDROCK_DEV_JS: !0
    };
    function Hd(a, b) {
        function c(a) {
            var b = e.csp_nonce;
            e.is_cobalt ? (b = Id(document, b),
            b.setAttribute("src", a),
            document.body.appendChild(b)) : b ? document.write('<script src="' + a + '" nonce="' + b + '" aria-hidden="true">\x3c/script>') : document.write('<script src="' + a + '" aria-hidden="true">\x3c/script>');
            e.use_reset_logic && d("resetTimeout();")
        }
        function d(a) {
            var b = e.csp_nonce;
            e.is_cobalt ? (b = Id(document, b),
            b.innerHTML = a,
            ia.push(b)) : b ? document.write('<script aria-hidden="true" nonce="' + b + '">' + (a + "\x3c/script>")) : document.write('<script aria-hidden="true">' + a + "\x3c/script>")
        }
        b = void 0 === b ? q : b;
        Gd("yt_lt", "cold", b);
        Fd("ld_js_s", b);
        var e = b.loadParams || {};
        b.label = function(a, b) {
            return "";
        }(b.labels, e.label_requested);
        var g = "" + e.scs_path + b.label, k, m = !1, ia = [];
        b.resetTimeout = function() {
            b.clearTimeout(k);
            m || (k = b.setTimeout(function() {
                var a = "local:///network_failure.html";
                e.is_cobalt && (a = "h5vcc://network-failure?retry-url=" + encodeURIComponent(b.location.href.split("#")[0]));
                b.location.replace(a)
            }, 4E4))
        }
        ;
        e.use_reset_logic && (b.resetTimeout(),
        b.applicationLoaded = function() {
            m = !0;
            b.clearTimeout(k)
        }
        );
        var C = a.prodCssOverride || e.tv_css;
        e.debugjs ? (b.CLOSURE_NO_DEPS = !0,
        C && Jd(document, g + C),
        c(g + a.debugJsInitializer)) : e.devjs || (C && Jd(document, g + C),
        c(g + (a.prodJsOverride || e.tv_binary)));
        e.load_player && c(e.player_url);
        if (C = (C = b.location.search.match(/[?&]longcatId=(\d+)(&|$)/)) && C[1])
            c("//www.gstatic.com/firebasejs/4.5.1/firebase.js"),
            c("//longcatserver.appspot.com/jsapi?" + C);
        b.checkBrokenLabel = function() {
            if ("undefined" === typeof b.yt && e.label_requested) {
                var a = b.location
                  , c = b.location.href.replace(/([?&])label=[^&]+&?/, "$1stick=0&");
                var d = (d = a && a.ownerDocument) && (d.defaultView || d.parentWindow) || q;
                if ("undefined" != typeof d.Location && "undefined" != typeof d.Element) {
                    d = a && (a instanceof d.Location || !(a instanceof d.Element));
                    var g = ua(a) ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : void 0 === a ? "undefined" : null === a ? "null" : typeof a;
                    A(d, "Argument is not a Location (or a non-Element mock); got: %s", g)
                }
                c instanceof K || c instanceof K || (c = "object" == typeof c && c.implementsGoogStringTypedString ? c.getTypedStringValue() : String(c),
                A(Ob.test(c), "%s does not match the safe URL pattern", c) || (c = "about:invalid#zClosurez"),
                c = Pb(c));
                c instanceof K && c.constructor === K && c.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === Nb ? c = c.privateDoNotAccessOrElseSafeHtmlWrappedValue_ : (Ca("expected object of type SafeUrl, got '" + c + "' of type " + v(c)),
                c = "type_error:SafeUrl");
                a.href = c
            }
        }
        ;
        d("checkBrokenLabel()");
        b.initializeOrRedirect = function(c) {
            Fd("js_r", b);
            var d = u(a.initializerPath);
            d ? d(c) : alert(b)
        }
        ;
        d("initializeOrRedirect('" + g + "');");
        e.is_cobalt && (b.onload = function() {
            for (var a = 0, b = ia.length; a < b; ++a)
                document.body.appendChild(ia[a])
        }
        )
    }
    function Id(a, b) {
        a = a.createElement("script");
        a.setAttribute("aria-hidden", "true");
        b && a.setAttribute("nonce", b);
        return a
    }
    function Jd(a, b) {
        var c = a.createElement("link");
        c.setAttribute("rel", "stylesheet");
        c.setAttribute("type", "text/css");
        c.setAttribute("href", b);
        a.head.appendChild(c)
    }
    ;function Kd(a, b, c, d) {
        var e = this;
        this.storageApi = b;
        this.validKeySet = c;
        this.storage = a();
        if (d)
            d.on("shutdown", function() {
                e.flush()
            })
    }
    f = Kd.prototype;
    f.isLocalStorage = function() {
        return this.storage.hasLocalStorage()
    }
    ;
    f.set = function(a, b, c, d) {
        if (a in this.validKeySet)
            this.storage.set(a, b, c, !(void 0 === d ? 0 : d));
        else
            throw Error("Attempt to set invalid key in local storage: " + a);
    }
    ;
    f.get = function(a, b, c) {
        c = void 0 === c ? !1 : c;
        var d = this.storage.get(a, !c);
        void 0 !== d && b && this.set(a, d, b, c);
        return d
    }
    ;
    f.getCreationTime = function(a) {
        return this.storage.getCreationTime(a)
    }
    ;
    f.getExpirationTime = function(a) {
        return this.storage.getExpirationTime(a)
    }
    ;
    f.remove = function(a) {
        this.storage.remove(a)
    }
    ;
    f.clearKeys = function(a, b) {
        b = void 0 === b ? !1 : b;
        for (var c in a)
            a.hasOwnProperty(c) && this.storage.remove(c);
        b && this.flush()
    }
    ;
    f.flush = function(a) {
        a = void 0 === a ? !1 : a;
        this.storageApi.isSupported() && this.storageApi.flush(a)
    }
    ;
    zd(Kd, ["makeStorage", "storageApi", "validKeySet", "opt_shutdownService"]);
    var Ld = {
        STICKY_FORCE_FULL_ANIMATION: "sticky-force-full-animation",
        STICKY_LABEL: "sticky-label",
        STICKY_LOADER: "sticky-loader"
    }
      , Md = {
        ACCOUNT_CREDENTIALS: "account-credentials",
        ACCOUNTS_MAP: "accounts-map",
        ACTIVE_ACCOUNT: "active-account",
        DEVICE_STATS: "device-stats",
        HAS_MIGRATED_TO_CREDENTIAL_MANAGER: "has-migrated-to-credential-manager",
        IS_FIRST_LAUNCH: "is-first-launch",
        MDX_AUTOPLAY_ENABLED: "mdx-autoplay-enabled",
        MDX_DEVICE_ID: "mdx-device-id",
        MDX_IMPACTED_SESSIONS_SERVER_EVENTS: "mdx-impacted-sessions-server-events",
        MDX_SCREEN: "yt_mdx_screen",
        PAIRED_DEVICES: "migrated-mdx-paired-devices",
        RED_TRIAL_VOICE_ALERT_TRIGGERED: "red-trial-voice-alert-triggered",
        REFRESH_TOKEN: "tv-refresh-token",
        SHOW_VIDEO_INFO_ENABLED: "show-video-info-enabled",
        SMART_REMOTE_USED: "smart-remote-used",
        TOKEN_LIST: "tv-token-list",
        VISITOR_DATA: "visitor-data"
    };
    function Nd(a) {
        return a()
    }
    zd(Nd, ["ytStorageFactory"]);
    function Od(a) {
        return "/" === a.charAt(0) ? a.substr(1) : a
    }
    ;var Pd = /^\?/
      , Qd = /^-?(?:|0|[1-9][0-9]*)(?:\.[0-9]*)?$/;
    function Rd(a) {
        if ("number" === typeof a)
            return a;
        if (a && "string" === typeof a && Qd.test(a))
            return Number(a);
        if (null != a && "string" === typeof a && "" === a.trim())
            return a;
        var b = String(a).toLowerCase();
        return "true" === b || !0 === a ? !0 : "false" === b || !1 === a ? !1 : null != a ? "" + a : ""
    }
    function Sd(a, b) {
        b = void 0 === b ? [] : b;
        var c = {};
        if (a) {
            a = a.replace(Pd, "");
            a = a.split("&");
            for (var d = 0, e = a.length; d < e; ++d) {
                var g = a[d].split("=")
                  , k = g.shift();
                g = g.join("=");
                b.includes(k) || (g = Rd(g));
                g = "string" === typeof g ? decodeURIComponent(g) : g;
                k && (c[k] = g)
            }
        }
        return c
    }
    ;var Td = {
        ACCESS_TOKEN_RECEIVED: "access-token-received",
        ACCOUNTS_MAP_COOKIE: "accounts-map-c",
        ACCOUNT_CREDENTIALS_COOKIE: "account-credentials-c",
        ACTIVE_ACCOUNT_COOKIE: "active-account-c",
        AIRSTREAM_SESSION_HISTORY: "airstream-session-history",
        AUTOMATION_TEST_DATA: "automation-test-data",
        AUTOPLAY_ENABLED: "autoplay-enabled",
        DISPLAY_LANGUAGE_CHANGED_TOAST: "display-language-changed-toast",
        ENABLE_DIRECT_SIGN_IN: "enable-direct-sign-in",
        GUIDE_OPENED_EVER: "guide-opened-ever",
        HIGH_CONTRAST_ENABLED: "high-contrast-enabled",
        UI_STATS_RESULTS: "ui-stats-test-data",
        INLINE_PLAYBACK_ENABLED: "inline-playback-enabled",
        LAST_GUIDE_OPENED_TIME: "last-guide-opened-tine",
        LAST_HOME_BROWSE_REQUEST_PAYLOAD: "last-home-browse-request-payload",
        LAST_HOME_BROWSE_REQUEST_URL: "last-home-browse-request-url",
        LIVE_CHAT_EDUCATION_TOAST_SHOWN: "live-chat-education-toast-shown",
        LIVE_CHAT_ENABLED: "live-chat-enabled",
        LIVE_CHAT_INTERACTED: "live-chat-interacted",
        NO_EXPERIMENTS: "no-experiments",
        NUM_TIMES_IME_TELEX_TOAST_SHOWN: "num-times-ime-telex-toast-shown",
        NUM_VOICE_SEARCH_EDUCATION_TOASTS_SHOWN: "num-voice-search-education-toasts-shown",
        PROMO_COUPON_SHOWN_TIMES: "promo-coupon-shown-times",
        PROMO_COUPON_SHOWN_TIMESTAMP: "promo-coupon-shown-timestamp",
        PROMO_PREMIUM_SHOWN_TIMES: "promo-premium-shown-times",
        PROMO_PREMIUM_SHOWN_TIMESTAMP: "promo-premium-shown-timestamp",
        RATE_ATV_TOAST_SHOWN: "rate-atv-toast-shown",
        REFRESH_TOKEN_COOKIE: "tv-refresh-token-c",
        SAFE_MODE_ENABLED: "safe-mode-enabled",
        SHARED_DEVICE_TOAST_SHOWN: "shared-device-toast-shown",
        SOUND_ENABLED: "sound-enabled",
        TOKEN_LIST_COOKIE: "tv-token-list-c",
        TOKEN_TIME: "token-time",
        TOKEN_TIME_COOKIE: "token-time-c",
        WELCOME_OVERLAY_SHOWN_TIMESTAMP: "sign-in-onboarding-dialog-shown-timestamp",
        NUM_SMART_REMOTE_TOASTS_SHOWN: "num-smart-remote-toasts-shown"
    }
      , Ud = {
        PRIVATE_DATA_PERMISSION: "device-retention-permission",
        SCHEMA_VERSION: "schema-version"
    }
      , Vd = {
        DEVICE_STATISTICS: "device-stats",
        STORAGE_INTEGRITY: "storage-integrity"
    }
      , Wd = {
        ACCESS_TOKEN: "tv-access-token",
        ACTIVITY_PATH: "activity-path",
        AIRSTREAM_BENTO_TRAINING_COUNT: "airstream-bento-training-count",
        CAPTIONS_SETTINGS: "captions-settings",
        CRASH_CLEAN_EXIT_COUNT: "clean-exits",
        CRASH_COUNT: "crash-count",
        CRASH_DATA: "crash-data",
        CRASH_STARTUP_COUNT: "startup-count",
        CRASH_STARTUP_TIME: "startup",
        DEPRECATED_PAIRED_DEVICES: "mdx-paired-devices",
        DEVICE_STATISTICS_OLD: "device-statistics",
        HAS_AUTHENTICATED: "has-authenticated",
        HAS_BEEN_ONBOARDED: "has-been-onboarded",
        HAS_GUIDE_AUTO_OPENED: "has-guide-auto-opened",
        INLINE_SIGN_IN_COUNT: "inline-sign-in-count",
        INNERTUBE_VISITOR_DATA: "innertube-visitor-data",
        KIDS_PROMO_TOAST: "kids-promo-toast",
        NEEDS_INLINE_SIGN_IN: "needs-inline-sign-in",
        NEEDS_RENTAL_AUTH_DIALOG: "needs_rental_auth_dialog",
        NEEDS_SETS_ONBOARDING: "needs-sets-onboarding",
        PERSISTENT_COOKIE: "persistent-cookie",
        PERSISTENT_LOCAL: "persistent-local",
        PRIVATE_DATA: "private_data",
        REFRESH_TOKEN_V3: "leanback_oauth_renew",
        SAMSUNG_SIGNIN_ERROR_TOAST_SHOWN: "samsung-signin-error-toast-shown",
        SAVED_SEARCHES: "saved-searches",
        SIGNIN_AFTER_N_COUNT: "signing-after-n-count",
        SIGNIN_AFTER_N_LAST_SHOWN: "signin-after-n-last-shown",
        SIGN_IN_ONBOARDING_DIALOG_SHOWN: "sign-in-onboarding-dialog-shown",
        SIGN_IN_PROMO_GUIDE_TOAST_SHOWN: "sign-in-promo-guide-toast-shown",
        SIGN_IN_SHELF_HISTORY: "sign-in-shelf-history",
        SMART_GUIDE: "smart-guide",
        SPINNER_LOG: "spinner_log",
        STICKY_FORCE_FULL_ANIMATION: "sticky-force-full-animation",
        STICKY_LABEL: "sticky-label",
        STICKY_LOADER: "sticky-loader",
        SUBS_MOVED_TOAST_SHOWN: "subs-moved-toast-shown",
        TOPIC_ONBOARDING_TOPICS: "topic-onboarding-topics",
        TOPICS_TOAST_SHOWN: "topics-toast-shown",
        UPLOADS_TOAST_SHOWN: "uploads-toast-shown"
    };
    function Xd(a) {
        return "yt.leanback." + (void 0 === a ? "default" : a)
    }
    zd(Xd, ["opt_sandbox"]);
    zd(function(a, b, c) {
        var d = "default";
        if (a.is_sandboxed)
            switch (b.theme) {
            case "g":
                d = "g";
                break;
            case "k":
                d = "k";
                break;
            default:
                d = "u"
            }
        return c({
            opt_sandbox: d
        })
    }, ["runtimeParams", "clientInfo", "makeSandboxNamespace"]);
    function Yd(a) {
        a = void 0 === a ? q : a;
        var b = a.environment.theme || "cl";
        if (a.environment.flags.enable_early_browse_request && "cl" === b && (b = new kd(a.location.hash.substring(1)),
        "" === Od(b.getPath()))) {
            var c = Zd(a);
            if (!c.get("active-account") && (b = c.get("last-home-browse-request-url"),
            c = c.get("last-home-browse-request-payload"),
            b && c)) {
                var d = c.context.client;
                if (d.clientVersion === a.environment.client_version) {
                    d.experimentIds = a.environment.experiments;
                    c = JSON.stringify(c);
                    var e = new Cd;
                    a.earlyBrowseRequestParams = {
                        browseResponse: null,
                        cancel: function() {
                            return e.abort()
                        },
                        isLoading: !0
                    };
                    d = function() {
                        var a = e.getLastError()
                          , b = e.getStatus();
                        console.error("Early browse request failed: " + a + ", " + b)
                    }
                    ;
                    e.listen("timeout", d);
                    e.listen("error", d);
                    e.listen("success", function() {
                        Fd("b_rqf", a);
                        var b = a.earlyBrowseRequestParams;
                        b && (b.isLoading = !1,
                        b.browseResponse = e.getResponse(),
                        b.cancel = null)
                    });
                    d = {
                        "Content-Type": "application/json",
                        "X-Goog-Visitor-Id": a.environment.visitor_data
                    };
                    Fd("b_rqs", a);
                    e.send(b, "POST", c, d)
                }
            }
        }
    }
    function Zd() {
        var a = E(Ld);
        a = Object.assign({}, E(Td), E(Wd), E(Vd), E(Ud), E(Md), a);
        var b = Nd.bind(null, function() {
            return new xd(Xd())
        });
        return new Kd(b,{
            cookies: {
                clear: function() {},
                enabled: !1,
                isSupported: function() {
                    return !1
                },
                isUiRequired: function() {
                    return !1
                }
            },
            flush: function() {},
            isSupported: function() {
                return !1
            }
        },a)
    }
    ;var Z = void 0;
    Z = void 0 === Z ? q : Z;
    try {
        Yd(Z)
    } catch (a) {
        var $d = a
          , ae = u("yt.logging.errors.log");
        if (ae)
            ae($d, void 0, void 0, void 0, void 0);
        else {
            var be, ce = [];
            be = "ERRORS"in ud ? ud.ERRORS : ce;
            be.push([$d, void 0, void 0, void 0, void 0]);
            wd("ERRORS", be)
        }
    }
    var de = Sd(Z.location.hash.replace(/#[^?]*\??/, ""));
    if (de.theme && "cl" !== de.theme) {
        var ee = "" + (Z.location.search || "") + "&" + (Z.location.hash || "").replace(/#[^?]*\??/, "")
          , fe = Sd(ee)
          , ge = "/tv"
          , he = void 0;
        he = void 0 === he ? !1 : he;
        var ie;
        a: {
            for (var je in fe) {
                ie = !1;
                break a
            }
            ie = !0
        }
        if (!ie) {
            var ke = ge.includes("?") ? "&" : "?"
              , le = ge
              , me = void 0 === he ? !1 : he
              , ne = []
              , oe = void 0 === me ? !1 : me;
            oe = void 0 === oe ? !1 : oe;
            for (var pe = {}, qe = Object.keys(fe || {}), re = 0, se = qe.length; re < se; ++re) {
                var te = qe[re]
                  , ue = fe[te];
                null != ue && (oe ? pe[te] = Rd(ue) : "" !== ue && (pe[te] = Rd(ue || 0)))
            }
            for (var ve = Object.keys(pe), we = 0, xe = ve.length; we < xe; ++we) {
                var ye = ve[we];
                ne.push(encodeURIComponent(ye) + "=" + encodeURIComponent("" + pe[ye]))
            }
            ge = le + ("" + ke + ne.join("&"))
        }
        Z.location.assign(ge)
    } else {
        var Be = {
            initializerPath: "yt.tv.initialize"
        };
        "Cast Receiver" === Z.environment.browser ? (Be.devJsInitializer = "/chromecast-concat-bundle-dev.js",
        Be.debugJsInitializer = "/chromecast-concat-bundle.js") : (Be.devJsInitializer = "/app-concat-bundle-dev.js",
        Be.debugJsInitializer = "/app-concat-bundle.js");
        Hd(Be, Z)
    }
    ;
}
).call(this);
