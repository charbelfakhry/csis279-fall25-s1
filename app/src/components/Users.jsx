import React, { useEffect, useState } from "react";
import axios from "axios";
import InputForm from "./InputForm";
import UserTable from "./UserTable";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

/**
 * Users Component
 *
 * A component that fetches a list of users from an API, displays them in a table, and provides
 * functionality to update, delete, and add users. It uses Bootstrap for styling.
 *
 * @component
 * @returns {JSX.Element} - Rendered Users component.
 */
const Users = () => {
    const [users, setUsers] = useState([]); // State to store the list of users

    /**
     * useEffect hook to fetch users on component mount.
     * Calls getUsers to load the user list from the API.
     */
    useEffect(() => {
        getUsers();
    }, []);

    /**
     * Fetches the list of users from the API and updates the state.
     * @async
     * @function
     * @returns {Promise<void>} - Updates the users state with the data fetched from the API.
     */
    const getUsers = async () => {
        try {
            const URL = 'http://localhost:4000/api/users/users';
            const result = await axios.get(URL);
            if (result.status === 200) {
                // If the request is successful, update the users state
                setUsers(result.data.users);
            } else {
                alert('Failed to fetch users');
            }
        } catch (e) {
            console.error('failed to fetch users', e);
        }
    };

    /**
     * Adds new user data to the list of users.
     * @param {Object} data - The new user data to add.
     */
    const addDataToList = (data) => {
        console.log(data);
        setUsers((prevUsers) => [...prevUsers, data]);
    };

    /**
     * Updates a specific user's data in the users list.
     *
     * @param {Object} data - The user data to update.
     * @param {number} data.user_id - The user ID.
     * @param {string} data.user_username - The user's username.
     * @param {string} data.user_phone - The user's phone number.
     * @param {string} data.user_email - The user's email.
     */
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

    /**
     * Deletes a user from the users list.
     *
     * @param {number} id - The user ID of the user to delete.
     */
    const deleteUser = (id) => {
        console.log(id);
        setUsers(u => u.filter((element) => element.user_id !== id));
    };

    return (
        <>
           <UserTable users={users} updateUser={updateUser} deleteUser={deleteUser}/>
            <InputForm setNewData={addDataToList} />
        </>
    );
};

export default Users;
