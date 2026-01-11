from flask import Flask, request, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config import Config
from models import Base
import os

from routes.auth import auth_bp
from routes.teacher import teacher_bp
from routes.student import student_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, supports_credentials=True)
JWTManager(app)

os.makedirs("uploads", exist_ok=True)

engine = create_engine(app.config["SQLALCHEMY_DATABASE_URI"])
SessionLocal = sessionmaker(bind=engine)
Base.metadata.create_all(engine)

@app.before_request
def create_session():
    request.db = SessionLocal()

@app.teardown_request
def close_session(e=None):
    request.db.close()

@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory("uploads", filename)

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(teacher_bp, url_prefix="/teacher")
app.register_blueprint(student_bp, url_prefix="/student")

if __name__ == "__main__":
    app.run(debug=True)
