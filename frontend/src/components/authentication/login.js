import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';
import Alert from 'react-bootstrap/Alert';

function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const onSubmit = async ({ username, password }) => {
        try {
            const user = { username, password };
            const { data } = await axios.post('http://localhost:8000/token/', user, {
                headers: { 'Content-Type': 'application/json' },
            });

            localStorage.clear();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            setShow(true)
            setMessage(error.response.data.detail)
        }
    };

    return (
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            {show ?
                <Alert key={'login-error'} variant={'danger'}
                     onClose={() => {setMessage('')
                     setShow(false)}} dismissible>
                     {message}</Alert>
                        : false}

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
