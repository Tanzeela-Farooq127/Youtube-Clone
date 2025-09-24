import { Link } from "react-router-dom";
import videos from "../../videos.json";

const Recommended = () => {
  return (
    <div className="recommended">
      {videos.map((video) => (
        <Link key={video.id} to={`/video/${video.id}`} className="recommended-card">
          <img src={video.thumbnail} alt={video.title} />
          <h4>{video.title}</h4>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
