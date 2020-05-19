import axios from "axios";
import {API_URL} from "../config.js";

function findAll() {
    return axios.get(API_URL+"clients")
        .then(response => response.data["hydra:member"]);
}

function findID(id) {
    return axios.get(API_URL+"clients/"+id)
        .then(response => response.data);
}

function update(id, client) {
    return axios.put(API_URL+"clients/"+id, client);
}

function create(client) {
    return axios.post(API_URL+"clients", client);
}

export default{
    findAll,
    findID,
    update,
    create
};