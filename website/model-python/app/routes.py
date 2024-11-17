
import os
from flask import Blueprint, jsonify, request
import types
import marshal, pickle

main = Blueprint('main', __name__)


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def recommend(que, simil, list_data):
  index = list_data[list_data['name'] == que].index[0]  
  distances = sorted(list(enumerate(simil[index])),reverse=True,key = lambda x: x[1])
  ques= []
  for i in distances[1:6]:
    ques.append(list_data.iloc[i[0]]['name'])
  return ques


@main.route('/api/data', methods=['POST'])
def send_data():
    request_data = request.get_json()
    if not request_data or 'qname' not in request_data:
        return jsonify({"error": "Invalid request data"}), 400
    qname = request_data.get('qname', 'No question provided')
    qname = str(qname)

    new_sim_path = os.path.join(BASE_DIR, '../../../pre_trained_model/traditional/traditional_similarity.pkl')
    new_data_path = os.path.join(BASE_DIR, '../../../pre_trained_model/traditional/traditional_ques_list.pkl')

    try:
        new_sim = pickle.load(open(new_sim_path, 'rb'))
        new_data = pickle.load(open(new_data_path, 'rb'))
    except FileNotFoundError as e:
        return jsonify({"error": f"File not found: {e}"}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500

    data = recommend(qname, new_sim, new_data)
    response = {
        "q1": data[0],
        "q2": data[1],
        "q3": data[2],
        "q4": data[3],
        "q5": data[4]
    }
    return jsonify(response), 200


@main.route('/api/embed_data', methods=['POST'])
def send_embed_data():
    request_data = request.get_json()
    if not request_data or 'qname' not in request_data:
        return jsonify({"error": "Invalid request data"}), 400
    qname = request_data.get('qname', 'No question provided')
    qname = str(qname)

    new_sim_path = os.path.join(BASE_DIR, '../../../pre_trained_model/traditional/traditional_similarity.pkl')
    new_data_path = os.path.join(BASE_DIR, '../../../pre_trained_model/traditional/traditional_ques_list.pkl')

    try:
        new_sim = pickle.load(open(new_sim_path, 'rb'))
        new_data = pickle.load(open(new_data_path, 'rb'))
    except FileNotFoundError as e:
        return jsonify({"error": f"File not found: {e}"}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500

    data = recommend(qname, new_sim, new_data)
    response = {
        "q1": data[0],
        "q2": data[1],
        "q3": data[2],
        "q4": data[3],
        "q5": data[4]
    }
    return jsonify(response), 200
