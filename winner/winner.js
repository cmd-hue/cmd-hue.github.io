const webhookURL = "https://discord.com/api/webhooks/1456815949226184826/Og2GLHyTg93iLH5-VHlbDRWEtRV_6KbYK9zelW59aiWRq_od8V6AaPbHat3gWqWCUHu6";

function winner(a) {
    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: a
        })
    })
        .then(res => {
            if (!res.ok) throw new Error("Failed to send");
            console.log("Sent: egg");
        })
        .catch(err => console.error(err));
}