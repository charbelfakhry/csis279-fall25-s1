import http from  "../http-common";
import { getToken, getTokenBearer } from "../utils/Utils";


const getAll = () => {
    return http.get("/users/users", {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
}

const get = (id) =>{
    return http.get(`/users/user/${id}`, {
        headers: {
            Authorization: getTokenBearer()
        }
    });
}

const create = (data) =>{
    return http.post(`/users/insertUser`, data);
}

const update = (data) => {
    return http.post(`/users/updateUser`, data);
}

const remove = (id) =>{
    console.log(id);
    return http.post(`/users/deleteUser`, {id});
    //return http.delete(`/users/deleteUser/${id}`);
}

const authenticate = (user) => {
    return http.post(`/users/auth/login`, user);
}

const loadRefernceTableInfo = (data) =>
{
    return http.post(`/user/loadRefernceTableInfo`, data)
}

const UserService = {
    getAll,
    get,
    create,
    update,
    remove,
    authenticate,
    loadRefernceTableInfo,
}

export default UserService;