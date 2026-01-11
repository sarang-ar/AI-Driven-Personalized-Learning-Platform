from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Feedback

feedback_bp = Blueprint("feedback", __name__)

@feedback_bp.route("/add", methods=["POST"])
@jwt_required()
def add_feedback():
    user = get_jwt_identity()
    data = request.json

    fb = Feedback(
        course_id=data["course_id"],
        student_id=user["id"],
        comment=data["comment"]
    )
    request.db.add(fb)
    request.db.commit()
    return jsonify({"message": "Feedback submitted"})
