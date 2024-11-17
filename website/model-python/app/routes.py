
import os
from flask import Blueprint, jsonify, request
import types
import marshal, pickle
import pickle
import types
import torch
import transformers
import pandas as pd

main = Blueprint('main', __name__)


# Function to get embedding for a new input question
def get_question_embedding(text, mtokenizer, mmodel, device):
    inputs = mtokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=64)
    input_ids = inputs['input_ids'].to(device)
    attention_mask = inputs['attention_mask'].to(device)

    with torch.no_grad():
        outputs = mmodel(input_ids, attention_mask=attention_mask)
        last_hidden_state = outputs.last_hidden_state

        # Apply average pooling
        sentence_embedding = last_hidden_state.mean(dim=1).squeeze(0).cpu().numpy()
    return sentence_embedding

def find_similar_questions(input_text, mtokenizer, mmodel,  pca_class, my_cosine, embed, device, train_sample, top_n=5):

  input_embedding = get_question_embedding(input_text, mtokenizer, mmodel, device)

  # Reduce the dimensionality of the input embedding to match the stored embeddings
  input_embedding_reduced = pca_class.transform(input_embedding.reshape(1, -1))

  # Calculate cosine similarity with each question embedding in train_sample
  similarities = my_cosine(input_embedding_reduced, embed)

  # Get the top N most similar questions
  top_indices = similarities[0].argsort()[-top_n:][::-1]
  similar_questions = train_sample.iloc[top_indices][['name']]
  return similar_questions.to_dict()['name']

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

    try:
        my_model = pickle.load(open(os.path.join(BASE_DIR, "../../../pre_trained_model/embedding/embed_model.pkl"), 'rb'))
        my_tokenizer= pickle.load( open(os.path.join(BASE_DIR ,"../../../pre_trained_model/embedding/embed_tokenizer.pkl"), 'rb') )
        my_cosine= pickle.load(open(os.path.join(BASE_DIR,"../../../pre_trained_model/embedding/embed_cosine.pkl"), 'rb') )
        my_pca= pickle.load(open(os.path.join(BASE_DIR,"../../../pre_trained_model/embedding/embed_pca.pkl"), 'rb') )
        my_embed= pickle.load(open( os.path.join(BASE_DIR,"../../../pre_trained_model/embedding/embed_embeddings.pkl"), 'rb') )
        my_train_sample= pickle.load(open(os.path.join(BASE_DIR,"../../../pre_trained_model/embedding/embed_train_sample.pkl"), 'rb') )
    except FileNotFoundError as e:
        return jsonify({"error": f"File not found: {e}"}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500

    data = find_similar_questions(qname, my_tokenizer, my_model, my_pca, my_cosine, my_embed, 'cpu', my_train_sample, top_n=50)
    response = {
        "check" : data
    }
    return jsonify(response), 200
