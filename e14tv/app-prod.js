/*
 AngularJS v1.0.9-3ccec13
 (c) 2010-2012 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(S, W, t) {
    'use strict';
    function p(b, a, c) {
        var d;
        if (b)
            if (L(b))
                for (d in b)
                    "prototype" != d && "length" != d && "name" != d && b.hasOwnProperty(d) && a.call(c, b[d], d);
            else if (b.forEach && b.forEach !== p)
                b.forEach(a, c);
            else {
                var e;
                e = b && "number" === typeof b.length ? "function" != typeof b.hasOwnProperty && "function" != typeof b.constructor ? !0 : b instanceof O || da && b instanceof da || "[object Object]" !== oa.call(b) || "function" === typeof b.callee : !1;
                if (e)
                    for (d = 0; d < b.length; d++)
                        a.call(c, b[d], d);
                else
                    for (d in b)
                        b.hasOwnProperty(d) && a.call(c, b[d], d)
            }
        return b
    }
    function rb(b) {
        var a = [], c;
        for (c in b)
            b.hasOwnProperty(c) && a.push(c);
        return a.sort()
    }
    function mc(b, a, c) {
        for (var d = rb(b), e = 0; e < d.length; e++)
            a.call(c, b[d[e]], d[e]);
        return d
    }
    function sb(b) {
        return function(a, c) {
            b(c, a)
        }
    }
    function za() {
        for (var b = ba.length, a; b; ) {
            b--;
            a = ba[b].charCodeAt(0);
            if (57 == a)
                return ba[b] = "A",
                ba.join("");
            if (90 == a)
                ba[b] = "0";
            else
                return ba[b] = String.fromCharCode(a + 1),
                ba.join("")
        }
        ba.unshift("0");
        return ba.join("")
    }
    function tb(b, a) {
        a ? b.$$hashKey = a : delete b.$$hashKey
    }
    function C(b) {
        var a = b.$$hashKey;
        p(arguments, function(a) {
            a !== b && p(a, function(a, c) {
                b[c] = a
            })
        });
        tb(b, a);
        return b
    }
    function J(b) {
        return parseInt(b, 10)
    }
    function Aa(b, a) {
        return C(new (C(function() {}, {
            prototype: b
        })), a)
    }
    function u() {}
    function pa(b) {
        return b
    }
    function M(b) {
        return function() {
            return b
        }
    }
    function z(b) {
        return "undefined" == typeof b
    }
    function x(b) {
        return "undefined" != typeof b
    }
    function P(b) {
        return null != b && "object" == typeof b
    }
    function E(b) {
        return "string" == typeof b
    }
    function Ua(b) {
        return "number" == typeof b
    }
    function qa(b) {
        return "[object Date]" == oa.apply(b)
    }
    function F(b) {
        return "[object Array]" == oa.apply(b)
    }
    function L(b) {
        return "function" == typeof b
    }
    function Va(b) {
        return "[object RegExp]" == oa.apply(b)
    }
    function ra(b) {
        return b && b.document && b.location && b.alert && b.setInterval
    }
    function Ba(b) {
        return b && b.$evalAsync && b.$watch
    }
    function nc(b) {
        return b && (b.nodeName || b.bind && b.find)
    }
    function Wa(b, a, c) {
        var d = [];
        p(b, function(b, g, h) {
            d.push(a.call(c, b, g, h))
        });
        return d
    }
    function Ca(b, a) {
        if (b.indexOf)
            return b.indexOf(a);
        for (var c = 0; c < b.length; c++)
            if (a === b[c])
                return c;
        return -1
    }
    function Xa(b, a) {
        var c = Ca(b, a);
        0 <= c && b.splice(c, 1);
        return a
    }
    function X(b, a) {
        if (ra(b) || Ba(b))
            throw Error("Can't copy Window or Scope");
        if (a) {
            if (b === a)
                throw Error("Can't copy equivalent objects or arrays");
            if (F(b))
                for (var c = a.length = 0; c < b.length; c++)
                    a.push(X(b[c]));
            else {
                c = a.$$hashKey;
                p(a, function(b, c) {
                    delete a[c]
                });
                for (var d in b)
                    a[d] = X(b[d]);
                tb(a, c)
            }
        } else
            (a = b) && (F(b) ? a = X(b, []) : qa(b) ? a = new Date(b.getTime()) : Va(b) ? a = RegExp(b.source) : P(b) && (a = X(b, {})));
        return a
    }
    function oc(b, a) {
        a = a || {};
        for (var c in b)
            b.hasOwnProperty(c) && "$$" !== c.substr(0, 2) && (a[c] = b[c]);
        return a
    }
    function ha(b, a) {
        if (b === a)
            return !0;
        if (null === b || null === a)
            return !1;
        if (b !== b && a !== a)
            return !0;
        var c = typeof b, d;
        if (c == typeof a && "object" == c)
            if (F(b)) {
                if (!F(a))
                    return !1;
                if ((c = b.length) == a.length) {
                    for (d = 0; d < c; d++)
                        if (!ha(b[d], a[d]))
                            return !1;
                    return !0
                }
            } else {
                if (qa(b))
                    return qa(a) && b.getTime() == a.getTime();
                if (Va(b) && Va(a))
                    return b.toString() == a.toString();
                if (Ba(b) || Ba(a) || ra(b) || ra(a) || F(a))
                    return !1;
                c = {};
                for (d in b)
                    if ("$" !== d.charAt(0) && !L(b[d])) {
                        if (!ha(b[d], a[d]))
                            return !1;
                        c[d] = !0
                    }
                for (d in a)
                    if (!c[d] && "$" !== d.charAt(0) && a[d] !== t && !L(a[d]))
                        return !1;
                return !0
            }
        return !1
    }
    function Ya(b, a, c) {
        return b.concat(Da.call(a, c))
    }
    function Za(b, a) {
        var c = 2 < arguments.length ? Da.call(arguments, 2) : [];
        return !L(a) || a instanceof RegExp ? a : c.length ? function() {
            return arguments.length ? a.apply(b, c.concat(Da.call(arguments, 0))) : a.apply(b, c)
        }
        : function() {
            return arguments.length ? a.apply(b, arguments) : a.call(b)
        }
    }
    function pc(b, a) {
        var c = a;
        "string" === typeof b && "$" === b.charAt(0) ? c = t : ra(a) ? c = "$WINDOW" : a && W === a ? c = "$DOCUMENT" : Ba(a) && (c = "$SCOPE");
        return c
    }
    function ea(b, a) {
        return "undefined" === typeof b ? t : JSON.stringify(b, pc, a ? "  " : null)
    }
    function ub(b) {
        return E(b) ? JSON.parse(b) : b
    }
    function $a(b) {
        b && 0 !== b.length ? (b = G("" + b),
        b = !("f" == b || "0" == b || "false" == b || "no" == b || "n" == b || "[]" == b)) : b = !1;
        return b
    }
    function sa(b) {
        b = A(b).clone();
        try {
            b.html("")
        } catch (a) {}
        var c = A("<div>").append(b).html();
        try {
            return 3 === b[0].nodeType ? G(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(a, b) {
                return "<" + G(b)
            })
        } catch (d) {
            return G(c)
        }
    }
    function vb(b) {
        try {
            return decodeURIComponent(b)
        } catch (a) {}
    }
    function ab(b) {
        var a = {}, c, d;
        p((b || "").split("&"), function(b) {
            b && (c = b.split("="),
            d = vb(c[0]),
            x(d) && (a[d] = x(c[1]) ? vb(c[1]) : !0))
        });
        return a
    }
    function wb(b) {
        var a = [];
        p(b, function(b, d) {
            a.push(bb(d, !0) + (!0 === b ? "" : "=" + bb(b, !0)))
        });
        return a.length ? a.join("&") : ""
    }
    function cb(b) {
        return bb(b, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
    }
    function bb(b, a) {
        return encodeURIComponent(b).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, a ? "%20" : "+")
    }
    function qc(b, a) {
        function c(a) {
            a && d.push(a)
        }
        var d = [b], e, g, h = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"], f = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
        p(h, function(a) {
            h[a] = !0;
            c(W.getElementById(a));
            a = a.replace(":", "\\:");
            b.querySelectorAll && (p(b.querySelectorAll("." + a), c),
            p(b.querySelectorAll("." + a + "\\:"), c),
            p(b.querySelectorAll("[" + a + "]"), c))
        });
        p(d, function(a) {
            if (!e) {
                var b = f.exec(" " + a.className + " ");
                b ? (e = a,
                g = (b[2] || "").replace(/\s+/g, ",")) : p(a.attributes, function(b) {
                    !e && h[b.name] && (e = a,
                    g = b.value)
                })
            }
        });
        e && a(e, g ? [g] : [])
    }
    function xb(b, a) {
        var c = function() {
            b = A(b);
            a = a || [];
            a.unshift(["$provide", function(a) {
                a.value("$rootElement", b)
            }
            ]);
            a.unshift("ng");
            var c = yb(a);
            c.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function(a, b, c, d) {
                a.$apply(function() {
                    b.data("$injector", d);
                    c(b)(a)
                })
            }
            ]);
            return c
        }
          , d = /^NG_DEFER_BOOTSTRAP!/;
        if (S && !d.test(S.name))
            return c();
        S.name = S.name.replace(d, "");
        db.resumeBootstrap = function(b) {
            p(b, function(b) {
                a.push(b)
            });
            c()
        }
    }
    function eb(b, a) {
        a = a || "_";
        return b.replace(rc, function(b, d) {
            return (d ? a : "") + b.toLowerCase()
        })
    }
    function fb(b, a, c) {
        if (!b)
            throw Error("Argument '" + (a || "?") + "' is " + (c || "required"));
        return b
    }
    function ta(b, a, c) {
        c && F(b) && (b = b[b.length - 1]);
        fb(L(b), a, "not a function, got " + (b && "object" == typeof b ? b.constructor.name || "Object" : typeof b));
        return b
    }
    function gb(b, a, c) {
        if (!a)
            return b;
        a = a.split(".");
        for (var d, e = b, g = a.length, h = 0; h < g; h++)
            d = a[h],
            b && (b = (e = b)[d]);
        return !c && L(b) ? Za(e, b) : b
    }
    function sc(b) {
        function a(a, b, e) {
            return a[b] || (a[b] = e())
        }
        return a(a(b, "angular", Object), "module", function() {
            var b = {};
            return function(d, e, g) {
                e && b.hasOwnProperty(d) && (b[d] = null);
                return a(b, d, function() {
                    function a(c, d, e) {
                        return function() {
                            b[e || "push"]([c, d, arguments]);
                            return m
                        }
                    }
                    if (!e)
                        throw Error("No module: " + d);
                    var b = []
                      , c = []
                      , l = a("$injector", "invoke")
                      , m = {
                        _invokeQueue: b,
                        _runBlocks: c,
                        requires: e,
                        name: d,
                        provider: a("$provide", "provider"),
                        factory: a("$provide", "factory"),
                        service: a("$provide", "service"),
                        value: a("$provide", "value"),
                        constant: a("$provide", "constant", "unshift"),
                        filter: a("$filterProvider", "register"),
                        controller: a("$controllerProvider", "register"),
                        directive: a("$compileProvider", "directive"),
                        config: l,
                        run: function(a) {
                            c.push(a);
                            return this
                        }
                    };
                    g && l(g);
                    return m
                })
            }
        })
    }
    function zb(b) {
        return b.replace(tc, function(a, b, d, e) {
            return e ? d.toUpperCase() : d
        }).replace(uc, "Moz$1")
    }
    function hb(b, a, c, d) {
        function e(b) {
            var e = c && b ? [this.filter(b)] : [this], k = a, l, m, n, r, s, q;
            if (!d || null != b)
                for (; e.length; )
                    for (l = e.shift(),
                    m = 0,
                    n = l.length; m < n; m++)
                        for (r = A(l[m]),
                        k ? r.triggerHandler("$destroy") : k = !k,
                        s = 0,
                        r = (q = r.children()).length; s < r; s++)
                            e.push(da(q[s]));
            return g.apply(this, arguments)
        }
        var g = da.fn[b]
          , g = g.$original || g;
        e.$original = g;
        da.fn[b] = e
    }
    function O(b) {
        if (b instanceof O)
            return b;
        if (!(this instanceof O)) {
            if (E(b) && "<" != b.charAt(0))
                throw Error("selectors not implemented");
            return new O(b)
        }
        if (E(b)) {
            var a = W.createElement("div");
            a.innerHTML = "<div>&#160;</div>" + b;
            a.removeChild(a.firstChild);
            ib(this, a.childNodes);
            this.remove()
        } else
            ib(this, b)
    }
    function jb(b) {
        return b.cloneNode(!0)
    }
    function ua(b) {
        Ab(b);
        var a = 0;
        for (b = b.childNodes || []; a < b.length; a++)
            ua(b[a])
    }
    function Bb(b, a, c) {
        var d = ca(b, "events");
        ca(b, "handle") && (z(a) ? p(d, function(a, c) {
            kb(b, c, a);
            delete d[c]
        }) : z(c) ? (kb(b, a, d[a]),
        delete d[a]) : Xa(d[a] || [], c))
    }
    function Ab(b) {
        var a = b[Ea]
          , c = Fa[a];
        c && (c.handle && (c.events.$destroy && c.handle({}, "$destroy"),
        Bb(b)),
        delete Fa[a],
        b[Ea] = t)
    }
    function ca(b, a, c) {
        var d = b[Ea]
          , d = Fa[d || -1];
        if (x(c))
            d || (b[Ea] = d = ++vc,
            d = Fa[d] = {}),
            d[a] = c;
        else
            return d && d[a]
    }
    function Cb(b, a, c) {
        var d = ca(b, "data")
          , e = x(c)
          , g = !e && x(a)
          , h = g && !P(a);
        d || h || ca(b, "data", d = {});
        if (e)
            d[a] = c;
        else if (g) {
            if (h)
                return d && d[a];
            C(d, a)
        } else
            return d
    }
    function Ga(b, a) {
        return -1 < (" " + b.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + a + " ")
    }
    function Db(b, a) {
        a && p(a.split(" "), function(a) {
            b.className = V((" " + b.className + " ").replace(/[\n\t]/g, " ").replace(" " + V(a) + " ", " "))
        })
    }
    function Eb(b, a) {
        a && p(a.split(" "), function(a) {
            Ga(b, a) || (b.className = V(b.className + " " + V(a)))
        })
    }
    function ib(b, a) {
        if (a) {
            a = a.nodeName || !x(a.length) || ra(a) ? [a] : a;
            for (var c = 0; c < a.length; c++)
                b.push(a[c])
        }
    }
    function Fb(b, a) {
        return Ha(b, "$" + (a || "ngController") + "Controller")
    }
    function Ha(b, a, c) {
        b = A(b);
        for (9 == b[0].nodeType && (b = b.find("html")); b.length; ) {
            if (c = b.data(a))
                return c;
            b = b.parent()
        }
    }
    function Gb(b, a) {
        var c = Ia[a.toLowerCase()];
        return c && Hb[b.nodeName] && c
    }
    function wc(b, a) {
        var c = function(c, e) {
            c.preventDefault || (c.preventDefault = function() {
                c.returnValue = !1
            }
            );
            c.stopPropagation || (c.stopPropagation = function() {
                c.cancelBubble = !0
            }
            );
            c.target || (c.target = c.srcElement || W);
            if (z(c.defaultPrevented)) {
                var g = c.preventDefault;
                c.preventDefault = function() {
                    c.defaultPrevented = !0;
                    g.call(c)
                }
                ;
                c.defaultPrevented = !1
            }
            c.isDefaultPrevented = function() {
                return c.defaultPrevented
            }
            ;
            p(a[e || c.type], function(a) {
                a.call(b, c)
            });
            8 >= Y ? (c.preventDefault = null,
            c.stopPropagation = null,
            c.isDefaultPrevented = null) : (delete c.preventDefault,
            delete c.stopPropagation,
            delete c.isDefaultPrevented)
        };
        c.elem = b;
        return c
    }
    function ia(b) {
        var a = typeof b, c;
        "object" == a && null !== b ? "function" == typeof (c = b.$$hashKey) ? c = b.$$hashKey() : c === t && (c = b.$$hashKey = za()) : c = b;
        return a + ":" + c
    }
    function Ja(b) {
        p(b, this.put, this)
    }
    function lb() {}
    function Ib(b) {
        var a, c;
        "function" == typeof b ? (a = b.$inject) || (a = [],
        c = b.toString().replace(xc, ""),
        c = c.match(yc),
        p(c[1].split(zc), function(b) {
            b.replace(Ac, function(b, c, d) {
                a.push(d)
            })
        }),
        b.$inject = a) : F(b) ? (c = b.length - 1,
        ta(b[c], "fn"),
        a = b.slice(0, c)) : ta(b, "fn", !0);
        return a
    }
    function yb(b) {
        function a(a) {
            return function(b, c) {
                if (P(b))
                    p(b, sb(a));
                else
                    return a(b, c)
            }
        }
        function c(a, b) {
            if (L(b) || F(b))
                b = n.instantiate(b);
            if (!b.$get)
                throw Error("Provider " + a + " must define $get factory method.");
            return m[a + f] = b
        }
        function d(a, b) {
            return c(a, {
                $get: b
            })
        }
        function e(a) {
            var b = [];
            p(a, function(a) {
                if (!l.get(a))
                    if (l.put(a, !0),
                    E(a)) {
                        var c = va(a);
                        b = b.concat(e(c.requires)).concat(c._runBlocks);
                        try {
                            for (var d = c._invokeQueue, c = 0, f = d.length; c < f; c++) {
                                var g = d[c]
                                  , q = "$injector" == g[0] ? n : n.get(g[0]);
                                q[g[1]].apply(q, g[2])
                            }
                        } catch (h) {
                            throw h.message && (h.message += " from " + a),
                            h;
                        }
                    } else if (L(a))
                        try {
                            b.push(n.invoke(a))
                        } catch (k) {
                            throw k.message && (k.message += " from " + a),
                            k;
                        }
                    else if (F(a))
                        try {
                            b.push(n.invoke(a))
                        } catch (s) {
                            throw s.message && (s.message += " from " + String(a[a.length - 1])),
                            s;
                        }
                    else
                        ta(a, "module")
            });
            return b
        }
        function g(a, b) {
            function c(d) {
                if ("string" !== typeof d)
                    throw Error("Service name expected");
                if (a.hasOwnProperty(d)) {
                    if (a[d] === h)
                        throw Error("Circular dependency: " + k.join(" <- "));
                    return a[d]
                }
                try {
                    return k.unshift(d),
                    a[d] = h,
                    a[d] = b(d)
                } finally {
                    k.shift()
                }
            }
            function d(a, b, e) {
                var f = [], l = Ib(a), g, h, q;
                h = 0;
                for (g = l.length; h < g; h++)
                    q = l[h],
                    f.push(e && e.hasOwnProperty(q) ? e[q] : c(q));
                a.$inject || (a = a[g]);
                switch (b ? -1 : f.length) {
                case 0:
                    return a();
                case 1:
                    return a(f[0]);
                case 2:
                    return a(f[0], f[1]);
                case 3:
                    return a(f[0], f[1], f[2]);
                case 4:
                    return a(f[0], f[1], f[2], f[3]);
                case 5:
                    return a(f[0], f[1], f[2], f[3], f[4]);
                case 6:
                    return a(f[0], f[1], f[2], f[3], f[4], f[5]);
                case 7:
                    return a(f[0], f[1], f[2], f[3], f[4], f[5], f[6]);
                case 8:
                    return a(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7]);
                case 9:
                    return a(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8]);
                case 10:
                    return a(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8], f[9]);
                default:
                    return a.apply(b, f)
                }
            }
            return {
                invoke: d,
                instantiate: function(a, b) {
                    var c = function() {}, e;
                    c.prototype = (F(a) ? a[a.length - 1] : a).prototype;
                    c = new c;
                    e = d(a, c, b);
                    return P(e) ? e : c
                },
                get: c,
                annotate: Ib
            }
        }
        var h = {}
          , f = "Provider"
          , k = []
          , l = new Ja
          , m = {
            $provide: {
                provider: a(c),
                factory: a(d),
                service: a(function(a, b) {
                    return d(a, ["$injector", function(a) {
                        return a.instantiate(b)
                    }
                    ])
                }),
                value: a(function(a, b) {
                    return d(a, M(b))
                }),
                constant: a(function(a, b) {
                    m[a] = b;
                    r[a] = b
                }),
                decorator: function(a, b) {
                    var c = n.get(a + f)
                      , d = c.$get;
                    c.$get = function() {
                        var a = s.invoke(d, c);
                        return s.invoke(b, null, {
                            $delegate: a
                        })
                    }
                }
            }
        }
          , n = g(m, function() {
            throw Error("Unknown provider: " + k.join(" <- "));
        })
          , r = {}
          , s = r.$injector = g(r, function(a) {
            a = n.get(a + f);
            return s.invoke(a.$get, a)
        });
        p(e(b), function(a) {
            s.invoke(a || u)
        });
        return s
    }
    function Bc() {
        var b = !0;
        this.disableAutoScrolling = function() {
            b = !1
        }
        ;
        this.$get = ["$window", "$location", "$rootScope", function(a, c, d) {
            function e(a) {
                var b = null;
                p(a, function(a) {
                    b || "a" !== G(a.nodeName) || (b = a)
                });
                return b
            }
            function g() {
                var b = c.hash(), d;
                b ? (d = h.getElementById(b)) ? d.scrollIntoView() : (d = e(h.getElementsByName(b))) ? d.scrollIntoView() : "top" === b && a.scrollTo(0, 0) : a.scrollTo(0, 0)
            }
            var h = a.document;
            b && d.$watch(function() {
                return c.hash()
            }, function() {
                d.$evalAsync(g)
            });
            return g
        }
        ]
    }
    function Cc(b, a, c, d) {
        function e(a) {
            try {
                a.apply(null, Da.call(arguments, 1))
            } finally {
                if (q--,
                0 === q)
                    for (; B.length; )
                        try {
                            B.pop()()
                        } catch (b) {
                            c.error(b)
                        }
            }
        }
        function g(a, b) {
            (function Dc() {
                p(v, function(a) {
                    a()
                });
                y = b(Dc, a)
            }
            )()
        }
        function h() {
            Q != f.url() && (Q = f.url(),
            p(N, function(a) {
                a(f.url())
            }))
        }
        var f = this
          , k = a[0]
          , l = b.location
          , m = b.history
          , n = b.setTimeout
          , r = b.clearTimeout
          , s = {};
        f.isMock = !1;
        var q = 0
          , B = [];
        f.$$completeOutstandingRequest = e;
        f.$$incOutstandingRequestCount = function() {
            q++
        }
        ;
        f.notifyWhenNoOutstandingRequests = function(a) {
            p(v, function(a) {
                a()
            });
            0 === q ? a() : B.push(a)
        }
        ;
        var v = [], y;
        f.addPollFn = function(a) {
            z(y) && g(100, n);
            v.push(a);
            return a
        }
        ;
        var Q = l.href
          , D = a.find("base")
          , K = null;
        f.url = function(a, b) {
            if (a) {
                if (Q != a)
                    return Q = a,
                    d.history ? b ? m.replaceState(null, "", a) : (m.pushState(null, "", a),
                    D.attr("href", D.attr("href"))) : b ? (l.replace(a),
                    K = a) : (l.href = a,
                    K = null),
                    f
            } else
                return K || l.href.replace(/%27/g, "'")
        }
        ;
        var N = []
          , H = !1;
        f.onUrlChange = function(a) {
            H || (d.history && A(b).bind("popstate", h),
            d.hashchange ? A(b).bind("hashchange", h) : f.addPollFn(h),
            H = !0);
            N.push(a);
            return a
        }
        ;
        f.baseHref = function() {
            var a = D.attr("href");
            return a ? a.replace(/^https?\:\/\/[^\/]*/, "") : ""
        }
        ;
        var ja = {}
          , T = ""
          , w = f.baseHref();
        f.cookies = function(a, b) {
            var d, e, f, l;
            if (a)
                b === t ? k.cookie = escape(a) + "=;path=" + w + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : E(b) && (d = (k.cookie = escape(a) + "=" + escape(b) + ";path=" + w).length + 1,
                4096 < d && c.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + d + " > 4096 bytes)!"));
            else {
                if (k.cookie !== T)
                    for (T = k.cookie,
                    d = T.split("; "),
                    ja = {},
                    f = 0; f < d.length; f++)
                        e = d[f],
                        l = e.indexOf("="),
                        0 < l && (a = unescape(e.substring(0, l)),
                        ja[a] === t && (ja[a] = unescape(e.substring(l + 1))));
                return ja
            }
        }
        ;
        f.defer = function(a, b) {
            var c;
            q++;
            c = n(function() {
                delete s[c];
                e(a)
            }, b || 0);
            s[c] = !0;
            return c
        }
        ;
        f.defer.cancel = function(a) {
            return s[a] ? (delete s[a],
            r(a),
            e(u),
            !0) : !1
        }
    }
    function Ec() {
        this.$get = ["$window", "$log", "$sniffer", "$document", function(b, a, c, d) {
            return new Cc(b,d,a,c)
        }
        ]
    }
    function Fc() {
        this.$get = function() {
            function b(b, d) {
                function e(a) {
                    a != n && (r ? r == a && (r = a.n) : r = a,
                    g(a.n, a.p),
                    g(a, n),
                    n = a,
                    n.n = null)
                }
                function g(a, b) {
                    a != b && (a && (a.p = b),
                    b && (b.n = a))
                }
                if (b in a)
                    throw Error("cacheId " + b + " taken");
                var h = 0
                  , f = C({}, d, {
                    id: b
                })
                  , k = {}
                  , l = d && d.capacity || Number.MAX_VALUE
                  , m = {}
                  , n = null
                  , r = null;
                return a[b] = {
                    put: function(a, b) {
                        var c = m[a] || (m[a] = {
                            key: a
                        });
                        e(c);
                        z(b) || (a in k || h++,
                        k[a] = b,
                        h > l && this.remove(r.key))
                    },
                    get: function(a) {
                        var b = m[a];
                        if (b)
                            return e(b),
                            k[a]
                    },
                    remove: function(a) {
                        var b = m[a];
                        b && (b == n && (n = b.p),
                        b == r && (r = b.n),
                        g(b.n, b.p),
                        delete m[a],
                        delete k[a],
                        h--)
                    },
                    removeAll: function() {
                        k = {};
                        h = 0;
                        m = {};
                        n = r = null
                    },
                    destroy: function() {
                        m = f = k = null;
                        delete a[b]
                    },
                    info: function() {
                        return C({}, f, {
                            size: h
                        })
                    }
                }
            }
            var a = {};
            b.info = function() {
                var b = {};
                p(a, function(a, e) {
                    b[e] = a.info()
                });
                return b
            }
            ;
            b.get = function(b) {
                return a[b]
            }
            ;
            return b
        }
    }
    function Gc() {
        this.$get = ["$cacheFactory", function(b) {
            return b("templates")
        }
        ]
    }
    function Jb(b) {
        var a = {}
          , c = "Directive"
          , d = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/
          , e = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/
          , g = "Template must have exactly one root element. was: "
          , h = /^\s*(https?|ftp|mailto|file):/;
        this.directive = function k(d, e) {
            E(d) ? (fb(e, "directive"),
            a.hasOwnProperty(d) || (a[d] = [],
            b.factory(d + c, ["$injector", "$exceptionHandler", function(b, c) {
                var e = [];
                p(a[d], function(a) {
                    try {
                        var g = b.invoke(a);
                        L(g) ? g = {
                            compile: M(g)
                        } : !g.compile && g.link && (g.compile = M(g.link));
                        g.priority = g.priority || 0;
                        g.name = g.name || d;
                        g.require = g.require || g.controller && g.name;
                        g.restrict = g.restrict || "A";
                        e.push(g)
                    } catch (h) {
                        c(h)
                    }
                });
                return e
            }
            ])),
            a[d].push(e)) : p(d, sb(k));
            return this
        }
        ;
        this.urlSanitizationWhitelist = function(a) {
            return x(a) ? (h = a,
            this) : h
        }
        ;
        this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", function(b, l, m, n, r, s, q, B, v) {
            function y(a, b, c) {
                a instanceof A || (a = A(a));
                p(a, function(b, c) {
                    3 == b.nodeType && b.nodeValue.match(/\S+/) && (a[c] = A(b).wrap("<span></span>").parent()[0])
                });
                var d = D(a, b, a, c);
                return function(b, c) {
                    fb(b, "scope");
                    for (var e = c ? xa.clone.call(a) : a, g = 0, l = e.length; g < l; g++) {
                        var h = e[g];
                        1 != h.nodeType && 9 != h.nodeType || e.eq(g).data("$scope", b)
                    }
                    Q(e, "ng-scope");
                    c && c(e, b);
                    d && d(b, e, e);
                    return e
                }
            }
            function Q(a, b) {
                try {
                    a.addClass(b)
                } catch (c) {}
            }
            function D(a, b, c, d) {
                function e(a, c, d, l) {
                    var h, k, m, q, s, n, r, v = [];
                    s = 0;
                    for (n = c.length; s < n; s++)
                        v.push(c[s]);
                    r = s = 0;
                    for (n = g.length; s < n; r++)
                        k = v[r],
                        c = g[s++],
                        h = g[s++],
                        c ? (c.scope ? (m = a.$new(P(c.scope)),
                        A(k).data("$scope", m)) : m = a,
                        (q = c.transclude) || !l && b ? c(h, m, k, d, function(b) {
                            return function(c) {
                                var d = a.$new();
                                d.$$transcluded = !0;
                                return b(d, c).bind("$destroy", Za(d, d.$destroy))
                            }
                        }(q || b)) : c(h, m, k, t, l)) : h && h(a, k.childNodes, t, l)
                }
                for (var g = [], l, h, k, m = 0; m < a.length; m++)
                    h = new ka,
                    l = K(a[m], [], h, d),
                    h = (l = l.length ? N(l, a[m], h, b, c) : null) && l.terminal || !a[m].childNodes || !a[m].childNodes.length ? null : D(a[m].childNodes, l ? l.transclude : b),
                    g.push(l),
                    g.push(h),
                    k = k || l || h;
                return k ? e : null
            }
            function K(a, b, c, g) {
                var l = c.$attr, h;
                switch (a.nodeType) {
                case 1:
                    H(b, fa(Ka(a).toLowerCase()), "E", g);
                    var k, m, q;
                    h = a.attributes;
                    for (var s = 0, n = h && h.length; s < n; s++)
                        if (k = h[s],
                        !Y || 8 <= Y || k.specified)
                            m = k.name,
                            q = fa(m.toLowerCase()),
                            l[q] = m,
                            c[q] = k = V(Y && "href" == m ? decodeURIComponent(a.getAttribute(m, 2)) : k.value),
                            Gb(a, q) && (c[q] = !0),
                            U(a, b, k, q),
                            H(b, q, "A", g);
                    a = a.className;
                    if (E(a) && "" !== a)
                        for (; h = e.exec(a); )
                            q = fa(h[2]),
                            H(b, q, "C", g) && (c[q] = V(h[3])),
                            a = a.substr(h.index + h[0].length);
                    break;
                case 3:
                    aa(b, a.nodeValue);
                    break;
                case 8:
                    try {
                        if (h = d.exec(a.nodeValue))
                            q = fa(h[1]),
                            H(b, q, "M", g) && (c[q] = V(h[2]))
                    } catch (r) {}
                }
                b.sort(w);
                return b
            }
            function N(a, b, c, d, e) {
                function l(a, b) {
                    a && (a.require = w.require,
                    r.push(a));
                    b && (b.require = w.require,
                    v.push(b))
                }
                function h(a, b) {
                    var c, d = "data", e = !1;
                    if (E(a)) {
                        for (; "^" == (c = a.charAt(0)) || "?" == c; )
                            a = a.substr(1),
                            "^" == c && (d = "inheritedData"),
                            e = e || "?" == c;
                        c = b[d]("$" + a + "Controller");
                        if (!c && !e)
                            throw Error("No controller: " + a);
                    } else
                        F(a) && (c = [],
                        p(a, function(a) {
                            c.push(h(a, b))
                        }));
                    return c
                }
                function k(a, d, e, g, l) {
                    var n, B, w, I, Q;
                    n = b === e ? c : oc(c, new ka(A(e),c.$attr));
                    B = n.$$element;
                    if (N) {
                        var Hc = /^\s*([@=&])\s*(\w*)\s*$/
                          , y = d.$parent || d;
                        p(N.scope, function(a, b) {
                            var c = a.match(Hc) || [], e = c[2] || b, c = c[1], g, l, h;
                            d.$$isolateBindings[b] = c + e;
                            switch (c) {
                            case "@":
                                n.$observe(e, function(a) {
                                    d[b] = a
                                });
                                n.$$observers[e].$$scope = y;
                                break;
                            case "=":
                                l = s(n[e]);
                                h = l.assign || function() {
                                    g = d[b] = l(y);
                                    throw Error(Kb + n[e] + " (directive: " + N.name + ")");
                                }
                                ;
                                g = d[b] = l(y);
                                d.$watch(function() {
                                    var a = l(y);
                                    a !== d[b] && (a !== g ? g = d[b] = a : h(y, a = g = d[b]));
                                    return a
                                });
                                break;
                            case "&":
                                l = s(n[e]);
                                d[b] = function(a) {
                                    return l(y, a)
                                }
                                ;
                                break;
                            default:
                                throw Error("Invalid isolate scope definition for directive " + N.name + ": " + a);
                            }
                        })
                    }
                    aa && p(aa, function(a) {
                        var b = {
                            $scope: d,
                            $element: B,
                            $attrs: n,
                            $transclude: l
                        };
                        Q = a.controller;
                        "@" == Q && (Q = n[a.name]);
                        B.data("$" + a.name + "Controller", q(Q, b))
                    });
                    g = 0;
                    for (w = r.length; g < w; g++)
                        try {
                            I = r[g],
                            I(d, B, n, I.require && h(I.require, B))
                        } catch (D) {
                            m(D, sa(B))
                        }
                    a && a(d, e.childNodes, t, l);
                    g = 0;
                    for (w = v.length; g < w; g++)
                        try {
                            I = v[g],
                            I(d, B, n, I.require && h(I.require, B))
                        } catch (Ic) {
                            m(Ic, sa(B))
                        }
                }
                for (var n = -Number.MAX_VALUE, r = [], v = [], B = null, N = null, D = null, I = c.$$element = A(b), w, H, U, la, ga = d, aa, z, u, C = 0, G = a.length; C < G; C++) {
                    w = a[C];
                    U = t;
                    if (n > w.priority)
                        break;
                    if (u = w.scope)
                        wa("isolated scope", N, w, I),
                        P(u) && (Q(I, "ng-isolate-scope"),
                        N = w),
                        Q(I, "ng-scope"),
                        B = B || w;
                    H = w.name;
                    if (u = w.controller)
                        aa = aa || {},
                        wa("'" + H + "' controller", aa[H], w, I),
                        aa[H] = w;
                    if (u = w.transclude)
                        wa("transclusion", la, w, I),
                        la = w,
                        n = w.priority,
                        "element" == u ? (U = A(b),
                        I = c.$$element = A(W.createComment(" " + H + ": " + c[H] + " ")),
                        b = I[0],
                        x(e, A(U[0]), b),
                        ga = y(U, d, n)) : (U = A(jb(b)).contents(),
                        I.html(""),
                        ga = y(U, d));
                    if (u = w.template)
                        if (wa("template", D, w, I),
                        D = w,
                        u = Lb(u),
                        w.replace) {
                            U = A("<div>" + V(u) + "</div>").contents();
                            b = U[0];
                            if (1 != U.length || 1 !== b.nodeType)
                                throw Error(g + u);
                            x(e, I, b);
                            H = {
                                $attr: {}
                            };
                            a = a.concat(K(b, a.splice(C + 1, a.length - (C + 1)), H));
                            ja(c, H);
                            G = a.length
                        } else
                            I.html(u);
                    if (w.templateUrl)
                        wa("template", D, w, I),
                        D = w,
                        k = T(a.splice(C, a.length - C), k, I, c, e, w.replace, ga),
                        G = a.length;
                    else if (w.compile)
                        try {
                            z = w.compile(I, c, ga),
                            L(z) ? l(null, z) : z && l(z.pre, z.post)
                        } catch (J) {
                            m(J, sa(I))
                        }
                    w.terminal && (k.terminal = !0,
                    n = Math.max(n, w.priority))
                }
                k.scope = B && B.scope;
                k.transclude = la && ga;
                return k
            }
            function H(d, e, g, l) {
                var h = !1;
                if (a.hasOwnProperty(e)) {
                    var q;
                    e = b.get(e + c);
                    for (var n = 0, s = e.length; n < s; n++)
                        try {
                            q = e[n],
                            (l === t || l > q.priority) && -1 != q.restrict.indexOf(g) && (d.push(q),
                            h = !0)
                        } catch (r) {
                            m(r)
                        }
                }
                return h
            }
            function ja(a, b) {
                var c = b.$attr
                  , d = a.$attr
                  , e = a.$$element;
                p(a, function(d, e) {
                    "$" != e.charAt(0) && (b[e] && (d += ("style" === e ? ";" : " ") + b[e]),
                    a.$set(e, d, !0, c[e]))
                });
                p(b, function(b, g) {
                    "class" == g ? (Q(e, b),
                    a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == g ? e.attr("style", e.attr("style") + ";" + b) : "$" == g.charAt(0) || a.hasOwnProperty(g) || (a[g] = b,
                    d[g] = c[g])
                })
            }
            function T(a, b, c, d, e, l, h) {
                var k = [], m, q, s = c[0], v = a.shift(), B = C({}, v, {
                    controller: null,
                    templateUrl: null,
                    transclude: null,
                    scope: null
                });
                c.html("");
                n.get(v.templateUrl, {
                    cache: r
                }).success(function(n) {
                    var r, v;
                    n = Lb(n);
                    if (l) {
                        v = A("<div>" + V(n) + "</div>").contents();
                        r = v[0];
                        if (1 != v.length || 1 !== r.nodeType)
                            throw Error(g + n);
                        n = {
                            $attr: {}
                        };
                        x(e, c, r);
                        K(r, a, n);
                        ja(d, n)
                    } else
                        r = s,
                        c.html(n);
                    a.unshift(B);
                    m = N(a, r, d, h);
                    for (q = D(c[0].childNodes, h); k.length; ) {
                        var ka = k.pop();
                        n = k.pop();
                        v = k.pop();
                        var I = k.pop()
                          , w = r;
                        v !== s && (w = jb(r),
                        x(n, A(v), w));
                        m(function() {
                            b(q, I, w, e, ka)
                        }, I, w, e, ka)
                    }
                    k = null
                }).error(function(a, b, c, d) {
                    throw Error("Failed to load template: " + d.url);
                });
                return function(a, c, d, e, g) {
                    k ? (k.push(c),
                    k.push(d),
                    k.push(e),
                    k.push(g)) : m(function() {
                        b(q, c, d, e, g)
                    }, c, d, e, g)
                }
            }
            function w(a, b) {
                return b.priority - a.priority
            }
            function wa(a, b, c, d) {
                if (b)
                    throw Error("Multiple directives [" + b.name + ", " + c.name + "] asking for " + a + " on: " + sa(d));
            }
            function aa(a, b) {
                var c = l(b, !0);
                c && a.push({
                    priority: 0,
                    compile: M(function(a, b) {
                        var d = b.parent()
                          , e = d.data("$binding") || [];
                        e.push(c);
                        Q(d.data("$binding", e), "ng-binding");
                        a.$watch(c, function(a) {
                            b[0].nodeValue = a
                        })
                    })
                })
            }
            function U(a, b, c, d) {
                var e = l(c, !0);
                e && b.push({
                    priority: 100,
                    compile: M(function(a, b, c) {
                        b = c.$$observers || (c.$$observers = {});
                        "class" === d && (e = l(c[d], !0));
                        c[d] = t;
                        (b[d] || (b[d] = [])).$$inter = !0;
                        (c.$$observers && c.$$observers[d].$$scope || a).$watch(e, function(a) {
                            c.$set(d, a)
                        })
                    })
                })
            }
            function x(a, b, c) {
                var d = b[0], e = d.parentNode, g, l;
                if (a)
                    for (g = 0,
                    l = a.length; g < l; g++)
                        if (a[g] == d) {
                            a[g] = c;
                            break
                        }
                e && e.replaceChild(c, d);
                c[A.expando] = d[A.expando];
                b[0] = c
            }
            var ka = function(a, b) {
                this.$$element = a;
                this.$attr = b || {}
            };
            ka.prototype = {
                $normalize: fa,
                $set: function(a, b, c, d) {
                    var e = Gb(this.$$element[0], a)
                      , g = this.$$observers;
                    e && (this.$$element.prop(a, b),
                    d = e);
                    this[a] = b;
                    d ? this.$attr[a] = d : (d = this.$attr[a]) || (this.$attr[a] = d = eb(a, "-"));
                    "A" === Ka(this.$$element[0]) && "href" === a && (I.setAttribute("href", b),
                    e = I.href,
                    "" === e || e.match(h) || (this[a] = b = "unsafe:" + e));
                    !1 !== c && (null === b || b === t ? this.$$element.removeAttr(d) : this.$$element.attr(d, b));
                    g && p(g[a], function(a) {
                        try {
                            a(b)
                        } catch (c) {
                            m(c)
                        }
                    })
                },
                $observe: function(a, b) {
                    var c = this
                      , d = c.$$observers || (c.$$observers = {})
                      , e = d[a] || (d[a] = []);
                    e.push(b);
                    B.$evalAsync(function() {
                        e.$$inter || b(c[a])
                    });
                    return b
                }
            };
            var I = v[0].createElement("a")
              , la = l.startSymbol()
              , ga = l.endSymbol()
              , Lb = "{{" == la || "}}" == ga ? pa : function(a) {
                return a.replace(/\{\{/g, la).replace(/}}/g, ga)
            }
            ;
            return y
        }
        ]
    }
    function fa(b) {
        return zb(b.replace(Jc, ""))
    }
    function Kc() {
        var b = {};
        this.register = function(a, c) {
            P(a) ? C(b, a) : b[a] = c
        }
        ;
        this.$get = ["$injector", "$window", function(a, c) {
            return function(d, e) {
                if (E(d)) {
                    var g = d;
                    d = b.hasOwnProperty(g) ? b[g] : gb(e.$scope, g, !0) || gb(c, g, !0);
                    ta(d, g, !0)
                }
                return a.instantiate(d, e)
            }
        }
        ]
    }
    function Lc() {
        this.$get = ["$window", function(b) {
            return A(b.document)
        }
        ]
    }
    function Mc() {
        this.$get = ["$log", function(b) {
            return function(a, c) {
                b.error.apply(b, arguments)
            }
        }
        ]
    }
    function Nc() {
        var b = "{{"
          , a = "}}";
        this.startSymbol = function(a) {
            return a ? (b = a,
            this) : b
        }
        ;
        this.endSymbol = function(b) {
            return b ? (a = b,
            this) : a
        }
        ;
        this.$get = ["$parse", function(c) {
            function d(d, f) {
                for (var k, l, m = 0, n = [], r = d.length, s = !1, q = []; m < r; )
                    -1 != (k = d.indexOf(b, m)) && -1 != (l = d.indexOf(a, k + e)) ? (m != k && n.push(d.substring(m, k)),
                    n.push(m = c(s = d.substring(k + e, l))),
                    m.exp = s,
                    m = l + g,
                    s = !0) : (m != r && n.push(d.substring(m)),
                    m = r);
                (r = n.length) || (n.push(""),
                r = 1);
                if (!f || s)
                    return q.length = r,
                    m = function(a) {
                        for (var b = 0, c = r, d; b < c; b++)
                            "function" == typeof (d = n[b]) && (d = d(a),
                            null == d || d == t ? d = "" : "string" != typeof d && (d = ea(d))),
                            q[b] = d;
                        return q.join("")
                    }
                    ,
                    m.exp = d,
                    m.parts = n,
                    m
            }
            var e = b.length
              , g = a.length;
            d.startSymbol = function() {
                return b
            }
            ;
            d.endSymbol = function() {
                return a
            }
            ;
            return d
        }
        ]
    }
    function Mb(b) {
        b = b.split("/");
        for (var a = b.length; a--; )
            b[a] = cb(b[a]);
        return b.join("/")
    }
    function ya(b, a) {
        var c = Nb.exec(b)
          , c = {
            protocol: c[1],
            host: c[3],
            port: J(c[5]) || Ob[c[1]] || null,
            path: c[6] || "/",
            search: c[8],
            hash: c[10]
        };
        a && (a.$$protocol = c.protocol,
        a.$$host = c.host,
        a.$$port = c.port);
        return c
    }
    function ma(b, a, c) {
        return b + "://" + a + (c == Ob[b] ? "" : ":" + c)
    }
    function Oc(b, a, c) {
        var d = ya(b);
        return decodeURIComponent(d.path) != a || z(d.hash) || 0 !== d.hash.indexOf(c) ? b : ma(d.protocol, d.host, d.port) + a.substr(0, a.lastIndexOf("/")) + d.hash.substr(c.length)
    }
    function Pc(b, a, c) {
        var d = ya(b);
        if (decodeURIComponent(d.path) != a || z(d.hash) || 0 !== d.hash.indexOf(c)) {
            var e = d.search && "?" + d.search || ""
              , g = d.hash && "#" + d.hash || ""
              , h = a.substr(0, a.lastIndexOf("/"))
              , f = d.path.substr(h.length);
            if (0 !== d.path.indexOf(h))
                throw Error('Invalid url "' + b + '", missing path prefix "' + h + '" !');
            return ma(d.protocol, d.host, d.port) + a + "#" + c + f + e + g
        }
        return b
    }
    function mb(b, a, c) {
        a = a || "";
        this.$$parse = function(b) {
            var c = ya(b, this);
            if (0 !== c.path.indexOf(a))
                throw Error('Invalid url "' + b + '", missing path prefix "' + a + '" !');
            this.$$path = decodeURIComponent(c.path.substr(a.length));
            this.$$search = ab(c.search);
            this.$$hash = c.hash && decodeURIComponent(c.hash) || "";
            this.$$compose()
        }
        ;
        this.$$compose = function() {
            var b = wb(this.$$search)
              , c = this.$$hash ? "#" + cb(this.$$hash) : "";
            this.$$url = Mb(this.$$path) + (b ? "?" + b : "") + c;
            this.$$absUrl = ma(this.$$protocol, this.$$host, this.$$port) + a + this.$$url
        }
        ;
        this.$$rewriteAppUrl = function(a) {
            if (0 == a.indexOf(c))
                return a
        }
        ;
        this.$$parse(b)
    }
    function La(b, a, c) {
        var d;
        this.$$parse = function(b) {
            var c = ya(b, this);
            if (c.hash && 0 !== c.hash.indexOf(a))
                throw Error('Invalid url "' + b + '", missing hash prefix "' + a + '" !');
            d = c.path + (c.search ? "?" + c.search : "");
            c = Qc.exec((c.hash || "").substr(a.length));
            this.$$path = c[1] ? ("/" == c[1].charAt(0) ? "" : "/") + decodeURIComponent(c[1]) : "";
            this.$$search = ab(c[3]);
            this.$$hash = c[5] && decodeURIComponent(c[5]) || "";
            this.$$compose()
        }
        ;
        this.$$compose = function() {
            var b = wb(this.$$search)
              , c = this.$$hash ? "#" + cb(this.$$hash) : "";
            this.$$url = Mb(this.$$path) + (b ? "?" + b : "") + c;
            this.$$absUrl = ma(this.$$protocol, this.$$host, this.$$port) + d + (this.$$url ? "#" + a + this.$$url : "")
        }
        ;
        this.$$rewriteAppUrl = function(a) {
            if (0 == a.indexOf(c))
                return a
        }
        ;
        this.$$parse(b)
    }
    function Pb(b, a, c, d) {
        La.apply(this, arguments);
        this.$$rewriteAppUrl = function(b) {
            if (0 == b.indexOf(c))
                return c + d + "#" + a + b.substr(c.length)
        }
    }
    function Ma(b) {
        return function() {
            return this[b]
        }
    }
    function Qb(b, a) {
        return function(c) {
            if (z(c))
                return this[b];
            this[b] = a(c);
            this.$$compose();
            return this
        }
    }
    function Rc() {
        var b = ""
          , a = !1;
        this.hashPrefix = function(a) {
            return x(a) ? (b = a,
            this) : b
        }
        ;
        this.html5Mode = function(b) {
            return x(b) ? (a = b,
            this) : a
        }
        ;
        this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", function(c, d, e, g) {
            function h(a) {
                c.$broadcast("$locationChangeSuccess", f.absUrl(), a)
            }
            var f, k, l, m = d.url(), n = ya(m);
            a ? (k = d.baseHref() || "/",
            l = k.substr(0, k.lastIndexOf("/")),
            n = ma(n.protocol, n.host, n.port) + l + "/",
            f = e.history ? new mb(Oc(m, k, b),l,n) : new Pb(Pc(m, k, b),b,n,k.substr(l.length + 1))) : (n = ma(n.protocol, n.host, n.port) + (n.path || "") + (n.search ? "?" + n.search : "") + "#" + b + "/",
            f = new La(m,b,n));
            g.bind("click", function(a) {
                if (!a.ctrlKey && !a.metaKey && 2 != a.which) {
                    for (var b = A(a.target); "a" !== G(b[0].nodeName); )
                        if (b[0] === g[0] || !(b = b.parent())[0])
                            return;
                    var d = b.prop("href")
                      , e = f.$$rewriteAppUrl(d);
                    d && !b.attr("target") && e && (f.$$parse(e),
                    c.$apply(),
                    a.preventDefault(),
                    S.angular["ff-684208-preventDefault"] = !0)
                }
            });
            f.absUrl() != m && d.url(f.absUrl(), !0);
            d.onUrlChange(function(a) {
                f.absUrl() != a && (c.$broadcast("$locationChangeStart", a, f.absUrl()).defaultPrevented ? d.url(f.absUrl()) : (c.$evalAsync(function() {
                    var b = f.absUrl();
                    f.$$parse(a);
                    h(b)
                }),
                c.$$phase || c.$digest()))
            });
            var r = 0;
            c.$watch(function() {
                var a = d.url()
                  , b = f.$$replace;
                r && a == f.absUrl() || (r++,
                c.$evalAsync(function() {
                    c.$broadcast("$locationChangeStart", f.absUrl(), a).defaultPrevented ? f.$$parse(a) : (d.url(f.absUrl(), b),
                    h(a))
                }));
                f.$$replace = !1;
                return r
            });
            return f
        }
        ]
    }
    function Sc() {
        this.$get = ["$window", function(b) {
            function a(a) {
                a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line));
                return a
            }
            function c(c) {
                var e = b.console || {}
                  , g = e[c] || e.log || u;
                return g.apply ? function() {
                    var b = [];
                    p(arguments, function(c) {
                        b.push(a(c))
                    });
                    return g.apply(e, b)
                }
                : function(a, b) {
                    g(a, b)
                }
            }
            return {
                log: c("log"),
                warn: c("warn"),
                info: c("info"),
                error: c("error")
            }
        }
        ]
    }
    function Tc(b, a) {
        function c(a) {
            return -1 != a.indexOf(v)
        }
        function d() {
            return q + 1 < b.length ? b.charAt(q + 1) : !1
        }
        function e(a) {
            return "0" <= a && "9" >= a
        }
        function g(a) {
            return " " == a || "\r" == a || "\t" == a || "\n" == a || "\v" == a || "\u00a0" == a
        }
        function h(a) {
            return "a" <= a && "z" >= a || "A" <= a && "Z" >= a || "_" == a || "$" == a
        }
        function f(a) {
            return "-" == a || "+" == a || e(a)
        }
        function k(a, c, d) {
            d = d || q;
            throw Error("Lexer Error: " + a + " at column" + (x(c) ? "s " + c + "-" + q + " [" + b.substring(c, d) + "]" : " " + d) + " in expression [" + b + "].");
        }
        function l() {
            for (var a = "", c = q; q < b.length; ) {
                var g = G(b.charAt(q));
                if ("." == g || e(g))
                    a += g;
                else {
                    var l = d();
                    if ("e" == g && f(l))
                        a += g;
                    else if (f(g) && l && e(l) && "e" == a.charAt(a.length - 1))
                        a += g;
                    else if (!f(g) || l && e(l) || "e" != a.charAt(a.length - 1))
                        break;
                    else
                        k("Invalid exponent")
                }
                q++
            }
            a *= 1;
            r.push({
                index: c,
                text: a,
                json: !0,
                fn: function() {
                    return a
                }
            })
        }
        function m() {
            for (var c = "", d = q, f, l, k, m; q < b.length; ) {
                m = b.charAt(q);
                if ("." == m || h(m) || e(m))
                    "." == m && (f = q),
                    c += m;
                else
                    break;
                q++
            }
            if (f)
                for (l = q; l < b.length; ) {
                    m = b.charAt(l);
                    if ("(" == m) {
                        k = c.substr(f - d + 1);
                        c = c.substr(0, f - d);
                        q = l;
                        break
                    }
                    if (g(m))
                        l++;
                    else
                        break
                }
            d = {
                index: d,
                text: c
            };
            if (Na.hasOwnProperty(c))
                d.fn = d.json = Na[c];
            else {
                var n = Rb(c, a);
                d.fn = C(function(a, b) {
                    return n(a, b)
                }, {
                    assign: function(a, b) {
                        return Sb(a, c, b)
                    }
                })
            }
            r.push(d);
            k && (r.push({
                index: f,
                text: ".",
                json: !1
            }),
            r.push({
                index: f + 1,
                text: k,
                json: !1
            }))
        }
        function n(a) {
            var c = q;
            q++;
            for (var d = "", e = a, f = !1; q < b.length; ) {
                var g = b.charAt(q)
                  , e = e + g;
                if (f)
                    "u" == g ? (g = b.substring(q + 1, q + 5),
                    g.match(/[\da-f]{4}/i) || k("Invalid unicode escape [\\u" + g + "]"),
                    q += 4,
                    d += String.fromCharCode(parseInt(g, 16))) : d = (f = Uc[g]) ? d + f : d + g,
                    f = !1;
                else if ("\\" == g)
                    f = !0;
                else {
                    if (g == a) {
                        q++;
                        r.push({
                            index: c,
                            text: e,
                            string: d,
                            json: !0,
                            fn: function() {
                                return d
                            }
                        });
                        return
                    }
                    d += g
                }
                q++
            }
            k("Unterminated quote", c)
        }
        for (var r = [], s, q = 0, B = [], v, y = ":"; q < b.length; ) {
            v = b.charAt(q);
            if (c("\"'"))
                n(v);
            else if (e(v) || c(".") && e(d()))
                l();
            else if (h(v))
                m(),
                -1 != "{,".indexOf(y) && "{" == B[0] && (s = r[r.length - 1]) && (s.json = -1 == s.text.indexOf("."));
            else if (c("(){}[].,;:"))
                r.push({
                    index: q,
                    text: v,
                    json: -1 != ":[,".indexOf(y) && c("{[") || c("}]:,")
                }),
                c("{[") && B.unshift(v),
                c("}]") && B.shift(),
                q++;
            else if (g(v)) {
                q++;
                continue
            } else {
                var p = v + d()
                  , D = Na[v]
                  , K = Na[p];
                K ? (r.push({
                    index: q,
                    text: p,
                    fn: K
                }),
                q += 2) : D ? (r.push({
                    index: q,
                    text: v,
                    fn: D,
                    json: -1 != "[,:".indexOf(y) && c("+-")
                }),
                q += 1) : k("Unexpected next character ", q, q + 1)
            }
            y = v
        }
        return r
    }
    function Vc(b, a, c, d) {
        function e(a, c) {
            throw Error("Syntax Error: Token '" + c.text + "' " + a + " at column " + (c.index + 1) + " of the expression [" + b + "] starting at [" + b.substring(c.index) + "].");
        }
        function g() {
            if (0 === T.length)
                throw Error("Unexpected end of expression: " + b);
            return T[0]
        }
        function h(a, b, c, d) {
            if (0 < T.length) {
                var e = T[0]
                  , f = e.text;
                if (f == a || f == b || f == c || f == d || !(a || b || c || d))
                    return e
            }
            return !1
        }
        function f(b, c, d, f) {
            return (b = h(b, c, d, f)) ? (a && !b.json && e("is not valid json", b),
            T.shift(),
            b) : !1
        }
        function k(a) {
            f(a) || e("is unexpected, expecting [" + a + "]", h())
        }
        function l(a, b) {
            return function(c, d) {
                return a(c, d, b)
            }
        }
        function m(a, b, c) {
            return function(d, e) {
                return b(d, e, a, c)
            }
        }
        function n() {
            for (var a = []; ; )
                if (0 < T.length && !h("}", ")", ";", "]") && a.push(x()),
                !f(";"))
                    return 1 == a.length ? a[0] : function(b, c) {
                        for (var d, e = 0; e < a.length; e++) {
                            var f = a[e];
                            f && (d = f(b, c))
                        }
                        return d
                    }
        }
        function r() {
            for (var a = f(), b = c(a.text), d = []; ; )
                if (a = f(":"))
                    d.push(w());
                else {
                    var e = function(a, c, e) {
                        e = [e];
                        for (var f = 0; f < d.length; f++)
                            e.push(d[f](a, c));
                        return b.apply(a, e)
                    };
                    return function() {
                        return e
                    }
                }
        }
        function s() {
            for (var a = q(), b; ; )
                if (b = f("||"))
                    a = m(a, b.fn, q());
                else
                    return a
        }
        function q() {
            var a = B(), b;
            if (b = f("&&"))
                a = m(a, b.fn, q());
            return a
        }
        function B() {
            var a = v(), b;
            if (b = f("==", "!="))
                a = m(a, b.fn, B());
            return a
        }
        function v() {
            var a;
            a = y();
            for (var b; b = f("+", "-"); )
                a = m(a, b.fn, y());
            if (b = f("<", ">", "<=", ">="))
                a = m(a, b.fn, v());
            return a
        }
        function y() {
            for (var a = p(), b; b = f("*", "/", "%"); )
                a = m(a, b.fn, p());
            return a
        }
        function p() {
            var a;
            return f("+") ? D() : (a = f("-")) ? m(H, a.fn, p()) : (a = f("!")) ? l(a.fn, p()) : D()
        }
        function D() {
            var a;
            if (f("("))
                a = x(),
                k(")");
            else if (f("["))
                a = K();
            else if (f("{"))
                a = N();
            else {
                var b = f();
                (a = b.fn) || e("not a primary expression", b)
            }
            for (var c; b = f("(", "[", "."); )
                "(" === b.text ? (a = z(a, c),
                c = null) : "[" === b.text ? (c = a,
                a = U(a)) : "." === b.text ? (c = a,
                a = aa(a)) : e("IMPOSSIBLE");
            return a
        }
        function K() {
            var a = [];
            if ("]" != g().text) {
                do
                    a.push(w());
                while (f(","))
            }
            k("]");
            return function(b, c) {
                for (var d = [], e = 0; e < a.length; e++)
                    d.push(a[e](b, c));
                return d
            }
        }
        function N() {
            var a = [];
            if ("}" != g().text) {
                do {
                    var b = f()
                      , b = b.string || b.text;
                    k(":");
                    var c = w();
                    a.push({
                        key: b,
                        value: c
                    })
                } while (f(","))
            }
            k("}");
            return function(b, c) {
                for (var d = {}, e = 0; e < a.length; e++) {
                    var f = a[e];
                    d[f.key] = f.value(b, c)
                }
                return d
            }
        }
        var H = M(0), A, T = Tc(b, d), w = function() {
            var a = s(), c, d;
            return (d = f("=")) ? (a.assign || e("implies assignment but [" + b.substring(0, d.index) + "] can not be assigned to", d),
            c = s(),
            function(b, d) {
                return a.assign(b, c(b, d), d)
            }
            ) : a
        }, z = function(a, b) {
            var c = [];
            if (")" != g().text) {
                do
                    c.push(w());
                while (f(","))
            }
            k(")");
            return function(d, e) {
                for (var f = [], g = b ? b(d, e) : d, l = 0; l < c.length; l++)
                    f.push(c[l](d, e));
                l = a(d, e, g) || u;
                return l.apply ? l.apply(g, f) : l(f[0], f[1], f[2], f[3], f[4])
            }
        }, aa = function(a) {
            var b = f().text
              , c = Rb(b, d);
            return C(function(b, d, e) {
                return c(e || a(b, d), d)
            }, {
                assign: function(c, d, e) {
                    return Sb(a(c, e), b, d)
                }
            })
        }, U = function(a) {
            var b = w();
            k("]");
            return C(function(c, d) {
                var e = a(c, d), f = b(c, d), g;
                if (!e)
                    return t;
                (e = e[f]) && e.then && (g = e,
                "$$v"in e || (g.$$v = t,
                g.then(function(a) {
                    g.$$v = a
                })),
                e = e.$$v);
                return e
            }, {
                assign: function(c, d, e) {
                    return a(c, e)[b(c, e)] = d
                }
            })
        }, x = function() {
            for (var a = w(), b; ; )
                if (b = f("|"))
                    a = m(a, b.fn, r());
                else
                    return a
        };
        a ? (w = s,
        z = aa = U = x = function() {
            e("is not valid json", {
                text: b,
                index: 0
            })
        }
        ,
        A = D()) : A = n();
        0 !== T.length && e("is an unexpected token", T[0]);
        return A
    }
    function Sb(b, a, c) {
        a = a.split(".");
        for (var d = 0; 1 < a.length; d++) {
            var e = a.shift()
              , g = b[e];
            g || (g = {},
            b[e] = g);
            b = g
        }
        return b[a.shift()] = c
    }
    function Tb(b, a, c, d, e) {
        return function(g, h) {
            var f = h && h.hasOwnProperty(b) ? h : g, k;
            if (null === f || f === t)
                return f;
            (f = f[b]) && f.then && ("$$v"in f || (k = f,
            k.$$v = t,
            k.then(function(a) {
                k.$$v = a
            })),
            f = f.$$v);
            if (!a || null === f || f === t)
                return f;
            (f = f[a]) && f.then && ("$$v"in f || (k = f,
            k.$$v = t,
            k.then(function(a) {
                k.$$v = a
            })),
            f = f.$$v);
            if (!c || null === f || f === t)
                return f;
            (f = f[c]) && f.then && ("$$v"in f || (k = f,
            k.$$v = t,
            k.then(function(a) {
                k.$$v = a
            })),
            f = f.$$v);
            if (!d || null === f || f === t)
                return f;
            (f = f[d]) && f.then && ("$$v"in f || (k = f,
            k.$$v = t,
            k.then(function(a) {
                k.$$v = a
            })),
            f = f.$$v);
            if (!e || null === f || f === t)
                return f;
            (f = f[e]) && f.then && ("$$v"in f || (k = f,
            k.$$v = t,
            k.then(function(a) {
                k.$$v = a
            })),
            f = f.$$v);
            return f
        }
    }
    function Rb(b, a) {
        if (nb.hasOwnProperty(b))
            return nb[b];
        var c = b.split("."), d = c.length, e;
        if (a)
            e = 6 > d ? Tb(c[0], c[1], c[2], c[3], c[4]) : function(a, b) {
                var e = 0, g;
                do
                    g = Tb(c[e++], c[e++], c[e++], c[e++], c[e++])(a, b),
                    b = t,
                    a = g;
                while (e < d);
                return g
            }
            ;
        else {
            var g = "var l, fn, p;\n";
            p(c, function(a, b) {
                g += "if(s === null || s === undefined) return s;\nl=s;\ns=" + (b ? "s" : '((k&&k.hasOwnProperty("' + a + '"))?k:s)') + '["' + a + '"];\nif (s && s.then) {\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n'
            });
            g += "return s;";
            e = Function("s", "k", g);
            e.toString = function() {
                return g
            }
        }
        return nb[b] = e
    }
    function Wc() {
        var b = {};
        this.$get = ["$filter", "$sniffer", function(a, c) {
            return function(d) {
                switch (typeof d) {
                case "string":
                    return b.hasOwnProperty(d) ? b[d] : b[d] = Vc(d, !1, a, c.csp);
                case "function":
                    return d;
                default:
                    return u
                }
            }
        }
        ]
    }
    function Xc() {
        this.$get = ["$rootScope", "$exceptionHandler", function(b, a) {
            return Yc(function(a) {
                b.$evalAsync(a)
            }, a)
        }
        ]
    }
    function Yc(b, a) {
        function c(a) {
            return a
        }
        function d(a) {
            return h(a)
        }
        var e = function() {
            var f = [], k, l;
            return l = {
                resolve: function(a) {
                    if (f) {
                        var c = f;
                        f = t;
                        k = g(a);
                        c.length && b(function() {
                            for (var a, b = 0, d = c.length; b < d; b++)
                                a = c[b],
                                k.then(a[0], a[1])
                        })
                    }
                },
                reject: function(a) {
                    l.resolve(h(a))
                },
                promise: {
                    then: function(b, g) {
                        var l = e()
                          , h = function(d) {
                            try {
                                l.resolve((b || c)(d))
                            } catch (e) {
                                l.reject(e),
                                a(e)
                            }
                        }
                          , q = function(b) {
                            try {
                                l.resolve((g || d)(b))
                            } catch (c) {
                                l.reject(c),
                                a(c)
                            }
                        };
                        f ? f.push([h, q]) : k.then(h, q);
                        return l.promise
                    }
                }
            }
        }
          , g = function(a) {
            return a && a.then ? a : {
                then: function(c) {
                    var d = e();
                    b(function() {
                        d.resolve(c(a))
                    });
                    return d.promise
                }
            }
        }
          , h = function(a) {
            return {
                then: function(c, g) {
                    var h = e();
                    b(function() {
                        h.resolve((g || d)(a))
                    });
                    return h.promise
                }
            }
        };
        return {
            defer: e,
            reject: h,
            when: function(f, k, l) {
                var m = e(), n, r = function(b) {
                    try {
                        return (k || c)(b)
                    } catch (d) {
                        return a(d),
                        h(d)
                    }
                }, s = function(b) {
                    try {
                        return (l || d)(b)
                    } catch (c) {
                        return a(c),
                        h(c)
                    }
                };
                b(function() {
                    g(f).then(function(a) {
                        n || (n = !0,
                        m.resolve(g(a).then(r, s)))
                    }, function(a) {
                        n || (n = !0,
                        m.resolve(s(a)))
                    })
                });
                return m.promise
            },
            all: function(a) {
                var b = e()
                  , c = a.length
                  , d = [];
                c ? p(a, function(a, e) {
                    g(a).then(function(a) {
                        e in d || (d[e] = a,
                        --c || b.resolve(d))
                    }, function(a) {
                        e in d || b.reject(a)
                    })
                }) : b.resolve(d);
                return b.promise
            }
        }
    }
    function Zc() {
        var b = {};
        this.when = function(a, c) {
            b[a] = C({
                reloadOnSearch: !0
            }, c);
            if (a) {
                var d = "/" == a[a.length - 1] ? a.substr(0, a.length - 1) : a + "/";
                b[d] = {
                    redirectTo: a
                }
            }
            return this
        }
        ;
        this.otherwise = function(a) {
            this.when(null, a);
            return this
        }
        ;
        this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$http", "$templateCache", function(a, c, d, e, g, h, f) {
            function k(a, b) {
                b = "^" + b.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "$";
                for (var c = "", d = [], e = {}, f = /:(\w+)/g, g, l = 0; null !== (g = f.exec(b)); )
                    c += b.slice(l, g.index),
                    c += "([^\\/]*)",
                    d.push(g[1]),
                    l = f.lastIndex;
                var c = c + b.substr(l)
                  , h = a.match(RegExp(c));
                h && p(d, function(a, b) {
                    e[a] = h[b + 1]
                });
                return h ? e : null
            }
            function l() {
                var b = m()
                  , l = s.current;
                if (b && l && b.$$route === l.$$route && ha(b.pathParams, l.pathParams) && !b.reloadOnSearch && !r)
                    l.params = b.params,
                    X(l.params, d),
                    a.$broadcast("$routeUpdate", l);
                else if (b || l)
                    r = !1,
                    a.$broadcast("$routeChangeStart", b, l),
                    (s.current = b) && b.redirectTo && (E(b.redirectTo) ? c.path(n(b.redirectTo, b.params)).search(b.params).replace() : c.url(b.redirectTo(b.pathParams, c.path(), c.search())).replace()),
                    e.when(b).then(function() {
                        if (b) {
                            var a = [], c = [], d;
                            p(b.resolve || {}, function(b, d) {
                                a.push(d);
                                c.push(E(b) ? g.get(b) : g.invoke(b))
                            });
                            x(d = b.template) || x(d = b.templateUrl) && (d = h.get(d, {
                                cache: f
                            }).then(function(a) {
                                return a.data
                            }));
                            x(d) && (a.push("$template"),
                            c.push(d));
                            return e.all(c).then(function(b) {
                                var c = {};
                                p(b, function(b, d) {
                                    c[a[d]] = b
                                });
                                return c
                            })
                        }
                    }).then(function(c) {
                        b == s.current && (b && (b.locals = c,
                        X(b.params, d)),
                        a.$broadcast("$routeChangeSuccess", b, l))
                    }, function(c) {
                        b == s.current && a.$broadcast("$routeChangeError", b, l, c)
                    })
            }
            function m() {
                var a, d;
                p(b, function(b, e) {
                    !d && (a = k(c.path(), e)) && (d = Aa(b, {
                        params: C({}, c.search(), a),
                        pathParams: a
                    }),
                    d.$$route = b)
                });
                return d || b[null] && Aa(b[null], {
                    params: {},
                    pathParams: {}
                })
            }
            function n(a, b) {
                var c = [];
                p((a || "").split(":"), function(a, d) {
                    if (0 == d)
                        c.push(a);
                    else {
                        var e = a.match(/(\w+)(.*)/)
                          , f = e[1];
                        c.push(b[f]);
                        c.push(e[2] || "");
                        delete b[f]
                    }
                });
                return c.join("")
            }
            var r = !1
              , s = {
                routes: b,
                reload: function() {
                    r = !0;
                    a.$evalAsync(l)
                }
            };
            a.$on("$locationChangeSuccess", l);
            return s
        }
        ]
    }
    function $c() {
        this.$get = M({})
    }
    function ad() {
        var b = 10;
        this.digestTtl = function(a) {
            arguments.length && (b = a);
            return b
        }
        ;
        this.$get = ["$injector", "$exceptionHandler", "$parse", function(a, c, d) {
            function e() {
                this.$id = za();
                this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
                this["this"] = this.$root = this;
                this.$$destroyed = !1;
                this.$$asyncQueue = [];
                this.$$listeners = {};
                this.$$isolateBindings = {}
            }
            function g(a) {
                if (k.$$phase)
                    throw Error(k.$$phase + " already in progress");
                k.$$phase = a
            }
            function h(a, b) {
                var c = d(a);
                ta(c, b);
                return c
            }
            function f() {}
            e.prototype = {
                $new: function(a) {
                    if (L(a))
                        throw Error("API-CHANGE: Use $controller to instantiate controllers.");
                    a ? (a = new e,
                    a.$root = this.$root) : (a = function() {}
                    ,
                    a.prototype = this,
                    a = new a,
                    a.$id = za());
                    a["this"] = a;
                    a.$$listeners = {};
                    a.$parent = this;
                    a.$$asyncQueue = [];
                    a.$$watchers = a.$$nextSibling = a.$$childHead = a.$$childTail = null;
                    a.$$prevSibling = this.$$childTail;
                    this.$$childHead ? this.$$childTail = this.$$childTail.$$nextSibling = a : this.$$childHead = this.$$childTail = a;
                    return a
                },
                $watch: function(a, b, c) {
                    var d = h(a, "watch")
                      , e = this.$$watchers
                      , g = {
                        fn: b,
                        last: f,
                        get: d,
                        exp: a,
                        eq: !!c
                    };
                    if (!L(b)) {
                        var k = h(b || u, "listener");
                        g.fn = function(a, b, c) {
                            k(c)
                        }
                    }
                    e || (e = this.$$watchers = []);
                    e.unshift(g);
                    return function() {
                        Xa(e, g)
                    }
                },
                $digest: function() {
                    var a, d, e, h, s, q, p, v = b, y, t = [], D, K;
                    g("$digest");
                    do {
                        p = !1;
                        y = this;
                        do {
                            for (s = y.$$asyncQueue; s.length; )
                                try {
                                    y.$eval(s.shift())
                                } catch (N) {
                                    c(N)
                                }
                            if (h = y.$$watchers)
                                for (q = h.length; q--; )
                                    try {
                                        (a = h[q]) && (d = a.get(y)) !== (e = a.last) && !(a.eq ? ha(d, e) : "number" == typeof d && "number" == typeof e && isNaN(d) && isNaN(e)) && (p = !0,
                                        a.last = a.eq ? X(d) : d,
                                        a.fn(d, e === f ? d : e, y),
                                        5 > v && (D = 4 - v,
                                        t[D] || (t[D] = []),
                                        K = L(a.exp) ? "fn: " + (a.exp.name || a.exp.toString()) : a.exp,
                                        K += "; newVal: " + ea(d) + "; oldVal: " + ea(e),
                                        t[D].push(K)))
                                    } catch (H) {
                                        c(H)
                                    }
                            if (!(h = y.$$childHead || y !== this && y.$$nextSibling))
                                for (; y !== this && !(h = y.$$nextSibling); )
                                    y = y.$parent
                        } while (y = h);
                        if (p && !v--)
                            throw k.$$phase = null,
                            Error(b + " $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: " + ea(t));
                    } while (p || s.length);
                    k.$$phase = null
                },
                $destroy: function() {
                    if (k != this && !this.$$destroyed) {
                        var a = this.$parent;
                        this.$broadcast("$destroy");
                        this.$$destroyed = !0;
                        a.$$childHead == this && (a.$$childHead = this.$$nextSibling);
                        a.$$childTail == this && (a.$$childTail = this.$$prevSibling);
                        this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling);
                        this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling);
                        this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null
                    }
                },
                $eval: function(a, b) {
                    return d(a)(this, b)
                },
                $evalAsync: function(a) {
                    this.$$asyncQueue.push(a)
                },
                $apply: function(a) {
                    try {
                        return g("$apply"),
                        this.$eval(a)
                    } catch (b) {
                        c(b)
                    } finally {
                        k.$$phase = null;
                        try {
                            k.$digest()
                        } catch (d) {
                            throw c(d),
                            d;
                        }
                    }
                },
                $on: function(a, b) {
                    var c = this.$$listeners[a];
                    c || (this.$$listeners[a] = c = []);
                    c.push(b);
                    return function() {
                        c[Ca(c, b)] = null
                    }
                },
                $emit: function(a, b) {
                    var d = [], e, f = this, g = !1, h = {
                        name: a,
                        targetScope: f,
                        stopPropagation: function() {
                            g = !0
                        },
                        preventDefault: function() {
                            h.defaultPrevented = !0
                        },
                        defaultPrevented: !1
                    }, k = Ya([h], arguments, 1), p, t;
                    do {
                        e = f.$$listeners[a] || d;
                        h.currentScope = f;
                        p = 0;
                        for (t = e.length; p < t; p++)
                            if (e[p])
                                try {
                                    if (e[p].apply(null, k),
                                    g)
                                        return h
                                } catch (D) {
                                    c(D)
                                }
                            else
                                e.splice(p, 1),
                                p--,
                                t--;
                        f = f.$parent
                    } while (f);
                    return h
                },
                $broadcast: function(a, b) {
                    var d = this, e = this, f = {
                        name: a,
                        targetScope: this,
                        preventDefault: function() {
                            f.defaultPrevented = !0
                        },
                        defaultPrevented: !1
                    }, g = Ya([f], arguments, 1), h, k;
                    do {
                        d = e;
                        f.currentScope = d;
                        e = d.$$listeners[a] || [];
                        h = 0;
                        for (k = e.length; h < k; h++)
                            if (e[h])
                                try {
                                    e[h].apply(null, g)
                                } catch (p) {
                                    c(p)
                                }
                            else
                                e.splice(h, 1),
                                h--,
                                k--;
                        if (!(e = d.$$childHead || d !== this && d.$$nextSibling))
                            for (; d !== this && !(e = d.$$nextSibling); )
                                d = d.$parent
                    } while (d = e);
                    return f
                }
            };
            var k = new e;
            return k
        }
        ]
    }
    function bd() {
        this.$get = ["$window", function(b) {
            var a = {}
              , c = J((/android (\d+)/.exec(G(b.navigator.userAgent)) || [])[1]);
            return {
                history: !(!b.history || !b.history.pushState || 4 > c),
                hashchange: "onhashchange"in b && (!b.document.documentMode || 7 < b.document.documentMode),
                hasEvent: function(c) {
                    if ("input" == c && 9 == Y)
                        return !1;
                    if (z(a[c])) {
                        var e = b.document.createElement("div");
                        a[c] = "on" + c in e
                    }
                    return a[c]
                },
                csp: !1
            }
        }
        ]
    }
    function cd() {
        this.$get = M(S)
    }
    function Ub(b) {
        var a = {}, c, d, e;
        if (!b)
            return a;
        p(b.split("\n"), function(b) {
            e = b.indexOf(":");
            c = G(V(b.substr(0, e)));
            d = V(b.substr(e + 1));
            c && (a[c] = a[c] ? a[c] + (", " + d) : d)
        });
        return a
    }
    function Vb(b) {
        var a = P(b) ? b : t;
        return function(c) {
            a || (a = Ub(b));
            return c ? a[G(c)] || null : a
        }
    }
    function Wb(b, a, c) {
        if (L(c))
            return c(b, a);
        p(c, function(c) {
            b = c(b, a)
        });
        return b
    }
    function dd() {
        var b = /^\s*(\[|\{[^\{])/
          , a = /[\}\]]\s*$/
          , c = /^\)\]\}',?\n/
          , d = this.defaults = {
            transformResponse: [function(d) {
                E(d) && (d = d.replace(c, ""),
                b.test(d) && a.test(d) && (d = ub(d, !0)));
                return d
            }
            ],
            transformRequest: [function(a) {
                return P(a) && "[object File]" !== oa.apply(a) ? ea(a) : a
            }
            ],
            headers: {
                common: {
                    Accept: "application/json, text/plain, */*",
                    "X-Requested-With": "XMLHttpRequest"
                },
                post: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                put: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            }
        }
          , e = this.responseInterceptors = [];
        this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function(a, b, c, k, l, m) {
            function n(a) {
                function c(a) {
                    var b = C({}, a, {
                        data: Wb(a.data, a.headers, f)
                    });
                    a = a.status;
                    return 200 <= a && 300 > a ? b : l.reject(b)
                }
                a.method = na(a.method);
                var e = a.transformRequest || d.transformRequest, f = a.transformResponse || d.transformResponse, g = C({}, a.headers), k = C({
                    "X-XSRF-TOKEN": b.cookies()["XSRF-TOKEN"]
                }, d.headers.common, d.headers[G(a.method)]), m, n, s, q;
                a: for (m in k) {
                    n = G(m);
                    for (s in a.headers)
                        if (G(s) === n)
                            continue a;
                    g[m] = k[m]
                }
                if (z(a.data))
                    for (var t in g)
                        if ("content-type" === G(t)) {
                            delete g[t];
                            break
                        }
                e = Wb(a.data, Vb(g), e);
                q = r(a, e, g);
                q = q.then(c, c);
                p(B, function(a) {
                    q = a(q)
                });
                q.success = function(b) {
                    q.then(function(c) {
                        b(c.data, c.status, c.headers, a)
                    });
                    return q
                }
                ;
                q.error = function(b) {
                    q.then(null, function(c) {
                        b(c.data, c.status, c.headers, a)
                    });
                    return q
                }
                ;
                return q
            }
            function r(b, c, d) {
                function e(a, b, c) {
                    p && (200 <= a && 300 > a ? p.put(t, [a, b, Ub(c)]) : p.remove(t));
                    f(b, a, c);
                    k.$apply()
                }
                function f(a, c, d) {
                    c = Math.max(c, 0);
                    (200 <= c && 300 > c ? m.resolve : m.reject)({
                        data: a,
                        status: c,
                        headers: Vb(d),
                        config: b
                    })
                }
                function h() {
                    var a = Ca(n.pendingRequests, b);
                    -1 !== a && n.pendingRequests.splice(a, 1)
                }
                var m = l.defer(), r = m.promise, p, w, t = s(b.url, b.params);
                n.pendingRequests.push(b);
                r.then(h, h);
                b.cache && "GET" == b.method && (p = P(b.cache) ? b.cache : q);
                if (p)
                    if (w = p.get(t),
                    x(w)) {
                        if (w.then)
                            return w.then(h, h),
                            w;
                        F(w) ? f(w[1], w[0], X(w[2])) : f(w, 200, {})
                    } else
                        p.put(t, r);
                z(w) && a(b.method, t, c, e, d, b.timeout, b.withCredentials);
                return r
            }
            function s(a, b) {
                if (!b)
                    return a;
                var c = [];
                mc(b, function(a, b) {
                    null != a && a != t && (P(a) && (a = ea(a)),
                    c.push(encodeURIComponent(b) + "=" + encodeURIComponent(a)))
                });
                return a + (-1 == a.indexOf("?") ? "?" : "&") + c.join("&")
            }
            var q = c("$http")
              , B = [];
            p(e, function(a) {
                B.push(E(a) ? m.get(a) : m.invoke(a))
            });
            n.pendingRequests = [];
            (function(a) {
                p(arguments, function(a) {
                    n[a] = function(b, c) {
                        return n(C(c || {}, {
                            method: a,
                            url: b
                        }))
                    }
                })
            }
            )("get", "delete", "head", "jsonp");
            (function(a) {
                p(arguments, function(a) {
                    n[a] = function(b, c, d) {
                        return n(C(d || {}, {
                            method: a,
                            url: b,
                            data: c
                        }))
                    }
                })
            }
            )("post", "put");
            n.defaults = d;
            return n
        }
        ]
    }
    function ed() {
        this.$get = ["$browser", "$window", "$document", function(b, a, c) {
            return fd(b, gd, b.defer, a.angular.callbacks, c[0], a.location.protocol.replace(":", ""))
        }
        ]
    }
    function fd(b, a, c, d, e, g) {
        function h(a, b) {
            var c = e.createElement("script")
              , d = function() {
                e.body.removeChild(c);
                b && b()
            };
            c.type = "text/javascript";
            c.src = a;
            Y ? c.onreadystatechange = function() {
                /loaded|complete/.test(c.readyState) && d()
            }
            : c.onload = c.onerror = d;
            e.body.appendChild(c)
        }
        return function(e, k, l, m, n, r, s) {
            function q(a, c, d, e) {
                c = "file" == (k.match(Nb) || ["", g])[1] ? d ? 200 : 404 : c;
                a(1223 == c ? 204 : c, d, e);
                b.$$completeOutstandingRequest(u)
            }
            b.$$incOutstandingRequestCount();
            k = k || b.url();
            if ("jsonp" == G(e)) {
                var t = "_" + (d.counter++).toString(36);
                d[t] = function(a) {
                    d[t].data = a
                }
                ;
                h(k.replace("JSON_CALLBACK", "angular.callbacks." + t), function() {
                    d[t].data ? q(m, 200, d[t].data) : q(m, -2);
                    delete d[t]
                })
            } else {
                var v = new a;
                v.open(e, k, !0);
                p(n, function(a, b) {
                    a && v.setRequestHeader(b, a)
                });
                var y;
                v.onreadystatechange = function() {
                    if (4 == v.readyState) {
                        var a = v.getAllResponseHeaders()
                          , b = "Cache-Control Content-Language Content-Type Expires Last-Modified Pragma".split(" ");
                        a || (a = "",
                        p(b, function(b) {
                            var c = v.getResponseHeader(b);
                            c && (a += b + ": " + c + "\n")
                        }));
                        q(m, y || v.status, v.responseText, a)
                    }
                }
                ;
                s && (v.withCredentials = !0);
                v.send(l || "");
                0 < r && c(function() {
                    y = -1;
                    v.abort()
                }, r)
            }
        }
    }
    function hd() {
        this.$get = function() {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [{
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    }, {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "\u00a4",
                        posSuf: "",
                        negPre: "(\u00a4",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    }],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January February March April May June July August September October November December".split(" "),
                    SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                    DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
                    AMPMS: ["AM", "PM"],
                    medium: "MMM d, y h:mm:ss a",
                    short: "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a"
                },
                pluralCat: function(b) {
                    return 1 === b ? "one" : "other"
                }
            }
        }
    }
    function id() {
        this.$get = ["$rootScope", "$browser", "$q", "$exceptionHandler", function(b, a, c, d) {
            function e(e, f, k) {
                var l = c.defer()
                  , m = l.promise
                  , n = x(k) && !k;
                f = a.defer(function() {
                    try {
                        l.resolve(e())
                    } catch (a) {
                        l.reject(a),
                        d(a)
                    } finally {
                        delete g[m.$$timeoutId]
                    }
                    n || b.$apply()
                }, f);
                m.$$timeoutId = f;
                g[f] = l;
                return m
            }
            var g = {};
            e.cancel = function(b) {
                return b && b.$$timeoutId in g ? (g[b.$$timeoutId].reject("canceled"),
                delete g[b.$$timeoutId],
                a.defer.cancel(b.$$timeoutId)) : !1
            }
            ;
            return e
        }
        ]
    }
    function Xb(b) {
        function a(a, e) {
            return b.factory(a + c, e)
        }
        var c = "Filter";
        this.register = a;
        this.$get = ["$injector", function(a) {
            return function(b) {
                return a.get(b + c)
            }
        }
        ];
        a("currency", Yb);
        a("date", Zb);
        a("filter", jd);
        a("json", kd);
        a("limitTo", ld);
        a("lowercase", md);
        a("number", $b);
        a("orderBy", ac);
        a("uppercase", nd)
    }
    function jd() {
        return function(b, a) {
            if (!F(b))
                return b;
            var c = [];
            c.check = function(a) {
                for (var b = 0; b < c.length; b++)
                    if (!c[b](a))
                        return !1;
                return !0
            }
            ;
            var d = function(a, b) {
                if ("!" === b.charAt(0))
                    return !d(a, b.substr(1));
                switch (typeof a) {
                case "boolean":
                case "number":
                case "string":
                    return -1 < ("" + a).toLowerCase().indexOf(b);
                case "object":
                    for (var c in a)
                        if ("$" !== c.charAt(0) && d(a[c], b))
                            return !0;
                    return !1;
                case "array":
                    for (c = 0; c < a.length; c++)
                        if (d(a[c], b))
                            return !0;
                    return !1;
                default:
                    return !1
                }
            };
            switch (typeof a) {
            case "boolean":
            case "number":
            case "string":
                a = {
                    $: a
                };
            case "object":
                for (var e in a)
                    "$" == e ? function() {
                        var b = ("" + a[e]).toLowerCase();
                        b && c.push(function(a) {
                            return d(a, b)
                        })
                    }() : function() {
                        var b = e
                          , f = ("" + a[e]).toLowerCase();
                        f && c.push(function(a) {
                            return d(gb(a, b), f)
                        })
                    }();
                break;
            case "function":
                c.push(a);
                break;
            default:
                return b
            }
            for (var g = [], h = 0; h < b.length; h++) {
                var f = b[h];
                c.check(f) && g.push(f)
            }
            return g
        }
    }
    function Yb(b) {
        var a = b.NUMBER_FORMATS;
        return function(b, d) {
            z(d) && (d = a.CURRENCY_SYM);
            return bc(b, a.PATTERNS[1], a.GROUP_SEP, a.DECIMAL_SEP, 2).replace(/\u00A4/g, d)
        }
    }
    function $b(b) {
        var a = b.NUMBER_FORMATS;
        return function(b, d) {
            return bc(b, a.PATTERNS[0], a.GROUP_SEP, a.DECIMAL_SEP, d)
        }
    }
    function bc(b, a, c, d, e) {
        if (isNaN(b) || !isFinite(b))
            return "";
        var g = 0 > b;
        b = Math.abs(b);
        var h = b + ""
          , f = ""
          , k = []
          , l = !1;
        if (-1 !== h.indexOf("e")) {
            var m = h.match(/([\d\.]+)e(-?)(\d+)/);
            m && "-" == m[2] && m[3] > e + 1 ? h = "0" : (f = h,
            l = !0)
        }
        if (l)
            0 < e && -1 < b && 1 > b && (f = b.toFixed(e));
        else {
            h = (h.split(cc)[1] || "").length;
            z(e) && (e = Math.min(Math.max(a.minFrac, h), a.maxFrac));
            h = Math.pow(10, e);
            b = Math.round(b * h) / h;
            b = ("" + b).split(cc);
            h = b[0];
            b = b[1] || "";
            var l = 0
              , m = a.lgSize
              , n = a.gSize;
            if (h.length >= m + n)
                for (var l = h.length - m, r = 0; r < l; r++)
                    0 === (l - r) % n && 0 !== r && (f += c),
                    f += h.charAt(r);
            for (r = l; r < h.length; r++)
                0 === (h.length - r) % m && 0 !== r && (f += c),
                f += h.charAt(r);
            for (; b.length < e; )
                b += "0";
            e && "0" !== e && (f += d + b.substr(0, e))
        }
        k.push(g ? a.negPre : a.posPre);
        k.push(f);
        k.push(g ? a.negSuf : a.posSuf);
        return k.join("")
    }
    function ob(b, a, c) {
        var d = "";
        0 > b && (d = "-",
        b = -b);
        for (b = "" + b; b.length < a; )
            b = "0" + b;
        c && (b = b.substr(b.length - a));
        return d + b
    }
    function R(b, a, c, d) {
        c = c || 0;
        return function(e) {
            e = e["get" + b]();
            if (0 < c || e > -c)
                e += c;
            0 === e && -12 == c && (e = 12);
            return ob(e, a, d)
        }
    }
    function Oa(b, a) {
        return function(c, d) {
            var e = c["get" + b]()
              , g = na(a ? "SHORT" + b : b);
            return d[g][e]
        }
    }
    function Zb(b) {
        function a(a) {
            var b;
            if (b = a.match(c)) {
                a = new Date(0);
                var g = 0
                  , h = 0;
                b[9] && (g = J(b[9] + b[10]),
                h = J(b[9] + b[11]));
                a.setUTCFullYear(J(b[1]), J(b[2]) - 1, J(b[3]));
                a.setUTCHours(J(b[4] || 0) - g, J(b[5] || 0) - h, J(b[6] || 0), J(b[7] || 0))
            }
            return a
        }
        var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(c, e) {
            var g = "", h = [], f, k;
            e = e || "mediumDate";
            e = b.DATETIME_FORMATS[e] || e;
            E(c) && (c = od.test(c) ? J(c) : a(c));
            Ua(c) && (c = new Date(c));
            if (!qa(c))
                return c;
            for (; e; )
                (k = pd.exec(e)) ? (h = Ya(h, k, 1),
                e = h.pop()) : (h.push(e),
                e = null);
            p(h, function(a) {
                f = qd[a];
                g += f ? f(c, b.DATETIME_FORMATS) : a.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            });
            return g
        }
    }
    function kd() {
        return function(b) {
            return ea(b, !0)
        }
    }
    function ld() {
        return function(b, a) {
            if (!(b instanceof Array))
                return b;
            a = J(a);
            var c = [], d, e;
            if (!(b && b instanceof Array))
                return c;
            a > b.length ? a = b.length : a < -b.length && (a = -b.length);
            0 < a ? (d = 0,
            e = a) : (d = b.length + a,
            e = b.length);
            for (; d < e; d++)
                c.push(b[d]);
            return c
        }
    }
    function ac(b) {
        return function(a, c, d) {
            function e(a, b) {
                return $a(b) ? function(b, c) {
                    return a(c, b)
                }
                : a
            }
            if (!F(a) || !c)
                return a;
            c = F(c) ? c : [c];
            c = Wa(c, function(a) {
                var c = !1
                  , d = a || pa;
                if (E(a)) {
                    if ("+" == a.charAt(0) || "-" == a.charAt(0))
                        c = "-" == a.charAt(0),
                        a = a.substring(1);
                    d = b(a)
                }
                return e(function(a, b) {
                    var c;
                    c = d(a);
                    var e = d(b)
                      , f = typeof c
                      , g = typeof e;
                    f == g ? ("string" == f && (c = c.toLowerCase(),
                    e = e.toLowerCase()),
                    c = c === e ? 0 : c < e ? -1 : 1) : c = f < g ? -1 : 1;
                    return c
                }, c)
            });
            for (var g = [], h = 0; h < a.length; h++)
                g.push(a[h]);
            return g.sort(e(function(a, b) {
                for (var d = 0; d < c.length; d++) {
                    var e = c[d](a, b);
                    if (0 !== e)
                        return e
                }
                return 0
            }, d))
        }
    }
    function Z(b) {
        L(b) && (b = {
            link: b
        });
        b.restrict = b.restrict || "AC";
        return M(b)
    }
    function dc(b, a) {
        function c(a, c) {
            c = c ? "-" + eb(c, "-") : "";
            b.removeClass((a ? Pa : Qa) + c).addClass((a ? Qa : Pa) + c)
        }
        var d = this
          , e = b.parent().controller("form") || Ra
          , g = 0
          , h = d.$error = {};
        d.$name = a.name || a.ngForm;
        d.$dirty = !1;
        d.$pristine = !0;
        d.$valid = !0;
        d.$invalid = !1;
        e.$addControl(d);
        b.addClass(Sa);
        c(!0);
        d.$addControl = function(a) {
            a.$name && !d.hasOwnProperty(a.$name) && (d[a.$name] = a)
        }
        ;
        d.$removeControl = function(a) {
            a.$name && d[a.$name] === a && delete d[a.$name];
            p(h, function(b, c) {
                d.$setValidity(c, !0, a)
            })
        }
        ;
        d.$setValidity = function(a, b, l) {
            var m = h[a];
            if (b)
                m && (Xa(m, l),
                m.length || (g--,
                g || (c(b),
                d.$valid = !0,
                d.$invalid = !1),
                h[a] = !1,
                c(!0, a),
                e.$setValidity(a, !0, d)));
            else {
                g || c(b);
                if (m) {
                    if (-1 != Ca(m, l))
                        return
                } else
                    h[a] = m = [],
                    g++,
                    c(!1, a),
                    e.$setValidity(a, !1, d);
                m.push(l);
                d.$valid = !1;
                d.$invalid = !0
            }
        }
        ;
        d.$setDirty = function() {
            b.removeClass(Sa).addClass(ec);
            d.$dirty = !0;
            d.$pristine = !1;
            e.$setDirty()
        }
    }
    function $(b) {
        return z(b) || "" === b || null === b || b !== b
    }
    function Ta(b, a, c, d, e, g) {
        var h = function() {
            var c = V(a.val());
            d.$viewValue !== c && b.$apply(function() {
                d.$setViewValue(c)
            })
        };
        if (e.hasEvent("input"))
            a.bind("input", h);
        else {
            var f, k = function() {
                f || (f = g.defer(function() {
                    h();
                    f = null
                }))
            };
            a.bind("keydown", function(a) {
                a = a.keyCode;
                91 === a || 15 < a && 19 > a || 37 <= a && 40 >= a || k()
            });
            a.bind("change", h);
            e.hasEvent("paste") && a.bind("paste cut", k)
        }
        d.$render = function() {
            a.val($(d.$viewValue) ? "" : d.$viewValue)
        }
        ;
        var l = c.ngPattern
          , m = function(a, b) {
            if ($(b) || a.test(b))
                return d.$setValidity("pattern", !0),
                b;
            d.$setValidity("pattern", !1);
            return t
        };
        l && (l.match(/^\/(.*)\/$/) ? (l = RegExp(l.substr(1, l.length - 2)),
        e = function(a) {
            return m(l, a)
        }
        ) : e = function(a) {
            var c = b.$eval(l);
            if (!c || !c.test)
                throw Error("Expected " + l + " to be a RegExp but was " + c);
            return m(c, a)
        }
        ,
        d.$formatters.push(e),
        d.$parsers.push(e));
        if (c.ngMinlength) {
            var n = J(c.ngMinlength);
            e = function(a) {
                if (!$(a) && a.length < n)
                    return d.$setValidity("minlength", !1),
                    t;
                d.$setValidity("minlength", !0);
                return a
            }
            ;
            d.$parsers.push(e);
            d.$formatters.push(e)
        }
        if (c.ngMaxlength) {
            var r = J(c.ngMaxlength);
            c = function(a) {
                if (!$(a) && a.length > r)
                    return d.$setValidity("maxlength", !1),
                    t;
                d.$setValidity("maxlength", !0);
                return a
            }
            ;
            d.$parsers.push(c);
            d.$formatters.push(c)
        }
    }
    function pb(b, a) {
        b = "ngClass" + b;
        return Z(function(c, d, e) {
            function g(b) {
                if (!0 === a || c.$index % 2 === a)
                    k && !ha(b, k) && h(k),
                    f(b);
                k = X(b)
            }
            function h(a) {
                P(a) && !F(a) && (a = Wa(a, function(a, b) {
                    if (a)
                        return b
                }));
                d.removeClass(F(a) ? a.join(" ") : a)
            }
            function f(a) {
                P(a) && !F(a) && (a = Wa(a, function(a, b) {
                    if (a)
                        return b
                }));
                a && d.addClass(F(a) ? a.join(" ") : a)
            }
            var k = t;
            c.$watch(e[b], g, !0);
            e.$observe("class", function(a) {
                a = c.$eval(e[b]);
                g(a, a)
            });
            "ngClass" !== b && c.$watch("$index", function(d, g) {
                var k = d & 1;
                k !== g & 1 && (k === a ? f(c.$eval(e[b])) : h(c.$eval(e[b])))
            })
        })
    }
    var G = function(b) {
        return E(b) ? b.toLowerCase() : b
    }, na = function(b) {
        return E(b) ? b.toUpperCase() : b
    }, Y = J((/msie (\d+)/.exec(G(navigator.userAgent)) || [])[1]), A, da, Da = [].slice, rd = [].push, oa = Object.prototype.toString, db = S.angular || (S.angular = {}), va, Ka, ba = ["0", "0", "0"];
    u.$inject = [];
    pa.$inject = [];
    var V = function() {
        return String.prototype.trim ? function(b) {
            return E(b) ? b.trim() : b
        }
        : function(b) {
            return E(b) ? b.replace(/^\s*/, "").replace(/\s*$/, "") : b
        }
    }();
    Ka = 9 > Y ? function(b) {
        b = b.nodeName ? b : b[0];
        return b.scopeName && "HTML" != b.scopeName ? na(b.scopeName + ":" + b.nodeName) : b.nodeName
    }
    : function(b) {
        return b.nodeName ? b.nodeName : b[0].nodeName
    }
    ;
    var rc = /[A-Z]/g
      , sd = {
        full: "1.0.9-3ccec13",
        major: 1,
        minor: 0,
        dot: 9,
        codeName: "marc-todo"
    }
      , Fa = O.cache = {}
      , Ea = O.expando = "ng-" + (new Date).getTime()
      , vc = 1
      , fc = S.document.addEventListener ? function(b, a, c) {
        b.addEventListener(a, c, !1)
    }
    : function(b, a, c) {
        b.attachEvent("on" + a, c)
    }
      , kb = S.document.removeEventListener ? function(b, a, c) {
        b.removeEventListener(a, c, !1)
    }
    : function(b, a, c) {
        b.detachEvent("on" + a, c)
    }
      , tc = /([\:\-\_]+(.))/g
      , uc = /^moz([A-Z])/
      , xa = O.prototype = {
        ready: function(b) {
            function a() {
                c || (c = !0,
                b())
            }
            var c = !1;
            this.bind("DOMContentLoaded", a);
            O(S).bind("load", a)
        },
        toString: function() {
            var b = [];
            p(this, function(a) {
                b.push("" + a)
            });
            return "[" + b.join(", ") + "]"
        },
        eq: function(b) {
            return 0 <= b ? A(this[b]) : A(this[this.length + b])
        },
        length: 0,
        push: rd,
        sort: [].sort,
        splice: [].splice
    }
      , Ia = {};
    p("multiple selected checked disabled readOnly required".split(" "), function(b) {
        Ia[G(b)] = b
    });
    var Hb = {};
    p("input select option textarea button form".split(" "), function(b) {
        Hb[na(b)] = !0
    });
    p({
        data: Cb,
        inheritedData: Ha,
        scope: function(b) {
            return Ha(b, "$scope")
        },
        controller: Fb,
        injector: function(b) {
            return Ha(b, "$injector")
        },
        removeAttr: function(b, a) {
            b.removeAttribute(a)
        },
        hasClass: Ga,
        css: function(b, a, c) {
            a = zb(a);
            if (x(c))
                b.style[a] = c;
            else {
                var d;
                8 >= Y && (d = b.currentStyle && b.currentStyle[a],
                "" === d && (d = "auto"));
                d = d || b.style[a];
                8 >= Y && (d = "" === d ? t : d);
                return d
            }
        },
        attr: function(b, a, c) {
            var d = G(a);
            if (Ia[d])
                if (x(c))
                    c ? (b[a] = !0,
                    b.setAttribute(a, d)) : (b[a] = !1,
                    b.removeAttribute(d));
                else
                    return b[a] || (b.attributes.getNamedItem(a) || u).specified ? d : t;
            else if (x(c))
                b.setAttribute(a, c);
            else if (b.getAttribute)
                return b = b.getAttribute(a, 2),
                null === b ? t : b
        },
        prop: function(b, a, c) {
            if (x(c))
                b[a] = c;
            else
                return b[a]
        },
        text: C(9 > Y ? function(b, a) {
            if (1 == b.nodeType) {
                if (z(a))
                    return b.innerText;
                b.innerText = a
            } else {
                if (z(a))
                    return b.nodeValue;
                b.nodeValue = a
            }
        }
        : function(b, a) {
            if (z(a))
                return b.textContent;
            b.textContent = a
        }
        , {
            $dv: ""
        }),
        val: function(b, a) {
            if (z(a)) {
                if ("SELECT" === Ka(b) && b.multiple) {
                    var c = [];
                    p(b.options, function(a) {
                        a.selected && c.push(a.value || a.text)
                    });
                    return 0 === c.length ? null : c
                }
                return b.value
            }
            b.value = a
        },
        html: function(b, a) {
            if (z(a))
                return b.innerHTML;
            for (var c = 0, d = b.childNodes; c < d.length; c++)
                ua(d[c]);
            b.innerHTML = a
        }
    }, function(b, a) {
        O.prototype[a] = function(a, d) {
            var e, g;
            if ((2 == b.length && b !== Ga && b !== Fb ? a : d) === t) {
                if (P(a)) {
                    for (e = 0; e < this.length; e++)
                        if (b === Cb)
                            b(this[e], a);
                        else
                            for (g in a)
                                b(this[e], g, a[g]);
                    return this
                }
                if (this.length)
                    return b(this[0], a, d)
            } else {
                for (e = 0; e < this.length; e++)
                    b(this[e], a, d);
                return this
            }
            return b.$dv
        }
    });
    p({
        removeData: Ab,
        dealoc: ua,
        bind: function a(c, d, e) {
            var g = ca(c, "events")
              , h = ca(c, "handle");
            g || ca(c, "events", g = {});
            h || ca(c, "handle", h = wc(c, g));
            p(d.split(" "), function(d) {
                var k = g[d];
                if (!k) {
                    if ("mouseenter" == d || "mouseleave" == d) {
                        var l = W.body.contains || W.body.compareDocumentPosition ? function(a, c) {
                            var d = 9 === a.nodeType ? a.documentElement : a
                              , e = c && c.parentNode;
                            return a === e || !!(e && 1 === e.nodeType && (d.contains ? d.contains(e) : a.compareDocumentPosition && a.compareDocumentPosition(e) & 16))
                        }
                        : function(a, c) {
                            if (c)
                                for (; c = c.parentNode; )
                                    if (c === a)
                                        return !0;
                            return !1
                        }
                        ;
                        g[d] = [];
                        a(c, {
                            mouseleave: "mouseout",
                            mouseenter: "mouseover"
                        }[d], function(a) {
                            var c = a.relatedTarget;
                            c && (c === this || l(this, c)) || h(a, d)
                        })
                    } else
                        fc(c, d, h),
                        g[d] = [];
                    k = g[d]
                }
                k.push(e)
            })
        },
        unbind: Bb,
        replaceWith: function(a, c) {
            var d, e = a.parentNode;
            ua(a);
            p(new O(c), function(c) {
                d ? e.insertBefore(c, d.nextSibling) : e.replaceChild(c, a);
                d = c
            })
        },
        children: function(a) {
            var c = [];
            p(a.childNodes, function(a) {
                1 === a.nodeType && c.push(a)
            });
            return c
        },
        contents: function(a) {
            return a.childNodes || []
        },
        append: function(a, c) {
            p(new O(c), function(c) {
                1 === a.nodeType && a.appendChild(c)
            })
        },
        prepend: function(a, c) {
            if (1 === a.nodeType) {
                var d = a.firstChild;
                p(new O(c), function(c) {
                    a.insertBefore(c, d)
                })
            }
        },
        wrap: function(a, c) {
            c = A(c)[0];
            var d = a.parentNode;
            d && d.replaceChild(c, a);
            c.appendChild(a)
        },
        remove: function(a) {
            ua(a);
            var c = a.parentNode;
            c && c.removeChild(a)
        },
        after: function(a, c) {
            var d = a
              , e = a.parentNode;
            p(new O(c), function(a) {
                e.insertBefore(a, d.nextSibling);
                d = a
            })
        },
        addClass: Eb,
        removeClass: Db,
        toggleClass: function(a, c, d) {
            z(d) && (d = !Ga(a, c));
            (d ? Eb : Db)(a, c)
        },
        parent: function(a) {
            return (a = a.parentNode) && 11 !== a.nodeType ? a : null
        },
        next: function(a) {
            if (a.nextElementSibling)
                return a.nextElementSibling;
            for (a = a.nextSibling; null != a && 1 !== a.nodeType; )
                a = a.nextSibling;
            return a
        },
        find: function(a, c) {
            return a.getElementsByTagName(c)
        },
        clone: jb,
        triggerHandler: function(a, c) {
            var d = (ca(a, "events") || {})[c];
            p(d, function(c) {
                c.call(a, null)
            })
        }
    }, function(a, c) {
        O.prototype[c] = function(c, e) {
            for (var g, h = 0; h < this.length; h++)
                g == t ? (g = a(this[h], c, e),
                g !== t && (g = A(g))) : ib(g, a(this[h], c, e));
            return g == t ? this : g
        }
    });
    Ja.prototype = {
        put: function(a, c) {
            this[ia(a)] = c
        },
        get: function(a) {
            return this[ia(a)]
        },
        remove: function(a) {
            var c = this[a = ia(a)];
            delete this[a];
            return c
        }
    };
    lb.prototype = {
        push: function(a, c) {
            var d = this[a = ia(a)];
            d ? d.push(c) : this[a] = [c]
        },
        shift: function(a) {
            var c = this[a = ia(a)];
            if (c)
                return 1 == c.length ? (delete this[a],
                c[0]) : c.shift()
        },
        peek: function(a) {
            if (a = this[ia(a)])
                return a[0]
        }
    };
    var yc = /^function\s*[^\(]*\(\s*([^\)]*)\)/m
      , zc = /,/
      , Ac = /^\s*(_?)(\S+?)\1\s*$/
      , xc = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
      , Kb = "Non-assignable model expression: ";
    Jb.$inject = ["$provide"];
    var Jc = /^(x[\:\-_]|data[\:\-_])/i
      , Nb = /^([^:]+):\/\/(\w+:{0,1}\w*@)?(\{?[\w\.-]*\}?)(:([0-9]+))?(\/[^\?#]*)?(\?([^#]*))?(#(.*))?$/
      , gc = /^([^\?#]*)?(\?([^#]*))?(#(.*))?$/
      , Qc = gc
      , Ob = {
        http: 80,
        https: 443,
        ftp: 21
    };
    mb.prototype = {
        $$replace: !1,
        absUrl: Ma("$$absUrl"),
        url: function(a, c) {
            if (z(a))
                return this.$$url;
            var d = gc.exec(a);
            d[1] && this.path(decodeURIComponent(d[1]));
            (d[2] || d[1]) && this.search(d[3] || "");
            this.hash(d[5] || "", c);
            return this
        },
        protocol: Ma("$$protocol"),
        host: Ma("$$host"),
        port: Ma("$$port"),
        path: Qb("$$path", function(a) {
            return "/" == a.charAt(0) ? a : "/" + a
        }),
        search: function(a, c) {
            if (z(a))
                return this.$$search;
            x(c) ? null === c ? delete this.$$search[a] : this.$$search[a] = c : this.$$search = E(a) ? ab(a) : a;
            this.$$compose();
            return this
        },
        hash: Qb("$$hash", pa),
        replace: function() {
            this.$$replace = !0;
            return this
        }
    };
    La.prototype = Aa(mb.prototype);
    Pb.prototype = Aa(La.prototype);
    var Na = {
        "null": function() {
            return null
        },
        "true": function() {
            return !0
        },
        "false": function() {
            return !1
        },
        undefined: u,
        "+": function(a, c, d, e) {
            d = d(a, c);
            e = e(a, c);
            return x(d) ? x(e) ? d + e : d : x(e) ? e : t
        },
        "-": function(a, c, d, e) {
            d = d(a, c);
            e = e(a, c);
            return (x(d) ? d : 0) - (x(e) ? e : 0)
        },
        "*": function(a, c, d, e) {
            return d(a, c) * e(a, c)
        },
        "/": function(a, c, d, e) {
            return d(a, c) / e(a, c)
        },
        "%": function(a, c, d, e) {
            return d(a, c) % e(a, c)
        },
        "^": function(a, c, d, e) {
            return d(a, c) ^ e(a, c)
        },
        "=": u,
        "==": function(a, c, d, e) {
            return d(a, c) == e(a, c)
        },
        "!=": function(a, c, d, e) {
            return d(a, c) != e(a, c)
        },
        "<": function(a, c, d, e) {
            return d(a, c) < e(a, c)
        },
        ">": function(a, c, d, e) {
            return d(a, c) > e(a, c)
        },
        "<=": function(a, c, d, e) {
            return d(a, c) <= e(a, c)
        },
        ">=": function(a, c, d, e) {
            return d(a, c) >= e(a, c)
        },
        "&&": function(a, c, d, e) {
            return d(a, c) && e(a, c)
        },
        "||": function(a, c, d, e) {
            return d(a, c) || e(a, c)
        },
        "&": function(a, c, d, e) {
            return d(a, c) & e(a, c)
        },
        "|": function(a, c, d, e) {
            return e(a, c)(a, c, d(a, c))
        },
        "!": function(a, c, d) {
            return !d(a, c)
        }
    }
      , Uc = {
        n: "\n",
        f: "\f",
        r: "\r",
        t: "\t",
        v: "\v",
        "'": "'",
        '"': '"'
    }
      , nb = {}
      , gd = S.XMLHttpRequest || function() {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0")
        } catch (a) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.3.0")
        } catch (c) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP")
        } catch (d) {}
        throw Error("This browser does not support XMLHttpRequest.");
    }
    ;
    Xb.$inject = ["$provide"];
    Yb.$inject = ["$locale"];
    $b.$inject = ["$locale"];
    var cc = "."
      , qd = {
        yyyy: R("FullYear", 4),
        yy: R("FullYear", 2, 0, !0),
        y: R("FullYear", 1),
        MMMM: Oa("Month"),
        MMM: Oa("Month", !0),
        MM: R("Month", 2, 1),
        M: R("Month", 1, 1),
        dd: R("Date", 2),
        d: R("Date", 1),
        HH: R("Hours", 2),
        H: R("Hours", 1),
        hh: R("Hours", 2, -12),
        h: R("Hours", 1, -12),
        mm: R("Minutes", 2),
        m: R("Minutes", 1),
        ss: R("Seconds", 2),
        s: R("Seconds", 1),
        EEEE: Oa("Day"),
        EEE: Oa("Day", !0),
        a: function(a, c) {
            return 12 > a.getHours() ? c.AMPMS[0] : c.AMPMS[1]
        },
        Z: function(a) {
            a = -1 * a.getTimezoneOffset();
            return a = (0 <= a ? "+" : "") + (ob(Math[0 < a ? "floor" : "ceil"](a / 60), 2) + ob(Math.abs(a % 60), 2))
        }
    }
      , pd = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/
      , od = /^\d+$/;
    Zb.$inject = ["$locale"];
    var md = M(G)
      , nd = M(na);
    ac.$inject = ["$parse"];
    var td = M({
        restrict: "E",
        compile: function(a, c) {
            8 >= Y && (c.href || c.name || c.$set("href", ""),
            a.append(W.createComment("IE fix")));
            return function(a, c) {
                c.bind("click", function(a) {
                    c.attr("href") || a.preventDefault()
                })
            }
        }
    })
      , qb = {};
    p(Ia, function(a, c) {
        var d = fa("ng-" + c);
        qb[d] = function() {
            return {
                priority: 100,
                compile: function() {
                    return function(a, g, h) {
                        a.$watch(h[d], function(a) {
                            h.$set(c, !!a)
                        })
                    }
                }
            }
        }
    });
    p(["src", "href"], function(a) {
        var c = fa("ng-" + a);
        qb[c] = function() {
            return {
                priority: 99,
                link: function(d, e, g) {
                    g.$observe(c, function(c) {
                        c && (g.$set(a, c),
                        Y && e.prop(a, g[a]))
                    })
                }
            }
        }
    });
    var Ra = {
        $addControl: u,
        $removeControl: u,
        $setValidity: u,
        $setDirty: u
    };
    dc.$inject = ["$element", "$attrs", "$scope"];
    var hc = function(a) {
        return ["$timeout", function(c) {
            var d = {
                name: "form",
                restrict: "E",
                controller: dc,
                compile: function() {
                    return {
                        pre: function(a, d, h, f) {
                            if (!h.action) {
                                var k = function(a) {
                                    a.preventDefault ? a.preventDefault() : a.returnValue = !1
                                };
                                fc(d[0], "submit", k);
                                d.bind("$destroy", function() {
                                    c(function() {
                                        kb(d[0], "submit", k)
                                    }, 0, !1)
                                })
                            }
                            var l = d.parent().controller("form")
                              , m = h.name || h.ngForm;
                            m && (a[m] = f);
                            l && d.bind("$destroy", function() {
                                l.$removeControl(f);
                                m && (a[m] = t);
                                C(f, Ra)
                            })
                        }
                    }
                }
            };
            return a ? C(X(d), {
                restrict: "EAC"
            }) : d
        }
        ]
    }
      , ud = hc()
      , vd = hc(!0)
      , wd = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
      , xd = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/
      , yd = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/
      , ic = {
        text: Ta,
        number: function(a, c, d, e, g, h) {
            Ta(a, c, d, e, g, h);
            e.$parsers.push(function(a) {
                var c = $(a);
                if (c || yd.test(a))
                    return e.$setValidity("number", !0),
                    "" === a ? null : c ? a : parseFloat(a);
                e.$setValidity("number", !1);
                return t
            });
            e.$formatters.push(function(a) {
                return $(a) ? "" : "" + a
            });
            if (d.min) {
                var f = parseFloat(d.min);
                a = function(a) {
                    if (!$(a) && a < f)
                        return e.$setValidity("min", !1),
                        t;
                    e.$setValidity("min", !0);
                    return a
                }
                ;
                e.$parsers.push(a);
                e.$formatters.push(a)
            }
            if (d.max) {
                var k = parseFloat(d.max);
                d = function(a) {
                    if (!$(a) && a > k)
                        return e.$setValidity("max", !1),
                        t;
                    e.$setValidity("max", !0);
                    return a
                }
                ;
                e.$parsers.push(d);
                e.$formatters.push(d)
            }
            e.$formatters.push(function(a) {
                if ($(a) || Ua(a))
                    return e.$setValidity("number", !0),
                    a;
                e.$setValidity("number", !1);
                return t
            })
        },
        url: function(a, c, d, e, g, h) {
            Ta(a, c, d, e, g, h);
            a = function(a) {
                if ($(a) || wd.test(a))
                    return e.$setValidity("url", !0),
                    a;
                e.$setValidity("url", !1);
                return t
            }
            ;
            e.$formatters.push(a);
            e.$parsers.push(a)
        },
        email: function(a, c, d, e, g, h) {
            Ta(a, c, d, e, g, h);
            a = function(a) {
                if ($(a) || xd.test(a))
                    return e.$setValidity("email", !0),
                    a;
                e.$setValidity("email", !1);
                return t
            }
            ;
            e.$formatters.push(a);
            e.$parsers.push(a)
        },
        radio: function(a, c, d, e) {
            z(d.name) && c.attr("name", za());
            c.bind("click", function() {
                c[0].checked && a.$apply(function() {
                    e.$setViewValue(d.value)
                })
            });
            e.$render = function() {
                c[0].checked = d.value == e.$viewValue
            }
            ;
            d.$observe("value", e.$render)
        },
        checkbox: function(a, c, d, e) {
            var g = d.ngTrueValue
              , h = d.ngFalseValue;
            E(g) || (g = !0);
            E(h) || (h = !1);
            c.bind("click", function() {
                a.$apply(function() {
                    e.$setViewValue(c[0].checked)
                })
            });
            e.$render = function() {
                c[0].checked = e.$viewValue
            }
            ;
            e.$formatters.push(function(a) {
                return a === g
            });
            e.$parsers.push(function(a) {
                return a ? g : h
            })
        },
        hidden: u,
        button: u,
        submit: u,
        reset: u
    }
      , jc = ["$browser", "$sniffer", function(a, c) {
        return {
            restrict: "E",
            require: "?ngModel",
            link: function(d, e, g, h) {
                h && (ic[G(g.type)] || ic.text)(d, e, g, h, c, a)
            }
        }
    }
    ]
      , Qa = "ng-valid"
      , Pa = "ng-invalid"
      , Sa = "ng-pristine"
      , ec = "ng-dirty"
      , zd = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", function(a, c, d, e, g) {
        function h(a, c) {
            c = c ? "-" + eb(c, "-") : "";
            e.removeClass((a ? Pa : Qa) + c).addClass((a ? Qa : Pa) + c)
        }
        this.$modelValue = this.$viewValue = Number.NaN;
        this.$parsers = [];
        this.$formatters = [];
        this.$viewChangeListeners = [];
        this.$pristine = !0;
        this.$dirty = !1;
        this.$valid = !0;
        this.$invalid = !1;
        this.$name = d.name;
        var f = g(d.ngModel)
          , k = f.assign;
        if (!k)
            throw Error(Kb + d.ngModel + " (" + sa(e) + ")");
        this.$render = u;
        var l = e.inheritedData("$formController") || Ra
          , m = 0
          , n = this.$error = {};
        e.addClass(Sa);
        h(!0);
        this.$setValidity = function(a, c) {
            n[a] !== !c && (c ? (n[a] && m--,
            m || (h(!0),
            this.$valid = !0,
            this.$invalid = !1)) : (h(!1),
            this.$invalid = !0,
            this.$valid = !1,
            m++),
            n[a] = !c,
            h(c, a),
            l.$setValidity(a, c, this))
        }
        ;
        this.$setViewValue = function(d) {
            this.$viewValue = d;
            this.$pristine && (this.$dirty = !0,
            this.$pristine = !1,
            e.removeClass(Sa).addClass(ec),
            l.$setDirty());
            p(this.$parsers, function(a) {
                d = a(d)
            });
            this.$modelValue !== d && (this.$modelValue = d,
            k(a, d),
            p(this.$viewChangeListeners, function(a) {
                try {
                    a()
                } catch (d) {
                    c(d)
                }
            }))
        }
        ;
        var r = this;
        a.$watch(function() {
            var c = f(a);
            if (r.$modelValue !== c) {
                var d = r.$formatters
                  , e = d.length;
                for (r.$modelValue = c; e--; )
                    c = d[e](c);
                r.$viewValue !== c && (r.$viewValue = c,
                r.$render())
            }
        })
    }
    ]
      , Ad = function() {
        return {
            require: ["ngModel", "^?form"],
            controller: zd,
            link: function(a, c, d, e) {
                var g = e[0]
                  , h = e[1] || Ra;
                h.$addControl(g);
                c.bind("$destroy", function() {
                    h.$removeControl(g)
                })
            }
        }
    }
      , Bd = M({
        require: "ngModel",
        link: function(a, c, d, e) {
            e.$viewChangeListeners.push(function() {
                a.$eval(d.ngChange)
            })
        }
    })
      , kc = function() {
        return {
            require: "?ngModel",
            link: function(a, c, d, e) {
                if (e) {
                    d.required = !0;
                    var g = function(a) {
                        if (d.required && ($(a) || !1 === a))
                            e.$setValidity("required", !1);
                        else
                            return e.$setValidity("required", !0),
                            a
                    };
                    e.$formatters.push(g);
                    e.$parsers.unshift(g);
                    d.$observe("required", function() {
                        g(e.$viewValue)
                    })
                }
            }
        }
    }
      , Cd = function() {
        return {
            require: "ngModel",
            link: function(a, c, d, e) {
                var g = (a = /\/(.*)\//.exec(d.ngList)) && RegExp(a[1]) || d.ngList || ",";
                e.$parsers.push(function(a) {
                    var c = [];
                    a && p(a.split(g), function(a) {
                        a && c.push(V(a))
                    });
                    return c
                });
                e.$formatters.push(function(a) {
                    return F(a) ? a.join(", ") : t
                })
            }
        }
    }
      , Dd = /^(true|false|\d+)$/
      , Ed = function() {
        return {
            priority: 100,
            compile: function(a, c) {
                return Dd.test(c.ngValue) ? function(a, c, g) {
                    g.$set("value", a.$eval(g.ngValue))
                }
                : function(a, c, g) {
                    a.$watch(g.ngValue, function(a) {
                        g.$set("value", a)
                    })
                }
            }
        }
    }
      , Fd = Z(function(a, c, d) {
        c.addClass("ng-binding").data("$binding", d.ngBind);
        a.$watch(d.ngBind, function(a) {
            c.text(a == t ? "" : a)
        })
    })
      , Gd = ["$interpolate", function(a) {
        return function(c, d, e) {
            c = a(d.attr(e.$attr.ngBindTemplate));
            d.addClass("ng-binding").data("$binding", c);
            e.$observe("ngBindTemplate", function(a) {
                d.text(a)
            })
        }
    }
    ]
      , Hd = [function() {
        return function(a, c, d) {
            c.addClass("ng-binding").data("$binding", d.ngBindHtmlUnsafe);
            a.$watch(d.ngBindHtmlUnsafe, function(a) {
                c.html(a || "")
            })
        }
    }
    ]
      , Id = pb("", !0)
      , Jd = pb("Odd", 0)
      , Kd = pb("Even", 1)
      , Ld = Z({
        compile: function(a, c) {
            c.$set("ngCloak", t);
            a.removeClass("ng-cloak")
        }
    })
      , Md = [function() {
        return {
            scope: !0,
            controller: "@"
        }
    }
    ]
      , Nd = ["$sniffer", function(a) {
        return {
            priority: 1E3,
            compile: function() {
                a.csp = !0
            }
        }
    }
    ]
      , lc = {};
    p("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave submit".split(" "), function(a) {
        var c = fa("ng-" + a);
        lc[c] = ["$parse", function(d) {
            return function(e, g, h) {
                var f = d(h[c]);
                g.bind(G(a), function(a) {
                    e.$apply(function() {
                        f(e, {
                            $event: a
                        })
                    })
                })
            }
        }
        ]
    });
    var Od = ["$http", "$templateCache", "$anchorScroll", "$compile", function(a, c, d, e) {
        return {
            restrict: "ECA",
            terminal: !0,
            compile: function(g, h) {
                var f = h.ngInclude || h.src
                  , k = h.onload || ""
                  , l = h.autoscroll;
                return function(g, h) {
                    var r = 0, s, q = function() {
                        s && (s.$destroy(),
                        s = null);
                        h.html("")
                    };
                    g.$watch(f, function(f) {
                        var p = ++r;
                        f ? a.get(f, {
                            cache: c
                        }).success(function(a) {
                            p === r && (s && s.$destroy(),
                            s = g.$new(),
                            h.html(a),
                            e(h.contents())(s),
                            !x(l) || l && !g.$eval(l) || d(),
                            s.$emit("$includeContentLoaded"),
                            g.$eval(k))
                        }).error(function() {
                            p === r && q()
                        }) : q()
                    })
                }
            }
        }
    }
    ]
      , Pd = Z({
        compile: function() {
            return {
                pre: function(a, c, d) {
                    a.$eval(d.ngInit)
                }
            }
        }
    })
      , Qd = Z({
        terminal: !0,
        priority: 1E3
    })
      , Rd = ["$locale", "$interpolate", function(a, c) {
        var d = /{}/g;
        return {
            restrict: "EA",
            link: function(e, g, h) {
                var f = h.count
                  , k = g.attr(h.$attr.when)
                  , l = h.offset || 0
                  , m = e.$eval(k)
                  , n = {}
                  , r = c.startSymbol()
                  , s = c.endSymbol();
                p(m, function(a, e) {
                    n[e] = c(a.replace(d, r + f + "-" + l + s))
                });
                e.$watch(function() {
                    var c = parseFloat(e.$eval(f));
                    if (isNaN(c))
                        return "";
                    c in m || (c = a.pluralCat(c - l));
                    return n[c](e, g, !0)
                }, function(a) {
                    g.text(a)
                })
            }
        }
    }
    ]
      , Sd = Z({
        transclude: "element",
        priority: 1E3,
        terminal: !0,
        compile: function(a, c, d) {
            return function(a, c, h) {
                var f = h.ngRepeat;
                h = f.match(/^\s*(.+)\s+in\s+(.*)\s*$/);
                var k, l, m;
                if (!h)
                    throw Error("Expected ngRepeat in form of '_item_ in _collection_' but got '" + f + "'.");
                f = h[1];
                k = h[2];
                h = f.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
                if (!h)
                    throw Error("'item' in 'item in collection' should be identifier or (key, value) but got '" + f + "'.");
                l = h[3] || h[1];
                m = h[2];
                var n = new lb;
                a.$watch(function(a) {
                    var e, f, h = a.$eval(k), p = c, t = new lb, A, D, u, x, z, C;
                    if (F(h))
                        z = h || [];
                    else {
                        z = [];
                        for (u in h)
                            h.hasOwnProperty(u) && "$" != u.charAt(0) && z.push(u);
                        z.sort()
                    }
                    A = z.length - 1;
                    e = 0;
                    for (f = z.length; e < f; e++)
                        u = h === z ? e : z[e],
                        x = h[u],
                        (C = n.shift(x)) ? (D = C.scope,
                        t.push(x, C),
                        e !== C.index && (C.index = e,
                        p.after(C.element)),
                        p = C.element) : D = a.$new(),
                        D[l] = x,
                        m && (D[m] = u),
                        D.$index = e,
                        D.$first = 0 === e,
                        D.$last = e === A,
                        D.$middle = !(D.$first || D.$last),
                        C || d(D, function(a) {
                            p.after(a);
                            C = {
                                scope: D,
                                element: p = a,
                                index: e
                            };
                            t.push(x, C)
                        });
                    for (u in n)
                        if (n.hasOwnProperty(u))
                            for (z = n[u]; z.length; )
                                x = z.pop(),
                                x.element.remove(),
                                x.scope.$destroy();
                    n = t
                })
            }
        }
    })
      , Td = Z(function(a, c, d) {
        a.$watch(d.ngShow, function(a) {
            c.css("display", $a(a) ? "" : "none")
        })
    })
      , Ud = Z(function(a, c, d) {
        a.$watch(d.ngHide, function(a) {
            c.css("display", $a(a) ? "none" : "")
        })
    })
      , Vd = Z(function(a, c, d) {
        a.$watch(d.ngStyle, function(a, d) {
            d && a !== d && p(d, function(a, d) {
                c.css(d, "")
            });
            a && c.css(a)
        }, !0)
    })
      , Wd = M({
        restrict: "EA",
        require: "ngSwitch",
        controller: ["$scope", function() {
            this.cases = {}
        }
        ],
        link: function(a, c, d, e) {
            var g, h, f;
            a.$watch(d.ngSwitch || d.on, function(k) {
                h && (f.$destroy(),
                h.remove(),
                h = f = null);
                if (g = e.cases["!" + k] || e.cases["?"])
                    a.$eval(d.change),
                    f = a.$new(),
                    g(f, function(a) {
                        h = a;
                        c.append(a)
                    })
            })
        }
    })
      , Xd = Z({
        transclude: "element",
        priority: 500,
        require: "^ngSwitch",
        compile: function(a, c, d) {
            return function(a, g, h, f) {
                f.cases["!" + c.ngSwitchWhen] = d
            }
        }
    })
      , Yd = Z({
        transclude: "element",
        priority: 500,
        require: "^ngSwitch",
        compile: function(a, c, d) {
            return function(a, c, h, f) {
                f.cases["?"] = d
            }
        }
    })
      , Zd = Z({
        controller: ["$transclude", "$element", function(a, c) {
            a(function(a) {
                c.append(a)
            })
        }
        ]
    })
      , $d = ["$http", "$templateCache", "$route", "$anchorScroll", "$compile", "$controller", function(a, c, d, e, g, h) {
        return {
            restrict: "ECA",
            terminal: !0,
            link: function(a, c, l) {
                function m() {
                    var l = d.current && d.current.locals
                      , m = l && l.$template;
                    if (m) {
                        c.html(m);
                        n && (n.$destroy(),
                        n = null);
                        var m = g(c.contents())
                          , p = d.current;
                        n = p.scope = a.$new();
                        p.controller && (l.$scope = n,
                        l = h(p.controller, l),
                        c.children().data("$ngControllerController", l));
                        m(n);
                        n.$emit("$viewContentLoaded");
                        n.$eval(r);
                        e()
                    } else
                        c.html(""),
                        n && (n.$destroy(),
                        n = null)
                }
                var n, r = l.onload || "";
                a.$on("$routeChangeSuccess", m);
                m()
            }
        }
    }
    ]
      , ae = ["$templateCache", function(a) {
        return {
            restrict: "E",
            terminal: !0,
            compile: function(c, d) {
                "text/ng-template" == d.type && a.put(d.id, c[0].text)
            }
        }
    }
    ]
      , be = M({
        terminal: !0
    })
      , ce = ["$compile", "$parse", function(a, c) {
        var d = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/
          , e = {
            $setViewValue: u
        };
        return {
            restrict: "E",
            require: ["select", "?ngModel"],
            controller: ["$element", "$scope", "$attrs", function(a, c, d) {
                var k = this, l = {}, m = e, n;
                k.databound = d.ngModel;
                k.init = function(a, c, d) {
                    m = a;
                    n = d
                }
                ;
                k.addOption = function(c) {
                    l[c] = !0;
                    m.$viewValue == c && (a.val(c),
                    n.parent() && n.remove())
                }
                ;
                k.removeOption = function(a) {
                    this.hasOption(a) && (delete l[a],
                    m.$viewValue == a && this.renderUnknownOption(a))
                }
                ;
                k.renderUnknownOption = function(c) {
                    c = "? " + ia(c) + " ?";
                    n.val(c);
                    a.prepend(n);
                    a.val(c);
                    n.prop("selected", !0)
                }
                ;
                k.hasOption = function(a) {
                    return l.hasOwnProperty(a)
                }
                ;
                c.$on("$destroy", function() {
                    k.renderUnknownOption = u
                })
            }
            ],
            link: function(e, h, f, k) {
                function l(a, c, d, e) {
                    d.$render = function() {
                        var a = d.$viewValue;
                        e.hasOption(a) ? (G.parent() && G.remove(),
                        c.val(a),
                        "" === a && y.prop("selected", !0)) : z(a) && y ? c.val("") : e.renderUnknownOption(a)
                    }
                    ;
                    c.bind("change", function() {
                        a.$apply(function() {
                            G.parent() && G.remove();
                            d.$setViewValue(c.val())
                        })
                    })
                }
                function m(a, c, d) {
                    var e;
                    d.$render = function() {
                        var a = new Ja(d.$viewValue);
                        p(c.find("option"), function(c) {
                            c.selected = x(a.get(c.value))
                        })
                    }
                    ;
                    a.$watch(function() {
                        ha(e, d.$viewValue) || (e = X(d.$viewValue),
                        d.$render())
                    });
                    c.bind("change", function() {
                        a.$apply(function() {
                            var a = [];
                            p(c.find("option"), function(c) {
                                c.selected && a.push(c.value)
                            });
                            d.$setViewValue(a)
                        })
                    })
                }
                function n(e, f, g) {
                    function h() {
                        var a = {
                            "": []
                        }, c = [""], d, k, u, x, y;
                        u = g.$modelValue;
                        x = s(e) || [];
                        var A = n ? rb(x) : x, G, B, E;
                        B = {};
                        y = !1;
                        var F, H;
                        q && (y = new Ja(u));
                        for (E = 0; G = A.length,
                        E < G; E++) {
                            k = E;
                            if (n) {
                                k = A[E];
                                if ("$" === k.charAt(0))
                                    continue;
                                B[n] = k
                            }
                            B[m] = x[k];
                            d = p(e, B) || "";
                            (k = a[d]) || (k = a[d] = [],
                            c.push(d));
                            q ? d = y.remove(r(e, B)) != t : (d = u === r(e, B),
                            y = y || d);
                            F = l(e, B);
                            F = F === t ? "" : F;
                            k.push({
                                id: n ? A[E] : E,
                                label: F,
                                selected: d
                            })
                        }
                        q || (v || null === u ? a[""].unshift({
                            id: "",
                            label: "",
                            selected: !y
                        }) : y || a[""].unshift({
                            id: "?",
                            label: "",
                            selected: !0
                        }));
                        B = 0;
                        for (A = c.length; B < A; B++) {
                            d = c[B];
                            k = a[d];
                            z.length <= B ? (u = {
                                element: D.clone().attr("label", d),
                                label: k.label
                            },
                            x = [u],
                            z.push(x),
                            f.append(u.element)) : (x = z[B],
                            u = x[0],
                            u.label != d && u.element.attr("label", u.label = d));
                            F = null;
                            E = 0;
                            for (G = k.length; E < G; E++)
                                d = k[E],
                                (y = x[E + 1]) ? (F = y.element,
                                y.label !== d.label && F.text(y.label = d.label),
                                y.id !== d.id && F.val(y.id = d.id),
                                F[0].selected !== d.selected && F.prop("selected", y.selected = d.selected)) : ("" === d.id && v ? H = v : (H = C.clone()).val(d.id).attr("selected", d.selected).text(d.label),
                                x.push({
                                    element: H,
                                    label: d.label,
                                    id: d.id,
                                    selected: d.selected
                                }),
                                F ? F.after(H) : u.element.append(H),
                                F = H);
                            for (E++; x.length > E; )
                                x.pop().element.remove()
                        }
                        for (; z.length > B; )
                            z.pop()[0].element.remove()
                    }
                    var k;
                    if (!(k = u.match(d)))
                        throw Error("Expected ngOptions in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '" + u + "'.");
                    var l = c(k[2] || k[1])
                      , m = k[4] || k[6]
                      , n = k[5]
                      , p = c(k[3] || "")
                      , r = c(k[2] ? k[1] : m)
                      , s = c(k[7])
                      , z = [[{
                        element: f,
                        label: ""
                    }]];
                    v && (a(v)(e),
                    v.removeClass("ng-scope"),
                    v.remove());
                    f.html("");
                    f.bind("change", function() {
                        e.$apply(function() {
                            var a, c = s(e) || [], d = {}, h, k, l, p, u, v;
                            if (q)
                                for (k = [],
                                p = 0,
                                v = z.length; p < v; p++)
                                    for (a = z[p],
                                    l = 1,
                                    u = a.length; l < u; l++)
                                        (h = a[l].element)[0].selected && (h = h.val(),
                                        n && (d[n] = h),
                                        d[m] = c[h],
                                        k.push(r(e, d)));
                            else
                                h = f.val(),
                                "?" == h ? k = t : "" == h ? k = null : (d[m] = c[h],
                                n && (d[n] = h),
                                k = r(e, d));
                            g.$setViewValue(k)
                        })
                    });
                    g.$render = h;
                    e.$watch(h)
                }
                if (k[1]) {
                    var r = k[0], s = k[1], q = f.multiple, u = f.ngOptions, v = !1, y, C = A(W.createElement("option")), D = A(W.createElement("optgroup")), G = C.clone();
                    k = 0;
                    for (var E = h.children(), H = E.length; k < H; k++)
                        if ("" == E[k].value) {
                            y = v = E.eq(k);
                            break
                        }
                    r.init(s, v, G);
                    if (q && (f.required || f.ngRequired)) {
                        var F = function(a) {
                            s.$setValidity("required", !f.required || a && a.length);
                            return a
                        };
                        s.$parsers.push(F);
                        s.$formatters.unshift(F);
                        f.$observe("required", function() {
                            F(s.$viewValue)
                        })
                    }
                    u ? n(e, h, s) : q ? m(e, h, s) : l(e, h, s, r)
                }
            }
        }
    }
    ]
      , de = ["$interpolate", function(a) {
        var c = {
            addOption: u,
            removeOption: u
        };
        return {
            restrict: "E",
            priority: 100,
            compile: function(d, e) {
                if (z(e.value)) {
                    var g = a(d.text(), !0);
                    g || e.$set("value", d.text())
                }
                return function(a, d, e) {
                    var l = d.parent()
                      , m = l.data("$selectController") || l.parent().data("$selectController");
                    m && m.databound ? d.prop("selected", !1) : m = c;
                    g ? a.$watch(g, function(a, c) {
                        e.$set("value", a);
                        a !== c && m.removeOption(c);
                        m.addOption(a)
                    }) : m.addOption(e.value);
                    d.bind("$destroy", function() {
                        m.removeOption(e.value)
                    })
                }
            }
        }
    }
    ]
      , ee = M({
        restrict: "E",
        terminal: !0
    });
    (da = S.jQuery) ? (A = da,
    C(da.fn, {
        scope: xa.scope,
        controller: xa.controller,
        injector: xa.injector,
        inheritedData: xa.inheritedData
    }),
    hb("remove", !0, !0, !1),
    hb("empty", !1, !1, !1),
    hb("html", !1, !1, !0)) : A = O;
    db.element = A;
    (function(a) {
        C(a, {
            bootstrap: xb,
            copy: X,
            extend: C,
            equals: ha,
            element: A,
            forEach: p,
            injector: yb,
            noop: u,
            bind: Za,
            toJson: ea,
            fromJson: ub,
            identity: pa,
            isUndefined: z,
            isDefined: x,
            isString: E,
            isFunction: L,
            isObject: P,
            isNumber: Ua,
            isElement: nc,
            isArray: F,
            version: sd,
            isDate: qa,
            lowercase: G,
            uppercase: na,
            callbacks: {
                counter: 0
            }
        });
        va = sc(S);
        try {
            va("ngLocale")
        } catch (c) {
            va("ngLocale", []).provider("$locale", hd)
        }
        va("ng", ["ngLocale"], ["$provide", function(a) {
            a.provider("$compile", Jb).directive({
                a: td,
                input: jc,
                textarea: jc,
                form: ud,
                script: ae,
                select: ce,
                style: ee,
                option: de,
                ngBind: Fd,
                ngBindHtmlUnsafe: Hd,
                ngBindTemplate: Gd,
                ngClass: Id,
                ngClassEven: Kd,
                ngClassOdd: Jd,
                ngCsp: Nd,
                ngCloak: Ld,
                ngController: Md,
                ngForm: vd,
                ngHide: Ud,
                ngInclude: Od,
                ngInit: Pd,
                ngNonBindable: Qd,
                ngPluralize: Rd,
                ngRepeat: Sd,
                ngShow: Td,
                ngStyle: Vd,
                ngSwitch: Wd,
                ngSwitchWhen: Xd,
                ngSwitchDefault: Yd,
                ngOptions: be,
                ngView: $d,
                ngTransclude: Zd,
                ngModel: Ad,
                ngList: Cd,
                ngChange: Bd,
                required: kc,
                ngRequired: kc,
                ngValue: Ed
            }).directive(qb).directive(lc);
            a.provider({
                $anchorScroll: Bc,
                $browser: Ec,
                $cacheFactory: Fc,
                $controller: Kc,
                $document: Lc,
                $exceptionHandler: Mc,
                $filter: Xb,
                $interpolate: Nc,
                $http: dd,
                $httpBackend: ed,
                $location: Rc,
                $log: Sc,
                $parse: Wc,
                $route: Zc,
                $routeParams: $c,
                $rootScope: ad,
                $q: Xc,
                $sniffer: bd,
                $templateCache: Gc,
                $timeout: id,
                $window: cd
            })
        }
        ])
    }
    )(db);
    A(W).ready(function() {
        qc(W, xb)
    })
}
)(window, document);
angular.element(document).find("head").append('<style type="text/css">@charset "UTF-8";\n\n[ng\\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak],\n.ng-cloak, .x-ng-cloak {\n  display: none !important;\n}\n\nng\\:form {\n  display: block;\n}\n</style>');

(function() {
    var d, aa = aa || {}, h = this;
    function ba(a, b, c) {
        a = a.split(".");
        c = c || h;
        a[0]in c || !c.execScript || c.execScript("var " + a[0]);
        for (var e; a.length && (e = a.shift()); )
            a.length || void 0 === b ? c[e] ? c = c[e] : c = c[e] = {} : c[e] = b
    }
    function m(a, b) {
        for (var c = a.split("."), e = b || h, f; f = c.shift(); )
            if (null != e[f])
                e = e[f];
            else
                return null;
        return e
    }
    function q() {}
    function ca(a) {
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
    function s(a) {
        return void 0 !== a
    }
    function t(a) {
        return "array" == ca(a)
    }
    function da(a) {
        var b = ca(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }
    function v(a) {
        return "string" == typeof a
    }
    function fa(a) {
        return "number" == typeof a
    }
    function w(a) {
        return "function" == ca(a)
    }
    function ga(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }
    var ha = "closure_uid_" + (1E9 * Math.random() >>> 0)
      , ja = 0;
    function ka(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
    function la(a, b, c) {
        if (!a)
            throw Error();
        if (2 < arguments.length) {
            var e = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, e);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }
    function x(a, b, c) {
        x = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ka : la;
        return x.apply(null, arguments)
    }
    function ma(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var b = c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b)
        }
    }
    function y(a, b) {
        for (var c in b)
            a[c] = b[c]
    }
    var z = Date.now || function() {
        return +new Date
    }
    ;
    function A(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.B = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.bK = function(a, c, g) {
            var k = Array.prototype.slice.call(arguments, 2);
            return b.prototype[c].apply(a, k)
        }
    }
    Function.prototype.bind = Function.prototype.bind || function(a, b) {
        if (1 < arguments.length) {
            var c = Array.prototype.slice.call(arguments, 1);
            c.unshift(this, a);
            return x.apply(null, c)
        }
        return x(this, a)
    }
    ;
    Function.prototype.mS = function(a) {
        var b = Array.prototype.slice.call(arguments);
        b.unshift(this, null);
        return x.apply(null, b)
    }
    ;
    Function.prototype.PR = function(a) {
        A(this, a)
    }
    ;
    Function.prototype.lS = function(a) {
        y(this.prototype, a)
    }
    ;
    var na = {
        mK: "branding",
        qK: "channel",
        rK: "channel_paid_info",
        nP: "video_like_value",
        lP: "video",
        ML: "innertube"
    }
      , oa = {
        name: "ALTERNATE_SEARCH_POSITION",
        id: 942E3
    }
      , qa = {
        name: "EVENT_SOUNDS_LAUNCH",
        id: 927906
    }
      , ra = {
        name: "LONG_POST_PLAY",
        id: 912522
    }
      , sa = {
        name: "PAID_SCOPE",
        id: 938801
    }
      , ta = {
        name: "PREVIEW_NEXT_VIDEO",
        id: 927901
    }
      , ua = {
        name: "USE_CORS_LAUNCH",
        id: 938804
    }
      , va = {
        name: "USE_INNER_TUBE_LAUNCH",
        id: 943402
    }
      , wa = {
        name: "USE_INNER_TUBE_SEARCH",
        id: 943403
    }
      , xa = {
        name: "USE_INNER_TUBE_WATCH_NEXT",
        id: 943400
    }
      , ya = {
        name: "XBOX_UPLOADS_LAUNCH",
        id: 920510
    }
      , za = {
        b: oa,
        g: {
            name: "EVENT_SOUNDS_HOLDBACK",
            id: 927905
        },
        h: qa,
        j: ra,
        k: {
            name: "LONG_POST_PLAY_HOLDBACK",
            id: 912523
        },
        l: sa,
        o: ta,
        p: ua,
        w: va,
        A: wa,
        D: xa,
        F: ya
    }
      , Aa = "AE AR AU BE BR CA CL CO CZ DE EG ES FR GB HK HU ID IE IL IN IT JO JP KR MA MX MY NL NZ PE PH PL RU SA SE SG TW ZA".split(" ")
      , Ba = {
        settings: "Sign In & Settings"
    }
      , Ca = {
        help: "request-view-help"
    }
      , Da = ["\u309b", "\u309c", "\u5c0f"]
      , Ga = {
        "\u3042": ["\u3044", "\u3046", "\u3048", "\u304a"],
        "\u304b": ["\u304d", "\u304f", "\u3051", "\u3053"],
        "\u3055": ["\u3057", "\u3059", "\u305b", "\u305d"],
        "\u305f": ["\u3061", "\u3064", "\u3066", "\u3068"],
        "\u306a": ["\u306b", "\u306c", "\u306d", "\u306e"],
        "\u306f": ["\u3072", "\u3075", "\u3078", "\u307b"],
        "\u307e": ["\u307f", "\u3080", "\u3081", "\u3082"],
        "\u3084": ["\u3086", "\u3088"],
        "\u3089": ["\u308a", "\u308b", "\u308c", "\u308d"],
        "\u308f": ["\u3092", "\u3093"],
        "\u309b": ["\u309c", "\u5c0f", "\u30fc"]
    }
      , Ha = {
        "\u3131": ["\u3132"],
        "\u3137": ["\u3138"],
        "\u3142": ["\u3143"],
        "\u3145": ["\u3146"],
        "\u3148": ["\u3149"]
    }
      , Ia = {
        "\u3131": "\u1100",
        "\u3132": "\u1101",
        "\u3134": "\u1102",
        "\u3137": "\u1103",
        "\u3138": "\u1104",
        "\u314f": "\u1161",
        "\u3153": "\u1165",
        "\u3157": "\u1169",
        "\u3139": "\u1105",
        "\u3141": "\u1106",
        "\u3142": "\u1107",
        "\u3143": "\u1108",
        "\u3145": "\u1109",
        "\u3151": "\u1163",
        "\u3155": "\u1167",
        "\u315b": "\u116d",
        "\u3146": "\u110a",
        "\u3147": "\u110b",
        "\u3148": "\u110c",
        "\u3149": "\u110d",
        "\u314a": "\u110e",
        "\u3161": "\u1173",
        "\u3163": "\u1175",
        "\u315c": "\u116e",
        "\u314b": "\u110f",
        "\u314c": "\u1110",
        "\u314d": "\u1111",
        "\u314e": "\u1112",
        "\u3150": "\u1162",
        "\u3154": "\u1166",
        "\u3160": "\u1172",
        "\u3152": "\u1164",
        "\u3156": "\u1168"
    }
      , Ja = {
        "\u5c0f": {
            "\u3042": "\u3041",
            "\u3041": "\u3042",
            "\u3044": "\u3043",
            "\u3043": "\u3044",
            "\u3048": "\u3047",
            "\u3047": "\u3048",
            "\u304a": "\u3049",
            "\u3049": "\u304a",
            "\u3084": "\u3083",
            "\u3083": "\u3084",
            "\u3086": "\u3085",
            "\u3085": "\u3086",
            "\u3088": "\u3087",
            "\u3087": "\u3088",
            "\u308f": "\u308e",
            "\u308e": "\u308f",
            "\u304b": "\u3095",
            "\u3095": "\u304b",
            "\u304c": "\u3095",
            "\u3051": "\u3096",
            "\u3096": "\u3051",
            "\u3052": "\u3096",
            "\u3064": "\u3063",
            "\u3063": "\u3064",
            "\u3065": "\u3063",
            "\u3046": "\u3045",
            "\u3045": "\u3046",
            "\u3094": "\u3045"
        },
        "\u309b": {
            "\u304d": "\u304e",
            "\u304e": "\u304d",
            "\u304f": "\u3050",
            "\u3050": "\u304f",
            "\u3053": "\u3054",
            "\u3054": "\u3053",
            "\u3055": "\u3056",
            "\u3056": "\u3055",
            "\u3057": "\u3058",
            "\u3058": "\u3057",
            "\u3059": "\u305a",
            "\u305a": "\u3059",
            "\u305b": "\u305c",
            "\u305c": "\u305b",
            "\u305d": "\u305e",
            "\u305e": "\u305d",
            "\u305f": "\u3060",
            "\u3060": "\u305f",
            "\u3061": "\u3062",
            "\u3062": "\u3061",
            "\u3066": "\u3067",
            "\u3067": "\u3066",
            "\u3068": "\u3069",
            "\u3069": "\u3068",
            "\u304b": "\u304c",
            "\u304c": "\u304b",
            "\u3095": "\u304c",
            "\u3051": "\u3052",
            "\u3052": "\u3051",
            "\u3096": "\u3052",
            "\u3064": "\u3065",
            "\u3065": "\u3064",
            "\u3063": "\u3065",
            "\u3046": "\u3094",
            "\u3045": "\u3094",
            "\u3094": "\u3046",
            "\u3071": "\u3070",
            "\u3070": "\u306f",
            "\u306f": "\u3070",
            "\u3074": "\u3073",
            "\u3073": "\u3072",
            "\u3072": "\u3073",
            "\u3077": "\u3076",
            "\u3076": "\u3075",
            "\u3075": "\u3076",
            "\u307a": "\u3079",
            "\u3079": "\u3078",
            "\u3078": "\u3079",
            "\u307d": "\u307c",
            "\u307c": "\u307b",
            "\u307b": "\u307c"
        },
        "\u309c": {
            "\u306f": "\u3071",
            "\u3071": "\u306f",
            "\u3070": "\u3071",
            "\u3072": "\u3074",
            "\u3074": "\u3072",
            "\u3073": "\u3074",
            "\u3075": "\u3077",
            "\u3077": "\u3075",
            "\u3076": "\u3077",
            "\u3078": "\u307a",
            "\u307a": "\u3078",
            "\u3079": "\u307a",
            "\u307b": "\u307d",
            "\u307d": "\u307b",
            "\u307c": "\u307d"
        }
    }
      , Ka = {
        sK: "zh_CN",
        LL: "zh_HK",
        JAPAN: "ja_JP",
        RO: "ko_KR",
        oJ: "nb_NO",
        bP: "ru_RU",
        iP: "zh_TW",
        jP: "uk_UA"
    }
      , La = "af_ZA am_ET bg_BG bn_BD ca_ES cs_CZ da_DK de_DE el_GR en_US en_GB en_XC es_ES es_MX et_EE eu_ES fa_IR fi_FI fil_PH fr_FR fr_CA gl_ES gu_IN hi_IN hr_HR hu_HU id_ID is_IS it_IT ja_JP kn_IN ko_KR lt_LT lv_LV ml_IN mr_IN ms_MY nb_NO nl_NL pl_PL pt_PT pt_BR ro_RO ru_RU sk_SK sl_SI sr_RS sv_SE sw_TZ ta_IN te_IN th_TH tr_TR uk_UA ur_PK vi_VN zh_CN zh_HK zh_TW zu_ZA".split(" ")
      , Ma = {
        oJ: ["no_NO"]
    };
    ba("yt.tv.constants.SmartglassPlaybackStatus", {
        CLOSED: 0,
        pK: 1,
        gP: 2,
        Ks: 3,
        Js: 4
    }, void 0);
    ba("yt.tv.constants.SmartglassPlaybackRate", {
        Js: 0,
        Ks: 1
    }, void 0);
    ba("yt.tv.constants.PlayerState", {
        nK: 3,
        vK: 0,
        ERROR: -1E3,
        Js: 2,
        Ks: 1,
        kP: -1,
        mP: 5
    }, void 0);
    var Na = {
        EN: "abcdefghijklmnopqrstuvwxyz_",
        KO: "\u3131\u3134\u3137\u3139\u3141\u3142\u3145\u3147\u3148\u314a\u314b\u314c\u314d\u314e\n\u314f\u3151\u3153\u3155\u3157\u315b\u315c\u3160\u3161\u3163\u3150\u3152\u3154\u31561234567890_",
        RU: "\u0430\u0431\u0432\u0433\u0434\u0435\u0451\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044b\u044c\u044d\u044e\u044f_",
        JP: "\u3042\u304b\u3055\u305f\u306a\u306f\u307e\u3084\u3089\u308f\u309b",
        NUMBERS: "1234567890"
    }
      , Oa = {
        KL: "HL",
        YO: "RC",
        hP: "SU",
        oP: "WL"
    }
      , Pa = {
        mqdefault: [0, 1280],
        hqdefault: [1281, Number.MAX_VALUE]
    }
      , Qa = {
        "channel.banner.tv.low.image.url": [0, 854],
        "channel.banner.tv.medium.image.url": [855, 1280],
        "channel.banner.tv.high.image.url": [1281, Number.MAX_VALUE]
    }
      , Ra = {
        FRIEND_ADDED: "[[{{username}} added a friend|The message that describes user activity. Displayed when a user has added a friend.]]",
        USER_SUBSCRIPTION_ADDED: "[[{{username}} added a subscription|The message that describes user activity. Displayed when a user subscribed to a channel.]]",
        VIDEO_ADDED_TO_LEGO: "[[{{username}} added a video|The message that describes user activity. Displayed when a user added a video to a playlist.]]",
        VIDEO_ADDED_TO_PLAYLIST: "[[{{username}} added a video to a playlist|The message that describes user activity. Displayed when a user added a video to a playlist.]]",
        VIDEO_COMMENTED: "[[{{username}} commented a video|The message that describes user activity. Displayed when a user has commented on a video.]]",
        VIDEO_FAVORITED: "[[{{username}} favorited a video|The message that describes user activity. Displayed when a user has favorited a video.]]",
        VIDEO_RATED: "[[{{username}} rated a video|The message that describes user activity. Displayed when a user has rated a video.]]",
        VIDEO_RECOMMENDED: "[[video recommended|The message that describes that a video has been recommended.]]",
        VIDEO_SHARED: "[[{{username}} shared a video|The message that describes user activity. Displayed when a user has shared a video.]]",
        VIDEO_UPLOADED: "[[{{username}} uploaded a video|The message that describes user activity. Displayed when a user has uploaded a video.]]"
    };
    function Sa(a, b) {
        this.b = a;
        this.g = b
    }
    Sa.prototype.de = function() {
        var a = this.g.$x();
        a && a.url ? this.b.url(a.url) : this.b.state("browse", {})
    }
    ;
    Sa.inject = ["locationService", "navigationService"];
    function Ta(a, b, c, e) {
        this.g = a;
        this.h = b;
        this.j = e;
        this.b = c
    }
    d = Ta.prototype;
    d.de = function(a, b, c, e) {
        this.h.bb(a, x(this.DE, this, this.FE(b), !!c), null, x(this.EE, this, !!e))
    }
    ;
    d.FE = function(a) {
        a = parseInt(a, 10);
        return isNaN(a) ? 0 : a
    }
    ;
    d.DE = function(a, b, c) {
        if (c && c.Y && c.Y.ia(0)) {
            var e = c.Y.ia(0)
              , f = new Ua(this.h,e.title,e.channel.imageUrl);
            c.title = e.title;
            f.model = c;
            f.model.Ya = e.channel.imageUrl;
            this.g.L("cmd-playback", e, f, a, b)
        } else
            this.g.L("cmd-go-back"),
            this.b.bm("[[There was an error retrieving the requested video.|Error displayed when a video cannot be loaded.]]")
    }
    ;
    d.EE = function(a) {
        a && (a = x(this.uy, this),
        a = new Va("[[There was an error retrieving the requested video.|Error displayed when a video cannot be loaded.]]",a,a),
        a.h = "",
        this.b.show(a))
    }
    ;
    d.uy = function() {
        this.b.ma();
        this.j.state("browse")
    }
    ;
    Ta.inject = ["rootDispatcher", "videoPlaybackInfoService", "dialogService", "locationService"];
    function Wa(a, b) {
        var c = a.length - b.length;
        return 0 <= c && a.indexOf(b, c) == c
    }
    function Xa(a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    }
    function Ya(a, b) {
        var c = String(a).toLowerCase()
          , e = String(b).toLowerCase();
        return c < e ? -1 : c == e ? 0 : 1
    }
    function Za(a) {
        return decodeURIComponent(a.replace(/\+/g, " "))
    }
    function $a(a, b) {
        if (b)
            return a.replace(ab, "&amp;").replace(bb, "&lt;").replace(cb, "&gt;").replace(db, "&quot;").replace(hb, "&#39;");
        if (!ib.test(a))
            return a;
        -1 != a.indexOf("&") && (a = a.replace(ab, "&amp;"));
        -1 != a.indexOf("<") && (a = a.replace(bb, "&lt;"));
        -1 != a.indexOf(">") && (a = a.replace(cb, "&gt;"));
        -1 != a.indexOf('"') && (a = a.replace(db, "&quot;"));
        -1 != a.indexOf("'") && (a = a.replace(hb, "&#39;"));
        return a
    }
    var ab = /&/g
      , bb = /</g
      , cb = />/g
      , db = /"/g
      , hb = /'/g
      , ib = /[&<>"']/;
    function B(a, b) {
        return -1 != a.indexOf(b)
    }
    function jb(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }
    Math.random();
    function kb(a) {
        return String(a).replace(/\-([a-z])/g, function(a, c) {
            return c.toUpperCase()
        })
    }
    function lb(a, b) {
        var c = v(b) ? String(b).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s";
        return a.replace(RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
            return b + c.toUpperCase()
        })
    }
    ;function mb(a, b, c) {
        this.videoId = a || "";
        this.playlistId = b || "";
        this.innerTubeEndpointParams = c || null
    }
    ;function nb(a) {
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, nb);
        else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a))
    }
    A(nb, Error);
    nb.prototype.name = "CustomError";
    var ob;
    var pb, qb, rb, sb, tb, ub;
    function vb() {
        return h.navigator ? h.navigator.userAgent : null
    }
    function wb() {
        return h.navigator
    }
    tb = sb = rb = qb = pb = !1;
    var xb;
    if (xb = vb()) {
        var yb = wb();
        pb = 0 == xb.lastIndexOf("Opera", 0);
        qb = !pb && (B(xb, "MSIE") || B(xb, "Trident"));
        sb = (rb = !pb && B(xb, "WebKit")) && B(xb, "Mobile");
        tb = !pb && !rb && !qb && "Gecko" == yb.product
    }
    var zb = pb
      , F = qb
      , Ab = tb
      , Bb = rb
      , Cb = sb
      , Db = wb()
      , Gb = Db && Db.platform || "";
    ub = B(Gb, "Mac");
    B(Gb, "Win");
    B(Gb, "Linux");
    wb() && B(wb().appVersion || "", "X11");
    var Hb = vb();
    Hb && B(Hb, "Android");
    Hb && B(Hb, "iPhone");
    Hb && B(Hb, "iPad");
    function Ib() {
        var a = h.document;
        return a ? a.documentMode : void 0
    }
    var Jb;
    t: {
        var Kb = "", Lb;
        if (zb && h.opera)
            var Mb = h.opera.version
              , Kb = "function" == typeof Mb ? Mb() : Mb;
        else if (Ab ? Lb = /rv\:([^\);]+)(\)|;)/ : F ? Lb = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : Bb && (Lb = /WebKit\/(\S+)/),
        Lb)
            var Nb = Lb.exec(vb())
              , Kb = Nb ? Nb[1] : "";
        if (F) {
            var Ob = Ib();
            if (Ob > parseFloat(Kb)) {
                Jb = String(Ob);
                break t
            }
        }
        Jb = Kb
    }
    var Pb = Jb
      , Qb = {};
    function G(a) {
        var b;
        if (!(b = Qb[a])) {
            var c = 0;
            b = Xa(String(Pb)).split(".");
            for (var e = Xa(String(a)).split("."), f = Math.max(b.length, e.length), g = 0; 0 == c && g < f; g++) {
                var k = b[g] || ""
                  , l = e[g] || ""
                  , n = RegExp("(\\d*)(\\D*)", "g")
                  , p = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var u = n.exec(k) || ["", "", ""]
                      , r = p.exec(l) || ["", "", ""];
                    if (0 == u[0].length && 0 == r[0].length)
                        break;
                    var c = 0 == u[1].length ? 0 : parseInt(u[1], 10)
                      , E = 0 == r[1].length ? 0 : parseInt(r[1], 10)
                      , c = jb(c, E) || jb(0 == u[2].length, 0 == r[2].length) || jb(u[2], r[2])
                } while (0 == c)
            }
            b = Qb[a] = 0 <= c
        }
        return b
    }
    function Rb(a) {
        return F && Sb >= a
    }
    var Tb = h.document
      , Sb = Tb && F ? Ib() || ("CSS1Compat" == Tb.compatMode ? parseInt(Pb, 10) : 5) : void 0;
    var Ub = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
    function Vb(a) {
        if (Wb) {
            Wb = !1;
            var b = h.location;
            if (b) {
                var c = b.href;
                if (c && (c = Xb(c)) && c != b.hostname)
                    throw Wb = !0,
                    Error();
            }
        }
        return a.match(Ub)
    }
    var Wb = Bb;
    function Xb(a) {
        return (a = Vb(a)[3] || null) && decodeURIComponent(a)
    }
    function Yb(a, b, c) {
        if (t(b))
            for (var e = 0; e < b.length; e++)
                Yb(a, String(b[e]), c);
        else
            null != b && c.push("&", a, "" === b ? "" : "=", encodeURIComponent(String(b)))
    }
    function Zb(a, b) {
        for (var c in b)
            Yb(c, b[c], a);
        return a
    }
    function $b(a, b) {
        var c = Zb([a], b);
        if (c[1]) {
            var e = c[0]
              , f = e.indexOf("#");
            0 <= f && (c.push(e.substr(f)),
            c[0] = e = e.substr(0, f));
            f = e.indexOf("?");
            0 > f ? c[1] = "?" : f == e.length - 1 && (c[1] = void 0)
        }
        return c.join("")
    }
    ;var H = Array.prototype
      , ac = H.indexOf ? function(a, b, c) {
        return H.indexOf.call(a, b, c)
    }
    : function(a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (v(a))
            return v(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    }
      , bc = H.forEach ? function(a, b, c) {
        H.forEach.call(a, b, c)
    }
    : function(a, b, c) {
        for (var e = a.length, f = v(a) ? a.split("") : a, g = 0; g < e; g++)
            g in f && b.call(c, f[g], g, a)
    }
    ;
    function cc(a, b, c) {
        for (var e = a.length, f = v(a) ? a.split("") : a, e = e - 1; 0 <= e; --e)
            e in f && b.call(c, f[e], e, a)
    }
    var dc = H.filter ? function(a, b, c) {
        return H.filter.call(a, b, c)
    }
    : function(a, b, c) {
        for (var e = a.length, f = [], g = 0, k = v(a) ? a.split("") : a, l = 0; l < e; l++)
            if (l in k) {
                var n = k[l];
                b.call(c, n, l, a) && (f[g++] = n)
            }
        return f
    }
      , fc = H.map ? function(a, b, c) {
        return H.map.call(a, b, c)
    }
    : function(a, b, c) {
        for (var e = a.length, f = Array(e), g = v(a) ? a.split("") : a, k = 0; k < e; k++)
            k in g && (f[k] = b.call(c, g[k], k, a));
        return f
    }
      , gc = H.some ? function(a, b, c) {
        return H.some.call(a, b, c)
    }
    : function(a, b, c) {
        for (var e = a.length, f = v(a) ? a.split("") : a, g = 0; g < e; g++)
            if (g in f && b.call(c, f[g], g, a))
                return !0;
        return !1
    }
      , hc = H.every ? function(a, b, c) {
        return H.every.call(a, b, c)
    }
    : function(a, b, c) {
        for (var e = a.length, f = v(a) ? a.split("") : a, g = 0; g < e; g++)
            if (g in f && !b.call(c, f[g], g, a))
                return !1;
        return !0
    }
    ;
    function ic(a, b, c) {
        t: {
            for (var e = a.length, f = v(a) ? a.split("") : a, g = 0; g < e; g++)
                if (g in f && b.call(c, f[g], g, a)) {
                    b = g;
                    break t
                }
            b = -1
        }
        return 0 > b ? null : v(a) ? a.charAt(b) : a[b]
    }
    function I(a, b) {
        return 0 <= ac(a, b)
    }
    function jc(a, b) {
        var c = ac(a, b), e;
        (e = 0 <= c) && H.splice.call(a, c, 1);
        return e
    }
    function kc(a) {
        return H.concat.apply(H, arguments)
    }
    function lc(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), e = 0; e < b; e++)
                c[e] = a[e];
            return c
        }
        return []
    }
    function mc(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var e = arguments[c], f;
            if (t(e) || (f = da(e)) && Object.prototype.hasOwnProperty.call(e, "callee"))
                a.push.apply(a, e);
            else if (f)
                for (var g = a.length, k = e.length, l = 0; l < k; l++)
                    a[g + l] = e[l];
            else
                a.push(e)
        }
    }
    function nc(a, b, c) {
        return 2 >= arguments.length ? H.slice.call(a, b) : H.slice.call(a, b, c)
    }
    function oc(a, b) {
        return a > b ? 1 : a < b ? -1 : 0
    }
    function pc(a, b) {
        for (var c = [], e = 0; e < b; e++)
            c[e] = a;
        return c
    }
    function qc(a) {
        for (var b = [], c = 0; c < arguments.length; c++) {
            var e = arguments[c];
            t(e) ? b.push.apply(b, qc.apply(null, e)) : b.push(e)
        }
        return b
    }
    ;function rc(a, b, c) {
        for (var e in a)
            b.call(c, a[e], e, a)
    }
    function sc(a, b, c) {
        var e = {}, f;
        for (f in a)
            e[f] = b.call(c, a[f], f, a);
        return e
    }
    function tc(a, b, c) {
        for (var e in a)
            if (b.call(c, a[e], e, a))
                return !0;
        return !1
    }
    function uc(a) {
        for (var b in a)
            return b
    }
    function vc(a) {
        var b = [], c = 0, e;
        for (e in a)
            b[c++] = a[e];
        return b
    }
    function wc(a) {
        var b = [], c = 0, e;
        for (e in a)
            b[c++] = e;
        return b
    }
    function xc(a, b) {
        for (var c in a)
            if (a[c] == b)
                return !0;
        return !1
    }
    function yc(a, b, c) {
        for (var e in a)
            if (b.call(c, a[e], e, a))
                return e
    }
    function zc(a) {
        for (var b in a)
            return !1;
        return !0
    }
    function Ac(a, b, c) {
        if (b in a)
            throw Error('The object already contains the key "' + b + '"');
        a[b] = c
    }
    function J(a, b, c) {
        return b in a ? a[b] : c
    }
    function Bc(a) {
        var b = {}, c;
        for (c in a)
            b[c] = a[c];
        return b
    }
    function Cc(a) {
        var b = {}, c;
        for (c in a)
            b[a[c]] = c;
        return b
    }
    var Dc = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    function Ec(a, b) {
        for (var c, e, f = 1; f < arguments.length; f++) {
            e = arguments[f];
            for (c in e)
                a[c] = e[c];
            for (var g = 0; g < Dc.length; g++)
                c = Dc[g],
                Object.prototype.hasOwnProperty.call(e, c) && (a[c] = e[c])
        }
    }
    ;function Fc(a) {
        return function() {
            return a
        }
    }
    Fc(!1);
    Fc(!0);
    Fc(null);
    function Gc(a, b) {
        b = b || 0;
        return function() {
            return a.apply(this, Array.prototype.slice.call(arguments, 0, b))
        }
    }
    ;function Hc(a, b) {
        s(b);
        return Math.floor(a + (b || 2E-15))
    }
    ;var Ic = "StopIteration"in h ? h.StopIteration : Error("StopIteration");
    function Jc() {}
    Jc.prototype.next = function() {
        throw Ic;
    }
    ;
    Jc.prototype.wb = function() {
        return this
    }
    ;
    function Kc(a) {
        if (a instanceof Jc)
            return a;
        if ("function" == typeof a.wb)
            return a.wb(!1);
        if (da(a)) {
            var b = 0
              , c = new Jc;
            c.next = function() {
                for (; ; ) {
                    if (b >= a.length)
                        throw Ic;
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
    function Lc(a, b, c) {
        if (da(a))
            try {
                bc(a, b, c)
            } catch (e) {
                if (e !== Ic)
                    throw e;
            }
        else {
            a = Kc(a);
            try {
                for (; ; )
                    b.call(c, a.next(), void 0, a)
            } catch (f) {
                if (f !== Ic)
                    throw f;
            }
        }
    }
    function Mc(a) {
        if (da(a))
            return lc(a);
        a = Kc(a);
        var b = [];
        Lc(a, function(a) {
            b.push(a)
        });
        return b
    }
    ;function Nc(a, b) {
        this.g = {};
        this.b = [];
        this.j = this.h = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2)
                throw Error("Uneven number of arguments");
            for (var e = 0; e < c; e += 2)
                this.Jb(arguments[e], arguments[e + 1])
        } else
            a && this.Vu(a)
    }
    d = Nc.prototype;
    d.oa = function() {
        return this.h
    }
    ;
    d.sa = function() {
        this.Pd();
        for (var a = [], b = 0; b < this.b.length; b++)
            a.push(this.g[this.b[b]]);
        return a
    }
    ;
    d.Bb = function() {
        this.Pd();
        return this.b.concat()
    }
    ;
    d.bh = function(a) {
        return Oc(this.g, a)
    }
    ;
    d.Rf = function(a) {
        for (var b = 0; b < this.b.length; b++) {
            var c = this.b[b];
            if (Oc(this.g, c) && this.g[c] == a)
                return !0
        }
        return !1
    }
    ;
    d.ER = function(a, b) {
        if (this === a)
            return !0;
        if (this.h != a.oa())
            return !1;
        var c = b || Pc;
        this.Pd();
        for (var e, f = 0; e = this.b[f]; f++)
            if (!c(this.get(e), a.get(e)))
                return !1;
        return !0
    }
    ;
    function Pc(a, b) {
        return a === b
    }
    d.Ta = function() {
        return 0 == this.h
    }
    ;
    d.clear = function() {
        this.g = {};
        this.j = this.h = this.b.length = 0
    }
    ;
    d.remove = function(a) {
        return Oc(this.g, a) ? (delete this.g[a],
        this.h--,
        this.j++,
        this.b.length > 2 * this.h && this.Pd(),
        !0) : !1
    }
    ;
    d.Pd = function() {
        if (this.h != this.b.length) {
            for (var a = 0, b = 0; a < this.b.length; ) {
                var c = this.b[a];
                Oc(this.g, c) && (this.b[b++] = c);
                a++
            }
            this.b.length = b
        }
        if (this.h != this.b.length) {
            for (var e = {}, b = a = 0; a < this.b.length; )
                c = this.b[a],
                Oc(e, c) || (this.b[b++] = c,
                e[c] = 1),
                a++;
            this.b.length = b
        }
    }
    ;
    d.get = function(a, b) {
        return Oc(this.g, a) ? this.g[a] : b
    }
    ;
    d.Jb = function(a, b) {
        Oc(this.g, a) || (this.h++,
        this.b.push(a),
        this.j++);
        this.g[a] = b
    }
    ;
    d.Vu = function(a) {
        var b;
        a instanceof Nc ? (b = a.Bb(),
        a = a.sa()) : (b = wc(a),
        a = vc(a));
        for (var c = 0; c < b.length; c++)
            this.Jb(b[c], a[c])
    }
    ;
    d.clone = function() {
        return new Nc(this)
    }
    ;
    d.gT = function() {
        for (var a = new Nc, b = 0; b < this.b.length; b++) {
            var c = this.b[b];
            a.Jb(this.g[c], c)
        }
        return a
    }
    ;
    d.fT = function() {
        this.Pd();
        for (var a = {}, b = 0; b < this.b.length; b++) {
            var c = this.b[b];
            a[c] = this.g[c]
        }
        return a
    }
    ;
    d.rQ = function() {
        return this.wb(!0)
    }
    ;
    d.aR = function() {
        return this.wb(!1)
    }
    ;
    d.wb = function(a) {
        this.Pd();
        var b = 0
          , c = this.b
          , e = this.g
          , f = this.j
          , g = this
          , k = new Jc;
        k.next = function() {
            for (; ; ) {
                if (f != g.j)
                    throw Error("The map has changed since the iterator was created");
                if (b >= c.length)
                    throw Ic;
                var k = c[b++];
                return a ? k : e[k]
            }
        }
        ;
        return k
    }
    ;
    function Oc(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
    ;function Qc(a) {
        if ("function" == typeof a.oa)
            a = a.oa();
        else if (da(a) || v(a))
            a = a.length;
        else {
            var b = 0, c;
            for (c in a)
                b++;
            a = b
        }
        return a
    }
    function Rc(a) {
        if ("function" == typeof a.sa)
            return a.sa();
        if (v(a))
            return a.split("");
        if (da(a)) {
            for (var b = [], c = a.length, e = 0; e < c; e++)
                b.push(a[e]);
            return b
        }
        return vc(a)
    }
    function Sc(a) {
        if ("function" == typeof a.Bb)
            return a.Bb();
        if ("function" != typeof a.sa) {
            if (da(a) || v(a)) {
                var b = [];
                a = a.length;
                for (var c = 0; c < a; c++)
                    b.push(c);
                return b
            }
            return wc(a)
        }
    }
    function Tc(a, b, c) {
        if ("function" == typeof a.forEach)
            a.forEach(b, c);
        else if (da(a) || v(a))
            bc(a, b, c);
        else
            for (var e = Sc(a), f = Rc(a), g = f.length, k = 0; k < g; k++)
                b.call(c, f[k], e && e[k], a)
    }
    function Uc(a, b, c) {
        if ("function" == typeof a.every)
            return a.every(b, c);
        if (da(a) || v(a))
            return hc(a, b, c);
        for (var e = Sc(a), f = Rc(a), g = f.length, k = 0; k < g; k++)
            if (!b.call(c, f[k], e && e[k], a))
                return !1;
        return !0
    }
    ;function Vc(a) {
        this.b = new Nc;
        a && this.wp(a)
    }
    function Wc(a) {
        var b = typeof a;
        return "object" == b && a || "function" == b ? "o" + (a[ha] || (a[ha] = ++ja)) : b.substr(0, 1) + a
    }
    d = Vc.prototype;
    d.oa = function() {
        return this.b.oa()
    }
    ;
    d.add = function(a) {
        this.b.Jb(Wc(a), a)
    }
    ;
    d.wp = function(a) {
        a = Rc(a);
        for (var b = a.length, c = 0; c < b; c++)
            this.add(a[c])
    }
    ;
    d.HJ = function(a) {
        a = Rc(a);
        for (var b = a.length, c = 0; c < b; c++)
            this.remove(a[c])
    }
    ;
    d.remove = function(a) {
        return this.b.remove(Wc(a))
    }
    ;
    d.clear = function() {
        this.b.clear()
    }
    ;
    d.Ta = function() {
        return this.b.Ta()
    }
    ;
    d.contains = function(a) {
        return this.b.bh(Wc(a))
    }
    ;
    d.yP = function(a) {
        return Uc(a, this.contains, this)
    }
    ;
    d.GR = function(a) {
        var b = new Vc;
        a = Rc(a);
        for (var c = 0; c < a.length; c++) {
            var e = a[c];
            this.contains(e) && b.add(e)
        }
        return b
    }
    ;
    d.Mn = function(a) {
        var b = this.clone();
        b.HJ(a);
        return b
    }
    ;
    d.sa = function() {
        return this.b.sa()
    }
    ;
    d.clone = function() {
        return new Vc(this)
    }
    ;
    d.FR = function(a) {
        return this.oa() == Qc(a) && this.fI(a)
    }
    ;
    d.fI = function(a) {
        var b = Qc(a);
        if (this.oa() > b)
            return !1;
        !(a instanceof Vc) && 5 < b && (a = new Vc(a));
        return Uc(this, function(b) {
            var e = a;
            return "function" == typeof e.contains ? e.contains(b) : "function" == typeof e.Rf ? e.Rf(b) : da(e) || v(e) ? I(e, b) : xc(e, b)
        })
    }
    ;
    d.wb = function() {
        return this.b.wb(!1)
    }
    ;
    function Xc(a, b) {
        for (var c = b.length, e = 0; e < c; ++e) {
            var f = a
              , g = b[e];
            Yc(f, g);
            Zc(f, g)
        }
    }
    function Yc(a, b) {
        $c(b);
        a.prototype.__defineGetter__(b, function() {
            return this[b + "_"]
        })
    }
    function Zc(a, b) {
        $c(b);
        var c = b + "_";
        a.prototype.__defineSetter__(b, function(a) {
            if (a !== this[c]) {
                var f = this[c];
                this[c] = a;
                this.L && w(this.L) && this.L(b + ":changed", a, f)
            }
        })
    }
    function $c(a) {
        if (!a.match(/^[a-zA-Z]+$/))
            throw Error("Invalid property name");
    }
    ;function ad() {}
    d = ad.prototype;
    d.al = !1;
    d.Og = function() {
        return this.al
    }
    ;
    d.eQ = ad.prototype.Og;
    d.pb = function() {
        this.al || (this.al = !0,
        this.T())
    }
    ;
    d.tS = function(a) {
        this.rJ(ma(bd, a))
    }
    ;
    d.rJ = function(a, b) {
        this.kb || (this.kb = []);
        this.kb.push(x(a, b))
    }
    ;
    d.T = function() {
        if (this.kb)
            for (; this.kb.length; )
                this.kb.shift()()
    }
    ;
    function bd(a) {
        a && "function" == typeof a.pb && a.pb()
    }
    function cd(a) {
        for (var b = 0, c = arguments.length; b < c; ++b) {
            var e = arguments[b];
            da(e) ? cd.apply(null, e) : bd(e)
        }
    }
    ;function dd(a, b) {
        this.h = a || null;
        this.j = !!b;
        this.g = new Nc;
        this.b = new ed("",void 0);
        this.b.next = this.b.b = this.b
    }
    d = dd.prototype;
    d.Kq = function(a) {
        (a = this.g.get(a)) && this.j && (a.remove(),
        this.Sp(a));
        return a
    }
    ;
    d.get = function(a, b) {
        var c = this.Kq(a);
        return c ? c.value : b
    }
    ;
    d.pS = function(a, b) {
        var c = this.g.get(a);
        return c ? c.value : b
    }
    ;
    d.Ue = function(a, b) {
        var c = this.Kq(a);
        c ? c.value = b : (c = new ed(a,b),
        this.g.Jb(a, c),
        this.Sp(c))
    }
    ;
    d.nS = function() {
        return this.b.next.value
    }
    ;
    d.oS = function() {
        return this.b.b.value
    }
    ;
    d.shift = function() {
        return this.Xp(this.b.next)
    }
    ;
    d.DR = function() {
        return this.Xp(this.b.b)
    }
    ;
    d.remove = function(a) {
        return (a = this.g.get(a)) ? (this.cj(a),
        !0) : !1
    }
    ;
    d.cj = function(a) {
        a.remove();
        this.g.remove(a.key)
    }
    ;
    d.oa = function() {
        return this.g.oa()
    }
    ;
    d.Ta = function() {
        return this.g.Ta()
    }
    ;
    d.LS = function(a) {
        this.h = a || null;
        null != this.h && this.hj(this.h)
    }
    ;
    d.Bb = function() {
        return this.map(function(a, b) {
            return b
        })
    }
    ;
    d.sa = function() {
        return this.map(function(a) {
            return a
        })
    }
    ;
    d.contains = function(a) {
        return this.some(function(b) {
            return b == a
        })
    }
    ;
    d.CR = function(a) {
        return this.g.bh(a)
    }
    ;
    d.clear = function() {
        this.hj(0)
    }
    ;
    d.forEach = function(a, b) {
        for (var c = this.b.next; c != this.b; c = c.next)
            a.call(b, c.value, c.key, this)
    }
    ;
    d.map = function(a, b) {
        for (var c = [], e = this.b.next; e != this.b; e = e.next)
            c.push(a.call(b, e.value, e.key, this));
        return c
    }
    ;
    d.some = function(a, b) {
        for (var c = this.b.next; c != this.b; c = c.next)
            if (a.call(b, c.value, c.key, this))
                return !0;
        return !1
    }
    ;
    d.every = function(a, b) {
        for (var c = this.b.next; c != this.b; c = c.next)
            if (!a.call(b, c.value, c.key, this))
                return !1;
        return !0
    }
    ;
    d.Sp = function(a) {
        this.j ? (a.next = this.b.next,
        a.b = this.b,
        this.b.next = a,
        a.next.b = a) : (a.b = this.b.b,
        a.next = this.b,
        this.b.b = a,
        a.b.next = a);
        null != this.h && this.hj(this.h)
    }
    ;
    d.hj = function(a) {
        for (var b = this.g.oa(); b > a; b--)
            this.cj(this.j ? this.b.b : this.b.next)
    }
    ;
    d.Xp = function(a) {
        this.b != a && this.cj(a);
        return a.value
    }
    ;
    function ed(a, b) {
        this.key = a;
        this.value = b
    }
    ed.prototype.remove = function() {
        this.b.next = this.next;
        this.next.b = this.b;
        delete this.b;
        delete this.next
    }
    ;
    function K() {
        this.Xa = null;
        this.De = 0;
        this.ns()
    }
    A(K, ad);
    K.prototype.ns = function() {
        this.Xa = new dd
    }
    ;
    K.prototype.C = function(a, b) {
        var c = this.Xa
          , e = String(this.De++);
        c.Ue(e, {
            UG: a,
            Ec: b
        });
        return function() {
            c.remove(e)
        }
    }
    ;
    K.prototype.L = function(a, b) {
        if (void 0 !== this.Xa)
            for (var c = Array.prototype.slice.call(arguments, 1), e = this.Xa.sa(), f = 0, g = e.length; f < g; ++f) {
                var k = e[f];
                k.UG === a && k.Ec.apply(this, c)
            }
    }
    ;
    K.prototype.T = function() {
        this.Xa && this.Xa.clear();
        K.B.T.call(this)
    }
    ;
    function fd(a, b) {
        this.g = void 0 != a ? a : ",";
        this.b = void 0 != b ? b : "YYYY/MM/DD"
    }
    d = fd.prototype;
    d.YE = function(a) {
        return a ? a.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, this.g) : "0"
    }
    ;
    d.XE = function(a) {
        var b = this.dB(a)
          , c = this.cB(a);
        a = this.eB(a);
        switch (this.b) {
        case "DD/MM/YYYY":
            return [c, b, a].join("/");
        case "DD.MM.YYYY":
            return [c, b, a].join(".");
        case "MM/DD/YYYY":
            return [b, c, a].join("/");
        default:
            return [a, b, c].join("/")
        }
    }
    ;
    d.cB = function(a) {
        return ("0" + a.getDate()).slice(-2)
    }
    ;
    d.dB = function(a) {
        return ("0" + (a.getMonth() + 1)).slice(-2)
    }
    ;
    d.eB = function(a) {
        return a.getFullYear().toString()
    }
    ;
    d.ZE = function(a) {
        var b = a % 60;
        a /= 60;
        var c = 0;
        return 60 <= a ? (c = a / 60,
        [Math.floor(c), this.ql(a % 60), this.ql(b)].join(":")) : [Math.floor(a), this.ql(b)].join(":")
    }
    ;
    d.ql = function(a) {
        a = Math.floor(a);
        return 9 < a ? a : "0" + a
    }
    ;
    function gd(a, b) {
        switch (a) {
        case "de":
            return new fd(".","DD.MM.YYYY");
        case "fr":
            return new fd(" ","DD/MM/YYYY");
        case "ru":
            return new fd(" ","DD.MM.YYYY");
        case "nl":
        case "es":
        case "it":
        case "pt":
            return new fd("","DD/MM/YYYY");
        case "en":
            switch (b) {
            case "GB":
                return new fd(",","DD/MM/YYYY")
            }
            return new fd(",","MM/DD/YYYY");
        default:
            return new fd(",","YYYY/MM/DD")
        }
    }
    ;function hd(a) {
        var b = [];
        a = id(a);
        for (var c in a)
            b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
        return b.join("&")
    }
    function id(a) {
        var b = {}, c;
        for (c in a) {
            var e = a[c];
            "undefined" !== typeof e && null !== e && "" !== e && (b[c] = jd(e || 0))
        }
        return b
    }
    function jd(a) {
        if (!isNaN(a)) {
            var b = parseInt(a, 10);
            if (!isNaN(b))
                return Number(a)
        }
        if ("string" === typeof a && "" === a.trim())
            return a;
        b = String(a).toLowerCase();
        return "true" === b || !0 == a ? !0 : "false" === b || !1 == a ? !1 : a
    }
    function kd(a) {
        a = a.replace(/^\?/, "");
        a = a.split("&");
        for (var b = {}, c, e = 0, f = a.length; e < f; ++e)
            c = a[e].split("="),
            b[c.shift()] = jd(c.join("="));
        return b
    }
    function ld(a, b) {
        zc(b) || (a += "?" + hd(b));
        return a
    }
    ;function md(a, b) {
        this.g = a;
        this.l = b;
        this.b = null
    }
    md.$inject = ["applicationPath", "$http"];
    md.prototype.load = function(a, b) {
        var c = x(function(a) {
            this.k(a);
            b()
        }, this)
          , e = this.g + a.replace(/(.*)/, "/locale/messages-$1.json");
        this.l.get(e).success(c).error(Gc(c))
    }
    ;
    md.prototype.h = function(a, b, c) {
        var e = a;
        zc(this.b) || (b = this.j(a, b),
        c && a == this.b[b] && this.b[c] ? e = this.b[c] : this.b[b] && (e = this.b[b]));
        return e
    }
    ;
    md.prototype.k = function(a) {
        this.b = a || {}
    }
    ;
    md.prototype.j = function(a, b) {
        var c = String(a + b).toLowerCase(), e = 0, f, g;
        for (f = 0; f < c.length; ++f)
            g = c.charCodeAt(f),
            e = (e << 5) - e + g,
            e &= -2147483649;
        return String(e)
    }
    ;
    md.inject = ["applicationPath", "$http"];
    function nd(a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = this.g = !1;
        this.Ao = !0
    }
    nd.prototype.FJ = function() {}
    ;
    nd.prototype.pb = function() {}
    ;
    nd.prototype.stopPropagation = function() {
        this.g = !0
    }
    ;
    nd.prototype.preventDefault = function() {
        this.defaultPrevented = !0;
        this.Ao = !1
    }
    ;
    function od(a) {
        od[" "](a);
        return a
    }
    od[" "] = q;
    var pd = !F || Rb(9)
      , qd = !F || Rb(9)
      , rd = F && !G("9");
    !Bb || G("528");
    Ab && G("1.9b") || F && G("8") || zb && G("9.5") || Bb && G("528");
    Ab && !G("8") || F && G("9");
    function sd(a) {
        return Bb ? "webkit" + a : zb ? "o" + a.toLowerCase() : a.toLowerCase()
    }
    sd("AnimationStart");
    sd("AnimationEnd");
    sd("AnimationIteration");
    sd("TransitionEnd");
    function td(a, b) {
        nd.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.charCode = this.keyCode = this.h = this.screenY = this.screenX = this.clientY = this.clientX = this.l = this.k = 0;
        this.j = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.o = !1;
        this.b = null;
        a && this.cv(a, b)
    }
    A(td, nd);
    var ud = [1, 4, 2];
    d = td.prototype;
    d.cv = function(a, b) {
        var c = this.type = a.type;
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        var e = a.relatedTarget;
        if (e) {
            if (Ab) {
                var f;
                t: {
                    try {
                        od(e.nodeName);
                        f = !0;
                        break t
                    } catch (g) {}
                    f = !1
                }
                f || (e = null)
            }
        } else
            "mouseover" == c ? e = a.fromElement : "mouseout" == c && (e = a.toElement);
        this.relatedTarget = e;
        this.k = Bb || void 0 !== a.offsetX ? a.offsetX : a.layerX;
        this.l = Bb || void 0 !== a.offsetY ? a.offsetY : a.layerY;
        this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
        this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY;
        this.screenX = a.screenX || 0;
        this.screenY = a.screenY || 0;
        this.h = a.button;
        this.keyCode = a.keyCode || 0;
        this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.j = a.metaKey;
        this.o = ub ? a.metaKey : a.ctrlKey;
        this.state = a.state;
        this.b = a;
        a.defaultPrevented && this.preventDefault()
    }
    ;
    d.JJ = function(a) {
        return pd ? this.b.button == a : "click" == this.type ? 0 == a : !!(this.b.button & ud[a])
    }
    ;
    d.YR = function() {
        return this.JJ(0) && !(Bb && ub && this.ctrlKey)
    }
    ;
    d.stopPropagation = function() {
        td.B.stopPropagation.call(this);
        this.b.stopPropagation ? this.b.stopPropagation() : this.b.cancelBubble = !0
    }
    ;
    d.preventDefault = function() {
        td.B.preventDefault.call(this);
        var a = this.b;
        if (a.preventDefault)
            a.preventDefault();
        else if (a.returnValue = !1,
        rd)
            try {
                if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)
                    a.keyCode = -1
            } catch (b) {}
    }
    ;
    d.YP = function() {
        return this.b
    }
    ;
    d.FJ = function() {}
    ;
    var vd = "closure_listenable_" + (1E6 * Math.random() | 0);
    function wd(a) {
        try {
            return !(!a || !a[vd])
        } catch (b) {
            return !1
        }
    }
    var xd = 0;
    function yd(a, b, c, e, f, g) {
        this.listener = a;
        this.j = b;
        this.src = c;
        this.type = e;
        this.b = !!f;
        this.Ec = g;
        this.key = ++xd;
        this.g = this.Wg = !1
    }
    yd.prototype.h = function() {
        this.g = !0;
        this.Ec = this.src = this.j = this.listener = null
    }
    ;
    function zd(a) {
        this.src = a;
        this.b = {};
        this.g = 0
    }
    d = zd.prototype;
    d.bv = function() {
        return this.g
    }
    ;
    d.qR = function() {
        var a = 0, b;
        for (b in this.b)
            a += this.b[b].length;
        return a
    }
    ;
    d.add = function(a, b, c, e, f) {
        var g = this.b[a];
        g || (g = this.b[a] = [],
        this.g++);
        var k = Ad(g, b, e, f);
        -1 < k ? (a = g[k],
        c || (a.Wg = !1)) : (a = new yd(b,null,this.src,a,!!e,f),
        a.Wg = c,
        g.push(a));
        return a
    }
    ;
    d.remove = function(a, b, c, e) {
        if (!(a in this.b))
            return !1;
        var f = this.b[a];
        b = Ad(f, b, c, e);
        return -1 < b ? (f[b].h(),
        H.splice.call(f, b, 1),
        0 == f.length && (delete this.b[a],
        this.g--),
        !0) : !1
    }
    ;
    d.Zm = function(a) {
        var b = a.type;
        if (!(b in this.b))
            return !1;
        var c = jc(this.b[b], a);
        c && (a.h(),
        0 == this.b[b].length && (delete this.b[b],
        this.g--));
        return c
    }
    ;
    d.zD = function(a) {
        var b = 0, c;
        for (c in this.b)
            if (!a || c == a) {
                for (var e = this.b[c], f = 0; f < e.length; f++)
                    ++b,
                    e[f].h();
                delete this.b[c];
                this.g--
            }
        return b
    }
    ;
    d.Rq = function(a, b) {
        var c = this.b[a]
          , e = [];
        if (c)
            for (var f = 0; f < c.length; ++f) {
                var g = c[f];
                g.b == b && e.push(g)
            }
        return e
    }
    ;
    d.wj = function(a, b, c, e) {
        a = this.b[a];
        var f = -1;
        a && (f = Ad(a, b, c, e));
        return -1 < f ? a[f] : null
    }
    ;
    d.yD = function(a, b) {
        var c = s(a)
          , e = s(b);
        return tc(this.b, function(f) {
            for (var g = 0; g < f.length; ++g)
                if (!(c && f[g].type != a || e && f[g].b != b))
                    return !0;
            return !1
        })
    }
    ;
    function Ad(a, b, c, e) {
        for (var f = 0; f < a.length; ++f) {
            var g = a[f];
            if (!g.g && g.listener == b && g.b == !!c && g.Ec == e)
                return f
        }
        return -1
    }
    ;var Bd = "closure_lm_" + (1E6 * Math.random() | 0)
      , Cd = {}
      , Dd = 0;
    function Ed(a, b, c, e, f) {
        if (t(b)) {
            for (var g = 0; g < b.length; g++)
                Ed(a, b[g], c, e, f);
            return null
        }
        c = Fd(c);
        return wd(a) ? a.sc(b, c, e, f) : Gd(a, b, c, !1, e, f)
    }
    function Gd(a, b, c, e, f, g) {
        if (!b)
            throw Error("Invalid event type");
        var k = !!f
          , l = Hd(a);
        l || (a[Bd] = l = new zd(a));
        c = l.add(b, c, e, f, g);
        if (c.j)
            return c;
        e = Id();
        c.j = e;
        e.src = a;
        e.listener = c;
        a.addEventListener ? a.addEventListener(b, e, k) : a.attachEvent(b in Cd ? Cd[b] : Cd[b] = "on" + b, e);
        Dd++;
        return c
    }
    function Id() {
        var a = Jd
          , b = qd ? function(c) {
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
    function Ld(a, b, c, e, f) {
        if (t(b)) {
            for (var g = 0; g < b.length; g++)
                Ld(a, b[g], c, e, f);
            return null
        }
        c = Fd(c);
        return wd(a) ? a.EJ(b, c, e, f) : Gd(a, b, c, !0, e, f)
    }
    function Md(a, b, c, e, f) {
        if (t(b)) {
            for (var g = 0; g < b.length; g++)
                Md(a, b[g], c, e, f);
            return null
        }
        c = Fd(c);
        if (wd(a))
            return a.dh(b, c, e, f);
        if (!a)
            return !1;
        e = !!e;
        if (a = Hd(a))
            if (b = a.wj(b, c, e, f))
                return Nd(b);
        return !1
    }
    function Nd(a) {
        if (fa(a) || !a || a.g)
            return !1;
        var b = a.src;
        if (wd(b))
            return b.Pm(a);
        var c = a.type
          , e = a.j;
        b.removeEventListener ? b.removeEventListener(c, e, a.b) : b.detachEvent && b.detachEvent(c in Cd ? Cd[c] : Cd[c] = "on" + c, e);
        Dd--;
        (c = Hd(b)) ? (c.Zm(a),
        0 == c.bv() && (c.src = null,
        b[Bd] = null)) : a.h();
        return !0
    }
    function Od(a, b, c, e) {
        var f = 1;
        if (a = Hd(a))
            if (b = a.b[b])
                for (b = lc(b),
                a = 0; a < b.length; a++) {
                    var g = b[a];
                    g && g.b == c && !g.g && (f &= !1 !== Pd(g, e))
                }
        return Boolean(f)
    }
    function Pd(a, b) {
        var c = a.listener
          , e = a.Ec || a.src;
        a.Wg && Nd(a);
        return c.call(e, b)
    }
    function Jd(a, b) {
        if (a.g)
            return !0;
        if (!qd) {
            var c = b || m("window.event")
              , e = new td(c,this)
              , f = !0;
            if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                t: {
                    var g = !1;
                    if (0 == c.keyCode)
                        try {
                            c.keyCode = -1;
                            break t
                        } catch (k) {
                            g = !0
                        }
                    if (g || void 0 == c.returnValue)
                        c.returnValue = !0
                }
                c = [];
                for (g = e.currentTarget; g; g = g.parentNode)
                    c.push(g);
                for (var g = a.type, l = c.length - 1; !e.g && 0 <= l; l--)
                    e.currentTarget = c[l],
                    f &= Od(c[l], g, !0, e);
                for (l = 0; !e.g && l < c.length; l++)
                    e.currentTarget = c[l],
                    f &= Od(c[l], g, !1, e)
            }
            return f
        }
        return Pd(a, new td(b,this))
    }
    function Hd(a) {
        a = a[Bd];
        return a instanceof zd ? a : null
    }
    var Qd = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
    function Fd(a) {
        return w(a) ? a : a[Qd] || (a[Qd] = function(b) {
            return a.handleEvent(b)
        }
        )
    }
    ;function Rd() {
        this.g = new zd(this);
        this.da = this
    }
    A(Rd, ad);
    Rd.prototype[vd] = !0;
    d = Rd.prototype;
    d.Pk = null;
    d.Gq = function() {
        return this.Pk
    }
    ;
    d.MS = function(a) {
        this.Pk = a
    }
    ;
    d.addEventListener = function(a, b, c, e) {
        Ed(this, a, b, c, e)
    }
    ;
    d.removeEventListener = function(a, b, c, e) {
        Md(this, a, b, c, e)
    }
    ;
    d.dispatchEvent = function(a) {
        this.Fq();
        var b, c = this.Gq();
        if (c) {
            b = [];
            for (var e = 1; c; c = c.Gq())
                b.push(c),
                ++e
        }
        c = this.da;
        e = a.type || a;
        if (v(a))
            a = new nd(a,c);
        else if (a instanceof nd)
            a.target = a.target || c;
        else {
            var f = a;
            a = new nd(e,c);
            Ec(a, f)
        }
        var f = !0, g;
        if (b)
            for (var k = b.length - 1; !a.g && 0 <= k; k--)
                g = a.currentTarget = b[k],
                f = g.Dh(e, !0, a) && f;
        a.g || (g = a.currentTarget = c,
        f = g.Dh(e, !0, a) && f,
        a.g || (f = g.Dh(e, !1, a) && f));
        if (b)
            for (k = 0; !a.g && k < b.length; k++)
                g = a.currentTarget = b[k],
                f = g.Dh(e, !1, a) && f;
        return f
    }
    ;
    d.T = function() {
        Rd.B.T.call(this);
        this.cG();
        this.Pk = null
    }
    ;
    d.sc = function(a, b, c, e) {
        this.Fq();
        return this.g.add(String(a), b, !1, c, e)
    }
    ;
    d.EJ = function(a, b, c, e) {
        return this.g.add(String(a), b, !0, c, e)
    }
    ;
    d.dh = function(a, b, c, e) {
        return this.g.remove(String(a), b, c, e)
    }
    ;
    d.Pm = function(a) {
        return this.g.Zm(a)
    }
    ;
    d.cG = function(a) {
        return this.g ? this.g.zD(a) : 0
    }
    ;
    d.Dh = function(a, b, c) {
        a = this.g.b[String(a)];
        if (!a)
            return !0;
        a = lc(a);
        for (var e = !0, f = 0; f < a.length; ++f) {
            var g = a[f];
            if (g && !g.g && g.b == b) {
                var k = g.listener
                  , l = g.Ec || g.src;
                g.Wg && this.Pm(g);
                e = !1 !== k.call(l, c) && e
            }
        }
        return e && !1 != c.Ao
    }
    ;
    d.Rq = function(a, b) {
        return this.g.Rq(String(a), b)
    }
    ;
    d.Rx = function(a, b, c, e) {
        return this.g.wj(String(a), b, c, e)
    }
    ;
    d.pR = function(a, b) {
        var c = s(a) ? String(a) : void 0;
        return this.g.yD(c, b)
    }
    ;
    d.TS = function(a) {
        this.da = a
    }
    ;
    d.Fq = function() {}
    ;
    function Sd(a, b) {
        Rd.call(this);
        this.b = a || 1;
        this.h = b || h;
        this.j = x(this.ow, this);
        this.k = z()
    }
    A(Sd, Rd);
    d = Sd.prototype;
    d.enabled = !1;
    d.Eb = null;
    d.Kk = function() {
        return this.b
    }
    ;
    d.jg = function(a) {
        this.b = a;
        this.Eb && this.enabled ? (this.mb(),
        this.yc()) : this.Eb && this.mb()
    }
    ;
    d.ow = function() {
        if (this.enabled) {
            var a = z() - this.k;
            0 < a && a < 0.8 * this.b ? this.Eb = this.h.setTimeout(this.j, this.b - a) : (this.Eb && (this.h.clearTimeout(this.Eb),
            this.Eb = null),
            this.kw(),
            this.enabled && (this.Eb = this.h.setTimeout(this.j, this.b),
            this.k = z()))
        }
    }
    ;
    d.kw = function() {
        this.dispatchEvent("tick")
    }
    ;
    d.yc = function() {
        this.enabled = !0;
        this.Eb || (this.Eb = this.h.setTimeout(this.j, this.b),
        this.k = z())
    }
    ;
    d.mb = function() {
        this.enabled = !1;
        this.Eb && (this.h.clearTimeout(this.Eb),
        this.Eb = null)
    }
    ;
    d.T = function() {
        Sd.B.T.call(this);
        this.mb();
        delete this.h
    }
    ;
    function Td(a, b, c) {
        if (w(a))
            c && (a = x(a, c));
        else if (a && "function" == typeof a.handleEvent)
            a = x(a.handleEvent, a);
        else
            throw Error("Invalid listener argument");
        return 2147483647 < b ? -1 : h.setTimeout(a, b || 0)
    }
    ;function Ud(a, b, c) {
        this.b = a;
        this.k = b || 0;
        this.g = c;
        this.j = x(this.h, this)
    }
    A(Ud, ad);
    d = Ud.prototype;
    d.ob = 0;
    d.T = function() {
        Ud.B.T.call(this);
        this.ng();
        delete this.b;
        delete this.g
    }
    ;
    d.Li = function(a) {
        this.ng();
        this.ob = Td(this.j, s(a) ? a : this.k)
    }
    ;
    d.ng = function() {
        this.isActive() && h.clearTimeout(this.ob);
        this.ob = 0
    }
    ;
    d.DJ = function() {
        this.ng();
        this.h()
    }
    ;
    d.NP = function() {
        this.isActive() && this.DJ()
    }
    ;
    Ud.prototype.isActive = function() {
        return 0 != this.ob
    }
    ;
    Ud.prototype.h = function() {
        this.ob = 0;
        this.b && this.b.call(this.g)
    }
    ;
    function Vd(a, b) {
        this.h = a;
        this.g = b;
        this.b = new Ud(x(this.j, this),0,this)
    }
    A(Vd, ad);
    d = Vd.prototype;
    d.af = 0;
    d.Ni = 0;
    d.Mi = !1;
    d.T = function() {
        this.b.pb();
        delete this.h;
        delete this.g;
        Vd.B.T.call(this)
    }
    ;
    d.eA = function(a, b) {
        this.PA();
        this.Mi = !1;
        var c = b || 0;
        this.af = Math.max(a || 0, 0);
        this.Ni = 0 > c ? -1 : z() + c;
        this.b.Li(0 > c ? this.af : Math.min(this.af, c))
    }
    ;
    d.PA = function() {
        this.b.ng()
    }
    ;
    Vd.prototype.isActive = function() {
        return this.b.isActive()
    }
    ;
    Vd.prototype.l = function() {
        return this.Mi
    }
    ;
    Vd.prototype.Bc = function() {}
    ;
    Vd.prototype.k = function() {}
    ;
    Vd.prototype.j = function() {
        if (this.h.call(this.g))
            this.Mi = !0,
            this.Bc();
        else if (0 > this.Ni)
            this.b.Li(this.af);
        else {
            var a = this.Ni - z();
            0 >= a ? this.k() : this.b.Li(Math.min(this.af, a))
        }
    }
    ;
    function Wd(a, b, c) {
        this.j = a;
        this.h = b;
        this.g = c;
        this.b = x(this.ev, this)
    }
    A(Wd, ad);
    d = Wd.prototype;
    d.te = !1;
    d.Sf = 0;
    d.Zc = null;
    d.Xo = function() {
        this.Zc || this.Sf ? this.te = !0 : this.fl()
    }
    ;
    d.dp = function() {
        this.Zc && (h.clearTimeout(this.Zc),
        this.Zc = null,
        this.te = !1)
    }
    ;
    d.Yz = function() {
        this.Sf++
    }
    ;
    d.Zz = function() {
        this.Sf--;
        this.Sf || !this.te || this.Zc || (this.te = !1,
        this.fl())
    }
    ;
    d.T = function() {
        Wd.B.T.call(this);
        this.dp()
    }
    ;
    d.ev = function() {
        this.Zc = null;
        this.te && !this.Sf && (this.te = !1,
        this.fl())
    }
    ;
    d.fl = function() {
        this.Zc = Td(this.b, this.h);
        this.j.call(this.g)
    }
    ;
    function Xd() {}
    d = Xd.prototype;
    d.qA = function(a, b) {
        return new Vd(a,b)
    }
    ;
    d.it = function(a, b, c) {
        return new Wd(a,b,c)
    }
    ;
    d.Wb = function() {
        return new Date
    }
    ;
    d.ni = function(a, b) {
        return setInterval(a, b)
    }
    ;
    d.ih = function(a) {
        clearInterval(a)
    }
    ;
    d.setTimeout = function(a, b) {
        return setTimeout(a, b)
    }
    ;
    d.clearTimeout = function(a) {
        clearTimeout(a)
    }
    ;
    function Yd(a, b, c) {
        this.J = a;
        this.k = b;
        this.l = c;
        this.j = this.b = this.Fa = this.h = null;
        this.g = 1;
        this.Kt()
    }
    Yd.$inject = ["$window", "messages", "timeService"];
    d = Yd.prototype;
    d.GG = function(a) {
        !this.Fa || this.Dk(this.Fa) ? this.l.setTimeout(a, 0) : this.k.load(this.Fa, a)
    }
    ;
    d.S = function(a) {
        if (!a)
            return "";
        if (-1 == a.indexOf("[["))
            return a;
        var b = "", c, e = 0;
        do
            if (c = a.indexOf("[[", e),
            0 < e && (e += 2),
            0 <= c ? (b += a.slice(e, c),
            e = a.indexOf("]]", c)) : (b += a.slice(e),
            e = -1),
            0 <= c && 0 <= e)
                var f = a.slice(c + 2, e)
                  , b = b + this.NJ(f);
        while (0 <= c && 0 <= e);
        return b
    }
    ;
    d.yd = function(a) {
        return this.h.YE(a)
    }
    ;
    d.Gg = function(a) {
        return this.h.ZE(a)
    }
    ;
    d.mx = function(a) {
        return this.h.XE(a)
    }
    ;
    d.CF = function() {
        return I(["ja_JP", "zh_CN", "zh_HK", "zh_TW"], this.Fa)
    }
    ;
    d.Kt = function() {
        this.gD() ? this.g = 4 : this.eD() ? this.g = 2 : this.fD() ? this.g = 3 : this.hD();
        this.iD()
    }
    ;
    d.iD = function() {
        this.b = this.Fa.split("_")[0];
        this.h = gd(this.b, this.j)
    }
    ;
    d.Tk = function(a) {
        a && 1 < a.indexOf("_") && (this.j = a.split("_")[1])
    }
    ;
    d.NJ = function(a) {
        var b = a.split("|");
        if (2 > b.length)
            return a;
        var c;
        (a = b[b.length - 1]) && !isNaN(a) && (c = b.pop());
        a = b.pop();
        b = b.join("|");
        return this.k.h(b, a, c)
    }
    ;
    d.gD = function() {
        var a = kd(this.J.location.search).hl || ""
          , a = a.replace("-", "_");
        this.Fa = this.Tr(a);
        this.Tk(a);
        return !!this.Fa
    }
    ;
    d.eD = function() {
        var a = this.J && this.J.environment && this.J.environment.language;
        if (a)
            for (var b = this.EG(a), c = 0; c < b.length; ++c)
                if (a = this.Sr(b[c])) {
                    if (this.Dk(a))
                        break;
                    this.Fa = a;
                    this.Tk(b[c]);
                    return !0
                }
        return !1
    }
    ;
    d.fD = function() {
        var a = (this.J.navigator.language || this.J.navigator.userLanguage || this.J.navigator.systemLanguage || this.J.navigator.browserLanguage || "").replace("-", "_");
        this.Fa = this.Tr(a);
        this.Tk(a);
        return !!this.Fa
    }
    ;
    d.EG = function(a) {
        return fc(a.split(","), function(a) {
            return Xa(a.split(";")[0].replace("-", "_"))
        })
    }
    ;
    d.Sr = function(a) {
        if (/^[\s\xa0]*$/.test(null == a ? "" : String(a)) || 2 > a.length)
            return null;
        var b = ic(La, this.tl, a);
        if (!b)
            for (var c in Ma)
                if (ic(Ma[c], this.tl, a)) {
                    b = Ka[c];
                    break
                }
        !b && 1 < a.indexOf("_") && (b = ic(La, this.tl, a.split("_")[0]));
        return b
    }
    ;
    d.tl = function(a) {
        return 0 == Ya(this, a.substr(0, this.length))
    }
    ;
    d.Tr = function(a) {
        a = this.Sr(a);
        return !this.Dk(a) && a || null
    }
    ;
    d.Dk = function(a) {
        return "en_US" == a
    }
    ;
    d.hD = function() {
        this.Fa = "en_US"
    }
    ;
    Yd.inject = ["$window", "messages", "timeService"];
    function Zd(a, b) {
        var c = a.split(b)
          , e = c.shift();
        c.forEach(function(a) {
            var b = e;
            a = a && a.length ? a.charAt(0).toUpperCase() + a.slice(1) : a;
            e = b + a
        });
        return e
    }
    function $d(a) {
        return a ? a.toLowerCase().replace(/(^\s+|\s+$)/g, "").replace(/\s+/g, "-").replace(/[^a-z0-9_\-]/g, "") : ""
    }
    function ae(a, b) {
        if (isNaN(a))
            return "0%";
        b = isNaN(b) ? 100 : b;
        return Math.round(a * b) + "%"
    }
    function be(a, b, c, e) {
        return a.replace(/\{([^\{]*)\}([\/])*/gm, function(a, g, k) {
            (a = b[g]) && e && (a = encodeURIComponent(encodeURIComponent(a)));
            a && k && (a += "/");
            return void 0 !== a ? (c && (b[g] = null),
            a) : ""
        })
    }
    ;function ce(a) {
        this.J = a;
        this.b = {}
    }
    ce.prototype.xa = function(a) {
        switch (a) {
        case 7:
            this.b = {
                917525: 177,
                917526: 176
            };
            break;
        case 1:
            this.b = {
                412: 227,
                413: 178,
                415: 250,
                417: 228,
                424: 177,
                425: 176,
                461: 27
            };
            break;
        case 2:
            this.b = {
                917507: 19,
                917523: 227,
                917524: 228,
                917528: 250,
                917777: 27
            };
            break;
        case 3:
            this.b = {
                195: 227,
                196: 228,
                425: 176,
                424: 177
            };
            break;
        case 4:
            this.b = {
                29443: 13,
                29460: 38,
                29461: 40,
                4: 37,
                5: 39,
                27: -1,
                69: 227,
                70: 178,
                71: 250,
                72: 228,
                74: 19,
                8: 27,
                88: 27,
                1078: 176,
                1080: 177
            };
            break;
        case 5:
            this.b = {
                415: 250,
                19: 19,
                413: 178,
                465: 228,
                417: 228,
                412: 227,
                425: 176,
                463: 177,
                424: 177
            };
            break;
        case 6:
            this.b = {
                238: 227,
                239: 228
            };
            break;
        case 8:
            this.b = {
                461: 27,
                415: 250,
                413: 178,
                417: 228,
                412: 227,
                48: 83
            };
            break;
        case 9:
            this.b = {
                166: 27,
                113: 227,
                114: 228,
                115: 177,
                116: 176
            }
        }
        this.J.VK_FAST_FWD && (this.b[this.J.VK_FAST_FWD] = 228);
        this.J.VK_REWIND && (this.b[this.J.VK_REWIND] = 227);
        this.J.VK_TRACK_PREV && (this.b[this.J.VK_TRACK_PREV] = 177);
        this.J.VK_TRACK_NEXT && (this.b[this.J.VK_TRACK_NEXT] = 176);
        this.J.VK_PLAY && (this.b[this.J.VK_PLAY] = 250);
        this.J.VK_STOP && (this.b[this.J.VK_STOP] = 178)
    }
    ;
    ce.prototype.g = function(a) {
        return this.b[a] || a
    }
    ;
    ce.inject = ["window"];
    function de(a, b, c, e, f, g) {
        this.J = a;
        this.Xa = b;
        this.K = c;
        this.Ll = e;
        this.Ml = f;
        this.Va = g;
        this.U = this.J && this.J.location || {};
        this.ja = this.da = "";
        this.Pc = [];
        this.Xf = [];
        this.WJ = "TVHTML5";
        this.VJ = "4";
        this.b = this.h = "";
        this.o = new Vc;
        this.Ma = {};
        this.td = this.qd = this.ye = this.rd = this.zl = this.$s = this.wl = this.Bl = this.Zs = this.Wa = this.Fl = this.Aa = this.yl = this.$ = this.xl = this.at = this.X = this.El = this.Gl = this.Wh = this.Xh = this.Ys = this.kb = this.Vf = this.Ba = this.Jl = this.bt = this.ud = this.Yh = this.sd = !1;
        this.De = this.ze = this.Cl = this.D = this.Ee = this.Ea = this.Na = "";
        this.jb = null;
        this.pa = 0;
        this.F = {};
        this.forcedExperiments = this.Wf = this.fa = this.A = this.Uf = this.cssPrefix = this.va = "";
        this.Ce = new Vc;
        this.forcedOffExperiments = "";
        this.Ae = new Vc;
        this.gdataRegionId = "";
        this.initAutoplay = 1;
        this.initSearchQuery = this.initRow = this.initPlaylistId = this.initDialog = this.initChannelId = "";
        this.initTime = 0;
        this.additionalDataUrlForDial = this.initReversePairingCode = this.initVideoId = "";
        this.isChromelessContext = this.isPlayOnlyContext = this.j = this.l = this.Vh = this.p = this.g = this.Rh = !1;
        this.Il = !0;
        this.XJ = this.ra = this.isLowPerformingSearch = this.H = this.Uh = this.isLimitedGraphics = this.usePaidScope = this.useInnerTubeWatchNext = this.useReleaseInnerTube = this.useTestInnerTube = this.Th = this.Sh = this.useInnerTube = !1;
        this.keyMapId = 0;
        this.supportsSingleVideoTag = !0;
        this.ul = 5;
        this.reversedSelectionKeys = !1;
        this.Dl = 300;
        this.YJ = 1500;
        this.enableVideoVerificationTokens = !1;
        this.supportsAdaptiveBitrate = !0;
        this.supportsPaidContent = this.supportsNetworkRetry = this.supportsNativeOsk = this.supportsHardwareKeyboard = this.vl = this.supportsDrm = this.O = this.ga = this.Kl = this.supportsCors = !1;
        this.supportsPairing = !0;
        this.supportsSearchSuggestion = this.supportsPointer = !1;
        this.supportsMouseOverSearch = !0;
        this.supportsAnimation = this.xe = this.Be = this.supportsSounds = !1;
        this.supportsTranslateZ = !0;
        this.isVideoInfoVisible = this.Al = this.supportsBackgrounds = this.enhanceHdDrmPlayback = this.supportsLive = this.useStageGdata = !1;
        this.requestVideoQuality = "";
        this.Sa = NaN;
        this.loopRows = !1;
        this.launch = "";
        this.k = !1;
        this.R = "hqdefault";
        this.oc = "channel.banner.tv.image.url";
        this.Fe = this.Hl = !1;
        this.ct = "debugjs env_cssPrefix env_enhanceHdDrmPlayback env_forcedExperiments env_forcedOffExperiments env_gdataRegionId env_isChromelessContext env_isLimitedGraphics env_isLowPerformingSearch env_isVideoInfoVisible env_keyMapId env_reversedSelectionKeys env_supportsAdaptiveBitrate env_supportsAnimation env_supportsBackgrounds env_supportsCors env_supportsDrm env_supportsHardwareKeyboard env_supportsLive env_supportsNetworkRetry env_supportsPaidContent env_supportsPairing env_supportsPointer env_supportsSearchSuggestion env_supportsMouseOverSearch env_supportsSingleVideoTag env_supportsSounds env_supportsTranslateZ env_useInnerTube env_useStageGdata env_useTestInnerTube env_useReleaseInnerTube env_useInnerTubeWatchNext env_requestVideoQuality label loader utest".split(" ");
        this.w = {
            additionalDataUrl: "additionalDataUrlForDial",
            e: "initErrorCode",
            isChromelessContext: "isChromelessContext",
            launch: "launch",
            loopRows: "loopRows",
            pairingCode: "initReversePairingCode",
            reversePairingCode: "initReversePairingCode",
            send_mdx_vvts: "enableVideoVerificationTokens"
        };
        this.w.autoplay = "initAutoplay";
        this.w.c = "initChannelId";
        this.w.dialog = "initDialog";
        this.w.list = "initPlaylistId";
        this.w.q = "initSearchQuery";
        this.w.row = "initRow";
        this.w.t = "initTime";
        this.w.v = "initVideoId";
        this.dt()
    }
    d = de.prototype;
    d.dt = function() {
        this.uH();
        this.iH();
        this.sH();
        this.lH();
        this.kH();
        this.tH();
        this.vH();
        this.rH();
        this.xH();
        this.nH();
        this.oH();
        this.mH();
        this.wH();
        this.qH();
        this.pH();
        this.jH()
    }
    ;
    d.uH = function() {
        this.Cl = this.J.loader;
        this.De = this.J.label;
        var a = this.J.environment || {};
        this.D = a.platform || "";
        this.h = a.brand;
        this.b = a.model;
        this.da = a.browser;
        this.ja = a.browser_version;
        this.Na = a.os;
        this.Ea = a.os_version;
        this.Ee = a.network;
        this.va = a.country;
        this.Sa = a.start_time;
        this.ux(a.experiments);
        this.Ma = a;
        this.Fe = "web-release-qa.youtube.com" == this.J.location.hostname;
        this.Rh = window.devjs;
        this.gdataRegionId = I(Aa, this.va) ? this.va : ""
    }
    ;
    d.iH = function() {
        if ("Steel" == this.da)
            this.Ba = this.Jl = !0;
        else if (this.Qc("Explorer"))
            this.Yh = !0;
        else if (this.Qc("Opera"))
            this.p = !0;
        else if (this.Qc("Firefox"))
            this.ud = !0;
        else if (this.Qc("Mozilla") || this.ud)
            this.bt = !0;
        else if (this.Qc("Chrome") || this.Qc("GoogleTV"))
            this.Ba = !0
    }
    ;
    d.sH = function() {
        this.kb = !(!this.h && !this.b);
        this.A = "YouTube TV";
        switch (this.h && this.h.toLowerCase()) {
        case "boxee":
            this.sd = !0;
            this.A = "Boxee";
            break;
        case "cht":
            this.Vf = !0;
            break;
        case "grundig":
            this.Xh = !0;
            break;
        case "humax":
        case "freesat":
        case "freesat/1.0":
            this.Wh = !0;
            break;
        case "realtek":
            this.at = !0;
            break;
        case "roku":
            this.xl = !0;
            break;
        case "sharp":
            this.yl = !0;
            break;
        case "sony":
            this.Aa = !0;
            "PS3" !== this.b && (this.Fl = !0);
            break;
        case "samsung":
            this.$ = !0;
            break;
        case "lg":
            this.X = !0;
            break;
        case "panasonic":
            this.Wa = !0;
            this.H || (this.Zs = !0);
            break;
        case "philipstv":
            this.Bl = !0;
            break;
        case "pioneer":
            this.wl = !0;
            break;
        case "pure":
            this.$s = !0;
            break;
        case "telecomitalia":
            this.Gl = !0;
            break;
        case "toshiba":
            this.zl = !0;
            -1 < this.b.indexOf("13A_NAEU_") && (this.ye = this.rd = !0);
            if (-1 < this.b.indexOf("14A_NAEU_") || -1 < this.b.indexOf("14A_AS_"))
                this.ye = !0;
            break;
        case "tivo":
            this.qd = !0;
            break;
        case "vizio":
            this.td = !0
        }
        switch (this.b && this.b.toLowerCase()) {
        case "ps3":
            this.Aa && (this.l = !0,
            this.A = "Sony PS3");
            break;
        case "eureka":
            "Google" === this.h && (this.g = !0,
            this.A = "Chromecast",
            this.isChromelessContext = !0);
            break;
        case "nexus foo":
            this.Vh = !0;
            break;
        case "ipc1100":
        case "vms1100":
            this.El = "MMI" === this.h;
            break;
        case "viera":
            this.A = "Viera";
            break;
        case "wiiu":
            this.j = !0;
            this.A = "Wii U";
            break;
        case "xboxone":
            this.k = !0,
            this.A = "Xbox One"
        }
        this.Qc("GoogleTV") && (this.Ys = !0);
        this.Ba = this.Ba || this.X || this.$;
        this.keyMapId = this.Bt();
        this.jb = this.j ? "NINTENDO" : null;
        this.cssPrefix = this.At();
        "tv" === this.D.toLowerCase() ? this.fa = "tv" : this.kb || (this.fa = "desktop")
    }
    ;
    d.lH = function() {}
    ;
    d.kH = function() {
        this.Il = !this.Wa;
        this.Kl = this.l || this.j || this.k;
        this.supportsSingleVideoTag = !this.sd;
        this.ga = this.O = !!this.Ma.debug;
        this.supportsDrm = !this.l;
        this.enhanceHdDrmPlayback = this.j || this.g || this.k || this.Vh;
        this.vl = this.kb;
        this.supportsHardwareKeyboard = this.Wa && !this.p || this.Jl || this.X || !this.kb || this.qd || this.td;
        this.supportsNativeOsk = this.j;
        this.supportsNetworkRetry = this.g;
        this.supportsPointer = this.X;
        this.Be = this.j;
        this.Vl = !this.k;
        var a = vb();
        if (a && this.g && (a = /CrKey [A-Za-z0-9_]+ ([0-9\.]+)/.exec(a)) && 1 < a.length) {
            var b = a[1].split(".")
              , a = 0 < b.length && parseInt(b[0], 10) || 0
              , b = 1 < b.length && parseInt(b[1], 10) || 0;
            if (1 < a || 1 == a && 1 <= b)
                this.xe = !0
        }
    }
    ;
    d.tH = function() {
        this.supportsPaidContent = !this.l
    }
    ;
    d.vH = function() {
        this.Ml.isSupported() && (this.reversedSelectionKeys = this.Ml.areKeysReversed)
    }
    ;
    d.rH = function() {
        this.H = this.Wa && ("DMP-BD79_89" === this.b || "DMP-MS10" === this.b || this.gc("BD 13S01") || this.gc("BD 13S02") || this.gc("BDT220"));
        this.Aa && (this.ra = !this.b || "N/A" == this.b || this.gc("BDP") || this.gc("CTV") || this.gc("Presto/2.10") || this.gc("BRAVIA") && this.gc("mips"));
        var a = this.yl && 0 <= "LE750 LE751 LE752 LE650 LE651 LE652".split(" ").indexOf(this.b)
          , b = this.td && "ISV-B11" == this.b
          , c = this.rd || this.zl && ("BDX3400KU" === this.b || "BDX5400KU" === this.b)
          , e = this.wl && "BDP-160" === this.b
          , f = this.$ && ("BD-F5500" === this.b || "BD-F5700" === this.b || "BD-FM57C" === this.b || "BD-HM57C" === this.b || "BD-H5100" === this.b || "BD-HM51" === this.b || "BD-F5500" === this.b || "BD-F5500K" === this.b || "HT-F4500" === this.b || "BD-H5500" === this.b || "BD-H5500K" === this.b || "BD-H5900" === this.b || "BD-HM59" === this.b || "HT-H4200" === this.b || "HT-H4500" === this.b || "HT-H4500K" === this.b || "HT-H5200" === this.b || "HT-H5500" === this.b || "HT-H5500K" === this.b || "HT-H5500W" === this.b || "HT-H5500WK" === this.b || "HT-H4200R" === this.b || "HT-H4500R" === this.b);
        this.isLimitedGraphics = this.ra || this.H || c || e || this.sd || this.xl || a || b || f;
        this.Uh = this.Aa && !this.l;
        this.supportsAnimation = !this.isLimitedGraphics;
        this.isLowPerformingSearch = this.H;
        this.supportsSearchSuggestion = !this.H && !this.j && !I(["zh_CN", "zh_HK", "ja_JP", "ko_KR", "zh_TW"], this.Xa.Fa);
        this.supportsBackgrounds = !this.isLimitedGraphics && !this.isPlayOnlyContext && !this.g;
        if (this.ra || this.H || c)
            this.Dl = 1E3;
        this.supportsTranslateZ = this.supportsAnimation && !this.p
    }
    ;
    d.oH = function() {
        this.l || (this.enableVideoVerificationTokens = !0);
        var a = this.useInnerTube || this.useTestInnerTube || this.useReleaseInnerTube;
        this.Sh = this.Ib(va) || a;
        this.Th = this.Ib(wa) || a;
        this.useInnerTube = a || this.Th || this.Sh;
        this.useInnerTubeWatchNext = this.useInnerTubeWatchNext || this.Ib(xa);
        this.usePaidScope = this.Ib(sa);
        this.supportsSounds = this.supportsSounds || this.Ib(qa) && this.l || this.LA(qa);
        this.Al = this.supportsBackgrounds && !this.Bl && !this.qd;
        this.supportsCors = this.supportsCors || !(this.p && this.gc("11.10")) && this.Ib(ua);
        if (this.l || this.j)
            this.Hl = !0;
        this.Ib(ra) && (this.ul = 10);
        this.supportsMouseOverSearch = !this.k
    }
    ;
    d.xH = function() {
        if (this.U && (this.U.search || this.U.hash)) {
            var a = this.U.search || ""
              , a = a + (this.U.hash || "")
              , a = a.replace(/\#[^\?]*\??/, "&");
            this.eH(a)
        }
    }
    ;
    d.nH = function() {
        this.forcedExperiments && (this.zr(String(this.forcedExperiments), this.Ce),
        this.o.wp(this.Ce));
        this.forcedOffExperiments && (this.zr(String(this.forcedOffExperiments), this.Ae),
        this.o = this.o.Mn(this.Ae))
    }
    ;
    d.mH = function() {
        this.Wf = this.o.sa().map(function(a) {
            return "exp-" + a
        }).join(" ")
    }
    ;
    d.wH = function() {
        var a = []
          , b = $d(this.h);
        b && a.push(b);
        (b = $d(this.b)) && a.push(b);
        this.fa && a.push(this.fa);
        this.p && a.push("opera");
        this.g && a.push("eureka");
        this.rd && a.push("toshiba-mstar");
        this.reversedSelectionKeys && a.push("reversed-keys");
        this.Xa && a.push("lang-" + this.Xa.b);
        this.isLimitedGraphics && a.push("limited-graphics");
        this.ga && this.K.P() && a.push("debug");
        this.supportsPointer && a.push("pointer");
        this.Uf = a.join(" ")
    }
    ;
    d.qH = function() {
        this.Ll.xa(this.keyMapId)
    }
    ;
    d.pH = function() {
        var a = m("screen.width", this.J);
        if (a) {
            var b = function(b) {
                return a >= b[0] && a <= b[1]
            };
            this.R = yc(Pa, b) || this.R;
            this.oc = yc(Qa, b) || this.oc
        }
    }
    ;
    d.jH = function() {
        "desktop" === this.fa ? (this.pa = 100,
        this.F = {}) : this.H || this.ra ? (this.pa = 0,
        this.F = {}) : (this.pa = 0,
        this.F = {},
        this.F.branding = 10);
        this.F.channel_paid_info = 200;
        this.F.video_like_value = 200
    }
    ;
    d.eH = function(a) {
        a = kd(a);
        var b = [], c;
        for (c in a) {
            var e = 0 === c.indexOf("env_")
              , f = e ? c.substr(4) : c
              , g = decodeURIComponent(a[c])
              , g = jd(g);
            this.$ && (f = this.EF(f, g));
            -1 < this.ct.indexOf(c) ? (this.ga = !0,
            "utest" === c ? b.push("domain=" + this.U.hostname) : this.O = !0,
            this.Xf.push(c),
            e ? this[f] = g : "label" === c && (this.ze = g)) : e ? this.Pc.push(c + "=" + g) : (e = "isPlayOnlyContext" == f ? f : this.w[f]) && (this[e] = g);
            b.push(c + "=" + g)
        }
        0 < this.Xf.length && (this.K.push("WARNING: REMOVE DEBUG QUERY PARAMETERS "),
        this.K.push("[" + b.join(", ") + "] "),
        this.K.push("BEFORE PRODUCTION RELEASE."));
        0 < this.Pc.length && (this.K.push("\n\n"),
        this.K.push("ERROR: UNEXPECTED PARAMETER(S): "),
        this.K.push(this.Pc.join(", ")))
    }
    ;
    d.EF = function(a, b) {
        return "isChromelessContext" == a || "launch" == a && ("search" == b || "social" == b) ? "isPlayOnlyContext" : a
    }
    ;
    d.zr = function(a, b) {
        var c = decodeURIComponent(a).split(","), e;
        for (e in c) {
            var f = parseInt(c[e], 10);
            b.add(f)
        }
    }
    ;
    d.Bt = function() {
        return this.X || this.Wh || this.Xh ? 1 : this.$ ? 4 : this.Gl ? 6 : this.El ? 2 : this.Fl ? 5 : this.l || this.j || this.k ? 9 : this.Vf ? 7 : this.ye ? 8 : this.p ? 3 : 0
    }
    ;
    d.ux = function(a) {
        if (a)
            for (var b = 0; b < a.length; ++b) {
                var c = a[b];
                c && this.o.add(c)
            }
    }
    ;
    d.Ib = function(a) {
        return this.o.contains(a.id)
    }
    ;
    d.LA = function(a) {
        return this.Ce.contains(a.id) && !this.Ae.contains(a.id)
    }
    ;
    d.Uo = function(a) {
        return a in this.Ma && this.Ma[a]
    }
    ;
    d.Qc = function(a) {
        var b = this.da || vb() || "";
        return B(b, a)
    }
    ;
    d.gc = function(a) {
        var b = vb() || "";
        return B(b, a)
    }
    ;
    d.At = function() {
        return this.p ? "-O" : this.ud ? "-moz" : this.Yh ? "-ms" : "-webkit"
    }
    ;
    d.Ub = function() {
        return {
            c: "TVHTML5",
            cbr: this.da,
            cbrand: this.h,
            cbrver: this.ja,
            cmodel: this.b,
            cnetwork: this.Ee,
            cos: this.Na,
            cosver: this.Ea,
            cplatform: this.D,
            cver: "4"
        }
    }
    ;
    d.Wt = function() {
        var a = {};
        this.h && (a.cbrand = this.h);
        this.b && (a.cmodel = this.b);
        this.D && (a.cplatform = this.D);
        a.e = this.Ne();
        a.lcl = this.Xa.Fa;
        a.lex = this.Xa.g;
        a.l_gr = this.isLimitedGraphics ? 1 : 0;
        return a
    }
    ;
    d.QE = function() {
        var a = {};
        this.h && (a.psd_brand = this.h);
        this.b && (a.psd_model = this.b);
        this.D && (a.psd_platform = this.D);
        a.hl = this.Xa.Fa;
        return a
    }
    ;
    d.Xq = function(a) {
        this.Va.isSupported() && (a.platformUserName = this.Va.username,
        a.platformUserIcon = this.Va.avatarUrl)
    }
    ;
    d.iA = function(a) {
        return this.Ll.g(a)
    }
    ;
    d.Zx = function(a) {
        return this.F[a] || this.pa
    }
    ;
    d.Jz = function() {
        var a = {
            "Loader, Label": this.Cl + ", " + this.De,
            Domain: this.U.hostname,
            Device: "Unknown",
            "User Agent": vb(),
            "Key Map": "None"
        };
        this.ze && (a["Loader, Label"] += " (" + this.ze + ")");
        var b = [];
        this.J.VK_FAST_FWD && b.push(" VK_FAST_FWD=" + this.J.VK_FAST_FWD);
        this.J.VK_REWIND && b.push(" VK_REWIND=" + this.J.VK_REWIND);
        this.J.VK_TRACK_PREV && b.push(" VK_TRACK_PREV=" + this.J.VK_TRACK_PREV);
        this.J.VK_TRACK_NEXT && b.push(" VK_TRACK_NEXT=" + this.J.VK_TRACK_NEXT);
        this.J.VK_PLAY && b.push(" VK_PLAY=" + this.J.VK_PLAY);
        this.J.VK_STOP && b.push(" VK_STOP=" + this.J.VK_STOP);
        0 < b.length && (a["Key Map"] = b.join());
        b = [];
        b.push(this.D || "Unknown Platform");
        b.push(this.h || "Unknown Brand");
        b.push(this.b || "Unknown Model");
        var c = "Unknown Browser";
        this.da && (c = this.da,
        this.ja && (c += " (" + this.ja + ")"));
        b.push(c);
        c = "Unknown OS";
        this.Na && (c = this.Na,
        this.Ea && (c += " (" + this.Ea + ")"));
        b.push(c);
        b.push(this.Ee || "Unknown Network");
        a.Device = b.join(", ");
        var b = "", c = [], e = [], f;
        for (f in za)
            c.push(za[f].id),
            this.Ib(za[f]) && (b += za[f].name + ", ");
        a["Active TV Experiments"] = b || "None";
        e = this.o.Mn(c);
        e = e.sa();
        e.sort(oc);
        a["Desktop Experiments"] = e.join(", ");
        return a
    }
    ;
    d.Ne = function() {
        return this.o && this.o.sa().join() || ""
    }
    ;
    de.inject = "window locale debugModel keyMapModel systemApi accountApi".split(" ");
    function L() {
        this.b = Array;
        this.j = {}
    }
    d = L.prototype;
    d.Ka = function(a, b) {
        this.j[a] = x(b, this)
    }
    ;
    d.parse = function(a, b) {
        if (b) {
            var c = null, e;
            for (e in b)
                c = this.AJ(e),
                c.call(this, a, e, b[e])
        }
        return a
    }
    ;
    d.AJ = function(a) {
        return this.j[a] || this.AF
    }
    ;
    d.AF = function(a, b, c) {
        b = Zd(b, "_");
        b in a && (a[b] = this.ua(c));
        return a
    }
    ;
    d.ua = function(a) {
        return a
    }
    ;
    function ee(a, b) {
        this.model = a;
        this.cancel = b || q
    }
    ;function fe(a, b) {
        this.errorMessage = a;
        this.b = b;
        this.g = !1;
        this.h = null
    }
    ;function ge(a, b) {
        this.g = a;
        this.b = b
    }
    d = ge.prototype;
    d.get = function(a, b, c, e, f) {
        b = id(b);
        a = be(a, b, !0, !0);
        a = ld(a, b);
        return this.hi("GET", a, null, null, c, e, f)
    }
    ;
    d.post = function(a, b, c, e, f, g) {
        return this.hi("POST", a, b, c, e, f, g)
    }
    ;
    d.hi = function(a, b, c, e, f, g, k) {
        f = this.wJ(f, g);
        g = id(e);
        e = e && !v(e) ? hd(g) : e;
        c = id(c);
        b = be(b, c, !0, !0);
        f.send(b, a, e, k);
        return x(f.abort, f)
    }
    ;
    d.jsonp = function(a, b, c, e, f) {
        b = id(b);
        var g = !1;
        a = be(a, b, !1, !0);
        var k = new this.b(a,f);
        k.jw(3E4);
        var l = k.send(b, c, function(a) {
            if (e && !g) {
                var b = new fe;
                b.g = !0;
                b.h = a;
                e(b)
            }
        });
        return function() {
            g = !0;
            k.cancel(l)
        }
    }
    ;
    d.wJ = function(a, b) {
        var c = new this.g;
        c.addEventListener("success", x(function(b) {
            b = b.target;
            a && a(this.transformResponse(b));
            b.pb()
        }, this));
        c.addEventListener("error", function(a) {
            a = a.target;
            b && b(new fe(a.Mg(),a.getStatus()));
            a.pb()
        });
        return c
    }
    ;
    d.transformResponse = function(a) {
        var b = a.getResponseHeader("content-type"), c;
        0 <= b.indexOf("xml") ? c = a.yI() : 0 <= b.indexOf("html") ? c = a.Hd() : 0 > b.indexOf("image") && (c = a.xI());
        return c
    }
    ;
    ge.$inject = ["xhrBackend", "jsonpBackend"];
    function he(a, b) {
        this.x = s(a) ? a : 0;
        this.y = s(b) ? b : 0
    }
    d = he.prototype;
    d.clone = function() {
        return new he(this.x,this.y)
    }
    ;
    d.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    }
    ;
    d.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    }
    ;
    d.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    }
    ;
    d.sR = function(a, b) {
        a instanceof he ? (this.x += a.x,
        this.y += a.y) : (this.x += a,
        fa(b) && (this.y += b));
        return this
    }
    ;
    d.rR = function(a, b) {
        var c = fa(b) ? b : a;
        this.x *= a;
        this.y *= c;
        return this
    }
    ;
    function ie(a, b) {
        this.width = a;
        this.height = b
    }
    d = ie.prototype;
    d.clone = function() {
        return new ie(this.width,this.height)
    }
    ;
    d.wQ = function() {
        return Math.max(this.width, this.height)
    }
    ;
    d.UQ = function() {
        return Math.min(this.width, this.height)
    }
    ;
    d.sJ = function() {
        return this.width * this.height
    }
    ;
    d.qS = function() {
        return 2 * (this.width + this.height)
    }
    ;
    d.Gs = function() {
        return this.width / this.height
    }
    ;
    d.Ta = function() {
        return !this.sJ()
    }
    ;
    d.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    }
    ;
    d.OP = function(a) {
        return this.width <= a.width && this.height <= a.height
    }
    ;
    d.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    d.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    d.cJ = function(a, b) {
        var c = fa(b) ? b : a;
        this.width *= a;
        this.height *= c;
        return this
    }
    ;
    d.BS = function(a) {
        a = this.Gs() > a.Gs() ? a.width / this.width : a.height / this.height;
        return this.cJ(a)
    }
    ;
    var je = !F || Rb(9)
      , ke = !Ab && !F || F && Rb(9) || Ab && G("1.9.1")
      , le = F && !G("9")
      , me = F || zb || Bb;
    function ne(a) {
        a = a.className;
        return v(a) && a.match(/\S+/g) || []
    }
    function oe(a, b) {
        for (var c = ne(a), e = nc(arguments, 1), f = c.length + e.length, g = c, k = 0; k < e.length; k++)
            I(g, e[k]) || g.push(e[k]);
        g = c.join(" ");
        a.className = g;
        return c.length == f
    }
    ;function pe(a, b) {
        var c = b || document
          , e = null;
        c.querySelectorAll && c.querySelector ? e = c.querySelector("." + a) : e = qe(document, "*", a, b)[0];
        return e || null
    }
    function qe(a, b, c, e) {
        a = e || a;
        b = b && "*" != b ? b.toUpperCase() : "";
        if (a.querySelectorAll && a.querySelector && (b || c))
            return a.querySelectorAll(b + (c ? "." + c : ""));
        if (c && a.getElementsByClassName) {
            a = a.getElementsByClassName(c);
            if (b) {
                e = {};
                for (var f = 0, g = 0, k; k = a[g]; g++)
                    b == k.nodeName && (e[f++] = k);
                e.length = f;
                return e
            }
            return a
        }
        a = a.getElementsByTagName(b || "*");
        if (c) {
            e = {};
            for (g = f = 0; k = a[g]; g++)
                b = k.className,
                "function" == typeof b.split && I(b.split(/\s+/), c) && (e[f++] = k);
            e.length = f;
            return e
        }
        return a
    }
    function re(a, b) {
        rc(b, function(b, e) {
            "style" == e ? a.style.cssText = b : "class" == e ? a.className = b : "for" == e ? a.htmlFor = b : e in se ? a.setAttribute(se[e], b) : 0 == e.lastIndexOf("aria-", 0) || 0 == e.lastIndexOf("data-", 0) ? a.setAttribute(e, b) : a[e] = b
        })
    }
    var se = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    };
    function te(a) {
        a = a.document;
        a = ue(a) ? a.documentElement : a.body;
        return new ie(a.clientWidth,a.clientHeight)
    }
    function ve(a) {
        var b = a.document
          , c = 0;
        if (b) {
            a = te(a).height;
            var c = b.body
              , e = b.documentElement;
            if (ue(b) && e.scrollHeight)
                c = e.scrollHeight != a ? e.scrollHeight : e.offsetHeight;
            else {
                var b = e.scrollHeight
                  , f = e.offsetHeight;
                e.clientHeight != f && (b = c.scrollHeight,
                f = c.offsetHeight);
                c = b > a ? b > f ? b : f : b < f ? b : f
            }
        }
        return c
    }
    function we(a) {
        return !Bb && ue(a) ? a.documentElement : a.body || a.documentElement
    }
    function xe(a, b, c, e) {
        function f(c) {
            c && b.appendChild(v(c) ? a.createTextNode(c) : c)
        }
        for (; e < c.length; e++) {
            var g = c[e];
            da(g) && !ye(g) ? bc(ze(g) ? lc(g) : g, f) : f(g)
        }
    }
    function Ae(a, b) {
        var c = a.createElement("div");
        F ? (c.innerHTML = "<br>" + b,
        c.removeChild(c.firstChild)) : c.innerHTML = b;
        if (1 == c.childNodes.length)
            return c.removeChild(c.firstChild);
        for (var e = a.createDocumentFragment(); c.firstChild; )
            e.appendChild(c.firstChild);
        return e
    }
    function ue(a) {
        return "CSS1Compat" == a.compatMode
    }
    function Be(a) {
        for (var b; b = a.firstChild; )
            a.removeChild(b)
    }
    function Ce(a, b, c) {
        a.insertBefore(b, a.childNodes[c] || null)
    }
    function De(a) {
        return a && a.parentNode ? a.parentNode.removeChild(a) : null
    }
    function Ee(a, b) {
        var c = b.parentNode;
        c && c.replaceChild(a, b)
    }
    function Fe(a) {
        return ke && void 0 != a.children ? a.children : dc(a.childNodes, function(a) {
            return 1 == a.nodeType
        })
    }
    function Ge(a, b) {
        for (; a && 1 != a.nodeType; )
            a = b ? a.nextSibling : a.previousSibling;
        return a
    }
    function ye(a) {
        return ga(a) && 0 < a.nodeType
    }
    function He(a) {
        return ga(a) && 1 == a.nodeType
    }
    function Ie(a, b) {
        if (a.contains && 1 == b.nodeType)
            return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)
            return a == b || Boolean(a.compareDocumentPosition(b) & 16);
        for (; b && a != b; )
            b = b.parentNode;
        return b == a
    }
    function Je(a, b) {
        var c = a.parentNode;
        if (c == b)
            return -1;
        for (var e = b; e.parentNode != c; )
            e = e.parentNode;
        return Ke(e, a)
    }
    function Ke(a, b) {
        for (var c = b; c = c.previousSibling; )
            if (c == a)
                return -1;
        return 1
    }
    function Le(a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }
    function Me(a) {
        return a.contentDocument || a.contentWindow.document
    }
    function Ne(a, b, c, e) {
        if (null != a)
            for (a = a.firstChild; a; ) {
                if (b(a) && (c.push(a),
                e) || Ne(a, b, c, e))
                    return !0;
                a = a.nextSibling
            }
        return !1
    }
    var Oe = {
        SCRIPT: 1,
        STYLE: 1,
        HEAD: 1,
        IFRAME: 1,
        OBJECT: 1
    }
      , Pe = {
        IMG: " ",
        BR: "\n"
    };
    function Qe(a) {
        return Re(a) && Se(a)
    }
    function Re(a) {
        a = a.getAttributeNode("tabindex");
        return null != a && a.specified
    }
    function Se(a) {
        a = a.tabIndex;
        return fa(a) && 0 <= a && 32768 > a
    }
    function Te(a) {
        if (le && "innerText"in a)
            a = a.innerText.replace(/(\r\n|\r|\n)/g, "\n");
        else {
            var b = [];
            Ue(a, b, !0);
            a = b.join("")
        }
        a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
        a = a.replace(/\u200B/g, "");
        le || (a = a.replace(/ +/g, " "));
        " " != a && (a = a.replace(/^\s*/, ""));
        return a
    }
    function Ue(a, b, c) {
        if (!(a.nodeName in Oe))
            if (3 == a.nodeType)
                c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
            else if (a.nodeName in Pe)
                b.push(Pe[a.nodeName]);
            else
                for (a = a.firstChild; a; )
                    Ue(a, b, c),
                    a = a.nextSibling
    }
    function ze(a) {
        if (a && "number" == typeof a.length) {
            if (ga(a))
                return "function" == typeof a.item || "string" == typeof a.item;
            if (w(a))
                return "function" == typeof a.item
        }
        return !1
    }
    function Ve(a, b, c) {
        if (!b && !c)
            return null;
        var e = b ? b.toUpperCase() : null;
        return We(a, function(a) {
            var b;
            if (b = !e || a.nodeName == e)
                (b = !c) || (b = I(ne(a), c));
            return b
        }, !0)
    }
    function Xe(a, b) {
        return Ve(a, null, b)
    }
    function We(a, b, c, e) {
        c || (a = a.parentNode);
        c = null == e;
        for (var f = 0; a && (c || f <= e); ) {
            if (b(a))
                return a;
            a = a.parentNode;
            f++
        }
        return null
    }
    (function(a) {
        var b = !1, c;
        return function() {
            b || (c = a(),
            b = !0);
            return c
        }
    }
    )(function() {
        var a = window
          , b = Ab && Cb;
        return s(a.devicePixelRatio) && !b ? a.devicePixelRatio : a.matchMedia ? Ye(0.75) || Ye(1.5) || Ye(2) || Ye(3) || 1 : 1
    });
    function Ye(a) {
        return window.matchMedia("(-webkit-min-device-pixel-ratio: " + a + "),(min--moz-device-pixel-ratio: " + a + "),(min-resolution: " + a + "dppx)").matches ? a : 0
    }
    function Ze(a) {
        this.b = a || h.document || document
    }
    d = Ze.prototype;
    d.iQ = function(a) {
        return a ? new Ze(Le(a)) : ob || (ob = new Ze)
    }
    ;
    d.FS = function(a) {
        this.b = a
    }
    ;
    d.Qq = function() {
        return this.b
    }
    ;
    d.yJ = function(a) {
        var b = this.b;
        return v(a) ? b.getElementById(a) : a
    }
    ;
    d.NQ = function(a) {
        var b = this.b;
        return v(a) ? b.getElementById(a) : a
    }
    ;
    d.hK = Ze.prototype.yJ;
    d.zJ = function(a, b, c) {
        return qe(this.b, a, b, c)
    }
    ;
    d.kQ = function(a, b) {
        var c = b || this.b
          , e = c || document;
        return e.querySelectorAll && e.querySelector ? e.querySelectorAll("." + a) : qe(document, "*", a, c)
    }
    ;
    d.jQ = function(a, b) {
        return pe(a, b || this.b)
    }
    ;
    d.OQ = function(a, b) {
        return pe(a, b || this.b)
    }
    ;
    d.iK = Ze.prototype.zJ;
    d.NS = re;
    d.bR = function(a) {
        a = a || this.Ps();
        return te(a || window)
    }
    ;
    d.fQ = function() {
        return ve(this.Ps())
    }
    ;
    d.uJ = function(a, b, c) {
        var e = this.b
          , f = arguments
          , g = f[0]
          , k = f[1];
        if (!je && k && (k.name || k.type)) {
            g = ["<", g];
            k.name && g.push(' name="', $a(k.name), '"');
            if (k.type) {
                g.push(' type="', $a(k.type), '"');
                var l = {};
                Ec(l, k);
                delete l.type;
                k = l
            }
            g.push(">");
            g = g.join("")
        }
        g = e.createElement(g);
        k && (v(k) ? g.className = k : t(k) ? oe.apply(null, [g].concat(k)) : re(g, k));
        2 < f.length && xe(e, g, f, 2);
        return g
    }
    ;
    d.jK = Ze.prototype.uJ;
    d.createElement = function(a) {
        return this.b.createElement(a)
    }
    ;
    d.iR = function(a) {
        return this.b.createTextNode(String(a))
    }
    ;
    d.BP = function(a, b, c) {
        var e = this.b
          , f = !!c;
        c = ["<tr>"];
        for (var g = 0; g < b; g++)
            c.push(f ? "<td>&nbsp;</td>" : "<td></td>");
        c.push("</tr>");
        c = c.join("");
        b = ["<table>"];
        for (g = 0; g < a; g++)
            b.push(c);
        b.push("</table>");
        a = e.createElement("DIV");
        a.innerHTML = b.join("");
        return a.removeChild(a.firstChild)
    }
    ;
    d.OR = function(a) {
        return Ae(this.b, a)
    }
    ;
    d.TR = function() {
        return ue(this.b)
    }
    ;
    d.Ps = function() {
        var a = this.b;
        return a.parentWindow || a.defaultView
    }
    ;
    d.hQ = function() {
        return we(this.b)
    }
    ;
    d.gQ = function() {
        var a = this.b
          , b = we(a)
          , a = a.parentWindow || a.defaultView;
        return F && G("10") && a.pageYOffset != b.scrollTop ? new he(b.scrollLeft,b.scrollTop) : new he(a.pageXOffset || b.scrollLeft,a.pageYOffset || b.scrollTop)
    }
    ;
    d.QP = function(a) {
        var b;
        t: {
            a = a || this.b;
            try {
                b = a && a.activeElement;
                break t
            } catch (c) {}
            b = null
        }
        return b
    }
    ;
    d.appendChild = function(a, b) {
        a.appendChild(b)
    }
    ;
    d.append = function(a, b) {
        xe(Le(a), a, arguments, 1)
    }
    ;
    d.hR = function(a) {
        if (1 != a.nodeType)
            return !1;
        switch (a.tagName) {
        case "APPLET":
        case "AREA":
        case "BASE":
        case "BR":
        case "COL":
        case "COMMAND":
        case "EMBED":
        case "FRAME":
        case "HR":
        case "IMG":
        case "INPUT":
        case "IFRAME":
        case "ISINDEX":
        case "KEYGEN":
        case "LINK":
        case "NOFRAMES":
        case "NOSCRIPT":
        case "META":
        case "OBJECT":
        case "PARAM":
        case "SCRIPT":
        case "SOURCE":
        case "STYLE":
        case "TRACK":
        case "WBR":
            return !1
        }
        return !0
    }
    ;
    d.wS = Be;
    d.SR = function(a, b) {
        b.parentNode && b.parentNode.insertBefore(a, b)
    }
    ;
    d.RR = function(a, b) {
        b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
    }
    ;
    d.QR = Ce;
    d.mR = De;
    d.yS = Ee;
    d.PP = function(a) {
        var b, c = a.parentNode;
        if (c && 11 != c.nodeType) {
            if (a.removeNode)
                return a.removeNode(!1);
            for (; b = a.firstChild; )
                c.insertBefore(b, a);
            return De(a)
        }
    }
    ;
    d.jR = Fe;
    d.lQ = function(a) {
        return void 0 != a.firstElementChild ? a.firstElementChild : Ge(a.firstChild, !0)
    }
    ;
    d.uQ = function(a) {
        return void 0 != a.lastElementChild ? a.lastElementChild : Ge(a.lastChild, !1)
    }
    ;
    d.xQ = function(a) {
        return void 0 != a.nextElementSibling ? a.nextElementSibling : Ge(a.nextSibling, !0)
    }
    ;
    d.JQ = function(a) {
        return void 0 != a.previousElementSibling ? a.previousElementSibling : Ge(a.previousSibling, !1)
    }
    ;
    d.yQ = function(a) {
        if (!a)
            return null;
        if (a.firstChild)
            return a.firstChild;
        for (; a && !a.nextSibling; )
            a = a.parentNode;
        return a ? a.nextSibling : null
    }
    ;
    d.KQ = function(a) {
        if (!a)
            return null;
        if (!a.previousSibling)
            return a.parentNode;
        for (a = a.previousSibling; a && a.lastChild; )
            a = a.lastChild;
        return a
    }
    ;
    d.$R = ye;
    d.kR = He;
    d.eS = function(a) {
        return ga(a) && a.window == a
    }
    ;
    d.HQ = function(a) {
        if (me && !(F && G("9") && !G("10") && h.SVGElement && a instanceof h.SVGElement))
            return a.parentElement;
        a = a.parentNode;
        return He(a) ? a : null
    }
    ;
    d.contains = Ie;
    d.xP = function(a, b) {
        if (a == b)
            return 0;
        if (a.compareDocumentPosition)
            return a.compareDocumentPosition(b) & 2 ? 1 : -1;
        if (F && !Rb(9)) {
            if (9 == a.nodeType)
                return -1;
            if (9 == b.nodeType)
                return 1
        }
        if ("sourceIndex"in a || a.parentNode && "sourceIndex"in a.parentNode) {
            var c = 1 == a.nodeType
              , e = 1 == b.nodeType;
            if (c && e)
                return a.sourceIndex - b.sourceIndex;
            var f = a.parentNode
              , g = b.parentNode;
            return f == g ? Ke(a, b) : !c && Ie(f, b) ? -1 * Je(a, b) : !e && Ie(g, a) ? Je(b, a) : (c ? a.sourceIndex : f.sourceIndex) - (e ? b.sourceIndex : g.sourceIndex)
        }
        e = Le(a);
        c = e.createRange();
        c.selectNode(a);
        c.collapse(!0);
        e = e.createRange();
        e.selectNode(b);
        e.collapse(!0);
        return c.compareBoundaryPoints(h.Range.START_TO_END, e)
    }
    ;
    d.KP = function(a) {
        var b, c = arguments.length;
        if (!c)
            return null;
        if (1 == c)
            return arguments[0];
        var e = []
          , f = Infinity;
        for (b = 0; b < c; b++) {
            for (var g = [], k = arguments[b]; k; )
                g.unshift(k),
                k = k.parentNode;
            e.push(g);
            f = Math.min(f, g.length)
        }
        g = null;
        for (b = 0; b < f; b++) {
            for (var k = e[0][b], l = 1; l < c; l++)
                if (k != e[l][b])
                    return g;
            g = k
        }
        return g
    }
    ;
    d.EQ = Le;
    d.mQ = Me;
    d.nQ = function(a) {
        var b;
        (b = a.contentWindow) || (b = (a = Me(a)) ? a.parentWindow || a.defaultView : window);
        return b
    }
    ;
    d.US = function(a, b) {
        if ("textContent"in a)
            a.textContent = b;
        else if (3 == a.nodeType)
            a.data = b;
        else if (a.firstChild && 3 == a.firstChild.nodeType) {
            for (; a.lastChild != a.firstChild; )
                a.removeChild(a.lastChild);
            a.firstChild.data = b
        } else {
            Be(a);
            var c = Le(a);
            a.appendChild(c.createTextNode(String(b)))
        }
    }
    ;
    d.DQ = function(a) {
        if ("outerHTML"in a)
            return a.outerHTML;
        var b = Le(a).createElement("div");
        b.appendChild(a.cloneNode(!0));
        return b.innerHTML
    }
    ;
    d.LP = function(a, b) {
        var c = [];
        return Ne(a, b, c, !0) ? c[0] : void 0
    }
    ;
    d.MP = function(a, b) {
        var c = [];
        Ne(a, b, c, !1);
        return c
    }
    ;
    d.VR = Qe;
    d.HS = function(a, b) {
        b ? a.tabIndex = 0 : (a.tabIndex = -1,
        a.removeAttribute("tabIndex"))
    }
    ;
    d.lR = function(a) {
        var b;
        (b = "A" == a.tagName || "INPUT" == a.tagName || "TEXTAREA" == a.tagName || "SELECT" == a.tagName || "BUTTON" == a.tagName ? !a.disabled && (!Re(a) || Se(a)) : Qe(a)) && F ? (a = w(a.getBoundingClientRect) ? a.getBoundingClientRect() : {
            height: a.offsetHeight,
            width: a.offsetWidth
        },
        a = null != a && 0 < a.height && 0 < a.width) : a = b;
        return a
    }
    ;
    d.ZQ = Te;
    d.AQ = function(a) {
        return Te(a).length
    }
    ;
    d.BQ = function(a, b) {
        for (var c = b || Le(a).body, e = []; a && a != c; ) {
            for (var f = a; f = f.previousSibling; )
                e.unshift(Te(f));
            a = a.parentNode
        }
        return e.join("").replace(/^[\s\xa0]+/, "").replace(/ +/g, " ").length
    }
    ;
    d.zQ = function(a, b, c) {
        a = [a];
        for (var e = 0, f = null; 0 < a.length && e < b; )
            if (f = a.pop(),
            !(f.nodeName in Oe))
                if (3 == f.nodeType)
                    var g = f.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " ")
                      , e = e + g.length;
                else if (f.nodeName in Pe)
                    e += Pe[f.nodeName].length;
                else
                    for (g = f.childNodes.length - 1; 0 <= g; g--)
                        a.push(f.childNodes[g]);
        ga(c) && (c.uS = f ? f.nodeValue.length + b - e - 1 : 0,
        c.node = f);
        return f
    }
    ;
    d.aS = ze;
    d.WP = Ve;
    d.VP = Xe;
    d.UP = We;
    function $e(a, b) {
        var c = a;
        b && (c = x(a, b));
        w(h.setImmediate) ? h.setImmediate(c) : (af || (af = bf()),
        af(c))
    }
    var af;
    function bf() {
        var a = h.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && (a = function() {
            var a = document.createElement("iframe");
            a.style.display = "none";
            a.src = "";
            document.documentElement.appendChild(a);
            var b = a.contentWindow
              , a = b.document;
            a.open();
            a.write("");
            a.close();
            var c = "callImmediate" + Math.random()
              , e = b.location.protocol + "//" + b.location.host
              , a = x(function(a) {
                if (a.origin == e || a.data == c)
                    this.port1.onmessage()
            }, this);
            b.addEventListener("message", a, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function() {
                    b.postMessage(c, e)
                }
            }
        }
        );
        if ("undefined" !== typeof a) {
            var b = new a
              , c = {}
              , e = c;
            b.port1.onmessage = function() {
                c = c.next;
                var a = c.Ls;
                c.Ls = null;
                a()
            }
            ;
            return function(a) {
                e.next = {
                    Ls: a
                };
                e = e.next;
                b.port2.postMessage(0)
            }
        }
        return "undefined" !== typeof document && "onreadystatechange"in document.createElement("script") ? function(a) {
            var b = document.createElement("script");
            b.onreadystatechange = function() {
                b.onreadystatechange = null;
                b.parentNode.removeChild(b);
                b = null;
                a();
                a = null
            }
            ;
            document.documentElement.appendChild(b)
        }
        : function(a) {
            h.setTimeout(a, 0)
        }
    }
    ;function cf(a) {
        $e(function() {
            throw a;
        })
    }
    function df(a, b) {
        ef || ($e(ff),
        ef = !0);
        gf.push(new hf(a,b))
    }
    var ef = !1
      , gf = [];
    function ff() {
        for (; gf.length; ) {
            var a = gf;
            gf = [];
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                try {
                    c.Ra.call(c.scope)
                } catch (e) {
                    cf(e)
                }
            }
        }
        ef = !1
    }
    function hf(a, b) {
        this.Ra = a;
        this.scope = b
    }
    ;function jf(a) {
        a.prototype.then = a.prototype.then;
        a.prototype.$goog_Thenable = !0
    }
    function kf(a) {
        if (!a)
            return !1;
        try {
            return !!a.$goog_Thenable
        } catch (b) {
            return !1
        }
    }
    ;function of(a, b) {
        this.g = 0;
        this.l = void 0;
        this.b = this.h = null;
        this.j = this.k = !1;
        try {
            var c = this;
            a.call(b, function(a) {
                c.Cd(2, a)
            }, function(a) {
                c.Cd(3, a)
            })
        } catch (e) {
            this.Cd(3, e)
        }
    }
    of.prototype.then = function(a, b, c) {
        this.gl(Error("then"));
        return this.Bs(w(a) ? a : null, w(b) ? b : null, c)
    }
    ;
    jf(of);
    d = of.prototype;
    d.dT = function(a, b) {
        function c() {
            try {
                a.call(b)
            } catch (c) {
                pf.call(null, c)
            }
        }
        this.gl(Error("thenAlways"));
        this.Zq({
            nf: null,
            Gk: c,
            Fk: c
        });
        return this
    }
    ;
    d.eT = function(a, b) {
        this.gl(Error("thenCatch"));
        return this.Bs(null, a, b)
    }
    ;
    d.cancel = function(a) {
        0 == this.g && df(function() {
            var b = new qf(a);
            this.Bo(b)
        }, this)
    }
    ;
    d.Bo = function(a) {
        0 == this.g && (this.h ? this.h.aA(this, a) : this.Cd(3, a))
    }
    ;
    d.aA = function(a, b) {
        if (this.b) {
            for (var c = 0, e = -1, f = 0, g; g = this.b[f]; f++)
                if (g = g.nf)
                    if (c++,
                    g == a && (e = f),
                    0 <= e && 1 < c)
                        break;
            0 <= e && (0 == this.g && 1 == c ? this.Bo(b) : (c = this.b.splice(e, 1)[0],
            this.Dn(c, 3, b)))
        }
    }
    ;
    d.Zq = function(a) {
        this.b && this.b.length || 2 != this.g && 3 != this.g || this.co();
        this.b || (this.b = []);
        this.b.push(a)
    }
    ;
    d.Bs = function(a, b, c) {
        var e = {
            nf: null,
            Fk: null,
            Gk: null
        };
        e.nf = new of(function(f, g) {
            e.Fk = a ? function(b) {
                try {
                    var e = a.call(c, b);
                    f(e)
                } catch (n) {
                    g(n)
                }
            }
            : f;
            e.Gk = b ? function(a) {
                try {
                    var e = b.call(c, a);
                    !s(e) && a instanceof qf ? g(a) : f(e)
                } catch (n) {
                    g(n)
                }
            }
            : g
        }
        );
        e.nf.h = this;
        this.Zq(e);
        return e.nf
    }
    ;
    d.pq = function(a) {
        this.g = 0;
        this.Cd(2, a)
    }
    ;
    d.qq = function(a) {
        this.g = 0;
        this.Cd(3, a)
    }
    ;
    d.Cd = function(a, b) {
        if (0 == this.g) {
            if (this == b)
                a = 3,
                b = new TypeError("Promise cannot resolve to itself");
            else {
                if (kf(b)) {
                    this.g = 1;
                    b.then(this.pq, this.qq, this);
                    return
                }
                if (ga(b))
                    try {
                        var c = b.then;
                        if (w(c)) {
                            this.DB(b, c);
                            return
                        }
                    } catch (e) {
                        a = 3,
                        b = e
                    }
            }
            this.l = b;
            this.g = a;
            this.co();
            3 != a || b instanceof qf || rf(this, b)
        }
    }
    ;
    d.DB = function(a, b) {
        function c(a) {
            g || (g = !0,
            f.qq(a))
        }
        function e(a) {
            g || (g = !0,
            f.pq(a))
        }
        this.g = 1;
        var f = this
          , g = !1;
        try {
            b.call(a, e, c)
        } catch (k) {
            c(k)
        }
    }
    ;
    d.co = function() {
        this.k || (this.k = !0,
        df(this.MF, this))
    }
    ;
    d.MF = function() {
        for (; this.b && this.b.length; ) {
            var a = this.b;
            this.b = [];
            for (var b = 0; b < a.length; b++)
                this.Dn(a[b], this.g, this.l)
        }
        this.k = !1
    }
    ;
    d.Dn = function(a, b, c) {
        2 == b ? a.Fk(c) : (this.BI(),
        a.Gk(c))
    }
    ;
    d.gl = function() {}
    ;
    d.zF = function() {}
    ;
    d.BI = function() {
        var a;
        for (a = this; a && a.j; a = a.h)
            a.j = !1
    }
    ;
    function rf(a, b) {
        a.j = !0;
        df(function() {
            a.j && (a.zF(b),
            pf.call(null, b))
        })
    }
    var pf = cf;
    function qf(a) {
        nb.call(this, a)
    }
    A(qf, nb);
    qf.prototype.name = "cancel";
    /*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
    function sf(a, b) {
        this.k = [];
        this.D = a;
        this.w = b || null;
        this.h = this.A = !1;
        this.g = void 0;
        this.p = this.F = this.o = !1;
        this.l = 0;
        this.b = null;
        this.j = 0
    }
    d = sf.prototype;
    d.cancel = function(a) {
        if (this.Ge())
            this.g instanceof sf && this.g.cancel();
        else {
            if (this.b) {
                var b = this.b;
                delete this.b;
                a ? b.cancel(a) : b.Lw()
            }
            this.D ? this.D.call(this.w, this) : this.p = !0;
            this.Ge() || this.Xg(new tf(this))
        }
    }
    ;
    d.Lw = function() {
        this.j--;
        0 >= this.j && this.cancel()
    }
    ;
    d.Tl = function(a, b) {
        this.o = !1;
        this.Nk(a, b)
    }
    ;
    d.Nk = function(a, b) {
        this.A = !0;
        this.g = b;
        this.h = !a;
        this.Mo()
    }
    ;
    d.vs = function() {
        if (this.Ge()) {
            if (!this.p)
                throw new uf(this);
            this.p = !1
        }
    }
    ;
    d.ks = function(a) {
        this.vs();
        this.us(a);
        this.Nk(!0, a)
    }
    ;
    d.Xg = function(a) {
        this.vs();
        this.us(a);
        this.Sl(a);
        this.Nk(!1, a)
    }
    ;
    d.Sl = function() {}
    ;
    d.us = function() {}
    ;
    d.Qe = function(a, b) {
        return this.xd(a, null, b)
    }
    ;
    d.no = function(a, b) {
        return this.xd(null, a, b)
    }
    ;
    d.qP = function(a, b) {
        return this.xd(a, a, b)
    }
    ;
    d.xd = function(a, b, c) {
        this.k.push([a, b, c]);
        this.Ge() && this.Mo();
        return this
    }
    ;
    d.then = function(a, b, c) {
        var e, f, g = new of(function(a, b) {
            e = a;
            f = b
        }
        );
        this.xd(e, function(a) {
            a instanceof tf ? g.cancel() : f(a)
        });
        return g.then(a, b, c)
    }
    ;
    jf(sf);
    d = sf.prototype;
    d.Uy = function(a) {
        this.xd(a.ks, a.Xg, a);
        return this
    }
    ;
    d.sP = function(a) {
        return this.Qe(x(a.II, a))
    }
    ;
    d.II = function(a) {
        var b = new sf;
        this.Uy(b);
        a && (b.b = this,
        this.j++);
        return b
    }
    ;
    d.Ge = function() {
        return this.A
    }
    ;
    d.Et = function(a) {
        return a instanceof Error
    }
    ;
    d.Ul = function() {
        return gc(this.k, function(a) {
            return w(a[1])
        })
    }
    ;
    d.Mo = function() {
        if (this.l && this.Ge() && this.Ul()) {
            var a = this.l
              , b = vf[a];
            b && (b.Ft(),
            delete vf[a]);
            this.l = 0
        }
        this.b && (this.b.j--,
        delete this.b);
        for (var a = this.g, c = b = !1; this.k.length && !this.o; ) {
            var e = this.k.shift()
              , f = e[0]
              , g = e[1]
              , e = e[2];
            if (f = this.h ? g : f)
                try {
                    var k = f.call(e || this.w, a);
                    s(k) && (this.h = this.h && (k == a || this.Et(k)),
                    this.g = a = k);
                    kf(a) && (this.o = c = !0)
                } catch (l) {
                    a = l,
                    this.h = !0,
                    this.Sl(a),
                    this.Ul() || (b = !0)
                }
        }
        this.g = a;
        c && (k = x(this.Tl, this, !0),
        c = x(this.Tl, this, !1),
        a instanceof sf ? (a.xd(k, c),
        a.F = !0) : a.then(k, c));
        b && (a = new wf(a),
        vf[a.ob] = a,
        this.l = a.ob)
    }
    ;
    function uf(a) {
        nb.call(this);
        this.b = a
    }
    A(uf, nb);
    uf.prototype.message = "Deferred has already fired";
    uf.prototype.name = "AlreadyCalledError";
    function tf(a) {
        nb.call(this);
        this.b = a
    }
    A(tf, nb);
    tf.prototype.message = "Deferred was canceled";
    tf.prototype.name = "CanceledError";
    function wf(a) {
        this.ob = h.setTimeout(x(this.g, this), 0);
        this.b = a
    }
    wf.prototype.g = function() {
        delete vf[this.ob];
        throw this.b;
    }
    ;
    wf.prototype.Ft = function() {
        h.clearTimeout(this.ob)
    }
    ;
    var vf = {};
    function xf(a, b) {
        var c = b || {}
          , e = c.document || document
          , f = document.createElement("SCRIPT")
          , g = {
            ls: f,
            Oa: void 0
        }
          , k = new sf(yf,g)
          , l = null
          , n = null != c.timeout ? c.timeout : 5E3;
        0 < n && (l = window.setTimeout(function() {
            zf(f, !0);
            k.Xg(new Af(1,"Timeout reached for loading script " + a))
        }, n),
        g.Oa = l);
        f.onload = f.onreadystatechange = function() {
            f.readyState && "loaded" != f.readyState && "complete" != f.readyState || (zf(f, c.Fx || !1, l),
            k.ks(null))
        }
        ;
        f.onerror = function() {
            zf(f, !0, l);
            k.Xg(new Af(0,"Error while loading script " + a))
        }
        ;
        re(f, {
            type: "text/javascript",
            charset: "UTF-8",
            src: a
        });
        Bf(e).appendChild(f);
        return k
    }
    function Bf(a) {
        var b = a.getElementsByTagName("HEAD");
        return b && 0 != b.length ? b[0] : a.documentElement
    }
    function yf() {
        if (this && this.ls) {
            var a = this.ls;
            a && "SCRIPT" == a.tagName && zf(a, !0, this.Oa)
        }
    }
    function zf(a, b, c) {
        null != c && h.clearTimeout(c);
        a.onload = q;
        a.onerror = q;
        a.onreadystatechange = q;
        b && window.setTimeout(function() {
            De(a)
        }, 0)
    }
    function Af(a, b) {
        var c = "Jsloader error (code #" + a + ")";
        b && (c += ": " + b);
        nb.call(this, c);
        this.b = a
    }
    A(Af, nb);
    function Cf(a, b, c) {
        this.J = a;
        this.k = c;
        this.b = {};
        this.h = b.Wt();
        this.j = !1;
        this.g = [];
        this.J.jstiming && (this.b[this.J.jstiming.load.name] = this.J.jstiming.load,
        this.J.jstiming.load = null)
    }
    d = Cf.prototype;
    d.bT = function(a) {
        var b = new this.J.jstiming.Timer;
        b.name = a;
        return this.b[a] = b
    }
    ;
    d.LF = function(a) {
        this.b[a] = null
    }
    ;
    d.lb = function(a) {
        return this.b[a] || null
    }
    ;
    d.Lk = function(a, b) {
        var c = this.lb(a);
        return c && (b ? x(c.tick, c, b) : x(c.tick, c)) || q
    }
    ;
    d.Wc = function(a, b) {
        var c = this.b[a];
        c && c.tick(b)
    }
    ;
    d.report = function(a, b) {
        var c = this.b[a];
        if (c)
            if (this.Pu()) {
                var e = b && y(b, this.h) || this.h;
                this.J.jstiming.report(c, e);
                this.b[a] = null
            } else
                this.g.push(x(this.report, this, a, b)),
                this.j || (this.j = !0,
                this.Qu())
    }
    ;
    d.Qu = function() {
        xf(M.yi + "/csi-tail.js").Qe(x(this.vI, this))
    }
    ;
    d.vI = function() {
        for (var a = this.g.length - 1; 0 <= a; --a) {
            var b = this.g[a];
            w(b) && b()
        }
        this.g.length = 0
    }
    ;
    d.Pu = function() {
        return !!m("jstiming.report", this.J)
    }
    ;
    Cf.inject = ["window", "environmentModel", "timeService"];
    function Df(a, b, c, e, f, g, k, l, n, p, u) {
        this.id = a;
        this.path = b || "";
        this.p = e;
        this.F = c;
        this.b = f;
        this.A = g;
        this.Xa = k;
        this.o = l;
        this.k = n;
        this.l = p || {};
        this.w = u || null;
        this.H = this.R = this.O = this.K = q
    }
    d = Df.prototype;
    d.vf = function() {
        return "ot"
    }
    ;
    d.qe = function() {
        return ""
    }
    ;
    d.lc = function(a) {
        var b = this.qe() + this.path;
        return $b(b, a || {})
    }
    ;
    d.Of = function() {
        return "GET"
    }
    ;
    d.Sb = function(a, b, c, e) {
        this.K = x(this.F.LF, this.F, a);
        this.O = b ? this.F.Lk(a, b) : q;
        this.R = c ? this.F.Lk(a, c) : q;
        this.H = e ? this.F.Lk(a, e) : q
    }
    ;
    d.pk = function() {
        this.O();
        this.O = q
    }
    ;
    d.Rj = function() {
        this.R();
        this.R = q
    }
    ;
    d.uk = function() {
        this.H();
        this.K = this.H = q
    }
    ;
    d.Xn = function() {
        this.K();
        this.K = this.H = this.R = this.O = q
    }
    ;
    d.load = function(a, b) {
        return this.Hf(a, b)
    }
    ;
    d.Hf = function(a, b, c, e, f, g) {
        var k = {};
        this.fr(this.l);
        this.aF(this.l);
        y(k, this.l);
        a && y(k, a);
        if (this.k && (a = this.$E(k[this.k])))
            return b && b(a),
            new ee(a);
        e = e ? e : this.oq();
        return new ee(e,this.he(e, k, b, c, f, g))
    }
    ;
    d.oq = function() {
        return new this.o.b
    }
    ;
    d.he = function(a, b, c, e, f, g) {
        c = c || q;
        var k = x(this.kk, this, a, b, c);
        a = x(this.$F, this, a, c, e);
        this.pk();
        return "GET" === this.Of() ? this.p.get(this.lc(), b, k, a) : "JSONP" === this.Of() ? this.p.jsonp(this.lc(), b, k, a) : "POST" == this.Of() ? (b = g ? Ef(b) : b,
        this.p.post(this.lc(), {}, b, k, a, f)) : q
    }
    ;
    d.kk = function(a, b, c, e) {
        this.Rj();
        this.o.parse(a, e);
        this.jF(this.k && b[this.k], a);
        this.uk();
        c(a)
    }
    ;
    d.$F = function(a, b, c, e) {
        this.Xn();
        this.Xa.g(this.vf(), this.path, e.b);
        c ? c(e) : b(a)
    }
    ;
    d.yF = function(a, b, c) {
        c[a] && (c[b] = c[a],
        delete c[a]);
        return c
    }
    ;
    d.fr = function(a) {
        a && "" === a.hl && (a.hl = this.w.Fa,
        a.override_hl = 1)
    }
    ;
    d.aF = function(a) {
        a && "" === a.regionId && this.b.gdataRegionId && (a.regionId = this.b.gdataRegionId)
    }
    ;
    d.Ih = function() {
        return this.o.b.CACHE_TYPE
    }
    ;
    d.$E = function(a) {
        return a && this.Ih() ? this.A.get(this.Ih(), a) : null
    }
    ;
    d.jF = function(a, b) {
        a && this.Ih() && this.A.add(this.Ih(), a, b)
    }
    ;
    Df.inject = "id path csiService ytHttp environmentModel cacheService backendErrorReporting parser opt_paramKey opt_params locale".split(" ");
    function Ff(a) {
        return /^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
    }
    function Gf(a) {
        a = String(a);
        if (Ff(a))
            try {
                return eval("(" + a + ")")
            } catch (b) {}
        throw Error("Invalid JSON string: " + a);
    }
    function Hf(a) {
        return eval("(" + a + ")")
    }
    function Ef(a, b) {
        return (new If(b)).h(a)
    }
    function If(a) {
        this.b = a
    }
    If.prototype.h = function(a) {
        var b = [];
        this.g(a, b);
        return b.join("")
    }
    ;
    If.prototype.g = function(a, b) {
        switch (typeof a) {
        case "string":
            this.j(a, b);
            break;
        case "number":
            this.l(a, b);
            break;
        case "boolean":
            b.push(a);
            break;
        case "undefined":
            b.push("null");
            break;
        case "object":
            if (null == a) {
                b.push("null");
                break
            }
            if (t(a)) {
                this.k(a, b);
                break
            }
            this.o(a, b);
            break;
        case "function":
            break;
        default:
            throw Error("Unknown type: " + typeof a);
        }
    }
    ;
    var Jf = {
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
      , Kf = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
    If.prototype.j = function(a, b) {
        b.push('"', a.replace(Kf, function(a) {
            if (a in Jf)
                return Jf[a];
            var b = a.charCodeAt(0)
              , f = "\\u";
            16 > b ? f += "000" : 256 > b ? f += "00" : 4096 > b && (f += "0");
            return Jf[a] = f + b.toString(16)
        }), '"')
    }
    ;
    If.prototype.l = function(a, b) {
        b.push(isFinite(a) && !isNaN(a) ? a : "null")
    }
    ;
    If.prototype.k = function(a, b) {
        var c = a.length;
        b.push("[");
        for (var e = "", f = 0; f < c; f++)
            b.push(e),
            e = a[f],
            this.g(this.b ? this.b.call(a, String(f), e) : e, b),
            e = ",";
        b.push("]")
    }
    ;
    If.prototype.o = function(a, b) {
        b.push("{");
        var c = "", e;
        for (e in a)
            if (Object.prototype.hasOwnProperty.call(a, e)) {
                var f = a[e];
                "function" != typeof f && (b.push(c),
                this.j(e, b),
                b.push(":"),
                this.g(this.b ? this.b.call(a, e, f) : f, b),
                c = ",")
            }
        b.push("}")
    }
    ;
    function Lf() {}
    ;function Mf() {}
    A(Mf, Lf);
    Mf.prototype.oa = function() {
        var a = 0;
        Lc(this.wb(!0), function() {
            a++
        });
        return a
    }
    ;
    Mf.prototype.clear = function() {
        var a = Mc(this.wb(!0))
          , b = this;
        bc(a, function(a) {
            b.remove(a)
        })
    }
    ;
    function Nf(a) {
        this.b = a
    }
    A(Nf, Mf);
    d = Nf.prototype;
    d.nB = function() {
        if (!this.b)
            return !1;
        try {
            return this.b.setItem("__sak", "1"),
            this.b.removeItem("__sak"),
            !0
        } catch (a) {
            return !1
        }
    }
    ;
    d.xh = function(a, b) {
        try {
            this.b.setItem(a, b)
        } catch (c) {
            if (0 == this.b.length)
                throw "Storage mechanism: Storage disabled";
            throw "Storage mechanism: Quota exceeded";
        }
    }
    ;
    d.get = function(a) {
        a = this.b.getItem(a);
        if (!v(a) && null !== a)
            throw "Storage mechanism: Invalid value was encountered";
        return a
    }
    ;
    d.remove = function(a) {
        this.b.removeItem(a)
    }
    ;
    d.oa = function() {
        return this.b.length
    }
    ;
    d.wb = function(a) {
        var b = 0
          , c = this.b
          , e = new Jc;
        e.next = function() {
            if (b >= c.length)
                throw Ic;
            var e;
            e = c.key(b++);
            if (a)
                return e;
            e = c.getItem(e);
            if (!v(e))
                throw "Storage mechanism: Invalid value was encountered";
            return e
        }
        ;
        return e
    }
    ;
    d.clear = function() {
        this.b.clear()
    }
    ;
    d.key = function(a) {
        return this.b.key(a)
    }
    ;
    function Of() {
        var a = null;
        try {
            a = window.localStorage || null
        } catch (b) {}
        this.b = a
    }
    A(Of, Nf);
    function Pf(a, b) {
        if (F && !Rb(9)) {
            Qf || (Qf = new Nc);
            this.ab = Qf.get(a);
            this.ab || (b ? this.ab = document.getElementById(b) : (this.ab = document.createElement("userdata"),
            this.ab.addBehavior("#default#userData"),
            document.body.appendChild(this.ab)),
            Qf.Jb(a, this.ab));
            this.bl = a;
            try {
                this.UH()
            } catch (c) {
                this.ab = null
            }
        }
    }
    A(Pf, Mf);
    var Rf = {
        ".": ".2E",
        "!": ".21",
        "~": ".7E",
        "*": ".2A",
        "'": ".27",
        "(": ".28",
        ")": ".29",
        "%": "."
    }
      , Qf = null;
    d = Pf.prototype;
    d.ab = null;
    d.bl = null;
    function Sf(a) {
        return "_" + encodeURIComponent(a).replace(/[.!~*'()%]/g, function(a) {
            return Rf[a]
        })
    }
    d.oB = function() {
        return !!this.ab
    }
    ;
    d.xh = function(a, b) {
        this.ab.setAttribute(Sf(a), b);
        this.il()
    }
    ;
    d.get = function(a) {
        a = this.ab.getAttribute(Sf(a));
        if (!v(a) && null !== a)
            throw "Storage mechanism: Invalid value was encountered";
        return a
    }
    ;
    d.remove = function(a) {
        this.ab.removeAttribute(Sf(a));
        this.il()
    }
    ;
    d.oa = function() {
        return this.pl().attributes.length
    }
    ;
    d.wb = function(a) {
        var b = 0
          , c = this.pl().attributes
          , e = new Jc;
        e.next = function() {
            if (b >= c.length)
                throw Ic;
            var e;
            e = c[b++];
            if (a)
                return decodeURIComponent(e.nodeName.replace(/\./g, "%")).substr(1);
            e = e.nodeValue;
            if (!v(e))
                throw "Storage mechanism: Invalid value was encountered";
            return e
        }
        ;
        return e
    }
    ;
    d.clear = function() {
        for (var a = this.pl(), b = a.attributes.length; 0 < b; b--)
            a.removeAttribute(a.attributes[b - 1].nodeName);
        this.il()
    }
    ;
    d.UH = function() {
        this.ab.load(this.bl)
    }
    ;
    d.il = function() {
        try {
            this.ab.save(this.bl)
        } catch (a) {
            throw "Storage mechanism: Quota exceeded";
        }
    }
    ;
    d.pl = function() {
        return this.ab.XMLDocument.documentElement
    }
    ;
    function Tf(a, b) {
        this.re = a;
        this.nd = b + "::"
    }
    A(Tf, Mf);
    d = Tf.prototype;
    d.re = null;
    d.nd = "";
    d.xh = function(a, b) {
        this.re.xh(this.nd + a, b)
    }
    ;
    d.get = function(a) {
        return this.re.get(this.nd + a)
    }
    ;
    d.remove = function(a) {
        this.re.remove(this.nd + a)
    }
    ;
    d.wb = function(a) {
        var b = this.re.wb(!0)
          , c = this
          , e = new Jc;
        e.next = function() {
            for (var e = b.next(); e.substr(0, c.nd.length) != c.nd; )
                e = b.next();
            return a ? e.substr(c.nd.length) : c.re.get(e)
        }
        ;
        return e
    }
    ;
    function Uf(a) {
        this.b = a
    }
    Uf.prototype.g = function(a, b) {
        s(b) ? this.b.xh(a, Ef(b)) : this.b.remove(a)
    }
    ;
    Uf.prototype.get = function(a) {
        var b;
        try {
            b = this.b.get(a)
        } catch (c) {
            return
        }
        if (null !== b)
            try {
                return Gf(b)
            } catch (e) {
                throw "Storage: Invalid value was encountered";
            }
    }
    ;
    Uf.prototype.remove = function(a) {
        this.b.remove(a)
    }
    ;
    function Vf(a) {
        this.b = a
    }
    A(Vf, Uf);
    function Wf(a) {
        this.data = a
    }
    function Xf(a) {
        return !s(a) || a instanceof Wf ? a : new Wf(a)
    }
    Vf.prototype.g = function(a, b) {
        Vf.B.g.call(this, a, Xf(b))
    }
    ;
    Vf.prototype.h = function(a) {
        a = Vf.B.get.call(this, a);
        if (!s(a) || a instanceof Object)
            return a;
        throw "Storage: Invalid value was encountered";
    }
    ;
    Vf.prototype.get = function(a) {
        if (a = this.h(a)) {
            if (a = a.data,
            !s(a))
                throw "Storage: Invalid value was encountered";
        } else
            a = void 0;
        return a
    }
    ;
    function Yf(a) {
        this.b = a
    }
    A(Yf, Vf);
    Yf.prototype.g = function(a, b, c) {
        if (b = Xf(b)) {
            if (c) {
                if (c < z()) {
                    Yf.prototype.remove.call(this, a);
                    return
                }
                b.expiration = c
            }
            b.creation = z()
        }
        Yf.B.g.call(this, a, b)
    }
    ;
    Yf.prototype.h = function(a, b) {
        var c = Yf.B.h.call(this, a);
        if (c) {
            var e;
            if (e = !b) {
                e = c.creation;
                var f = c.expiration;
                e = !!f && f < z() || !!e && e > z()
            }
            if (e)
                Yf.prototype.remove.call(this, a);
            else
                return c
        }
    }
    ;
    function Zf(a) {
        this.b = a
    }
    var $f = /\s*;\s*/;
    d = Zf.prototype;
    d.xR = function() {
        return navigator.cookieEnabled
    }
    ;
    d.QI = function(a) {
        return !/[;=\s]/.test(a)
    }
    ;
    d.RI = function(a) {
        return !/[;\r\n]/.test(a)
    }
    ;
    d.zj = function(a, b, c, e, f, g) {
        if (!this.QI(a))
            throw Error('Invalid cookie name "' + a + '"');
        if (!this.RI(b))
            throw Error('Invalid cookie value "' + b + '"');
        s(c) || (c = -1);
        f = f ? ";domain=" + f : "";
        e = e ? ";path=" + e : "";
        g = g ? ";secure" : "";
        c = 0 > c ? "" : 0 == c ? ";expires=" + (new Date(1970,1,1)).toUTCString() : ";expires=" + (new Date(z() + 1E3 * c)).toUTCString();
        this.SI(a + "=" + b + f + e + c + g)
    }
    ;
    d.get = function(a, b) {
        for (var c = a + "=", e = this.nl(), f = 0, g; g = e[f]; f++) {
            if (0 == g.lastIndexOf(c, 0))
                return g.substr(c.length);
            if (g == a)
                return ""
        }
        return b
    }
    ;
    d.remove = function(a, b, c) {
        var e = this.XI(a);
        this.zj(a, "", 0, b, c);
        return e
    }
    ;
    d.Bb = function() {
        return this.Oh().keys
    }
    ;
    d.sa = function() {
        return this.Oh().ws
    }
    ;
    d.Ta = function() {
        return !this.ol()
    }
    ;
    d.oa = function() {
        return this.ol() ? this.nl().length : 0
    }
    ;
    d.XI = function(a) {
        return s(this.get(a))
    }
    ;
    d.Rf = function(a) {
        for (var b = this.Oh().ws, c = 0; c < b.length; c++)
            if (b[c] == a)
                return !0;
        return !1
    }
    ;
    d.clear = function() {
        for (var a = this.Oh().keys, b = a.length - 1; 0 <= b; b--)
            this.remove(a[b])
    }
    ;
    d.SI = function(a) {
        this.b.cookie = a
    }
    ;
    d.ol = function() {
        return this.b.cookie
    }
    ;
    d.nl = function() {
        return (this.ol() || "").split($f)
    }
    ;
    d.Oh = function() {
        for (var a = this.nl(), b = [], c = [], e, f, g = 0; f = a[g]; g++)
            e = f.indexOf("="),
            -1 == e ? (b.push(""),
            c.push(f)) : (b.push(f.substring(0, e)),
            c.push(f.substring(e + 1)));
        return {
            keys: b,
            ws: c
        }
    }
    ;
    var ag = new Zf(document);
    ag.g = 3950;
    function bg(a, b) {
        return ag.get("yt-dev." + a, b)
    }
    function cg(a, b, c) {
        return ag.remove("yt-dev." + a, b || "/", c || "google.com")
    }
    ;function dg(a, b) {
        var c;
        b ? c = null : (c = new Of,
        (c = c.nB() ? a ? new Tf(c,a) : c : null) || (c = new Pf(a || "UserDataSharedStore"),
        c = c.oB() ? c : null));
        this.b = c ? new Yf(c) : null
    }
    dg.prototype.g = function() {
        return !!this.b
    }
    ;
    dg.prototype.h = function(a, b, c, e) {
        c = c || 31104E3;
        this.remove(a);
        if (this.g())
            try {
                this.b.g(a, b, z() + 1E3 * c);
                return
            } catch (f) {}
        var g = "";
        if (e)
            try {
                g = escape(Ef(b))
            } catch (k) {
                return
            }
        else
            g = escape(b);
        a = "yt-dev." + a;
        ag.zj(a, g, c, "/", document.domain || "google.com")
    }
    ;
    dg.prototype.get = function(a, b) {
        var c = void 0
          , e = !this.g();
        if (!e)
            try {
                c = this.b.get(a)
            } catch (f) {
                e = !0
            }
        if (e && (c = bg(a)) && (c = unescape(c),
        b))
            try {
                c = Gf(c)
            } catch (g) {
                this.remove(a),
                c = void 0
            }
        return c
    }
    ;
    dg.prototype.remove = function(a) {
        this.g() && this.b.remove(a);
        cg(a, "/", document.domain)
    }
    ;
    function O(a, b) {
        this.b = a;
        this.g = b
    }
    O.prototype.Nb = function() {}
    ;
    function eg(a, b) {
        O.call(this, a, b)
    }
    A(eg, O);
    eg.prototype.Nb = function() {
        var a = this.b.get("private_data");
        a && a["crash-data"] && (delete a["crash-data"],
        this.b.ya("private_data", a))
    }
    ;
    function fg(a, b) {
        O.call(this, a, b)
    }
    A(fg, O);
    fg.prototype.Nb = function() {
        this.b.ya("needs_rental_auth_dialog", !0)
    }
    ;
    function gg(a, b) {
        O.call(this, a, b)
    }
    A(gg, O);
    gg.prototype.Nb = function() {
        var a = this.b.get("recent-searches");
        if (a) {
            for (var b = 0, c = a.length; b < c; ++b) {
                var e = a[b];
                e.videoId = e.video ? e.video.videoId : null;
                delete e.video
            }
            this.b.ya("recent-searches", a)
        }
    }
    ;
    function hg(a, b) {
        O.call(this, a, b)
    }
    A(hg, O);
    hg.prototype.Nb = function() {
        this.b.ya("needs_rental_auth_dialog", !0);
        var a = this.b.get("sound-enabled", void 0, !0);
        a && this.b.ya("sound-enabled", "false" !== a);
        for (var b = ["captions-settings", "mdx-paired-devices", "private_data", "device-retention-permission", "recent-searches"], a = 0, c = b.length; a < c; ++a)
            this.b.get(b[a], void 0);
        b = [["mdx-device-id", void 0], ["tv-refresh-token", 15768E3]];
        a = 0;
        for (c = b.length; a < c; ++a) {
            var e = this.b.get(b[a][0], void 0, !0);
            e && this.b.ya(b[a][0], e, b[a][1])
        }
    }
    ;
    function ig(a, b) {
        O.call(this, a, b)
    }
    A(ig, O);
    ig.prototype.Nb = function() {
        this.b.remove("captions-settings")
    }
    ;
    function jg(a, b) {
        O.call(this, a, b)
    }
    A(jg, O);
    jg.prototype.Nb = function() {
        this.g.Vl || this.b.remove("recent-searches")
    }
    ;
    function kg(a, b) {
        O.call(this, a, b)
    }
    A(kg, O);
    kg.prototype.Nb = function() {
        for (var a = ["crash-count", "device-statistics", "activity-path", "spinner_log"], b = {}, c = a.length, e = 0; e < c; e++)
            b[a[e]] = this.b.get(a[e]);
        this.b.ya("private_data", b)
    }
    ;
    function lg(a, b) {
        O.call(this, a, b)
    }
    A(lg, O);
    lg.prototype.Nb = function() {
        var a = this.b.get("private_data");
        if (a && a["crash-count"]) {
            var b = {
                startup: 0
            };
            b["crash-count"] = a["crash-count"];
            a["crash-data"] = b;
            delete a["crash-count"];
            this.b.ya("private_data", a)
        }
    }
    ;
    function mg(a, b) {
        O.call(this, a, b)
    }
    A(mg, O);
    mg.prototype.Nb = function() {
        var a = this.b.get("leanback_oauth_renew");
        a && (this.b.get("tv-refresh-token") || this.b.ya("tv-refresh-token", a, 15768E3),
        this.b.remove("leanback_oauth_renew"))
    }
    ;
    function ng(a, b) {
        O.call(this, a, b)
    }
    A(ng, O);
    ng.prototype.Nb = function() {
        for (var a = ["tv-access-token", "activity-path", "saved-searches", "spinner_log"], b = this.b.get("private_data"), c = 0, e = a.length; c < e; ++c) {
            var f = a[c];
            this.b.remove(f);
            b && delete b[f]
        }
        b && this.b.ya("private_data", b)
    }
    ;
    var og = {
        0: O,
        1: O,
        2: O,
        3: O,
        4: kg,
        5: O,
        6: lg,
        7: O,
        8: mg,
        9: ng,
        10: eg,
        11: fg,
        12: gg,
        13: hg,
        14: ig,
        15: jg
    }
      , pg = {
        SO: "mdx-device-id",
        TO: "needs_rental_auth_dialog",
        VO: "mdx-paired-devices",
        WO: "private_data",
        XO: "device-retention-permission",
        ZO: "recent-searches",
        $O: "tv-refresh-token",
        dP: "schema-version",
        eP: "sound-enabled",
        NL: "innertube-visitor-data"
    }
      , qg = {
        kK: "tv-access-token",
        lK: "activity-path",
        oK: "captions-settings",
        aP: "leanback_oauth_renew",
        cP: "saved-searches",
        fP: "spinner_log"
    };
    function rg(a, b) {
        this.g = a;
        this.b = new dg("yt.leanback");
        if (this.b.g()) {
            var c = new dg("yt.leanback",!0);
            b.Uh && !this.xo(this.b) ? this.b = c : this.xo(c) && this.Hx(c)
        }
        for (var e, c = this.get("schema-version", 31536E4) || 0; 15 > c; )
            e = og[c],
            e = new e(this,b),
            e.Nb(),
            c++,
            this.ya("schema-version", c, 31536E4)
    }
    d = rg.prototype;
    d.xo = function(a) {
        return !!a.get("schema-version")
    }
    ;
    d.Hx = function(a) {
        var b = pg, c = [], e;
        for (e in b)
            c.push(b[e]);
        b = qg;
        for (e in b)
            c.push(b[e]);
        b = 0;
        for (e = c.length; b < e; ++b)
            a.remove(c[b])
    }
    ;
    d.ya = function(a, b, c, e) {
        this.b.h(a, b, c, !e)
    }
    ;
    d.get = function(a, b, c) {
        var e = this.b.get(a, !c);
        e && b && this.ya(a, e, b, c);
        return e
    }
    ;
    d.remove = function(a) {
        this.b.remove(a)
    }
    ;
    d.flush = function(a) {
        this.g.isSupported() && this.g.flush(a)
    }
    ;
    d.Kz = function() {
        var a = {}, b;
        for (b in pg) {
            var c = pg[b]
              , e = this.get(c);
            "tv-refresh-token" == c && e && (e = "XXXX-" + e.substr(e.length - 5));
            a[c] = e
        }
        return JSON.stringify(a, null, " ")
    }
    ;
    rg.inject = ["storageApi", "environmentModel"];
    function sg(a, b, c, e, f, g, k, l, n, p, u, r, E, R, ea) {
        this.j = g;
        this.g = u;
        this.sf = !!R;
        this.h = f.k ? n.getApiKey() : "AIzaSyAd-YEOqZz9nXVzGtn3KWzYLbLaajhqIDA";
        g = {
            context: {
                client: {
                    acceptLanguage: "en",
                    acceptRegion: "US",
                    clientName: "TVHTML5",
                    clientVersion: "4"
                }
            }
        };
        y(m("context.client", g), m("context.client", E));
        y(m("context", g), m("context", E));
        Df.call(this, a, b, c, e, f, k, l, r, ea, g, p)
    }
    A(sg, Df);
    d = sg.prototype;
    d.vf = function() {
        return this.b.useTestInnerTube ? "tin" : this.b.useReleaseInnerTube || this.b.Fe ? "sin" : "in"
    }
    ;
    d.qe = function() {
        return this.b.useTestInnerTube ? "//www-googleapis-test.sandbox.google.com/youtubei/vi" : this.b.useReleaseInnerTube || this.b.Fe ? "//www-googleapis-staging.sandbox.google.com/youtubei/v1release" : "//www.googleapis.com/youtubei/vi"
    }
    ;
    d.lc = function(a) {
        a = a || {};
        y(a, {
            key: this.h
        });
        return sg.B.lc.call(this, a)
    }
    ;
    d.Of = function() {
        return "POST"
    }
    ;
    d.load = function(a, b) {
        var c = !1, e, f = new ee(null,function() {
            e ? e.cancel() : c = !0
        }
        );
        this.j.zb(x(function(f) {
            if (!c) {
                var k = a || {};
                k.hasOwnProperty("innerTubeEndpointParams") && (y(k, k.innerTubeEndpointParams),
                delete k.innerTubeEndpointParams);
                var l = {
                    "Content-Type": "application/json"
                };
                f && (l.Authorization = "Bearer " + f);
                f = this.oq();
                f.serviceQuery = k.query;
                f.serviceQuery && this.k && (k[this.k] = f.serviceQuery);
                e = this.Hf(k, b, null, f, l, !0)
            }
        }, this));
        return f
    }
    ;
    d.Hf = function(a, b, c, e, f, g) {
        var k = this.lq();
        f = f || {};
        k && (f["X-Goog-Visitor-Id"] = k);
        sg.B.Hf.call(this, a, b, c, e, f, g)
    }
    ;
    d.lq = function() {
        var a = this.A.get("innertube", "visitorData");
        a || (a = this.g.get("innertube-visitor-data"),
        this.A.add("innertube", "visitorData", a));
        return a
    }
    ;
    d.kk = function(a, b, c, e) {
        var f = this.lq()
          , g = m("responseContext.visitorData", e);
        g && g != f && (this.g.ya("innertube-visitor-data", g),
        this.A.add("innertube", "visitorData", g));
        sg.B.kk.call(this, a, b, c, e)
    }
    ;
    d.fr = function(a) {
        a && this.w && (this.w.b && (a.context.client.acceptLanguage = this.w.b),
        this.w.j && (a.context.client.acceptRegion = this.w.j))
    }
    ;
    sg.inject = "id path csiService ytHttp environmentModel authService cacheService backendErrorReporting ssoApi locale localStorage parser opt_params opt_brandable opt_paramKey".split(" ");
    function tg(a) {
        this.videoId = a;
        this.cb = "loadingTile"
    }
    ;function ug(a, b) {
        this.g = b.p && b.isLimitedGraphics ? "http:" : a.location.protocol;
        this.b = /(lh[3-6].googleusercontent)/i;
        this.h = "yt3.ggpht"
    }
    d = ug.prototype;
    d.Oi = function(a) {
        return a.replace(this.b, "yt3.ggpht")
    }
    ;
    d.Pb = function(a) {
        return a ? this.Hs(this.hJ(a), "i", "1") : ""
    }
    ;
    d.Je = function(a, b) {
        return this.Hs(a, "vi", b)
    }
    ;
    d.Hs = function(a, b, c) {
        return "https://i1.ytimg.com/" + b + "/" + a + "/" + c + ".jpg"
    }
    ;
    d.hJ = function(a) {
        return 24 == a.length ? a.substr(2) : a
    }
    ;
    ug.inject = ["window", "environmentModel"];
    function vg(a) {
        K.call(this);
        this.length = 0;
        this.items = [];
        a && this.push(a)
    }
    A(vg, K);
    d = vg.prototype;
    d.push = function(a) {
        this.Ws("push", a)
    }
    ;
    d.unshift = function(a) {
        this.Ws("unshift", a)
    }
    ;
    d.la = function() {
        return this.items
    }
    ;
    d.ia = function(a) {
        return this.items[a]
    }
    ;
    d.ha = function(a) {
        this.items = a.slice();
        this.length = a.length;
        this.Tf(this.items)
    }
    ;
    d.lT = function(a, b) {
        this.items[a] = b;
        this.length = this.items.length;
        this.Tf(b)
    }
    ;
    d.P = function() {
        return this.length
    }
    ;
    d.slice = function(a, b) {
        var c;
        switch (arguments.length) {
        case 0:
            c = this.items.slice();
            break;
        case 1:
            c = this.items.slice(a);
            break;
        case 2:
            c = this.items.slice(a, b)
        }
        return new vg(c)
    }
    ;
    d.splice = function(a, b, c) {
        var e;
        switch (arguments.length) {
        case 0:
            e = this.items.splice();
            break;
        case 1:
            e = this.items.splice(a);
            break;
        case 2:
            e = this.items.splice(a, b);
            break;
        default:
            e = this.items.splice.apply(this.items, arguments)
        }
        this.length = this.items.length;
        this.Tf(this.items);
        return new vg(e)
    }
    ;
    d.clear = function() {
        this.length = this.items.length = 0;
        this.Tf()
    }
    ;
    d.Sz = function(a) {
        function b(a, b) {
            return a - b
        }
        this.items.sort(a || b);
        return this
    }
    ;
    d.Tf = function(a) {
        this.L("items:changed", a)
    }
    ;
    d.Ws = function(a, b) {
        var c = t(b) ? b : [b]
          , e = c.length;
        0 < e && (this.items[a].apply(this.items, c),
        this.length += e,
        this.Tf(b))
    }
    ;
    function wg(a, b) {
        vg.call(this);
        this.g = a;
        this.b = {};
        b && this.push(b)
    }
    A(wg, vg);
    d = wg.prototype;
    d.clear = function() {
        this.b = {};
        wg.B.clear.call(this)
    }
    ;
    d.slice = function(a, b) {
        return new wg(this.g,wg.B.slice.call(this, a, b).la())
    }
    ;
    d.push = function(a) {
        wg.B.push.call(this, this.Mr(a))
    }
    ;
    d.unshift = function(a) {
        wg.B.unshift.call(this, this.Mr(a, !0))
    }
    ;
    d.Mr = function(a, b) {
        return (t(a) ? a : [a]).filter(b ? this.jJ : this.iJ, this)
    }
    ;
    d.iJ = function(a) {
        if ((a = a && a[this.g]) && this.b[a])
            return !1;
        a && (this.b[a] = !0);
        return !0
    }
    ;
    d.jJ = function(a) {
        if (a = a && a[this.g]) {
            if (this.b[a]) {
                var b = this.Yx(a);
                if (0 > b)
                    return !1;
                this.items.splice(b, 1);
                this.length = this.items.length
            }
            this.b[a] = !0
        }
        return !0
    }
    ;
    d.Yx = function(a) {
        for (var b = 0; b < this.P(); ++b)
            if (this.items[b][this.g] === a)
                return b;
        return -1
    }
    ;
    function P() {
        this.title = this.serviceQuery = this.Ga = this.Ha = this.mg = this.Vc = "";
        this.Rb = 0;
        this.Ya = "";
        this.Y = new wg("videoId");
        this.b = null
    }
    P.prototype.P = function() {
        return this.Y.P()
    }
    ;
    P.prototype.clone = function() {
        var a = new P;
        a.Vc = this.Vc;
        a.mg = this.mg;
        a.Ha = this.Ha;
        a.Ga = this.Ga;
        a.serviceQuery = this.serviceQuery;
        a.title = this.title;
        a.Rb = this.Rb;
        a.Y = this.Y.slice(0, this.Y.P());
        return a
    }
    ;
    function Ua(a, b, c, e, f) {
        K.call(this);
        this.model = new P;
        this.service = a;
        this.activeIndex = 0;
        this.k = f || new mb;
        this.sf = !!a.sf;
        this.cb = null;
        this.model.title = b || "";
        this.model.Ya = c;
        this.model.Ga = a.id;
        this.model.serviceQuery = e || ""
    }
    A(Ua, K);
    Xc(Ua, ["activeIndex", "model"]);
    d = Ua.prototype;
    d.P = function() {
        return this.model ? this.model.Y.P() : 0
    }
    ;
    d.Zi = function(a) {
        return !!(a && a.model && this.model && a.model.P() === this.model.P() && a.model.serviceQuery === this.model.serviceQuery && a.model.title === this.model.title)
    }
    ;
    d.Ln = function() {
        return this.ia(this.activeIndex)
    }
    ;
    d.load = function(a, b) {
        var c = {
            query: this.model.serviceQuery
        };
        y(c, this.k);
        b && this.service.Sb && this.service.Sb("start_browse", "fr_rq", "fr_rs", "fr_r");
        this.service.load(c, x(function(b) {
            b.errorMessage && (this.errorMessage = b.errorMessage);
            this.clear();
            this.model.Y.push(b.Y.la());
            a && a(b)
        }, this))
    }
    ;
    d.clear = function() {
        this.model.Y.clear()
    }
    ;
    d.ia = function(a) {
        return this.model && this.model.Y ? this.model.Y.ia(a) : null
    }
    ;
    d.Xj = function(a, b) {
        var c = -1;
        this.model && this.model.Y && this.model.Y.la().some(function(e, f) {
            if (e[a] === b)
                return c = f,
                !0
        });
        return c
    }
    ;
    d.tk = function() {
        return this.model.Y
    }
    ;
    d.kh = function() {
        return !1
    }
    ;
    d.Sc = function(a) {
        this.activeIndex = a
    }
    ;
    function Q(a, b, c, e, f) {
        Ua.call(this, a, b, c, e, f);
        this.b = [];
        this.g = [];
        this.numLoadedPages = 0;
        this.Qa = "";
        this.o = null
    }
    A(Q, Ua);
    Xc(Q, ["numLoadedPages"]);
    d = Q.prototype;
    d.clear = function() {
        for (var a = 0, b = this.b.length; a < b; ++a)
            this.b[a] && (this.b[a].collection = null);
        a = 0;
        for (b = this.g.length; a < b; ++a) {
            var c = this.g[a];
            c.g && (c.g.cancel && c.g.cancel(),
            c.g = null)
        }
        this.numLoadedPages = 0;
        Q.B.clear.call(this)
    }
    ;
    d.Bv = function() {
        this.clear();
        this.b = [];
        this.g = [];
        this.Sc(0)
    }
    ;
    d.Ou = function(a) {
        this.o = a
    }
    ;
    d.im = function(a) {
        return a.every(function(a) {
            a = this.b[a.index];
            return !(!a || !a.collection || a.error)
        }, this)
    }
    ;
    d.load = function(a, b) {
        var c = this.Ux()
          , e = a || q;
        if (this.im(c))
            e();
        else {
            var f, g = !!b;
            this.g = c;
            for (var k = 0, l = c.length; k < l; ++k) {
                var n = c[k];
                (f = this.b[n.index]) && f.collection && !f.error || this.Vx(n, c, e, g);
                g && (g = !1)
            }
        }
    }
    ;
    d.Vx = function(a, b, c, e) {
        var f = {}
          , g = null;
        this.b.length && a.index && (g = this.b[a.index - 1]);
        g && g.h ? f.continuation = g.h : (f["start-index"] = 25 * a.index + 1,
        f["max-results"] = 25);
        f.continuation || (f.query = this.model.serviceQuery);
        y(f, this.k);
        e && this.service.Sb && this.service.Sb("start_browse", "fr_rq", "fr_rs", "fr_r");
        a.g = this.service.load(f, x(this.sg, this, a, b, c), x(this.xv, this, a, b, c))
    }
    ;
    d.sg = function(a, b, c, e) {
        a.g = null;
        a.collection = e;
        a.b = e.Y.P();
        this.b[a.index] = a;
        a.error = !1;
        a.h = e.b;
        this.model.Rb = e.Rb;
        if (this.im(b)) {
            a = new wg("videoId");
            for (var f = 0, g = 0, k = this.b.length; g < k; ++g) {
                var l = this.b[g];
                l.j = a.P();
                if (l.collection && 0 < l.b)
                    a.push(l.collection.Y.la());
                else
                    for (var n = 0; n < l.b; ++n)
                        a.push(new tg(f.toString())),
                        f++
            }
            this.model.Y.ha(a.la());
            this.numLoadedPages += b.length;
            this.g = [];
            c()
        }
        this.model.title || (e.Vc && "UU" == e.Ha ? (this.model.title = e.Vc,
        this.model.Ya = this.o.Pb(e.mg),
        this.L("model:changed", this.model)) : e.title && (this.model.title = e.title,
        this.L("model:changed", this.model)))
    }
    ;
    d.xv = function(a, b, c) {
        this.sg(a, b, c, new P);
        this.b[a.index].error = !0;
        b.some(function(a) {
            return this.b[a.index].error
        }, this) && (this.g = [],
        c())
    }
    ;
    d.Vp = function() {
        if (0 === this.activeIndex)
            return 0;
        for (var a = 0, b, c = 0, e = this.b.length; c < e; ++c)
            if (b = this.b[c])
                if (a += b.b,
                this.activeIndex < a)
                    return b.index;
        return 0
    }
    ;
    d.Vy = function() {
        return this.b[this.Vp()]
    }
    ;
    d.Ux = function() {
        var a = this.ij()
          , b = [a]
          , c = this.activeIndex - a.j;
        a.index && 5 >= c && b.unshift(this.ij(-1));
        var e = !!a.h || !(this.service instanceof sg);
        a.b && e && c >= a.b - 5 && b.push(this.ij(1));
        return b.filter(function(a) {
            return a.error || !a.collection
        })
    }
    ;
    d.ij = function(a) {
        a = a || 0;
        a = this.Vp() + a;
        var b = this.b[a];
        return b ? b : new xg(a)
    }
    ;
    d.kh = function(a) {
        var b = this.Vy()
          , c = this.activeIndex - b.j;
        return 0 < a ? c === b.b - 5 : 5 === c
    }
    ;
    function xg(a) {
        this.collection = null;
        this.b = 0;
        this.g = null;
        this.index = a;
        this.j = 0;
        this.h = null
    }
    ;function yg(a, b, c, e, f) {
        Q.call(this, a, b, c, e, f);
        this.h = [];
        this.l = NaN
    }
    A(yg, Q);
    yg.prototype.j = function(a) {
        this.h.push(a)
    }
    ;
    yg.prototype.p = function(a) {
        this.l = a
    }
    ;
    yg.prototype.sg = function(a, b, c, e) {
        var f = x(function() {
            var a = this.h.concat(this.tk().la());
            isNaN(this.l) || a.splice(this.l);
            this.tk().ha(a);
            c()
        }, this);
        yg.B.sg.call(this, a, b, f, e)
    }
    ;
    function zg(a, b, c, e, f, g, k) {
        this.w = a;
        this.h = b;
        this.l = c;
        this.p = e;
        this.j = f;
        this.o = g;
        this.k = k;
        this.b = this.g = null
    }
    d = zg.prototype;
    d.de = function(a, b, c, e, f) {
        this.g = a;
        this.b = b;
        this.Ox();
        this.Mx() && this.Px();
        this.Nx(c, e, f);
        this.Qx()
    }
    ;
    d.Ox = function() {
        var a = this.h.lb("start_watch") || this.h.lb("start_dial") || this.h.lb("start_browse");
        a && a.tick("app_rq_ply")
    }
    ;
    d.Mx = function() {
        return !this.b || "remoteQueueService" != this.b.service.id && "playlistService" != this.b.service.id
    }
    ;
    d.Px = function() {
        this.DI() ? this.FI() : this.CI() && this.EI()
    }
    ;
    d.DI = function() {
        return "search" == this.j.b().mode
    }
    ;
    d.CI = function() {
        return "watch" === this.j.g() && "post-play" == this.j.b().mode
    }
    ;
    d.FI = function() {
        this.o.Km(this.b);
        this.b = new yg(this.k,"[[Now Playing|Title for currently playing playlists.]]","/icon-related.png",this.g.videoId);
        this.b.j(this.g)
    }
    ;
    d.EI = function() {
        "RV" === this.g.Ha ? this.b = new Q(this.k,"[[Related Videos|Title for playlist that shows videos related to the one currently is playing.]]","/icon-related.png",this.g.videoId) : this.b = this.l.gg()
    }
    ;
    d.Nx = function(a, b, c) {
        a = this.l.Ie(this.g, this.b, a || 0, b || !1, c || !1);
        this.p.fi(a)
    }
    ;
    d.Qx = function() {
        this.w.L("goto-watch", this.g.videoId)
    }
    ;
    zg.inject = "rootDispatcher csiService watchModel remoteService routerService browseModel relatedVideosService".split(" ");
    function Ag(a, b) {
        this.b = a;
        this.h = b
    }
    Ag.prototype.de = function(a, b) {
        this.b.bb(a, x(this.g, this, b || 0))
    }
    ;
    Ag.prototype.g = function(a, b) {
        var c = new Ua(this.b,b.title,"",b.serviceQuery);
        b.Ya = "icon-guide-playlists";
        c.model = b;
        this.h.L("cmd-playback", c.ia(0), c, a)
    }
    ;
    Ag.inject = ["playlistService", "rootDispatcher"];
    function Bg(a) {
        this.g = a;
        this.b = [{
            event: "cmd-go-back",
            command: Sa
        }, {
            event: "cmd-load-video-from-service",
            command: Ta
        }, {
            event: "cmd-playback",
            command: zg
        }, {
            event: "cmd-playlist-playback",
            command: Ag
        }]
    }
    Bg.prototype.xa = function() {
        for (var a = 0, b = this.b.length; a < b; ++a) {
            var c = this.b[a];
            this.g.register(c.event, c.command)
        }
    }
    ;
    Bg.inject = ["commandCenter"];
    function Cg(a) {
        if (a.classList)
            return a.classList;
        a = a.className;
        return v(a) && a.match(/\S+/g) || []
    }
    function Dg(a, b) {
        return a.classList ? a.classList.contains(b) : I(Cg(a), b)
    }
    function Eg(a, b) {
        a.classList ? a.classList.add(b) : Dg(a, b) || (a.className += 0 < a.className.length ? " " + b : b)
    }
    function Fg(a, b) {
        if (a.classList)
            bc(b, function(b) {
                Eg(a, b)
            });
        else {
            var c = {};
            bc(Cg(a), function(a) {
                c[a] = !0
            });
            bc(b, function(a) {
                c[a] = !0
            });
            a.className = "";
            for (var e in c)
                a.className += 0 < a.className.length ? " " + e : e
        }
    }
    function Gg(a, b) {
        a.classList ? a.classList.remove(b) : Dg(a, b) && (a.className = dc(Cg(a), function(a) {
            return a != b
        }).join(" "))
    }
    function Hg(a, b, c) {
        c ? Eg(a, b) : Gg(a, b)
    }
    ;function Ig(a, b, c) {
        v(b) ? Jg(a, c, b) : rc(b, ma(Jg, a))
    }
    function Jg(a, b, c) {
        var e;
        t: if (e = kb(c),
        void 0 === a.style[e] && (c = (Bb ? "Webkit" : Ab ? "Moz" : F ? "ms" : zb ? "O" : null) + lb(c),
        void 0 !== a.style[c])) {
            e = c;
            break t
        }
        e && (a.style[e] = b)
    }
    ;function Kg(a, b) {
        this.h = b || {};
        this.b = a && (a.$inject || a.inject) || []
    }
    A(Kg, ad);
    Kg.prototype.T = function() {
        this.b = this.h = null;
        Kg.B.T.call(this)
    }
    ;
    function Lg(a, b, c) {
        if (!(a instanceof Function))
            throw Error("registerCallable called with a non-function, did you mean to call register?");
        Kg.call(this, a, c);
        this.g = a
    }
    A(Lg, Kg);
    Lg.prototype.get = function(a) {
        return this.g.apply(null, a)
    }
    ;
    Lg.prototype.T = function() {
        this.g = null;
        Lg.B.T.call(this)
    }
    ;
    function Mg(a) {
        for (var b = Array.prototype.slice.call(arguments), c; !c && b.length; )
            c = b.shift();
        for (var e = b.length, f, g = 0; g < e; ++g)
            f = b[g],
            f.id && !c.id && (c.id = f.id),
            Fg(c, Cg(f));
        return c
    }
    ;function Ng(a, b, c) {
        if (!(a instanceof Function))
            throw "registerConstructor called with a non-function, did you mean to call register?";
        Kg.call(this, a, c);
        this.k = a
    }
    A(Ng, Kg);
    Ng.prototype.l = function(a, b) {
        for (var c = 0, e = b.length; c < e; ++c) {
            var f = b[c];
            if (a.hasOwnProperty(f))
                a = a[f];
            else
                return !1
        }
        return a
    }
    ;
    Ng.prototype.get = function(a) {
        var b = this.k;
        switch (a.length) {
        case 0:
            return new b;
        case 1:
            return new b(a[0]);
        case 2:
            return new b(a[0],a[1]);
        case 3:
            return new b(a[0],a[1],a[2]);
        case 4:
            return new b(a[0],a[1],a[2],a[3]);
        case 5:
            return new b(a[0],a[1],a[2],a[3],a[4]);
        case 6:
            return new b(a[0],a[1],a[2],a[3],a[4],a[5]);
        case 7:
            return new b(a[0],a[1],a[2],a[3],a[4],a[5],a[6]);
        case 8:
            return new b(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]);
        case 9:
            return new b(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8]);
        case 10:
            return new b(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9]);
        case 11:
            return new b(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10]);
        case 12:
            return new b(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11]);
        case 13:
            return new b(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12]);
        case 14:
            return new b(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13]);
        case 15:
            return new b(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14]);
        default:
            var c = function() {};
            c.prototype = b.prototype;
            c = new c;
            a = b.apply(c, a);
            return Object(a) === a ? a : c
        }
    }
    ;
    Ng.prototype.T = function() {
        this.k = null;
        Ng.B.T.call(this)
    }
    ;
    function Og(a, b, c, e, f) {
        if (!(a instanceof Function))
            throw "registerComponent called with a non-function, did you mean to call register?";
        this.g = b;
        (this.j = e) && b.M(e, void 0, f);
        Ng.call(this, a, b, c)
    }
    A(Og, Ng);
    Og.prototype.get = function(a) {
        a = Og.B.get.call(this, a);
        a.injector = this.g;
        a.xa();
        if (this.j) {
            var b = this.g.get(this.j);
            b instanceof Function ? a.G = Mg(a.G, b()) : a.template = b
        }
        a.xp();
        a.createElement();
        return a
    }
    ;
    Og.prototype.T = function() {
        this.g = null;
        Og.B.T.call(this)
    }
    ;
    function Pg(a, b, c) {
        a.h && a.h(b, c)
    }
    ;function Qg(a, b, c, e) {
        a = Le(a).createEvent("Event");
        a.initEvent(b, c, !0);
        a.detail = e;
        return a
    }
    function Rg(a, b, c, e, f) {
        a = Qg(a, b, e);
        a.which = c;
        a.charCode = c;
        a.keyCode = c;
        a.g = f;
        return a
    }
    function S(a, b, c) {
        a.stopPropagation();
        c && a.stopImmediatePropagation && a.stopImmediatePropagation();
        b || a.preventDefault()
    }
    ;function Sg() {
        K.call(this);
        this.Wa = !1;
        this.G = null
    }
    A(Sg, K);
    d = Sg.prototype;
    d.ns = function() {}
    ;
    d.C = function(a, b, c) {
        if (this.G)
            return this.G.addEventListener(a, b, !!c),
            x(this.G.removeEventListener, this.G, a, b, !!c);
        throw Error("Attempt to register event on " + a + " before DOM element is available.");
    }
    ;
    d.L = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        this.Ms(a, !1, c)
    }
    ;
    d.V = function(a, b) {
        this.Ms(a, !0, b)
    }
    ;
    d.Ms = function(a, b, c) {
        this.Wa = this.Wa || !!this.G;
        if (this.G)
            a = Qg(this.G, a, b, c),
            this.G.dispatchEvent(a);
        else {
            if (this.Wa)
                throw Error("Attempt to dispatch " + a + " without DOM element.");
            if (!B(a, ":changed"))
                throw Error("Attempt to dispatch " + a + " before DOM element is available.");
        }
    }
    ;
    d.T = function() {
        De(this.G);
        this.G = null;
        Sg.B.T.call(this)
    }
    ;
    function Tg() {
        Sg.call(this);
        this.da = []
    }
    A(Tg, Sg);
    d = Tg.prototype;
    d.C = function(a, b, c, e) {
        return this.vr(Tg.B.C.call(this, a, b, c), this, a, e ? "l" : void 0)
    }
    ;
    d.aa = function(a, b, c) {
        return this.vr(a.C(b, c), a, b)
    }
    ;
    d.vr = function(a, b, c, e) {
        function f() {
            for (var b = 0, c = g.length; b < c; ++b)
                if (g[b].$k === f) {
                    g.splice(b, 1);
                    break
                }
            a()
        }
        var g = this.da;
        g.push({
            XG: e,
            ib: b,
            event: c,
            $k: f
        });
        return f
    }
    ;
    d.pf = function(a) {
        a = a || null;
        for (var b = this.da.length - 1; 0 <= b; --b) {
            var c = this.da[b];
            c.XG == a && c.$k()
        }
    }
    ;
    d.Af = function(a, b) {
        for (var c = this.da.length - 1; 0 <= c; --c) {
            var e = this.da[c];
            e.ib !== a || null != b && b != e.event || e.$k()
        }
    }
    ;
    d.T = function() {
        this.pf();
        this.pf("l");
        Tg.B.T.call(this)
    }
    ;
    function Ug(a, b, c) {
        Kg.call(this, a, c);
        this.g = a
    }
    A(Ug, Kg);
    Ug.prototype.get = function() {
        return this.g
    }
    ;
    Ug.prototype.T = function() {
        bd(this.g);
        this.g = null;
        Ug.B.T.call(this)
    }
    ;
    function Vg(a, b, c) {
        Lg.call(this, a, b, c);
        this.ib = null
    }
    A(Vg, Lg);
    Vg.prototype.get = function(a) {
        this.ib || (this.ib = Vg.B.get.call(this, a));
        return this.ib
    }
    ;
    Vg.prototype.T = function() {
        bd(this.ib);
        this.ib = null;
        Vg.B.T.call(this)
    }
    ;
    function Wg(a, b, c) {
        if (!(a instanceof Function))
            throw Error("registerSingleton called with a non-function, did you mean to call register?");
        Ng.call(this, a, b, c);
        this.ib = null
    }
    A(Wg, Ng);
    Wg.prototype.get = function(a) {
        this.ib || (this.ib = Wg.B.get.call(this, a));
        return this.ib
    }
    ;
    Wg.prototype.T = function() {
        bd(this.ib);
        this.ib = null;
        Wg.B.T.call(this)
    }
    ;
    /*


 The MIT License.

 Copyright (c) 2010-2012 Google, Inc. http://angularjs.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 @fileoverview JavaScript parser originally found in Angular.js. Modified for
 Google3 style and Closure integration. Where possible, methods that were
 defined inside of deeper, looped lexical scopes have been pulled up to only
 be defined once. Many definitions require the inner lexical scope to work
 properly and have therefore been left in place.
*/
    var Xg;
    (function() {
        function a(a) {
            if (Eb.hasOwnProperty(a))
                return Eb[a];
            var b, c = "var l, fn, p;\n";
            b = a.split(".");
            for (var e = b.length, f = 0; f < e; ++f)
                var g = b[f]
                  , c = c + ("if(!s) return s;\nl=s;\ns=" + (f ? "s" : '((k&&k.hasOwnProperty("' + g + '"))?k:s)') + '["' + g + '"];\nif (s && s.then) {\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n');
            c += "return s;";
            b = Function("s", "k", c);
            b.toString = function() {
                return c
            }
            ;
            return Eb[a] = b
        }
        function b(a, b, c) {
            b = b.split(".");
            for (var e = 0; 1 < b.length; e++) {
                var f = b.shift()
                  , g = a[f];
                g || (g = {},
                a[f] = g);
                a = g
            }
            return a[b.shift()] = c
        }
        function c(c) {
            function e(a) {
                var b = n;
                n++;
                for (var f = "", g = a, l = !1; n < c.length; ) {
                    var p = c.charAt(n)
                      , g = g + p;
                    if (l)
                        "u" == p ? (p = c.substring(n + 1, n + 5),
                        p.match(/[\da-f]{4}/i) || u("Invalid unicode escape [\\u" + p + "]", c, n),
                        n += 4,
                        f += String.fromCharCode(parseInt(p, 16))) : f = (l = fb[p]) ? f + l : f + p,
                        l = !1;
                    else if ("\\" == p)
                        l = !0;
                    else {
                        if (p == a) {
                            n++;
                            k.push({
                                index: b,
                                text: g,
                                KA: f,
                                Lc: !0,
                                Ra: function() {
                                    return f
                                }
                            });
                            return
                        }
                        f += p
                    }
                    n++
                }
                u("Unterminated quote", c, n, b)
            }
            function f() {
                for (var e = "", g = n, l, p, C; n < c.length; ) {
                    var u = c.charAt(n);
                    if ("." == u || R(u) || ia(u))
                        "." == u && (l = n),
                        e += u;
                    else
                        break;
                    n++
                }
                if (l)
                    for (p = n; p < c.length; ) {
                        u = c.charAt(p);
                        if ("(" == u) {
                            C = e.substr(l - g + 1);
                            e = e.substr(0, l - g);
                            n = p;
                            break
                        }
                        if (ea(u))
                            p++;
                        else
                            break
                    }
                g = {
                    index: g,
                    text: e
                };
                if (Ea.hasOwnProperty(e))
                    g.Ra = g.Lc = Ea[e];
                else {
                    var Ph = a(e);
                    g.Ra = ec(function(a, b) {
                        return Ph(a, b)
                    }, {
                        assign: function(a, c) {
                            return b(a, e, c)
                        }
                    })
                }
                k.push(g);
                C && (k.push({
                    index: l,
                    text: ".",
                    Lc: !1
                }),
                k.push({
                    index: l + 1,
                    text: C,
                    Lc: !1
                }))
            }
            function g() {
                for (var a = "", b = n; n < c.length; ) {
                    var e = r(c.charAt(n));
                    if ("." == e || ia(e))
                        a += e;
                    else {
                        var f = n + 1 < c.length ? c.charAt(n + 1) : !1;
                        if ("e" == e && E(f))
                            a += e;
                        else if (E(e) && f && ia(f) && "e" == a.charAt(a.length - 1))
                            a += e;
                        else if (!E(e) || f && ia(f) || "e" != a.charAt(a.length - 1))
                            break;
                        else
                            u("Invalid exponent", c, n)
                    }
                    n++
                }
                a = 1 * a;
                k.push({
                    index: b,
                    text: a,
                    Lc: !0,
                    Ra: function() {
                        return a
                    }
                })
            }
            for (var k = [], l, n = 0, p = [], N, Fa = ":"; n < c.length; ) {
                N = c.charAt(n);
                if (-1 != "\"'".indexOf(N))
                    e(N);
                else if (ia(N) || -1 != ".".indexOf(N) && ia(n + 1 < c.length ? c.charAt(n + 1) : !1))
                    g();
                else if (R(N))
                    f(),
                    -1 != "{,".indexOf(Fa) && "{" == p[0] && (l = k[k.length - 1]) && (l.Lc = -1 == l.text.indexOf("."));
                else if (-1 != "(){}[].,;:".indexOf(N))
                    k.push({
                        index: n,
                        text: N,
                        Lc: -1 != ":[,".indexOf(Fa) && -1 != "{[".indexOf(N) || -1 != "}]:,".indexOf(N)
                    }),
                    -1 != "{[".indexOf(N) && p.unshift(N),
                    -1 != "}]".indexOf(N) && p.shift(),
                    n++;
                else if (ea(N)) {
                    n++;
                    continue
                } else {
                    var pa = N + (n + 1 < c.length ? c.charAt(n + 1) : !1)
                      , Fb = Ea[N]
                      , gb = Ea[pa];
                    gb ? (k.push({
                        index: n,
                        text: pa,
                        Ra: gb
                    }),
                    n += 2) : Fb ? (Fa = -1 != "[,:".indexOf(Fa) && -1 != "+-".indexOf(N),
                    k.push({
                        index: n,
                        text: N,
                        Ra: Fb,
                        Lc: Fa
                    }),
                    n += 1) : u("Unexpected next character ", c, n, n, n + 1)
                }
                Fa = N
            }
            return k
        }
        function e(a, b, c) {
            return function(e, f) {
                return b(e, f, a, c)
            }
        }
        function f(a, b) {
            return function(c, e) {
                return a(c, e, b)
            }
        }
        function g(a, b, c, e) {
            k(a, b, c, e) || p("is unexpected, expecting [" + e + "]", c, n(b))
        }
        function k(a, b, c, e, f, g, k) {
            return (e = n(b, e, f, g, k)) ? (a && !e.Lc && p("is not valid json", c, e),
            b.shift(),
            e) : !1
        }
        function l(a) {
            if (0 === a.length)
                throw Error("Unexpected end of expression.");
            return a[0]
        }
        function n(a, b, c, e, f) {
            if (0 < a.length) {
                a = a[0];
                var g = a.text;
                if (g == b || g == c || g == e || g == f || !(b || c || e || f))
                    return a
            }
            return !1
        }
        function p(a, b, c) {
            throw Error('Syntax Error: Token "' + c.text + '" ' + a + " at column " + (c.index + 1) + " of the expression [" + b + "] starting at [" + b.substring(c.index) + "].");
        }
        function u(a, b, c, e, f) {
            f = f || c;
            throw Error("Lexer Error: " + a + " at column" + (void 0 !== e ? "s " + e + "-" + c + " [" + b.substring(e, f) + "]" : " " + f) + " in expression [" + b + "].");
        }
        function r(a) {
            return a.toLowerCase()
        }
        function E(a) {
            return "-" == a || "+" == a || ia(a)
        }
        function R(a) {
            return "a" <= a && "z" >= a || "A" <= a && "Z" >= a || "_" == a || "$" == a
        }
        function ea(a) {
            return " " == a || "\r" == a || "\t" == a || "\n" == a || "\v" == a || "\u00a0" == a
        }
        function ia(a) {
            return "0" <= a && "9" >= a
        }
        function pa() {}
        function ec(a, b) {
            for (var c = Array.prototype.slice.call(arguments, 1), e = c.length, f = 0; f < e; ++f) {
                var g = c[f], k;
                for (k in g)
                    a[k] = g[k]
            }
            return a
        }
        var fb = {
            n: "\n",
            f: "\f",
            r: "\r",
            t: "\t",
            v: "\v",
            "'": "'",
            '"': '"'
        }
          , gb = function(a) {
            return function() {
                return a
            }
        }(0)
          , Ea = {
            "null": function() {
                return null
            },
            "true": function() {
                return !0
            },
            "false": function() {
                return !1
            },
            b: pa,
            "+": function(a, b, c, e) {
                c = c(a, b);
                e = e(a, b);
                return (void 0 !== c ? c : 0) + (void 0 !== e ? e : 0)
            },
            "-": function(a, b, c, e) {
                c = c(a, b);
                e = e(a, b);
                return (void 0 !== c ? c : 0) - (void 0 !== e ? e : 0)
            },
            "*": function(a, b, c, e) {
                return c(a, b) * e(a, b)
            },
            "/": function(a, b, c, e) {
                return c(a, b) / e(a, b)
            },
            "%": function(a, b, c, e) {
                return c(a, b) % e(a, b)
            },
            "^": function(a, b, c, e) {
                return c(a, b) ^ e(a, b)
            },
            "=": pa,
            "==": function(a, b, c, e) {
                return c(a, b) == e(a, b)
            },
            "!=": function(a, b, c, e) {
                return c(a, b) != e(a, b)
            },
            "<": function(a, b, c, e) {
                return c(a, b) < e(a, b)
            },
            ">": function(a, b, c, e) {
                return c(a, b) > e(a, b)
            },
            "<=": function(a, b, c, e) {
                return c(a, b) <= e(a, b)
            },
            ">=": function(a, b, c, e) {
                return c(a, b) >= e(a, b)
            },
            "&&": function(a, b, c, e) {
                return c(a, b) && e(a, b)
            },
            "||": function(a, b, c, e) {
                return c(a, b) || e(a, b)
            },
            "&": function(a, b, c, e) {
                return c(a, b) & e(a, b)
            },
            "|": function(a, b, c, e) {
                return e(a, b) | c(a, b)
            },
            "!": function(a, b, c) {
                return !c(a, b)
            }
        }
          , Eb = {};
        Xg = function(r, C, E) {
            function R() {
                var a = [];
                if ("}" != l(D).text) {
                    do {
                        var b = k(C, D, r)
                          , b = b.KA || b.text;
                        g(C, D, r, ":");
                        var c = eb();
                        a.push({
                            key: b,
                            value: c
                        })
                    } while (k(C, D, r, ","))
                }
                g(C, D, r, "}");
                return function(b, c) {
                    for (var e = {}, f = 0; f < a.length; f++) {
                        var g = a[f]
                          , k = g.value(b, c);
                        e[g.key] = k
                    }
                    return e
                }
            }
            function ea() {
                var a = [];
                if ("]" != l(D).text) {
                    do
                        a.push(eb());
                    while (k(C, D, r, ","))
                }
                g(C, D, r, "]");
                return function(b, c) {
                    for (var e = [], f = 0; f < a.length; f++)
                        e.push(a[f](b, c));
                    return e
                }
            }
            function ia() {
                var a;
                if (k(C, D, r, "("))
                    a = Kd(),
                    g(C, D, r, ")");
                else if (k(C, D, r, "["))
                    a = ea();
                else if (k(C, D, r, "{"))
                    a = R();
                else {
                    var b = k(C, D, r);
                    a = b.Ra;
                    a || (b || (b = {
                        index: 1
                    }),
                    p("not a primary expression", r, b))
                }
                for (var c; b = k(C, D, r, "(", "[", "."); )
                    "(" === b.text ? (a = nf(a, c),
                    c = null) : "[" === b.text ? (c = a,
                    a = lf(a)) : "." === b.text ? (c = a,
                    a = mf(a)) : p("IMPOSSIBLE", r);
                return a
            }
            function Ea() {
                var a;
                return k(C, D, r, "+") ? ia() : (a = k(C, D, r, "-")) ? e(gb, a.Ra, Ea()) : (a = k(C, D, r, "!")) ? f(a.Ra, Ea()) : ia()
            }
            function Eb() {
                for (var a = Ea(), b; b = k(C, D, r, "*", "/", "%"); )
                    a = e(a, b.Ra, Ea());
                return a
            }
            function N() {
                var a;
                a = Eb();
                for (var b; b = k(C, D, r, "+", "-"); )
                    a = e(a, b.Ra, Eb());
                if (b = k(C, D, r, "<", ">", "<=", ">="))
                    a = e(a, b.Ra, N());
                return a
            }
            function Fa() {
                var a = N(), b;
                if (b = k(C, D, r, "==", "!="))
                    a = e(a, b.Ra, Fa());
                return a
            }
            function fb() {
                var a = Fa(), b;
                if (b = k(C, D, r, "&&"))
                    a = e(a, b.Ra, fb());
                return a
            }
            function Fb() {
                for (var a = fb(), b; ; )
                    if (b = k(C, D, r, "||"))
                        a = e(a, b.Ra, fb());
                    else
                        return a
            }
            function Sh() {
                for (var a = []; ; )
                    if (0 < D.length && !n(D, "}", ")", ";", "]") && a.push(Kd()),
                    !k(C, D, r, ";"))
                        return 1 == a.length ? a[0] : function(b, c) {
                            for (var e, f = 0; f < a.length; f++) {
                                var g = a[f];
                                g && (e = g(b, c))
                            }
                            return e
                        }
            }
            function lf(a) {
                var b = eb();
                g(C, D, r, "]");
                return ec(function(c, e) {
                    var f = a(c, e), g = b(c, e), k;
                    if (f)
                        return (f = f[g]) && f.then && (k = f,
                        "$$v"in f || (k.Rp = void 0,
                        k.then(function(a) {
                            k.Rp = a
                        })),
                        f = f.Rp),
                        f
                }, {
                    assign: function(c, e, f) {
                        return a(c, f)[b(c, f)] = e
                    }
                })
            }
            function mf(c) {
                var e = k(C, D, r).text
                  , f = a(e);
                return ec(function(a, b) {
                    return f(c(a, b), b)
                }, {
                    assign: function(a, f, g) {
                        return b(c(a, g), e, f)
                    }
                })
            }
            function nf(a, b) {
                var c = [];
                if (")" != l(D).text) {
                    do
                        c.push(eb());
                    while (k(C, D, r, ","))
                }
                g(C, D, r, ")");
                return function(e, f) {
                    for (var g = [], k = b ? b(e, f) : e, l = 0; l < c.length; l++)
                        g.push(c[l](e, f));
                    l = a(e, f) || pa;
                    return l.apply ? l.apply(k, g) : l(g[0], g[1], g[2], g[3], g[4])
                }
            }
            function eb() {
                var a = Fb(), b, c;
                return (c = k(C, D, r, "=")) ? (a.assign || u("implies assignment but [" + r.substring(0, c.index) + "] can not be assigned to", r, c.index, c),
                b = Fb(),
                function(c, e) {
                    return a.assign(c, b(c, e), e)
                }
                ) : a
            }
            function Kd() {
                for (var a = eb(), b; ; )
                    if (b = k(C, D, r, "|"))
                        a = e(a, b.Ra, Qh());
                    else
                        return a
            }
            function Qh() {
                for (var a = k(C, D, r), b = E(a.text), c = []; ; )
                    if (a = k(C, D, r, ":"))
                        c.push(eb());
                    else {
                        var e = function(a, e, f) {
                            f = [f];
                            for (var g = 0; g < c.length; g++)
                                f.push(c[g](a, e));
                            return b.apply(a, f)
                        };
                        return function() {
                            return e
                        }
                    }
            }
            var D = c(r), Rh;
            C ? (eb = Fb,
            nf = mf = lf = Kd = function() {
                p("is not valid JSON", r, {
                    text: r,
                    index: 0
                })
            }
            ,
            Rh = ia()) : Rh = Sh();
            0 !== D.length && p("is an unexpected token", r, D[0]);
            return Rh
        }
    }
    )();
    function Yg(a, b, c) {
        if (!a || !a.children)
            return null;
        var e;
        if (!c && (e = b(a),
        void 0 !== e && !e))
            return a;
        e = a.children;
        for (var f = e.length, g = 0; g < f; ++g)
            Yg(e[g], b, c);
        c && b(a);
        return a
    }
    ;function Zg(a) {
        if (!a.b && !a.h) {
            var b = [];
            Yg(a, function(c) {
                var e = [];
                if (c !== a && -1 < c.className.indexOf("$"))
                    return !1;
                var f = c.dataset || {}, g;
                for (g in f)
                    e.push($g(g, f[g]));
                f = c.attributes;
                g = "IMG" == c.tagName;
                for (var k = 0, l = f.length; k < l; ++k) {
                    var n = f.item(k)
                      , p = n.nodeName
                      , n = n.nodeValue
                      , u = ah
                      , r = bh;
                    g && "x-src" == p && (p = "src");
                    n && !r.test(p) && u.test(n) && e.push(ch(p, n))
                }
                0 === c.children.length && c.textContent && (f = c.textContent) && "SCRIPT" !== c.nodeName && ah.test(f) && e.push(dh(f));
                0 < e.length && b.push(eh(c, e))
            });
            fh(a, b)
        }
    }
    function fh(a, b) {
        a.g = b;
        a.h = function(b, e) {
            for (var f = 0, g = a.g.length; f < g; ++f)
                a.g[f](b, e)
        }
    }
    function eh(a, b) {
        a.b = b;
        return function(b, e) {
            for (var f = 0, g = a.b.length; f < g; f++)
                a.b[f](a, b, e)
        }
    }
    function gh(a, b, c) {
        a.b && c.push(eh(b, a.b));
        a = a.children;
        for (var e = 0, f = a.length; e < f; ++e) {
            var g = a[e];
            -1 == g.className.indexOf("$") && gh(g, b.children[e], c)
        }
    }
    var ah = /\{\{(.*)\}\}/m
      , bh = /^data-/
      , hh = /^\{\{([^\{]*)\}\}$/
      , ih = /\{\{([^\{]*)\}\}/gm;
    function ch(a, b) {
        var c = jh(b);
        return function(b, f) {
            b.setAttribute(a, c(f))
        }
    }
    function dh(a) {
        var b = jh(a);
        return function(a, e) {
            var f = b ? b(e) : null;
            f != a.textContent && (a.textContent = f)
        }
    }
    function jh(a) {
        return a && ah.test(a) ? hh.test(a) ? function(b) {
            var c = hh.exec(a)[1];
            b = Xg(c, !1)(b);
            return null != b ? b : ""
        }
        : function(b) {
            return a.replace(ih, function(a, e) {
                var f = Xg(e, !1)(b);
                return null != f ? f : ""
            })
        }
        : null
    }
    function kh(a) {
        if ("true" === a)
            return !0;
        if ("false" === a)
            return !1;
        var b = parseInt(a, 10);
        return isNaN(b) ? a : b
    }
    function $g(a, b) {
        if (ah.test(b)) {
            var c = jh(b);
            return function(b, e, f) {
                e[a] = c(f)
            }
        }
        var e = !1
          , f = kh(b);
        return function(b, c) {
            !e && c && (c[a] = f,
            e = !0)
        }
    }
    ;function lh(a) {
        a = a && a.trim();
        if (!a)
            throw Error("Can not create Element from empty markup.");
        var b = Ae(document, a);
        if (!(b instanceof Element))
            throw Error("Element must have a single root, but instead: " + a);
        return b
    }
    ;function mh(a, b) {
        a = b.get("templatePreprocessor", {
            markup: a
        });
        var c = lh(a);
        Zg(c);
        return function() {
            var a = c.cloneNode(!0)
              , b = [];
            gh(c, a, b);
            fh(a, b);
            return a
        }
    }
    mh.inject = ["markup", "injector"];
    function nh(a) {
        this.J = a;
        this.responseType = ""
    }
    nh.prototype.get = function(a, b, c) {
        var e = new K
          , f = new XMLHttpRequest;
        f.responseType = this.responseType;
        var g = q
          , k = q;
        f.onreadystatechange = function() {
            if (f.readyState === XMLHttpRequest.DONE) {
                b && (g = e.C("success", b));
                c && (k = e.C("failure", c));
                var a = f.getResponseHeader("content-type");
                if (a) {
                    var n;
                    a.match(/json/) ? n = this.J.JSON.parse(f.response) : a.match(/xml/) ? n = f.responseXML : "arraybuffer" === f.responseType ? n = f.response : n = f.responseText;
                    e.L("success", n)
                }
            }
        }
        ;
        f.open("GET", a, !0);
        f.send();
        return function() {
            g();
            k()
        }
    }
    ;
    function oh(a, b) {
        this.g = a;
        this.j = b;
        this.b = {}
    }
    oh.prototype.register = function(a, b, c) {
        b ? (this.b[a] && (this.b[a] = null),
        this.h(a, b, c)) : this.k(a, b, c)
    }
    ;
    oh.prototype.h = function(a, b, c) {
        b = {
            markup: b,
            injector: this.g
        };
        v(c) && (c = this.g.get(c, b));
        this.g.rq(a, c || mh, b)
    }
    ;
    oh.prototype.k = function(a, b, c) {
        this.b[a] = {
            name: a,
            content: b,
            $w: c
        }
    }
    ;
    oh.prototype.de = function(a) {
        function b() {
            0 === --c && a && a()
        }
        var c = 0, e;
        for (e in this.b) {
            c++;
            var f = this.b[e];
            if (f) {
                var g = x(function(a, c) {
                    this.h(a.name, c, a.$w);
                    b()
                }, this, f);
                this.j.get(f.name, g, b)
            }
        }
    }
    ;
    oh.inject = ["injector", "xhr"];
    function ph() {
        this.id = ++qh;
        this.b = {};
        this.register("injector", this)
    }
    var qh = 0;
    ph.prototype.addChild = function(a) {
        a.parent = this;
        return a
    }
    ;
    d = ph.prototype;
    d.remove = function() {
        for (var a = this.Yp(), b = 0, c = a.length; b < c; ++b)
            bd(this.b[a[b]]);
        this.b = {};
        this.parent = null
    }
    ;
    d.BJ = function() {
        return this.parent ? this.parent.BJ() : this
    }
    ;
    d.zP = function(a) {
        var b = new ph;
        a && a(b);
        return this.addChild(b)
    }
    ;
    d.ue = function(a, b) {
        bd(this.b[a]);
        return this.b[a] = b
    }
    ;
    d.register = function(a, b, c) {
        return this.ue(a, new Ug(b,this,c))
    }
    ;
    d.rq = function(a, b, c) {
        return this.ue(a, new Vg(b,this,c))
    }
    ;
    d.Mk = function(a, b, c) {
        return this.ue(a, new Lg(b,this,c))
    }
    ;
    d.tr = function(a, b, c) {
        return this.ue(a, new Ng(b,this,c))
    }
    ;
    d.Fh = function(a, b, c, e, f) {
        return this.ue(a, new Og(b,this,e,c,f))
    }
    ;
    d.M = function(a, b, c) {
        return this.get("templateResolver").register(a, b, c)
    }
    ;
    d.vw = function(a) {
        this.get("templateResolver").de(a)
    }
    ;
    d.Nf = function(a, b, c) {
        if (this.contains(a)) {
            var e = this.Zd(a);
            if (e && e.ib)
                throw Error('Unable to register singleton "' + a + '" with new constructor because this original was already registered and instantiated.');
        }
        return this.ue(a, new Wg(b,this,c))
    }
    ;
    d.PF = function(a, b) {
        return this.b[a] = this.b[b]
    }
    ;
    d.get = function(a, b, c) {
        function e(a) {
            var l = g.ty(a, b, c);
            if (!l) {
                if ("string" == typeof a && "opt_" == a.substr(0, 4))
                    return;
                l = 'Error, injector cannot find declaration for "' + a + '"';
                f != a && (l += ' While attempting to create "' + f + '".');
                throw Error(l);
            }
            var n = g.Ro(l.h)
              , p = {};
            Ec(p, n, b);
            n = (t(l.b) ? l.b : []).map(function(b) {
                if (b in p)
                    return p[b];
                if (b === f)
                    throw Error("Circular dependency found where " + f + " loaded " + a + " which then required " + b + ".");
                return e(b)
            });
            return l.get(n)
        }
        var f = "function" === typeof a ? "temp" : a
          , g = this;
        b = this.Ro(b || {});
        return e(a)
    }
    ;
    d.Ro = function(a) {
        var b = {};
        rc(a || {}, x(function(a, e) {
            "string" === typeof a && "$" == a.charAt(0) && (a = this.get(a.substr(1)));
            b[e] = a
        }, this));
        return b
    }
    ;
    d.ty = function(a, b, c) {
        return "function" === typeof a ? new (c || Ng)(a,this,b) : this.Zd(a)
    }
    ;
    d.Zd = function(a) {
        return this.b[a] ? this.b[a] : this.parent && this.parent.Zd instanceof Function ? this.parent.Zd(a) : null
    }
    ;
    d.Yp = function() {
        return wc(this.b)
    }
    ;
    d.contains = function(a) {
        return a ? !!(this.b[a] || this.parent && this.parent.contains(a)) : !1
    }
    ;
    function T() {
        Tg.call(this);
        this.children = [];
        this.R = {};
        this.model = this.template = this.g = null;
        this.isHidden = this.isActive = !1;
        this.onEnter = null;
        this.isSpeakable = !1;
        this.b = null;
        this.U = {}
    }
    A(T, Tg);
    T.prototype.sb = function() {
        this.b && this.b.sb()
    }
    ;
    T.prototype.K = function(a) {
        this.b && this.b.fh(a)
    }
    ;
    T.prototype.Ua = function() {
        this.b && this.b.Ua()
    }
    ;
    T.prototype.F = function(a) {
        this.b && this.b.eh(a)
    }
    ;
    Xc(T, ["isActive", "isHidden", "model", "onEnter"]);
    d = T.prototype;
    d.xa = function() {}
    ;
    d.xp = function() {}
    ;
    d.createElement = function() {}
    ;
    d.wa = function() {}
    ;
    d.qw = function() {
        this.C("onEnter:changed", x(this.iG, this), !1, !0);
        this.C("model:changed", x(this.ea, this), !1, !0);
        this.C("activated", x(this.qk, this), !1, !0);
        this.C("deactivated", x(this.hG, this), !1, !0);
        this.model && this.ea({
            detail: [this.model]
        })
    }
    ;
    d.ready = function() {}
    ;
    d.iG = function(a) {
        var b = this.xG(a);
        this.C("keyup", x(function(a) {
            13 == a.keyCode && b.apply(this, arguments)
        }, this.Cr()))
    }
    ;
    d.ea = function(a) {
        this.Af(a.detail[1])
    }
    ;
    d.tP = function(a, b) {
        var c = this.injector.get(a, b, Og);
        if (c)
            this.addChild(c);
        else
            throw Error("Error while creating child " + a);
        return c
    }
    ;
    d.Jc = function(a, b) {
        this.aa(this.model, a, b)
    }
    ;
    d.GP = function(a, b) {
        return this.injector.get(a, b, Lg)
    }
    ;
    d.focus = function() {
        this.g && this.g.isActive ? this.g.focus() : this.G.focus()
    }
    ;
    d.Z = function() {
        if (!this.isActive || this.isHidden)
            this.isActive = !0,
            this.show(),
            this.g && this.g.Z(),
            this.V("activated"),
            this.N();
        this.focus()
    }
    ;
    d.qk = function(a) {
        this.hk(a) && (this.Z(),
        this.g != a.target.xc && (this.g && this.g.ba(),
        this.g = a.target.xc),
        S(a, !1, !0))
    }
    ;
    d.ba = function() {
        this.isActive && (this.isActive = !1,
        this.g && this.g.ba(),
        this.V("deactivated"),
        this.N())
    }
    ;
    d.hG = function(a) {
        this.hk(a) && (this.isActive && this.focus(),
        S(a, !1, !0))
    }
    ;
    d.hk = function(a) {
        return a.target.xc.parent === this
    }
    ;
    d.show = function() {
        this.isHidden = !1
    }
    ;
    d.ma = function() {
        this.isHidden = !0
    }
    ;
    d.addClass = function(a) {
        this.G && (this.U[a] = !0)
    }
    ;
    d.removeClass = function(a) {
        this.G && delete this.U[a]
    }
    ;
    d.fJ = function(a, b) {
        var c = a(this, b);
        return this.Cs(function(b) {
            return b.fJ(a, c)
        }, this)
    }
    ;
    d.eJ = function(a, b) {
        var c = this.Cs(function(c) {
            return c.eJ(a, b)
        }, this);
        return a(this, c)
    }
    ;
    d.Cs = function(a, b) {
        var c = 0;
        return this.children.map(function(e) {
            return a.call(b, e, c++)
        })
    }
    ;
    T.prototype.addChild = function(a) {
        return this.Hr(a, this.vh())
    }
    ;
    d = T.prototype;
    d.Hr = function(a, b) {
        this.children.splice(b, 0, a);
        a.Bh() && (this.R[a.Bh()] = a);
        a.parent = this;
        return this
    }
    ;
    d.tc = function(a) {
        return this.children[a]
    }
    ;
    d.Lg = function(a) {
        return this.R[a]
    }
    ;
    d.removeChild = function(a) {
        a = this.children.indexOf(a);
        -1 < a && this.Jh(a);
        return a
    }
    ;
    d.Jh = function(a) {
        if (-1 < a && a < this.children.length) {
            var b = this.children[a];
            b == this.g && (this.g = null);
            this.children.splice(a, 1);
            b.Bh() && delete this.R[b.Bh()];
            bd(b);
            return b
        }
        return null
    }
    ;
    d.vS = function() {
        for (var a = [], b = 0, c = this.vh(); b < c; ++b)
            a.push(this.Jh(0));
        return a
    }
    ;
    d.vh = function() {
        return this.children.length
    }
    ;
    d.T = function() {
        this.ba();
        cd(this.children);
        this.parent && this.parent.removeChild(this);
        this.parent = null;
        bd(this.b);
        this.G && (this.G.xc = null);
        delete this.injector;
        T.B.T.call(this)
    }
    ;
    d.N = function(a) {
        Pg(this.G, this, this.Cr());
        a && this.Wr(a)
    }
    ;
    d.Cr = function() {
        return this.parent || this.Na || this
    }
    ;
    d.xG = function(a) {
        var b = a.detail && a.detail[0];
        a = a.detail && a.detail[1];
        if (b && a)
            throw Error("Cannot subscribe to press event more than once.");
        if (!w(b))
            throw Error("Event handler must be a function.");
        return b
    }
    ;
    d.Wr = function(a) {
        for (var b = 0, c = this.children.length; b < c; ++b)
            this.children[b].N(a)
    }
    ;
    d.Fb = function(a, b) {
        b ? Gg(a, "hidden") : Eg(a, "hidden")
    }
    ;
    d.Bh = function() {
        return this.G ? this.G.id : ""
    }
    ;
    d.vb = function() {
        var a = [];
        this.isActive && a.push("active");
        this.isHidden && a.push("hidden");
        this.isSpeakable && a.push("speakable");
        this.model || a.push("no-model");
        return a.concat(wc(this.U))
    }
    ;
    T.prototype.getClassName = function() {
        return this.vb().join(" ")
    }
    ;
    function rh() {
        this.k = this.kg = this.h = this.b = this.g = "";
        this.j = !1
    }
    rh.CACHE_TYPE = "branding";
    function sh(a, b) {
        this.imageUrl = "";
        this.Ga = a;
        this.serviceQuery = b;
        this.displayName = this.videoId = this.title = "";
        this.g = null;
        this.h = "";
        this.Ru = 0;
        this.id = this.username = this.Qa = this.j = "";
        this.viewCount = this.videoCount = 0;
        this.xi = new rh;
        this.b = !1;
        this.platformUserIcon = this.platformUserName = ""
    }
    sh.CACHE_TYPE = "channel";
    function th(a, b, c) {
        this.Ga = a;
        this.serviceQuery = b;
        this.Ha = c;
        this.D = this.F();
        this.w = null;
        this.di = "request-playback";
        this.activityDescription = "";
        this.Om = !1;
        this.j = null;
        this.ii = this.cg = "";
        this.channel = null;
        this.dislikesLabel = this.description = "";
        this.dislikesStyle = {};
        this.duration = 0;
        this.durationLabel = "";
        this.errorCode = null;
        this.imageUrl = M.I + "/../img/no_thumbnail.jpg";
        this.A = this.l = !1;
        this.likesLabel = "";
        this.likesStyle = {};
        this.uploadedDate = null;
        this.videoId = this.title = this.uploadedDateLabel = "";
        this.viewCount = 0;
        this.viewCountLabel = "";
        this.o = this.b = !1;
        this.cb = "videoTile"
    }
    th.prototype.F = function() {
        return Oa[this.Ha] ? this.Ha : this.Ha + (this.serviceQuery || "")
    }
    ;
    th.CACHE_TYPE = "video";
    function uh(a) {
        this.b = a;
        this.video = null;
        this.startTime = 0;
        this.g = this.$c = !1
    }
    uh.prototype.h = function(a, b, c) {
        var e = {
            list: this.video.D,
            start: this.startTime,
            video_id: this.video.videoId
        }, f;
        f = this.b.supportsNetworkRetry && !!this.b.Uo("network_retry");
        f = jd(f) ? "1" : "0";
        e.retryneterr = f;
        e.cenchd = jd(this.b.enhanceHdDrmPlayback) ? "1" : "0";
        e.vq = this.b.requestVideoQuality;
        this.$c && (e.autoplay = "1");
        a && (e.oauth_token = a);
        this.video.j && (e.vvt = this.video.j);
        "RQ" == this.video.Ha && (e.feature = "RQdial" == this.video.D ? "ytremote_d" : "ytremote",
        e.mdx = "1");
        b && b.length && (e.ytr = b.join(","));
        c && (e.is_fling = "1");
        return e
    }
    ;
    uh.prototype.update = function(a, b, c, e) {
        this.j();
        this.video = a;
        this.startTime = b || 0;
        this.$c = !!c;
        this.g = !!e
    }
    ;
    uh.prototype.j = function() {
        this.videoId = "";
        this.startTime = 0;
        this.g = this.$c = !1
    }
    ;
    uh.inject = ["environmentModel"];
    function vh(a, b, c) {
        this.h = a;
        this.j = b;
        this.g = b[0];
        this.b = c
    }
    d = vh.prototype;
    d.bc = function(a) {
        a = a || this.h;
        a.$$phase || a.$digest()
    }
    ;
    d.RP = function() {
        return this.LI() || this.NI() || this.OI()
    }
    ;
    d.LI = function() {
        var a = this.g.activeElement !== this.g.body ? this.g.activeElement : null
          , b = this.xD(a);
        return a && b ? b : null
    }
    ;
    d.xD = function(a) {
        return angular.element(a).scope()
    }
    ;
    d.OI = function() {
        return {
            $emit: function() {},
            $root: {}
        }
    }
    ;
    d.NI = function() {
        return this.b && this.b.current && this.b.current.scope ? this.b.current.scope : null
    }
    ;
    vh.$inject = ["$rootScope", "$document", "$route"];
    function wh(a, b, c, e) {
        K.call(this);
        this.b = a;
        this.p = b;
        this.o = c;
        this.U = e;
        this.F = this.H = 0;
        this.R = "SboVhoG9s0rNafixCSGGKXAT";
        this.O = [];
        this.A = null;
        this.D = 0;
        this.h = !!this.Oe();
        this.g = !1;
        this.w = 0
    }
    A(wh, K);
    d = wh.prototype;
    d.ug = function(a) {
        a(!!this.Oe(), this.h)
    }
    ;
    d.zb = function(a) {
        var b = this.Oe();
        if (b) {
            var c = this.wk();
            c ? a(c) : this.lo(b, a)
        } else
            a(null)
    }
    ;
    d.ji = function() {
        return this.h
    }
    ;
    d.Yc = function(a) {
        this.Sj();
        this.Jr();
        this.kG();
        this.or();
        this.nr(!1, a);
        this.w = 0
    }
    ;
    d.Sj = function() {
        this.p.clearTimeout(this.H);
        this.p.clearTimeout(this.F)
    }
    ;
    d.vy = function(a) {
        a = a || 15;
        this.p.clearTimeout(this.F);
        this.F = this.p.setTimeout(x(function() {
            this.Sj()
        }, this), 1E3 * a)
    }
    ;
    d.lo = function(a, b) {
        var c = {
            client_id: this.wh(),
            client_secret: this.mk(),
            refresh_token: a,
            grant_type: "refresh_token"
        };
        this.b.post("https://corsproxy.io/?https://www.youtube.com/o/oauth2/token", null, c, x(this.of, this, b), x(this.Zg, this, b))
    }
    ;
    d.of = function(a, b) {
        this.g && (this.g = !1,
        this.w++);
        var c = b.access_token
          , e = Math.round(0.9 * b.expires_in);
        this.UB(c, e);
        a(c)
    }
    ;
    d.Zg = function(a, b) {
        this.g = !1;
        b && 400 != b.b || this.Yc(!0);
        a(null)
    }
    ;
    d.HF = function(a, b, c) {
        this.Sj();
        var e = {
            client_id: this.wh(),
            scope: "http://gdata.youtube.com"
        };
        this.b.post("https://corsproxy.io/?https://oauth2.googleapis.com/code", null, e, x(function(c) {
            this.YA(c, a, b)
        }, this), x(function() {
            c()
        }, this))
    }
    ;
    d.bD = function(a) {
        (a && 401 == a.b || a.g) && (a = this.Oe()) && !this.g && (5 <= this.w ? this.Yc(!0) : (this.g = !0,
        this.lo(a, q)))
    }
    ;
    d.cD = function() {
        this.w = 0
    }
    ;
    d.YA = function(a, b, c) {
        this.qr(a.device_code, 1E3 * a.interval, c);
        b(a.user_code, 0.9 * Number(a.expires_in))
    }
    ;
    d.qr = function(a, b, c) {
        var e = {
            client_id: this.wh(),
            client_secret: this.mk(),
            code: a,
            grant_type: "http://oauth.net/grant_type/device/1.0"
        }
          , f = x(function(e) {
            this.ZA(e, a, b, c)
        }, this);
        this.b.post("https://corsproxy.io/?https://www.youtube.com/o/oauth2/token", null, e, f)
    }
    ;
    d.ZA = function(a, b, c, e) {
        var f = "slow_down" == a.error;
        "authorization_pending" == a.error || f ? (f && (c *= 2),
        this.H = this.p.setTimeout(x(function() {
            this.qr(b, c, e)
        }, this), c)) : (this.rr(a.refresh_token),
        this.of(e, a))
    }
    ;
    d.rr = function(a) {
        this.o.ya("tv-refresh-token", a, 15768E3);
        this.o.flush()
    }
    ;
    d.Oe = function() {
        return this.o.get("tv-refresh-token", 15768E3)
    }
    ;
    d.kG = function() {
        this.o.remove("tv-refresh-token");
        this.o.flush()
    }
    ;
    d.Jr = function() {
        var a = this.Oe();
        a && this.b.post("/o/oauth2/revoke", null, {
            token: a
        })
    }
    ;
    d.UB = function(a, b) {
        this.A = a;
        this.D = z() + 1E3 * b;
        this.nr(!0)
    }
    ;
    d.wk = function() {
        if (this.A && this.D > z())
            return this.A;
        this.or();
        return ""
    }
    ;
    d.or = function() {
        this.A = null;
        this.D = 0
    }
    ;
    d.nr = function(a, b) {
        var c = this.h;
        this.h = a;
        this.L("state:changed", a, c, b || !1)
    }
    ;
    d.mk = function() {
        return "SboVhoG9s0rNafixCSGGKXAT"
    }
    ;
    d.wh = function() {
        return "861556708454-d6dlm3lh05idd8npek18k6be8ba3oc68.apps.googleusercontent.com"
    }
    ;
    wh.inject = ["ytHttp", "timeService", "localStorage", "environmentModel"];
    function xh() {}
    xh.prototype.g = function(a, b) {
        var c = m("yt.player.embed");
        return c && c(a, b)
    }
    ;
    xh.prototype.b = function() {
        return !!m("yt.player.embed")
    }
    ;
    function yh() {
        K.call(this);
        this.w = -1;
        this.o = !1
    }
    A(yh, K);
    yh.prototype.$d = function() {
        return this.w
    }
    ;
    yh.prototype.isMuted = function() {
        return this.o
    }
    ;
    yh.prototype.Ba = function(a, b) {
        if (a !== this.w || b !== this.o) {
            var c = {
                volume: this.w,
                muted: this.o
            };
            this.w = a;
            this.o = b;
            this.L("volumeData:changed", {
                volume: a,
                muted: b
            }, c)
        }
    }
    ;
    yh.prototype.Ea = function() {
        this.L("volumeData:changed", {
            volume: this.w,
            muted: this.o
        }, {
            volume: this.w,
            muted: this.o
        })
    }
    ;
    function zh(a, b, c, e, f, g, k, l, n, p, u, r) {
        yh.call(this);
        this.J = a;
        this.ra = b;
        this.da = c;
        this.j = e;
        this.oc = !1;
        this.Na = f;
        this.Va = g;
        this.Wa = k;
        this.va = l;
        this.X = n;
        this.g = p;
        this.jb = u;
        this.Aa = [];
        this.fa = !1;
        this.U = [];
        this.b = this.A = null;
        this.H = this.K = this.h = !1;
        this.adVideoId = this.ja = null;
        this.errorMessage = "";
        this.errorCode = 0;
        this.pa = this.isPlayingAd = this.isPlaying = this.needsLogin = !1;
        this.$ = this.F = this.state = -1;
        this.D = !1;
        this.p = {};
        this.l = NaN;
        this.O = this.X.it(this.jt, 800, this);
        this.R = -1;
        this.Sa = x(this.bg, this);
        this.ga = this.k = q;
        if (a = this.da.lb("start_watch") || this.da.lb("start_dial"))
            this.k = x(a.tick, a),
            this.ga = x(this.da.report, this.da, a.name);
        this.j.g && document.addEventListener("webkitvisibilitychange", x(function() {
            document.webkitHidden ? this.ai() : 2 === this.state && this.bi()
        }, this), !1);
        this.ag();
        this.Ma = r
    }
    A(zh, yh);
    ba("yt.tv.services.PlayerService", zh, void 0);
    Xc(zh, ["isPlaying", "isPlayingAd", "state"]);
    d = zh.prototype;
    d.JH = function(a) {
        this.Aa = a
    }
    ;
    d.AH = function() {
        this.pa = !0
    }
    ;
    d.Pp = function() {
        return this.IJ("captions")
    }
    ;
    d.EH = function() {
        if (!this.Pp())
            return !1;
        this.b.loadModule("captions");
        return !0
    }
    ;
    d.MH = function() {
        var a = this.bd();
        a && a.unloadModule && this.b.unloadModule("captions")
    }
    ;
    d.DH = function() {
        return this.rl("captions", "tracklist", {
            includeAsr: 1
        }) || []
    }
    ;
    d.is = function(a) {
        return this.Ph("captions", "displaySettings", a)
    }
    ;
    d.GH = function() {
        this.Ph("captions", "displaySettings", {
            reset: 1
        })
    }
    ;
    d.CH = function() {
        return this.rl("captions", "displaySettings") || {}
    }
    ;
    d.KH = function(a) {
        this.Ph("captions", "sampleSubtitles", a)
    }
    ;
    d.BH = function() {
        return this.rl("captions", "track") || {}
    }
    ;
    d.IH = function(a) {
        a.style && this.is(a.style);
        return this.Ph("captions", "track", a)
    }
    ;
    d.$d = function() {
        if (!this.h)
            return this.vj(),
            zh.B.$d.call(this);
        var a = this.b.getVolume();
        return fa(a) ? a : zh.B.$d.call(this)
    }
    ;
    d.isMuted = function() {
        return this.h ? this.b.isMuted() : (this.vj(),
        zh.B.isMuted.call(this))
    }
    ;
    d.qh = function(a) {
        this.Yb(x(function() {
            this.b.setVolume(a)
        }, this))
    }
    ;
    d.ph = function() {
        this.Yb(x(function() {
            this.b.mute()
        }, this))
    }
    ;
    d.rh = function() {
        this.Yb(x(function() {
            this.b.unMute()
        }, this))
    }
    ;
    d.bd = function() {
        return this.h ? this.b : null
    }
    ;
    d.vj = function() {
        this.b || (this.ja = this.X.qA(this.va.b),
        this.ja.Bc = x(this.uA, this, "leanback-player-container", this.rA()),
        this.tA(),
        this.sA())
    }
    ;
    d.tA = function() {
        this.K ? this.be() : pe("html5-video-player") ? (this.K = !0,
        this.be()) : (this.k("plht_rq"),
        this.jb.get("/leanback_ajax", {
            action_player_template: 1,
            hl: this.Na.Fa,
            override_hl: 1
        }, x(this.uF, this)))
    }
    ;
    d.uF = function(a) {
        a = Ae(document, a);
        document.body.appendChild(a);
        this.K = !0;
        this.k("plht_r");
        this.be()
    }
    ;
    d.sA = function() {
        this.H ? this.be() : this.va.b() ? (this.H = !0,
        this.be()) : (this.k("pljs_rq"),
        xf(this.J.environment.player_url, {
            timeout: 3E4
        }).Qe(x(this.Iy, this)))
    }
    ;
    d.Iy = function() {
        this.H = !0;
        this.k("pljs_r");
        this.be()
    }
    ;
    d.be = function() {
        !this.b && this.K && this.H && this.ja.eA(0, 1E3)
    }
    ;
    d.uA = function(a, b) {
        this.b || (this.k("pem_rq"),
        this.b = this.va.g(a, b))
    }
    ;
    d.rA = function() {
        var a = this.J.swfConfig;
        y(a.args, {
            add_player_event_listeners: "0",
            autoplay: 0,
            BASE_YT_URL: null,
            controls: 0,
            el: "leanback",
            enablejsapi: 1,
            ps: "leanback",
            jsapicallback: x(this.Ky, this),
            iv_load_policy: 3,
            cc_load_policy: 3,
            hl: this.Na.Fa,
            svt: this.j.supportsSingleVideoTag,
            canplaylive: this.j.supportsLive,
            canplaypaid: this.j.supportsPaidContent,
            store_user_volume: !1,
            use_media_volume: this.j.g && !this.j.xe
        });
        y(a.args, this.j.Ub());
        a.assets.css = null;
        a.html5 = !0;
        a.disable = {
            flash: !0
        };
        a.fallback = x(function() {
            this.fm()
        }, this);
        this.j.supportsAdaptiveBitrate || (a.args.noadapt = !0);
        this.j.k || (a.args.video_container_override = this.Jy());
        return a
    }
    ;
    d.pI = function() {
        return this.J.innerWidth + "x" + this.J.innerHeight
    }
    ;
    d.Jy = function() {
        var a;
        this.Ma.isSupported() && (a = this.Ma.getVideoContainerSizeOverride());
        return a || this.pI()
    }
    ;
    d.He = function() {
        this.Kg();
        this.R = this.X.ni(this.Sa, 500)
    }
    ;
    d.Kg = function() {
        this.X.ih(this.R);
        this.R = -1
    }
    ;
    d.Lo = function() {
        this.A = null;
        this.l = NaN
    }
    ;
    d.ag = function() {
        this.g.timeLeft = 0;
        this.g.currentTime = 0;
        this.g.duration = 0;
        this.g.percentageLoaded = 0;
        this.g.percentagePlayed = 0
    }
    ;
    d.bg = function() {
        var a = this.bd();
        if (a && this.D) {
            var a = a.getVideoLoadedFraction(), b = this.SB(), c, e;
            0 == this.state ? (c = b,
            e = 1) : (c = this.TB(),
            e = !isNaN(c) && isFinite(c) && !isNaN(b) && isFinite(b) && 0 !== b ? c / b : c = b = 0);
            this.VB(c);
            0 !== b && (this.g.duration = b);
            this.g.currentTime = c;
            this.g.timeLeft = Math.max(Math.round(this.g.duration - this.g.currentTime), 1);
            this.g.percentageLoaded = this.Ng(a);
            this.g.percentagePlayed = this.Ng(e)
        } else
            this.ag()
    }
    ;
    d.Ng = function(a) {
        return isNaN(a) || !isFinite(a) ? 0 : Math.round(1E3 * a) / 1E3
    }
    ;
    d.Ky = function() {
        this.k("pem_r");
        this.h = !0;
        this.b.addEventListener("onStateChange", x(this.$n, this));
        this.b.addEventListener("onAdStateChange", x(this.Yn, this));
        this.b.addEventListener("onDetailedError", x(this.fm, this));
        this.b.addEventListener("onCaptionsTrackListChanged", x(this.L, this, "subtitlesTrackList:changed"));
        this.b.addEventListener("captionschanged", x(this.L, this, "subtitles:changed"));
        this.b.addEventListener("onVolumeChange", x(this.nx, this));
        this.b.addEventListener("onApiChange", x(this.L, this, "api:changed"));
        this.ki()
    }
    ;
    d.Yn = function(a, b) {
        this.adVideoId = b || null;
        this.$ = a;
        this.tp();
        this.ra.bc()
    }
    ;
    d.$n = function(a) {
        if (-1 !== a || 0 !== this.F) {
            switch (a) {
            case 3:
                3 !== this.F && this.O.Yz();
                break;
            case -1:
            case 0:
                this.O.dp()
            }
            3 === this.F && 3 !== a && this.O.Zz();
            0 === a && this.Yb(x(function() {
                this.b.stopVideo()
            }, this));
            this.F = a;
            this.tp();
            1 != this.state || this.isPlayingAd || (this.pa = !1);
            this.ra.bc()
        }
    }
    ;
    d.qE = function() {
        var a = this.isPlayingAd;
        switch (this.$) {
        case 0:
        case -1:
            this.isPlayingAd = !1;
            break;
        case 3:
        case 1:
            this.isPlayingAd = !0
        }
        return a != this.isPlayingAd
    }
    ;
    d.tp = function() {
        var a = this.qE();
        this.state = this.isPlayingAd ? this.$ : this.F;
        var b = this.D;
        switch (this.state) {
        case 3:
            this.gi();
            break;
        case -1:
        case 0:
            this.bg();
            this.D = this.isPlaying = !1;
            this.Kg();
            break;
        case 2:
            this.isPlaying = !1;
            break;
        case 1:
            this.gi(),
            this.D = this.isPlaying = !0
        }
        if (b = this.D && !b)
            this.k("pb_r"),
            this.ga(),
            this.ga = this.k = q;
        if (a || b)
            this.bg(),
            -1 === this.R && this.He()
    }
    ;
    d.fm = function(a) {
        this.Lo();
        this.ag();
        this.Kg();
        this.needsLogin = !!a && 1 == a.errorDetail;
        this.errorCode = !!a && a.errorCode || 0;
        this.errorMessage = a && a.message ? this.needsLogin ? "[[To view this video, please confirm you are old enough by signing in.|Text message displayed when a user tries to watch age-restricted videos.]]" : a.message : "[[An error has occurred please try again later.|Text message displayed when a video cannot be played.]]";
        this.state = -1E3;
        this.ra.bc()
    }
    ;
    d.gi = function() {
        this.needsLogin = !1;
        this.errorCode = 0;
        this.errorMessage = ""
    }
    ;
    d.IJ = function(a) {
        var b = this.bd();
        a = b && b.getOptions && b.getOptions(a);
        return !(!a || !a.length)
    }
    ;
    d.rl = function(a, b, c) {
        var e = this.bd();
        return e && e.getOption ? e.getOption(a, b, c) : null
    }
    ;
    d.Ph = function(a, b, c) {
        var e = this.bd();
        return e && e.setOption ? (e.setOption(a, b, c),
        !0) : !1
    }
    ;
    d.nx = function(a) {
        a.volume = Math.round(a.volume);
        this.Ba(a.volume, a.muted)
    }
    ;
    d.Yb = function(a) {
        this.U.push(a);
        this.h ? this.ki() : this.vj()
    }
    ;
    d.sB = function(a) {
        this.h && this.Yb(a)
    }
    ;
    d.ki = function() {
        if (!this.fa) {
            this.fa = !0;
            for (var a = this.U.length, b = 0; b < a && this.h; ++b)
                this.U[b]();
            this.U.splice(0, b);
            this.fa = !1
        }
    }
    ;
    d.SB = function() {
        return Math.ceil(this.Ug())
    }
    ;
    d.Ug = function() {
        var a = this.bd();
        return a && a.getDuration ? a.getDuration() : 0
    }
    ;
    d.If = function() {
        var a = this.bd()
          , b = 0;
        a && a.getCurrentTime && (b = this.Ng(a.getCurrentTime(void 0)));
        return b
    }
    ;
    d.TB = function() {
        return isNaN(this.l) ? this.If() : this.l
    }
    ;
    d.jt = function() {
        if (this.A) {
            var a = this.A;
            this.A = null;
            this.Yb(a)
        }
    }
    ;
    d.FH = function(a) {
        this.Wa.startTime = a;
        this.fs()
    }
    ;
    d.fs = function() {
        this.Am(!0);
        this.Yb(x(function() {
            this.h = !1;
            this.Va.zb(x(function(a) {
                this.h = !0;
                this.gi();
                a = this.Wa.h(a, this.Aa, this.pa);
                this.Wa.g ? this.b.cueVideoByPlayerVars(a) : this.b.loadVideoByPlayerVars(a);
                this.j.isVideoInfoVisible ? this.b.showVideoInfo() : this.b.hideVideoInfo();
                this.L("video:changed");
                this.He();
                this.ki()
            }, this))
        }, this))
    }
    ;
    d.LH = function() {
        this.isPlaying ? this.ai() : this.bi()
    }
    ;
    d.bi = function() {
        this.Yb(x(function() {
            this.b.playVideo();
            this.He()
        }, this))
    }
    ;
    d.Am = function(a) {
        if (this.h && this.b) {
            var b = 0 != this.state && -1 != this.state;
            this.Kg();
            this.Lo();
            this.ag();
            b && this.Yb(x(function() {
                this.b.pauseVideo();
                this.b.stopVideo()
            }, this));
            this.adVideoId = null;
            if (b || a)
                this.$n(-1),
                this.Yn(-1)
        }
    }
    ;
    d.ai = function() {
        this.Yb(x(function() {
            this.b.pauseVideo()
        }, this))
    }
    ;
    d.kq = function(a, b) {
        a = Math.max(a, 0);
        a = Math.min(a, this.Ug());
        a = this.Ng(a);
        a = Math.max(a, 0.001);
        this.A = x(function() {
            this.l = NaN;
            this.He();
            this.b.seekTo(a, b)
        }, this);
        this.He();
        this.l = a;
        this.bg();
        this.O.Xo()
    }
    ;
    d.HH = function(a) {
        var b = isNaN(this.l) ? this.g.currentTime : this.l;
        a = 0 < a ? Math.min(this.Ug(), b + a) : Math.max(0, b + a);
        a != b && this.kq(a, !0)
    }
    ;
    d.NH = function() {
        this.sB(x(function() {
            this.b && this.b.updateLastActiveTime()
        }, this))
    }
    ;
    d.yH = function(a, b, c, e) {
        this.g.currentTime >= b ? c() : this.p[a] = {
            time: b,
            Ec: c,
            mode: e || 1
        }
    }
    ;
    d.VB = function(a) {
        var b, c;
        for (c in this.p)
            b = this.p[c],
            (!this.isPlayingAd || 1 !== b.mode) && a >= b.time && (b.Ec(),
            delete this.p[c])
    }
    ;
    d.IR = function(a) {
        return a in this.p
    }
    ;
    d.zH = function() {
        this.p = {}
    }
    ;
    zh.inject = "window angularHelper csiService environmentModel locale authService playerVariablesModel playerFactoryService timeService progressModel ytHttp systemApi".split(" ");
    function Ah(a, b) {
        this.g = a;
        this.j = b
    }
    Ah.prototype.h = function() {
        return this.g
    }
    ;
    Ah.prototype.b = function() {
        return this.j
    }
    ;
    function Bh(a, b, c) {
        this.k = a;
        this.g = null;
        this.b = {};
        this.h = b || q;
        this.j = c || q
    }
    d = Bh.prototype;
    d.jB = function() {
        return this.h
    }
    ;
    d.kB = function() {
        return this.j
    }
    ;
    d.getName = function() {
        return this.k
    }
    ;
    d.tD = function(a) {
        this.g = a
    }
    ;
    d.sT = function() {
        return this.g
    }
    ;
    d.rT = function(a) {
        return this.yn(a.h(), a.b())
    }
    ;
    d.yn = function(a, b) {
        Ac(this.b, a, new Ah(a,b));
        return this
    }
    ;
    d.CQ = function() {
        var a = 0, b;
        for (b in this.b)
            ++a;
        return a
    }
    ;
    d.TQ = function(a) {
        return this.b[a] || null
    }
    ;
    d.vn = function(a) {
        return !!this.b[a] || !(!this.g || !this.g.vn(a))
    }
    ;
    d.py = function(a) {
        return this.Eo(a, this.getName())
    }
    ;
    d.Eo = function(a, b) {
        return this.b[a] ? this.b[a].b() : this.g ? this.g.Eo(a, b) : b
    }
    ;
    function Ch() {
        K.call(this);
        this.h = {};
        this.g = this.b = null;
        this.hw(this.gw(this.xn()))
    }
    A(Ch, K);
    d = Ch.prototype;
    d.hw = function(a) {
        this.h = a
    }
    ;
    d.xa = function() {
        this.g && this.Kp(this.g)
    }
    ;
    d.xn = function() {
        return []
    }
    ;
    d.od = function(a, b, c) {
        return new Bh(a,b,c)
    }
    ;
    d.Kp = function(a) {
        (a = this.h[a.getName()]) && this.Po(a)
    }
    ;
    d.bQ = function() {
        return this.b
    }
    ;
    d.qT = function(a) {
        return J(this.h, a) || null
    }
    ;
    d.Ik = function(a) {
        a = this.Qo(a);
        if (!this.b.vn(a))
            return !1;
        a = this.b.py(a);
        return a != this.b.getName() ? (this.Po(this.h[a]),
        !0) : !1
    }
    ;
    d.Po = function(a) {
        var b = this.b;
        b && b.kB()(b, a);
        this.b = a;
        this.b.jB()(this.b, b)
    }
    ;
    d.Qo = function(a) {
        return a.name
    }
    ;
    d.gw = function(a) {
        for (var b = {}, c = 0, e = a.length; c < e; ++c) {
            for (var f = a[c], g = J(f, "state"), k = J(f, "rules", []), l = 0, n = k.length; l < n; ++l) {
                var p = k[l]
                  , u = J(p, "name")
                  , r = J(p, "nextState");
                if (u && r)
                    g.yn(u, r.getName());
                else
                    throw Error("Attempting to parse malformed rule: " + p);
            }
            g.tD(J(f, "parent", null));
            if ("initial"in f) {
                if (this.g)
                    throw Error("Attempting to parse duplicate initial state: " + g);
                this.g = g
            }
            Ac(b, g.getName(), g)
        }
        return b
    }
    ;
    function Dh(a) {
        Ch.call(this);
        this.l = a;
        this.ca = null;
        this.k = -1;
        this.spinnerState = this.j = 0
    }
    A(Dh, Ch);
    Xc(Dh, ["spinnerState"]);
    Dh.prototype.o = function(a) {
        this.ca = a;
        this.ca.C("state:changed", x(this.Ik, this))
    }
    ;
    var Eh = {
        hr: "buffering-confirmed",
        ir: "playing-confirmed"
    };
    d = Dh.prototype;
    d.xn = function() {
        for (var a = this.od("unstarted"), b = this.od("confirmingPlaying", x(this.XH, this), x(this.ZH, this)), c = this.od("confirmingBuffering", x(this.WH, this), x(this.YH, this)), e = this.od("playing", x(this.dl, this)), f = this.od("paused", x(this.dl, this)), g = this.od("buffering", x(this.aI, this)), k = this.od("error", x(this.dl, this)), b = [{
            state: a,
            initial: !0,
            rules: [{
                name: 1,
                nextState: b
            }, {
                name: 3,
                nextState: c
            }]
        }, {
            state: k,
            rules: []
        }, {
            state: b,
            rules: [{
                name: Eh.ir,
                nextState: e
            }, {
                name: 3,
                nextState: c
            }]
        }, {
            state: c,
            rules: [{
                name: Eh.hr,
                nextState: g
            }, {
                name: 1,
                nextState: b
            }]
        }, {
            state: e,
            rules: [{
                name: 3,
                nextState: c
            }]
        }, {
            state: f,
            rules: [{
                name: 1,
                nextState: b
            }]
        }, {
            state: g,
            rules: [{
                name: 1,
                nextState: b
            }]
        }], c = 0, e = b.length; c < e; ++c)
            g = b[c],
            g.state !== f && g.state !== k && g.rules.push({
                name: 2,
                nextState: f
            }),
            g.state !== a && g.rules.push({
                name: -1,
                nextState: a
            }),
            g.state !== k && g.rules.push({
                name: -1E3,
                nextState: k
            });
        return b
    }
    ;
    d.XH = function() {
        this.Es(x(this.aJ, this), 100)
    }
    ;
    d.ZH = function() {
        this.Jf()
    }
    ;
    d.WH = function(a, b) {
        this.Es(x(this.$I, this, b), 800)
    }
    ;
    d.YH = function() {
        this.Jf()
    }
    ;
    d.Es = function(a, b) {
        this.Jf();
        this.j = this.ca.If();
        this.k = this.l.ni(a, b)
    }
    ;
    d.Jf = function() {
        this.l.ih(this.k)
    }
    ;
    d.$I = function(a) {
        this.Jf();
        this.ca.If() <= this.j ? this.Ik(Eh.hr) : this.Kp(a)
    }
    ;
    d.aJ = function() {
        this.ca.If() > this.j && (this.Jf(),
        this.Ik(Eh.ir))
    }
    ;
    d.dl = function() {
        this.spinnerState = 0
    }
    ;
    d.aI = function() {
        this.spinnerState = 1
    }
    ;
    d.Qo = function(a) {
        return String(a)
    }
    ;
    function Fh(a, b) {
        K.call(this);
        this.ca = a;
        this.h = b;
        this.isPlayingAd = this.spinnerShowing = !1;
        this.errorCode = 0;
        this.errorMessage = "";
        this.adVideoId = null;
        this.needsLogin = this.isPlaying = !1;
        this.state = -1;
        this.b = new Dh(b);
        this.g()
    }
    A(Fh, K);
    Xc(Fh, ["spinnerShowing"]);
    Fh.prototype.g = function() {
        this.Lz();
        this.b.o(this.ca);
        this.b.xa()
    }
    ;
    function Gh(a) {
        Fh.prototype.__defineGetter__(a, function() {
            return this.ca[a]
        });
        Fh.prototype.__defineSetter__(a, function(b) {
            this.ca[a] = b
        })
    }
    Gh("adVideoId");
    Gh("errorCode");
    Gh("errorMessage");
    Gh("isPlaying");
    Gh("isPlayingAd");
    Gh("needsLogin");
    Gh("state");
    d = Fh.prototype;
    d.Lz = function() {
        this.b.C("spinnerState:changed", x(this.fA, this));
        for (var a = "subtitlesTrackList subtitlesTrack volumeData adPlaying video isPlaying isPlayingAd api".split(" "), b = 0, c = a.length; b < c; ++b) {
            var e = a[b] + ":changed";
            this.ca.C(e, x(this.Ep, this, e))
        }
        e = "state:changed";
        this.ca.C(e, x(this.gA, this, e))
    }
    ;
    d.Ep = function(a, b) {
        this.L.apply(this, arguments)
    }
    ;
    d.gA = function(a, b) {
        2 == b && this.ca.If() == this.ca.Ug() || this.Ep(a, b)
    }
    ;
    d.fA = function(a) {
        this.spinnerShowing = 1 == a
    }
    ;
    d.hf = function(a, b, c, e) {
        this.ca.yH(a, b, c, e)
    }
    ;
    d.gf = function() {
        this.ca.zH()
    }
    ;
    d.hA = function() {
        this.ca.AH()
    }
    ;
    d.Eg = function() {
        return this.ca.BH()
    }
    ;
    d.On = function() {
        return this.ca.DH()
    }
    ;
    d.rm = function() {
        return this.ca.EH()
    }
    ;
    d.sq = function() {
        this.ca.fs()
    }
    ;
    d.Ac = function() {
        this.ca.ai()
    }
    ;
    d.Rc = function() {
        this.ca.bi()
    }
    ;
    d.mw = function(a) {
        this.ca.FH(a)
    }
    ;
    d.Me = function(a, b) {
        this.ca.kq(a, b)
    }
    ;
    d.Jo = function(a) {
        return this.ca.IH(a)
    }
    ;
    d.Sg = function(a) {
        this.ca.JH(a)
    }
    ;
    d.Ri = function(a) {
        return this.ca.is(a)
    }
    ;
    d.ox = function() {
        this.ca.GH()
    }
    ;
    d.dm = function() {
        return this.ca.CH()
    }
    ;
    d.Gp = function(a) {
        this.ca.KH(a)
    }
    ;
    d.Xi = function(a) {
        this.ca.Am(a)
    }
    ;
    d.Dj = function() {
        this.ca.MH()
    }
    ;
    d.yb = function() {
        this.ca.NH()
    }
    ;
    d.yy = function() {
        return this.ca.Pp()
    }
    ;
    d.Nj = function() {
        this.ca.LH()
    }
    ;
    d.yh = function(a) {
        this.ca.HH(a)
    }
    ;
    d.qh = function(a) {
        this.ca.qh(a)
    }
    ;
    d.$d = function() {
        return this.ca.$d()
    }
    ;
    d.isMuted = function() {
        return this.ca.isMuted()
    }
    ;
    d.ph = function() {
        this.ca.ph()
    }
    ;
    d.rh = function() {
        this.ca.rh()
    }
    ;
    d.oA = function() {
        return !this.isPlayingAd && (1 == this.state || 3 == this.state || 2 == this.state)
    }
    ;
    Fh.inject = ["playerService", "timeService"];
    function Hh() {
        this.b = null
    }
    Hh.prototype.h = function(a, b, c) {
        Ig(a, "background-image", "");
        this.g(a, b, c)
    }
    ;
    Hh.prototype.g = function(a, b, c) {
        b && !c || Ig(a, "background-image", "");
        c && Hg(a, c, !0);
        this.b || (this.b = new Image);
        this.b.onload = function() {
            c && Hg(a, c, !1);
            Ig(a, "background-image", "url(" + this.src + ")")
        }
        ;
        this.b.src = "";
        this.b.src = b
    }
    ;
    Hh.prototype.j = function(a, b) {
        return a && b ? a.replace(/\/[a-z0-9]+\.jpg/, "/" + b + ".jpg") : a
    }
    ;
    function Ih(a, b, c) {
        T.call(this);
        this.j = a;
        this.k = b;
        this.h = this.imageSource = this.skipTime = this.remainingSeconds = this.remainingDuration = "";
        this.p = c;
        this.o = new Hh;
        this.ma();
        this.j.C("isPlayingAd:changed", x(this.w, this))
    }
    A(Ih, T);
    Ih.prototype.N = function(a) {
        this.imageSource = this.isHidden ? "" : this.h;
        Ih.B.N.call(this, a)
    }
    ;
    Ih.prototype.w = function(a) {
        a ? this.aa(this.k, "timeLeft:changed", x(this.l, this)) : (this.ma(),
        this.Af(this.k, "timeLeft:changed"),
        this.h = "",
        this.N())
    }
    ;
    Ih.prototype.l = function(a) {
        this.isHidden && this.j.isPlayingAd && 0 < a && this.show();
        this.remainingSeconds = String(a);
        this.remainingDuration = this.p.Gg(a);
        this.N()
    }
    ;
    Ih.prototype.A = function(a) {
        this.h = a ? this.o.j(a.imageUrl, "mqdefault") : "";
        this.N()
    }
    ;
    Ih.inject = ["playerFacade", "progressModel", "locale"];
    function Jh() {
        K.call(this);
        this.rows = [];
        this.Za = 0
    }
    A(Jh, K);
    d = Jh.prototype;
    d.ig = function() {
        this.L("rows:changed")
    }
    ;
    d.Xb = function() {
        return this.rows[this.Za]
    }
    ;
    d.dg = function(a) {
        return this.rows[a]
    }
    ;
    d.jG = function() {
        return this.rows
    }
    ;
    d.P = function() {
        return this.rows.length
    }
    ;
    d.kp = function(a) {
        this.rows.push(a);
        this.ig()
    }
    ;
    d.clear = function() {
        this.rows.length = 0;
        this.ig()
    }
    ;
    d.$p = function(a) {
        for (var b = this.P(), c = 0; c < b; ++c)
            if (a === this.rows[c].model.title)
                return c;
        return -1
    }
    ;
    function Kh(a, b, c) {
        this.l = b;
        this.k = a;
        this.h = c;
        this.g = null;
        this.b = {};
        this.j = {}
    }
    A(Kh, ad);
    Kh.prototype.isSupported = function() {
        return this.k.isSupported()
    }
    ;
    d = Kh.prototype;
    d.Qb = function(a) {
        this.g = a;
        this.g.isSpeakable = !0
    }
    ;
    d.$a = function(a, b, c, e, f) {
        c = "boolean" == typeof c ? c : !0;
        this.ly(a) && this.eh(a);
        a = this.h.S(a);
        this.b[a] = this.ky(a, b, e, f);
        c && this.fh(a)
    }
    ;
    d.ky = function(a, b, c, e) {
        return this.k.createCommand(a, b, c, e)
    }
    ;
    d.LR = function() {
        return !!this.b && 0 < Object.keys(this.b).length
    }
    ;
    d.ly = function(a) {
        return this.Ck(this.h.S(a))
    }
    ;
    d.Ck = function(a) {
        return !!this.b[a]
    }
    ;
    d.HR = function() {
        return 0 < this.ik().length
    }
    ;
    d.sb = function() {
        for (var a in this.b) {
            var b = this.mf(a);
            this.pn(a, b)
        }
        this.g && this.tj(this.g, !0)
    }
    ;
    d.fh = function(a) {
        a = this.h.S(a);
        if (this.Ck(a)) {
            var b = this.mf(a);
            this.pn(a, b)
        }
    }
    ;
    d.pn = function(a, b) {
        this.l.addCommand(b);
        this.j[a] = b
    }
    ;
    d.Ua = function() {
        for (var a in this.b) {
            var b = this.mf(a);
            this.qn(a, b)
        }
        this.g && this.tj(this.g, !1)
    }
    ;
    d.eh = function(a) {
        a = this.h.S(a);
        if (this.Ck(a)) {
            var b = this.mf(a);
            this.qn(a, b)
        }
    }
    ;
    d.qn = function(a, b) {
        this.l.removeCommand(b);
        delete this.j[a]
    }
    ;
    d.ff = function() {
        this.Ua();
        this.b = {}
    }
    ;
    d.WQ = function(a) {
        return this.mf(this.h.S(a))
    }
    ;
    d.mf = function(a) {
        return this.b[a]
    }
    ;
    d.ik = function() {
        return Object.keys(this.j)
    }
    ;
    d.tj = function(a, b) {
        for (var c = 0, e = a.vh(); c < e; ++c) {
            var f = a.tc(c);
            b ? f.sb() : f.Ua();
            f.b || this.tj(f, b)
        }
    }
    ;
    d.T = function() {
        this.ff();
        this.j = this.b = this.g = null;
        Kh.B.T.call(this)
    }
    ;
    Kh.inject = ["speechApi", "voiceService", "locale"];
    function Lh(a, b) {
        this.b = a;
        this.g = b;
        this.h = !1
    }
    Lh.prototype.state = function(a, b) {
        var c = !1;
        void 0 !== a && (this.b.path("/" + a),
        c = !0);
        b && (this.b.search(b),
        c = !0);
        c && this.g.bc();
        return this.Tx()
    }
    ;
    d = Lh.prototype;
    d.Tx = function() {
        var a = this.b.path();
        a && (a = a.split("/").join(""));
        return a
    }
    ;
    d.mode = function(a) {
        void 0 !== a && (this.b.search("mode", a),
        this.g.bc());
        return this.b.search().mode
    }
    ;
    d.search = function(a, b) {
        return this.b.search(a, b)
    }
    ;
    d.url = function(a) {
        void 0 !== a && (this.b.url(a),
        this.g.bc());
        return this.b.url()
    }
    ;
    d.ar = function(a) {
        return this.mode() === a
    }
    ;
    d.zc = function() {
        var a = this.state() || ""
          , b = this.mode() || "";
        return {
            state: a,
            mode: b,
            url: this.url()
        }
    }
    ;
    Lh.inject = ["$location", "angularHelper"];
    function Mh(a) {
        this.b = [];
        this.g = a
    }
    d = Mh.prototype;
    d.pQ = function() {
        return this.b
    }
    ;
    d.er = function(a) {
        this.xj(a) && (this.fB(a),
        this.b.push(a))
    }
    ;
    d.$x = function() {
        this.b.pop();
        return this.b.pop()
    }
    ;
    d.fB = function(a) {
        this.xj(a) && (this.b = this.b.filter(function(b) {
            return !this.gB(b, a)
        }, this))
    }
    ;
    d.HD = function() {
        this.b.length = 0
    }
    ;
    d.ok = function(a) {
        this.xj(a) && this.g.Pq(a)
    }
    ;
    d.xj = function(a) {
        return "state"in a && "mode"in a
    }
    ;
    d.gB = function(a, b) {
        var c = a.mode
          , e = b.mode
          , f = c === e
          , g = "" !== c && "" !== e
          , k = a.state === b.state;
        return k && f || f && g || k && g && c !== e
    }
    ;
    Mh.inject = ["activityReportingService"];
    function Nh(a, b, c) {
        Tg.call(this);
        this.id = b.attr("id") || "";
        this.name = this.name || this.id || "directive";
        this.scope = a;
        this.element = b;
        this.ga = c;
        this.isSpeakable = this.isActive = !1;
        this.va = this.va || c.ytFocusable || !1;
        this.children = {};
        this.l = [];
        this.scope[this.name] = this;
        this.scope.focusable = this;
        this.scope.controller = this;
        this.va && this.element.attr("tabindex", "-1");
        this.G = this.element[0];
        this.b = null;
        this.ga.activateWhen && this.scope.$watch(this.ga.activateWhen, x(this.kz, this));
        this.ga.data && this.scope.$watch(this.ga.data, x(this.zd, this));
        this.scope.$on("$destroy", x(this.lz, this));
        this.xf()
    }
    A(Nh, Tg);
    d = Nh.prototype;
    d.xa = function() {
        this.isSpeakable && this.addClass("speakable");
        this.V("added", this);
        this.C("added", x(this.Kf, this))
    }
    ;
    d.xf = function() {
        this.Rk("elementIdEquals", this.WI)
    }
    ;
    d.Rk = function(a, b) {
        this[a] = x(b, this)
    }
    ;
    d.lz = function() {
        this.data = null;
        this.scope[this.name] = null;
        this.scope.focusable = null;
        this.scope.controller = null;
        this.scope.aK = null;
        this.scope.$J = {};
        this.pf();
        this.fk();
        this.b && this.b.ff()
    }
    ;
    d.zd = function(a) {
        this.data = a
    }
    ;
    d.wT = function(a) {
        this.data = a
    }
    ;
    d.AP = function() {
        return this.TJ()
    }
    ;
    d.TJ = function() {
        return !0
    }
    ;
    d.N = function() {}
    ;
    d.Z = function() {
        var a = this.isActive;
        this.isActive = !0;
        this.addClass("active");
        !a && this.va && this.focus()
    }
    ;
    d.ba = function() {
        this.isActive = !1;
        this.activeChildName = null;
        this.removeClass("active");
        this.br(this.w)
    }
    ;
    d.br = function(a) {
        a && (a.ba(),
        this.w = null)
    }
    ;
    d.ub = function(a) {
        a && (this.w ? this.w !== a ? (this.w.ba(),
        a.Z(),
        this.w = a) : this.w === a && a.focus() : (a.Z(),
        this.w = a))
    }
    ;
    d.kz = function(a) {
        a ? this.Z() : this.isActive && this.ba()
    }
    ;
    d.focus = function() {
        this.element[0].focus();
        this.w && this.w.focus()
    }
    ;
    d.Kf = function(a) {
        var b = a.detail
          , c = b.element.attr("id");
        c && (this.children[c] = b);
        S(a);
        this.l.push(b)
    }
    ;
    d.fk = function() {
        for (var a = this.l.length, b = 0; b < a; ++b) {
            var c = this.l[b];
            c instanceof T ? (bd(c),
            De(c.G)) : this.l[b].element.remove()
        }
        this.l.length = 0;
        this.children = {}
    }
    ;
    d.DP = function(a) {
        var b = a.xs;
        a.xs = null;
        this.jd(a);
        a.xs = b
    }
    ;
    d.CP = function(a) {
        a in this.children && this.jd(this.children[a].scope)
    }
    ;
    d.jd = function(a) {
        a || (a = this.scope.$root);
        a.$$phase || a.$digest()
    }
    ;
    d.WI = function(a) {
        return this.id === a
    }
    ;
    d.ka = function(a) {
        return this.element[0].querySelector(a)
    }
    ;
    d.aQ = function(a) {
        return this.element[0].querySelectorAll(a)
    }
    ;
    d.ac = function(a, b) {
        a.textContent = b || ""
    }
    ;
    d.Pe = function(a, b) {
        a.innerHTML = b || ""
    }
    ;
    d.Cc = function(a, b) {
        angular.element(a).css("display", b ? "" : "none")
    }
    ;
    d.uc = function(a) {
        Eg(a, "hidden")
    }
    ;
    d.og = function(a) {
        Gg(a, "hidden")
    }
    ;
    d.tc = function(a) {
        return this.l[a]
    }
    ;
    d.vh = function() {
        return this.l.length
    }
    ;
    d.$P = function(a) {
        return this.children[a]
    }
    ;
    d.Pa = function(a, b, c) {
        a = this.G.getElementsByClassName("$" + a)[0];
        if (!a)
            return null;
        b = Oh(a, c, b);
        return this.Xr(b)
    }
    ;
    d.Bp = function() {
        for (var a = 0, b = this.l.length; a < b; ++a) {
            var c = this.l[a];
            c instanceof T && c.N()
        }
    }
    ;
    d.bw = function(a, b, c, e) {
        if (null === b)
            return null;
        a = Th(a, c, e);
        b.innerHTML = "";
        b.appendChild(a.G);
        return this.Xr(a)
    }
    ;
    d.Xr = function(a) {
        if (a) {
            this.O = {
                $destroy: q
            };
            this.l.push(a);
            var b = a.G.id;
            b && (this.children[b] = a)
        }
        return a
    }
    ;
    d.sb = function() {
        this.b && this.b.sb()
    }
    ;
    d.vT = function(a) {
        this.b && this.b.fh(a)
    }
    ;
    d.Ua = function() {
        this.b && this.b.Ua()
    }
    ;
    d.uT = function(a) {
        this.b && this.b.eh(a)
    }
    ;
    d.addClass = function(a) {
        this.G && a && Eg(this.G, a)
    }
    ;
    d.removeClass = function(a) {
        this.G && a && Gg(this.G, a)
    }
    ;
    Nh.$inject = ["$scope", "$element", "$attrs"];
    function Uh(a, b, c) {
        this.name = this.name || "focusable";
        this.va = !0;
        Nh.call(this, a, b, c)
    }
    A(Uh, Nh);
    Uh.$inject = ["$scope", "$element", "$attrs"];
    function Vh(a, b, c, e, f, g) {
        Uh.call(this, a, b, c);
        this.j = e;
        this.$ = f;
        this.D = g
    }
    A(Vh, Uh);
    d = Vh.prototype;
    d.Z = function() {
        Uh.prototype.Z.call(this);
        var a = this.j.zc();
        this.kr() && this.iq(a);
        this.lr() && this.jq(a)
    }
    ;
    d.ba = function() {
        Uh.prototype.ba.call(this);
        this.sj()
    }
    ;
    d.kr = function() {
        return !0
    }
    ;
    d.lr = function() {
        return !0
    }
    ;
    d.jq = function(a) {
        a = a || this.j.zc();
        this.$.ok(a)
    }
    ;
    d.iq = function(a) {
        a = a || this.j.zc();
        this.$.er(a)
    }
    ;
    d.sj = function(a) {
        this.D.L("update-message", a)
    }
    ;
    function Oh(a, b, c) {
        v(a) && (a = lh(a));
        if (a.xc && b)
            return Pg(b.G),
            null;
        var e = null;
        if (-1 < a.className.indexOf("$")) {
            if (!c)
                throw Error("Cannot create components without an injector.");
            e = Wh(a, c, b);
            if (!e)
                return null;
            a = e.G
        }
        a.h || Zg(a);
        Yg(a, function(b) {
            if (a !== b && -1 < b.className.indexOf("$"))
                return Oh(b, e, c),
                !1;
            c && c.contains(b.nodeName) && !b.lE && (c.get(b.nodeName, {
                element: b
            }),
            b.lE = !0)
        });
        !e && b && (e = b);
        Pg(a, e, b);
        e && e.ready instanceof Function && e.ready();
        return e
    }
    function Wh(a, b, c) {
        for (var e = Cg(a), f, g, k = null, l = e.length - 1; 0 <= l; --l)
            f = e[l],
            0 === f.indexOf("$") && "$" != f && (g = f.substr(1),
            a.j || (a.j = {}),
            a.j[g] || (Gg(a, f),
            Eg(a, "{{getClassName()}}"),
            Eg(a, String(g).replace(/([A-Z])/g, "-$1").toLowerCase()),
            k = b.get(g),
            k.template && !k.G && (v(k.template) ? k.G = lh(k.template) : k.template instanceof Function && (k.G = k.template())),
            a && k.G ? (Ee(k.G, a),
            Mg(k.G, a),
            a.className = k.G.className,
            Zg(a),
            f = a,
            g = k.G,
            f.b && 0 < f.b.length && g.g && (g.b ? g.b = f.b.concat(g.b) : g.g.unshift(eh(g, f.b)))) : k.G = a,
            k.G.xc || (k.G.xc = k),
            k.G.tabIndex = -1,
            k.wa(),
            k.qw(),
            c && c.addChild instanceof Function ? c.addChild(k) : k.Na = c || null));
        return k
    }
    ;function Th(a, b, c) {
        b = Oh('<div class="$' + a + '"></div>', c, b);
        if (!b)
            throw Error("Can not render " + a);
        return b
    }
    ;function U(a, b, c, e, f, g) {
        K.call(this);
        this.label = a;
        this.type = b || "";
        this.payload = c || null;
        this.cb = e || "button";
        this.buttonClass = f || "";
        this.isSpeakable = void 0 === g ? !0 : g;
        this.enabled = !0
    }
    A(U, K);
    Xc(U, ["enabled"]);
    function Xh() {
        K.call(this);
        this.length = 0;
        this.items = []
    }
    A(Xh, K);
    d = Xh.prototype;
    d.push = function(a) {
        this.Ss("push", a)
    }
    ;
    d.unshift = function(a) {
        this.Ss("unshift", a)
    }
    ;
    d.la = function() {
        return this.items.slice()
    }
    ;
    d.ia = function(a) {
        return this.items[a]
    }
    ;
    d.xk = function(a) {
        return ac(this.items, a)
    }
    ;
    d.ha = function(a) {
        this.items = a.slice();
        this.length = a.length;
        this.jc(this.items)
    }
    ;
    d.rS = function(a, b) {
        this.items[a] = b;
        this.length = this.items.length;
        this.jc(b)
    }
    ;
    d.P = function() {
        return this.length
    }
    ;
    d.slice = function(a, b) {
        var c = new Xh, e;
        switch (arguments.length) {
        case 0:
            e = this.items.slice();
            break;
        case 1:
            e = this.items.slice(a);
            break;
        case 2:
            e = this.items.slice(a, b)
        }
        c.push(e);
        return c
    }
    ;
    d.splice = function(a, b, c) {
        var e = new Xh, f;
        switch (arguments.length) {
        case 0:
            f = this.items.splice();
            break;
        case 1:
            f = this.items.splice(a);
            break;
        case 2:
            f = this.items.splice(a, b);
            break;
        default:
            f = this.items.splice.apply(this.items, arguments)
        }
        this.length = this.items.length;
        this.jc();
        e.push(f);
        return e
    }
    ;
    d.clear = function() {
        this.length = this.items.length = 0;
        this.jc()
    }
    ;
    d.jc = function(a) {
        this.L("items:changed", a)
    }
    ;
    d.Ss = function(a, b) {
        var c = t(b) ? b : [b]
          , e = c.length;
        0 < e && (this.items[a].apply(this.items, c),
        this.length += e,
        this.jc(b))
    }
    ;
    function Yh() {
        Xh.call(this);
        this.b = this.l = -1;
        this.j = !0
    }
    A(Yh, Xh);
    d = Yh.prototype;
    d.na = function(a) {
        if (!this.Ld(a))
            return !1;
        var b = this.l;
        this.l = a;
        this.L("selectedIndex:changed", a, b);
        return !0
    }
    ;
    d.vg = function(a) {
        a = this.xk(a);
        0 <= a && this.na(a)
    }
    ;
    d.La = function() {
        return this.l
    }
    ;
    d.xk = function(a) {
        return ac(this.la(), a)
    }
    ;
    d.uf = function(a) {
        if (0 === a)
            return !1;
        for (var b = this.La() + a, c = !1; !(c = this.na(b)) && 0 <= b && b < this.P(); )
            b += 0 < a ? 1 : -1;
        return c
    }
    ;
    d.mc = function() {
        return this.ia(this.La())
    }
    ;
    d.sG = function() {
        return this.j
    }
    ;
    d.tG = function(a) {
        this.j != a && (this.j = a,
        this.No())
    }
    ;
    d.Ld = function(a) {
        return this.Qf(a) && a !== this.La()
    }
    ;
    d.Qf = function(a) {
        return 0 === this.P() ? -1 === a : !isNaN(a) && a >= (this.j ? 0 : -1) && a < this.P() && this.pF(a)
    }
    ;
    d.pF = function(a) {
        a = this.ia(a);
        return a instanceof U && !a.enabled ? !1 : !0
    }
    ;
    d.jc = function(a) {
        Yh.B.jc.call(this, a);
        -1 < this.b ? (this.Ld(this.b) ? this.na(this.b) : this.b >= this.P() && this.na(this.P() - 1),
        this.b = -1) : this.No()
    }
    ;
    d.No = function() {
        this.Qf(this.La()) || (0 < this.P() ? this.na(0) : this.na(-1))
    }
    ;
    d.ha = function(a, b) {
        this.b = fa(b) ? b : -1;
        Yh.B.ha.call(this, a)
    }
    ;
    function Zh(a) {
        this.j = a;
        this.b = null;
        this.h = [];
        this.g = null
    }
    d = Zh.prototype;
    d.KF = function(a) {
        this.b = a;
        this.gp()
    }
    ;
    d.gp = function() {
        this.iB();
        this.b && this.hB()
    }
    ;
    d.iB = function() {
        for (var a = 0, b = this.h.length; a < b; ++a)
            this.h[a]();
        this.h.length = 0
    }
    ;
    d.hB = function() {
        this.b.catchKeyPress && (this.b.rateLimit ? this.h.push(this.b.C("keydown", this.j(this.b.rateLimit, x(this.Qn, this)))) : this.h.push(this.b.C("keydown", x(this.Qn, this))));
        this.b.catchMouseMove && (this.b.mouseAutoScroll && this.h.push(this.b.C("mouseover", x(this.fj, this))),
        this.h.push(this.b.C("click", x(this.fj, this))),
        this.h.push(this.b.C("button-enter", x(this.fj, this))))
    }
    ;
    d.Qn = function(a) {
        var b = 0
          , b = a.keyCode;
        if (40 == b && this.b.isVertical || 39 == b && !this.b.isVertical)
            b = 1;
        else if (38 == b && this.b.isVertical || 37 == b && !this.b.isVertical)
            b = -1;
        else
            return;
        var c = this.b.model
          , e = c.uf(b);
        !e && this.b.loop && (e = 0 < b ? c.na(0) : c.na(c.P() - 1));
        e && S(a, !1, !0)
    }
    ;
    d.fj = function(a) {
        for (a = a.target; a && a.parentNode != this.b.G; )
            a = a.parentNode;
        (a = a && a.xc && a.xc.model) && this.b.model.vg(a)
    }
    ;
    d.nF = function() {
        if (this.b && this.b.model instanceof Yh) {
            var a = this.b.model.La();
            this.Ex(-1 < a ? this.b.tc(a) : null);
            this.b.isActive && this.g && this.g.Z()
        }
    }
    ;
    d.Ex = function(a) {
        if (this.g != a) {
            var b = !this.b.isActive;
            this.g && !this.g.Og() && (this.g.removeClass("selected"),
            b && this.g.N());
            if (this.g = a)
                this.g.addClass("selected"),
                b && this.g.N()
        }
    }
    ;
    Zh.inject = ["rateLimit"];
    function $h(a) {
        T.call(this);
        this.k = a;
        this.rateLimit = this.itemFactory = this.model = null;
        this.catchMouseMove = !1;
        this.catchKeyPress = this.mouseAutoScroll = !0;
        this.elementLimit = -1;
        this.loop = this.isVertical = !1
    }
    A($h, T);
    Xc(T, "itemName itemFactory rateLimit catchMouseMove mouseAutoScroll catchKeyPress".split(" "));
    d = $h.prototype;
    d.ZI = function() {
        for (var a = this.G.children; a.length; )
            this.Jh(0)
    }
    ;
    d.wa = function() {
        this.G.children.length && this.XF();
        this.C("itemName:changed", x(this.ZF, this), !1, !0);
        this.C("itemFactory:changed", x(this.YF, this), !1, !0);
        var a = x(this.WF, this);
        this.C("catchKeyPress:changed", a, !1, !0);
        this.C("catchMouseMove:changed", a, !1, !0);
        this.C("mouseAutoScroll:changed", a, !1, !0);
        this.C("rateLimit:changed", a, !1, !0)
    }
    ;
    d.ZF = function() {
        v(this.itemName) && this.itemName ? this.itemFactory = function() {
            return Th(this.itemName, this.injector)
        }
        : this.itemFactory = null
    }
    ;
    d.YF = function() {
        this.ZI();
        this.as()
    }
    ;
    d.WF = function() {
        this.k.gp()
    }
    ;
    d.XF = function() {
        for (var a = null, b, c = Fe(this.G), e = 0, f = c.length; e < f; ++e)
            if (He(c[e])) {
                a = De(c[e]);
                break
            }
        a && (-1 == a.className.indexOf("$") && Eg(a, "$component"),
        b = a.outerHTML,
        this.itemFactory = function() {
            return Oh(b, null, this.injector)
        }
        )
    }
    ;
    d.as = function() {
        var a = this.Nr();
        0 <= this.elementLimit && (a = this.elementLimit);
        var b = this.G.children;
        if (a > b.length) {
            if (this.model)
                for (b = b.length; b < a; ++b)
                    this.Gr(this.model.ia(b))
        } else
            for (; a < b.length; )
                this.Jh(b.length - 1)
    }
    ;
    d.Nr = function() {
        return this.model ? this.model.P() : 0
    }
    ;
    d.Gr = function(a, b) {
        if (a) {
            var c = this.Ir(a);
            s(b) ? (Ce(this.G, c.G, b),
            this.Hr(c, b)) : (this.G.appendChild(c.G),
            this.addChild(c));
            c.N()
        }
    }
    ;
    d.Ir = function(a) {
        if (this.itemFactory)
            return this.itemFactory();
        if (a && a.cb)
            return Th(a.cb, this.injector);
        throw Error("Attempt to create a list item without factory or name.");
    }
    ;
    d.ready = function() {
        this.k.KF(this);
        this.Jk()
    }
    ;
    d.qk = function(a) {
        $h.B.qk.call(this, a);
        this.g && this.WB(this.g)
    }
    ;
    d.N = function(a) {
        $h.B.N.call(this, a);
        this.k.nF()
    }
    ;
    d.ea = function(a) {
        $h.B.ea.call(this, a);
        this.Jc("selectedIndex:changed", x(this.N, this, !0));
        this.Jc("items:changed", x(this.Jk, this));
        this.model && this.Jk()
    }
    ;
    d.Jk = function() {
        this.as();
        this.N(!0)
    }
    ;
    d.Wr = function(a) {
        for (var b = 0, c = this.children.length; b < c; ++b) {
            var e = this.children[b]
              , f = this.model ? this.model.ia(b) : null;
            this.NG(e, f) && (bd(e),
            this.Gr(f, b),
            e = this.children[b]);
            e.model = f;
            e.N(a)
        }
    }
    ;
    d.NG = function(a, b) {
        return a && b ? !a.model || !(!a.model || !b.cb || a.model.cb == b.cb) || !!this.itemFactory && !this.itemName : !1
    }
    ;
    d.WB = function(a) {
        a = a.G;
        var b = this.isVertical ? "offsetTop" : "offsetLeft"
          , c = this.isVertical ? "offsetHeight" : "offsetWidth"
          , e = this.isVertical ? "scrollTop" : "scrollLeft"
          , f = a[b] >= this.G[e]
          , g = a[b] + a[c] <= this.G[e] + this.G[c];
        f && g || (this.G[e] = f ? a[b] + a[c] - this.G[c] : a[b])
    }
    ;
    $h.inject = ["listSelectionManager"];
    function ai(a) {
        Yh.call(this);
        this.h = 0;
        this.o = a || 0
    }
    A(ai, Yh);
    d = ai.prototype;
    d.na = function(a) {
        return this.Ld(a) ? (this.h = a,
        this.L("selectedIndex:changed", a),
        !0) : !1
    }
    ;
    d.uf = function(a) {
        return this.na(this.h + a)
    }
    ;
    d.Ld = function(a) {
        return this.Qf(a)
    }
    ;
    d.Qf = function(a) {
        return !!this.items[a]
    }
    ;
    d.La = function() {
        return this.o
    }
    ;
    d.ia = function(a) {
        return this.items[this.h + a - this.o]
    }
    ;
    function bi(a) {
        ai.call(this);
        this.g = this.k = a
    }
    A(bi, ai);
    d = bi.prototype;
    d.jc = function(a) {
        this.g = this.k > this.length ? this.k : this.length;
        bi.B.jc.call(this, a)
    }
    ;
    d.na = function(a) {
        a %= this.g;
        0 > a && (a += this.g);
        bi.B.na.call(this, a)
    }
    ;
    d.Ld = function() {
        return !0
    }
    ;
    d.Qf = function() {
        return !0
    }
    ;
    d.ia = function(a) {
        return this.items[(this.h + a) % this.g]
    }
    ;
    d.P = function() {
        return this.k
    }
    ;
    function ci() {
        T.call(this);
        this.j = this.model = null;
        this.h = !0;
        this.collection = new bi(12);
        this.collection.na(this.hq())
    }
    A(ci, T);
    d = ci.prototype;
    d.hq = function() {
        return 2 < this.collection.P() ? -2 : -1
    }
    ;
    d.ea = function(a) {
        ci.B.ea.call(this, a);
        this.Dr();
        this.aa(this.model, "rows:changed", x(this.Dr, this))
    }
    ;
    d.Dr = function() {
        var a = this.model.P()
          , b = Math.min(a, 12);
        1 < a && this.collection.P() != b && (this.collection = new bi(b),
        this.N(!0));
        this.collection.ha(this.model.jG());
        this.update()
    }
    ;
    d.update = function() {
        var a = this.model.Za + this.hq();
        this.collection.na(a)
    }
    ;
    d.TE = function() {
        this.h = !1;
        this.N()
    }
    ;
    d.Ly = function() {
        this.h = !0;
        this.N()
    }
    ;
    d.vb = function() {
        var a = ci.B.vb.call(this);
        this.h && a.push("labels-hidden");
        return a
    }
    ;
    function di(a, b, c, e, f, g, k, l, n, p, u, r) {
        T.call(this);
        this.ga = f;
        this.j = c;
        this.A = e;
        this.X = b;
        this.l = g;
        this.J = a;
        this.w = k;
        this.ja = l;
        this.pa = u;
        this.va = r;
        this.$ = n;
        this.Ba = "nav-arrows-enabled";
        this.D = 0;
        this.o = !0;
        this.p = !1;
        this.ra = 2;
        this.Aa = 1;
        this.model = this.O = this.h = this.k = null;
        this.b = p.get("voiceHelper");
        this.b.isSupported() && this.Gt()
    }
    A(di, T);
    d = di.prototype;
    d.wa = function() {
        this.w.supportsPointer && this.C("keyup", x(this.rz, this));
        this.b.isSupported() && this.C("keyup", x(this.pz, this));
        this.C("button-enter", x(this.qz, this));
        this.C("mousemove", this.$(2, x(this.sz, this)));
        this.C("request-playback", x(this.tz, this));
        this.C("request-playlist-playback", x(this.nz, this));
        this.ep(100, this.oz);
        this.ep(8, this.mz);
        this.G.addEventListener("scroll", x(function() {
            this.G.scrollTop = 0;
            this.G.scrollLeft = 0
        }, this), !1)
    }
    ;
    d.ready = function() {
        this.h = this.children[0];
        this.k = this.children[1];
        this.O = this.children[2]
    }
    ;
    d.Z = function() {
        "browse" != this.j.state() || this.j.mode() || this.A.HD();
        di.B.Z.call(this);
        this.va.Oj();
        var a = this.j.zc();
        this.KD() && this.ID(a);
        this.LD() && this.JD(a);
        this.qf()
    }
    ;
    d.ba = function() {
        di.B.ba.call(this);
        this.qf();
        this.Kd()
    }
    ;
    d.Gt = function() {
        this.b.$a("[[Scroll left|Speech command to move selection left.]]", x(this.le, this, -2));
        this.b.$a("[[Scroll right|Speech command to move selection back.]]", x(this.le, this, 2));
        this.b.$a("[[Scroll down|Speech command to move selection down.]]", x(this.ed, this, 1));
        this.b.$a("[[Scroll up|Speech command to move selection up.]]", x(this.ed, this, -1));
        this.b.Qb(this)
    }
    ;
    d.KD = function() {
        return "browse" == this.j.state()
    }
    ;
    d.LD = function() {
        return "search" != this.j.mode()
    }
    ;
    d.JD = function(a) {
        a = a || this.j.zc();
        this.A.ok(a)
    }
    ;
    d.ID = function(a) {
        a = a || this.j.zc();
        this.A.er(a)
    }
    ;
    d.Kd = function(a) {
        this.ga.L("update-message", a)
    }
    ;
    d.qf = function() {
        this.Ah() ? (this.h.sb(),
        this.tE()) : this.Ua();
        this.Ek()
    }
    ;
    d.tE = function() {
        this.ys();
        this.ms()
    }
    ;
    d.ys = function() {
        1 < this.gG() && this.Ah() ? (this.K("[[Scroll up|Speech command to move selection up.]]"),
        this.K("[[Scroll down|Speech command to move selection down.]]")) : (this.F("[[Scroll up|Speech command to move selection up.]]"),
        this.F("[[Scroll down|Speech command to move selection down.]]"))
    }
    ;
    d.ms = function() {
        var a = this.Kb();
        a && (0 < a.activeIndex && this.Ah() ? this.K("[[Scroll left|Speech command to move selection left.]]") : this.F("[[Scroll left|Speech command to move selection left.]]"),
        a.activeIndex + 2 < a.P() && this.Ah() ? this.K("[[Scroll right|Speech command to move selection back.]]") : this.F("[[Scroll right|Speech command to move selection back.]]"))
    }
    ;
    d.Ek = function() {
        if (this.b.isSupported()) {
            var a = this.b.ik();
            a.sort(oc);
            var b = new Xh;
            b.push(a);
            this.O.model = b
        }
    }
    ;
    d.Ah = function() {
        return "search" == this.j.mode() || this.isActive
    }
    ;
    d.ea = function(a) {
        di.B.ea.call(this, a);
        a = this.model != a.detail[1] || this.k && this.k.model != this.model;
        this.k.model = this.model;
        (a || this.model.Za != this.D) && this.Tj();
        this.aa(this.model, "rows:changed", x(this.zA, this));
        this.h.model = this.Kb();
        this.qf()
    }
    ;
    d.zA = function() {
        this.qf();
        this.Tj()
    }
    ;
    d.My = function() {
        this.h.show();
        this.h.N()
    }
    ;
    d.gz = function() {
        this.h.ma();
        this.h.N()
    }
    ;
    d.rz = function(a) {
        switch (a.keyCode) {
        case 38:
        case 40:
        case 37:
        case 39:
            S(a);
            this.mr();
            break;
        case 13:
            this.gJ(a.target)
        }
    }
    ;
    d.pz = function(a) {
        switch (a.keyCode) {
        case 27:
            this.ys(),
            this.Ek()
        }
    }
    ;
    d.qz = function(a) {
        a = a.detail;
        for (var b = 0, c = this.model.P(), e; b < c; b++)
            if (e = this.model.dg(b),
            e.Zi(a)) {
                a = b - this.model.Za;
                0 != a && this.ed(a);
                break
            }
    }
    ;
    d.sz = function() {
        this.ss()
    }
    ;
    d.ep = function(a, b) {
        this.C("keydown", this.$(a, x(b, this)))
    }
    ;
    d.mz = function(a) {
        switch (a.keyCode) {
        case 37:
            this.le(-1);
            break;
        case 39:
            this.le(1)
        }
    }
    ;
    d.le = function(a) {
        var b = this.Kb()
          , c = this.Zo()
          , e = c + a;
        0 <= e && e < b.P() ? (this.V("play-sound", "same-toggle"),
        this.wG(c + a),
        b.kh(a) && this.rj()) : 0 > e && this.V("play-sound", "same-heavy")
    }
    ;
    d.oz = function(a) {
        switch (a.keyCode) {
        case 38:
        case 33:
            this.ed(-1);
            break;
        case 40:
        case 34:
            this.ed(1)
        }
    }
    ;
    d.ed = function(a) {
        !this.model || 1 >= this.model.P() || (this.p = !0,
        this.k.TE(),
        this.V("play-sound", "same-light"),
        this.Tj(a))
    }
    ;
    d.Tj = function(a) {
        if (this.model) {
            var b = this.model.Za + (a || 0);
            a = this.model.P();
            b = b % a || 0;
            0 > b && (b += a);
            b != this.model.Za && (this.gz(),
            "watch" === this.j.state() && 0 === this.model.Za || this.$o(),
            this.h.ba(),
            this.model.Za = b);
            this.D = b;
            this.k.update();
            this.rj()
        }
    }
    ;
    d.Kb = function() {
        return this.model ? this.model.Xb() : null
    }
    ;
    d.gG = function() {
        return this.model ? this.model.P() : 0
    }
    ;
    d.Zo = function() {
        var a = this.Kb();
        return a ? a.activeIndex : 0
    }
    ;
    d.ss = function() {
        Eg(this.G, "nav-arrows-enabled");
        this.l.clearTimeout(this.H);
        this.H = this.l.setTimeout(x(function() {
            this.mr()
        }, this), 3E3)
    }
    ;
    d.mr = function() {
        this.l.clearTimeout(this.H);
        Gg(this.G, "nav-arrows-enabled")
    }
    ;
    d.gJ = function(a) {
        this.ss();
        switch (a.id) {
        case "up-arrow":
            this.ed(-1);
            break;
        case "down-arrow":
            this.ed(1);
            break;
        case "left-arrow":
            this.le(-2);
            break;
        case "right-arrow":
            this.le(2)
        }
    }
    ;
    d.$o = function() {
        var a = this.Kb();
        a && (a.clear(),
        this.focus())
    }
    ;
    d.wG = function(a) {
        this.Kb().Sc(a);
        this.ms();
        this.Ek()
    }
    ;
    d.rj = function() {
        this.l.clearTimeout(this.fa);
        this.fa = this.l.setTimeout(x(function() {
            this.BF()
        }, this), this.w.Dl);
        this.isActive && this.Kd()
    }
    ;
    d.BF = function() {
        var a = this.Kb();
        a && (this.p && this.pa.rF() ? this.rj() : (this.p = !1,
        this.isActive && this.V("toggle-loading", !0),
        a.load(x(this.qF, this), this.o)))
    }
    ;
    d.qF = function() {
        var a = this.Kb();
        this.V("row-loaded", a);
        if (0 == a.P() && this.isActive) {
            var b = a.model.serviceQuery;
            if (!this.w.supportsPaidContent && b) {
                var c = x(this.Ny, this, b);
                this.ja.bb(b, c, null, c)
            } else
                this.Kd(a.errorMessage || "[[No videos are available|The message shown when a row has no videos to show.]]")
        } else
            0 < a.P() && this.Kd();
        this.k.Ly();
        this.h.model = a;
        this.V("toggle-loading", !1);
        this.V("row-changed", {
            rowIndex: this.model.Za,
            ZJ: this.Zo()
        });
        this.isActive ? a.P() ? this.h.Z() : this.h.ba() : this.My();
        this.o && (this.o = !1,
        this.J.requestAnimationFrame(x(function() {
            this.X.Wc("start_browse", "fr_rn");
            this.X.report("start_browse")
        }, this)));
        this.qf()
    }
    ;
    d.tz = function(a) {
        if (a.target != this.G) {
            S(a);
            var b = a.detail.Fc || this.Kb();
            b && this.V("request-playback", {
                data: a.detail.data,
                Fc: b,
                startTime: a.detail.startTime,
                $c: a.detail.$c
            })
        }
    }
    ;
    d.nz = function(a) {
        S(a);
        this.model.Km(this.Kb());
        this.ga.L("cmd-playlist-playback", a.detail.data.id)
    }
    ;
    d.Ny = function(a, b) {
        var c = this.Kb();
        a === (c && c.model && c.model.serviceQuery) && (b && b.b ? this.Kd("[[Paid channels are not available on this device.|Message that is displayed for a video channel on a device that doesn't support paid subscriptions.]]") : this.Kd("[[No videos are available|The message shown when a row has no videos to show.]]"))
    }
    ;
    di.inject = "window csiService locationService navigationService rootDispatcher timeService environmentModel channelPaidInfoService rateLimit injector gestureService remoteService".split(" ");
    function ei(a, b) {
        var c = Array.prototype.slice.call(arguments)
          , e = c.shift();
        if ("undefined" == typeof e)
            throw Error("[goog.string.format] Template required");
        return e.replace(/%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function(a, b, e, l, n, p, u, r) {
            if ("%" == p)
                return "%";
            var E = c.shift();
            if ("undefined" == typeof E)
                throw Error("[goog.string.format] Not enough arguments");
            arguments[0] = E;
            return fi[p].apply(null, arguments)
        })
    }
    var fi = {
        s: function(a, b, c) {
            return isNaN(c) || "" == c || a.length >= c ? a : a = -1 < b.indexOf("-", 0) ? a + Array(c - a.length + 1).join(" ") : Array(c - a.length + 1).join(" ") + a
        },
        f: function(a, b, c, e, f) {
            e = a.toString();
            isNaN(f) || "" == f || (e = a.toFixed(f));
            var g;
            g = 0 > a ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "";
            0 <= a && (e = g + e);
            if (isNaN(c) || e.length >= c)
                return e;
            e = isNaN(f) ? Math.abs(a).toString() : Math.abs(a).toFixed(f);
            a = c - e.length - g.length;
            0 <= b.indexOf("-", 0) ? e = g + e + Array(a + 1).join(" ") : (b = 0 <= b.indexOf("0", 0) ? "0" : " ",
            e = g + Array(a + 1).join(b) + e);
            return e
        },
        d: function(a, b, c, e, f, g, k, l) {
            return fi.f(parseInt(a, 10), b, c, e, 0, g, k, l)
        }
    };
    fi.i = fi.d;
    fi.u = fi.d;
    function gi(a, b) {
        T.call(this);
        this.p = a;
        this.w = -1;
        this.b = b;
        this.b.Qb(this)
    }
    A(gi, T);
    d = gi.prototype;
    d.wa = function() {
        gi.B.wa.call(this);
        this.C("keyup", x(this.OF, this))
    }
    ;
    d.ea = function(a) {
        gi.B.ea.call(this, a);
        this.isHidden = !this.model
    }
    ;
    d.OF = function(a) {
        13 === a.keyCode && (S(a),
        this.model && (this.isActive || a.g && ("mouseup" === a.g.type || "touchend" === a.g.type)) && this.fo())
    }
    ;
    d.fo = function() {
        this.V("play-sound", "cross-enter");
        this.V(this.model.di, {
            data: this.model
        })
    }
    ;
    d.Hk = function(a, b) {
        var c = !1;
        if (this.b.isSupported()) {
            this.b.ff();
            this.w = b;
            var e = this.getSpeechPhrase();
            e && a && (this.b.$a(e, x(this.fo, this)),
            c = !0);
            this.N()
        }
        return c
    }
    ;
    gi.prototype.getSpeechPhrase = function() {
        return this.model ? this.model.getTitle ? this.model.getTitle() : this.model.title : ""
    }
    ;
    gi.inject = ["locale", "voiceHelper"];
    function hi(a, b) {
        $h.call(this, a);
        this.j = b;
        this.p = this.o = this.model = null;
        this.l = !1;
        this.h = [];
        this.Oy()
    }
    A(hi, $h);
    d = hi.prototype;
    d.ea = function(a) {
        hi.B.ea.call(this, a);
        this.Jc("selectedIndex:changed", x(this.eG, this));
        this.Jc("items:changed", x(this.dG, this))
    }
    ;
    d.eG = function(a, b) {
        this.l = 0 <= a && 0 <= b && a != b;
        this.ur()
    }
    ;
    d.dG = function() {
        this.l = !1;
        this.ur()
    }
    ;
    d.tc = function(a) {
        return this.children[a % this.model.md()]
    }
    ;
    d.Nr = function() {
        return this.model && this.model.md() || 0
    }
    ;
    d.ur = function() {
        for (var a = this.h.length = 0, b = this.children.length; a < b; ++a)
            this.NE(this.children[a], a),
            this.OE(this.children[a], a)
    }
    ;
    d.Oy = function() {
        var a = this.j.cssPrefix
          , b = this.j.supportsTranslateZ ? "translateZ(0)" : "";
        this.o = ei("%s-transform: translateX(%s) %s; %s-transition: %s-transform %s; transition: %s-transform %s;", a, "%position", b, a, a, "200ms", a, "200ms");
        this.p = ei("%s-transform: translateX(%s) %s; %s-transition: none 0s; transition: none 0s;", a, "%position", b, a)
    }
    ;
    d.NE = function(a, b) {
        b = this.model.jk(b);
        var c = this.sF(b) ? this.o : this.p
          , e = ae(104 * b, 1);
        a.G.style.cssText = c.replace("%position", e)
    }
    ;
    d.sF = function(a) {
        return this.l && this.j.supportsAnimation && this.model.pE(a)
    }
    ;
    d.OE = function(a, b) {
        if (a instanceof gi) {
            var c = this.model.jk(b);
            a.Hk(!a.isHidden && 0 <= c && 3 > c, c + 1) && this.h.push(a)
        }
    }
    ;
    d.sb = function() {
        for (var a = 0, b = this.h.length; a < b; ++a)
            this.h[a].sb()
    }
    ;
    d.Ua = function() {
        for (var a = 0, b = this.h.length; a < b; ++a)
            this.h[a].Ua()
    }
    ;
    hi.inject = ["listSelectionManager", "environmentModel"];
    function ii(a) {
        Yh.call(this);
        this.g = a || 7
    }
    A(ii, Yh);
    d = ii.prototype;
    d.ia = function(a) {
        var b = Math.max(0, this.La() - 2);
        a = this.jk(a) - this.Er();
        return ii.B.ia.call(this, b + a)
    }
    ;
    d.md = function() {
        return this.g
    }
    ;
    d.la = function() {
        for (var a = [], b = 0, c = this.md(); b < c; ++b)
            a.push(this.ia(b));
        return a
    }
    ;
    d.jk = function(a) {
        a -= this.rI();
        a += this.rs();
        a %= this.md();
        0 > a && (a += this.md());
        return a + this.Er()
    }
    ;
    d.pE = function(a) {
        return -2 != a && a != this.md() - 1 - this.rs()
    }
    ;
    d.rs = function() {
        return Math.min(this.La(), 2)
    }
    ;
    d.Er = function() {
        return Math.max(-this.La(), -2)
    }
    ;
    d.rI = function() {
        return this.La() % this.md()
    }
    ;
    function ji(a) {
        T.call(this);
        this.l = a;
        this.j = this.h = this.model = null;
        this.k = q
    }
    A(ji, T);
    d = ji.prototype;
    d.xp = function() {
        var a;
        this.l.isLimitedGraphics ? (a = "list",
        this.j = new ai) : (a = "carousel",
        this.j = new ii);
        this.h = Th(a, this.injector);
        this.l.isLimitedGraphics && (this.h.elementLimit = 3);
        this.h.catchKeyPress = !1;
        this.h.model = this.j;
        this.addChild(this.h);
        this.g = this.h
    }
    ;
    d.wa = function() {
        this.G.appendChild(this.h.G)
    }
    ;
    d.ea = function(a) {
        ji.B.ea.call(this, a);
        this.k();
        this.model && (this.aa(this.model, "activeIndex:changed", x(this.vB, this)),
        this.h.itemName = this.model.cb || "",
        this.So())
    }
    ;
    d.vB = function(a) {
        this.j.na(a)
    }
    ;
    d.So = function() {
        var a = this.model.model.Y
          , b = a.la()
          , c = !(!b || !b.length);
        this.k();
        this.k = a.C("items:changed", x(this.So, this));
        c ? this.j.ha(b, this.model.activeIndex) : this.j.clear()
    }
    ;
    ji.inject = ["environmentModel"];
    function ki(a, b) {
        T.call(this);
        this.j = a;
        this.o = b;
        this.h = !0
    }
    A(ki, T);
    ki.prototype.Z = function() {
        ki.B.Z.call(this);
        this.k = this.j.setTimeout(x(this.l, this), 3E5);
        this.h && (this.h = !1,
        this.o.report("start_browse"))
    }
    ;
    ki.prototype.ba = function() {
        ki.B.ba.call(this);
        this.k && this.j.clearTimeout(this.k)
    }
    ;
    ki.prototype.l = function() {
        this.V("exit-application")
    }
    ;
    ki.inject = ["timeService", "csiService"];
    function li(a, b, c, e) {
        U.call(this, a, c, e, "subtitled-button");
        this.subtitle = b || ""
    }
    A(li, U);
    function mi(a, b) {
        T.call(this);
        this.h = a;
        this.A = b;
        this.j = new ai(1);
        this.p = new ai(1);
        this.o = new ai(1);
        this.w = new ai(1);
        this.displayProperties = new ai(1);
        this.l = this.k = null
    }
    A(mi, T);
    var ni = {
        AE: "background-color",
        uE: "color",
        BE: "font-color",
        vE: "display-option",
        wE: "language",
        xE: "off",
        UO: "on",
        CE: "window-color"
    }
      , oi = {
        monoSerif: "[[Monospaced Serif|This is the text of the Monospaced Serif option for captions font family.]]",
        propSerif: "[[Proportional Serif|This is the text of the Proportional Serif option for captions font family.]]",
        monoSans: "[[Monospaced Sans-Serif|This is the text of the Monospaced Sans-Serif option for captions font family.]]",
        propSans: "[[Proportional Sans-Serif|This is the text of the Proportional Sans-Serif option for captions font family.]]",
        casual: "[[Casual|This is the text of the Casual option for captions font family.]]",
        cursive: "[[Cursive|This is the text of the Cursive option for captions font family.]]",
        smallCaps: "[[Small Capitals|This is the text of the Small Capitals option for captions font family.]]",
        none: "[[None|This is the text of the None option for character edge styles.]]",
        dropShadow: "[[Drop Shadow|This is the text of the Drop Shadow option for character edge styles.]]",
        raised: "[[Raised|This is the text of the Raised option for character edge styles.]]",
        depressed: "[[Depressed|This is the text of the Depressed option for character edge styles.]]",
        uniform: "[[Uniform|This is the text of the Uniform option for character edge styles.]]"
    }
      , pi = {
        "-2": "50%",
        "-1": "75%",
        0: "100%",
        2: "200%",
        4: "300%"
    }
      , qi = {
        0: "0%",
        "0.25": "25%",
        "0.5": "50%",
        "0.75": "75%",
        1: "100%"
    }
      , ri = {
        "#080808": {
            className: "black",
            text: "[[Black|The color black.]]"
        },
        "#f00": {
            className: "red",
            text: "[[Red|The color red.]]"
        },
        "#f0f": {
            className: "magenta",
            text: "[[Magenta|The color magenta.]]"
        },
        "#00f": {
            className: "blue",
            text: "[[Blue|The color blue.]]"
        },
        "#0ff": {
            className: "cyan",
            text: "[[Cyan|The color cyan.]]"
        },
        "#0f0": {
            className: "green",
            text: "[[Green|The color green.]]"
        },
        "#ff0": {
            className: "yellow",
            text: "[[Yellow|The color yellow.]]"
        },
        "#fff": {
            className: "white",
            text: "[[White|The color white.]]"
        }
    }
      , si = {
        Ax: "display-properties-list",
        Bx: "options-list"
    };
    d = mi.prototype;
    d.xa = function() {
        this.aa(this.h, "subtitlesTrackList:changed", x(this.Yq, this));
        this.aa(this.h, "api:changed", x(this.Yq, this));
        this.sE();
        this.rE()
    }
    ;
    d.wa = function() {
        this.C("button-enter", x(this.yG, this));
        this.C("keyup", x(this.zG, this))
    }
    ;
    d.ready = function() {
        this.k = this.Lg(si.Ax);
        this.l = this.Lg(si.Bx);
        this.aa(this.displayProperties, "selectedIndex:changed", x(this.l.N, this.l, !0));
        this.g = this.k;
        this.h.rm() ? this.Cx() : this.En()
    }
    ;
    d.ba = function() {
        this.h.Gp(!1);
        mi.B.ba.call(this)
    }
    ;
    d.sE = function() {
        var a = this.h.Eg() || {}
          , a = J(a, "displayName", "")
          , b = this.h.dm()
          , c = b.fontFamilyOption
          , e = b.color
          , f = b.background
          , g = b.windowColor
          , k = b.charEdgeStyle
          , l = b.textOpacity
          , n = b.backgroundOpacity
          , p = b.windowOpacity
          , b = b.fontSizeIncrement;
        this.az(e, f, g);
        this.displayProperties.ha([new li("[[Captions|Menu item to the captions settings.]]",a,"",this.j), new li("[[Font family|Menu item to select font family of the captions.]]",J(oi, c, ""),"",this.cz(c)), new li("[[Font color|Menu item to select font color.]]",J(J(ri, e) || {}, "text", ""),"font-color",this.p), new li("[[Font size|Menu item to select size of the captions.]]",J(pi, b, ""),"",this.dz(b)), new li("[[Background color|Menu item to select background color.]]",J(J(ri, f) || {}, "text", ""),"background-color",this.o), new li("[[Background opacity|Menu item for changing background opacity for caption text.]]",J(qi, n, ""),"",this.$y(n)), new li("[[Window color|Menu item to select the window color.]]",J(J(ri, g) || {}, "text", ""),"window-color",this.w), new li("[[Window opacity|Menu item for changing window opacity for caption text]]",J(qi, p, ""),"",this.fz(p)), new li("[[Character edge style|Menu item to select character edge styles of the captions.]]",J(oi, k, ""),"",this.bz(k)), new li("[[Text opacity|Menu item to select text opacity of the captions.]]",J(qi, l, ""),"",this.ez(l))])
    }
    ;
    d.zE = function(a) {
        this.k.hk(a) || (this.displayProperties.mc().subtitle = a.detail.label,
        this.k.N(!0))
    }
    ;
    mi.prototype.getOptionsForCurrentDisplayProperty = function() {
        return this.displayProperties.mc().payload
    }
    ;
    d = mi.prototype;
    d.Yq = function() {
        var a = this.h.On()
          , b = this.h.Eg() || {};
        this.h.Gp(!!a.length);
        if (a.length) {
            for (var c, e = [], f = 0; f < a.length; ++f) {
                var g = a[f]
                  , k = new U(g.displayName,"language",g);
                b && g.id === b.id && (c = k);
                e.push(k)
            }
            e.unshift(new U("[[Off|Title of a button that turns subtitles off.]]","off"));
            this.j.ha(e);
            c && this.j.vg(c)
        } else
            this.En();
        this.N(!0)
    }
    ;
    d.yG = function(a) {
        switch (a.detail.type) {
        case ni.wE:
            this.h.Jo(a.detail.payload);
            break;
        case ni.vE:
            this.h.Ri(a.detail.payload);
            break;
        case ni.xE:
            this.h.Dj();
            break;
        case ni.uE:
            this.yE(a.detail.payload.color)
        }
        this.zE(a);
        S(a)
    }
    ;
    d.yE = function(a) {
        var b = this.displayProperties.mc(), c;
        b.type === ni.BE ? c = "color" : b.type === ni.AE ? c = "background" : b.type === ni.CE && (c = "windowColor");
        b = {};
        b[c] = a;
        b[c + "Override"] = 1;
        this.h.Ri(b)
    }
    ;
    d.zG = function(a) {
        switch (a.keyCode) {
        case 39:
            this.l.Z();
            break;
        case 37:
            this.k.Z()
        }
    }
    ;
    d.rE = function() {
        this.j.ha(pc(new U(""), 6))
    }
    ;
    d.En = function() {
        this.j.ha([new U("[[Not available|Title that is displayed when subtitles are not available.]]")])
    }
    ;
    d.Cx = function() {
        this.j.ha([new U("[[Loading...|Tooltip displayed when some data is loading.]]")])
    }
    ;
    d.az = function(a, b, c) {
        for (var e = "#080808 #f00 #f0f #00f #0ff #0f0 #ff0 #fff".split(" "), f = [], g = 0, k = e.length; g < k; ++g) {
            var l = e[g];
            f.push(new U(ri[l].text,"color",{
                color: l,
                "class": ri[l].className
            },"color-button"))
        }
        this.o.ha(f);
        this.o.na(e.indexOf(b));
        this.w.ha(f);
        this.w.na(e.indexOf(c));
        b = f.reverse().map(function(a) {
            a = new U(a.label,a.type,Bc(a.payload),a.cb);
            a.payload["class"] += " rounded";
            return a
        });
        this.p.ha(b);
        this.p.na(e.reverse().indexOf(a))
    }
    ;
    d.cz = function(a) {
        return this.we("fontFamilyOption", "monoSerif propSerif monoSans propSans casual cursive smallCaps".split(" "), oi, a)
    }
    ;
    d.bz = function(a) {
        return this.we("charEdgeStyle", ["none", "dropShadow", "raised", "depressed", "uniform"], oi, a)
    }
    ;
    d.ez = function(a) {
        return this.we("textOpacity", [0.5, 0.75, 1], qi, a)
    }
    ;
    d.$y = function(a) {
        return this.we("backgroundOpacity", [0, 0.25, 0.75, 1], qi, a)
    }
    ;
    d.fz = function(a) {
        return this.we("windowOpacity", [0, 0.25, 0.75, 1], qi, a)
    }
    ;
    d.dz = function(a) {
        return this.we("fontSizeIncrement", [-2, -1, 0, 2, 4], pi, a)
    }
    ;
    d.we = function(a, b, c, e) {
        var f = new ai(1);
        f.ha(this.YG(a, b, c));
        f.na(b.indexOf(e));
        return f
    }
    ;
    d.YG = function(a, b, c) {
        for (var e = [], f = 0, g = b.length; f < g; f++) {
            var k = b[f]
              , l = {};
            l[a] = k;
            e.push(new U(c[k] || k,"display-option",l))
        }
        return e
    }
    ;
    mi.inject = ["playerFacade", "environmentModel"];
    function ti(a) {
        T.call(this);
        this.model = a
    }
    A(ti, T);
    ti.prototype.ea = function(a) {
        ti.B.ea.call(this, a);
        this.aa(this.model, "items:changed", x(this.N, this))
    }
    ;
    ti.prototype.vb = function() {
        var a = ti.B.vb.call(this);
        0 < this.model.P() && a.push("active");
        return a
    }
    ;
    ti.prototype.getText = function() {
        return this.model.la().join("")
    }
    ;
    ti.inject = ["debugModel"];
    function ui(a) {
        a && (this.id = a.id || a.name,
        this.name = a.name,
        this.g = a.app,
        this.type = a.type || "REMOTE_CONTROL",
        this.username = a.user || "")
    }
    ui.prototype.id = "";
    ui.prototype.name = "";
    ui.prototype.g = "";
    ui.prototype.type = "REMOTE_CONTROL";
    ui.prototype.username = "";
    ui.prototype.b = !1;
    ui.prototype.vp = function() {
        return {
            id: this.id,
            name: this.name,
            app: this.g,
            type: this.type,
            user: this.username
        }
    }
    ;
    ui.prototype.h = function(a) {
        return a ? this.id == a.id : !1
    }
    ;
    function vi(a) {
        var b = a.name || "";
        a.username && (b = b + " (" + a.username + ")");
        this.displayString = $a(b);
        var b = a.b ? "connected" : "disconnected"
          , c = "mdx-unknown ";
        "LOUNGE_SCREEN" == a.type ? c = "mdx-screen " : a.g && (c = 0 < a.g.search(/tablet|ipad/g) ? "mdx-tablet " : "mdx-mobile ");
        this.deviceClass = c + b
    }
    ;function wi() {
        T.call(this);
        this.model = null;
        this.message = this.iconClass = ""
    }
    A(wi, T);
    wi.prototype.ea = function(a) {
        wi.B.ea.call(this, a);
        this.model && (this.iconClass = this.h(),
        this.message = this.j(),
        this.Jc("isBeingRemoved:changed", x(this.N, this)),
        this.N())
    }
    ;
    wi.prototype.vb = function() {
        var a = wi.B.vb.call(this);
        this.model && this.model.isBeingRemoved && a.push("toast-removing");
        return a
    }
    ;
    wi.prototype.h = function() {
        return ""
    }
    ;
    wi.prototype.j = function() {
        return ""
    }
    ;
    function xi() {
        wi.call(this);
        this.model = null;
        this.l = this.k()
    }
    A(xi, wi);
    xi.prototype.h = function() {
        var a = this.model.eo
          , b = a.g.match(/^[^-]+-[^-]+/);
        return (b = this.l[b ? b[0] : ""]) ? b[a.b] : a.b ? "remote-connected" : "remote-disconnected"
    }
    ;
    xi.prototype.j = function() {
        return (new vi(this.model.eo)).displayString
    }
    ;
    xi.prototype.k = function() {
        return {
            "android-phone": {
                "true": "android-phone-connected",
                "false": "android-phone-disconnected"
            },
            "android-tablet": {
                "true": "android-tablet-connected",
                "false": "android-tablet-disconnected"
            },
            "youtube-desktop": {
                "true": "laptop-connected",
                "false": "laptop-disconnected"
            },
            "ytios-phone": {
                "true": "ios-phone-connected",
                "false": "ios-phone-disconnected"
            },
            "ytios-tablet": {
                "true": "ios-tablet-connected",
                "false": "ios-tablet-disconnected"
            }
        }
    }
    ;
    function yi(a, b) {
        gi.call(this, a, b);
        this.h = this.model = null
    }
    A(yi, gi);
    yi.prototype.wa = function() {
        yi.B.wa.call(this);
        this.h = this.G.querySelector(".video-thumb")
    }
    ;
    yi.prototype.ea = function(a) {
        yi.B.ea.call(this, a)
    }
    ;
    yi.inject = ["locale", "voiceHelper"];
    function zi(a) {
        T.call(this);
        this.stopPhrase = a.S("[[Stop listening|Speech command spoken to stop voice engagement.]]");
        this.goBackPhrase = a.S("[[Go back|Speech command for going back from the current screen.]]")
    }
    A(zi, T);
    zi.inject = ["locale"];
    function Ai(a) {
        T.call(this);
        this.iconClass = "icon";
        this.title = this.iconBackground = "";
        this.h = a
    }
    A(Ai, T);
    d = Ai.prototype;
    d.ready = function() {
        this.onEnter || (this.onEnter = x(this.PJ, this))
    }
    ;
    d.ea = function(a) {
        Ai.B.ea.call(this, a);
        (a = this.model ? this.model.model : null) && !a.title && this.Jc("model:changed", x(this.RF, this));
        this.yr(a);
        this.N()
    }
    ;
    d.RF = function() {
        var a = this.model.model;
        a && a.title && this.Af(this.model);
        this.yr(a);
        this.N()
    }
    ;
    d.yr = function(a) {
        this.title = "";
        this.iconClass = "icon";
        this.iconBackground = "";
        a && (this.title = this.h.S(a.title),
        this.nE(a.Ya))
    }
    ;
    d.nE = function(a) {
        this.iconClass = "icon";
        this.iconBackground = "";
        a && (0 == a.lastIndexOf("/", 0) && 0 != a.lastIndexOf("//", 0) ? this.iconBackground = "url(" + M.Or + a + ")" : Wa(a, ".jpg") || Wa(a, ".png") ? this.iconBackground = "url(" + a + ")" : this.iconClass += " " + a)
    }
    ;
    d.PJ = function(a) {
        Dg(a.target, "icon") && (this.V("button-enter", this.model),
        S(a))
    }
    ;
    Ai.inject = ["locale"];
    function Bi() {
        Yh.call(this);
        this.h = [];
        this.g = !0;
        this.C("selectedIndex:changed", x(this.fp, this));
        this.C("selection:changed", x(this.jp, this));
        this.C("items:changed", x(this.wz, this));
        this.C("items:changed", x(this.jp, this))
    }
    A(Bi, Yh);
    d = Bi.prototype;
    d.vJ = function(a, b) {
        for (var c = [], e; a.length; )
            e = new Yh,
            e.ha(a.splice(0, Math.max(b || a.length, 1))),
            c.push(e);
        this.ha(c)
    }
    ;
    d.CJ = function() {
        var a = this.mc();
        return a ? a.mc() : null
    }
    ;
    d.$H = function(a) {
        for (var b = 0, c = this.P(); b < c; ++b) {
            var e = this.ia(b);
            0 <= e.xk(a) && (this.g = !1,
            e.vg(a),
            this.g = !0)
        }
    }
    ;
    d.na = function(a) {
        if (!this.Ld(a))
            return !1;
        var b = this.ia(a);
        return this.g && b && b.na(this.QB()) ? !0 : Bi.B.na.call(this, a)
    }
    ;
    d.QB = function() {
        return this.mc() ? this.mc().La() : -1
    }
    ;
    d.MG = function(a, b) {
        var c = this.ia(a);
        return c ? c.na(b) : !1
    }
    ;
    d.aD = function(a, b) {
        a == this.La() ? this.fp() : -1 != b && (this.g = !1,
        this.na(a),
        this.g = !0)
    }
    ;
    d.fp = function() {
        this.L("selection:changed")
    }
    ;
    d.wz = function() {
        for (var a = 0, b = this.h.length; a < b; ++a)
            this.h[a]();
        a = this.h.length = 0;
        for (b = this.P(); a < b; ++a) {
            var c = this.ia(a);
            this.h.push(c.C("selectedIndex:changed", x(this.aD, this, a)))
        }
    }
    ;
    d.jp = function() {
        for (var a = 0, b = this.P(); a < b; ++a) {
            var c = this.ia(a)
              , e = a == this.La();
            c.tG(e && this.sG());
            e || c.na(-1)
        }
    }
    ;
    function Ci() {
        T.call(this);
        this.flagData = new Bi;
        this.flagData.vJ([new U("[[Sexual Content|GTGC4NgMTyty-lg7bvKq5g]]","flag-normal"), new U("[[Child Abuse|IngFQG4SEoOLkyKZJEPR6g]]","flag-normal"), new U("[[Violent or Repulsive Content|qhVb-TasMDalcVlh0-bVNQ]]","flag-normal"), new U("[[Spam|Pnw-OErhkCrqYT5klcLesw]]","flag-normal"), new U("[[Hateful or Abusive Content|VlY1sRyrA4TwmawjC86xFw]]","flag-normal"), new U("[[Infringes My Rights|GwQ2vMHBH9Ls3VHHIixT-Q]]","flag-rights"), new U("[[Harmful Dangerous Acts|rCIBQRDFyfIBja9x497u6A]]","flag-normal")], 2)
    }
    A(Ci, T);
    Ci.prototype.wa = function() {
        Ci.B.wa.call(this);
        this.C("button-enter", x(this.h, this))
    }
    ;
    Ci.prototype.Z = function() {
        Ci.B.Z.call(this);
        this.tc(0).Z()
    }
    ;
    Ci.prototype.h = function(a) {
        switch (a.detail.type) {
        case "flag-normal":
            this.V("request-flag-video");
            S(a);
            break;
        case "flag-rights":
            this.V("request-flag-claim"),
            S(a)
        }
    }
    ;
    function Di(a, b, c, e, f, g, k, l) {
        this.name = "dialog";
        Uh.call(this, a, b, c);
        k.tt(this);
        this.H = e;
        this.D = f;
        this.$ = g;
        this.O = null;
        this.A = l;
        this.X = this.ka("#dialog-wrapper");
        this.p = this.ka("#inner-dialog-container");
        this.U = this.ka(".title");
        this.data = this.fa = this.o = this.h = this.j = null;
        this.C("keyup", x(this.ut, this));
        this.C("keydown", x(S, this));
        this.C("request-close-dialog", x(this.Ol, this));
        this.K = {};
        this.k = {};
        this.g = null;
        this.R();
        this.K[M.I + "/dialogs/simple_dialog.html"] = this.Pl;
        this.k["debug-info"] = this.lt;
        this.k["delete-clip"] = this.mt;
        this.k["flag-claim"] = this.nt;
        this.k["flag-video"] = this.ot;
        this.k["logout-info"] = this.pt;
        this.k["paid-channel-info"] = this.qt;
        this.k["player-error-info"] = this.rt;
        this.k["remote-reset"] = this.st;
        this.C("dialog:complete", x(this.Ql, this));
        this.b = this.A.get("voiceHelper");
        this.b.Qb(this)
    }
    A(Di, Uh);
    Di.prototype.R = function() {
        this.j = this.Pa("button", this.A, this);
        this.h = this.Pa("button", this.A, this)
    }
    ;
    Di.prototype.cancelClickHandler = function(a) {
        a && S(a);
        this.data && this.data.w && this.data.w();
        this.Ol()
    }
    ;
    Di.prototype.okClickHandler = function(a) {
        S(a);
        this.Ql()
    }
    ;
    d = Di.prototype;
    d.vd = function() {
        this.j.ba();
        this.h.ba();
        this.o && !this.oj() && this.o.Z()
    }
    ;
    d.ts = function() {
        this.Zp() || this.cancelClickHandler()
    }
    ;
    d.am = function() {
        return !(!this.data || !this.data.g)
    }
    ;
    d.Zp = function() {
        return !(!this.data || !this.data.A)
    }
    ;
    d.zd = function(a) {
        Di.B.zd.call(this, a);
        this.data ? (this.data.b ? this.Mt() : this.data.templateUrl && this.$.get(a.templateUrl, {}, x(this.Lt, this)),
        this.F && this.element.removeClass(this.F),
        this.element.addClass(this.data.className),
        this.F = this.data.className,
        this.element.html() && (this.ac(this.U, this.D.S(this.data.title)),
        this.am() ? (this.data.k ? (this.j.model = new U(this.data.k,"confirm-dialog-cancel-button"),
        this.j.show()) : this.j.ma(),
        this.data.h ? (this.h.model = new U(this.data.h,"confirm-dialog-ok-button"),
        this.h.show()) : this.h.ma(),
        this.o = this.data.l == this.h.G.id ? this.h : this.j,
        this.vd()) : (this.o = null,
        this.j.ma(),
        this.h.ma()),
        this.j.N(),
        this.h.N())) : this.ei()
    }
    ;
    d.ei = function() {
        this.O && (this.O.$destroy(),
        this.fk())
    }
    ;
    d.fk = function() {
        for (var a = this.l.length - 1; 0 <= a; --a) {
            var b = this.l[a];
            b instanceof Ei || (b instanceof T ? (bd(b),
            De(b.G)) : this.l[a].element.remove(),
            jc(this.l, b),
            b.id in this.children && delete this.children[b.id])
        }
        this.g = null
    }
    ;
    d.Mt = function() {
        if (this.p) {
            var a = this.data.b;
            null != a && Eg(this.X, this.cw(a));
            if (this.A.contains(a)) {
                if (this.g = this.bw(a, this.p, this.A),
                this.g.model = this.data,
                a = this.k[a])
                    a.apply(this),
                    this.fg() && this.g.Z()
            } else
                this.Pe(this.p, "<" + a + ' activate-when="dialog.isActive" data="dialog.data"></' + a + ">"),
                this.Pl()
        }
    }
    ;
    d.cw = function(a) {
        return "dialog-wrapper-" + a
    }
    ;
    d.Lt = function(a) {
        this.Pe(this.p, a);
        this.Z();
        this.focus();
        (a = this.K[this.data.templateUrl]) && a.call(this)
    }
    ;
    d.Pl = function() {
        this.ei();
        this.O = this.scope.$new();
        this.H(angular.element(this.p).contents())(this.O);
        this.Z()
    }
    ;
    d.Z = function() {
        Di.B.Z.call(this);
        this.g && this.fg() && this.g.Z();
        this.vd();
        this.sb()
    }
    ;
    d.ut = function(a) {
        S(a);
        var b = a.target;
        switch (a.keyCode) {
        case 8:
        case 27:
            this.ts();
            break;
        case 13:
            a.target && Xe(b, "back") && this.ts()
        }
        this.am() && this.qI(a.keyCode, b);
        this.jd(this.scope)
    }
    ;
    d.qI = function(a) {
        switch (a) {
        case 39:
            this.h.isHidden || this.oj() || (this.o = this.h,
            this.vd());
            break;
        case 37:
            this.j.isHidden || this.oj() || (this.o = this.j,
            this.vd());
            break;
        case 38:
            this.fg() && (this.g.Z(),
            this.vd());
            break;
        case 40:
            this.fg() && (this.g.ba(),
            this.vd())
        }
    }
    ;
    d.Ol = function(a) {
        this.ei();
        this.O = null;
        a || this.V("request-close-dialog");
        this.Ua()
    }
    ;
    d.nt = function() {
        this.ac(this.ka(".text"), this.D.S(this.data.video.title));
        this.ac(this.ka(".url"), this.data.p)
    }
    ;
    d.ot = function() {
        this.ac(this.ka(".url"), this.data.p)
    }
    ;
    d.pt = function() {
        this.ac(this.ka(".display-name"), this.data.j.displayName);
        this.ac(this.ka(".platform-user-name"), this.data.j.platformUserName);
        this.ka(".login-user-icon").style.backgroundImage = "url(" + this.data.j.imageUrl + ")";
        var a = this.data.j.platformUserIcon || "";
        this.ka(".platform-user-icon").style.backgroundImage = "url(" + a + ")";
        a = "[[<div>You're signed in as <strong>" + this.data.j.displayName + "&nbsp;</strong></div>|Tooltip displaying the YouTube username of the currently signed-in user.]]";
        this.Pe(this.ka(".signed-in-message"), this.D.S(a))
    }
    ;
    d.qt = function() {
        this.ac(this.ka(".channel-url"), this.data.F())
    }
    ;
    d.rt = function() {
        this.ac(this.ka(".player-error"), this.D.S(this.data.H()))
    }
    ;
    d.st = function() {
        var a = this.data.K().la();
        this.Cc(this.p, 0 < a.length);
        var b = "";
        a.forEach(function(a) {
            a = new vi(a);
            b += '<li class="' + a.deviceClass + '">' + a.displayString + "</li>"
        });
        this.Pe(this.ka(".devices"), b)
    }
    ;
    d.lt = function() {
        var a = "<ul>", b;
        for (b in this.data.o)
            a += "<li><span>" + b + ":</span> " + this.data.o[b] + "</li>";
        a += "</ul>";
        this.Pe(this.ka("#debug-info"), a)
    }
    ;
    d.mt = function() {
        var a = this.g.tc(0);
        a.model = this.data.videoModel;
        a.N()
    }
    ;
    d.Ql = function() {
        this.data.O()
    }
    ;
    d.oj = function() {
        return !!this.g && this.g.isActive
    }
    ;
    d.fg = function() {
        return this.data ? !!this.g && this.data.D || !this.data.g : !1
    }
    ;
    Di.$inject = "$scope $element $attrs $compile locale ytHttp dialogService injector".split(" ");
    function V(a, b) {
        this.U = this.templateUrl = this.title = this.className = "";
        this.A = this.g = !1;
        this.O = a || q;
        this.w = b || q;
        this.h = "[[OK|Standard button title in a dialog popup. Accepts changes made by a user.]]";
        this.k = "[[Cancel|Standard button title in a dialog popup. Usually closes the dialog without performing any action.]]";
        this.l = "confirm-dialog-cancel-button";
        this.D = !1
    }
    ;function Fi(a, b) {
        V.call(this, a, b);
        this.title = "[[Captions Settings|Settings screen where the user can choose the language of subtitles or turn them off.]]";
        this.b = "closed-captions"
    }
    A(Fi, V);
    function Gi(a, b) {
        V.call(this);
        this.title = "Debug Info";
        this.b = "debug-info";
        this.className = "text-dialog";
        this.o = a.Jz();
        a.O && (this.o.Storage = b.Kz())
    }
    A(Gi, V);
    function Hi() {
        V.call(this);
        this.title = "[[Delete clip|Title of a dialog where user can delete an uploaded video clip on Xbox One]]";
        this.b = "delete-clip";
        this.className = "text-dialog";
        this.g = !0;
        this.h = "[[Yes, delete|Text on button to go ahead and delete a clip]]";
        this.l = "confirm-dialog-ok-button";
        this.videoModel = null
    }
    A(Hi, V);
    function Ii(a, b) {
        V.call(this);
        this.title = "[[Tell us what you think or report an issue|Title of a page where user can submit their issue or provide a feedback.]]";
        this.className = this.b = "feedback";
        this.baseUrl = "www.youtube.com/tv_feedback";
        a.l ? this.baseUrl = "www.youtube.com/ps3_feedback" : a.j ? this.baseUrl = "www.youtube.com/wiiu_feedback" : a.k && (this.baseUrl = "www.youtube.com/xb1_feedback");
        this.qrCodeUrl = this.baseUrl + "?" + hd(b)
    }
    A(Ii, V);
    function Ji(a, b) {
        V.call(this, null, b);
        this.title = "[[Submit a claim for:|Displayed in a dialog when a user decides to claim that a video infringes copyrights. Followed by a list of options.]]";
        this.b = "flag-claim";
        this.video = a;
        this.p = "youtu.be/" + this.video.videoId
    }
    A(Ji, V);
    function Ki() {
        V.call(this);
        this.title = "[[Flag This Video For:|Displayed in a dialog when a user decides to claim that a video is inappropriate. Followed by a list of options.]]";
        this.b = "flag-options"
    }
    A(Ki, V);
    function Li(a, b) {
        V.call(this, null, b);
        this.title = "[[To Flag this video|Tooltip helping a user to mark a video as inappropriate. Followed by a list of steps that needs to be performed.]]";
        this.b = "flag-video";
        this.video = a;
        this.p = "youtu.be/" + this.video.videoId
    }
    A(Li, V);
    function Mi(a) {
        V.call(this);
        this.title = "[[Get help with YouTube on TV|Title of a page where user can access to the help articles on how to use YouTube on TV application.]]";
        this.b = "qrDialog";
        this.className = "help";
        this.baseUrl = a ? "www.youtube.com/ps3_help" : "www.youtube.com/tv_help"
    }
    A(Mi, V);
    function Ni(a, b, c) {
        V.call(this, a, c);
        this.title = b || "[[Sign in to YouTube:|Dialog title helping a user to sign in to YouTube via this application.|12570103]]";
        this.b = "loginInfo"
    }
    A(Ni, V);
    function Oi(a, b) {
        V.call(this, b);
        this.title = "[[Sign Out?|Dialog title asking a user if she wants to sign out from her YouTube account via this application.]]";
        this.b = "logout-info";
        this.g = !0;
        this.j = a
    }
    A(Oi, V);
    function Pi(a, b, c) {
        V.call(this, b, c);
        this.title = "[[Payment Required|Title of a dialog that asks user to make a payment in order to play a video.]]";
        this.b = "paid-channel-info";
        this.channelName = a
    }
    A(Pi, V);
    Pi.prototype.F = function() {
        return "www.youtube.com/user/" + this.channelName
    }
    ;
    function Qi(a, b) {
        V.call(this, a, b);
        this.title = "[[YouTube TV is requesting permission to:|Dialog title that tells users that the application is requestin new permissions. The list of permissions will follow this title.]]";
        this.templateUrl = M.I + "/dialogs/paid_scope.html";
        this.type = "remote-pair";
        this.A = this.g = !0;
        this.h = "[[Accept|Text on button that accepts new permissions]]";
        this.k = "[[Sign out|Text on button that signs user out of application]]";
        this.className = "text-dialog";
        this.l = "confirm-dialog-ok-button"
    }
    A(Qi, V);
    function Va(a, b, c) {
        V.call(this, b, c);
        this.title = "[[Playback Error.|Tooltip displayed when a video cannot be played.]]";
        this.b = "player-error-info";
        this.g = !0;
        this.className = "player-error-dialog";
        this.h = "[[Next Video|Button title in a dialog popup. Proceeds playback to the next video.]]";
        this.k = "[[Back to Guide|Button title in a dialog popup. Navigates back to the main Guide page.]]";
        this.errorMessage = a
    }
    A(Va, V);
    Va.prototype.H = function() {
        return this.errorMessage
    }
    ;
    function Ri() {
        V.call(this);
        this.title = "[[Pair your phone, tablet or laptop.|Tooltip helping a user to connect their mobile device with the application.|11149392]]";
        this.b = "pairing";
        this.type = "remote-pair"
    }
    A(Ri, V);
    function Si(a, b) {
        V.call(this, b);
        this.title = "[[Remove Paired Devices?|Dialog title asking a user for a confirmation to disconnect any mobile devices paired with the application]]";
        this.b = "remote-reset";
        this.g = !0;
        this.className = "remote-reset-dialog";
        this.type = "remote-reset";
        this.R = a
    }
    A(Si, V);
    Si.prototype.K = function() {
        return this.R.$f()
    }
    ;
    function Ti(a, b) {
        V.call(this);
        this.title = a;
        this.templateUrl = b;
        this.b = "scroll-pane"
    }
    A(Ti, V);
    function Ui(a, b) {
        V.call(this, a, b);
        this.title = "[[Signed Out|Dialog title that informs the user that they are signed out of the application]]";
        this.b = "signed-out-info";
        this.g = !0;
        this.className = "text-dialog"
    }
    A(Ui, V);
    function Vi(a, b, c, e, f) {
        V.call(this, e, f);
        this.title = a || "";
        this.className = c || "text-dialog";
        b && (this.b = b)
    }
    A(Vi, V);
    function Wi() {
        V.call(this);
        this.title = "[[Choose Clip:|Title of a dialog that allows uploading videos.]]";
        this.b = "video-uploads";
        this.g = !0;
        this.h = "";
        this.D = !0
    }
    A(Wi, V);
    function W(a, b, c, e, f, g, k) {
        this.b = a;
        this.cb = b;
        this.di = c;
        this.title = e || "";
        this.iconClass = f || "";
        this.description = g || "";
        this.tileClass = k || "";
        this.S()
    }
    W.prototype.S = function() {
        this.title = this.b.S(this.title);
        this.description = this.b.S(this.description)
    }
    ;
    function Xi(a, b, c, e) {
        this.channel = e || null;
        W.call(this, a, b, c)
    }
    A(Xi, W);
    Xi.prototype.getTitle = function() {
        return this.b.S("[[Sign Out|Title and voice command for action tile allowing users to sign out from the app.|1399182427]]")
    }
    ;
    Xi.prototype.getUserName = function() {
        return this.channel && this.channel.displayName || ""
    }
    ;
    function Yi(a, b, c, e, f, g, k, l, n, p, u, r, E, R) {
        K.call(this);
        this.k = a;
        this.l = b;
        this.g = c;
        this.h = e;
        this.w = f;
        this.A = g;
        this.j = k;
        this.o = l;
        this.K = n;
        this.F = p;
        this.p = u;
        this.H = r;
        this.nc = E;
        this.D = R;
        this.du()
    }
    A(Yi, K);
    d = Yi.prototype;
    d.tt = function(a) {
        this.b = a
    }
    ;
    d.du = function() {
        for (var a = [{
            eventName: "request-close-dialog",
            handler: this.ma
        }, {
            eventName: "request-flag-options",
            handler: this.sk
        }, {
            eventName: "request-flag-video",
            handler: this.WD
        }, {
            eventName: "request-flag-claim",
            handler: this.VD
        }, {
            eventName: "request-cc-options",
            handler: this.SD
        }, {
            eventName: "network-failure",
            handler: this.ZD
        }, {
            eventName: "request-toggle-subscription",
            handler: this.cE
        }, {
            eventName: "request-debug-info",
            handler: this.TD
        }, {
            eventName: "request-delete-clip",
            handler: this.UD
        }, {
            eventName: "request-logout",
            handler: this.YD
        }, {
            eventName: "request-login",
            handler: this.Tq
        }, {
            eventName: "request_paid_scope_dialog",
            handler: this.$D
        }, {
            eventName: "request-pairing",
            handler: this.aE
        }, {
            eventName: "request-remote-reset",
            handler: this.bE
        }, {
            eventName: "request-view-tos",
            handler: this.jE
        }, {
            eventName: "request-view-credits",
            handler: this.eE
        }, {
            eventName: "request-view-kenko",
            handler: this.hE
        }, {
            eventName: "request-view-shiyojo",
            handler: this.iE
        }, {
            eventName: "request-like-video",
            handler: this.XD
        }, {
            eventName: "request-view-help",
            handler: this.gE
        }, {
            eventName: "request-view-feedback",
            handler: this.fE
        }, {
            eventName: "request-video-uploads",
            handler: this.dE
        }], b = 0, c = a.length; b < c; ++b)
            this.F.C(a[b].eventName, x(a[b].handler, this));
        a = x(this.kE, this);
        this.j.C("state:changed", a);
        this.j.ug(a)
    }
    ;
    d.show = function(a) {
        this.b && this.b.zd(a);
        this.L("dialog:changed", !0)
    }
    ;
    d.ma = function() {
        this.b && this.b.zd(null);
        this.L("dialog:changed", !1)
    }
    ;
    d.zB = function() {
        this.b ? this.b.cancelClickHandler() : this.ma()
    }
    ;
    d.iF = function() {
        return this.b.Zp()
    }
    ;
    d.Hy = function() {
        return this.b ? this.b.data : null
    }
    ;
    d.Bf = function(a, b, c) {
        this.show(new Vi(a,b,c))
    }
    ;
    d.Yk = function(a, b) {
        this.show(new Ti(a,b))
    }
    ;
    d.bm = function(a) {
        var b = new V;
        b.title = a;
        this.show(b)
    }
    ;
    d.sk = function(a) {
        this.show(new Ki);
        a && S(a)
    }
    ;
    d.WD = function(a) {
        this.show(new Li(this.k.currentVideo,x(this.sk, this)));
        S(a)
    }
    ;
    d.VD = function(a) {
        this.show(new Ji(this.k.currentVideo,x(this.sk, this)));
        S(a)
    }
    ;
    d.SD = function(a) {
        var b = x(this.vD, this, this.g.isPlaying);
        this.show(new Fi(b,b));
        a && S(a)
    }
    ;
    d.vD = function(a) {
        a && this.g.Rc()
    }
    ;
    d.TD = function() {
        this.show(new Gi(this.h,this.D))
    }
    ;
    d.UD = function() {
        this.show(new Hi)
    }
    ;
    d.hp = function(a, b) {
        this.j.zb(x(function(c) {
            if (c)
                a(!1);
            else {
                var e = !1;
                this.g.isPlaying && (e = !0,
                this.g.Ac());
                var f = x(function() {
                    e && this.g.Rc()
                }, this);
                this.show(new Ni(x(function() {
                    a(!0);
                    f()
                }, this),b,f))
            }
        }, this))
    }
    ;
    d.XD = function(a) {
        var b = a.detail.videoId
          , c = a.detail.PE;
        this.hp(x(function(a) {
            this.w.send({
                likeValue: c,
                videoId: b
            });
            this.A.add("video_like_value", b, c);
            a && this.L("login:complete")
        }, this), "[[Please sign in to like or dislike...|Dialog title asking a user to sign in before they can like or dislike this video.]]")
    }
    ;
    d.cE = function(a) {
        a = a.detail;
        a.b ? this.bB(a) : this.hp(x(this.aB, this, a), "[[Please sign in to subscribe...|Dialog title asking a user to sign in before they can subscribe.]]")
    }
    ;
    d.aB = function(a, b) {
        this.K.send({
            channelName: a.username
        }, x(function() {
            this.nc.Aq(a.username, !1);
            b ? this.L("login:complete") : this.l.j = !0
        }, this), x(function(a) {
            b && this.L("login:complete");
            this.XC(a)
        }, this))
    }
    ;
    d.bB = function(a) {
        var b = this.g.isPlaying;
        b && this.g.Ac();
        this.show(new Pi(a.Qa,null,x(function() {
            b && this.g.Rc()
        }, this)))
    }
    ;
    d.XC = function(a) {
        var b = "[[A subscription error has occurred please try again later.|Text message displayed when an error occurs while user tries to subscribe to a channel.]]";
        a.errorMessage && -1 < a.errorMessage.indexOf("NoLinkedYouTubeAccount") && (b = "[[To subscribe, you need to initialize YouTube for your account. Sign into YouTube on your computer or mobile device to complete the process.|Text message displayed when an error occurs while user tries to subscribe to a channel. Happens to a user who has signed in using Google account but never visited YouTube website. Advises the user to visit YouTube website in order to finish initiation process.]]");
        this.show(new Vi(b))
    }
    ;
    d.YD = function(a) {
        a = a.detail.data.channel;
        this.h.Xq(a);
        this.show(new Oi(a,x(this.L, this, "logout:complete")))
    }
    ;
    d.kE = function(a, b, c) {
        !a && b && (c ? this.SG() : this.show(new Ui(x(this.Tq, this),x(this.L, this, "logout:confirmed"))))
    }
    ;
    d.SG = function() {
        this.Bf("[[Sign in error|Dialog title that tells the user that he is no longer signed into YouTube account on TV due to error]]", "authentication-error-info")
    }
    ;
    d.Tq = function() {
        this.show(new Ni(x(this.L, this, "login:complete")))
    }
    ;
    d.$D = function() {
        this.show(new Qi(x(this.L, this, "paidScope:changed", !0),x(this.L, this, "paidScope:changed", !1)))
    }
    ;
    d.aE = function() {
        this.show(new Ri)
    }
    ;
    d.bE = function() {
        this.show(new Si(this.o,x(this.TF, this)))
    }
    ;
    d.TF = function() {
        this.o.mF();
        this.L("dialog:changed", !1);
        this.l.dq()
    }
    ;
    d.ZD = function() {
        this.g.Xi();
        this.k.Hp();
        this.Bf("[[A network error has occurred|Dialog title that tells the user that a network error has occurred]]", "network-error-info")
    }
    ;
    d.jE = function() {
        this.Bf("[[Terms of Service and Privacy Policy|Dialog title that shows links to terms of use and privacy documents on youtube.com.]]", "tos-info")
    }
    ;
    d.eE = function() {
        this.Yk("[[Credits|Dialog title that shows credit information, giving credit to all open-source software used in building this product.]]", M.I + "/rebound/dialogs/licenses.html")
    }
    ;
    d.hE = function() {
        this.Yk("\u5065\u5eb7\u306e\u305f\u3081\u306e\u3054\u6ce8\u610f", M.I + "/dialogs/kenko_warning.html")
    }
    ;
    d.iE = function() {
        this.Yk("\u4f7f\u7528\u4e0a\u306e\u3054\u6ce8\u610f", M.I + "/dialogs/shiyojo_warning.html")
    }
    ;
    d.gE = function() {
        this.p.isSupported() && this.p.triggerHelp() || this.show(new Mi(this.h.l))
    }
    ;
    d.fE = function() {
        this.show(new Ii(this.h,this.h.QE()))
    }
    ;
    d.dE = function() {
        this.show(new Wi)
    }
    ;
    Yi.$inject = "watchModel browseModel playerFacade environmentModel likeService cacheService authService remoteService subscribeService rootDispatcher systemApi cookiesApi subscriptionsModel localStorage".split(" ");
    function Zi(a) {
        K.call(this);
        this.h = this.g = this.k = this.j = this.l = null;
        this.o = !1;
        this.b = null;
        this.D = 150;
        this.w = a.Be ? 75 : 300;
        this.A = a.Be ? 75 : 200;
        this.F = 20;
        this.p = !1;
        this.ci()
    }
    A(Zi, K);
    var $i = {
        px: 0,
        qx: -90,
        rx: 90,
        sx: -180,
        tx: 180
    }
      , aj = {
        lj: "V",
        kj: "H"
    };
    d = Zi.prototype;
    d.Rn = function(a, b) {
        this.ci();
        b || (this.h = a);
        this.yj(a);
        this.p = !0
    }
    ;
    d.Iz = function(a) {
        this.yj(a)
    }
    ;
    d.Hz = function(a) {
        this.p = !1;
        this.h ? (150 >= a.timeStamp - this.h.timeStamp || this.j <= this.w && this.l <= this.A && !this.o) && this.L("tap", a) : this.yj(a);
        this.ci();
        this.h = null
    }
    ;
    d.ci = function() {
        this.j = this.l = 0;
        this.g = this.k = this.b = null;
        this.o = !1
    }
    ;
    d.tf = function(a) {
        return null === this.k ? !0 : 20 >= Math.abs(this.k - a)
    }
    ;
    d.yj = function(a) {
        var b = a && a.changedTouches && a.changedTouches[0] ? a.changedTouches[0] : a
          , b = {
            x: b.screenX,
            y: b.screenY
        };
        this.g || (this.g = b);
        this.l = Math.abs(this.g.y - b.y);
        this.j = Math.abs(this.g.x - b.x);
        b = this.wy(this.g, b);
        this.xy(a);
        this.k = b
    }
    ;
    d.xy = function(a) {
        (this.b === aj.kj || !this.b) && this.j >= this.w && (this.tf($i.rx) ? (this.$g("swiperight", a),
        this.b = aj.kj) : this.tf($i.qx) && (this.$g("swipeleft", a),
        this.b = aj.kj));
        if ((this.b === aj.lj || !this.b) && this.l >= this.A)
            if (this.tf($i.px))
                this.$g("swipedown", a),
                this.b = aj.lj;
            else if (this.tf($i.tx) || this.tf($i.sx))
                this.$g("swipeup", a),
                this.b = aj.lj
    }
    ;
    d.$g = function(a, b) {
        this.L(a, this.h);
        this.Rn(b, !0);
        this.o = !0
    }
    ;
    d.xJ = function(a, b) {
        return a && b ? {
            x: b.x - a.x,
            y: b.y - a.y
        } : {
            x: 0,
            y: 0
        }
    }
    ;
    d.wy = function(a, b) {
        if (a && b) {
            var c = this.xJ(a, b);
            return Math.round(180 * Math.atan2(c.x, c.y) / Math.PI)
        }
        return null
    }
    ;
    Zi.inject = ["environmentModel"];
    function bj(a, b, c, e, f, g, k, l, n, p) {
        this.j = a;
        this.D = b;
        this.o = c;
        this.b = e;
        this.w = f;
        this.k = g;
        this.g = k;
        this.l = p;
        this.A = l;
        this.p = n;
        this.It();
        this.Ht()
    }
    d = bj.prototype;
    d.It = function() {
        this.Ic("keydown", this.qp);
        this.Ic("keyup", this.qp);
        this.Ic("mousedown", this.rp);
        this.Ic("mouseup", this.rp);
        this.Ic("mousewheel", this.w(10, x(this.Bz, this)));
        this.Ic("touchstart", x(this.b.Rn, this.b));
        this.Ic("touchmove", x(this.b.Iz, this.b));
        this.Ic("touchend", x(this.b.Hz, this.b));
        this.b.C("tap", x(this.Gz, this));
        this.b.C("swipedown", x(this.Cz, this));
        this.b.C("swipeleft", x(this.Dz, this));
        this.b.C("swiperight", x(this.Ez, this));
        this.b.C("swipeup", x(this.Fz, this))
    }
    ;
    d.Ht = function() {
        this.g.isSupported() && (this.g.setMinimalConfidence(0.8),
        this.g.createEngagementCommand("You Tube", x(this.GB, this), "jutub", 0.8),
        this.g.setEngagementTimeout(1E4),
        this.g.addCommand(this.g.createCommand(this.p.S("[[Stop listening|Speech command spoken to stop voice engagement.]]"), x(this.HB, this))))
    }
    ;
    d.Ic = function(a, b) {
        this.j.addEventListener(a, x(b, this), !0)
    }
    ;
    d.qp = function(a) {
        this.k.yb();
        var b = this.o.iA(a.keyCode);
        16 === b ? S(a, !1, !0) : a.g || b == a.keyCode || (b = Rg(a.target, a.type, b, !0, a),
        S(a, !1, !0),
        a.target.dispatchEvent(b))
    }
    ;
    d.rF = function() {
        return this.b.p
    }
    ;
    d.rp = function(a) {
        if (this.h)
            this.h = !1;
        else {
            var b = a.type.replace("mouse", "key");
            this.Mc(a, 13, b)
        }
    }
    ;
    d.Bz = function(a) {
        this.Mc(a, 0 < a.wheelDelta ? 38 : 40)
    }
    ;
    d.Gz = function(a) {
        this.h = !0;
        this.Mc(a, 13, "keydown");
        this.Mc(a, 13, "keyup")
    }
    ;
    d.Cz = function(a) {
        this.h = !0;
        this.Mc(a, 38)
    }
    ;
    d.Fz = function(a) {
        this.h = !0;
        this.Mc(a, 40)
    }
    ;
    d.Dz = function(a) {
        this.h = !0;
        this.Mc(a, 39)
    }
    ;
    d.Ez = function(a) {
        this.h = !0;
        this.Mc(a, 37)
    }
    ;
    d.Mc = function(a, b, c) {
        b = Rg(a.target, c ? c : "keydown", b, !0, a);
        S(a, !1, !0);
        a.target.dispatchEvent(b)
    }
    ;
    d.Sk = function(a) {
        this.Ns("keydown", a);
        this.Ns("keyup", a)
    }
    ;
    d.Ns = function(a, b) {
        this.k.yb();
        var c = this.j.activeElement || this.j
          , e = Rg(c, a, b, !0);
        c.dispatchEvent(e)
    }
    ;
    d.GB = function(a, b) {
        this.A.V("engage-change", a);
        b && this.l.Yj(b)
    }
    ;
    d.HB = function(a, b) {
        this.g.exitEngagementMode();
        this.l.Yj(b)
    }
    ;
    bj.inject = "document $route environmentModel gestureRecognizer rateLimit playerFacade speechApi rootDispatcher locale speechReporting".split(" ");
    function cj(a, b, c, e, f) {
        T.call(this);
        this.A = a;
        this.D = b;
        this.w = c;
        this.goBackLabel = e.S("[[Go back|Speech command for going back from the current screen.]]");
        this.searchLabel = e.S("[[Search|Speech command to goto search.]]");
        this.goHomeLabel = e.S("[[Go home|Speech command for going back to the home screen.]]");
        this.deleteLabel = e.S("[[Delete|Speech command to delete a video from a user's playlist]]");
        this.showMoreLabel = e.S("[[Show more|Speech command to enable browse while watching a video]]");
        this.o = f.get("voiceHelper");
        this.l = f.get("voiceHelper");
        this.h = f.get("voiceHelper");
        this.O = this.p = f.get("voiceHelper");
        this.H = this.h;
        this.j = "";
        this.k = null;
        this.rw()
    }
    A(cj, T);
    d = cj.prototype;
    d.rw = function() {
        var a = x(this.Bw, this)
          , b = x(this.zw, this)
          , c = x(this.Aw, this)
          , e = x(this.Cw, this);
        this.p.$a("[[Go back|Speech command for going back from the current screen.]]", b, !1);
        this.p.Qb(this);
        this.h.$a("[[Go back|Speech command for going back from the current screen.]]", b, !1);
        this.h.$a("[[Show more|Speech command to enable browse while watching a video]]", e, !1);
        this.h.$a("[[Go home|Speech command for going back to the home screen.]]", c, !1);
        this.h.$a("[[Search|Speech command to goto search.]]", a, !1);
        this.h.Qb(this);
        this.l.$a("[[Go back|Speech command for going back from the current screen.]]", b, !1);
        this.l.$a("[[Go home|Speech command for going back to the home screen.]]", c, !1);
        this.l.Qb(this);
        this.o.$a("[[Search|Speech command to goto search.]]", a);
        this.o.Qb(this);
        this.b = this.o
    }
    ;
    d.Bw = function() {
        this.A.Sk(83)
    }
    ;
    d.zw = function() {
        this.A.Sk(27)
    }
    ;
    d.Aw = function() {
        this.w.ma();
        this.D.state("browse", {})
    }
    ;
    d.Cw = function() {
        this.A.Sk(40)
    }
    ;
    d.bI = function(a) {
        this.j = a;
        switch (this.j) {
        case "browse":
            this.ry() ? this.ce(this.l) : this.qy() ? this.ce(this.H) : this.ce(this.o);
            break;
        case "watch":
            this.ce(this.h);
            break;
        case "dialog":
            this.gm() ? this.Ua() : this.ce(this.p);
            break;
        case "search":
            this.ce(this.O);
            break;
        default:
            this.Ua()
        }
        this.sy("dialog" == this.j)
    }
    ;
    d.gm = function() {
        return "dialog" == this.j && this.w.iF()
    }
    ;
    d.ry = function() {
        return "browse" == this.j && "search" == this.D.mode()
    }
    ;
    d.qy = function() {
        return "browse" == this.j && "post-play" == this.D.mode()
    }
    ;
    d.ce = function(a) {
        this.b.isSupported() && (this.Ua(),
        this.b = a,
        this.sb())
    }
    ;
    d.sy = function(a) {
        var b = this.w.Hy()
          , b = b ? b.b : null;
        this.k && (this.removeClass(this.k),
        this.k = null);
        a && b && (this.k = "legend-for-dialog-" + b,
        this.addClass(this.k));
        a ? this.gm() ? this.addClass("mandatory-dialog") : this.addClass("dialog") : (this.removeClass("dialog"),
        this.removeClass("mandatory-dialog"));
        this.N()
    }
    ;
    cj.inject = ["gestureService", "locationService", "dialogService", "locale", "injector"];
    function dj() {
        L.call(this);
        this.Ka("feed", this.QH);
        this.Ka("entry", this.se);
        this.Ka("openSearch$startIndex", this.SH);
        this.Ka("openSearch$totalResults", this.TH);
        this.Ka("openSearch$itemsPerPage", this.RH)
    }
    A(dj, L);
    d = dj.prototype;
    d.QH = function(a, b, c) {
        return this.parse(a, c)
    }
    ;
    d.TH = function(a, b, c) {
        a.Rb = this.ua(c);
        return a
    }
    ;
    d.SH = function(a, b, c) {
        a.gK = this.ua(c);
        return a
    }
    ;
    d.RH = function(a, b, c) {
        a.fK = this.ua(c);
        return a
    }
    ;
    d.se = function(a, b, c) {
        a.FP = c;
        return a
    }
    ;
    d.Ej = function(a) {
        return t(a) ? a[0] : a
    }
    ;
    d.ua = function(a) {
        return (a = this.Ej(a)) && a.$t ? a.$t : ""
    }
    ;
    function ej(a, b, c, e, f, g, k, l, n, p, u) {
        var r = {
            alt: "json",
            key: "AI39si5-UxCbfO2jRg9EV2bWI0UDWm74GkLzZWFHkQR0bm4d0JTKyrhSi6NZORaTMuJaRH8zs0PmsCONB9uV3pSgzZklwvMoRA",
            v: "2.1"
        };
        u && y(r, u);
        this.g = g;
        Df.call(this, a, b, c, e, f, k, l, n, p, r)
    }
    A(ej, Df);
    d = ej.prototype;
    d.vf = function() {
        return this.b.useStageGdata ? "sgd" : "gd"
    }
    ;
    d.qe = function() {
        return this.b.useStageGdata ? "https://yt2009.truehosting.net/feeds/api" : "https://yt2009.truehosting.net/feeds/api"
    }
    ;
    d.Of = function() {
        return this.b.supportsCors ? "GET" : "JSONP"
    }
    ;
    d.load = function(a, b, c) {
        var e;
        a && (e = a.query,
        delete a.query);
        return this.bb(e, b, a, c)
    }
    ;
    d.bb = function(a, b, c, e, f) {
        c = c || {};
        c[this.k] = a;
        this.fF(c, this.l);
        b = this.Hf(c, b, e, f);
        f || (b.model.serviceQuery = a);
        return b
    }
    ;
    d.he = function(a, b, c, e) {
        var f = !1, g;
        this.g.zb(x(function(k) {
            if (!f) {
                k && (b.access_token = k);
                k = x(function(a) {
                    c && c(a);
                    this.g.cD()
                }, this);
                var l = x(function(a) {
                    e && e(a);
                    this.g.bD(a)
                }, this);
                g = Df.prototype.he.call(this, a, b, k, l)
            }
        }, this));
        return function() {
            g ? g() : f = !0
        }
    }
    ;
    d.fF = function(a, b) {
        b && b.fields && this.nJ(b.fields) && (a.fields = this.kJ(b.fields))
    }
    ;
    d.nJ = function(a) {
        return !!ic(fj, function(b) {
            return B(a, b[0])
        })
    }
    ;
    d.kJ = function(a) {
        bc(fj, function(b) {
            a = a.replace(b[0], this.tJ(b[1]))
        }, this);
        return a
    }
    ;
    d.tJ = function(a) {
        a = vc(sc(a, function(a) {
            return w(a) ? a.call(this) : a
        }, this));
        return dc(a, Boolean).join(" and ")
    }
    ;
    var fj = [["$default-filter", {
        qJ: "not(app:control/yt:state)",
        pJ: function() {
            return this.b.supportsPaidContent ? "" : "not(yt:paidContent/@type)"
        },
        uK: "media:group/yt:duration/@seconds>0"
    }], ["$inline-filter", {
        qJ: "not(link/entry/app:control/yt:state)",
        tK: "not(link/entry/app:control/app:draft)",
        pJ: function() {
            return this.b.supportsPaidContent ? "" : "not(link/entry/yt:paidContent/@type)"
        }
    }], ["$banner-quality", {
        DEFAULT: function() {
            return this.b.oc
        }
    }]];
    ej.inject = "id path csiService ytHttp environmentModel authService cacheService backendErrorReporting parser opt_paramKey opt_params".split(" ");
    function gj(a, b, c, e) {
        T.call(this);
        this.k = a;
        this.o = b;
        this.l = e;
        this.activationCode = c.S("[[Loading...|Tooltip displaying while connecting a mobile device with the application.]]");
        this.h = q;
        this.j = 0
    }
    A(gj, T);
    d = gj.prototype;
    d.ready = function() {
        this.Uq()
    }
    ;
    d.T = function() {
        this.k.vy();
        this.l.clearTimeout(this.j);
        this.h();
        this.h = q;
        gj.B.T.call(this)
    }
    ;
    d.Uq = function() {
        this.k.HF(x(this.GF, this), x(this.IF, this), x(this.JF, this))
    }
    ;
    d.GF = function(a, b) {
        this.activationCode = a;
        this.N();
        this.j = this.l.setTimeout(x(this.Uq, this), 1E3 * b)
    }
    ;
    d.IF = function() {
        this.h = this.o.bb("default", x(this.Dq, this), null, x(this.Dq, this)).cancel
    }
    ;
    d.JF = function() {
        this.Fb(this.G.querySelector(".connection-steps"), !1);
        this.Fb(this.G.querySelector(".connection-error"), !0)
    }
    ;
    d.Dq = function() {
        this.h = q;
        this.V("dialog:complete")
    }
    ;
    gj.inject = ["authService", "userProfileService", "locale", "timeService"];
    function hj(a, b) {
        T.call(this);
        this.j = a;
        this.k = b;
        this.message = ""
    }
    A(hj, T);
    hj.prototype.ready = function() {
        this.aa(this.k, "update-message", x(this.h, this))
    }
    ;
    hj.prototype.h = function(a) {
        this.message = this.j.S(a.detail && a.detail[0] || "");
        this.N()
    }
    ;
    hj.inject = ["locale", "rootDispatcher"];
    function ij() {
        this.b = z()
    }
    var jj = new ij;
    ij.prototype.h = function(a) {
        this.b = a
    }
    ;
    ij.prototype.g = function() {
        this.h(z())
    }
    ;
    ij.prototype.get = function() {
        return this.b
    }
    ;
    function kj(a) {
        this.g = a || "";
        this.b = jj
    }
    d = kj.prototype;
    d.rP = !0;
    d.XS = !0;
    d.$S = !0;
    d.ZS = !0;
    d.YS = !1;
    d.aT = !1;
    d.RS = function(a) {
        this.b = a
    }
    ;
    d.XQ = function() {
        return this.b
    }
    ;
    d.zS = function() {
        this.b.g()
    }
    ;
    function lj(a) {
        a = new Date(a.b());
        return mj(a.getFullYear() - 2E3) + mj(a.getMonth() + 1) + mj(a.getDate()) + " " + mj(a.getHours()) + ":" + mj(a.getMinutes()) + ":" + mj(a.getSeconds()) + "." + mj(Math.floor(a.getMilliseconds() / 10))
    }
    function mj(a) {
        return 10 > a ? "0" + a : String(a)
    }
    function nj(a, b) {
        var c = (a.b() - b) / 1E3
          , e = c.toFixed(3)
          , f = 0;
        if (1 > c)
            f = 2;
        else
            for (; 100 > c; )
                f++,
                c *= 10;
        for (; 0 < f--; )
            e = " " + e;
        return e
    }
    function oj(a) {
        kj.call(this, a)
    }
    A(oj, kj);
    oj.prototype.h = function(a) {
        var b = [];
        b.push(this.g, " ");
        b.push("[", lj(a), "] ");
        b.push("[", nj(a, this.b.get()), "s] ");
        b.push("[", a.g(), "] ");
        b.push(a.h());
        b.push("\n");
        return b.join("")
    }
    ;
    function pj(a, b) {
        this.g = new If(a);
        this.b = b ? Hf : Gf
    }
    pj.prototype.h = function(a) {
        return this.g.h(a)
    }
    ;
    pj.prototype.parse = function(a) {
        return this.b(a)
    }
    ;
    function qj(a, b, c) {
        c = c || h;
        var e = c.onerror
          , f = !!b;
        Bb && !G("535.3") && (f = !f);
        c.onerror = function(b, c, l, n, p) {
            e && e(b, c, l, n, p);
            a({
                message: b,
                fileName: c,
                lD: l,
                kD: n,
                error: p
            });
            return f
        }
    }
    ;function rj(a, b) {
        this.name = a;
        this.value = b
    }
    rj.prototype.toString = function() {
        return this.name
    }
    ;
    new rj("OFF",Infinity);
    new rj("SHOUT",1200);
    new rj("SEVERE",1E3);
    new rj("WARNING",900);
    new rj("INFO",800);
    new rj("CONFIG",700);
    new rj("FINE",500);
    new rj("FINER",400);
    new rj("FINEST",300);
    new rj("ALL",0);
    function sj() {}
    ;function tj(a) {
        this.g = 0;
        this.h = a || 100;
        this.b = []
    }
    d = tj.prototype;
    d.add = function(a) {
        var b = this.b[this.g];
        this.b[this.g] = a;
        this.g = (this.g + 1) % this.h;
        return b
    }
    ;
    d.get = function(a) {
        a = this.Wp(a);
        return this.b[a]
    }
    ;
    d.AR = function(a, b) {
        a = this.Wp(a);
        this.b[a] = b
    }
    ;
    d.oa = function() {
        return this.b.length
    }
    ;
    d.Ta = function() {
        return 0 == this.b.length
    }
    ;
    d.clear = function() {
        this.g = this.b.length = 0
    }
    ;
    d.sa = function() {
        return this.eI(this.oa())
    }
    ;
    d.eI = function(a) {
        var b = this.oa()
          , c = [];
        for (a = this.oa() - a; a < b; a++)
            c.push(this.get(a));
        return c
    }
    ;
    d.Bb = function() {
        for (var a = [], b = this.oa(), c = 0; c < b; c++)
            a[c] = c;
        return a
    }
    ;
    d.zR = function(a) {
        return a < this.oa()
    }
    ;
    d.Rf = function(a) {
        for (var b = this.oa(), c = 0; c < b; c++)
            if (this.get(c) == a)
                return !0;
        return !1
    }
    ;
    d.tQ = function() {
        return 0 == this.oa() ? null : this.get(this.oa() - 1)
    }
    ;
    d.Wp = function(a) {
        if (a >= this.b.length)
            throw Error("Out of bounds exception");
        return this.b.length < this.h ? a : (this.g + Number(a)) % this.h
    }
    ;
    function uj(a, b) {
        var c;
        a instanceof uj ? (this.Kc = s(b) ? b : a.wA(),
        this.nh(a.ak()),
        this.oh(a.bk()),
        this.Cf(a.dd()),
        this.Df(a.ke()),
        this.mh(a.Ef()),
        this.Ff(a.xA().clone()),
        this.lh(a.$j())) : a && (c = Vb(String(a))) ? (this.Kc = !!b,
        this.nh(c[1] || "", !0),
        this.oh(c[2] || "", !0),
        this.Cf(c[3] || "", !0),
        this.Df(c[4]),
        this.mh(c[5] || "", !0),
        this.Ff(c[6] || "", !0),
        this.lh(c[7] || "", !0)) : (this.Kc = !!b,
        this.b = new vj(null,null,this.Kc))
    }
    d = uj.prototype;
    d.ve = "";
    d.ml = "";
    d.jl = "";
    d.Nh = null;
    d.ll = "";
    d.kl = "";
    d.sl = !1;
    d.Kc = !1;
    d.toString = function() {
        var a = []
          , b = this.ak();
        b && a.push(wj(b, xj), ":");
        if (b = this.dd()) {
            a.push("//");
            var c = this.bk();
            c && a.push(wj(c, xj), "@");
            a.push(encodeURIComponent(String(b)));
            b = this.ke();
            null != b && a.push(":", String(b))
        }
        if (b = this.Ef())
            this.Pf() && "/" != b.charAt(0) && a.push("/"),
            a.push(wj(b, "/" == b.charAt(0) ? yj : zj));
        (b = this.js()) && a.push("?", b);
        (b = this.$j()) && a.push("#", wj(b, Aj));
        return a.join("")
    }
    ;
    d.resolve = function(a) {
        var b = this.clone()
          , c = a.KG();
        c ? b.nh(a.ak()) : c = a.LG();
        c ? b.oh(a.bk()) : c = a.Pf();
        c ? b.Cf(a.dd()) : c = a.Uk();
        var e = a.Ef();
        if (c)
            b.Df(a.ke());
        else if (c = a.Vr()) {
            if ("/" != e.charAt(0))
                if (this.Pf() && !this.Vr())
                    e = "/" + e;
                else {
                    var f = b.Ef().lastIndexOf("/");
                    -1 != f && (e = b.Ef().substr(0, f + 1) + e)
                }
            f = e;
            if (".." == f || "." == f)
                e = "";
            else if (B(f, "./") || B(f, "/.")) {
                for (var e = 0 == f.lastIndexOf("/", 0), f = f.split("/"), g = [], k = 0; k < f.length; ) {
                    var l = f[k++];
                    "." == l ? e && k == f.length && g.push("") : ".." == l ? ((1 < g.length || 1 == g.length && "" != g[0]) && g.pop(),
                    e && k == f.length && g.push("")) : (g.push(l),
                    e = !0)
                }
                e = g.join("/")
            } else
                e = f
        }
        c ? b.mh(e) : c = a.JG();
        c ? b.Ff(a.HG()) : c = a.IG();
        c && b.lh(a.$j());
        return b
    }
    ;
    d.clone = function() {
        return new uj(this)
    }
    ;
    d.ak = function() {
        return this.ve
    }
    ;
    d.nh = function(a, b) {
        this.Ob();
        if (this.ve = b ? Bj(a) : a)
            this.ve = this.ve.replace(/:$/, "");
        return this
    }
    ;
    d.KG = function() {
        return !!this.ve
    }
    ;
    d.bk = function() {
        return this.ml
    }
    ;
    d.oh = function(a, b) {
        this.Ob();
        this.ml = b ? Bj(a) : a;
        return this
    }
    ;
    d.LG = function() {
        return !!this.ml
    }
    ;
    d.dd = function() {
        return this.jl
    }
    ;
    d.Cf = function(a, b) {
        this.Ob();
        this.jl = b ? Bj(a) : a;
        return this
    }
    ;
    d.Pf = function() {
        return !!this.jl
    }
    ;
    d.ke = function() {
        return this.Nh
    }
    ;
    d.Df = function(a) {
        this.Ob();
        if (a) {
            a = Number(a);
            if (isNaN(a) || 0 > a)
                throw Error("Bad port number " + a);
            this.Nh = a
        } else
            this.Nh = null;
        return this
    }
    ;
    d.Uk = function() {
        return null != this.Nh
    }
    ;
    d.Ef = function() {
        return this.ll
    }
    ;
    d.mh = function(a, b) {
        this.Ob();
        this.ll = b ? Bj(a) : a;
        return this
    }
    ;
    d.Vr = function() {
        return !!this.ll
    }
    ;
    d.JG = function() {
        return "" !== this.b.toString()
    }
    ;
    d.Ff = function(a, b) {
        this.Ob();
        a instanceof vj ? (this.b = a,
        this.b.Tp(this.Kc)) : (b || (a = wj(a, Cj)),
        this.b = new vj(a,null,this.Kc));
        return this
    }
    ;
    d.gR = function(a, b) {
        return this.Ff(a, b)
    }
    ;
    d.js = function() {
        return this.b.toString()
    }
    ;
    d.HG = function() {
        return this.b.tB()
    }
    ;
    d.xA = function() {
        return this.b
    }
    ;
    d.eR = function() {
        return this.js()
    }
    ;
    d.Da = function(a, b) {
        this.Ob();
        this.b.WA(a, b);
        return this
    }
    ;
    d.Fd = function(a, b) {
        this.Ob();
        t(b) || (b = [String(b)]);
        this.b.to(a, b);
        return this
    }
    ;
    d.GQ = function(a) {
        return this.b.sa(a)
    }
    ;
    d.FQ = function(a) {
        return this.b.get(a)
    }
    ;
    d.$j = function() {
        return this.kl
    }
    ;
    d.lh = function(a, b) {
        this.Ob();
        this.kl = b ? Bj(a) : a;
        return this
    }
    ;
    d.IG = function() {
        return !!this.kl
    }
    ;
    d.KR = function(a) {
        return (!this.Pf() && !a.Pf() || this.dd() == a.dd()) && (!this.Uk() && !a.Uk() || this.ke() == a.ke())
    }
    ;
    d.ae = function() {
        this.Ob();
        this.Da("zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ z()).toString(36));
        return this
    }
    ;
    d.xS = function(a) {
        this.Ob();
        this.b.remove(a);
        return this
    }
    ;
    d.OS = function(a) {
        this.sl = a;
        return this
    }
    ;
    d.bS = function() {
        return this.sl
    }
    ;
    d.Ob = function() {
        if (this.sl)
            throw Error("Tried to modify a read-only Uri");
    }
    ;
    d.fR = function(a) {
        this.Kc = a;
        this.b && this.b.Tp(a);
        return this
    }
    ;
    d.wA = function() {
        return this.Kc
    }
    ;
    function Dj(a, b) {
        return a instanceof uj ? a.clone() : new uj(a,b)
    }
    function Ej(a, b, c, e, f, g, k, l) {
        l = new uj(null,l);
        a && l.nh(a);
        b && l.oh(b);
        c && l.Cf(c);
        e && l.Df(e);
        f && l.mh(f);
        g && l.Ff(g);
        k && l.lh(k);
        return l
    }
    function Bj(a) {
        return a ? decodeURIComponent(a) : ""
    }
    function wj(a, b) {
        return v(a) ? encodeURI(a).replace(b, Fj) : null
    }
    function Fj(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }
    var xj = /[#\/\?@]/g
      , zj = /[\#\?:]/g
      , yj = /[\#\?]/g
      , Cj = /[\#\?@]/g
      , Aj = /#/g;
    function vj(a, b, c) {
        this.b = a || null;
        this.g = !!c
    }
    d = vj.prototype;
    d.$b = function() {
        if (!this.ta && (this.ta = new Nc,
        this.hb = 0,
        this.b))
            for (var a = this.b.split("&"), b = 0; b < a.length; b++) {
                var c = a[b].indexOf("=")
                  , e = null
                  , f = null;
                0 <= c ? (e = a[b].substring(0, c),
                f = a[b].substring(c + 1)) : e = a[b];
                e = Za(e);
                e = this.fd(e);
                this.add(e, f ? Za(f) : "")
            }
    }
    ;
    d.ta = null;
    d.hb = null;
    d.oa = function() {
        this.$b();
        return this.hb
    }
    ;
    d.add = function(a, b) {
        this.$b();
        this.pe();
        a = this.fd(a);
        var c = this.ta.get(a);
        c || this.ta.Jb(a, c = []);
        c.push(b);
        this.hb++;
        return this
    }
    ;
    d.remove = function(a) {
        this.$b();
        a = this.fd(a);
        return this.ta.bh(a) ? (this.pe(),
        this.hb -= this.ta.get(a).length,
        this.ta.remove(a)) : !1
    }
    ;
    d.clear = function() {
        this.pe();
        this.ta = null;
        this.hb = 0
    }
    ;
    d.Ta = function() {
        this.$b();
        return 0 == this.hb
    }
    ;
    d.Ur = function(a) {
        this.$b();
        a = this.fd(a);
        return this.ta.bh(a)
    }
    ;
    d.Rf = function(a) {
        var b = this.sa();
        return I(b, a)
    }
    ;
    d.Bb = function() {
        this.$b();
        for (var a = this.ta.sa(), b = this.ta.Bb(), c = [], e = 0; e < b.length; e++)
            for (var f = a[e], g = 0; g < f.length; g++)
                c.push(b[e]);
        return c
    }
    ;
    d.sa = function(a) {
        this.$b();
        var b = [];
        if (v(a))
            this.Ur(a) && (b = kc(b, this.ta.get(this.fd(a))));
        else {
            a = this.ta.sa();
            for (var c = 0; c < a.length; c++)
                b = kc(b, a[c])
        }
        return b
    }
    ;
    d.WA = function(a, b) {
        this.$b();
        this.pe();
        a = this.fd(a);
        this.Ur(a) && (this.hb -= this.ta.get(a).length);
        this.ta.Jb(a, [b]);
        this.hb++;
        return this
    }
    ;
    d.get = function(a, b) {
        var c = a ? this.sa(a) : [];
        return 0 < c.length ? String(c[0]) : b
    }
    ;
    d.to = function(a, b) {
        this.remove(a);
        0 < b.length && (this.pe(),
        this.ta.Jb(this.fd(a), lc(b)),
        this.hb += b.length)
    }
    ;
    d.toString = function() {
        if (this.b)
            return this.b;
        if (!this.ta)
            return "";
        for (var a = [], b = this.ta.Bb(), c = 0; c < b.length; c++)
            for (var e = b[c], f = encodeURIComponent(String(e)), e = this.sa(e), g = 0; g < e.length; g++) {
                var k = f;
                "" !== e[g] && (k += "=" + encodeURIComponent(String(e[g])));
                a.push(k)
            }
        return this.b = a.join("&")
    }
    ;
    d.tB = function() {
        return Bj(this.toString())
    }
    ;
    d.pe = function() {
        this.b = null
    }
    ;
    d.IP = function(a) {
        this.$b();
        Tc(this.ta, function(b, c) {
            I(a, c) || this.remove(c)
        }, this);
        return this
    }
    ;
    d.clone = function() {
        var a = new vj;
        a.b = this.b;
        this.ta && (a.ta = this.ta.clone(),
        a.hb = this.hb);
        return a
    }
    ;
    d.fd = function(a) {
        a = String(a);
        this.g && (a = a.toLowerCase());
        return a
    }
    ;
    d.Tp = function(a) {
        a && !this.g && (this.$b(),
        this.pe(),
        Tc(this.ta, function(a, c) {
            var e = c.toLowerCase();
            c != e && (this.remove(c),
            this.to(e, a))
        }, this));
        this.g = a
    }
    ;
    d.dR = function(a) {
        for (var b = 0; b < arguments.length; b++)
            Tc(arguments[b], function(a, b) {
                this.add(b, a)
            }, this)
    }
    ;
    function Gj(a) {
        this.g = a;
        this.b = {}
    }
    A(Gj, ad);
    var Hj = [];
    d = Gj.prototype;
    d.sc = function(a, b, c, e) {
        return this.Rs(a, b, c, e)
    }
    ;
    d.gS = function(a, b, c, e, f) {
        return this.Rs(a, b, c, e, f)
    }
    ;
    d.Rs = function(a, b, c, e, f) {
        t(b) || (Hj[0] = b,
        b = Hj);
        for (var g = 0; g < b.length; g++) {
            var k = Ed(a, b[g], c || this.handleEvent, e || !1, f || this.g || this);
            if (!k)
                break;
            this.b[k.key] = k
        }
        return this
    }
    ;
    d.oR = function(a, b, c, e) {
        return this.Aj(a, b, c, e)
    }
    ;
    d.fS = function(a, b, c, e, f) {
        return this.Aj(a, b, c, e, f)
    }
    ;
    d.Aj = function(a, b, c, e, f) {
        if (t(b))
            for (var g = 0; g < b.length; g++)
                this.Aj(a, b[g], c, e, f);
        else {
            a = Ld(a, b, c || this.handleEvent, e, f || this.g || this);
            if (!a)
                return this;
            this.b[a.key] = a
        }
        return this
    }
    ;
    d.hS = function(a, b, c, e) {
        return this.Qs(a, b, c, e)
    }
    ;
    d.iS = function(a, b, c, e, f) {
        return this.Qs(a, b, c, e, f)
    }
    ;
    d.Qs = function(a, b, c, e, f) {
        b.sc(a, c, e, f || this.g || this, this);
        return this
    }
    ;
    d.nR = function() {
        var a = 0, b;
        for (b in this.b)
            Object.prototype.hasOwnProperty.call(this.b, b) && a++;
        return a
    }
    ;
    d.dh = function(a, b, c, e, f) {
        if (t(b))
            for (var g = 0; g < b.length; g++)
                this.dh(a, b[g], c, e, f);
        else
            c = c || this.handleEvent,
            f = f || this.g || this,
            c = Fd(c),
            e = !!e,
            b = wd(a) ? a.Rx(b, c, e, f) : a ? (a = Hd(a)) ? a.wj(b, c, e, f) : null : null,
            b && (Nd(b),
            delete this.b[b.key]);
        return this
    }
    ;
    d.hT = function(a, b, c, e, f) {
        b.dh(a, c, e, f || this.g || this, this);
        return this
    }
    ;
    d.Oq = function() {
        rc(this.b, Nd);
        this.b = {}
    }
    ;
    d.T = function() {
        Gj.B.T.call(this);
        this.Oq()
    }
    ;
    d.handleEvent = function() {
        throw Error("EventHandler.handleEvent not implemented");
    }
    ;
    function Ij() {}
    Ij.prototype.b = null;
    Ij.prototype.j = function() {
        return this.b || (this.b = this.l())
    }
    ;
    var Jj;
    function Kj() {}
    A(Kj, Ij);
    Kj.prototype.g = function() {
        var a = this.h();
        return a ? new ActiveXObject(a) : new XMLHttpRequest
    }
    ;
    Kj.prototype.l = function() {
        var a = {};
        this.h() && (a[0] = !0,
        a[1] = !0);
        return a
    }
    ;
    Kj.prototype.h = function() {
        if (!this.k && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var a = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], b = 0; b < a.length; b++) {
                var c = a[b];
                try {
                    return new ActiveXObject(c),
                    this.k = c
                } catch (e) {}
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return this.k
    }
    ;
    Jj = new Kj;
    function Lj(a, b, c, e, f) {
        this.g = a;
        this.b = b;
        this.l = c;
        this.h = e;
        this.j = f || 1;
        this.Oa = 45E3;
        this.o = new Gj(this);
        this.k = new Sd;
        this.k.jg(250)
    }
    d = Lj.prototype;
    d.si = null;
    d.Db = !1;
    d.me = null;
    d.lk = null;
    d.pg = null;
    d.kf = null;
    d.Uc = null;
    d.eb = null;
    d.Ed = null;
    d.Ca = null;
    d.We = 0;
    d.Lb = null;
    d.Bd = null;
    d.fc = null;
    d.pm = -1;
    d.hm = !0;
    d.Xc = !1;
    d.ti = 0;
    d.lg = null;
    function Mj(a, b) {
        switch (a) {
        case 0:
            return "Non-200 return code (" + b + ")";
        case 1:
            return "XMLHTTP failure (no data)";
        case 2:
            return "HttpConnection timeout";
        default:
            return "Unknown error"
        }
    }
    var Nj = {}
      , Oj = {};
    d = Lj.prototype;
    d.ef = function(a) {
        this.si = a
    }
    ;
    d.setTimeout = function(a) {
        this.Oa = a
    }
    ;
    d.zy = function(a) {
        this.ti = a
    }
    ;
    d.Wo = function(a, b, c) {
        this.kf = 1;
        this.Uc = a.clone().ae();
        this.Ed = b;
        this.p = c;
        this.Ar(null)
    }
    ;
    d.Ui = function(a, b, c, e) {
        this.kf = 1;
        this.Uc = a.clone().ae();
        this.Ed = null;
        this.p = b;
        e && (this.hm = !1);
        this.Ar(c)
    }
    ;
    d.Ar = function(a) {
        this.pg = z();
        this.Ad();
        this.eb = this.Uc.clone();
        this.eb.Fd("t", this.j);
        this.We = 0;
        var b = this.g.rg();
        this.Ca = this.g.ri(b ? a : null);
        0 < this.ti && (this.lg = new Wd(x(this.mm, this, this.Ca),this.ti));
        this.o.sc(this.Ca, "readystatechange", this.eu);
        a = this.si ? Bc(this.si) : {};
        this.Ed ? (this.Bd = "POST",
        a["Content-Type"] = "application/x-www-form-urlencoded",
        this.Ca.send(this.eb, this.Bd, this.Ed, a)) : (this.Bd = "GET",
        this.hm && !Bb && (a.Connection = "close"),
        this.Ca.send(this.eb, this.Bd, null, a));
        this.g.j(1);
        this.b.fu(this.Bd, this.eb, this.h, this.j, this.Ed)
    }
    ;
    d.eu = function(a) {
        a = a.target;
        var b = this.lg;
        b && 3 == a.rc() ? (this.b.W("Throttling readystatechange."),
        b.Xo()) : this.mm(a)
    }
    ;
    d.mm = function(a) {
        try {
            a == this.Ca ? this.vA() : this.b.Te("Called back with an unexpected xmlhttp")
        } catch (b) {
            this.b.W("Failed call to OnXmlHttpReadyStateChanged_"),
            this.Ca && this.Ca.Hd() ? this.b.vc(b, "ResponseText: " + this.Ca.Hd()) : this.b.vc(b, "No response text")
        } finally {}
    }
    ;
    d.vA = function() {
        var a = this.Ca.rc()
          , b = this.Ca.Xt()
          , c = this.Ca.getStatus();
        if (F && !Rb(10) || Bb && !G("420+")) {
            if (4 > a)
                return
        } else if (3 > a || 3 == a && !zb && !this.Ca.Hd())
            return;
        this.Xc || 4 != a || 7 == b || (8 == b || 0 >= c ? this.g.j(3) : this.g.j(2));
        this.hg();
        this.pm = b = this.Ca.getStatus();
        (c = this.Ca.Hd()) || this.b.W("No response text for uri " + this.eb + " status " + b);
        this.Db = 200 == b;
        this.b.Zt(this.Bd, this.eb, this.h, this.j, a, b);
        this.Db ? (4 == a && this.wc(),
        this.p ? (this.om(a, c),
        zb && this.Db && 3 == a && this.Yt()) : (this.b.Xe(this.h, c, null),
        this.pi(c)),
        this.Db && !this.Xc && (4 == a ? this.g.Ve(this) : (this.Db = !1,
        this.Ad()))) : (400 == b && 0 < c.indexOf("Unknown SID") ? (this.fc = 3,
        X(13),
        this.b.Te("XMLHTTP Unknown SID (" + this.h + ")")) : (this.fc = 0,
        X(14),
        this.b.Te("XMLHTTP Bad status " + b + " (" + this.h + ")")),
        this.wc(),
        this.Se())
    }
    ;
    d.om = function(a, b) {
        for (var c = !0; !this.Xc && this.We < b.length; ) {
            var e = this.my(b);
            if (e == Oj) {
                4 == a && (this.fc = 4,
                X(15),
                c = !1);
                this.b.Xe(this.h, null, "[Incomplete Response]");
                break
            } else if (e == Nj) {
                this.fc = 4;
                X(16);
                this.b.Xe(this.h, b, "[Invalid Chunk]");
                c = !1;
                break
            } else
                this.b.Xe(this.h, e, null),
                this.pi(e)
        }
        4 == a && 0 == b.length && (this.fc = 1,
        X(17),
        c = !1);
        this.Db = this.Db && c;
        c || (this.b.Xe(this.h, b, "[Invalid Chunked Response]"),
        this.wc(),
        this.Se())
    }
    ;
    d.hF = function() {
        var a = this.Ca.rc()
          , b = this.Ca.Hd();
        this.We < b.length && (this.hg(),
        this.om(a, b),
        this.Db && 4 != a && this.Ad())
    }
    ;
    d.Yt = function() {
        this.o.sc(this.k, "tick", this.hF);
        this.k.yc()
    }
    ;
    d.uP = function() {
        this.Db && this.b.ec("Received browser offline event even though request completed successfully");
        this.b.FA(this.eb);
        this.wc();
        this.fc = 6;
        X(21);
        this.Se()
    }
    ;
    d.my = function(a) {
        var b = this.We
          , c = a.indexOf("\n", b);
        if (-1 == c)
            return Oj;
        b = a.substring(b, c);
        b = Number(b);
        if (isNaN(b))
            return Nj;
        c += 1;
        if (c + b > a.length)
            return Oj;
        a = a.substr(c, b);
        this.We = c + b;
        return a
    }
    ;
    d.Cn = function(a, b) {
        this.kf = 3;
        this.Uc = a.clone().ae();
        this.jI(b)
    }
    ;
    d.jI = function(a) {
        this.pg = z();
        this.Ad();
        var b = a ? window.location.hostname : "";
        this.eb = this.Uc.clone();
        this.eb.Da("DOMAIN", b);
        this.eb.Da("t", this.j);
        try {
            this.Lb = new ActiveXObject("htmlfile")
        } catch (c) {
            this.b.ec("ActiveX blocked");
            this.wc();
            this.fc = 7;
            X(22);
            this.Se();
            return
        }
        var e = "<html><body>";
        a && (e += '<script>document.domain="' + b + '"\x3c/script>');
        e += "</body></html>";
        this.Lb.open();
        this.Lb.write(e);
        this.Lb.close();
        this.Lb.parentWindow.m = x(this.Lu, this);
        this.Lb.parentWindow.d = x(this.Fm, this, !0);
        this.Lb.parentWindow.rpcClose = x(this.Fm, this, !1);
        a = this.Lb.createElement("div");
        this.Lb.parentWindow.document.body.appendChild(a);
        a.innerHTML = '<iframe src="' + this.eb + '"></iframe>';
        this.b.Mu("GET", this.eb, this.h, this.j);
        this.g.j(1)
    }
    ;
    d.Lu = function(a) {
        Pj(x(this.RJ, this, a), 0)
    }
    ;
    d.RJ = function(a) {
        this.Xc || (this.b.ny(this.h, a),
        this.hg(),
        this.pi(a),
        this.Ad())
    }
    ;
    d.Fm = function(a) {
        Pj(x(this.QJ, this, a), 0)
    }
    ;
    d.QJ = function(a) {
        this.Xc || (this.b.Su(this.h, a),
        this.wc(),
        this.Db = a,
        this.g.Ve(this),
        this.g.j(4))
    }
    ;
    d.Rw = function(a) {
        this.kf = 2;
        this.Uc = a.clone().ae();
        this.iI()
    }
    ;
    d.iI = function() {
        (new Image).src = this.Uc;
        this.pg = z();
        this.Ad()
    }
    ;
    d.cancel = function() {
        this.Xc = !0;
        this.wc()
    }
    ;
    d.Ad = function() {
        this.lk = z() + this.Oa;
        this.Op(this.Oa)
    }
    ;
    d.Op = function(a) {
        if (null != this.me)
            throw Error("WatchDog timer not null");
        this.me = Pj(x(this.HI, this), a)
    }
    ;
    d.hg = function() {
        this.me && (h.clearTimeout(this.me),
        this.me = null)
    }
    ;
    d.HI = function() {
        this.me = null;
        var a = z();
        0 <= a - this.lk ? this.MA() : (this.b.Te("WatchDog timer called too early"),
        this.Op(this.lk - a))
    }
    ;
    d.MA = function() {
        this.Db && this.b.ec("Received watchdog timeout even though request loaded successfully");
        this.b.sw(this.eb);
        2 != this.kf && this.g.j(3);
        this.wc();
        this.fc = 2;
        X(18);
        this.Se()
    }
    ;
    d.Se = function() {
        this.g.Lq() || this.Xc || this.g.Ve(this)
    }
    ;
    d.wc = function() {
        this.hg();
        bd(this.lg);
        this.lg = null;
        this.k.mb();
        this.o.Oq();
        if (this.Ca) {
            var a = this.Ca;
            this.Ca = null;
            a.abort();
            a.pb()
        }
        this.Lb && (this.Lb = null)
    }
    ;
    d.Fn = function() {
        return this.Db
    }
    ;
    d.Mg = function() {
        return this.fc
    }
    ;
    d.qg = function() {
        return this.pm
    }
    ;
    d.wR = function() {
        return this.l
    }
    ;
    d.uz = function() {
        return this.h
    }
    ;
    d.Si = function() {
        return this.Ed
    }
    ;
    d.$i = function() {
        return this.pg
    }
    ;
    d.pi = function(a) {
        try {
            this.g.Kn(this, a),
            this.g.j(4)
        } catch (b) {
            this.b.vc(b, "Error in httprequest callback")
        }
    }
    ;
    function Qj() {
        this.b = null
    }
    d = Qj.prototype;
    d.vR = function() {
        return null
    }
    ;
    d.FA = function(a) {
        this.info("BROWSER_OFFLINE: " + a)
    }
    ;
    d.fu = function(a, b, c, e, f) {
        this.info("XMLHTTP REQ (" + c + ") [attempt " + e + "]: " + a + "\n" + b + "\n" + this.OJ(f))
    }
    ;
    d.Zt = function(a, b, c, e, f, g) {
        this.info("XMLHTTP RESP (" + c + ") [ attempt " + e + "]: " + a + "\n" + b + "\n" + f + " " + g)
    }
    ;
    d.Xe = function(a, b, c) {
        this.info("XMLHTTP TEXT (" + a + "): " + this.Ts(b) + (c ? " " + c : ""))
    }
    ;
    d.Mu = function(a, b, c, e) {
        this.info("TRIDENT REQ (" + c + ") [ attempt " + e + "]: " + a + "\n" + b)
    }
    ;
    d.ny = function(a, b) {
        this.info("TRIDENT TEXT (" + a + "): " + this.Ts(b))
    }
    ;
    d.Su = function(a, b) {
        this.info("TRIDENT TEXT (" + a + "): " + b ? "success" : "failure")
    }
    ;
    d.sw = function(a) {
        this.info("TIMEOUT: " + a)
    }
    ;
    d.W = function(a) {
        this.info(a)
    }
    ;
    d.vc = function(a, b) {
        this.ec((b || "Exception") + a)
    }
    ;
    d.info = function() {}
    ;
    d.Te = function() {}
    ;
    d.ec = function() {}
    ;
    d.Ts = function(a) {
        if (!a || "y2f%" == a)
            return a;
        try {
            var b = Hf(a);
            if (b)
                for (var c = 0; c < b.length; c++)
                    t(b[c]) && this.gH(b[c]);
            return Ef(b)
        } catch (e) {
            return this.W("Exception parsing expected JS array - probably was not JS"),
            a
        }
    }
    ;
    d.gH = function(a) {
        if (!(2 > a.length || (a = a[1],
        !t(a) || 1 > a.length))) {
            var b = a[0];
            if ("noop" != b && "stop" != b)
                for (b = 1; b < a.length; b++)
                    a[b] = ""
        }
    }
    ;
    d.OJ = function(a) {
        if (!a)
            return null;
        var b = "";
        a = a.split("&");
        for (var c = 0; c < a.length; c++) {
            var e = a[c].split("=");
            if (1 < e.length)
                var f = e[0]
                  , e = e[1]
                  , g = f.split("_")
                  , b = 2 <= g.length && "type" == g[1] ? b + (f + "=" + e + "&") : b + (f + "=redacted&")
        }
        return b
    }
    ;
    function Rj(a, b, c, e, f) {
        (new Qj).W("TestLoadImageWithRetries: " + f);
        if (0 == e)
            c(!1);
        else {
            var g = f || 0;
            e--;
            Sj(a, b, function(f) {
                f ? c(!0) : h.setTimeout(function() {
                    Rj(a, b, c, e, g)
                }, g)
            })
        }
    }
    function Sj(a, b, c) {
        var e = new Qj;
        e.W("TestLoadImage: loading " + a);
        var f = new Image;
        f.onload = function() {
            try {
                e.W("TestLoadImage: loaded"),
                Tj(f),
                c(!0)
            } catch (a) {
                e.vc(a)
            }
        }
        ;
        f.onerror = function() {
            try {
                e.W("TestLoadImage: error"),
                Tj(f),
                c(!1)
            } catch (a) {
                e.vc(a)
            }
        }
        ;
        f.onabort = function() {
            try {
                e.W("TestLoadImage: abort"),
                Tj(f),
                c(!1)
            } catch (a) {
                e.vc(a)
            }
        }
        ;
        f.ontimeout = function() {
            try {
                e.W("TestLoadImage: timeout"),
                Tj(f),
                c(!1)
            } catch (a) {
                e.vc(a)
            }
        }
        ;
        h.setTimeout(function() {
            if (f.ontimeout)
                f.ontimeout()
        }, b);
        f.src = a
    }
    function Tj(a) {
        a.onload = null;
        a.onerror = null;
        a.onabort = null;
        a.ontimeout = null
    }
    ;function Uj(a, b) {
        this.b = a;
        this.g = b;
        this.h = new pj(null,!0)
    }
    d = Uj.prototype;
    d.mj = null;
    d.fb = null;
    d.Ag = !1;
    d.ro = null;
    d.zg = null;
    d.Bi = null;
    d.nj = null;
    d.qb = null;
    d.$e = -1;
    d.Ye = null;
    d.Re = null;
    d.zz = function(a) {
        this.mj = a
    }
    ;
    d.Az = function(a) {
        this.h = a
    }
    ;
    d.yz = function(a) {
        this.nj = a;
        a = this.b.mo(this.nj);
        X(3);
        this.ro = z();
        var b = this.b.Dx();
        null != b ? (this.Ye = this.b.oi(b[0]),
        (this.Re = b[1]) ? (this.qb = 1,
        this.io()) : (this.qb = 2,
        this.Vi())) : (a.Fd("MODE", "init"),
        this.fb = new Lj(this,this.g,void 0,void 0,void 0),
        this.fb.ef(this.mj),
        this.fb.Ui(a, !1, null, !0),
        this.qb = 0)
    }
    ;
    d.io = function() {
        var a = this.b.Mj(this.Re, "/mail/images/cleardot.gif");
        a.ae();
        Rj(a.toString(), 5E3, x(this.Sy, this), 3, 2E3);
        this.j(1)
    }
    ;
    d.Sy = function(a) {
        a ? (this.qb = 2,
        this.Vi()) : (X(4),
        this.b.Ty(this));
        a && this.j(2)
    }
    ;
    d.Vi = function() {
        this.g.W("TestConnection: starting stage 2");
        var a = this.b.zx();
        null != a ? (this.g.W("TestConnection: skipping stage 2, precomputed result is " + a ? "Buffered" : "Unbuffered"),
        X(5),
        a ? (X(11),
        this.b.Ze(this, !1)) : (X(12),
        this.b.Ze(this, !0))) : (this.fb = new Lj(this,this.g,void 0,void 0,void 0),
        this.fb.ef(this.mj),
        a = this.b.Nn(this.Ye, this.nj),
        X(5),
        !F || Rb(10) ? (a.Fd("TYPE", "xmlhttp"),
        this.fb.Ui(a, !1, this.Ye, !1)) : (a.Fd("TYPE", "html"),
        this.fb.Cn(a, Boolean(this.Ye))))
    }
    ;
    d.ri = function(a) {
        return this.b.ri(a)
    }
    ;
    d.abort = function() {
        this.fb && (this.fb.cancel(),
        this.fb = null);
        this.$e = -1
    }
    ;
    d.Lq = function() {
        return !1
    }
    ;
    d.Kn = function(a, b) {
        this.$e = a.qg();
        if (0 == this.qb)
            if (this.g.W("TestConnection: Got data for stage 1"),
            b) {
                try {
                    var c = this.h.parse(b)
                } catch (e) {
                    this.g.vc(e);
                    this.b.Ci(this, 4);
                    return
                }
                this.Ye = this.b.oi(c[0]);
                this.Re = c[1]
            } else
                this.g.W("TestConnection: Null responseText"),
                this.b.Ci(this, 4);
        else
            2 == this.qb && (this.Ag ? (X(7),
            this.Bi = z()) : "11111" == b ? (X(6),
            this.Ag = !0,
            this.zg = z(),
            this.k() && (this.$e = 200,
            this.fb.cancel(),
            this.g.W("Test connection succeeded; using streaming connection"),
            X(12),
            this.b.Ze(this, !0))) : (X(8),
            this.zg = this.Bi = z(),
            this.Ag = !1))
    }
    ;
    d.Ve = function() {
        this.$e = this.fb.qg();
        if (!this.fb.Fn())
            this.g.W("TestConnection: request failed, in state " + this.qb),
            0 == this.qb ? X(9) : 2 == this.qb && X(10),
            this.b.Ci(this, this.fb.Mg());
        else if (0 == this.qb)
            this.g.W("TestConnection: request complete for initial check"),
            this.Re ? (this.qb = 1,
            this.io()) : (this.qb = 2,
            this.Vi());
        else if (2 == this.qb) {
            this.g.W("TestConnection: request complete for stage 2");
            var a = !1;
            (a = !F || Rb(10) ? this.Ag : 200 > this.Bi - this.zg ? !1 : !0) ? (this.g.W("Test connection succeeded; using streaming connection"),
            X(12),
            this.b.Ze(this, !0)) : (this.g.W("Test connection failed; not using streaming"),
            X(11),
            this.b.Ze(this, !1))
        }
    }
    ;
    d.ek = function() {
        return this.$e
    }
    ;
    d.rg = function() {
        return this.b.rg()
    }
    ;
    Uj.prototype.isActive = function() {
        return this.b.isActive()
    }
    ;
    Uj.prototype.k = function() {
        var a = this.zg - this.ro;
        return !F || Rb(10) || 500 > a
    }
    ;
    Uj.prototype.j = function(a) {
        this.b.j(a)
    }
    ;
    function Vj(a) {
        Rd.call(this);
        this.headers = new Nc;
        this.H = a || null;
        this.h = !1;
        this.K = this.b = null;
        this.X = this.p = "";
        this.o = 0;
        this.j = "";
        this.k = this.R = this.D = this.O = !1;
        this.l = 0;
        this.A = null;
        this.w = "";
        this.F = this.U = !1
    }
    A(Vj, Rd);
    Vj.prototype.$ = null;
    var Wj = /^https?$/i
      , Xj = ["POST", "PUT"]
      , Yj = [];
    d = Vj.prototype;
    d.wP = function() {
        this.pb();
        jc(Yj, this)
    }
    ;
    d.$Q = function() {
        return this.l
    }
    ;
    d.VS = function(a) {
        this.l = Math.max(0, a)
    }
    ;
    d.PS = function(a) {
        this.w = a
    }
    ;
    d.SQ = function() {
        return this.w
    }
    ;
    d.TI = function(a) {
        this.U = a
    }
    ;
    d.cR = function() {
        return this.U
    }
    ;
    d.send = function(a, b, c, e) {
        if (this.b)
            throw Error("[goog.net.XhrIo] Object is active with another request=" + this.p + "; newUri=" + a);
        b = b ? b.toUpperCase() : "GET";
        this.p = a;
        this.j = "";
        this.o = 0;
        this.X = b;
        this.O = !1;
        this.h = !0;
        this.b = this.Jt();
        this.K = this.H ? this.H.j() : Jj.j();
        this.b.onreadystatechange = x(this.Yl, this);
        try {
            sj(null, this.cc("Opening Xhr")),
            this.R = !0,
            this.b.open(b, String(a), !0),
            this.R = !1
        } catch (f) {
            sj(null, this.cc("Error opening Xhr: " + f.message));
            this.$l(5, f);
            return
        }
        a = c || "";
        var g = this.headers.clone();
        e && Tc(e, function(a, b) {
            g.Jb(b, a)
        });
        e = ic(g.Bb(), Zj);
        c = h.FormData && a instanceof h.FormData;
        !I(Xj, b) || e || c || g.Jb("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        Tc(g, function(a, b) {
            this.b.setRequestHeader(b, a)
        }, this);
        this.w && (this.b.responseType = this.w);
        "withCredentials"in this.b && (this.b.withCredentials = this.U);
        try {
            this.Zl(),
            0 < this.l && (this.F = ak(this.b),
            sj(null, this.cc("Will abort after " + this.l + "ms if incomplete, xhr2 " + this.F)),
            this.F ? (this.b.timeout = this.l,
            this.b.ontimeout = x(this.Oa, this)) : this.A = Td(this.Oa, this.l, this)),
            sj(null, this.cc("Sending request")),
            this.D = !0,
            this.b.send(a),
            this.D = !1
        } catch (k) {
            sj(null, this.cc("Send error: " + k.message)),
            this.$l(5, k)
        }
    }
    ;
    function ak(a) {
        return F && G(9) && fa(a.timeout) && s(a.ontimeout)
    }
    function Zj(a) {
        return "content-type" == a.toLowerCase()
    }
    d.Jt = function() {
        return this.H ? this.H.g() : Jj.g()
    }
    ;
    d.Oa = function() {
        "undefined" != typeof aa && this.b && (this.j = "Timed out after " + this.l + "ms, aborting",
        this.o = 8,
        this.cc(this.j),
        this.dispatchEvent("timeout"),
        this.abort(8))
    }
    ;
    d.$l = function(a, b) {
        this.h = !1;
        this.b && (this.k = !0,
        this.b.abort(),
        this.k = !1);
        this.j = b;
        this.o = a;
        this.an();
        this.xg()
    }
    ;
    d.an = function() {
        this.O || (this.O = !0,
        this.dispatchEvent("complete"),
        this.dispatchEvent("error"))
    }
    ;
    d.abort = function(a) {
        this.b && this.h && (this.cc("Aborting"),
        this.h = !1,
        this.k = !0,
        this.b.abort(),
        this.k = !1,
        this.o = a || 7,
        this.dispatchEvent("complete"),
        this.dispatchEvent("abort"),
        this.xg())
    }
    ;
    d.T = function() {
        this.b && (this.h && (this.h = !1,
        this.k = !0,
        this.b.abort(),
        this.k = !1),
        this.xg(!0));
        Vj.B.T.call(this)
    }
    ;
    d.Yl = function() {
        this.Og() || (this.R || this.D || this.k ? this.jr() : this.oF())
    }
    ;
    d.oF = function() {
        this.jr()
    }
    ;
    d.jr = function() {
        if (this.h && "undefined" != typeof aa)
            if (this.K[1] && 4 == this.rc() && 2 == this.getStatus())
                this.cc("Local request error detected and ignored");
            else if (this.D && 4 == this.rc())
                Td(this.Yl, 0, this);
            else if (this.dispatchEvent("readystatechange"),
            this.Ti()) {
                this.cc("Request complete");
                this.h = !1;
                try {
                    this.Oz() ? (this.dispatchEvent("complete"),
                    this.dispatchEvent("success")) : (this.o = 6,
                    this.j = this.Nz() + " [" + this.getStatus() + "]",
                    this.an())
                } finally {
                    this.xg()
                }
            }
    }
    ;
    d.xg = function(a) {
        if (this.b) {
            this.Zl();
            var b = this.b
              , c = this.K[0] ? q : null;
            this.K = this.b = null;
            a || this.dispatchEvent("ready");
            try {
                b.onreadystatechange = c
            } catch (e) {}
        }
    }
    ;
    d.Zl = function() {
        this.b && this.F && (this.b.ontimeout = null);
        fa(this.A) && (h.clearTimeout(this.A),
        this.A = null)
    }
    ;
    Vj.prototype.isActive = function() {
        return !!this.b
    }
    ;
    d = Vj.prototype;
    d.Ti = function() {
        return 4 == this.rc()
    }
    ;
    d.Oz = function() {
        var a = this.getStatus(), b;
        t: switch (a) {
        case 200:
        case 201:
        case 202:
        case 204:
        case 206:
        case 304:
        case 1223:
            b = !0;
            break t;
        default:
            b = !1
        }
        return b || 0 === a && !this.KJ()
    }
    ;
    d.KJ = function() {
        var a;
        a = Vb(String(this.p))[1] || null;
        !a && self.location && (a = self.location.protocol,
        a = a.substr(0, a.length - 1));
        a = a ? a.toLowerCase() : "";
        return Wj.test(a)
    }
    ;
    d.rc = function() {
        return this.b ? this.b.readyState : 0
    }
    ;
    d.getStatus = function() {
        try {
            return 2 < this.rc() ? this.b.status : -1
        } catch (a) {
            return -1
        }
    }
    ;
    d.Nz = function() {
        try {
            return 2 < this.rc() ? this.b.statusText : ""
        } catch (a) {
            return ""
        }
    }
    ;
    d.vQ = function() {
        return String(this.p)
    }
    ;
    d.Hd = function() {
        try {
            return this.b ? this.b.responseText : ""
        } catch (a) {
            return ""
        }
    }
    ;
    d.QQ = function() {
        try {
            if (this.b && "responseBody"in this.b)
                return this.b.responseBody
        } catch (a) {}
        return null
    }
    ;
    d.yI = function() {
        try {
            return this.b ? this.b.responseXML : null
        } catch (a) {
            return null
        }
    }
    ;
    d.xI = function(a) {
        if (this.b) {
            var b = this.b.responseText;
            a && 0 == b.indexOf(a) && (b = b.substring(a.length));
            return Gf(b)
        }
    }
    ;
    d.PQ = function() {
        try {
            if (!this.b)
                return null;
            if ("response"in this.b)
                return this.b.response;
            switch (this.w) {
            case "":
            case "text":
                return this.b.responseText;
            case "arraybuffer":
                if ("mozResponseArrayBuffer"in this.b)
                    return this.b.mozResponseArrayBuffer
            }
            return null
        } catch (a) {
            return null
        }
    }
    ;
    d.getResponseHeader = function(a) {
        return this.b && this.Ti() ? this.b.getResponseHeader(a) : void 0
    }
    ;
    d.GJ = function() {
        return this.b && this.Ti() ? this.b.getAllResponseHeaders() : ""
    }
    ;
    d.RQ = function() {
        for (var a = {}, b = this.GJ().split("\r\n"), c = 0; c < b.length; c++)
            if (!/^[\s\xa0]*$/.test(b[c])) {
                var e;
                e = 2;
                for (var f = b[c].split(": "), g = []; 0 < e && f.length; )
                    g.push(f.shift()),
                    e--;
                f.length && g.push(f.join(": "));
                e = g;
                a[e[0]] = a[e[0]] ? a[e[0]] + (", " + e[1]) : e[1]
            }
        return a
    }
    ;
    d.Xt = function() {
        return this.o
    }
    ;
    d.Mg = function() {
        return v(this.j) ? this.j : String(this.j)
    }
    ;
    d.cc = function(a) {
        return a + " [" + this.X + " " + this.p + " " + this.getStatus() + "]"
    }
    ;
    function bk(a, b, c) {
        this.w = a || null;
        this.g = 1;
        this.h = [];
        this.k = [];
        this.b = new Qj;
        this.o = new pj(null,!0);
        this.A = b || null;
        this.D = null != c ? c : null
    }
    function ck(a, b, c) {
        this.b = a;
        this.map = b;
        this.context = c || null
    }
    d = bk.prototype;
    d.Yd = null;
    d.Gf = null;
    d.Ja = null;
    d.za = null;
    d.ej = null;
    d.Qg = null;
    d.wn = null;
    d.Jg = null;
    d.Wk = !0;
    d.rf = 0;
    d.fw = 0;
    d.Jp = !1;
    d.qa = null;
    d.Mb = null;
    d.kc = null;
    d.gd = null;
    d.Hc = null;
    d.Jj = null;
    d.gk = !0;
    d.lf = -1;
    d.Ip = -1;
    d.hc = -1;
    d.Dc = 0;
    d.Ud = 0;
    d.Lp = 5E3;
    d.Mp = 1E4;
    d.Fs = 2;
    d.Uj = 2E4;
    d.Vo = 0;
    d.Qh = !1;
    d.Tc = 8;
    var dk = new Rd;
    function ek(a, b) {
        nd.call(this, "statevent", a);
        this.b = b
    }
    A(ek, nd);
    function fk(a, b, c, e) {
        nd.call(this, "timingevent", a);
        this.b = b;
        this.j = c;
        this.h = e
    }
    A(fk, nd);
    function gk(a, b) {
        nd.call(this, "serverreachability", a);
        this.b = b
    }
    A(gk, nd);
    d = bk.prototype;
    d.ZP = function() {
        return this.b
    }
    ;
    d.ES = function(a) {
        null != a && (this.b = a)
    }
    ;
    d.wi = function(a, b, c, e, f) {
        this.b.W("connect()");
        X(0);
        this.ej = b;
        this.Gf = c || {};
        e && s(f) && (this.Gf.OSID = e,
        this.Gf.OAID = f);
        this.GA(a)
    }
    ;
    d.Un = function() {
        this.b.W("disconnect()");
        this.Sn();
        if (3 == this.g) {
            var a = this.rf++
              , b = this.Qg.clone();
            b.Da("SID", this.l);
            b.Da("RID", a);
            b.Da("TYPE", "terminate");
            this.jf(b);
            (new Lj(this,this.b,this.l,a,void 0)).Rw(b)
        }
        this.Tn()
    }
    ;
    d.wm = function() {
        return this.l
    }
    ;
    d.GA = function(a) {
        this.b.W("connectTest_()");
        this.qi() && (this.Hc = new Uj(this,this.b),
        this.Hc.zz(this.Yd),
        this.Hc.Az(this.o),
        this.Hc.yz(a))
    }
    ;
    d.AA = function() {
        this.b.W("connectChannel_()");
        this.EA(1, 0);
        this.Qg = this.mo(this.ej);
        this.Ai()
    }
    ;
    d.Sn = function() {
        this.Hc && (this.Hc.abort(),
        this.Hc = null);
        this.za && (this.za.cancel(),
        this.za = null);
        this.kc && (h.clearTimeout(this.kc),
        this.kc = null);
        this.Hg();
        this.Ja && (this.Ja.cancel(),
        this.Ja = null);
        this.Mb && (h.clearTimeout(this.Mb),
        this.Mb = null)
    }
    ;
    d.lB = function() {
        return this.Yd
    }
    ;
    d.mB = function(a) {
        this.Yd = a
    }
    ;
    d.uR = function(a) {
        this.Vo = a
    }
    ;
    d.SS = function(a) {
        this.Qh = a
    }
    ;
    d.oQ = function() {
        return this.qa
    }
    ;
    d.xm = function(a) {
        this.qa = a
    }
    ;
    d.TP = function() {
        return this.Wk
    }
    ;
    d.DS = function(a) {
        this.Wk = a
    }
    ;
    d.Up = function() {
        return !this.Jj
    }
    ;
    d.SP = function() {
        return this.gk
    }
    ;
    d.CS = function(a) {
        this.gk = a
    }
    ;
    d.en = function(a, b) {
        if (0 == this.g)
            throw Error("Invalid operation: sending map when state is closed");
        1E3 == this.h.length && this.b.ec("Already have 1000 queued maps upon queueing " + Ef(a));
        this.h.push(new ck(this.fw++,a,b));
        2 != this.g && 3 != this.g || this.Ai()
    }
    ;
    d.GS = function(a) {
        this.Jp = a;
        this.b.info("setFailFast: " + a);
        (this.Ja || this.Mb) && this.Dc > this.qj() && (this.b.info("Retry count " + this.Dc + " > new maxRetries " + this.qj() + ". Fail immediately!"),
        this.Ja ? (this.Ja.cancel(),
        this.Ve(this.Ja)) : (h.clearTimeout(this.Mb),
        this.Mb = null,
        this.tb(2)))
    }
    ;
    d.qj = function() {
        return this.Jp ? 0 : this.Fs
    }
    ;
    d.IS = function(a) {
        this.Fs = a
    }
    ;
    d.JS = function(a) {
        this.Uj = a
    }
    ;
    d.Mz = function() {
        return 3
    }
    ;
    d.Lq = function() {
        return 0 == this.g
    }
    ;
    d.Gd = function() {
        return this.g
    }
    ;
    d.zo = function() {
        return this.hc
    }
    ;
    d.vm = function() {
        return this.lf
    }
    ;
    d.sm = function() {
        return 0 != this.SJ()
    }
    ;
    d.tR = function(a) {
        this.o = a
    }
    ;
    d.SJ = function() {
        var a = 0;
        this.za && a++;
        this.Ja && a++;
        return a
    }
    ;
    d.Ai = function() {
        this.Ja || this.Mb || (this.Mb = Pj(x(this.qo, this), 0),
        this.Dc = 0)
    }
    ;
    d.Dw = function(a) {
        if (this.Ja || this.Mb)
            return this.b.ec("Request already in progress"),
            !1;
        if (1 == this.g || this.Dc >= this.qj())
            return !1;
        this.b.W("Going to retry POST");
        this.Mb = Pj(x(this.qo, this, a), this.Vn(this.Dc));
        this.Dc++;
        return !0
    }
    ;
    d.qo = function(a) {
        this.Mb = null;
        this.ho(a)
    }
    ;
    d.ho = function(a) {
        this.b.W("startForwardChannel_");
        if (this.qi())
            if (1 == this.g)
                a ? this.b.ec("Not supposed to retry the open") : (this.ew(),
                this.g = 2);
            else if (3 == this.g)
                if (a)
                    this.on(a);
                else
                    0 == this.h.length ? this.b.W("startForwardChannel_ returned: nothing to send") : this.Ja ? this.b.ec("startForwardChannel_ returned: connection already in progress") : (this.on(),
                    this.b.W("startForwardChannel_ finished, sent request"))
    }
    ;
    d.ew = function() {
        this.b.W("open_()");
        this.rf = Math.floor(1E5 * Math.random());
        var a = this.rf++
          , b = new Lj(this,this.b,"",a,void 0);
        b.ef(this.Yd);
        var c = this.Lj()
          , e = this.Qg.clone();
        e.Da("RID", a);
        this.w && e.Da("CVER", this.w);
        this.jf(e);
        b.Wo(e, c, !0);
        this.Ja = b
    }
    ;
    d.on = function(a) {
        var b;
        a ? 6 < this.Tc ? (this.vz(),
        b = this.rf - 1,
        a = this.Lj()) : (b = a.uz(),
        a = a.Si()) : (b = this.rf++,
        a = this.Lj());
        var c = this.Qg.clone();
        c.Da("SID", this.l);
        c.Da("RID", b);
        c.Da("AID", this.lf);
        this.jf(c);
        b = new Lj(this,this.b,this.l,b,this.Dc + 1);
        b.ef(this.Yd);
        b.setTimeout(Math.round(0.5 * this.Uj) + Math.round(0.5 * this.Uj * Math.random()));
        this.Ja = b;
        b.Wo(c, a, !0)
    }
    ;
    d.jf = function(a) {
        if (this.qa) {
            var b = this.qa.hs(this);
            b && Tc(b, function(b, e) {
                a.Da(e, b)
            })
        }
    }
    ;
    d.Lj = function() {
        var a = Math.min(this.h.length, 1E3), b = ["count=" + a], c;
        6 < this.Tc && 0 < a ? (c = this.h[0].b,
        b.push("ofs=" + c)) : c = 0;
        for (var e = 0; e < a; e++) {
            var f = this.h[e].b
              , g = this.h[e].map
              , f = 6 >= this.Tc ? e : f - c;
            try {
                Tc(g, function(a, c) {
                    b.push("req" + f + "_" + c + "=" + encodeURIComponent(a))
                })
            } catch (k) {
                b.push("req" + f + "_type=" + encodeURIComponent("_badmap")),
                this.qa && this.qa.F(this, g)
            }
        }
        this.k = this.k.concat(this.h.splice(0, a));
        return b.join("&")
    }
    ;
    d.vz = function() {
        this.h = this.k.concat(this.h);
        this.k.length = 0
    }
    ;
    d.kn = function() {
        this.za || this.kc || (this.p = 1,
        this.kc = Pj(x(this.sp, this), 0),
        this.Ud = 0)
    }
    ;
    d.Yi = function() {
        if (this.za || this.kc)
            return this.b.ec("Request already in progress"),
            !1;
        if (this.Ud >= this.Mz())
            return !1;
        this.b.W("Going to retry GET");
        this.p++;
        this.kc = Pj(x(this.sp, this), this.Vn(this.Ud));
        this.Ud++;
        return !0
    }
    ;
    d.sp = function() {
        this.kc = null;
        this.AI()
    }
    ;
    d.AI = function() {
        if (this.qi()) {
            this.b.W("Creating new HttpRequest");
            this.za = new Lj(this,this.b,this.l,"rpc",this.p);
            this.za.ef(this.Yd);
            this.za.zy(this.Vo);
            var a = this.wn.clone();
            a.Da("RID", "rpc");
            a.Da("SID", this.l);
            a.Da("CI", this.Jj ? "0" : "1");
            a.Da("AID", this.lf);
            this.jf(a);
            !F || Rb(10) ? (a.Da("TYPE", "xmlhttp"),
            this.za.Ui(a, !0, this.Jg, !1)) : (a.Da("TYPE", "html"),
            this.za.Cn(a, Boolean(this.Jg)));
            this.b.W("New Request created")
        }
    }
    ;
    d.qi = function() {
        if (this.qa) {
            var a = this.qa.yA(this);
            if (0 != a)
                return this.b.W("Handler returned error code from okToMakeRequest"),
                this.tb(a),
                !1
        }
        return !0
    }
    ;
    d.Ze = function(a, b) {
        this.b.W("Test Connection Finished");
        this.Jj = this.gk && b;
        this.hc = a.ek();
        this.AA()
    }
    ;
    d.Ci = function(a) {
        this.b.W("Test Connection Failed");
        this.hc = a.ek();
        this.tb(2)
    }
    ;
    d.Ty = function() {
        this.b.W("Test Connection Blocked");
        this.hc = this.Hc.ek();
        this.tb(9)
    }
    ;
    d.Kn = function(a, b) {
        if (0 != this.g && (this.za == a || this.Ja == a))
            if (this.hc = a.qg(),
            this.Ja == a && 3 == this.g)
                if (7 < this.Tc) {
                    var c;
                    try {
                        c = this.o.parse(b)
                    } catch (e) {
                        c = null
                    }
                    t(c) && 3 == c.length ? this.Pw(c) : (this.b.W("Bad POST response data returned"),
                    this.tb(11))
                } else
                    "y2f%" != b && (this.b.W("Bad data returned - missing/invald magic cookie"),
                    this.tb(11));
            else
                this.za == a && this.Hg(),
                /^[\s\xa0]*$/.test(b) || (c = this.o.parse(b),
                t(c),
                this.Qw(c))
    }
    ;
    d.Pw = function(a) {
        if (0 == a[0])
            this.BA();
        else {
            this.Ip = a[1];
            var b = this.Ip - this.lf;
            0 < b && (a = a[2],
            this.b.W(a + " bytes (in " + b + " arrays) are outstanding on the BackChannel"),
            this.DA(a) && !this.gd && (this.gd = Pj(x(this.CA, this), 6E3)))
        }
    }
    ;
    d.BA = function() {
        this.b.W("Server claims our backchannel is missing.");
        if (this.kc)
            this.b.W("But we are currently starting the request.");
        else {
            if (this.za)
                if (this.za.$i() + 3E3 < this.Ja.$i())
                    this.Hg(),
                    this.za.cancel(),
                    this.za = null;
                else
                    return;
            else
                this.b.Te("We do not have a BackChannel established");
            this.Yi();
            X(19)
        }
    }
    ;
    d.DA = function(a) {
        return 37500 > a && !this.Up() && 0 == this.Ud
    }
    ;
    d.oi = function(a) {
        return this.Wk ? this.qa ? this.qa.K(a) : a : null
    }
    ;
    d.CA = function() {
        null != this.gd && (this.gd = null,
        this.za.cancel(),
        this.za = null,
        this.Yi(),
        X(20))
    }
    ;
    d.Hg = function() {
        null != this.gd && (h.clearTimeout(this.gd),
        this.gd = null)
    }
    ;
    d.Ve = function(a) {
        this.b.W("Request complete");
        var b;
        if (this.za == a)
            this.Hg(),
            this.za = null,
            b = 2;
        else if (this.Ja == a)
            this.Ja = null,
            b = 1;
        else
            return;
        this.hc = a.qg();
        if (0 != this.g)
            if (a.Fn())
                1 == b ? (b = a.Si() ? a.Si().length : 0,
                a = z() - a.$i(),
                dk.dispatchEvent(new fk(dk,b,a,this.Dc)),
                this.Ai(),
                this.Ew(),
                this.k.length = 0) : this.kn();
            else {
                var c = a.Mg();
                if (3 == c || 7 == c || 0 == c && 0 < this.hc)
                    this.b.W("Not retrying due to error type");
                else {
                    this.b.W("Maybe retrying, last error: " + Mj(c, this.hc));
                    if (1 == b && this.Dw(a) || 2 == b && this.Yi())
                        return;
                    this.b.W("Exceeded max number of retries")
                }
                this.b.W("Error: HTTP request failed");
                switch (c) {
                case 1:
                    this.tb(5);
                    break;
                case 4:
                    this.tb(10);
                    break;
                case 3:
                    this.tb(6);
                    break;
                case 7:
                    this.tb(12);
                    break;
                default:
                    this.tb(2)
                }
            }
    }
    ;
    d.Vn = function(a) {
        var b = this.Lp + Math.floor(Math.random() * this.Mp);
        this.isActive() || (this.b.W("Inactive channel"),
        b *= 2);
        return b * a
    }
    ;
    d.QS = function(a, b) {
        this.Lp = a;
        this.Mp = b
    }
    ;
    d.Qw = function(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            this.lf = c[0];
            c = c[1];
            2 == this.g ? "c" == c[0] ? (this.l = c[1],
            this.Jg = this.oi(c[2]),
            c = c[3],
            null != c ? this.Tc = c : this.Tc = 6,
            this.g = 3,
            this.qa && this.qa.gq(this),
            this.wn = this.Nn(this.Jg, this.ej),
            this.kn()) : "stop" == c[0] && this.tb(7) : 3 == this.g && ("stop" == c[0] ? this.tb(7) : "noop" != c[0] && this.qa && this.qa.fq(this, c),
            this.Ud = 0)
        }
    }
    ;
    d.EA = function(a) {
        if (!I(arguments, this.g))
            throw Error("Unexpected channel state: " + this.g);
    }
    ;
    d.tb = function(a) {
        this.b.info("Error code " + a);
        if (2 == a || 9 == a) {
            var b = null;
            this.qa && (b = this.qa.IA(this));
            var c = x(this.JA, this);
            b || (b = new uj("//www.google.com/images/cleardot.gif"),
            b.ae());
            Sj(b.toString(), 1E4, c)
        } else
            X(2);
        this.Qp(a)
    }
    ;
    d.JA = function(a) {
        a ? (this.b.info("Successfully pinged google.com"),
        X(2)) : (this.b.info("Failed to ping google.com"),
        X(1),
        this.Qp(8))
    }
    ;
    d.Ew = function() {
        this.qa && this.qa.FF(this, this.k)
    }
    ;
    d.Qp = function(a) {
        this.b.W("HttpChannel: error - " + a);
        this.g = 0;
        this.qa && this.qa.so(this, a);
        this.Tn();
        this.Sn()
    }
    ;
    d.Tn = function() {
        this.g = 0;
        this.hc = -1;
        if (this.qa)
            if (0 == this.k.length && 0 == this.h.length)
                this.qa.Ki(this);
            else {
                this.b.W("Number of undelivered maps, pending: " + this.k.length + ", outgoing: " + this.h.length);
                var a = lc(this.k)
                  , b = lc(this.h);
                this.k.length = 0;
                this.h.length = 0;
                this.qa.Ki(this, a, b)
            }
    }
    ;
    d.mo = function(a) {
        a = this.Mj(null, a);
        this.b.W("GetForwardChannelUri: " + a);
        return a
    }
    ;
    d.Dx = function() {
        return this.A
    }
    ;
    d.zx = function() {
        return this.D
    }
    ;
    d.Nn = function(a, b) {
        var c = this.Mj(this.rg() ? a : null, b);
        this.b.W("GetBackChannelUri: " + c);
        return c
    }
    ;
    d.Mj = function(a, b, c) {
        var e = Dj(b);
        if ("" != e.dd())
            a && e.Cf(a + "." + e.dd()),
            e.Df(c || e.ke());
        else
            var f = window.location
              , e = Ej(f.protocol, null, a ? a + "." + f.hostname : f.hostname, c || f.port, b);
        this.Gf && Tc(this.Gf, function(a, b) {
            e.Da(b, a)
        });
        e.Da("VER", this.Tc);
        this.jf(e);
        return e
    }
    ;
    d.ri = function(a) {
        if (a && !this.Qh)
            throw Error("Can't create secondary domain capable XhrIo object.");
        a = new Vj;
        a.TI(this.Qh);
        return a
    }
    ;
    bk.prototype.isActive = function() {
        return !!this.qa && this.qa.isActive(this)
    }
    ;
    function Pj(a, b) {
        if (!w(a))
            throw Error("Fn must not be null and must be a function");
        return h.setTimeout(function() {
            a()
        }, b)
    }
    bk.prototype.j = function(a) {
        dk.dispatchEvent(new gk(dk,a))
    }
    ;
    function X(a) {
        dk.dispatchEvent(new ek(dk,a))
    }
    bk.prototype.rg = function() {
        return this.Qh || !(!F || Rb(10))
    }
    ;
    new tj(1E3);
    new oj;
    function hk() {}
    d = hk.prototype;
    d.vP = null;
    d.yA = function() {
        return 0
    }
    ;
    d.gq = function() {}
    ;
    d.fq = function() {}
    ;
    d.FF = function() {}
    ;
    d.so = function() {}
    ;
    d.Ki = function() {}
    ;
    d.hs = function() {
        return {}
    }
    ;
    d.IA = function() {
        return null
    }
    ;
    hk.prototype.isActive = function() {
        return !0
    }
    ;
    hk.prototype.F = function() {}
    ;
    hk.prototype.K = function(a) {
        return a
    }
    ;
    function ik(a, b) {
        this.b = a;
        this.params = b || null
    }
    ;function jk() {
        this.b = [];
        this.g = {}
    }
    A(jk, ad);
    d = jk.prototype;
    d.Fo = 1;
    d.Ig = 0;
    d.dr = function(a, b, c) {
        var e = this.g[a];
        e || (e = this.g[a] = []);
        var f = this.Fo;
        this.b[f] = a;
        this.b[f + 1] = b;
        this.b[f + 2] = c;
        this.Fo = f + 3;
        e.push(f);
        return f
    }
    ;
    d.cT = function(a, b, c) {
        var e = this.dr(a, function(a) {
            b.apply(c, arguments);
            this.Td(e)
        }, this);
        return e
    }
    ;
    d.SE = function(a, b, c) {
        if (a = this.g[a]) {
            var e = this.b;
            if (a = ic(a, function(a) {
                return e[a + 1] == b && e[a + 2] == c
            }))
                return this.Td(a)
        }
        return !1
    }
    ;
    d.Td = function(a) {
        if (0 != this.Ig)
            return this.h || (this.h = []),
            this.h.push(a),
            !1;
        var b = this.b[a];
        if (b) {
            var c = this.g[b];
            c && jc(c, a);
            delete this.b[a];
            delete this.b[a + 1];
            delete this.b[a + 2]
        }
        return !!b
    }
    ;
    d.RE = function(a, b) {
        var c = this.g[a];
        if (c) {
            this.Ig++;
            for (var e = nc(arguments, 1), f = 0, g = c.length; f < g; f++) {
                var k = c[f];
                this.b[k + 1].apply(this.b[k + 2], e)
            }
            this.Ig--;
            if (this.h && 0 == this.Ig)
                for (; c = this.h.pop(); )
                    this.Td(c);
            return 0 != f
        }
        return !1
    }
    ;
    d.clear = function(a) {
        if (a) {
            var b = this.g[a];
            b && (bc(b, this.Td, this),
            delete this.g[a])
        } else
            this.b.length = 0,
            this.g = {}
    }
    ;
    d.oa = function(a) {
        if (a) {
            var b = this.g[a];
            return b ? b.length : 0
        }
        a = 0;
        for (b in this.g)
            a += this.oa(b);
        return a
    }
    ;
    d.T = function() {
        jk.B.T.call(this);
        delete this.b;
        delete this.g;
        delete this.h
    }
    ;
    function kk(a, b) {
        Sd.call(this);
        if (w(a))
            b && (a = x(a, b));
        else if (a && w(a.handleEvent))
            a = x(a.handleEvent, a);
        else
            throw Error("Invalid listener argument");
        this.l = a;
        Ed(this, "tick", x(this.pr, this));
        this.Cm()
    }
    A(kk, Sd);
    d = kk.prototype;
    d.Qk = 0;
    d.pr = function() {
        if (this.QF()) {
            var a = this.Kk();
            24E4 > 2 * a && (a *= 2);
            this.jg(a)
        }
        this.l()
    }
    ;
    d.wD = function() {
        this.enabled && (this.mb(),
        this.yc(),
        this.pr())
    }
    ;
    d.yc = function() {
        kk.B.yc.call(this);
        this.Qk = z() + this.Kk()
    }
    ;
    d.mb = function() {
        this.Qk = 0;
        kk.B.mb.call(this)
    }
    ;
    d.pD = function() {
        return this.Qk
    }
    ;
    d.Cm = function() {
        this.mb();
        var a = 5E3 + 2E4 * Math.random();
        this.jg(a)
    }
    ;
    d.ko = function() {
        this.mb();
        this.jg(500)
    }
    ;
    d.QF = function() {
        return 500 < this.Kk()
    }
    ;
    function lk(a, b) {
        this.D = a;
        this.l = b;
        this.h = new jk;
        this.g = new kk(this.vt,this);
        this.b = this.H = null;
        this.A = !1;
        this.k = null;
        this.w = "";
        this.p = this.j = 0;
        this.o = []
    }
    A(lk, hk);
    d = lk.prototype;
    d.ck = function(a, b, c) {
        return this.h.dr(a, b, c)
    }
    ;
    d.kT = function(a, b, c) {
        return this.h.SE(a, b, c)
    }
    ;
    d.Td = function(a) {
        return this.h.Td(a)
    }
    ;
    d.yg = function(a, b) {
        return this.h.RE.apply(this.h, arguments)
    }
    ;
    d.pb = function() {
        this.A || (this.A = !0,
        this.h.clear(),
        this.Go(),
        bd(this.h))
    }
    ;
    d.Og = function() {
        return this.A
    }
    ;
    d.XP = function() {
        return {
            firstTestResults: [""],
            secondTestResults: this.b.Up(),
            sessionId: this.b.wm(),
            arrayId: this.b.vm()
        }
    }
    ;
    d.cn = function(a) {
        return 2 == a && 401 == this.b.zo()
    }
    ;
    d.dn = function(a, b, c) {
        if (!this.b || 2 != this.b.Gd()) {
            this.w = "";
            this.g.mb();
            this.k = a || null;
            this.j = b || 0;
            a = this.D + "/test";
            b = this.D + "/bind";
            var e = this.qu(c)
              , f = this.b;
            f && f.xm(null);
            e.xm(this);
            this.b = e;
            f ? ((3 == f.Gd() || f.sm()) && f.Gd(),
            this.b.wi(a, b, this.l, f.wm(), f.vm())) : c ? this.b.wi(a, b, this.l, c.sessionId, c.arrayId) : this.b.wi(a, b, this.l)
        }
    }
    ;
    d.qu = function(a) {
        return new bk("1",a ? a.firstTestResults : null,a ? a.secondTestResults : null)
    }
    ;
    d.Go = function(a) {
        this.p = a || 0;
        this.g.mb();
        this.b && (3 == this.b.Gd() && this.b.ho(),
        this.b.Un());
        this.p = 0
    }
    ;
    d.XB = function(a, b) {
        var c = {
            _sc: a
        };
        b && Ec(c, b);
        this.wg() || 2 == this.mn() ? this.o.push(c) : this.Tz() && this.b.en(c)
    }
    ;
    d.gq = function() {
        this.g.Cm();
        this.k = null;
        this.j = 0;
        if (this.o.length) {
            var a = this.o;
            this.o = [];
            for (var b = 0, c = a.length; b < c; ++b)
                this.b.en(a[b])
        }
        this.yg("handlerOpened")
    }
    ;
    d.so = function(a, b) {
        var c = this.cn(b);
        4 == b || c || (6 != b && 410 != this.b.zo() || this.g.ko(),
        this.g.yc());
        this.yg("handlerError", b)
    }
    ;
    d.Ki = function(a, b, c) {
        if (!this.wg())
            this.yg("handlerClosed");
        else if (c)
            for (a = 0,
            b = c.length; a < b; ++a)
                this.o.push(c[a].map)
    }
    ;
    d.hs = function() {
        var a = {
            v: 2
        };
        this.w && (a.gsessionid = this.w);
        0 != this.j && (a.ui = "" + this.j);
        0 != this.p && (a.ui = "" + this.p);
        this.k && Ec(a, this.k);
        return a
    }
    ;
    d.fq = function(a, b) {
        if ("S" == b[0])
            this.w = b[1];
        else if ("gracefulReconnect" == b[0])
            this.g.ko(),
            this.g.yc(),
            this.b.Un();
        else {
            var c = this.wx(b[0], b[1]);
            this.yg("handlerMessage", c)
        }
    }
    ;
    d.Tz = function() {
        return !!this.b && 3 == this.b.Gd()
    }
    ;
    d.mn = function() {
        return this.b ? this.b.Gd() : 0
    }
    ;
    d.Fp = function(a) {
        if (this.b) {
            var b = this.b.lB() || {};
            a ? b.Authorization = a : delete b.Authorization;
            this.b.mB(b)
        }
    }
    ;
    d.wx = function(a, b) {
        return new ik(a,b)
    }
    ;
    d.mA = function(a) {
        (this.l.loungeIdToken = a) || this.g.mb()
    }
    ;
    d.cQ = function() {
        return this.l.id
    }
    ;
    d.MQ = function() {
        return this.wg() ? this.g.pD() - z() : NaN
    }
    ;
    d.wg = function() {
        return this.g.enabled
    }
    ;
    d.sS = function() {
        this.g.wD()
    }
    ;
    d.vt = function() {
        this.g.mb();
        this.b.sm() ? this.g.yc() : this.dn(this.k, this.j)
    }
    ;
    function mk(a) {
        a && (this.name = a.name,
        this.rb = a.screenId,
        this.Cb = a.loungeToken,
        this.Mh = a.dialId || "")
    }
    d = mk.prototype;
    d.name = "";
    d.rb = "";
    d.Cb = "";
    d.Mh = "";
    d.dv = function() {
        return !!this.rb
    }
    ;
    d.HP = function() {
        return {
            key: this.rb,
            name: this.name
        }
    }
    ;
    d.Uu = function() {
        return {
            name: this.name,
            screenId: this.rb,
            loungeToken: this.Cb,
            dialId: this.Mh
        }
    }
    ;
    d.XR = function(a) {
        return a == this.rb || a == this.Mh
    }
    ;
    d.toString = function() {
        var a = this.Cb ? this.Cb.slice(-6) : "null";
        return "{name:" + this.name + ",screenId:" + this.rb + ",loungeToken:..." + a + ",dialId:" + this.Mh + "}"
    }
    ;
    z();
    function nk(a) {
        "?" == a.charAt(0) && (a = a.substr(1));
        a = a.split("&");
        for (var b = {}, c = 0, e = a.length; c < e; c++) {
            var f = a[c].split("=");
            if (1 == f.length && f[0] || 2 == f.length) {
                var g = Za(f[0] || "")
                  , f = Za(f[1] || "");
                g in b ? t(b[g]) ? mc(b[g], f) : b[g] = [b[g], f] : b[g] = f
            }
        }
        return b
    }
    function ok(a) {
        a = Zb([], a);
        a[0] = "";
        return a.join("")
    }
    var pk = Xb;
    function qk(a, b) {
        var c = a.split("#", 2);
        a = c[0];
        var c = 1 < c.length ? "#" + c[1] : ""
          , e = a.split("?", 2);
        a = e[0];
        var e = nk(e[1] || ""), f;
        for (f in b)
            e[f] = b[f];
        return $b(a, e) + c
    }
    ;var rk = window.yt && window.yt.config_ || {};
    ba("yt.config_", rk, void 0);
    ba("yt.tokens_", window.yt && window.yt.tokens_ || {}, void 0);
    ba("yt.msgs_", window.yt && window.yt.msgs_ || {}, void 0);
    function sk(a) {
        var b = arguments;
        if (1 < b.length) {
            var c = b[0];
            rk[c] = b[1]
        } else
            for (c in b = b[0],
            b)
                rk[c] = b[c]
    }
    function tk(a, b) {
        return a in rk ? rk[a] : b
    }
    function uk(a, b) {
        if (w(a) && m("ytsched.enableSetTimeout")) {
            var c = m("yt.scheduler.instance.addJob");
            if (c)
                return c(a, 0, b);
            ba("ytsched.enableSetTimeout", !1, void 0)
        }
        w(a) && (a = vk(a));
        return window.setTimeout(a, b)
    }
    function wk(a) {
        m("ytsched.enableSetTimeout") ? m("yt.scheduler.instance.cancelJob")(a) : window.clearTimeout(a)
    }
    function vk(a) {
        return a && window.yterr ? function() {
            try {
                return a.apply(this, arguments)
            } catch (b) {
                var c = b;
                if (window && window.yterr) {
                    var e = m("yt.www.errors.log");
                    e ? e(c, void 0) : (e = tk("ERRORS") || [],
                    e.push(c),
                    sk("ERRORS", e))
                }
                throw b;
            }
        }
        : a
    }
    ;var xk = null;
    "undefined" != typeof XMLHttpRequest ? xk = function() {
        return new XMLHttpRequest
    }
    : "undefined" != typeof ActiveXObject && (xk = function() {
        return new ActiveXObject("Microsoft.XMLHTTP")
    }
    );
    function yk(a, b, c, e, f, g, k) {
        function l() {
            4 == (n && "readyState"in n ? n.readyState : 0) && b && vk(b)(n)
        }
        var n = xk && xk();
        if (!("open"in n))
            return null;
        "onloadend"in n ? n.addEventListener("loadend", l, !1) : n.onreadystatechange = l;
        c = (c || "GET").toUpperCase();
        e = e || "";
        n.open(c, a, !0);
        g && (n.responseType = g);
        k && (n.withCredentials = !0);
        g = "POST" == c;
        if (f = zk(a, f))
            for (var p in f)
                n.setRequestHeader(p, f[p]),
                "content-type" == p.toLowerCase() && (g = !1);
        g && n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        n.send(e);
        return n
    }
    function zk(a, b) {
        b = b || {};
        var c;
        if (c = tk("PAGE_CL"))
            if (c = tk("PAGE_BUILD_TIMESTAMP")) {
                c = void 0;
                c = window.location.href;
                var e = Vb(a)[1] || null
                  , f = pk(a);
                e && f ? (e = c,
                c = Vb(a),
                e = Vb(e),
                c = c[3] == e[3] && c[1] == e[1] && c[4] == e[4]) : c = f ? pk(c) == f && (Number(Vb(c)[4] || null) || null) == (Number(Vb(a)[4] || null) || null) : !0;
                c = c || Ak(a, ["X-YouTube-Page-CL", "X-YouTube-Page-Timestamp"])
            }
        c && (b["X-YouTube-Page-CL"] = tk("PAGE_CL"),
        b["X-YouTube-Page-Timestamp"] = tk("PAGE_BUILD_TIMESTAMP"));
        return b
    }
    function Ak(a, b) {
        var c = tk("CORS_HEADER_WHITELIST") || {}
          , e = pk(a);
        if (!e)
            return !0;
        var f = c[e];
        return f ? hc(b, function(a) {
            return I(f, a)
        }) : !1
    }
    function Bk(a, b) {
        var c = b.format || "JSON";
        b.cK && (a = document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "") + a);
        var e = b.eK;
        e && (a = qk(a, e));
        var f = b.dK || "";
        (e = b.sh) && v(f) && (f = nk(f),
        Ec(f, e),
        f = ok(f));
        var g = !1, k, l = yk(a, function(a) {
            if (!g) {
                g = !0;
                k && wk(k);
                var e;
                t: switch (a && "status"in a ? a.status : -1) {
                case 0:
                case 200:
                case 201:
                case 202:
                case 203:
                case 204:
                case 205:
                case 206:
                case 304:
                    e = !0;
                    break t;
                default:
                    e = !1
                }
                var f = null;
                if (e || 400 <= a.status && 500 > a.status)
                    f = Ck(c, a);
                if (e)
                    t: {
                        e = f;
                        switch (c) {
                        case "XML":
                            e = 0 == parseInt(e && e.return_code, 10);
                            break t;
                        case "RAW":
                            e = !0;
                            break t
                        }
                        e = !!e
                    }
                var f = f || {}
                  , l = b.context || h;
                e ? b.Bc && b.Bc.call(l, a, f) : b.onError && b.onError.call(l, a, f);
                b.gI && b.gI.call(l, a, f)
            }
        }, b.method, f, b.headers, b.responseType, b.withCredentials);
        b.hI && 0 < b.timeout && (k = uk(function() {
            g || (g = !0,
            l.abort(),
            wk(k),
            b.hI.call(b.context || h, l))
        }, b.timeout));
        return l
    }
    function Ck(a, b) {
        var c = null;
        switch (a) {
        case "JSON":
            var e = b.responseText
              , f = b.getResponseHeader("Content-Type") || "";
            e && 0 <= f.indexOf("json") && (c = Hf(e));
            break;
        case "XML":
            if (e = (e = b.responseXML) ? Dk(e) : null)
                c = {},
                e = e.getElementsByTagName("*"),
                bc(e, function(a) {
                    c[a.tagName] = Ek(a)
                })
        }
        return c
    }
    function Dk(a) {
        return a ? (a = ("responseXML"in a ? a.responseXML : a).getElementsByTagName("root")) && 0 < a.length ? a[0] : null : null
    }
    function Ek(a) {
        var b = "";
        bc(a.childNodes, function(a) {
            b += a.nodeValue
        });
        return b
    }
    ;function Fk(a) {
        this.j = a || new dg("yt.leanback");
        a = this.j.get("yt_mdx_screen", !0);
        this.b = new mk(a);
        this.b.dv() || this.em();
        this.Qm();
        this.g = [];
        this.h = []
    }
    d = Fk.prototype;
    d.Ij = function() {
        return this.b
    }
    ;
    d.wf = function(a) {
        if (0 < this.g.length)
            this.g.push(a);
        else {
            var b = x(function(a) {
                !a && this.b && (this.b.Cb = "");
                this.b && this.j.h("yt_mdx_screen", this.b.Uu(), 0, !0);
                a = this.g;
                this.g = [];
                bc(a, function(a) {
                    a(this.b)
                }, this)
            }, this);
            this.b ? "" == this.b.Cb ? (this.g.push(a),
            this.Nm(this.b.rb, b)) : a(this.b) : (this.g.push(a),
            this.Tu(x(function(a) {
                this.Nm(a, b)
            }, this)))
        }
    }
    ;
    d.IB = function(a, b, c, e) {
        this.h.push(e);
        if (!(1 < this.h.length)) {
            var f = x(function(a) {
                var b = this.h;
                this.h = [];
                bc(b, function(b) {
                    b(a)
                })
            }, this);
            this.wf(x(this.Oo, this, a, b, c, x(function(e) {
                e ? f(e) : (this.b.Cb = "",
                this.wf(x(this.Oo, this, a, b, c, f)))
            }, this)))
        }
    }
    ;
    d.UE = function(a, b) {
        this.wf(x(this.JI, this, a, !0, b))
    }
    ;
    d.UC = function(a, b) {
        var c = b;
        60 < c ? c = 60 * Math.floor((5 + c) / 60) : 10 < c && (c = 10 * Math.floor((1 + c) / 10));
        this.wf(x(this.KI, this, a, c))
    }
    ;
    d.em = function(a) {
        if (a && this.b) {
            var b = this.ge("/api/lounge/screens") + "/" + this.b.rb;
            Bk(b, {
                method: "DELETE",
                context: this,
                format: "RAW",
                headers: {
                    Authorization: "OAuth " + a
                }
            })
        }
        this.j.remove("yt_mdx_screen");
        this.b = null
    }
    ;
    d.ge = function(a, b) {
        var c = Number(Vb(document.location.href)[4] || null) || null || "";
        c && (c = ":" + c);
        c = "https://" + Xb(document.location.href) + c + a;
        return $b(c, b || {})
    }
    ;
    d.Qm = function() {
        this.b && (this.b.Cb = "");
        uk(x(this.Qm, this), 864E5)
    }
    ;
    d.Tu = function(a) {
        Bk(this.ge("/api/lounge/pairing/generate_screen_id"), {
            method: "GET",
            format: "RAW",
            Bc: function(b) {
                a(b.responseText)
            },
            onError: ma(a, "")
        })
    }
    ;
    d.Oo = function(a, b, c, e) {
        a = {
            lounge_token: this.b.Cb,
            access_type: a ? "permanent" : "temporary",
            screen_id: this.b.rb || "",
            screen_name: b
        };
        Bk(this.ge("/api/lounge/pairing/get_pairing_code", {
            ctx: c
        }), {
            sh: a,
            method: "POST",
            format: "RAW",
            Bc: function(a) {
                e(a.responseText)
            },
            onError: ma(e, "")
        })
    }
    ;
    d.JI = function(a, b, c) {
        this.b ? Bk(this.ge("/api/lounge/pairing/register_pairing_code"), {
            sh: {
                screen_id: this.b.rb,
                pairing_code: a,
                access_type: b ? "permanent" : "temporary"
            },
            method: "POST",
            format: "RAW",
            Bc: x(c, this, !0),
            onError: x(c, this, !1)
        }) : c(!1)
    }
    ;
    d.KI = function(a, b) {
        this.b && Bk(this.ge("/api/lounge/pairing/unregister_pairing_code", {
            s: b
        }), {
            sh: {
                screen_id: this.b.rb,
                pairing_code: a
            },
            method: "POST"
        })
    }
    ;
    d.Nm = function(a, b) {
        var c = x(function(c) {
            c = Gf(c.responseText);
            var f = !1;
            c.screens && bc(c.screens, function(b) {
                b.screenId == a && (this.b ? this.b.Cb = b.loungeToken : this.b = new mk(b),
                f = !0)
            }, this);
            b(f)
        }, this);
        Bk(this.ge("/api/lounge/pairing/get_lounge_token_batch"), {
            sh: {
                screen_ids: a
            },
            method: "POST",
            Bc: c,
            onError: ma(b, !1)
        })
    }
    ;
    function Gk(a, b, c) {
        this.videoId = a;
        this.g = b;
        this.error = c
    }
    Gk.prototype.b = function() {
        return {
            videoId: this.videoId,
            reason: this.g,
            error: this.error
        }
    }
    ;
    function Hk(a, b, c, e, f) {
        this.p = e;
        this.w = c;
        this.b = b;
        this.k = f;
        this.h = new Fk(a);
        this.A = "";
        this.F = 0;
        this.g = null;
        this.j = {};
        this.D = !1;
        this.o = !0;
        this.l = []
    }
    A(Hk, ad);
    d = Hk.prototype;
    d.lA = function(a) {
        return new lk("/api/lounge/bc",a)
    }
    ;
    d.Rg = function() {
        var a = {}, b = [], c, e, f;
        for (f in this.j)
            c = this.j[f],
            e = f.indexOf("#"),
            0 < e && (f = f.substr(0, e)),
            a[f] || (a[f] = !0,
            b.push(c));
        return b.sort()
    }
    ;
    d.nk = function(a) {
        this.k = a;
        this.g && this.g.Fp(a ? "OAuth " + a : "")
    }
    ;
    d.Hn = function() {
        return !!this.k
    }
    ;
    d.BD = function() {
        return this.g && this.h.Ij() ? this.h.Ij().rb || null : null
    }
    ;
    d.gj = function(a) {
        this.h.wf(a)
    }
    ;
    d.qD = function(a) {
        a && this.l.push(a);
        this.l.length < (a ? 2 : 1) && this.gj(x(this.yo, this))
    }
    ;
    d.uD = function() {
        this.Bj(!1)
    }
    ;
    d.Bj = function(a) {
        this.g && (this.g.Go(),
        this.g.pb(),
        this.g = null);
        this.j = {};
        a || this.Xd(!1)
    }
    ;
    d.T = function() {
        this.l.length = 0;
        this.g && this.g.pb();
        Hk.B.T.call(this)
    }
    ;
    d.Mw = function() {
        this.Bj(!1);
        this.h.em(this.k || "");
        this.w.L("remote:status", [])
    }
    ;
    d.CD = function(a, b) {
        this.h.IB(!0, this.p.name, a, x(function(a) {
            this.A = a;
            this.F = z();
            b(a)
        }, this))
    }
    ;
    d.DD = function() {
        var a = this.A;
        if (a) {
            this.A = "";
            var b = Math.floor((z() - this.F) / 1E3);
            300 > b && this.h.UC(a, b)
        }
    }
    ;
    d.rD = function(a, b) {
        this.h.UE(a, b)
    }
    ;
    d.Pv = function(a) {
        if (this.b.nb()) {
            var b = a;
            -1E3 == a && (b = -1);
            var b = {
                currentTime: this.b.Dd(),
                state: b
            }, c;
            -1E3 == a && (c = this.b.Np(),
            b.currentError = Ef(c.b()));
            this.Zb("onStateChange", b);
            -1E3 == a && this.Zb("onError", {
                errors: Ef([c.b()])
            })
        }
    }
    ;
    d.gn = function() {
        this.Xm()
    }
    ;
    d.Wl = function(a, b) {
        this.Zb("onVolumeChanged", {
            volume: a,
            muted: b
        }, !0)
    }
    ;
    d.Gn = function(a) {
        this.Wm(a || [])
    }
    ;
    d.uj = function(a) {
        for (var b = [], c = 0, e = a.length; c < e; ++c)
            b.push(a[c].b());
        return Ef(b)
    }
    ;
    d.rn = function(a) {
        this.Zb("onError", {
            errors: this.uj(a)
        })
    }
    ;
    d.Mm = function(a, b) {
        var c = {
            videoId: a
        };
        if (b && !zc(b)) {
            var e = b.languageCode || "";
            Ec(c, {
                trackName: b.name || "",
                languageCode: e,
                sourceLanguageCode: b.sourceLanguageCode || e,
                languageName: b.languageName,
                format: b.format || 1,
                kind: b.kind || ""
            })
        }
        (e = this.b.XA()) && (c.style = Ef(e));
        this.Zb("onSubtitlesTrackChanged", c)
    }
    ;
    d.Iq = function(a, b) {
        this.Zb("updateUser", {
            username: a,
            authToken: b
        }, !0)
    }
    ;
    d.Zb = function(a, b, c) {
        (c || this.D) && this.g && this.g.XB(a, b)
    }
    ;
    d.Xm = function(a, b) {
        if (this.g) {
            var c = {}
              , e = this.b.Fi()
              , f = this.b.nb();
            if (f || e.length)
                f && 0 > e.indexOf(f) && console.warn("MDx send nowPlaying: Queue does not contain current video: " + f + " not in " + Ef(e)),
                this.vo(c);
            this.uo(c, a);
            this.Zb("nowPlaying", c, b)
        }
    }
    ;
    d.Wm = function(a, b, c) {
        if (this.g) {
            var e = {}
              , f = this.b.Fi()
              , g = this.b.Gx()
              , k = this.b.nb();
            if (k || 0 < f.length)
                k && 0 > f.indexOf(k) && (console.warn("MDx send nowPlayingPlaylist: Queue does not contain current video: " + k + " not in " + Ef(f) + ". Adding to the end of queue."),
                f = lc(f),
                f.push(k),
                g.push("x-missing")),
                e.video_ids = f.join(","),
                g.length == f.length ? e.videoSources = g.join(",") : console.warn("MDx send nowPlayingPlaylist: Sources and playlist length differ. " + g.length + " != " + f.length),
                this.vo(e),
                a.length && (e.errors = this.uj(a));
            this.uo(e, b);
            this.Zb("nowPlayingPlaylist", e, c)
        }
    }
    ;
    d.Xd = function(a) {
        if (0 < this.l.length) {
            var b = this.l;
            this.l = [];
            for (var c = 0, e = b.length; c < e; ++c)
                b[c](a)
        }
    }
    ;
    d.yo = function(a) {
        if (a)
            if (this.g)
                switch (this.g.mn()) {
                case 3:
                    this.Xd(!0);
                    break;
                case 0:
                    this.Xd(!1)
                }
            else
                this.g = this.lA({
                    device: "LOUNGE_SCREEN",
                    id: this.p.id,
                    name: this.p.name,
                    app: this.p.g,
                    hasCc: ""
                }),
                this.g.mA(a.Cb),
                this.g.ck("handlerOpened", this.kA, this),
                this.g.ck("handlerError", this.jA, this),
                this.g.ck("handlerMessage", this.nA, this),
                this.g.dn(),
                this.k && this.g.Fp("OAuth " + this.k);
        else
            this.Xd(!1)
    }
    ;
    d.kA = function() {
        this.Xd(!0)
    }
    ;
    d.jA = function(a) {
        this.g.wg() || (this.g.cn(a) && this.k ? (this.k = null,
        this.h.Ij().Cb = "",
        this.Bj(!0),
        this.gj(x(this.yo, this))) : this.Xd(!1))
    }
    ;
    d.nA = function(a) {
        var b = a.params || {};
        switch (a.b) {
        case "play":
            this.b.Di();
            break;
        case "pause":
            this.b.Hm();
            break;
        case "seekTo":
            this.b.Ei(this.Ii(b));
            break;
        case "stopVideo":
            this.b.Rl();
            break;
        case "setVideo":
            var c = this.Ji(b)
              , e = this.Ii(b)
              , b = this.b.Fi()
              , f = b.indexOf(c);
            0 <= f ? this.b.av(c, f, e) : console.warn("MDx received setVideo without currently playing video: " + c + " not in " + Ef(b));
            this.o = !1;
            break;
        case "setPlaylist":
            var c = this.Um(b)
              , e = this.Ii(b)
              , g = parseInt(b.currentIndex, 10)
              , f = this.Vm(b)
              , b = this.Tm(b);
            isNaN(g) && (g = 0);
            this.b.zi(x(this.Sm, this), c, f, b, g, e, this.o);
            this.o = !1;
            break;
        case "updatePlaylist":
            c = this.Um(b);
            f = this.Vm(b);
            b = this.Tm(b);
            e = !0;
            (g = this.b.nb()) && (e = 0 <= c.indexOf(g));
            e ? this.b.zi(x(this.Sm, this), c, f, b) : console.warn("MDx received updatePlaylist without currently playing video: " + g + " not in " + Ef(c));
            this.o = !1;
            this.Zb("confirmPlaylistUpdate", {
                updated: e
            }, !0);
            break;
        case "setVolume":
            e = this.b.Hi();
            c = parseInt(b.volume, 10) || 0;
            "delta"in b && (f = parseInt(b.delta, 10),
            0 <= e && !isNaN(f) && (c = Math.max(0, Math.min(e + f, 100))));
            this.b.Im(c);
            "true" == b.muted || "1" == b.muted ? this.b.Gm() : this.b.Jm();
            break;
        case "getVolume":
            this.Wl(this.b.Hi(), this.b.isMuted());
            break;
        case "setSubtitlesTrack":
            f = this.b.nb();
            c = this.Ji(b) || f;
            if (c == f) {
                g = {};
                if (b.trackName || b.languageCode)
                    g.name = b.trackName,
                    g.languageName = b.languageName,
                    g.languageCode = b.languageCode,
                    g.format = parseInt(b.format, 10) || 1,
                    g.kind = b.kind;
                this.b.$u(c, g)
            }
            if ("style"in b)
                if (v(b.style)) {
                    try {
                        e = Gf(b.style)
                    } catch (k) {
                        console.warn("Caption style not JSON, trying broken iOS style parsing for rich captions instead."),
                        e = this.Xu(b.style || "")
                    }
                    e.fontFamilyOption || (e.fontFamilyOption = "propSans");
                    this.Dg(e, "fontSizeRelative");
                    this.Dg(e, "windowOpacity");
                    this.Dg(e, "backgroundOpacity");
                    this.Dg(e, "textOpacity");
                    b = e.fontSizeRelative;
                    s(b) && (c = 0,
                    c = 1 > b ? Hc(2 * b - 2) : Hc(4 * b - 4),
                    e.fontSizeIncrement = c);
                    this.b.Ym(e)
                } else
                    this.b.Ym(null);
            break;
        case "getSubtitlesTrack":
            g = this.b.Lm();
            f = this.b.nb();
            c = this.Ji(b) || f;
            c != f && (g = null);
            this.Mm(c, g);
            break;
        case "getNowPlaying":
            this.Xm(a, !0);
            break;
        case "getPlaylist":
            this.b.Yu(x(function(b) {
                this.Wm(b, a, !0)
            }, this));
            break;
        case "remoteConnected":
            e = new ui(Gf(b.device));
            b = !!b.ui;
            this.D = !0;
            zc(this.j) && b && (this.o = !0);
            this.j[e.id] = e.g;
            this.w.L("remote:connected", e, b);
            break;
        case "remoteDisconnected":
            e = new ui(Gf(b.device));
            b = !!b.ui;
            delete this.j[e.id];
            this.w.L("remote:disconnected", e, b);
            break;
        case "loungeStatus":
            c = [];
            b = Gf(b.devices);
            if (t(b))
                for (f = 0,
                g = b.length; f < g; ++f)
                    e = new ui(b[f]),
                    "REMOTE_CONTROL" == e.type && c.push(e);
            this.Zu(c);
            this.w.L("remote:status", c)
        }
    }
    ;
    d.uo = function(a, b) {
        b && b.params && b.params.recipientDevice && (a.recipientDevice = b.params.recipientDevice)
    }
    ;
    d.Xu = function(a) {
        a = a.replace(/;\n}.*/, "");
        a = a.replace(/.*{/, "");
        a = a.split(/;\n/g);
        for (var b = {}, c, e, f = 0, g = a.length; f < g; ++f)
            c = a[f].split(/ = /),
            e = c.shift().trim(),
            c = c.shift().trim(),
            c = c.replace(/^"/, ""),
            c = c.replace(/"$/, ""),
            b[e] = c;
        return b
    }
    ;
    d.Dg = function(a, b) {
        b in a && (a[b] = parseFloat(a[b]))
    }
    ;
    d.Ji = function(a) {
        return a.videoId || a.video_id || ""
    }
    ;
    d.Um = function(a) {
        a = a.videoIds || a.video_ids || "";
        return 0 < a.length ? a.split(",") : []
    }
    ;
    d.Vm = function(a) {
        a = a.videoSources || "";
        return 0 < a.length ? a.split(",") : []
    }
    ;
    d.Tm = function(a) {
        var b = a.vvts || "";
        a = {};
        if (0 < b.length)
            for (var b = b.split(","), c = 0, e = b.length; c < e; ++c) {
                var f = b[c].split(":");
                a[f[0]] = f[1]
            }
        return a
    }
    ;
    d.Ii = function(a) {
        a = parseFloat(a.currentTime || a.newTime);
        if (isNaN(a) || 0 > a)
            a = 0;
        return a
    }
    ;
    d.Zu = function(a) {
        this.j = {};
        for (var b = 0, c = a.length; b < c; ++b)
            this.D = !0,
            this.j[a[b].id] = a[b].g
    }
    ;
    d.vo = function(a) {
        var b = this.b.nb();
        if (b) {
            var c = this.b.cf()
              , e = c;
            -1E3 == c && (e = -1);
            a.video_id = b;
            a.current_time = this.b.Dd();
            a.state = e;
            -1E3 == c && (b = this.b.Np(),
            a.currentError = Ef(b.b()))
        }
    }
    ;
    d.Sm = function(a) {
        a.length && this.Zb("onError", {
            errors: this.uj(a)
        })
    }
    ;
    var Ik = m("yt.dom.getNextId_");
    if (!Ik) {
        Ik = function() {
            return ++Jk
        }
        ;
        ba("yt.dom.getNextId_", Ik, void 0);
        var Jk = 0
    }
    ;function Kk(a) {
        if (a = a || window.event) {
            for (var b in a)
                b in Lk || (this[b] = a[b]);
            this.Zw = a.scale;
            this.Yw = a.rotation;
            this.b = a;
            (b = a.target || a.srcElement) && 3 == b.nodeType && (b = b.parentNode);
            this.target = b;
            if (b = a.relatedTarget)
                try {
                    b = b.nodeName && b
                } catch (c) {
                    b = null
                }
            else
                "mouseover" == this.type ? b = a.fromElement : "mouseout" == this.type && (b = a.toElement);
            this.relatedTarget = b;
            this.clientX = void 0 != a.clientX ? a.clientX : a.pageX;
            this.clientY = void 0 != a.clientY ? a.clientY : a.pageY;
            this.keyCode = a.keyCode ? a.keyCode : a.which;
            this.charCode = a.charCode || ("keypress" == this.type ? this.keyCode : 0);
            this.altKey = a.altKey;
            this.ctrlKey = a.ctrlKey;
            this.shiftKey = a.shiftKey;
            "MozMousePixelScroll" == this.type ? (this.wheelDeltaX = a.axis == a.HORIZONTAL_AXIS ? a.detail : 0,
            this.wheelDeltaY = a.axis == a.HORIZONTAL_AXIS ? 0 : a.detail) : window.opera ? (this.wheelDeltaX = 0,
            this.wheelDeltaY = a.detail) : 0 == a.wheelDelta % 120 ? "WebkitTransform"in document.documentElement.style ? window.chrome && 0 == navigator.platform.indexOf("Mac") ? (this.wheelDeltaX = a.wheelDeltaX / -30,
            this.wheelDeltaY = a.wheelDeltaY / -30) : (this.wheelDeltaX = a.wheelDeltaX / -1.2,
            this.wheelDeltaY = a.wheelDeltaY / -1.2) : (this.wheelDeltaX = 0,
            this.wheelDeltaY = a.wheelDelta / -1.6) : (this.wheelDeltaX = a.wheelDeltaX / -3,
            this.wheelDeltaY = a.wheelDeltaY / -3);
            this.h = a.pageX;
            this.j = a.pageY
        }
    }
    Kk.prototype.k = function() {
        if (document.body && document.documentElement) {
            var a = document.body.scrollTop + document.documentElement.scrollTop;
            this.h = this.clientX + (document.body.scrollLeft + document.documentElement.scrollLeft);
            this.j = this.clientY + a
        }
    }
    ;
    Kk.prototype.l = function() {
        s(this.h) || this.k();
        return this.h
    }
    ;
    Kk.prototype.o = function() {
        s(this.j) || this.k();
        return this.j
    }
    ;
    Kk.prototype.b = null;
    Kk.prototype.type = "";
    d = Kk.prototype;
    d.target = null;
    d.relatedTarget = null;
    d.currentTarget = null;
    d.data = null;
    d.source = null;
    Kk.prototype.state = null;
    d = Kk.prototype;
    d.keyCode = 0;
    d.charCode = 0;
    d.altKey = !1;
    d.ctrlKey = !1;
    d.shiftKey = !1;
    d.clientX = 0;
    d.clientY = 0;
    d.wheelDeltaX = 0;
    d.wheelDeltaY = 0;
    d.Yw = 0;
    d.Zw = 1;
    d.jT = null;
    d.changedTouches = null;
    d.preventDefault = function() {
        this.b.returnValue = !1;
        this.b.preventDefault && this.b.preventDefault()
    }
    ;
    d.stopPropagation = function() {
        this.b.cancelBubble = !0;
        this.b.stopPropagation && this.b.stopPropagation()
    }
    ;
    d.stopImmediatePropagation = function() {
        this.b.cancelBubble = !0;
        this.b.stopImmediatePropagation && this.b.stopImmediatePropagation()
    }
    ;
    d.JR = function() {
        return this.altKey || this.ctrlKey || this.shiftKey
    }
    ;
    var Lk = {
        stopImmediatePropagation: 1,
        stopPropagation: 1,
        preventMouseEvent: 1,
        preventManipulation: 1,
        preventDefault: 1,
        layerX: 1,
        layerY: 1,
        scale: 1,
        rotation: 1
    };
    var Mk = m("yt.events.listeners_") || {};
    ba("yt.events.listeners_", Mk, void 0);
    var Nk = m("yt.events.counter_") || {
        count: 0
    };
    ba("yt.events.counter_", Nk, void 0);
    function Ok(a, b, c, e) {
        return yc(Mk, function(f) {
            return f[0] == a && f[1] == b && f[2] == c && f[4] == !!e
        })
    }
    function Pk(a, b, c, e) {
        if (!a || !a.addEventListener && !a.attachEvent)
            return "";
        e = !!e;
        var f = Ok(a, b, c, e);
        if (f)
            return f;
        var f = ++Nk.count + "", g = !("mouseenter" != b && "mouseleave" != b || !a.addEventListener || "onmouseenter"in document), k;
        k = g ? function(e) {
            e = new Kk(e);
            if (!We(e.relatedTarget, function(b) {
                return b == a
            }, !0))
                return e.currentTarget = a,
                e.type = b,
                c.call(a, e)
        }
        : function(b) {
            b = new Kk(b);
            b.currentTarget = a;
            return c.call(a, b)
        }
        ;
        k = vk(k);
        Mk[f] = [a, b, c, k, e];
        a.addEventListener ? "mouseenter" == b && g ? a.addEventListener("mouseover", k, e) : "mouseleave" == b && g ? a.addEventListener("mouseout", k, e) : "mousewheel" == b && "MozBoxSizing"in document.documentElement.style ? a.addEventListener("MozMousePixelScroll", k, e) : a.addEventListener(b, k, e) : a.attachEvent("on" + b, k);
        return f
    }
    function Qk(a) {
        a && ("string" == typeof a && (a = [a]),
        bc(a, function(a) {
            if (a in Mk) {
                var c = Mk[a]
                  , e = c[0]
                  , f = c[1]
                  , g = c[3]
                  , c = c[4];
                e.removeEventListener ? e.removeEventListener(f, g, c) : e.detachEvent && e.detachEvent("on" + f, g);
                delete Mk[a]
            }
        }))
    }
    ;function Rk() {
        this.b = new cast.receiver.Receiver("YouTube",["ramp"]);
        this.g = new cast.receiver.ChannelHandler("ramp");
        this.ay()
    }
    A(Rk, ad);
    d = Rk.prototype;
    d.ay = function() {
        this.g.addChannelFactory(this.b.createChannelFactory("ramp"))
    }
    ;
    d.cu = function() {
        this.b.start()
    }
    ;
    d.sc = function(a, b) {
        Pk(this.g, a, b)
    }
    ;
    d.LE = function() {
        return this.g.getChannels()
    }
    ;
    d.RB = function() {
        return this.b.getConnectionService().isConnected()
    }
    ;
    d.uq = function(a) {
        this.b.getConnectionService().setAppData(a)
    }
    ;
    d.T = function() {
        var a = this.g, b;
        for (b in Mk)
            Mk[b][0] == a && Qk(b);
        Rk.B.T.call(this)
    }
    ;
    var Sk = {
        "-1000": 0,
        "-1": 1,
        0: 1,
        1: 2,
        2: 1,
        3: 2,
        5: 1,
        1081: 1
    };
    function Tk(a, b) {
        this.b = a;
        this.h = b;
        this.j = 0;
        this.g = null;
        this.k = "";
        this.h.sc(cast.receiver.Channel.EventType.OPEN, x(this.bu, this));
        this.h.sc(cast.receiver.Channel.EventType.MESSAGE, x(this.au, this));
        this.h.cu()
    }
    A(Tk, ad);
    d = Tk.prototype;
    d.T = function() {
        bd(this.h);
        Tk.B.T.call(this)
    }
    ;
    d.$h = function(a) {
        this.k = a;
        this.h.RB() && (a ? this.h.uq('<additionalData xmlns="http://www.youtube.com/dial"><screenId>' + a + "</screenId></additionalData>") : this.h.uq(""))
    }
    ;
    d.bu = function(a) {
        this.Id(a.target, {
            cmd_id: 0,
            type: "STATUS",
            status: this.Rd()
        });
        this.$h(this.k)
    }
    ;
    d.au = function(a) {
        var b = a.target;
        a = a.message;
        s(a.cmd_id) && s(a.type) && this.UJ(b, a)
    }
    ;
    d.Id = function(a, b) {
        try {
            a.send(b)
        } catch (c) {}
    }
    ;
    d.Nq = function(a) {
        for (var b = this.h.LE(), c = b.length, e = 0; e < c; ++e)
            b[e].isOpen() && this.Id(b[e], a)
    }
    ;
    d.aj = function() {
        var a = this.b.Hi();
        return 0 <= a ? a / 100 : 1
    }
    ;
    d.Rd = function(a, b) {
        var c = this.b.nb()
          , e = s(a) ? a : this.b.cf();
        if (!ga(this.g) || !c || this.g.content_id != c)
            return {
                event_sequence: this.j++,
                state: 0,
                muted: this.b.isMuted(),
                volume: this.aj()
            };
        if (-1E3 == e)
            return {
                event_sequence: this.j++,
                content_id: this.b.nb(),
                state: 0,
                error: {
                    domain: "YouTube.MDx",
                    code: 2
                }
            };
        var f = Sk[e] || 0
          , c = {
            event_sequence: this.j++,
            state: f,
            content_id: c,
            current_time: this.b.Dd(),
            duration: this.g.duration,
            muted: this.b.isMuted(),
            time_progress: 1 == e,
            title: this.g.title,
            volume: this.aj()
        };
        this.g.thumbnail_url && (c.image_url = this.g.thumbnail_url);
        ga(b) && Ec(c, b);
        return c
    }
    ;
    d.xr = function(a) {
        this.Nq({
            cmd_id: 0,
            type: "STATUS",
            status: this.Rd(a)
        })
    }
    ;
    d.Yr = function(a) {
        this.g = a || null;
        this.Nq({
            cmd_id: 0,
            type: "STATUS",
            status: this.Rd()
        })
    }
    ;
    d.UJ = function(a, b) {
        switch (b.type) {
        case "PLAY":
            var c = this.b.cf()
              , e = 3;
            if (this.g && s(b.position) && fa(b.position)) {
                var f = Math.max(0, Math.min(b.position, this.g.duration));
                this.b.Ei(f);
                2 == c && this.b.Di()
            } else
                this.b.Di();
            if (2 == c || 1 == c)
                e = 1;
            this.Id(a, {
                cmd_id: b.cmd_id,
                type: "RESPONSE",
                status: this.Rd(e)
            });
            break;
        case "STOP":
            this.b.Hm();
            break;
        case "INFO":
            this.Id(a, {
                cmd_id: b.cmd_id,
                type: "RESPONSE",
                status: this.Rd()
            });
            break;
        case "VOLUME":
            c = this.aj();
            s(b.volume) && fa(b.volume) && (this.b.Im(Math.round(100 * b.volume)),
            c = b.volume);
            e = this.b.isMuted();
            s(b.muted) && (b.muted ? this.b.Gm() : this.b.Jm(),
            e = b.muted);
            this.Id(a, {
                cmd_id: b.cmd_id,
                type: "RESPONSE",
                status: this.Rd(void 0, {
                    volume: c,
                    muted: e
                })
            });
            break;
        default:
            this.Id(a, {
                cmd_id: b.cmd_id,
                type: "RESPONSE",
                status: {
                    event_sequence: this.j++,
                    original_operation: b.type,
                    error: {
                        domain: "YouTube.MDx",
                        code: 1
                    }
                }
            })
        }
    }
    ;
    function Uk() {
        K.call(this);
        this.timeLeft = this.percentagePlayed = this.percentageLoaded = this.percentagePlayedStyle = this.percentageLoadedStyle = this.duration = this.currentTime = 0
    }
    A(Uk, K);
    Xc(Uk, "currentTime duration percentageLoadedStyle percentagePlayedStyle percentageLoaded percentagePlayed timeLeft".split(" "));
    function Vk() {
        this.b = new dd(25,!0)
    }
    d = Vk.prototype;
    d.load = function(a, b) {
        for (var c = [], e = this.b.sa(), f = 0, g = e.length; f < g; ++f)
            c.push(e[f].video);
        e = new P;
        e.Y.push(c);
        b && b(e);
        return e
    }
    ;
    d.Ut = function(a) {
        return (a = this.b.get(a)) ? (a.Fc.Sc(a.activeIndex),
        a.Fc) : null
    }
    ;
    d.Xx = function(a, b) {
        this.b.get(a.videoId) || this.b.Ue(a.videoId, {
            video: a,
            Fc: this.TA(b),
            iz: b,
            activeIndex: b.activeIndex
        })
    }
    ;
    d.TA = function(a) {
        for (var b = this.b.sa(), c = 0, e = b.length; c < e; ++c)
            if (b[c].iz === a)
                return b[c].Fc;
        return new Q(a.service,a.model.title,a.model.Ya,a.model.serviceQuery,a.k)
    }
    ;
    d.P = function() {
        return this.b.oa()
    }
    ;
    function Wk(a, b, c, e, f, g, k) {
        Jh.call(this);
        this.o = a;
        this.k = b;
        this.w = c;
        this.l = e;
        this.g = f;
        this.j = g;
        this.currentVideo = this.b = null;
        this.h = this.Ct();
        this.p = k
    }
    A(Wk, Jh);
    d = Wk.prototype;
    d.nT = function() {
        var a = this.Xb();
        return a ? a.Ln() : null
    }
    ;
    d.Ct = function() {
        var a = new Ua(this.g,"[[Current Watch History|Displays previously watched videos.]]","icon-hourglass");
        a.model.Ha = "HL";
        return a
    }
    ;
    d.Ie = function(a, b, c, e, f) {
        this.currentVideo = a;
        this.j.update(this.currentVideo, c, e, f);
        (f = b === this.h) && (b = this.g.Ut(a.videoId));
        c = this.Tt(a.channel);
        b && "[[Featured Playlist|Title for playlist.]]" !== b.model.title && (b.service !== this.k || b instanceof yg) || (c.j(a),
        b = c);
        e = [];
        this.rows.length = 1;
        b !== this.b && (this.b = this.rows[0] = b,
        this.b.load(q));
        !f && this.currentVideo && this.Vt(this.currentVideo.videoId);
        f = this.St(a);
        e.push(f);
        e.push(c);
        this.Qt(a);
        0 < this.g.P() && e.push(this.mi());
        this.Rt(e, this.rows);
        this.Xl([f, this.h]);
        this.ig();
        return b
    }
    ;
    d.mE = function() {
        var a = this.b;
        this.currentVideo && a && this.g.Xx(this.currentVideo, a)
    }
    ;
    d.Hp = function() {
        this.currentVideo = null
    }
    ;
    d.Rt = function(a, b) {
        for (var c, e = a.length, f = 0; f < e; ++f)
            (c = a[f]) && (b.some(function(a) {
                return c.model.title === a.model.title
            }) || b.push(c))
    }
    ;
    d.Tt = function(a) {
        return new yg(this.w,"[[Uploads for channel:|sWqBGwb2WdBVvjLS_6hayw]] " + a.displayName,a.imageUrl,a.username)
    }
    ;
    d.St = function(a) {
        return new Q(this.k,"[[Related Videos|Title for playlist that shows videos related to the one currently is playing.]]","icon-related",a.videoId)
    }
    ;
    d.Qt = function(a) {
        a.l && this.o.bb(a.channel.username, x(function(b) {
            if (b.kg.length) {
                var c = new Q(this.l,"[[Featured Playlist|Title for playlist.]]","icon-subscribe");
                c.serviceQuery = b.kg;
                c.k = new mb(a.videoId,b.kg);
                this.kp(c)
            }
        }, this))
    }
    ;
    d.IQ = function() {
        return this.j
    }
    ;
    d.Vt = function(a) {
        a = this.b.Xj("videoId", a);
        this.b.Sc(Math.max(a, 0))
    }
    ;
    d.mi = function() {
        return this.h
    }
    ;
    d.lw = function() {
        return this.b ? this.b.model : null
    }
    ;
    d.gg = function() {
        return this.rows[0]
    }
    ;
    d.li = function() {
        var a = this.gg()
          , b = -1;
        this.currentVideo && (b = a.Xj("videoId", this.currentVideo.videoId));
        -1 == b && (b = a.activeIndex);
        return b < a.P() - 1 ? a.ia(++b) : this.p.loopRows ? a.ia(0) : null
    }
    ;
    d.next = function(a) {
        var b = this.li();
        if (b) {
            var c = this.gg();
            this.Ie(b, c, 0, a);
            c.kh(1) && c.load(q);
            return this.currentVideo.videoId
        }
        return ""
    }
    ;
    d.uI = function() {
        if (this.currentVideo) {
            var a = this.b
              , b = a.Xj("videoId", this.currentVideo.videoId);
            if (0 < b)
                return this.Ie(a.ia(--b), a),
                a.kh(-1) && a.load(q),
                this.currentVideo.videoId
        }
        return ""
    }
    ;
    d.Xl = function(a) {
        (a || [this.mi()]).forEach(function(a) {
            a.Sc(0)
        });
        this.Za = 0
    }
    ;
    Wk.inject = "brandingService relatedVideosService userUploadsService vevoPlaylistService watchHistoryModel playerVariablesModel environmentModel".split(" ");
    function Xk() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
            var b = 16 * Math.random() | 0;
            return ("x" == a ? b : b & 3 | 8).toString(16)
        })
    }
    ;function Yk(a, b) {
        yh.call(this);
        this.J = a;
        this.j = b;
        this.g = [];
        this.h = !1;
        this.b = null
    }
    A(Yk, yh);
    d = Yk.prototype;
    d.gt = function(a) {
        this.j.g && (this.h ? a() : (this.g.push(a),
        1 < this.g.length || xf("https://www.gstatic.com/cast/js/receiver/1.0/cast_receiver.js", {
            timeout: 3E4
        }).Qe(x(this.oy, this))))
    }
    ;
    d.oy = function() {
        if (m("cast.receiver.Receiver")) {
            var a = m("cast.receiver.logger.setLevelValue");
            a && a(900);
            if (this.b = m("cast.receiver.platform"))
                this.b.addEventListener(cast.receiver.Platform.EventType.VOLUME_CHANGED, x(this.An, this)),
                this.b.isReady() && this.An();
            a = this.g;
            this.g = [];
            this.h = !0;
            for (var b = a.length, c = 0; c < b; ++c)
                a[c]()
        }
    }
    ;
    d.An = function() {
        var a = this.b.getVolume()
          , b = !!this.b.getMuted();
        fa(a) ? (a = Math.round(100 * a),
        a = Math.min(Math.max(a, 0), 100)) : a = -1;
        this.Ba(a, b)
    }
    ;
    d.qh = function(a) {
        this.b ? this.b.setVolume(a / 100) : this.Ea()
    }
    ;
    d.Vs = function(a) {
        this.b ? this.b.setMuted(a) : this.Ea()
    }
    ;
    d.ph = function() {
        this.Vs(!0)
    }
    ;
    d.rh = function() {
        this.Vs(!1)
    }
    ;
    Yk.$inject = ["$window", "environmentModel"];
    function Zk(a, b) {
        for (var c in b)
            b.hasOwnProperty(c) && a.setAttribute(c, b[c])
    }
    function $k() {
        var a = new ActiveXObject("MSXML2.DOMDocument");
        if (a) {
            a.resolveExternals = !1;
            a.validateOnParse = !1;
            try {
                a.setProperty("ProhibitDTD", !0),
                a.setProperty("MaxXMLSize", 2048),
                a.setProperty("MaxElementDepth", 256)
            } catch (b) {}
        }
        return a
    }
    ;function al(a) {
        var b = {};
        if (1 == a.nodeType && 0 < a.attributes.length)
            for (var c = 0; c < a.attributes.length; ++c) {
                var e = a.attributes.item(c);
                b[e.nodeName.replace(":", "$")] = e.nodeValue
            }
        if (a.hasChildNodes())
            for (a = a.firstChild; a; )
                3 == a.nodeType ? (c = "$t",
                e = a.nodeValue) : (c = a.nodeName.replace(":", "$"),
                e = al(a)),
                c in b ? (t(b[c]) || (b[c] = [b[c]]),
                b[c].push(e)) : b[c] = e,
                a = a.nextSibling;
        return b
    }
    ;function bl(a, b, c) {
        dj.call(this);
        this.b = P;
        this.g = a;
        this.k = b;
        this.h = c;
        this.Ka("author", this.uv);
        this.Ka("logo", this.vv);
        this.Ka("title", this.wv)
    }
    A(bl, dj);
    d = bl.prototype;
    d.uv = function(a, b, c) {
        c && (a.Vc = this.ua(c[0].name),
        a.mg = this.ua(c[0].yt$userId));
        return a
    }
    ;
    d.wv = function(a, b, c) {
        a.title = this.ua(c);
        return a
    }
    ;
    d.vv = function(a, b, c) {
        a.imageUrl = this.ua(c);
        return a
    }
    ;
    d.se = function(a, b, c) {
        if (t(c)) {
            b = 0;
            for (var e = c.length; b < e; ++b)
                this.Xs(a, c[b])
        } else
            this.Xs(a, c);
        return a
    }
    ;
    d.Xs = function(a, b) {
        var c = this.Ch(a, b);
        a && a.Y && c && a.Y.push(c)
    }
    ;
    d.Ch = function(a, b) {
        var c = new th(a.Ga,a.serviceQuery,a.Ha)
          , e = new sh(a.Ga,a.serviceQuery);
        if (this.jx(b))
            return this.bx(c, b),
            this.ax(e, b),
            c.channel = e,
            c;
        c.activityDescription = this.dj();
        c.description = this.fx(b);
        c.channel = this.ex(e, b);
        c.duration = this.bo(b);
        c.durationLabel = this.g.Gg(c.duration);
        c.imageUrl = this.h.Je(this.jj(b), this.k.R);
        c.A = this.hx(b);
        c.l = this.cx(b);
        c.title = this.gx(b);
        c.videoId = this.jj(b);
        c.viewCount = this.ix(b);
        c.viewCountLabel = this.g.yd(c.viewCount);
        c.uploadedDate = this.dx(b);
        e = new Date(Date.parse(c.uploadedDate));
        c.uploadedDateLabel = this.g.mx(e);
        this.kx(c, b);
        this.lx(c, b);
        if (b.app$control && b.app$control.yt$state)
            for (var e = t(b.app$control.yt$state) ? b.app$control.yt$state : [b.app$control.yt$state], f = 0, g = e.length; f < g; ++f)
                if (e[f] && "restricted" == e[f].name) {
                    c.errorCode = e[f].reasonCode;
                    break
                }
        return c
    }
    ;
    d.kx = function(a, b) {
        var c = this.hy(b)
          , e = this.fy(b)
          , f = c + e;
        0 < f ? (a.g = e / f,
        a.h = c / f) : (a.g = 0,
        a.h = 0);
        a.k = e;
        a.dislikesLabel = this.g.yd(a.k);
        a.dislikesStyle = {
            width: ae(a.g)
        };
        a.p = c;
        a.likesLabel = this.g.yd(a.p);
        a.likesStyle = {
            width: ae(a.h)
        }
    }
    ;
    d.lx = function(a, b) {
        a.b = !!b.yt$paidContent;
        a.o = !!b.yt$paidContent && "free" === b.yt$paidContent.type
    }
    ;
    d.fy = function(a) {
        if (a && a.yt$rating && a.yt$rating.numDislikes)
            return parseInt(a.yt$rating.numDislikes, 10)
    }
    ;
    d.hy = function(a) {
        if (a && a.yt$rating && a.yt$rating.numLikes)
            return parseInt(a.yt$rating.numLikes, 10)
    }
    ;
    d.dj = function() {
        return "[[{{username}} uploaded a video|The message that describes user activity. Displayed when a user has uploaded a video.]]"
    }
    ;
    d.dx = function(a) {
        return a && a.media$group && a.media$group.yt$uploaded ? new Date(this.ua(a.media$group.yt$uploaded)) : null
    }
    ;
    d.jj = function(a) {
        return a && a.media$group && a.media$group.yt$videoid ? a.media$group.yt$videoid.$t : ""
    }
    ;
    d.fx = function(a) {
        return a && a.media$group && a.media$group.media$description && a.media$group.media$description.$t ? a.media$group.media$description.$t.slice(0, 165) : ""
    }
    ;
    d.gx = function(a) {
        return a && a.title ? a.title.$t : ""
    }
    ;
    d.bo = function(a) {
        return a.media$group && a.media$group.yt$duration ? parseInt(a.media$group.yt$duration.seconds, 10) : 0
    }
    ;
    d.hx = function(a) {
        return !!a.yt$hd
    }
    ;
    d.cx = function(a) {
        return !!a.yt$claimed
    }
    ;
    d.ex = function(a, b) {
        b.media$group && b.media$group.yt$uploaderId && (a.Qa = b.media$group.yt$uploaderId.$t);
        b.media$group && b.media$group.media$credit && (a.username = this.Ej(b.media$group.media$credit).$t,
        a.displayName = this.Ej(b.media$group.media$credit).yt$display);
        a.Qa && (a.imageUrl = this.h.Pb(a.Qa));
        b.yt$paidContent && b.yt$paidContent.link && b.yt$paidContent.link.length && (a.b = gc(b.yt$paidContent.link, function(a) {
            return a.rel && -1 < a.rel.indexOf("channel.indirectOffer")
        }));
        return a
    }
    ;
    d.ix = function(a) {
        return a.yt$statistics ? a.yt$statistics.viewCount : 0
    }
    ;
    d.jx = function(a) {
        return a.batch$status && "200" != a.batch$status.code
    }
    ;
    d.bx = function(a, b) {
        a.videoId = b.batch$id.$t;
        a.errorCode = "notAvailable"
    }
    ;
    d.ax = function(a, b) {
        a.videoId = b.batch$id.$t
    }
    ;
    bl.inject = ["locale", "environmentModel", "ytThumbnails"];
    function cl(a, b, c, e, f, g, k, l, n, p, u, r, E) {
        this.kb = f;
        this.fa = g;
        this.ja = n;
        this.X = new dd;
        this.j = [];
        this.U = {};
        this.$ = 1;
        this.da = 0;
        this.h = {};
        this.D = {};
        this.ga = 1;
        t: if (document.implementation && document.implementation.createDocument)
            g = document.implementation.createDocument("http://www.w3.org/2005/Atom", "feed", null);
        else {
            if ("undefined" != typeof ActiveXObject && (g = $k())) {
                g.appendChild(g.createNode(1, "feed", "http://www.w3.org/2005/Atom"));
                break t
            }
            throw Error("Your browser does not support creating new documents");
        }
        this.g = new Ze(g);
        Df.call(this, a, b, c, e, f, k, l, u, r, E)
    }
    A(cl, Df);
    d = cl.prototype;
    d.Rm = function(a, b) {
        this.j = a;
        this.U = b
    }
    ;
    d.Wu = function(a) {
        Ec(this.h, a);
        a = 0;
        for (var b = this.j.length; a < b; ++a) {
            var c = this.j[a];
            if (this.h[c]) {
                var e = this.Vd(c);
                if (e = this.X.get(e))
                    e.j = this.h[c]
            }
        }
    }
    ;
    d.RC = function() {
        for (var a = [], b = 0, c = this.j.length; b < c; ++b)
            a.push(this.U[this.j[b]] || "x-unknown");
        return a
    }
    ;
    d.Ak = function() {
        return this.j
    }
    ;
    d.lc = function(a) {
        a = a || {};
        a.vpsid = this.id;
        return cl.B.lc.call(this, a)
    }
    ;
    d.vf = function() {
        return this.b.useStageGdata ? "sgd" : "gd"
    }
    ;
    d.qe = function() {
        return this.kb.useStageGdata ? "//stage.gdata.youtube.com/feeds/api" : "https//gdata.youtube.com/feeds/api"
    }
    ;
    d.vG = function(a, b, c, e) {
        var f = this.$++
          , g = q
          , k = !1;
        this.fa.zb(x(function(l) {
            k || (l && (b.access_token = l),
            g = this.PG(b, c, x(this.OG, this, e, a, f)))
        }, this));
        return function() {
            k = !0;
            g()
        }
    }
    ;
    d.OG = function(a, b, c, e) {
        if (this.da > c)
            this.Xn(),
            a(!1);
        else {
            this.da = c;
            c = 0;
            for (var f = e.length; c < f; ++c) {
                var g;
                g = e[c];
                if ("string" == typeof g)
                    if ("undefined" != typeof DOMParser)
                        g = (new DOMParser).parseFromString(g, "application/xml");
                    else if ("undefined" != typeof ActiveXObject) {
                        var k = $k();
                        k.loadXML(g);
                        g = k
                    } else
                        throw Error("Your browser does not support loading xml documents");
                g = al(g);
                this.o.parse(b, g)
            }
            this.uk();
            a(!0)
        }
    }
    ;
    d.he = function(a, b, c) {
        var e = {}
          , f = this.uG(e);
        a.serviceQuery = b.query;
        a.Ha = this.ja;
        if (0 < f.length)
            return this.vG(a, b, f, x(function(b, c, f) {
                f && this.Lr(a, c, e);
                b(a)
            }, this, c || q, this.Ak()));
        this.da = this.$++;
        this.Lr(a, this.Ak(), e);
        c && c(a);
        return q
    }
    ;
    d.Vd = function(a, b) {
        var c = this.qe() + "/videos/" + a
          , e = Bc(this.l || {});
        b && Ec(e, b);
        return $b(c, e)
    }
    ;
    d.uG = function(a) {
        for (var b = [], c = 0, e = this.j.length; c < e; ++c) {
            var f = this.j[c]
              , g = this.Vd(f)
              , k = this.X.get(g);
            k && "private" != k.errorCode && "unknown" != k.errorCode ? a[g] = k : b.push(f)
        }
        return b
    }
    ;
    d.PG = function(a, b, c) {
        for (var e = [], f = [], g = 0, k = b.length; g < k; ++g) {
            var l = b[g]
              , n = {};
            l in this.h ? e.push({
                video: l,
                $C: this.h[l]
            }) : f.push(l)
        }
        for (k = 0; k < f.length; )
            n = Math.min(k + 50, f.length),
            e.push({
                Jq: f.slice(k, n)
            }),
            k += 50;
        var p = 0
          , u = []
          , f = x(function(a, b) {
            u[a] = b;
            ++p == e.length && (this.Rj(),
            c(u))
        }, this);
        b = {
            v: a.v
        };
        k = {
            v: a.v
        };
        k.access_token = a.access_token;
        a = {
            "X-GData-Key": "key=AI39si5-UxCbfO2jRg9EV2bWI0UDWm74GkLzZWFHkQR0bm4d0JTKyrhSi6NZORaTMuJaRH8zs0PmsCONB9uV3pSgzZklwvMoRA",
            "Content-Type": "application/atom+xml"
        };
        g = this.lc(k);
        l = [];
        this.pk();
        for (var r = 0, k = e.length; r < k; ++r) {
            var n = e[r]
              , E = ma(f, r);
            n.Jq ? l.push(this.p.post(g, null, this.YC(g, n.Jq), E, null, a)) : l.push(this.ZC(n.video, b, n.$C, E))
        }
        return ma(function(a) {
            for (var b = 0, c = a.length; b < c; ++b)
                a[b]()
        }, l)
    }
    ;
    d.ZC = function(a, b, c, e) {
        a = this.Vd(a, b);
        b = c + ":" + a;
        var f = this.ga++, g;
        b in this.D ? (g = this.D[b],
        g.Eh.push(f),
        g.kd[f] = e) : (g = {
            Eh: [f],
            kd: {},
            cancel: q
        },
        g.kd[f] = e,
        this.D[b] = g,
        e = x(function(a, b, c) {
            delete this.D[b];
            b = 0;
            for (var e = a.Eh.length; b < e; ++b) {
                var f = a.Eh[b];
                if (f in a.kd)
                    a.kd[f](c)
            }
            a.Eh.length = 0;
            a.kd = {}
        }, this, g, b),
        g.cancel = this.p.get(a, null, e, null, {
            "X-GData-Key": "key=AI39si5-UxCbfO2jRg9EV2bWI0UDWm74GkLzZWFHkQR0bm4d0JTKyrhSi6NZORaTMuJaRH8zs0PmsCONB9uV3pSgzZklwvMoRA",
            "X-YouTube-VVT": c
        }));
        return x(function(a, b, c) {
            delete a.kd[b];
            zc(a.kd) && (delete this.D[c],
            a.cancel())
        }, this, g, f, b)
    }
    ;
    d.$z = function(a, b) {
        var c = new th(this.id,b,"RQ");
        c.channel = new sh(this.id,b);
        c.videoId = a;
        c.errorCode = "unknown";
        c.channel.videoId = a;
        return c
    }
    ;
    d.Lr = function(a, b, c) {
        if (0 < a.Y.P()) {
            for (var e = a.Y.la(), f = 0, g = e.length; f < g; ++f) {
                var k = e[f]
                  , l = this.Vd(k.videoId);
                this.X.Ue(l, k);
                c[l] = k
            }
            a.Y.clear()
        }
        f = 0;
        for (g = b.length; f < g; ++f)
            e = b[f],
            l = this.Vd(e),
            l in c ? (k = c[l],
            "notAvailable" != k.errorCode || this.h[e] || (k.errorCode = "private")) : k = this.$z(e, a.serviceQuery),
            e in this.U && (k.w = this.U[e]),
            e in this.h && (k.j = this.h[e]),
            a.Y.push(k);
        a.title = "[[Queued Videos|Title above a list of videos that are queued up to be viewed.]]";
        a.Ya = "icon-playlist"
    }
    ;
    d.createElement = function(a, b) {
        var c = this.g.Qq();
        return c.createElementNS(b || c.documentElement.namespaceURI, a)
    }
    ;
    d.sD = function(a) {
        var b = this.Vd(a)
          , c = this.createElement("entry")
          , e = this.createElement("id");
        this.g.append(e, b);
        var f = this.createElement("batch:id", "http://schemas.google.com/gdata/batch");
        this.g.append(f, a);
        a = this.createElement("link");
        Zk(a, {
            rel: "http://schemas.google.com/g/2005#batch",
            type: "application/atom+xml",
            href: b
        });
        this.g.appendChild(c, e);
        this.g.appendChild(c, f);
        this.g.appendChild(c, a);
        return c
    }
    ;
    d.YC = function(a, b) {
        var c = this.g.Qq().documentElement;
        Be(c);
        var e = this.createElement("id");
        this.g.append(e, a);
        var f = this.createElement("batch:operation", "http://schemas.google.com/gdata/batch");
        Zk(f, {
            type: "query"
        });
        this.g.appendChild(c, e);
        this.g.appendChild(c, f);
        e = 0;
        for (f = b.length; e < f; ++e)
            this.g.appendChild(c, this.sD(b[e]));
        if ("undefined" != typeof XMLSerializer)
            c = (new XMLSerializer).serializeToString(c);
        else if (c = c.xml,
        !c)
            throw Error("Your browser does not support serializing XML documents");
        return '<?xml version="1.0" encoding="UTF-8"?>' + c
    }
    ;
    cl.inject = "id path csiService ytHttp environmentModel authService cacheService backendErrorReporting listType brandable parser opt_paramKey opt_params".split(" ");
    function dl(a, b, c, e, f, g, k, l, n, p, u, r, E, R, ea) {
        K.call(this);
        this.Va = R;
        this.jb = a;
        this.O = b;
        this.Sa = c;
        this.da = e;
        this.b = f;
        this.Aa = g;
        this.pa = k;
        this.va = n;
        this.K = l;
        this.ra = r;
        this.R = p;
        this.p = u;
        this.ja = E;
        this.l = ea;
        this.h = this.w = null;
        this.j = "";
        this.o = null;
        this.U = new vg;
        this.Ba = !1;
        this.A = new vg;
        this.D = this.Wa = "";
        this.k = -1;
        this.ga = 0;
        this.fa = this.Na = null;
        this.$ = this.p.xe ? this.Aa : this.b;
        this.F = this.g = this.X = null;
        this.Ea = this.p.initReversePairingCode;
        this.H = q;
        if (a = a.lb("start_watch") || a.lb("start_dial"))
            this.H = x(a.tick, a);
        this.et();
        this.ht();
        this.p.g && this.Aa.gt(x(function() {
            this.F = new Tk(this,new Rk);
            this.F.$h(this.Yf() || "");
            this.ft();
            this.Nl(this.o)
        }, this));
        this.Zh()
    }
    A(dl, K);
    d = dl.prototype;
    d.et = function() {
        var a = this.da.get("mdx-device-id");
        a || (a = Xk(),
        this.da.ya("mdx-device-id", a));
        this.Wa = a;
        a = new ui({
            id: this.Wa,
            name: this.p.A,
            type: "LOUNGE_SCREEN",
            app: "lb-v4"
        });
        this.g = new Hk(this.da.b,this,this,a,"");
        if (a = this.da.get("mdx-paired-devices", 31536E3))
            this.A.ha(a.map(function(a) {
                return new ui(a)
            })),
            this.Pg(null)
    }
    ;
    d.ht = function() {
        this.ja.C("mdxClearVideo", x(this.Iv, this));
        this.ja.C("mdxPlaylistChange", x(this.Nv, this));
        this.b.C("subtitlesTrackList:changed", x(this.hn, this));
        this.b.C("subtitles:changed", x(this.Mv, this));
        this.b.C("api:changed", x(this.hn, this));
        this.b.C("state:changed", x(this.Cg, this));
        this.b.C("adPlaying:changed", x(this.Gv, this));
        this.b.C("video:changed", x(this.Hv, this));
        this.$.C("volumeData:changed", x(function(a) {
            this.g.Wl(a.volume, a.muted)
        }, this));
        this.C("currentVideoId:changed", x(this.g.gn, this.g));
        this.C("currentPlayerState:changed", x(this.g.Pv, this.g));
        this.C("remote:connected", x(this.Jv, this));
        this.C("remote:disconnected", x(this.Kv, this));
        this.C("remote:status", x(this.Lv, this));
        this.pa.C("currentTime:changed", x(function() {
            var a = this.Dd();
            2 <= Math.abs(this.ga - a) && this.Cg(this.k);
            this.Zh();
            this.ga = a
        }, this));
        this.l.isSupported() && this.l.setSeekCallback(x(this.Ov, this));
        this.va.C("state:changed", x(this.Qv, this))
    }
    ;
    d.xa = function() {
        this.va.zb(x(function(a) {
            this.OH(a)
        }, this))
    }
    ;
    d.ft = function() {
        this.$.C("volumeData:changed", x(function() {
            this.F.xr()
        }, this));
        this.C("currentPlayerState:changed", x(this.F.xr, this.F));
        this.C("currentVideoModel:changed", x(this.Nl, this))
    }
    ;
    d.OA = function() {
        this.g.gn();
        this.g.uD()
    }
    ;
    d.OH = function(a) {
        this.g.nk(a);
        if (!this.Yf() && (a = this.Ea,
        this.Ea = "",
        a || this.g.Hn() || this.A.P() || this.p.additionalDataUrlForDial)) {
            this.bp(a);
            return
        }
        this.bj()
    }
    ;
    d.Qi = function(a) {
        this.g.qD(x(function(b) {
            a && a(b);
            this.bj()
        }, this))
    }
    ;
    d.bj = function() {
        var a = this.Yf() || "";
        this.F && this.F.$h(a);
        if (this.p.additionalDataUrlForDial) {
            var b = decodeURIComponent(this.p.additionalDataUrlForDial);
            b.match(/^https?:\/\/localhost(:\d+)?(\?|\/).*$/) ? a ? this.mq(b, a) : this.g.gj(x(function(a) {
                this.mq(b, a ? a.rb : "")
            }, this)) : console.warn("Given additionalDataUrl with non-localhost domain: " + b)
        }
    }
    ;
    d.mq = function(a, b) {
        this.Va.post(a, null, {
            screenId: b
        });
        this.Va.get($b(a, {
            screenId: b
        }))
    }
    ;
    d.bp = function(a) {
        this.Qi(x(function() {
            a && this.g.rD(a, q)
        }, this))
    }
    ;
    d.Nl = function(a) {
        a ? this.F.Yr({
            content_id: a.videoId,
            title: a.title,
            duration: a.duration,
            thumbnail_url: a.imageUrl
        }) : this.F.Yr()
    }
    ;
    d.Ov = function(a) {
        this.Ei(a / 1E3)
    }
    ;
    d.mF = function() {
        this.da.remove("mdx-paired-devices");
        this.da.flush();
        this.A.clear();
        this.U.clear();
        this.g.Mw();
        this.b.Sg(this.g.Rg());
        this.p.additionalDataUrlForDial || this.g.Hn() ? this.Qi() : this.bj()
    }
    ;
    d.Di = function() {
        this.Gi();
        this.b.yb();
        this.Od(this.nb()) && this.Nd()
    }
    ;
    d.Hm = function() {
        this.b.yb();
        this.b.Ac();
        this.Nd()
    }
    ;
    d.Rl = function() {
        this.b.yb();
        this.b.Xi();
        this.Od("")
    }
    ;
    d.Ei = function(a) {
        this.b.yb();
        var b = this.cf();
        1081 != b && (0 == b || -1 == b ? this.Od(this.nb(), a) && this.Nd() : (this.b.Me(a, !0),
        this.Nd()))
    }
    ;
    d.av = function(a, b, c) {
        this.Gi();
        this.b.yb();
        this.Od(a, c) && this.Nd()
    }
    ;
    d.Im = function(a) {
        this.b.yb();
        this.$.qh(a)
    }
    ;
    d.Hi = function() {
        return this.$.$d()
    }
    ;
    d.isMuted = function() {
        return this.$.isMuted()
    }
    ;
    d.Gm = function() {
        this.b.yb();
        this.$.ph()
    }
    ;
    d.Jm = function() {
        this.b.yb();
        this.$.rh()
    }
    ;
    d.$u = function(a, b) {
        this.b.yb();
        (b.name || b.languageCode) && this.b.rm() ? (this.fa = b,
        this.fa.videoId = a) : (this.fa = null,
        this.b.Dj())
    }
    ;
    d.Ym = function(a) {
        this.p.g && (a ? this.b.Ri(a) : this.b.ox())
    }
    ;
    d.XA = function() {
        var a = null;
        this.p.g && (a = this.b.dm(),
        zc(a) && (a = null));
        return a
    }
    ;
    d.Lm = function() {
        var a = Bc(this.b.Eg());
        return !zc(a) && a || null
    }
    ;
    d.Dd = function() {
        return this.j != this.D || this.b.isPlayingAd ? 0 : 1 == this.k || 2 == this.k || 3 == this.k || 0 == this.k ? this.pa.currentTime : 0
    }
    ;
    d.cf = function() {
        return this.b.isPlayingAd ? 1081 : this.j != this.D ? 3 : -1E3 == this.k ? -1E3 : this.k
    }
    ;
    d.nb = function() {
        return this.j || ""
    }
    ;
    d.yx = function(a, b) {
        this.g.CD(a, b)
    }
    ;
    d.Yf = function() {
        return this.g.BD() || ""
    }
    ;
    d.ey = function() {
        this.g.DD()
    }
    ;
    d.wd = function(a, b) {
        this.H("r_s_vid");
        return a != this.j ? (this.k = (this.j = a) ? 3 : -1,
        this.ga = 0,
        this.fa = null,
        b || this.L("currentVideoId:changed", this.j),
        this.qc(this.pc()),
        !0) : !1
    }
    ;
    d.qm = function(a, b) {
        this.H("r_f");
        this.w && (this.w.model.serviceQuery = "dial");
        this.zi(x(this.g.Gn, this.g), [a], ["fling"], {}, 0, b, !0, !0)
    }
    ;
    d.zi = function(a, b, c, e, f, g, k, l) {
        this.H("r_s_plylst");
        this.b.yb();
        this.X && (this.X(),
        this.X = null);
        if (0 == b.length)
            this.Rl(),
            this.K.Rm([], {}),
            this.w && this.w.load(q),
            this.h = null,
            a([]);
        else {
            this.w || (this.w = new Ua(this.K,"[[YouTube Remote Playlist|Title of playlist created by a user using a remote mobile device (like an Android phone).]]","icon-remote",this.p.initReversePairingCode || l ? "dial" : "mdx"));
            var n = ""
              , p = !1;
            this.h && this.h === this.w || (this.h = this.w,
            p = !0);
            var u = !1;
            if (void 0 === f) {
                var r = this.nb();
                f = r ? b.indexOf(r) : -1;
                p && r && this.R.Ie(this.R.currentVideo, this.h)
            } else
                0 > f ? (this.D = "",
                this.Od("")) : (this.Gi(),
                n = b[f],
                u = this.wd(n, !0) || !!k);
            for (var p = {}, r = 0, E = c.length; r < E; ++r)
                p[b[r]] = c[r];
            0 <= f && this.w.Sc(f);
            e && this.p.enableVideoVerificationTokens && this.K.Wu(e);
            this.K.Rm(b, p);
            u && (this.L("currentVideoId:changed", this.j),
            this.qc(this.pc()));
            this.w.load(x(function() {
                n && n == this.j && (this.qc(this.pc()),
                this.Od(n, g, k, l) && this.Nd());
                a(this.eg())
            }, this))
        }
    }
    ;
    d.th = function(a) {
        if (this.h)
            if (this.h instanceof yg && 0 == this.h.numLoadedPages)
                for (var b = this.h.h, c = 0, e = b.length; c < e && !a(b[c]); ++c)
                    ;
            else
                for (b = this.h.tk().la(),
                c = 0,
                e = b.length; c < e && (b[c]instanceof tg || !a(b[c])); ++c)
                    ;
    }
    ;
    d.Fi = function() {
        var a = [];
        this.h && (this.h.service && this.h.service.id == this.K.id ? a = this.K.Ak() : this.th(function(b) {
            a.push(b.videoId)
        }));
        return a
    }
    ;
    d.Gx = function() {
        var a = [];
        this.h && (this.h.service && this.h.service.id == this.K.id ? a = this.K.RC() : this.th(function(b) {
            b.w ? a.push(b.w) : a.push("lb-" + b.Ha.toLowerCase())
        }));
        return a
    }
    ;
    d.Yu = function(a) {
        this.h ? a(this.eg()) : a([])
    }
    ;
    d.Np = function() {
        var a = "unknown";
        this.b.needsLogin ? a = "needsLogin" : this.o && (this.o.errorCode || (this.o.errorCode = 205 == this.b.errorCode ? "liveNotSupported" : "notAvailable"),
        a = this.o.errorCode);
        return new Gk(this.j,a,"PLAYER_ERROR")
    }
    ;
    d.Gv = function() {
        this.Cg(this.k)
    }
    ;
    d.Cg = function(a) {
        this.D != this.j || !this.j || -1E3 == this.k && -1 == a || (this.ga = this.Dd(),
        this.k = a,
        this.ra.clearTimeout(this.Ma),
        0 == a ? this.wq() : this.Ma = this.ra.setTimeout(x(this.wq, this), 50))
    }
    ;
    d.wq = function() {
        this.Ma = 0;
        if (this.D == this.j) {
            var a = this.cf();
            1 == a && this.o && this.o.errorCode && (this.o.errorCode = null,
            this.g.rn(this.eg()));
            this.Zh();
            this.L("currentPlayerState:changed", a)
        }
    }
    ;
    d.Hv = function() {
        var a = this.R.currentVideo;
        this.ga = (this.D = a = a ? a.videoId : "") ? this.Dd() : 0;
        this.wd(a) || (this.qc(this.pc()),
        this.Cg(this.k))
    }
    ;
    d.Zh = function() {
        if (this.l.isSupported()) {
            var a = this.o
              , b = 0
              , c = 2;
            1 == this.k ? (b = 1,
            c = 3) : 2 == this.k ? (b = 0,
            c = 4) : -1 == this.k && (b = 0,
            c = 1);
            -1 != this.k || this.o || (c = 2);
            2 == c && (a = null);
            var e = "browse" === this.O.mode();
            this.l.status = c;
            this.l.appMediaId = a && a.videoId || "";
            this.l.videoTitle = a && a.title || "";
            this.l.playbackRate = b;
            this.l.minSeekTime = 0;
            this.l.mediaStartTime = 0;
            this.l.mediaEndTime = a ? 1E3 * this.pa.duration : 0;
            this.l.maxSeekTime = e ? 0 : this.l.mediaEndTime;
            this.l.playbackPosition = a ? 1E3 * this.pa.currentTime : 0;
            this.l.sendMediaInfo();
            this.Oj()
        }
    }
    ;
    d.Oj = function() {
        if (this.l.isSupported()) {
            var a = this.b.isPlaying
              , b = this.b.isPlayingAd
              , c = "browse" === this.O.mode()
              , e = {};
            e.PLAY = c ? !1 : !a;
            e.PAUSE = c ? !1 : a;
            e.REWIND = c ? !1 : !b;
            e.FASTFORWARD = c ? !1 : !b;
            e.PREVIOUS = c ? !1 : !b;
            e.NEXT = c ? !1 : !b;
            e.BACK = !0;
            this.l.updateButtonState(e)
        }
    }
    ;
    d.Iv = function() {
        this.D = "";
        this.wd("")
    }
    ;
    d.Nv = function(a) {
        this.fi(a.detail)
    }
    ;
    d.fi = function(a) {
        var b = !1;
        if (!this.h || !this.h.Zi(a)) {
            var c = "";
            c = a && a != this.w ? (b = a.Ln()) ? b.videoId || "" : "" : this.j;
            b = this.wd(c, !0);
            this.D = c;
            this.ga = 0;
            this.X && (this.X(),
            this.X = null);
            a instanceof Q && (this.X = a.C("numLoadedPages:changed", x(this.fi, this, a)))
        }
        c = !(!a.service || a.service.id != this.K.id);
        this.h = a;
        a = this.eg();
        c ? (b && this.L("currentVideoId:changed", this.j),
        a && a.length && this.g.rn(a)) : this.g.Gn(a);
        this.qc(this.pc())
    }
    ;
    d.Qv = function(a, b) {
        if (a) {
            var c = !1;
            this.va.zb(x(function(a) {
                c || (c = !0,
                this.g.nk(a),
                b || this.g.Iq("default", a))
            }, this))
        } else
            this.g.nk(""),
            b && this.g.Iq("", "")
    }
    ;
    d.bn = function(a, b, c, e) {
        this.H("r_rq_ply");
        e && a && this.b.hA();
        this.ja.V("request-playback", {
            data: a,
            Fc: b,
            startTime: c
        })
    }
    ;
    d.xz = function(a, b) {
        this.H("r_a_ply");
        var c = this.R.lw();
        c && c.Ga && c.Ga != this.h.service.id && this.R.Ie(this.R.currentVideo, this.h);
        c = this.b.state;
        if ((0 == c || -1 == c || 2 == c) && this.ln()) {
            this.R.currentVideo = null;
            this.O.state("browse", {});
            this.ja.L("request-close-dialog");
            var e = this.pc()
              , f = this.h;
            this.ra.setTimeout(x(function() {
                e.videoId == this.j && this.bn(e, f, a, b)
            }, this), 250);
            return !0
        }
        if (0 == c)
            return this.b.mw(a || 0),
            !1;
        this.b.Rc();
        void 0 === a || b || this.b.Me(a, !0);
        return !1
    }
    ;
    d.ln = function() {
        return this.O.h
    }
    ;
    d.jh = function() {
        var a = this.O.state();
        return "watch" === a || "play" === a || "pause" === a
    }
    ;
    d.TG = function() {
        return "post-play" == this.O.mode() && this.jh()
    }
    ;
    d.lp = function(a, b, c, e, f) {
        this.H("r_m_ply");
        e && f && (a.b && !a.o || "private" == a.errorCode) && this.p.enableVideoVerificationTokens && !a.j || (this.bn(a, b, c, e),
        this.Sa.bc())
    }
    ;
    d.Od = function(a, b, c, e) {
        this.H("r_p_f");
        if (!a)
            return this.wd("", !0),
            this.L("currentVideoId:changed", ""),
            this.qc(null),
            this.jh() && (this.O.state("browse", {}),
            this.ja.L("request-close-dialog"),
            this.Sa.bc()),
            !1;
        if (!this.h)
            return !1;
        this.wd(a);
        if ((this.jh() || this.ln()) && this.R.currentVideo && this.R.currentVideo.videoId == a)
            return !this.xz(b, c);
        var f = this.pc();
        if (!f) {
            var g = this.h;
            this.w.load(x(function() {
                if (a == this.j && g == this.h) {
                    var f = this.pc();
                    this.qc(f);
                    f ? this.lp(f, g, b, c, e) : console.warn("MDx ensurePlayerFocus failed to load video for playback request: " + a + ", time=" + b)
                }
            }, this));
            return !1
        }
        this.qc(f);
        this.lp(f, this.h, b, c, e);
        return !1
    }
    ;
    d.eg = function() {
        var a = [];
        this.th(function(b) {
            b.errorCode && "limitedSyndication" != b.errorCode && "private" != b.errorCode && a.push(new Gk(b.videoId,b.errorCode,"NOT_PLAYABLE"))
        });
        return a
    }
    ;
    d.pc = function() {
        var a = null
          , b = this.j;
        this.th(function(c) {
            if (c.videoId == b)
                return a = c,
                !0
        });
        return a
    }
    ;
    d.qc = function(a) {
        this.H("r_u_v");
        this.o && a && this.o.videoId == a.videoId || !this.o && !a || (this.o = a,
        this.L("currentVideoModel:changed", a))
    }
    ;
    d.Nd = function() {
        !this.jh() || this.O.mode() && !this.TG() || this.O.mode("transport")
    }
    ;
    d.Pg = function(a) {
        if (a) {
            var b = new ui(a.vp());
            a = b.id.indexOf("#");
            0 < a && (b.id = b.id.substr(0, a));
            var c = !1;
            a = this.A.la();
            this.A.ha(a.map(function(a) {
                return a.id == b.id ? (c = !0,
                b) : a
            }));
            c || (this.A.unshift(b),
            this.da.ya("mdx-paired-devices", this.A.la().map(function(a) {
                return a.vp()
            }), 31536E3),
            this.da.flush())
        }
        this.A.Sz(function(a, b) {
            var c = (a.b ? 0 : 1) - (b.b ? 0 : 1);
            if (0 != c)
                return c;
            var c = (new vi(a)).displayString
              , k = (new vi(b)).displayString;
            return Ya(c, k)
        })
    }
    ;
    d.Lv = function(a) {
        for (var b = this.A.la(), c = 0, e = b.length; c < e; ++c) {
            var f = b[c];
            f.b = !1
        }
        this.U.ha(a);
        a = this.U.la();
        c = 0;
        for (e = a.length; c < e; ++c)
            f = a[c],
            f.b = !0,
            this.Pg(f);
        this.b.Sg(this.g.Rg());
        this.L("pairing:changed")
    }
    ;
    d.Jv = function(a) {
        var b = this.U.la().filter(function(b) {
            return b.id != a.id
        });
        a.b = !0;
        b.unshift(a);
        this.U.ha(b);
        this.Pg(a);
        this.b.Sg(this.g.Rg());
        this.L("pairing:changed")
    }
    ;
    d.Kv = function(a) {
        this.U.ha(this.U.la().filter(function(b) {
            return b.id != a.id
        }));
        for (var b = this.A.la(), c = 0, e = b.length; c < e; ++c) {
            var f = b[c];
            f.id == a.id && (f.b = !1)
        }
        this.Pg(null);
        this.b.Sg(this.g.Rg());
        this.L("pairing:changed")
    }
    ;
    d.Mv = function() {
        if (this.j && this.j == this.D) {
            var a = this.Lm();
            !a || a.name || a.languageCode || (a = null);
            this.zn(this.Na, a) || (this.Na = a,
            this.g.Mm(this.j, a))
        }
    }
    ;
    d.zn = function(a, b) {
        return a && b ? a.id && b.id && a.id == b.id ? !0 : (!a.type || !b.type || a.type === b.type) && (!a.format || !b.format || a.format === b.format) && (!a.name || !b.name || a.name === b.name) && a.languageCode === b.languageCode : !a == !b
    }
    ;
    d.hn = function() {
        var a = this.fa;
        this.fa = null;
        if (a && a.videoId && a.videoId == this.nb()) {
            for (var b = this.b.On(), c = !1, e = 0, f = b.length; e < f; ++e)
                if (this.zn(b[e], a)) {
                    this.b.Jo(b[e]);
                    c = !0;
                    break
                }
            c || this.b.Dj()
        }
    }
    ;
    d.Zf = function() {
        return this.U
    }
    ;
    d.$f = function() {
        return this.A
    }
    ;
    d.Gi = function() {
        this.Ba || (this.Ba = !0,
        this.jb.Wc("start_dial", "rply_rqd"))
    }
    ;
    dl.inject = "csiService locationService angularHelper localStorage playerFacade eurekaService progressModel remoteQueueService authService watchModel environmentModel timeService rootDispatcher ytHttp remoteApi".split(" ");
    var el = angular.module("yt.tv.localization", ["ng"]);
    el.service("locale", Yd);
    el.service("messages", md);
    el.service("timeService", Xd);
    el.value("applicationPath", "");
    function fl(a, b, c, e) {
        this.name = "pair";
        T.call(this);
        this.k = b;
        this.l = a;
        this.D = this.h = 0;
        this.A = !0;
        this.context = "pair";
        this.j = !1;
        this.displayPairingCode = this.H = e.S("[[Loading...|Tooltip displaying while connecting a mobile device with the application.]]");
        this.qrCodeImageUrl = "";
        this.O = this.p = this.w = this.o = null;
        this.connectedDevices = new vg;
        this.aa(this.k.Zf(), "items:changed", x(this.nn, this))
    }
    A(fl, T);
    d = fl.prototype;
    d.wa = function() {
        fl.B.wa.call(this);
        this.w = this.G.querySelector(".dial-upsell");
        this.p = this.G.querySelector(".connection-steps");
        this.O = this.G.querySelector(".qr-code-wrapper");
        this.o = this.G.querySelector(".connected-list")
    }
    ;
    d.ready = function() {
        fl.B.ready.call(this);
        this.nn()
    }
    ;
    d.ba = function() {
        fl.B.ba.call(this);
        0 != this.h && (this.l.clearTimeout(this.h),
        this.h = 0)
    }
    ;
    d.Z = function() {
        this.D = 0;
        this.k.Qi(x(function() {
            this.po()
        }, this))
    }
    ;
    d.N = function(a) {
        fl.B.N.call(this, a);
        this.Fb(this.w, this.j);
        this.Fb(this.p, !this.j);
        this.Fb(this.O, !this.j)
    }
    ;
    d.xx = function(a) {
        return a.match(/.../g).join(" ")
    }
    ;
    d.po = function() {
        this.displayPairingCode = this.H;
        this.qrCodeImageUrl = "";
        this.N();
        this.h && (this.l.clearTimeout(this.h),
        this.h = 0);
        if (this.A && 4 < ++this.D)
            this.V("request-close-dialog");
        else if (!this.j) {
            var a = this.context;
            0 < this.k.$f().P() && (a += "-ytr");
            this.h = this.l.setTimeout(x(this.po, this), 3E5);
            this.k.yx(a, x(function(a) {
                this.displayPairingCode = this.xx(a);
                this.qrCodeImageUrl = "http://chart.apis.google.com/chart?cht=qr&chs=350x350&chl=http%3A%2F%2Fm.youtube.com%2Fpair%3FpairingCode%3D" + a;
                this.N()
            }, this))
        }
    }
    ;
    d.nn = function() {
        var a = this.k.Zf().la();
        this.Fb(this.o, 0 < a.length);
        this.connectedDevices.clear();
        for (var b = 0, c = a.length; b < c; ++b)
            this.connectedDevices.push(new vi(a[b]));
        this.N()
    }
    ;
    fl.inject = ["timeService", "remoteService", "environmentModel", "locale"];
    function gl(a, b, c) {
        Jh.call(this);
        this.h = a;
        this.g = b;
        this.j = c;
        this.b = !1
    }
    A(gl, Jh);
    gl.prototype.load = function() {
        this.clear();
        var a = new yg(this.h,this.g.gg().model.title,"",this.g.currentVideo.videoId);
        a.cb = "postPlayTile";
        a.model.Y.C("items:changed", x(function() {
            this.b = !0
        }, this));
        var b = this.g.li();
        b && a.j(b);
        a.p(3);
        this.rows.push(a)
    }
    ;
    gl.inject = ["relatedVideosService", "watchModel", "environmentModel"];
    function Y(a, b, c) {
        this.b = a;
        this.D = b;
        this.A = null;
        this.$ = c || null
    }
    Y.prototype.X = function(a) {
        return a ? (a = this.b.Uo(a),
        !!a && 100 * Math.random() < a) : !0
    }
    ;
    Y.prototype.Vj = function() {
        null === this.A && (this.A = this.X(this.$));
        return this.A
    }
    ;
    Y.prototype.h = function(a, b, c, e) {
        this.Vj() && this.D.DG(a, b, c, e)
    }
    ;
    function hl(a, b, c) {
        Y.call(this, a, b, "post_play_sw");
        this.j = c
    }
    A(hl, Y);
    hl.prototype.l = function() {
        this.g = this.j.Wb()
    }
    ;
    hl.prototype.k = function(a, b, c) {
        this.g && (this.h("/gen_204", this.o(a, b, c)),
        this.g = null)
    }
    ;
    hl.prototype.o = function(a, b, c) {
        var e = il
          , f = {
            a: "tv_postplay"
        };
        f[e.Jw] = a;
        f[e.Hw] = b;
        c && (f[e.Iw] = c);
        f.t = ((this.j.Wb() - this.g) / 1E3).toFixed(1);
        f.e = this.b.Ne();
        y(f, this.b.Ub());
        return f
    }
    ;
    var il = {
        Hw: "v",
        Iw: "next",
        Jw: "outcome"
    };
    hl.inject = ["environmentModel", "privateDataService", "timeService"];
    function jl(a, b, c, e, f, g, k, l, n) {
        gi.call(this, a, b);
        this.o = c;
        this.h = e;
        this.H = f;
        this.D = g;
        this.A = k;
        this.ga = l;
        this.$ = n;
        this.countdown = this.X = this.O = null;
        this.l = -1;
        this.j = !1;
        this.k = x(this.Le, this);
        this.Sw()
    }
    A(jl, gi);
    d = jl.prototype;
    d.wa = function() {
        jl.B.wa.call(this);
        this.O = this.G.querySelector(".default-title");
        this.X = this.G.querySelector(".next-up-title");
        this.C("keydown", x(this.tF, this));
        this.C("request-playback", x(this.fa, this))
    }
    ;
    d.T = function() {
        this.A.removeEventListener("mousemove", this.k, !1);
        this.o.ih(this.l);
        jl.B.T.call(this)
    }
    ;
    d.ea = function(a) {
        jl.B.ea.call(this, a);
        this.sv() && (this.h.b = !1,
        this.Le(),
        this.countdown = this.$.ul,
        this.l = this.o.ni(x(this.tv, this), 1E3),
        this.j = !0);
        this.N(!0)
    }
    ;
    d.sv = function() {
        var a = this.h.Xb();
        return !!a && !!this.model && a.ia(0) == this.model && a.h.length && this.h.b
    }
    ;
    d.Hk = function(a, b) {
        this.children[0].Hk(a, b)
    }
    ;
    d.Sw = function() {
        this.A.addEventListener("mousemove", this.k, !1);
        this.aa(this.ga, "engage-change", this.k)
    }
    ;
    d.tF = function(a) {
        this.Le();
        switch (a.keyCode) {
        case 8:
        case 27:
            this.D.k("back", this.H.currentVideo.videoId)
        }
    }
    ;
    d.Le = function() {
        this.j && (this.j = !1,
        this.o.ih(this.l),
        this.N())
    }
    ;
    d.tv = function() {
        this.model ? (--this.countdown,
        0 === this.countdown ? (this.Le(),
        this.V("request-playback", {
            data: this.model,
            $c: !0
        })) : this.N()) : this.Le()
    }
    ;
    jl.prototype.getRowTitle = function() {
        var a = this.h.Xb();
        return this.p.S(a && a.model.title || "")
    }
    ;
    jl.prototype.fa = function() {
        var a = this.model, b;
        0 === this.countdown ? b = "timeout" : (b = ac(this.h.Xb().model.Y.la(), a),
        b = be("play{n}", {
            n: b + 1
        }));
        this.D.k(b, this.H.currentVideo.videoId, a.videoId)
    }
    ;
    jl.prototype.vb = function() {
        var a = jl.B.vb.call(this);
        this.j && a.push("countdown-active");
        this.h.Xb().h.length || a.push("last-video");
        return a
    }
    ;
    jl.inject = "locale voiceHelper timeService postPlayModel watchModel postPlayReportingService document rootDispatcher environmentModel".split(" ");
    function kl(a, b) {
        T.call(this);
        this.h = a;
        this.j = b;
        this.k = this.l = 0;
        this.o = !1
    }
    A(kl, T);
    kl.prototype.w = function() {
        this.k = this.h.percentageLoaded;
        this.l = this.h.percentagePlayed;
        this.To(this.j.isPlayingAd);
        this.Wy()
    }
    ;
    kl.prototype.p = function() {
        this.pf()
    }
    ;
    kl.prototype.getLoadedWidth = function() {
        return ae(this.k)
    }
    ;
    kl.prototype.getPlayedWidth = function() {
        return ae(this.l)
    }
    ;
    kl.prototype.getRootClassName = function() {
        return this.o ? "ad-active" : ""
    }
    ;
    d = kl.prototype;
    d.Wy = function() {
        this.pf();
        this.aa(this.j, "isPlayingAd:changed", x(this.To, this));
        this.aa(this.h, "percentageLoaded:changed", x(this.pB, this));
        this.aa(this.h, "percentagePlayed:changed", x(this.qB, this));
        this.C("keyup", x(this.rB, this))
    }
    ;
    d.pB = function(a) {
        this.k = a;
        this.N()
    }
    ;
    d.qB = function(a) {
        this.l = a;
        this.N()
    }
    ;
    d.To = function(a) {
        this.o = a;
        this.N()
    }
    ;
    d.rB = function(a) {
        S(a);
        if (!this.j.isPlayingAd) {
            a = a.g;
            var b = this.G
              , c = 0
              , e = 0;
            a instanceof MouseEvent ? (c = b.offsetWidth,
            e = a.offsetX) : (b = b.getBoundingClientRect(),
            c = b.width,
            e = a.changedTouches[0].pageX - b.left);
            this.j.Me(e / c * this.h.duration, !0)
        }
    }
    ;
    kl.inject = ["progressModel", "playerFacade"];
    function ll() {
        T.call(this);
        this.model = null;
        this.qrCodeImageUrl = this.displayUrl = ""
    }
    A(ll, T);
    ll.prototype.ea = function(a) {
        ll.B.ea.call(this, a);
        this.displayUrl = this.model.baseUrl;
        this.qrCodeImageUrl = this.h()
    }
    ;
    ll.prototype.h = function() {
        return "http://chart.apis.google.com/chart?cht=qr&chs=350x350&chl=" + encodeURIComponent(this.model.qrCodeUrl || this.model.baseUrl)
    }
    ;
    function ml(a) {
        T.call(this);
        this.k = a;
        this.h = this.j = null
    }
    A(ml, T);
    d = ml.prototype;
    d.wa = function() {
        ml.B.wa.call(this);
        this.C("keydown", x(this.dA, this));
        this.j = this.G.querySelector(".handle");
        this.h = this.G.querySelector(".scrolling-text")
    }
    ;
    d.ea = function(a) {
        ml.B.ea.call(this, a);
        if (a = a.detail[0].templateUrl)
            this.h.innerHTML = "",
            this.k.get(a, null, x(function(a) {
                this.h.innerHTML = a
            }, this))
    }
    ;
    d.dA = function(a) {
        switch (a.keyCode) {
        case 40:
            this.Us(1);
            break;
        case 38:
            this.Us(-1)
        }
    }
    ;
    d.Us = function(a) {
        this.mJ(a);
        this.lJ()
    }
    ;
    d.mJ = function(a) {
        var b = Math.min(this.h.scrollHeight / 100, 0.5 * this.h.offsetHeight);
        this.h.scrollTop += a * b
    }
    ;
    d.lJ = function() {
        var a = this.h.scrollHeight - this.h.offsetHeight;
        this.j.style.top = Math.floor(0.01 * (this.G.offsetHeight - this.j.offsetHeight) * (0 == a ? 0 : 100 * this.h.scrollTop / a)) + "px"
    }
    ;
    ml.inject = ["ytHttp"];
    function Ei(a, b) {
        T.call(this);
        this.h = a;
        this.b = b;
        this.model = null;
        this.b.Qb(this)
    }
    A(Ei, T);
    d = Ei.prototype;
    d.ready = function() {
        this.onEnter || (this.onEnter = x(this.Hh, this))
    }
    ;
    d.show = function() {
        Ei.B.show.call(this);
        this.sb()
    }
    ;
    d.ma = function() {
        Ei.B.ma.call(this);
        this.Ua()
    }
    ;
    d.ea = function(a) {
        Ei.B.ea.call(this, a);
        this.model && (this.model.label = this.h.S(this.model.label),
        this.Jc("enabled:changed", x(this.yk, this)));
        this.yk()
    }
    ;
    d.yk = function() {
        this.b.ff();
        this.model && this.model.label && this.model.isSpeakable && this.model.enabled && this.b.$a(this.model.label, x(this.NA, this))
    }
    ;
    d.NA = function() {
        this.G && this.Hh()
    }
    ;
    d.Hh = function(a) {
        a && S(a);
        this.Fr() || this.V("button-enter", this.model)
    }
    ;
    d.Fr = function() {
        return !!this.model && !this.model.enabled
    }
    ;
    d.vb = function() {
        var a = Ei.B.vb.call(this);
        this.Fr() && a.push("disabled");
        this.model && this.model.buttonClass && a.push(this.model.buttonClass);
        return a
    }
    ;
    Ei.inject = ["locale", "voiceHelper"];
    function nl(a, b) {
        Ei.call(this, a, b)
    }
    A(nl, Ei);
    nl.prototype.ea = function(a) {
        nl.B.ea.call(this, a);
        this.model && this.model.subtitle && (this.model.subtitle = this.h.S(this.model.subtitle))
    }
    ;
    nl.inject = ["locale", "voiceHelper"];
    function ol(a, b, c, e, f, g, k, l, n, p) {
        Df.call(this, l, n, a, b, c, e, f, k, p, {
            client: "youtube",
            ds: "yt",
            hl: g.b
        })
    }
    A(ol, Df);
    ol.prototype.load = function(a, b) {
        var c = []
          , e = {};
        y(e, this.l);
        a && y(e, this.yF("query", "q", a));
        this.pk();
        var f = this.lc()
          , e = this.p.jsonp(f, e, x(function(a) {
            this.Rj();
            a = a[1];
            for (var e = 0, f = a.length; e < f; ++e)
                c.push(a[e][0]);
            this.uk();
            b && b(c)
        }, this));
        return new ee(c,e)
    }
    ;
    ol.prototype.vf = function() {
        return "c1"
    }
    ;
    ol.prototype.qe = function() {
        return "https://clients1.google.com"
    }
    ;
    ol.inject = "csiService ytHttp environmentModel cacheService backendErrorReporting locale videoParser id path paramKey".split(" ");
    function pl(a) {
        K.call(this);
        this.g = a;
        this.suggestions = new Yh;
        this.b = null
    }
    A(pl, K);
    pl.prototype.update = function(a) {
        this.b && (this.b(),
        this.b = null);
        a ? this.b = this.g.load({
            query: a
        }, x(function(a) {
            this.suggestions.clear();
            this.suggestions.push(a)
        }, this)).cancel : this.suggestions.clear()
    }
    ;
    pl.inject = ["suggestionService"];
    function ql(a) {
        T.call(this);
        this.model = a;
        this.h = null
    }
    A(ql, T);
    d = ql.prototype;
    d.wa = function() {
        this.C("keyup", x(this.BG, this))
    }
    ;
    d.ready = function() {
        this.h = this.tc(0)
    }
    ;
    d.Z = function() {
        ql.B.Z.call(this);
        this.h.Z()
    }
    ;
    d.ba = function() {
        this.h.ba();
        ql.B.ba.call(this)
    }
    ;
    d.update = function(a) {
        this.model.update(a)
    }
    ;
    d.BG = function(a) {
        13 == a.keyCode && 0 <= this.model.suggestions.La() && (a.stopPropagation(),
        this.V("suggest", this.model.suggestions.mc()))
    }
    ;
    ql.inject = ["suggestionsModel"];
    function rl(a, b) {
        K.call(this);
        this.id = a;
        this.cb = b;
        this.isBeingRemoved = !1
    }
    A(rl, K);
    Xc(rl, ["isBeingRemoved"]);
    function sl(a, b) {
        rl.call(this, a, "deviceToast");
        this.eo = b
    }
    A(sl, rl);
    function tl(a, b) {
        rl.call(this, "volumeToastId", "volumeToast");
        this.volume = a;
        this.isMuted = b
    }
    A(tl, rl);
    function ul(a, b, c, e, f) {
        T.call(this);
        this.j = a;
        this.l = b;
        this.o = c;
        this.k = e;
        this.p = f;
        this.h = {};
        this.model = new Xh
    }
    A(ul, T);
    d = ul.prototype;
    d.ready = function() {
        this.l.g || this.aa(this.o, "volumeData:changed", x(this.Zy, this));
        this.aa(this.k, "remote:connected", x(this.ap, this));
        this.aa(this.k, "remote:disconnected", x(this.ap, this))
    }
    ;
    d.Zy = function(a, b) {
        var c = -1 == b.volume
          , e = Number(a.volume)
          , f = !fa(e) || isNaN(e) || 0 > e || 100 < e;
        c || f || (this.rk("volumeToastId"),
        c = new tl(e,a.muted),
        this.Ds(c, 7500),
        this.model.unshift(c))
    }
    ;
    d.Ds = function(a, b) {
        this.h[a.id] = this.j.setTimeout(x(this.AB, this, a), b)
    }
    ;
    d.QG = function(a) {
        this.j.clearTimeout(this.h[a.id]);
        delete this.h[a.id]
    }
    ;
    d.ap = function(a, b) {
        if (b) {
            this.rk(a.id);
            var c = new sl(a.id,a);
            this.Ds(c, 5E3);
            this.model.push(c)
        }
    }
    ;
    d.AB = function(a) {
        a.isBeingRemoved = !0;
        this.h[a.id] = this.j.setTimeout(x(this.rk, this, a.id), 700)
    }
    ;
    d.rk = function(a) {
        for (var b = 0, c = this.model.P(); b < c; ++b) {
            var e = this.model.ia(b);
            if (e.id === a) {
                this.QG(e);
                this.model.splice(b, 1);
                break
            }
        }
    }
    ;
    ul.inject = ["timeService", "environmentModel", "playerFacade", "remoteService", "injector"];
    function vl(a, b, c, e) {
        T.call(this);
        this.l = b;
        this.p = a;
        this.k = 0;
        this.h = "";
        this.w = c;
        this.o = e;
        this.langCodePair = null;
        this.transliterations = new Yh;
        this.j = null
    }
    A(vl, T);
    d = vl.prototype;
    d.xa = function() {
        this.w.CF() && this.aa(this.l, "query:changed", x(this.DF, this))
    }
    ;
    d.wa = function() {
        this.C("button-enter", x(this.AG, this))
    }
    ;
    d.ready = function() {
        this.g = this.children[0]
    }
    ;
    d.DF = function(a) {
        this.k && this.o.clearTimeout(this.k);
        a && a != this.h ? (this.h = a,
        this.k = this.o.setTimeout(x(this.uB, this), 500)) : (this.h = "",
        this.Wj())
    }
    ;
    d.uB = function() {
        this.j && (this.j(),
        this.j = null);
        this.j = this.p.g(this.h, this.langCodePair, x(this.Sx, this))
    }
    ;
    d.Sx = function(a) {
        if (this.h) {
            for (var b = [], c = 0, e = a.length; c < e; ++c)
                b.push(new U(a[c]));
            this.transliterations.ha(b)
        } else
            this.Wj()
    }
    ;
    d.Wj = function() {
        this.transliterations.clear()
    }
    ;
    d.AG = function(a) {
        var b = a.detail.label;
        this.h = b;
        this.l.Ab(b);
        this.Wj();
        this.V("transliteration-selected");
        S(a)
    }
    ;
    d.T = function() {
        this.j = null;
        vl.B.T.call(this)
    }
    ;
    vl.inject = ["transliterationService", "searchQueryModel", "locale", "timeService"];
    function wl() {
        K.call(this);
        this.b = {}
    }
    A(wl, K);
    wl.prototype.Aq = function(a, b) {
        this.b[a] = !!b;
        this.L("subscription:added")
    }
    ;
    wl.prototype.clear = function() {
        this.b = {}
    }
    ;
    wl.prototype.h = function() {
        for (var a in this.b)
            if (!this.b[a])
                return !0;
        return !1
    }
    ;
    wl.prototype.g = function(a) {
        return void 0 !== this.b[a]
    }
    ;
    function xl(a, b, c, e, f, g, k) {
        U.call(this, "", g, e, "toggleButton", c, k);
        this.selected = !!f;
        this.ah = a || "";
        this.pj = b || this.ah || "";
        this.g()
    }
    A(xl, U);
    xl.prototype.toggle = function() {
        this.selected = !this.selected;
        this.g()
    }
    ;
    xl.prototype.b = function(a) {
        a != this.selected && (this.selected = a,
        this.g())
    }
    ;
    xl.prototype.g = function() {
        this.label = this.selected ? this.ah : this.pj;
        this.L("toggle:changed")
    }
    ;
    function yl(a) {
        this.h = a;
        this.b = {};
        this.g = []
    }
    yl.prototype.get = function(a) {
        return this.b[a]
    }
    ;
    yl.prototype.Bb = function() {
        return this.g
    }
    ;
    yl.prototype.add = function(a, b) {
        var c = this.get(a);
        this.b[a] = b;
        !c && this.g.push(a) > this.h && (c = this.g.shift(),
        delete this.b[c])
    }
    ;
    function zl(a) {
        K.call(this);
        this.g = a;
        this.b = {};
        this.by()
    }
    A(zl, K);
    d = zl.prototype;
    d.by = function() {
        for (var a in na)
            this.Bk(na[a])
    }
    ;
    d.Bk = function(a) {
        var b = this.g.Zx(a);
        this.b[a] = new yl(b)
    }
    ;
    d.get = function(a, b) {
        return this.b[a] && this.b[a].get(b)
    }
    ;
    d.sQ = function(a) {
        return this.b[a] && this.b[a].Bb()
    }
    ;
    d.add = function(a, b, c) {
        this.b[a] && (this.b[a].add(b, c),
        this.L("cache:changed", a))
    }
    ;
    d.pP = function(a, b) {
        if (this.b[a]) {
            for (var c in b)
                this.b[a].add(c, b[c]);
            this.L("cache:changed", a)
        }
    }
    ;
    zl.inject = ["environmentModel"];
    function Al(a, b, c, e, f, g, k, l, n, p) {
        T.call(this);
        this.h = a;
        this.O = b;
        this.j = c;
        this.l = e;
        this.Ea = f;
        this.jb = g;
        this.Va = k;
        this.nc = l;
        this.totalTime = this.elapsedTime = "";
        this.$ = this.ga = this.D = this.o = this.X = null;
        this.buttonCollection = new Yh;
        this.Aa = new U(this.h.S("[[skip backward|Voice command skip back to previous video.]]"),void 0,this.mv,"transport-button","icon-player-prev");
        this.Ba = new U(this.h.S("[[rewind|Voice command to jump the video backward.]]"),void 0,this.nv,"transport-button","icon-player-rew");
        this.va = new xl(this.h.S("[[pause|Voice command to pause the video.]]"),this.h.S("[[play|Voice command to play the video]]"),"icon-player-play",this.lv);
        this.fa = new U(this.h.S("[[forward|Voice command to jump the video forward.]]"),void 0,this.hv,"transport-button","icon-player-ff");
        this.pa = new U(this.h.S("[[skip forward|Voice command to skip to the next video.]]"),void 0,this.kv,"transport-button","icon-player-next");
        this.A = new xl(this.h.S("[[captions|Voice command choose the state of closed captions.]]"),void 0,"icon-player-closed-captions",this.fv);
        a = this.h.S("[[more actions|Voice command to show the other set of actions.]]");
        this.ra = [new U(a,void 0,this.pv,"transport-button","icon-player-more"), this.Aa, this.Ba, this.va, this.fa, this.pa, this.A];
        this.buttonCollection.ha(this.ra);
        this.H = new xl(this.h.S("[[subscribe|Voice command to subscribe to the video's channel]]"),void 0,"icon-subscribe",this.qv);
        this.w = new xl(this.h.S('[[like|Voice command to "like" the video.]]'),void 0,"icon-like",this.jv);
        this.p = new xl(this.h.S('[[dislike|Voice command to "dislike" the video.]]'),void 0,"icon-dislike",this.gv);
        this.ja = new U(this.h.S("[[flag|Voice command to flag the video.]]"),void 0,this.iv,"transport-button","icon-flag");
        this.Ma = new U(this.h.S("[[search|Voice command to go to the search page.]]"),void 0,this.ov,"transport-button","icon-search");
        b = new U("",void 0,void 0,"transport-button","spacer",!1);
        b.enabled = !1;
        this.Sa = [new U(a,void 0,this.ym,"transport-button","icon-player-less"), this.H, this.w, this.p, this.ja, this.Ma, b];
        p.isSupported() && this.aa(n, "engage-change", x(this.rv, this));
        this.k = null
    }
    A(Al, T);
    d = Al.prototype;
    d.ready = function() {
        this.ga = this.G.querySelector(".player-controls");
        this.X = this.Lg("progress-bar");
        this.o = this.Lg("button-list");
        this.C("button-enter", x(this.kF, this));
        this.aa(this.buttonCollection, "selectedIndex:changed", x(this.Kj, this));
        this.C("keyup", x(this.lF, this))
    }
    ;
    d.Z = function() {
        this.isActive ? this.focus() : (Al.B.Z.call(this),
        this.k = [],
        this.k.push(this.aa(this.j, "isPlaying:changed", x(this.pp, this))),
        this.k.push(this.aa(this.j, "state:changed", x(this.op, this))),
        this.k.push(this.aa(this.O, "duration:changed", x(this.np, this))),
        this.k.push(this.aa(this.O, "currentTime:changed", x(this.mp, this))),
        this.mp(this.O.currentTime),
        this.np(this.O.duration),
        this.ym(),
        this.buttonCollection.na(3),
        this.X.w(),
        this.o.Z(),
        this.pp(this.j.isPlaying),
        this.op(),
        this.Yo(),
        this.V("transport-activated"))
    }
    ;
    d.ba = function() {
        if (this.isActive) {
            Al.B.ba.call(this);
            for (var a = 0, b = this.k.length; a < b; ++a)
                this.k[a]();
            this.k = null;
            this.X.p();
            this.Yo();
            this.V("transport-deactivated")
        }
    }
    ;
    d.pp = function(a) {
        this.va.b(a);
        a && this.Kj()
    }
    ;
    d.rv = function(a) {
        a.detail ? this.Z() : this.ba()
    }
    ;
    d.lF = function(a) {
        switch (a.keyCode) {
        case 37:
        case 39:
            S(a)
        }
    }
    ;
    d.mp = function(a) {
        this.elapsedTime = this.h.Gg(a);
        this.N()
    }
    ;
    d.np = function(a) {
        this.totalTime = this.h.Gg(a);
        this.N()
    }
    ;
    d.kF = function(a) {
        this.Kj();
        a && a.detail.payload && a.detail.payload.call(this)
    }
    ;
    d.VG = function() {
        this.j.isPlaying && this.ba()
    }
    ;
    d.Kj = function() {
        this.$ && this.Ea.clearTimeout(this.$);
        this.$ = this.Ea.setTimeout(x(this.VG, this), 3E3)
    }
    ;
    d.Yo = function() {
        if (this.D = this.D || pe("html5-video-controls")) {
            var a = this.ga.getBoundingClientRect()
              , b = "2em";
            a.top && (b = Math.round(ve(window) - a.top) + "px");
            Ig(this.D, "bottom", b)
        }
    }
    ;
    d.op = function() {
        var a = this.j.oA();
        this.Aa.enabled = a;
        this.Ba.enabled = a;
        this.fa.enabled = a;
        this.pa.enabled = a;
        this.A.enabled = a;
        this.H.enabled = a;
        this.w.enabled = a;
        this.p.enabled = a;
        this.ja.enabled = a;
        this.pA();
        this.o.N(!0)
    }
    ;
    d.pA = function() {
        var a = this.j.yy();
        this.A.enabled = a;
        this.A.b(a && !zc(this.j.Eg()))
    }
    ;
    d.jz = function() {
        this.l.currentVideo && (this.w.b(this.Hj()),
        this.p.b(this.Gj()))
    }
    ;
    d.pv = function() {
        this.jz();
        this.H.b(this.Ko());
        this.buttonCollection.ha(this.Sa);
        this.o.N(!0)
    }
    ;
    d.ym = function() {
        this.buttonCollection.ha(this.ra);
        this.o.N(!0)
    }
    ;
    d.mv = function() {
        this.ba();
        this.V("previous-video")
    }
    ;
    d.nv = function() {
        this.j.yh(-10)
    }
    ;
    d.lv = function() {
        this.j.Nj()
    }
    ;
    d.hv = function() {
        this.j.yh(10)
    }
    ;
    d.kv = function() {
        this.ba();
        this.V("next-video")
    }
    ;
    d.fv = function() {
        this.j.Ac();
        this.V("request-cc-options")
    }
    ;
    d.qv = function() {
        this.H.b(!0);
        !this.Ko() && this.l.currentVideo && this.V("request-toggle-subscription", this.l.currentVideo.channel)
    }
    ;
    d.Ko = function() {
        var a = this.l.currentVideo;
        return this.nc.g(a && a.channel ? a.channel.username : "")
    }
    ;
    d.jv = function() {
        this.w.b(!0);
        this.Hj() || (this.p.b(!1),
        this.ip(!0))
    }
    ;
    d.gv = function() {
        this.p.b(!0);
        this.Gj() || (this.w.b(!1),
        this.ip(!1))
    }
    ;
    d.ip = function(a) {
        a && this.Hj() || !a && this.Gj() || this.l.currentVideo && this.V("request-like-video", {
            videoId: this.l.currentVideo.videoId,
            PE: a ? "like" : "dislike"
        })
    }
    ;
    d.iv = function() {
        this.j.Ac();
        this.V("request-flag-options")
    }
    ;
    d.ov = function() {
        this.V("request-search")
    }
    ;
    d.Hj = function() {
        return this.Os("like")
    }
    ;
    d.Gj = function() {
        return this.Os("dislike")
    }
    ;
    d.Os = function(a) {
        var b = this.l.currentVideo && this.l.currentVideo.videoId;
        return !!b && this.Va.get("video_like_value", b) == a
    }
    ;
    Al.inject = "locale progressModel playerFacade watchModel timeService locationService cacheService subscriptionsModel rootDispatcher speechApi".split(" ");
    function Bl(a, b) {
        this.imageUrl = "";
        this.Ga = a;
        this.serviceQuery = b;
        this.videoId = this.title = "";
        this.g = [];
        this.videoString = this.videoCount = this.h = this.id = this.Vc = "";
        this.di = "request-playlist-playback";
        this.channel = null;
        this.videoPosition = this.firstVideoTitle = "";
        this.cb = "playlistTile"
    }
    ;function Cl(a, b) {
        gi.call(this, a, b);
        this.A = new Hh;
        this.o = "";
        this.model = this.j = this.l = this.k = this.h = null
    }
    A(Cl, gi);
    Cl.prototype.T = function() {
        this.A = null;
        Cl.B.T.call(this)
    }
    ;
    Cl.prototype.wa = function() {
        Cl.B.wa.call(this);
        this.h = this.G.querySelector(".video-thumb");
        this.k = this.G.querySelector(".details");
        this.j = this.G.querySelector(".activity");
        this.l = this.G.querySelector(".duration")
    }
    ;
    Cl.prototype.ea = function(a) {
        Cl.B.ea.call(this, a);
        this.model && !this.model.Om && (a = this.model.channel.Qa == this.model.channel.serviceQuery ? this.model.ii || this.model.channel.displayName : this.p.S(this.model.activityDescription),
        this.model.activityDescription = a,
        this.model.Om = !0,
        this.model.activityDescription = this.model.activityDescription.replace("{{username}}", this.model.ii || this.model.channel.displayName))
    }
    ;
    Cl.prototype.N = function(a) {
        Cl.B.N.call(this, a);
        this.Fb(this.G, !!this.model);
        this.model && (this.model instanceof th && (this.Fb(this.l, !!this.model.durationLabel),
        this.Fb(this.j, !!this.model.activityDescription)),
        a = this.model.cg || this.model.channel.imageUrl,
        Ig(this.k, "background-image", a ? "url(" + a + ")" : ""),
        this.D())
    }
    ;
    Cl.prototype.getDescriptionText = function() {
        var a;
        if (this.model) {
            a = this.model.description;
            var b = 86;
            a = a || "";
            if (!(a.length < b || 0 > b)) {
                for (var c = b; 0 < c; c--)
                    if (" " == a[c]) {
                        b = c;
                        break
                    }
                a = a.substr(0, b) + "..."
            }
        } else
            a = "";
        return a
    }
    ;
    Cl.prototype.D = function() {
        this.model && this.model.imageUrl !== this.o && this.h && (this.A.h(this.h, this.model.imageUrl, "preloaded"),
        this.o = this.model.imageUrl)
    }
    ;
    Cl.prototype.getSpeechPhrase = function() {
        return this.b.isSupported() ? this.p.S("[[Play video {{n}}|Speech command to play video number n.]]".replace("{{n}}", String(this.w))) : ""
    }
    ;
    Cl.inject = ["locale", "voiceHelper"];
    function Dl(a) {
        T.call(this);
        this.h = a;
        this.clips = new ii
    }
    A(Dl, T);
    Dl.prototype.ready = function() {
        this.g = this.tc(0);
        this.h.isSupported() && this.h.getClips(x(this.j, this), x(this.k, this))
    }
    ;
    Dl.prototype.j = function(a) {
        this.clips.ha(a)
    }
    ;
    Dl.prototype.k = function() {}
    ;
    Dl.inject = ["dvrApi"];
    function El() {
        wi.call(this);
        this.model = null
    }
    A(El, wi);
    El.prototype.h = function() {
        var a = this.model.volume;
        return this.model.isMuted ? "volume-muted" : 40 > a ? "volume-low" : 80 > a ? "volume-mid" : "volume-high"
    }
    ;
    El.prototype.j = function() {
        return String(Math.round(this.model.volume / 10))
    }
    ;
    function Fl(a, b, c, e) {
        T.call(this);
        this.h = a;
        this.w = c;
        this.A = e;
        this.j = NaN;
        this.channelName = this.videoTitle = this.channelAvatarUrl = "";
        this.l = null;
        this.viewCountLabel = this.uploadedDate = "";
        this.p = null;
        this.videoCount = this.videoIndex = 0;
        this.playlistTitle = "";
        this.model = this.o = null;
        this.D = b;
        this.k = q
    }
    A(Fl, T);
    d = Fl.prototype;
    d.wa = function() {
        this.l = this.G.querySelector(".username");
        this.p = this.G.querySelector(".view-count");
        this.o = this.G.querySelector(".set-context")
    }
    ;
    d.xa = function() {
        this.h.C("isPlayingAd:changed", x(function(a) {
            a ? this.ma() : this.QD()
        }, this))
    }
    ;
    d.show = function() {
        this.hh();
        Fl.B.show.call(this);
        this.N()
    }
    ;
    d.QD = function() {
        this.show();
        this.zh()
    }
    ;
    d.cF = function() {
        this.k();
        this.show();
        this.h.isPlaying ? this.zh() : this.k = this.h.C("isPlaying:changed", x(this.zh, this))
    }
    ;
    d.ma = function() {
        this.k();
        this.hh();
        Fl.B.ma.call(this);
        this.N()
    }
    ;
    d.zh = function() {
        this.hh();
        this.j = this.A.setTimeout(x(this.gF, this), 3E3)
    }
    ;
    d.hh = function() {
        isNaN(this.j) || (this.A.clearTimeout(this.j),
        this.j = NaN)
    }
    ;
    d.gF = function() {
        this.h.isPlaying ? this.ma() : (this.hh(),
        this.zh())
    }
    ;
    d.ea = function(a) {
        Fl.B.ea.call(this, a);
        this.model && (this.channelAvatarUrl = this.model.channel.imageUrl,
        this.videoTitle = this.model.title,
        a = this.D.Xb(),
        this.w.useInnerTube && a && a.service && "playlistService" == a.service.id ? (this.playlistTitle = a.model.title,
        this.videoIndex = a.activeIndex + 1,
        this.videoCount = a.model.Rb) : this.channelName = this.model.channel.displayName || "",
        this.uploadedDate = this.model.uploadedDateLabel,
        this.viewCountLabel = this.model.viewCountLabel)
    }
    ;
    d.N = function() {
        Fl.B.N.call(this);
        if (this.model) {
            this.channelAvatarUrl = this.model.channel.imageUrl;
            this.videoTitle = this.model.title;
            var a = this.D.Xb()
              , a = this.w.useInnerTube && a && a.service && "playlistService" == a.service.id;
            this.Fb(this.o, !!a);
            this.Fb(this.l, !a);
            this.Fb(this.p, !!this.model.viewCount)
        }
    }
    ;
    Fl.inject = ["playerFacade", "watchModel", "environmentModel", "timeService"];
    function Gl(a, b, c, e, f, g, k, l, n, p) {
        Jh.call(this);
        this.p = c;
        this.R = a;
        this.U = n;
        this.l = e;
        this.K = f;
        this.k = b;
        this.O = l;
        this.H = k;
        this.w = g;
        this.A = p;
        this.b = this.g = this.h = null;
        this.j = this.o = !1
    }
    A(Gl, Jh);
    d = Gl.prototype;
    d.load = function(a) {
        this.R.zb(x(function(b) {
            var c = x(function(b) {
                this.Vq(b);
                this.k.Wc("start_browse", "ar_r");
                a && a()
            }, this);
            this.k.Wc("start_browse", "ar_rq");
            b ? this.K.load(c) : this.l.Sb && (this.l.Sb("start_browse", "", "feed_rs", "feed_r"),
            this.l.load({}, c))
        }, this))
    }
    ;
    d.Vq = function(a) {
        var b = this.rows[this.Za];
        this.rows = a;
        this.g || (this.g = this.H.Md());
        a = this.rows.length;
        a = this.p.Ib(oa) ? Math.min(a, 1) : a;
        this.rows.splice(a, 0, this.g);
        a = this.p.initChannelId;
        !this.h && a && (this.h = new Q(this.U,"",this.A.Pb(a),a),
        this.h.Ou(this.A));
        this.h && this.rows.unshift(this.h);
        this.b || (this.b = this.O.Md());
        this.b.clear();
        this.rows.push(this.b);
        void 0 !== b && (this.Za = this.Nu(b));
        this.ig()
    }
    ;
    d.Nu = function(a) {
        for (var b = 0, c = this.rows.length; b < c; ++b)
            if (a.Zi(this.rows[b]))
                return b;
        return -1
    }
    ;
    d.dq = function() {
        this.b && this.b.load()
    }
    ;
    d.Km = function(a) {
        a && a.service && "searchService" === a.service.id && (this.w.Co(a.model.serviceQuery, a.ia(0), a.model.Rb),
        this.g && this.tq())
    }
    ;
    d.oE = function() {
        this.w.clear();
        this.tq()
    }
    ;
    d.tq = function() {
        this.g.load();
        this.g.Sc(0)
    }
    ;
    Gl.inject = "authService csiService environmentModel featuredService personalDataService searchHistoryService searchRowService settingsRowService userUploadsService ytThumbnails".split(" ");
    function Hl(a, b, c, e, f, g, k, l, n, p, u) {
        Gl.call(this, a, b, c, e, f, g, k, l, n, p);
        this.F = u
    }
    A(Hl, Gl);
    Hl.prototype.load = function(a) {
        this.k.Wc("start_browse", "ar_rq");
        this.F.load({}, x(this.D, this, a || q))
    }
    ;
    Hl.prototype.D = function(a, b) {
        this.Vq(b);
        this.rows = b;
        this.k.Wc("start_browse", "ar_r");
        a()
    }
    ;
    Hl.inject = "authService csiService environmentModel featuredService personalDataService searchHistoryService searchRowService settingsRowService userUploadsService ytThumbnails guideService".split(" ");
    function Il(a, b) {
        L.call(this);
        this.b = P;
        this.h = a;
        this.o = b
    }
    A(Il, L);
    Il.prototype.parse = function(a, b) {
        var c = m("contents.sectionListRenderer", b) || m("continuationContents.sectionListContinuation", b)
          , e = m("contents", c);
        e ? (this.l(a, e),
        (c = m("continuations", c)) && this.k(a, c)) : a.errorMessage = "Can not parse response. Found keys: " + wc(b).join(", ");
        return a
    }
    ;
    Il.prototype.l = function(a, b) {
        for (var c = 0, e = b.length; c < e; ++c) {
            var f = m("itemSectionRenderer.playlistVideoListRenderer", b[c]) || m("itemSectionRenderer", b[c]);
            if (f)
                this.g(a, f);
            else {
                a.errorMessage = "Can not parse item. Found keys: " + wc(b[c]).join(", ");
                a.Y.clear();
                break
            }
        }
    }
    ;
    Il.prototype.g = function(a, b) {
        var c = b.contents;
        if (c)
            for (var e = 0, f = c.length; e < f; ++e) {
                var g = c[e];
                if (g.videoRenderer || g.playlistVideoRenderer)
                    this.h.Qj(a, g.videoRenderer || g.playlistVideoRenderer);
                else if (g.playlistRenderer)
                    this.o.Yy(a, g.playlistRenderer);
                else if (g.playlistVideoListRenderer)
                    this.g(a, g.playlistVideoListRenderer);
                else
                    for (var k in g)
                        if (0 <= k.indexOf("Renderer")) {
                            this.h.Qj(a, g[k]);
                            break
                        }
            }
    }
    ;
    Il.prototype.k = function(a, b) {
        for (var c = 0, e = b.length; c < e; ++c)
            b[c].nextContinuationData && (a.b = m("nextContinuationData.continuation", b[c]))
    }
    ;
    Il.inject = ["innerTubeVideoParser", "innerTubePlaylistParser"];
    function Jl(a) {
        if (v(a))
            return a;
        if (!a || !m("runs.length", a))
            return "";
        for (var b = "", c = 0, e = a.runs.length; c < e; ++c) {
            var f = a.runs[c]
              , g = f.text;
            f.bold && (g = "<strong>" + g + "</strong>");
            f.italics && (g = "<em>" + g + "</em>");
            b += g
        }
        return b
    }
    ;function Kl(a, b, c) {
        L.call(this);
        this.h = a;
        this.g = b;
        this.k = c
    }
    A(Kl, L);
    d = Kl.prototype;
    d.parse = function(a, b) {
        for (var c = b.contents || b.items, e = 0, f = c.length; e < f; ++e) {
            var g = c[e].guideSectionRenderer || c[e].guideSubscriptionsSectionRenderer;
            g ? Array.prototype.push.apply(a, this.yp(g)) : a.push(new Ua({},'UNSUPPORTED "' + uc(c[e]) + '"',""))
        }
    }
    ;
    d.yp = function(a) {
        a = a.items || a.section.items;
        for (var b = [], c = 0, e = a.length; c < e; ++c) {
            var f;
            f = {};
            var g = a[c].guideEntryRenderer || a[c];
            if (g.hasOwnProperty("guideCollectionEntryRenderer"))
                f = this.yp(g.guideCollectionEntryRenderer),
                b = b.concat(f);
            else {
                var k = g.navigationEndpoint;
                if (k && "browseEndpoint"in k || "mobileV2UserFeedEndpoint"in k) {
                    f.title = this.Vz(g);
                    f.Xz = this.Uz(g);
                    var l = new mb;
                    l.innerTubeEndpointParams = k.browseEndpoint;
                    var n = ""
                      , p = this.h;
                    if ("what_to_watch" == m("mobileV2UserFeedEndpoint.feedName", k))
                        p = this.g,
                        l = null,
                        n = "default";
                    else if (!k.browseEndpoint)
                        continue;
                    f = new Q(p,f.title,f.Xz,n,l);
                    f.Qa = this.Wz(k);
                    f.sf = !!f.Qa && "PLAYLISTS" != m("icon.iconType", g)
                } else
                    g = yc(k, function(a, b) {
                        return 0 <= b.indexOf("Endpoint")
                    }),
                    f.title = "Can't render \"" + g + '"',
                    f = new Ua({},f.title,"");
                b.push(f)
            }
        }
        return b
    }
    ;
    d.Uz = function(a) {
        var b = "";
        switch (m("icon.iconType", a)) {
        case "WHAT_TO_WATCH":
            b = "icon-guide-what-to-watch";
            break;
        case "SUBSCRIPTIONS":
            b = "icon-guide-my-subs";
            break;
        case "SOCIAL":
            b = "icon-guide-social";
            break;
        case "PLAYLISTS":
            b = "icon-guide-playlists";
            break;
        case "WATCH_HISTORY":
            b = "icon-guide-history";
            break;
        case "WATCH_LATER":
            b = "icon-guide-watch-later";
            break;
        case "LIKES_PLAYLIST":
            b = "icon-like"
        }
        return b ? b : (a = m("thumbnail.thumbnails.0.url", a) || "",
        this.k.Oi(a))
    }
    ;
    d.Vz = function(a) {
        return Jl(a.title)
    }
    ;
    d.Wz = function(a) {
        var b = "";
        (a = m("browseEndpoint.browseId", a)) && 0 == a.indexOf("UC") && (b = a.substr(2));
        return b
    }
    ;
    Kl.inject = ["browseService", "riverService", "ytThumbnails"];
    function Ll(a, b, c) {
        L.call(this);
        this.b = P;
        this.k = a;
        this.h = b;
        this.l = c;
        this.g = Jl
    }
    A(Ll, L);
    d = Ll.prototype;
    d.Yy = function(a, b) {
        var c = this.Zk(a, b);
        a && a.Y && c && a.Y.push(c)
    }
    ;
    d.Zk = function(a, b) {
        var c = new Bl(a.Ga,a.serviceQuery)
          , e = new sh(a.Ga,a.serviceQuery)
          , f = this.Fy(b);
        if (!f)
            return c.title = "Not a playlist renderer.",
            c.channel = e,
            console.error("InnerTube playlist parser: not a playlist!", uc(m("data.target", b))),
            c;
        c.g = this.Ey(b, e, a);
        if (!c.g.length)
            return null;
        var g = c.g[0];
        c.channel = this.Ay(e, b);
        c.imageUrl = this.Cy(b);
        c.title = this.By(b);
        c.id = f;
        c.firstVideoTitle = g.title;
        c.videoId = g.videoId;
        c.videoCount = this.Dy(b);
        c.cg = this.h.Pb(m("shortBylineText.runs.0.navigationEndpoint.browseEndpoint.browseId", b));
        c.videoString = 1 == c.videoCount ? this.l.S("[[video|Label describing a single video.]]") : this.l.S("[[videos|Label describing multiple videos.]]");
        c.uploadedDateLabel = this.Gy(b);
        return c
    }
    ;
    d.Ay = function(a, b) {
        a.Qa = m("owner.channelId", b);
        a.username = m("owner.title", b);
        a.displayName = this.g(m("shortBylineText", b));
        a.Qa && (a.imageUrl = this.h.Pb(a.Qa));
        return a
    }
    ;
    d.Fy = function(a) {
        return m("playlistId", a)
    }
    ;
    d.Cy = function(a) {
        var b = "";
        a.thumbnails && 0 < a.thumbnails.length && (b = (b = m("thumbnails.0.thumbnails.0.url", a)) ? b.replace("mqdefault", this.k.R) : "");
        return b
    }
    ;
    d.Gy = function(a) {
        return this.g(m("publishedTimeText", a))
    }
    ;
    d.Ey = function(a, b, c) {
        a = m("videos", a);
        var e = [];
        if (a)
            for (var f = 0, g = a.length; f < g; ++f) {
                var k = new th(c.Ga,c.serviceQuery,c.Ha);
                k.videoId = m("childVideoRenderer.videoId", a[f]);
                k.title = this.g(m("childVideoRenderer.title", a[f]));
                k.channel = b;
                k.durationLabel = this.g(m("childVideoRenderer.lengthText", a[f]));
                k.videoId && (k.imageUrl = this.h.Je(k.videoId, this.k.R));
                e.push(k)
            }
        return e
    }
    ;
    d.By = function(a) {
        return this.g(m("title", a))
    }
    ;
    d.Dy = function(a) {
        return m("videoCount", a)
    }
    ;
    Ll.inject = ["environmentModel", "ytThumbnails", "locale"];
    function Ml(a, b) {
        Il.call(this, a, b)
    }
    A(Ml, Il);
    Ml.prototype.parse = function(a, b) {
        a.Rb = m("estimatedResults", b);
        return Ml.B.parse.call(this, a, b)
    }
    ;
    Ml.inject = ["innerTubeVideoParser", "innerTubePlaylistParser"];
    function Nl(a, b, c) {
        L.call(this);
        this.b = P;
        this.h = a;
        this.l = b;
        this.k = c;
        this.g = Jl
    }
    A(Nl, L);
    d = Nl.prototype;
    d.Qj = function(a, b) {
        var c = this.hH(a, b);
        a && a.Y && c && a.Y.push(c)
    }
    ;
    d.hH = function(a, b) {
        var c = new th(a.Ga,a.serviceQuery,a.Ha)
          , e = new sh(a.Ga,a.serviceQuery)
          , f = this.JC(b);
        if (!f)
            return c.title = "Not a video renderer.",
            c.channel = e,
            console.error("InnerTube video parser: not a video!", uc(m("data.target", b))),
            c;
        c.activityDescription = this.DC();
        c.description = this.GC(b);
        c.channel = this.FC(e, b);
        c.duration = this.IC(b);
        c.durationLabel = this.HC(b);
        c.cg = c.channel.imageUrl;
        c.imageUrl = this.k.Je(f, this.l.R);
        c.A = this.LC(b);
        c.l = this.EC(b);
        c.title = this.KC(b);
        c.videoId = f;
        c.viewCount = this.NC(b);
        c.viewCountLabel = this.MC(b);
        c.uploadedDateLabel = this.QC(b);
        this.OC(c, b);
        this.PC(c, b);
        if (e = m("app$control.yt$state", b))
            for (var e = t(e) ? e : [e], f = 0, g = e.length; f < g; ++f)
                if (e[f] && "restricted" == e[f].name) {
                    c.errorCode = e[f].reasonCode;
                    break
                }
        return c
    }
    ;
    d.GC = function(a) {
        return (a = this.g(m("descriptionSnippet", a))) && a.slice(0, 165) || ""
    }
    ;
    d.FC = function(a, b) {
        a.Qa = m("ownerText.runs.0.navigationEndpoint.browseEndpoint.browseId", b);
        a.username = a.Qa;
        a.displayName = this.g(m("shortBylineText", b));
        a.imageUrl = this.k.Pb(a.Qa);
        return a
    }
    ;
    d.IC = function(a) {
        return parseInt(m("lengthMs", a) / 1E3, 10)
    }
    ;
    d.HC = function(a) {
        return this.g(m("lengthText", a))
    }
    ;
    d.JC = function(a) {
        return m("videoId", a)
    }
    ;
    d.EC = function() {
        return !1
    }
    ;
    d.KC = function(a) {
        return this.g(m("title", a))
    }
    ;
    d.NC = function(a) {
        return m("viewCount", a)
    }
    ;
    d.MC = function(a) {
        return this.g(m("viewCountText", a))
    }
    ;
    d.QC = function(a) {
        return this.g(m("publishedTimeText", a))
    }
    ;
    d.OC = function(a, b) {
        var c = this.iy(b)
          , e = this.gy(b)
          , f = c + e;
        0 < f ? (a.g = e / f,
        a.h = c / f) : (a.g = 0,
        a.h = 0);
        a.k = e;
        a.dislikesLabel = this.h.yd(a.k);
        a.dislikesStyle = {
            width: ae(a.g)
        };
        a.p = c;
        a.likesLabel = this.h.yd(a.p);
        a.likesStyle = {
            width: ae(a.h)
        }
    }
    ;
    d.iy = function(a) {
        return m("likes", a)
    }
    ;
    d.gy = function(a) {
        return m("dislikes", a)
    }
    ;
    d.DC = function() {
        return "[[{{username}} uploaded a video|The message that describes user activity. Displayed when a user has uploaded a video.]]"
    }
    ;
    d.PC = function(a) {
        a.b = !1;
        a.o = !1
    }
    ;
    d.LC = function() {
        return !1
    }
    ;
    Nl.inject = ["locale", "environmentModel", "ytThumbnails"];
    function Ol(a, b) {
        L.call(this);
        this.b = P;
        this.h = a;
        this.k = b
    }
    A(Ol, L);
    Ol.prototype.parse = function(a, b) {
        var c = m("contents.singleColumnWatchNextResults.results.results.contents", b);
        a.Ha = "RV";
        if (c) {
            for (var e = 0, f = c.length; e < f; ++e) {
                var g = m("itemSectionPreviewRenderer.fullContents.sectionListWithoutPreviewRenderer.contents.0.itemSectionRenderer", c[e]);
                g && this.g(a, g)
            }
            a.Rb = a.Y.length;
            return a
        }
        a.errorMessage = "Can not parse response. Found keys: " + wc(b).join(", ");
        return a
    }
    ;
    Ol.prototype.g = function(a, b) {
        var c = b.contents;
        if (c)
            for (var e = 0, f = c.length; e < f; ++e) {
                var g = c[e];
                g.compactVideoRenderer && this.h.Qj(a, g.compactVideoRenderer)
            }
    }
    ;
    Ol.inject = ["innerTubeVideoParser", "innerTubePlaylistParser"];
    function Pl(a, b, c, e, f, g, k, l, n, p) {
        sg.call(this, "searchService", "/search", a, b, c, e, f, g, k, p, l, n, {}, !1)
    }
    A(Pl, sg);
    Pl.prototype.load = function(a, b) {
        if (!a || !a.query && !a.continuation) {
            var c = new this.o.b;
            b && b(c);
            return new ee(c)
        }
        return Pl.B.load.call(this, a, b)
    }
    ;
    Pl.inject = "csiService ytHttp environmentModel authService cacheService backendErrorReporting ssoApi localStorage searchParser locale".split(" ");
    function Ql(a, b, c, e) {
        this.deviceCount = e;
        this.j = this.g = "";
        W.call(this, a, b, c)
    }
    A(Ql, W);
    Ql.prototype.S = function() {
        Ql.B.S.call(this);
        this.g = this.b.S("[[PAIR DEVICE|Title of menu item that allows a user to pair one mobile device with the application.]]");
        this.h = this.b.S("[[PAIR ANOTHER DEVICE|Title of menu item that allows a user to pair an additional mobile device with the application.]]")
    }
    ;
    Ql.prototype.getTitle = function() {
        return 0 < this.deviceCount ? this.h : this.g
    }
    ;
    Ql.prototype.getTitleClass = function() {
        return 0 < this.deviceCount ? "long-title" : ""
    }
    ;
    function Rl(a, b, c, e, f, g) {
        this.g = f;
        this.imageUrl = g;
        this.totalResultsLocalized = "";
        W.call(this, a, b, c, e)
    }
    A(Rl, W);
    Rl.prototype.S = function() {
        Rl.B.S.call(this);
        this.totalResultsLocalized = this.b.yd(this.g)
    }
    ;
    function Sl(a, b, c, e, f) {
        W.call(this, a, b, c, e);
        this.deviceCount = f
    }
    A(Sl, W);
    function Tl(a, b, c, e) {
        this.searchCount = e;
        W.call(this, a, b, c)
    }
    A(Tl, W);
    function Ul(a, b, c, e, f, g) {
        this.j = g || q;
        this.h = this.g = null;
        W.call(this, a, b, c, e, "", f)
    }
    A(Ul, W);
    Ul.prototype.S = function() {
        Ul.B.S.call(this);
        this.g = this.b.S("[[Enabled|Explanatory text that says a feature is currently enabled.]]");
        this.h = this.b.S("[[Disabled|Explanatory text that says a feature is currently Disabled.]]")
    }
    ;
    Ul.prototype.getToggleStatus = function() {
        return this.j() && this.g || this.h || ""
    }
    ;
    Ul.prototype.getToggleClass = function() {
        return this.j() ? "toggle-selected" : ""
    }
    ;
    function Vl() {
        this.b = !1
    }
    Vl.CACHE_TYPE = "channel_paid_info";
    function Wl(a, b, c) {
        this.name = a;
        this.cq = b;
        this.rows = c
    }
    ;function Xl(a, b, c) {
        U.call(this, a, "", null, "", b, !1);
        this.b = c
    }
    A(Xl, U);
    function Yl(a) {
        this.g = a;
        this.b = this.Wx();
        this.layout = null;
        this.Do(this.b[0])
    }
    d = Yl.prototype;
    d.Do = function(a) {
        return this.layout != a ? (this.layout = a,
        this.g.o = this.layout.cq,
        !0) : !1
    }
    ;
    d.cl = function() {
        return this.layout.rows.CJ()
    }
    ;
    d.VH = function(a) {
        for (var b = [], c = 0, e = a.length; c < e; ++c) {
            var f = new U(a[c]);
            f.isSpeakable = !1;
            b.push(f)
        }
        return b
    }
    ;
    d.SA = function(a) {
        return this.Do(this.bJ(a))
    }
    ;
    d.bJ = function(a) {
        for (var b = 0, c = this.b.length; b < c; ++b) {
            var e = this.b[b];
            if (e.name === a)
                return e
        }
        return null
    }
    ;
    d.Wx = function() {
        var a = []
          , b = this.GI()
          , c = "RU" == b;
        b && (a.push(this.zs(b, c, "EN")),
        c && a.push(this.As(b)));
        a.push(this.zs("EN", !0, b, !!b));
        a.push(this.As("EN"));
        return a
    }
    ;
    d.zs = function(a, b, c, e) {
        var f = this.Pr(a)
          , g = f.ia(f.P() - 1);
        b && g.push(new Xl("123","numbers-toggle-tile",this.Rr(a)));
        g.push(this.Qr());
        c && (g.push(new Xl("\u00a0","language-toggle-tile",c)),
        e && f.MG(f.P() - 1, g.P() - 1));
        return new Wl(a,a,f)
    }
    ;
    d.As = function(a) {
        var b = this.Pr("NUMBERS")
          , c = b.ia(b.P() - 1)
          , e = new Xl(Na[a].substr(0, 3),"numbers-toggle-tile",a);
        c.push(e);
        c.vg(e);
        c.push(this.Qr());
        return new Wl(this.Rr(a),"NUMBERS",b)
    }
    ;
    d.Qr = function() {
        return new U("\u00a0","",null,"","delete-tile",!1)
    }
    ;
    d.Rr = function(a) {
        return a + "_NUMBERS"
    }
    ;
    d.Pr = function(a) {
        a = Na[a].split("\n");
        var b = new Bi;
        b.ha(fc(a, x(function(a) {
            var b = new Yh;
            b.ha(this.VH(a.split("")));
            return b
        }, this)));
        return b
    }
    ;
    d.GI = function() {
        switch (this.g.Fa) {
        case "ru_RU":
        case "uk_UA":
            return "RU";
        case "ko_KR":
            return "KO";
        case "ja_JP":
            return "JP";
        default:
            return null
        }
    }
    ;
    Yl.inject = ["locale"];
    function Zl(a) {
        Jh.call(this);
        this.b = new Q(a,"","icon-search")
    }
    A(Zl, Jh);
    Zl.prototype.load = function() {
        this.rows.push(this.b)
    }
    ;
    Zl.prototype.dg = function() {
        return this.b
    }
    ;
    Zl.inject = ["searchService", "environmentModel"];
    function $l(a, b, c, e, f) {
        K.call(this);
        this.p = c;
        this.A = a;
        this.o = b;
        this.h = f.dg();
        this.l = e;
        this.w = 1500;
        this.j = 0;
        this.b = "";
        this.g = null;
        this.k = !1
    }
    A($l, K);
    d = $l.prototype;
    d.mT = function() {
        this.b = ""
    }
    ;
    d.Av = function() {
        this.g = new P
    }
    ;
    d.yv = function() {
        this.b && (this.k = !0,
        this.h.load(this.vx(this.b)))
    }
    ;
    d.Ta = function() {
        return !this.b
    }
    ;
    d.vx = function(a) {
        return x(function() {
            this.k = !1;
            this.b === a && (this.g = this.h.model,
            this.L("results:changed", this.g))
        }, this)
    }
    ;
    d.Fg = function() {
        return this.b
    }
    ;
    d.Ab = function(a) {
        a != this.b && (this.h.Bv(),
        a && (a = a.replace("\n", "")),
        this.b = (a = this.o.zv(a) ? "" : a) || "",
        this.L("query:changed", this.b),
        this.p.serviceQuery = this.b,
        this.h.model.serviceQuery = this.b,
        this.Av(),
        this.j && this.l.clearTimeout(this.j),
        this.j = this.l.setTimeout(x(this.yv, this), 1500))
    }
    ;
    d.Ap = function(a) {
        this.Ab(this.b + a)
    }
    ;
    d.Cj = function() {
        this.b.length && this.Ab(this.b.slice(0, -1))
    }
    ;
    $l.inject = ["environmentModel", "debugCallService", "searchService", "timeService", "searchModel"];
    function am(a) {
        this.b = null;
        this.h = a
    }
    am.prototype.g = function(a, b) {
        var c = new nh(window);
        c.responseType = "arraybuffer";
        c.get(this.h, x(function(c) {
            a.decodeAudioData(c, x(function(a) {
                this.b = a;
                b()
            }, this), function(a) {
                console.error("Error in loading sound:", a)
            })
        }, this))
    }
    ;
    function bm(a) {
        this.id = Xk();
        this.o = this.w = a.Sa;
        this.k = 0;
        this.p = a.va;
        this.l = this.b = this.g = this.j = 0;
        this.h = ""
    }
    bm.prototype.A = function() {
        return Ef({
            id: this.id,
            recentActive: this.w,
            firstActive: this.o,
            prevActive: this.k,
            firstActiveGeo: this.p,
            loginState: this.j,
            recentLogin: this.g,
            firstLogin: this.b,
            prevLogin: this.l,
            uga: this.h
        })
    }
    ;
    function cm(a, b, c) {
        bl.call(this, a, b, c);
        this.Ka("videoFromEntry", this.Ch)
    }
    A(cm, bl);
    d = cm.prototype;
    d.Ch = function(a, b) {
        for (var c = this.FD(b), e = c.length, f = 0; f < e; ++f) {
            var g = c[f];
            if (this.GD(g))
                return c = cm.B.Ch.call(this, a, g.entry[0]),
                c.activityDescription = this.dj(b),
                c.ii = this.Mq(b),
                e = this.ED(b),
                c.cg = this.h.Pb(e),
                c
        }
        return null
    }
    ;
    d.ED = function(a) {
        return a.author && a.author[0] ? this.ua(a.author[0].yt$userId) : ""
    }
    ;
    d.Mq = function(a) {
        return a.author && a.author[0] ? this.ua(a.author[0].name) : ""
    }
    ;
    d.jj = function(a) {
        return a && a.id && a.id.$t || ""
    }
    ;
    d.bo = function(a) {
        return a.media$group && a.media$group.yt$duration ? parseInt(a.media$group.yt$duration, 10) : 0
    }
    ;
    d.GD = function(a) {
        return a.rel && "http://gdata.youtube.com/schemas/2007#video" === a.rel
    }
    ;
    d.FD = function(a) {
        return a && a.link || []
    }
    ;
    d.dj = function(a) {
        if (!a)
            return "";
        var b = this.Mq(a)
          , c = a.category && a.category[1] && a.category[1].term && a.category[1].term.toUpperCase();
        return b && c && Ra[c] || this.ua(a.title)
    }
    ;
    cm.inject = ["locale", "environmentModel", "ytThumbnails"];
    function dm(a) {
        L.call(this);
        this.b = rh;
        this.h = a;
        this.Ka("entry", this.k);
        this.Ka("yt$option", this.g)
    }
    A(dm, L);
    dm.prototype.k = function(a, b, c) {
        this.parse(a, c)
    }
    ;
    dm.prototype.g = function(a, b, c) {
        if (t(c)) {
            b = 0;
            for (var e = c.length; b < e; ++b) {
                var f = m("name", c[b])
                  , g = m("$t", c[b])
                  , g = this.h.Oi(g);
                switch (f) {
                case "device_watchpage.watermark.image.url":
                    a.g = g;
                    break;
                case "generictv_watchpage.banner.image.url":
                    a.b = g;
                    break;
                case "channel.banner.tv.image.url":
                case "channel.banner.tv.low.image.url":
                case "channel.banner.tv.medium.image.url":
                case "channel.banner.tv.high.image.url":
                    a.h = g;
                    break;
                case "watchpage.global.featured_playlist.id":
                    a.kg = g;
                    break;
                case "channel.featured_video_module.video_id.string":
                    a.k = g
                }
            }
        }
    }
    ;
    dm.inject = ["ytThumbnails"];
    function em() {
        L.call(this);
        this.b = Vl;
        this.Ka("entry", this.g);
        this.Ka("yt$paidContent", this.h)
    }
    A(em, L);
    em.prototype.g = function(a, b, c) {
        this.parse(a, c)
    }
    ;
    em.prototype.h = function(a, b, c) {
        a.b = !!c
    }
    ;
    function fm() {
        dj.call(this);
        this.b = P
    }
    A(fm, dj);
    fm.prototype.se = function(a, b, c) {
        c.forEach(function(b) {
            var c = new sh(a.Ga,a.serviceQuery);
            this.parse(c, b);
            a.Y.push(this.Xk(c, b))
        }, this);
        return a
    }
    ;
    fm.prototype.Xk = function(a, b) {
        a.displayName = this.g(b) || a.username;
        a.id = this.h(b);
        return a
    }
    ;
    fm.prototype.g = function(a) {
        return a && a.content && a.content.entry && a.content.entry[0] ? this.ua(a.content.entry[0].title) : ""
    }
    ;
    fm.prototype.h = function(a) {
        return a && a.content && a.content.entry && a.content.entry[0] ? this.ua(a.content.entry[0].yt$channelId) : ""
    }
    ;
    function gm(a, b) {
        L.call(this);
        this.l = a;
        this.o = b;
        this.g = {
            trends: "icon-trends",
            music: "icon-music",
            gaming: "icon-gaming",
            sports: "icon-sport",
            film: "icon-film",
            entertainment: "icon-entertainment",
            comedy: "icon-lol",
            news: "icon-news",
            people: "icon-people",
            tech: "icon-rocket",
            howto: "icon-lips",
            education: "icon-education",
            animals: "icon-pets",
            popular: "icon-star",
            featured: "/icon-music-awards.png"
        };
        this.Ka("sets", this.k)
    }
    A(gm, L);
    gm.prototype.k = function(a, b, c) {
        c.forEach(function(b) {
            this.MJ(a, b)
        }, this);
        return a
    }
    ;
    gm.prototype.MJ = function(a, b) {
        var c = b.title
          , e = b.gdata_list_id
          , f = e.substr(0, 2)
          , g = e.substr(2);
        try {
            var k = this.l.get(f)
              , l = this.h(e, g, b.icon)
              , n = new Q(k,c || "",l,g);
            a.push(n)
        } catch (p) {}
    }
    ;
    gm.prototype.h = function(a, b, c) {
        c = this.g[c];
        !c && a.match(/^UU.+/) && (c = this.o.Pb(b));
        return c || "icon-star"
    }
    ;
    gm.inject = ["injector", "ytThumbnails"];
    function hm() {
        dj.call(this);
        this.b = P
    }
    A(hm, dj);
    d = hm.prototype;
    d.se = function(a, b, c) {
        c.forEach(function(b) {
            var c = new Bl(a.Ga,a.serviceQuery);
            this.parse(c, b);
            a.Y.push(this.Zk(c, b))
        }, this);
        return a
    }
    ;
    d.Zk = function(a, b) {
        a.id = this.oI(b);
        a.serviceQuery = a.id;
        a.imageUrl = this.lI(b);
        a.videoCount = this.nI(b);
        a.Vc = this.mI(b);
        a.imageUrl && (a.videoId = this.kI(a));
        return a
    }
    ;
    d.oI = function(a) {
        return this.ua(a.yt$playlistId)
    }
    ;
    d.lI = function(a) {
        return a.media$group && a.media$group.media$thumbnail && a.media$group.media$thumbnail[0].url || ""
    }
    ;
    d.nI = function(a) {
        return this.ua(a.yt$countHint)
    }
    ;
    d.mI = function(a) {
        return a.author && a.author[0].name ? this.ua(a.author[0].name) : ""
    }
    ;
    d.kI = function(a) {
        a = a.imageUrl.split("/");
        return a[a.length - 2]
    }
    ;
    function im(a) {
        dj.call(this);
        this.b = P;
        this.nc = a
    }
    A(im, dj);
    d = im.prototype;
    d.se = function(a, b, c) {
        c.forEach(function(b) {
            var c = new sh(a.Ga,a.serviceQuery);
            this.parse(c, b);
            c = this.Xk(c, b);
            c.displayName && (a.Y.push(c),
            this.nc.Aq(c.username, !0))
        }, this);
        return a
    }
    ;
    d.Xk = function(a, b) {
        a.id = this.VI(b);
        a.username = this.MI(b);
        a.displayName = this.UI(b) || a.username;
        return a
    }
    ;
    d.MI = function(a) {
        return this.ua(a.yt$username)
    }
    ;
    d.UI = function(a) {
        return a && a.yt$username && a.yt$username.display ? a.yt$username.display : ""
    }
    ;
    d.VI = function(a) {
        return this.ua(a.yt$channelId)
    }
    ;
    d.YQ = function(a) {
        return this.ua(a.id)
    }
    ;
    im.$inject = ["subscriptionsModel"];
    function jm(a) {
        dj.call(this);
        this.b = sh;
        this.g = a;
        this.Ka("yt$username", this.Kx);
        this.Ka("title", this.Lx);
        this.Ka("media$thumbnail", this.Ix);
        this.Ka("yt$statistics", this.Jx)
    }
    A(jm, dj);
    d = jm.prototype;
    d.se = function(a, b, c) {
        this.parse(a, c);
        a.displayName || (a.displayName = a.title)
    }
    ;
    d.Kx = function(a, b, c) {
        a.username = this.ua(c);
        c.display && (a.displayName = c.display)
    }
    ;
    d.Lx = function(a, b, c) {
        a.title = this.ua(c)
    }
    ;
    d.Ix = function(a, b, c) {
        a.imageUrl = this.g.Oi(c.url)
    }
    ;
    d.Jx = function(a, b, c) {
        a.Ru = c.subscriberCount;
        a.viewCount = c.totalUploadViews
    }
    ;
    jm.inject = ["ytThumbnails"];
    function km(a, b, c) {
        this.h = b;
        this.b = [];
        this.g = c.C(a, x(this.dw, this))
    }
    A(km, ad);
    d = km.prototype;
    d.register = function(a) {
        var b = this.b;
        I(b, a) || b.push(a)
    }
    ;
    d.VA = function(a) {
        jc(this.b, a)
    }
    ;
    d.UA = function() {
        return this.b.length
    }
    ;
    d.dw = function(a) {
        for (var b = 0, c = this.b.length; b < c; ++b) {
            var e = this.h.get(this.b[b]);
            e.de.apply(e, a.detail)
        }
    }
    ;
    d.T = function() {
        this.g && (this.g(),
        this.g = null);
        this.b = null;
        km.B.T.call(this)
    }
    ;
    function lm(a, b) {
        this.g = a;
        this.h = b;
        this.b = {}
    }
    A(lm, ad);
    lm.prototype.register = function(a, b) {
        var c = this.b[a];
        c || (c = new km(a,this.g,this.h),
        this.b[a] = c);
        c.register(b)
    }
    ;
    lm.prototype.j = function(a, b) {
        var c = this.b[a];
        c && (c.VA(b),
        0 == c.UA() && (c.pb(),
        this.b[a] = null))
    }
    ;
    lm.prototype.T = function() {
        for (var a in this.b) {
            var b = this.b[a];
            b && b.pb()
        }
        this.b = null;
        lm.B.T.call(this)
    }
    ;
    lm.inject = ["injector", "rootDispatcher"];
    function mm(a) {
        $h.call(this, a);
        this.isVertical = !0;
        this.loopRows = this.catchRowMouseMove = !1
    }
    A(mm, $h);
    mm.prototype.Ir = function() {
        return Oh('<ul class="$list" data-catch-mouse-move="{{catchRowMouseMove}}"data-item-factory="{{itemFactory}}" data-item-name="{{itemName}}" data-is-vertical="false" data-loop="{{loopRows}}" data-rate-limit="{{rateLimit}}"></ul>', null, this.injector)
    }
    ;
    mm.inject = ["listSelectionManager"];
    function nm(a, b) {
        Ei.call(this, a, b);
        this.model = null
    }
    A(nm, Ei);
    nm.prototype.ea = function(a) {
        this.model && (this.model.ah = this.h.S(this.model.ah),
        this.model.pj = this.h.S(this.model.pj),
        this.Jc("toggle:changed", x(this.j, this)));
        nm.B.ea.call(this, a)
    }
    ;
    nm.prototype.j = function() {
        this.yk();
        this.N()
    }
    ;
    nm.prototype.Hh = function(a) {
        this.model && this.model.toggle();
        nm.B.Hh.call(this, a)
    }
    ;
    nm.prototype.vb = function() {
        var a = nm.B.vb.call(this);
        this.model && this.model.selected && a.push("toggle-selected");
        return a
    }
    ;
    nm.inject = ["locale", "voiceHelper"];
    function om() {}
    A(om, Kh);
    om.prototype.isSupported = function() {
        return !1
    }
    ;
    d = om.prototype;
    d.Qb = q;
    d.$a = q;
    d.ff = q;
    d.sb = q;
    d.fh = q;
    d.Ua = q;
    d.eh = q;
    d.ik = function() {
        return []
    }
    ;
    function pm(a) {
        ph.call(this);
        this.J = a || {};
        this.h()
    }
    A(pm, ph);
    pm.prototype.Zd = function(a) {
        var b;
        this.contains(a) || !this.g || 0 == a.lastIndexOf("opt_", 0) ? b = pm.B.Zd.call(this, a) : b = new Ug(this.g(a),this);
        return b
    }
    ;
    pm.prototype.h = function() {
        function a(a) {
            return a
        }
        this.register("window", this.J);
        this.register("document", this.J.document || {});
        this.register("location", this.J.location || {});
        a.inject = ["markup"];
        this.Mk("templatePreprocessor", a);
        this.Nf("xhr", nh);
        this.Nf("templateResolver", oh)
    }
    ;
    function qm() {
        this.enabled = !1
    }
    qm.prototype.g = function() {
        this.enabled = !this.enabled
    }
    ;
    function rm() {}
    rm.prototype.isSupported = function() {
        return !1
    }
    ;
    function sm(a, b, c, e, f) {
        Y.call(this, a, b, "activity_sw");
        this.l = c;
        this.p = e;
        this.o = f;
        this.g = null;
        this.j = !1
    }
    A(sm, Y);
    var tm = {
        state: "exit"
    };
    d = sm.prototype;
    d.bA = function() {
        var a = this.k;
        this.k = this.p.Wb();
        return a ? ((this.k - a) / 1E3).toFixed(1) : null
    }
    ;
    d.Pq = function(a) {
        a = this.km(a);
        var b = this.cA(a, this.bA());
        this.h("/gen_204", b);
        this.g = a
    }
    ;
    d.RA = function() {
        this.Pq(tm)
    }
    ;
    d.cA = function(a, b) {
        var c = um
          , e = {
            a: "tv_activity"
        };
        e[c.Ev] = a;
        e.logged_in = this.l.ji() ? 1 : 0;
        null != this.g && (e[c.Dv] = this.g);
        null != b && (e.t = b);
        !this.j && this.o.Fv() && (e[c.Cv] = 1,
        this.j = !0);
        e.e = this.b.Ne();
        y(e, this.b.Ub());
        return e
    }
    ;
    d.km = function(a) {
        return a.mode ? a.state + ":" + a.mode : a.state
    }
    ;
    var um = {
        Dv: "prev",
        Cv: "first_activation",
        Ev: "state"
    };
    sm.inject = ["environmentModel", "privateDataService", "authService", "timeService", "statsService"];
    function vm(a, b, c) {
        Y.call(this, a, b, "audio_config_sw");
        this.g = c
    }
    A(vm, Y);
    vm.prototype.j = function() {
        var a = this.g.isSupported() ? this.g.items : [];
        if (0 != a.length) {
            for (var b = {
                a: "tv_audio_config"
            }, c = 0, e = a.length; c < e; ++c) {
                var f = a[c]
                  , g = "item" + c
                  , f = [f.codingType, f.connector, f.numberOfChannels].join();
                b[g] = f
            }
            y(b, this.b.Ub());
            this.h("/gen_204", b)
        }
    }
    ;
    vm.inject = ["environmentModel", "privateDataService", "audioConfigApi"];
    function wm(a, b, c) {
        Y.call(this, a, b, "backend_error_sw");
        this.j = c
    }
    A(wm, Y);
    var xm = {
        Tw: "be",
        Uw: "path",
        Vw: "rcode"
    };
    wm.prototype.g = function(a, b, c) {
        var e = {
            a: "tv_berror"
        };
        e[xm.Tw] = a;
        e[xm.Uw] = b;
        c && (e[xm.Vw] = c);
        e.logged_in = this.j.ji() ? 1 : 0;
        e.e = this.b.Ne();
        y(e, this.b.Ub());
        this.h("/gen_204", e)
    }
    ;
    wm.inject = ["environmentModel", "privateDataService", "authService"];
    function ym(a, b, c) {
        this.g = a;
        this.b = b;
        this.j = c
    }
    ym.prototype.xa = function() {
        var a = x(this.h, this);
        this.b.C("state:changed", a);
        this.b.ug(a)
    }
    ;
    ym.prototype.h = function(a) {
        a && this.g.jb && this.b.zb(x(function(a) {
            a && this.j.get("/vendor_signin", {
                access_token: a,
                vendor: this.g.jb
            })
        }, this))
    }
    ;
    ym.inject = ["environmentModel", "authService", "ytHttp"];
    function zm(a, b) {
        Y.call(this, a, b);
        this.p = "crash-data";
        this.l = this.j = this.g = this.k = 0;
        this.o = !1
    }
    A(zm, Y);
    d = zm.prototype;
    d.xa = function() {
        this.HE();
        this.IE() && this.h("/gen_204", this.KE());
        this.JE()
    }
    ;
    d.HE = function() {
        var a = this.D.oo("crash-data");
        a && (this.k = a["startup-count"],
        this.g = a["clean-exits"],
        this.j = a["crash-count"],
        this.l = a.startup,
        this.o = !0)
    }
    ;
    d.IE = function() {
        return this.o && this.j < this.Jn()
    }
    ;
    d.JE = function() {
        this.j = this.Jn();
        this.k++;
        this.l = this.b.Sa;
        this.$m()
    }
    ;
    d.Jn = function() {
        return this.k - this.g
    }
    ;
    d.QA = function() {
        this.g++;
        this.$m()
    }
    ;
    d.KE = function() {
        var a = {
            a: "tv_crash"
        };
        a.startups = this.k;
        a.exits = this.g;
        a.last_count = this.j;
        a.start = this.l;
        y(a, this.b.Ub());
        return a
    }
    ;
    d.$m = function() {
        var a = {};
        a["startup-count"] = this.k;
        a["clean-exits"] = this.g;
        a["crash-count"] = this.j;
        a.startup = this.l;
        this.D.Bm("crash-data", a)
    }
    ;
    zm.inject = ["environmentModel", "privateDataService"];
    function Am(a, b, c) {
        Y.call(this, a, b);
        this.j = c
    }
    A(Am, Y);
    Am.prototype.g = function() {
        var a = this.b.Ub();
        y(a, this.j.Ww());
        this.h("//www.youtube-nocookie.com/device_204", a, null, !0)
    }
    ;
    Am.inject = ["environmentModel", "privateDataService", "statsService"];
    function Bm(a, b, c, e, f) {
        this.J = a;
        this.l = b;
        this.j = c;
        this.k = e;
        this.o = f;
        this.b = !1
    }
    Bm.prototype.xa = function() {
        var a = x(this.g, this);
        this.J.addEventListener("beforeunload", a, !1);
        this.J.addEventListener("unload", a, !1)
    }
    ;
    Bm.prototype.h = function() {
        this.k.QA();
        this.j.RA();
        this.o.OA();
        this.l.flush()
    }
    ;
    Bm.prototype.g = function() {
        this.b || (this.h(),
        this.b = !0)
    }
    ;
    Bm.inject = ["window", "localStorage", "activityReportingService", "crashReportingService", "remoteService"];
    function Cm(a, b) {
        this.g = a;
        this.h = b;
        this.j = !1
    }
    Cm.prototype.xa = function() {
        if (!this.b && this.h.isSupported())
            try {
                this.b = this.k(),
                this.b.addRequestHandler("GET", "/", x(this.l, this)),
                this.b.addRequestHandler("POST", "/", x(this.o, this))
            } catch (a) {
                console.error("Steel Dial Server Creation exception: " + a)
            }
    }
    ;
    Cm.prototype.k = function() {
        return this.h.createServer("YouTube")
    }
    ;
    Cm.prototype.l = function(a, b) {
        var c = this.g.Yf()
          , e = '<?xml version="1.0" encoding="UTF-8"?><service xmlns="urn:dial-multiscreen-org:schemas:dial"><name>YouTube</name><options allowStop="false" /><state>' + (null != c || this.j ? "running" : "stopped") + "</state>";
        null != c && (e += '<additionalData xmlns="http://www.youtube.com/dial"><screenId>' + c + "</screenId></additionalData>");
        b.mimeType = 'text/xml; charset="utf-8"';
        b.responseCode = 200;
        b.body = e + "</service>";
        return !0
    }
    ;
    Cm.prototype.o = function(a, b) {
        var c = kd(a.body);
        if (c.hasOwnProperty("pairingCode") && c.pairingCode) {
            this.g.bp(c.pairingCode);
            this.j = !0;
            if (c.v) {
                var e = parseFloat(c.t);
                this.g.qm(c.v, isNaN(e) ? 0 : e)
            }
            b.responseCode = 201;
            b.addHeader("LOCATION", "http://" + a.host + a.path + "/run");
            b.mimeType = 'text/plain; charset="utf-8"';
            b.body = "";
            return !0
        }
        return !1
    }
    ;
    Cm.inject = ["remoteService", "dialApi"];
    function Dm(a, b, c, e, f, g, k, l, n, p, u, r, E, R, ea) {
        this.D = a;
        this.b = b;
        this.o = c;
        this.j = e;
        this.A = f;
        this.g = g;
        this.k = k;
        this.w = l;
        this.F = n;
        this.p = p;
        this.H = u;
        this.O = r;
        this.K = E;
        this.h = R;
        this.l = ea
    }
    d = Dm.prototype;
    d.bootstrap = function() {
        this.l.xa();
        this.yw();
        this.uw();
        this.tw();
        this.xw();
        this.ww();
        if (this.g.Rh && this.b.contains("templateResolver"))
            this.b.vw();
        else {
            var a = this.b;
            a.M(M.I + "/rebound/advertisement_callout.html", '<div>  <div class="advertisement-tooltip">    [[Advertisement|Tooltip stating that the video currently playing is an advertisement.]]    (<span class="remaining_duration">{{remainingDuration}}</span>)  </div>  <div class="countdown-ad-callout">    <div class="time-left-label">      [[Your video will play in <span class="time-left">{{remainingSeconds}}</span>s|Label preceeding the number of seconds countdown for when the currently playing ad will finish, and when the main video will begin.]]    </div>    <div class="skip-time-label" style="display: none">      [[You can skip to video in <span class="skip-time">{{skipTime}}</span>|Label preceeding the number of seconds before the user can skip the remainder of the ad and begin playing the main video.]]    </div>    <img class="thumbnail" x-src="{{imageSource}}"/>  </div>  <div class="skip-ad-callout" style="display: none">    <span class="icon">&nbsp;</span>    <span class="label">[[Skip ad|Label indicating action that the user can take to skip the ad.]]</span>  </div></div>');
            a.M(M.I + "/rebound/browse.html", '<div>  <div class="$browse-list"></div>  <div class="$super-scroller"></div>  <div id="up-arrow" class="nav-arrow"></div>  <div id="down-arrow" class="nav-arrow"></div>  <div id="left-arrow" class="nav-arrow"></div>  <div id="right-arrow" class="nav-arrow"></div>  <div id="scroller-background"></div>  <ul class=\'$voice-footer\'></ul></div>');
            a.M(M.I + "/rebound/button.html", "<div>{{model.label}}</div>");
            a.M(M.I + "/rebound/call_to_cast.html", '<div>  <h2 class="call-to-cast-text">[[Ready to watch?|Title of the instructions screen encouraging user to take action.]]</h2>  <h3 class="call-to-cast-text">[[Choose a YouTube video on your mobile device or laptop, then watch it here.|Steps to be taken on paired device such as phone, laptop or tablet, to trigger a playback on TV, acting as a screen.]]</h3></div>');
            a.M(M.I + "/rebound/color_button.html", '<div class="button">  <div class="preview {{model.payload.class}}"></div>  <span>{{model.label}}</span></div>');
            a.M(M.I + "/rebound/debug_watermark.html", "<h1>{{getText()}}</h1>");
            a.M(M.I + "/rebound/dialogs/authentication_error_info.html", "<div>[[Your account couldn't be accessed. Please sign in again or use a different account.|Error dialog that is shown when sign in credentials are no longer valid and user is automatically signed out]]</div>");
            a.M(M.I + "/rebound/dialogs/closed_captions.html", '<div>  <div class="$list" id="display-properties-list" data-model="{{displayProperties}}" data-is-vertical="true" data-element-limit="6" data-catch-mouse-move="true" data-mouse-auto-scroll="false"></div>  <div class="$list" id="options-list" data-model="{{getOptionsForCurrentDisplayProperty()}}" data-is-vertical="true" data-element-limit="6" data-catch-mouse-move="true" data-mouse-auto-scroll="false"></div></div>');
            a.M(M.I + "/rebound/dialogs/debug_info.html", '<div id="debug-info"></div>');
            a.M(M.I + "/rebound/dialogs/delete_clip.html", '<div>  <div class="dialog-contents">    [[Are you sure you would like to delete this clip?|Asks user if they are sure they want to do the clip deletion.]]  </div>  <div class="video-tile-side">    <div class="$videoTile"></div>  </div></div>');
            a.M(M.I + "/rebound/dialogs/eureka_authorization_info.html", '<div>  <div class="icon"></div>  <div class="info">    <div class="title">[[This video can\'t be played on this device.|Informs the user that this video can\'t be played on this device.]]</div>    <div class="message">[[Please choose another video.|Informs the user to please choose another video for playback.]]    </div>  </div></div>');
            a.M(M.I + "/rebound/dialogs/eureka_player_error_info.html", '<div>  <div class="icon"></div>  <div class="info">    <div class="title">[[There was an error playing this video.|Informs the user of a video playback error.]]</div>    <div class="message">[[Please choose another video.|Informs the user to please choose another video for playback.]]    </div>  </div></div>');
            a.M(M.I + "/rebound/dialogs/flag_claim.html", '<div class="flag-claim">  <div class="metadata">    <span class="text"></span>    <div class="url"></div>  </div>  <div class="copyright-infringment">    [[<div class="subtitle">Infringes my copyright</div> youtube.com/t/dmca_policy <div class="email">or email</div> copyright@youtube.com|Provides a way, via email or web site, to claim that a video infringes the current user\'s copyright.]]  </div>  <div class="privacy-invasion">    [[<div class="subtitle">Invades my privacy</div> youtube.com/t/privacy_guidelines|Provides a way to claim, via email or web site, that a given video invades the current user\'s privacy.]]  </div></div>');
            a.M(M.I + "/rebound/dialogs/flag_options.html", '<div class="flag-list-container">  <div class="$grid flag-list" data-model="{{flagData}}"></div></div>');
            a.M(M.I + "/rebound/dialogs/flag_video.html", '<div class="flag-video">  <div>    [[Visit this video on your computer or laptop and click the flag icon to submit a claim:|Provides a URL which a user can access in order to flag the video as inappropriate. Followed by actual URL.]]    <span class="url"></span>  </div>  <div class="flag-example"></div></div>');
            a.M(M.I + "/rebound/dialogs/login_info.html", '<div>  <div class="connection-instructions">    <div class="remote-pair-icon"/></div>    <div class="connection-steps">      [[<div class="step1">Go To</div>      <div class="activation-url">youtube.com/activate</div>|Tells user that there\'s a URL here to navigate to]]      [[<div class="step2">and enter</div>      <div class="activation-code">{{activationCode}}</div>|Tells user this is the string to enter into the device.]]    </div>    <div class="connection-error hidden">[[Sign in is temporarily unavailable.<br/><br/>Please try again later.|Error message displayed when device fails to load activation code.]]</div>  </div></div>');
            a.M(M.I + "/rebound/dialogs/logout_info.html", '<div>  <div class="logout-authenticated-info">    <div class="login-user-icon"></div>    <div class="login-user-info">      <h3 class="display-name"></h3>      <div class="platform-container">        <div class="platform-user-icon"></div>        <span class="platform-user-name"></span>      </div>      <div class="signed-in-message"></div>    </div>  </div></div>');
            a.M(M.I + "/rebound/dialogs/network_error_info.html", "<div>[[A network error has occurred. Please check your network connection.|Dialog subtitle telling user that a network error has occurred, and asking the user to check their network connection]]</div>");
            a.M(M.I + "/rebound/dialogs/paid_channel_info.html", '<div class="paid-channel-info">[[This is a paid channel, which requires a recurring subscription payment to view the content. To find out more about this channel visit <span class="channel-url"></span> on your computer.|Message that is displayed when user tries to subscribe to a paid channel.]]</div>');
            a.M(M.I + "/rebound/dialogs/player_error_info.html", '<span class="player-error"></span>');
            a.M(M.I + "/rebound/dialogs/qr_dialog.html", '<div>  <div class="box">[[On your phone, tablet or laptop, go to: <a class="base-url">{{displayUrl}}</a>|Explanation on how to access help and feedback web pages.|119192476]]</div>  <div class="box qr-code-wrapper">[[Or scan: <br><img class="qr" x-src="{{qrCodeImageUrl}}"/>|Explains alternative way of accessing help and feedback pages by scanning QR code.]]</div></div>');
            a.M(M.I + "/rebound/dialogs/remote_pairing_info.html", '<div class="pairing">  <div class="connection-instructions">    <div class="remote-pair-icon"/></div>    <div class="dial-upsell">      [[Connect your mobile device to the same WiFi network, open YouTube and tap the <div class="cast-icon">&nbsp;</div> icon.|        A message hinting the user about the possibility to use the automatically detected send-to-TV function of the YouTube mobile client to connect.]]    </div>    <div class="connection-steps">      [[<div class="step1">Go to</div>        <div class="pair-url">youtube.com/pair</div>|Tells user that there\'s a URL here to navigate to]]      [[<div class="step2">and enter</div>        <div class="pair-code">{{displayPairingCode}}</div>|Tells user this is the string to enter into the device]]    </div>    <div class="qr-code-wrapper">      <div class="qr-code">        <div class="scan">[[Or scan|Title above QR code telling a user that it is possible to sign into account by using QR-code scanner.]]</div>        <img class="qr-code-image" x-src="{{qrCodeImageUrl}}" />      </div>    </div>    <div class="connected-list">      <div class="connected-header">[[Connected|Heading for a list of devices connected to the application.]]</div>      <ul class="$list devices" data-model="{{connectedDevices}}">        <li class="{{model.deviceClass}}">{{model.displayString}}</li>      </ul>    </div>  </div></div>');
            a.M(M.I + "/rebound/dialogs/remote_reset_info.html", '<div>  <div class="connected-list">    <div>      <div class="connected-header">[[Paired Devices|Tooltip showing status of paired devices, connected to the application or not.]]</div>      <ul class="devices"></ul>    </div>  </div>  <span class="reset-help">[[Selecting \'OK\' will disconnect all paired devices.|Tooltip displayed when a user is going to disconnect her mobile device from the application.]]</span></div>');
            a.M(M.I + "/rebound/dialogs/signed_out_info.html", "<div>  <div>    [[You have been signed out by the application.|Message that tells the user that they have been signed out by the application]]  </div>  <div>    [[Would you like to sign in again?|Message that asks the user if they would like to sign in again]]  </div></div>");
            a.M(M.I + "/rebound/dialogs/tos_info.html", "<div>  <div>[[To view the Terms of Service go to:|Dialog subtitle telling user to go to the following URL to view youtube terms of service.]]</div>  <div class='url'>http://www.youtube.com/terms</div>  <div>[[To view the Privacy Policy go to:|Dialog subtitle telling user to go to the following URL to view youtube privacy policy document]]</div>  <div class='url'>http://www.youtube.com/privacy</div></div>");
            a.M(M.I + "/rebound/dialogs/video_uploads.html", '<div>  <div class="error hidden">[[There was an error showing available videos. Please try again later.|Message displayed when an error occurs while fetching available for upload video clips.]]</div>  <div class="$carousel" data-model="{{clips}}" data-item-name="dvrClipTile"></div></div>');
            a.M(M.I + "/rebound/engagement_indicator.html", '<div>  <div class="stop-listening">    <span class="icon"></span>    <span class="title">{{stopPhrase}}</span>  </div></div>');
            a.M(M.I + "/rebound/feed_icon.html", '<div>  <div class="{{iconClass}}" style="background-image:{{iconBackground}}"></div>  <h2>{{title}}</h2></div>');
            a.M(M.I + "/rebound/label_button.html", "<div><span>{{model.label}}</span></div>");
            a.M(M.I + "/rebound/legend.html", '<div>  <div class="more"><span class="icon"></span><span class="title">{{showMoreLabel}}</span></div>  <div class="back"><span class="icon"></span><span class="title">{{goBackLabel}}</span></div>  <div class="reversed-back"><span class="icon"></span><span class="title">{{goBackLabel}}</span></div>  <div class="search"><span class="icon"></span><span class="title">{{searchLabel}}</span></div>  <div class="home"><span class="icon"></span><span class="title">{{goHomeLabel}}</span></div>  <div class="delete"><span class="icon"></span><span class="title">{{deleteLabel}}</span></div></div>');
            a.M(M.I + "/rebound/message.html", "<div>{{message}}</div>");
            a.M(M.I + "/rebound/progress_bar.html", '<div class="{{getRootClassName()}}">  <div class="loaded" style="width:{{getLoadedWidth()}}" ></div>  <div class="played" style="width:{{getPlayedWidth()}}"></div></div>');
            a.M(M.I + "/rebound/scroll_pane.html", '<div>  <div class="scrolling-text"></div>  <div class="scrollbar">    <div class="handle"></div>  </div></div>');
            a.M(M.I + "/rebound/subtitled_button.html", '<div class="button">  <span>{{model.label}}</span>  <span class="subtitle">{{model.subtitle}}</span></div>');
            a.M(M.I + "/rebound/suggestions.html", '<div>  <ul class="$list" data-model="{{model.suggestions}}" data-catch-mouse-move="true">    <li>{{model}}</li>  </ul></div>');
            a.M(M.I + "/rebound/super_scroller.html", '<div>  <div class="$list" data-model="{{collection}}" data-item-name="feed-icon">  </div></div>');
            a.M(M.I + "/rebound/tiles/action.html", '<div class="item action-tile">  <div class="content {{model.tileClass}}">    <div class="title">{{model.title}}</div>    <div class="large-action-icon {{model.iconClass}}"></div>    <div class="description">{{model.description}}</div>  </div></div>');
            a.M(M.I + "/rebound/tiles/dvr_clip.html", '<div class="item video-tile">  <div class="top">    <div class="video-thumb"></div>    \x3c!-- TODO (aleksandrc): Add voice support.    <div class="voice-command">{{getSpeechPhrase()}}</div> --\x3e    <div class="duration hidden">{{model.durationSec}}</div>  </div>  <div class="bottom">    <div class="title">{{model.clipName}}</div>    <div class="overlay"><span class="updated">{{model.dateRecorded}}</span></div>  </div></div>');
            a.M(M.I + "/rebound/tiles/kenko.html", '<div class="item action-tile">  <div class="content">    <div class="title">\u5065\u5eb7\u306e\u305f\u3081\u306e<br>\u3054\u6ce8\u610f</div>  </div></div>');
            a.M(M.I + "/rebound/tiles/loading_tile.html", '<div class="item video-tile loading-tile">  <div class="top">    <div class="video-thumb preloaded"></div>  </div>  <div class="bottom">    <div class="title">[[Loading...|Tooltip displayed when some data is loading.]]</div>  </div></div>');
            a.M(M.I + "/rebound/tiles/playlist_tile.html", '<div class="item video-tile playlist-tile">  <div class="top">    <div class="video-thumb"></div>    <div class="voice-command">{{getSpeechPhrase()}}</div>    <div class="count-overlay"><span class="video-count">{{model.videoCount}}</span> <span>{{model.videoString}}</span></div>  </div>  <div class="bottom">    <div class="title">{{model.title}}</div>    <div class="details">      <span class="name">{{model.channel.displayName}}</span>      <span class="updated">{{model.uploadedDateLabel}}</span>    </div>    <div class="set">      <span class="title">{{model.firstVideoTitle}}</span>      <span class="count">[[1 of {{model.videoCount}}|Label describing the position of the first video in the playlist.]]</span>    </div>  </div></div>');
            a.M(M.I + "/rebound/tiles/post_play_tile.html", '<div>  <div class="post-play-title">    <span class="default-title">[[You may also like...|Label informing the user that they may enjoy these videos.]]</span>    <span class="next-up-title">[[Next up in <span class="row-title">{{getRowTitle()}}</span>|Informs the user of the next video that will play in this playlist. This is followed by the title of the playlist.]]</span>  </div>  <div class="$videoTile" data-model="{{model}}"></div>  <div class="post-play-countdown">{{countdown}}</div></div>');
            a.M(M.I + "/rebound/tiles/recent_search.html", '<div class="item action-tile">  <div class="content recent-search-tile">    <div class="top">      <div class="video-thumb" style="background-image: url({{model.imageUrl}});"></div>    </div>    <div class="bottom">      <div class="title">{{model.title.toLowerCase()}}</div>      <div class="overlay">[[{{model.totalResultsLocalized}} results|Displays how many different searches a user has performed.]]</div>    </div>  </div></div>');
            a.M(M.I + "/rebound/tiles/remote_pairing.html", '<div class="item action-tile">  <div class="content">    <div class="title {{model.getTitleClass()}}">{{model.getTitle()}}</div>    <div class="remote-pair-icon"></div>    <div class="remote-pair-text">[[Find videos on your mobile device and watch on your TV.|Tooltip explains that a user will be able to use their mobile device to find videos and watch them via the application.]]</div>  </div></div>');
            a.M(M.I + "/rebound/tiles/reset_pairing.html", '<div class="item action-tile">  <div class="content">    <div class="title">{{model.title}}</div>    <div class="remote-reset-phone">      <div class="remote-count">{{model.deviceCount}}</div>    </div>    <div class="remote-reset-help">[[Delete all paired devices?|Button that allows a user to disconnect mobile phones from the application.]]</div>  </div></div>');
            a.M(M.I + "/rebound/tiles/search.html", '<div class="item action-tile">  <div class="content search-tile">    <div class="title">[[Search|Clicking this launches the search interface.]]</div>    <div class="large-action-icon search-icon"></div>    <div class="description">[[{{model.searchCount}} recent search(es)|Displays how many search a user has performed recently.]]</div>  </div></div>');
            a.M(M.I + "/rebound/tiles/shiyojo.html", '<div class="item action-tile">  <div class="content">    <div class="title">\u4f7f\u7528\u4e0a\u306e<br>\u3054\u6ce8\u610f</div>  </div></div>');
            a.M(M.I + "/rebound/tiles/sign_out.html", '<div class="item action-tile">  <div class="content">    <div class="title display-name">{{model.getTitle()}}</div>    <div class="platform-container">      <div class="platform-user-icon" style="background-image:url({{model.channel.platformUserIcon}})"></div>      <span class="platform-user-name">{{model.channel.platformUserName}}</span>    </div>    <div class="sign-out-user-icon" style="background-image:url({{model.channel.imageUrl}})"></div>    <div class="sign-out-username">{{model.getUserName()}}</div>  </div></div>');
            a.M(M.I + "/rebound/tiles/togglable.html", '<div class="item action-tile">  <div class="content">    <div class="title">{{model.title}}</div>    <div class="status">      <div>{{model.getToggleStatus()}}</div>      <div class="icon {{model.getToggleClass()}}"></div>    </div>    <div class="description">{{model.description}}</div>  </div></div>');
            a.M(M.I + "/rebound/tiles/video_tile.html", '<div class="item video-tile">  <div class="top">    <div class="video-thumb"></div>    <div class="voice-command">{{getSpeechPhrase()}}</div>    <div class="duration hidden">{{model.durationLabel}}</div>  </div>  <div class="bottom">    <div class="title">{{model.title}}</div>    <div class="overlay">      [[Published on <span class="updated">{{model.uploadedDateLabel}}</span> by <span class="name">{{model.channel.displayName}}</span>|Label that represents the date when a video was uploaded.]]    </div>    <div class="details">      <div class="activity">{{model.activityDescription}}</div>      <div class="description">{{getDescriptionText()}}</div>    </div>  </div></div>');
            a.M(M.I + "/rebound/toaster.html", '<div>  <ul class="$list" data-model="{{model}}"></ul></div>');
            a.M(M.I + "/rebound/toasts/device_toast.html", '<div class="toast">  <div class="toast-container">    <div class="toast-icon {{iconClass}}">&nbsp;</div>    <div class="toast-msg">{{message}}</div>  </div></div>');
            a.M(M.I + "/rebound/toasts/volume_toast.html", '<div class="toast">  <div class="toast-container">    <div class="toast-icon {{iconClass}}">&nbsp;</div>    <div class="toast-progress">      <div class="progress" style="width: {{model.volume}}%">&nbsp;</div>    </div>    <div class="toast-msg">{{message}}</div>  </div></div>');
            a.M(M.I + "/rebound/transliteration.html", '<div>  <div class="$list" data-model="{{transliterations}}">  </div></div>');
            a.M(M.I + "/rebound/transport_controls.html", '<div id="player-controls-container">  <div class="player-controls-widget">    <div id="player-controls" class="player-controls">      <div id="button-list" class="$list" data-model="{{buttonCollection}}">      </div>    </div>    <div class="player-seekbar">      <div id="progress-bar" class="$progress-bar"></div>      <div class="player-time-elapsed">{{elapsedTime}}</div>      <div class="player-time-total">{{totalTime}}</div>    </div>  </div></div>');
            a.M(M.I + "/rebound/voice_footer.html", "<ul>  <li>{{model}}</li></ul>");
            a.M(M.I + "/rebound/watch_title_tray.html", '<div class="title-card">  <div class="player-meta">    <div class="player-video-avatar" style="background-image:url(\'{{channelAvatarUrl}}\')"></div>    <div class="player-video-title">{{videoTitle}}</div>    <div class="player-video-details">      <div class="username">{{channelName}}</div>      <div class="set-context hidden">[[{{playlistTitle}}: {{videoIndex}} of {{videoCount}}|The playlist title and the index of the current video in the playlist.]]</div>      <div class="uploaded-date">{{uploadedDate}}</div>      <div class="view-count"><span>[[Views:|VIEWS]] </span><span class="view-count-label">{{viewCountLabel}}</span></div>    </div>  </div></div>');
            a.M(M.I + "/app.html", '<div id="app-markup">  <yt:watch id="watch" activate-when="focusable.elementIdEquals(application.activeChildName)" data="application.watchModel.currentVideo"></yt:watch>  <div id="browse" class="$browse"></div>  <yt:search id="search" activate-when="focusable.elementIdEquals(application.activeChildName)"></yt:search>  <div class="$call-to-cast"></div>  <div class="logo-container icon-youtube-logo"></div>  <div class="$message"></div>  <div id="spinner-container" style="display: none;">    <div class="fallback-loading-indicator">[[LOADING...|Indicator that content is loading from the network.]]</div>    <div class="carousel-loading-indicator"></div>  </div>  <div class="$debug-watermark"></div>  <yt:dialog id="dialog" activate-when="focusable.elementIdEquals(application.activeChildName)"></yt:dialog>  <div class="$legend" id="legend"></div>  <div class="$toaster"></div>  <div class="$engagement-indicator"></div></div>', "angularTemplatePreprocessor");
            a.M(M.I + "/dialogs/confirm_cookies_disable.html", "<div>[[Are you sure you'd like to disable cookies? Disabling cookies is not advised and may lead to performance issues.|Dialog title for a message confirming that the user wishes to disable cookies for the app on their device.]]</div>", "angularTemplatePreprocessor");
            a.M(M.I + "/dialogs/dialog.html", '<div>  <div id="dialog-wrapper">    <div class="dialog-icon"></div>    <div class="dialog-contents">      <div class="title"></div>      <div id="inner-dialog-container"></div>      <div class="buttons">        <div class="$button" id="confirm-dialog-cancel-button" data-on-enter="{{cancelClickHandler}}"></div>        <div class="$button" id="confirm-dialog-ok-button" data-on-enter="{{okClickHandler}}"></div>      </div>    </div>  </div></div>', "angularTemplatePreprocessor");
            a.M(M.I + "/dialogs/kenko_warning.html", '\x3c!--  Kenko is a health warning required for PS3 devices licensed in JAPAN.  - The first warning is about flashing lights and seizures.  - The second warning is about fatigue and pain.  - The third warning is about limiting exposure of young children to 3D content.  - The last warning is about sleep deprivation.//--\x3e<div>  <div id="kenko">    <div>      <p><div class="warning"></div>\u8b66\u544a</p>      <p>\u5149\u306e\u523a\u6fc0\u306b\u3088\u3063\u3066\u5f15\u304d\u8d77\u3053\u3055\u308c\u308b\u767a\u4f5c\u306b\u3064\u3044\u3066</p>      <p>\u70b9\u6ec5\u3092\u7e70\u308a\u8fd4\u3059\u753b\u9762\u3084\u3001\u305d\u306e\u4ed6\u306e\u5149\u306e\u523a\u6fc0\u306b\u3088\u3063\u3066\u3001\u307e\u308c\u306b\u3001\u76ee\u306e\u75db\u307f\u3001\u8996\u899a\u7570\u5e38\u3001\u504f\u982d\u75db\u3001\u3051\u3044\u308c\u3093\u3084\u610f\u8b58\u969c\u5bb3\uff08\u5931\u795e\u306a\u3069\uff09\u306a\u3069\u306e\u75c7\u72b6\uff08\u5149\u611f\u53d7\u6027\u767a\u4f5c\uff09\u304c\u8d77\u304d\u308b\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002\u3053\u3046\u3057\u305f\u75c7\u72b6\u306e\u3042\u308b\u65b9\u306f\u3001\u4e8b\u524d\u306b\u5fc5\u305a\u533b\u5e2b\u306b\u76f8\u8ac7\u3057\u3066\u304f\u3060\u3055\u3044</p>    </div>    <div>      <p><div class="warning"></div>\u6ce8\u610f</p>      <p>\u3053\u3093\u306a\u3068\u304d\u306f\u3059\u3050\u306b\u30d7\u30ec\u30a4\u3092\u4e2d\u6b62\u3059\u308b</p>      <p>\u4e0a\u8a18\u306e\u75c7\u72b6\u306b\u52a0\u3048\u3001\u982d\u75db\u3001\u3081\u307e\u3044\u3001\u5410\u304d\u6c17\u3001\u75b2\u52b4\u611f\u3001\u4e57\u308a\u7269\u9154\u3044\u306b\u4f3c\u305f\u75c7\u72b6\u306a\u3069\u3092\u611f\u3058\u305f\u3068\u304d\u3084\u3001\u76ee\u3001\u8033\u3001\u624b\u3001\u8155\u3001\u8db3\u306a\u3069\u3001\u8eab\u4f53\u306e\u4e00\u90e8\u306b\u4e0d\u5feb\u611f\u3084\u75db\u307f\u3092\u611f\u3058\u305f\u3068\u304d\u306f\u3001\u3059\u3050\u306b\u30d7\u30ec\u30a4\u3092\u4e2d\u6b62\u3057\u3066\u304f\u3060\u3055\u3044\u3002\u30d7\u30ec\u30a4\u3092\u4e2d\u6b62\u3057\u3066\u3082\u6cbb\u3089\u306a\u3044\u3068\u304d\u306f\u3001\u533b\u5e2b\u306e\u8a3a\u5bdf\u3092\u53d7\u3051\u3066\u304f\u3060\u3055\u3044\u3002</p>    </div>    <div>      <p>3D\u6620\u50cf\u30013D\u7acb\u4f53\u8996\u30b2\u30fc\u30e0\u306b\u3064\u3044\u3066</p>    3D\u6620\u50cf\u306e\u898b\u3048\u65b9\u306b\u306f\u500b\u4eba\u5dee\u304c\u3042\u308a\u307e\u3059\u3002\u9055\u548c\u611f\u3092\u611f\u3058\u305f\u308a\u3001\u7acb\u4f53\u306b\u898b\u3048\u306a\u3044\u5834\u5408\u306f\u30013D\u6a5f\u80fd\u306e\u3054\u4f7f\u7528\u3092\u304a\u63a7\u3048\u304f\u3060\u3055\u3044\u3002\u6700\u65b0\u60c5\u5831\u306b\u3064\u3044\u3066\u306f\u4e0b\u8a18URL\u3092\u3054\u89a7\u304f\u3060\u3055\u3044\u3002    http://www.jp.playstation.com/support/</p>      <p>\u306a\u304a\u3001\u304a\u5b50\u3055\u307e\uff08\u7279\u306b6\u6b73\u672a\u6e80\u306e\u5b50\uff09\u306e\u8996\u899a\u306f\u767a\u9054\u6bb5\u968e\u306b\u3042\u308a\u307e\u3059\u3002\u304a\u5b50\u3055\u307e\u304c3D\u6620\u50cf\u3092\u8996\u8074\u3057\u305f\u308a\u30013D\u7acb\u4f53\u8996\u30b2\u30fc\u30e0\u3092\u30d7\u30ec\u30a4\u3059\u308b\u524d\u306b\u3001\u5c0f\u5150\u79d1\u3084\u773c\u79d1\u306a\u3069\u306e\u533b\u5e2b\u306b\u3054\u76f8\u8ac7\u3044\u305f\u3060\u304f\u3053\u3068\u3092\u304a\u3059\u3059\u3081\u3057\u307e\u3059\u3002</p>    </div>    <div>      <p>\u30b3\u30f3\u30c8\u30ed\u30fc\u30e9\u306e\u632f\u52d5\u6a5f\u80fd\u306b\u5bfe\u5fdc\u3057\u305f\u30bd\u30d5\u30c8\u30a6\u30a7\u30a2\u306b\u3064\u3044\u3066</p>      <p>\u632f\u52d5\u969c\u5bb3\u306e\u3042\u308b\u65b9\u306f\u3001\u30d0\u30a4\u30d6\u30ec\u30fc\u30b7\u30e7\u30f3\uff08\u632f\u52d5\uff09\u6a5f\u80fd\u3092\u4f7f\u7528\u3057\u306a\u3044\u3067\u304f\u3060\u3055\u3044\u3002</p>      <p>\u203b\u632f\u52d5\u6a5f\u80fd\u306e\u5165\uff0f\u5207\u306f\u3001\u30b3\u30f3\u30c8\u30ed\u30fc\u30e9\u306ePS\u30dc\u30bf\u30f3\u3092\u62bc\u3057\u3066\u8868\u793a\u3055\u308c\u308b\u30e1\u30cb\u30e5\u30fc\u304b\u3089\u8a2d\u5b9a\u3067\u304d\u307e\u3059\u3002</p>    </div>    <div>      <ul class="ul">        <li>\u30d7\u30ec\u30a4\u3059\u308b\u3068\u304d\u306f\u3001\u90e8\u5c4b\u3092\u660e\u308b\u304f\u3057\u3001\u3067\u304d\u308b\u3060\u3051\u753b\u9762\u304b\u3089\u96e2\u308c\u3066\u304f\u3060\u3055\u3044\u3002</li>        <li>\u75b2\u308c\u3066\u3044\u308b\u3068\u304d\u3084\u7761\u7720\u4e0d\u8db3\u306e\u3068\u304d\u306f\u3001\u30d7\u30ec\u30a4\u3092\u907f\u3051\u3066\u304f\u3060\u3055\u3044\u3002</li>        <li>\u30d7\u30ec\u30a4\u3059\u308b\u3068\u304d\u306f\u5065\u5eb7\u306e\u305f\u3081\u30011\u6642\u9593\u3054\u3068\u306b15\u5206\u7a0b\u5ea6\u306e\u4f11\u61a9\u3092\u53d6\u3063\u3066\u304f\u3060\u3055\u3044\u3002</li>        <li>\u30d7\u30ec\u30a4\u4e2d\u306b\u4f53\u8abf\u304c\u60aa\u304f\u306a\u3063\u305f\u3089\u3001\u3059\u3050\u306b\u30d7\u30ec\u30a4\u3092\u3084\u3081\u3066\u304f\u3060\u3055\u3044\u3002</li>      </ul>    </div>  </div></div>', "angularTemplatePreprocessor");
            a.M(M.I + "/dialogs/paid_scope.html", "<div>[[View and manage your rental and purchase history. Please note: This means your rental and purchase history may be displayed and accessible on this device.|This is a dialog subtitle that list a permission that the application is requesting.]]</div>", "angularTemplatePreprocessor");
            a.M(M.I + "/dialogs/shiyojo_warning.html", '\x3c!--  Shiyojo is a warning required for PS3 devices licensed in Japan.  - This is a PS3 only app.  - When displayed in a TV other than an LCD TV an afterimage may be burned  into the device if the game/app is left paused for too long.//--\x3e<div id="shiyojo">  <ul>    <li>\u3053\u306e\u30bd\u30d5\u30c8\u30a6\u30a7\u30a2\u306fPlayStation&#174;3\u5c02\u7528\u3067\u3059\u3002</li>    <li>PlayStation&#174;3\u3092\u30d7\u30e9\u30ba\u30de\u30c6\u30ec\u30d3\u3084\u3001\u6db2\u6676\u65b9\u5f0f\u4ee5\u5916\u306e\u30d7\u30ed\u30b8\u30a7\u30af\u30b7\u30e7\u30f3\u30c6\u30ec\u30d3\uff08\u30b9\u30af\u30ea\u30fc\u30f3\u6295\u5f71\u65b9\u5f0f\u30c6\u30ec\u30d3\uff09\u306b\u3064\u306a\u3050\u3068\u3001\u753b\u50cf\u306e\u713c\u304d\u4ed8\u304d\uff08\u6b8b\u50cf\u6620\u50cf\uff09\u304c\u8d77\u3053\u308b\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002\u7279\u306b\u3001\u9759\u6b62\u753b\u3092\u30c6\u30ec\u30d3\u753b\u9762\u306b\u8868\u793a\u3057\u305f\u307e\u307e\u9577\u6642\u9593\u653e\u7f6e\u3059\u308b\u3068\u3001\u713c\u304d\u4ed8\u304d\u304c\u8d77\u3053\u308a\u3084\u3059\u304f\u306a\u308a\u307e\u3059\u3002</li>    <li>PlayStation&#174;3\u306e\u30b7\u30b9\u30c6\u30e0\u30bd\u30d5\u30c8\u30a6\u30a7\u30a2\u306f\u3001\u5e38\u306b\u6700\u65b0\u306e\u3082\u306e\u306b\u30d0\u30fc\u30b8\u30e7\u30f3\u30a2\u30c3\u30d7\u3057\u3066\u304a\u4f7f\u3044\u304f\u3060\u3055\u3044\u3002</li>  </ul>  <div class="small-print">    "<div class="playstation-logo"></div>", "PlayStation", "<div class="ps3-logo"></div>", "PSN logo", "DUALSHOCK" and "SIXAXIS" are registered trademarks of Sony Computer Entertainment Inc.    <p>"XMB" and "\u30af\u30ed\u30b9\u30e1\u30c7\u30a3\u30a2\u30d0\u30fc" are trademarks of Sony Corporation and Sony Computer Entertainment Inc.</p>    <p>Library programs &#169;Sony Computer Entertainment Inc.</p>    "<div class="playstation-logo"></div>"&#169;1994 Sony Computer Entertainment Inc.</p>  <div></div>', "angularTemplatePreprocessor");
            a.M(M.I + "/dialogs/simple_dialog.html", '<div ng-include="dialog.data.contentUrl"></div>', "angularTemplatePreprocessor");
            a.M(M.I + "/empty.html", "<div></div>", "angularTemplatePreprocessor");
            a.M(M.I + "/keyboard.html", '<div>  <div id="transliteration-container">    <div id="transliteration" class="$transliteration" data-lang-code-pair="{{langCodePair}}"></div>  </div>  <div id="keyboard-grid" class="$grid" data-model="{{model.layout.rows}}" data-catch-row-mouse-move="{{catchMouseMove}}" data-loop-rows="true" data-rate-limit="{{gridRateLimit}}"></div>  <div id="letter-suggest" class="$list" data-is-vertical="true" data-catch-mouse-move="true" data-model="{{letterSuggestions}}"></div></div>', "angularTemplatePreprocessor");
            a.M(M.I + "/letter_tile.html", "<li></li>", "angularTemplatePreprocessor");
            a.M(M.I + "/search.html", '<div class="controls">  <div id="search-text-box">    <input id="search-input" autocomplete="off" yt:focusable placeholder="[[Search...|Placeholder indicating that a user can start searching within a text box]]"/>    <span id="search-query"></span>  </div>  <div id="search-suggestions" class="$suggestions"></div>  <yt:keyboard id="search-keyboard"></yt:keyboard></div><div class="search-hint">  [[Voice search is not supported.|Message that tells Xbox One users that voice doesn\'t work for search.|1391152342]]</div><div class="search-pairing">  <div class="search-message">    <div class="title">[[Search Faster|Search pairing hint title]]</div>    [[Find videos with your mobile device or laptop and watch them here.|Search pairing hint that you can search on the remote and play on the TV screen.]]  </div>  <div class="$pairing"></div></div>', "angularTemplatePreprocessor");
            a.M(M.I + "/watch.html", '<div id="leanback-player-container"></div><div class="$watch-title-tray" data-model="{{getCurrentVideo()}}"></div><div id="eureka-player-controls-container">  <div id="eureka-player-controls"></div></div><div class="$transport-controls"></div><div id="ad-callout" class="$advertisement-callout"></div><div id="branding-container">  <div class="branding-element">    <div id="branding-banner" class="hidden">      <img id="branding-banner-image" />      <div id="branding-banner-overlay">[[Up Next|Message indicating what video is coming next.]]</div>    </div>  </div>  <img id="branding-watermark" class="branding-element hidden"/></div>', "angularTemplatePreprocessor")
        }
        this.F.flush()
    }
    ;
    d.yw = function() {
        this.D.body.className = this.g.Uf
    }
    ;
    d.uw = function() {
        for (var a = ["gestureService", "resizeService", "soundService"], b = 0, c = a.length; b < c; ++b)
            this.b.get(a[b])
    }
    ;
    d.tw = function() {
        this.k.xa();
        this.w.xa();
        this.p.xa();
        this.K.xa()
    }
    ;
    d.xw = function() {
        this.o.g();
        this.j.j();
        this.A.xa()
    }
    ;
    d.ww = function() {
        this.h.isSupported() && this.h.registerExperiments(this.g.Ne())
    }
    ;
    Dm.inject = "document injector retentionReportingService audioConfigReporting crashReportingService environmentModel bountyService steelDialService localStorage shutdownService activityReportingService backendErrorReporting remoteService systemApi commandCenterInitializer".split(" ");
    function Em(a, b) {
        this.g = a;
        this.b = new dd(10,!0);
        this.h = b;
        this.iw()
    }
    d = Em.prototype;
    d.Co = function(a, b, c) {
        this.b.Ue(a, this.tn(a, b ? b.videoId : null, c));
        a = this.b.map(function(a, b) {
            return this.tn(b, a.videoId, a.totalResults)
        }, this);
        this.h.Vl && this.g.ya("recent-searches", a)
    }
    ;
    d.load = function() {
        return this.b.sa()
    }
    ;
    d.clear = function() {
        this.b.clear();
        this.g.remove("recent-searches");
        this.g.flush()
    }
    ;
    d.tn = function(a, b, c) {
        return {
            query: a,
            videoId: b,
            totalResults: c
        }
    }
    ;
    d.iw = function() {
        var a = this.g.get("recent-searches") || [];
        cc(a, function(a) {
            this.b.Ue(a.query, a)
        }, this)
    }
    ;
    Em.inject = ["localStorage", "environmentModel"];
    function Fm(a, b, c) {
        K.call(this);
        this.J = a;
        this.b = b;
        this.j = c;
        this.g = {
            exp: x(this.Bu, this),
            f5: x(this.Fu, this),
            hl: x(this.Hu, this),
            http: x(this.Gu, this),
            keys: x(this.Du, this),
            lbl: x(this.Cu, this),
            lclr: x(this.zu, this),
            ld: x(this.yu, this),
            llock: x(this.Ju, this),
            mcvpanta: x(this.xu, this),
            mdiag: x(this.Eu, this),
            movies: x(this.Au, this),
            stagegdata: x(this.Ku, this),
            wr: x(this.Iu, this)
        };
        this.h = ["mcvpanta", "wr"]
    }
    A(Fm, K);
    var Gm = /[-_]/
      , Hm = /^[a-z]+$/
      , Im = /^[a-f0-9]{8}$/
      , Jm = /^[a-z]+$/;
    Fm.prototype.isActive = function() {
        return !!this.b.O
    }
    ;
    d = Fm.prototype;
    d.zv = function(a) {
        if (a && " " == a[a.length - 1]) {
            var b = a.toLowerCase().split(" ")
              , c = b[0]
              , b = b.slice(1, b.length - 1);
            if (c in this.g && (this.isActive() || -1 < this.h.indexOf(c)))
                return (c = this.g[c](b)) && this.j.Co(a, null, 0),
                c
        }
        return !1
    }
    ;
    d.xu = function() {
        var a = this.isActive();
        this.b.O = !0;
        this.b.ga = !0;
        return a !== this.isActive()
    }
    ;
    d.Fu = function() {
        this.J.location.hash = "";
        this.J.location.reload(!0);
        return !0
    }
    ;
    d.Hu = function(a) {
        a = a[0];
        if (!a)
            return !1;
        a = a.replace(Gm, "");
        if (!Hm.test(a))
            return !1;
        3 < a.length && (a = a.substr(0, 2) + "_" + a.substr(2).toUpperCase());
        this.pd(ld("/tv", {
            hl: a
        }));
        return !0
    }
    ;
    d.Gu = function() {
        this.pd("http://www.youtube.com/tv");
        return !0
    }
    ;
    d.Du = function() {
        this.pd("https://kcdsfrdvcs.appspot.com");
        return !0
    }
    ;
    d.Cu = function(a) {
        return 1 == a.length && (a = a[0],
        Im.test(a)) ? (a = ld("/tv", {
            label: a
        }),
        this.pd(a),
        !0) : !1
    }
    ;
    d.yu = function(a) {
        return 1 == a.length && (a = a[0],
        Jm.test(a)) ? (a = ld("/tv", {
            loader: a
        }),
        this.pd(a),
        !0) : !1
    }
    ;
    d.Eu = function() {
        xf(M.yi + "/modules/media-diagnostics.js");
        return !0
    }
    ;
    d.Au = function() {
        return this.b.supportsDrm = !0
    }
    ;
    d.Ku = function() {
        return this.b.useStageGdata = !0
    }
    ;
    d.pd = function(a) {
        this.J.location.href = a
    }
    ;
    d.Bu = function(a) {
        var b = 0 < a.length && "" === a.pop() && a;
        return t(b) && !gc(b, isNaN) ? (a = ld("/tv", {
            env_forcedExperiments: a.join(",")
        }),
        this.pd(a),
        !0) : !1
    }
    ;
    d.Ju = function(a) {
        return 1 == a.length && (a = a[0],
        Im.test(a)) ? (ag.zj("yt-dev.stickyLabel", a, 86400, "/", document.domain || "google.com"),
        !0) : !1
    }
    ;
    d.zu = function() {
        cg("stickyLabel", "/", document.domain);
        return !0
    }
    ;
    d.Iu = function(a) {
        return 1 == a.length && (a = a[0],
        Im.test(a)) ? (a = ld("/tv", {
            wr_code: a
        }),
        this.pd(a),
        !0) : !1
    }
    ;
    Fm.inject = ["window", "environmentModel", "searchHistoryService"];
    function Km(a, b, c) {
        this.g = !1;
        this.b = q;
        this.k(a, b, c)
    }
    Km.prototype.k = function(a, b) {
        var c = x(this.h, this);
        "loading" == a.readyState ? a.addEventListener(b.p ? "readystatechange" : "DOMContentLoaded", c, !1) : c()
    }
    ;
    Km.prototype.h = function() {
        this.g = !0;
        this.b();
        this.b = q
    }
    ;
    Km.prototype.j = function(a) {
        this.g ? a() : this.b = a
    }
    ;
    Km.inject = ["document", "environmentModel", "timeService"];
    function Lm(a, b, c) {
        this.k = a;
        this.b = b;
        this.l = c;
        this.j = [];
        this.g = (a = this.b.get("device-retention-permission", 31536E4)) ? a.enabled : !0;
        this.h = 0;
        this.o = "private_data"
    }
    d = Lm.prototype;
    d.dD = function(a) {
        this.g = a;
        this.b.ya("device-retention-permission", {
            enabled: a
        }, 31536E4);
        this.Rv();
        this.h && this.l.clearTimeout(this.h);
        this.h = this.l.setTimeout(x(this.b.flush, this.b), 1E3)
    }
    ;
    d.su = function(a) {
        this.j.push(a)
    }
    ;
    d.Rv = function() {
        this.b.remove("private_data");
        this.j.forEach(function(a) {
            a()
        }, this)
    }
    ;
    d.Bm = function(a, b) {
        this.g && this.AD(a, b)
    }
    ;
    d.oo = function(a) {
        var b = this.b.get("private_data", 31536E3);
        return b ? b[a] : null
    }
    ;
    d.AD = function(a, b) {
        var c = this.b.get("private_data") || {};
        c[a] = b;
        this.b.ya("private_data", c, 31536E3)
    }
    ;
    d.DG = function(a, b, c, e) {
        this.g ? e ? this.k.jsonp(a, b, c) : this.k.get(a, b, c) : c && c()
    }
    ;
    Lm.inject = ["ytHttp", "localStorage", "timeService"];
    function Mm(a, b, c, e, f) {
        Y.call(this, c, e, "h5_exceptions_sw");
        this.j = a;
        this.J = b;
        this.k = f;
        this.g = {};
        qj(x(this.Xy, this))
    }
    A(Mm, Y);
    d = Mm.prototype;
    d.Vj = function() {
        return this.b.vl && Mm.B.Vj.call(this) || this.b.O
    }
    ;
    d.Xy = function(a) {
        this.sr(a.error, a)
    }
    ;
    d.sr = function(a, b) {
        var c = this.mD(a), e = b ? b.kD : "", f;
        f = b || a;
        var g = m("window.location.href");
        if (v(f))
            f = {
                message: f,
                name: "Unknown error",
                lineNumber: "Not available",
                fileName: g,
                stack: "Not available"
            };
        else {
            var k, l, n = !1;
            try {
                k = f.lineNumber || f.lD || "Not available"
            } catch (p) {
                k = "Not available",
                n = !0
            }
            try {
                l = f.fileName || f.filename || f.sourceURL || h.$googDebugFname || g
            } catch (u) {
                l = "Not available",
                n = !0
            }
            f = !n && f.lineNumber && f.fileName && f.stack && f.message && f.name ? f : {
                message: f.message || "Not available",
                name: f.name || "UnknownError",
                lineNumber: k,
                fileName: l,
                stack: f.stack || "Not available"
            }
        }
        g = f.message;
        console.error(c ? c : g);
        this.g[g] || (this.nD(f.name, g, f.fileName, f.lineNumber, e, c),
        this.g[g] = !0)
    }
    ;
    d.mD = function(a) {
        return a ? a.stacktrace || a.stack : ""
    }
    ;
    d.nD = function(a, b, c, e, f, g) {
        var k = {
            a: "logerror"
        }
          , l = this.j.get("watchModel");
        k.type = a;
        k.msg = b;
        k.vid = l.currentVideo ? l.currentVideo.videoId : "";
        a = this.j.get("locationService").zc();
        a = this.k.km(a);
        k.screen = a;
        y(k, this.b.Ub());
        k.t = "jserror";
        k.file = c;
        k.line = e;
        k.col = f;
        k.url = this.J.location.href;
        k.label = this.b.De;
        c = id(k);
        c = 2047 - ld("/gen_204", c).length + 26;
        g = encodeURIComponent(g);
        g = g.substr(0, c);
        c = g.lastIndexOf("%");
        2 >= g.length - c && (g = g.substr(0, c));
        k.stack = decodeURIComponent(g);
        this.h("/gen_204", k)
    }
    ;
    Mm.inject = ["injector", "window", "environmentModel", "privateDataService", "activityReportingService"];
    function Nm(a, b, c, e, f) {
        this.l = a;
        this.k = b;
        this.j = c;
        this.o = e;
        this.b = f || ""
    }
    Nm.prototype.send = function(a, b, c) {
        var e = "//gdata.youtube.com/feeds/api" + this.o
          , f = "";
        if (this.b && a)
            var g = be(this.b, a)
              , f = be(this.g(), {
                body: g
            });
        this.k.zb(x(function(g) {
            g && this.l.hi(this.j, e, a, f, b, c, this.h(g))
        }, this))
    }
    ;
    Nm.prototype.h = function(a) {
        return {
            Authorization: "Bearer " + a,
            "X-GData-Key": "key=AI39si5-UxCbfO2jRg9EV2bWI0UDWm74GkLzZWFHkQR0bm4d0JTKyrhSi6NZORaTMuJaRH8zs0PmsCONB9uV3pSgzZklwvMoRA",
            "Content-Type": "application/atom+xml",
            "GData-Version": "2"
        }
    }
    ;
    Nm.prototype.g = function() {
        return '<?xml version="1.0" encoding="UTF-8"?> <entry xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://gdata.youtube.com/schemas/2007">{body}</entry>'
    }
    ;
    Nm.inject = ["ytHttp", "authService", "httpMethod", "path", "opt_template"];
    function Z(a, b, c, e, f, g, k, l, n, p, u, r, E) {
        ej.call(this, a, b, c, e, f, g, k, l, u, r, E);
        this.U = n;
        this.sf = p
    }
    A(Z, ej);
    Z.prototype.he = function(a, b, c, e) {
        a.Ha = this.U;
        return ej.prototype.he.call(this, a, b, c, e)
    }
    ;
    Z.inject = "id path csiService ytHttp environmentModel authService cacheService backendErrorReporting listType brandable parser opt_paramKey opt_params".split(" ");
    function Om(a, b, c, e, f, g, k, l, n, p, u, r, E, R) {
        Z.call(this, a, b, c, e, f, g, k, l, n, p, u, E, R);
        this.h = r
    }
    A(Om, Z);
    Om.prototype.Md = function() {
        var a;
        if (this.b.k && this.b.Ib(ya)) {
            a = new yg(this,"[[My Uploads|Playlist title for videos uploaded by the current user.]]","icon-upload","default");
            var b = new W(this.h,"actionTile","request-video-uploads","[[Upload|Title for a tile that allows to upload a video.]]","","[[Upload a clip|Title for a tile that allows to upload a video.]]");
            a.j(b)
        } else
            a = new Q(this,"[[My Uploads|Playlist title for videos uploaded by the current user.]]","icon-upload","default");
        return a
    }
    ;
    Om.inject = "id path csiService ytHttp environmentModel authService cacheService backendErrorReporting listType brandable parser locale opt_paramKey opt_params".split(" ");
    function Pm(a, b, c, e, f, g, k, l, n, p, u, r, E, R, ea) {
        this.H = a;
        this.K = b;
        this.U = c;
        this.p = e;
        this.D = f;
        this.O = g;
        this.R = k;
        this.A = l;
        this.k = n;
        this.l = p;
        this.da = u;
        this.h = r;
        this.o = E;
        this.F = R;
        this.w = ea
    }
    Pm.prototype.load = function(a) {
        function b() {
            0 == --e && a(qc(c))
        }
        var c = [];
        c[0] = [this.b({
            Tb: this.H,
            title: "[[What to Watch|Title of a list of videos which mix therecommendations and the subscriptions of a user.]]",
            Ya: "icon-star"
        }), this.b({
            Tb: this.F,
            title: "[[My Subscriptions|Title for a list of videos that includes all of the channels that this user has subscribed to.|9186267]]",
            Ya: "icon-subscribe"
        })];
        c[3] = [this.b({
            Tb: this.O,
            title: "[[My Favorites|Title of playlist of the users favorite videos.]]",
            Ya: "icon-star"
        })];
        c[6] = [{
            Tb: this.K,
            title: "[[Recommended Videos for You|Title of playlist with videos recommended to a user.]]",
            Ya: "icon-reward"
        }, {
            Tb: this.D
        }, {
            Tb: this.R,
            title: "[[My Watch History|Title of a playlist with recently watched videos.]]",
            Ya: "icon-hourglass"
        }, {
            Tb: this.A,
            title: "[[My Activity|Title of a playlist with videos a user recently liked, or subscribed to.]]",
            Ya: "icon-speechbubble"
        }, {
            Tb: this.U,
            title: "[[My Watch Later Videos|Title of a playlist with videos a user was planning to watch later.]]",
            Ya: "icon-player-watchlater"
        }].map(x(this.b, this));
        var e = 4;
        this.l.Sb("start_browse", "", "us_rs", "us_r");
        var f = x(function(a, e) {
            var l = 50 * a;
            e && l > Math.min(e.Rb, 100) ? this.g(c, b, e, this.p, "displayName", 1, x(function(a) {
                return this.w.Pb(a)
            }, this)) : (l += 1,
            this.l.bb("default", x(function(b) {
                e ? e.Y.push(b.Y.la()) : e = b;
                f(a + 1, e)
            }, this), {
                "start-index": l
            }, function() {
                e || (e = new P);
                f(a + 1, e)
            }))
        }, this);
        f(0);
        this.k.Sb("start_browse", "", "up_rs", "up_r");
        this.k.bb("default", x(function(a) {
            this.g(c, b, a, this.da, "title", 2, function() {
                return "icon-playlist"
            })
        }, this), null, x(this.j, this, c, b, 2));
        this.o.Sb("start_browse", "", "feed_rs", "feed_r");
        this.o.load({}, x(function(a) {
            c[4] = a;
            b()
        }, this));
        this.h.Sb("start_browse", "", "si_rs", "si_r");
        this.h.load({
            query: "default",
            type: "channel"
        }, x(function(a) {
            this.g(c, b, a, this.p, "displayName", 5, x(function(a) {
                return this.w.Pb(a)
            }, this))
        }, this), x(this.j, this, c, b, 5))
    }
    ;
    Pm.prototype.g = function(a, b, c, e, f, g, k) {
        a[g] = c.Y.la().map(function(a) {
            return new Q(e,a[f],k(a.id),a.id)
        }, this);
        b()
    }
    ;
    Pm.prototype.j = function(a, b, c) {
        a[c] = [];
        b()
    }
    ;
    Pm.prototype.b = function(a) {
        return a.Tb.Md ? a.Tb.Md() : new Q(a.Tb,a.title,a.Ya,"default")
    }
    ;
    Pm.inject = "riverService recommendedVideosService watchLaterService userUploadsService myUploadsService userFavoritesService watchHistoryService activityService userPlaylistsService userSubscriptionsService playlistService channelSuggestionService featuredService newSubscriptionsService ytThumbnails".split(" ");
    function Qm(a) {
        this.b = a.document.body;
        a.addEventListener("resize", x(this.g, this), !1);
        this.g()
    }
    Qm.prototype.g = function() {
        Ig(this.b, "fontSize", ae(this.b.offsetHeight / 720))
    }
    ;
    Qm.inject = ["window"];
    function Rm(a, b) {
        K.call(this);
        this.J = b;
        this.k = "";
        this.h = {};
        this.l = "";
        this.j = this.p(a)
    }
    A(Rm, K);
    Rm.prototype.p = function(a) {
        var b = a.$on("$routeChangeStart", x(function(a, b, f) {
            this.L("beforeRouteChange", b, f)
        }, this));
        a = a.$on("$routeChangeSuccess", x(function(a, b, f) {
            this.L("afterRouteChange", b, f)
        }, this));
        return [b, a]
    }
    ;
    Rm.prototype.T = function() {
        for (var a = 0, b = this.j.length; a < b; ++a)
            this.j[a]();
        this.j = null;
        Rm.B.T.call(this)
    }
    ;
    var Sm = /#\/?(.*?)(?:\?|$)(.*)/;
    Rm.prototype.g = function() {
        this.o();
        return this.k
    }
    ;
    Rm.prototype.b = function() {
        this.o();
        return this.h
    }
    ;
    Rm.prototype.o = function() {
        var a = this.J.location.hash;
        this.l != a && (this.l = a,
        this.h = {},
        Sm.test(a) && (a = a.match(Sm),
        this.k = a[1],
        a[2] && this.w(a[2])))
    }
    ;
    Rm.prototype.w = function(a) {
        a = a.split("&");
        for (var b = 0, c = a.length; b < c; ++b) {
            var e = a[b].split("=")
              , f = decodeURIComponent(e[0])
              , e = decodeURIComponent(e[1]);
            this.h[f] = e
        }
    }
    ;
    Rm.inject = ["$rootScope", "window"];
    function Tm(a, b, c, e) {
        Y.call(this, a, b);
        this.H = c;
        this.ga = e;
        this.k = !1;
        this.l = this.O = this.da = this.F = this.K = 0;
        this.j = [];
        this.g = [];
        this.w = 0;
        this.p = "";
        this.R = 0;
        this.o = -1;
        this.U = null
    }
    A(Tm, Y);
    var Um = {
        vi: "a",
        ou: "tt",
        nu: "qt",
        iu: "hwl",
        hu: "features",
        gu: "ed",
        mu: "ql",
        lu: "oc",
        ku: "kpc",
        ju: "kb",
        wK: "flt",
        pu: "slot"
    };
    d = Tm.prototype;
    d.ND = function() {
        this.k || (this.F = this.K = this.H.Wb().getTime(),
        this.l = 0,
        this.p = "",
        this.o = -1,
        this.g.length = 0,
        this.j.length = 0,
        this.k = !0)
    }
    ;
    d.WC = function() {
        return this.k
    }
    ;
    d.jS = function(a) {
        var b = this.g.length;
        0 != b && this.g[b - 1] == a || this.g.push(a)
    }
    ;
    d.cy = function() {
        var a = this.g.length;
        1 < a && (this.g[0] = this.g[a - 1],
        this.g.length = 1)
    }
    ;
    d.RD = function() {
        this.k && (this.p = "",
        this.Wq(),
        this.k = !1)
    }
    ;
    d.hz = function(a) {
        var b = this.H.Wb().getTime();
        this.da = b - this.F;
        this.F = b;
        this.p = a;
        this.Wq()
    }
    ;
    d.Wq = function() {
        this.O = this.l;
        this.l = 0
    }
    ;
    d.ME = function() {
        ++this.R
    }
    ;
    d.zf = function(a) {
        ++this.l;
        a && ++this.w
    }
    ;
    d.Io = function(a) {
        this.U = a;
        this.fH()
    }
    ;
    d.Ho = function() {
        this.w = 0
    }
    ;
    d.zp = function(a) {
        for (var b = 0, c = this.j.length; b < c; ++b)
            if (this.j[b] == a)
                return;
        this.j.push(a)
    }
    ;
    d.GE = function(a) {
        this.o = a
    }
    ;
    d.VE = function() {
        var a = {};
        a[Um.vi] = "tv_search";
        a[Um.ou] = this.H.Wb() - this.K;
        a[Um.nu] = this.da;
        a[Um.ku] = this.O;
        0 < this.j.length && (a[Um.hu] = this.j.join(","));
        a[Um.gu] = this.w;
        a[Um.mu] = this.p.length;
        a[Um.lu] = this.U;
        a[Um.iu] = this.R;
        a[Um.ju] = this.g.join(",");
        -1 != this.o && (a[Um.pu] = this.o);
        y(a, this.b.Ub());
        return a
    }
    ;
    d.fH = function() {
        this.h("/gen_204", this.VE())
    }
    ;
    Tm.$inject = ["environmentModel", "privateDataService", "timeService", "locale"];
    function Vm(a, b, c, e, f) {
        this.o = a;
        this.k = b;
        this.g = c;
        this.j = e;
        this.l = f;
        this.b = new Tl(c,"searchTile","request-search",0);
        this.h = new W(c,"actionTile","request-clear-searches","[[CLEAR|A button that clears all of a users recent searches.]]","clear-search-icon","[[Clear search history|Displayed as menu item subtitle. Explains to a user that this item will clear previous search history.]]","search-tile")
    }
    Vm.prototype.load = function(a, b) {
        var c = new P
          , e = this.k.load();
        this.b.searchCount = e.length;
        c.Y.push(this.b);
        for (var f = this.j.R, g = 0, k = e.length; g < k; ++g) {
            var l = e[g];
            c.Y.push(new Rl(this.g,"recentSearchTile","request-recent-search",l.query,l.totalResults,l.videoId ? this.l.Je(l.videoId, f) : ""))
        }
        0 < e.length && c.Y.push(this.h);
        b && b(c)
    }
    ;
    Vm.prototype.Md = function() {
        var a = this.g.S("[[Search|Clicking this launches the search interface.]]");
        return new Ua(this,a,"icon-search","searchRow")
    }
    ;
    Vm.inject = ["$rootScope", "searchHistoryService", "locale", "environmentModel", "ytThumbnails"];
    function Wm(a, b, c, e, f, g, k) {
        Z.call(this, "searchService", "/videos", a, b, c, e, f, g, "SR", !1, k, "q", {
            fields: "title,logo,entry[$default-filter](title,yt:statistics,yt:hd,yt:claimed,yt:paidContent,yt:rating,media:group(yt:videoid,yt:duration,yt:uploaded,yt:uploaderId,media:credit,media:description)),openSearch:totalResults",
            "max-results": 50
        });
        this.D = {};
        this.h = "relevance";
        this.serviceQuery = ""
    }
    A(Wm, Z);
    Wm.prototype.load = function(a, b) {
        var c = this.j(a);
        return c.query ? Wm.B.load.call(this, c, b) : (c = new this.o.b,
        b && b(c),
        new ee(c))
    }
    ;
    Wm.prototype.j = function(a) {
        var b = {};
        y(b, this.D);
        !1 === b.hd && delete b.hd;
        a && y(b, a);
        this.h && (b.orderby = this.h);
        return b
    }
    ;
    Wm.prototype.da = function() {
        this.serviceQuery = ""
    }
    ;
    Wm.inject = "csiService ytHttp environmentModel authService cacheService backendErrorReporting videoParser".split(" ");
    function Xm(a, b, c, e, f, g, k, l, n, p) {
        this.R = a;
        this.A = b;
        this.D = c;
        this.H = e;
        this.j = f;
        this.h = g;
        this.F = k;
        this.K = l;
        this.g = n;
        this.p = p;
        this.O = {};
        this.w = new W(n,"actionTile","request-login","[[SIGN IN|Title of menu item which allows a user to sign in to the application with a YouTube account and see personalized content.]]","sign-in-user-icon","[[View your subscriptions, uploads, playlists, likes and more.|Explanatory text on a menu item. Explains access to what features a user will get access when she logs in.]]");
        this.o = new Xi(n,"signOutTile","request-logout");
        this.l = this.h.supportsPairing && new Ql(n,"pairTile","request-pairing",this.j.Zf().P()) || null;
        this.k = this.h.supportsPairing && new Sl(n,"resetPairingTile","request-remote-reset","[[DELETE|Title of the button that disconnects mobile phones from the application]]",this.j.$f().P()) || null;
        this.b = null;
        this.h.supportsPairing && this.j.C("pairing:changed", x(this.kt, this))
    }
    d = Xm.prototype;
    d.Sv = function() {
        this.b = [];
        if (this.h.supportsSounds) {
            var a = new Ul(this.g,"toggleTile","request-toggle-sounds","[[Sounds|Title for a tile that toggles sounds.]]","[[Turn on or off application sounds.|Description for a tile that toggles sounds made by the YouTube TV application]]",x(function() {
                return this.K.enabled
            }, this));
            this.b.push(a)
        }
        a = new W(this.g,"actionTile","request-view-help","[[Help|A button title that provides an access to the help page.]]","help-icon");
        this.b.push(a);
        a = new W(this.g,"actionTile","request-view-feedback","[[Feedback|A button title that provides an access to the feedback page.]]","feedback-icon");
        this.b.push(a);
        a = new Ul(this.g,"toggleTile","request-device-retention","[[Improve YouTube|Title for a tile that indicates whether a user can enable or disable whether the application gathers statistics about them.]]","[[Help improve YouTube by sending anonymous usage data.|Description for a tile that indicates whether a user can enable or disable whether the application gathers statistics about them.]]",x(function() {
            return this.F.g
        }, this));
        this.b.push(a);
        if (this.h.ga) {
            var a = new Ul(this.g,"toggleTile","request-toggle-video-info","Show Video Info","",x(function() {
                return this.h.isVideoInfoVisible
            }, this))
              , b = new W(this.g,"actionTile","request-debug-info","SHOW DEBUG INFO","warning");
            this.b.push(a);
            this.b.push(b)
        }
        this.h.Kl && (a = new W(this.g,"actionTile","request-view-credits","[[CREDITS|Button that shows credit information, giving credit to all open-source software used in building this product.]]"),
        this.b.push(a));
        this.p.isSupported() && this.p.showUsageWarning && (a = new W(this.g,"kenkoTile","request-view-kenko"),
        b = new W(this.g,"shiyojoTile","request-view-shiyojo"),
        this.b.push(a),
        this.b.push(b));
        a = new W(this.g,"actionTile","request-view-tos","[[Terms of Service and Privacy|Title of menu item which shows links to terms of service and privacy documents on youtube.com]]");
        this.b.push(a)
    }
    ;
    d.kt = function() {
        this.oG();
        this.A.bc()
    }
    ;
    d.oG = function() {
        this.l.deviceCount = this.j.Zf().P();
        this.k.deviceCount = this.j.$f().P()
    }
    ;
    d.load = function(a, b) {
        var c = b || q;
        this.D.zb(x(function(a) {
            a ? this.H.bb("default", x(this.Br, this, c), null, x(this.Br, this, c, null)) : this.Hq(c, null)
        }, this))
    }
    ;
    d.Br = function(a, b) {
        b || (b = new sh("",""));
        this.h.Xq(b);
        this.Hq(a, b)
    }
    ;
    d.Hq = function(a, b) {
        this.o.channel = b;
        var c = [];
        c.push(b ? this.o : this.w);
        this.h.supportsPairing && (c.push(this.l),
        0 < this.k.deviceCount && c.push(this.k));
        this.b && !this.h.ga || this.Sv();
        var e = new P;
        e.Y.ha(c.concat(this.b));
        a(e)
    }
    ;
    d.Md = function() {
        var a = this.g.S("[[Sign In & Settings|Menu item title that allows a user to sign in or change settings of the application.]]");
        return new Ua(this,a,"icon-player-settings","settingsRowService")
    }
    ;
    Xm.inject = "locationService angularHelper authService userProfileService remoteService environmentModel privateDataService soundService locale systemApi".split(" ");
    function en(a, b, c) {
        this.k = b;
        this.j = new yl(50);
        this.enabled = this.k.get("sound-enabled");
        void 0 === this.enabled && this.g();
        b = typeof a.webkitAudioContext;
        a = typeof a.AudioContext;
        if ("function" == b || "object" == b)
            this.b = new webkitAudioContext;
        else if ("function" == a || "object" == a)
            this.b = new AudioContext;
        this.b ? c.C("play-sound", x(this.l, this)) : console.error("Sound Service was created, but the platform has no audio context!")
    }
    en.prototype.l = function(a) {
        if (this.enabled) {
            a = a.detail;
            var b = this.j.get(a);
            b ? this.h(b) : (b = new am(M.yi + "/sound/" + a + ".wav"),
            this.j.add(a, b),
            b.g(this.b, x(this.h, this, b)))
        }
    }
    ;
    en.prototype.h = function(a) {
        if (a.b) {
            var b = this.b.createBufferSource();
            b.buffer = a.b;
            b.connect(this.b.destination);
            b.start(0)
        }
    }
    ;
    en.prototype.g = function() {
        this.enabled = !this.enabled;
        this.k.ya("sound-enabled", this.enabled)
    }
    ;
    en.$inject = ["window", "localStorage", "rootDispatcher"];
    function fn(a, b, c) {
        Y.call(this, a, b);
        this.k = c;
        this.g = !1;
        this.j = []
    }
    A(fn, Y);
    var gn = {
        vi: "a",
        Ry: "t",
        Qy: "s",
        Py: "alt"
    };
    d = fn.prototype;
    d.WE = function() {
        var a = {};
        a[gn.vi] = "tv_speech";
        var b = this.j.shift();
        a[gn.Ry] = b.text;
        a[gn.Qy] = b.Kw;
        a[gn.Py] = b.alternates;
        y(a, this.b.Ub());
        return a
    }
    ;
    d.oT = function() {
        return this.g
    }
    ;
    d.Yj = function(a) {
        if (this.g) {
            var b, c, e = [];
            if (a && a.text && 0 < a.confidenceScore) {
                b = a.text.toLowerCase();
                c = (100 * a.confidenceScore).toFixed();
                for (var f = 0, g = Math.min(3, a.alternates.length); f < g; ++f) {
                    var k = a.alternates[f];
                    e.push(k.text.toLowerCase() + "_" + (100 * k.confidenceScore).toFixed())
                }
            } else
                b = "",
                c = 0;
            this.j.push({
                text: b,
                Kw: c,
                alternates: e.join("-")
            });
            this.$A()
        }
    }
    ;
    d.zt = function() {
        this.g = !0
    }
    ;
    d.pT = function() {
        this.g = !1
    }
    ;
    d.$A = function() {
        this.h("/gen_204", this.WE())
    }
    ;
    fn.inject = ["environmentModel", "privateDataService", "timeService"];
    function hn(a, b, c, e, f) {
        wh.call(this, a, b, c, e);
        this.j = this.k = !1;
        this.l = [];
        this.K = f
    }
    A(hn, wh);
    d = hn.prototype;
    d.ug = function(a) {
        this.k ? a(this.j, this.h) : this.Dp(x(function(a, c) {
            a(!!c, !!c)
        }, this, a))
    }
    ;
    d.zb = function(a) {
        var b = this.wk();
        !b && this.j || !this.k ? this.Dp(a) : a(b)
    }
    ;
    d.Yc = function() {
        this.j = !1;
        hn.B.Yc.call(this)
    }
    ;
    d.Jr = function() {
        this.b.post("https://www.youtube.com/api/xbox/deregister", null, {
            style: "json"
        })
    }
    ;
    d.rr = function(a) {
        this.b.post("https://www.youtube.com/api/xbox/register", null, {
            token: a
        })
    }
    ;
    d.of = function(a, b) {
        this.k = !0;
        hn.B.of.call(this, a, b);
        this.j = !!this.wk()
    }
    ;
    d.Zg = function(a, b) {
        this.k && this.Yc();
        this.k = !0;
        this.j = !1;
        hn.B.Zg.call(this, a, b)
    }
    ;
    d.mk = function() {
        return this.K.getOauthClientSecret()
    }
    ;
    d.wh = function() {
        return this.K.getOauthClientId()
    }
    ;
    d.Dp = function(a) {
        var b = x(this.Pz, this);
        this.l.push(a);
        1 == this.l.length && this.b.post("https://www.youtube.com/api/xbox/refresh", null, {
            style: "json"
        }, x(this.of, this, b), x(this.Zg, this, b))
    }
    ;
    d.Pz = function(a) {
        for (var b = 0, c = this.l.length; b < c; ++b)
            this.l[b](a);
        this.l = []
    }
    ;
    hn.inject = ["ytHttp", "timeService", "localStorage", "environmentModel", "ssoApi"];
    function jn(a, b, c) {
        this.b = new bm(a);
        this.j = a;
        this.g = b;
        this.h = c;
        (a = this.uu()) && this.wu(Gf(a));
        this.lm();
        this.g.su(x(this.tu, this));
        a = x(this.vu, this);
        this.h.C("state:changed", a);
        this.h.ug(a)
    }
    d = jn.prototype;
    d.Fv = function() {
        return !this.b.k
    }
    ;
    d.vu = function(a, b) {
        this.b.j = a ? 1 : 0;
        a && (this.b.h = b || this.b.h,
        this.b.l = this.b.g,
        this.b.g = this.j.Sa,
        this.b.b || (this.b.b = this.b.g));
        this.lm()
    }
    ;
    d.Ww = function() {
        return {
            app_anon_id: this.b.id,
            firstactive: this.b.o,
            prevactive: this.b.k,
            firstactivegeo: this.b.p,
            loginstate: this.b.j,
            firstlogin: this.b.b,
            prevlogin: this.b.l,
            uga: this.b.h
        }
    }
    ;
    d.lm = function() {
        this.g.Bm("device-statistics", this.b.A())
    }
    ;
    d.uu = function() {
        return this.g.oo("device-statistics")
    }
    ;
    d.wu = function(a) {
        this.b.id = a.id;
        this.b.o = a.firstActive;
        this.b.p = a.firstActiveGeo;
        this.b.g = a.recentLogin;
        this.b.b = a.firstLogin;
        this.b.l = a.prevLogin;
        this.b.h = a.uga;
        this.b.j = a.loginState ? 1 : 0;
        this.b.k = a.recentActive
    }
    ;
    d.tu = function() {
        this.b = new bm(this.j)
    }
    ;
    jn.inject = ["environmentModel", "privateDataService", "authService"];
    !F || G(9);
    var kn = {
        OL: "zh-hant-t-i0-array-1992",
        PL: "zh-hans-t-i0-cangjie-1982",
        RL: "zh-hans-t-i0-cangjie-1987",
        QL: "zh-hant-t-i0-cangjie-1982",
        SL: "zh-hant-t-i0-cangjie-1987",
        TL: "yue-hant-t-i0-und",
        UL: "zh-hant-t-i0-dayi-1988",
        VL: "zh-t-i0-pinyin",
        WL: "zh-hant-t-i0-pinyin",
        XL: "am-t-i0-und",
        YL: "ar-t-i0-und",
        ZL: "be-t-i0-und",
        $L: "bn-t-i0-und",
        aM: "bg-t-i0-und",
        cM: "en-t-i0-und",
        bM: "nl-t-i0-und",
        dM: "fr-t-i0-und",
        eM: "de-t-i0-und",
        fM: "el-t-i0-und",
        gM: "gu-t-i0-und",
        hM: "he-t-i0-und",
        iM: "hi-t-i0-und",
        jM: "ja-hira-t-i0-und",
        kM: "it-t-i0-und",
        lM: "ja-t-ja-hira-i0-und",
        mM: "kn-t-i0-und",
        nM: "ml-t-i0-und",
        oM: "mr-t-i0-und",
        pM: "ne-t-i0-und",
        qM: "or-t-i0-und",
        rM: "fa-t-i0-und",
        sM: "pl-t-i0-und",
        tM: "pt-t-i0-und",
        uM: "pa-t-i0-und",
        vM: "ru-t-i0-und",
        wM: "sa-t-i0-und",
        xM: "sr-t-i0-und",
        yM: "si-t-i0-und",
        zM: "es-t-i0-und",
        AM: "ta-t-i0-und",
        BM: "te-t-i0-und",
        CM: "ti-t-i0-und",
        DM: "tr-t-i0-und",
        EM: "uk-t-i0-und",
        FM: "ur-t-i0-und",
        GM: "vi-t-i0-und",
        HM: "zh-t-i0-wubi-1986",
        IM: "zh-hant-t-i0-und",
        JM: "sq-t-k0-und",
        KM: "ar-t-k0-und",
        LM: "hy-hyr-t-k0-und",
        MM: "hy-hyt-t-k0-und",
        NM: "eu-t-k0-und",
        OM: "be-t-k0-und",
        PM: "bn-t-k0-und",
        QM: "bn-t-und-latn-k0-und",
        RM: "bs-t-k0-und",
        SM: "pt-br-t-k0-und",
        TM: "bg-t-k0-und",
        UM: "bg-t-k0-qwerty",
        VM: "ca-t-k0-und",
        WM: "chr-t-k0-und",
        XM: "chr-t-und-latn-k0-und",
        YM: "hr-t-k0-und",
        ZM: "cs-t-k0-und",
        $M: "cs-t-k0-qwertz",
        aN: "da-t-k0-und",
        bN: "prs-t-k0-und",
        cN: "hi-t-k0-qwerty",
        dN: "nl-t-k0-und",
        eN: "dz-t-k0-und",
        fN: "en-t-k0-und",
        gN: "en-t-k0-dvorak",
        hN: "et-t-k0-und",
        iN: "und-ethi-t-k0-und",
        jN: "fi-t-k0-und",
        kN: "fr-t-k0-und",
        lN: "gl-t-k0-und",
        mN: "ka-t-k0-und",
        nN: "ka-t-k0-legacy",
        oN: "de-t-k0-und",
        pN: "el-t-k0-und",
        qN: "gu-t-k0-und",
        rN: "gu-t-und-latn-k0-qwerty",
        sN: "pa-guru-t-k0-und",
        tN: "pa-guru-t-und-latn-k0-und",
        uN: "he-t-k0-und",
        vN: "hi-t-k0-und",
        wN: "hu-t-k0-101key",
        xN: "is-t-k0-und",
        yN: "it-t-k0-und",
        zN: "kn-t-k0-und",
        AN: "kn-t-und-latn-k0-und",
        BN: "kk-t-k0-und",
        CN: "km-t-k0-und",
        DN: "ko-t-k0-und",
        FN: "ky-cyrl-t-k0-und",
        GN: "lo-t-k0-und",
        HN: "lv-t-k0-und",
        IN: "lt-t-k0-und",
        JN: "mk-t-k0-und",
        KN: "ml-t-k0-und",
        LN: "ml-t-und-latn-k0-und",
        MN: "mt-t-k0-und",
        QN: "my-t-k0-und",
        NN: "mi-t-k0-und",
        ON: "mn-cyrl-t-k0-und",
        PN: "srp-t-k0-und",
        TN: "no-t-k0-und",
        UN: "or-t-k0-und",
        VN: "or-t-und-latn-k0-und",
        WN: "latn-002-t-k0-und",
        XN: "ps-t-k0-und",
        YN: "fa-t-k0-und",
        ZN: "pl-t-k0-und",
        $N: "pt-pt-t-k0-und",
        aO: "rom-t-k0-und",
        bO: "ro-t-k0-und",
        cO: "ro-t-k0-legacy",
        dO: "ro-t-k0-extended",
        eO: "ru-t-k0-und",
        fO: "ru-t-k0-qwerty",
        gO: "sa-t-und-latn-k0-und",
        hO: "sr-cyrl-t-k0-und",
        iO: "sr-latn-t-k0-und",
        jO: "si-t-k0-und",
        kO: "sk-t-k0-und",
        lO: "sk-t-k0-qwerty",
        mO: "sl-t-k0-und",
        nO: "uzs-t-k0-und",
        oO: "es-t-k0-und",
        pO: "sv-t-k0-und",
        qO: "de-ch-t-k0-und",
        rO: "ta-t-k0-ta99",
        sO: "ta-t-k0-und",
        uO: "ta-t-und-latn-k0-und",
        vO: "ta-t-k0-typewriter",
        tO: "ta-t-k0-itrans",
        wO: "tt-t-k0-und",
        xO: "te-t-k0-und",
        yO: "te-t-und-latn-k0-und",
        zO: "th-t-k0-und",
        AO: "th-t-k0-pattajoti",
        BO: "th-t-k0-tis",
        CO: "tr-t-k0-legacy",
        DO: "tr-t-k0-und",
        EO: "ug-t-k0-und",
        FO: "uk-t-k0-101key",
        GO: "ur-t-k0-und",
        IO: "uz-cyrl-t-k0-und",
        JO: "uz-cyrl-t-k0-legacy",
        LO: "uz-latn-t-k0-und",
        MO: "vi-t-k0-und",
        NO: "vi-t-k0-legacy",
        OO: "vi-t-k0-viqr",
        PO: "vi-t-k0-vni",
        QO: "yi-t-k0-und",
        RN: "ne-t-k0-und",
        SN: "ne-t-und-latn-k0-und",
        HO: "en-us-t-k0-intl",
        xK: "af-t-i0-handwrit",
        zK: "ar-t-i0-handwrit",
        BK: "be-t-i0-handwrit",
        CK: "bg-t-i0-handwrit",
        DK: "ca-t-i0-handwrit",
        IK: "cs-t-i0-handwrit",
        IL: "cy-t-i0-handwrit",
        JK: "da-t-i0-handwrit",
        SK: "de-t-i0-handwrit",
        TK: "el-t-i0-handwrit",
        LK: "en-t-i0-handwrit",
        MK: "eo-t-i0-handwrit",
        AL: "es-t-i0-handwrit",
        NK: "et-t-i0-handwrit",
        AK: "eu-t-i0-handwrit",
        pL: "fa-t-i0-handwrit",
        PK: "fi-t-i0-handwrit",
        OK: "fil-t-i0-handwrit",
        QK: "fr-t-i0-handwrit",
        aL: "ga-t-i0-handwrit",
        RK: "gl-t-i0-handwrit",
        UK: "gu-t-i0-handwrit",
        WK: "he-t-i0-handwrit",
        XK: "hi-t-i0-handwrit",
        HK: "hr-t-i0-handwrit",
        VK: "ht-t-i0-handwrit",
        YK: "hu-t-i0-handwrit",
        $K: "id-t-i0-handwrit",
        ZK: "is-t-i0-handwrit",
        bL: "it-t-i0-handwrit",
        cL: "ja-t-i0-handwrit",
        dL: "jv-t-i0-handwrit",
        eL: "ko-t-i0-handwrit",
        fL: "la-t-i0-handwrit",
        hL: "lt-t-i0-handwrit",
        gL: "lv-t-i0-handwrit",
        kL: "mi-t-i0-handwrit",
        iL: "mk-t-i0-handwrit",
        lL: "mr-t-i0-handwrit",
        jL: "ms-t-i0-handwrit",
        nL: "nb-t-i0-handwrit",
        KK: "nl-t-i0-handwrit",
        oL: "nn-t-i0-handwrit",
        mL: "no-t-i0-handwrit",
        uL: "pa-t-i0-handwrit",
        qL: "pl-t-i0-handwrit",
        rL: "pt-t-i0-handwrit",
        sL: "pt-br-t-i0-handwrit",
        tL: "pt-pt-t-i0-handwrit",
        vL: "ro-t-i0-handwrit",
        wL: "ru-t-i0-handwrit",
        yL: "sk-t-i0-handwrit",
        zL: "sl-t-i0-handwrit",
        yK: "sq-t-i0-handwrit",
        xL: "sr-t-i0-handwrit",
        CL: "sv-t-i0-handwrit",
        BL: "sw-t-i0-handwrit",
        DL: "te-t-i0-handwrit",
        EL: "th-t-i0-handwrit",
        FL: "tr-t-i0-handwrit",
        GL: "uk-t-i0-handwrit",
        HL: "vi-t-i0-handwrit",
        EK: "zh-t-i0-handwrit",
        FK: "zh-hans-t-i0-handwrit",
        GK: "zh-hant-t-i0-handwrit",
        JL: "zu-t-i0-handwrit"
    };
    function ln(a) {
        this.b = a;
        this.type = null;
        this.j = this.h = "en";
        this.nw();
        this.k = a
    }
    var mn = "ar-t-k0-und prs-t-k0-und he-t-k0-und ps-t-k0-und fa-t-k0-und uzs-t-k0-und ug-t-k0-und ur-t-k0-und yi-t-k0-und".split(" ")
      , nn = ["ar-t-i0-und", "he-t-i0-und", "fa-t-i0-und", "ur-t-i0-und"]
      , on = {};
    function pn(a) {
        if (!a)
            return null;
        xc(kn, a) || (a = qn(a));
        a = a.replace(/_/g, "-");
        xc(kn, a) || (a = qn(a + "-und"));
        return on[a] ? on[a] : xc(kn, a) ? (on[a] = new ln(a),
        on[a]) : null
    }
    var rn = "bn gu pa kn ml or sa ta te ne".split(" ")
      , sn = {
        im_pinyin_zh_hans: "zh-t-i0-pinyin",
        im_wubi_zh_hans: "zh-t-i0-wubi-1986",
        im_pinyin_zh_hant: "zh-hant-t-i0-pinyin",
        im_zhuyin_zh_hant: "zh-hant-t-i0-und",
        im_t13n_ja: "ja-t-ja-hira-i0-und",
        "im_t13n_ja-Hira": "ja-hira-t-i0-und",
        vkd_en_dvorak: "en-t-k0-dvorak",
        vkd_hy_east: "hy-hyr-t-k0-und",
        vkd_hy_west: "hy-hyt-t-k0-und",
        vkd_bg_phone: "bg-t-k0-qwerty",
        vkd_cs_qwertz: "cs-t-k0-qwertz",
        vkd_deva_phone: "hi-t-k0-qwerty",
        vkd_ethi: "und-ethi-t-k0-und",
        vkd_ka_qwerty: "ka-t-k0-und",
        vkd_ka_typewriter: "ka-t-k0-legacy",
        vkd_guru_inscript: "pa-guru-t-k0-und",
        vkd_guru_phone: "pa-guru-t-und-latn-k0-und",
        vkd_gu_phone: "gu-t-und-latn-k0-qwerty",
        vkd_hu_101: "hu-t-k0-101key",
        vkd_ro_sr13392_primary: "ro-t-k0-legacy",
        vkd_ro_sr13392_secondary: "ro-t-k0-extended",
        vkd_sk_qwerty: "sk-t-k0-qwerty",
        vkd_es_es: "es-t-k0-und",
        vkd_ta_tamil99: "ta-t-k0-ta99",
        vkd_ta_typewriter: "ta-t-k0-typewriter",
        vkd_ta_itrans: "ta-t-k0-itrans",
        vkd_tr_f: "tr-t-k0-legacy",
        vkd_tr_q: "tr-t-k0-und",
        vkd_uk_101: "uk-t-k0-101key",
        vkd_uz_cyrl_phone: "uz-cyrl-t-k0-und",
        vkd_uz_cyrl_type: "uz-cyrl-t-k0-legacy",
        vkd_vi_tcvn: "vi-t-k0-und",
        vkd_vi_telex: "vi-t-k0-legacy",
        vkd_vi_viqr: "vi-t-k0-viqr",
        vkd_chr_phone: "chr-t-und-latn-k0-und",
        vkd_th_pattajoti: "th-t-k0-pattajoti",
        vkd_th_tis: "th-t-k0-tis"
    }
      , tn = Cc(sn);
    function qn(a) {
        if (sn[a])
            return sn[a];
        if ("vkd_iw" == a)
            return "he-t-k0-und";
        if ("im_t13n_iw" == a)
            return "he-t-i0-und";
        if ("tr-t-k0-lagacy" == a)
            return "tr-t-k0-legacy";
        var b = a.split("_")
          , b = 0 == a.lastIndexOf("im_t13n", 0) ? b[2] + "-t-i0-und" : 2 == b.length ? b[1] + "-t-k0-und" : I(rn, b[1]) ? "inscript" == b[2] ? b[1] + "-t-k0-und" : b[1] + "-t-und-latn-k0-und" : b[1] + "-" + b[2] + "-t-k0-und";
        return xc(kn, b) ? b : a
    }
    d = ln.prototype;
    d.Xw = function() {
        if (tn[this.b])
            this.g = tn[this.b].slice(4);
        else {
            var a = this.b.split("-t-")
              , b = a[0]
              , a = a[1]
              , b = b.replace(/-/g, "_");
            "en_us" == b && (b = "us");
            !I(rn, b) || "und-latn-k0-und" != a && "k0-und" != a ? "k0-und" == a ? this.g = b : (a = a.match(/k0-(.*)/),
            a[1] && (this.g = b + "_" + a[1].replace("qwerty", "phone"))) : this.g = b + ("k0-und" == a ? "_inscript" : "_phone")
        }
    }
    ;
    d.nw = function() {
        0 <= this.b.indexOf("-i0") ? (this.type = "im",
        Wa(this.b, "-handwrit") && (this.type = "hw")) : 0 <= this.b.indexOf("-k0") && (this.type = "vkd");
        var a = this.b.split(/-t|-i0|-k0/);
        "yue-hant" == a[0] && (a[0] = "zh-Hant");
        switch (this.b) {
        case "yue-hant-t-i0-und":
            a[0] = "zh-Hant";
            break;
        case "zh-t-i0-pinyin":
        case "zh-t-i0-wubi-1986":
            a[0] = "zh-Hans"
        }
        this.h = this.Zn(a[0]);
        a[1] && (this.j = this.Zn(a[1]));
        "vkd" == this.type && this.Xw()
    }
    ;
    d.toString = function() {
        return this.b
    }
    ;
    d.dQ = function() {
        return this.LJ() ? "rtl" : "ltr"
    }
    ;
    d.LJ = function() {
        return I(nn, this.b) || I(mn, this.b)
    }
    ;
    d.MR = function() {
        return "im" == this.type ? /^(zh|yue)/.test(this.b) : !1
    }
    ;
    d.Zn = function(a) {
        if ("und-ethi" == a)
            return "et";
        a = a.split("-");
        return 2 == a.length ? 2 == a[1].length ? a[0] + "-" + a[1].toUpperCase() : a[0] + "-" + a[1].charAt(0).toUpperCase() + a[1].slice(1) : a[0]
    }
    ;
    d.cS = function() {
        return "im" == this.type && !/^(zh|yue|ja)/.test(this.b)
    }
    ;
    function un(a, b) {
        this.g = a;
        this.b = b;
        this.h = [a, b].join("|")
    }
    var vn = {};
    function wn(a, b) {
        "iw" == a ? a = "he" : "iw" == b && (b = "he");
        var c = [a, b].join("|");
        return vn[c] || (vn[c] = new un(a,b))
    }
    un.prototype.toString = function() {
        return this.h
    }
    ;
    un.prototype.j = function() {
        return wn(this.b, this.g)
    }
    ;
    var xn, yn, zn, An, Bn, Cn, Dn;
    Dn = Cn = Bn = An = zn = yn = xn = !1;
    var En = vb();
    En && (-1 != En.indexOf("Firefox") ? xn = !0 : -1 != En.indexOf("Camino") ? yn = !0 : -1 != En.indexOf("iPhone") || -1 != En.indexOf("iPod") ? zn = !0 : -1 != En.indexOf("iPad") ? An = !0 : -1 != En.indexOf("Chrome") ? Cn = !0 : -1 != En.indexOf("Android") ? Bn = !0 : -1 != En.indexOf("Safari") && (Dn = !0));
    var Fn = xn
      , Gn = yn
      , Hn = zn
      , In = An
      , Jn = Bn
      , Kn = Cn
      , Ln = Dn;
    function Mn(a) {
        return (a = a.exec(vb())) ? a[1] : ""
    }
    (function() {
        if (Fn)
            return Mn(/Firefox\/([0-9.]+)/);
        if (F || zb)
            return Pb;
        if (Kn)
            return Mn(/Chrome\/([0-9.]+)/);
        if (Ln)
            return Mn(/Version\/([0-9.]+)/);
        if (Hn || In) {
            var a;
            if (a = /Version\/(\S+).*Mobile\/(\S+)/.exec(vb()))
                return a[1] + "." + a[2]
        } else {
            if (Jn)
                return (a = Mn(/Android\s+([0-9.]+)/)) ? a : Mn(/Version\/([0-9.]+)/);
            if (Gn)
                return Mn(/Camino\/([0-9.]+)/)
        }
        return ""
    }
    )();
    function Nn(a, b, c) {
        this.url = a;
        this.payload = b;
        this.data = c ? c : null
    }
    ;function On(a, b) {
        null != a && this.append.apply(this, arguments)
    }
    d = On.prototype;
    d.Oc = "";
    d.yR = function(a) {
        this.Oc = "" + a
    }
    ;
    d.append = function(a, b, c) {
        this.Oc += a;
        if (null != b)
            for (var e = 1; e < arguments.length; e++)
                this.Oc += arguments[e];
        return this
    }
    ;
    d.clear = function() {
        this.Oc = ""
    }
    ;
    d.P = function() {
        return this.Oc.length
    }
    ;
    d.toString = function() {
        return this.Oc
    }
    ;
    function Pn(a, b, c) {
        this.text = t(a) ? a : [a];
        this.l = !!b;
        this.priority = void 0 == c ? 0 : c;
        this.status = "i"
    }
    Pn.prototype.getText = function() {
        return this.text[0]
    }
    ;
    Pn.prototype.w = function() {
        return "s" == this.status || "f" == this.status
    }
    ;
    function Qn(a, b, c, e, f) {
        Pn.call(this, a, c);
        this.g = this.h = 1;
        this.k = !!e;
        this.D = this.A = !1;
        this.j = "";
        this.p = !0;
        this.b = null;
        this.o = f ? lc(f) : null;
        b instanceof ln ? this.b = b : (a = b.b,
        this.b = "zh" == a || "zh-Hans" == a ? pn("zh-t-i0-pinyin") : "zh-Hant" == a ? pn("zh-hant-t-i0-und") : "ja" == a ? pn("ja-t-ja-hira-i0-und") : pn(a + "-t-i0-und"))
    }
    A(Qn, Pn);
    d = Qn.prototype;
    d.ZR = function() {
        return !1
    }
    ;
    d.iT = function() {
        return this.p
    }
    ;
    d.WS = function(a) {
        this.p = a
    }
    ;
    d.KS = function(a) {
        this.j = a
    }
    ;
    d.LQ = function() {
        return this.g || 0
    }
    ;
    d.Em = function(a) {
        this.g = 0 < a ? a : 0
    }
    ;
    d.Yg = function() {
        return this.h || 0
    }
    ;
    d.Dm = function(a) {
        this.h = 0 < a ? a : 0
    }
    ;
    Qn.prototype.getText = function() {
        return Qn.B.getText.call(this)
    }
    ;
    d = Qn.prototype;
    d.NR = function() {
        return [this.b.toString()]
    }
    ;
    d.kS = function(a) {
        return this.b != a.b || this.k || a.k || this.l || a.l || !(5 > this.text.length + a.text.length) || 0 != this.priority || 0 != a.priority ? !1 : (I(this.text, a.text) || mc(this.text, a.text),
        a.Yg() > this.Yg() && this.Dm(a.Yg()),
        !0)
    }
    ;
    d.AS = function(a) {
        return hc(a.text, function(b) {
            return I(this.text, b) && 0 == a.priority
        }, this) && this.h >= a.Yg()
    }
    ;
    d.qQ = function() {
        return this.b.b
    }
    ;
    d.zm = function(a) {
        for (var b = new On, c = 0; c < a.length; c++) {
            var e = a.charAt(c);
            switch (e) {
            case ",":
                b.append("%2C");
                break;
            case "|":
                b.append("%7C");
                break;
            case "%":
                b.append("%25");
                break;
            default:
                b.append(e)
            }
        }
        return b.toString()
    }
    ;
    d.YI = function(a, b) {
        var c = "";
        switch (this.b.h) {
        case "ja-Hira":
        case "ja":
            c = ",||t:1"
        }
        var e = new On;
        this.j && (e.append("|"),
        e.append(this.zm(this.j)),
        e.append(","));
        bc(this.text, function(a, b) {
            e.append(this.zm(a));
            b != this.text.length - 1 && e.append(",")
        }, this);
        e.append(c);
        c = {
            text: e.toString(),
            itc: this.b.b,
            num: this.g,
            cp: "0",
            cs: "1",
            ie: "utf-8",
            oe: "utf-8",
            app: "jsapi"
        };
        a.ru && (c.sct = a.ru);
        Ec(c, b);
        var f = this.o ? {
            feedback: fc(this.o, function(a) {
                return a.toJSON()
            })
        } : null;
        return new Nn("/request",c,f)
    }
    ;
    d.VQ = function(a) {
        var b = "";
        0 <= a && a < this.text.length && (b = this.text[a]);
        a = new Qn(b,this.b,this.l,this.k);
        a.Em(this.g);
        a.Dm(this.h);
        return a
    }
    ;
    function Rn(a) {
        this.h = a
    }
    Rn.prototype.b = function(a, b) {
        var c = new Qn(a,b);
        c.Em(15);
        c = c.YI({}, {});
        c.payload.app = "youtubetv";
        return qk("//inputtools.google.com" + c.url, c.payload)
    }
    ;
    Rn.prototype.g = function(a, b, c) {
        return this.h.jsonp(this.b(a, b), null, function(a) {
            var b = [];
            if (0 < a[1][0].length) {
                a = a[1][0][1];
                for (var g = 0, k = a.length; g < k; ++g)
                    b.push(a[g])
            }
            c(b)
        }, null, "cb")
    }
    ;
    Rn.inject = ["ytHttp"];
    function Sn(a, b) {
        this.b = a;
        this.g = b
    }
    Sn.prototype.load = function(a, b) {
        var c = b || q
          , e = new P;
        this.b.load({
            query: a.playlistId
        }, x(function(b) {
            e.Y.push(b.Y.la());
            this.g.load({
                query: a.videoId
            }, x(function(a) {
                e.Y.push(a.Y.la());
                c(e)
            }, this))
        }, this), ma(c, e))
    }
    ;
    Sn.inject = ["playlistService", "relatedVideosService"];
    function Tn(a, b, c) {
        K.call(this);
        this.h = {};
        this.l = {};
        this.b = {};
        this.g = {};
        this.p = b;
        this.o = c;
        this.w = x(this.wt, this);
        this.k = 0;
        this.j = a;
        this.A = x(this.xt, this);
        this.o.zt()
    }
    A(Tn, K);
    d = Tn.prototype;
    d.tm = function(a) {
        return !!this.g[a.rulename]
    }
    ;
    d.addCommand = function(a) {
        if (!this.tm(a)) {
            this.um();
            if (!this.h[a.text]) {
                var b = this.j.createCommand(a.text, this.A, a.pronunciation, a.minimalConfidence);
                this.h[a.text] = b
            }
            this.b[a.text] = this.b[a.text] || 0;
            this.b[a.text]++;
            this.g[a.rulename] = this.C(a.text, a.callback)
        }
    }
    ;
    d.removeCommand = function(a) {
        this.tm(a) && (this.um(),
        this.b[a.text] = this.b[a.text] || 0,
        this.b[a.text]--,
        this.g[a.rulename](),
        delete this.g[a.rulename])
    }
    ;
    d.um = function() {
        this.p.clearTimeout(this.k);
        this.k = this.p.setTimeout(this.w, 200)
    }
    ;
    d.wt = function() {
        for (var a in this.b) {
            var b = this.b[a]
              , c = this.l[a] || 0
              , e = c + b
              , f = this.h[a];
            this.l[a] = c + b;
            f && (0 < e && 0 == c ? this.j.addCommand(f) : 0 >= e && (this.j.removeCommand(f),
            this.h[a] = null))
        }
        this.b = {}
    }
    ;
    d.xt = function(a, b) {
        0.8 <= b.confidenceScore && this.L(a.text, a);
        this.o.Yj(b)
    }
    ;
    Tn.inject = ["speechApi", "timeService", "speechReporting"];
    for (var Un = "\u1100 \u1101 \u1100\u1109 \u1102 \u1102\u110c \u1102\u1112 \u1103 \u1105 \u1105\u1100 \u1105\u1106 \u1105\u1107 \u1105\u1109 \u1105\u1110 \u1105\u1111 \u1105\u1112 \u1106 \u1107 \u1107\u1109 \u1109 \u110a \u110b \u110c \u110e \u110f \u1110 \u1111 \u1112 \u1100\u1105".split(" "), Vn = {
        "\u1104": "\u1104",
        "\u1108": "\u1108",
        "\u110d": "\u110d"
    }, Wn = 0; Wn < Un.length; ++Wn)
        Vn[Un[Wn]] = String.fromCharCode(4520 + Wn);
    var Xn = {
        "\u1169\u1161": "\u116a",
        "\u1169\u1162": "\u116b",
        "\u1169\u1175": "\u116c",
        "\u116e\u1165": "\u116f",
        "\u116e\u1166": "\u1170",
        "\u116e\u1175": "\u1171",
        "\u1173\u1175": "\u1174"
    }
      , Yn = /[\u11a8-\u11c3]/g
      , Zn = RegExp("\u1169\u1161|\u1169\u1162|\u1169\u1175|\u116e\u1165|\u116e\u1166|\u116e\u1175|\u1173\u1175", "g")
      , $n = /[\uac00-\ud7af]/g
      , ao = /([\u1100-\u1112][\u1161-\u1175][\u11a7-\u11c3]?)/g
      , bo = RegExp("([\u1161-\u1175])([\u1100-\u1112])([\u1100-\u1112][\u1161-\u1175])", "g")
      , co = RegExp("([\u1161-\u1175])(\u1100\u1109|\u1102\u110c|\u1102\u1112|\u1105\u1100|\u1105\u1106|\u1105\u1107|\u1105\u1109|\u1105\u1110|\u1105\u1111|\u1105\u1112|\u1107\u1109)(([^\u1161-\u1175]|$))", "g")
      , eo = RegExp("([\u1161-\u1175])([\u1100-\u1112])([\u1100-\u1112]([^\u1161-\u1175]|$))", "g")
      , fo = RegExp("([\u1161-\u1175])([\u1100-\u1112])(([^\u1100-\u1112\u1161-\u1175]|$))", "g");
    function go(a) {
        a = a.charCodeAt(0) - 44032;
        var b = 4449 + a % 588 / 28
          , c = 4519 + a % 28;
        return String.fromCharCode(4352 + a / 588) + String.fromCharCode(b) + (4519 == c ? "" : String.fromCharCode(c))
    }
    function ho(a) {
        return a.replace(Yn, function(a) {
            return Un[a.charCodeAt(0) - 4519 - 1]
        })
    }
    function io(a) {
        return a.replace(Zn, function(a) {
            return Xn[a]
        })
    }
    function jo(a) {
        return a.replace($n, go)
    }
    function ko(a) {
        var b = a.charCodeAt(0) - 4352
          , c = a.charCodeAt(1) - 4449;
        a = 3 <= a.length ? a.charCodeAt(2) - 4519 : 0;
        return String.fromCharCode(28 * (21 * b + c) + a + 44032)
    }
    function lo(a) {
        return a.replace(ao, ko)
    }
    function mo(a, b, c, e) {
        return b + Vn[c] + e
    }
    function no(a) {
        return io(ho(a)).replace(bo, mo).replace(bo, mo).replace(co, mo).replace(eo, mo).replace(fo, mo)
    }
    ;function oo(a) {
        return function(b, c, e) {
            var f = 0
              , g = 1E3 / b;
            return function(b) {
                var l = a.Wb() - f
                  , n = !0;
                e && (n = e.apply(this, arguments));
                n && (!isNaN(l) && l <= g ? S(b) : (c.apply(this, arguments),
                f = a.Wb()))
            }
        }
    }
    oo.inject = ["timeService"];
    function po(a, b, c, e, f, g, k, l, n, p, u, r, E, R, ea, ia, pa, ec, fb, gb, Ea, Eb, Ym, C, Ph, Zm, $m, an, bn, cn, N, Fa, dn, Fb, Sh, lf, mf, nf, eb, Kd, Qh) {
        this.name = "application";
        Nh.call(this, a, b, c);
        this.qd = R;
        this.K = u;
        this.k = r;
        this.Yh = e;
        this.rd = f;
        this.Oa = g;
        this.J = k;
        this.Ae = l;
        this.fa = this.Va = null;
        this.h = gb;
        this.Ba = Ea;
        this.R = Eb;
        this.watchModel = ia;
        this.ja = n;
        this.g = p;
        this.Vf = ea;
        this.xe = E;
        this.pa = pa;
        this.ud = ec;
        this.$ = fb;
        this.ye = Ym;
        this.sd = C;
        this.Ce = Ph;
        this.Vh = Zm;
        this.jb = $m;
        this.Wh = an;
        this.Be = bn;
        this.o = cn;
        this.Wf = N;
        this.p = Fa;
        this.A = dn;
        this.Uf = Fb;
        this.Pc = Sh;
        this.Ea = mf;
        this.td = nf;
        this.nc = eb;
        this.oc = new Hh;
        this.j = this.k.state();
        this.F = this.k.mode();
        this.Aa = this.Nt();
        this.Uh = this.Xh = null;
        this.Rh = 0;
        this.Sa = !1;
        this.Na = "";
        this.ze = this.ka("#spinner-container");
        this.Ma = -1;
        this.U = null;
        this.Xf = lf;
        this.ra = !1;
        this.H = Kd;
        this.X = q;
        this.D = null;
        this.Pt();
        Qh.j(x(this.Ot, this))
    }
    A(po, Nh);
    d = po.prototype;
    d.Pt = function() {
        var a = this.pa.lb("start_watch") || this.pa.lb("start_dial") || this.pa.lb("start_browse");
        this.X = x(a.tick, a);
        this.X("app_i");
        this.rG();
        this.Ba.load();
        a = this.Ae[0].getElementById("loader");
        De(a);
        this.qG();
        this.ne();
        this.dc();
        this.dk();
        this.pG();
        this.X("app_rdy")
    }
    ;
    d.Kf = function(a) {
        po.B.Kf.call(this, a);
        a.detail instanceof Di && this.g.initDialog && this.V(Ca[this.g.initDialog])
    }
    ;
    d.pG = function() {
        this.Pa("debug-watermark", this.K);
        this.Pa("toaster", this.K);
        this.Pa("engagement-indicator", this.K);
        this.Va = this.Pa("legend", this.K);
        this.Pa("message", this.K);
        this.D = this.Pa("browse", this.K);
        this.children.browse = this.D;
        this.g.isChromelessContext && (this.fa = this.Pa("call-to-cast", this.K))
    }
    ;
    d.In = function() {
        var a = this.h.o;
        if (!a || this.h.j)
            this.h.load(x(function() {
                this.g.initRow && Ba[this.g.initRow] && this.Wn(Ba[this.g.initRow]);
                this.bf();
                a || this.J.requestAnimationFrame(x(function() {
                    this.pa.Wc("start_browse", "b_rn")
                }, this))
            }, this)),
            this.h.o = !0,
            this.h.j = !1
    }
    ;
    d.Wn = function(a) {
        a = this.h.$p(a);
        -1 < a && (this.h.Za = a)
    }
    ;
    d.Nt = function() {
        return {
            browse: {
                search: {
                    down: this.Wd,
                    up: this.tg,
                    enter: this.Wd,
                    esc: this.dH
                },
                none: {
                    esc: this.ZG
                }
            },
            watch: {
                browse: {
                    esc: this.cH
                },
                search: {
                    down: this.Wd,
                    up: this.tg,
                    enter: this.Wd,
                    esc: this.bH
                },
                title: {
                    down: this.Lh,
                    esc: this.cd,
                    enter: this.Hb,
                    fastforward: this.Hb,
                    rewind: this.Hb
                },
                transport: {
                    up: this.es,
                    down: this.Lh,
                    esc: this.es
                },
                "post-play": {
                    esc: this.$G
                },
                none: {
                    up: this.Hb,
                    down: this.Lh,
                    esc: this.aH,
                    enter: this.Hb,
                    pause: this.Hb,
                    fastforward: this.Hb,
                    rewind: this.Hb,
                    mousemove: this.Hb
                }
            },
            dialog: {
                none: {
                    esc: this.Lh
                }
            }
        }
    }
    ;
    d.rG = function() {
        this.aa(this.p, "spinnerShowing:changed", x(this.fC, this));
        this.aa(this.p, "state:changed", x(this.gC, this));
        this.aa(this.p, "isPlayingAd:changed", x(this.dc, this));
        this.aa(this.H, "beforeRouteChange", x(this.$B, this));
        this.aa(this.H, "afterRouteChange", x(this.rC, this));
        this.C("keydown", x(this.uC, this));
        this.C("keyup", x(this.vC, this));
        this.C("mousemove", this.Uf(2, x(this.xC, this)));
        this.C("loaded", x(this.pC, this));
        this.C("row-changed", x(this.oC, this));
        this.C("toggle-loading", x(this.qC, this));
        this.C("row-loaded", x(this.AC, this));
        this.C("next-video", x(function() {
            this.fe()
        }, this));
        this.C("previous-video", x(this.eC, this));
        this.C("request-device-retention", x(this.iC, this));
        this.C("request-recent-search", x(this.lC, this));
        this.C("request-search", x(this.Cq, this));
        this.C("request-clear-searches", x(this.hC, this));
        this.C("request-playback-authorization", x(this.jC, this));
        this.C("request-player-error", x(this.kC, this));
        this.C("request-toggle-video-info", x(this.nC, this));
        this.C("request-toggle-sounds", x(this.mC, this));
        this.C("focus-search", x(this.tg, this));
        this.C("exit-application", x(this.gh, this));
        this.aa(this.o, "dialog:changed", x(this.aC, this));
        this.aa(this.o, "login:complete", x(this.Bq, this));
        this.aa(this.o, "logout:complete", x(this.bC, this));
        this.aa(this.o, "logout:confirmed", x(this.cC, this));
        this.aa(this.o, "paidScope:changed", x(this.dC, this));
        this.aa(this.ja, "state:changed", x(this.wC, this));
        this.aa(this.qd, "pairing:changed", x(this.yC, this));
        this.aa(this.A, "request-playback", x(this.zC, this));
        this.aa(this.A, "engage-change", x(this.sC, this));
        this.aa(this.A, "goto-watch", x(this.tC, this))
    }
    ;
    d.Ot = function() {
        var a = this.H.b();
        this.k.state() || (a.pairingCode ? this.Ke() : this.Qd())
    }
    ;
    d.gC = function(a) {
        switch (a) {
        case 1:
            this.zI();
            break;
        case 0:
            this.wI(),
            this.ne()
        }
    }
    ;
    d.fC = function(a) {
        this.Ia() && this.qs(a)
    }
    ;
    d.YB = function() {
        return this.Vb() ? this.Ba : this.Ia() ? this.watchModel : this.h
    }
    ;
    d.qC = function(a) {
        this.Ia() || this.qs(!!a.detail)
    }
    ;
    d.qs = function(a) {
        this.Cc(this.ze, a);
        this.children.watch.sI(a)
    }
    ;
    d.zI = function() {
        this.df() ? this.Pi() : (this.Oa(x(function() {
            var a = this.ye.duration;
            0 < a && (a = Math.min(a / 4, 10),
            this.p.hf("add-to-history", a, x(this.UF, this)))
        }, this), 500, !1),
        this.p.hf("first-progress", 0.01, x(this.VF, this), 2))
    }
    ;
    d.UF = function() {
        this.watchModel.mE();
        !this.Sa && 0 < this.Vf.P() && (this.h.kp(this.watchModel.mi()),
        this.Sa = !0)
    }
    ;
    d.VF = function() {
        this.tI();
        this.gb(!1)
    }
    ;
    d.pC = function() {
        this.$.setTimeout(x(this.jd, this), 0)
    }
    ;
    d.AC = function() {
        (this.uh() || this.Vg() && !this.Vb()) && this.Wd()
    }
    ;
    d.dS = function(a) {
        return "UU" === a.Ha
    }
    ;
    d.ZB = function(a) {
        this.$.clearTimeout(this.Ma);
        this.Ma = this.$.setTimeout(x(function() {
            this.Ce.bb(a, x(this.Wi, this), null, x(function() {
                this.Wi(null)
            }, this))
        }, this), 500)
    }
    ;
    d.oC = function(a) {
        a = this.YB().dg(a.detail.rowIndex);
        if (this.g.Al && this.df() && a) {
            var b = a.model.serviceQuery || a.Qa;
            a.sf && b ? this.ZB(b) : (this.U = null,
            this.ne())
        }
    }
    ;
    d.xb = function(a) {
        var b = this.F || "none";
        this.Aa[this.j] && this.Aa[this.j][b] && ("esc" === a && this.V("play-sound", "cross-back"),
        b = this.Aa[this.j][b][a]) && (b.call(this, a),
        this.jd())
    }
    ;
    d.tg = function() {
        this.children.browse.show();
        this.children.browse.N();
        this.Sd("search");
        this.dc()
    }
    ;
    d.Wd = function() {
        this.Sd("browse");
        this.dc();
        this.g.usePaidScope && this.Pc.get("needs_rental_auth_dialog") && this.ja.ji() && this.V("request_paid_scope_dialog")
    }
    ;
    d.dC = function(a) {
        this.Pc.ya("needs_rental_auth_dialog", !1);
        a ? this.gb(!1) : this.ja.Yc()
    }
    ;
    d.Fw = function() {
        this.children.browse.ma();
        this.children.browse.ba();
        this.children.browse.N();
        this.Sd("watch");
        this.dc()
    }
    ;
    d.aH = function() {
        this.g.isChromelessContext ? (this.V("mdxClearVideo"),
        this.Ke()) : this.g.isPlayOnlyContext ? this.gh() : this.ad() ? this.o.zB() : (this.V("mdxClearVideo"),
        this.cd())
    }
    ;
    d.$G = function() {
        this.D.ma();
        this.br(this.D);
        this.D.$o();
        this.cd();
        this.df() && this.xe.ok(this.k.zc())
    }
    ;
    d.dH = function() {
        this.A.V("report-search-outcome", "back");
        this.cd()
    }
    ;
    d.Bg = function() {
        this.k.mode("search")
    }
    ;
    d.Qd = function(a) {
        this.k.state("browse", a ? {
            mode: a
        } : {})
    }
    ;
    d.Lh = function() {
        this.g.isPlayOnlyContext || this.g.isChromelessContext || this.p.isPlayingAd || this.k.mode("browse")
    }
    ;
    d.Hb = function() {
        this.Oa.cancel(this.Ee);
        this.Ee = this.Oa(x(function() {
            this.Ia() && !this.ad() && this.k.mode("transport")
        }, this), 250, !1)
    }
    ;
    d.oD = function() {
        this.k.mode("post-play");
        this.Be.l()
    }
    ;
    d.wI = function() {
        !this.Ia() || this.Vg() || this.Vb() || this.PH()
    }
    ;
    d.PH = function() {
        this.g.isPlayOnlyContext || this.g.isChromelessContext ? this.fe(!0) : this.oD()
    }
    ;
    d.bH = function() {
        0 === this.p.state ? this.fe() : this.cd()
    }
    ;
    d.cH = function(a) {
        0 === this.p.state ? this.fe(a) : this.Hb()
    }
    ;
    d.eC = function() {
        var a = this.watchModel.uI();
        a && (this.ne(),
        this.zk(a))
    }
    ;
    d.fe = function(a) {
        (a = this.watchModel.next(a)) ? (this.ne(),
        this.zk(a)) : this.g.isChromelessContext ? this.Ke() : this.g.isPlayOnlyContext ? this.gh() : this.Qd()
    }
    ;
    d.es = function() {
        this.k.mode(null)
    }
    ;
    d.uC = function(a) {
        switch (a.keyCode) {
        case 40:
            this.xb("down");
            break;
        case 38:
            this.xb("up");
            break;
        case 37:
            this.xb("left");
            break;
        case 39:
            this.xb("right");
            break;
        case 75:
        case 19:
        case 32:
            this.xb("pause");
            break;
        case 228:
        case 76:
            this.xb("fastforward");
            break;
        case 227:
        case 74:
            this.xb("rewind");
            break;
        case 8:
        case 27:
            this.bs() || S(a)
        }
    }
    ;
    d.vC = function(a) {
        switch (a.keyCode) {
        case 170:
        case 83:
            this.Vb() || this.Bg();
            break;
        case 172:
        case 71:
            this.Qd();
            break;
        case 8:
        case 27:
            this.bs() || S(a);
            this.xb("esc");
            break;
        case 13:
            S(a);
            this.WG(a.target) || this.xb("enter");
            break;
        case 178:
            this.Ia() && this.Qd()
        }
    }
    ;
    d.WG = function(a) {
        return !(!a || !We(a, x(function(a) {
            a = (a.className || "").split(" ");
            return I(a, "more") ? (this.xb("down"),
            !0) : I(a, "back") || I(a, "reversed-back") ? (this.Ia() && "transport" == this.F && this.xb("esc"),
            this.xb("esc"),
            !0) : I(a, "search") ? (this.Bg(),
            !0) : I(a, "home") ? (this.gb(!1),
            this.Qd(),
            !0) : I(a, "delete") ? (this.R.Cj(),
            !0) : !1
        }, this)))
    }
    ;
    d.xC = function() {
        this.xb("mousemove")
    }
    ;
    d.Lf = function() {
        this.h.dq()
    }
    ;
    d.zk = function(a) {
        this.X("app_s_w_st");
        var b = {};
        a && (b.v = a);
        this.k.state("watch", b);
        this.bf()
    }
    ;
    d.$B = function(a, b) {
        this.lG();
        this.nG(a, b) && this.mG(a);
        var c = a.params.q;
        c && "search" === a.params.mode && this.R.Ab(decodeURI(c));
        var c = a.params.dialog
          , e = a.params.row;
        "browse" === a.state() && (c || e) && ((c = Ca[c]) && !this.ad() && this.V(c),
        e = Ba[e]) && (this.Wn(e),
        this.gb(!1))
    }
    ;
    d.lG = function() {
        switch (this.H.g()) {
        case "":
            this.jy();
            break;
        case "resume":
            this.h.j = !0
        }
    }
    ;
    d.jy = function() {
        var a = this.H.b();
        a.q ? (this.R.Ab(a.q),
        this.Qd("search")) : a.list && this.A.L("cmd-playlist-playback", a.list)
    }
    ;
    d.nG = function(a, b) {
        if (!b || "watch" != a.state())
            return !1;
        var c = b.state()
          , e = this.watchModel.currentVideo;
        return "watch" === c || e ? "watch" == c ? (c = a.params.v,
        b.params.v != c && !!e && e.videoId != c) : !1 : !0
    }
    ;
    d.mG = function(a) {
        var b = a.params.v
          , c = this.bG(a);
        a = this.aG(a);
        this.A.L("cmd-load-video-from-service", b, c, a)
    }
    ;
    d.aG = function(a) {
        a = a.params.autoplay;
        return void 0 !== a && 0 == parseInt(a, 10) || "pause" == this.H.g()
    }
    ;
    d.bG = function(a) {
        a = parseInt(a.params.t, 10);
        return isNaN(a) ? 0 : a
    }
    ;
    d.rC = function(a) {
        if (this.rd.current && (a = a || this.rd.current) && a.$$route && a.$$route.state) {
            var b = this.F
              , c = this.j;
            this.F = a.params.mode;
            this.j = a.$$route.state();
            this.k.h = !1;
            var e = this.children[this.j];
            a.scope = e ? e.scope : null;
            this.k.state() && (this.Vb() ? this.tg() : this.ad() ? this.g.isChromelessContext && this.df() ? this.Ke() : this.Sd("dialog") : this.Vg() ? this.g.isChromelessContext ? this.Ke() : (this.In(),
            this.Ia() && this.Wd()) : (this.fa && this.fa.ba(),
            this.Fw()),
            this.df() && (this.Pi(),
            this.Vb() || this.watchModel.Xl()),
            this.Gw(c, b) && this.bf(),
            this.dc(),
            c != this.j && this.Wi(this.U))
        }
    }
    ;
    d.Gw = function(a, b) {
        return this.children.browse && a !== this.j || this.xF(b) || this.wF(b) || this.uh()
    }
    ;
    d.wF = function(a) {
        return this.Vb() || "search" === a
    }
    ;
    d.xF = function(a) {
        return this.Ia() && "post-play" == a
    }
    ;
    d.dk = function() {
        this.X("app_p");
        var a = this.g.initErrorCode
          , b = this.g.initPlaylistId
          , c = this.g.initSearchQuery
          , e = this.g.initTime
          , f = this.g.initVideoId || this.H.b().v
          , g = !1;
        0 === this.g.initAutoplay && (g = !0);
        this.g.k && 0 < e && (e = 0);
        a ? this.o.bm("[[There was an error retrieving the requested video.|Error displayed when a video cannot be loaded.]]") : f && this.Ia() ? this.watchModel.currentVideo || (this.g.initReversePairingCode ? this.qd.qm(f, e) : this.A.L("cmd-load-video-from-service", f, e, g, !0)) : b && this.Ia() ? this.watchModel.currentVideo || this.A.L("cmd-playlist-playback", b, e) : c && this.Vb() && (this.R.Ab(decodeURI(c)),
        this.Bg())
    }
    ;
    d.cd = function() {
        this.A.L("cmd-go-back")
    }
    ;
    d.Pi = function() {
        this.p.Xi();
        this.watchModel.Hp()
    }
    ;
    d.dc = function() {
        var a = [this.g.Wf, (this.j || "no") + "-state", (this.F || "no") + "-mode", this.activeChildName + "-active", this.p.isPlayingAd ? "playing-ad" : "", this.ra ? "engaged" : ""].join(" ")
          , b = this.element[0];
        b.className != a && (b.className = a)
    }
    ;
    d.qG = function() {
        var a = Math.floor(45 * Math.random() + 1);
        this.Na = "https://youtomb.github.io/assets/img/bg" + a + ".jpg"
    }
    ;
    d.ne = function(a) {
        if (this.g.supportsBackgrounds) {
            a = a || this.U && this.U.h || this.Na;
            var b = this.element.css("background-image");
            (!b || 0 > b.indexOf(a)) && this.oc.g(this.element[0], a)
        }
    }
    ;
    d.tI = function() {
        this.element.css("background-image") && this.oc.g(this.element[0], "")
    }
    ;
    d.gs = function() {
        this.h.oE();
        this.R.Ab("")
    }
    ;
    d.Wi = function(a) {
        this.U = a;
        this.ne()
    }
    ;
    d.bs = function() {
        return this.Vg() && !this.Vb() && !this.ad() && !this.Ia()
    }
    ;
    d.Vg = function() {
        return "browse" === this.F || "browse" === this.j
    }
    ;
    d.Vb = function() {
        return "search" === this.F
    }
    ;
    d.Ia = function() {
        return "watch" === this.j || "play" === this.j || "pause" === this.j
    }
    ;
    d.uh = function() {
        return "post-play" == this.F && this.Ia()
    }
    ;
    d.tT = function() {
        return "call-to-cast" == this.j
    }
    ;
    d.ad = function() {
        return "dialog" === this.activeChildName
    }
    ;
    d.df = function() {
        return "browse" === this.j
    }
    ;
    d.gb = function(a, b) {
        a && b ? this.o.show(b) : this.ad() && this.o.ma()
    }
    ;
    d.aC = function(a) {
        this.Sd(a ? "dialog" : this.j);
        a || this.In();
        this.dc();
        this.jd()
    }
    ;
    d.Sd = function(a) {
        this.activeChildName = a;
        this.ub(this.children[a]);
        this.Va.bI(a)
    }
    ;
    d.Ke = function() {
        this.fa.Z();
        this.Sd("call-to-cast");
        this.j = "call-to-cast";
        this.k.h = !0;
        this.dc()
    }
    ;
    d.jC = function(a) {
        a = a.detail;
        this.g.g ? this.o.Bf("", "eureka-authorization-info", "status-dialog") : (this.gb(!0, new Ni(x(this.FB, this),a,x(this.EB, this))),
        this.g.loopRows && this.nq())
    }
    ;
    d.FB = function() {
        this.Bq();
        this.p.gf();
        this.p.sq()
    }
    ;
    d.EB = function() {
        this.gb(!1);
        this.cd()
    }
    ;
    d.Bq = function() {
        this.gb(!1);
        var a;
        this.h.Xb() && (a = this.h.Xb().model.title);
        this.h.load(x(function() {
            this.h.j = this.nc.h();
            var b = a ? this.h.$p(a) : -1;
            this.h.Za = -1 != b ? b : this.h.P() - 1;
            this.bf()
        }, this));
        this.Ia() && this.dk()
    }
    ;
    d.bC = function() {
        this.gb(!1);
        this.ja.Yc();
        this.gs()
    }
    ;
    d.cC = function() {
        this.Ia() && this.dk()
    }
    ;
    d.zC = function(a) {
        this.A.L("cmd-playback", a.detail.data, a.detail.Fc, a.detail.startTime, a.detail.$c)
    }
    ;
    d.sC = function(a) {
        (this.ra = !!a.detail) && this.Ia() && !this.uh() && this.Hb();
        this.dc()
    }
    ;
    d.tC = function(a) {
        this.gb(!1);
        this.zk(a.detail[0]);
        this.Hb()
    }
    ;
    d.bf = function() {
        this.Vb() ? this.D.model = this.Ba : this.uh() ? (this.sd.load(),
        this.D.model = this.sd) : this.Ia() ? this.D.model = this.watchModel : this.D.model = this.h
    }
    ;
    d.iC = function() {
        this.ud.dD(!this.ud.g);
        this.Lf()
    }
    ;
    d.lC = function(a) {
        this.Cq(a);
        this.Xf.zp("history")
    }
    ;
    d.Cq = function(a) {
        (a = a.detail) && this.R.Ab(a.data ? a.data.title : "");
        this.Bg()
    }
    ;
    d.hC = function() {
        this.gs()
    }
    ;
    d.nC = function() {
        this.g.isVideoInfoVisible = !this.g.isVideoInfoVisible;
        this.Lf()
    }
    ;
    d.mC = function() {
        this.Wf.g();
        this.Lf()
    }
    ;
    d.EP = function() {
        this.gb(!1);
        this.Ea && this.Ea.isSupported() && (this.Ea.enabled = !1,
        this.Lf())
    }
    ;
    d.yC = function() {
        this.Lf()
    }
    ;
    d.kC = function(a) {
        var b = a.detail;
        this.Ia() && (this.g.g ? this.o.Bf("", "eureka-player-error-info", "status-dialog") : this.gb(!0, new Va(b,x(this.CB, this),x(this.BB, this))));
        S(a);
        this.g.loopRows && this.nq()
    }
    ;
    d.CB = function() {
        this.gb(!1);
        this.fe()
    }
    ;
    d.BB = function() {
        this.gb(!1);
        this.cd()
    }
    ;
    d.nq = function() {
        this.$.clearTimeout(this.Fe);
        this.Fe = this.$.setTimeout(x(function() {
            this.gb(!1);
            this.fe(!0)
        }, this), 5E3)
    }
    ;
    d.wC = function(a, b) {
        !a && b && (this.h.load(x(function() {
            this.h.Za = this.h.P() - 1;
            this.bf()
        }, this)),
        this.jb.Bk("video_like_value"),
        this.jb.Bk("channel"),
        this.nc.clear())
    }
    ;
    d.ZG = function() {
        this.ad() ? this.o.ma() : this.gh()
    }
    ;
    d.gh = function() {
        this.Pi();
        this.g.X && this.J.NetCastBack ? this.J.NetCastBack() : this.g.$ && this.J.curWidget ? this.J.curWidget.setPreference("return", "true") : this.g.k && this.td.isSupported() ? this.td.minimize() : this.g.kb && this.J.close && this.J.close()
    }
    ;
    po.$inject = "$scope $element $attrs $rootScope $route $timeout $window $document authService environmentModel injector locationService navigationService remoteService watchHistoryModel watchModel csiService privateDataService timeService browseModel searchModel searchQueryModel progressModel postPlayModel brandingService subscribeService cacheService relatedVideosService postPlayReportingService dialogService soundService playerFacade rootDispatcher rateLimit localStorage searchReporting cookiesApi systemApi subscriptionsModel routerService documentReady".split(" ");
    function qo(a, b, c, e, f, g, k, l, n) {
        this.name = "keyboard";
        Uh.call(this, a, b, c);
        this.K = e;
        this.o = f;
        this.A = g;
        this.model = n;
        this.letterSuggestions = new Yh;
        this.D = q;
        this.catchMouseMove = this.K.supportsMouseOverSearch;
        this.gridRateLimit = this.K.isLowPerformingSearch ? 4 : 20;
        this.h = this.Pa("list", l, this);
        this.g = this.Pa("grid", l, this);
        this.k = null;
        this.C("keyup", x(this.Ow, this));
        this.C("keydown", k(20, x(this.Nw, this)), !0);
        this.C("button-enter", x(this.Tg, this));
        this.Pn(this.g);
        this.Pn(this.h);
        this.cm()
    }
    A(qo, Uh);
    d = qo.prototype;
    d.Z = function() {
        qo.B.Z.call(this);
        this.Cp();
        this.ic();
        this.Gc();
        this.Bp()
    }
    ;
    d.ba = function() {
        this.Gb();
        qo.B.ba.call(this)
    }
    ;
    d.ic = function() {
        this.ub(this.g)
    }
    ;
    d.yq = function() {
        this.ub(this.h)
    }
    ;
    d.Kh = function() {
        return []
    }
    ;
    d.Pn = function(a) {
        this.catchMouseMove && a.C("mouseover", x(this.CG, this, a))
    }
    ;
    d.CG = function(a) {
        a && a != this.w && this.ub(a)
    }
    ;
    d.WR = function() {
        return this.g.isActive
    }
    ;
    d.ee = function() {
        return this.h.isActive
    }
    ;
    d.vk = function() {
        return !this.h.isHidden && !!this.letterSuggestions.P()
    }
    ;
    d.Ow = function(a) {
        switch (a.keyCode) {
        case 83:
            this.Gb();
            break;
        case 8:
        case 27:
            this.vk() && (S(a),
            this.Gb())
        }
    }
    ;
    d.Nw = function(a) {
        switch (a.keyCode) {
        case 37:
            this.cI() && S(a);
            break;
        case 39:
            this.dI() && S(a);
            break;
        case 40:
            this.Mf() && S(a);
            break;
        case 38:
            this.yf() && S(a);
            break;
        case 172:
        case 71:
            this.Gb()
        }
    }
    ;
    d.Tg = function(a) {
        this.Gb();
        this.Ok(a) || (a = a.detail,
        a != this.model.cl() && this.model.layout.rows.$H(a),
        this.Gc())
    }
    ;
    d.SF = function() {
        this.isActive && (this.Gc(),
        this.A.zf(!0))
    }
    ;
    d.Kr = function(a) {
        return this.ee() ? (this.model.layout.rows.mc().uf(a),
        this.Gc(),
        this.vk() ? this.yq() : this.ic(),
        !0) : !1
    }
    ;
    d.Ok = function(a) {
        var b = a.detail;
        return b instanceof Xl && this.model.SA(b.b) ? (this.cm(),
        this.Bp(),
        this.Cp(),
        this.Gc(),
        S(a),
        !0) : !1
    }
    ;
    d.cm = function() {
        this.D();
        this.D = this.model.layout.rows.C("selection:changed", x(this.SF, this))
    }
    ;
    d.Gb = function() {
        this.zq(0);
        this.Zr(!1)
    }
    ;
    d.zq = function(a) {
        this.letterSuggestions.na(a)
    }
    ;
    d.cI = function() {
        this.A.zf(!0);
        return this.Kr(-1)
    }
    ;
    d.dI = function() {
        this.A.zf(!0);
        return this.Kr(1)
    }
    ;
    d.Mf = function() {
        return this.g.isActive && this.vk() ? (this.zq(0),
        this.yq(),
        !0) : this.ee() && this.letterSuggestions.La() == this.letterSuggestions.P() - 1 ? (this.Gb(),
        this.ic(),
        this.model.layout.rows.uf(1),
        !0) : !1
    }
    ;
    d.yf = function() {
        return this.ee() && 0 == this.letterSuggestions.La() ? (this.Gb(),
        this.ic(),
        !0) : !1
    }
    ;
    d.RG = function() {
        this.g.N(!0);
        var a = this.g.G.querySelector(".button.selected");
        a && this.h && (a = a.getBoundingClientRect(),
        Ig(this.h.G, {
            left: a.left + "px",
            top: a.bottom + "px"
        }))
    }
    ;
    d.Gc = function() {
        this.Kh().length ? (this.Zr(!0),
        this.RG()) : this.Gb();
        this.letterSuggestions.ha(this.Kh(), this.letterSuggestions.La())
    }
    ;
    d.Zr = function(a) {
        this.h && (a ? (this.addClass("letter-suggest-visible"),
        this.h.show()) : (this.removeClass("letter-suggest-visible"),
        this.h.ma(),
        this.ee() && this.ic()),
        this.N(),
        this.h.N())
    }
    ;
    d.Cp = function() {
        this.k && this.g.removeClass(this.k);
        this.k = "lang-" + this.model.layout.name.toLowerCase();
        this.g.addClass(this.k);
        this.g.N()
    }
    ;
    qo.$inject = "$scope $element $attrs environmentModel searchQueryModel searchReporting rateLimit injector keyboardModel".split(" ");
    function ro(a, b, c, e, f, g, k, l, n) {
        qo.call(this, a, b, c, e, f, g, k, l, n);
        this.j = "keyboard-grid";
        this.p = this.Pa("transliteration", l, this);
        this.element.addClass("transliterable");
        this.C("transliteration-selected", x(function() {
            this.ic();
            this.Gc()
        }, this))
    }
    A(ro, qo);
    ro.prototype.F = function() {
        return this.p.isActive
    }
    ;
    ro.prototype.Z = function() {
        ro.B.Z.call(this);
        "keyboard-grid" === this.j ? this.ic() : "transliteration" === this.j && (this.Gb(),
        this.ub(this.p));
        this.activeChildName = this.j
    }
    ;
    ro.prototype.Mf = function() {
        if (this.F())
            return this.ic(),
            this.Gc(),
            !0;
        this.j = "keyboard-grid";
        return ro.B.Mf.call(this)
    }
    ;
    ro.prototype.yf = function() {
        if (this.g.isActive && this.p.transliterations.P())
            return this.Gb(),
            this.ub(this.p),
            !0;
        if (this.F())
            return this.j = "transliteration",
            !1;
        this.j = "keyboard-grid";
        return ro.B.yf.call(this)
    }
    ;
    ro.$inject = "$scope $element $attrs environmentModel searchQueryModel searchReporting rateLimit injector keyboardModel".split(" ");
    function so(a, b, c, e, f, g, k, l, n) {
        ro.call(this, a, b, c, e, f, g, k, l, n);
        this.langCodePair = wn("en", "zh-Hans")
    }
    A(so, ro);
    so.$inject = "$scope $element $attrs environmentModel searchQueryModel searchReporting rateLimit injector keyboardModel".split(" ");
    function to(a, b, c, e, f, g, k, l, n) {
        ro.call(this, a, b, c, e, f, g, k, l, n);
        this.langCodePair = wn("ja-Hira", "ja")
    }
    A(to, ro);
    to.prototype.Tg = function(a) {
        this.Ok(a) || (this.R(a),
        this.Gc())
    }
    ;
    to.prototype.Kh = function() {
        var a = []
          , b = this.model.cl();
        if (b = b && Ga[b.label])
            for (var c = 0; c < b.length; ++c) {
                var e = new U(b[c]);
                e.isSpeakable = !1;
                a.push(e)
            }
        return a
    }
    ;
    to.prototype.R = function(a) {
        var b = a.detail;
        if (b) {
            var c = b.label;
            if (c && this.H(c)) {
                var b = this.o.Fg()
                  , e = b.slice(-1);
                if (c = Ja[c][e])
                    b = b.slice(0, b.length - 1) + c,
                    this.o.Ab(b),
                    this.V("button-enter");
                S(a)
            }
        }
    }
    ;
    to.prototype.H = function(a) {
        return I(Da, a)
    }
    ;
    to.$inject = "$scope $element $attrs environmentModel searchQueryModel searchReporting rateLimit injector keyboardModel".split(" ");
    function uo(a, b, c, e, f, g, k, l, n) {
        qo.call(this, a, b, c, e, f, g, k, l, n);
        this.j = Cc(Ia);
        this.o.C("query:changed", x(this.PD, this))
    }
    A(uo, qo);
    d = uo.prototype;
    d.PD = function(a) {
        a = fc(a.split(""), function(a) {
            return Ia[a] || a
        }).join("");
        a = lo(no(jo(a.replace("\u001d", ""))));
        a = fc(a.split(""), function(a) {
            return this.j[a] || a
        }, this).join("");
        this.o.Ab(a)
    }
    ;
    d.Mf = function() {
        return this.ee() && this.xq(1) || uo.B.Mf.call(this)
    }
    ;
    d.yf = function() {
        return this.g.isActive && this.xq(-1) || uo.B.yf.call(this)
    }
    ;
    d.xq = function(a) {
        return this.ee() && this.letterSuggestions.La() == this.letterSuggestions.P() - 1 ? (this.Gb(),
        this.ic(),
        this.model.layout.rows.uf(a)) : !1
    }
    ;
    d.Kh = function() {
        var a = []
          , b = this.model.cl();
        if (b = b && Ha[b.label])
            for (var c = 0; c < b.length; ++c) {
                var e = new U(b[c]);
                e.isSpeakable = !1;
                a.push(e)
            }
        return a
    }
    ;
    d.Tg = function(a) {
        "KO" === this.model.layout.cq ? (this.Gb(),
        this.Ok(a)) : uo.B.Tg.call(this, a)
    }
    ;
    uo.$inject = "$scope $element $attrs environmentModel searchQueryModel searchReporting rateLimit injector keyboardModel".split(" ");
    function vo(a, b, c, e, f, g, k, l, n, p, u, r) {
        this.name = "search";
        Vh.call(this, a, b, c, e, f, r);
        this.k = g;
        this.fa = k;
        this.g = l;
        this.X = p;
        this.R = n;
        this.H = this.F = !1;
        this.o = this.ka("#search-input");
        this.K = this.k.supportsHardwareKeyboard || this.k.supportsNativeOsk;
        this.U = this.ka("#search-query");
        this.A = this.p = null;
        this.h = u;
        this.Tv();
        this.K || this.o.setAttribute("disabled", "true");
        this.k.supportsSearchSuggestion ? (this.p = this.Pa("suggestions", this.R),
        this.fn(this.p)) : this.Cc(this.ka("#search-suggestions"), !1);
        this.o.addEventListener("keydown", x(this.Vv, this), !0);
        this.o.addEventListener("keyup", x(this.Wv, this), !0);
        this.o.addEventListener("input", x(this.Uv, this), !0);
        this.C("button-enter", x(this.Zv, this));
        this.C("keydown", x(this.$v, this));
        this.C("keyup", x(this.aw, this));
        this.jn(this.g.Fg());
        this.g.C("query:changed", x(this.jn, this));
        this.g.C("results:changed", x(this.Xv, this));
        this.C("suggest", x(this.Yv, this))
    }
    A(vo, Vh);
    d = vo.prototype;
    d.Tv = function() {
        this.k.j || (this.A = this.Pa("pairing", this.R),
        this.A.context = "search",
        this.k.Hl && (this.A.j = !0),
        this.A.A = !1)
    }
    ;
    d.jo = function() {
        this.A && (this.isActive && this.g.Ta() ? (this.Cc(this.ka(".search-pairing"), !0),
        this.Cc(this.ka(".search-hint"), !0),
        this.A.Z()) : (this.Cc(this.ka(".search-pairing"), !1),
        this.Cc(this.ka(".search-hint"), !1),
        this.A.ba()))
    }
    ;
    d.Vv = function(a) {
        this.ao(a.keyCode) && (this.h.ME(),
        S(a, !0))
    }
    ;
    d.Wv = function(a) {
        this.ao(a.keyCode) && (this.H = !0,
        S(a, !0));
        switch (a.keyCode) {
        case 8:
            S(a, !0);
        case 13:
        case 27:
            if (this.k.j && !this.g.Ta()) {
                S(a);
                var b = Rg(a.target, "keydown", 40, !0, a.g);
                a.target.dispatchEvent(b)
            }
        }
    }
    ;
    d.Z = function() {
        vo.B.Z.call(this);
        this.fa.setTimeout(x(this.Eq, this), 0);
        this.jo();
        this.h.WC() || this.VC()
    }
    ;
    d.ba = function() {
        vo.B.ba.call(this);
        this.fG() && this.Sq()
    }
    ;
    d.fG = function() {
        return "search" != this.j.mode()
    }
    ;
    d.Uv = function(a) {
        this.g.Ab(a.target.value)
    }
    ;
    d.ao = function(a) {
        return 27 != a && 172 != a && 40 != a && 37 != a && 39 != a
    }
    ;
    d.Yv = function(a) {
        this.g.Ab(a.detail);
        this.h.zp("qs");
        this.h.Ho()
    }
    ;
    d.Kf = function(a) {
        var b = a.detail;
        vo.B.Kf.call(this, a);
        this.fn(b);
        this.Eq()
    }
    ;
    d.fn = function(a) {
        this.k.supportsMouseOverSearch && a.C("mouseover", x(this.vF, this, a))
    }
    ;
    d.VC = function() {
        this.h.ND();
        this.aa(this.D, "request-playback", x(this.OD, this));
        this.aa(this.D, "report-search-outcome", x(this.MD, this))
    }
    ;
    d.Sq = function() {
        this.h.RD();
        this.Af(this.D, "request-playback");
        this.Af(this.D, "report-search-outcome")
    }
    ;
    d.OD = function(a) {
        this.h.GE(a.detail.Fc.activeIndex + 1);
        this.cr("select")
    }
    ;
    d.MD = function(a) {
        this.cr(a.detail)
    }
    ;
    d.cr = function(a) {
        this.h.Io(a);
        this.Sq()
    }
    ;
    d.xf = function() {
        vo.B.xf.call(this)
    }
    ;
    d.Eq = function() {
        this.isActive && (this.k.supportsNativeOsk ? this.Zj() : this.ub(this.je()))
    }
    ;
    d.aw = function(a) {
        switch (a.keyCode) {
        case 13:
        case 172:
        case 71:
            S(a, !0)
        }
    }
    ;
    d.$v = function(a) {
        switch (a.keyCode) {
        case 40:
            this.wB() && S(a);
            break;
        case 38:
            this.xB() && S(a);
            break;
        case 172:
            S(a, !0);
            this.k.supportsNativeOsk || this.g.Cj();
            break;
        default:
            !this.k.supportsHardwareKeyboard || 37 == a.keyCode || 39 == a.keyCode || 40 == a.keyCode || 27 == a.keyCode || 170 == a.keyCode || 13 == a.keyCode && (!a.g || a.g instanceof MouseEvent) || (this.k.Il || 8 != a.keyCode) && this.Zj()
        }
    }
    ;
    d.vF = function(a) {
        a && a != this.w && this.ub(a)
    }
    ;
    d.NF = function() {
        return this.je().isActive
    }
    ;
    d.bq = function() {
        var a = this.$r();
        return a && a.isActive
    }
    ;
    d.yB = function() {
        return this.w == this.p
    }
    ;
    d.wB = function() {
        if (this.bq()) {
            if (this.aq())
                return this.ub(this.p),
                !0;
            if (this.je())
                return this.ub(this.je()),
                !0
        } else if (this.yB() && this.je())
            return this.ub(this.je()),
            !0;
        return this.g.Ta() || !this.F
    }
    ;
    d.xB = function() {
        return this.NF() && this.aq() ? (this.ub(this.p),
        !0) : this.H && !this.bq() ? (this.Zj(),
        !0) : !1
    }
    ;
    d.aq = function() {
        return !!this.p && 0 < this.p.model.suggestions.P()
    }
    ;
    d.UR = function() {
        return !!this.g.g && 0 === this.g.g.P()
    }
    ;
    d.Zv = function(a) {
        if (a = a.detail)
            this.h.zf(!1),
            "delete-tile" === a.buttonClass ? this.g.Cj() : a.label && this.g.Ap(a.label.replace("_", " "))
    }
    ;
    d.jn = function() {
        var a = this.g.Fg();
        this.Cc(this.o, this.K || this.g.Ta());
        this.K ? this.o.value != a && (this.o.value = a,
        this.o.scrollLeft = this.o.scrollWidth - this.o.clientWidth) : this.ac(this.U, a);
        this.F = !1;
        this.jo();
        this.sj();
        this.dy();
        this.V("toggle-loading", !this.g.Ta());
        this.V("loaded");
        this.g.Ta() ? (this.h.Io("clear"),
        this.h.Ho(),
        this.h.cy()) : this.X.ey()
    }
    ;
    d.dy = function() {
        this.k.supportsSearchSuggestion && this.p.update(this.g.Fg())
    }
    ;
    d.Xv = function(a) {
        this.h.hz(a.serviceQuery);
        this.V("toggle-loading", !1);
        this.V("loaded", a);
        0 === a.P() ? (this.F = !1,
        this.g.Ta() || this.sj("[[No videos are available|The message shown when a row has no videos to show.]]")) : this.F = !0
    }
    ;
    d.je = function() {
        return this.children["search-keyboard"]
    }
    ;
    d.$r = function() {
        return this.children["search-input"]
    }
    ;
    d.Zj = function() {
        this.V("focus-search");
        this.ub(this.$r());
        this.jd()
    }
    ;
    d.xT = function(a) {
        if (a = a.detail.label)
            this.h.zf(!1),
            this.g.Ap(a.replace("_", " "))
    }
    ;
    vo.$inject = "$scope $element $attrs locationService navigationService environmentModel timeService searchQueryModel injector remoteService searchReporting rootDispatcher".split(" ");
    function wo(a, b, c, e, f, g, k, l, n, p, u, r, E, R, ea, ia, pa, ec, fb, gb) {
        this.name = "watch";
        Vh.call(this, a, b, c, k, l, n);
        this.oc = c;
        this.Va = g;
        this.Aa = e;
        this.Sa = f;
        this.ra = u;
        this.Ea = r;
        this.F = E;
        this.Ba = R;
        this.jb = ea;
        this.X = this.A = null;
        this.fa = 0;
        this.H = null;
        this.g = p;
        this.U = this.ka("#branding-container");
        this.h = this.p = this.R = this.o = null;
        this.Na = ia;
        this.pa = ec;
        this.Ma = fb;
        this.k = this.Pa("watch-title-tray", pa, this);
        this.K = this.Pa("transport-controls", pa);
        this.ja = q;
        if (a = gb.lb("start_watch") || gb.lb("start_dial"))
            this.ja = x(a.tick, a);
        this.b = pa.get("voiceHelper");
        this.b.Qb(this);
        this.Dt();
        this.Pa("advertisement-callout", pa)
    }
    A(wo, Vh);
    d = wo.prototype;
    d.Z = function() {
        wo.B.Z.call(this);
        this.j.ar("transport") && this.Pj();
        this.sb();
        this.Ma.Oj()
    }
    ;
    d.kr = function() {
        return this.j.ar("search") || !this.j.mode()
    }
    ;
    d.lr = function() {
        return !1
    }
    ;
    d.ba = function() {
        this.k.ma();
        this.K.ba();
        Vh.prototype.ba.call(this);
        this.V("toggle-loading", 0);
        this.Ua()
    }
    ;
    d.zd = function(a) {
        (this.X = a) ? (this.ja("w_ld_vid"),
        this.jq(),
        this.iq(),
        this.Pc = a.videoId,
        this.dF(),
        this.eF(),
        this.k.cF(),
        this.bF(),
        this.gr() && this.gr().A(this.Jd())) : this.k.ma()
    }
    ;
    d.xf = function() {
        wo.B.xf.call(this);
        this.Rk("getCurrentVideo", this.Jd);
        this.Rk("isTransportActive", this.Fj)
    }
    ;
    d.bF = function() {
        this.jD();
        this.g.gf();
        this.g.sq()
    }
    ;
    d.Fj = function() {
        return this.isActive && "transport" === this.activeChildName
    }
    ;
    d.Pj = function() {
        this.activeChildName = "transport";
        this.K.Z()
    }
    ;
    d.Dt = function() {
        this.aa(this.pa, "afterRouteChange", x(this.NB, this));
        this.C("transport-deactivated", x(this.MB, this));
        this.C("transport-activated", x(this.LB, this));
        this.C("keyup", x(this.PB, this));
        this.C("keydown", this.Na(5, x(this.OB, this), function(a) {
            return 228 === a.keyCode || 76 === a.keyCode || 227 === a.keyCode || 74 === a.keyCode
        }));
        this.g.C("isPlayingAd:changed", x(this.JB, this));
        this.g.C("state:changed", x(this.KB, this))
    }
    ;
    d.NB = function(a, b) {
        var c = a.params.autoplay
          , e = parseInt(c, 10)
          , e = isNaN(e) ? -1 : e;
        if (this.Rz(a, b))
            this.Pj();
        else if (this.isActive || 1 === e)
            this.K.ba(),
            this.activeChildName = null,
            this.focus();
        -1 != c && this.F.currentVideo && this.Qz(e);
        c = this.pa.g();
        "pause" == c ? this.g.Ac() : this.F.currentVideo && ("play" == c || b && "search" == m("mode", b.params)) && this.g.Rc();
        c = parseInt(a.params.t, 10);
        !isNaN(c) && this.F.currentVideo && (this.g.Me(c, !0),
        this.j.search("t", null))
    }
    ;
    d.Rz = function(a, b) {
        var c = b ? parseInt(b.params.autoplay, 10) : -1;
        return a && a.params && "transport" === a.params.mode || 0 === c
    }
    ;
    d.Qz = function(a) {
        1 === a ? (0 === this.g.state && this.g.Me(0, !0),
        this.g.Rc()) : 0 === a && this.g.Ac();
        this.j.search("autoplay", null)
    }
    ;
    d.MB = function() {
        this.fa = this.ra.Wb().getTime();
        this.k.ma();
        "transport" == this.j.mode() && this.j.mode(null)
    }
    ;
    d.LB = function() {
        this.g.isPlayingAd || this.k.show()
    }
    ;
    d.JB = function(a) {
        a ? (this.uc(this.U),
        (a = this.g.adVideoId) && this.CC(a)) : (this.og(this.U),
        this.BC())
    }
    ;
    d.KB = function(a) {
        switch (a) {
        case 2:
            this.Is(!1);
            break;
        case 1:
            this.Is(!0);
            break;
        case -1E3:
            this.dJ()
        }
    }
    ;
    d.jD = function() {
        this.element.toggleClass("play", !1);
        this.element.toggleClass("pause", !1)
    }
    ;
    d.Is = function(a) {
        this.element.toggleClass("play", a);
        this.element.toggleClass("pause", !a)
    }
    ;
    d.sI = function(a) {
        this.element.toggleClass("loading", a)
    }
    ;
    d.CC = function(a) {
        this.Va.bb(a, x(function(a) {
            if (a = a.Y.ia(0))
                this.A = a,
                this.H = this.Sa.bb(this.A.channel.username).model
        }, this))
    }
    ;
    d.BC = function() {
        this.H = this.A = null
    }
    ;
    d.OB = function(a) {
        switch (a.keyCode) {
        case 228:
        case 76:
            this.g.yh(10);
            this.Pj();
            break;
        case 227:
        case 74:
            this.g.yh(-10)
        }
    }
    ;
    d.PB = function(a) {
        switch (a.keyCode) {
        case 39:
        case 176:
            this.g.isPlayingAd || this.V("next-video");
            S(a);
            break;
        case 37:
        case 177:
            this.g.isPlayingAd || this.V("previous-video");
            S(a);
            break;
        case 38:
        case 27:
            this.k.ma();
            break;
        case 75:
        case 179:
        case 32:
            this.g.Nj();
            S(a);
            break;
        case 19:
            this.g.Ac();
            break;
        case 250:
            this.g.Rc();
            S(a);
            break;
        case 8:
        case 27:
            this.g.isPlaying && this.Fj() && (this.j.mode(null),
            S(a),
            this.V("play-sound", "cross-back"));
            break;
        case 13:
            this.Fj() && this.g.Nj()
        }
        (27 === a.keyCode || 8 === a.keyCode) && this.fa + 1E3 > this.ra.Wb().getTime() && S(a)
    }
    ;
    d.jm = function() {
        var a = this.Jd();
        return a && a.channel ? a.channel.xi : null
    }
    ;
    d.dF = function() {
        var a = this.Jd();
        a && (this.un(),
        this.g.gf(),
        this.Aa.bb(a.channel.username, x(this.SC, this)))
    }
    ;
    d.nm = function() {
        this.o || (this.o = this.ka("#branding-banner"),
        this.R = this.ka("#branding-banner-image"),
        this.p = this.ka("#branding-banner-overlay"));
        this.h || (this.h = this.ka("#branding-watermark"))
    }
    ;
    d.SC = function(a) {
        var b = this.Jd();
        if (b) {
            b.channel.xi = a;
            var c = 15;
            this.nm();
            this.g.gf();
            if (a && a.b)
                this.g.hf("show-branding-banner-start", 0.1, x(this.Bn, this)),
                this.g.hf("hide-branding-banner", 5, x(this.pw, this));
            else if (this.Ea.Ib(ta)) {
                c = this.F.li();
                if (!c || !c.channel)
                    return;
                a = new rh;
                a.j = !0;
                a.b = this.jb.Je(c.videoId, "mqdefault");
                b.channel.xi = a;
                c = 8
            } else {
                this.un();
                this.g.gf();
                return
            }
            this.g.hf("show-branding-banner-end", b.duration - c, x(this.Bn, this))
        }
    }
    ;
    d.un = function() {
        this.nm();
        this.uc(this.o);
        this.uc(this.h)
    }
    ;
    d.pw = function() {
        this.uc(this.o);
        this.uc(this.p);
        var a = this.jm();
        a && a.g ? this.og(this.h) : this.uc(this.h)
    }
    ;
    d.Bn = function() {
        var a = this.jm();
        this.h.src = a.g;
        this.R.src = a.b;
        this.uc(this.h);
        this.og(this.o);
        a.j ? this.og(this.p) : this.uc(this.p)
    }
    ;
    d.eF = function() {
        var a = this.Jd();
        a && a.b && a.channel.Qa && this.Ba.bb(a.channel.Qa, x(this.HA, this, a.channel))
    }
    ;
    d.HA = function(a, b) {
        a.b = b.b
    }
    ;
    d.dJ = function() {
        this.V(this.g.needsLogin ? "request-playback-authorization" : "request-player-error", this.g.errorMessage)
    }
    ;
    d.Jd = function() {
        return this.g.isPlayingAd ? this.TC() : this.X
    }
    ;
    d.TC = function() {
        return this.A
    }
    ;
    d.gr = function() {
        return this.children["ad-callout"]
    }
    ;
    wo.$inject = "$scope $element $attrs brandingService userProfileService videoPlaybackInfoService locationService navigationService rootDispatcher playerFacade timeService environmentModel watchModel channelPaidInfoService ytThumbnails rateLimit injector routerService remoteService csiService".split(" ");
    function xo(a, b) {
        this.g = new uj(a);
        this.b = b ? b : "callback";
        this.Oa = 5E3
    }
    var yo = 0;
    xo.prototype.jw = function(a) {
        this.Oa = a
    }
    ;
    xo.prototype.h = function() {
        return this.Oa
    }
    ;
    xo.prototype.send = function(a, b, c, e) {
        a = a || null;
        e = e || "_" + (yo++).toString(36) + z().toString(36);
        h._callbacks_ || (h._callbacks_ = {});
        var f = this.g.clone();
        if (a)
            for (var g in a)
                a.hasOwnProperty && !a.hasOwnProperty(g) || f.Fd(g, a[g]);
        b && (b = zo(e, b),
        h._callbacks_[e] = b,
        f.Fd(this.b, "_callbacks_." + e));
        b = xf(f.toString(), {
            timeout: this.Oa,
            Fx: !0
        });
        c = Ao(e, a, c);
        b.no(c);
        return {
            ob: e,
            wo: b
        }
    }
    ;
    xo.prototype.cancel = function(a) {
        a && (a.wo && a.wo.cancel(),
        a.ob && Bo(a.ob, !1))
    }
    ;
    function Ao(a, b, c) {
        return function() {
            Bo(a, !1);
            c && c(b)
        }
    }
    function zo(a, b) {
        return function(c) {
            Bo(a, !0);
            b.apply(void 0, arguments)
        }
    }
    function Bo(a, b) {
        h._callbacks_[a] && (b ? delete h._callbacks_[a] : h._callbacks_[a] = q)
    }
    ;var M = angular.module("leanback-app", [el.name]);
    M.config(["$routeProvider", "$locationProvider", "$provide", function(a, b, c) {
        a.when("/browse", {
            state: function() {
                return "browse"
            }
        });
        a.when("/watch", {
            state: function() {
                return "watch"
            }
        });
        a.when("/pause", {
            state: function() {
                return "watch"
            }
        });
        a.when("/play", {
            state: function() {
                return "watch"
            }
        });
        a.when("", {
            state: function() {
                return -1 < window.location.href.indexOf("pairingCode=") ? "dialog" : "browse"
            }
        });
        a.otherwise({
            redirectTo: "/browse",
            state: function() {
                return "browse"
            }
        });
        Co(window);
        Do(c)
    }
    ]);
    M.run(["$injector", "$templateCache", function(a, b) {
        var c = $;
        c.g = x(a.get, a);
        a.get = x(c.get, c);
        c = a || $;
        b.get = x(c.get, c)
    }
    ]);
    M.run(["bootstrapService", function(a) {
        $.get("environmentModel").isChromelessContext ? $.Fh("browse", T) : $.Fh("browse", di, M.I + "/rebound/browse.html");
        a.bootstrap()
    }
    ]);
    var $ = null;
    function Co(a) {
        function b(a, b) {
            return function() {
                return b.get("templatePreprocessor", {
                    markup: a,
                    locale: b.get("locale")
                })
            }
        }
        function c(a, b) {
            return b.S(a)
        }
        $ = $ || new pm(a);
        for (var e = new rm, f = [{
            name: "accountApi",
            source: "environment.ytshell.accountInfo"
        }, {
            name: "audioConfigApi",
            source: "environment.ytshell.audioConfig"
        }, {
            name: "cookiesApi",
            source: "environment.ytshell.storage.cookies"
        }, {
            name: "dialApi",
            source: "environment.ytshell.dial"
        }, {
            name: "dvrApi",
            source: "environment.ytshell.dvr"
        }, {
            name: "ssoApi",
            source: "environment.ytshell.sso"
        }, {
            name: "storageApi",
            source: "environment.ytshell.storage"
        }, {
            name: "systemApi",
            source: "environment.ytshell.system"
        }, {
            name: "remoteApi",
            source: "environment.ytshell.remote"
        }], g = 0, k = f.length; g < k; ++g) {
            var l = f[g];
            $.register(l.name, m(l.source, a) || e)
        }
        a = m("environment.ytshell.speech", a) || e;
        $.register("speechApi", a);
        a.isSupported() ? $.tr("voiceHelper", Kh) : $.Nf("voiceHelper", om);
        e = [{
            name: "activityParser",
            constructor: cm
        }, {
            name: "activityReportingService",
            constructor: sm
        }, {
            name: "angularHelper",
            constructor: vh
        }, {
            name: "audioConfigReporting",
            constructor: vm
        }, {
            name: "authService",
            constructor: wh
        }, {
            name: "backendErrorReporting",
            constructor: wm
        }, {
            name: "bootstrapService",
            constructor: Dm
        }, {
            name: "bountyService",
            constructor: ym
        }, {
            name: "brandingParser",
            constructor: dm
        }, {
            name: "browseParser",
            constructor: Il
        }, {
            name: "cacheService",
            constructor: zl
        }, {
            name: "channelPaidInfoParser",
            constructor: em
        }, {
            name: "channelSuggestionParser",
            constructor: fm
        }, {
            name: "commandCenter",
            constructor: lm
        }, {
            name: "commandCenterInitializer",
            constructor: Bg
        }, {
            name: "crashReportingService",
            constructor: zm
        }, {
            name: "csiService",
            constructor: Cf
        }, {
            name: "debugModel",
            constructor: Xh
        }, {
            name: "debugCallService",
            constructor: Fm
        }, {
            name: "dialogService",
            constructor: Yi
        }, {
            name: "environmentModel",
            constructor: de
        }, {
            name: "exceptionLogger",
            constructor: Mm
        }, {
            name: "eurekaService",
            constructor: Yk
        }, {
            name: "featuredParser",
            constructor: gm
        }, {
            name: "gestureRecognizer",
            constructor: Zi
        }, {
            name: "gestureService",
            constructor: bj
        }, {
            name: "guideParser",
            constructor: Kl
        }, {
            name: "keyboardModel",
            constructor: Yl
        }, {
            name: "keyMapModel",
            constructor: ce
        }, {
            name: "localStorage",
            constructor: rg
        }, {
            name: "locationService",
            constructor: Lh
        }, {
            name: "navigationService",
            constructor: Mh
        }, {
            name: "personalDataService",
            constructor: Pm
        }, {
            name: "playerFacade",
            constructor: Fh
        }, {
            name: "playerFactoryService",
            constructor: xh
        }, {
            name: "playerService",
            constructor: zh
        }, {
            name: "playerVariablesModel",
            constructor: uh
        }, {
            name: "playlistParser",
            constructor: hm
        }, {
            name: "postPlayModel",
            constructor: gl
        }, {
            name: "postPlayReportingService",
            constructor: hl
        }, {
            name: "privateDataService",
            constructor: Lm
        }, {
            name: "progressModel",
            constructor: Uk
        }, {
            name: "documentReady",
            constructor: Km
        }, {
            name: "remoteService",
            constructor: dl
        }, {
            name: "resizeService",
            constructor: Qm
        }, {
            name: "retentionReportingService",
            constructor: Am
        }, {
            name: "routerService",
            constructor: Rm
        }, {
            name: "searchModel",
            constructor: Zl
        }, {
            name: "searchReporting",
            constructor: Tm
        }, {
            name: "speechReporting",
            constructor: fn
        }, {
            name: "searchRowService",
            constructor: Vm
        }, {
            name: "settingsRowService",
            constructor: Xm
        }, {
            name: "searchHistoryService",
            constructor: Em
        }, {
            name: "searchParser",
            constructor: Ml
        }, {
            name: "searchQueryModel",
            constructor: $l
        }, {
            name: "shutdownService",
            constructor: Bm
        }, {
            name: "statsService",
            constructor: jn
        }, {
            name: "steelDialService",
            constructor: Cm
        }, {
            name: "subscriptionsModel",
            constructor: wl
        }, {
            name: "subscriptionsParser",
            constructor: im
        }, {
            name: "suggestionsModel",
            constructor: pl
        }, {
            name: "timeService",
            constructor: Xd
        }, {
            name: "transliterationService",
            constructor: Rn
        }, {
            name: "userProfileParser",
            constructor: jm
        }, {
            name: "vevoPlaylistService",
            constructor: Sn
        }, {
            name: "videoParser",
            constructor: bl
        }, {
            name: "innerTubeVideoParser",
            constructor: Nl
        }, {
            name: "innerTubePlaylistParser",
            constructor: Ll
        }, {
            name: "voiceService",
            constructor: Tn
        }, {
            name: "watchHistoryModel",
            constructor: Vk
        }, {
            name: "watchModel",
            constructor: Wk
        }, {
            name: "watchNextParser",
            constructor: Ol
        }, {
            name: "ytHttp",
            constructor: ge
        }, {
            name: "ytThumbnails",
            constructor: ug
        }];
        g = 0;
        for (k = e.length; g < k; ++g)
            f = e[g],
            $.Nf(f.name, f.constructor);
        a = [{
            name: "advertisement-callout",
            constructor: Ih,
            templateUrl: "/rebound/advertisement_callout.html"
        }, {
            name: "color-button",
            constructor: Ei,
            templateUrl: "/rebound/color_button.html"
        }, {
            name: "browse-list",
            constructor: ji
        }, {
            name: "button",
            constructor: Ei,
            templateUrl: "/rebound/button.html"
        }, {
            name: "subtitled-button",
            constructor: nl,
            templateUrl: "/rebound/subtitled_button.html"
        }, {
            name: "transport-button",
            constructor: Ei,
            templateUrl: "/rebound/label_button.html"
        }, {
            name: "buttonDecorator",
            constructor: Ei
        }, {
            name: "call-to-cast",
            constructor: ki,
            templateUrl: "/rebound/call_to_cast.html"
        }, {
            name: "carousel",
            constructor: hi
        }, {
            name: "closed-captions",
            constructor: mi,
            templateUrl: "/rebound/dialogs/closed_captions.html"
        }, {
            name: "component",
            constructor: T
        }, {
            name: "debug-watermark",
            constructor: ti,
            templateUrl: "/rebound/debug_watermark.html"
        }, {
            name: "deviceToast",
            constructor: xi,
            templateUrl: "/rebound/toasts/device_toast.html"
        }, {
            name: "engagement-indicator",
            constructor: a.isSupported() ? zi : T,
            templateUrl: a.isSupported() ? "/rebound/engagement_indicator.html" : ""
        }, {
            name: "feed-icon",
            constructor: Ai,
            templateUrl: "/rebound/feed_icon.html"
        }, {
            name: "grid",
            constructor: mm
        }, {
            name: "list",
            constructor: $h
        }, {
            name: "loginInfo",
            constructor: gj,
            templateUrl: "/rebound/dialogs/login_info.html"
        }, {
            name: "legend",
            constructor: cj,
            templateUrl: "/rebound/legend.html"
        }, {
            name: "message",
            constructor: hj,
            templateUrl: "/rebound/message.html"
        }, {
            name: "pairing",
            constructor: fl,
            templateUrl: "/rebound/dialogs/remote_pairing_info.html"
        }, {
            name: "progress-bar",
            constructor: kl,
            templateUrl: "/rebound/progress_bar.html"
        }, {
            name: "scroll-pane",
            constructor: ml,
            templateUrl: "/rebound/scroll_pane.html"
        }, {
            name: "qrDialog",
            constructor: ll,
            templateUrl: "/rebound/dialogs/qr_dialog.html"
        }, {
            name: "suggestions",
            constructor: ql,
            templateUrl: "/rebound/suggestions.html"
        }, {
            name: "super-scroller",
            constructor: ci,
            templateUrl: "/rebound/super_scroller.html"
        }, {
            name: "toaster",
            constructor: ul,
            templateUrl: "/rebound/toaster.html"
        }, {
            name: "toggleButton",
            constructor: nm,
            templateUrl: "/rebound/label_button.html"
        }, {
            name: "transliteration",
            constructor: vl,
            templateUrl: "/rebound/transliteration.html"
        }, {
            name: "transport-controls",
            constructor: Al,
            templateUrl: "/rebound/transport_controls.html"
        }, {
            name: "voice-footer",
            constructor: $h,
            templateUrl: "/rebound/voice_footer.html"
        }, {
            name: "volumeToast",
            constructor: El,
            templateUrl: "/rebound/toasts/volume_toast.html"
        }, {
            name: "watch-title-tray",
            constructor: Fl,
            templateUrl: "/rebound/watch_title_tray.html"
        }, {
            name: "authentication-error-info",
            constructor: T,
            templateUrl: "/rebound/dialogs/authentication_error_info.html"
        }, {
            name: "debug-info",
            constructor: T,
            templateUrl: "/rebound/dialogs/debug_info.html"
        }, {
            name: "delete-clip",
            constructor: T,
            templateUrl: "/rebound/dialogs/delete_clip.html"
        }, {
            name: "eureka-authorization-info",
            constructor: T,
            templateUrl: "/rebound/dialogs/eureka_authorization_info.html"
        }, {
            name: "eureka-player-error-info",
            constructor: T,
            templateUrl: "/rebound/dialogs/eureka_player_error_info.html"
        }, {
            name: "feedback",
            constructor: ll,
            templateUrl: "/rebound/dialogs/qr_dialog.html"
        }, {
            name: "flag-claim",
            constructor: T,
            templateUrl: "/rebound/dialogs/flag_claim.html"
        }, {
            name: "flag-options",
            constructor: Ci,
            templateUrl: "/rebound/dialogs/flag_options.html"
        }, {
            name: "flag-video",
            constructor: T,
            templateUrl: "/rebound/dialogs/flag_video.html"
        }, {
            name: "help-dialog",
            constructor: ll,
            templateUrl: "/rebound/dialogs/qr_dialog.html"
        }, {
            name: "logout-info",
            constructor: T,
            templateUrl: "/rebound/dialogs/logout_info.html"
        }, {
            name: "network-error-info",
            constructor: T,
            templateUrl: "/rebound/dialogs/network_error_info.html"
        }, {
            name: "paid-channel-info",
            constructor: T,
            templateUrl: "/rebound/dialogs/paid_channel_info.html"
        }, {
            name: "player-error-info",
            constructor: T,
            templateUrl: "/rebound/dialogs/player_error_info.html"
        }, {
            name: "remote-reset",
            constructor: T,
            templateUrl: "/rebound/dialogs/remote_reset_info.html"
        }, {
            name: "signed-out-info",
            constructor: T,
            templateUrl: "/rebound/dialogs/signed_out_info.html"
        }, {
            name: "tos-info",
            constructor: T,
            templateUrl: "/rebound/dialogs/tos_info.html"
        }, {
            name: "video-uploads",
            constructor: Dl,
            templateUrl: "/rebound/dialogs/video_uploads.html"
        }];
        g = 0;
        for (k = a.length; g < k; ++g)
            e = a[g],
            $.Fh(e.name, e.constructor, e.templateUrl ? M.I + e.templateUrl : "");
        a = [{
            name: "actionTile",
            templateUrl: "/rebound/tiles/action.html"
        }, {
            name: "kenkoTile",
            templateUrl: "/rebound/tiles/kenko.html"
        }, {
            name: "pairTile",
            templateUrl: "/rebound/tiles/remote_pairing.html"
        }, {
            name: "postPlayTile",
            Gh: jl,
            templateUrl: "/rebound/tiles/post_play_tile.html"
        }, {
            name: "recentSearchTile",
            templateUrl: "/rebound/tiles/recent_search.html"
        }, {
            name: "resetPairingTile",
            templateUrl: "/rebound/tiles/reset_pairing.html"
        }, {
            name: "searchTile",
            templateUrl: "/rebound/tiles/search.html"
        }, {
            name: "signOutTile",
            templateUrl: "/rebound/tiles/sign_out.html"
        }, {
            name: "shiyojoTile",
            templateUrl: "/rebound/tiles/shiyojo.html"
        }, {
            name: "toggleTile",
            templateUrl: "/rebound/tiles/togglable.html"
        }, {
            name: "videoTile",
            Gh: Cl,
            templateUrl: "/rebound/tiles/video_tile.html"
        }, {
            name: "playlistTile",
            Gh: Cl,
            templateUrl: "/rebound/tiles/playlist_tile.html"
        }, {
            name: "loadingTile",
            templateUrl: "/rebound/tiles/loading_tile.html"
        }, {
            name: "dvrClipTile",
            Gh: yi,
            templateUrl: "/rebound/tiles/dvr_clip.html"
        }];
        g = 0;
        for (k = a.length; g < k; ++g)
            e = a[g],
            $.Fh(e.name, e.Gh || gi, M.I + e.templateUrl);
        e = [{
            name: "rootDispatcher",
            factory: function(a) {
                var b = new Tg;
                b.G = a;
                return b
            },
            Nc: ["document"]
        }, {
            name: "$exceptionHandler",
            factory: function(a) {
                return x(a.sr, a)
            },
            Nc: ["exceptionLogger"]
        }, {
            name: "rateLimit",
            factory: oo,
            Nc: oo.inject
        }, {
            name: "soundService",
            factory: function(a, b) {
                return a.get(b.supportsSounds ? en : qm)
            },
            Nc: ["injector", "environmentModel"]
        }, {
            name: "browseModel",
            factory: function(a, b) {
                return a.get(b.Sh ? Hl : Gl)
            },
            Nc: ["injector", "environmentModel"]
        }, {
            name: "searchService",
            factory: function(a, b) {
                return a.get(b.Th ? Pl : Wm)
            },
            Nc: ["injector", "environmentModel"]
        }, {
            name: "authService",
            factory: function(a, b) {
                var c = b.isSupported() ? hn : wh;
                return a.get(c)
            },
            Nc: ["injector", "ssoApi"]
        }, {
            name: "relatedVideosService",
            factory: function(a, b) {
                return b.useInnerTubeWatchNext ? a.get(sg, {
                    brandable: !1,
                    name: "watchNextService",
                    path: "/next",
                    parser: a.get("watchNextParser"),
                    paramKey: "videoId",
                    params: {}
                }) : a.get(Z, {
                    brandable: !1,
                    id: "relatedVideos",
                    listType: "RV",
                    path: "/videos/{relatedId}/related",
                    opt_paramKey: "relatedId",
                    parser: a.get("videoParser"),
                    opt_params: {
                        fields: "author,title,logo,entry[$default-filter](author,title,yt:statistics,yt:hd,yt:claimed,yt:paidContent,yt:rating,media:group(yt:videoid,yt:duration,yt:uploaderId,yt:uploaded,media:credit,media:description)),openSearch:totalResults"
                    }
                })
            },
            Nc: ["injector", "environmentModel"]
        }];
        g = 0;
        for (k = e.length; g < k; ++g)
            a = e[g],
            a.factory.inject = a.Nc,
            $.rq(a.name, a.factory);
        c.inject = ["markup", "locale"];
        $.Mk("templatePreprocessor", c);
        b.inject = ["markup", "injector"];
        $.Mk("angularTemplatePreprocessor", b);
        e = [{
            name: "listSelectionManager",
            constructor: Zh
        }];
        g = 0;
        for (k = e.length; g < k; ++g)
            a = e[g],
            $.tr(a.name, a.constructor);
        a = [{
            constructor: Nm,
            id: "likeService",
            httpMethod: "POST",
            path: "/videos/{videoId}/ratings",
            opt_template: '<yt:rating value="{likeValue}"/>'
        }, {
            constructor: Nm,
            id: "subscribeService",
            httpMethod: "POST",
            path: "/users/default/subscriptions",
            opt_template: '<category scheme="http://gdata.youtube.com/schemas/2007/subscriptiontypes.cat" term="channel"/><yt:username>{channelName}</yt:username>'
        }, {
            constructor: Nm,
            id: "unsubscribeService",
            httpMethod: "DELETE",
            path: "/users/default/subscriptions/{subscriptionId}"
        }, {
            constructor: ol,
            id: "suggestionService",
            paramKey: "q",
            path: "/complete/search"
        }, {
            constructor: Df,
            id: "featuredService",
            parser: "$featuredParser",
            path: "leanback_ajax",
            opt_params: {
                action_featured: 1,
                client: "lb4",
                hl: ""
            }
        }, {
            constructor: cl,
            id: "remoteQueueService",
            listType: "RQ",
            parser: "$videoParser",
            path: "/videos/batch",
            opt_params: {
                v: "2.1"
            }
        }, {
            altId: "FL",
            constructor: Z,
            id: "userFavoritesService",
            listType: "FL",
            parser: "$videoParser",
            path: "/users/{userName}/favorites",
            opt_paramKey: "userName",
            opt_params: {
                fields: "author,title,logo,entry[$default-filter](author,title,yt:statistics,yt:hd,yt:claimed,yt:paidContent,yt:rating,media:group(yt:videoid,yt:duration,yt:uploaderId,yt:uploaded,media:credit,media:description)),openSearch:totalResults"
            }
        }, {
            altId: "UU",
            brandable: !0,
            constructor: Z,
            id: "userUploadsService",
            listType: "UU",
            parser: "$videoParser",
            path: "/users/{userName}/uploads",
            opt_paramKey: "userName",
            opt_params: {
                fields: "author,title,logo,entry[$default-filter](author,title,yt:statistics,yt:hd,yt:claimed,yt:paidContent,yt:rating,media:group(yt:videoid,yt:duration,yt:uploaderId,yt:uploaded,media:credit,media:description)),openSearch:totalResults"
            }
        }, {
            brandable: !0,
            constructor: Om,
            id: "myUploadsService",
            listType: "UU",
            parser: "$videoParser",
            path: "/users/{userName}/uploads",
            opt_paramKey: "userName",
            opt_params: {
                fields: "author,title,logo,entry[$default-filter](author,title,yt:statistics,yt:hd,yt:claimed,yt:paidContent,yt:rating,media:group(yt:videoid,yt:duration,yt:uploaderId,yt:uploaded,media:credit,media:description)),openSearch:totalResults"
            }
        }, {
            altId: "SF",
            constructor: Z,
            id: "videoService",
            listType: "SF",
            parser: "$videoParser",
            path: "/standardfeeds/{regionId}/{feedName}",
            opt_paramKey: "feedName",
            opt_params: {
                fields: "author,title,logo,entry[$default-filter](author,title,yt:statistics,yt:hd,yt:claimed,yt:paidContent,yt:rating,media:group(yt:videoid,yt:duration,yt:uploaderId,yt:uploaded,media:credit,media:description)),openSearch:totalResults",
                regionId: ""
            }
        }, {
            constructor: Z,
            id: "newSubscriptionsService",
            listType: "SU",
            parser: "$videoParser",
            path: "/users/default/newsubscriptionvideos",
            opt_paramKey: "noParamKeyRequired",
            opt_params: {
                fields: "author,title,logo,entry[$default-filter](author,title,yt:statistics,yt:hd,yt:claimed,yt:paidContent,yt:rating,media:group(yt:videoid,yt:duration,yt:uploaderId,yt:uploaded,media:credit,media:description)),openSearch:totalResults"
            }
        }, {
            altId: "ST",
            constructor: Z,
            id: "standardFeedService",
            listType: "SF",
            parser: "$videoParser",
            path: "/standardfeeds/{regionId}/{feedName}",
            opt_paramKey: "feedName",
            opt_params: {
                time: "today",
                fields: "author,title,logo,entry[$default-filter](author,title,yt:statistics,yt:hd,yt:claimed,yt:paidContent,yt:rating,media:group(yt:videoid,yt:duration,yt:uploaderId,yt:uploaded,media:credit,media:description)),openSearch:totalResults",
                regionId: ""
            }
        }, {
            constructor: Z,
            id: "activityService",
            listType: "AF",
            path: "/users/{userName}/events",
            parser: "$activityParser",
            opt_paramKey: "userName",
            opt_params: {
                fields: "title,logo,entry[$inline-filter],openSearch:totalResults",
                inline: !0
            }
        }, {
            constructor: Z,
            id: "riverService",
            listType: "HP",
            path: "/users/{userName}/river",
            parser: "$activityParser",
            opt_paramKey: "userName",
            opt_params: {
                fields: "title,logo,entry[$inline-filter],openSearch:totalResults",
                inline: !0
            }
        }, {
            altId: "PL",
            constructor: Z,
            id: "playlistService",
            listType: "PL",
            parser: "$videoParser",
            path: "/playlists/{playlistId}",
            opt_paramKey: "playlistId",
            opt_params: {
                fields: "author,title,logo,entry[$default-filter](author,title,yt:statistics,yt:hd,yt:claimed,yt:paidContent,yt:rating,media:group(yt:videoid,yt:duration,yt:uploaderId,yt:uploaded,media:credit,media:description)),openSearch:totalResults"
            }
        }, {
            constructor: Z,
            id: "videoPlaybackInfoService",
            listType: "VI",
            parser: "$videoParser",
            path: "/videos/{videoId}",
            opt_paramKey: "videoId",
            opt_params: {
                fields: "title,yt:statistics,yt:hd,yt:claimed,media:group(yt:videoid,yt:duration,yt:uploaderId,yt:uploaded,media:credit)"
            }
        }, {
            constructor: Z,
            id: "recommendedVideosService",
            listType: "RC",
            parser: "$videoParser",
            path: "/users/{userName}/recommendations",
            opt_paramKey: "userName",
            opt_params: {
                fields: "author,title,logo,entry[$default-filter](author,title,yt:statistics,yt:hd,yt:claimed,yt:paidContent,yt:rating,media:group(yt:videoid,yt:duration,yt:uploaderId,yt:uploaded,media:credit,media:description)),openSearch:totalResults"
            }
        }, {
            constructor: Z,
            id: "watchLaterService",
            listType: "WL",
            parser: "$videoParser",
            path: "/users/{userName}/watch_later",
            opt_paramKey: "userName",
            opt_params: {
                fields: "author,title,logo,entry[$default-filter](author,title,yt:statistics,yt:hd,yt:claimed,yt:paidContent,yt:rating,media:group(yt:videoid,yt:duration,yt:uploaderId,yt:uploaded,media:credit,media:description)),openSearch:totalResults"
            }
        }, {
            constructor: Z,
            id: "watchHistoryService",
            listType: "HL",
            parser: "$videoParser",
            path: "/users/{userName}/watch_history",
            opt_paramKey: "userName",
            opt_params: {
                fields: "author,title,logo,entry[$default-filter](author,title,yt:statistics,yt:hd,yt:claimed,yt:paidContent,yt:rating,media:group(yt:videoid,yt:duration,yt:uploaderId,yt:uploaded,media:credit,media:description)),openSearch:totalResults"
            }
        }, {
            constructor: ej,
            id: "brandingService",
            parser: "$brandingParser",
            path: "/partners/{userName}/branding/default",
            opt_paramKey: "userName",
            opt_params: {
                fields: "yt:option[@name='device_watchpage.watermark.image.url' or @name='generictv_watchpage.banner.image.url' or @name='$banner-quality' or @name='watchpage.global.featured_playlist.id' or @name='channel.featured_video_module.video_id.string']"
            }
        }, {
            constructor: ej,
            id: "userPlaylistsService",
            parser: "$playlistParser",
            path: "/users/{userName}/playlists",
            opt_paramKey: "userName",
            opt_params: {
                fields: "entry(yt:playlistId,title,summary,author,yt:countHint)"
            }
        }, {
            constructor: ej,
            id: "channelPaidInfoService",
            parser: "$channelPaidInfoParser",
            path: "/channels/{channelId}",
            opt_paramKey: "channelId",
            opt_params: {
                fields: "yt:paidContent"
            }
        }, {
            constructor: ej,
            id: "userSubscriptionsService",
            parser: "$subscriptionsParser",
            path: "/users/{userName}/subscriptions",
            opt_paramKey: "userName",
            opt_params: {
                fields: "entry(id,yt:username,yt:channelId),openSearch:totalResults",
                "max-results": 50
            }
        }, {
            constructor: ej,
            id: "userProfileService",
            parser: "$userProfileParser",
            path: "/users/{userName}",
            opt_paramKey: "userName",
            opt_params: {
                fields: "yt:userId,yt:username,title,media:thumbnail,yt:statistics"
            }
        }, {
            id: "channelSuggestionService",
            constructor: ej,
            path: "/users/{userName}/suggestion",
            parser: "$channelSuggestionParser",
            opt_paramKey: "userName",
            opt_params: {
                fields: "entry",
                inline: !0,
                "max-results": 3
            }
        }, {
            constructor: sg,
            id: "guideService",
            parser: "$guideParser",
            path: "/guide"
        }, {
            constructor: sg,
            id: "browseService",
            parser: "$browseParser",
            path: "/browse",
            opt_brandable: !0
        }];
        g = 0;
        for (k = a.length; g < k; ++g)
            e = a[g],
            $.Nf(e.id, e.constructor, e),
            e.altId && $.PF(e.altId, e.id)
    }
    function Do(a) {
        for (var b = $.Yp(), c = 0, e = b.length; c < e; ++c)
            a.factory(b[c], x($.get, $, b[c]))
    }
    function Eo(a, b) {
        function c(a) {
            a.controller && a.controller.xa()
        }
        M.value("locale", b);
        M.value("brandable", !1);
        [{
            name: "ytApplication",
            restrict: "E",
            replace: !0,
            scope: !0,
            templateUrl: M.I + "/app.html",
            controller: po
        }, {
            name: "ytDialog",
            restrict: "E",
            replace: !0,
            scope: !0,
            templateUrl: M.I + "/dialogs/dialog.html",
            controller: Di
        }, {
            name: "ytWatch",
            restrict: "E",
            replace: !1,
            scope: !0,
            templateUrl: M.I + "/watch.html",
            controller: wo
        }].forEach(function(b) {
            a.directive(b.name, function() {
                var a = {
                    restrict: b.restrict,
                    replace: b.replace,
                    scope: b.scope,
                    templateUrl: b.templateUrl,
                    controller: b.controller
                };
                "E" === b.restrict && (a.link = c);
                return a
            })
        });
        a.directive("ytFocusable", ["timeService", function(a) {
            return {
                restrict: "A",
                replace: !1,
                scope: !0,
                controller: Uh,
                link: function(b) {
                    a.setTimeout(function() {
                        c(b)
                    }, 0)
                }
            }
        }
        ]);
        a.directive("ytSearch", ["$injector", "environmentModel", function(a, b) {
            var g = {
                restrict: "E",
                replace: !1,
                scope: !0,
                templateUrl: M.I + "/search.html",
                controller: vo,
                link: c
            };
            b.isChromelessContext && (g.templateUrl = M.I + "/empty.html",
            g.controller = Nh);
            return g
        }
        ]);
        a.directive("ytKeyboard", ["$injector", "locale", "environmentModel", function(a, b, g) {
            a = qo;
            switch (b.Fa) {
            case "ja_JP":
                a = to;
                break;
            case "ko_KR":
                a = uo;
                break;
            case "zh_CN":
            case "zh_HK":
            case "zh_TW":
                a = so
            }
            return g.supportsNativeOsk ? {
                restrict: "E",
                replace: !0,
                template: ""
            } : {
                restrict: "E",
                replace: !0,
                scope: !0,
                templateUrl: M.I + "/keyboard.html",
                controller: a,
                link: c
            }
        }
        ]);
        a.value("xhrBackend", Vj);
        a.value("jsonpBackend", xo)
    }
    ;ba("yt.tv.initializer", function(a) {
        var b = "start_browse";
        window.location.href.match(/[?&]v=[\w\+\/\-_=]+/) ? b = "start_watch" : window.location.href.match(/[?&]reversePairingCode=/) && (b = "start_dial");
        window.jstiming.load.name = b;
        if (b = bg("stickyLabel"))
            if (0 <= window.location.href.indexOf("stick=0"))
                cg("stickyLabel", "/", document.domain);
            else if (!window.location.href.match("label=")) {
                window.location.href = window.location.href.replace(/\/tv\??/, "/tv?label=" + b + "&");
                return
            }
        a && (M.yi = a,
        M.I = a + "/html",
        M.Or = a + "/img");
        Hf = Gf = JSON.parse;
        Ef = JSON.stringify;
        pj.prototype.parse = function(a) {
            return JSON.parse(a)
        }
        ;
        window.requestAnimationFrame = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
                window.setTimeout(a, 16)
            }
        }();
        el.value("applicationPath", a);
        b = angular.injector([el.name]).get("locale");
        Eo(M, b);
        var c = {
            Vk: 0,
            FG: 0,
            complete: function() {
                if (this.Vk <= ++this.FG) {
                    window.jstiming.load.tick("app_r");
                    var a = [];
                    a.push('<div id="app-container">');
                    a.push("<yt:application></yt:application>");
                    a.push("</div>");
                    var b = document.getElementById("leanback");
                    angular.element(b).html(a.join(""));
                    angular.bootstrap(b, ["leanback-app"])
                }
            }
        };
        c.Vk++;
        window.jstiming.load.tick("msg_rq");
        b.GG(x(Fo, window, c));
        "Steel" == m("environment.browser", window) && (a += "/api-compiled.js",
        c.Vk++,
        window.jstiming.load.tick("yts_rq"),
        xf(a).Qe(function() {
            ytshell.ready(x(Go, window, c))
        }).no(function() {
            c.complete()
        }))
    }, void 0);
    function Go(a, b) {
        window.jstiming.load.tick("yts_r");
        null == m("environment.ytshell", window) && (window.environment.ytshell = b);
        a.complete()
    }
    function Fo(a) {
        window.jstiming.load.tick("msg_r");
        a.complete()
    }
    ;
}
)();
