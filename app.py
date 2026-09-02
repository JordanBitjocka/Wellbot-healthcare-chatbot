from flask import Flask, request, jsonify

from Model.model import predict_disease, get_symptom_description, get_precautions, get_severity

from flask_cors import CORS, cross_origin



app = Flask(__name__)

CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'



@app.route('/predict', methods=['POST'])

@cross_origin()

def predict():
  
    data = request.json or {}
  
    symptoms = data.get('symptoms')
  
    days = data.get('days')
  
    if not symptoms or days is None:
      
        return jsonify({'error': 'Invalid input'}), 400
      
    prediction, confidence = predict_disease(symptoms, days)
  
    return jsonify({'prediction': prediction, 'confidence': confidence})
  


@app.route('/description/<disease>', methods=['GET'])

@cross_origin()

def description(disease):
  
    desc = get_symptom_description(disease)
  
    if desc:
      
        return jsonify({'description': desc})
      
    return jsonify({'error': 'Disease not found'}), 404
  


@app.route('/precautions/<disease>', methods=['GET'])

@cross_origin()

def precautions(disease):
  
    values = get_precautions(disease)
  
    if values:
      
        return jsonify({'precautions': values})
      
    return jsonify({'error': 'Disease not found'}), 404
  


@app.route('/severity/<symptom>', methods=['GET'])

@cross_origin()

def severity(symptom):
  
    value = get_severity(symptom)
  
    if value is not None:
      
        return jsonify({'severity': value})
      
    return jsonify({'error': 'Symptom not found'}), 404
  


if __name__ == '__main__':
  
    app.run(debug=True)
  

























