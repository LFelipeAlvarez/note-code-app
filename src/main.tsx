import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserProvider from './context/UserProvider';
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppWithUserLogged from './pages/AppWithUserLogged/AppWithUserLogged.tsx';
import Root from './Root.tsx';
import { CLIENT_ID } from './config.ts';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/notecode/:id',
        element: <AppWithUserLogged />
      }
    ]
  }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </GoogleOAuthProvider>
)
