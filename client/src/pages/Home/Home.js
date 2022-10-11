import { useEffect, useState } from 'react';
import { API, Storage } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Image from 'react-bootstrap/Image';
import Skeleton from 'react-loading-skeleton';
import Stack from 'react-bootstrap/Stack';

import userState from '../../atoms/user.atom';

import './Home.css';

const Home = () => {
  const [allPosts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useRecoilValue(userState);
  const navigate = useNavigate();

  useEffect(() => {
    const onLoad = async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        const posts = await API.get('posts', '/posts');
        const postsPromises = posts.map(async (post) => ({
          ...post,
          attachmentURL: await Storage.vault.get(post.imageURL),
        }));

        const postsWithURL = await Promise.all(postsPromises);
        setPosts(postsWithURL);
        setIsLoading(false);
      } catch (e) {}
    };

    onLoad();
  }, [isAuthenticated, setPosts]);

  const handleImageClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div id="home-root" className="Home">
      <Stack className="images-root" direction="horizontal">
        {isLoading &&
          Array.from(Array(9).keys()).map((idx) => (
            <Skeleton key={idx} className="skeleton" count={1} />
          ))}
        {!isLoading &&
          allPosts.map((post) => (
            <Image
              key={post.attachmentURL}
              src={post.attachmentURL}
              onClick={() => handleImageClick(post.postId)}
            />
          ))}
      </Stack>
    </div>
  );
};
export default Home;
