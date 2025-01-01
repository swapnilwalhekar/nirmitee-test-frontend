import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Navigation</h2>
      <ul className="sidebar-menu">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">📅 Calendar</Link> {/* Calendar at the top */}
        </li>
        <li className={location.pathname === "/summary" ? "active" : ""}>
          <Link to="/summary">📊 Summary</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
