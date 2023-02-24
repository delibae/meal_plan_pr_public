
from typing import Dict, List, Text

import pdb

import os
import absl
import datetime
import glob
import tensorflow as tf
import tensorflow_transform as tft
import tensorflow_recommenders as tfrs

from absl import logging
from tfx.types import artifact_utils

from tfx import v1 as tfx
from tfx_bsl.coders import example_coder
from tfx_bsl.public import tfxio

import numpy as np

layer_sizes = [64,32]
INPUT_FN_BATCH_SIZE = 1

def _input_fn(file_pattern: List[Text],
              data_accessor: tfx.components.DataAccessor,
              tf_transform_output: tft.TFTransformOutput,
              batch_size: int = 200) -> tf.data.Dataset:
  """Generates features and label for tuning/training.

  Args:
    file_pattern: List of paths or patterns of input tfrecord files.
    data_accessor: DataAccessor for converting input to RecordBatch.
    tf_transform_output: A TFTransformOutput.
    batch_size: representing the number of consecutive elements of returned
      dataset to combine in a single batch

  Returns:
    A dataset that contains (features, indices) tuple where features is a
      dictionary of Tensors, and indices is a single Tensor of label indices.
  """
  try:
    return data_accessor.tf_dataset_factory(
      file_pattern,
      tfxio.TensorFlowDatasetOptions(
          batch_size=batch_size),
      tf_transform_output.transformed_metadata.schema)
  except BaseException as err:
    logging.error('######## ERROR IN _input_fn:\n{}\n###############'.format(err))

  return None

def extract_str_feature(dataset, feature_name):
  np_dataset = []
  for example in dataset:
    np_example = example_coder.ExampleToNumpyDict(example.numpy())
    np_dataset.append(np_example[feature_name][0].decode())
  return tf.data.Dataset.from_tensor_slices(np_dataset)



class UserModel(tf.keras.Model):
  
  def __init__(self,tf_transform_output, movies_uri):
    super().__init__()

    unique_user_ids = tf_transform_output.vocabulary_by_name('user_id_vocab')
    users_vocab_str = [b.decode() for b in unique_user_ids]

    unique_genders = tf_transform_output.vocabulary_by_name('gender_name_vocab')
    genders_vocab_str = [b.decode() for b in unique_genders]

    age_buckets = np.linspace(
        0, 100, num=10,
    )
    # unique_food_names = np.unique(np.concatenate(list(foods.batch(1000))))
    # unique_user_ids = np.unique(np.concatenate(list(ratings.batch(1_000).map(
    #     lambda x: x["user_id"]))))
    # unique_genders = np.unique(np.concatenate(list(ratings.batch(1_000).map(
    #     lambda x: x["gender"]))))

    self.user_embedding = tf.keras.Sequential([
        tf.keras.layers.StringLookup(
            vocabulary=unique_user_ids, mask_token=None),
        tf.keras.layers.Embedding(len(unique_user_ids) + 1, 32),
    ])
    self.gender_embedding = tf.keras.Sequential([
    tf.keras.layers.StringLookup(
        vocabulary=unique_genders, mask_token=None),
    tf.keras.layers.Embedding(len(unique_genders) + 1, 32),
    ])

    self.age_embedding = tf.keras.Sequential([
        tf.keras.layers.Discretization(age_buckets.tolist()),
        tf.keras.layers.Embedding(len(age_buckets) + 1, 32),
    ])

    # ages_artifact = movies_uri.get()[0]
    # input_dir = artifact_utils.get_split_uri([ages_artifact], 'train')
    # age_files = glob.glob(os.path.join(input_dir, '*'))
    # ages = tf.data.TFRecordDataset(age_files, compression_type="GZIP")
    # ages_dataset = extract_str_feature(ages, 'ages')
    # self.normalized_age.adapt(ages_dataset)


  def call(self, inputs):
    # Take the input dictionary, pass it through each input layer,
    # and concatenate the result.
    # print("<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    # print(tf.transpose(inputs["user_id"].shape))
    # print(tf.transpose(inputs["gender"].shape))
    # print(inputs["user_id"].shape)
    # print(inputs["gender"].shape)
    # print(self.user_embedding(inputs["user_id"]).shape)
    # print(self.user_embedding(inputs["gender"]).shape)
    # print(tf.concat([
    #     tf.transpose(self.user_embedding(inputs["user_id"])),
    #     tf.transpose(self.gender_embedding(tf.transpose(inputs["gender"])))
    # ], axis=0).shape)

    # print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.")
    # if len(dim) == 1:
    t1 = tf.squeeze(inputs["user_id"])
    t1 = self.user_embedding(t1)
    t1 = tf.reshape(t1, shape=[-1,32])

    t2 = tf.squeeze(inputs['gender'])
    t2 = self.gender_embedding(t2)
    t2 = tf.reshape(t2,shape=[-1,32])

    t3 = tf.squeeze(inputs["age"])
    t3 = self.age_embedding(t3)
    t3 = tf.reshape(t3, shape=[-1,32])
    return tf.concat([
        t1,
        t2,
        t3
    ], axis=1)
    # return tf.concat([
    #     tf.reshape(self.user_embedding(tf.squeeze(inputs["user_id"])),shape=[-1,32]),
    #     tf.reshape(self.gender_embedding(tf.squeeze(inputs["gender"])),shape=[-1,32])
    # ], axis=1)
    # else:
    #   return tf.concat([
    #       self.user_embedding(tf.squeeze(inputs["user_id"])),
    #       self.gender_embedding(tf.squeeze(inputs["gender"]))
    #   ], axis=1)

