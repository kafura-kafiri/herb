from flask import Blueprint, render_template
from config import orders
from tools import crud
blue = Blueprint('orders', __name__, url_prefix='/orders')
crud(blue, orders)


@blue.route('/', methods=['GET', 'POST'])
def order_now():
    return 'yusof', 200