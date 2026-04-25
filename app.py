from flask import Flask, render_template, request, jsonify
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

@app.route('/')
def index():
    """Serve the main portfolio page."""
    return render_template('index.html')

@app.route('/api/contact', methods=['POST'])
def contact():
    """
    Handle contact form submissions.
    In a real application, this would send an email or save to a database.
    """
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        if not name or not email or not message:
            return jsonify({"status": "error", "message": "Missing required fields"}), 400

        # Log the message (simulating backend processing)
        logger.info(f"New Contact Form Submission: Name={name}, Email={email}")
        logger.info(f"Message: {message}")

        # Simulate success
        return jsonify({
            "status": "success",
            "message": f"Thanks {name}! Your message has been received."
        }), 200

    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        return jsonify({"status": "error", "message": "Internal server error"}), 500

if __name__ == '__main__':
    print("Starting Flask server...")
    print("URL: http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
