from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User, Course, Feedback
from recommender.recommendation import recommend_courses

student_bp = Blueprint("student", __name__)

@student_bp.route("/courses", methods=["GET"])
@jwt_required()
def get_courses():
    user_id = int(get_jwt_identity())
    user = request.db.query(User).filter_by(id=user_id).first()

    courses = request.db.query(Course).all()
    recommended = recommend_courses(user.interest, courses)

    return jsonify([
        {
            "id": c.id,
            "title": c.title,
            "description": c.description,
            "category": c.category,
            "video_url": c.video_url,
            "video_file": c.video_file
        }
        for c in recommended
    ])


@student_bp.route("/interest", methods=["PUT"])
@jwt_required()
def update_interest():
    user_id = int(get_jwt_identity())
    interest = request.json.get("interest", "").strip()

    user = request.db.query(User).filter_by(id=user_id).first()
    user.interest = interest
    request.db.commit()

    return jsonify({"message": "Interests updated"})


@student_bp.route("/feedback", methods=["POST"])
@jwt_required()
def add_feedback():
    user_id = int(get_jwt_identity())
    data = request.json

    fb = Feedback(
        course_id=data["course_id"],
        student_id=user_id,
        rating=int(data["rating"]),
        comment=data["comment"]
    )

    request.db.add(fb)
    request.db.commit()

    return jsonify({"message": "Feedback submitted"})
