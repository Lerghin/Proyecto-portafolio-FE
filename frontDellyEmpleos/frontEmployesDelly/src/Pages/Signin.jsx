import { useRef } from 'react';
import {
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { API } from '../Utils/axios';
import { toast } from 'react-toastify';
import { login } from '../Store/Actions/authActions.js';
import { LS } from './../Utils/LS.js';

const Root = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 400,
  width: '100%',
  backgroundColor: '#fff',
}));

const Title = styled(Typography)({
  marginBottom: '16px',
  color: '#000',
  textAlign: 'center',
});

const WelcomeTitle = styled(Typography)({
  marginBottom: '32px',
  color: '#000',
  textAlign: 'center',
  fontWeight: 'bold',
});

const StyledButton = styled(Button)({
  backgroundColor: '#f50057',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#c51162',
  },
});

const Link = styled('a')({
  marginTop: '16px',
  display: 'block',
  textAlign: 'center',
  color: '#000',
  textDecoration: 'none',
});

const Signin = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      console.log(userData);
      const res = await API.post('/auth/login', userData);

      dispatch(login(res.data));
      if (res.status === 200) {
        toast.success('Estas loguead@ Satisfactoriamente');
        const { token, role } = res.data;
        LS.set('token', token);
        LS.set('role', role);

        if (role === 'ADMIN') {
          navigate('/homeadmin');
        } else {
          navigate('/homeuser');
        }
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <Root>
      <Container>
        <Grid container justifyContent="center">
          <Grid item>
            <WelcomeTitle variant="h4">
              Bienvenid@ a Salty
            </WelcomeTitle>
            <StyledPaper elevation={3}>
              <form onSubmit={handleLogin}>
                <Title variant="h5">
                  Iniciar Sesión
                </Title>
                <TextField
                  label="Correo electrónico"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  inputRef={usernameRef}
                />
                <TextField
                  label="Contraseña"
                  variant="outlined"
                  type="password"
                  fullWidth
                  margin="normal"
                  inputRef={passwordRef}
                />
                <StyledButton
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Iniciar Sesión
                </StyledButton>
              </form>
              <Link href="/signup">
                ¿No tienes una cuenta? Regístrate
              </Link>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Root>
  );
};

export default Signin;
