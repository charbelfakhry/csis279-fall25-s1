
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

    const deleteUser = async (user_id) => {
        try {
            const URL = `http://localhost:4000/api/users/user/${user_id}`;
            const res = await axios.delete(URL);
            if (res.status === 200) {
                alert('User deleted successfully');
                getUsers();
            } else {
                alert('Failed to delete user');
            }
    }catch(e){
        console.error('Failed to delete user', e);
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
                    <button onClick={getUsers}>Refresh</button>
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
                                <td>
                                    <button className="text-danger" onClick={() => deleteUser(user.user_id)}>DELETE</button> 
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
