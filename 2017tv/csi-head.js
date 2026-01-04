(function() {
    var a = function(e) {
            this.t = {};
            this.tick = function(e, i, d) {
                d = void 0 != d ? d : (new Date).getTime();
                this.t[e] = [d, i]
            };
            this.tick("start", null, e)
        },
        b = new a;
    window.jstiming = {
        Timer: a,
        load: b
    };
    if (window.performance && window.performance.timing) {
        var c = window.performance.timing,
            f = window.jstiming.load,
            g = c.navigationStart,
            h = c.responseStart;
        0 < g && h >= g && (f.tick("_wtsrt", void 0, g), f.tick("wtsrt_", "_wtsrt", h), f.tick("tbsd_", "wtsrt_"))
    }
    try {
        var j = null;
        window.chrome && window.chrome.csi && (j = Math.floor(window.chrome.csi().pageT), f && 0 < g && (f.tick("_tbnd", void 0, window.chrome.csi().startE), f.tick("tbnd_", "_tbnd", g)));
        null == j && window.gtbExternal && (j = window.gtbExternal.pageT());
        null == j && window.external && (j = window.external.pageT, f && 0 < g && (f.tick("_tbnd", void 0, window.external.startE), f.tick("tbnd_", "_tbnd", g)));
        j && (window.jstiming.pt = j)
    } catch (k) {};
})();