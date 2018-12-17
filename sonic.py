from sanic import Sanic
from sanic.response import html, json, file, file_stream
from telethon import TelegramClient
from sanic_cors import CORS
import asyncio
import subprocess

app = Sanic()
CORS(app)
api_id = 165248
api_hash = '287208e1887c8e18f37d92a545a26376'

so
# @app.websocket('/chats/')
@app.websocket('/chats/<_id>')
async def feed(request, ws, _id):
    print(_id)
    client = TelegramClient('session_name', api_id, api_hash)
    async with client:
        print(client.get_entity(_id))
    await ws.send('hello im {}. how can i help you'.format(_id))
    client = TelegramClient('session_name', api_id, api_hash)
    async with client:
        while True:
            try:
                await asyncio.wait_for(client.send_message(_id, await ws.recv()), timeout=.5)
            except:
                for message in client.get_messages(_id):
                    ws.send(message)


@app.route('/')
async def home(request):
    return html("""
    <!DOCTYPE html>
    <html>
    <script type="text/javascript">
        var webSocket = new WebSocket('ws://' + window.location.url.split('/')[2] + '/chats/+989058083768');
        webSocket.onerror = function(event) {
            alert(event.data);
        };
        webSocket.onopen = function(event) {
            document.getElementById('messages').innerHTML = 'Now Connection established';
        };
        webSocket.onmessage = function(event) {
            alert(event.data);
        };
        function start() {
            var text = document.getElementById("userinput").value;

            webSocket.send(text);
            return false;
        }
    </script>
    <body>
    <div>
        <input type="text" id="userinput" /> <br> <input type="submit" value="Send Message to Server" onclick="start()" />
    </div>
    <div id="messages"></div>
    </body>
    </html>
    """)


@app.route('/chats/<_id>/@send')
async def send_message(request, _id):
    client = TelegramClient('session_name', api_id, api_hash)
    async with client:
        await client.send_message(_id, request.args['message'][0])
    return json({'success': True})


@app.route('/favicon.ico')
async def ico(request):
    return json({'success': True})


@app.route("/videos/<_id>/")
async def test(request, _id):
    url = 'https://www.youtube.com/watch?v={}'.format(_id)
    subprocess.Popen(["proxychains", " youtube-dl", "-o", "static/{}.mp4".format(_id), url], stdout=subprocess.PIPE)
    return json({"hello": url})


@app.route("/videos/<path>")
async def video_get(request, path):
    return await file_stream('static/' + path, mime_type='video/mp4')


from sonic.tg import app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
