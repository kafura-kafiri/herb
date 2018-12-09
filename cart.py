from flask_login import login_required, current_user
from flask import Blueprint, abort, request, render_template
from bson import ObjectId
import json
from config import users, pr
from datetime import datetime
from copy import deepcopy
from product import combo
# shop -> login -> shopping -> cart -> options -> pay.
# let's say when ever login -> we change carts ->
# carts = {
#     '1ac4...': [
#         set(),
#         'flag',
#         datetime.now()
#     ]
# }

blue = Blueprint('cart', __name__, url_prefix='/cart')


def assert_ownership(_id):
    """_id: ObjectId """
    if _id not in current_user.carts or current_user.carts[_id][1]:
        abort(403, 'sorry but this cart is reserved')


@blue.route('/_/<pr_id>:<qty:int>', methods=['POST', 'PUT'])
@blue.route('/<_id>/<pr_id>:<qty:int>', methods=['POST'])
@login_required
def purchase(pr_id, qty, _id=None):
    pr_id = ObjectId(pr_id)
    if qty <= 0:
        abort(403, 'positive qty please')
    if _id:
        _id = ObjectId(_id)
        if _id not in current_user.carts or current_user.carts[_id][1]:
            abort(403, 'sorry but this cart is reserved')
        current_user.carts[_id][0].append([pr_id, qty])
        users.update_one({'_id': current_user._id}, {
            '$push': {
                'carts.{}.0'.format(str(_id)): [pr_id, qty]
            }
        })
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
    elif request.method == 'POST' or not current_user.carts:
        _id = ObjectId()
        now = datetime.now()
        current_user.carts[_id] = [[[pr_id, qty]], {'paid': False}, now]
        users.update_one({'_id': current_user._id}, {
            '$set': {
                'carts.{}'.format(str(_id)): [[[pr_id, qty]], {'paid': False}, now]
            }
        })
    else:
        _id = current_user.carts.top()
        current_user.carts[_id][0].append([pr_id, qty])
        users.update_one({'_id': current_user._id}, {
            '$push': {
                'carts.{}.0'.format(str(_id)): [pr_id, qty]
            }
        })
        return json.dumps({'success': True, 'message': 'purchased to top cart'}), 200, {'ContentType': 'application/json'}


@blue.route('/_/<pr_id>', methods=['DELETE'])
@blue.route('/<_id>/<pr_id>', methods=['DELETE'])
@blue.route('/<_id>')
@login_required
def give_up(pr_id=None, _id=None):
    if not pr_id:
        _id = ObjectId(_id)
        if _id not in current_user.carts:
            abort(403, 'sorry but this cart is reserved')
        del(current_user.carts[_id])
        users.update_one({'_id': current_user._id}, {
            '$unset': {
                'carts.{}'.format(str(_id)): 1
            }
        }, False, True)
        return json.dumps({'success': True, 'message': 'cart removed'}), 200, {'ContentType': 'application/json'}
    pr_id = ObjectId(pr_id)
    if _id:
        _id = ObjectId(_id)
        if _id not in current_user.carts or current_user.carts[_id][1]:
            abort(403, 'sorry but this cart is reserved')
        try:
            pair = next(pair for pair in current_user.carts[_id][0] if pair[0] == pr_id)
            current_user.carts[_id][0].remove(pair)
            users.update_one({'_id': current_user._id}, {
                '$pop': {
                    'carts.{}.0'.format(str(_id)): pair
                }
            })
            return json.dumps({'success': True, 'message': 'from specific cart gave up'}), 200, {'ContentType': 'application/json'}
        except:
            abort(403, 'pr not existed')
    elif not current_user.carts:
        abort(403, 'no cart existed')
    try:
        _id = current_user.carts.top()
        pair = next(pair for pair in current_user.carts[_id][0] if pair[0] == pr_id)
        current_user.carts[_id][0].remove(pair)
        users.update_one({'_id': current_user._id}, {
            '$pop': {
                'carts.{}.0'.format(str(_id)): pair
            }
        })
        return json.dumps({'success': True, 'message': 'gave up from top cart'}), 200, {'ContentType': 'application/json'}
    except:
        abort(403, 'pr not existed')


@blue.route('/')
@blue.route('/<_id>')
@login_required
def __carts__(_id):
    _carts = deepcopy(current_user.carts)
    flat = {}
    for key, (cart, purchaed, date) in _carts.items():
        for product in cart:
            flat[product] = None
    products = pr.fine({'_id': {'$in': flat.keys()}}, combo)
    for product in products:
        flat[product['_id']] = product
    for key, (cart, purchaed, date) in _carts.items():
        _carts[key][0] = [flat[pr_id] for pr_id in cart]
    return render_template('', carts=_carts)


def get_option():
    pass


def set_option():
    pass


@blue.route('/<_id>/$')
@login_required
def pay(_id):
    _id = ObjectId(_id)
    assert_ownership(_id)
    pass


@blue.route('/<_id>/')
@login_required
def paid(_id):
    _id = ObjectId(_id)
    assert_ownership(_id)
    # aggregation of all
