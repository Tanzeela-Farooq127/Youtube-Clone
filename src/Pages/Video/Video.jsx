import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaShare } from "react-icons/fa";
import { SiWhatsapp, SiTiktok, SiInstagram } from "react-icons/si";
import { AiOutlineTwitter } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import videos from "../../videos.json";
import "./Video.css";

const Video = ({ handleSubscribe, handleUnsubscribe, subscribedChannels }) => {
  const { id } = useParams();
  const video = videos.find((v) => v.id === id);

  const [likes, setLikes] = useState(120);
  const [dislikes, setDislikes] = useState(10);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, user: "OfficerPak", text: "Boy do I have some stories myself", likes: 2 },
  ]);
  const [newComment, setNewComment] = useState("");
  const [showShare, setShowShare] = useState(false);

  if (!video) return <h2>Video not found</h2>;

  const recommendedVideos = videos.filter((v) => v.id !== id).slice(0, 10);
  const isSubscribed = subscribedChannels.some((c) => c.name === video.channel);
  const shareUrl = window.location.href;

  const toggleSubscribe = () => {
    if (isSubscribed) {
      handleUnsubscribe(video.channel);
    } else {
      handleSubscribe(video.channel, video.channelImg || video.thumbnail);
    }
  };

  return (
    <div className="video-page">
      {/* Left Column */}
      <div className="video-left">
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${video.videoId}`}
          title={video.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>

        {/* Title & Actions */}
        <div className="video-header">
          <h2 className="video-title">{video.title}</h2>
          <div className="video-actions">
            <button
              className={`action-btn like ${liked ? "active" : ""}`}
              onClick={() => {
                if (liked) { setLikes(likes - 1); setLiked(false); }
                else { setLikes(likes + 1); setLiked(true); if (disliked) { setDislikes(dislikes - 1); setDisliked(false); } }
              }}
            >
              <FaThumbsUp /> {likes}
            </button>
            <button
              className={`action-btn dislike ${disliked ? "active" : ""}`}
              onClick={() => {
                if (disliked) { setDislikes(dislikes - 1); setDisliked(false); }
                else { setDislikes(dislikes + 1); setDisliked(true); if (liked) { setLikes(likes - 1); setLiked(false); } }
              }}
            >
              <FaThumbsDown /> {dislikes}
            </button>
            <button className="action-btn share-btn" onClick={() => setShowShare(true)}>
              <FaShare /> Share
            </button>
          </div>
        </div>

        {/* Channel & Subscribe */}
        <div className="video-meta">
          <div className="channel-info">
            <h3 className="video-channel">{video.channel}</h3>
            <p className="video-views">{video.views} • {video.publishedAt}</p>
          </div>
          <button
            className={`subscribe-btn ${isSubscribed ? "subscribed" : ""}`}
            onClick={toggleSubscribe}
          >
            {isSubscribed ? "✓ Subscribed" : "Subscribe"}
          </button>
        </div>

        <hr />

        {/* Comments */}
        <div className="comments">
          <h3>{comments.length} Comments</h3>
          <div className="add-comment">
            <input
              type="text"
              placeholder="Add a public comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="comment-btn"
              onClick={() => {
                if (newComment.trim() !== "") {
                  setComments([{ id: comments.length + 1, user: "You", text: newComment }, ...comments]);
                  setNewComment("");
                }
              }}
            >
              Comment
            </button>
          </div>

          {comments.map((c) => (
            <div key={c.id} className="comment-item">
              <div className="avatar">{c.user.charAt(0).toUpperCase()}</div>
              <div className="comment-content">
                <p className="comment-user">@{c.user}</p>
                <p className="comment-text">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div className="video-right">
        {recommendedVideos.map((rv) => (
          <Link to={`/video/${rv.id}`} key={rv.id} className="recommended-video">
            <img src={rv.thumbnail} alt={rv.title} />
            <div className="recommended-info">
              <div className="recommended-title">{rv.title}</div>
              <div className="recommended-channel">{rv.channel}</div>
              <div className="recommended-views">{rv.views}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Share Popup */}
      {showShare && (
        <div className="share-popup" onClick={() => setShowShare(false)}>
          <div className="share-content" onClick={(e) => e.stopPropagation()}>
            <h3>Share this video</h3>
            <button className="close-btn" onClick={() => setShowShare(false)}>×</button>
            <div className="share-icons">
              <a href={`https://api.whatsapp.com/send?text=${shareUrl}`} target="_blank" rel="noreferrer" className="whatsapp">
                <SiWhatsapp /> WhatsApp
              </a>
              <a href={`https://www.tiktok.com/share/video?url=${shareUrl}`} target="_blank" rel="noreferrer" className="tiktok">
                <SiTiktok /> TikTok
              </a>
              <a href={`mailto:?subject=Check this video&body=${shareUrl}`} target="_blank" rel="noreferrer" className="email">
                <MdEmail /> Email
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank" rel="noreferrer" className="twitter">
                <AiOutlineTwitter /> Twitter
              </a>
              <a href={`https://www.instagram.com/?url=${shareUrl}`} target="_blank" rel="noreferrer" className="instagram">
                <SiInstagram /> Instagram
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;