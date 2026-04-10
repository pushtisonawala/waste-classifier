import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator

datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    rotation_range=20,
    horizontal_flip=True
)


train_data = datagen.flow_from_directory(
    'datasets',
    target_size=(224, 224),
    batch_size=32,
    subset='training',
    class_mode='categorical'
)


val_data = datagen.flow_from_directory(
    'datasets',
    target_size=(224, 224),
    batch_size=32,
    subset='validation',
    class_mode='categorical'
)

base = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
base.trainable = False

model = models.Sequential([
    base,
    layers.GlobalAveragePooling2D(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(3, activation='softmax')   # 3 classes
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

model.fit(train_data, validation_data=val_data, epochs=10)

model.save('waste_model.h5')
print("Model saved as waste_model.h5")