// ==UserScript==
// @name         deck
// @description  weird thing i made
// @author       Banjo
// @match        https://eracast.cc/
// @icon         https://s.ytimg.com/yts/img/testtube/testtube-intro-card-img-vflIwLdGn.png
// @grant        none
// @license      Banjo
// @version 0.0.1.2025.11.10
// @namespace https://greasyfork.org/users/1069905
// @downloadURL https://cmd-hue.github.io/deck/deck.user.js
// @updateURL https://cmd-hue.github.io/deck/deck.user.js
// ==/UserScript==
(async function() {
    const script = document.createElement("script");
    script.src = "https://cdn.eracast.cc/s/js/alert.js";
    script.onload = () => {
        addAlert("3", "alert.js has been loaded.");
        document.querySelectorAll("img").forEach(img => {
            if (img.src === "https://cdn.eracast.cc/yts/imgbin/www-hitchhiker-vflykgb8o.png") {
                img.src = "https://cmd-hue.github.io/erafart.png";
            }
        });
    };
    document.head.appendChild(script);
})();
