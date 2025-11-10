// ==UserScript==
// @name         deck
// @description  weird thing i made
// @author       Banjo
// @match        https://eracast.cc/
// @icon         https://s.ytimg.com/yts/img/testtube/testtube-intro-card-img-vflIwLdGn.png
// @grant        none
// @license      Banjo
// @version 0.0.3.2025.11.10
// @namespace https://greasyfork.org/users/1069905
// @downloadURL https://cmd-hue.github.io/deck/deck.user.js
// @updateURL https://cmd-hue.github.io/deck/deck.user.js
// ==/UserScript==
var applat = function() {
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
};
setInterval(applat(), 1000);
