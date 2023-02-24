# YOLOv5 🚀 by Ultralytics, GPL-3.0 license
"""
Run a Flask REST API exposing one or more YOLOv5s models
"""

from flask import Flask, request


from flask import make_response
import json

from flask_cors import CORS
import tensorflow as tf
import numpy as np
import os

import boto3
from botocore.client import Config

import zipfile

app = Flask(__name__)
models = {}
loaded = None

CORS(app, resources={r'*': {'origins': '*'}})

@app.route('/api/reco', methods=["GET"])
def predict():

    user_id = request.args.get('user_id')
    gender = request.args.get('gender')
    age = request.args.get('age')
    
    _ , titles = loaded({'user_id':tf.constant([user_id,user_id]),'gender':tf.constant([gender,gender]),"age":tf.constant([int(age),int(age)])})
    l = titles.numpy().tolist()[0]
    l = [x.decode('UTF8') for x in l]
    res = {}
    res['result'] = l

    
    res = make_response(json.dumps(res, ensure_ascii=False))
    res.headers['Content-Type'] = 'application/json'
    return res

@app.route('/api/reload', methods=["GET"])
def reload():
    model_path = reload_model()
    loaded = tf.saved_model.load(model_path)
    return "s"

# ENV  
def reload_model():
    ACCESS_KEY_ID = '' #s3 관련 권한을 가진 IAM계정 정보
    ACCESS_SECRET_KEY = ''
    BUCKET_NAME = ''


    s3 = boto3.resource(
        's3',
        aws_access_key_id=ACCESS_KEY_ID,
        aws_secret_access_key=ACCESS_SECRET_KEY,
        config=Config(signature_version='s3v4')
    )
    path1 = os.path.realpath(__file__)
    path2 = os.path.abspath(os.path.join(path1, os.pardir))
    path3 = os.path.abspath(os.path.join(path2, './model_zip.zip'))

    s3.meta.client.download_file('baehanjin', 'model.zip', path3)

    zip_path = path3
    extract_path = os.path.abspath(os.path.join(path2, './model2'))

    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_path)

    dir_path = os.path.abspath(os.path.join(path2, './model2/serving_model/testt'))

    subdirs = [os.path.join(dir_path, d) for d in os.listdir(dir_path) if os.path.isdir(os.path.join(dir_path, d))]
    
    return subdirs[-1]

if __name__ == "__main__":
    model_path = reload_model()
    loaded = tf.saved_model.load(model_path)
    _, titles = loaded({'user_id':tf.constant(["test1","test1"]),'gender':tf.constant(["m","m"]),"age":tf.constant([23,23])})
    l = titles.numpy().tolist()[0]
    l = [x.decode('UTF8') for x in l]
    print(l)
    app.debug = True
    app.run(host="0.0.0.0", port=30004)  # debug=True causes Restarting with stat