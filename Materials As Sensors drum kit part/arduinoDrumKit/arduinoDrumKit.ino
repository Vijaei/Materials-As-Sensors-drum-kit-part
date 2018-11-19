/*
   DIGF 2004 Atelier 1
   Kate Hartman
   Experiment 3 - Study 7
   Arduino to P5.js or Processing - sending value for (3) analog sensors

   Circuit: 
   resistive materials (sensors) connected to pins A0, A1, A2 using voltage divider circuits  
*/

int sensor1val = A0;
int sensor2val = A1;
int sensor3val = A2;

void setup() {
  //start serial connection
  Serial.begin(9600);
}

void loop() {
  // read the sensor value
  sensor1val = analogRead(0);
  // print out the sensor value
  Serial.print(sensor1val);
  // print a comma to separate the values
  Serial.print(",");

  // read the sensor value
  sensor2val = analogRead(1);
  // print out the sensor value
  Serial.print(sensor2val);
  // print a comma to separate the values
  Serial.print(",");

  // read the sensor value
  sensor3val = analogRead(2);
  // print out the sensor value and add a line break
  Serial.println(sensor3val);

  delay(1); // the delay is necessary for the serial communication


}