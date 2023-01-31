import React from 'react';
import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

export const Spinner = () => {
  return (
    <SpinnerWrapper>
      <CircularProgress size={100} />
    </SpinnerWrapper>
  );
};

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
