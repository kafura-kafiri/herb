from flask import Blueprint, request, render_template, redirect, abort
from flask_login import current_user, login_required
from config import hows
from tools import crud, request_attributes
from how.instance import how
from bson import ObjectId
from tools.media import insert_img
from how.articlate import articlate, parse, _aline
import json
from datetime import datetime
import random

blue = Blueprint('how', __name__, template_folder='templates', url_prefix='/hows')
crud(blue, hows, template='how/index', load=lambda x: (x, {'no_secondary': True}), skeleton=how)


@blue.route('/<_id>/<level_1>/<level_2>/media/+', methods=['POST'])
def add_image(_id, level_1, level_2):
    (l1, l2) = (int(level_1) - 1, int(level_2) - 1)
    article = hows.find_one({'_id': ObjectId(_id)})
    level_1 = article['level_1'][l1]
    level_2 = level_1['level_2'][l2]
    raw_img = request.files['image']
    o = ObjectId()
    o = insert_img(raw_img.read(), o, sizes=())
    level_2['i'] = str(o[0])
    article['meta']['i'] = article['meta']['i'] if article['meta']['i'] else level_2['i']
    hows.save(article)
    return o


@blue.route('/')
def hows_homepage():
    extra = {}
    page = int(request.args['p']) - 1 if 'p' in request.args else 0
    query = request.args['q'] if 'q' in request.args else ''
    if page == 0 and not query:
        samples = hows.aggregate([{
            '$sample': {
                'size': 7
            },
        }, {
            '$project': {
                'meta': 1,
                '_date': 1,
                '_id': 1
            }
        }])
        samples = list(samples)
        extra['banner'] = samples[0]
        extra['carousel'] = samples[1:]

    if query:
        query = {"$text": {
                        "$search": query,
                    }}
    else:
        query = {}
    if 'category' in request.args:
        query['meta.category'] = request.args['category']
    result = hows.find(query).skip(6 * page).limit(6)
    return render_template('how/homepage/index.html', **extra, result=result, query={'onlyHows': 'on'})


@blue.route('/<_id>$', methods=['POST'])
def insert(_id):
    article = request.files['article'].read().decode('utf-8')
    article = articlate(parse(_aline(article)))
    return redirect('/hows/{}$?json={}'.format(_id, article))



@blue.route('/<_id>/@reviews/+', methods=['GET', 'POST'])
def insert_review(_id):
    if not current_user.is_authenticated:
        abort(401)
    _id = ObjectId(_id)
    author_id = current_user._id
    author_name = current_user.first_name or current_user.last_name or current_user.username
    author_img = current_user.img if hasattr(current_user, 'img') else '/static/semantic/examples/assets/images/avatar/{}.jpg'.format(random.choice(['nan', 'tom']))
    _json = request_attributes(request, type=int, value=int)
    if 'text' in request.values:
        _json['text'] = request.values['text']
    if _json['type'] == 0 and _json['value'] == 1:
        result = hows.update_one({'_id': _id}, {
            '$push': {
                'reviews': {
                    'type': 0,
                    '_author': {
                        '_id': author_id,
                        'name': author_name,
                        'img': author_img
                    },
                    '_date': datetime.now(),
                }
            }
        })
        if result.modified_count:
            hows.update_one({'_id': _id}, {
                '$inc': {
                    'aggregation.like': 1
                }
            })

    if _json['type'] == 0 and _json['value'] == -1:
        result = hows.update_one({'_id': _id}, {
            '$pull': {
                'reviews': {
                    'type': 0,
                    '_author._id': author_id,
                }
            }
        }, False, True)
        if result.modified_count:
            hows.update_one({'_id': _id}, {
                '$inc': {
                    'aggregation.like': -1
                }
            })

    if _json['type'] == 1:
        result = hows.update_one(
            {'_id': _id},
            {
                '$push': {
                    'reviews': {
                        '_author': {
                            '_id': author_id,
                            'name': author_name,
                            'img': author_img
                        },
                        '_date': datetime.now(),
                        **_json,
                    }
                }
            }
        )
        if result.modified_count:
            direction = 1
            hows.update_one({'_id': ObjectId(_id)}, {
                '$inc': {
                    'aggregation.score.sum': direction * _json['value'],
                    'aggregation.score.num': direction
                }
            })
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
