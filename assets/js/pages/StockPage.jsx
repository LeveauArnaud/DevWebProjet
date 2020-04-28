import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import StockAPI from "../services/stockAPI";
import {toast} from "react-toastify";

const StockPage = (props) => {



    const [stock, setStock] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    // nbr items par page
    const itemsPerPage = 10;

    //permet de récupérer les montures en stock
    const fetchStock = async () => {
        try {
            const data = await StockAPI.findAll()
            setStock(data);
        } catch (error) {
            console.log(error.response);
            toast.error("Impossible de charger le stock");
        }

    }

    //au chargement du composant on va chercher les montures en stock
    useEffect(()=> {
        fetchStock()
    },[])

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
    const filteredStock = stock.filter( s =>
        s.idMagasin.nom.toLowerCase().includes(search.toLowerCase()) ||
        s.idMonture.marque.toLowerCase().includes(search.toLowerCase()) ||
        s.idMonture.model.toLowerCase().includes(search.toLowerCase()) ||
        s.idMonture.couleur.toLowerCase().includes(search.toLowerCase()) ||
        s.idMonture.taille.toLowerCase().includes(search.toLowerCase())
    );

    // pagination des données
    const paginatedStock = Pagination.getData(
        filteredStock,
        currentPage,
        itemsPerPage
    );




    return(
        <>
            <h1>Liste des montures en stock</h1>
            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher ..." />
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th className="text-center">Magasin</th>
                    <th className="text-center">Marque</th>
                    <th className="text-center">Modèle</th>
                    <th className="text-center">Couleur</th>
                    <th className="text-center">Taille</th>
                    <th className="text-center">Prix</th>
                    <th className="text-center">Quantité</th>
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
                {paginatedStock.map(stockItems => <tr key={stockItems.id} >

                    <td className="text-center align-middle">{stockItems.idMagasin.nom}</td>
                    <td className="text-center align-middle">{stockItems.idMonture.marque}</td>
                    <td className="text-center align-middle">{stockItems.idMonture.model}</td>
                    <td className="text-center align-middle">{stockItems.idMonture.couleur}</td>
                    <td className="text-center align-middle">{stockItems.idMonture.taille}</td>
                    <td className="text-center align-middle">{stockItems.idMonture.prix} € </td>
                        <td className="text-center align-middle"><span className="badge badge-info">{stockItems.quantite}</span></td>
                    <td className="text-center align-middle">
                        <a
                            href="#"
                            className="btn btn-sm btn-success"
                        >
                            Modifier
                        </a>
                    </td>
                </tr>
                )}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredStock.length}
                onPageChanged={handlePageChange}
            />


        </>
    )
}

export default StockPage;