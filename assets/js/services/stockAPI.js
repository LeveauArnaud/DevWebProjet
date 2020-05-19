import axios from "axios";
import {API_URL} from "../config.js";

function findAll() {
    return axios.get(API_URL+"stocks")
        .then(response => response.data["hydra:member"])
};


export default{
    findAll
};