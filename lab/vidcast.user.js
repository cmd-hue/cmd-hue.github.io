// ==UserScript==
// @name         VidCast
// @namespace    none
// @version      1.0
// @description  mads for vidtape and betacast
// @author       Banjo
// @match        https://vidtape.lol/*
// @match        https://vidtape.lol/
// @match        https://www.betacast.org/*
// @match        https://www.betacast.org/
// @downloadURL https://cmd-hue.github.io/lab/vidcast.user.js
// @updateURL https://cmd-hue.github.io/lab/vidcast.user.js
// ==/UserScript==
var egg = document.getElementsByClassName("lohp-large-shelf-container");

if (egg.length > 0) {
    var img = egg[0].querySelector("img");  // get the first <img> inside it
    var eggimg = img.src                   // image URL
    var time = egg[0].querySelector("span.video-time");  // get the first video time inside it
    var eggtime = time.innerHTML                  // video time
}

if (egg.length > 0) {
    var title = egg[0].querySelector("a.lohp-video-link");  // get the title inside it
    var eggtitle = title.innerHTML                  // title
}
if (eggtitle && eggtitle.includes("something")) {
    console.log("VidCast Egg Found: " + eggtitle + " - " + eggimg);
}
//work in progress