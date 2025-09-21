import os
import sys

# Add your project directory to the Python path
sys.path.insert(0, '/home/hariyali/Hariyali-Botanics')

# Set the Django settings module
os.environ['DJANGO_SETTINGS_MODULE'] = 'core.settings'

# Activate your virtual environment
activate_this = '/home/hariyali/virtualenv/Hariyali-Botanics/3.10/bin/activate_this.py'
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))

# Get the WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

