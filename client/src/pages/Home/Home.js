import { useEffect, useState } from 'react';
import { API, Storage } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';

import Image from 'react-bootstrap/Image';
import Skeleton from 'react-loading-skeleton';
import Stack from 'react-bootstrap/Stack';

import userState from '../../atoms/user.atom';
import postsState from '../../atoms/posts.atom';

import './Home.css';

const exp = new RegExp(/.mp4$/, 'i');
const isVideo = (url) => {
  return exp.test(url);
};

const Home = () => {
  const [allPosts, setPostsState] = useRecoilState(postsState);
  const hasPosts = allPosts.length > 0;

  const [isLoading, setIsLoading] = useState(!hasPosts);
  const isAuthenticated = useRecoilValue(userState);
  const navigate = useNavigate();

  useEffect(() => {
    const onLoad = async () => {
      if (!isAuthenticated || hasPosts) {
        return;
      }

      try {
        const posts = await API.get('posts', '/posts');
        const postsPromises = posts.map(async (post) => ({
          ...post,
          attachmentURL: await Storage.vault.get(post.imageURL),
        }));

        const postsWithURL = await Promise.all(postsPromises);
        setPostsState(postsWithURL);
        setIsLoading(false);
      } catch (e) {}
    };

    onLoad();
  }, [isAuthenticated, setPostsState, hasPosts]);

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
          allPosts.map((post) =>
            isVideo(post.imageURL) ? (
              <video
                autoPlay
                muted
                onClick={() => handleImageClick(post.postId)}
              >
                <source src={post.attachmentURL} type="video/mp4" />
              </video>
            ) : (
              <Image
                key={post.attachmentURL}
                src={post.attachmentURL}
                onClick={() => handleImageClick(post.postId)}
              />
            )
          )}
      </Stack>
    </div>
  );
};
export default Home;
