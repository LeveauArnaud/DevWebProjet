import axios from "axios";
import {API_URL} from "../config.js";

function findAllVerres() {
    return axios.get(API_URL+"verres")
        .then(response => response.data["hydra:member"])
}

export default{
    findAllVerres,
};