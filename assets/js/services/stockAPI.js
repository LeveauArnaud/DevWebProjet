import axios from "axios";
import {API_URL} from "../config.js";

function findAll() {
    return axios.get(API_URL+"stocks")
        .then(response => response.data["hydra:member"])
};

function get(idMonture) {
    return axios.get(API_URL+"stocks/"+idMonture)
        .then(response => response.data["hydra:member"])
};

function update(idMonture, quantite) {
    return axios.patch(API_URL+"stocks/"+idMonture, { quantite: quantite })
};

export default{
    findAll,
    update,
    get
};