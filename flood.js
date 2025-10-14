setInterval(() => {
    const bot = io(location.href);
    bot.emit("client", "MAIN");
    bot.emit("login", {
        passcode: "",
        name: "ME JEW",
        room: "default",
    });
    setTimeout(() => {
        bot.emit("talk", "tinyurl.com/ggtfiles");
    }, 500);
    setTimeout(2800);
}, 3000);