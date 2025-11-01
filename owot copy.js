function dcnn() {
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
  }))}

setInterval(dcnn, 0.5);
