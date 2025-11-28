const bannedASNs = {
    "AS56789": "AbuseIPDB listing",
    "AS58519": "Cowrie Honeypot: 5 unauthorised SSH/Telnet login attempts between 2025-11-28T18:48:22Z and 2025-11-28T18:52:46Z",
    "AS136907": "Known VPN provider",
    "AS20473": "Known VPN provider",
    "AS397086": "Known VPN provider",
    "AS45102": "Known VPN provider",
    "AS13335": "Cloudflare ASN - block if abusing",
    "AS16276": "Known VPN provider",
    "AS14061": "Known VPN provider",
    "AS174": "Cogent Communications - block if abusing",
    "AS81513": "Known Bait Shop",
    "AS11878": "fixtux // vm blocked because guhcdn's ip has been banned",
    "AS24940": "Known VPN provider",
    "AS9009": "M247 VPN hosting",
    "AS14061": "DigitalOcean often used by VPN/proxy",
    "AS16276": "OVH servers frequently used by VPNs",
    "AS20473": "Vultr infra used by VPN/proxy services",
    "AS13335": "Cloudflare WARP egress",
    "AS16509": "Amazon AWS used by VPN/proxy apps",
    "AS20738": "Hostinger infra used by VPN endpoints",
    "AS54600": "Private Internet Access VPN",
    "AS49544": "TigerVPN",
    "AS20860": "NordVPN / Nordsecurity infra",
    "AS201011": "Windscribe",
    "AS397270": "Surfshark",
    "AS60068": "TorGuard",
    "AS31798": "CyberGhost",
    "AS8100": "QuadraNet used for VPN hosting",
    "AS60011": "Perfect Privacy VPN"
};

fetch("https://ipinfo.io/json")
    .then(r => r.json())
    .then(data => {
        let asn = data.org;

        if (!asn) return;

        asn = asn.split(" ")[0];

        if (bannedASNs[asn]) {
            const reason = encodeURIComponent(bannedASNs[asn]);
            window.location.href =
              `https://cmd-hue.github.io/asnblock?reason=${reason}`;
        }
    })
    .catch(err => console.error("ASN check failed:", err));