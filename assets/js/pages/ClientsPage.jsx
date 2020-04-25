import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from "../components/Pagination";

const ClientsPage = (props) => {



    const [clients, setClients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(()=>{
            axios.get("https://127.0.0.1:8000/api/clients")
                .then(response => response.data["hydra:member"])
                .then(data => setClients(data))
                .catch(error => console.log(error.response));
        },[])




    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const handleSearch = event =>{
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    };

    const filteredClients = clients.filter( c =>
        c.prenom.toLowerCase().includes(search.toLowerCase()) ||
        c.nom.toLowerCase().includes(search.toLowerCase()) ||
        c.ville.toLowerCase().includes(search.toLowerCase()) ||
        c.rue.toLowerCase().includes(search.toLowerCase())

    );

    const itemsPerPage = 5;

    const paginatedClients = Pagination.getData(
        filteredClients,
        currentPage,
        itemsPerPage);




    return(
        <>
            <h1>Liste des clients</h1>
            <div className="row">
                <div className="col-md-10">
                    <div className="form-group">
                        <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher ..." />
                    </div>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary">
                        Nouveau
                    </button>
                </div>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="text-center"></th>
                        <th className="text-center">Code</th>
                        <th className="text-center">Nom</th>
                        <th className="text-center">Prenom</th>
                        <th className="text-center">Ville</th>
                        <th className="text-center">Rue</th>
                        <th className="text-center align-middle">

                        </th>
                    </tr>
                </thead>
                <tbody>
                {paginatedClients.map(client => <tr key={client.id} >
                    <th className="text-center"><img className="c-img" src={client.photo} /></th>
                    <td className="text-center">{client.nCli}</td>
                    <td className="text-center">{client.nom}</td>
                    <td className="text-center">{client.prenom}</td>
                    <td className="text-center">{client.ville}</td>
                    <td className="text-center">{client.rue}</td>
                    <td className="text-center align-middle">
                        <a
                            href={"/#/client/"+client.id}
                            className="btn btn-sm btn-success"
                        >
                            Selectionner
                        </a>
                    </td>
                </tr>)}

                </tbody>
            </table>

            {itemsPerPage < filteredClients.length &&( <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredClients.length}
                onPageChanged={handlePageChange}
            />
            )}


        </>
    )
}

export default ClientsPage;