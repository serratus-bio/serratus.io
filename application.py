from flask import Flask, render_template, jsonify
from random import randint
from flask_cors import CORS
import requests
from summary_parser import get_json

app = Flask(__name__,
            static_folder = "./dist/assets",
            template_folder = "./dist")
app.config['JSON_SORT_KEYS'] = False
application = app  # for AWS EB
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/summary/<accession>')
def summary_json(accession):
    response = get_json(accession)
    return jsonify(response)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if app.debug:
        return requests.get('http://localhost:8080/{}'.format(path)).text
    return render_template("index.html")
