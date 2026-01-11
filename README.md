🎓 AI-Driven Personalized Learning Platform for Education

An intelligent web-based learning platform that delivers personalized course recommendations to students based on their interests.
The system supports separate student and teacher roles, secure authentication, teacher-uploaded courses via video links, and student feedback.

🚀 Features
👨‍🎓 Student

Register & login securely

Select learning interests

Receive personalized course recommendations

Watch course videos via external links

Submit feedback for courses

👩‍🏫 Teacher

Register & login securely

Upload courses with:

Title

Description

Category

Video URL (YouTube / Drive / etc.)

Manage uploaded content

🔐 System

JWT-based authentication

Role-based access control

RESTful API architecture

Lightweight SQLite database

Clean separation of frontend & backend

🛠️ Tech Stack
Frontend

React (Vite)

React Router

Axios

HTML5 / CSS3

Backend

Python 3.14.2

Flask

Flask-JWT-Extended

Flask-CORS

SQLAlchemy

SQLite

Scikit-learn (for recommendation logic)

📁 Project Structure
ai-learning-platform/
│
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   ├── requirements.txt
│   ├── routes/
│   │   ├── auth.py
│   │   ├── teacher.py
│   │   ├── student.py
│   │   └── feedback.py
│   ├── recommender/
│   │   └── recommendation.py
│   └── database/
│       └── app.db
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── api/
│       │   └── api.js
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── StudentDashboard.jsx
│       │   └── TeacherDashboard.jsx
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── CourseCard.jsx
│       └── styles/
│           └── main.css
│
├── venv/
└── README.md

⚙️ Installation & Setup
🔹 Prerequisites

Python 3.14.2

Node.js (LTS)

npm

VS Code (recommended)

▶️ Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py


Backend runs at:

http://127.0.0.1:5000

▶️ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

🔄 Database Reset (If Schema Changes)

If you update models:

Stop backend server

Delete:

backend/database/app.db


Restart backend

A fresh database will be auto-created.

🧠 Recommendation Logic

Students define their interest areas

Courses are filtered based on category matching

Future scope includes:

Cosine similarity

Collaborative filtering

ML-based personalization

🔐 Authentication Flow

JWT tokens are issued on login

Token is stored in browser localStorage

Protected routes require valid JWT

Role-based access ensures security

🌱 Future Enhancements

Embedded video player

Course ratings & analytics

Admin dashboard

Advanced ML recommendation models

Cloud deployment (Render / Netlify)

Mobile-responsive UI

🏆 Use Cases

College mini-projects

Hackathons

E-learning platforms

Personalized education systems

AI-based recommendation demos

📜 License

This project is developed for educational purposes.
You are free to modify and extend it.
