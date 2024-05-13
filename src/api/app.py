import os
from functools import wraps

from flask import request, jsonify, Response
from flask_jwt_extended import create_access_token, verify_jwt_in_request,\
                               unset_jwt_cookies, jwt_required, get_jwt_identity

from model import User, Project, Vote, SubProject
from config import db, app


# TODO ...
def admin_required():
    def admin_required(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            identity = get_jwt_identity()
            admin_id = User.query.filter(User.username == "ioqt").first().id
            if identity == admin_id:
                return fn(*args, **kwargs)
            else:
                return jsonify({'message': 'Admins only!'}), 403
        return decorator
    return admin_required


@app.route('/users', methods=['GET'])
@admin_required()
def get_users() -> Response:
    """GET request to fetch all users"""
    users = User.query.all()
    user_list = []
    for user in users:
        user_list.append({
            'id': user.id,
            'username': user.username,
            'email': user.email
        })
    return jsonify(user_list)


@app.route('/users/<int:user_id>', methods=['GET'])
@admin_required()
def get_user(user_id: int) -> Response:
    """GET request to fetch a specific user by id"""
    user = User.query.get_or_404(user_id)
    return jsonify({
        'id': user.id,
        'username': user.username,
        'email': user.email
    })


@app.route('/users', methods=['POST'])
def create_user() -> tuple[Response, int]:
    data = request.json
    username = data['username']
    user = User.query.filter(User.username == username).first()
    if user is not None:
        return jsonify({'message': f'User with username {username} already exists', 'id': user.id}), 403
    new_user = User(username=username, email=data['email'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201


@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id: int) -> tuple[Response, int]:
    user = User.query.get_or_404(user_id)
    data = request.json
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    if 'password' in data:
        user.set_password(data['password'])
    db.session.commit()
    return jsonify({'message': 'User updated successfully'}), 200


@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id: int) -> tuple[Response, int]:
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200


@app.route('/login', methods=['POST'])
def create_token():
    data = request.json
    username = data["username"]
    password = data["password"]
    user = User.query.filter(User.username == username).scalar()
    if user is None or not user.check_password(password):
        return jsonify({"message": "Wrong credentials"}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token}), 200


@app.route('/logout', methods=['POST'])
def logout():
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
        logger.setLevel(logging.INFO)
        serve(app, host="0.0.0.0", port=5000)
