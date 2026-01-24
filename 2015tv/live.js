window.labels = {
    'default': ''
};
(function() {
    var b = window.labels;
    window.jstiming && window.jstiming.load && window.jstiming.load.tick("ld_s");
    var c = window.devjs
      , e = /[?&]debugjs=1/.exec(window.location.href)
      , f = /[?&]localPlayer=1/.exec(window.location.href)
      , g = /[?&]mediaDiagnostics=1/.exec(window.location.href)
      , h = window.local_label
      , k = /[?&]reversePairingCode=/.exec(window.location.href)
      , l = /[?&]launch=preload/.exec(window.location.href)
      , m = /[?&]v=[\w\+\/\-_=]+/.exec(window.location.href)
      , n = "Cobalt" == window.environment.browser
      , p = ("Steel" == window.environment.browser || n) && !e && !c;
    window.label = h ? h : b && b["default"] ? b["default"] : "";
    var q = window.appRoot + window.label, r, t = !1, u = [];
    window.resetTimeout = function() {
        window.clearTimeout(r);
        t || (r = window.setTimeout(function() {
            var a = "local:///network_failure.html";
            n && (a = "h5vcc://network-failure?retry-url=" + encodeURIComponent(window.location.href.split("#")[0]));
            window.location.replace(a)
        }, 4E4))
    }
    ;
    p && (window.resetTimeout(),
    window.applicationLoaded = function() {
        t = !0;
        window.clearTimeout(r)
    }
    );
    function v(a) {
        if (n) {
            var d = document.createElement("script");
            d.setAttribute("src", a);
            document.body.appendChild(d)
        } else
            document.write('<script src="' + a + '">\x3c/script>');
        p && w("resetTimeout();")
    }
    function w(a) {
        if (n) {
            var d = document.createElement("script");
            d.innerHTML = a;
            u.push(d)
        } else
            document.write("<script>" + a + "\x3c/script>")
    }
    function x(a) {
        var d = document.createElement("link");
        d.setAttribute("rel", "stylesheet");
        d.setAttribute("type", "text/css");
        d.setAttribute("href", a);
        document.head.appendChild(d)
    }
    window.initializeOrRedirect = function(a) {
        window.jstiming.load.tick("js_r");
        yt && yt.tv && yt.tv.initializer ? yt.tv.initializer(a) : alert(a)
    }
    ;
    f && (window.environment.player_url = e || c ? "/video/youtube/src/web/javascript/debug-tv-player-en_US.js" : "/video/youtube/src/web/javascript/tv-player-en_US.js");
    window.load_steel_api && v(q + "/api-compiled.js");
    if (c) {
        window.CLOSURE_BASE_PATH = "/javascript/closure/";
        var y = window.environment
          , z = "Google" == y.brand && "Eureka" == y.model;
        window.loadStylesheets = function() {
            window.h5CssList.forEach(x)
        }
        ;
        v(q + "/lasagna-parse.js");
        v(CLOSURE_BASE_PATH + "base.js");
        v("/i18n/input/javascript/closure_deps.js");
        v("/video/youtube/src/web/javascript/deps-runfiles.js");
        v(q + "/deps.js");
        v(q + "/js/base_initializer.js");
        z ? v(q + "/js/chromecast_initializer.js") : v(q + "/js/initializer.js");
        v(q + "/css-list.js");
        w("loadStylesheets()")
    } else
        e ? (window.CLOSURE_NO_DEPS = !0,
        x(q + "./app-prod.css"),
        v(q + "./app-concat-bundle.js")) : (x(q + "./app-prod.css"),
        v(q + window.environment.tv_binary),
        (k || l || m) && v(window.environment.player_url));
    window.checkBrokenLabel = function() {
        "undefined" == typeof yt && h && (window.location.href = window.location.href.replace(/([?&])label=[^&]+&?/, "$1stick=0&"))
    }
    ;
    w("checkBrokenLabel()");
    g && (e || c ? v(q + "/modules/media-diagnostics-debug.js") : v(q + "/modules/media-diagnostics.js"));
    w("initializeOrRedirect('" + q + "');");
    n && (window.onload = function() {
        for (var a = 0, d = u.length; a < d; ++a)
            document.body.appendChild(u[a])
    }
    );
}
)();