class QueryModel(tf.keras.Model):
  """Model for encoding user queries."""

  def __init__(self, tf_transform_output, movies_uri):
    """Model for encoding user queries.

    Args:
      layer_sizes:
        A list of integers where the i-th entry represents the number of units
        the i-th layer contains.
    """
    super().__init__()
    # We first use the user model for generating embeddings.
    self.embedding_model = UserModel(tf_transform_output, movies_uri)

    # Then construct the layers.
    self.dense_layers = tf.keras.Sequential()

    # Use the ReLU activation for all but the last layer.
    for layer_size in layer_sizes[:-1]:
      self.dense_layers.add(tf.keras.layers.Dense(layer_size, activation="relu"))

    # No activation for the last layer.
    for layer_size in layer_sizes[-1:]:
      self.dense_layers.add(tf.keras.layers.Dense(layer_size))
    
  def call(self, inputs):
    feature_embedding = self.embedding_model(inputs)
    return self.dense_layers(feature_embedding)

class MovieModel(tf.keras.Model):
  
  def __init__(self, tf_transform_output, movies_uri):
    super().__init__()

    max_tokens = 10_000

    unique_food_names = tf_transform_output.vocabulary_by_name('food_name_vocab')
    foods_vocab_str = [b.decode() for b in unique_food_names]

    self.title_embedding = tf.keras.Sequential([
      tf.keras.layers.StringLookup(
          vocabulary=foods_vocab_str,mask_token=None),
      tf.keras.layers.Embedding(len(foods_vocab_str) + 1, 32)
    ])

    self.title_vectorizer = tf.keras.layers.TextVectorization(
        max_tokens=max_tokens)

    self.title_text_embedding = tf.keras.Sequential([
      self.title_vectorizer,
      tf.keras.layers.Embedding(max_tokens, 32, mask_zero=True),
      tf.keras.layers.GlobalAveragePooling1D(),
    ])
    # 용의자


    movies_artifact = movies_uri.get()[0]
    input_dir = artifact_utils.get_split_uri([movies_artifact], 'train')
    movie_files = glob.glob(os.path.join(input_dir, '*'))
    movies = tf.data.TFRecordDataset(movie_files, compression_type="GZIP")
    movies_dataset = extract_str_feature(movies, 'food_name')

    self.title_vectorizer.adapt(movies_dataset)

    # self.title_vectorizer.adapt(foods)

  def call(self, foods):
    # print("------------------------")
    # print(self.title_embedding(foods).shape)
    # print(self.title_text_embedding(foods).shape)
    # print(tf.concat([
    #     self.title_embedding(foods),
    #     self.title_text_embedding(foods),
    # ], axis=1).shape)
    # print("----------------------------")
    return tf.concat([
        self.title_embedding(foods),
        self.title_text_embedding(foods),
    ], axis=1)

