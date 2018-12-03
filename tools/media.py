# !/usr/bin/env python
# -*- coding: utf-8 -*-

from config import fs
import mimetypes
import requests
from io import BytesIO
from PIL import Image
from bson import ObjectId
import mimetypes
import json

from flask import send_file, Blueprint, request, flash, abort, stream_with_context, Response
blue = Blueprint('media', __name__, url_prefix='/media')
dec = {
    'b': 50,
    't': 100,
    'k': 120,
    'r': 240,
    'w': 300,
    'v': 600,
    'y': 800,
    'l': 1600,
}


def serve_pil_image(pil_img):
    img_io = BytesIO()
    pil_img.save(img_io, 'JPEG', quality=70)  # png is heavy todo JPEG -> PNG for the error: cannot write mode RGBA as JPEG )> google icon
    img_io.seek(0)
    return send_file(img_io, mimetype='image/jpeg')


def insert_img(image_bytes, o, sizes=('b', 't', 'k', 'r', 'v', 'w', 'y', 'l'), mime_type='image/jpeg'):
    import io
    file_name = '{0}_{1}'.format('n', str(o))
    fs.put(image_bytes, contentType=mime_type, filename=file_name)
    for width, size in [(dec[size], size) for size in sizes]:
        img = Image.open(io.BytesIO(image_bytes))
        wpercent = (width / float(img.size[0]))
        hsize = int((float(img.size[1]) * float(wpercent)))
        img = img.resize((width, hsize), Image.ANTIALIAS)
        imgByteArr = io.BytesIO()
        img.save(imgByteArr, format='PNG')
        file_name = '{0}_{1}'.format(size, str(o))
        fs.put(imgByteArr.getvalue(), contentType=mime_type, filename=file_name)
    return str(o), 200


@blue.route('/i/dodota/+', methods=['POST'])
def add_dodota_image():
    _id, success = add_image()
    print(_id)
    response = {
        "file": "/media/i/y/{}.jpeg".format(_id),
        "success": True if success == 200 else False,
        "file_id": _id
    }
    return json.dumps(response), 200, {'ContentType': 'text/html'}


@blue.route('/i/+', methods=['GET', 'POST'])
def add_image():
    try:
        o = ObjectId()
        if 'url' in request.values:
            url = request.values['url']
            mime_type = mimetypes.guess_type(url)[0]
            r = requests.get(url, stream=True)
            return insert_img(r.raw.read(), o, mime_type=mime_type)
        for name in ['file', 'Filedata', 'pic']:
            if name in request.files:
                file = request.files[name]
                mime_type = mimetypes.guess_type(file.filename)[0]
                return insert_img(file.read(), o, mime_type=mime_type)
        raise Exception
    except Exception as e:
        abort(400, e)


@blue.route('/-')
def minimize_all():
    from tools.utility import obj2str
    from flask import jsonify
    documents = fs.find()
    documents = [{
            '_id': str(document._id),
            'filename': document.filename,
        } for document in documents]
    return jsonify(documents)


@blue.route('/*', methods=['GET', 'POST'])
#@login_required
def delete_all():
    import json
    for i in fs.find():
        fs.delete(i._id)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@blue.route('/i/<size>/<_id>.<_format>')
@blue.route('/i/<size>/<_id>')
@blue.route('/<size>/<_id>.<_format>')
@blue.route('/<size>/<_id>')
def get_image(_id, size, _format=None):
    try:
        file_name = '{0}_{1}'.format(size, _id)
        im_stream = fs.get_last_version(filename=file_name)
        im = Image.open(im_stream)
        return serve_pil_image(im)
    except Exception as e:
        return str(e), 400


@blue.route('/i/<size>/<_id>.<_format>*', methods=['GET', 'POST'])
@blue.route('/i/<size>/<_id>*', methods=['GET', 'POST'])
def delete(_id, size, _format=None):
    try:
        file_name = '{0}_{1}'.format(size, _id)
        file = fs.find_one({'filename': file_name})
        fs.delete(file._id)
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
    except Exception as e:
        print(e)
        return abort(400, e)


@blue.route('/i/<_id>.<_format>*', methods=['GET', 'POST'])
@blue.route('/i/<_id>*', methods=['GET', 'POST'])
def delete_many(_id, _format=None):
    delete(_id, 'n', _format=_format)
    for size in dec:
        delete(_id, size, _format=_format)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@blue.route('/f/+<path:path>')
def insert_file(path):
    path = '/' + path
    with open(path, "rb") as file:
        mime = mimetypes.MimeTypes().guess_type(path)
        _id = fs.put(file.read(), contentType=mime)
        return str(_id)
    abort(403)


@blue.route('/f/-<path:path>')
def file_on_path(path):
    path = '/' + path
    from tools.utility import send_file_partial
    return send_file_partial(path)


@blue.route('/f/<_id>.<_format>')
def get_file(_id, _format):
    f_stream = fs.get(ObjectId(_id))
    from tools.utility import my_send_file_partial
    return my_send_file_partial(f_stream)
