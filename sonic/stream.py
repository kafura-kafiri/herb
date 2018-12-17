from sonic import app
from sanic.response import json, file_stream
import subprocess


@app.route("/videos/<_id>/")
async def test(request, _id):
    url = 'https://www.youtube.com/watch?v={}'.format(_id)
    subprocess.Popen(["proxychains", " youtube-dl", "-o", "static/{}.mp4".format(_id), url], stdout=subprocess.PIPE)
    return json({"hello": url})


@app.route("/videos/<path>")
async def video_get(request, path):
    return await file_stream('static/' + path, mime_type='video/mp4')

