let rfb;

function connectedToServer(e) {
    console.log('Connection successful!');
}

function disconnectedFromServer(e) {
    document.getElementById('screen').style.display = 'none';
    document.getElementById('shutd').style.display = 'block';
}

function sendCtrlAltDel() {
    rfb.sendCtrlAltDel();
    return false;
}

function startConnection(){
    rfb = new RFB(document.getElementById('screen'), "wss://socket.computer/ws");

    rfb.addEventListener("connect", connectedToServer);
    rfb.addEventListener("disconnect", disconnectedFromServer);

    rfb.scaleViewport = true;
    rfb.background = '#000';
}

startConnection();
