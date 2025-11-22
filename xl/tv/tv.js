var _____WB$wombat$assign$function_____ = function(name) {
    return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name];
};
if (!self.__WB_pmw) {
    self.__WB_pmw = function(obj) {
        this.__WB_source = obj;
        return this;
    }
} {
    let window = _____WB$wombat$assign$function_____("window");
    let self = _____WB$wombat$assign$function_____("self");
    let document = _____WB$wombat$assign$function_____("document");
    let location = _____WB$wombat$assign$function_____("location");
    let top = _____WB$wombat$assign$function_____("top");
    let parent = _____WB$wombat$assign$function_____("parent");
    let frames = _____WB$wombat$assign$function_____("frames");
    let opens = _____WB$wombat$assign$function_____("opens");
    var e = false,
        i = null,
        k = true;

    function l(a) {
        throw a;
    }
    var aa = encodeURIComponent,
        ba = Object,
        ca = navigator,
        m = Error,
        da = Boolean,
        ea = parseInt,
        n = String,
        fa = document,
        ga = decodeURIComponent,
        o = Array,
        q = Math;

    function ha(a, b) {
        return a.toString = b
    }

    function ia(a, b) {
        return a.length = b
    }

    function ja(a, b) {
        return a.width = b
    }

    function ka(a, b) {
        return a.value = b
    }

    function la(a, b) {
        return a.currentTarget = b
    }

    function ma(a, b) {
        return a.target = b
    }

    function na(a, b) {
        return a.remove = b
    }

    function oa(a, b) {
        return a.type = b
    }

    function pa(a, b) {
        return a.contains = b
    }

    function qa(a, b) {
        return a.clear = b
    }

    function sa(a, b) {
        return a.height = b
    }
    var ta = "setData",
        ua = "appendChild",
        s = "push",
        va = "stop",
        u = "toString",
        v = "length",
        wa = "getBoundingClientRect",
        xa = "plugins",
        ya = "create",
        w = "prototype",
        za = "test",
        Aa = "exec",
        Ba = "clearTimeout",
        y = "width",
        Ca = "index",
        Da = "clientWidth",
        Ea = "abort",
        Fa = "slice",
        Ga = "setTimeout",
        z = "replace",
        Ha = "nodeType",
        Ia = "document",
        Ja = "ceil",
        Ka = "load",
        A = "split",
        La = "floor",
        Ma = "getElementById",
        Na = "offsetWidth",
        Oa = "createTextNode",
        C = "stopPropagation",
        Pa = "value",
        Qa = "location",
        D = "indexOf",
        Ra = "message",
        Sa = "hasOwnProperty",
        E = "dispatchEvent",
        F = "style",
        Ta = "capture",
        Ua = "body",
        Va = "write",
        G = "view",
        Wa = "removeChild",
        Ya = "parent",
        Za = "target",
        $a = "screenX",
        ab = "screenY",
        bb = "lastChild",
        H = "call",
        cb = "getBoxObjectFor",
        db = "send",
        eb = "innerHeight",
        fb = "remove",
        gb = "some",
        hb = "start",
        ib = "focus",
        jb = "createElement",
        I = "setProperty",
        kb = "keyCode",
        lb = "firstChild",
        mb = "forEach",
        pb = "clientHeight",
        qb = "charCodeAt",
        rb = "substring",
        sb = "handleEvent",
        tb = "addVariable",
        J = "type",
        ub = "every",
        vb = "contains",
        wb = "apply",
        xb = "clear",
        yb = "childNodes",
        zb = "defaultView",
        Ab = "navigator",
        Bb =
        "name",
        Cb = "parentNode",
        Db = "offsetTop",
        Eb = "contentWindow",
        K = "height",
        Fb = "splice",
        Gb = "offsetHeight",
        Hb = "join",
        Ib = "unshift",
        Jb = "documentElement",
        Kb = "substr",
        M, Lb = Lb || {},
        N = this,
        Nb = function(a, b, c) {
            var d = a[A]("."),
                f = c || N,
                g;
            !(d[0] in f) && f.execScript && f.execScript("var " + d[0]);
            for (; d[v] && (g = d.shift());)
                if (!d[v] && Mb(b)) f[g] = b;
                else f = f[g] ? f[g] : (f[g] = {})
        },
        Ob = function(a, b) {
            var c = a[A]("."),
                d = b || N,
                f;
            for (; f = c.shift();)
                if (d[f]) d = d[f];
                else return i;
            return d
        },
        Pb = function() {},
        Qb = function(a) {
            var b = typeof a;
            if (b == "object")
                if (a) {
                    if (a instanceof o || !(a instanceof ba) && ba[w][u][H](a) == "[object Array]") return "array";
                    if (typeof a[H] != "undefined") return "function"
                } else return "null";
            else if (b == "function" && typeof a[H] == "undefined") return "object";
            return b
        },
        Mb = function(a) {
            return typeof a != "undefined"
        };
    var O = function(a) {
            return Qb(a) == "array"
        },
        Rb = function(a) {
            var b = Qb(a);
            return b == "array" || b == "object" && typeof a[v] == "number"
        },
        P = function(a) {
            return typeof a == "string"
        },
        Sb = function(a) {
            return typeof a == "number"
        },
        Tb = function(a) {
            return Qb(a) == "function"
        },
        Ub = function(a) {
            var b = Qb(a);
            return b == "object" || b == "array" || b == "function"
        },
        Xb = function(a) {
            if (a[Sa] && a[Sa](Vb)) {
                var b = a[Vb];
                if (b) return b
            }
            a[Vb] || (a[Vb] = ++Wb);
            return a[Vb]
        },
        Vb = "closure_hashCode_",
        Wb = 0,
        Yb = function(a) {
            var b = Qb(a);
            if (b == "object" || b == "array") {
                if (a.qa) return a.qa[H](a);
                var c = b == "array" ? [] : {};
                for (var d in a) c[d] = Yb(a[d]);
                return c
            }
            return a
        },
        Zb = function(a, b) {
            var c = a.ud;
            if (arguments[v] > 2) {
                var d = o[w][Fa][H](arguments, 2);
                c && d[Ib][wb](d, c);
                c = d
            }
            b = a.wd || b;
            a = a.vd || a;
            var f, g = b || N;
            f = c ? function() {
                var h = o[w][Fa][H](arguments);
                h[Ib][wb](h, c);
                return a[wb](g, h)
            } : function() {
                return a[wb](g, arguments)
            };
            f.ud = c;
            f.wd = b;
            f.vd = a;
            return f
        },
        $b = function(a) {
            var b = o[w][Fa][H](arguments, 1);
            b[Ib](a, i);
            return Zb[wb](i, b)
        },
        ac = Date.now || function() {
            return (new Date).getTime()
        },
        Q = function(a, b, c) {
            Nb(a,
                b, c)
        },
        R = function(a, b) {
            function c() {}
            c.prototype = b[w];
            a.u = b[w];
            a.prototype = new c
        };
    Function[w].e = function(a) {
        R(this, a)
    };
    var bc = function() {};
    M = bc[w];
    M.Id = e;
    M.yf = function() {
        return this.Id
    };
    M.Mc = bc[w].yf;
    M.aa = function() {
        if (!this.Id) {
            this.Id = k;
            this.o()
        }
    };
    M.o = function() {};
    var cc = function(a, b, c) {
            if (a[D]) return a[D](b, c);
            if (o[D]) return o[D](a, b, c);
            var d = c == i ? 0 : c < 0 ? q.max(0, a[v] + c) : c;
            for (; d < a[v]; d++)
                if (d in a && a[d] === b) return d;
            return -1
        },
        S = function(a, b, c) {
            if (a[mb]) a[mb](b, c);
            else if (o[mb]) o[mb](a, b, c);
            else {
                var d = a[v],
                    f = P(a) ? a[A]("") : a,
                    g = 0;
                for (; g < d; g++) g in f && b[H](c, f[g], g, a)
            }
        },
        dc = function(a, b, c) {
            var d = a[v],
                f = P(a) ? a[A]("") : a,
                g = d - 1;
            for (; g >= 0; --g) g in f && b[H](c, f[g], g, a)
        },
        ec = function(a, b, c) {
            if (a.map) return a.map(b, c);
            if (o.map) return o.map(a, b, c);
            var d = a[v],
                f = [],
                g = 0,
                h = P(a) ?
                a[A]("") : a,
                j = 0;
            for (; j < d; j++)
                if (j in h) f[g++] = b[H](c, h[j], j, a);
            return f
        },
        fc = function(a, b, c, d) {
            if (a.reduce) return d ? a.reduce(Zb(b, d), c) : a.reduce(b, c);
            var f = c;
            S(a, function(g, h) {
                f = b[H](d, f, g, h, a)
            });
            return f
        },
        gc = function(a, b, c) {
            if (a[gb]) return a[gb](b, c);
            if (o[gb]) return o[gb](a, b, c);
            var d = a[v],
                f = P(a) ? a[A]("") : a,
                g = 0;
            for (; g < d; g++)
                if (g in f && b[H](c, f[g], g, a)) return k;
            return e
        },
        hc = function(a, b, c) {
            if (a[ub]) return a[ub](b, c);
            if (o[ub]) return o[ub](a, b, c);
            var d = a[v],
                f = P(a) ? a[A]("") : a,
                g = 0;
            for (; g < d; g++)
                if (g in f &&
                    !b[H](c, f[g], g, a)) return e;
            return k
        },
        ic = function(a, b) {
            if (a[vb]) return a[vb](b);
            return cc(a, b) > -1
        };
    var jc = function(a) {
            if (!O(a)) {
                var b = a[v] - 1;
                for (; b >= 0; b--) delete a[b]
            }
            ia(a, 0)
        },
        kc = function(a, b) {
            ic(a, b) || a[s](b)
        },
        lc = function(a, b) {
            var c = cc(a, b),
                d;
            if (d = c != -1) o[w][Fb][H](a, c, 1)[v] == 1;
            return d
        };
    var mc = function(a) {
            if (O(a)) return a.concat();
            else {
                var b = [],
                    c = 0,
                    d = a[v];
                for (; c < d; c++) b[c] = a[c];
                return b
            }
        },
        nc = function(a) {
            if (O(a)) return a.concat();
            return mc(a)
        },
        oc = function(a) {
            var b = 1;
            for (; b < arguments[v]; b++) {
                var c = arguments[b];
                if (Rb(c)) {
                    c = nc(c);
                    a[s][wb](a, c)
                } else a[s](c)
            }
        },
        qc = function(a) {
            return o[w][Fb][wb](a, pc(arguments, 1))
        },
        pc = function(a, b, c) {
            return arguments[v] <= 2 ? o[w][Fa][H](a, b) : o[w][Fa][H](a, b, c)
        };
    var T = function(a, b, c) {
            for (var d in a) b[H](c, a[d], d, a)
        },
        rc = function(a, b, c) {
            var d = {};
            for (var f in a) d[f] = b[H](c, a[f], f, a);
            return d
        },
        sc = function(a) {
            var b = [],
                c = 0;
            for (var d in a) b[c++] = a[d];
            return b
        },
        tc = function(a) {
            var b = [],
                c = 0;
            for (var d in a) b[c++] = d;
            return b
        },
        uc = function(a, b) {
            for (var c in a)
                if (a[c] == b) return k;
            return e
        },
        vc = function(a) {
            for (var b in a) return e;
            return k
        },
        wc = function(a, b) {
            var c;
            if (c = b in a) delete a[b];
            return c
        },
        xc = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString",
            "toString", "valueOf"
        ],
        yc = function(a) {
            var b, c, d = 1;
            for (; d < arguments[v]; d++) {
                c = arguments[d];
                for (b in c) a[b] = c[b];
                var f = 0;
                for (; f < xc[v]; f++) {
                    b = xc[f];
                    if (ba[w][Sa][H](c, b)) a[b] = c[b]
                }
            }
        };
    var zc = function(a, b) {
        bc[H](this);
        this.ib = b;
        this.ha = [];
        this.fh(a)
    };
    R(zc, bc);
    M = zc[w];
    M.Dd = i;
    M.Hd = i;
    M.kc = function(a) {
        this.Dd = a
    };
    M.hg = function(a) {
        this.Hd = a
    };
    M.h = function() {
        if (this.ha[v]) return this.ha.pop();
        return this.qb()
    };
    M.Aa = function(a) {
        this.ha[v] < this.ib ? this.ha[s](a) : this.Ra(a)
    };
    M.fh = function(a) {
        if (a > this.ib) l(m("[goog.structs.SimplePool] Initial cannot be greater than max"));
        var b = 0;
        for (; b < a; b++) this.ha[s](this.qb())
    };
    M.qb = function() {
        return this.Dd ? this.Dd() : {}
    };
    M.Ra = function(a) {
        if (this.Hd) this.Hd(a);
        else if (Tb(a.aa)) a.aa();
        else
            for (var b in a) delete a[b]
    };
    M.o = function() {
        zc.u.o[H](this);
        var a = this.ha;
        for (; a[v];) this.Ra(a.pop());
        delete this.ha
    };
    var Ac = function(a) {
            var b = 1;
            for (; b < arguments[v]; b++) {
                var c = n(arguments[b])[z](/\$/g, "$$$$");
                a = a[z](/\%s/, c)
            }
            return a
        },
        Bc = function(a) {
            return /^[\s\xa0]*$/ [za](a)
        },
        Cc = function(a) {
            return a[z](/^[\s\xa0]+|[\s\xa0]+$/g, "")
        },
        Dc = /^[a-zA-Z0-9\-_.!~*'()]*$/,
        Ec = function(a) {
            a = n(a);
            if (!Dc[za](a)) return aa(a);
            return a
        },
        Fc = function(a) {
            return ga(a[z](/\+/g, " "))
        },
        Lc = function(a, b) {
            if (b) return a[z](Gc, "&amp;")[z](Hc, "&lt;")[z](Ic, "&gt;")[z](Jc, "&quot;");
            else {
                if (!Kc[za](a)) return a;
                if (a[D]("&") != -1) a = a[z](Gc, "&amp;");
                if (a[D]("<") != -1) a = a[z](Hc, "&lt;");
                if (a[D](">") != -1) a = a[z](Ic, "&gt;");
                if (a[D]('"') != -1) a = a[z](Jc, "&quot;");
                return a
            }
        },
        Gc = /&/g,
        Hc = /</g,
        Ic = />/g,
        Jc = /\"/g,
        Kc = /[&<>\"]/;
    var Mc = function(a, b) {
        var c = new RegExp(n(b)[z](/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1")[z](/\x08/g, "\\x08"), "g");
        return a[z](c, "")
    };
    var Nc = function(a) {
            return a == i ? "" : n(a)
        },
        U = function() {
            return o[w][Hb][H](arguments, "")
        };
    var Pc = function(a, b) {
            var c = 0,
                d = Cc(n(a))[A]("."),
                f = Cc(n(b))[A]("."),
                g = q.max(d[v], f[v]),
                h = 0;
            for (; c == 0 && h < g; h++) {
                var j = d[h] || "",
                    p = f[h] || "",
                    r = new RegExp("(\\d*)(\\D*)", "g"),
                    t = new RegExp("(\\d*)(\\D*)", "g");
                do {
                    var x = r[Aa](j) || ["", "", ""],
                        B = t[Aa](p) || ["", "", ""];
                    if (x[0][v] == 0 && B[0][v] == 0) break;
                    var L = x[1][v] == 0 ? 0 : ea(x[1], 10),
                        ra = B[1][v] == 0 ? 0 : ea(B[1], 10);
                    c = Oc(L, ra) || Oc(x[2][v] == 0, B[2][v] == 0) || Oc(x[2], B[2])
                } while (c == 0)
            }
            return c
        },
        Oc = function(a, b) {
            if (a < b) return -1;
            else if (a > b) return 1;
            return 0
        };
    var Qc, Rc, Sc, Tc, Uc, Vc, Wc, Xc, Yc, Zc = function() {
        return N[Ab] ? N[Ab].userAgent : i
    };
    (function() {
        Vc = Uc = Tc = Sc = Rc = Qc = e;
        var a;
        if (a = Zc()) {
            var b = N[Ab];
            Qc = a[D]("Opera") == 0;
            Rc = !Qc && a[D]("MSIE") != -1;
            Tc = (Sc = !Qc && a[D]("WebKit") != -1) && a[D]("Mobile") != -1;
            Vc = (Uc = !Qc && !Sc && b.product == "Gecko") && b.vendor == "Camino"
        }
    })();
    var $c = Qc,
        V = Rc,
        ad = Uc,
        bd = Sc,
        cd = Tc,
        dd = (function() {
            var a = N[Ab];
            return a && a.platform || ""
        })();
    (function() {
        Wc = dd[D]("Mac") != -1;
        Xc = dd[D]("Win") != -1;
        Yc = dd[D]("Linux") != -1
    })();
    var ed = Wc,
        fd = Xc,
        gd = (function() {
            var a = "",
                b;
            if ($c && N.opera) {
                var c = N.opera.version;
                a = typeof c == "function" ? c() : c
            } else {
                if (ad) b = /rv\:([^\);]+)(\)|;)/;
                else if (V) b = /MSIE\s+([^\);]+)(\)|;)/;
                else if (bd) b = /WebKit\/(\S+)/;
                if (b) {
                    var d = b[Aa](Zc());
                    a = d ? d[1] : ""
                }
            }
            return a
        })();
    var hd = function(a, b) {
        oa(this, a);
        ma(this, b);
        la(this, this[Za])
    };
    R(hd, bc);
    hd[w].o = function() {
        delete this[J];
        delete this[Za];
        delete this.currentTarget
    };
    hd[w].Ya = e;
    hd[w].cd = k;
    hd[w].stopPropagation = function() {
        this.Ya = k
    };
    var id = function(a, b) {
        a && this.Tc(a, b)
    };
    R(id, hd);
    M = id[w];
    oa(M, i);
    ma(M, i);
    M.relatedTarget = i;
    M.offsetX = 0;
    M.offsetY = 0;
    M.clientX = 0;
    M.clientY = 0;
    M.screenX = 0;
    M.screenY = 0;
    M.button = 0;
    M.keyCode = 0;
    M.charCode = 0;
    M.ctrlKey = e;
    M.altKey = e;
    M.shiftKey = e;
    M.metaKey = e;
    M.ub = i;
    M.Tc = function(a, b) {
        oa(this, a[J]);
        ma(this, a[Za] || a.srcElement);
        la(this, b);
        this.relatedTarget = a.relatedTarget ? a.relatedTarget : this[J] == jd ? a.fromElement : this[J] == kd ? a.toElement : i;
        this.offsetX = typeof a.layerX == "number" ? a.layerX : a.offsetX;
        this.offsetY = typeof a.layerY == "number" ? a.layerY : a.offsetY;
        this.clientX = typeof a.clientX == "number" ? a.clientX : a.pageX;
        this.clientY = typeof a.clientY == "number" ? a.clientY : a.pageY;
        this.screenX = a[$a] || 0;
        this.screenY = a[ab] || 0;
        this.button = a.button;
        this.keyCode = a[kb] || 0;
        this.charCode =
            a.charCode || (this[J] == "keypress" ? a[kb] : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.ub = a;
        delete this.cd;
        delete this.Ya
    };
    M.stopPropagation = function() {
        this.Ya = k;
        if (this.ub[C]) this.ub[C]();
        else this.ub.cancelBubble = k
    };
    M.o = function() {
        id.u.o[H](this);
        this.ub = i
    };
    var ld = function() {},
        md = 0;
    M = ld[w];
    M.be = i;
    M.hb = i;
    M.$f = i;
    M.src = i;
    oa(M, i);
    M.capture = i;
    M.Wb = i;
    M.pa = 0;
    M.Fb = e;
    M.zd = e;
    M.Tc = function(a, b, c, d, f, g) {
        if (Tb(a)) this.be = k;
        else if (a && a[sb] && Tb(a[sb])) this.be = e;
        else l(m("Invalid listener argument"));
        this.hb = a;
        this.$f = b;
        this.src = c;
        oa(this, d);
        this.capture = !!f;
        this.Wb = g;
        this.zd = e;
        this.pa = ++md;
        this.Fb = e
    };
    M.handleEvent = function(a) {
        if (this.be) return this.hb[H](this.Wb || this.src, a);
        return this.hb[sb][H](this.hb, a)
    };
    var nd = {},
        od = {},
        pd = {},
        qd = new zc(0, 600);
    qd.kc(function() {
        return {
            s: 0
        }
    });
    qd.hg(function(a) {
        a.s = 0
    });
    var rd = new zc(0, 600);
    rd.kc(function() {
        return []
    });
    rd.hg(function(a) {
        ia(a, 0);
        delete a.fc;
        delete a.ke
    });
    var sd = new zc(0, 600);
    sd.kc(function() {
        var a = function(b) {
            return td[H](a.src, a.pa, b)
        };
        return a
    });
    var ud = function() {
            return new ld
        },
        vd = new zc(0, 600);
    vd.kc(ud);
    var wd = function() {
            return new id
        },
        xd = (function() {
            var a = i;
            if (V) {
                a = new zc(0, 600);
                a.kc(wd)
            }
            return a
        })(),
        yd = {},
        zd = function(a, b, c, d, f) {
            if (b)
                if (O(b)) {
                    var g = 0;
                    for (; g < b[v]; g++) zd(a, b[g], c, d, f);
                    return i
                } else {
                    var h = !!d,
                        j = od;
                    b in j || (j[b] = qd.h());
                    j = j[b];
                    if (!(h in j)) {
                        j[h] = qd.h();
                        j.s++
                    }
                    j = j[h];
                    var p = Xb(a),
                        r, t;
                    if (j[p]) {
                        r = j[p];
                        var g = 0;
                        for (; g < r[v]; g++) {
                            t = r[g];
                            if (t.hb == c && t.Wb == f) {
                                if (t.Fb) break;
                                return r[g].pa
                            }
                        }
                    } else {
                        r = j[p] = rd.h();
                        j.s++
                    }
                    var x = sd.h();
                    x.src = a;
                    t = vd.h();
                    t.Tc(c, x, a, b, h, f);
                    var B = t.pa;
                    x.pa = B;
                    r[s](t);
                    nd[B] =
                        t;
                    pd[p] || (pd[p] = rd.h());
                    pd[p][s](t);
                    if (a.addEventListener) {
                        if (a == N || !a.af) a.addEventListener(b, x, h)
                    } else a.attachEvent(Ad(b), x);
                    return B
                }
            else l(m("Invalid event type"))
        },
        Bd = function(a, b, c, d, f) {
            if (O(b)) {
                var g = 0;
                for (; g < b[v]; g++) Bd(a, b[g], c, d, f);
                return i
            }
            var h = zd(a, b, c, d, f);
            nd[h].zd = k;
            return h
        },
        Cd = function(a, b, c, d, f) {
            if (O(b)) {
                var g = 0;
                for (; g < b[v]; g++) Cd(a, b[g], c, d, f);
                return i
            }
            var h = !!d,
                j = Dd(a, b, h);
            if (!j) return e;
            var g = 0;
            for (; g < j[v]; g++)
                if (j[g].hb == c && j[g][Ta] == h && j[g].Wb == f) return Ed(j[g].pa);
            return e
        },
        Ed = function(a) {
            if (!nd[a]) return e;
            var b = nd[a];
            if (b.Fb) return e;
            var c = b.src,
                d = b[J],
                f = b.$f,
                g = b[Ta];
            if (c.removeEventListener) {
                if (c == N || !c.af) c.removeEventListener(d, f, g)
            } else c.detachEvent && c.detachEvent(Ad(d), f);
            var h = Xb(c),
                j = od[d][g][h];
            if (pd[h]) {
                var p = pd[h];
                lc(p, b);
                p[v] == 0 && delete pd[h]
            }
            b.Fb = k;
            j.ke = k;
            Fd(d, g, h, j);
            delete nd[a];
            return k
        },
        Fd = function(a, b, c, d) {
            if (!d.fc)
                if (d.ke) {
                    var f = 0,
                        g = 0;
                    for (; f < d[v]; f++)
                        if (d[f].Fb) vd.Aa(d[f]);
                        else {
                            if (f != g) d[g] = d[f];
                            g++
                        } ia(d, g);
                    d.ke = e;
                    if (g == 0) {
                        rd.Aa(d);
                        delete od[a][b][c];
                        od[a][b].s--;
                        if (od[a][b].s == 0) {
                            qd.Aa(od[a][b]);
                            delete od[a][b];
                            od[a].s--
                        }
                        if (od[a].s == 0) {
                            qd.Aa(od[a]);
                            delete od[a]
                        }
                    }
                }
        },
        Gd = function(a, b, c) {
            var d = 0,
                f = a == i,
                g = b == i,
                h = c == i;
            c = !!c;
            if (f) T(pd, function(x) {
                var B = x[v] - 1;
                for (; B >= 0; B--) {
                    var L = x[B];
                    if ((g || b == L[J]) && (h || c == L[Ta])) {
                        Ed(L.pa);
                        d++
                    }
                }
            });
            else {
                var j = Xb(a);
                if (pd[j]) {
                    var p = pd[j],
                        r = p[v] - 1;
                    for (; r >= 0; r--) {
                        var t = p[r];
                        if ((g || b == t[J]) && (h || c == t[Ta])) {
                            Ed(t.pa);
                            d++
                        }
                    }
                }
            }
            return d
        },
        Dd = function(a, b, c) {
            var d = od;
            if (b in d) {
                d = d[b];
                if (c in d) {
                    d = d[c];
                    var f = Xb(a);
                    if (d[f]) return d[f]
                }
            }
            return i
        },
        Hd = function(a, b, c, d, f) {
            var g = !!d,
                h = Dd(a, b, g);
            if (h) {
                var j = 0;
                for (; j < h[v]; j++)
                    if (h[j].hb == c && h[j][Ta] == g && h[j].Wb == f) return h[j]
            }
            return i
        },
        Id = "mousedown",
        jd = "mouseover",
        kd = "mouseout",
        Jd = "resize",
        Ad = function(a) {
            if (a in yd) return yd[a];
            return yd[a] = "on" + a
        },
        Ld = function(a, b, c, d) {
            var f = 1,
                g = od;
            if (b in g) {
                g = g[b];
                if (c in g) {
                    g = g[c];
                    var h = Xb(a);
                    if (g[h]) {
                        var j = g[h];
                        if (j.fc) j.fc++;
                        else j.fc = 1;
                        try {
                            var p = j[v],
                                r = 0;
                            for (; r < p; r++) {
                                var t = j[r];
                                if (t && !t.Fb) f &= Kd(t, d) !== e
                            }
                        } finally {
                            j.fc--;
                            Fd(b, c, h, j)
                        }
                    }
                }
            }
            return da(f)
        },
        Kd = function(a,
            b) {
            var c = a[sb](b);
            a.zd && Ed(a.pa);
            return c
        },
        Md = function(a, b) {
            if (P(b)) b = new hd(b, a);
            else if (b instanceof hd) ma(b, b[Za] || a);
            else {
                var c = b;
                b = new hd(b[J], a);
                yc(b, c)
            }
            var d = 1,
                f, g = b[J],
                h = od;
            if (!(g in h)) return k;
            h = h[g];
            var j = k in h,
                p = e in h;
            if (j) {
                f = [];
                var r = a;
                for (; r; r = r.re) f[s](r);
                var t = f[v] - 1;
                for (; !b.Ya && t >= 0; t--) {
                    la(b, f[t]);
                    d &= Ld(f[t], b[J], k, b) && b.cd != e
                }
            }
            if (p)
                if (j) {
                    var t = 0;
                    for (; !b.Ya && t < f[v]; t++) {
                        la(b, f[t]);
                        d &= Ld(f[t], b[J], e, b) && b.cd != e
                    }
                } else {
                    var x = a;
                    for (; !b.Ya && x; x = x.re) {
                        la(b, x);
                        d &= Ld(x, b[J], e, b) && b.cd !=
                            e
                    }
                } return da(d)
        },
        td = function(a, b) {
            if (!nd[a]) return k;
            var c = nd[a],
                d = c[J],
                f = od;
            if (!(d in f)) return k;
            f = f[d];
            var g;
            if (V) {
                var h = b || Ob("window.event"),
                    j = k in f;
                if (j) {
                    if (h[kb] < 0 || h.returnValue != undefined) return k;
                    Nd(h)
                }
                Xb(c.src);
                var p = xd.h();
                p.Tc(h, this);
                g = k;
                try {
                    if (j) {
                        var r = rd.h(),
                            t = p.currentTarget;
                        for (; t; t = t[Cb]) r[s](t);
                        var x = r[v] - 1;
                        for (; !p.Ya && x >= 0; x--) {
                            la(p, r[x]);
                            g &= Ld(r[x], d, k, p)
                        }
                        var x = 0;
                        for (; !p.Ya && x < r[v]; x++) {
                            la(p, r[x]);
                            g &= Ld(r[x], d, e, p)
                        }
                    } else g = Kd(c, p)
                } finally {
                    if (r) {
                        ia(r, 0);
                        rd.Aa(r)
                    }
                    p.aa();
                    xd.Aa(p)
                }
                return g
            }
            var B =
                new id(b, this);
            try {
                g = Kd(c, B)
            } finally {
                B.aa()
            }
            return g
        },
        Nd = function(a) {
            var b = e;
            if (a[kb] == 0) try {
                a.keyCode = -1;
                return
            } catch (c) {
                b = k
            }
            if (b || a.returnValue == undefined) a.returnValue = k
        };
    var Od = function() {};
    R(Od, bc);
    M = Od[w];
    M.af = k;
    M.re = i;
    M.addEventListener = function(a, b, c, d) {
        zd(this, a, b, c, d)
    };
    M.removeEventListener = function(a, b, c, d) {
        Cd(this, a, b, c, d)
    };
    M.dispatchEvent = function(a) {
        return Md(this, a)
    };
    M.o = function() {
        Od.u.o[H](this);
        Gd(this);
        this.re = i
    };
    var Qd = function(a, b) {
        Od[H](this);
        this.Oa = a || 1;
        this.lc = b || Pd;
        this.xd = Zb(this.ij, this);
        this.he = ac()
    };
    R(Qd, Od);
    Qd[w].enabled = e;
    var Pd = N.window;
    M = Qd[w];
    M.v = i;
    M.setInterval = function(a) {
        this.Oa = a;
        if (this.v && this.enabled) {
            this[va]();
            this[hb]()
        } else this.v && this[va]()
    };
    M.ij = function() {
        if (this.enabled) {
            var a = ac() - this.he;
            if (a > 0 && a < this.Oa * 0.8) this.v = this.lc[Ga](this.xd, this.Oa - a);
            else {
                this.kh();
                if (this.enabled) {
                    this.v = this.lc[Ga](this.xd, this.Oa);
                    this.he = ac()
                }
            }
        }
    };
    M.kh = function() {
        this[E]("tick")
    };
    M.start = function() {
        this.enabled = k;
        if (!this.v) {
            this.v = this.lc[Ga](this.xd, this.Oa);
            this.he = ac()
        }
    };
    M.stop = function() {
        this.enabled = e;
        if (this.v) {
            this.lc[Ba](this.v);
            this.v = i
        }
    };
    M.o = function() {
        Qd.u.o[H](this);
        this[va]();
        delete this.lc
    };
    var Rd = function(a, b, c) {
            if (Tb(a)) {
                if (c) a = Zb(a, c)
            } else if (a && typeof a[sb] == "function") a = Zb(a[sb], a);
            else l(m("Invalid listener argument"));
            return b > 2147483647 ? -1 : Pd[Ga](a, b || 0)
        },
        Sd = function(a) {
            Pd[Ba](a)
        };
    var Td = function(a, b, c) {
        this.ec = a;
        this.Oa = b || 0;
        this.eb = c;
        this.Ad = Zb(this.Pb, this)
    };
    R(Td, bc);
    var Ud = Td;
    M = Td[w];
    M.Yb = 0;
    M.o = function() {
        Td.u.o[H](this);
        this[va]();
        delete this.ec;
        delete this.eb
    };
    M.start = function(a) {
        this[va]();
        this.Yb = Rd(this.Ad, Mb(a) ? a : this.Oa)
    };
    M.stop = function() {
        this.Uc() && Sd(this.Yb);
        this.Yb = 0
    };
    M.hf = function() {
        this[va]();
        this.Pb()
    };
    M.Uc = function() {
        return this.Yb != 0
    };
    M.Pb = function() {
        this.Yb = 0;
        this.ec && this.ec[H](this.eb)
    };
    if ("StopIteration" in N) var Vd = N.StopIteration;
    else Vd = m("StopIteration");
    var Wd = function() {};
    Wd[w].next = function() {
        l(Vd)
    };
    Wd[w].Nb = function() {
        return this
    };
    var Xd = function(a) {
            if (a instanceof Wd) return a;
            if (typeof a.Nb == "function") return a.Nb(e);
            if (Rb(a)) {
                var b = 0,
                    c = new Wd;
                c.next = function() {
                    for (; k;) {
                        if (b >= a[v]) l(Vd);
                        if (b in a) return a[b++];
                        else b++
                    }
                };
                return c
            }
            l(m("Not implemented"))
        },
        Yd = function(a, b, c) {
            if (Rb(a)) try {
                S(a, b, c)
            } catch (d) {
                if (d !== Vd) l(d)
            } else {
                a = Xd(a);
                try {
                    for (; k;) b[H](c, a.next(), undefined, a)
                } catch (d) {
                    if (d !== Vd) l(d)
                }
            }
        };
    var Zd = function(a) {
            if (typeof a.ra == "function") return a.ra();
            if (P(a)) return a[A]("");
            if (Rb(a)) {
                var b = [],
                    c = a[v],
                    d = 0;
                for (; d < c; d++) b[s](a[d]);
                return b
            }
            return sc(a)
        },
        $d = function(a) {
            if (typeof a.Wa == "function") return a.Wa();
            if (typeof a.ra == "function") return undefined;
            if (Rb(a) || P(a)) {
                var b = [],
                    c = a[v],
                    d = 0;
                for (; d < c; d++) b[s](d);
                return b
            }
            return tc(a)
        },
        ae = function(a, b) {
            if (typeof a[vb] == "function") return a[vb](b);
            if (typeof a.Cc == "function") return a.Cc(b);
            if (Rb(a) || P(a)) return ic(a, b);
            return uc(a, b)
        },
        be = function(a,
            b, c) {
            if (typeof a[mb] == "function") a[mb](b, c);
            else if (Rb(a) || P(a)) S(a, b, c);
            else {
                var d = $d(a),
                    f = Zd(a),
                    g = f[v],
                    h = 0;
                for (; h < g; h++) b[H](c, f[h], d && d[h], a)
            }
        };
    var ce = function(a) {
        this.j = {};
        this.m = [];
        var b = arguments[v];
        if (b > 1) {
            if (b % 2) l(m("Uneven number of arguments"));
            var c = 0;
            for (; c < b; c += 2) this.sa(arguments[c], arguments[c + 1])
        } else a && this.sd(a)
    };
    M = ce[w];
    M.s = 0;
    M.qc = 0;
    M.la = function() {
        return this.s
    };
    M.ra = function() {
        this.Bc();
        var a = [],
            b = 0;
        for (; b < this.m[v]; b++) a[s](this.j[this.m[b]]);
        return a
    };
    M.Wa = function() {
        this.Bc();
        return this.m.concat()
    };
    M.Ea = function(a) {
        return de(this.j, a)
    };
    M.Cc = function(a) {
        var b = 0;
        for (; b < this.m[v]; b++) {
            var c = this.m[b];
            if (de(this.j, c) && this.j[c] == a) return k
        }
        return e
    };
    M.Ja = function() {
        return this.s == 0
    };
    qa(M, function() {
        this.j = {};
        ia(this.m, 0);
        this.qc = this.s = 0
    });
    na(M, function(a) {
        if (de(this.j, a)) {
            delete this.j[a];
            this.s--;
            this.qc++;
            this.m[v] > 2 * this.s && this.Bc();
            return k
        }
        return e
    });
    M.Bc = function() {
        if (this.s != this.m[v]) {
            var a = 0,
                b = 0;
            for (; a < this.m[v];) {
                var c = this.m[a];
                if (de(this.j, c)) this.m[b++] = c;
                a++
            }
            ia(this.m, b)
        }
        if (this.s != this.m[v]) {
            var d = {},
                a = 0,
                b = 0;
            for (; a < this.m[v];) {
                var c = this.m[a];
                if (!de(d, c)) {
                    this.m[b++] = c;
                    d[c] = 1
                }
                a++
            }
            ia(this.m, b)
        }
    };
    M.na = function(a, b) {
        if (de(this.j, a)) return this.j[a];
        return b
    };
    M.sa = function(a, b) {
        if (!de(this.j, a)) {
            this.s++;
            this.m[s](a);
            this.qc++
        }
        this.j[a] = b
    };
    M.sd = function(a) {
        var b, c;
        if (a instanceof ce) {
            b = a.Wa();
            c = a.ra()
        } else {
            b = tc(a);
            c = sc(a)
        }
        var d = 0;
        for (; d < b[v]; d++) this.sa(b[d], c[d])
    };
    M.qa = function() {
        return new ce(this)
    };
    M.Nb = function(a) {
        this.Bc();
        var b = 0,
            c = this.m,
            d = this.j,
            f = this.qc,
            g = this,
            h = new Wd;
        h.next = function() {
            for (; k;) {
                if (f != g.qc) l(m("The map has changed since the iterator was created"));
                if (b >= c[v]) l(Vd);
                var j = c[b++];
                return a ? j : d[j]
            }
        };
        return h
    };
    if (ba[w][Sa]) var de = function(a, b) {
        return ba[w][Sa][H](a, b)
    };
    else de = function(a, b) {
        return b in a && a[b] !== ba[w][b]
    };
    var ee = function(a) {
            this.j = new ce;
            a && this.sd(a)
        },
        fe = function(a) {
            var b = typeof a;
            return b == "object" ? "o" + Xb(a) : b[Kb](0, 1) + a
        };
    M = ee[w];
    M.la = function() {
        return this.j.la()
    };
    M.add = function(a) {
        this.j.sa(fe(a), a)
    };
    M.sd = function(a) {
        var b = Zd(a),
            c = b[v],
            d = 0;
        for (; d < c; d++) this.add(b[d])
    };
    M.ue = function(a) {
        var b = Zd(a),
            c = b[v],
            d = 0;
        for (; d < c; d++) this[fb](b[d])
    };
    na(M, function(a) {
        return this.j[fb](fe(a))
    });
    qa(M, function() {
        this.j[xb]()
    });
    M.Ja = function() {
        return this.j.Ja()
    };
    pa(M, function(a) {
        return this.j.Ea(fe(a))
    });
    M.ra = function() {
        return this.j.ra()
    };
    M.qa = function() {
        return new ee(this)
    };
    M.Nb = function() {
        return this.j.Nb(e)
    };
    var ge = function(a, b) {
            if (typeof a == "undefined") return "undefined";
            if (a == i) return "NULL";
            var c = [];
            for (var d in a)
                if (!(!b && Tb(a[d]))) {
                    var f = d + " = ";
                    try {
                        f += a[d]
                    } catch (g) {
                        f += "*** " + g + " ***"
                    }
                    c[s](f)
                } return c[Hb]("\n")
        },
        je = function(a, b) {
            try {
                var c = he(a);
                return "Message: " + Lc(c[Ra]) + '\nUrl: <a href="view-source:' + c.Md + '" target="_new">' + c.Md + "</a>\nLine: " + c.lineNumber + "\n\nBrowser stack:\n" + Lc(c.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + Lc(ie(b) + "-> ")
            } catch (d) {
                return "Exception trying to expose exception! You win, we lose. " +
                    d
            }
        },
        he = function(a) {
            var b = Ob("window.location.href");
            return typeof a == "string" ? {
                message: a,
                name: "Unknown error",
                lineNumber: "Not available",
                fileName: b,
                stack: "Not available"
            } : !a.lineNumber || !a.Md || !a.stack ? {
                message: a[Ra],
                name: a[Bb],
                lineNumber: a.lineNumber || a.zj || "Not available",
                fileName: a.Md || a.filename || a.sourceURL || b,
                stack: a.stack || "Not available"
            } : a
        },
        ie = function(a) {
            return ke(a || arguments.callee.caller, [])
        },
        ke = function(a, b) {
            var c = [];
            if (ic(b, a)) c[s]("[...circular reference...]");
            else if (a && b[v] < 50) {
                c[s](le(a) +
                    "(");
                var d = a.arguments,
                    f = 0;
                for (; f < d[v]; f++) {
                    f > 0 && c[s](", ");
                    var g, h = d[f];
                    switch (typeof h) {
                        case "object":
                            g = h ? "object" : "null";
                            break;
                        case "string":
                            g = h;
                            break;
                        case "number":
                            g = n(h);
                            break;
                        case "boolean":
                            g = h ? "true" : "false";
                            break;
                        case "function":
                            g = (g = le(h)) ? g : "[fn]";
                            break;
                        case "undefined":
                        default:
                            g = typeof h;
                            break
                    }
                    if (g[v] > 40) g = g[Kb](0, 40) + "...";
                    c[s](g)
                }
                b[s](a);
                c[s](")\n");
                try {
                    c[s](ke(a.caller, b))
                } catch (j) {
                    c[s]("[exception trying to get caller]\n")
                }
            } else a ? c[s]("[...long stack...]") : c[s]("[end]");
            return c[Hb]("")
        },
        le = function(a) {
            var b = n(a);
            if (!me[b]) {
                var c = /function ([^\(]+)/ [Aa](b);
                me[b] = c ? c[1] : "[Anonymous]"
            }
            return me[b]
        },
        me = {};
    var ne = function(a, b) {
        this.x = Mb(a) ? a : 0;
        this.y = Mb(b) ? b : 0
    };
    ne[w].qa = function() {
        return new ne(this.x, this.y)
    };
    ha(ne[w], function() {
        return "(" + this.x + ", " + this.y + ")"
    });
    var oe = function(a, b) {
            ja(this, a);
            sa(this, b)
        },
        pe = function(a, b) {
            if (a == b) return k;
            if (!a || !b) return e;
            return a[y] == b[y] && a[K] == b[K]
        };
    M = oe[w];
    M.qa = function() {
        return new oe(this[y], this[K])
    };
    ha(M, function() {
        return "(" + this[y] + " x " + this[K] + ")"
    });
    M.Rg = function() {
        return this[y] * this[K]
    };
    M.Ja = function() {
        return !this.Rg()
    };
    M.ceil = function() {
        ja(this, q[Ja](this[y]));
        sa(this, q[Ja](this[K]));
        return this
    };
    M.floor = function() {
        ja(this, q[La](this[y]));
        sa(this, q[La](this[K]));
        return this
    };
    var qe, re = function(a) {
            var b = a.className;
            return b && typeof b[A] == "function" ? b[A](" ") : []
        },
        se = function(a) {
            var b = re(a),
                c = 1,
                d = 1;
            for (; d < arguments[v]; d++)
                if (ic(b, arguments[d])) c &= 0;
                else {
                    b[s](arguments[d]);
                    c &= 1
                } a.className = b[Hb](" ");
            return da(c)
        },
        te = function(a) {
            var b = re(a),
                c = pc(arguments, 1),
                d = 0,
                f = 0;
            for (; f < b[v]; f++)
                if (ic(c, b[f])) {
                    qc(b, f--, 1);
                    d++
                } a.className = b[Hb](" ");
            return d == c[v]
        };
    var ue = function(a, b, c) {
            c ? se(a, b) : te(a, b)
        },
        ve = function(a, b) {
            var c = !ic(re(a), b);
            ue(a, b, c);
            return c
        };
    var ye = function(a) {
        return a ? new we(xe(a)) : qe || (qe = new we)
    };
    var ze = function(a) {
            return P(a) ? fa[Ma](a) : a
        },
        Ae = ze,
        Ce = function(a, b) {
            T(b, function(c, d) {
                if (d == "style") a[F].cssText = c;
                else if (d == "class") a.className = c;
                else if (d == "for") a.htmlFor = c;
                else if (d in Be) a.setAttribute(Be[d], c);
                else a[d] = c
            })
        },
        Be = {
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            colspan: "colSpan",
            rowspan: "rowSpan",
            valign: "vAlign",
            height: "height",
            width: "width",
            usemap: "useMap",
            frameborder: "frameBorder",
            type: "type"
        },
        De = function(a) {
            var b = a || N || window,
                c = b[Ia];
            if (bd && !(Pc(gd, "500") >= 0) && !cd) {
                if (typeof b[eb] ==
                    "undefined") b = window;
                var d = b[eb],
                    f = b[Ia][Jb].scrollHeight;
                if (b == b.top)
                    if (f < d) d -= 15;
                return new oe(b.innerWidth, d)
            }
            var g = ye(c).ae() && (!$c || $c && Pc(gd, "9.50") >= 0) ? c[Jb] : c[Ua];
            return new oe(g[Da], g[pb])
        },
        Ee = function(a) {
            return ye(a).Bh()
        },
        Fe = function(a, b) {
            a[ua](b)
        },
        Ge = function(a) {
            var b;
            for (; b = a[lb];) a[Wa](b)
        },
        He = function(a) {
            return a && a[Cb] ? a[Cb][Wa](a) : i
        };
    var Ie = bd && Pc(gd, "521") <= 0,
        Je = function(a, b) {
            if (typeof a[vb] != "undefined" && !Ie && b[Ha] == 1) return a == b || a[vb](b);
            if (typeof a.compareDocumentPosition != "undefined") return a == b || da(a.compareDocumentPosition(b) & 16);
            for (; b && a != b;) b = b[Cb];
            return b == a
        },
        xe = function(a) {
            return a[Ha] == 9 ? a : a.ownerDocument || a[Ia]
        },
        Ke = function(a) {
            var b;
            return b = bd ? a[Ia] || a[Eb][Ia] : a.contentDocument || a[Eb][Ia]
        },
        Le = function(a, b) {
            if ("textContent" in a) a.textContent = b;
            else if (a[lb] && a[lb][Ha] == 3) {
                for (; a[bb] != a[lb];) a[Wa](a[bb]);
                a[lb].data =
                    b
            } else {
                Ge(a);
                var c = xe(a);
                a[ua](c[Oa](b))
            }
        },
        Me = function(a) {
            if (a && typeof a[v] == "number")
                if (Ub(a)) return typeof a.item == "function" || typeof a.item == "string";
                else if (Tb(a)) return typeof a.item == "function";
            return e
        },
        we = function(a) {
            this.tb = a || N[Ia] || fa
        };
    M = we[w];
    M.c = function(a) {
        return P(a) ? this.tb[Ma](a) : a
    };
    M.pb = we[w].c;
    M.dd = Ce;
    M.We = function(a, b) {
        if (V && b && (b[Bb] || b[J])) {
            var c = ["<", a];
            b[Bb] && c[s](' name="', Lc(b[Bb]), '"');
            if (b[J]) {
                c[s](' type="', Lc(b[J]), '"');
                b = Yb(b);
                delete b[J]
            }
            c[s](">");
            a = c[Hb]("")
        }
        var d = this[jb](a);
        b && Ce(d, b);
        if (arguments[v] > 2) {
            function f(j) {
                if (j) this[ua](d, P(j) ? this[Oa](j) : j)
            }
            var g = 2;
            for (; g < arguments[v]; g++) {
                var h = arguments[g];
                Rb(h) && !(Ub(h) && h[Ha] > 0) ? S(Me(h) ? mc(h) : h, f, this) : f[H](this, h)
            }
        }
        return d
    };
    M.createElement = function(a) {
        return this.tb[jb](a)
    };
    M.createTextNode = function(a) {
        return this.tb[Oa](a)
    };
    M.ae = function() {
        var a = this.tb;
        if (a.compatMode) return a.compatMode == "CSS1Compat";
        if (bd) {
            var b = a[jb]("div");
            b[F].cssText = "position:absolute;width:0;height:0;width:1";
            return (a.compatMode = b[F][y] == "1px" ? "BackCompat" : "CSS1Compat") == "CSS1Compat"
        }
        return e
    };
    M.Bh = function() {
        var a = this.tb;
        if (a.parentWindow) return a.parentWindow;
        if (bd && !(Pc(gd, "500") >= 0) && !cd) {
            var b = a[jb]("script");
            b.innerHTML = "document.parentWindow=window";
            var c = a[Jb];
            c[ua](b);
            c[Wa](b);
            return a.parentWindow
        }
        return a[zb]
    };
    M.th = function() {
        var a = this.tb;
        return !bd && this.ae() ? a[Jb] : a[Ua]
    };
    M.kf = function() {
        var a = this.th();
        return new ne(a.scrollLeft, a.scrollTop)
    };
    M.appendChild = Fe;
    pa(M, Je);
    var Ne = function() {
            this.bg = ac()
        },
        Oe = new Ne;
    Ne[w].sa = function(a) {
        this.bg = a
    };
    Ne[w].na = function() {
        return this.bg
    };
    var Pe = function(a) {
        this.Li = a || "";
        this.dj = Oe
    };
    Pe[w].cj = k;
    Pe[w].bj = e;
    var Qe = function(a, b) {
        var c = (a.jj - b) / 1000,
            d = c.toFixed(3),
            f = 0;
        if (c < 1) f = 2;
        else
            for (; c < 100;) {
                f++;
                c *= 10
            }
        for (; f-- > 0;) d = " " + d;
        return d
    };
    var Se = function(a, b, c, d, f) {
        this.Cj = typeof f == "number" ? f : Re++;
        this.jj = d || ac();
        this.Bb = a;
        this.bi = b;
        this.Aj = c
    };
    Se[w].gf = i;
    Se[w].ff = i;
    var Re = 0;
    Se[w].Vi = function(a) {
        this.gf = a
    };
    Se[w].Wi = function(a) {
        this.ff = a
    };
    Se[w].Ce = function(a) {
        this.Bb = a
    };
    var Te = function(a) {
        this.ci = a;
        this.$c = i;
        this.$g = {};
        this.Wd = []
    };
    Te[w].Bb = i;
    var Ue = function(a, b) {
        this.name = a;
        ka(this, b)
    };
    ha(Ue[w], function() {
        return this[Bb]
    });
    var Ve = new Ue("OFF", Infinity),
        We = new Ue("SHOUT", 1200),
        Xe = new Ue("SEVERE", 1000),
        Ye = new Ue("WARNING", 900),
        Ze = new Ue("INFO", 800),
        $e = new Ue("CONFIG", 700),
        af = new Ue("FINE", 500),
        bf = new Ue("FINER", 400),
        cf = new Ue("FINEST", 300),
        df = new Ue("ALL", 0),
        ef = [Ve, We, Xe, Ye, Ze, $e, af, bf, cf, df];
    M = Te[w];
    M.Jg = function(a) {
        this.Wd[s](a)
    };
    M.Ce = function(a) {
        this.Bb = a
    };
    M.zb = function(a) {
        if (this.Bb) return a[Pa] >= this.Bb[Pa];
        if (this.$c) return this.$c.zb(a);
        return e
    };
    M.log = function(a, b, c) {
        this.zb(a) && this.Uh(this.wh(a, b, c))
    };
    M.wh = function(a, b, c) {
        var d = new Se(a, n(b), this.ci);
        if (c) {
            d.Vi(c);
            d.Wi(je(c, arguments.callee.caller))
        }
        return d
    };
    M.uj = function(a, b) {
        this.log(Ye, a, b)
    };
    M.wf = function(a, b) {
        this.log(Ze, a, b)
    };
    M.ta = function(a, b) {
        this.log(af, a, b)
    };
    M.Nd = function(a, b) {
        this.log(cf, a, b)
    };
    M.Uh = function(a) {
        if (this.zb(a.Bb)) {
            var b = this;
            for (; b;) {
                b.Wg(a);
                b = b.$c
            }
        }
    };
    M.Wg = function(a) {
        var b = 0;
        for (; b < this.Wd[v]; b++) this.Wd[b](a)
    };
    M.Zi = function(a) {
        this.$c = a
    };
    M.Ig = function(a, b) {
        this.$g[a] = b
    };
    var ff = {},
        gf = i,
        hf = function() {
            if (!gf) {
                gf = new Te("");
                ff[""] = gf;
                gf.Ce($e)
            }
        },
        kf = function(a) {
            hf();
            return a in ff ? ff[a] : jf(a)
        },
        jf = function(a) {
            var b = new Te(a),
                c = a[A]("."),
                d = c[c[v] - 1];
            ia(c, c[v] - 1);
            var f = c[Hb]("."),
                g = kf(f);
            g.Ig(d, b);
            b.Zi(g);
            return ff[a] = b
        };
    var lf = function(a) {
        if (typeof DOMParser != "undefined") return (new DOMParser).parseFromString(a, "application/xml");
        else {
            var b = new ActiveXObject("MSXML2.DOMDocument");
            b.loadXML(a);
            return b
        }
    };
    var mf = function(a) {
        this.eb = a
    };
    R(mf, bc);
    var nf = new zc(0, 100);
    M = mf[w];
    M.a = function(a, b, c, d, f) {
        if (O(b)) {
            var g = 0;
            for (; g < b[v]; g++) this.a(a, b[g], c, d, f)
        } else this.Ni(zd(a, b, c || this, d || e, f || this.eb || this));
        return this
    };
    M.Ni = function(a) {
        if (this.m) this.m[a] = k;
        else if (this.q) {
            this.m = nf.h();
            this.m[this.q] = k;
            this.q = i;
            this.m[a] = k
        } else this.q = a
    };
    M.va = function(a, b, c, d, f) {
        if (this.q || this.m)
            if (O(b)) {
                var g = 0;
                for (; g < b[v]; g++) this.va(a, b[g], c, d, f)
            } else {
                var h = Hd(a, b, c || this, d || e, f || this.eb || this);
                if (h) {
                    var j = h.pa;
                    Ed(j);
                    if (this.m) wc(this.m, j);
                    else if (this.q == j) this.q = i
                }
            } return this
    };
    M.ue = function() {
        if (this.m) {
            for (var a in this.m) {
                Ed(a);
                delete this.m[a]
            }
            nf.Aa(this.m);
            this.m = i
        } else this.q && Ed(this.q)
    };
    M.o = function() {
        mf.u.o[H](this);
        this.ue()
    };
    M.handleEvent = function() {
        l(m("EventHandler.handleEvent not implemented"))
    };
    var pf = function(a, b, c, d) {
        Od[H](this);
        if (a && !b) l(m("Can't use invisible history without providing a blank page."));
        var f;
        if (c) f = c;
        else {
            var g = "history_state" + of;
            fa[Va](Ac('<input type="text" name="%s" id="%s" style="display:none" />', g, g));
            f = ze(g)
        }
        this.Xb = f;
        this.ab = c ? Ee(xe(c)) : window;
        this.Sg = this.ab[Qa].href[A]("#")[0] + "#";
        this.Qc = b;
        if (V && !b) this.Qc = window[Qa].protocol == "https" ? "https:///" : 'javascript:""';
        this.v = new Qd(150);
        this.Lb = !a;
        this.wa = new mf(this);
        if (a || V) {
            var h;
            if (d) h = d;
            else {
                var j = "history_iframe" +
                    of,
                    p = this.Qc ? 'src="' + Lc(this.Qc) + '"' : "";
                fa[Va](Ac('<iframe id="%s" style="display:none" %s></iframe>', j, p));
                h = ze(j)
            }
            this.Rc = h;
            this.xg = k
        }
        if (V) {
            this.wa.a(this.ab, "load", this.ii);
            this.og = this.Jd = e
        }
        this.Lb ? this.Be(this.wb(), k) : this.Hb(this.Xb[Pa]);
        of ++
    };
    R(pf, Od);
    M = pf[w];
    M.Hc = e;
    M.Xc = e;
    M.dc = i;
    M.Cb = i;
    M.o = function() {
        pf.u.o[H](this);
        this.wa.aa();
        this.Gb(e)
    };
    M.Gb = function(a) {
        if (!(a == this.Hc))
            if (V && !this.Jd) this.og = a;
            else if (a) {
            if ($c) this.wa.a(this.ab[Ia], qf, this.Ii);
            else ad && this.wa.a(this.ab, "pageshow", this.Ai);
            if (!V || this.Jd) {
                this.wa.a(this.v, "tick", this.Xf);
                this.Hc = k;
                if (!V) this.dc = this.wb();
                this.v[hb]();
                this[E](new rf(this.wb()))
            }
        } else {
            this.Hc = e;
            this.wa.ue();
            this.v[va]()
        }
    };
    M.ii = function() {
        this.Jd = k;
        this.Xb[Pa] && this.Hb(this.Xb[Pa], k);
        this.Gb(this.og)
    };
    M.Ai = function(a) {
        if (a.ub.persisted) {
            this.Gb(e);
            this.Gb(k)
        }
    };
    M.wb = function() {
        return this.Cb !== i ? this.Cb : this.Lb ? this.Rd(this.ab) : this.Qd() || ""
    };
    M.$i = function(a, b) {
        this.Xi(a, e, b)
    };
    M.Rd = function(a) {
        var b = a[Qa].href,
            c = b[D]("#");
        return c < 0 ? "" : b[rb](c + 1)
    };
    M.Xi = function(a, b, c) {
        if (this.wb() != a)
            if (this.Lb) {
                this.Be(a, b);
                V && this.Hb(a, b, c);
                this.Hc && this.Xf()
            } else {
                this.Hb(a, b);
                this.Cb = this.dc = ka(this.Xb, a);
                this[E](new rf(a))
            }
    };
    M.Be = function(a, b) {
        var c = this.Sg + (a || ""),
            d = this.ab[Qa];
        if (c != d.href)
            if (b) d[z](c);
            else d.href = c
    };
    M.Hb = function(a, b, c) {
        if (!sf && (this.xg || a != this.Qd())) {
            this.xg = e;
            a = Ec(a);
            if (V) {
                var d = Ke(this.Rc);
                d.open("text/html", b ? "replace" : undefined);
                d[Va](Ac("<title>%s</title><body>%s</body>", Lc(c || this.ab[Ia].title), a));
                d.close()
            } else {
                var f = this.Qc + "#" + a,
                    g = this.Rc[Eb];
                if (g)
                    if (b) g[Qa][z](f);
                    else g[Qa].href = f
            }
        }
    };
    M.Qd = function() {
        if (V) {
            var a = Ke(this.Rc);
            return a[Ua] ? Fc(a[Ua].innerHTML) : i
        } else if (sf) return i;
        else {
            var b = this.Rc[Eb];
            if (b) {
                var c;
                try {
                    c = Fc(this.Rd(b))
                } catch (d) {
                    this.Xc || this.jg(k);
                    return i
                }
                this.Xc && this.jg(e);
                return c || i
            } else return i
        }
    };
    M.Xf = function() {
        if (this.Lb) {
            var a = this.Rd(this.ab);
            a != this.dc && this.Ag(a)
        }
        if (!this.Lb || V) {
            var b = this.Qd() || "";
            if (this.Cb == i || b == this.Cb) {
                this.Cb = i;
                b != this.dc && this.Ag(b)
            }
        }
    };
    M.Ag = function(a) {
        this.dc = ka(this.Xb, a);
        if (this.Lb) {
            V && this.Hb(a);
            this.Be(a)
        } else this.Hb(a);
        this[E](new rf(this.wb()))
    };
    M.jg = function(a) {
        if (this.Xc != a) this.v.setInterval(a ? 10000 : 150);
        this.Xc = a
    };
    M.Ii = function() {
        this.v[va]();
        this.v[hb]()
    };
    var sf = bd && Pc(gd, "419") <= 0,
        qf = [Id, "keydown", "mousemove"],
        of = 0,
        rf = function(a) {
            hd[H](this, "navigate");
            this.mc = a
        };
    R(rf, hd);
    var tf = "complete";
    var uf = function(a) {
            if (/^\s*$/ [za](a)) return e;
            return /^[\],:{}\s\u2028\u2029]*$/ [za](a[z](/\\["\\\/bfnrtu]/g, "@")[z](/"[^"\\\n\r\u2028\u2029\x00-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")[z](/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
        },
        vf = function(a) {
            n(a);
            if (uf(a)) try {
                return eval("(" + a + ")")
            } catch (b) {}
            l(m("Invalid JSON string: " + a))
        },
        wf = function() {};
    wf[w].fg = function(a) {
        var b = [];
        this.ye(a, b);
        return b[Hb]("")
    };
    wf[w].ye = function(a, b) {
        switch (typeof a) {
            case "string":
                this.gg(a, b);
                break;
            case "number":
                this.Ri(a, b);
                break;
            case "boolean":
                b[s](a);
                break;
            case "undefined":
                b[s]("null");
                break;
            case "object":
                if (a == i) {
                    b[s]("null");
                    break
                }
                if (O(a)) {
                    this.Qi(a, b);
                    break
                }
                this.Si(a, b);
                break;
            case "function":
                break;
            default:
                l(m("Unknown type: " + typeof a))
        }
    };
    var xf = {
            '"': '\\"',
            "\\": "\\\\",
            "/": "\\/",
            "\u0008": "\\b",
            "\u000c": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\u000b": "\\u000b"
        },
        yf = /\uffff/ [za]("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
    wf[w].gg = function(a, b) {
        b[s]('"', a[z](yf, function(c) {
            if (c in xf) return xf[c];
            var d = c[qb](0),
                f = "\\u";
            if (d < 16) f += "000";
            else if (d < 256) f += "00";
            else if (d < 4096) f += "0";
            return xf[c] = f + d[u](16)
        }), '"')
    };
    wf[w].Ri = function(a, b) {
        b[s](isFinite(a) && !isNaN(a) ? a : "null")
    };
    wf[w].Qi = function(a, b) {
        var c = a[v];
        b[s]("[");
        var d = "",
            f = 0;
        for (; f < c; f++) {
            b[s](d);
            this.ye(a[f], b);
            d = ","
        }
        b[s]("]")
    };
    wf[w].Si = function(a, b) {
        b[s]("{");
        var c = "";
        for (var d in a)
            if (a[Sa](d)) {
                var f = a[d];
                if (typeof f != "function") {
                    b[s](c);
                    this.gg(d, b);
                    b[s](":");
                    this.ye(f, b);
                    c = ","
                }
            } b[s]("}")
    };
    var zf = function() {
        if (!!ad) {
            this.bb = {};
            this.qd = {};
            this.hd = []
        }
    };
    M = zf[w];
    M.ja = kf("goog.net.xhrMonitor");
    M.ag = function(a) {
        if (!!ad) {
            var b = P(a) ? a : Ub(a) ? Xb(a) : "";
            this.ja.Nd("Pushing context: " + a + " (" + b + ")");
            this.hd[s](b)
        }
    };
    M.Yf = function() {
        if (!!ad) {
            var a = this.hd.pop();
            this.ja.Nd("Popping context: " + a);
            this.mj(a)
        }
    };
    M.Wh = function(a) {
        if (!!ad) {
            var b = Xb(a);
            this.ja.ta("Opening XHR : " + b);
            var c = 0;
            for (; c < this.hd[v]; c++) {
                var d = this.hd[c];
                this.uc(this.bb, d, b);
                this.uc(this.qd, b, d)
            }
        }
    };
    M.Vh = function(a) {
        if (!!ad) {
            var b = Xb(a);
            this.ja.ta("Closing XHR : " + b);
            delete this.qd[b];
            for (var c in this.bb) {
                lc(this.bb[c], b);
                this.bb[c][v] == 0 && delete this.bb[c]
            }
        }
    };
    M.mj = function(a) {
        var b = this.qd[a],
            c = this.bb[a];
        if (b && c) {
            this.ja.Nd("Updating dependent contexts");
            S(b, function(d) {
                S(c, function(f) {
                    this.uc(this.bb, d, f);
                    this.uc(this.qd, f, d)
                }, this)
            }, this)
        }
    };
    M.uc = function(a, b, c) {
        a[b] || (a[b] = []);
        ic(a[b], c) || a[b][s](c)
    };
    var Af = new zf;
    var Cf = function() {
        return Bf()
    };
    var Bf = i,
        Df = i,
        Ef = i;
    (function(a, b) {
        Bf = a;
        Df = b;
        Ef = i
    })(function() {
        var a = Ff();
        return a ? new ActiveXObject(a) : new XMLHttpRequest
    }, function() {
        var a = {};
        if (Ff()) {
            a[0] = k;
            a[1] = k
        }
        return a
    });
    var Gf = i,
        Ff = function() {
            if (!Gf && typeof XMLHttpRequest == "undefined" && typeof ActiveXObject != "undefined") {
                var a = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"],
                    b = 0;
                for (; b < a[v]; b++) {
                    var c = a[b];
                    try {
                        new ActiveXObject(c);
                        return Gf = c
                    } catch (d) {}
                }
                l(m("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed"))
            }
            return Gf
        };
    var Hf = function() {
        Od[H](this);
        this.headers = new ce
    };
    R(Hf, Od);
    M = Hf[w];
    M.ja = kf("goog.net.XhrIo");
    M.ka = e;
    M.r = i;
    M.pd = i;
    M.fe = "";
    M.Af = "";
    M.Ab = 0;
    M.cc = "";
    M.Ld = e;
    M.Sc = e;
    M.$d = e;
    M.gb = e;
    M.$a = 0;
    M.nb = i;
    M.mg = function(a) {
        this.$a = q.max(0, a)
    };
    M.send = function(a, b, c, d) {
        if (this.ka) l(m("[goog.net.XhrIo] Object is active with another request"));
        var f = b || "GET";
        this.fe = a;
        this.cc = "";
        this.Ab = 0;
        this.Af = f;
        this.Ld = e;
        this.ka = k;
        this.r = new Cf;
        this.pd = Ef || (Ef = Df());
        Af.Wh(this.r);
        this.r.onreadystatechange = Zb(this.Of, this);
        try {
            this.ja.ta(this.La("Opening Xhr"));
            this.$d = k;
            this.r.open(f, a, k);
            this.$d = e
        } catch (g) {
            this.ja.ta(this.La("Error opening Xhr: " + g[Ra]));
            this.Jc(5, g);
            return
        }
        var h = c ? n(c) : "",
            j = this.headers.qa();
        d && be(d, function(p, r) {
            j.sa(r, p)
        });
        f == "POST" &&
            !j.Ea("Content-Type") && j.sa("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        be(j, function(p, r) {
            this.r.setRequestHeader(r, p)
        }, this);
        try {
            if (this.nb) {
                Pd[Ba](this.nb);
                this.nb = i
            }
            if (this.$a > 0) {
                this.ja.ta(this.La("Will abort after " + this.$a + "ms if incomplete"));
                this.nb = Pd[Ga](Zb(this.jd, this), this.$a)
            }
            this.ja.ta(this.La("Sending request"));
            this.Sc = k;
            this.r[db](h);
            this.Sc = e
        } catch (g) {
            this.ja.ta(this.La("Send error: " + g[Ra]));
            this.Jc(5, g)
        }
    };
    M.dispatchEvent = function(a) {
        if (this.r) {
            Af.ag(this.r);
            try {
                Hf.u[E][H](this, a)
            } finally {
                Af.Yf()
            }
        } else Hf.u[E][H](this, a)
    };
    M.jd = function() {
        if (!(typeof Lb == "undefined"))
            if (this.r) {
                this.cc = "Timed out after " + this.$a + "ms, aborting";
                this.Ab = 8;
                this.ja.ta(this.La(this.cc));
                this[E]("timeout");
                this[Ea](8)
            }
    };
    M.Jc = function(a, b) {
        this.ka = e;
        if (this.r) {
            this.gb = k;
            this.r[Ea]();
            this.gb = e
        }
        this.cc = b;
        this.Ab = a;
        this.df();
        this.Ac()
    };
    M.df = function() {
        if (!this.Ld) {
            this.Ld = k;
            this[E](tf);
            this[E]("error")
        }
    };
    M.abort = function(a) {
        if (this.r) {
            this.ja.ta(this.La("Aborting"));
            this.ka = e;
            this.gb = k;
            this.r[Ea]();
            this.gb = e;
            this.Ab = a || 7;
            this[E](tf);
            this[E]("abort");
            this.Ac()
        }
    };
    M.o = function() {
        if (this.r) {
            this.ka = e;
            this.gb = k;
            this.r[Ea]();
            this.gb = e;
            this.Ac(k)
        }
        Hf.u.o[H](this)
    };
    M.Of = function() {
        !this.$d && !this.Sc && !this.gb ? this.xi() : this.Nf()
    };
    M.xi = function() {
        this.Nf()
    };
    M.Nf = function() {
        if (!!this.ka)
            if (!(typeof Lb == "undefined"))
                if (this.pd[1] && this.Ub() == 4 && this.Oc() == 2) this.ja.ta(this.La("Local request error detected and ignored"));
                else if (this.Sc && this.Ub() == 4) Pd[Ga](Zb(this.Of, this), 0);
        else {
            this[E]("readystatechange");
            if (this.Oh()) {
                this.ja.ta(this.La("Request complete"));
                this.ka = e;
                if (this.Vc()) {
                    this[E](tf);
                    this[E]("success")
                } else {
                    this.Ab = 6;
                    this.cc = this.Ah() + " [" + this.Oc() + "]";
                    this.df()
                }
                this.Ac()
            }
        }
    };
    M.Ac = function(a) {
        if (this.r) {
            this.r.onreadystatechange = this.pd[0] ? Pb : i;
            var b = this.r;
            this.pd = this.r = i;
            if (this.nb) {
                Pd[Ba](this.nb);
                this.nb = i
            }
            if (!a) {
                Af.ag(b);
                this[E]("ready");
                Af.Yf()
            }
            Af.Vh(b)
        }
    };
    M.Uc = function() {
        return this.ka
    };
    M.Oh = function() {
        return this.Ub() == 4
    };
    M.Vc = function() {
        switch (this.Oc()) {
            case 0:
            case 200:
            case 204:
            case 304:
                return k;
            default:
                return e
        }
    };
    M.Ub = function() {
        return this.r ? this.r.readyState : 0
    };
    M.Oc = function() {
        try {
            return this.Ub() > 2 ? this.r.status : -1
        } catch (a) {
            this.ja.uj("Can not get status: " + a[Ra]);
            return -1
        }
    };
    M.Ah = function() {
        try {
            return this.Ub() > 2 ? this.r.statusText : ""
        } catch (a) {
            this.ja.ta("Can not get status: " + a[Ra]);
            return ""
        }
    };
    M.Td = function() {
        return this.r ? this.r.responseText : ""
    };
    M.nf = function() {
        return this.r ? vf(this.r.responseText) : undefined
    };
    M.La = function(a) {
        return a + " [" + this.Af + " " + this.fe + " " + this.Oc() + "]"
    };
    var If = function() {
        this.Sa = []
    };
    M = If[w];
    M.Na = 0;
    M.mb = 0;
    M.Ic = function(a) {
        this.Sa[this.mb++] = a
    };
    M.sb = function() {
        if (this.Na == this.mb) return undefined;
        var a = this.Sa[this.Na];
        delete this.Sa[this.Na];
        this.Na++;
        return a
    };
    M.la = function() {
        return this.mb - this.Na
    };
    M.Ja = function() {
        return this.mb - this.Na == 0
    };
    qa(M, function() {
        this.Sa = [];
        this.mb = this.Na = 0
    });
    pa(M, function(a) {
        return ae(this.Sa, a)
    });
    na(M, function(a) {
        var b = cc(this.Sa, a);
        if (b < 0) return e;
        if (b == this.Na) this.sb();
        else {
            o[w][Fb][H](this.Sa, b, 1)[v] == 1;
            this.mb--
        }
        return k
    });
    M.ra = function() {
        var a = [],
            b = this.Na;
        for (; b < this.mb; b++) a[s](this.Sa[b]);
        return a
    };
    var Jf = function(a, b) {
        bc[H](this);
        this.Ef = a || 0;
        this.ib = b || 10;
        if (this.Ef > this.ib) l(m("[goog.structs.Pool] Min can not be greater than max"));
        this.ha = new If;
        this.Ia = new ee;
        this.wc()
    };
    R(Jf, bc);
    M = Jf[w];
    M.h = function() {
        var a = this.Oi();
        a && this.Ia.add(a);
        return a
    };
    M.Aa = function(a) {
        if (this.Ia[fb](a)) {
            this.td(a);
            return k
        }
        return e
    };
    M.Oi = function() {
        var a;
        for (; this.lf() > 0;) {
            a = this.ha.sb();
            if (this.le(a)) break;
            else this.wc()
        }
        if (!a && this.la() < this.ib) a = this.qb();
        return a
    };
    M.td = function(a) {
        this.Ia[fb](a);
        this.le(a) && this.la() < this.ib ? this.ha.Ic(a) : this.Ra(a)
    };
    M.wc = function() {
        var a = this.ha;
        for (; this.la() < this.Ef;) a.Ic(this.qb());
        for (; this.la() > this.ib && this.lf() > 0;) this.Ra(a.sb())
    };
    M.qb = function() {
        return {}
    };
    M.Ra = function(a) {
        if (typeof a.aa == "function") a.aa();
        else
            for (var b in a) a[b] = i
    };
    M.le = function(a) {
        if (typeof a.Xg == "function") return a.Xg();
        return k
    };
    pa(M, function(a) {
        return this.ha[vb](a) || this.Ia[vb](a)
    });
    M.la = function() {
        return this.ha.la() + this.Ia.la()
    };
    M.uh = function() {
        return this.Ia.la()
    };
    M.lf = function() {
        return this.ha.la()
    };
    M.Ja = function() {
        return this.ha.Ja() && this.Ia.Ja()
    };
    M.o = function() {
        Jf.u.o[H](this);
        if (this.uh() > 0) l(m("[goog.structs.Pool] Objects not released"));
        Yd(this.Ia, this.Ra, this);
        this.Ia[xb]();
        delete this.Ia;
        var a = this.ha;
        for (; !a.Ja();) this.Ra(a.sb());
        delete this.ha
    };
    var Kf = function(a, b) {
        this.q = a;
        this.Ka = b
    };
    Kf[w].qa = function() {
        return new Kf(this.q, this.Ka)
    };
    var Lf = function(a) {
        this.ua = [];
        a && this.Nh(a)
    };
    M = Lf[w];
    M.xf = function(a, b) {
        var c = new Kf(a, b),
            d = this.ua;
        d[s](c);
        this.ai(d[v] - 1)
    };
    M.Nh = function(a) {
        var b, c;
        if (a instanceof Lf) {
            b = a.Wa();
            c = a.ra();
            if (a.la() <= 0) {
                var d = this.ua,
                    f = 0;
                for (; f < b[v]; f++) d[s](new Kf(b[f], c[f]));
                return
            }
        } else {
            b = tc(a);
            c = sc(a)
        }
        var f = 0;
        for (; f < b[v]; f++) this.xf(b[f], c[f])
    };
    na(M, function() {
        var a = this.ua,
            b = a[v],
            c = a[0];
        if (b <= 0) return undefined;
        else if (b == 1) jc(a);
        else {
            a[0] = a.pop();
            this.$h(0)
        }
        return c.Ka
    });
    M.$h = function(a) {
        var b = this.ua,
            c = b[v],
            d = b[a];
        for (; a < q[La](c / 2);) {
            var f = this.vh(a),
                g = this.zh(a),
                h = g < c && b[g].q < b[f].q ? g : f;
            if (b[h].q > d.q) break;
            b[a] = b[h];
            a = h
        }
        b[a] = d
    };
    M.ai = function(a) {
        var b = this.ua,
            c = b[a];
        for (; a > 0;) {
            var d = this.yh(a);
            if (b[d].q > c.q) {
                b[a] = b[d];
                a = d
            } else break
        }
        b[a] = c
    };
    M.vh = function(a) {
        return a * 2 + 1
    };
    M.zh = function(a) {
        return a * 2 + 2
    };
    M.yh = function(a) {
        return q[La]((a - 1) / 2)
    };
    M.ra = function() {
        var a = this.ua,
            b = [],
            c = a[v],
            d = 0;
        for (; d < c; d++) b[s](a[d].Ka);
        return b
    };
    M.Wa = function() {
        var a = this.ua,
            b = [],
            c = a[v],
            d = 0;
        for (; d < c; d++) b[s](a[d].q);
        return b
    };
    M.Cc = function(a) {
        return gc(this.ua, function(b) {
            return b.Ka == a
        })
    };
    M.Ea = function(a) {
        return gc(this.ua, function(b) {
            return b.q == a
        })
    };
    M.qa = function() {
        return new Lf(this)
    };
    M.la = function() {
        return this.ua[v]
    };
    M.Ja = function() {
        return this.ua[v] == 0
    };
    qa(M, function() {
        jc(this.ua)
    });
    var Mf = function() {
        Lf[H](this)
    };
    R(Mf, Lf);
    Mf[w].Ic = function(a, b) {
        this.xf(a, b)
    };
    Mf[w].sb = function() {
        return this[fb]()
    };
    var Nf = function(a, b) {
        this.bd = new Mf;
        Jf[H](this, a, b)
    };
    R(Nf, Jf);
    M = Nf[w];
    M.h = function(a, b) {
        if (!a) return Nf.u.h[H](this);
        this.bd.Ic(b || 100, a);
        this.Vd();
        return undefined
    };
    M.Vd = function() {
        var a = this.bd;
        for (; a.la() > 0;) {
            var b = this.h();
            if (b) a.sb()[wb](this, [b]);
            else return
        }
    };
    M.td = function(a) {
        Nf.u.td[H](this, a);
        this.Vd()
    };
    M.wc = function() {
        Nf.u.wc[H](this);
        this.Vd()
    };
    M.o = function() {
        Nf.u.o[H](this);
        this.bd[xb]();
        this.bd = i
    };
    var Of = function(a, b, c) {
        Nf[H](this, b, c);
        this.Yd = a
    };
    R(Of, Nf);
    Of[w].qb = function() {
        var a = new Hf,
            b = this.Yd;
        b && be(b, function(c, d) {
            a.headers.sa(d, c)
        });
        return a
    };
    Of[w].Ra = function(a) {
        a.aa()
    };
    Of[w].le = function(a) {
        return !a.yf() && !a.Uc()
    };
    var Pf = function(a, b, c, d, f) {
        this.je = Mb(a) ? a : 1;
        this.$a = Mb(f) ? q.max(0, f) : 0;
        this.Mb = new Of(b, c, d);
        this.Ba = new ce;
        this.wa = new mf(this)
    };
    R(Pf, Od);
    var Qf = ["ready", tf, "success", "error", "abort", "timeout"];
    M = Pf[w];
    M.mg = function(a) {
        this.$a = q.max(0, a)
    };
    M.send = function(a, b, c, d, f, g, h, j) {
        if (this.Ba.na(a)) l(m("[goog.net.XhrManager] ID in use"));
        var p = new Rf(b, Zb(this.Hh, this, a), c, d, f, h, Mb(j) ? j : this.je);
        this.Ba.sa(a, p);
        this.Mb.h(Zb(this.Dh, this, a), g)
    };
    M.abort = function(a, b) {
        var c = this.Ba.na(a);
        if (c) {
            var d = c.rc;
            c.Ti(k);
            if (b) {
                this.cg(d, c.od);
                Bd(d, "ready", function() {
                    this.Mb.Aa(d)
                }, e, this);
                this.Ba[fb](a)
            }
            d && d[Ea]()
        }
    };
    M.Dh = function(a, b) {
        var c = this.Ba.na(a);
        if (c && !c.rc) {
            this.Lg(b, c.od);
            b.mg(this.$a);
            c.rc = c.Bg = b;
            this[E](new Sf("ready", this, a, b));
            this.eg(a, b);
            c.Le && b[Ea]()
        } else this.Mb.Aa(b)
    };
    M.Hh = function(a, b) {
        var c = b[Za];
        switch (b[J]) {
            case "ready":
                this.eg(a, c);
                break;
            case tf:
                return this.Eh(a, c, b);
            case "success":
                this.Kh(a, c);
                break;
            case "timeout":
            case "error":
                this.Gh(a, c);
                break;
            case "abort":
                this.Ch(a, c);
                break
        }
        return i
    };
    M.eg = function(a, b) {
        var c = this.Ba.na(a);
        if (c && !c.Ue && !c.Xd()) {
            c.Mh();
            b[db](c.Je, c.Zh, c.dh, c.Yd)
        } else {
            if (c) {
                this.cg(b, c.od);
                this.Ba[fb](a)
            }
            this.Mb.Aa(b)
        }
    };
    M.Eh = function(a, b, c) {
        var d = this.Ba.na(a);
        if (b.Ab == 7 || b.Vc() || d.Xd()) {
            this[E](new Sf(tf, this, a, b));
            if (d) {
                d.Ui(k);
                if (d.Cd) return d.Cd[H](b, c)
            }
        }
        return i
    };
    M.Ch = function(a, b) {
        this[E](new Sf("abort", this, a, b))
    };
    M.Kh = function(a, b) {
        this[E](new Sf("success", this, a, b))
    };
    M.Gh = function(a, b) {
        this.Ba.na(a).Xd() && this[E](new Sf("error", this, a, b))
    };
    M.cg = function(a, b, c) {
        this.wa.va(a, c || Qf, b)
    };
    M.Lg = function(a, b, c) {
        this.wa.a(a, c || Qf, b)
    };
    M.o = function() {
        Pf.u.o[H](this);
        this.Mb.aa();
        this.Mb = i;
        this.wa.aa();
        this.wa = i;
        var a = this.Ba;
        be(a, function(b) {
            b.aa()
        });
        a[xb]();
        this.Ba = i
    };
    var Sf = function(a, b, c, d) {
        hd[H](this, a, b);
        this.id = c;
        this.Bg = this.rc = d
    };
    R(Sf, hd);
    Sf[w].o = function() {
        Sf.u.o[H](this);
        delete this.id;
        this.Bg = this.rc = i
    };
    var Rf = function(a, b, c, d, f, g, h) {
        this.Je = a;
        this.Zh = c || "GET";
        this.dh = d;
        this.Yd = f || i;
        this.je = Mb(h) ? h : 1;
        this.Pe = 0;
        this.Le = this.Ue = e;
        this.od = b;
        this.Cd = g;
        this.rc = i
    };
    R(Rf, bc);
    M = Rf[w];
    M.Mh = function() {
        this.Pe++
    };
    M.Xd = function() {
        return this.Pe > this.je
    };
    M.Ui = function(a) {
        this.Ue = a
    };
    M.Ti = function(a) {
        this.Le = a
    };
    M.o = function() {
        Rf.u.o[H](this);
        delete this.od;
        delete this.Cd
    };
    var Tf, Uf, Vf, Wf, Xf, Yf;
    (function() {
        Yf = Xf = Wf = Vf = Uf = Tf = e;
        var a = Zc();
        if (!!a)
            if (a[D]("Firefox") != -1) Tf = k;
            else if (a[D]("Camino") != -1) Uf = k;
        else if (a[D]("iPhone") != -1 || a[D]("iPod") != -1) Vf = k;
        else if (a[D]("Android") != -1) Wf = k;
        else if (a[D]("Chrome") != -1) Xf = k;
        else if (a[D]("Safari") != -1) Yf = k
    })();
    var Zf = Uf;
    var $f, bg = function(a, b, c) {
            P(b) ? ag(a, c, b) : T(b, $b(ag, a))
        },
        ag = function(a, b, c) {
            a[F][cg(c)] = b
        },
        dg = function(a, b) {
            var c = xe(a);
            if (c[zb] && c[zb].getComputedStyle) {
                var d = c[zb].getComputedStyle(a, "");
                if (d) return d[b]
            }
            return i
        };
    var eg = function(a, b) {
        return dg(a, b) || (a.currentStyle ? a.currentStyle[b] : i) || a[F][b]
    };
    var fg = function(a, b, c) {
        var d, f;
        if (b instanceof ne) {
            d = b.x;
            f = b.y
        } else {
            d = b;
            f = c
        }
        a[F].left = typeof d == "number" ? d + "px" : d;
        a[F].top = typeof f == "number" ? f + "px" : f
    };
    var gg = function(a) {
            var b;
            b = a ? a[Ha] == 9 ? a : xe(a) : fa;
            if (V && !ye(b).ae()) return b[Ua];
            return b[Jb]
        },
        hg = function(a) {
            var b = a[wa]();
            if (V) {
                var c = a.ownerDocument;
                b.left -= c[Jb].clientLeft + c[Ua].clientLeft;
                b.top -= c[Jb].clientTop + c[Ua].clientTop
            }
            return b
        },
        ig = function(a) {
            if (V) return a.offsetParent;
            var b = xe(a),
                c = eg(a, "position"),
                d = c == "fixed" || c == "absolute",
                f = a[Cb];
            for (; f && f != b; f = f[Cb]) {
                c = eg(f, "position");
                d = d && c == "static" && f != b[Jb] && f != b[Ua];
                if (!d && (f.scrollWidth > f[Da] || f.scrollHeight > f[pb] || c == "fixed" || c == "absolute")) return f
            }
            return i
        },
        jg = function(a) {
            var b, c = xe(a),
                d = eg(a, "position"),
                f = ad && c[cb] && !a[wa] && d == "absolute" && (b = c[cb](a)) && (b[$a] < 0 || b[ab] < 0);
            if (typeof $f == "undefined") $f = Zf && !(Pc(gd, "1.8.0.11") >= 0);
            var g = new ne(0, 0),
                h = gg(c);
            if (a == h) return g;
            if (a[wa]) {
                b = hg(a);
                var j = ye(c).kf();
                g.x = b.left + j.x;
                g.y = b.top + j.y
            } else if (c[cb] && !f && !$f) {
                b = c[cb](a);
                var p = c[cb](h);
                g.x = b[$a] - p[$a];
                g.y = b[ab] - p[ab]
            } else {
                var r = a;
                do {
                    g.x += r.offsetLeft;
                    g.y += r[Db];
                    if (r != a) {
                        g.x += r.clientLeft || 0;
                        g.y += r.clientTop || 0
                    }
                    if (bd && eg(r, "position") == "fixed") {
                        g.x += c[Ua].scrollLeft;
                        g.y += c[Ua].scrollTop;
                        break
                    }
                    r = r.offsetParent
                } while (r && r != a);
                if ($c || bd && d == "absolute") g.y -= c[Ua][Db];
                r = a;
                for (;
                    (r = ig(r)) && r != c[Ua];) {
                    g.x -= r.scrollLeft;
                    if (!$c || r.tagName != "TR") g.y -= r.scrollTop
                }
            }
            return g
        },
        kg = function(a) {
            var b = new ne;
            if (a[Ha] == 1)
                if (a[wa]) {
                    var c = hg(a);
                    b.x = c.left;
                    b.y = c.top
                } else {
                    var d = ye(a).kf(),
                        f = jg(a);
                    b.x = f.x - d.x;
                    b.y = f.y - d.y
                }
            else {
                b.x = a.clientX;
                b.y = a.clientY
            }
            return b
        },
        lg = function(a) {
            if (eg(a, "display") != "none") return $c ? new oe(a[Na] || a[Da], a[Gb] || a[pb]) : new oe(a[Na], a[Gb]);
            var b = a[F],
                c = b.display,
                d = b.visibility,
                f = b.position;
            b.visibility = "hidden";
            b.position = "absolute";
            b.display = "inline";
            var g, h;
            if ($c) {
                g = a[Na] || a[Da];
                h = a[Gb] || a[pb]
            } else {
                g = a[Na];
                h = a[Gb]
            }
            b.display = c;
            b.position = f;
            b.visibility = d;
            return new oe(g, h)
        },
        mg = {},
        cg = function(a) {
            return mg[a] || (mg[a] = n(a)[z](/\-([a-z])/g, function(b, c) {
                return c.toUpperCase()
            }))
        },
        ng = function(a, b) {
            a[F].display = b ? "" : "none"
        };
    var og = /^(?:([^:\/?#]+):)?(?:\/\/(?:([^\/?#]*)@)?([^\/?#:@]*)(?::([0-9]+))?)?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/,
        pg = function(a) {
            return a.match(og)
        };
    var qg = function(a, b) {
        var c;
        if (a instanceof qg) {
            this.Ib(b == i ? a.Ha : b);
            this.Fe(a.Za);
            this.Ge(a.pc);
            this.ze(a.Rb);
            this.Ee(a.Eb);
            this.De(a.jc);
            this.ed(a.za.qa());
            this.Ae(a.Sb)
        } else if (a && (c = pg(n(a)))) {
            this.Ib(!!b);
            this.Fe(c[1], k);
            this.Ge(c[2], k);
            this.ze(c[3], k);
            this.Ee(c[4]);
            this.De(c[5], k);
            this.ed(c[6]);
            this.Ae(c[7], k)
        } else {
            this.Ib(!!b);
            this.za = new rg(i, this, this.Ha)
        }
    };
    M = qg[w];
    M.Za = "";
    M.pc = "";
    M.Rb = "";
    M.Eb = i;
    M.jc = "";
    M.Sb = "";
    M.Ph = e;
    M.Ha = e;
    ha(M, function() {
        if (this.ma) return this.ma;
        var a = [];
        this.Za && a[s](sg(this.Za, tg), ":");
        if (this.Rb) {
            a[s]("//");
            this.pc && a[s](sg(this.pc, tg), "@");
            a[s](ug(this.Rb));
            this.Eb != i && a[s](":", n(this.Eb))
        }
        this.jc && a[s](sg(this.jc, vg));
        var b = n(this.za);
        b && a[s]("?", b);
        this.Sb && a[s]("#", sg(this.Sb, wg));
        return this.ma = a[Hb]("")
    });
    M.qa = function() {
        return xg(this.Za, this.pc, this.Rb, this.Eb, this.jc, this.za.qa(), this.Sb, this.Ha)
    };
    M.Fe = function(a, b) {
        this.Ta();
        delete this.ma;
        if (this.Za = b ? a ? ga(a) : "" : a) this.Za = this.Za[z](/:$/, "");
        return this
    };
    M.Ge = function(a, b) {
        this.Ta();
        delete this.ma;
        this.pc = b ? a ? ga(a) : "" : a;
        return this
    };
    M.ze = function(a, b) {
        this.Ta();
        delete this.ma;
        this.Rb = b ? a ? ga(a) : "" : a;
        return this
    };
    M.Ee = function(a) {
        this.Ta();
        delete this.ma;
        if (a) {
            a = Number(a);
            if (isNaN(a) || a < 0) l(m("Bad port number " + a));
            this.Eb = a
        } else this.Eb = i;
        return this
    };
    M.De = function(a, b) {
        this.Ta();
        delete this.ma;
        this.jc = b ? a ? ga(a) : "" : a;
        return this
    };
    M.ed = function(a) {
        this.Ta();
        delete this.ma;
        if (a instanceof rg) {
            this.za = a;
            this.za.Kb = this;
            this.za.Ib(this.Ha)
        } else this.za = new rg(a, this, this.Ha);
        return this
    };
    M.Yi = function(a, b) {
        this.Ta();
        delete this.ma;
        this.za.sa(a, b);
        return this
    };
    M.Ae = function(a, b) {
        this.Ta();
        delete this.ma;
        this.Sb = b ? a ? ga(a) : "" : a;
        return this
    };
    M.Ta = function() {
        if (this.Ph) l(m("Tried to modify a read-only Uri"))
    };
    M.Ib = function(a) {
        this.Ha = a;
        this.za && this.za.Ib(a)
    };
    var xg = function(a, b, c, d, f, g, h, j) {
        var p = new qg(i, j);
        a && p.Fe(a);
        b && p.Ge(b);
        c && p.ze(c);
        d && p.Ee(d);
        f && p.De(f);
        g && p.ed(g);
        h && p.Ae(h);
        return p
    };
    var ug = function(a) {
            if (P(a)) return aa(a);
            return i
        },
        yg = /^[a-zA-Z0-9\-_.!~*'():\/;?]*$/,
        sg = function(a, b) {
            var c = i;
            if (P(a)) {
                c = a;
                yg[za](c) || (c = encodeURI(a));
                if (c.search(b) >= 0) c = c[z](b, zg)
            }
            return c
        },
        zg = function(a) {
            var b = a[qb](0);
            return "%" + (b >> 4 & 15)[u](16) + (b & 15)[u](16)
        },
        tg = /[#\/\?@]/g,
        vg = /[\#\?]/g,
        wg = /#/g,
        rg = function(a, b, c) {
            this.ba = new ce;
            this.Kb = b || i;
            this.Ha = !!c;
            if (a) {
                var d = a[A]("&"),
                    f = 0;
                for (; f < d[v]; f++) {
                    var g = d[f][D]("="),
                        h = i,
                        j = i;
                    if (g >= 0) {
                        h = d[f][rb](0, g);
                        j = d[f][rb](g + 1)
                    } else h = d[f];
                    h = Fc(h);
                    h = this.db(h);
                    this.add(h, j ? Fc(j) : "")
                }
            }
        };
    M = rg[w];
    M.s = 0;
    M.la = function() {
        return this.s
    };
    M.add = function(a, b) {
        this.$b();
        a = this.db(a);
        if (this.Ea(a)) {
            var c = this.ba.na(a);
            O(c) ? c[s](b) : this.ba.sa(a, [c, b])
        } else this.ba.sa(a, b);
        this.s++;
        return this
    };
    na(M, function(a) {
        a = this.db(a);
        if (this.ba.Ea(a)) {
            this.$b();
            var b = this.ba.na(a);
            if (O(b)) this.s -= b[v];
            else this.s--;
            return this.ba[fb](a)
        }
        return e
    });
    qa(M, function() {
        this.$b();
        this.ba[xb]();
        this.s = 0
    });
    M.Ja = function() {
        return this.s == 0
    };
    M.Ea = function(a) {
        a = this.db(a);
        return this.ba.Ea(a)
    };
    M.Cc = function(a) {
        var b = this.ra();
        return ic(b, a)
    };
    M.Wa = function() {
        var a = this.ba.ra(),
            b = this.ba.Wa(),
            c = [],
            d = 0;
        for (; d < b[v]; d++) {
            var f = a[d];
            if (O(f)) {
                var g = 0;
                for (; g < f[v]; g++) c[s](b[d])
            } else c[s](b[d])
        }
        return c
    };
    M.ra = function(a) {
        var b;
        if (a) {
            var c = this.db(a);
            if (this.Ea(c)) {
                var d = this.ba.na(c);
                if (O(d)) return d;
                else {
                    b = [];
                    b[s](d)
                }
            } else b = []
        } else {
            var f = this.ba.ra();
            b = [];
            var g = 0;
            for (; g < f[v]; g++) {
                var h = f[g];
                O(h) ? oc(b, h) : b[s](h)
            }
        }
        return b
    };
    M.sa = function(a, b) {
        this.$b();
        a = this.db(a);
        if (this.Ea(a)) {
            var c = this.ba.na(a);
            if (O(c)) this.s -= c[v];
            else this.s--
        }
        this.ba.sa(a, b);
        this.s++;
        return this
    };
    M.na = function(a, b) {
        a = this.db(a);
        if (this.Ea(a)) {
            var c = this.ba.na(a);
            return O(c) ? c[0] : c
        } else return b
    };
    ha(M, function() {
        if (this.ma) return this.ma;
        var a = [],
            b = 0,
            c = this.ba.Wa(),
            d = 0;
        for (; d < c[v]; d++) {
            var f = c[d],
                g = Ec(f),
                h = this.ba.na(f);
            if (O(h)) {
                var j = 0;
                for (; j < h[v]; j++) {
                    b > 0 && a[s]("&");
                    a[s](g, "=", Ec(h[j]));
                    b++
                }
            } else {
                b > 0 && a[s]("&");
                a[s](g, "=", Ec(h));
                b++
            }
        }
        return this.ma = a[Hb]("")
    });
    M.$b = function() {
        delete this.ma;
        this.Kb && delete this.Kb.ma
    };
    M.qa = function() {
        var a = new rg;
        a.ba = this.ba.qa();
        return a
    };
    M.db = function(a) {
        var b = n(a);
        if (this.Ha) b = b.toLowerCase();
        return b
    };
    M.Ib = function(a) {
        if (a && !this.Ha) {
            this.$b();
            be(this.ba, function(b, c) {
                var d = c.toLowerCase();
                if (c != d) {
                    this[fb](c);
                    this.add(d, b)
                }
            }, this)
        }
        this.Ha = a
    };
    var Ag;
    pc = function(a, b, c) {
        if (a[Fa]) return arguments[v] <= 2 ? a[Fa](b) : a[Fa](b, c);
        b || (b = 0);
        var d = a[v];
        if (c) d = c;
        if (d >= a[v]) d = a[v];
        if (d < 0) d = a[v] + d;
        if (b < 0) b = a[v] + b;
        var f = [],
            g = b;
        for (; g < d; g++) f[s](a[g]);
        return f
    };
    Zb = function(a, b) {
        var c = a.ud;
        if (arguments[v] > 2) {
            var d = pc(arguments, 2);
            c && d[Ib][wb](d, c);
            c = d
        }
        b = a.wd || b;
        a = a.vd || a;
        var f, g = b || N;
        f = c ? function() {
            var h = pc(arguments, 0);
            h[Ib][wb](h, c);
            return a[wb](g, h)
        } : function() {
            return a[wb](g, arguments)
        };
        f.ud = c;
        f.wd = b;
        f.vd = a;
        return f
    };
    var Bg = function() {
        return window[eb] ? new oe(window.innerWidth, window[eb]) : De()
    };
    var Cg = function(a) {
            Ag = a
        },
        Dg = function() {
            return Ag || ""
        },
        W = "SYN_EVENT_ACTIVATE",
        X = "SYN_EVENT_DEACTIVATE",
        Eg = "SYN_EVENT_ENABLE",
        Fg = "SYN_EVENT_DISABLE",
        Gg = "SYN_EVENT_MOUSEIDLE",
        Hg = "SYN_EVENT_MOUSEACTIVE",
        Ig = "_VIEW",
        Jg = "_CONTROL",
        Kg = function(a) {
            return a == "_CLASS" || a == "_CLASS" || a == Ig || a == Jg
        },
        Lg = "syn_view",
        Mg = {
            src: "",
            alt: ""
        },
        Ng = ".".charAt(0),
        Og = {},
        Pg = {},
        Qg = {},
        Rg = function(a, b) {
            Pg[a] = b
        },
        Y = function(a, b) {
            b[w].Lc = function() {
                return a
            };
            Qg[a] = b
        },
        Sg = new Pf,
        Tg = kf("syn"),
        Ug = function(a) {
            Tg.Ce(ef[a])
        },
        Vg = function() {
            if (Tg.zb(Ze)) {
                var a =
                    U[wb](i, arguments);
                Tg.log(Ze, a);
                var b = window.console;
                b && b.wf && b.wf(a)
            }
        },
        Wg = function() {
            if (Tg.zb(Ye)) {
                var a = U[wb](i, arguments);
                Tg.log(Ye, a);
                var b = window.console;
                b && b.tj && b.tj(a)
            }
        },
        Xg = function() {
            if (Tg.zb(Xe)) {
                var a = U[wb](i, arguments);
                Tg.log(Xe, a);
                var b = window.console;
                b && b.ph && b.ph(a)
            }
        },
        Yg = function(a, b) {
            Wg(a.fe, " : ", b)
        },
        Zg = function(a, b) {
            if (a.charAt(0) != Ng) return a;
            if (a[v] == 1) return b;
            var c = 1,
                d = b[v];
            for (; c < a[v]; ++c) {
                if (a.charAt(c) != Ng) break;
                d = b.lastIndexOf(Ng, d - 1);
                if (d == -1) return i
            }
            b = b[Kb](0, d);
            a = a[Kb](c);
            if (a[v] > 0) return U(b, Ng, a);
            return b
        },
        $g = function(a, b, c, d, f, g) {
            this.parent = b;
            this.Tf = c;
            this.view = a;
            this.pa = d;
            this.index = f;
            this.Gd = g;
            this.id = this[Ya] ? f > 0 ? U(c, Ng, d, "-", f) : U(c, Ng, d) : "main";
            var h = [];
            a[Ig] && T(a[Ig], function(j, p) {
                Kg(p) || h[s](p)
            });
            this.vg = h
        };
    M = $g[w];
    M.ca = function(a, b) {
        var c = this[G][a];
        return Mb(c) && !(c === i) ? c : b
    };
    M.d = function(a, b) {
        var c = this[G][a];
        return P(c) ? c : b
    };
    M.k = function(a, b) {
        var c = this[G][a];
        return Sb(c) ? c : b
    };
    M.Ma = function(a) {
        return this[G][a] ? k : e
    };
    M.create = function(a, b) {
        if (!this.Qb) this.Qb = ye();
        var c = this.Qb[jb](a);
        se(c, this[F] + b);
        a == "img" && Ce(c, Mg);
        if (arguments[v] > 2) {
            function d(j) {
                if (j) {
                    var p = P(j) ? this[Oa](j) : j;
                    this[ua](c, p)
                }
            }
            var f = 2;
            for (; f < arguments[v]; f++) {
                var g = arguments[f];
                if ((Rb(g) || bd && typeof g == "function" && typeof g[v] == "number") && !(Ub(g) && g[Ha] > 0)) {
                    var h = O(g) ? g : mc(g);
                    S(h, d, this.Qb)
                } else d[H](this.Qb, g)
            }
        }
        return c
    };
    M.Ze = function(a, b) {
        if (!lc(this.vg, a)) return [];
        var c = this[G][Ig][a];
        if (!c) return [];
        b = this[F] + (b ? b : "-" + a);
        if (!O(c)) {
            var d = c.c();
            se(d, b);
            return [d]
        }
        return ec(c, function(f, g) {
            var h = f.c();
            se(h, b);
            se(h, "index-" + (g + 1));
            return h
        }, this)
    };
    M.Ye = function(a, b) {
        if (a) return this.Ze(a, b);
        var c = [],
            d = mc(this.vg);
        S(d, function(f) {
            oc(c, this.Ze(f))
        }, this);
        return c
    };
    var ah = function(a, b, c) {
        var d = a instanceof qg ? a.qa() : new qg(a, undefined);
        if (c != i) d.Yi(b, c);
        else {
            var f = d.za;
            f[fb](b) && d.ed(f)
        }
        return d[u]()
    };
    var bh = function(a, b) {
        S(b[A]("."), function(c) {
            if (!c || !Ub(a)) return undefined;
            a = a[c]
        });
        return a
    };
    var ch = function(a, b, c) {
            var d = bh(a, b);
            if (Sb(d)) return d;
            if (P(d)) return ea(d, 10);
            return c
        },
        dh = function(a, b, c) {
            var d = bh(a, b);
            return d ? d[u]() : c
        },
        eh = function(a, b, c) {
            var d = bh(a, b);
            return Ub(d) ? d : c
        };
    var fh = function(a, b) {
            var c = bh(a, b);
            return O(c) ? c : c ? [c] : []
        },
        gh = function(a, b, c) {
            var d = b[A]("."),
                f = d.pop();
            if (!!f)
                if (hc(d, function(g) {
                        if (!g) return e;
                        a = a[g];
                        return Ub(a)
                    })) a[f] = c
        };
    var Z = function(a, b, c) {
        bc[H](this);
        this.Fa = a;
        this.jb = b;
        this.nd = c;
        this.Xa = {}
    };
    Z.e(bc);
    M = Z[w];
    M.view = function() {
        return this.nd
    };
    M.xb = function(a) {
        var b = [],
            c = this.ia();
        S(a, function(d) {
            var f = this.Fa.pb(Zg(d, c));
            if (f) b[s](new hh(f));
            else {
                var g = 1;
                for (; f = this.Fa.pb(Zg(U(d, "-", g), c));) {
                    b[s](new hh(f));
                    ++g
                }
                g == 1 && Wg(this.mf(), " : View ", d, " not found")
            }
        }, this);
        return b
    };
    M.l = function(a) {
        return this.xb(this.xa(a))
    };
    M.t = function(a) {
        var b = this.xa(a);
        if (b[v] == 0) return [this[G]()];
        return this.xb(b)
    };
    M.vb = function(a) {
        var b = this.xa(a)[0];
        if (!b) return i;
        var c = this.ia(),
            d = this.Fa.pb(Zg(b, c));
        if (d) return new hh(d);
        if (d = this.Fa.pb(Zg(b + "-1", c))) return new hh(d);
        Wg(this.mf(), " : View ", b, " not found");
        return i
    };
    M.oa = function(a) {
        if (!this.ca(a)) return this[G]();
        return this.vb(a)
    };
    M.ia = function() {
        return this.nd.ia()
    };
    M.ca = function(a) {
        return bh(this.jb, a)
    };
    M.k = function(a, b) {
        return ch(this.jb, a, b)
    };
    M.d = function(a, b) {
        return dh(this.jb, a, b)
    };
    M.h = function(a, b) {
        return eh(this.jb, a, b)
    };
    M.Ma = function(a) {
        return bh(this.jb, a) ? k : e
    };
    M.xa = function(a) {
        return fh(this.jb, a)
    };
    M.Bf = function(a, b, c) {
        var d = this.Xa[a.ia()];
        if (!d) {
            d = {};
            this.Xa[a.ia()] = d
        }
        d[b] || (d[b] = []);
        d[b][s](c);
        zd(a.c(), b, c, e, this)
    };
    M.a = function(a, b, c) {
        !a || (O(a) ? S(a, function(d) {
            this.Bf(d, b, c)
        }, this) : this.Bf(a, b, c))
    };
    M.wg = function(a, b, c) {
        var d = this.Xa[a.ia()];
        d && d[b] && lc(d[b], c);
        return Cd(a.c(), b, c, e, this)
    };
    M.va = function(a, b, c) {
        !a || (O(a) ? S(a, function(d) {
            this.wg(d, b, c)
        }, this) : this.wg(a, b, c))
    };
    var ih = 0,
        jh = function(a, b, c) {
            var d = b.c().syn_visited;
            if (!d[c]) {
                d[c] = k;
                ih++;
                var f = new hd(c, b.c());
                f.source = a.c();
                Ld(f[Za], f[J], e, f);
                ih--;
                d[c] = e
            }
        };
    Z[w].dispatchEvent = function(a, b) {
        if (!!a) {
            var c = this.Lc(),
                d = this[G]();
            O(a) ? S(a, function(f) {
                jh(d, f, b, c)
            }) : jh(d, a, b, c)
        }
    };
    Z[w].mf = function() {
        return U(this.ia(), "[", this.Lc(), "]")
    };
    Z[w].aa = function() {
        if (!this.Mc()) {
            var a = this.Fa;
            T(this.Xa, function(b, c) {
                T(b, function(d, f) {
                    S(d, function(g) {
                        Cd(a.pb(c), f, g, e, this)
                    }, this)
                }, this)
            }, this);
            this.Xa = this.nd = this.jb = this.Fa = i;
            Z.u.aa[H](this)
        }
    };
    Z[w].Lc = function() {
        return "syn.ControlBase"
    };
    var kh = function(a, b, c) {
        Z[H](this, a, b, c);
        this.Kb = this.d("uri", "");
        this.oc = this.d("type", "POST");
        this.Mi = this.k("priority", 1);
        this.ic = this.d("parameters", "");
        this.zc = this.t("button");
        this.Ob = this.l("activate_on_success");
        this.sc = this.l("activate_on_failure");
        this.Fd = this.l("deactivate_on_success");
        this.Dc = this.l("deactivate_on_failure");
        this.fj = this.l("status");
        this.Te = this.h("codemap", {});
        this.a(c, W, this.f)
    };
    kh.e(Z);
    var lh = {
            "return": 0,
            error: ""
        },
        mh = {
            "return": -1,
            error: "ajax request failed"
        },
        nh = {
            "return": -1,
            error: "unable to parse ajax response as json or xml"
        },
        oh = {
            "return": -1,
            error: "expected keys not found in json response"
        },
        ph = {
            "return": -1,
            error: "expected tags not found in xml response"
        },
        qh = {
            "return": -1,
            error: "expected tags not found in text response"
        };
    M = kh[w];
    M.Tb = function() {
        return this.ic
    };
    M.Vb = i;
    M.uf = i;
    M.Pc = i;
    M.lg = function(a) {
        var b = i;
        if (a != i) {
            b = this.Te[a[u]()];
            if (a != 0 && !b) b = this.Te["-1"]
        }
        S(this.fj, function(c) {
            c[I]("status", b);
            c.g()
        })
    };
    M.f = function() {
        if (!!this.zc[0].da()) {
            var a = this.Tb();
            if (P(a)) {
                this[E](this.zc, Fg);
                try {
                    var b = this.oc == "GET" ? this.Kb + "?" + a : this.Kb;
                    Sg[db](b, b, this.oc, a, i, this.Mi, this.Od())
                } catch (c) {
                    this[E](this.zc, Eg)
                }
            } else {
                this.lg(a["return"]);
                this[E](this.Dc, X);
                this[E](this.sc, W)
            }
        }
    };
    M.Od = function() {
        var a = this;
        return function() {
            a[E](a.zc, Eg);
            var b = i;
            if (this.Vc()) try {
                if (a.Vb) {
                    var c = this.nf();
                    b = a.Vb(c);
                    Sb(b["return"]) || (b = oh)
                } else if (a.uf) {
                    var c = this.Td();
                    c = lf(c);
                    b = a.uf(c);
                    Sb(b["return"]) || (b = ph)
                } else if (a.Pc) {
                    var c = this.Td();
                    b = a.Pc(c);
                    Sb(b["return"]) || (b = qh)
                }
            } catch (d) {
                b = nh
            } else b = mh;
            a.lg(b["return"]);
            if (b["return"] == 0) {
                a[E](a.Fd, X);
                a[E](a.Ob, W)
            } else {
                Yg(this, b.error);
                a[E](a.Dc, X);
                a[E](a.sc, W)
            }
        }
    };
    var rh = /\s*;\s*/,
        sh = function(a, b, c, d, f) {
            if (/[;=]/ [za](a)) l(m('Invalid cookie name "' + a + '"'));
            if (/;/ [za](b)) l(m('Invalid cookie value "' + b + '"'));
            Mb(c) || (c = -1);
            var g = f ? ";domain=" + f : "",
                h = d ? ";path=" + d : "",
                j;
            if (c < 0) j = "";
            else if (c == 0) j = ";expires=" + (new Date(1970, 1, 1)).toUTCString();
            else {
                var p = new Date((new Date).getTime() + c * 1000);
                j = ";expires=" + p.toUTCString()
            }
            fa.cookie = a + "=" + b + g + h + j
        },
        th = function(a, b) {
            var c = a + "=",
                d = n(fa.cookie)[A](rh),
                f = 0,
                g;
            for (; g = d[f]; f++)
                if (g[D](c) == 0) return g[Kb](c[v]);
            return b
        };
    var uh, vh;
    (function() {
        function a(j) {
            var p = j.match(/[\d]+/g);
            ia(p, 3);
            return p[Hb](".")
        }
        var b = e,
            c = "";
        if (ca[xa] && ca[xa][v]) {
            var d = ca[xa]["Shockwave Flash"];
            if (d) {
                b = k;
                if (d.description) c = a(d.description)
            }
            if (ca[xa]["Shockwave Flash 2.0"]) {
                b = k;
                c = "2.0.0.11"
            }
        } else if (ca.mimeTypes && ca.mimeTypes[v]) {
            var f = ca.mimeTypes["application/x-shockwave-flash"];
            if (b = f && f.enabledPlugin) c = a(f.enabledPlugin.description)
        } else try {
            var g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
            b = k;
            c = a(g.GetVariable("$version"))
        } catch (h) {
            try {
                var g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                b = k;
                c = "6.0.21"
            } catch (h) {
                try {
                    var g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    b = k;
                    c = a(g.GetVariable("$version"))
                } catch (h) {}
            }
        }
        uh = b;
        vh = c
    })();
    var wh = {
            "return": -2,
            error: "invalid video id"
        },
        xh = {
            "return": -3,
            error: "invalid user name"
        },
        yh = {
            "return": -4,
            error: "invalid password"
        },
        zh = {
            "return": -5,
            error: "invalid contact"
        },
        $ = {
            version: "1.0.2",
            startPage: "",
            logLevel: 0,
            hideSafeSearch: e,
            user: "",
            recentSearches: [],
            app: "",
            client: "",
            sessionTokenFavorite: "",
            sessionTokenFlag: "",
            sessionTokenShare: "",
            sessionToken: ""
        };
    $.Ke = {
        filterRacyContent: 1,
        autoFullscreenOff: 16,
        autoPlayNextOff: 32
    };
    $.Th = function() {
        var a = ea(th("YTTV_PREF", 48), 10);
        T($.Ke, function(b, c) {
            $[c] = a & b ? k : e
        })
    };
    $.Pi = function() {
        var a = 0;
        T($.Ke, function(b, c) {
            if ($[c]) a |= b
        });
        sh("YTTV_PREF", a[u]())
    };
    var Ah = function(a, b, c) {
            var d = Bg(),
                f = d[K] + (c || 0);
            ja(fa[Ua][F], d[y] + (b || 0) + "px");
            sa(fa[Ua][F], f + "px");
            if (a) fa[Ua][F].fontSize = a * f + "px"
        },
        Bh = function() {
            return (fd || ed) && (bd || V || ad)
        },
        Ch = function() {
            return !uh || Pc(vh, "9.0.0") >= 0
        };
    var Dh = function(a, b, c) {
        kh[H](this, a, b, c)
    };
    Dh.e(kh);
    Dh[w].Tb = function() {
        if (!$.user) return xh;
        var a = this[G]().d("video_id", "");
        if (!a) return wh;
        var b = Ac(this.ic, a),
            c = $.client;
        if (c) b += "&client=" + c;
        if (c = $.sessionTokenFavorite) {
            var d = c[A]("=", 1)[0],
                f = escape(c[Kb](d[v] + 1));
            b += "&" + d + "=" + f
        }
        return b
    };
    Dh[w].Pc = function(a) {
        return a[D]("<return_code><![CDATA[0]]\></return_code>") != -1 ? lh : qh
    };
    var Eh = function(a, b, c) {
        kh[H](this, a, b, c)
    };
    Eh.e(kh);
    Eh[w].Tb = function() {
        if (!$.user) return xh;
        var a = this[G]().d("video_id", "");
        if (!a) return wh;
        var b = Ac(this.ic, a),
            c = $.client;
        if (c) b += "&client=" + c;
        if (c = $.sessionTokenFlag) {
            var d = c[A]("=", 1)[0],
                f = escape(c[Kb](d[v] + 1));
            b += "&" + d + "=" + f
        }
        return b
    };
    Eh[w].Pc = function(a) {
        return a[D]("<return_code><![CDATA[0]]\></return_code>") != -1 ? lh : qh
    };
    var Gh = function(a, b, c) {
        kh[H](this, a, b, c);
        this.yd = this.xa("clear_cache");
        this.p = new Fh;
        this.qj = this.vb("username");
        this.Uf = this.vb("password")
    };
    Gh.e(kh);
    Gh[w].Tb = function() {
        var a = Nc(this.qj.c()[Pa]),
            b = Nc(this.Uf.c()[Pa]);
        if (Bc(a)) return xh;
        if (Bc(b)) return yh;
        this.rj = a;
        var c = Ac(this.ic, a, b);
        if ($.client) c += "&client=" + $.client;
        return c
    };
    Gh[w].Vb = function(a) {
        if (a["return"] != 0) return a;
        $.user = this.rj;
        $.sessionToken = a.session_token || "";
        $.sessionTokenFavorite = a.session_token_favorite || "";
        $.sessionTokenFlag = a.session_token_flag || "";
        $.sessionTokenShare = a.session_token_share || "";
        ka(this.Uf.c(), "");
        var b = this.p.getData();
        S(this.yd, function(c) {
            this.p[ta](c);
            this.p[xb]()
        }, this);
        this.p[ta](b);
        return lh
    };
    var Hh = function(a, b, c) {
        kh[H](this, a, b, c);
        this.yd = this.xa("clear_cache");
        this.p = new Fh
    };
    Hh.e(kh);
    Hh[w].Vb = function(a) {
        if (a["return"] != 0) return a;
        $.user = "";
        $.sessionToken = "";
        $.sessionTokenFavorite = "";
        $.sessionTokenFlag = "";
        $.sessionTokenShare = "";
        var b = this.p.getData();
        S(this.yd, function(c) {
            this.p[ta](c);
            this.p[xb]()
        }, this);
        this.p[ta](b);
        return lh
    };
    var Fh = function(a) {
        this[ta](a)
    };
    M = Fh[w];
    M.setData = function(a) {
        a || (a = {});
        if (!(this.n === a)) {
            O(a.cache) || (a.cache = []);
            Sb(a.numItems) || (a.numItems = 0);
            Sb(a.priority) || (a.priority = 1);
            O(a.keywords) || (a.keywords = []);
            Sb(a.itemsPerBlock) || (a.itemsPerBlock = 1);
            this.n = a
        }
    };
    M.getData = function() {
        return this.n
    };
    qa(M, function() {
        jc(this.n.cache);
        this.n.numItems = 0
    });
    M.nj = function(a) {
        if (!(this.n.itemsPerBlock >= a)) {
            this.n.itemsPerBlock = a;
            this[xb]()
        }
    };
    M.kg = function(a) {
        if (this.n.uri == a) return e;
        this.n.uri = a;
        this.n.keywords = [];
        this[xb]();
        return k
    };
    M.Nc = function() {
        return this.n.uri
    };
    M.Ga = function() {
        return this.n.numItems
    };
    M.Kc = function(a) {
        return q[La](a / this.n.itemsPerBlock)
    };
    M.Pd = function(a) {
        return a * this.n.itemsPerBlock
    };
    M.Se = function(a) {
        var b = this.Pd(a),
            c = b + this.n.itemsPerBlock,
            d = this.n.cache;
        for (; b < c; ++b) d[b] = i
    };
    M.load = function(a, b, c, d, f) {
        var g = this.n.uri;
        if (!!g) {
            var h = this.n.cache,
                j = this.n.itemsPerBlock,
                p = this.n.numItems,
                r = this.n.priority,
                t = this.n.keywords;
            a = this.Kc(a);
            b = this.Kc(b - 1);
            for (; a <= b; ++a) {
                var x = this.Pd(a),
                    B = x + j;
                if (h[x] == i || x < p && p <= B) {
                    h[x] = "p";
                    var L = Ac(g, x + 1, j),
                        ra = L;
                    if (f) ra = L + f;
                    try {
                        Sg[db](ra, L, "GET", i, i, r, this.xh(a, c, d))
                    } catch (nb) {
                        Vg("Request already pending for ", L)
                    }
                } else h[x] != "p" && c[H](d, 0, x, B, h, t)
            }
        }
    };
    M.xh = function(a, b, c) {
        var d = this;
        return function() {
            var f = d.Pd(a),
                g = f + d.n.itemsPerBlock;
            d.Se(a);
            if (this.Vc()) {
                var h = this.nf();
                if (h["return"] != 0) {
                    Yg(this, h.error);
                    b[H](c, h["return"] || -1, f, g)
                } else {
                    var j = h[hb],
                        p = h.total,
                        r = h.content;
                    if (!Sb(j) || !Sb(p) || !O(r) || j - 1 > f) {
                        Yg(this, "bad response data");
                        b[H](c, -1, f, g)
                    } else {
                        if (p != d.n.numItems) {
                            if (p < d.n.numItems) {
                                var t = d.Kc(p - 1) + 1,
                                    x = d.Kc(d.n.numItems - 1) + 1;
                                for (; t < x; ++t) d.Se(t)
                            }
                            d.n.numItems = p
                        }
                        var t = f;
                        for (; t < g; ++t) d.n.cache[t] = r[t - (j - 1)];
                        d.n.keywords = h.keywords || [];
                        S(d.n.keywords,
                            function(B, L, ra) {
                                ra[L] = Mc(B, "<b>");
                                ra[L] = Mc(ra[L], "</b>")
                            });
                        b[H](c, 0, f, g, d.n.cache, d.n.keywords)
                    }
                }
            } else {
                Yg(this, "request failed");
                b[H](c, -1, f, g)
            }
        }
    };
    var Ih = function(a, b, c) {
        bc[H](this);
        this.ec = a;
        this.Oa = b;
        this.eb = c;
        this.Ad = Zb(this.Ci, this)
    };
    R(Ih, bc);
    M = Ih[w];
    M.fd = e;
    M.Vf = 0;
    M.v = i;
    M.hf = function() {
        if (!this.v && !this.Vf) this.Pb();
        else this.fd = k
    };
    M.stop = function() {
        if (this.v) {
            Sd(this.v);
            this.v = i;
            this.fd = e
        }
    };
    M.o = function() {
        Ih.u.o[H](this);
        this[va]()
    };
    M.Ci = function() {
        this.v = i;
        if (this.fd && !this.Vf) {
            this.fd = e;
            this.Pb()
        }
    };
    M.Pb = function() {
        this.v = Rd(this.Ad, this.Oa);
        this.ec[H](this.eb)
    };
    var Jh = function(a, b, c, d) {
        Z[H](this, a, b, c);
        this.Ob = this.l("activate_on_success");
        this.Fd = this.l("deactivate_on_success");
        this.sc = this.l("activate_on_success");
        this.Dc = this.l("deactivate_on_success");
        this.Eg = this.l("activate_on_no_video");
        this.Zf = this.l("prev");
        this.Gf = this.l("next");
        this.eh = this.l("counter");
        this.p = this.$ = i;
        this.w = e;
        var f = this.k("delay", 0);
        if (f) this.tg = new Ih(this.Cf, f, this);
        this.ie = -1;
        this.p = new Fh;
        this.ig(d || 1);
        this.a(c, W, this.f);
        this.a(c, X, this.kb)
    };
    Jh.e(Z);
    M = Jh[w];
    M.ig = function(a) {
        if (!(this.Pa == a)) {
            this.Pa = a;
            this.fa = a * (this.k("start", 1) - 1);
            this.Df = a * this.k("max", 100);
            this.Sh = a * this.k("loadahead", 0);
            this.Qh = a * this.k("blocksize", 1)
        }
    };
    M.f = function() {
        this.w = k;
        this.a(this.Zf, W, this.Zc);
        this.a(this.Gf, W, this.Yc);
        this.kd(this.fa)
    };
    M.kb = function() {
        this.w = e;
        this.va(this.Zf, W, this.Zc);
        this.va(this.Gf, W, this.Yc)
    };
    M.Zc = function() {
        if (!!this.w) {
            var a = this.fa - this.Pa;
            if (a < 0) {
                var b = q[La]((this.Ga() - 1) / this.Pa);
                a = b * this.Pa
            }
            a != this.fa && this.kd(a)
        }
    };
    M.Yc = function() {
        if (!!this.w) {
            var a = this.fa + this.Pa;
            if (a >= this.Ga()) a = 0;
            a != this.fa && this.kd(a)
        }
    };
    M.lj = function() {
        var a = this.pf(),
            b = this[G]().h("cache", {});
        this[G]()[I]("cache", b);
        if (b !== this.p.getData()) {
            this.fa = 0;
            this.p[ta](b);
            this.p.nj(this.Qh);
            a && this.p.kg(a)
        } else if (a && a != this.p.Nc()) {
            this.fa = 0;
            this.p.kg(a)
        }
    };
    M.kd = function(a) {
        this.fa = a;
        this.yg();
        var b = this.Pa,
            c = 0;
        for (; c < b; ++c) this.rf(c, c + a);
        this.ie = a;
        this.tg ? this.tg.hf() : this.Cf()
    };
    M.Cf = function() {
        var a = this.ie;
        this.ie = -1;
        if (!!this.w)
            if (!(this.fa != a)) {
                var b = q.min(a + this.Pa + this.Sh, this.Df);
                this.lj();
                this.p[Ka](a, b, this.Fh, this)
            }
    };
    M.yg = function() {
        var a = this.Ga(),
            b = {
                start: this.fa + 1,
                end: q.min(this.fa + this.Pa, a),
                total: a
            };
        S(this.eh, function(c) {
            c.dd(b);
            c.g()
        })
    };
    M.Ga = function() {
        return q.min(this.p.Ga(), this.Df)
    };
    M.Fh = function(a, b, c, d, f) {
        if (!!this.w) {
            this.Ga() == 0 && this[E](this.Eg, W);
            if (this.fa != 0 && this.fa >= this.Ga()) this.kd(0);
            else {
                this.yg();
                var g = q.max(b, this.fa),
                    h = q.min(c, this.fa + this.Pa),
                    j = q.min(h, this.Ga());
                h--;
                for (; h >= j; --h) this.Ud(h - this.fa, h, i);
                if (a == 0) {
                    this[G]()[I]("keywords", f);
                    for (; g < j; ++g) this.Ud(g - this.fa, g, d[g]);
                    this[E](this.Fd, X);
                    this[E](this.Ob, W)
                } else {
                    for (; g < j; ++g) this.qf(g - this.fa, g);
                    this[E](this.Dc, X);
                    this[E](this.sc, W)
                }
            }
        }
    };
    M.pf = function() {
        return this.d("uri", "")
    };
    M.rf = function() {};
    M.Ud = function() {};
    M.qf = function() {};
    var Kh = function(a, b, c) {
        Jh[H](this, a, b, c);
        this.b = this.l("target");
        this.Ki = this.h("pending", {});
        this.Jc = this.h("error", {});
        this.di = this.h("no_item", {});
        this.ig(this.b[v])
    };
    Kh.e(Jh);
    Kh[w].pf = function() {
        var a = this[G](),
            b = this.d("uri", "");
        if (!b) return "";
        b += "?start-index=%s&max-results=%s";
        var c = a.d("feed", "");
        if (c) b += "&feed=" + c;
        if (c = a.d("time", "")) b += "&time=" + c;
        if (c = a.d("video_id", "")) b += "&video_id=" + c;
        if (c = a.d("playlist_id", "")) b += "&playlist_id=" + c;
        if (c = a.d("user", "")) b += "&user=" + c;
        if (c = a.d("query", "")) b += "&vq=" + Ec(c);
        if (c = a.d("racy", $.filterRacyContent ? "exclude" : "include")) b += "&racy=" + c;
        if ($.app) b += "&app=" + $.app;
        if ($.client) b += "&client=" + $.client;
        return b
    };
    Kh[w].rf = function(a) {
        var b = this.b[a];
        this[E](b, Fg);
        b[I]("video", this.Ki);
        b.g()
    };
    Kh[w].Ud = function(a, b, c) {
        var d = this.b[a];
        if (c && (c.video_id || c.playlist_id)) {
            c.cache_index = b;
            c.cache_source = this[G]().ia();
            d[I]("video", c);
            d.g();
            this[E](d, Eg)
        } else {
            d[I]("video", this.di);
            d.g();
            this[E](d, Fg)
        }
    };
    Kh[w].qf = function(a) {
        var b = this.b[a];
        this[E](b, Fg);
        b[I]("video", this.Jc);
        b.g()
    };
    var Lh = function(a, b, c) {
        Z[H](this, a, b, c);
        zd(window, Jd, this.gc, e, this)
    };
    Lh.e(Z);
    Lh[w].gc = function() {
        var a = Bg(),
            b = q.max(this.k("n", 1), 1),
            c = this.k("innerAspectRatio", 1),
            d = this.k("outerAspectRatio", 1),
            f = c * a[K] / (d * a[y]),
            g = d * a[y] / (c * a[K]);
        switch (this.d("fit", "min")) {
            case "width":
                f = 1 / b;
                g /= b;
                break;
            case "height":
                g = 1;
                break;
            case "max":
                if (b <= g) {
                    f = 1 / b;
                    g /= b
                } else if (b <= f) {
                    f /= b;
                    g = 1 / b
                } else {
                    var h = q[La](q.sqrt(b * g));
                    for (; h < g * q[La](b / h);) ++h;
                    --h;
                    f = 1 / h;
                    g /= h
                }
                break;
            default:
                if (b <= g) g = 1;
                else if (b <= f) f = 1;
                else {
                    var h = q[Ja](q.sqrt(b * g)),
                        j = q[Ja](q.sqrt(b * f));
                    for (; h < g * q[Ja](b / h);) ++h;
                    for (; j < f * q[Ja](b / j);) ++j;
                    f = q.max(1 / h, f / j);
                    g = q.max(1 / j, g / h)
                }
        }
        var p = this.k("scale", 1);
        f *= p;
        g *= p;
        var r = b == 1 && this.Ma("center"),
            t = this[G]().c(),
            x = q.min(b, t[yb][v]),
            B = 0;
        for (; B < x; ++B) {
            var L = t[yb][B];
            ja(L[F], 100 * f + "%");
            sa(L[F], 100 * g + "%");
            if (r) {
                L[F].left = 50 * (1 - f) + "%";
                L[F].top = 50 * (1 - g) + "%"
            }
        }
    };
    var Mh = function(a, b, c) {
        kh[H](this, a, b, c);
        this.oh = this.vb("email");
        this.Yh = this.vb("message")
    };
    Mh.e(kh);
    Mh[w].Tb = function() {
        if (!$.user) return xh;
        var a = this[G]().d("video_id", ""),
            b = Ec(Nc(this.oh.c()[Pa])),
            c = Ec(Nc(this.Yh.c()[Pa]));
        if (!a) return wh;
        if (Bc(b)) return zh;
        var d = Ac(this.ic, a, b, c),
            f = $.client;
        if (f) d += "&client=" + f;
        if (f = $.sessionTokenShare) {
            var g = f[A]("=", 1)[0],
                h = escape(f[Kb](g[v] + 1));
            d += "&" + g + "=" + h
        }
        return d
    };
    Mh[w].Vb = function(a) {
        return a
    };
    var Oh = function(a, b, c, d, f, g) {
            this.sg = a;
            this.oj = g || e;
            this.dg = b;
            this.Bj = c;
            this.Fc = d || [];
            this.jd = new Ud(this.jf, f || 30000, this);
            this.Jb = i;
            this.ya = -1;
            this.He = [];
            this.md = [];
            this.Xa = [];
            Nh = this
        },
        Nh = i,
        Ph = function(a) {
            var b = [];
            T(a, function(c, d) {
                b[s]('"' + d + '": "' + c + '"')
            });
            return "{" + b[Hb](", ") + "}"
        },
        Rh = function(a, b) {
            var c = [];
            if (a) {
                var d = 1,
                    f = b || [],
                    g = [
                        [-1, a]
                    ];
                do {
                    var h = g.pop(),
                        j = h[0];
                    a = h[1];
                    if (j != -1) d = Qh(c, d, j + 3);
                    var p = j + 1;
                    for (; a && p < f[v]; ++p) {
                        var r = f[p];
                        if (r) {
                            var t = a[A](r);
                            a = t[0];
                            var x = t[v] - 1;
                            for (; x > 0; --x) g[s]([p,
                                t[x]
                            ])
                        }
                    }
                    var B = 0;
                    for (; B < a[v]; ++B) {
                        var L = a[qb](B);
                        d = Qh(c, d, L)
                    }
                } while (g[v] > 0)
            } else c[s](1);
            c[s](0);
            return c
        },
        Qh = function(a, b, c) {
            if (c == b) a[s](1);
            else b = c;
            a[s](c);
            return b
        };
    M = Oh[w];
    M.send = function(a) {
        var b = Ph(a);
        if (!!b)
            if (this.oj) {
                if (!this.Jb) this.Jb = Ae(this.sg);
                this.Jb.onEvent(b)
            } else {
                this.He[s](b);
                this.ya == -1 && this.xe()
            }
    };
    M.xe = function() {
        if (this.He[v] > 0) {
            var a = this.He.shift();
            Vg("SwfPipe:send: ", a);
            this.md = Rh(a, this.Fc);
            this.ya = 0;
            this.jd[hb]();
            this.we(this.md[0])
        } else this.ya = -1
    };
    M.we = function(a) {
        var b = q[La](a / (this.dg - 1)) + 1,
            c = a % (this.dg - 1) + 1,
            d = this.Jb;
        if (!d) this.Jb = d = Ae(this.sg);
        ja(d[F], c + "px");
        sa(d[F], b + "px")
    };
    M.Cg = function(a) {
        if (!(this.ya == -1))
            if (a == this.md[this.ya])
                if (a == 0) {
                    this.jd[va]();
                    this.xe()
                } else this.we(this.md[++this.ya]);
        else a == 2 ? this.xe() : this.jf()
    };
    M.jf = function() {
        this.we(2);
        Wg("SwfPipe: flushing pipe")
    };
    M.Tg = function(a) {
        S(this.Xa, function(b) {
            b.handler[H](b.scope, a)
        })
    };
    M.Kg = function(a, b) {
        a && this.Xa[s]({
            handler: a,
            scope: b
        })
    };

    function Sh(a) {
        !Ub(a) || !Nh || (a[J] == "ack" ? Nh.Cg(a.i) : Nh.Tg(a))
    }
    Q("swfPipeReceiver", Sh);
    var Uh = function(a, b, c) {
        Z[H](this, a, b, c);
        this.ge = i;
        this.w = e;
        this.se = this.l("player");
        this.Ua = e;
        this.yc = !$.autoPlayNextOff;
        this.te = this.vb("playlist_service");
        this.Hg = this.l("activate_on_video");
        this.ih = this.l("deactivate_on_video");
        this.Gg = this.l("activate_on_video_if_active");
        this.Ne = i;
        this.p = new Fh;
        this.ya = this.yb = this.Zb = -1;
        this.Fc = ['{"type": "play", "id": "', '{"type": "set", "id": "', '{"type": "clear"}', '{"type": "', '", "id": "', '", "i": "', '", "li": "'];
        var d = this.oa("player_video").ia(),
            f = this.oa("player_bridge").ia(),
            g = this.d("wmode", "transparent");
        this.pj = this.d("gencon", "0");
        var h = q[La](q.random() * 2147483648)[u](36) + (q[La](q.random() * 2147483648) ^ (new Date).getTime())[u](36);
        this.Zg = h;
        this.sj = d;
        this.Ej = g;
        this.Qe = f;
        Th = this;
        if (this.ob()) this.wj(d, this.h("player_video_properties", {}), h, "swfPipeReceiver", "watchEventPipe");
        else {
            this.Fa = ye();
            this.xj(this.oa("player_video"))
        }
        this.a(c, W, this.f);
        this.a(c, "activate_playlist", this.fi);
        this.a(c, X, this.kb);
        this.a(this.Gg, W, this.me)
    };
    Uh.e(Z);
    var Th = i;
    M = Uh[w];
    M.ob = function() {
        return this.pj == "1" ? e : k
    };
    M.xj = function(a) {
        this.ea = this.Fa[jb]("video");
        a.c()[ua](this.ea);
        this.Dj = a;
        this.sh(a)
    };
    M.sh = function() {
        var a = this.oa("playbutton"),
            b = this.oa("pausebutton"),
            c = this.oa("fsbutton"),
            d = this.oa("ffbutton"),
            f = this.oa("rwbutton"),
            g = this.oa("nextbutton"),
            h = this.oa("prevbutton");
        this.a(a, W, this.ui);
        this.a(b, W, this.ti);
        this.a(c, W, this.qe);
        this.a(d, "mousedown", this.mi);
        this.a(d, "mouseup", this.Jf);
        this.a(d, "mouseout", this.Jf);
        this.a(f, "mousedown", this.wi);
        this.a(f, "mouseup", this.Mf);
        this.a(f, "mouseout", this.Mf);
        this.a(g, W, this.Yc);
        this.a(h, W, this.Zc)
    };
    M.ui = function() {
        this.ea.play()
    };
    M.ti = function() {
        this.ea.paused || this.ea.pause()
    };
    M.mi = function() {
        this.ea.muted = k;
        this.ea.playbackRate = 5
    };
    M.Jf = function() {
        this.ea.playbackRate = 1;
        this.ea.muted = e
    };
    M.wi = function() {
        this.ea.muted = k;
        this.ea.playbackRate = -5
    };
    M.Mf = function() {
        this.ea.playbackRate = 1;
        this.ea.muted = e
    };
    M.Yc = function() {
        this.rb < this.zf && this.pe(this.rb + 1)
    };
    M.Zc = function() {
        this.rb > 0 && this.pe(this.rb - 1)
    };
    M.Xe = function(a, b) {
        if (!b.url) return i;
        var c = new SWFObject(b.url, a, "100%", "100%", "7", "#000000");
        b.params && T(b.params, function(d, f) {
            c.addParam(f, Ec(d)[u]())
        });
        b.variables && T(b.variables, function(d, f) {
            c[tb](f, Ec(d)[u]())
        });
        return c
    };
    M.vj = function(a, b, c, d, f) {
        var g = this.Xe(a + ".swf", b);
        if (g) {
            g[tb]("inChannel", Ec(c));
            g[tb]("outChannel", Ec(d));
            g[tb]("dictionary", Ec(f[Hb](";")));
            g[tb]("client", $.client);
            g[Va](a)
        }
    };
    M.wj = function(a, b, c, d, f) {
        var g = a + ".swf",
            h = this.Xe(g, b);
        if (h) {
            h.addParam("name", g);
            h[tb]("inChannel", Ec(c));
            h[tb]("outChannel", Ec(d));
            h[tb]("watchChannel", Ec(f));
            h[tb]("autoPlayNext", this.yc);
            h[tb]("client", $.client);
            h[Va](a);
            this.Jb = Ae(g)
        }
    };
    M.of = function(a) {
        var b = "video_id=" + a.video_id;
        try {
            var c = "/get_video_info?" + b;
            Sg[db](c, c, "GET", i, i, 1, this.Od(a))
        } catch (d) {}
    };
    M.f = function(a) {
        a[C]();
        if (this[G]().d("playlist_id", "")) {
            this[E](this.te, W);
            this[E](this.te, W)
        } else {
            var b = this[G]().d("source", ""),
                c = Ae(b);
            !c || this.Wf(this[G]().k("index", 0), new hh(c))
        }
    };
    M.fi = function() {
        this.Wf(0, this.te)
    };
    M.Wf = function(a, b) {
        var c = b.h("cache", {});
        this[G]()[I]("cache", c);
        this.p[ta](c);
        if (this.ge != this.p.Nc()) {
            this.ge && this.ob() && this.lb[db]({
                type: "clear"
            });
            this.ge = this.p.Nc()
        }
        if (this.yc) {
            if ($.autoPlayNextOff) {
                this.yc = e;
                this.ob() && this.lb[db]({
                    type: "autoPlayNextOff"
                })
            }
        } else if (!$.autoPlayNextOff) {
            this.yc = k;
            this.ob() && this.lb[db]({
                type: "autoPlayNextOn"
            })
        }
        if (!this.w) {
            this.w = k;
            var d = this.Ua = !$.autoFullscreenOff;
            S(this.se, function(f) {
                var g = f.c();
                ue(g, "active", k);
                ue(g, "fullscreen", d)
            })
        }
        this.pe(a)
    };
    M.kb = function(a) {
        a[C]();
        this.w = e;
        this.ya = this.Zb = this.yb = -1;
        S(this.se, function(b) {
            var c = b.c();
            ue(c, "active", e);
            ue(c, "fullscreen", e)
        });
        if (this.ob()) this.lb[db]({
            type: "clear"
        });
        else !this.ea.paused && !this.ea.ended && this.ea.pause();
        this.Ua = e
    };
    M.me = function(a) {
        this.Ne = new hh(a[Za])
    };
    M.qe = function() {
        this.Ua = !this.Ua;
        gc(this.se, function(a) {
            var b = a.c();
            ue(b, "fullscreen", this.Ua)
        }, this);
        this.oe(this.Zb)
    };
M.sf = function(a, b, c, d) {
    if (!this.w || a != 0) return;

    var f = this.yb;
    if (f < b || f >= c) return;

    var g = (this.p && this.p.Ga ? this.p.Ga() - 1 : 0);
    var h = d && d[f] ? d[f] : null;
    var j = (h && h.video_id && h.restricted == 0) ? h.video_id : "";

    if (this.ob && this.ob()) {
        if (this.lb && typeof db !== "undefined" && this.lb[db]) {
            try {
                this.lb[db]({
                    type: "play",
                    id: j,
                    i: f,
                    li: g
                });
            } catch (e) {
                console.warn("lb[db] failed:", e);
            }
        } else {
            console.warn("Missing this.lb[db], cannot send play event");
        }
    } else {
        this.rb = f;
        this.zf = g;

        if (this.of) {
            try {
                this.of(h);
            } catch (e) {
                console.warn("this.of failed:", e);
            }
        } else {
            console.warn("Missing this.of");
        }
    }
};

    M.aj = function(a) {
        this.ea.src = a;
        this.ea.yj = e;
        this.ea[Ka]();
        this.ea.play();
        this.oe(this.rb)
    };
    M.zi = function(a) {
        this.yb = a;
        this.p[Ka](a, a + 1, this.Ih, this)
    };
    M.Ih = function(a, b, c, d) {
        if (!(!this.w || a != 0)) {
            var f = this.yb;
            if (!(f < b || f >= c)) {
                var g = this.p.Ga() - 1,
                    h = d[f],
                    j = "";
                if (h && h.video_id && h.restricted == 0) j = h.video_id;
                if (this.ob()) this.lb[db]({
                    type: "set",
                    id: j,
                    i: f,
                    li: g
                });
                else {
                    this.rb = f;
                    this.zf = g;
                    this.of(h)
                }
            }
        }
    };
    M.oe = function(a) {
        if (!(a == this.ya)) {
            this.Zb = a;
            this.p[Ka](a, a + 1, this.tf, this)
        }
    };
    M.tf = function(a, b, c, d) {
        if (!(!this.w || a != 0)) {
            var f = this.Zb;
            if (!(f < b || f >= c)) {
                this.ya = f;
                var g = d[f];
                if (g) {
                    this[G]()[I]("video", g);
                    this[E](this.ih, X);
                    this[E](this.Hg, W);
                    this[E](this.Ne, W)
                }
            }
        }
    };
    M.pe = function(a) {
        if (a == this.ya) {
            this.yb = a;
            this.p[Ka](a, a + 1, this.sf, this, "request_play")
        } else {
            this.Zb = this.yb = a;
            this.p[Ka](a, a + 1, this.Jh, this, "request_set_and_play")
        }
    };
    M.Jh = function(a, b, c, d, f) {
        this.tf(a, b, c, d, f);
        this.sf(a, b, c, d, f)
    };

    function Vh(a) {
        var b = Th;
        if (!!b) {
            var c = "";
            c = a ? b.sj + ".swf" : b.Qe;
            b.lb = new Oh(c, 400, 200, b.Fc, 30000, a);
            b.lb.Kg(b.Lh, b);
            a || b.vj(b.Qe, b.h("player_bridge_properties", {}), "swfPipeReceiver", b.Zg, b.Fc)
        }
    }
    Q("watchEventPipe", Vh);
    Uh[w].Lh = function(a) {
        switch (a[J]) {
            case "set":
                var b = ea(a.i, 10);
                this.oe(b);
                break;
            case "get":
                var b = ea(a.i, 10);
                this.zi(b);
                break;
            case "stop":
                this.Ua && this.qe();
                break;
            case "focus":
                if (!this.Ua) switch (a.dir) {
                    case "up":
                        fa[Ma]("main.content_watch.logo")[bb][ib]();
                        break;
                    case "down":
                        fa[Ma]("main.content_watch.flag_button")[bb][ib]();
                        break;
                    case "left":
                        fa[Ma]("main.content_watch.goback_button")[bb][ib]();
                        break;
                    case "right":
                        fa[Ma]("main.content_watch.moreinfo_button")[bb][ib]();
                        break
                }
                break;
            case "fullscreen":
                this.qe();
                break;
            case "log":
                Vg(a.content);
                break
        }
    };
    Uh[w].Od = function(a) {
        var b = this;
        return function() {
            var c = this.Td()[A]("&"),
                d = "18";
            if (a.format) {
                var f = a.format[A](","),
                    g = 0;
                for (; g < f[v]; g++)
                    if (f[g][rb](0, 2) == "22") {
                        d = "22";
                        break
                    }
            }
            var g = 0;
            for (; g < c[v]; g++) {
                var h = c[g][A]("=");
                h[0] == "token" && b.aj("/get_video?video_id=" + a.video_id + "&t=" + h[1] + "&fmt=" + d)
            }
        }
    };
    var hh = function(a) {
        if (!a) l("Node not found");
        if (!a.id) l("Node does not have an id");
        if (!a[Lg]) l("Node does not have an associated DNA model");
        this.ga = a
    };
    M = hh[w];
    M.c = function() {
        return this.ga
    };
    M.ia = function() {
        return this.ga.id
    };
    M.Va = function(a) {
        var b = (this.ga[Lg][Ig] || {})[a];
        return O(b) ? b : b ? [b] : []
    };
    M.Sd = function() {
        var a = {};
        T(this.ga[Lg], function(b, c) {
            Kg(c) || (a[c] = b)
        });
        return a
    };
    M.ca = function(a) {
        return bh(this.ga[Lg], a)
    };
    M.k = function(a, b) {
        return ch(this.ga[Lg], a, b)
    };
    M.d = function(a, b) {
        return dh(this.ga[Lg], a, b)
    };
    M.h = function(a, b) {
        return eh(this.ga[Lg], a, b)
    };
    M.Ma = function(a) {
        return bh(this.ga[Lg], a) ? k : e
    };
    M.xa = function(a) {
        return fh(this.ga[Lg], a)
    };
    M.setProperty = function(a, b) {
        gh(this.ga[Lg], a, b)
    };
    M.dd = function(a) {
        T(a, function(b, c) {
            this[I](c, b)
        }, this)
    };
    M.bh = function() {
        T(this.ga[Lg], function(a, b, c) {
            Kg(b) || wc(c, b)
        }, this)
    };
    M.g = function() {
        this.ga[Lg]._CLASS.g(this)
    };
    M.rh = function(a, b, c, d, f) {
        var g = a.c(),
            h = this.c(),
            j = this.de();
        if (!j) {
            fg(h, -1000, -1000);
            this.z(k)
        }
        var p = kg(g),
            r = lg(g),
            t = kg(h),
            x = lg(h),
            B = new ne(h.offsetLeft, h[Db]),
            L = q[La]((r[y] - x[y]) / 2),
            ra = q[La]((r[K] - x[K]) / 2),
            nb = B.x + p.x - t.x + L + (b || 0),
            ob = B.y + p.y - t.y + ra + (c || 0);
        if (d) {
            var Xa = window.innerWidth || De()[y];
            if (Xa > 0) {
                Xa -= x[y];
                if (nb > Xa) nb = Xa;
                if (nb < 0) nb = 0
            }
        }
        if (f) {
            var Xa = window[eb] || De()[K];
            if (Xa > 0) {
                Xa -= x[K];
                if (ob > Xa) ob = Xa;
                if (ob < 0) ob = 0
            }
        }
        j || this.z(e);
        return new ne(nb, ob)
    };
    M.de = function() {
        return this.ga[F].display != "none"
    };
    M.z = function(a) {
        ng(this.ga, a)
    };
    M.da = function() {
        return !ic(re(this.ga), "disabled")
    };
    M.Gb = function(a) {
        ue(this.ga, "disabled", !a)
    };
    M.Uc = function() {
        return ic(re(this.ga), "active")
    };
    M.Lc = function() {
        return "syn.ViewHelper"
    };
    var Wh = {
        Da: function(a) {
            return a[ya]("div", "", a.Ye())
        },
        g: function() {}
    };
    var Xh = {
        Da: Wh.Da,
        g: function(a) {
            var b = a.ca("video");
            if (b) {
                a.z(k);
                S(a.Va("title"), function(c) {
                    c[I]("label", b.title);
                    c.g()
                });
                S(a.Va("image"), function(c) {
                    c[I]("image", b.image_url);
                    c.g()
                });
                S(a.Va("rating"), function(c) {
                    c[I]("rating", b.rating);
                    c.g()
                });
                S(a.Va("views"), function(c) {
                    c[I]("label", b.view_count);
                    c.g()
                });
                S(a.Va("duration"), function(c) {
                    c[I]("label", b.duration);
                    c.g()
                });
                b.duration && b.view_count ? S(a.Va("seperator"), function(c) {
                    c.z(k);
                    c.g()
                }) : S(a.Va("seperator"), function(c) {
                    c.z(e);
                    c.g()
                });
                b.playlist_id ||
                    a.z(b.title)
            } else S(a.Va("seperator"), function(c) {
                c.z(e);
                c.g()
            });
            Wh.g(a)
        }
    };
    var Yh = {
        Da: function(a) {
            var b = a[ya]("div", "", a[ya]("img", "-star"), a[ya]("img", "-star"), a[ya]("img", "-star"), a[ya]("img", "-star"), a[ya]("img", "-star"));
            ng(b, e);
            return b
        },
        g: function(a) {
            var b = a.ca("rating");
            if (P(b)) b = parseFloat(b);
            if (Sb(b)) {
                a.z(k);
                var c = a.c(),
                    d = 1;
                for (; d <= b + 0.25; ++d) {
                    c[yb][d - 1].src = "https://cmd-hue.github.io/xl/starfull.png";
                    if (d >= 5) return
                }
                if (b + 0.75 >= d) {
                    c[yb][d - 1].src = "https://cmd-hue.github.io/xl/starhalf.png";
                    ++d
                }
                for (; d <= 5; ++d) c[yb][d - 1].src = "https://cmd-hue.github.io/xl/starempty.png"
            } else a.z(e)
        }
    };
    var Zh = function(a, b, c) {
        Z[H](this, a, b, c);
        this.b = this.l("target");
        this.a(c, W, this.f)
    };
    Zh.e(Z);
    Zh[w].f = function(a) {
        this[E](this.b, a[J])
    };
    var $h = function(a, b, c) {
        Z[H](this, a, b, c);
        var d = this.Fa.We("img", {
            width: "100%",
            height: "100%",
            src: "https://web.archive.org/web/20090303214154oe_/http://www.youtube.com/img/tv/pixel.gif",
            alt: ""
        });
        bg(d, "position", "absolute");
        bg(d, "left", "0px");
        bg(d, "top", "0px");
        this.Wc = this.Fa.We("a", {
            href: "javascript:void(0)"
        }, d);
        c.c()[ua](this.Wc);
        this.b = this.t("target");
        this.a(c, "click", this.hi)
    };
    $h.e(Z);
    $h[w].hi = function(a) {
        a[C]();
        !this[G]().da() || this[E](this.b, W)
    };
    $h[w].aa = function() {
        if (!this.Mc()) {
            $h.u.aa[H](this);
            He(this.Wc)
        }
    };
    var ai = function(a, b, c) {
        Z[H](this, a, b, c);
        this.b = this.t("target");
        var d = this.d("event", "click");
        this.a(c, d, this.Qa)
    };
    ai.e(Z);
    ai[w].Qa = function(a) {
        a[C]();
        !this[G]().da() || this[E](this.b, W)
    };
    var bi = function(a, b, c) {
        Z[H](this, a, b, c);
        this.b = this.t("target");
        this.cb = this.k("delay", 0);
        this.w = this.ce = e;
        this.a(c, jd, this.si)
    };
    bi.e(Z);
    bi[w].Me = function() {
        if (!(!this[G]().da() || !this.ce)) {
            this.w = k;
            this[E](this.b, W)
        }
    };
    bi[w].si = function(a) {
        a[C]();
        if (!!this[G]().da()) {
            this.ce = k;
            this.a(this[G](), kd, this.Lf);
            this.cb > 0 ? Rd(this.Me, this.cb, this) : this.Me()
        }
    };
    bi[w].Lf = function(a) {
        a[C]();
        this.ce = e;
        this.va(this[G](), kd, this.Lf);
        !this[G]().da() || !this.w || this[E](this.b, X)
    };
    bi[w].aa = function() {
        if (!this.Mc()) {
            bi.u.aa[H](this);
            He(this.Wc)
        }
    };
    var di = function(a, b, c) {
        Z[H](this, a, b, c);
        this.b = this.t("target");
        var d = this.d("key", "CTRL+ALT+d");
        this.ng = this.Oe = this.$e = e;
        this.Re = this.bc = 0;
        S(d[A]("+"), function(h) {
            var j = h.toUpperCase();
            switch (j) {
                case "CTRL":
                    this.$e = k;
                    this.bc = ci.CTRL;
                    break;
                case "ALT":
                    this.Oe = k;
                    this.bc = ci.ALT;
                    break;
                case "SHIFT":
                    this.ng = k;
                    this.bc = ci.SHIFT;
                    break;
                default:
                    this.bc = ci[j];
                    this.Re = h[qb](0);
                    break
            }
        }, this);
        var f = c.c(),
            g = xe(f);
        zd(g, "keypress", this.ni, e, this)
    };
    di.e(Z);
    di[w].ni = function(a) {
        a[C]();
        if (!(a.ctrlKey != this.$e))
            if (!(a.altKey != this.Oe))
                if (!(a.shiftKey != this.ng)) {
                    if (a[kb] != 0) {
                        if (a[kb] != this.bc) return
                    } else if (a.charCode != this.Re) return;
                    this[E](this.b, W)
                }
    };
    var ci = {
        MAC_ENTER: 3,
        BACKSPACE: 8,
        TAB: 9,
        NUM_CENTER: 12,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAUSE: 19,
        CAPS_LOCK: 20,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        PRINT_SCREEN: 44,
        INSERT: 45,
        DELETE: 46,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        QUESTION_MARK: 63,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        META: 91,
        CONTEXT_MENU: 93,
        NUM_ZERO: 96,
        NUM_ONE: 97,
        NUM_TWO: 98,
        NUM_THREE: 99,
        NUM_FOUR: 100,
        NUM_FIVE: 101,
        NUM_SIX: 102,
        NUM_SEVEN: 103,
        NUM_EIGHT: 104,
        NUM_NINE: 105,
        NUM_MULTIPLY: 106,
        NUM_PLUS: 107,
        NUM_MINUS: 109,
        NUM_PERIOD: 110,
        NUM_DIVISION: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        NUMLOCK: 144,
        SEMICOLON: 186,
        DASH: 189,
        EQUALS: 187,
        COMMA: 188,
        PERIOD: 190,
        SLASH: 191,
        APOSTROPHE: 192,
        SINGLE_QUOTE: 222,
        OPEN_SQUARE_BRACKET: 219,
        BACKSLASH: 220,
        CLOSE_SQUARE_BRACKET: 221,
        WIN_KEY: 224,
        WIN_IME: 229,
        WII_MINUS: 170,
        WII_ONE: 172,
        WII_TWO: 173,
        WII_PLUS: 174,
        WII_UP: 175,
        WII_DOWN: 176,
        WII_RIGHT: 177,
        WII_LEFT: 178
    };
    var ei = function(a, b, c) {
        Z[H](this, a, b, c);
        this.b = this.t("target");
        this.a(c, W, this.f)
    };
    ei.e(Z);
    ei[w].f = function() {
        this.va(this[G](), W, this.f);
        this[E](this.b, W);
        this[E](this.b, X)
    };
    var fi = function(a, b, c) {
        Z[H](this, a, b, c);
        this.ka = i;
        this.b = this.l("target");
        this.a(this.b, W, this.me)
    };
    fi.e(Z);
    fi[w].me = function(a) {
        var b = a[Za];
        if (this.ka) {
            if (this.ka.c() == b) return;
            this[E](this.ka, X)
        }
        this.ka = new hh(b);
        this.a(this.ka, X, this.If)
    };
    fi[w].If = function() {
        this.va(this.ka, X, this.If);
        this.ka = i
    };
    var gi = function(a, b, c) {
        Z[H](this, a, b, c);
        this.$ = this.oa("source");
        this.b = this.t("target");
        this.q = this.d("key", "keywords");
        this.Xh = this.k("max", 16);
        this.Ob = this.l("activate_on_success");
        this.a(c, W, this.f);
        this.a(c, X, this.kb)
    };
    gi.e(Z);
    gi[w].f = function() {
        var a = Nc(this.$.c()[Pa]);
        if (!Bc(a)) {
            var b = [a],
                c = this.q,
                d = this.Xh;
            S(this.b, function(f) {
                S(f.xa(c), function(g) {
                    g && b[v] < d && kc(b, g)
                })
            });
            S(this.b, function(f) {
                f[I](c, b);
                f.g()
            });
            this[E](this.Ob, W)
        }
    };
    gi[w].kb = function() {
        S(this.b, function(a) {
            a[I](this.q, []);
            a.g()
        })
    };
    var hi = function(a, b, c) {
        Z[H](this, a, b, c);
        this.Ca = this.ca("style", "active");
        this.oc = this.ca("type", "mousedown");
        if (this.oc == "mousedown") {
            this.a(c, Id, this.Hf);
            this.a(c, kd, this.ne);
            this.a(c, "mouseup", this.ne)
        } else if (this.oc == "mousehover") {
            this.a(c, jd, this.Hf);
            this.a(c, kd, this.ne)
        }
    };
    hi.e(Z);
    hi[w].Hf = function(a) {
        a[C]();
        if (!!this[G]().da()) {
            se(this[G]().c(), this.Ca);
            this[G]().g()
        }
    };
    hi[w].ne = function(a) {
        a[C]();
        if (!!this[G]().da()) {
            te(this[G]().c(), this.Ca);
            this[G]().g()
        }
    };
    var ii = function(a, b, c) {
        Z[H](this, a, b, c);
        this.$ = this.t("source");
        this.q = this.xa("key");
        this.Fg = this.l("activate_on_true");
        this.Dg = this.l("activate_on_false");
        this.hh = this.l("deactivate_on_true");
        this.gh = this.l("deactivate_on_false");
        this.a(c, W, this.f)
    };
    ii.e(Z);
    ii[w].f = function() {
        if (hc(this.$, function(a) {
                return hc(this.q, function(b) {
                    return a.ca(b)
                })
            }, this)) {
            this[E](this.hh, X);
            this[E](this.Fg, W)
        } else {
            this[E](this.gh, X);
            this[E](this.Dg, W)
        }
    };
    var ji = function(a, b, c) {
        Z[H](this, a, b, c);
        this.b = this.t("target");
        this.Ed = new Fh;
        this.a(c, W, this.f)
    };
    ji.e(Z);
    ji[w].f = function() {
        this.w = k;
        S(this.b, this.ah, this)
    };
    ji[w].ah = function(a) {
        var b = a.ca("cache_data");
        if (!!b) {
            this.Ed[ta](b);
            !this.Ed.Nc() || this.Ed[xb]()
        }
    };
    var ki = function(a, b, c) {
        Z[H](this, a, b, c);
        this.b = this.l("target");
        this.a(c, W, this.f)
    };
    ki.e(Z);
    ki[w].f = function() {
        S(this.b, function(a) {
            a.de() && this[E](a, X)
        }, this)
    };
    var li = function(a, b, c) {
        Z[H](this, a, b, c);
        var d = this.Ma("visible_on_start");
        this[G]().z(d);
        var f = this.d("name", "syn"),
            g = this.k("max", 20),
            h = c.c(),
            j = xe(h),
            p = [],
            r = 0;
        for (; r < g; ++r) {
            var t = j[Oa]("");
            p[s](t);
            h[ua](t);
            h[ua](j[jb]("hr"))
        }
        this.ei = p;
        var x = this;
        kf(f).Jg(function(B) {
            x.oi(B)
        });
        this.a(c, W, this.f)
    };
    li.e(Z);
    li[w].f = function() {
        this[G]().z(!this[G]().de())
    };
    li[w].oi = function(a) {
        dc(this.ei, function(b, c, d) {
            b.data = c > 0 ? d[c - 1].data : mi.qh(a)
        })
    };
    var ni = function(a) {
        Pe[H](this, a)
    };
    R(ni, Pe);
    ni[w].qh = function(a) {
        var b = [];
        b[s](this.Li, " ");
        this.cj && b[s]("[", Qe(a, this.dj.na()), "s] ");
        b[s](a.bi, "\n");
        this.bj && a.gf && b[s](a.ff, "\n");
        return b[Hb]("")
    };
    var mi = new ni;
    var oi = function(a, b, c) {
        Z[H](this, a, b, c);
        this.b = this.t("target");
        this.a(c, W, this.f)
    };
    oi.e(Z);
    oi[w].f = function() {
        S(this.b, function(a) {
            var b = a.Sd();
            Vg(a.ia(), "\n", ge(b))
        })
    };
    var pi = function(a, b, c) {
        Z[H](this, a, b, c);
        this.b = this.t("target");
        this.$ = this.t("source");
        this.d("event", "click");
        this.j = this.h("map", {});
        this.jh = this.k("interval", 5000);
        T(this.j, function(d, f) {
            if (f == Gg || f == Hg) {
                this.a(this.$, kd, this.ri);
                this.a(this.$, "mousemove", this.qi);
                if (!this.cb) {
                    this.cb = new Ud(this.Kf, this.jh, this);
                    this.cb[hb]()
                }
            } else this.a(this.$, f, this.Qa)
        }, this)
    };
    pi.e(Z);
    pi[w].Kf = function() {
        var a = this.j[Gg];
        a && this[E](this.b, a);
        this.Ff = e;
        this.cb[va]()
    };
    pi[w].Qa = function(a) {
        a[C]();
        !this[G]().da() || this[E](this.b, this.j[a[J]])
    };
    pi[w].qi = function() {
        if (!this.Ff) {
            var a = this.j[Hg];
            a && this[E](this.b, a);
            this.Ff = k
        }
        this.cb[hb]()
    };
    pi[w].ri = function() {
        this.Kf()
    };
    var qi = function(a, b, c) {
        Z[H](this, a, b, c);
        if (!!window._gat) {
            this.Bd = this.d("category", "undefined");
            this.rd = this.d("action", "undefined");
            this.ee = this.d("label", "");
            var d = this.k("delay", 3000);
            this.nc = new Ud(this.hc, d, this);
            var f = this.d("event", W);
            this.a(c, f, this.f)
        }
    };
    qi.e(Z);
    qi[w].f = function() {
        this.nc[hb]()
    };
    qi[w].hc = function() {
        try {
            _gat._getTracker(Dg())._trackEvent(this.Bd, this.rd, this.ee)
        } catch (a) {
            Xg(a)
        }
    };
    var ri = function(a, b, c) {
        Z[H](this, a, b, c);
        if (!!window._gat) {
            this.Ji = this.d("name", "");
            var d = this.k("delay", 3000);
            this.nc = new Ud(this.hc, d, this);
            this.a(c, W, this.f)
        }
    };
    ri.e(Z);
    ri[w].f = function() {
        this.nc[hb]()
    };
    ri[w].hc = function() {
        try {
            _gat._getTracker(Dg())._trackPageview(this.Ji)
        } catch (a) {
            Xg(a)
        }
    };
    var si = function(a, b, c) {
        Z[H](this, a, b, c);
        if (!!window._gat) {
            this.Bd = this.d("category", "undefined");
            this.rd = this.d("action", "undefined");
            this.ee = this.d("label", "");
            var d = this.k("delay", 3000);
            this.nc = new Ud(this.hc, d, this);
            var f = this.d("eventEnd", X),
                g = this.d("eventStart", W);
            this.a(c, f, this.ki);
            this.a(c, g, this.Bi)
        }
    };
    si.e(Z);
    si[w].Bi = function() {
        this.ej = ac()
    };
    si[w].ki = function() {
        this.nh = ac() - this.ej;
        this.nc[hb]()
    };
    si[w].hc = function() {
        try {
            _gat._getTracker(Dg())._trackEvent(this.Bd, this.rd, this.ee, q[La](this.nh / 1000))
        } catch (a) {
            Xg(a)
        }
    };
    var ti = function(a, b, c) {
        Z[H](this, a, b, c);
        this.b = this.t("target");
        this.a(c, W, this.f)
    };
    ti.e(Z);
    ti[w].f = function(a) {
        a[C]();
        S(this.b, function(b) {
            b.z(e)
        })
    };
    var yi = function(a, b, c) {
            Z[H](this, a, b, c);
            if (!ui) {
                vi = new wf;
                ui = new pf(k, "history.htm", Ae("syn-control-history-state"), Ae("syn-control-history-iframe"));
                zd(ui, "navigate", wi);
                ui.Gb(k);
                xi = k
            }
            this.Rh = this.d("layer", "replace");
            this.a(c, W, this.f)
        },
        xi;
    yi.e(Z);
    yi[w].f = function() {
        if (xi) {
            var a = zi,
                b = a;
            switch (this.Rh) {
                case "add":
                    b = vi.fg([this.ia(), a, this[G]().Sd()]);
                    break;
                case "replace":
                    b = vi.fg([this.ia(), a ? vf(a)[1] : i, this[G]().Sd()]);
                    break;
                case "remove":
                    b = a ? vf(a)[1] : i;
                    break
            }
            if (a != b) {
                xi = e;
                ui.$i(b);
                xi = k
            }
        }
        zi = ui.wb()
    };
    var ui = i,
        vi = i,
        zi = i,
        wi = function(a) {
            if (!(!a.mc || !xi)) {
                var b = vf(a.mc);
                if (!!b) {
                    var c = b[1];
                    if (c != zi) {
                        var d = {};
                        d.mc = c;
                        wi(d)
                    }
                    var f = ye().pb(b[0]);
                    if (f) {
                        var g = new hh(f);
                        g.bh();
                        g.dd(b[2]);
                        g.g();
                        xi = e;
                        jh(g, g, W);
                        xi = k;
                        zi = a.mc
                    } else Wg(a.mc, " : View not found for browser history")
                }
            }
        };
    var Ai = function(a, b, c) {
        Z[H](this, a, b, c);
        this.b = this.l("target");
        this.a(c, W, this.Qa);
        this.a(c, X, this.Qa)
    };
    Ai.e(Z);
    Ai[w].Qa = function(a) {
        this[E](this.b, a[J])
    };
    var Bi = function(a, b, c) {
        Z[H](this, a, b, c);
        var d = this.t("source");
        this.b = this.ca("target");
        this.j = this.h("map", {});
        T(this.j, function(f, g) {
            g == Jd ? zd(window, Jd, this.Qa, e, this) : this.a(d, g, this.Qa)
        }, this)
    };
    Bi.e(Z);
    Bi[w].Qa = function(a) {
        a[C]();
        if (!!this[G]().da()) {
            var b = this.j[a[J]];
            b && b[H](this.b, a)
        }
    };
    var Ci = function(a, b, c) {
        Z[H](this, a, b, c);
        this.Je = this.d("url", "");
        this.a(c, W, this.f)
    };
    Ci.e(Z);
    Ci[w].f = function(a) {
        this[E](this.b, a[J]);
        window.location = this.Je
    };
    var Di = function(a, b, c) {
        Z[H](this, a, b, c);
        this.b = this.oa("target").c()[Cb];
        this.Ve = this.b[Cb];
        this.lh = this.k("dx", 0);
        this.mh = this.k("dy", 0);
        this.Ug = this.k("bx", 0);
        this.Vg = this.k("by", 0);
        this.Ie = this.l("up");
        this.Kd = this.l("down");
        this.a(c, W, this.f);
        this.a(this.Ie, W, this.Ei);
        this.a(this.Kd, W, this.ji)
    };
    Di.e(Z);
    Di[w].f = function() {
        this.ve(0)
    };
    Di[w].Ei = function() {
        this.ve(1)
    };
    Di[w].ji = function() {
        this.ve(-1)
    };
    Di[w].ve = function(a) {
        var b = this.Ve ? lg(this.Ve) : Bg(),
            c = this.b,
            d = new ne(c.offsetLeft, c[Db]),
            f = lg(c),
            g = -this.Ug,
            h = -this.Vg,
            j = b[y] - f[y] + g,
            p = b[K] - f[K] + h,
            r = this.lh,
            t = this.mh;
        if (r < 0) r = b[y] + r;
        if (t < 0) t = b[K] + t;
        var x = g,
            B = h;
        if (a != 0) {
            x = q.min(q.max(d.x + a * r, j), g);
            B = q.min(q.max(d.y + a * t, p), h)
        }
        fg(c, x - g, B - h);
        x > j || B > p ? this[E](this.Kd, Eg) : this[E](this.Kd, Fg);
        x < g || B < h ? this[E](this.Ie, Eg) : this[E](this.Ie, Fg)
    };
    var Ei = function(a, b, c) {
        Z[H](this, a, b, c);
        this.b = this.t("target");
        this.$ = this.oa("source");
        this.j = this.h("map", {});
        this.ug = this.h("transform", {});
        this.a(c, W, this.f)
    };
    Ei.e(Z);
    Ei[w].f = function() {
        var a = this.$,
            b;
        b = vc(this.ug) ? rc(this.j, function(c) {
            return a.ca(c)
        }) : rc(this.j, function(c) {
            var d = a.ca(c),
                f = this.ug[d[u]()];
            return f == undefined ? d : f
        }, this);
        S(this.b, function(c) {
            T(b, function(d, f) {
                c[I](f, Mb(d) ? d : i)
            });
            c.g()
        })
    };
    var Fi = function(a, b, c) {
        Z[H](this, a, b, c);
        this.b = this.t("target");
        if (this.Ca = this.d("style", "active")) {
            this.a(c, W, this.f);
            this.a(c, X, this.kb)
        }
    };
    Fi.e(Z);
    Fi[w].f = function() {
        S(this.b, function(a) {
            ue(a.c(), this.Ca, k)
        }, this)
    };
    Fi[w].kb = function() {
        S(this.b, function(a) {
            ue(a.c(), this.Ca, e)
        }, this)
    };
    var Gi = function(a, b, c) {
        Z[H](this, a, b, c);
        this.$ = this.oa("source");
        this.b = this.t("target");
        this.vc = this.h("add", {});
        this.ad = this.h("remove", {});
        this.ld = this.h("toggle", {});
        var d = this.d("load", "");
        S(this.b, function(f) {
            se(f.c(), d)
        });
        T(this.vc, function(f, g) {
            this.a(this.$, g, this.gi)
        }, this);
        T(this.ad, function(f, g) {
            this.a(this.$, g, this.yi)
        }, this);
        T(this.ld, function(f, g) {
            this.a(this.$, g, this.Di)
        }, this)
    };
    Gi.e(Z);
    Gi[w].gi = function(a) {
        var b = this.vc[a[J]];
        S(this.b, function(c) {
            se(c.c(), b)
        })
    };
    Gi[w].yi = function(a) {
        S(this.ad[a[J]][A](" "), function(b) {
            S(this.b, function(c) {
                te(c.c(), b)
            })
        }, this)
    };
    Gi[w].Di = function(a) {
        !this[G]().da() || S(this.ld[a[J]][A](" "), function(b) {
            S(this.b, function(c) {
                ve(c.c(), b)
            })
        }, this)
    };
    var Hi = function(a, b, c) {
        Z[H](this, a, b, c);
        this.Ca = this.d("style", "active");
        this.a(c, Id, this.vi);
        this.a(c, "mouseup", this.Pf);
        this.a(c, kd, this.Pf)
    };
    Hi.e(Z);
    Hi[w].vi = function(a) {
        a[C]();
        !this[G]().da() || ue(this[G]().c(), this.Ca, k)
    };
    Hi[w].Pf = function(a) {
        a[C]();
        !this[G]().da() || ue(this[G]().c(), this.Ca, e)
    };
    Hi[w].aa = function() {
        if (!this.Mc()) {
            Hi.u.aa[H](this);
            He(this.Wc)
        }
    };
    var Ii = function(a, b, c) {
        Z[H](this, a, b, c);
        this.b = this.t("target");
        this.$ = this.oa("source");
        this.q = this.d("key", "");
        this.vc = this.h("add", {});
        this.ad = this.h("remove", {});
        this.ld = this.h("toggle", {});
        this.a(c, W, this.f)
    };
    Ii.e(Z);
    Ii[w].f = function() {
        if (!!this[G]().da()) {
            var a = this.$.ca(this.q)[u]();
            if (!!a) {
                var b;
                T(this.b, function(c) {
                    var d = c.c();
                    (b = this.vc[a]) && se(d, b);
                    (b = this.ad[a]) && S(b[A](" "), function(f) {
                        te(d, f)
                    });
                    (b = this.ld[a]) && S(b[A](" "), function(f) {
                        ve(d, f)
                    })
                }, this)
            }
        }
    };
    var Ji = function(a, b, c) {
        Z[H](this, a, b, c);
        this.Ka = [];
        this.nd = c;
        this.$ = this.l("source");
        this.kj = this.l("trigger");
        this.a(this.kj, Id, this.Yg)
    };
    Ji.e(Z);
    Ji[w].Yg = function() {
        var a = 0;
        for (; a < this.$[v]; ++a) {
            var b = this.$[a].ca("value");
            if (b) {
                var c = this.Ka.lastIndexOf(b.label);
                if (c != -1) b.checked || this.Ka[Fb](c, 1);
                else if (b.checked) {
                    this.Ka[s](b.label);
                    this.Ka.sort()
                }
            }
        }
        this[G]()[I]("value", this.Ka[u]());
        this[G]().g()
    };
    var Ki = function(a, b, c) {
        Z[H](this, a, b, c);
        this.Db = this.d("mode", "show");
        this.cf = this.k("delay_in", 0);
        this.Ec = this.k("delay_out", 0);
        this.ac = this.w = e;
        switch (this.Db) {
            case "hide":
                this.b = this.t("target");
                S(this.b, function(d) {
                    d.z(k)
                });
                this.a(c, W, this.gd);
                break;
            default:
                this.b = this.t("target");
                S(this.b, function(d) {
                    d.z(e)
                });
                this.a(c, W, this.gd);
                break
        }
    };
    Ki.e(Z);
    Ki[w].gd = function(a) {
        a[C]();
        var b = this[G]();
        if (!!b.da()) {
            this.w = k;
            switch (this.Db) {
                case "message":
                    break;
                default:
                    this.a(b, X, this.fb);
                    break
            }
            this.cf > 0 ? Rd(this.ef, this.cf, this) : this.ef()
        }
    };
    Ki[w].ef = function() {
        if (!(!this[G]().da() || !this.w || this.ac)) {
            this.ac = k;
            var a = this.Db != "hide";
            S(this.b, function(b) {
                b.z(a)
            });
            switch (this.Db) {
                case "message":
                    this.w = this.ac = e;
                    this.Ec > 0 ? Rd(this.Gc, this.Ec, this) : Rd(this.Gc, 1000, this);
                    break;
                default:
                    break
            }
        }
    };
    Ki[w].fb = function(a) {
        a[C]();
        this.w = e;
        var b = this[G]();
        if (!!b.da()) {
            switch (this.Db) {
                case "message":
                    break;
                default:
                    this.va(b, X, this.fb);
                    break
            }
            if (this.ac) {
                this.ac = e;
                this.Ec > 0 ? Rd(this.Gc, this.Ec, this) : this.Gc()
            }
        }
    };
    Ki[w].Gc = function() {
        var a = this.Db == "hide";
        S(this.b, function(b) {
            b.z(a)
        })
    };
    var Li = function(a, b, c) {
        Z[H](this, a, b, c);
        this.Qg = this.Ma("align");
        this.Og = this.k("align_offset_x", 0);
        this.Pg = this.k("align_offset_y", 0);
        this.Mg = this.Ma("align_contain_x");
        this.Ng = this.Ma("align_contain_y");
        var d = this.k("delay", 10);
        this.vf = new Ud(this.fb, d, this);
        this.Zd = this.Ma("hide_on_click");
        this.b = this.l("target");
        S(this.b, function(f) {
            f.z(e)
        });
        this.xc = i;
        this.a(c, jd, this.Hi);
        this.a(c, kd, this.Gi);
        this.Zd && this.a(c, "click", this.Fi);
        zd(window, Jd, this.gc, e, this)
    };
    Li.e(Z);
    M = Li[w];
    M.gc = function(a) {
        a[C]();
        this.xc = i
    };
    M.gd = function() {
        if (this.Qg) {
            if (!this.xc) {
                var a = this[G]();
                this.xc = ec(this.b, function(c) {
                    return c.rh(a, this.Og, this.Pg, this.Mg, this.Ng)
                }, this)
            }
            S(this.b, function(c, d) {
                fg(c.c(), this.xc[d])
            }, this)
        }
        var b = this.b;
        this.a(b, jd, this.Sf);
        this.a(b, kd, this.Rf);
        this.Zd && this.a(b, "click", this.Qf);
        S(this.b, function(c) {
            c.z(k)
        })
    };
    M.fb = function() {
        var a = this.b;
        this.va(a, jd, this.Sf);
        this.va(a, kd, this.Rf);
        this.Zd && this.va(a, "click", this.Qf);
        S(this.b, function(b) {
            b.z(e)
        })
    };
    M.Hi = function(a) {
        a[C]();
        this[G]().da() && this.gd()
    };
    M.Gi = function(a) {
        a[C]();
        this.vf[hb]()
    };
    M.Fi = function(a) {
        a[C]();
        this.fb()
    };
    M.Sf = function(a) {
        a[C]();
        this.vf[va]()
    };
    M.Rf = function(a) {
        a[C]();
        this.fb()
    };
    M.Qf = function(a) {
        a[C]();
        this.fb()
    };
    var Mi = function(a, b, c) {
        Z[H](this, a, b, c);
        this.b = this.t("target");
        this.a(c, W, this.f)
    };
    Mi.e(Z);
    Mi[w].f = function(a) {
        a[C]();
        S(this.b, function(b) {
            b.z(k)
        })
    };
    var Ni = function(a, b, c) {
        Z[H](this, a, b, c);
        this.$ = this.t("source");
        this.q = this.xa("key");
        var d = this.h("activate", {});
        this.tc = rc(d, function(g) {
            return g ? O(g) ? this.xb(g) : this.xb([g]) : []
        }, this);
        var f = this.h("deactivate", {});
        this.bf = rc(f, function(g) {
            return g ? O(g) ? this.xb(g) : this.xb([g]) : []
        }, this);
        this.a(c, W, this.f)
    };
    Ni.e(Z);
    Ni[w].f = function() {
        S(this.$, function(a) {
            S(this.q, function(b) {
                var c = a.ca(b);
                this[E](c && this.bf[c] || this.bf["default"] || [], X);
                this[E](c && this.tc[c] || this.tc["default"] || [], W)
            }, this)
        }, this)
    };
    var Oi = function(a, b, c) {
        Z[H](this, a, b, c);
        this.Ca = this.ca("style", "active");
        this.a(c, Id, this.pi)
    };
    Oi.e(Z);
    Oi[w].pi = function(a) {
        a[C]();
        if (!!this[G]().da()) {
            ve(this[G]().c(), this.Ca);
            this[G]().g()
        }
    };
    var Pi = function(a, b, c) {
        Z[H](this, a, b, c);
        this.b = this.t("target");
        this.a(c, W, this.f)
    };
    Pi.e(Z);
    Pi[w].f = function() {
        S(this.b, function(a) {
            a.g()
        })
    };
    var Ri = function(a, b, c) {
        Z[H](this, a, b, c);
        this.b = this.t("target");
        this.hj = Qi(this.xa("width_progression"));
        this.gj = Qi(this.xa("height_progression"));
        this.qg = this.rg = i;
        this.tc = this.Ma("activate");
        this.pg = i;
        zd(window, Jd, this.gc, e, this)
    };
    Ri.e(Z);
    var Qi = function(a) {
        if (!O(a)) return [];
        var b = P(a[0]) ? [a[0]] : [];
        S(a, function(c, d, f) {
            if (Sb(c)) b[c] = P(f[d + 1]) ? f[d + 1] : i
        });
        return b
    };
    Ri[w].zg = function(a, b, c) {
        var d = fc(b, function(f, g, h) {
            return a >= h ? g : f
        }, i);
        d != c && S(this.b, function(f) {
            c && te(f.c(), c);
            d && se(f.c(), d)
        });
        return d
    };
    Ri[w].gc = function(a) {
        a[C]();
        var b = lg(this[G]().c());
        if (!pe(b, this.pg)) {
            this.pg = b;
            this.rg = this.zg(b[y], this.hj, this.rg);
            this.qg = this.zg(b[K], this.gj, this.qg);
            S(this.b, function(c) {
                c.g()
            });
            this.tc && this[E](this.b, W)
        }
    };
    var Si = {
        Da: function(a) {
            return a[ya]("div", "", a[ya]("img", "-image"))
        },
        g: function(a) {
            var b = a.d("image", ""),
                c = a.d("image_key", "");
            if (c) b = a.d(c, "");
            var d = a.d("image_alt", ""),
                f = a.c()[lb];
            Ce(f, {
                src: d
            });
            b && Ce(f, {
                src: b
            });
            a.z(b || d)
        }
    };
    var Ti = {
        Da: function(a) {
            var b = a.d("type", "text"),
                c = a[ya]("input", "");
            Ce(c, {
                type: b
            });
            return c
        },
        g: function(a) {
            var b = a.ca("set");
            if (P(b)) {
                ka(a.c(), b);
                a[I]("set", i);
                a[I]("get", b)
            } else a[I]("get", a.c()[Pa])
        }
    };
    var Ui = {
        Da: function(a) {
            return a[ya]("div", "", "")
        },
        g: function(a) {
            var b = a.d("label", ""),
                c = a.d("label_key", "");
            if (c) b = a.ca(c);
            if (b) {
                var d = a.d("label_decorator", "");
                if (d) b = Ac(d, b)
            } else b = a.d("label_alt", "");
            Le(a.c(), b);
            a.z(b)
        }
    };
    var Vi = {
        Da: Ui.Da,
        g: function(a) {
            var b = a.k("total", 0);
            if (b == 0) {
                a[I]("label", i);
                Ui.g(a)
            } else {
                var c = a.k("start", 1),
                    d = a.k("end", 1),
                    f = a.d("of", "of"),
                    g = "";
                if (b >= 1000) {
                    b = q[La](b / 1000);
                    g = "k"
                }
                var h = b[u](),
                    j = c[u](),
                    p = d[u]();
                if (d > c) d < 10000 ? a[I]("label", Ac("%s - %s %s %s%s", j, p, f, h, g)) : a[I]("label", Ac("%s+ %s %s%s", j, f, h, g));
                else a[I]("label", Ac("%s %s %s%s", j, f, h, g));
                Ui.g(a)
            }
        }
    };
    var Wi = {
        Da: function(a) {
            return a[ya]("textarea", "")
        },
        g: function(a) {
            var b = a.ca("set");
            if (P(b)) {
                ka(a.c(), b);
                a[I]("set", i);
                a[I]("get", b)
            } else a[I]("get", a.c()[Pa])
        }
    };
    var Xi = Xi || {},
        Yi = function(a, b, c, d) {
            var f = new $g(a, i, i, i, 0, 0);
            b && b[H](d, f);
            var g = 0,
                h = [f];
            for (; h[v] > 0;) {
                var j = h[h[v] - 1];
                if (j.Gd < g) {
                    c && c[H](d, j);
                    h.pop()
                } else {
                    var p = j[G][Ig],
                        r = k;
                    p && T(p, function(t, x) {
                        if (!!t) {
                            var B = j.Gd + 1;
                            if (O(t)) S(t, function(ra, nb) {
                                var ob = new $g(ra, j[G], j.id, x, nb + 1, B);
                                h[s](ob);
                                r = e;
                                b && b[H](d, ob)
                            });
                            else {
                                var L = new $g(t, j[G], j.id, x, 0, B);
                                h[s](L);
                                r = e;
                                b && b[H](d, L)
                            }
                        }
                    });
                    if (r) {
                        c && c[H](d, j);
                        h.pop()
                    }
                }
                g = j.Gd
            }
        },
        Zi = function(a, b, c) {
            var d = a[G][Jg];
            if (d && b) {
                var f = O(d) ? d : [d];
                S(f, function(g, h) {
                    b[H](c, g, h,
                        a)
                })
            }
        },
        $i = function(a) {
            var b = function(c, d, f) {
                var g = c._CLASS;
                if (!g) l(U(f.id, " : Expecting valid control name for key '_CLASS'"));
                if (!Qg[g]) l(U(f.id, " : Control ", g, " is not defined"))
            };
            Yi(a, function(c) {
                var d = c[G]._CLASS;
                if (!d) l(U(c.id, " : Expecting valid view name for key '_CLASS'"));
                var f = Pg[d];
                if (f) {
                    if (!f.Da) l(U(c.id, " : View ", d, " must have method 'synthesize'"));
                    if (!f.g) l(U(c.id, " : View ", d, " must have a function 'update'"))
                }
                if (c[G][Ig] && !Ub(c[G][Ig])) l(U(c.id, " : Invalid subview record"));
                Zi(c,
                    b)
            })
        },
        aj = function(a, b, c, d) {
            var f;
            Yi(a, i, function(g) {
                var h = g[G],
                    j = h._CLASS,
                    p = Pg[j] || Wh;
                g.Qb = c;
                g.style = p[F] || j;
                var r = p.Da(g);
                if (!(Ub(r) && r[Ha] > 0)) l(U(g.id, " : 'synthesize' must return a valid DOM node"));
                S(g.Ye(), function(x) {
                    r[ua](x)
                });
                h._CLASS = p;
                r[Lg] = h;
                r.syn_visited = {};
                r.id = g.id;
                var t = new hh(r);
                if (g[Ya])
                    if (g[Ca] > 0) g[Ya][Ig][g.pa][g[Ca] - 1] = t;
                    else g[Ya][Ig][g.pa] = t;
                else {
                    se(r, b);
                    f = t
                }
                t.g(h);
                d && h[Jg] && d[s](t)
            });
            if (!f) l("Unable to synthesize views");
            return f
        },
        bj = function(a, b, c) {
            var d = c.ia(),
                f = a._CLASS;
            if (!P(f)) l(U(d, " : Unable to create controls"));
            var g = Qg[f];
            if (!g) l(U(d, " : Control ", f, " not defined"));
            var h = new g(b, a, c);
            Og[d] || (Og[d] = []);
            Og[d][s](h)
        },
        cj = function(a, b, c, d) {
            Vg("Rendering ", c, " into document");
            var f = ye(b),
                g = [],
                h = aj(a, c, f, g);
            h.dd(d);
            ng(h.c(), e);
            Fe(b, h.c());
            S(g, function(p) {
                var r = p.ia();
                if (Og[r]) l(U(r, " : There are already controls associated with this view"));
                var t = p.c()[Lg][Jg];
                O(t) ? S(t, function(x) {
                    bj(x, f, p)
                }) : bj(t, f, p)
            });
            jh(h, h, W);
            ng(h.c(), k);
            var j = new hd(Jd, window);
            Ld(window, Jd,
                e, j);
            return h
        },
        dj = function(a) {
            var b = a.c().id;
            if (Og[b]) {
                S(Og[b], function(d) {
                    d.aa()
                });
                wc(Og, b)
            }
            var c = a.c()[Lg][Ig];
            c && T(c, function(d) {
                if (d) O(d) ? S(d, function(f) {
                    dj(f)
                }) : dj(d)
            })
        },
        ej = function(a) {
            Vg("Unrendering ", a.ia(), " from document");
            dj(a);
            He(a.c())
        },
        fj = function(a) {
            var b = ["digraph G {\n"],
                c = {},
                d = 0,
                f = function(g, h, j) {
                    var p = c[j.id] + 10000 + h;
                    b[s](U("  ", p, ' [label="', g._CLASS, '", color=red, shape=box];\n'));
                    b[s](U("  ", c[j.id], " -> ", p, " [color=red];\n"))
                };
            Yi(a, function(g) {
                c[g.id] = d++;
                b[s](U("  ", c[g.id],
                    ' [label="', g[G]._CLASS, '"];\n'));
                if (g.Tf) b[s](U("  ", c[g.Tf], " -> ", c[g.id], ' [label="', g[Ca] > 0 ? g.pa + "-" + g[Ca] : g.pa, '"];\n'));
                Zi(g, f)
            });
            b[s]("}\n");
            return U[wb](i, b)
        },
        gj = function(a, b) {
            var c = fa[Ma](a);
            if (c) {
                var d = new hh(c);
                jh(d, d, b)
            } else Wg("syn.dna.dispatchEvent: Cannot find view ", a)
        },
        hj = function(a, b, c) {
            var d = fa[Ma](a);
            if (d) {
                var f = new hh(d);
                f[I](b, c);
                f.g()
            } else Wg("syn.dna.setProperty: Cannot find view ", a)
        };
    Q("goog.now", ac);
    Q("syn.dna.toDot", fj);
    Q("syn.dna.render", cj);
    Q("syn.dna.unrender", ej);
    Q("syn.dna.verify", $i);
    Q("syn.dna.setProperty", hj);
    Q("syn.dna.dispatchEvent", gj);
    Q("syn.IMG_TAG_PROPERTIES", Mg);
    Q("syn.getGoogleAnalyticsId", Dg);
    Q("syn.setGoogleAnalyticsId", Cg);
    Q("syn.setURLParameter", ah);
    Q("syn.logger.setLevel", Ug);
    Q("syn.logger.info", Vg);
    Q("syn.logger.warn", Wg);
    Q("syn.logger.error", Xg);
    Q("yttv.isSupportedBrowserOS", Bh);
    Q("yttv.isSupportedFlashVersion", Ch);
    Q("yttv.resizeDocument", Ah);
    Q("yttv.config", $);
    Q("yttv.config.loadPreferences", $.Th);
    Q("yttv.config.savePreferences", $.Pi);
    Rg("syn-view-image", Si);
    Rg("syn-view-pagecount", Vi);
    Rg("syn-view-textarea", Wi);
    Rg("yttv-view-browsethumb", Xh);
    Rg("yttv-view-image", Si);
    Rg("yttv-view-input", Ti);
    Rg("yttv-view-input2", Ti);
    Rg("yttv-view-rating", Yh);
    Rg("yttv-view-relatedthumb", Xh);
    Rg("yttv-view-text", Ui);
    Rg("yttv-view-wrappingtext", Ui);
    Rg("yttv-view-textarea", Wi);
    Y("syn-control-activate_on_click", $h);
    Y("syn-control-activate_on_event", ai);
    Y("syn-control-activate_on_hover", bi);
    Y("syn-control-activate_on_key", di);
    Y("syn-control-activate_once", ei);
    Y("syn-control-activate", Zh);
    Y("syn-control-active_set", fi);
    Y("syn-control-ajax_request", kh);
    Y("syn-control-cache_input", gi);
    Y("syn-control-change_style_on_mouse_event", hi);
    Y("syn-control-check_properties", ii);
    Y("syn-control-clear_cache", ji);
    Y("syn-control-deactivate", ki);
    Y("syn-control-debug_watch", oi);
    Y("syn-control-debug", li);
    Y("syn-control-event_on_event", pi);
    Y("syn-control-ga_track_event", qi);
    Y("syn-control-ga_track_pageview", ri);
    Y("syn-control-ga_track_time", si);
    Y("syn-control-hide", ti);
    Y("syn-control-history", yi);
    Y("syn-control-link", Ai);
    Y("syn-control-on_event", Bi);
    Y("syn-control-page", Jh);
    Y("syn-control-redirect", Ci);
    Y("syn-control-scroll", Di);
    Y("syn-control-set_properties", Ei);
    Y("syn-control-set_style_on_mouse_down", Hi);
    Y("syn-control-set_style", Fi);
    Y("syn-control-set_style_on_property", Ii);
    Y("syn-control-set_style_on_event", Gi);
    Y("syn-control-set_value_on_checked", Ji);
    Y("syn-control-set_visible_on_hover", Li);
    Y("syn-control-set_visible", Ki);
    Y("syn-control-show", Mi);
    Y("syn-control-switch", Ni);
    Y("syn-control-toggle_style_on_mouse_down", Oi);
    Y("syn-control-update_on_resize", Ri);
    Y("syn-control-update", Pi);
    Y("yttv-control-favorite", Dh);
    Y("yttv-control-flag", Eh);
    Y("yttv-control-login", Gh);
    Y("yttv-control-logout", Hh);
    Y("yttv-control-page", Kh);
    Y("yttv-control-scale_on_resize", Lh);
    Y("yttv-control-share", Mh);
    Y("yttv-control-watch", Uh);

}
/*
     FILE ARCHIVED ON 02:22:28 Mar 15, 2012 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:27:25 Nov 22, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.574
  exclusion.robots: 0.053
  exclusion.robots.policy: 0.04
  esindex: 0.011
  cdx.remote: 8.187
  LoadShardBlock: 106.471 (3)
  PetaboxLoader3.datanode: 80.743 (4)
  load_resource: 168.387
  PetaboxLoader3.resolve: 112.595
*/