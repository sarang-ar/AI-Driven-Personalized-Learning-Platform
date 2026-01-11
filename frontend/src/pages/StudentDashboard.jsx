import { useEffect, useState } from "react";
import API from "../api/api";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [interest, setInterest] = useState("");
  const [showInterest, setShowInterest] = useState(false);
  const [feedback, setFeedback] = useState({});

  const loadCourses = async () => {
    const res = await API.get("/student/courses");
    setCourses(res.data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const saveInterest = async () => {
    if (!interest.trim()) {
      alert("Enter at least one interest");
      return;
    }

    await API.put("/student/interest", { interest });

    setInterest("");
    setShowInterest(false);
    await loadCourses();
  };

  const submitFeedback = async (courseId) => {
    const f = feedback[courseId];

    if (!f || !f.rating || !f.comment) {
      alert("Please give rating and feedback");
      return;
    }

    await API.post("/student/feedback", {
      course_id: courseId,
      rating: f.rating,
      comment: f.comment
    });

    alert("Feedback submitted");

    setFeedback({
      ...feedback,
      [courseId]: { rating: "", comment: "" }
    });
  };

  return (
    <div className="dashboard">

      {/* INTERESTS */}
      <div className="card">
        <h3
          style={{ cursor: "pointer" }}
          onClick={() => setShowInterest(!showInterest)}
        >
          🎯 Add / Update Interests
        </h3>

        {showInterest && (
          <>
            <input
              value={interest}
              placeholder="AI, Web Development, ML"
              onChange={e => setInterest(e.target.value)}
            />
            <small>Use commas to add multiple interests</small>
            <button onClick={saveInterest}>Save Interests</button>
          </>
        )}
      </div>

      {/* COURSE HEADING */}
      <h2 style={{ margin: "20px 0" }}>Your Courses</h2>

      {/* COURSES */}
      <div className="grid">
        {courses.length === 0 && (
          <p>No courses found for your interests.</p>
        )}

        {courses.map(c => (
          <div className="card" key={c.id}>
            <h4>{c.title}</h4>
            <p>{c.description}</p>

            {c.video_file && (
              <video
                controls
                width="100%"
                src={`http://127.0.0.1:5000/uploads/${c.video_file}`}
              />
            )}

            {c.video_url && (
              <a href={c.video_url} target="_blank" rel="noreferrer">
                Watch Video
              </a>
            )}

            {/* RATING */}
            <select
              value={feedback[c.id]?.rating || ""}
              onChange={e =>
                setFeedback({
                  ...feedback,
                  [c.id]: {
                    ...feedback[c.id],
                    rating: e.target.value
                  }
                })
              }
            >
              <option value="">Rate course</option>
              {[1,2,3,4,5].map(n => (
                <option key={n} value={n}>⭐ {n}</option>
              ))}
            </select>

            {/* FEEDBACK */}
            <textarea
              placeholder="Write feedback..."
              value={feedback[c.id]?.comment || ""}
              onChange={e =>
                setFeedback({
                  ...feedback,
                  [c.id]: {
                    ...feedback[c.id],
                    comment: e.target.value
                  }
                })
              }
            />

            <button onClick={() => submitFeedback(c.id)}>
              Submit Feedback
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