class CandidateModel(tf.keras.Model):
  """Model for encoding movies."""

  def __init__(self, tf_transform_output, movies_uri):
    """Model for encoding movies.

    Args:
      layer_sizes:
        A list of integers where the i-th entry represents the number of units
        the i-th layer contains.
    """
    super().__init__()

    self.embedding_model = MovieModel(tf_transform_output, movies_uri)

    # Then construct the layers.
    self.dense_layers = tf.keras.Sequential()


    # Use the ReLU activation for all but the last layer.
    for layer_size in layer_sizes[:-1]:
      self.dense_layers.add(tf.keras.layers.Dense(layer_size, activation="relu"))

    # No activation for the last layer.
    for layer_size in layer_sizes[-1:]:
      self.dense_layers.add(tf.keras.layers.Dense(layer_size))
    
  def call(self, inputs):
    feature_embedding = self.embedding_model(inputs)
    return self.dense_layers(feature_embedding)


class MovielensModel(tfrs.models.Model):

  def __init__(self, tf_transform_output, movies_uri):
    super().__init__()
    self.query_model = QueryModel(tf_transform_output, movies_uri)
    self.candidate_model = CandidateModel(tf_transform_output, movies_uri)

    movies_artifact = movies_uri.get()[0]
    input_dir = artifact_utils.get_split_uri([movies_artifact], 'train')
    movie_files = glob.glob(os.path.join(input_dir, '*'))
    movies = tf.data.TFRecordDataset(movie_files, compression_type="GZIP")
    movies_dataset = extract_str_feature(movies, 'food_name')
    print("movies_dataset >>>>>", movies_dataset.batch(128).map(self.candidate_model))
    for i in movies_dataset:
      print("아아아",i)
    self.task = tfrs.tasks.Retrieval(
        metrics=tfrs.metrics.FactorizedTopK(
            candidates=movies_dataset.batch(128).map(self.candidate_model),
        ),
    )

  def compute_loss(self, features, training=False):
    # We only pass the user id and timestamp features into the query model. This
    # is to ensure that the training inputs would have the same keys as the
    # query inputs. Otherwise the discrepancy in input structure would cause an
    # error when loading the query model after saving it.
    query_embeddings = self.query_model({
        "user_id": features["user_id"],
        "gender": features["gender"],
        "age": features["age"]
    })
    movie_embeddings = self.candidate_model(features["food_name"])

    return self.task(
        query_embeddings, movie_embeddings, compute_metrics=not training)

class goruf(tf.keras.Model):
  """Model for encoding movies."""

  def __init__(self, index):
    super().__init__()

    self.index = index
    
  def call(self, inputs):
    input = {}
    input['user_id'] = tf.reshape(inputs['user_id'], shape=[2,1])
    input['gender'] = tf.reshape(inputs['gender'], shape=[2,1])
    input['age'] = tf.reshape(inputs['age'], shape=[2,1])
    self.tl = self.index(input)
    return self.tl


def _get_serve_tf_examples_fn(model, tf_transform_output):
  """Returns a function that parses a serialized tf.Example and applies TFT."""
  try:
    model.tft_layer = tf_transform_output.transform_features_layer()

    @tf.function
    def serve_tf_examples_fn(serialized_tf_examples):
      """Returns the output to be used in the serving signature."""
      try:
        feature_spec = tf_transform_output.raw_feature_spec()
        parsed_features = tf.io.parse_example(serialized_tf_examples, feature_spec)
        transformed_features = model.tft_layer(parsed_features)
        print("transformed_features >>>> ",transformed_features)
        result1 = model(transformed_features)
      except BaseException as err:
        logging.error('######## ERROR IN serve_tf_examples_fn:\n{}\n###############'.format(err))
      return result1
  except BaseException as err:
      logging.error('######## ERROR IN _get_serve_tf_examples_fn:\n{}\n###############'.format(err))

  return serve_tf_examples_fn
  
