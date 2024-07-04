/*
 * Ejemplo de servidor web para ESP32-CAM
 * Realiza una solicitud a la API de JSONPlaceholder y muestra la respuesta
 */

#include <WiFi.h>
#include <WebServer.h>
#include <HTTPClient.h>

// Reemplaza con tus credenciales de WiFiFibertel-WiFi872-2.4GH
const char* ssid = "z";
const char* password = "01432638165";

WebServer server(80); // Servidor web en el puerto 80

void handleRoot() {
  String html = R"====(
<!DOCTYPE html>
<html>
<head>
  <title>Página de ESP32-CAM</title>
</head>
<body>
  <h1>¡Hola desde ESP32-CAM!</h1>
  <p>Esta es una página HTML servida por el ESP32-CAM.</p>
  <p>Dirección IP local del ESP32-CAM: )====" + WiFi.localIP().toString() + R"====(</p>
  <p>Respuesta de la API de JSONPlaceholder:</p>
  <pre>)====" + getJSONPlaceholderResponse() + R"====(</pre>
</body>
</html>
)====";

  server.send(200, "text/html", html);
}

String getJSONPlaceholderResponse() {
  HTTPClient http;
  http.begin("https://jsonplaceholder.typicode.com/posts/1");
  int httpCode = http.GET();
  String payload = httpCode > 0 ? http.getString() : "Error al obtener la respuesta";
  http.end();
  Serial.println(payload);
  getJSONPResponse();
  return payload;
}
String getJSONPResponse() {
  HTTPClient http;
  http.begin("http://192.168.0.163:1000/recibido");
  int httpCode = http.GET();
  String payload = httpCode > 0 ? http.getString() : "Error al obtener la respuesta";
  http.end();
  Serial.println(payload);
  return payload;
}
void setup() {
  Serial.begin(115200);

  // Conexión WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  Serial.println("Conectado a WiFi");

  // Imprimir dirección IP local
  Serial.print("Dirección IP local del ESP32-CAM: ");
  Serial.println(WiFi.localIP());

  // Manejador de la ruta raíz
  server.on("/", handleRoot);

  // Iniciar servidor web
  server.begin();
  Serial.println("Servidor web iniciado");
}

void loop() {
  server.handleClient();
}