import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { noteContext } from "../context/NoteContext";

function Writing() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const { addNote } = useContext(noteContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) {
      return;
    }
    addNote({ title, content });
    navigate("/");
  };

  return (
    <>
      <h2>Notes</h2>
      <form className="content" onSubmit={handleSubmit}>
        <input
          className="title"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="content"
          placeholder="write your notes ...."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="save" type="submit">
          Save
        </button>
      </form>
    </>
  );
}

export default Writing;