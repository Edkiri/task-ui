import { Box, Button, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRegisterUser } from '../user/services/api';

function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const formData = new FormData(event.currentTarget);
    try {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const displayName = formData.get('displayName') as string;
      await postRegisterUser({
        email: email,
        password: password,
        displayName: displayName,
      });
      navigate('/account-created');
    } catch (err: any) {
      if (Array.isArray(err.response?.data?.message)) {
        setError(err.response?.data?.message[0]);
        return;
      }
      setError(err.response?.data?.message);
    }
  };

  const goToLoginPage = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="RegisterFormContainer">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            size="small"
            name="email"
            id="email"
          />
          <TextField
            fullWidth
            label="Password"
            type={'password'}
            variant="outlined"
            size="small"
            name="password"
            id="password"
          />
          <TextField
            fullWidth
            label="Display name"
            variant="outlined"
            size="small"
            name="displayName"
            id="displayName"
          />
          {error && <span className="errorMsg">{error}</span>}
          <Button
            sx={{ marginTop: '0.5rem' }}
            type="submit"
            fullWidth
            variant="contained"
          >
            Register
          </Button>
        </form>
        <div className="goToLoginContainer">
          <span>Do you already have an account?</span>
          <button onClick={goToLoginPage}>login</button>
        </div>
      </div>
    </Box>
  );
}

export default RegisterPage;
