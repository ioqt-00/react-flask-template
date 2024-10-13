import os

from flask import request, jsonify, Response
from flask_jwt_extended import create_access_token, unset_jwt_cookies

from model import User
from config import db, app
from routes.helpers import admin_required
from routes.user import user_bp


app.register_blueprint(user_bp, url_prefix='/api/users')


@app.route('/api/login', methods=['POST'])
def create_token() -> tuple[Response, int]:
    data = request.json
    username = data["username"]                                         # type: ignore[index]
    password = data["password"]                                         # type: ignore[index]
    user = User.query.filter(User.username == username).scalar()
    if user is None or not user.check_password(password):
        return jsonify({"message": "Wrong credentials"}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token}), 200


@app.route('/api/logout', methods=['POST'])
def logout() -> tuple[Response, int]:
    response = jsonify({"message": "logout successful"})
    unset_jwt_cookies(response)
    return response, 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    env = os.getenv("FLASK_ENV")
    if env == "development":
        app.run(host="0.0.0.0", debug=True)
    else:
        from waitress import serve
        import logging
        logger = logging.getLogger('waitress')
        logger.setLevel(logging.DEBUG)
        serve(app, host="0.0.0.0", port=5000)
