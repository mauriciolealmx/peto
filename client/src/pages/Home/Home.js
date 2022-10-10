import { useEffect, useState } from 'react';
import { API, Storage } from 'aws-amplify';
import { useRecoilValue } from 'recoil';

import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';

import userState from '../../atoms/user.atom';

import './Home.css';

const Home = () => {
  const [allPosts, setPosts] = useState([]);
  const isAuthenticated = useRecoilValue(userState);

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
      } catch (e) {}
    };

    onLoad();
  }, [isAuthenticated, setPosts]);

  return (
    <div id="home-root" className="Home">
      {allPosts.length > 0 && (
        <Stack className="images-root" direction="horizontal">
          {allPosts.map((post) => (
            <Image src={post.attachmentURL} />
          ))}
        </Stack>
      )}
    </div>
  );
};
export default Home;
