(async function () {
  // 🔄 Multi-API fallback for IP data
  let ipData;
  try {
    ipData = await fetch('https://ipinfo.io/json').then(res => res.json());
  } catch (e1) {
    try {
      ipData = await fetch('https://ipapi.co/json').then(res => res.json());
    } catch (e2) {
      try {
        ipData = await fetch('https://ipwho.is/').then(res => res.json());
      } catch (e3) {
        try {
          ipData = await fetch('https://geolocation-db.com/json/').then(res => res.json());
        } catch (e4) {
          console.error("❌ All IP APIs failed:", e1, e2, e3, e4);
          return;
        }
      }
    }
  }

  // 🧠 Timezone comparison logic
  const deviceZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const ipZone = ipData.timezone || ipData.time_zone || ipData.location?.timezone || "";

  const cleanDeviceZone = deviceZone.trim().toLowerCase();
  const cleanIPZone = ipZone.trim().toLowerCase();

  const zoneMatch =
    cleanDeviceZone === cleanIPZone ||
    (cleanDeviceZone.includes("kolkata") && cleanIPZone.includes("calcutta")) ||
    (cleanDeviceZone.includes("calcutta") && cleanIPZone.includes("kolkata")) ||
    (cleanDeviceZone.includes("hebron") && cleanIPZone.includes("jerusalem")) ||
    (cleanDeviceZone.includes("gaza") && cleanIPZone.includes("jerusalem")) ||
    (cleanDeviceZone.includes("jerusalem") &&
      (cleanIPZone.includes("hebron") || cleanIPZone.includes("gaza")));

  if (!zoneMatch) {
    localStorage.setItem('vpnRedirectSource', 'novpn.js');
    window.location.href = "https://cmd-hue.github.io/vpn-detected/";
  } else {
    console.log("No VPN detected.");
  }
})();