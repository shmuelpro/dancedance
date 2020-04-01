var { decode } = require("./padCodes")
var usb = require('usb')
const VENDOR = 2883;
const PRODUCT = 1;


exports.startPad = (setState)=>{
    var device = usb.findByIds(VENDOR, PRODUCT);

    device.open();
    const i = device.interface(0);
    i.claim();
    const endpoint = i.endpoints[0]
    console.log("starting up pad")
    
  
    var padState = 0;
    
    
    
    endpoint.startPoll(1, 8);
    endpoint.on("data", function (dataBuf) {
        let dataArr = Array.prototype.slice.call(new Uint8Array(dataBuf, 0, 8)); // convert buffer to array
        var nState = decode(dataArr);
        if (padState != nState) {
            padState = nState;
            setState(padState)
        }
    
        //  console.log( `data byte 3 is ${dataArr[3]}` ); // print data byte 3
    })
    
    
    
    endpoint.on("error", function (data) {
        console.log(data)
    })
    endpoint.on("end", function (data) {
        console.log("ended")
    })
}

