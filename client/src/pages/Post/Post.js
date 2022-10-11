import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';

import Image from 'react-bootstrap/Image';
import Skeleton from 'react-loading-skeleton';
import Stack from 'react-bootstrap/Stack';

import userState from '../../atoms/user.atom';

import './Post.css';

const Post = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useRecoilValue(userState);

  useEffect(() => {
    const onLoad = async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        const fetchedPost = await API.get('posts', `/posts/${postId}`);
        const attachmentURL = await Storage.vault.get(fetchedPost.imageURL);

        setPost({ ...fetchedPost, attachmentURL });
        setIsLoading(false);
      } catch (e) {}
    };

    onLoad();
  }, [isAuthenticated, postId]);

  return (
    <div id="post-root" className="post">
      <Stack className="images-root" direction="horizontal">
        {isLoading && <Skeleton className="skeleton" count={1} />}
        {!isLoading && <Image src={post.attachmentURL} width="100%" />}
      </Stack>
    </div>
  );
};

export default Post;
