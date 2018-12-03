from flask_login import LoginManager, login_required, UserMixin, current_user, login_user, logout_user
from flask import redirect, request, url_for, Blueprint, flash, abort
from config import users
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import URLSafeSerializer, BadSignature
import re
import urllib
from urllib.parse import urlparse
from tools.mail import simple_send


def setup(app):
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'login'

    def get_serializer(secret_key=None):
        if secret_key is None:
            secret_key = app.secret_key
        return URLSafeSerializer(secret_key)

    def get_activation_link(user):
        s = get_serializer()
        payload = s.dumps(user.id)
        return url_for('activate_user', payload=payload, _external=True)

    class User(UserMixin):
        def __init__(self, _json):
            self.__dict__ = _json
            self.id = _json['username']

    @login_manager.user_loader
    def user_loader(username):
        try:
            json = users.find_one({'username': username})
            user = User(json)
            return user
        except:
            return

    @login_manager.request_loader
    def request_loader(request):
        username = request.form.get('username')
        try:
            json = users.find_one({'username': username})
            user = User(json)
            user.is_authenticated = check_password_hash(user.password, request.form['password'])
            return user
        except:
            return

    @app.route('/users/activate/<payload>')
    def activate_user(payload):
        s = get_serializer()
        try:
            user_id = s.loads(payload)
        except BadSignature:
            abort(404)

        user = users.find_one_and_update({'username': user_id}, {
            '$set': {'_active': True}
        })
        login_user(User(user))
        flash('User activated')
        return redirect(url_for('views.homepage'))

    @app.route('/login', methods=['GET', 'POST'])
    def login():
        if request.method == 'GET':
            return '''
                   <form action='login' method='POST'>
                    <input type='text' name='username' id='username' placeholder='username'></input>
                    <input type='password' name='password' id='password' placeholder='password'></input>
                    <input type='submit' name='submit'></input>
                   </form>
                   '''
        error = ''
        json = None
        if 'username' in request.form:
            json = users.find_one({'username': request.form['username']})
            if not json:
                json = users.find_one({'email': request.form['username']})
        elif 'email' in request.form:
            json = users.find_one({'email': request.form['email']})
            if not json:
                json = users.find_one({'username': request.form['email']})
        else:
            error = 'id not found'
        if not json:
            error = 'not found'
        elif check_password_hash(json['password'], request.form['password']):
            user = User(json)
            login_user(user)
        else:
            error = 'password mismatch'
        if 'redirect' in request.form:
            _redirect = request.values['redirect']
            _parse = urlparse(_redirect)
            url = _parse[2]
            params = urllib.parse.parse_qs(_parse[4])
            if error:
                params['msg'] = error
            elif 'msg' in params:
                del params['msg']
            _redirect = url + '?' + '&'.join([key + '=' + value for key, value in params.items()])
            return redirect(_redirect)
        elif not error:
            return redirect(url_for('protected'))
        abort(403, error)

    @app.route('/auto_login')
    def auto_login():
        admin = users.find_one({'username': 'admin'})
        login_user(User(admin))
        return redirect(url_for('protected'))

    @app.route('/signup', methods=['GET', 'POST'])
    def signup():
        if request.method == 'GET':
            return '''
                   <form action='signup' method='POST'>
                    <input type='text' name='username' id='username' placeholder='username'></input>
                    <input type='text' name='email' id='email' placeholder='email'></input>
                    <input type='password' name='password' id='pw' placeholder='password'></input>
                    <input type='submit' name='submit'></input>
                   </form>
                   '''

        username = request.form['username']
        email = request.form['email']
        password = generate_password_hash(request.form['password'])
        error = ''
        if not username or not email or not password:
            error = 'input empty'
        elif not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            error = 'email not valid'
        else:
            json = {
                '_active': False,
                'username': username,
                'password': password,
                'phone': '+989104961290',
                'first_name': '*',
                'last_name': '*',
                'email': email,
                'hosting': {
                    'language': ['farsi'],
                    'Response rate': 65,
                    'Response time': 145,
                },
                'wish_list': [],
                'notifications': [],
            }
            try:
                users.insert_one(json)
                user = User(json)
                login_user(user)
                _link = get_activation_link(user)
                simple_send('activation', _link, you=user.email)
            except Exception as e:
                error = str(e)
        if 'redirect' in request.values:
            _redirect = request.values['redirect']
            _parse = urlparse(_redirect)
            url = _parse[2]
            params = urllib.parse.parse_qs(_parse[4])
            if error:
                params['msg'] = error
            elif 'msg' in params:
                del params['msg']
            _redirect = url + '?' + '&'.join([key + '=' + value for key, value in params.items()])
            return redirect(_redirect)
        elif not error:
            return redirect(url_for('protected'))
        else:
            abort(404, error)

    @app.route('/protected')
    @login_required
    def protected():
        return 'Logged in as: ' + current_user.username

    @app.route('/logout', methods=['GET', 'POST'])
    @login_required
    def logout():
        username = current_user.username
        logout_user()
        if 'redirect' in request.values:
            _redirect = request.values['redirect']
            return redirect(_redirect)
        else:
            return username
