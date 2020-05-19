import axios from "axios";
import {API_URL} from "../config.js";

function findAllCommandeVerres() {
    return axios.get(API_URL+"prescripteurs")
        .then(response => response.data["hydra:member"])
};


function find(idCommandeVerres){
    return axios.get(API_URL+"commande_verres/"+idCommandeVerres)
        .then(response => response.data);
}

function update(idCommandeVerres,idClient, commandeVerres) {
    return axios.put(API_URL+"commande_verres/"+idCommandeVerres, {...commandeVerres, idClient:`/api/clients/${idClient}`, idVerre:`/api/verres/${commandeVerres.idVerre}`});
}

function create(idClient, commandeVerres) {
    return axios.post(API_URL+"commande_verres", {...commandeVerres, idClient:`/api/clients/${idClient}`, idVerre:`/api/verres/${commandeVerres.idVerre}`});
}

export default{
    findAllCommandeVerres,
    find,
    update,
    create
};