import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from "../components/Pagination";

const StockPage = (props) => {



    const [stock, setStock] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
        axios.get("https://127.0.0.1:8000/api/stocks")
            .then(response => response.data["hydra:member"])
            .then(data => setStock(data))
            .catch(error => console.log(error.response));
    },[])

    console.log(stock);

    const handlePageChange = page => {
        setCurrentPage(page);
    };
    const itemsPerPage = 10;

    const paginatedStock = Pagination.getData(
        stock,
        currentPage,
        itemsPerPage
    );




    return(
        <>
            <h1>Liste des montures en stock</h1>
            <form className="">
                <input className="form-control mr-sm-2" type="text" placeholder="Recherche dans le stock"/>
            </form>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th className="text-center">Magasin</th>
                    <th className="text-center">Marque</th>
                    <th className="text-center">Model</th>
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

                    <td className="text-center align-middle"></td>
                    <td className="text-center align-middle"></td>
                    <td className="text-center align-middle"></td>
                    <td className="text-center align-middle"></td>
                    <td className="text-center align-middle"></td>
                    <td className="text-center align-middle"></td>
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
                length={stock.length}
                onPageChanged={handlePageChange}
            />


        </>
    )
}

export default StockPage;