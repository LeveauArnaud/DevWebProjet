import axios from "axios";

function findAllPrescripteur() {
    return axios.get("https://127.0.0.1:8000/api/prescripteurs")
        .then(response => response.data["hydra:member"])
};


function find(idCorrection) {
    return axios.get("https://127.0.0.1:8000/api/corrections/"+idCorrection)
        .then(response => response.data);
}

function update(idCorrection, correction) {
    return axios.patch("https://127.0.0.1:8000/api/corrections/"+idCorrection, correction);
}

export default{
    findAllPrescripteur,
    find,
    update
};