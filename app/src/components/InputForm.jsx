import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const InputForm = ({ setNewData }) => {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');


    const handleSubmit = () => {
        setNewData({
            user_id: userId,
            user_username: userName,
            user_phone: phoneNumber,
            user_email: email
        });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">User Input Form</h2>
            <div className="form-group">
                <label htmlFor="userId">UserId</label>
                <input
                    type="number"
                    className="form-control"
                    id="userId"
                    placeholder="UserId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="userName">UserName</label>
                <input
                    type="text"
                    className="form-control"
                    id="userName"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">PhoneNumber</label>
                <input
                    type="number"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="PhoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">
                Add
            </button>
        </div>
    );
}

export default InputForm;
