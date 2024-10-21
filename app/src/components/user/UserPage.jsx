import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineUserAdd, AiFillDelete, AiFillEdit } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const UserPage = () => {

    const [persons, setPersons] = useState([]);
    const [person, setPerson] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedPersonId, setSelectedPersonId] = useState(0);

    const navigate = useNavigate(); // useNavigate instead of useHistory

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const persons = await UserService.getAll();
        setPersons(persons?.data?.users);
    }

    const selectClickHandler = (event, person) => {
        navigate('/userForm', { state: { user: person } }); // use navigate instead of history.push
    }

    const handleConfirmDelete = () => {
        UserService.remove(selectedPersonId)
            .then((res) => {
                toast.success(res?.data?.message, {
                    autoClose: 2000,
                });
                loadUsers();
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to delete person");
            }).finally(() => {
                setShowModal(false);
                setSelectedPersonId(0);
            });
    }

    const deleteClickHandler = (event, id) => {
        setSelectedPersonId(id);
        setShowModal(true);
    };

    return (
        <>
            <div className="container">
                <h3>Persons page.</h3>
                <Link to="/userForm" className="btn btn-primary btn" style={{ float: "left" }}><AiOutlineUserAdd /></Link>
                <table className="table w-100">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Select</th>
                            <th>Del.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            persons.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.user_id}</td>
                                        <td>{item.user_username}</td>
                                        <td>{item.user_email}</td>
                                        <td>{item.user_phone}</td>
                                        <td><button className="btn btn-success btn-sm" onClick={(event) => selectClickHandler(event, item)}><AiFillEdit /></button></td>
                                        <td><button className="btn btn-danger btn-sm" onClick={(event) => deleteClickHandler(event, item?.user_id)}><AiFillDelete /></button></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <p>{person?.name}</p>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserPage;
