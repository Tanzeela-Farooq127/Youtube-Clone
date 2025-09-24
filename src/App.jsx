import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import Navbar from "./Component/Navbar/Navbar";
import Sidebar from "./Component/Sidebar/Sidebar";

function App() {
  const [sidebar, setSidebar] = useState(true);
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const [category, setCategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ search term

  const handleSubscribe = (channelName, channelImg) => {
    setSubscribedChannels((prev) => {
      if (prev.some((c) => c.name === channelName)) return prev;
      return [...prev, { name: channelName, img: channelImg }];
    });
  };

  const handleUnsubscribe = (channelName) => {
    setSubscribedChannels((prev) =>
      prev.filter((c) => c.name !== channelName)
    );
  };

  return (
    <BrowserRouter>
      <Navbar setSidebar={setSidebar} setSearchTerm={setSearchTerm} />
      <MainContent
        sidebar={sidebar}
        category={category}
        setCategory={setCategory}
        subscribedChannels={subscribedChannels}
        handleSubscribe={handleSubscribe}
        handleUnsubscribe={handleUnsubscribe}
        searchTerm={searchTerm} // ✅ pass searchTerm
      />
    </BrowserRouter>
  );
}

function MainContent({
  sidebar,
  category,
  setCategory,
  subscribedChannels,
  handleSubscribe,
  handleUnsubscribe,
  searchTerm,
}) {
  const location = useLocation();

  return (
    <div className="app-container" style={{ display: "flex" }}>
      {location.pathname === "/" && (
        <Sidebar
          sidebar={sidebar}
          category={category}
          setCategory={setCategory}
          subscribedChannels={subscribedChannels}
        />
      )}

      <div style={{ flex: 1, padding: "10px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                sidebar={sidebar}
                subscribedChannels={subscribedChannels}
                searchTerm={searchTerm} // ✅ pass to Home
              />
            }
          />
          <Route
            path="/video/:id"
            element={
              <Video
                handleSubscribe={handleSubscribe}
                handleUnsubscribe={handleUnsubscribe}
                subscribedChannels={subscribedChannels}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;