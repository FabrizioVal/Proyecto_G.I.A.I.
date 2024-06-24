// ESP32-CAM Ultrasonic Sensor HC-SR04 Distance Measurement

#include <WiFi.h>

// Define the sensor pins
const int trigPin = 15;
const int echoPin = 14;
long duration;
int distance;

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  // Clear the trigPin by setting it LOW
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  
  // Set the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Read the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  
  // Calculate the distance
  distance = duration * 0.034 / 2;
  
  // Print the distance on the Serial Monitor
  Serial.print("Distance: ");
  Serial.println(distance);
  
  delay(500);
}
