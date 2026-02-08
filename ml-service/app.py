from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# Download NLTK resources (only for the first time)
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

app = Flask(__name__)
CORS(app)

ps = PorterStemmer()
stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    # Convert to lowercase
    text = text.lower()
    # Remove special characters
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    # Tokenization & Stemming & Stopword removal
    tokens = text.split()
    cleaned_tokens = [ps.stem(word) for word in tokens if word not in stop_words]
    return " ".join(cleaned_tokens)

# Simple Rule-based classification for demonstration (College level)
# In a production app, you would load a pickled Scikit-learn model here.
SCAM_KEYWORDS = ['urgent', 'bank', 'password', 'money', 'nigeria', 'inheritance', 'win', 'prize', 'lottery', 'wire transfer', 'western union']

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    
    original_text = data['text']
    processed_text = preprocess_text(original_text)
    
    # Simple logic: check for scam keywords
    score = 100
    found_keywords = []
    
    for kw in SCAM_KEYWORDS:
        if kw in processed_text:
            score -= 15
            found_keywords.append(kw)
    
    # Ensure score doesn't go below 0
    score = max(0, score)
    
    label = "Ham" if score > 70 else "Spam"
    
    return jsonify({
        'label': label,
        'probability': score / 100,
        'processed_text': processed_text,
        'reason': f"Found suspicious patterns: {', '.join(found_keywords)}" if found_keywords else "No suspicious keywords detected."
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)
