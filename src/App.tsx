import router from './router';
import { RouterProvider } from 'react-router-dom';
import 'antd/dist/antd.css';
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
