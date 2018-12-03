from flask import Blueprint, render_template, request
from config import users
from tools.rest import crud
from tools.utility import obj2str, request_json
from flask_login import login_required, current_user


skeleton = {
    'phone': '+989104961290',
    'name': '',
    'wish_list': {
        'products': [],
        'hows': [],
    },
    'notifications': [],
    'page': {
        'title': '',
        'rank': 0,
        'img': '',
        'description': ''
    },
}

messages = {
    'saved',
    'required',
    'segment',
    'invalid',
    'already',
    'character',
    '2num',
    'bad',

    'updated',
    'removed',
    'not_saved',
    'not_removed',
    'saved',


}


def load_user(user):
    from config import products, hows
    wish_list = user['wish_list']
    _pr = wish_list['products']
    _pr = products.find({"_id": {"$in": _pr}})
    _hows = wish_list['hows']
    _hows = hows.find({'_id': {"$in": _hows}})

    context = {
        'products': [obj2str(_home) for _home in _pr],
        'hows': [obj2str(_home) for _home in _hows],
        'messages': messages
    }
    return {
               'user': user
           }, context


def load_user(user):
    from config import states
    wish_list = user['wish_list']
    _states = []
    for _id in wish_list:
        _states.append(states.find_one({'_id': _id}))
    context = {
        'homes': [obj2str(_home) for _home in _states],
        #  'place': _place,
        'map_template': 'search'
    }
    return user, context

blue = Blueprint('users', __name__, template_folder='../templates', url_prefix='/users')
crud(blue, users, template='user/page', load=load_user)


@blue.route('/me')
@login_required
def get_profile():
    return render_template('user/profile.html')


@blue.route('/me$', methods=['GET', 'POST'])
@login_required
def update_profile():
    from pymongo import ReturnDocument
    try:
        node = request.values['node']
        _json = request_json(request, specific_type=None)
        user = users.find_one_and_update(
            {'_id': current_user._id},
            {"$set": {node: _json}},
            return_document=ReturnDocument.AFTER
        )
        id = user.id
        current_user.__dict__ = user
        current_user.id = id
    except: pass
    return render_template('user/profile_plus.html')


@blue.route('/me/wishlist')
@login_required
def wish_list():
    from config import products
    from bson import ObjectId
    from flask import jsonify
    _products = current_user.wish_list['products']
    if type(_products) is dict:
        _products = [ObjectId(str(_product)) for _product in _products]
        current_user.wish_list['products'] = products.find({'_id': {'$in': _products}})
    return render_template('user/wishlist.html')


@blue.route('/me/messages')
def messages():
    return render_template('user/messagecenter.html')
