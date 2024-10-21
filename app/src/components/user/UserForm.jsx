import React, { useEffect, useState } from 'react';
import UserService from "../../services/UserService";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserForm = (user) => {
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");

    const location = useLocation();
    const navigate = useNavigate(); // Replaced useHistory with useNavigate

    useEffect(() => {
        const person = location.state?.user;
        if (person) {
            assignPerson(person);
        }
    }, [location]);


    const assignPerson = (person) => {
        setId(person?.user_id);
        setUsername(person?.user_username);
        setEmail(person?.user_email);
        setPhone(person?.user_phone);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let result;
        try {
            if (id) {
                result = await UserService.update(
                    { user_id: id, user_username: username, user_email: email, user_phone: phone }
                );
            } else {
                result = await UserService.create(
                    { user_username: username, user_email: email, user_pass: '123', user_phone: phone }
                );
            }
            toast.success(result?.data?.message);
            navigate('/users'); // Replaced history.push with navigate
        } catch (error) {
            toast.error("Error saving person");
        }
    };

    const handleReset = () => {
        setId('');
        setUsername('');
        setEmail('');
        setPhone('');
    };

    const getCountries = async () => {
        try {
            let data = {
                tableName: "ref_country",
                value: "country_id",
                label: "country_name",
            };
            const countries = await UserService.loadRefernceTableInfo(data);
            setCountries(countries.data);
        } catch (err) {
            console.log(err);
            toast.error("Error fetching countries.");
        }
    };

    const getCities = async () => {
        try {
            let data = {
                tableName: "ref_city",
                value: "city_id",
                label: "city_name",
            };
            const cities = await UserService.loadRefernceTableInfo(data);
            setCities(cities.data);
        } catch (error) {
            toast.error("Error getting cities.");
        }
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    return (
        <div className='container w-75'>
            <h2>User Form</h2>
            <form>
                <div className="form-group row p-4">
                    <label htmlFor='name' className='col-sm-2 col-form-label'>User Name</label>
                    <div className="col-sm-10">
                        <input className="form-control" value={username} type="text" id="name" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                </div>
                <div className='form-group row p-4'>
                    <label htmlFor='email' className='col-sm-2 col-form-label'>Email</label>
                    <div className="col-sm-10">
                        <input type="email" className='form-control' id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                </div>
                <div className='form-group row p-4'>
                    <label htmlFor='phone' className='col-sm-2 col-form-label'>Phone</label>
                    <div className="col-sm-10">
                        <input className='form-control' type="text" id="phone" onChange={(e) => setPhone(e.target.value)} value={phone} />
                    </div>
                </div>
                <div className='form-group row p-4'>
                    <label htmlFor='country' className='col-sm-2 col-form-label'>Country</label>
                    <div className="col-sm-10">
                        {/* <CustDropdown options={countries} onSelectedItem={handleCountryChange}/> */}
                    </div>
                </div>
                <div className='form-group row p-4'>
                    <label htmlFor='city' className='col-sm-2 col-form-label'>Cities</label>
                    <div className="col-sm-10">
                        {/* <CustDropdown options={cities} onSelectedItem={handleCityChange}/> */}
                    </div>
                </div>
                <div className='form-group p-4 row justify-content-center'>
                    <div className='col-1'>
                        <button onClick={handleSubmit} className='btn btn-sm btn-primary'>Save</button>
                    </div>
                    <div className='col-1'>
                        <button className='btn btn-sm btn-secondary' onClick={handleReset}>Reset</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UserForm;
