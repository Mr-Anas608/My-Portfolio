# Web Scraping Specialist - Flask Version

This is a Flask version of the Web Scraping Specialist portfolio landing page, providing an easy-to-maintain alternative to the React version.

## Features

- Responsive design with Tailwind CSS
- Dark/light theme toggle
- Interactive animations and effects
- Portfolio filtering
- Contact form with AJAX submission
- Particle effects background
- Custom cursor

## Project Structure

```
flask_version/
├── data/                  # Data modules
│   ├── __init__.py
│   └── portfolio_data.py  # Portfolio data 
├── static/                # Static assets
│   ├── css/               # CSS files
│   │   └── styles.css     # Main stylesheet
│   ├── js/                # JavaScript files
│   │   ├── main.js        # Main JavaScript
│   │   └── particles.min.js # Particles.js library
│   └── images/            # Images and icons
├── templates/             # HTML templates
│   ├── base.html          # Base template
│   ├── index.html         # Main page template
│   └── components/        # Reusable components
│       ├── header.html    # Site header
│       ├── footer.html    # Site footer
│       ├── hero.html      # Hero section
│       └── ...            # Other components
├── app.py                 # Main Flask application
└── requirements.txt       # Python dependencies
```

## Setup and Installation

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the application:
   ```
   python app.py
   ```

5. Access the website at `http://localhost:5000`

## Customization

### Modifying Content

All content is stored in `data/portfolio_data.py`. You can update services, portfolio items, testimonials, and other content by editing this file.

### Styling

The main styling is done with Tailwind CSS via CDN and custom styles in `static/css/styles.css`.

### JavaScript Functionality

Main JavaScript functionality is in `static/js/main.js`.

## Benefits of Flask Version

1. **Simplicity**: Easier to understand and modify for Python developers
2. **Maintainability**: Less complex code structure compared to React
3. **Performance**: No client-side rendering or large JS bundle
4. **SEO-friendly**: Server-rendered content