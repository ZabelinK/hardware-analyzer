import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    # ...
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    HOST = "smtp.gmail.com"
    SUBJECT = "MACHINES ARE DOWN"
    TO = "aspy11984@gmail.com"
    FROM = "aspy11984@gmail.com"
    PASS = "Enter_PASS"
    MAX_DOWN_TIME = 300 # 5 min
