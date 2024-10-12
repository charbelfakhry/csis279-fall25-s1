import React from "react";

/**
 * UserTable Component
 *
 * A component that renders a table of user data with functionality to update and delete users.
 * Each user can be edited directly in the table fields, and changes can be saved by clicking the
 * "Update User" button. Users can also be removed by clicking the "Delete User" button.
 *
 * @component
 * @param {Array} users - Array of user objects to display in the table.
 * @param {Function} updateUser - Function to call when updating a user's information.
 * @param {Function} deleteUser - Function to call when deleting a user.
 * @returns {JSX.Element} - Rendered UserTable component.
 */

const UserTable = ({ users, updateUser,deleteUser }) => {


    return (
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
            )
}

export default UserTable;