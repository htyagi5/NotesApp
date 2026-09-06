function Card({ id, content, color, title, onDelete }) {
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="card" style={{ backgroundColor: color }}>
      <div className="delete">
        <button className="delbtn" type="button" onClick={handleDelete} title="Delete note">
          Delete
        </button>
      </div>
      <h1 className="card-title">{title || "Untitled"}</h1>
      <p className="preview">{content}</p>
    </div>
  );
}

export default Card;