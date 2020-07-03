import io
import urllib


def parse_comment_line(line):
    return dict([pair.split('=') for pair in line.lstrip('SUMZER_COMMENT=').rstrip(';\n').split(',')])


def parse_generic_line(line):
    return dict([pair.split('=') for pair in line.rstrip(';\n').split(';')])


def parse_family_line(line):
    return parse_generic_line(line)


def parse_accession_line(line):
    # there can be ';' in the last entry (name)
    d1 = parse_generic_line(line[:line.index('name=')])
    d2 = dict([line[line.index('name='):].strip(';\n').split('=')])
    d1.update(d2)
    return d1


def parse_summary_filestream(fs):
    obj = {}
    comment_line = next(fs)
    obj['properties'] = parse_comment_line(comment_line)
    line = next(fs)
    obj['families'] = []
    while line.startswith('family'):
        d = parse_family_line(line)
        obj['families'].append(d)
        line = next(fs)
    obj['accessions'] = []
    while line.startswith('acc'):
        d = parse_accession_line(line)
        obj['accessions'].append(d)
        line = next(fs)
    obj['fasta'] = line
    for line in fs:
        obj['fasta'] += line
    return obj


def get_json(sra_accession):
    try:
        url = f'https://s3.amazonaws.com/lovelywater/summary/{sra_accession}.summary'
        file_response = urllib.request.urlopen(url)
        fs = io.StringIO(file_response.read().decode('utf-8'))
        return parse_summary_filestream(fs)
    except Exception:
        return None
