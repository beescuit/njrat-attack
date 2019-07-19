# Attacking Njrat servers
Hi! this is a set of NodeJS scripts that can be used to attack Njrat servers

## Screenshots

### normalclient.js
![gif of normalclient.js in action](https://i.bee.fail/O2S.gif)

### gif.js
![gif of gif.js in action](https://i.bee.fail/i7W.gif)

### flood.js
![gif of flood.js in action](https://i.bee.fail/CW0.gif)

## Protocol
Njrat uses a TCP socket to communicate to it's server, here's a (not complete) description of some of its packets

Packets are sent in the following pattern: `(COMMAND)|'|'|argument1|'|'|argument2|'|'|...`

| Command | Function                                                                      | Arguments (in order)                                                                                               |
|---------|-------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| ll      | Identifies the client. Is sent at the start of the connection                 | base64(Name), PC, User, Install date, (idk), OS, Webcam avaliability, Version, Ping, base64(Current window), (idk) |
| CAP     | Sends the image that appears in the "screen" column of the table              | (JPEG buffer)                                                                                                      |
| kl      | Opens up the keylogger window in the server (doesn't need user interaction!!) | base64(text)                                                                                                       |