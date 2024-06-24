#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <SPIFFS.h>

// Configuración de WiFi
const char* ssid = "your_SSID";
const char* password = "your_PASSWORD";

// Pines para el driver L298
#define IN1 32
#define IN2 33
#define IN3 25
#define IN4 26
#define ENA 14
#define ENB 27

// Configuración del servidor web
AsyncWebServer server(80);

// Función para iniciar los motores
void startMotors() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  analogWrite(ENA, 255);  // Velocidad máxima
  analogWrite(ENB, 255);  // Velocidad máxima
}

// Función para parar los motores
void stopMotors() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
  analogWrite(ENA, 0);
  analogWrite(ENB, 0);
}

void setup() {
  // Inicializar la conexión WiFi
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Configuración de los pines del L298
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  pinMode(ENA, OUTPUT);
  pinMode(ENB, OUTPUT);

  // Inicializar SPIFFS
  if (!SPIFFS.begin(true)) {
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }

  // Definir los endpoints
  server.on("/start", HTTP_GET, [](AsyncWebServerRequest *request){
    startMotors();
    request->send(200, "text/plain", "Motors started");
  });

  server.on("/stop", HTTP_GET, [](AsyncWebServerRequest *request){
    stopMotors();
    request->send(200, "text/plain", "Motors stopped");
  });

  server.on("/upload", HTTP_POST, [](AsyncWebServerRequest *request){
    request->send(200);
  }, handleFileUpload);

  // Iniciar el servidor
  server.begin();
}

void loop() {
  // No se necesita código aquí
}

void handleFileUpload(AsyncWebServerRequest *request, String filename, size_t index, uint8_t *data, size_t len, bool final){
  if(!index){
    Serial.printf("UploadStart: %s\n", filename.c_str());
    if (!SPIFFS.exists("/" + filename)) {
      File file = SPIFFS.open("/" + filename, FILE_WRITE);
      if (!file) {
        Serial.println("Failed to create file");
        return;
      }
      file.close();
    }
  }
  File file = SPIFFS.open("/" + filename, FILE_APPEND);
  if (file) {
    if (file.write(data, len) != len) {
      Serial.println("Failed to write to file");
    }
    file.close();
  }
  if(final){
    Serial.printf("UploadEnd: %s (%u)\n", filename.c_str(), index + len);
  }
}
