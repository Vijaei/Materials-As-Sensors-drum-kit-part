/*
   DIGF 2004 Atelier 1
   Kate Hartman
   Experiment 3 - Study 4
   Arduino to P5.js - sending value for (3) switch3s
   Based on based on the Serial Input to P5.js Lab on the ITP Physical Computing site: 
   https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
   */

  var serial; // variable to hold an instance of the serialport library
  var portName = 'COM3';  // fill in your serial
  var inData;                             // for incoming serial
  var switch1;
  var switch2;
  var switch3;
  var switch4;
  var switch5
  let hiPlaying = false;
  let kickPlaying = false;
  let snarePlaying = false;
  let lowTomPlaying = false;
  let highTomPlaying = false;
  var thunderstorm = [];
  
  function preload() {
    hi_hat = loadSound('sounds/hi_hat.mp3');
    kick = loadSound('sounds/kick.mp3');
    snare = loadSound('sounds/snare.wav');
    lowTom = loadSound("sounds/lowTom.wav");
    highTom = loadSound("sounds/highTom.wav");

  }

function setup() {
  createCanvas(windowWidth, 800);
  background('black');
  stroke('red');
  background(188);


  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
 serial.list(); // list the serial ports
 serial.open(portName);              // open a serial port
}

function draw() {
  for(var i = 0; i < thunderstorm.length; i++){
    thunderstorm[i].move();
    thunderstorm[i].display();
  }
  background(0, 0, 0, 10);

    if(switch1==0){
      
      if(!hiPlaying) {
        
        fill(random(100, 255), random(100, 255), random(100,255)); 
        hi_hat.play();
        hiPlaying = true;
        thunderstorm.push(new thunderbolt());
        //ellipse(width/2, height/2, 150, 150);

      } 

    }else{
      fill(255, 255, 255);
      hiPlaying = false;
    }
  
   //ellipse(width/2, height/2, 100, 100);

    if(switch2==0){
      
      
      if(!kickPlaying) {
        
        fill(random(100, 255), random(100, 255), random(100,255)); 
        kick.play();
        kickPlaying = true;
        thunderstorm.push(new thunderbolt());
        //ellipse(width/3, height/2, 150, 150);

      } 
    }else{
      fill(255, 255, 255);
      kickPlaying = false;
    }

   //ellipse(width/3, height/2, 100, 100);

    if(switch3==0){
      
      
      if(!snarePlaying) {
        
        snare.play();
        fill(random(100, 255), random(100, 255), random(100,255)); 
        snarePlaying = true;
        thunderstorm.push(new thunderbolt());
        //ellipse((width/3)*2, height/2, 150, 150);

      } 

    }else{
      fill(255, 255, 255);
      snarePlaying = false;
    }
    
    
    if(switch4==0){
      
      if(!lowTomPlaying) {
        
        fill(random(100, 255), random(100, 255), random(100,255)); 
        lowTom.play();
        lowTomPlaying = true;
        thunderstorm.push(new thunderbolt());
        //ellipse(width/2, height/2, 150, 150);

      } 

    }else{
      fill(255, 255, 255);
      lowTomPlaying = false;
    }
  
   //ellipse(width/2, height/2, 100, 100);

    if(switch5==0){
      
      
      if(!highTomPlaying) {
        
        fill(random(100, 255), random(100, 255), random(100,255)); 
        highTom.play();
        highTomPlaying = true;
        thunderstorm.push(new thunderbolt());
        //ellipse(width/3, height/2, 150, 150);

      } 
    }else{
      fill(255, 255, 255);
      highTomPlaying = false;
    }

   //ellipse((width/3)*2, height/2, 100, 100);
    
  

}

function mousePressed(){
  thunderstorm.push(new thunderbolt());
}



 
 function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
 
  //check to see that there's actually a string there:
  if (inString.length > 0 ) {
    var sensors = split(inString, ',');            // split the string on the commas
    if (sensors.length > 4) {                      // if there are three elements
      switch1 = sensors[0];  
      switch2 = sensors[1]; 
      switch3 = sensors[2];
      switch4 = sensors[3]; 
      switch5 = sensors[4];  
    }
  }
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}


// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 console.log(i + " " + portList[i]);
 }
}

function thunderbolt(){
  this.xcord = 400;
  this.ycord = -20;
  this.width = random(15, 25);
  this.speed = random(5, 10);
  

  this.move = function(){
    this.ycord += 10;
    this.xcord += random(-10, 10);
  }

  this.display = function(){
    fill('red');
    stroke('red');
    ellipse(this.xcord, this.ycord, this.width);
    if(this.ycord >= 850){
      this.xcord = this.xcord;
      ellipse(this.xcord, this.ycord, random(125, 150));
    }
  }
}
