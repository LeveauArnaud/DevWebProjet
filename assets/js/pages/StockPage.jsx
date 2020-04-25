import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from "../components/Pagination";

const StockPage = (props) => {



    const [stock, setStock] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(()=>{
        axios.get("https://127.0.0.1:8000/api/stocks")
            .then(response => response.data["hydra:member"])
            .then(data => setStock(data))
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

    const filteredStock = stock.filter( s =>
        s.idMagasin.nom.toLowerCase().includes(search.toLowerCase()) ||
        s.idMonture.marque.toLowerCase().includes(search.toLowerCase()) ||
        s.idMonture.model.toLowerCase().includes(search.toLowerCase()) ||
        s.idMonture.couleur.toLowerCase().includes(search.toLowerCase()) ||
        s.idMonture.taille.toLowerCase().includes(search.toLowerCase())
    );

    const itemsPerPage = 10;

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