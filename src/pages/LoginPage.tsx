import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { postLoginUser } from '../user/services/api';

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError('');
    try {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      await postLoginUser({
        email: email,
        password: password,
      });
      navigate('/');
    } catch (err: any) {
      if (err.response?.data?.statusCode === 401) {
        setError('Email or password incorrect');
      }
    }
  };

  const goToRegisterPage = () => {
    navigate('/signup');
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
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            size="small"
            name="email"
          />

          <TextField
            fullWidth
            label="Password"
            type={'password'}
            variant="outlined"
            size="small"
            name="password"
          />
          {error && <span className="errorMsg">{error}</span>}
          <Button
            sx={{ marginTop: '0.5rem' }}
            type="submit"
            fullWidth
            variant="contained"
          >
            Login
          </Button>
        </form>
        <button className="goToRegisterBtn" onClick={goToRegisterPage}>
          Create an account
        </button>
        <div className="DividerContainer">
          <hr />
        </div>
        <span>Or</span>
        <a
          href={`${import.meta.env.VITE_REACT_APP_API_URL}/auth/google/login`}
          className="GoogleAuth"
        >
          <GoogleIcon sx={{ fontSize: '35px' }} />
          <span>Sign in with Google</span>
        </a>
      </div>
    </Box>
  );
}

export default LoginPage;
