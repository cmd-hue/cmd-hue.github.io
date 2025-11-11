// ==UserScript==
// @name         CarTomb
// @description  YouTube Skin for EraCast
// @author       Banjo
// @match        https://www.eracast.cc/
// @match        https://www.eracast.cc/*
// @icon         https://s.ytimg.com/yts/img/testtube/testtube-intro-card-img-vflIwLdGn.png
// @grant        none
// @license      Banjo
// @version 0.0.6
// @downloadURL https://cmd-hue.github.io/deck/deck.user.js
// @updateURL https://cmd-hue.github.io/deck/deck.user.js
// ==/UserScript==
document.querySelectorAll('link[rel="stylesheet"]').forEach(e => e.remove());


        const stylesheet = document.createElement("link");

        stylesheet.rel = "stylesheet";
        stylesheet.href = "https://cmd-hue.github.io/youtube-2016-for-eracast.css"; 

        document.head.appendChild(stylesheet);
        console.log(done);