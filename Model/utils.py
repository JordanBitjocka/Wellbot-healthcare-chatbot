import csv

def load_csv_to_dict(file_path, key_column, value_column):
    """
    Load a CSV file into a dictionary where keys and values are specified columns.

    :param file_path: Path to the CSV file.
    :param key_column: Column name to use as keys.
    :param value_column: Column name to use as values.
    :return: A dictionary with keys and values from the CSV file.
    """
    data_dict = {}
    with open(file_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            key = row[key_column]
            value = row[value_column]
            data_dict[key] = value
    return data_dict

def load_csv_to_list(file_path, columns):
    """
    Load a CSV file into a list of dictionaries.

    :param file_path: Path to the CSV file.
    :param columns: List of column names to include in the output.
    :return: A list of dictionaries, each representing a row in the CSV file.
    """
    data_list = []
    with open(file_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            data_list.append({col: row[col] for col in columns})
    return data_list

def transform_symptoms(symptoms, symptoms_dict):
    """
    Transform a list of symptoms into a binary vector.

    :param symptoms: List of symptoms.
    :param symptoms_dict: Dictionary mapping symptoms to indices.
    :return: A numpy array representing the binary vector.
    """
    import numpy as np
    input_vector = np.zeros(len(symptoms_dict))
    for symptom in symptoms:
        if symptom in symptoms_dict:
            input_vector[symptoms_dict[symptom]] = 1
    return input_vector
