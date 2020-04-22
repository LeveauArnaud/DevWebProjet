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

    return(
        <>
            <h1>Infos Clients</h1>
            <div className="row">
                <div className="col-sm-4">
                    <div className="card text-white bg-danger mb-3">
                        <div className="card-Header">
                            <h1>Espace client</h1>
                        </div>
                        <div className="card-body">
                            <div className="card-Header">

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
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-Header">
                            <h1>Espace correction</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <label htmlFor="exampleSelect1"><h4>Date Correction</h4></label>
                                    <select className="form-control" id="exampleSelect1">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                                <div className="col-md-8">
                                    <label>Prescripteur : </label>
                                    <input className="form-control" id="disabledInput" type="text"
                                           placeholder="" disabled/>
                                    <label>Date prescription : </label>
                                    <input className="form-control" id="disabledInput" type="text"
                                           placeholder="" disabled/>
                                    <label>OD : </label>
                                    <input className="form-control" id="disabledInput" type="text"
                                           placeholder="" disabled/>
                                    <label>OG : </label>
                                    <input className="form-control" id="disabledInput" type="text"
                                           placeholder="" disabled/>
                                    <label>Commentaire : </label>
                                    <input className="form-control" id="disabledInput" type="text"
                                           placeholder="" disabled/>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="card text-white bg-info mb-3">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                    <h1>Espace verres</h1>
                            </li>
                            <li className="nav-item">
                                    <h1>Espace montures</h1>
                            </li>
                        </ul>
                        <div id="myTabContent" className="tab-content">
                            <div className="tab-pane fade active show" id="home">
                                <div className="card-body">
                                    <div className="col-md-4">
                                        <label htmlFor="exampleSelect1"><h4>Date Correction</h4></label>
                                        <select className="form-control" id="exampleSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                    <div className="col-md-8">
                                        <label>Prescripteur : </label>
                                        <input className="form-control" id="disabledInput" type="text"
                                               placeholder="" disabled/>
                                        <label>Date prescription : </label>
                                        <input className="form-control" id="disabledInput" type="text"
                                               placeholder="" disabled/>
                                        <label>OD : </label>
                                        <input className="form-control" id="disabledInput" type="text"
                                               placeholder="" disabled/>
                                        <label>OG : </label>
                                        <input className="form-control" id="disabledInput" type="text"
                                               placeholder="" disabled/>
                                        <label>Commentaire : </label>
                                        <input className="form-control" id="disabledInput" type="text"
                                               placeholder="" disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="profile">
                                <div className="card-body">
                                    <div className="col-md-4">
                                        <label htmlFor="exampleSelect1"><h4>Date Correction</h4></label>
                                        <select className="form-control" id="exampleSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                    <div className="col-md-8">
                                        <label>Prescripteur : </label>
                                        <input className="form-control" id="disabledInput" type="text"
                                               placeholder="" disabled/>
                                        <label>Date prescription : </label>
                                        <input className="form-control" id="disabledInput" type="text"
                                               placeholder="" disabled/>
                                        <label>OD : </label>
                                        <input className="form-control" id="disabledInput" type="text"
                                               placeholder="" disabled/>
                                        <label>OG : </label>
                                        <input className="form-control" id="disabledInput" type="text"
                                               placeholder="" disabled/>
                                        <label>Commentaire : </label>
                                        <input className="form-control" id="disabledInput" type="text"
                                               placeholder="" disabled/>
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