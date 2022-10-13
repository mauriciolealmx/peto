import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';

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
      <Card>
        <Image
          key={post.attachmentURL}
          src={post.attachmentURL}
          onClick={() => handleImageClick(post.postId)}
        />
        <Card.Body>
          <Stack className="titles" direction="horizontal">
            <Card.Title>Auto Repair Center</Card.Title>
            <Card.Title>$1M</Card.Title>
          </Stack>
          <Card.Subtitle className="mb-2 text-muted">
            Dallas, TX
          </Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    )
  );
};

export default ImagesList;
