import React,{ useState } from "react";
import axios from "axios";

const CreateUser = () => {
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [password, setpassword] = useState('');
    const [message, setmessage] = useState('');

    const handlesub = async(event) => {
        event.preventDefault();

        try{
            const URL = 'http://localhost:4000/api/users/user';
            const res = await axios.post(URL, {
                user_username: username,
                user_email: email,
                user_pass: password,
                user_phone: phone
            });

            if(res.status === 201){
                setmessage('User created successfully');
                setusername('');
                setemail('');
                setphone('');
                setpassword('');
            }else{
                setmessage('Failed to create user');
            }

        }catch(err){
            console.error('Failed to create user', err);
            setmessage('Failed to create user');
        }

    }

    return(
        <div>
            <h2>Create User</h2>
            <form onSubmit={handlesub}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text"
                    className="form-control"
                    value={username}
                    onChange={(e)=>setusername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email"
                    className="form-control"
                    value={email}
                    onChange={(e)=>setemail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                    type="text"
                    className="form-control"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}/> 
                </div>

                <button type="submit"className="btn btn-primary">Create User</button>
            </form>
        </div>
    );
};

export default CreateUser;