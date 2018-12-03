from tools.trans import digify


def articlate(raw_article):
    article = {
        "base": {
            'theme': None
        },
        "meta": {
            'level_1': 'فصل',
            'level_2': 'بخش',
        },
        "reviews": {
            "aggregation": {
                "num": 0,
                "sum": 0,
                "view": 0,
            },
            "data": []
        }
    }
    level_1 = raw_article.split('===')
    meta = level_1[0]
    level_titles = level_1[1::2]
    level_1 = level_1[2::2]
    level_1 = list(zip(level_titles, level_1))
    level_1 = [
        {'title': level[0], 'level_2': [sectionize(section, i) for i, section in enumerate(level[1].split('=_='))]} for
        level in level_1]
    article['level_1'] = level_1
    print(level_1)

    n = 0
    for i, line in enumerate(meta.split('\n')):
        if line.strip():
            if n == 0:
                article['meta']['category'] = line.strip()
            if n == 1:
                article['meta']['title'] = line.strip()
                article['meta']['intro'] = ''.join(meta.split('\n')[i + 1:])
            n += 1
    return article


def sectionize(raw, i):
    if '==' in raw:
        b, raw = [phrase for phrase in raw.split('==') if phrase.strip()]
    else:
        b = ''
    raw = raw.split('\n')
    li = [l.replace('--', '') for l in raw if '--' in l]
    raw = '\n'.join([l for l in raw if '--' not in l and l.strip()])
    return {
        "index": digify(i + 1),
        "b": b,
        "i": "",
        "li": li,
        "t": raw,
        "tr": []
    }


if __name__ == '__main__':
    article = articlate(raw)

    import json
    with open('_.json', 'w') as f:
        f.writelines(json.dumps(article, ensure_ascii=False))
