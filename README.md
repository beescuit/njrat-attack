# Attacking Njrat servers
Hi! this is a set of NodeJS scripts that can be used to attack Njrat servers

## Screenshots

These screenshots are from the files in the `examples/` folder, which contains some PoCs of stuff that you can do with these scripts

### normalclient.js
This simulates a normal njrat client
![gif of normalclient.js in action](https://i.bee.fail/O2S.gif)

### gif.js
This can be used to play a GIF file njrat's screenshot area
![gif of gif.js in action](https://i.bee.fail/i7W.gif)

### flood.js
This can be used as a DoS tool, results in 100% disk and CPU usage after some seconds, rendering NJRat unusable.
![gif of flood.js in action](https://i.bee.fail/CW0.gif)

## Protocol
Njrat uses a TCP socket to communicate to it's server, here's a (not complete) description of some of its packets

Packets are sent in the following pattern: `(COMMAND)|'|'|argument1|'|'|argument2|'|'|...`

| Command | Function                                                                      | Arguments (in order)                                                                                               |
|---------|-------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| ll      | Identifies the client. Is sent at the start of the connection                 | base64(Name), PC, User, Install date, (idk), OS, Webcam avaliability, Version, Ping, base64(Current window), (idk) |
| CAP     | Sends the image that appears in the "screen" column of the table              | (JPEG buffer)                                                                                                      |
| kl      | Opens up the keylogger window in the server (doesn't need user interaction!!) | base64(text)                                                                                                       |