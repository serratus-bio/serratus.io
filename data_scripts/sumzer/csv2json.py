import csv
import json

csvfile = open('cov3ma.sumzer.tsv', 'r')
jsonfile = open('../../src/components/Explorer/data/cov3ma.genbank.json', 'w')

if __name__ == '__main__':
    reader = csv.reader(csvfile, delimiter='\t')
    data = [row[0] for row in reader]
    json.dump(data, jsonfile)
    jsonfile.write('\n')
