const apiUrl = 'http://127.0.0.1:5000';
let symptoms = [];
let step = 0;

function appendMessage(message, isBot = false) {
    const chatOutput = document.getElementById('chat-output');
    const messageElement = document.createElement('div');
    messageElement.className = isBot ? 'bot-message' : 'user-message';
    messageElement.textContent = message;
    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const input = userInput.value.trim();
    if (input) {
        appendMessage(`You: ${input}`);
        handleUserInput(input);
        userInput.value = '';
    }
}

function handleUserInput(input) {
    if (step === 0) {
        symptoms.push(input);
        appendMessage("WellBot: Are there any other symptoms? If yes, please enter them one by one. If no, type 'no'.", true);
    } else if (step === 1) {
        if (input.toLowerCase() === 'no') {
            appendMessage("WellBot: How many days have you been experiencing these symptoms?", true);
            step++;
        } else {
            symptoms.push(input);
            appendMessage("WellBot: Any other symptom? If no, type 'no'.", true);
        }
    } else if (step === 2) {
        const days = parseInt(input);
        if (isNaN(days)) {
            appendMessage("WellBot: Please enter a valid number of days.", true);
        } else {
            makePrediction(symptoms, days);
        }
    }
    if (step === 0 || step === 1) step = 1;
}

async function makePrediction(symptoms, days) {
    try {
        const response = await fetch(`${apiUrl}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ symptoms: symptoms, days: days })
        });
        const data = await response.json();
        if (data.error) {
            appendMessage(`WellBot: ${data.error}`, true);
        } else {
            appendMessage(`WellBot: You may have ${data.prediction} with ${data.confidence} confidence.`, true);
            getDescription(data.prediction);
        }
    } catch (error) {
        appendMessage(`WellBot: Error fetching prediction.`, true);
    }
}

async function getDescription(disease) {
    try {
        const response = await fetch(`${apiUrl}/description/${disease}`);
        const data = await response.json();
        if (data.error) {
            appendMessage(`Bot: ${data.error}`, true);
        } else {
            appendMessage(`Bot: Description - ${data.description}`, true);
            getPrecautions(disease);
        }
    } catch (error) {
        appendMessage(`WellBot: Error fetching description.`, true);
    }
}

async function getPrecautions(disease) {
    try {
        const response = await fetch(`${apiUrl}/precautions/${disease}`);
        const data = await response.json();
        if (data.error) {
            appendMessage(`WellBot: ${data.error}`, true);
        } else {
            appendMessage(`WellBot: Precautions - ${data.precautions.join(', ')}`, true);
        }
    } catch (error) {
        appendMessage(`WellBot: Error fetching precautions.`, true);
    }
}

document.getElementById('user-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

window.onload = function() {
    appendMessage("WellBot: Hi! I am WellBot. Please tell me your symptom to get started.", true);
};
