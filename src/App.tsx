import router from './router';
import { RouterProvider } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import { useLoadUserData } from './hooks/useLoadUserInfoData';

function App() {
  useLoadUserData();
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
