
import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const URL = 'http://localhost:4000/api/users/users';
            const result = await axios.get(URL);
            if (result.status === 200) {
                console.log(result.data.users);
                setUsers(result.data.users);
            } else {
                alert('Failed to fetch users')
            }
        } catch (e) {
            console.error('failed to fetch users', e);
        }
    }

    return(
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>USER ID</th>
                        <th>USERNAME</th>
                        <th>PHONE</th>
                        <th>EMAIL</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map(user=>(
                            <tr key={user.user_id}>
                                <td>
                                    {user.user_id}
                                </td>
                                <td>
                                    {user.user_username}
                                </td>
                                <td>
                                    {user.user_phone}
                                </td>
                                <td>
                                    {user.user_email}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )

}

export default Users;
