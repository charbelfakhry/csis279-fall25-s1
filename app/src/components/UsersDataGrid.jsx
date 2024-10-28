import React, { useEffect, useState } from "react";
import DataGrid from "./datagrid/DataGrid";
import UserService from "../services/UserService";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const UsersDataGrid = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const data = await UserService.getAll();
      setUsers(data?.data?.users);
    } catch (e) {
      toast.error("Failed to fetch persons");
    }
  };

  let columns = [];
  if (users.length <= 0) {
    return;
  }
  let fields = Object.keys(users["0"]);
  fields.forEach(f => columns.push({ label: f, field: f }));

  return (
    <div>
      <h1>User Reusable DataGrid Example</h1>
      <DataGrid columns={columns} rows={users} />
    </div>
  );
};

export default UsersDataGrid;
