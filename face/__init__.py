from flask import Blueprint, render_template, request, url_for
import json
from config import fs, faces
from PIL import Image
import numpy as np
from threading import Thread
from face.core import analyse
from bson import ObjectId
from face.age_gender import FaceCV
import cv2
from tools.media import insert_img
from datetime import datetime
from tools import crud
from random import randint


blue = Blueprint('face', __name__, url_prefix='/face')
crud(blue, faces, getter=False)
model = FaceCV(depth=16, width=8)
banners = [
    {
        'img': '/static/img/face_banner/0.jpg',
        'position': -110
    }, {
        'img': '/static/img/face_banner/1.jpg',
        'position': -15
    }, {
        'img': '/static/img/face_banner/2.jpg',
        'position': -105
    }, {
        'img': '/static/img/face_banner/3.jpg',
        'position': -85
    }, {
        'img': '/static/img/face_banner/4.jpg',
        'position': -85
    }, {
        'img': '/static/img/face_banner/5.PNG',
        'position': -165
    }, {
        'img': '/static/img/face_banner/6.jpg',
        'position': -70
    }
]


@blue.route('/', methods=['GET'])
@blue.route('/<_id>', methods=['GET'])
def home(_id=None):
    if not _id:
        return render_template('face/index.html', banner=banners[randint(0, 6)])
    return render_template('face/index.html', banner=banners[randint(0, 6)], face=faces.find_one({'_id': ObjectId(_id)}))


def atomic_task(img, _id):
    age, gender = model.detect(img)[0]
    (lips, pebble), (bar, whiteness), (hessian, frangi, wrinkles), areas = analyse(img)
    lips, _ = insert_img(cv2.imencode('.jpg', lips)[1].tostring(), ObjectId(), sizes=())
    bar, _ = insert_img(cv2.imencode('.jpg', bar)[1].tostring(), ObjectId(), sizes=())
    hessian, _ = insert_img(cv2.imencode('.jpg', hessian)[1].tostring(), ObjectId(), sizes=())
    frangi, _ = insert_img(cv2.imencode('.jpg', frangi)[1].tostring(), ObjectId(), sizes=())
    areas, _ = insert_img(cv2.imencode('.jpg', areas)[1].tostring(), ObjectId(), sizes=())
    face = {
        '_id': ObjectId(_id),
        '_date': datetime.now(),
        'age': age,
        'gender': gender,
        'lips': {
            'value': pebble,
            'picture': lips,
        },
        'color': {
            'picture': bar,
            'value': whiteness
        },
        'wrinkle': {
            'value': wrinkles,
            'hessian': hessian,
            'frangi': frangi,
        },
        'raw': _id,
        'areas': areas,
    }
    result = faces.insert_one(face)
    print(result.inserted_id)


@blue.route('/<_id>', methods=['POST'])
def post(_id):
    try:
        file_name = '{0}_{1}'.format('v', _id)
        im_stream = fs.get_last_version(filename=file_name)
        pil_image = Image.open(im_stream).convert('RGB')
        img = np.array(pil_image)
        img = img[:, :, ::-1].copy()  # rgb to bgr
        # atomic_task(img)
        Thread(target=atomic_task, args=(img, _id)).start()
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
    except:
        return json.dumps({'success': False}), 200, {'ContentType': 'application/json'}
