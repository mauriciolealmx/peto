import { useEffect, useState } from 'react';
import { API, Storage } from 'aws-amplify';
import { useRecoilValue, useRecoilState } from 'recoil';

import Stack from 'react-bootstrap/Stack';

import HomeSkeleton from './Home.skeleton';
import ImagesList from './ImagesList';
import getDevImage from '../../utils/getDevImage';
import postsState from '../../atoms/posts.atom';
import userState from '../../atoms/user.atom';

import './Home.css';

const Home = () => {
  const [allPosts, setPostsState] = useRecoilState(postsState);
  const hasPosts = allPosts.length > 0;

  const [isLoading, setIsLoading] = useState(!hasPosts);
  const isAuthenticated = useRecoilValue(userState);

  useEffect(() => {
    const onLoad = async () => {
      if (!isAuthenticated || hasPosts) {
        return;
      }

      try {
        // For development
        const devImageUrl = getDevImage();

        const posts = await API.get('posts', '/posts');
        const postsPromises = posts.map(async (post) => ({
          ...post,
          // TODO: Perhaps ideally /protected
          attachmentURL:
            devImageUrl || (await Storage.vault.get(post.imageURL)),
        }));

        const postsWithURL = await Promise.all(postsPromises);
        setPostsState(postsWithURL);
        setIsLoading(false);
      } catch (e) {}
    };

    onLoad();
  }, [isAuthenticated, setPostsState, hasPosts]);

  return (
    <div id="home-root" className="Home">
      <Stack className="images-root" direction="horizontal">
        {isLoading && <HomeSkeleton />}
        {!isLoading && <ImagesList posts={allPosts} />}
      </Stack>
    </div>
  );
};
export default Home;
