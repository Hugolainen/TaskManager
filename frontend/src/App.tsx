import React from 'react';
import { createBrowserRouter, RouterProvider, redirect, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import { useAuth } from './contexts/authProvider';
import { Header } from './layouts/Header';
import { TaskListView } from './pages/TaskListView';
import { ErrorPage } from './pages/ErrorPage';
import { LoginView } from './pages/LoginView';

const App = () => {
  const { isLoggedIn } = useAuth();
  const authLoader = () => {
    if (!isLoggedIn) {
      return redirect('/login');
    }
  };

  const router = createBrowserRouter([
    {
      path: '/taskList',
      element: <TaskListView />,
      // loader: authLoader,
    },
    {
      path: '/management',
      element: <div>Hello world!</div>,
      loader: authLoader,
    },
    {
      path: '/login',
      element: <LoginView />,
    },
    { path: '/error', element: <ErrorPage /> },
    { path: '*', element: <Navigate to="/login" replace /> },
  ]);

  return (
    <FullHeight>
      <Header />
      <RouterProvider router={router} />
    </FullHeight>
  );
};
export default App;

const FullHeight = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
