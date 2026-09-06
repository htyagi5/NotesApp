import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="taskbar">
      <div className="head">
        <ul className="tskbar">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/write"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Write
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/read"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Read
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="draw">
        <NavLink to="/draw">
          <button type="button" className="btn">
            Draw
          </button>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;