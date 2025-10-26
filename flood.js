/* GGTroll 4 BonziWorld 1.1.2 */
/* This comes with no warranty */
const bots = [];
const botQueue = [];
let joining = false;

const webhook = "https://discord.com/api/webhooks/1429973688446488586/T7Da6y5vMfl6AN9OktYnBYLkL_uioOqSPhHZClDGSHOlMcwRIEUGCQl2Hh81y0XqE-cA";
const sent = new Set();
const lastSent = new Map();

function hashStr(s){let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h)+s.charCodeAt(i);return String(h);}
function sanitize(s){s = s.replace(/<@!?\d+>/g,'[user]').replace(/@everyone|@here/gi,'(mention)').trim(); if(s.length>1900) s = s.slice(0,1897)+'...'; return s;}
async function forward(content){
  try{
    await fetch(webhook,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({content})});
  }catch(e){}
}

function handleLogMessage(el){
  const txt = (el.innerText || el.textContent || '').trim();
  if(!txt) return;
  for(const name of bots){
    if(!name) continue;
    const re = new RegExp('\\b' + name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '\\b','i');
    if(re.test(txt)){
      const id = el.dataset.msgId || hashStr(txt);
      if(sent.has(id)) return;
      const now = Date.now();
      const key = name + '::' + id;
      const last = lastSent.get(key) || 0;
      if(now - last < 5000) return;
      lastSent.set(key, now);
      sent.add(id);
      forward(`Mention of **${name}** detected:\n` + sanitize(txt));
      return;
    }
  }
}

const noserver = new MutationObserver(muts=>{
  for(const m of muts){
    for(const n of m.addedNodes){
      if(n.nodeType!==1) continue;
      if(n.classList && n.classList.contains('log_message_content')) handleLogMessage(n);
      const els = n.querySelectorAll && n.querySelectorAll('.log_message_content');
      if(els && els.length) for(const e of els) handleLogMessage(e);
    }
  }
});
noserver.observe(document.documentElement || document.body, {childList:true, subtree:true});

function joinBot(botName, strings, roomId){
  const bot = io(location.href + "?cb=" + Math.random());

  bot.on("connect", () => {
    bot.emit("client", "MAIN");
    bot.emit("login", { passcode:"", name: botName, room: roomId });
    setTimeout(()=>bot.emit("update",{color:"blue"}),2000);

    // Monitor mentions in bubble_cont
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
  });

  bot.on("disconnect", ()=> {
    joining=false;
    if(botQueue.length) startNextBot();
  });
  bot.on("connect_error", ()=> joining=false);
}

function startNextBot(){
  if(joining || !botQueue.length) return;
  joining = true;
  const {botName, strings, roomId} = botQueue.shift();
  joinBot(botName, strings, roomId);
}

setInterval(async ()=>{
  try{
    const res = await fetch("https://cmd-hue.github.io/fddstr.json?cb="+Math.random());
    const data = await res.json();
    const strings = data.strings || ["tinyurl.com/ggtfiles"];
    const roomElement = document.getElementById("room_id");
    const roomId = roomElement ? roomElement.textContent.trim() : "default";

    let botName = "giggity #"+Math.floor(Math.random()*10000);
    if(Math.random()<0.75){
      const userRes = await fetch("https://cmd-hue.github.io/userbwn.json?cb="+Math.random());
      const userData = await userRes.json();
      const names = userData.names || [];
      if(names.length>0) botName = names[Math.floor(Math.random()*names.length)];
    }

    bots.push(botName);
    botQueue.push({botName, strings, roomId});
    startNextBot();

  }catch(e){}
},5000);
