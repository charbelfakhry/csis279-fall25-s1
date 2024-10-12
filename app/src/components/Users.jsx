import React, { useEffect, useState } from "react";
import axios from "axios";
import InputForm from "./InputForm";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

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
                //console.log(result.data.users);
                setUsers(result.data.users);
            } else {
                alert('Failed to fetch users');
            }
        } catch (e) {
            console.error('failed to fetch users', e);
        }
    };

    const addDataToList = (data) => {
        console.log(data);
        setUsers((prevUsers) => [...prevUsers, data]);
    };

    const updateUser = (data) => {

        let index = users.findIndex(user => user.user_id === Number(data.user_id));


        setUsers(prevUsers => {
            const newUsers = [...prevUsers];
            newUsers[index] = data;
            console.log(newUsers);
            return newUsers;
        });
        console.log(users);
    };

    const deleteUser = (id) => {
        console.log(id);
        setUsers(u => u.filter((element) => element.user_id !== id));
    };

    return (
        <>
            <table className="table table-striped">
                <thead className="table-dark">
                <tr>
                    <th>USER ID</th>
                    <th>USERNAME</th>
                    <th>PHONE</th>
                    <th>EMAIL</th>
                    <th>UPDATE</th>
                    <th>DELETE</th>
                </tr>
                </thead>
                <tbody>
                {users && users.map(user => (
                    <tr key={user.user_id}>
                        <td>
                            <label
                                id={`userId${user.user_id}`}>
                                {user.user_id}
                            </label>
                        </td>
                        <td>
                            <input
                                className="form-control"
                                id={`userName${user.user_id}`}
                                defaultValue={user.user_username}
                            />
                        </td>
                        <td>
                            <input
                                className="form-control"
                                id={`userPhone${user.user_id}`}
                                defaultValue={user.user_phone}
                            />
                        </td>
                        <td>
                            <input
                                className="form-control"
                                id={`userEmail${user.user_id}`}
                                defaultValue={user.user_email}
                            />
                        </td>
                        <td>
                            <button
                                className="btn btn-secondary"
                                onClick={() => updateUser({
                                    user_id: Number(document.getElementById(`userId${user.user_id}`).innerText),
                                    user_username: document.getElementById(`userName${user.user_id}`).value,
                                    user_phone: document.getElementById(`userPhone${user.user_id}`).value,
                                    user_email: document.getElementById(`userEmail${user.user_id}`).value,
                                    user_pass: user.user_pass
                                })}>
                                Update User
                            </button>
                        </td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => deleteUser(user.user_id)}>
                                Delete User
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <InputForm setNewData={addDataToList} />
        </>
    );
};

export default Users;
