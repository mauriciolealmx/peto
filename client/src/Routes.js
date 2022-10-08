import React from 'react';
import { Route, Routes as RDRoutes } from 'react-router-dom';

import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';

const Routes = () => {
  return (
    <RDRoutes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />;
    </RDRoutes>
  );
};

export default Routes;
