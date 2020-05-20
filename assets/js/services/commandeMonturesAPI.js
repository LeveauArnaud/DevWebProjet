import axios from "axios";
import {API_URL} from "../config.js";

function findAll() {
    return axios.get(API_URL+"commande_montures")
        .then(response => response.data["hydra:member"])
};


function find(idCommandeMonture){
    return axios.get(API_URL+"commande_montures/"+idCommandeMonture)
        .then(response => response.data);
}

function update(idClient, commandeMonture) {
    return axios.put(API_URL+"commande_montures/"+commandeMonture.id, {...commandeMonture, idClient:`/api/clients/${idClient}` , idMonture:`/api/montures/${commandeMonture.idMonture}`});
}

function create(idClient, commandeMonture) {
    return axios.post(API_URL+"commande_montures", {...commandeMonture, idClient:`/api/clients/${idClient}` , idMonture:`/api/montures/${commandeMonture.idMonture}`});
}

export default{
    findAll,
    find,
    update,
    create
};