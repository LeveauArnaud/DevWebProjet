import axios from "axios";

function findAllPrescripteur() {
    return axios.get("https://127.0.0.1:8000/api/prescripteurs")
        .then(response => response.data["hydra:member"])
};


function find(idCorrection) {
    return axios.get("https://127.0.0.1:8000/api/corrections/"+idCorrection)
        .then(response => response.data);
}

function update(idClient, idCorrection, correction) {
    return axios.put("https://127.0.0.1:8000/api/corrections/"+idCorrection, {...correction, idPrescripteur:`/api/prescripteurs/${correction.idPrescripteur}`});
}

export default{
    findAllPrescripteur,
    find,
    update
};