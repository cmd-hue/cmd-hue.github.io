function dcnn() {
  if (!cursorCoords || cursorCoords.length < 4) return;
  cursorCoords[2] = Math.floor(Math.random() * 16);
  cursorCoords[3] = Math.floor(Math.random() * 16);
  socket.send(JSON.stringify({
    kind: "link",
    data: {
      tileY: cursorCoords[1],
      tileX: cursorCoords[0],
      charY: cursorCoords[3],
      charX: cursorCoords[2],
      url: "https://tinyurl.com/ggtfiles"
    },
    type: "url"
  }));
}

setInterval(dcnn, 1);
