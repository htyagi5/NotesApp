import { useContext } from "react";
import Card from "./Card";
import { noteContext } from "../context/NoteContext";
import { NavLink } from "react-router-dom";

const COLORS = [
  "#FFB6C1", // Baby Pink (lightpink)
  "yellow",
  "rgb(242, 142, 3)",
  "springgreen",
  "rgb(52, 221, 207)",
  "rgb(247, 10, 212)",
];

function Home() {
  const { notes, deleteNote } = useContext(noteContext);

  return (
    <>
      <div className="box">
        {notes.length === 0 ? (
          <div className="empty-state">
            <p className="empty-text">No notes yet!</p>
            <NavLink to="/write">
              <button type="button" className="btn create-btn">
                Write a Note
              </button>
            </NavLink>
          </div>
        ) : (
          notes.map((note, index) => {
            if (!note) return null;
            const change = index % COLORS.length;
            const id = note.id || String(index);
            const title = typeof note === "object" ? note.title : note.split(",")[0];
            const content =
              typeof note === "object"
                ? note.content
                : note.split(",").slice(1).join(",");

            return (
              <NavLink
                to={`/read/${id}`}
                key={id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card
                  id={id}
                  content={content}
                  color={COLORS[change]}
                  title={title}
                  onDelete={deleteNote}
                />
              </NavLink>
            );
          })
        )}
      </div>
    </>
  );
}

export default Home;