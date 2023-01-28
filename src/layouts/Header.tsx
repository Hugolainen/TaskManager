import React from 'react';
import { Button, Chip } from '@mui/material';
import styled from 'styled-components';
import { EUserRole, useAuth } from '../contexts/authProvider';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export const Header = () => {
  const { isLoggedIn, loggedInUser } = useAuth();

  const chipIcon = loggedInUser?.role === EUserRole.DRIVER ? <LocalShippingIcon /> : <SupportAgentIcon />;

  return (
    <HeaderContainer>
      <Button2 onClick={() => console.log('test')}> {isLoggedIn ? 'Logout' : 'Login'} </Button2>
      {isLoggedIn && (
        <UserContent>
          <Chip icon={chipIcon} label={loggedInUser?.role} variant='outlined' /> {loggedInUser?.userName}
        </UserContent>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  height: 80px;
  background-color: lightblue;
`;

const UserContent = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Button2 = styled(Button)`
  background-color: red;
`;
