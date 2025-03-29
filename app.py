from flask import Flask, render_template, request, jsonify, redirect, url_for, flash
from data.portfolio_data import get_portfolio_data
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your-secret-key'  # Required for flash messages

# Add current date to all templates
@app.context_processor
def inject_now():
    return {'now': datetime.now()}

@app.route('/')
def index():
    """Render the main landing page with all sections."""
    data = get_portfolio_data()
    return render_template('index.html', 
                          services=data['services'],
                          portfolio_categories=data['portfolio_categories'],
                          portfolio_items=data['portfolio_items'],
                          process_steps=data['process_steps'],
                          datasets=data['datasets'],
                          testimonials=data['testimonials'],
                          stats=data['stats'],
                          python_code_snippet=data['python_code_snippet'])

@app.route('/contact', methods=['POST'])
def contact():
    """Handle the contact form submission."""
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        project_type = request.form.get('project_type')
        message = request.form.get('message')
        
        # Here you would add code to handle the form data
        # For example, sending an email or storing in a database
        
        # For AJAX requests, return JSON
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return jsonify({'success': True, 'message': 'Your message has been sent!'})
        
        # For regular form submissions, redirect with flash message
        flash('Your message has been sent successfully!', 'success')
        return redirect(url_for('index', _anchor='contact'))

# For developing the Flask app independently
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)