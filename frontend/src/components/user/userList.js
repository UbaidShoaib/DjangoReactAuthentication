import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../authentication/Service/jwtService";

function UsersList() {
    const navigation = useNavigate()
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axiosInstance.get('users/',{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchUsers();
    }, []);

    return (
        <div className="m-5 text-center">
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
            </Table>

        </div>
    );
}

export default UsersList;
