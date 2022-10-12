import { useNavigate } from 'react-router-dom';

import Image from 'react-bootstrap/Image';

const exp = new RegExp(/.mp4$/, 'i');
const isVideo = (url) => {
  return exp.test(url);
};

const ImagesList = ({ posts }) => {
  const navigate = useNavigate();

  const handleImageClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return posts.map((post) =>
    isVideo(post.imageURL) ? (
      <video autoPlay muted onClick={() => handleImageClick(post.postId)}>
        <source src={post.attachmentURL} type="video/mp4" />
      </video>
    ) : (
      <Image
        key={post.attachmentURL}
        src={post.attachmentURL}
        onClick={() => handleImageClick(post.postId)}
      />
    )
  );
};

export default ImagesList;
