import axios from "axios";

function findAllPrescripteur() {
    return axios.get("https://127.0.0.1:8000/api/prescripteurs")
        .then(response => response.data["hydra:member"])
};


export default{
    findAllPrescripteur
};