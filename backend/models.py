from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    email = Column(String(120), unique=True)
    password = Column(String(200))
    role = Column(String(20))  # student / teacher
    interest = Column(String(200))


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True)
    title = Column(String(200))
    description = Column(Text)
    category = Column(String(100))
    video_url = Column(String(300))      # link
    video_file = Column(String(300))     # uploaded file path
    teacher_id = Column(Integer, ForeignKey("users.id"))


class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    student_id = Column(Integer, ForeignKey("users.id"))
    rating = Column(Integer)  # ⭐ 1–5
    comment = Column(Text)
