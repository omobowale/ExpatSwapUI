import logo from './logo.svg';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css';
import ViewUsers from './pages/Users/ViewUsers';
import CreateUser from './pages/Users/CreateUser';


const router = createBrowserRouter([
  {
    path: "/",
    element: <ViewUsers />
  },
  {
    path: "/view",
    element: <ViewUsers />
  },
  {
    path: "/create",
    element: <CreateUser />
  },

])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
