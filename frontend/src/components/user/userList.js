import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function UsersList() {
    const navigation = useNavigate()
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:8000/users/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }}); // Adjust URL to your API
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchUsers();
    }, []);

    return (
        <div className="text-center">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user =>
                    <tr key={user.id}>
                        <td>1</td>
                        <td>{user.username}</td>
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