# TFX Trainer will call this function.
def run_fn(fn_args: tfx.components.FnArgs):
  """Train the model based on given args.

  Args:
    fn_args: Holds args used to train the model as name/value pairs.
  """
  try:
    tf_transform_output = tft.TFTransformOutput(fn_args.transform_output)

    train_dataset = _input_fn(fn_args.train_files, fn_args.data_accessor,
                              tf_transform_output, INPUT_FN_BATCH_SIZE)
    eval_dataset = _input_fn(fn_args.eval_files, fn_args.data_accessor,
                            tf_transform_output, INPUT_FN_BATCH_SIZE)

    model = MovielensModel(
        tf_transform_output,
        fn_args.custom_config['foods']
        )

    tensorboard_callback = tf.keras.callbacks.TensorBoard(
        log_dir=fn_args.model_run_dir, update_freq='batch')

    model.compile(optimizer=tf.keras.optimizers.Adagrad(0.1))

  except BaseException as err:
    logging.error('######## ERROR IN run_fn before fit:\n{}\n###############'.format(err))

  try:
    # model.fit(
    #     train_dataset,
    #     validation_data=eval_dataset,
    #     validation_freq=5,
    #     epochs=fn_args.custom_config['epochs'],
    #     steps_per_epoch=fn_args.train_steps,
    #     verbose=0)
    model.fit(
        train_dataset,
        epochs=fn_args.custom_config['epochs'],
        steps_per_epoch=fn_args.train_steps,
        validation_data=eval_dataset,
        validation_steps=fn_args.eval_steps,
        callbacks=[tensorboard_callback])

      # model.fit(
      # train_dataset,
      # validation_data=eval_dataset,
      # validation_freq=5,
      # steps_per_epoch=1,
      # epochs=5,
      # callbacks=[tensorboard_callback],
      # verbose=1)
    print(model.evaluate(eval_dataset, steps = fn_args.eval_steps, return_dict=True))
  except BaseException as err:
      logging.error('######## ERROR IN run_fn during fit:\n{}\n###############'.format(err))

  try:

    index = tfrs.layers.factorized_top_k.BruteForce(model.query_model)
    movies_artifact = fn_args.custom_config['foods'].get()[0]
    input_dir = artifact_utils.get_split_uri([movies_artifact], 'train')
    movie_files = glob.glob(os.path.join(input_dir, '*'))
    movies = tf.data.TFRecordDataset(movie_files, compression_type="GZIP")
    # 의심이 됨
    movies_dataset = extract_str_feature(movies, 'food_name')

    index.index_from_dataset(
      tf.data.Dataset.zip((
          movies_dataset.batch(100),
          movies_dataset.batch(100).map(model.candidate_model))
      )
    )

    _, titles = index({'user_id':tf.constant(["test1","mintaehee"]),'gender':tf.constant(["m","m"]),"age":tf.constant([23,26])})
    print("titlse >>>",titles)
    # Run once so that we can get the right signatures into SavedModel
    # _, titles = index(tf.constant(["42"]))
    # print(f"Recommendations for user 42: {titles[0, :3]}")
    # signature_dict = { "user_id": tf.TensorSpec(shape=(None,), dtype=tf.string, name="user_id"),
    #                "gender": tf.TensorSpec(shape=(None,), dtype=tf.string, name="gender") }
    # signatures = {
    #     'serving_default':
    #         _get_serve_tf_examples_fn(index,
    #                                   tf_transform_output).get_concrete_function(
    #                                       tf.TensorSpec(
    #                                           shape=[None],
    #                                           dtype=tf.string,
    #                                           name='examples'),),
    # }

    # signatures = {
    #     'serving_default':
    #         _get_serve_tf_examples_fn(index,
    #                                   tf_transform_output).get_concrete_function(
    #                                       signature_dict),
    # }
    

    new_model = goruf(index)
    # index.save(fn_args.serving_model_dir, save_format='tf', signatures=signatures)
    _ , titles = new_model({'user_id':tf.constant(["test1","mintaehee"]),'gender':tf.constant(["m","m"]),"age":tf.constant([23,26])})
    # print(titles)
    new_model.save(fn_args.serving_model_dir,save_format='tf')
    # index.save(fn_args.serving_model_dir, save_format='tf')
    # index.save(fn_args.serving_model_dir, save_format='tf')
  except BaseException as err:
      logging.error('######## ERROR IN run_fn during export:\n{}\n###############'.format(err))

