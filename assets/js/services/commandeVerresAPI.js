import axios from "axios";

function findAllCommandeVerres() {
    return axios.get("https://127.0.0.1:8000/api/prescripteurs")
        .then(response => response.data["hydra:member"])
};


function find(idCommandeVerres){
    return axios.get("https://127.0.0.1:8000/api/commande_verres/"+idCommandeVerres)
        .then(response => response.data);
}

function update(idCommandeVerres,idClient, commandeVerres) {
    return axios.put("https://127.0.0.1:8000/api/commande_verres/"+idCommandeVerres, {...commandeVerres, idClient:`/api/clients/${idClient}`, idVerre:`/api/verres/${commandeVerres.idVerre}`});
}

function create(idClient, commandeVerres) {
    return axios.post("https://127.0.0.1:8000/api/commande_verres", {commandeVerres});
}

export default{
    findAllCommandeVerres,
    find,
    update,
    create
};