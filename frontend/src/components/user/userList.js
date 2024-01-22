import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../authentication/Service/jwtService";
import Alert from "react-bootstrap/Alert";

function UsersList() {
    const navigation = useNavigate()
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
            navigation('/login')
        }

    }, []);
    useEffect(() => {

        fetchUsers();
        
    }, []);
    async function fetchUsers() {
        try {
            const response = await axiosInstance.get('users/',);
            if(response.data === undefined){

            setShow(true)
            setMessage('Some thing went wrong')
            }
            else{
            setUsers(response.data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setShow(true)
            setMessage('Some thing went wrong')
        }
    }
    useEffect(()=>{

    },[show])
    return (
        <div className="m-5 text-center">
            {show ?
                <Alert key={'login-error'} variant={'danger'}
                     onClose={() => {setMessage('')
                     setShow(false)
                     }} dismissible>
                     {message}</Alert> :
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) =>
                    <tr key={user.id}>
                        <td>{index+1}</td>
                        <td>{user.username}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>
                            <Button onClick={() => navigation(`/users/${user.id}`)}>get detail</Button>
                        </td>
                    </tr>
                )}


                </tbody>
            </Table>}
        </div>
    );
}

export default UsersList;
