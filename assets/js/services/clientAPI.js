import axios from "axios";


function find(idCorrection) {
    return axios.get("https://127.0.0.1:8000/api/corrections/"+idCorrection)
        .then(response => response.data);
}

function update(idCorrection, correction) {
    return axios.put("https://127.0.0.1:8000/api/corrections/"+idCorrection, correction);
}



function findCommandeMonture(idCommandeMonture){
    return axios.get("https://127.0.0.1:8000/api/commande_montures/"+idCommandeMonture)
        .then(response => response.data);
}

export default{
    find,
    update,
    findCommandeMonture
};