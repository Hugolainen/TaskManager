import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import { Header } from './layouts/Header';
import { DriverView } from './pages/DriverView';
import { LoginView } from './pages/LoginView';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginView />,
    },
    {
      path: '/driver',
      element: <DriverView />,
    },
    {
      path: '/management',
      element: <div>Hello world!</div>,
    },
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
