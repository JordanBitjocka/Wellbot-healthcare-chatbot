from pathlib import Path

import csv

import numpy as np

import pandas as pd

from sklearn.model_selection import train_test_split

from sklearn.preprocessing import LabelEncoder

from sklearn.tree import DecisionTreeClassifier



BASE_DIR = Path(__file__).resolve().parent.parent

DATA_DIR = BASE_DIR / 'Data'



training = pd.read_csv(DATA_DIR / 'Training.csv')

testing = pd.read_csv(DATA_DIR / 'Testing.csv')

cols = training.columns[:-1]

x = training[cols]

y = training['prognosis']



label_encoder = LabelEncoder()

y_encoded = label_encoder.fit_transform(y)

x_train, x_test, y_train, y_test = train_test_split(x, y_encoded, test_size=0.33, random_state=42)

classifier = DecisionTreeClassifier(random_state=42)

classifier.fit(x_train, y_train)



def predict_disease(symptoms, days=None):
  
    """Return the predicted class and model probability for known symptoms."""
  
    symptoms_dict = {symptom: index for index, symptom in enumerate(cols)}
  
    input_vector = np.zeros(len(symptoms_dict))
  
    for symptom in symptoms:
      
        if symptom in symptoms_dict:
          
            input_vector[symptoms_dict[symptom]] = 1
          
    prediction = classifier.predict([input_vector])[0]
  
    confidence = classifier.predict_proba([input_vector]).max()
  
    disease = label_encoder.inverse_transform([prediction])[0]
  
    return disease, float(confidence)
  


def _read_csv_dict(filename, values):
  
    result = {}
  
    with open(DATA_DIR / filename, newline='', encoding='utf-8') as csv_file:
      
        for row in csv.reader(csv_file):
          
            if row:
              
                result[row[0]] = values(row)
              
    return result
  


def get_symptom_description(disease):
  
    return _read_csv_dict('symptom_Description.csv', lambda row: row[1]).get(disease)
  


def get_precautions(disease):
  
    return _read_csv_dict('symptom_precaution.csv', lambda row: row[1:5]).get(disease)
  


def get_severity(symptom):
  
    return _read_csv_dict('Symptom_severity.csv', lambda row: int(row[1])).get(symptom)
  
























