import axios from "axios";

function findAll() {
    return axios.get("https://127.0.0.1:8000/api/clients")
        .then(response => response.data["hydra:member"]);
}

function findID(id) {
    return axios.get("https://127.0.0.1:8000/api/clients/"+id)
        .then(response => response.data);
}

function update(id, client) {
    return axios.patch("https://127.0.0.1:8000/api/clients/"+id, client);
}

function create(client) {
    return axios.post("https://localhost:8000/api/clients", client);
}

export default{
    findAll,
    findID,
    update,
    create
};