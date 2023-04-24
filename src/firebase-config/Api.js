import axios from "axios"
import { getUserData } from "./Storage";

// config file for firebase to authenticate the user
axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";
const API_KEY = "put your api key here"
const REGISTER_URL = `/accounts:signUp?key=${API_KEY}`;
const LOGIN_URL = `/accounts:signInWithPassword?key=${API_KEY}`;
const USER_DETAILS_URL = `/accounts:lookup?key=${API_KEY}`;



export const RegisterAPi = (inputs) => {
    let data  = {displayName:inputs.name,email:inputs.email,password:inputs.password }
    return axios.post(REGISTER_URL,data)
}

export const LoginAPi = (inputs) => { 
    let data = { email: inputs.email, password: inputs.password, returnSecureToken: true }
    return axios.post(LOGIN_URL, data)
}

export const getUserDetails = () => {
    let data = { idToken: getUserData() }
    return axios.post(USER_DETAILS_URL, data)
}
