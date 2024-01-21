import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {Card, Container, ListGroup} from "react-bootstrap";

function UserDetail() {
    const params = useParams()
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
console.log(params, 'hello')
    useEffect(() => {
        fetchUserDetails();

    }, []);
    async function fetchUserDetails() {
        try {
            const response = await axios.get(`http://localhost:8000/users/${params.userId}/with_addresses/`); // Adjust URL to your API
            setUserDetails(response.data);
        } catch (err) {
            setError(err);
            console.error('Error fetching user details:', err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading user details.</div>;

    return (
        <Container>
            {userDetails && (
                <Card>
                    <Card.Header as="h1">{userDetails.username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Email: {userDetails.email}</Card.Title>
                        <Card.Text>
                            <strong>Addresses:</strong>
                            <ListGroup>
                                {userDetails.addresses.map(address => (
                                    <ListGroup.Item key={address.id}>
                                        <strong>Type:</strong> {address.address_type}<br />
                                        <strong>Street:</strong> {address.street}<br />
                                        <strong>City:</strong> {address.city}<br />
                                        <strong>Province:</strong> {address.province}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}

export default UserDetail;
