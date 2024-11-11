
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

const signup = (userData) => {
    return axios.post(`${API_URL}/signup`, userData);
};

const login = (credentials) => {
    return axios.post(`${API_URL}/login`, credentials);
};

const getUsers = () => {
    return axios.get(`${API_URL}/users`);
};

const getInventory = () => {
    return axios.get(`${API_URL}/inventory`);
};

export { signup, login, getUsers, getInventory };