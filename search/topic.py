from flask import Blueprint, render_template
from config import topics, hows, products, pr
from tools import crud
from bson import ObjectId
blue = Blueprint('reviews', __name__, template_folder='templates', url_prefix='/topics')

review = {
    'title': "Can&#39;t believe what a difference this has made!!",
    'body': '''I am trying to build up my immune and body system, so I
            decided to try this. I have been amazed at how much better I feel. I was taking a
            lot of individual supplements from a variety of suppliers, but now I am cutting
            back to just use this and Thorne&#39;s B # 6 which I have been using for about 8
            months. I have SO much energy now, and I&#39;m only taking one capsule because I&#39;m
            afraid it will keep me awake!!''',
    'score': 4,
    'helpful': ['23'],
    'unhelpful': ['3', '2'],
    'coolie': {
        'type': '',
        '_id': ''
    }
}


def update_structure(r):
    _reviews = topics.find({'_id': {'$in': r['reviews']}})
    _r = init_structure()
    _r['reviews'] = r['reviews']
    for _review in _reviews:
        _r['score']['population'][str(_review['score'])] += 1
        _r['score']['population']['total'] += 1
    s = 0
    for i in range(1, 6):
        s += i * _r['score']['population'][str(i)]
    _r['score']['value'] = s / _r['score']['population']['total']
    return _r


def on_delete_redundancy(_review):
    collection = _review['coolie']['type']
    collection = globals()[collection]
    document = _review['coolie']['_id']
    document = collection.find_one({'_id': document})
    document['reviews']['reviews'].remove(_review['_id'])
    document['reviews'] = update_structure(document['reviews'])
    collection.save(document)


def on_insert_redundancy(_review):
    collection = _review['coolie']['type']
    collection = globals()[collection]
    document = _review['coolie']['_id']
    document = collection.find_one({'_id': document})
    document['reviews']['reviews'].append(_review['_id'])
    print('rev rev')
    print(document['reviews']['reviews'])
    document['reviews'] = update_structure(document['reviews'])
    collection.save(document)
    print('rev rev')
    print(document['reviews']['reviews'])


def on_update_redundancy(_review):
    collection = _review['coolie']['type']
    collection = globals()[collection]
    document = _review['coolie']['_id']
    document = collection.find_one({'_id': document})
    document['reviews'] = update_structure(document['reviews'])
    collection.save(document)


crud(blue, topics, skeleton=review, template='review', redundancies={
    'update': on_update_redundancy,
    'insert': on_insert_redundancy,
    'delete': on_delete_redundancy
})


def bring_reviews(document, limit=5, skip=0):
    _reviews = document['reviews']['reviews']
    _reviews = _reviews[skip:skip + limit]
    _top_review = document['reviews']['top_review']
    document['reviews']['reviews'] = topics.find({'_id': {'$in': _reviews}})
    document['reviews']['top_review'] = topics.find_one({'_id': _top_review})
    return document


def init_structure():
    return {
        'score': {
            'value': 5,
            'population': {
                'total': 1,
                '1': 0,
                '2': 0,
                '3': 0,
                '4': 0,
                '5': 1,
            },
        },
        'reviews': [],
        'top_review': '',
        'aggregation': {'view': 0, 'like': 0}
    }


@blue.route('/<collection>/<_id>/')
@blue.route('/<collection>/<_id>/<int:page_size>')
@blue.route('/<collection>/<_id>/<int:page_size>/<int:page>')
def full_review(collection, _id, page_size=10, page=1):
    skip = (page - 1) * page_size
    document = globals()[collection].find_one({'_id': ObjectId(_id)})
    document = bring_reviews(document, page_size, skip)
    return render_template('review/full_reviews.html', document=document, query={
        'page': page,
        'page_size': page_size,
        'collection': collection,
        '_id': _id,
    })