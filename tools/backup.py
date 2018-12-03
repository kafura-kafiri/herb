# !/usr/bin/env python
# -*- coding: utf-8 -*-

from subprocess import Popen, call
import os
import json
from config import db_name
import shutil

from flask import send_file, Blueprint, request, flash, abort
blue = Blueprint('backup', __name__, url_prefix='/backup')


@blue.route('/<collection>')
def backup(collection):
    if collection == '*':
        _path = os.path.dirname(os.path.realpath(__file__)) + '/backup/'
        Popen('mongodump --db {db_name} --out {path}` date +"%m-%d-%y"`'.format(path=_path, db_name=db_name), shell=True)
        Popen('mongodump --db {db_name}_FS --out {path}` date +"%m-%d-%y"`'.format(path=_path, db_name=db_name), shell=True)
    else:
        collection = collection.upper()
        _path = os.path.dirname(os.path.realpath(__file__)) + '/backup/'
        Popen('mongodump --db {db_name} --collection {collection} --out {path}` date +"%m-%d-%y"`'.
              format(path=_path, db_name=db_name, collection=collection), shell=True)

    def get_immediate_subdirectories(a_dir):
        return [os.path.join(a_dir, name) for name in os.listdir(a_dir)
                if os.path.isdir(os.path.join(a_dir, name))]

    data_path = get_immediate_subdirectories(_path)[0]
    shutil.make_archive(data_path, 'zip', data_path)
    shutil.rmtree(data_path)
    return send_file(data_path + '.zip', mimetype='zip', as_attachment=True)
