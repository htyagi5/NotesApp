import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-container">
      <img src="/error.jpg" alt="404 Not Found" className="not-found-img" />
      <h2>404 - Page Not Found</h2>
      <Link to="/" style={{ color: "white", textDecoration: "underline" }}>
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
