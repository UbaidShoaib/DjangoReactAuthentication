import React, {useEffect} from "react";

import UserList from "./user/userList";
import {useNavigate} from "react-router-dom";
// Define the Login function.
export const Home = () => {
    const navigation =useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('access_token') || localStorage.getItem('access_token') === null) {
            navigation('/login')
        }

    }, []);
    return(
    <div className="form-signin mt-5 text-center">
        <h3>Hi </h3>
        <UserList/>

    </div>)
}