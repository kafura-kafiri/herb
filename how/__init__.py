from flask import Blueprint, request, render_template, redirect
from config import hows
from tools import crud
from how.instance import how
from bson import ObjectId
from tools.media import insert_img
from how.articlate import articlate

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
    hows.update(
        {"_id": article['_id']},
        article,
        upsert=True
    )
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


@blue.route('/++/<path:path>')
def insert(path):
    with open('/' + path + '/text') as f:
        article = articlate(f.read())
    return redirect('/hows/+?json={}'.format(article))
