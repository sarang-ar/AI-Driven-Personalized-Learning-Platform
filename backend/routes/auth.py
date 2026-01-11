from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
import bcrypt
from models import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    hashed_pw = bcrypt.hashpw(
        data["password"].encode(),
        bcrypt.gensalt()
    ).decode()

    user = User(
        name=data["name"],
        email=data["email"],
        password=hashed_pw,
        role=data["role"],
        interest=data.get("interest", "")
    )

    request.db.add(user)
    request.db.commit()

    return jsonify({"message": "User registered successfully"})


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = request.db.query(User).filter_by(email=data["email"]).first()

    if user and bcrypt.checkpw(
        data["password"].encode(),
        user.password.encode()
    ):
        # 🔥 FIX: identity MUST be string
        token = create_access_token(identity=str(user.id))

        return jsonify({
            "access_token": token,
            "role": user.role
        })

    return jsonify({"error": "Invalid credentials"}), 401
