# Dance Dance	

So I took an old dancedance revolution pad and used node-usb to read the data from the device. 

The Pad.js file can be used with any front end. but since its Corona time and my kid is at home I thought it would be fun for him to play with something jumping around. 

### The backend had 

- nodejs
- express
- socket.io - to communicate with the front end when the pad is clicked



### The front end

 pixi.js for the gameplay

 it uses webpack for building the files

#### These are the codes from the pad

| Select: [ 0,1,128,128,128,128,65] |                            | Start: [ 0,2,128,128,128,128,65] |
| --------------------------------- | -------------------------- | -------------------------------- |
| [4,0,128,128,128,128,65]          | [0,16,128,0,128,0,65]      | [ 2,0,128,128,128,128,65]        |
| [0,128,0,128,0,128,65]            |                            | [0,32,255,128 ,255,128,65]       |
| [1,0,128,128,128,128,65]          | [0, 64,128,255,128,255,65] | [8, 0 ,128,128,128,128,65]       |

Nothing selected: [  0,  0, 128, 128, 128, 128, 65]

combos seem to be additions of the arrays



[^Some of the assets belong to other parties. They all retain their copyright. ]: 













