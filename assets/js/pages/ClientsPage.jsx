import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from "../components/Pagination";

const ClientsPage = (props) => {



    const [clients, setClients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
            axios.get("https://127.0.0.1:8000/api/clients")
                .then(response => response.data["hydra:member"])
                .then(data => setClients(data))
                .catch(error => console.log(error.response));
        },[])



    const handlePageChange = page => {
        setCurrentPage(page);
    };
    const itemsPerPage = 5;

    const paginatedClients = Pagination.getData(
        clients,
        currentPage,
        itemsPerPage
    );




    return(
        <>
            <h1>Liste des clients</h1>
            <form className="">
                <input className="form-control mr-sm-2" type="text" placeholder="Recherche client"/>
            </form>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="text-center"></th>
                        <th className="text-center">Nom</th>
                        <th className="text-center">Prenom</th>
                        <th className="text-center">Ville</th>
                        <th className="text-center">Rue</th>
                        <th className="text-center align-middle">
                            <button

                                className="btn btn-sm btn-primary"
                            >
                                Nouveau
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {paginatedClients.map(client => <tr key={client.id} >
                    <th className="text-center"><img className="c-img" src={client.photo} /></th>
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

            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={clients.length}
                onPageChanged={handlePageChange}
            />


        </>
    )
}

export default ClientsPage;