import re
from tools.trans import digify
"""
\n ## must be first \n
__keep near__
\n- must be first \n
-
-
[GitHub Pages](https://pages.github.com/)
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

tr <-
use emoji
* *
> blah blah
` fewoijf `

"""
a = [
    ('h', ''), ('b', ''), ('p', ''), ('i', ''), ('tr', []), ('li', [])
]

bold = r"__[^\s][^_]*[^\s]__|__[^\s]__"
url = "\[[^)]+]\(http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+\)"


def _aline(phrase):
    indexes = [(m.start(0), m.end(0)) for m in re.finditer(bold, phrase)]
    indexes.extend([(m.start(0), m.end(0)) for m in re.finditer("!?" + url, phrase)])
    indexes = sorted(list(set([e[0] for e in indexes] + [e[1] for e in indexes])))
    aline = []
    n = 0
    for i, c in enumerate(phrase):
        if n < len(indexes) and indexes[n] == i:
            aline.append('\n')
            n += 1
        aline.append(c)
    return re.sub('\n\s*\n', '\n', ''.join(aline))


def parse(aline):
    """
    merge near b, t, li
    """
    arr = []
    for line in iter(aline.splitlines()):
        line = line.strip()
        if line:
            if re.match(bold, line):
                arr.append(('b', line[2:-2]))
            elif re.match("!" + url, line):
                arr.append(('i', line.split('](')[0][2:], line.split('](')[1][:-1]))
            elif re.match(url, line):
                arr.append(('link', line.split('](')[0][1:], line.split('](')[1][:-1]))
            elif re.match("##.*", line):
                arr.append(('h', line[2: ]))
            elif re.match("#.*", line):
                arr.append(('title', line[1: ]))
            elif re.match("- .*", line):
                arr.append(('li', [line[1: ]]))
            else:
                arr.append(('t', line))
    parsed = []
    for kind, *data in arr:
        if parsed and parsed[-1][0] == kind and (kind == 'b' or kind == 'p' or kind == 'li'):
            try:
                parsed[-1][1] += ' ' + data[0]
            except:
                parsed[-1][1].extend(data[0])
        else:
            parsed.append([kind, *data])
    return parsed


def section(parsed):
    title, parsed = parsed[0][1], parsed[1:]
    level_2 = []
    while parsed and parsed[0][0] != 'h':
        if not level_2 or level_2[-1][parsed[0][0]]:
            level_2.append({
                "index": digify(len(level_2) + 1),
                "b": '',
                "i": '',
                "li": [],
                "t": '',
                "tr": []
            })
        level_2[-1][parsed[0][0]] = parsed[0][1]
        parsed = parsed[1:]
    return {'title': title, 'level_2': level_2}, parsed


def articlate(parsed):
    article = {
        "base": {
            'theme': None
        },
        "meta": {
            'level_1': 'فصل',
            'level_2': 'بخش',
            'category': '',
            'title': '',
            'intro': '',
            't': '',
            'b': '',
            'i': ''
        },
        "reviews": {
            "aggregation": {
                "like": 0,
                "num": 0,
                "sum": 0,
                "view": 0,
            },
            "reviews": []
        },
        "level_1": []
    }
    if parsed[0][0] == 'title':
        article['meta']['title'] = parsed[0][1]
        s, parsed = section(parsed[1:])
        article['meta']['intro'] = s['title']
        try:
            article['meta']['b'] = s['level_2'][0]['b']
            article['meta']['t'] = s['level_2'][0]['t']
        except:
            pass
    while parsed:
        s, parsed = section(parsed[1:])
        article['level_1'].append(s)
    return article


if __name__ == '__main__':
    _phrase = """__fower__[GitHub Pages](https://pages.github.com/)
    __abc__ __abc__
    
    !![GitHub Pages](https://pages.github.com/)"""
    with open('/home/pouria/Desktop/6_germ/text') as f:
        print(articlate(parse(_aline(f.read()))))
