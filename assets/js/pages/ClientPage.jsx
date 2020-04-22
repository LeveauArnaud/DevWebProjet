import React, {useEffect, useState} from 'react';
import axios from "axios";

const ClientPage = (props) => {

    const { id = "get"} = props.match.params;

    const [client, setClient] = useState([]);
    useEffect(()=>{
        axios.get("https://127.0.0.1:8000/api/clients/"+id)
            .then(response => response.data)
            .then(data => setClient(data))
            .catch(error => console.log(error.response));

    },[])

    const clientCorrections=client.corrections ;

    console.log(clientCorrections);

    function showCommandeContent() {
        console.log("ok");
    }

    const [showCommandes, setShowCommandes] = useState([0]);


    return(
        <>
            <h1>Infos Client</h1>
            <div className="row">
                <div className="col-sm-3 ">
                    <div className="card text-white bg-danger mb-3">
                        <div className="card-Header text-center">
                            <h1>Espace client</h1>
                        </div>
                        <form>
                            <fieldset>
                        <div className="card-body">
                            <div className="card-Header text-center">
                                <img src={client.photo} alt="photo du client" className=""/>
                            </div>
                                <div className="card-body">
                                    <label>Nom: </label>
                                    <input className="form-control" id="disabledInput" type="text"
                                           placeholder={client.nom} disabled/>
                                    <label>Prenom: </label>
                                    <input className="form-control" id="disabledInput" type="text"
                                           placeholder={client.prenom} disabled/>
                                    <label>Sexe :</label>
                                    <input className="form-control" id="disabledInput" type="text"
                                           placeholder={client.sexe} disabled/>
                                    <label>Date de Naissance:</label>
                                    <input className="form-control" id="disabledInput" type="text"
                                           placeholder={client.dateNaissance } disabled/>
                                    <label>Rue: </label>
                                    <input className="form-control" id="disabledInput" type="text"
                                           placeholder={client.rue} disabled/>
                                    <label>Ville :</label>
                                    <input className="form-control" id="disabledInput" type="text"
                                           placeholder={client.ville} disabled/>
                                    <label>Pays: </label>
                                    <input className="form-control" id="disabledInput" type="text"
                                           placeholder={client.pays} disabled/>
                                    <label>Email : </label>
                                    <input className="form-control" id="disabledInput" type="text"
                                           placeholder={client.email} disabled/>
                                    <label>Tel : </label>
                                    <input className="form-control" id="disabledInput" type="text"
                                           placeholder={client.phone} disabled/>
                                </div>
                        </div>
                            </fieldset>
                            <fieldset className="text-center align-middle">
                                <a className="btn btn-primary " href={"/#/client/"+id+"/update"}>Modifier
                                </a>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-Header text-center">
                            <h1>Espace correction</h1>
                        </div>
                        <div className="card-body" id="verres">
                            <div className="row">
                                <div className="col-md-2">
                                    <div className="row">
                                    <label htmlFor="exampleSelect1"><h4>Date Correction</h4></label>
                                    <select className="form-control" id="exampleSelect1">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 p-5">
                                            <div className="row p-2">
                                                <button className="btn btn-primary " type="button" data-toggle="collapse" data-target="#navbarColor01"
                                                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">Modifier
                                                </button>
                                            </div>
                                            <div className="row p-2">
                                                <button className="btn btn-primary " type="button" data-toggle="collapse" data-target="#navbarColor01"
                                                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">Nouvelle
                                                </button>
                                            </div>
                                            <div className="row p-2">
                                                <button className="btn btn-primary " type="button" data-toggle="collapse" data-target="#navbarColor01"
                                                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">Doc INAMI
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-10">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Prescripteur : </label>
                                            <input className="form-control" id="disabledInput" type="text"
                                                   placeholder="" disabled/>
                                        </div>

                                        <div className="col-md-6">
                                            <label>Date prescription : </label>
                                            <input className="form-control" id="disabledInput" type="text"
                                                   placeholder="" disabled/>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-12" >
                                        <label>OD : </label>
                                        <input className="form-control" id="disabledInput" type="text"
                                               placeholder="" disabled/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                        <label>OG : </label>
                                        <input className="form-control" id="disabledInput" type="text"
                                               placeholder="" disabled/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                        <label>Commentaire : </label>
                                        <textarea className="form-control" id="disabledInput" type="text"
                                               placeholder="" disabled/>
                                        </div>
                                    </div>



                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="card text-white bg-info mb-3">
                        <div className="card-Header text-center">
                            <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
                                <div className="row collapse navbar-collapse" id="navbarColor01">
                                    <ul className="col-md-12 navbar-nav justify-content-center">
                                        <div className="col-md-6 nav-item active">
                                            <a className="nav-link" href={"#/client/"+id} onClick={showCommandeContent}><h1>Espace verres <span className="sr-only">(current)</span></h1></a>
                                        </div>
                                        <div className="col-md-6 nav-item">
                                            <a className="nav-link" href={"#/client/"+id}><h1>Espace montures</h1></a>
                                        </div>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                        <div>
                            <div className="card-body">
                                <div className="row" id="verres">
                                    <div className="col-md-2">
                                        <div className="row">
                                            <label htmlFor="exampleSelect1"><h4>Date Commande</h4></label>
                                            <select className="form-control" id="exampleSelect1">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 p-5">
                                                <div className="row p-2">
                                                    <button className="btn btn-primary btn-client" type="button" data-toggle="collapse" data-target="#navbarColor01"
                                                            aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">Modifier
                                                    </button>
                                                </div>
                                                <div className="row p-2">
                                                    <button className="btn btn-primary btn-client" type="button" data-toggle="collapse" data-target="#navbarColor01"
                                                            aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">Nouvelle Commande
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-10">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Prescripteur : </label>
                                                <input className="form-control" id="disabledInput" type="text"
                                                       placeholder="" disabled/>
                                            </div>

                                            <div className="col-md-6">
                                                <label>Date prescription : </label>
                                                <input className="form-control" id="disabledInput" type="text"
                                                       placeholder="" disabled/>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-md-12" >
                                                <label>OD : </label>
                                                <input className="form-control" id="disabledInput" type="text"
                                                       placeholder="" disabled/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label>OG : </label>
                                                <input className="form-control" id="disabledInput" type="text"
                                                       placeholder="" disabled/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label>Commentaire : </label>
                                                <textarea className="form-control" id="disabledInput" type="text"
                                                          placeholder="" disabled/>
                                            </div>
                                        </div>



                                    </div>

                                </div>
                                <div className="row" id="montures">
                                    <div className="col-md-2">
                                        <div className="row">
                                            <label htmlFor="exampleSelect1"><h4>Date Commande</h4></label>
                                            <select className="form-control" id="exampleSelect1">
                                                <option>11/02/2020</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 p-5">
                                                <div className="row p-2">
                                                    <button className="btn btn-primary btn-client" type="button" data-toggle="collapse" data-target="#navbarColor01"
                                                            aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">Modifier
                                                    </button>
                                                </div>
                                                <div className="row p-2">
                                                    <button className="btn btn-primary btn-client" type="button" data-toggle="collapse" data-target="#navbarColor01"
                                                            aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">Nouvelle Commande
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-10">
                                        <div className="row">
                                            <div className="col-md-10" >
                                                <label>Code : </label>
                                                <input className="form-control" id="disabledInput" type="text"
                                                       placeholder="" disabled/>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Code</th>
                                                            <th>Marque</th>
                                                            <th>Model</th>
                                                            <th>Couleur</th>
                                                            <th>Taille</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="col-md-2" >
                                                <label>Prix : </label>
                                                <input className="form-control" id="disabledInput" type="text"
                                                       placeholder="" disabled/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label>Commentaire : </label>
                                                <textarea className="form-control" id="disabledInput" type="text"
                                                          placeholder="" disabled/>
                                            </div>
                                        </div>



                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ClientPage;