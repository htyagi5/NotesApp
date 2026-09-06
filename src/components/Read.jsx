import { useContext } from "react";
import { noteContext } from "../context/NoteContext";
import { useParams, Link } from "react-router-dom";

function Read() {
  const { notes } = useContext(noteContext);
  const { id } = useParams();

  // If no ID was provided (e.g. user clicked /read directly in header)
  let targetNote = null;
  if (id) {
    targetNote = notes.find((n, idx) => {
      if (typeof n === "object" && n.id === id) return true;
      return String(idx) === String(id);
    });
  } else if (notes.length > 0) {
    // Show the first note if available
    targetNote = notes[0];
  }

  if (!targetNote) {
    return (
      <div className="read-empty-container">
        <h2>{id ? "Note Not Found" : "No Notes Available"}</h2>
        <div className="dashboard empty-dashboard">
          <p>
            {id
              ? "The note you are looking for does not exist or has been deleted."
              : "You haven't written any notes yet."}
          </p>
          <div className="read-actions">
            <Link to="/">
              <button type="button" className="btn read-back-btn">
                Back to Home
              </button>
            </Link>
            <Link to="/write">
              <button type="button" className="btn read-back-btn">
                Write a Note
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  let title = "";
  let content = "";

  if (typeof targetNote === "object") {
    title = targetNote.title || "Untitled";
    content = targetNote.content || "";
  } else {
    const parts = String(targetNote).split(",");
    title = parts[0] || "Untitled";
    content = parts.slice(1).join(",");
  }

  return (
    <div className="read-page">
      <h2>{title}</h2>
      <div className="dashboard">{content}</div>
      <div className="read-footer">
        <Link to="/">
          <button type="button" className="btn read-back-btn">
            ← Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Read;