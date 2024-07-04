#include <WiFi.h>
#include <WebServer.h>

WebServer server(1000);

void handleRootEndpoint() {
  String content = "";
  content += "<html>";
  content += "<div><a href=\"encender\">Encender</a></div>";
  content += "<div><a href=\"apagar\">Apagar</a></div>";
  content += "</html>";
  server.send(200, "text/html", content);
}

void handleRecibidoEndpoint() {
  server.send(200, "text/plain", "recibido CRACK");
}

void setup() {
  Serial.begin(115200);
  const char* ssid = "Fibertel-WiFi872-2.4GHz";
  const char* password = "01432638165";
  Serial.println("Desconectamos antes de conectar el WiFi");
  WiFi.disconnect();
  Serial.print("Conectando a  ");
  Serial.println(ssid);
  //Conectamos el esp a la red wifi
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  //Intentamos conectarnos a la red
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  //Si logramos conectarnos mostramos la ip a la que nos conectamos
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // Configurar los endpoints
  server.on("/", handleRootEndpoint);
  server.on("/recibido", handleRecibidoEndpoint);

  server.begin();
}

void loop() {
  server.handleClient();
  delay(100);
}