import ast

dec = {
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
    '۰': '0',
}

enc = {
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
    '0': '۰',
}


def complete(article, num, strings):
    nums = num.split('.')
    nums = [ast.literal_eval(n) if n in enc else dec[n] for n in nums]
    num = '.'.join(nums)
    nums = [int(n) for n in nums]
    if num == '0':
        article['meta']['title'] = strings[0]
    elif num == '0.0':
        article['meta']['intro'] = strings[0]
    else:
        if len(nums) == 1:
            while len(article['level_1']) < nums[0]:
                article['level_1'].append(
                    {
                        'title': 'خواص و فواید درمانی انار',
                        'index': '۱',
                        'level_2': [],
                    }
                )
            level_1 = article['level_1'][nums[0] - 1]
            level_1['index'] = enc[str(nums[0])]
            title = strings[0]
            level_1['title'] = title
        elif len(nums) == 2:
            level_1 = article['level_1'][nums[0] - 1]
            (b, t) = strings if len(strings) == 2 else [''].extend(strings)
            while len(level_1['level_2']) < nums[1]:
                level_1['level_2'].append(
                    {
                        'b': '',
                        't': '',
                    }
                )
            level_2 = level_1['level_2'][nums[1] - 1]
            level_2['t'] = t
            level_2['b'] = b
        elif len(nums) == 3:
            level_1 = article['level_1'][nums[0] - 1]
            level_2 = level_1['level_2'][nums[1] - 1]
            if len(strings) == 1:
                if 'li' not in level_2:
                    level_2['li'] = []
                while len(level_2['li']) < nums[2]:
                    level_2['li'].append('')
                level_2['li'][nums[2] - 1] = strings[0]
            else:
                if 'tr' not in level_2:
                    level_2['tr'] = []
                while len(level_2['tr']) < nums[2]:
                    level_2['tr'].append([])
                level_2['tr'][nums[2] - 1] = strings
    return article


def articlate(raw_article, article={}):
    article['meta'] = {
        'level_1': 'فصل',
        'level_2': 'بخش',
    }
    article['base'] = {
        'theme': None
    }
    article['level_1'] = []
    text = raw_article
    parts = text.split(';')
    parts = [part.split(':') for part in parts]
    for sections in parts:
        if len(sections) == 2:
            num = sections[0].strip()
            strings = sections[1].split('$')
            article = complete(article, num, strings)
    return article
