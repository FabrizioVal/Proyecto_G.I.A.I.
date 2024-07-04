import cv2
import numpy as np
from PIL import Image
from ultralytics import YOLO
import matplotlib.pyplot as plt

# Cargar un modelo preentrenado
model = YOLO('best.pt')

# Cargar la imagen
image_path = './train/images/WIN_20240623_12_51_54_Pro.jpg'
image = Image.open(image_path)

# Realizar la detección
results = model.predict(source=image, save=True)

# Convertir la imagen a un formato compatible con OpenCV
image_cv2 = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

# Dibujar las cajas de detección en la imagen
for result in results:
    boxes = result.boxes
    for box in boxes:
        conf = box.conf.item()
        if conf >  0.9:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            cls = int(box.cls.item())  # Convertir el tensor a un entero
            conf = box.conf.item()  # Convertir el tensor a un número de punto flotante
            cv2.rectangle(image_cv2, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(image_cv2, f"{cls}: {conf:.2f}", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

# Mostrar la imagen con las detecciones
plt.imshow(cv2.cvtColor(image_cv2, cv2.COLOR_BGR2RGB))
plt.show()