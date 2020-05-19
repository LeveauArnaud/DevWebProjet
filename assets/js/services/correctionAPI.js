import axios from "axios";
import {API_URL} from "../config.js";

function findAllPrescripteur() {
    return axios.get(API_URL+"prescripteurs")
        .then(response => response.data["hydra:member"])
};


function find(idCorrection) {
    return axios.get(API_URL+"corrections/"+idCorrection)
        .then(response => response.data);
}

function update(idCorrection,idClient,idPrescripteur, correction) {
    return axios.put(API_URL+"corrections/"+idCorrection, {...correction, idClient:`/api/clients/${idClient}`, idPrescripteur:`/api/prescripteurs/${idPrescripteur}`});
}

export default{
    findAllPrescripteur,
    find,
    update
};