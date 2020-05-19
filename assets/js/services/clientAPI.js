import axios from "axios";
import {API_URL} from "../config.js";


function find(idCorrection) {
    return axios.get(API_URL+"corrections/"+idCorrection)
        .then(response => response.data);
}

function update(idCorrection, correction) {
    return axios.put(API_URL+"corrections/"+idCorrection, correction);
}



function findCommandeMonture(idCommandeMonture){
    return axios.get(API_URL+"commande_montures/"+idCommandeMonture)
        .then(response => response.data);
}


function create(client) {
    return axios.post(API_URL+"clients", client);
}

export default{
    find,
    update,
    findCommandeMonture,
    create
};