import  { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const PlayerDetail = lazy(() => import('../pages/PlayerDetail'));

const AppRoutes = () => {
  return useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/player/:name',
      element: <PlayerDetail />,
    },
  ]);
};

export default AppRoutes; 