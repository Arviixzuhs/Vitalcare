import cv2
from flask import Flask, request
import numpy as np
import requests
import pytesseract


pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
app = Flask(__name__)


@app.post("/image-to-text")
def image_to_text():

    img_url = request.json["url"]

    if not img_url:
        return "Debes ingresar la URL de una imagen."

    try:
        response_img = requests.get(img_url)

        img = cv2.imdecode(np.array(bytearray(response_img.content)), -1)

        gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        th = cv2.threshold(gray_image, 127, 255, cv2.THRESH_BINARY)[1]

        text = pytesseract.image_to_string(th, lang="spa")

        return text
    except:
        return "Ocurrió un error inesperado"


app.run()
