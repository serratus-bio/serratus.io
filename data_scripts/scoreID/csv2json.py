import csv
import json

csvfile = open('SerratusIO_scoreID.csv', 'r')
jsonfile = open('../../src/components/Explorer/data/SerratusIO_scoreID.json', 'w')


def try_parse_int(val):
    try:
        return int(val)
    except ValueError:
        return val

if __name__ == '__main__':
    header = next(csvfile)
    keys = header.rstrip().split(',')

    reader = csv.DictReader(csvfile, keys)
    data = {}
    for row in reader:
        for k in row:
            row[k] = try_parse_int(row[k])
        family = row['family']
        if family not in data:
            data[family] = []
        row.pop('family', None)
        data[family].append(row)

    json.dump(data, jsonfile)
    jsonfile.write('\n')
