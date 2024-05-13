import os
from datetime import timedelta

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

db = SQLAlchemy()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("SQLALCHEMY_DATABASE_URI", None)
assert app.config['SQLALCHEMY_DATABASE_URI'] is not None
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

app.config["JWT_SECRET_KEY"] = os.urandom(24)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
# TODO need a refresh function  https://dev.to/nagatodev/how-to-add-login-authentication-to-a-flask-and-react-application-23i7
jwt = JWTManager(app)
