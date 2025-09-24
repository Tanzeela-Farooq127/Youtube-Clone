import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import videos from "../../videos.json";
import "./Feed.css";

const Feed = ({ category, searchTerm }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let filteredVideos;

    if (category === 0) {
      filteredVideos = videos; // all videos
    } else {
      filteredVideos = videos.filter((v) => v.categoryId === category);
    }

    if (searchTerm) {
      filteredVideos = filteredVideos.filter((v) =>
        v.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setData(filteredVideos.slice(0, 12)); // max 12
  }, [category, searchTerm]);

  return (
    <div className="feed">
      {data.length === 0 ? (
        <p>No videos found</p>
      ) : (
        data.map((item) => (
          <Link to={`/video/${item.id}`} className="card" key={item.id}>
            <img src={item.thumbnail} alt={item.title} />
            <h2>{item.title}</h2>
            <h3>{item.channel}</h3>
            <p>
              {item.views} • {item.publishedAt}
            </p>
          </Link>
        ))
      )}
    </div>
  );
};

export default Feed;
