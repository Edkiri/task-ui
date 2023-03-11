import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { postLoginUser, signinWithGoogle } from '../user/services/api';

function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData);
    try {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const displayName = formData.get('displayName') as string;
      const user = await postLoginUser({
        email: email,
        password: password,
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
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
          <Button
            sx={{ marginTop: '0.5rem' }}
            type="submit"
            fullWidth
            variant="contained"
          >
            Login
          </Button>
        </form>
        <div className="DividerContainer">
          <hr />
        </div>
        <span>Or</span>
        <a
          href="http://localhost:3000/api/auth/google/login"
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
