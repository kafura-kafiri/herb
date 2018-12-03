from flask import url_for, redirect, Blueprint, request
from config import symlinks as hard_symlinks
import json
import random
import string
blue = Blueprint('symlinks', __name__)
symlinks = {}


def boot():
    _symlinks = hard_symlinks.find({})
    for _symlink in _symlinks:
        symlinks[_symlink['key']] = _symlink['url']


@blue.route('/@<key>')
def symlink(key):
    return redirect(symlinks[key])


@blue.route('/@')
def insert():
    url = request.values['url']
    key = '111111'
    while key in symlinks:
        key = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    result = hard_symlinks.insert_one({
        'key': key,
        'url': url,
    })
    symlinks[key] = url
    return json.dumps({'success': True, 'key': key}), 201, {'ContentType': 'application/json'}