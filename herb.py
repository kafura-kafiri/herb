from flask import Flask, render_template
from flask_cors import CORS
from login import setup as add_login

from user import blue as user
from tools.media import blue as media
from tools.backup import blue as backup
from config import configure
from tools.symlink import blue as symlink
from product import blue as product
from how import blue as how
from order import blue as order
from search.topic import blue as topic
from page import blue as page
from search.tag import blue as tag
from aggregation import crud as analytic
from search import blue as search
from config import products
from face import blue as face
from hybrid import blue as hybrid


app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'very secret key'
app.config['TESTING'] = True
app.config['domain'] = 'http://127.0.0.1:5000/'
app.config['JSON_AS_ASCII'] = False

configure(app)
add_login(app)

app.register_blueprint(user)
app.register_blueprint(media)
app.register_blueprint(backup)
app.register_blueprint(symlink)
app.register_blueprint(product)
app.register_blueprint(how)
app.register_blueprint(order)
app.register_blueprint(topic)
app.register_blueprint(page)
app.register_blueprint(tag)
app.register_blueprint(analytic(), url_prefix='/analytics')
app.register_blueprint(search)
app.register_blueprint(face)
app.register_blueprint(hybrid)


@app.route('/')
def homepage():
    # from crud._services.analytics import show_trending
    # it's just a query to mongodb to show some products
    context = dict()
    context['products'] = products.aggregate([{
        '$sample': {
            'size': 7
        },
    }])
    context['banner'] = [
        {
            'img': '/static/img/banner/0.jpg',
            'link': 'beauty'
        }, {
            'img': '/static/img/banner/1.jpg',
            'link': 'wellness'
        }, {
            'img': '/static/img/banner/2.jpg',
            'link': 'conditions'
        }, {
            'img': '/static/img/banner/3.jpg',
            'link': 'soap'
        },
    ]
    return render_template('homepage/index.html', **context)


@app.route('/header')
def header():
    return render_template('layout/header/index.html')


@app.route('/pro/dropdown', methods=['GET', 'POST'])
def dropdown():
    return render_template('layout/header/dropdown.html')


@app.route('/pro/sticky-header', methods=['GET', 'POST'])
def sticky_header():
    return render_template('layout/header/sticky-header.html')


@app.route('/Pro/CountrySelection/', methods=['GET', 'POST'])
def country_selection():
    return render_template('layout/header/country-selection.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
