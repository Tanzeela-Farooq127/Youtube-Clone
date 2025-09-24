import { useState } from "react";
import "./Home.css";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Feed from "../../Component/Feed/Feed";

const Home = ({ sidebar, searchTerm, subscribedChannels }) => {
  const [category, setCategory] = useState(0);

  return (
    <div className="home">
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} subscribedChannels={subscribedChannels} />
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <Feed category={category} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Home;
