import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { createRequestHandler } from '@baseline/client-api/request-handler';
import About from './pages/About';
import Home, { homeLoader } from './pages/Home';

createRequestHandler();

const router = createBrowserRouter([
  { path: '/', element: <Home />, loader: homeLoader },
  { path: '/about', element: <About /> },
]);

const App = () => <RouterProvider router={router} />;

export default App;
