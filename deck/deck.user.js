// ==UserScript==
// @name         deck
// @description  weird thing i made
// @author       Banjo
// @match        https://eracast.cc/
// @icon         https://s.ytimg.com/yts/img/testtube/testtube-intro-card-img-vflIwLdGn.png
// @grant        none
// @license      Banjo
// @version 0.0.4.2025.11.10
// @downloadURL https://cmd-hue.github.io/deck/deck.user.js
// @updateURL https://cmd-hue.github.io/deck/deck.user.js
// ==/UserScript==
(function() {
    function applat() {
        document.querySelectorAll("img").forEach(img => {
            if (img.src === "https://cdn.eracast.cc/yts/imgbin/www-hitchhiker-vflykgb8o.png") {
                img.src = "https://cmd-hue.github.io/erafart.png";
            }
        });
        document.querySelectorAll("*").forEach(el => {
            const bg = getComputedStyle(el).backgroundImage;
            if (bg && bg.includes("https://cdn.eracast.cc/yts/imgbin/www-hitchhiker-vflykgb8o.png")) {
                el.style.backgroundImage = 'url("https://cmd-hue.github.io/erafart.png")';
            }
        });
    }

    function runWhenReady() {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setInterval(applat, 1000);
        } else {
            document.addEventListener("DOMContentLoaded", () => setInterval(applat, 1000));
        }
    }

    runWhenReady();
})();

