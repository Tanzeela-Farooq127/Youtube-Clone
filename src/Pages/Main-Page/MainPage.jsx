import { useState } from "react";
import Sidebar from "./Sidebar";
import Video from "./Video";
import videos from "../../videos.json"; // your videos data

const MainPage = () => {
  const [category, setCategory] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Subscribed channels array
  const [subscribedChannels, setSubscribedChannels] = useState([
    { name: "PewDiePie", img: "/assets/Images/img.png" },
    { name: "MrBeast", img: "/assets/Images/img1.jpg" },
    { name: "Justin Biebar", img: "/assets/Images/img2.jpg" },
  ]);

  // Handle subscription from Video page
  const handleSubscribe = (channelName, thumbnail) => {
    if (!subscribedChannels.some(c => c.name === channelName)) {
      setSubscribedChannels([...subscribedChannels, { name: channelName, img: thumbnail }]);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        sidebar={sidebarOpen}
        category={category}
        setCategory={setCategory}
        subscribedChannels={subscribedChannels}
      />
      <Video handleSubscribe={handleSubscribe} />
    </div>
  );
};

export default MainPage;
