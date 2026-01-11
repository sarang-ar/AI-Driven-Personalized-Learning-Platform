import { useEffect, useState } from "react";
import API from "../api/api";

export default function TeacherDashboard() {
  const [stats, setStats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const empty = { title:"", description:"", category:"", video_url:"", video_file:null };
  const [course, setCourse] = useState(empty);

  const loadStats = async () => {
    const res = await API.get("/teacher/course-feedback");
    setStats(res.data);
  };

  useEffect(() => { loadStats(); }, []);

  const addCourse = async () => {
    const f = new FormData();
    Object.entries(course).forEach(([k,v]) => v && f.append(k,v));
    await API.post("/teacher/add-course", f);
    setCourse(empty);
    setShowForm(false);
    loadStats();
  };

  const deleteCourse = async (id) => {
    await API.delete(`/teacher/delete-course/${id}`);
    loadStats();
  };

  return (
    <div className="dashboard">

      <div className="card">
        <h3 onClick={() => setShowForm(!showForm)}>➕ Add Course</h3>
        {showForm && (
          <>
            <input placeholder="Title" onChange={e=>setCourse({...course,title:e.target.value})}/>
            <textarea placeholder="Description" onChange={e=>setCourse({...course,description:e.target.value})}/>
            <input placeholder="Category" onChange={e=>setCourse({...course,category:e.target.value})}/>
            <input placeholder="Video Link" onChange={e=>setCourse({...course,video_url:e.target.value})}/>
            <input type="file" onChange={e=>setCourse({...course,video_file:e.target.files[0]})}/>
            <button onClick={addCourse}>Save</button>
          </>
        )}
      </div>

      {stats.map(s => (
        <div className="card" key={s.id}>
          <h4>{s.title}</h4>
          <p>⭐ Average Rating: {s.average_rating}</p>
          <button onClick={() => deleteCourse(s.id)}>Delete Course</button>

          <h5>Feedback</h5>
          {s.feedbacks.map((f,i)=>(
            <p key={i}>⭐{f.rating} – {f.comment}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
