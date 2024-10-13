import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        user_username: '',
        user_phone: '',
        user_email: '',
        user_pass: ''
    });
    const [editUserId, setEditUserId] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    const createUser = async () => {
        try {
            const URL = 'http://localhost:4000/api/users/user';
            const result = await axios.post(URL, newUser);
            if (result.status === 200 || result.status === 201) {
                setUsers([...users, result.data.user]);
                alert('User created successfully');
                resetForm();
            } else {
                alert('Failed to create user');
            }
        } catch (error) {
            console.error('failed to create user', error);
            alert('Failed to create user');
        }
    };

    const updateUser = async () => {
        try {
            const URL = `http://localhost:4000/api/users/user`;
            const result = await axios.put(URL, { user_id: editUserId, ...newUser });
            if (result.status === 200 || result.status === 201) {
                setUsers(users.map(user =>
                    user.user_id === editUserId ? { ...user, ...newUser } : user
                ));
                alert('User updated successfully');
                resetForm();
            } else {
                alert('Failed to update user');
            }
        } catch (error) {
            console.error('Failed to update user', error);
            alert('Failed to update user');
        }
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editUserId) {
            updateUser();
        } else {
            createUser();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleEditClick = (user) => {
        setNewUser({
            user_username: user.user_username,
            user_phone: user.user_phone,
            user_email: user.user_email,
            user_pass: ''
        });
        setEditUserId(user.user_id);
    };

    const resetForm = () => {
        setNewUser({ user_username: '', user_phone: '', user_email: '', user_pass: '' });
        setEditUserId(null);
    };

    const getUsers = async () => {
        try {
            const URL = 'http://localhost:4000/api/users/users';
            const result = await axios.get(URL);
            if (result.status === 200) {
                setUsers(result.data.users);
            } else {
                alert('Failed to fetch users');
            }
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
    };

    const deleteUser = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                const URL = `http://localhost:4000/api/users/user/${userId}`;
                const result = await axios.delete(URL);
                if (result.status === 200) {
                    setUsers(users.filter(user => user.user_id !== userId));
                    alert('User deleted successfully');
                } else {
                    alert('Failed to delete user');
                }
            } catch (error) {
                console.error('Failed to delete user', error);
                alert('Failed to delete user');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">User List</h2>
            <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">USER ID</th>
                            <th scope="col">USERNAME</th>
                            <th scope="col">PHONE</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map(user => (
                            <tr key={user.user_id}>
                                <td>{user.user_id}</td>
                                <td>{user.user_username}</td>
                                <td>{user.user_phone}</td>
                                <td>{user.user_email}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-primary mx-1"
                                        onClick={() => handleEditClick(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger mx-1"
                                        onClick={() => deleteUser(user.user_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <h3>{editUserId ? 'Edit User' : 'Create New User'}</h3>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="user_username"
                            value={newUser.user_username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="user_phone"
                            value={newUser.user_phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="user_email"
                            value={newUser.user_email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="user_pass"
                            value={newUser.user_pass}
                            onChange={handleInputChange}
                            required={!editUserId}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {editUserId ? 'Update User' : 'Create User'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Users;
