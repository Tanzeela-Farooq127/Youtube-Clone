import React from "react";
import "./Sidebar.css";
import {
  FaHome,
  FaGamepad,
  FaCar,
  FaMusic,
  FaPenFancy,
  FaNewspaper,
} from "react-icons/fa";
import { MdSportsSoccer, MdLiveTv, MdComputer } from "react-icons/md";

const Sidebar = ({ sidebar, category, setCategory, subscribedChannels = [] }) => {
  return (
    <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
      {/* Category Links */}
      <div className="shortcut-links">
        <div className={`side-link ${category === 0 ? "active" : ""}`} onClick={() => setCategory(0)}>
          <FaHome className="img" /> <p>Home</p>
        </div>
        <div className={`side-link ${category === 20 ? "active" : ""}`} onClick={() => setCategory(20)}>
          <FaGamepad className="img" /> <p>Gaming</p>
        </div>
        <div className={`side-link ${category === 30 ? "active" : ""}`} onClick={() => setCategory(30)}>
          <FaCar className="img" /> <p>Automobiles</p>
        </div>
        <div className={`side-link ${category === 5 ? "active" : ""}`} onClick={() => setCategory(5)}>
          <MdSportsSoccer className="img" /> <p>Sports</p>
        </div>
        <div className={`side-link ${category === 6 ? "active" : ""}`} onClick={() => setCategory(6)}>
          <MdLiveTv className="img" /> <p>Entertainment</p>
        </div>
        <div className={`side-link ${category === 10 ? "active" : ""}`} onClick={() => setCategory(10)}>
          <MdComputer className="img" /> <p>Technology</p>
        </div>
        <div className={`side-link ${category === 15 ? "active" : ""}`} onClick={() => setCategory(15)}>
          <FaMusic className="img" /> <p>Music</p>
        </div>
        <div className={`side-link ${category === 40 ? "active" : ""}`} onClick={() => setCategory(40)}>
          <FaPenFancy className="img" /> <p>Blogs</p>
        </div>
        <div className={`side-link ${category === 25 ? "active" : ""}`} onClick={() => setCategory(25)}>
          <FaNewspaper className="img" /> <p>News</p>
        </div>
      </div>

      <hr />

      {/* Subscribed Channels */}
      <div className="subscribed-list">
        <h3>Subscribed</h3>
        {subscribedChannels?.length === 0 && <p>No subscriptions yet</p>}
        {subscribedChannels?.map((c, i) => (
          <div className="side-link" key={i}>
            <img src={c.img} alt={c.name} className="channel-img" />
            <p>{c.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;