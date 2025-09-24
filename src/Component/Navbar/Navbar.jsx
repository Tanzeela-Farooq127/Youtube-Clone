import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaBars, FaSearch, FaBell, FaUserCircle, FaVideo } from "react-icons/fa";
import { AiFillPlayCircle } from "react-icons/ai";

const Navbar = ({ setSidebar, setSearchTerm }) => {
  return (
    <nav className="navbar flex-div">
      {/* Left */}
      <div className="nav-left flex-div">
        <FaBars
          className="menu-icon"
          onClick={() => setSidebar((prev) => !prev)}
        />
        <Link
          to="/"
          className="logo-box flex-div"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <AiFillPlayCircle className="logo-icon" />
          <h3 className="logo-heading">YouTube</h3>
        </Link>
      </div>

      {/* Middle */}
      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
      </div>

      {/* Right */}
      <div className="nav-right flex-div">
        <FaVideo className="icon" />
        <FaBell className="icon" />
        <FaUserCircle className="icon" />
      </div>
    </nav>
  );
};

export default Navbar;