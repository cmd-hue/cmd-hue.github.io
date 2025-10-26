/* GGTroll 4 BonziWorld 1.1.3 */
/* This comes with no warranty */
function joinBot(botName, strings, roomId){
  const bot = io(location.href + "?cb=" + Math.random());

  bot.on("connect", () => {
    setTimeout(() => {
      bot.emit("client", "MAIN");
      bot.emit("login", { name: botName, room: roomId }); // passcode removed
      setTimeout(()=>bot.emit("update",{color:"blue"}),2000);

      const bubbleObserver = new MutationObserver(muts=>{
        for(const m of muts){
          for(const n of m.addedNodes){
            if(n.nodeType!==1) continue;
            if(n.classList && n.classList.contains('bubble_cont')){
              const text = (n.innerText || n.textContent || '').trim();
              if(new RegExp('\\b' + botName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '\\b','i').test(text)){
                bot.emit("talk",{text:"the chicken", type:"fact"});
                bot.disconnect();
              }
            }
          }
        }
      });
      bubbleObserver.observe(document.documentElement || document.body,{childList:true,subtree:true});

      setInterval(()=>{
        const msg = strings[Math.floor(Math.random()*strings.length)];
        const type = Math.random() < 0.5 ? "joke":"fact";
        bot.emit("talk",{text:msg,type});
      },2000);

    }, 1500); // delay before login
  });

  bot.on("disconnect", ()=> {
    joining=false;
    if(botQueue.length) startNextBot();
  });
  bot.on("connect_error", ()=> joining=false);
}
