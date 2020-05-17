import axios from "axios";

function findAll() {
    return axios.get("https://127.0.0.1:8000/api/prescripteurs")
        .then(response => response.data["hydra:member"])
};


function find(idCommandeMonture){
    return axios.get("https://127.0.0.1:8000/api/commande_montures/"+idCommandeMonture)
        .then(response => response.data);
}

function update(idCommandeMonture,idClient, commandeMonture) {
    return axios.put("https://127.0.0.1:8000/api/commande_montures/"+idCommandeVerres, {...commandeVerres, idClient:`/api/clients/${idClient}`, idVerre:`/api/verres/${commandeVerres.idVerre}`});
}


export default{
    findAll,
    find,
    update
};