import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {Box, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
function RegisterForm() {

    const navigate = useNavigate();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const [sameAddress, setSameAddress] = useState(false);

    const handleSameAddressChange = (event) => {
        setSameAddress(event.target.checked);
        if (event.target.checked) {
            ['Street', 'City', 'Province'].forEach(field => {
                setValue(`current${field}`, watch(`permanent${field}`));
            });
        }
    };

    const onSubmit = async (data) => {
        const formattedData = {

            user: {...data},
            addresses: [
                { address_type: 'permanent', street: data.permanentStreet, city: data.permanentCity, province: data.permanentProvince },
                { address_type: 'current', street: data.currentStreet, city: data.currentCity, province: data.currentProvince }
            ]
        };

        try {
            const response = await axios.post('http://localhost:8000/register/', formattedData);
            console.log(response.data);
            navigate('/login')
            // Handle success
        } catch (error) {
            console.error(error.response.data);
            // Handle errors
        }
    };

    return (
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: '1000px' }}>

            <Grid container spacing={2}>
            <Grid item xs={4}>
            <TextField label="Username" fullWidth margin="normal" {...register('username', { required: true })} error={!!errors.username} helperText={errors.username?.message} />
            </Grid>
            <Grid item xs={4}>
            <TextField label="First Name" fullWidth margin="normal" {...register('first_name', { required: true })} error={!!errors.first_name} helperText={errors.first_name?.message} />
            </Grid>
            <Grid item xs={4}>
            <TextField label="Last Name" fullWidth margin="normal" {...register('last_name', { required: true })} error={!!errors.last_name} helperText={errors.last_name?.message} />
            </Grid>
            </Grid>
            <Grid container spacing={2}>
            <Grid  item xs={4}>
            <TextField label="Email" type="email" fullWidth margin="normal" {...register('email', { required: true })} error={!!errors.email} helperText={errors.email?.message} />
            </Grid>
            <Grid  item xs={4}>
                <TextField label="Password" type="password" fullWidth margin="normal" {...register('password', { required: true })} error={!!errors.password} helperText={errors.password?.message} />
            </Grid>
            </Grid>
            {/* Gender Field */}
            <Grid container spacing={2}>
                <Grid item xs={4}>
            <FormControl fullWidth margin="normal">
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select labelId="gender-label" {...register('gender')}>
                    <MenuItem value="M">Male</MenuItem>
                    <MenuItem value="F">Female</MenuItem>
                    <MenuItem value="O">Other</MenuItem>
                </Select>
            </FormControl>

                </Grid>
                <Grid  item xs={4}>
            <TextField label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} fullWidth margin="normal" {...register('date_of_birth')} />

                </Grid>
                <Grid  item xs={4}>
            <TextField label="Phone Number" fullWidth margin="normal" {...register('phone_number')} />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
            <TextField label="Permanent Street" fullWidth margin="normal" {...register('permanentStreet', { required: 'Street is required' })} error={!!errors.permanentStreet} helperText={errors.permanentStreet?.message} />
                </Grid>
                <Grid  item xs={4}>
                    <TextField label="Permanent City" fullWidth margin="normal" {...register('permanentCity', { required: 'City is required' })} error={!!errors.permanentCity} helperText={errors.permanentCity?.message} />
                </Grid>
                <Grid  item xs={4}>
                    <TextField label="Permanent Province" fullWidth margin="normal" {...register('permanentProvince', { required: 'Province is required' })} error={!!errors.permanentProvince} helperText={errors.permanentProvince?.message} />
                </Grid>
            </Grid>
            {/* Checkbox to use same address */}
            <FormControlLabel control={<Checkbox checked={sameAddress} onChange={handleSameAddressChange} />} label="Use Permanent Address as Current" />

            <Grid container spacing={2}>
                <Grid item xs={4}>
            <TextField label="Current Street" fullWidth margin="normal" {...register('currentStreet')} disabled={sameAddress} />
                </Grid>
                <Grid  item xs={4}>
                    <TextField label="Current City" fullWidth margin="normal" {...register('currentCity')} disabled={sameAddress} />
                </Grid>
                <Grid  item xs={4}>
                    <TextField label="Current Province" fullWidth margin="normal" {...register('currentProvince')} disabled={sameAddress} />
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" margin="normal">Register</Button>
        </form>
        </Box>
    );
}

export default RegisterForm;
