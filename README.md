# WellBot — Symptom Guidance Prototype



WellBot is an educational machine-learning prototype that accepts a list of symptoms, predicts a likely class from the included dataset, and returns related descriptions and precautionary information through a Flask API. The project was developed as an end-of-year project and combines a scikit-learn Decision Tree model with a lightweight browser interface.



> **Important:** WellBot is not a medical device and does not provide medical diagnosis or treatment. Its output is for educational demonstration only. Users should consult a qualified healthcare professional for medical advice.
> 


## What this project demonstrates



The project demonstrates data loading with pandas, label encoding, train/test splitting, Decision Tree model training, probability output, CSV-backed descriptions and precautions, REST-style Flask endpoints, CORS configuration, and a simple HTML/CSS/JavaScript chat interface. No model accuracy figure is claimed because the original project did not preserve a documented evaluation result.



## API routes



| Method | Route | Purpose |

|---|---|---|

| POST | `/predict` | Accepts `symptoms` and `days`; returns a predicted class and model probability. |

| GET | `/description/<disease>` | Returns the matching description from the included CSV data. |

| GET | `/precautions/<disease>` | Returns precaution entries from the included CSV data. |

| GET | `/severity/<symptom>` | Returns the stored severity value for a symptom. |



## Portfolio website

The `docs/` folder contains my personal portfolio website (plain HTML/CSS/JS).
It is published with GitHub Pages and lives at:

**https://jordanbitjocka.github.io/Wellbot-healthcare-chatbot/**

To publish it, go to **Settings → Pages**, choose *Deploy from a branch*,
select the default branch and the `/docs` folder.




```bash

python -m venv .venv

# macOS/Linux

source .venv/bin/activate

# Windows

# .venv\\Scripts\\activate

pip install -r requirements.txt

python app.py

```



The API starts on `http://127.0.0.1:5000`. The browser interface in `ui/` is a static client and expects that local API address.



## Repository structure



```text

app.py                 Flask API

Model/model.py        Model training and CSV lookup functions

Data/                  Training, testing, description, precaution, severity data

ui/                    Browser chat interface

Static/ Template/ js/  Original Flask interface assets

docs/                  Portfolio website (GitHub Pages)

```



## Portfolio context



This project is presented as a learning-focused prototype showing practical work across machine learning, Python, API development, and responsible communication of model limitations.


