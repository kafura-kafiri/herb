def set_walk(d, key, value):
    keys = key.split('.')
    for key in keys:
        if key not in d:
            d[key] = {}
        pre = d
        d = d[key]
    pre[keys[-1]] = value
