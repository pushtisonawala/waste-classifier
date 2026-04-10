from tensorflow.keras.preprocessing.image import ImageDataGenerator

datagen = ImageDataGenerator(rescale=1./255)
data = datagen.flow_from_directory('datasets', target_size=(224,224))
print(data.class_indices)