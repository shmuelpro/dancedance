var usb = require('usb')




const VENDOR  = 2883;
const PRODUCT = 1;

var device = usb.findByIds(VENDOR,PRODUCT);

device.open();
const i = device.interface(0);
i.claim();
const endpoint = i.endpoints[0]
console.log("starting up")

console.log(endpoint.direction)


endpoint.startPoll( 1,8);
endpoint.on("data", function(dataBuf)
{
   let dataArr = Array.prototype.slice.call(new Uint8Array(dataBuf, 0, 8)); // convert buffer to array
 console.log(dataArr)
 //  console.log( `data byte 3 is ${dataArr[3]}` ); // print data byte 3
})



endpoint.on("error",function(data){
    console.log(data)
})
endpoint.on("end",function(data){
    console.log("ended")
})

