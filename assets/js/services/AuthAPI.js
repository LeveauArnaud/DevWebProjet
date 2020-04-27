import axios from "axios";
import jwtDecode from "jwt-decode";



function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}


function setAxiosToken(token){
    axios.defaults.headers["Authorization"]= "Bearer " + token;
}

function authenticate(credentials){
    return axios.post("https://127.0.0.1:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            //stockage du token dans le localStorage
            window.localStorage.setItem("authToken", token)
            // on prévient axios qu'on a un header par défault pour toutes les futures requêtess HTTP
            setAxiosToken(token);
        });
}


function setup(){
    //voir si on a un token
    const token = window.localStorage.getItem("authToken");
    // si le token eest valide
    if(token){
        const {exp : expiration} = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()){
            setAxiosToken(token);
        }
    }
}


function isAuthenticated(){
    //voir si on a un token
    const token = window.localStorage.getItem("authToken");
    // si le token eest valide
    if(token){
        const {exp : expiration} = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
};