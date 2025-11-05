(function(){
  const API = "https://us.api.iheart.com/api/v3/live-meta/stream/1701/currentTrackMeta?defaultMetadata=true";
  let widget, content, img, marqueeEl, closeBtn;
  let visible = false;
  async function fetchMeta(){ try{ const r = await fetch(API, {cache:"no-store"}); if(!r.ok) return; const j = await r.json(); update(j); }catch(e){} }
  function fmtMs(ms){
    if(!ms) return "";
    const d = new Date(ms);
    return d.toLocaleString("en-US",{timeZone:"America/New_York",hour:"numeric",minute:"2-digit",second:"2-digit"});
  }
  function update(data){
    if(!data) return;
    marqueeEl.textContent = data.title + " — " + data.artist + " • " + (data.album||"");
    img.src = data.imagePath || "";
    content.querySelector(".title").textContent = data.title || "";
    content.querySelector(".artist").textContent = data.artist || "";
    content.querySelector(".album").textContent = data.album ? "Album: " + data.album : "";
    content.querySelector(".duration").textContent = data.trackDuration ? "Duration: " + Math.floor(data.trackDuration/60)+":" + String(data.trackDuration%60).padStart(2,"0") : "";
    content.querySelector(".times").textContent = fmtMs(data.startTime) + " — " + fmtMs(data.endTime);
    content.querySelector(".explicit").textContent = data.explicitLyrics ? "Explicit" : "";
  }
  function build(){
    if(widget) return;
    widget = document.createElement("div");
    widget.style.cssText = "position:fixed;right:16px;bottom:16px;width:340px;background:#111;color:#eee;border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,0.6);font-family:'Arial Narrow', Arial, sans-serif;overflow:hidden;z-index:2147483647;display:none";
    marqueeEl = document.createElement("marquee");
    marqueeEl.style.cssText = "display:block;padding:6px 10px;background:linear-gradient(90deg,#222,#111);font-weight:700";
    widget.appendChild(marqueeEl);
    closeBtn = document.createElement("button");
    closeBtn.innerHTML = "×";
    closeBtn.style.cssText = "position:absolute;right:8px;top:6px;background:transparent;border:0;color:#fff;font-size:18px;cursor:pointer";
    closeBtn.addEventListener("click",()=>toggle(false));
    widget.appendChild(closeBtn);
    const body = document.createElement("div");
    body.style.cssText = "display:flex;gap:10px;padding:10px;align-items:center";
    img = document.createElement("img");
    img.style.cssText = "width:84px;height:84px;border-radius:6px;object-fit:cover;background:#222";
    body.appendChild(img);
    content = document.createElement("div");
    content.style.cssText = "flex:1;min-width:0";
    const t = document.createElement("div"); t.className="title"; t.style.cssText="font-size:15px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis";
    const a = document.createElement("div"); a.className="artist"; a.style.cssText="font-size:13px;opacity:0.9;margin-top:4px";
    const al = document.createElement("div"); al.className="album"; al.style.cssText="font-size:12px;opacity:0.75;margin-top:6px";
    const d = document.createElement("div"); d.className="duration"; d.style.cssText="font-size:12px;opacity:0.75;margin-top:6px";
    const times = document.createElement("div"); times.className="times"; times.style.cssText="font-size:11px;opacity:0.6;margin-top:6px";
    const ex = document.createElement("div"); ex.className="explicit"; ex.style.cssText="color:#ff6b6b;font-size:12px;margin-top:6px";
    content.appendChild(t); content.appendChild(a); content.appendChild(al); content.appendChild(d); content.appendChild(times); content.appendChild(ex);
    body.appendChild(content);
    widget.appendChild(body);
    document.body.appendChild(widget);
  }
  function toggle(show){
    build();
    visible = typeof show === "boolean" ? show : !visible;
    widget.style.display = visible ? "block" : "none";
    if(visible) fetchMeta();
  }
  build();
  document.addEventListener("keydown",function(e){
    if(e.altKey && (e.key === "w" || e.key === "W")){ e.preventDefault(); toggle(); }
  });
  setInterval(fetchMeta,3000);
  fetchMeta();
})();
