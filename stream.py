from sanic import Sanic
from sanic.response import html, json, file, file_stream
from telethon import TelegramClient
import asyncio
import subprocess

app = Sanic()
api_id = 165248
api_hash = '287208e1887c8e18f37d92a545a26376'


@app.websocket('/chats/<_id>')
async def feed(request, ws, _id):
    await ws.send('hello im {}. how can i help you'.format(_id))
    client = TelegramClient('session_name', api_id, api_hash)
    async with client:
        while True:
            try:
                await asyncio.wait_for(client.send_message(_id, await ws.recv()), timeout=.5)
            except:
                for message in client.get_messages(_id):
                    # just
                    ws.send(message)
            return json({'success': True})


@app.route('/chats/<_id>')
async def send_message(request, _id):
    client = TelegramClient('session_name', api_id, api_hash)
    async with client:
        await client.send_message(_id, request.args['message'][0])
    return json({'success': True})


@app.route('/free')
async def free(request):
    return json({
        'id': '@shidgolitvk',
        'name': 'tavakoli',
        'img': '/tavakoli.jpg'
    })


@app.route('/')
async def home(request):
    return html("""
    <!DOCTYPE html>
    <html>
    <script type="text/javascript">
        var webSocket = new WebSocket('ws://localhost:5001/feed');
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


@app.route("/d/<_id>")
async def test(request, _id):
    url = 'https://www.youtube.com/watch?v={}'.format(_id)
    subprocess.Popen(["proxychains", " youtube-dl", "-o", "static/{}.mp4".format(_id), url], stdout=subprocess.PIPE)
    return json({"hello": url})


@app.route("/v/<path>")
async def video_get(request, path):
    return await file_stream('static/' + path, mime_type='video/mp4')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
