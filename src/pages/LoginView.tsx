import React from 'react';
import styled from 'styled-components';
import { Spinner } from '../components/Spinner';

export const LoginView = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  return <BaseContainer>{isLoading && <Spinner />}</BaseContainer>;
};

const BaseContainer = styled.div`
  vertical-align: top;
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;
