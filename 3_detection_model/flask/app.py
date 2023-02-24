# YOLOv5 🚀 by Ultralytics, GPL-3.0 license
"""
Run a Flask REST API exposing one or more YOLOv5s models
"""

import argparse
import io

import os
import torch
from flask import Flask, request
from PIL import Image

from flask import make_response
import json

from flask_cors import CORS

app = Flask(__name__)
models = {}

DETECTION_URL = "/v1/object-detection/<model>"
CORS(app, resources={r'*': {'origins': '*'}})

@app.route(DETECTION_URL, methods=["POST"])
def predict(model):
    if request.method != "POST":
        return

    if request.files.get("image"):
        # Method 1
        # with request.files["image"] as f:
        #     im = Image.open(io.BytesIO(f.read()))

        # Method 
        im_file = request.files["image"]
        im_bytes = im_file.read()
        im = Image.open(io.BytesIO(im_bytes))

        if model in models:
            results = models[model](im,size=640)  # reduce size=320 for faster inference
            print("results >>> ", results)

            return results.pandas().xyxy[0].to_json(orient="records",force_ascii=False, indent=4)
    else:
        res = {}
        res['error'] = "error"

        
        res = make_response(json.dumps(res, ensure_ascii=False))
        res.headers['Content-Type'] = 'application/json'
        return res


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask API exposing YOLOv5 model")
    parser.add_argument("--port", default=30003, type=int, help="port number")
    parser.add_argument('--model', nargs='+', default=['yolov5s'], help='model(s) to run, i.e. --model yolov5n yolov5s')
    opt = parser.parse_args()
    path1 = os.path.realpath(__file__)
    path2 = os.path.abspath(os.path.join(path1, os.pardir))
    path3 = os.path.abspath(os.path.join(path2, './yolo/best.pt'))
    print("path3 >>", path3)
    for m in opt.model:
        # models[m] = torch.hub.load("ultralytics/yolov5", 'custom', path='./docker/yolo/runs/train/source_yolov5s_results_v2/weights/best.pt')
        models[m] = torch.hub.load("ultralytics/yolov5", 'custom', path=path3)

    app.debug = True
    app.run(host="0.0.0.0", port=opt.port)  # debug=True causes Restarting with stat



# from flask import Flask, render_template, send_from_directory
# from flask import request
# from flask import make_response
# import json
# from yolo.detect import run
# import os
# from flask_cors import CORS
# from werkzeug.utils import secure_filename

# ROOT_PATH = os.path.dirname(os.path.abspath(__file__))
# STATIC_PATH = os.path.join(ROOT_PATH, 'static')

# app = Flask(__name__, static_folder=STATIC_PATH, static_url_path='')

# CORS(app, resources={r'*': {'origins': '*'}})
    
# image_path = os.path.join(os.getcwd(),'\yolo\data\images')
# @app.route('/api/predict_all', methods=['POST'])
# def predict_all():
#     if request.method == 'POST':
#         file = request.files['image']
#         filename = file.filename
#         path1 = os.path.realpath(__file__)
#         path2 = os.path.abspath(os.path.join(path1, os.pardir))
#         path3 = os.path.abspath(os.path.join(path2, './yolo/data/' + ))
#         os.makedirs(path3)
#         print(path3)

#         file.save(os.path.join(path3,filename))
#         result = run(source = path3)

#         res = {}
        
#         res['result'] = result
#         res = make_response(json.dumps(res, ensure_ascii=False))
#         res.headers['Content-Type'] = 'application/json'
#         return res

    

# if __name__ == '__main__':
#     app.debug = True
#     app.run(host='0.0.0.0', port=30003)
    