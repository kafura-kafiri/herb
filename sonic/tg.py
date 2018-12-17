from sanic.response import html, json, file, file_stream
from telethon import TelegramClient
import asyncio
from sonic import api_hash, api_id, app


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
