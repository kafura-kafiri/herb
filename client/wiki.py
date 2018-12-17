import requests
import json
import numpy as np
import mimetypes
import cv2
import imutils
from bson import ObjectId
from tools.media import insert_img


# def main_img(title, _id):
#     img = requests.post(
#         'https://fa.wikipedia.org/w/api.php',
#         data={
#             'action': 'query',
#             'prop': 'pageimages',
#             'format': 'json',
#             'piprop': 'original',
#             'titles': title
#         }).text
#     img = json.loads(img)
#     return img['query']['pages'][str(_id)]['original']['source']
#
#
# response = requests.post(
#     'https://fa.wikipedia.org/w/api.php',
#     data={
#         'action': 'query',
#         'format': 'json',
#         'list': 'categorymembers',
#         'cmtitle': 'رده:گیاهان_دارویی',
#         'prop': 'images',
#         'cmlimit': 67
#     })
# response = json.loads(response.text)
# response = response['query']['categorymembers']
# herbs = []
# for page in response:
#     if '(سرده)' not in page['title']:
#         try:
#             herbs.append({
#                 'title': page['title'],
#                 'id': page['pageid'],
#                 'img': main_img(page['title'], page['pageid'])
#             })
#         except:
#             pass
#
#
# with open('_herbs.json', 'w') as f:
#     f.write(json.dumps(herbs, ensure_ascii=False))

print('json finished')

with open('_herbs.json') as f:
    herbs = json.loads(f.read())
    _herbs = []
    imgs = None
    o = None
    idx = 0
    x = 0
    for herb in herbs:
        try:
            mime_type = mimetypes.guess_type(herb['img'])[0]
            r = requests.get(herb['img'], stream=True)
            r = r.raw.read()
            herb['raw_img'] = str(ObjectId())
            insert_img(r, herb['raw_img'], mime_type='image/jpg')
            nparr = np.fromstring(r, np.uint8)
            img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)  # cv2.IMREAD_COLOR in OpenCV 3.1
            img_np = imutils.resize(img_np, height=90)
            if imgs is None:
                imgs = img_np
                o = str(ObjectId())
            else:
                imgs = np.concatenate((imgs, img_np), axis=1)
            herb['img'] = o
            herb['img_x'] = x
            idx += 1
            x += img_np.shape[1]
            if idx == 5:
                insert_img(cv2.imencode('.jpg', imgs)[1].tostring(), o, sizes=(), mime_type='image/jpg')
                idx = 0
                x = 0
                imgs = None
            print(herb)
            _herbs.append(herb)
        except:
            pass

with open('herbs.json', 'w') as f:
    f.write(json.dumps(_herbs, ensure_ascii=False))
