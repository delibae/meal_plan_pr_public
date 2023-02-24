
import tensorflow as tf
import tensorflow_transform as tft

def preprocessing_fn(inputs):
  # We only want the movie title
  return {'food_name':inputs['food_name']}
