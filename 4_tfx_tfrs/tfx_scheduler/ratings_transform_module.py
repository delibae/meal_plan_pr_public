
import tensorflow as tf
import tensorflow_transform as tft
import pdb
import numpy as np
from typing import Dict, List, Text, Any

NUM_OOV_BUCKETS = 1

def preprocessing_fn(inputs: Dict[Text, Any]) -> Dict[Text, Any]:
  # We only want the user ID and the movie title, but we also need vocabularies
  # for both of them.  The vocabularies aren't features, they're only used by
  # the lookup.
  outputs = {}
  # print(inputs['user_id'])
  # outputs['user_id'] = tf.transpose(tft.sparse_tensor_to_dense_with_shape(inputs['user_id'], [None, 1], '-1'))
  # outputs['food_name'] = tf.transpose(tft.sparse_tensor_to_dense_with_shape(inputs['food_name'], [None, 1], '-1'))
  # outputs['gender'] =tf.transpose(tft.sparse_tensor_to_dense_with_shape(inputs['gender'], [None, 1], '-1'))
  # signature_dict = { "user_id": tf.TensorSpec(shape=(None,), dtype=tf.string, name="user_id"),
  #                  "gender": tf.TensorSpec(shape=(None,), dtype=tf.string, name="gender") }
  outputs['user_id'] = tft.sparse_tensor_to_dense_with_shape(inputs['user_id'], [None, 1], '-1')
  outputs['food_name'] = tft.sparse_tensor_to_dense_with_shape(inputs['food_name'], [None, 1], '-1')
  outputs['gender'] = tft.sparse_tensor_to_dense_with_shape(inputs['gender'], [None, 1], '-1')
  outputs['age'] = tft.sparse_tensor_to_dense_with_shape(inputs['age'], [None, 1], -1)

  tft.compute_and_apply_vocabulary(
      inputs['user_id'],
      num_oov_buckets=NUM_OOV_BUCKETS,
      vocab_filename='user_id_vocab')

  tft.compute_and_apply_vocabulary(
      inputs['food_name'],
      num_oov_buckets=NUM_OOV_BUCKETS,
      vocab_filename='food_name_vocab')

  tft.compute_and_apply_vocabulary(
    inputs['gender'],
    num_oov_buckets=NUM_OOV_BUCKETS,
    vocab_filename='gender_name_vocab')

  return outputs
