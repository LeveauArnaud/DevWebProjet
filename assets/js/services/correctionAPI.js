import axios from "axios";

function findAllPrescripteur() {
    return axios.get("https://127.0.0.1:8000/api/prescripteurs")
        .then(response => response.data["hydra:member"])
};


function find(idCorrection) {
    return axios.get("https://127.0.0.1:8000/api/corrections/"+idCorrection)
        .then(response => response.data);
}

function update(idCorrection,idClient,idPrescripteur, correction) {
    return axios.put("https://127.0.0.1:8000/api/corrections/"+idCorrection, {...correction, idClient:`/api/clients/${idClient}`, idPrescripteur:`/api/prescripteurs/${idPrescripteur}`});
}

export default{
    findAllPrescripteur,
    find,
    update
};