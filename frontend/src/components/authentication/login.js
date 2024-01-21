import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';

function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async ({ username, password }) => {
        try {
            const user = { username, password };
            const { data } = await axios.post('http://localhost:8000/token/', user, {
                headers: { 'Content-Type': 'application/json' },
                // withCredentials: true
            });

            localStorage.clear();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            navigate('/home'); // Redirect to home page or dashboard
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: '500px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Username"
                            fullWidth
                            margin="normal"
                            {...register('username', { required: 'Username is required' })}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            {...register('password', { required: 'Password is required' })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default Login;
