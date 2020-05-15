import axios from "axios";

function findAllVerres() {
    return axios.get("https://127.0.0.1:8000/api/verres")
        .then(response => response.data["hydra:member"])
}

export default{
    findAllVerres,
};