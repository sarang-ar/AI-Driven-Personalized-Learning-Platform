from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from models import Course, User, Feedback
import os

teacher_bp = Blueprint("teacher", __name__)
UPLOAD_FOLDER = "uploads"

@teacher_bp.route("/add-course", methods=["POST"])
@jwt_required()
def add_course():
    teacher_id = int(get_jwt_identity())
    teacher = request.db.query(User).filter_by(id=teacher_id, role="teacher").first()

    title = request.form.get("title")
    description = request.form.get("description")
    category = request.form.get("category")
    video_url = request.form.get("video_url")

    filename = None
    if "video_file" in request.files:
        f = request.files["video_file"]
        if f.filename:
            filename = secure_filename(f.filename)
            f.save(os.path.join(UPLOAD_FOLDER, filename))

    course = Course(
        title=title,
        description=description,
        category=category,
        video_url=video_url,
        video_file=filename,
        teacher_id=teacher.id
    )

    request.db.add(course)
    request.db.commit()

    return jsonify({"message": "Course added"})


@teacher_bp.route("/course-feedback", methods=["GET"])
@jwt_required()
def course_feedback():
    teacher_id = int(get_jwt_identity())
    courses = request.db.query(Course).filter_by(teacher_id=teacher_id).all()

    result = []
    for c in courses:
        feedbacks = request.db.query(Feedback).filter_by(course_id=c.id).all()
        avg = round(
            sum(f.rating for f in feedbacks) / len(feedbacks), 2
        ) if feedbacks else 0

        result.append({
            "id": c.id,
            "title": c.title,
            "average_rating": avg,
            "feedbacks": [
                {"rating": f.rating, "comment": f.comment}
                for f in feedbacks
            ]
        })

    return jsonify(result)


@teacher_bp.route("/delete-course/<int:course_id>", methods=["DELETE"])
@jwt_required()
def delete_course(course_id):
    teacher_id = int(get_jwt_identity())
    course = request.db.query(Course).filter_by(
        id=course_id, teacher_id=teacher_id
    ).first()

    request.db.delete(course)
    request.db.commit()

    return jsonify({"message": "Course deleted"})
