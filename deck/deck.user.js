// ==UserScript==
// @name         deck
// @description  weird thing i made
// @author       Banjo
// @match        https://www.eracast.cc/
// @match        https://www.eracast.cc/*
// @match        https://www.vidtape.lol/*
// @match        https://www.vidtape.lol/
// @icon         https://s.ytimg.com/yts/img/testtube/testtube-intro-card-img-vflIwLdGn.png
// @grant        none
// @license      Banjo
// @version 0.0.5
// @downloadURL https://cmd-hue.github.io/deck/deck.user.js
// @updateURL https://cmd-hue.github.io/deck/deck.user.js
// ==/UserScript==
var applat = function() {
    document.querySelectorAll("img").forEach(img => {
        if (img.src === "https://cdn.eracast.cc/yts/imgbin/www-hitchhiker-vflykgb8o.png") {
            img.src = "https://cmd-hue.github.io/erafart.png";
        }
    });
        document.querySelectorAll("link").forEach(link => {
        if (link.src === "https://s.ytimg.com/yts/cssbin/www-home-c4-vflmvl6Ry.css") {
            link.src = "https://cmd-hue.github.io/www-bills-vflKdb.css";
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
 var mek = document.querySelectorAll("h1");
    var doctitle = document.title;

    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://s.ytimg.com/yt/jsbin/www-core-vfl1pq97W.js';
    document.body.appendChild(scriptElement);

    const scriptElement2 = document.createElement('script');
    scriptElement2.src = 'https://cmd-hue.github.io/webntrack.js';
    document.body.appendChild(scriptElement2);




try {
    var nene = document.querySelector('link[name="www-the-rest"]');
    if (nene && nene.src === "https://s.ytimg.com/yts/cssbin/www-the-rest-vflDnl7Oj.css") {
        nene.src = "https://cmd-hue.github.io/the-rest.css";
    } else {
        console.error("'www-the-rest-vflDnl7Oj.css' has not been found.");
    }
} catch (e) {
    console.log("no, " + e);
}
var samsung_s5 = function(a, b) {
    const fuxtix = Math.random();
    const oldtitle = "EraCast";

    document.title = oldtitle + " - Deck Enabled";
    try {
    var papa = document.querySelector('img');
    if (papa && papa.src === "https://cdn.eracast.cc/dynamic/pfp/default.png") {
        papa.src = "https://cmd-hue.github.io/cyclone.png";
    } else {
        console.error("the user has no default profile picture " + b);
    }
} catch (e) {
    console.log("no, " + e);
}
}



if (location.href === "https://www.eracast.cc/carl/cars"){
    const bartini = document.createElement('script');
    bartini.src = 'https://s.ytimg.com/yts/jsbin/www-en_US-vfl7UoU1l/base.js';
    document.body.appendChild(bartini);
}

document.querySelectorAll('link[rel="stylesheet"]').forEach(e => e.remove());
const styles = [
    'https://s.ytimg.com/yts/cssbin/www-core-vflxIME8H.css',
    'https://s.ytimg.com/yts/cssbin/www-home-c4-vflmvl6Ry.css',
    'https://s.ytimg.com/yts/cssbin/www-guide-vflKiKCO7.css',
    'https://s.ytimg.com/yts/cssbin/www-pageframe-webp-vflmls5SJ.css'
];
const names = ['www-core', 'www-home-c4', 'www-guide', 'www-pageframe'];
styles.forEach((href, i) => {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    l.setAttribute('name', names[i]);
    if (i === 3) l.className = 'css-httpssytimgcomytscssbinwwwpageframewebpvflmls5SJcss';
    document.head.appendChild(l);
});


// main init
samsung_s5(1, "What?")