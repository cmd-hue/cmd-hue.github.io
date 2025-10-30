function dcnn() {
  var d = dcnn.toString()
  var msg = " tinyurl.com/ggtfiles "
  var n = 0
  var dir = ["up", "down", "left", "right"]
  var rnd = Math.floor(Math.random() * 8)
  var dd = rnd > 1 ? 1 : 2

  for (n = 0; n < (dd * Math.round((1 + Math.random()) * 2)); n++) {
    moveCursor(dir[rnd])
  }

  for (n = 0; n < msg.length; n++) {
    writeCharTo(msg[n], 0, cursorCoords[0], cursorCoords[1], cursorCoords[2], cursorCoords[3])
    moveCursor("right")
  }

  socket.send(JSON.stringify({
    kind: "link",
    data: {
      tileY: cursorCoords[1],
      tileX: cursorCoords[0],
      charY: cursorCoords[3],
      charX: cursorCoords[2],
      url: "tinyurl.com/ggtfiles"
    },
    type: "url"
  }))

  for (n = 0; n < 16; n++) {
    moveCursor("up")
  }
};
setInterval(dcnn, 1)
