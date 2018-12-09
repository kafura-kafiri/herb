import datetime
import demjson
import json

from bson import ObjectId
from flask import jsonify, render_template, abort, request
from flask_login import current_user

from tools.utility import request_json, obj2str, free_from_, str2obj, dot_notation
from pymongo import ReturnDocument


def crud(blueprint, collection, skeleton={}, projection=None, template='', load=lambda x: (x, {}), redundancies={},
         getter=True):
    """
    :issues modify each method with my custom method

    :param blueprint:
    :param collection:
    :param skeleton:
    :param projection:
    :param template:
    :param load:
    :param redundancies:
    :param getter
    :return:
    """

    @blueprint.route('/+', methods=['GET', 'POST'])
    @blueprint.route('/<_id>+', methods=['GET', 'POST'])
    # @login_required
    def create(_id=None):
        document = {}
        if skeleton:
            from copy import deepcopy
            document = deepcopy(skeleton)
        try:
            _json = request_json(request)
            for key, value in _json.items():
                sub_document, key = dot_notation(document, key)
                sub_document[key] = value
        except:
            pass
        if _id:
            document['_id'] = ObjectId(_id)
        if current_user.is_authenticated:
            document['_author'] = current_user._id
        document['_date'] = datetime.datetime.now()

        result = collection.insert_one(str2obj(document))
        if 'insert' in redundancies:
            redundancies['insert'](document)
        return str(result.inserted_id)

    @blueprint.route('/*', methods=['GET', 'POST'])
    # @login_required
    def delete_all():
        collection.delete_many({})
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}

    @blueprint.route('/<_id>*', methods=['GET', 'POST'])
    # @login_required
    def delete(_id):
        if 'delete' in redundancies:
            document = collection.find_one({'_id': ObjectId(_id)})
            redundancies['delete'](document)
        collection.delete_one({
            '_id': ObjectId(_id)
        })
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}

    @blueprint.route('/<_id>-<dash>', methods=['GET', 'POST'])
    @blueprint.route('/<_id>-', methods=['GET', 'POST'])
    def minimize(_id, dash=''):
        fields = []
        if 'p' in dash and projection:
            fields.append(projection)
        try:
            document = collection.find_one({'_id': ObjectId(_id)}, *fields)
            obj2str(document)
            return jsonify(document)
        except Exception as e:
            return str(e)

    @blueprint.route('/-<dash>')
    @blueprint.route('/-')
    @blueprint.route('/{<_filter>}-<dash>')
    @blueprint.route('/{<_filter>}-')
    def minimize_all(dash='', _filter='{}'):
        fields = []
        _filter = demjson.decode(_filter)
        _filter = str2obj(_filter)
        if 'p' in dash and projection:
            fields.append(projection)
        documents = collection.find(_filter, *fields)
        documents = [obj2str(document) for document in documents]
        return jsonify(documents)

    if getter:
        @blueprint.route('/<_id>')
        def get(_id):
            try:
                try:
                    document = collection.find_one_and_update({'_id': ObjectId(_id)}, {
                        '$inc': {
                            'reviews.aggregation.view': 1
                        },
                    }, return_document=ReturnDocument.AFTER)
                except:
                    document = collection.find_one({'_id': ObjectId(_id)})
                document, ctx = load(document)
            except Exception as e:
                return str(e), 403
            return render_template(template + '.html', **document, **ctx)

    @blueprint.route('/<_id>$$', methods=['GET', 'POST'])
    def universal_alter(_id):
        _id = ObjectId(_id)
        if request.method == 'POST':
            _json = request_json(request)
            _json = free_from_(_json)
            _json = str2obj(_json)
            document = collection.find_one_and_update(
                {'_id': _id},
                {'$set': _json},
                return_document=ReturnDocument.AFTER
            )
            if 'update' in redundancies:
                redundancies['update'](document)
            document = obj2str(document)
            return render_template('$$.html', ctx=document)
        else:
            document = collection.find_one({'_id': _id})
            if not document:
                raise Exception
            document = obj2str(document)
            return render_template('$$.html', ctx=document)

    @blueprint.route('/<_id>$', methods=['GET'])
    @blueprint.route('/<_id>$<operator>', methods=['GET'])
    def alter(_id, operator='set'):
        _id = ObjectId(_id)
        try:
            from pymongo import ReturnDocument
            if 'node' in request.values:
                _json = request_json(request, specific_type=None)
                node = request.values['node']
                if not _json:
                    document = collection.find_one_and_update(
                        {'_id': _id},
                        {'$unset': {node: ""}},
                        return_document=ReturnDocument.AFTER
                    )
                else:
                    document = collection.find_one_and_update(
                        {'_id': _id},
                        {'${}'.format(operator): {node: _json}},
                        return_document=ReturnDocument.AFTER
                    )
            else:
                _json = request_json(request)
                document = collection.find_one_and_update(
                    {'_id': _id},
                    {'$set': _json},
                    return_document=ReturnDocument.AFTER
                )
            if 'update' in redundancies:
                redundancies['update'](document)
            if 'ajax' in request.values:
                return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
        except Exception as e:
            # print(e)
            try:
                document = collection.find_one({'_id': _id})
            except Exception as e:
                print(e)
                abort(405)
        document, ctx = load(document)
        return render_template(template + '_plus.html', **document, **ctx)
