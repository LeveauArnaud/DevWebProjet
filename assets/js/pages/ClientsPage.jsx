import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import ClientsAPI from "../services/clientsAPI";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../components/loarders/TableLoader";

const ClientsPage = (props) => {



    const [clients, setClients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    // nbr items par page
    const itemsPerPage = 5;

    //permet de récupérer les clients
    const fetchClients = async () => {
        try {
            const data = await ClientsAPI.findAll()
            setClients(data);
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les clients");
        }

    }

    //au chargement du composant on va chercher les montures en stock
    useEffect(()=> {
        fetchClients()
    },[])


console.log(clients);
    // gestion changement de page
    const handlePageChange = page => {
        setCurrentPage(page);
    };
    // gestion de la recherche
    const handleSearch = event =>{
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    };

    // filtrage des montures en stock en fonction de la recherche
    const filteredClients = clients && clients.filter( c =>
        c.nCli.toString().toLowerCase().includes(search.toLowerCase()) ||
        c.prenom.toLowerCase().includes(search.toLowerCase()) ||
        c.nom.toLowerCase().includes(search.toLowerCase()) ||
        c.ville.toLowerCase().includes(search.toLowerCase()) ||
        c.rue.toLowerCase().includes(search.toLowerCase())

    );


    // pagination des données
    const paginatedClients = Pagination.getData(
        filteredClients,
        currentPage,
        itemsPerPage);




    return(
        <>

            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des clients</h1>
                <Link to="/client/new/infos" className="btn btn-primary">Créer un client</Link>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher ..." />
                    </div>
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
                {!loading &&<tbody>
                {paginatedClients && paginatedClients.map(client => <tr key={client.id} >
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

                </tbody>}
            </table>


            {!loading && filteredClients &&
            itemsPerPage < filteredClients.length &&( <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredClients.length}
                onPageChanged={handlePageChange}
            />

            )}
            {loading &&
            <TableLoader/>

            }


        </>
    )
}

export default ClientsPage;