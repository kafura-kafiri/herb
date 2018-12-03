from bson import ObjectId
from flask import render_template, request, Blueprint

from config import products, hows
from tools.utility import request_attributes, obj2str

from search.tag import add_keyword, suggest_keywords
from search.tag import suggest_brands
from search.tag import suggest_categories

import pymongo

blue = Blueprint('search', __name__, url_prefix='/')


def search(collection, kw, size, category=None, brand=None, page=1, auto_completion=True, _sort='relevance'):
    projection = {}
    search_selector = {
        "$or":
            [
                {"$text": {
                    "$search": kw,
                }},
            ],
    }
    if auto_completion:
        search_selector['$or'].append({'title': {'$regex': kw}})
    if kw == '' or not kw:
        del(search_selector['$or'])

    fields = {
        "$or": [
            {
                "categories": {
                    "$elemMatch": {"title": category}
                }
            }, {
                "categories": {
                    "$elemMatch": {
                        "ancestors": {
                            "$elemMatch": {"title": category}
                        }
                    }
                }
            }
        ],
        'brand.title': brand,
    }
    if category is None or category == '':
        del fields['$or']
    if brand is None or brand == '':
        del fields['brand.title']
    sort_by = {
        'relevance': (
            "score", {
                "$meta": "textScore"
            }
        ),
        'best selling': {},
        'costumer rating': ('reviews.score.value', pymongo.DESCENDING),
        'price low to high': ('value.our', pymongo.ASCENDING),
        'price high to low': ('value.our', pymongo.DESCENDING),
        'newest': ('_date', pymongo.DESCENDING),
        'heaviest': ('dimensions.weight.pure', pymongo.DESCENDING),
        'lightest': ('dimensions.weight.pure', pymongo.ASCENDING),
    }
    return collection.find(
        {
            **fields,
            **search_selector
        },
        {"score": {
            "$meta": "textScore"
        }},
    ).sort([sort_by[_sort]]).skip(
        size * (page - 1)
    ).limit(
        size
    )


@blue.route('/s/')
def result():
    _json = request_attributes(request, kw=str, category=str, brand=str, pagesize=int, page=int)
    add_keyword(_json['kw'])
    _products = []
    if 'onlyHows' not in request.values or request.values['onlyHows'] != 'on':
        _products = search(products, _json['kw'], _json['pagesize'], category=_json['category'], brand=_json['brand'], page=_json['page'], auto_completion=False)
        _products = [obj2str(_product) for _product in _products]
    _hows = search(hows, _json['kw'], 4, auto_completion=False)
    _hows = [obj2str(_h) for _h in _hows]
    ctx = {
        'lang': {
            'dimensions': {
                'currency': '$'
            }
        }
    }
    query = {
        'kw': _json['kw'],
        'category': _json['category'],
        'brand': _json['brand'],
        'page': _json['page'],
        'pagesize': _json['pagesize']
    }
    if 'onlyHows' in request.values and request.values['onlyHows'] == 'on':
        query['onlyHows'] = True
    return render_template('result/index.html', query=query, products=_products, hows=_hows, **ctx)


@blue.route('/sug/')
def suggest():
    kw = request_attributes(request, kw=str)['kw']
    _keywords = suggest_keywords(kw, 5)
    _keywords = [_keyword['title'] for _keyword in _keywords]

    _brands = suggest_brands(kw, 5)
    _brands = [[_brand['title'], str(_brand['_id'])] for _brand in _brands]

    _categories = suggest_categories(kw, 5)
    _categories = [[_category['title'], str(_category['_id'])] for _category in _categories]

    _products = search(products, kw, 3)
    _products = [{
        'url': 'pr/' + str(_product['_id']),
        'dname': _product['title'],
        'img': str(_product['img'][0])
                 } for _product in _products]

    suggestion = {
        "products": _products,
        "categories": _categories,
        "general": _keywords,
        "brands": _brands,
    }
    import json
    suggestion = "iHerbSearchCompletion('{}');".format(json.dumps(suggestion, separators=(',', ':')))
    return suggestion
