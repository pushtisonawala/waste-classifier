from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import tensorflow as tf
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

model = tf.keras.models.load_model("waste_model.h5")
LABELS = ["Metal", "Trash", "Plastic"]  # <-- Use the order from check_labels.py

@app.get("/")
def health():
    return {"status": "ML service running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Only JPG/PNG allowed")

    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB").resize((224, 224))
    arr = np.expand_dims(np.array(img) / 255.0, axis=0)

    probs = model.predict(arr)[0]
    idx = int(np.argmax(probs))

    return {
        "category": LABELS[idx],
        "confidence": round(float(probs[idx]) * 100, 2),
        "all_scores": {
            LABELS[0]: round(float(probs[0]) * 100, 2),
            LABELS[1]: round(float(probs[1]) * 100, 2),
            LABELS[2]: round(float(probs[2]) * 100, 2)
        }
    }