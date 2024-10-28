import React, { useEffect, useState } from 'react';
import DataGrid from './datagrid/DataGrid';
import UserService from '../services/UserService';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const UsersDataGrid = () => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        getUsers();
    }, []);

    const getUsers = async() =>{
        try{
            const data = await UserService.getAll();
            setUsers(data?.data?.users);
        }catch(e){
            toast.error("Failed to fetch persons");
        }
    }
    const columns = [
        { label: 'ID', field: 'user_id' },
        { label: 'Email', field: 'user_email' },
        { label: 'User Name', field: 'user_username' },
        { label: 'Phone', field: 'user_phone' },
    ];

    return (
        <div>
            <h1>User Reusable DataGrid Example</h1>
            <DataGrid columns={columns} rows={users} />
        </div>
    );
};

export default UsersDataGrid;
