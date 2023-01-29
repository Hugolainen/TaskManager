import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

interface IFormLoginInputs {
  username: string;
  password: string;
}

export const LoginView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLoginInputs>();
  const onSubmit: SubmitHandler<IFormLoginInputs> = (data) => console.log(data);

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="standard-basic"
          label="Username"
          variant="standard"
          {...(register('username'), { required: true })}
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
          {...(register('password'), { required: true })}
        />

        <SubmitButton
          variant="outlined"
          endIcon={<VpnKeyIcon />}
          type="submit"
          disabled={!!errors.username || !!errors.password}
          fullWidth={false}
        >
          Login
        </SubmitButton>
      </LoginForm>
    </Container>
  );
};

const Container = styled(Box)`
  vertical-align: top;
  position: relative;
  margin: 0 auto;
  width: 25%;
  min-width: 250px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20%;
`;

const SubmitButton = styled(Button)`
  width: 50%;
  margin-top: 10px;
  margin-left: auto;
`;
