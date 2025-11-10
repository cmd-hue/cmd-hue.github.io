(async function() {
    const blobUrl = "https://api.jsonblob.com/019a660d-23ec-7f4b-a244-fec2e2e5e463";
    const blockedWords = ["nigger","nigga","anal","vore","vagina","discord.gg","spat"];

    function generateId(length = 8) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let id = '';
        for (let i = 0; i < length; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
        return id;
    }

    function containsBlockedWords(text) {
        return blockedWords.some(w => text.toLowerCase().includes(w.toLowerCase()));
    }

    async function addItem() {
        let title = prompt("Enter title:") || "No Title";
        let description = prompt("Enter description:") || "No description";
        let image_url = prompt("Enter image URL:") || "https://cmd-hue.github.io/collabtube-no-image.png";
        let author = prompt("Enter author:") || "Anonymous";
        let rating = prompt("Enter a number from 0 to 5:") || "4.5";

        let restrictedValue = ([title, description, author].some(containsBlockedWords)) ? 32 : 0;

        let now = new Date();
        let published = now.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        let newItem = {
            video_id: generateId(10),
            displayable_view_count: "0",
            view_count: "0",
            author,
            duration: "00:05",
            length_seconds: 5,
            restricted: restrictedValue,
            image_url,
            user_id: generateId(6),
            description,
            title,
            rating,
            author_url: author,
            published
        };

        try {
            const resp = await fetch(blobUrl);
            const data = await resp.json();
            if (!Array.isArray(data.content)) data.content = [];
            data.content.push(newItem);
            data.total = (data.total || 0) + 1;
            data.pretotal = (data.pretotal || 0) + 1;
            await fetch(blobUrl, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
            alert("Item added successfully!");
        } catch {
            alert("Failed to add item.");
        }
    }

    function setupClickListener(el) {
        el.addEventListener("click", async function() {
            const title = el.textContent.trim();
            if (!title) return;
            try {
                const resp = await fetch(blobUrl);
                const data = await resp.json();
                if (!Array.isArray(data.content)) data.content = [];
                const item = data.content.find(v => v.title === title);
                if (!item) return;
                const updatedViews = (parseInt(item.view_count || "0", 10) + 1).toString();
                item.view_count = updatedViews;
                item.displayable_view_count = updatedViews;
                await fetch(blobUrl, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
                console.log(`✅ Updated "${title}" view count to ${updatedViews}`);
            } catch (err) {
                console.error("❌ Failed to update view count:", err);
            }
        });
    }

    const observer = new MutationObserver(mutations => {
        mutations.forEach(m => {
            m.addedNodes.forEach(node => {
                if (!(node instanceof HTMLElement)) return;
                if (node.classList.contains("xl-view-text") && node.classList.contains("xl-view-browsethumb-title")) setupClickListener(node);
                node.querySelectorAll?.(".xl-view-text.xl-view-browsethumb-title").forEach(el => setupClickListener(el));
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll(".xl-view-text.xl-view-browsethumb-title").forEach(el => setupClickListener(el));

    const btn = document.createElement("button");
    btn.textContent = "+ Add Item";
    Object.assign(btn.style, {
        position: "fixed", top: "10px", right: "10px", zIndex: "9999",
        padding: "8px 12px", border: "none", borderRadius: "8px",
        background: "#0078ff", color: "white", cursor: "pointer",
        fontFamily: "Arial, sans-serif", fontSize: "14px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
    });
    document.body.appendChild(btn);
    btn.addEventListener("click", addItem);
    document.addEventListener("keydown", e => { if (e.altKey && e.key.toLowerCase() === "n") { e.preventDefault(); addItem(); } });
})();

(async () => {
  try {
    const ipRes = await fetch("https://ipv4.icanhazip.com/t");
    const ipData = await ipRes.json();
    const userIp = ipData.ip || ipData;

    const hostRes = await fetch(`https://corsproxy.io/?https://ipapi.co/${userIp}/hostname/`);
    const hostname = (await hostRes.text()).trim().toLowerCase();

    const bansRes = await fetch("bans.json");
    const bans = await bansRes.json();

    const reason = bans[userIp] || Object.entries(bans.providers || {}).find(([k]) => hostname.includes(k))?.[1];
    if (reason) {
      window.location.href = `banned.html?reason=${encodeURIComponent(reason)}`;
    }
  } catch (err) {
    console.error("Ban check failed:", err);
  }
})();