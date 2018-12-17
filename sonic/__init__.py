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


@app.route('/chats/<_id>/@send')
async def send_message(request, _id):
    client = TelegramClient('session_name', api_id, api_hash)
    async with client:
        await client.send_message(_id, request.args['message'][0])
    return json({'success': True})


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

from sonic.tg import app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
