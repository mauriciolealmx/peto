import React from 'react';
import { Route, Routes as RDRoutes } from 'react-router-dom';

import Home from './pages/Home/Home';

const Routes = () => {
  return (
    <RDRoutes>
      <Route path="/" element={<Home />} />
    </RDRoutes>
  );
};

export default Routes;
