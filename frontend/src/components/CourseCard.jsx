export default function CourseCard({ course }) {
  return (
    <div className="card">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <small>{course.category}</small>

      <br /><br />

      <a
        href={course.video_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        ▶ Watch Course
      </a>
    </div>
  );
}
