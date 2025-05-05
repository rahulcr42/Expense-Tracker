from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("expense_category_predictor.pkl")

@app.route('/predict-category', methods=['POST'])
def predict_category():
    data = request.get_json()
    description = data.get('description', '')

    if not description:
        return jsonify({'error': 'No description provided'}), 400

    category = model.predict([description])[0]
    return jsonify({'category': category})

if __name__ == '__main__':
    app.run(debug=True)
