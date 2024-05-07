import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {getToken, login} from "./actions.ts";
import {Navigate, useNavigate} from "react-router-dom";
import {connect, DispatchProp} from "react-redux";

function Copyright(props: any) {
    console.log(import.meta.env.VITE_APP_BACKEND)
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://gymforge.com.br/">
                GymForge
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


function Login({dispatch}: any & DispatchProp) {
    const navigate = useNavigate();

    if (getToken()) {
        return <Navigate to={"/home"}/>
    }

    return (
            <Grid container component="main" maxWidth="xs" className={"loginMain"}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Jornada - Entrar
                        </Typography>
                        <Box component="form" noValidate onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                            login(dispatch, event, navigate)
                        }} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="usuario"
                                label="Usuário"
                                name="usuario"
                                autoComplete="usuario"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="senha"
                                label="Senha"
                                type="password"
                                id="senha"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Entrar
                            </Button>
                            <Link href="#" variant="body2">
                                Esqueceu a Senha?
                            </Link>
                            <br/>
                            <Link href="/nova-conta">
                                {"Não tem conta? Cadastre-se"}
                            </Link>

                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
    );
}

export default connect()(Login);