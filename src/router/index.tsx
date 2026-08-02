import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/Home/index';
import Login from '../pages/Login/index';
import NotFound from '../pages/NotFound/index';
import Register from '../pages/Register/index';
import Edit from '../pages/question/Edit/index';
import Statistics from '../pages/question/Statistics/index';
import My from '../pages/Manage/My/index';
import Star from '../pages/Manage/Star/index';
import Trash from '../pages/Manage/Trash/index';
import MainLayout from '../layouts/MainLayout/index';
import ManageLayout from '../layouts/ManageLayout/index';
import QuestionLayout from '../layouts/QuestionLayout/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'my',
            element: <My />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'statistics/:id',
        element: <Statistics />,
      },
    ],
  },
]);
export default router;
