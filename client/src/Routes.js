import React from 'react';
import { Route, Routes as RDRoutes } from 'react-router-dom';

import Home from './pages/Home/Home';
import NewPost from './pages/NewPost/NewPost';
import Post from './pages/Post/Post';
import NotFound from './pages/NotFound';

const Routes = () => {
  return (
    <RDRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/new" element={<NewPost />} />
      <Route path="/posts/:id" element={<Post />} />
      <Route path="*" element={<NotFound />} />;
    </RDRoutes>
  );
};

export default Routes;
