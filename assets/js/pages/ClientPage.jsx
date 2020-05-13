import React, {useEffect, useState} from 'react';
import axios from "axios";
import moment from 'moment';
import ClientsAPI from "../services/clientsAPI";
import {toast} from "react-toastify";

const ClientPage = (props) => {

    const moment = require('moment');
    moment().format();

    const { id = "get"} = props.match.params;

    const [client, setClient] = useState([]);

    const [corrections, setCorrections] = useState([]);
    const [verres, setVerres] = useState([]);
    const [montures, setMontures] = useState([]);

    const [selectedCorrection, setSelectedCorrection] = useState([]);
    const [selectedVerre, setSelectedVerre] = useState([]);
    const [selectedMonture, setSelectedMonture] = useState([]);


    //permet de récupérer les clients
    const fetchClient = async () => {
        try {
            const data = await ClientsAPI.findID(id);
            setClient(data);
            setCorrections(data.corrections);
            setMontures(data.commandeMontures);
            setVerres(data.commandeVerres);
            setSelectedCorrection(data.corrections[0]);
            setSelectedVerre(data.commandeVerres[0]);
            setSelectedMonture(data.commandeMontures[0]);
            toast.success("Les informations du client ont bien été chargées");
        } catch (error) {
            console.log(error.response);
            toast.error("Impossible de charger les informations du client");
        }

    }

    console.log(client);




    //au chargement du composant on va chercher les clients
    useEffect(()=> {
        fetchClient()
    },[]);


    function dateFormat(date){
        return moment(date).format('DD/MM/YYYY');
    }


    const handleChangeCorrection = (e) => {
        let id = e.target.value;
        corrections.forEach(function(correction) {
            if(correction.id == id){
                setSelectedCorrection(correction);
            }
        })
    };
    const handleChangeVerres = (e) => {
        let id = e.target.value;
        verres.forEach(function(verre) {
            if(verre.id == id){
                setSelectedVerre(verre);
            }
        })
    };
    const handleChangeMonture = (e) => {
        let id = e.target.value;
        montures.forEach(function(monture) {
            if(monture.id == id){
                setSelectedMonture(monture);
            }
        })
    };

    return(
        <>
            <h1>Infos du client : {client.nCli}</h1>
            <div className="row container-fluid">
                <div className="col-sm-3 container-fluid">
                    <div className="card text-white bg-danger mb-3 container-fluid">
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
                                    <input className="form-control" id="clientNom" type="text"
                                           placeholder={client.nom} disabled/>
                                    <label>Prenom: </label>
                                    <input className="form-control" id="clientPrenom" type="text"
                                           placeholder={client.prenom} disabled/>
                                    <label>Sexe :</label>
                                    <input className="form-control" id="clientSexe" type="text"
                                           placeholder={client.sexe} disabled/>
                                    <label>Date de Naissance:</label>
                                    <input className="form-control" id="clientNaissance" type="text"
                                           placeholder={dateFormat(client.dateNaissance) } disabled/>
                                    <label>Rue: </label>
                                    <input className="form-control" id="clientRue" type="text"
                                           placeholder={client.rue} disabled/>
                                    <label>Ville :</label>
                                    <input className="form-control" id="clientVille" type="text"
                                           placeholder={client.ville} disabled/>
                                    <label>Pays: </label>
                                    <input className="form-control" id="clientPays" type="text"
                                           placeholder={client.pays} disabled/>
                                    <label>Email : </label>
                                    <input className="form-control" id="clientEmail" type="text"
                                           placeholder={client.email} disabled/>
                                    <label>Tel : </label>
                                    <input className="form-control" id="clientPhone" type="text"
                                           placeholder={client.phone} disabled/>
                                </div>
                        </div>
                            </fieldset>
                            <fieldset className="text-center align-middle">
                                <a className="btn btn-primary btn-client" href={"/#/client/"+id+"/infos"}>Modifier
                                </a>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div className="col-sm-9 container-fluid">
                    <div className="card text-white bg-teal mb-3">
                        <div className="card-Header text-center">
                            <h1>Espace correction</h1>
                        </div>
                        <div className="card-body" id="correction">
                            <div className="row">
                                <div className="col-md-2">
                                    <div className="row">
                                    <label htmlFor="exampleSelect1"><h4>Date Correction</h4></label>
                                    <select className="form-control" id="selectCorrection" onChange={handleChangeCorrection}>
                                        {corrections.map(correction =>
                                            <option key={correction.id} id={correction.id} value={correction.id}> {dateFormat(correction.date)}</option>
                                            )}

                                    </select>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 p-5">
                                            <div className="row p-2">
                                                <a className="btn btn-primary btn-client" href={"/#/client/"+id+"/correction/"+selectedCorrection.id}>Modifier
                                                </a>
                                            </div>
                                            <div className="row p-2">
                                                <a className="btn btn-primary btn-client" href={"/#/client/"+id+"/correction/new"}>Nouvelle
                                                </a>
                                            </div>
                                            <div className="row p-2">
                                                <a className="btn btn-primary btn-client" href={"/#/client/"+id+"/correction/"+selectedCorrection.id+"/inami"}>Doc INAMI
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-10">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Prescripteur : </label>
                                            <input className="form-control" id="prescripteur" type="text"
                                                   placeholder={selectedCorrection.idPrescripteur && selectedCorrection.idPrescripteur.nom} disabled/>
                                        </div>

                                        <div className="col-md-6">
                                            <label>Date prescription : </label>
                                            <input className="form-control" id="datePrescription" type="text"
                                                   placeholder={dateFormat(selectedCorrection.datePrescription)} disabled/>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-1">
                                                    <h1>OD</h1>
                                                </div>
                                                <div className="col-md-11">
                                                    <div className="row">
                                                        <div className="col-md-2 ">
                                                            <div className="row justify-content-end">

                                                            </div>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <div className="row justify-content-end">
                                                                <div className="col-md-3">
                                                                    <label>Sph:</label>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label>Cyl:</label>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label>Ax:</label>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label>PD:</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-2 ">
                                                            <div className="row justify-content-end">
                                                                <label>Loin:</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <div className="row justify-content-end">
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="sphOdL" type="text"
                                                                           placeholder={selectedCorrection.sphOdL} disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="cylOdL" type="text"
                                                                           placeholder={selectedCorrection.cylOdL} disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="axOdL" type="text"
                                                                           placeholder={selectedCorrection.axOdL} disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="pdOdL" type="text"
                                                                           placeholder={selectedCorrection.pdOdL} disabled/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row justify-content-end">
                                                        <div className="col-md-2 ">
                                                            <div className="row justify-content-end">

                                                            </div>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <div className="row justify-content-end">
                                                                <div className="col-md-3">
                                                                    <div className="row justify-content-end">
                                                                        <div className="col">
                                                                            <label>Add</label>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="addOd" type="text"
                                                                           placeholder={selectedCorrection.addOd} disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <div className="row justify-content-end">
                                                                        <div className="col">
                                                                            <label>Add-l</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="addLOd" type="text"
                                                                           placeholder={selectedCorrection.addLOd} disabled/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-2 ">
                                                            <div className="row justify-content-end">
                                                                <label>Près</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="sphOdP" type="text"
                                                                           placeholder={selectedCorrection.sphOdP} disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="cylOdP" type="text"
                                                                           placeholder={selectedCorrection.cylOdP} disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="axOdP" type="text"
                                                                           placeholder={selectedCorrection.axOdP} disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="pdOdP" type="text"
                                                                           placeholder={selectedCorrection.pdOdP} disabled/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-1">
                                                    <h1>OG</h1>
                                                </div>
                                                <div className="col-md-11">
                                                    <div className="row">
                                                        <div className="col-md-2 ">
                                                            <div className="row justify-content-end">

                                                            </div>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <div className="row justify-content-end">
                                                                <div className="col-md-3">
                                                                    <label>Sph:</label>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label>Cyl:</label>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label>Ax:</label>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label>PD:</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-2 ">
                                                            <div className="row justify-content-end">
                                                                <label>Loin:</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <div className="row justify-content-end">
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="sphOgL" type="text"
                                                                           placeholder={selectedCorrection.sphOgL} disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="cylOgL" type="text"
                                                                           placeholder={selectedCorrection.cylOgL} disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="axOgL" type="text"
                                                                           placeholder={selectedCorrection.axOgL} disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="pdOgL" type="text"
                                                                           placeholder={selectedCorrection.pdOgL} disabled/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row justify-content-end">
                                                        <div className="col-md-2 ">
                                                            <div className="row justify-content-end">

                                                            </div>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <div className="row justify-content-end">
                                                                <div className="col-md-3">
                                                                    <div className="row justify-content-end">
                                                                        <div className="col">
                                                                            <label>Add</label>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="addOg" type="text"
                                                                           placeholder={selectedCorrection.addOg} disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <div className="row justify-content-end">
                                                                        <div className="col">
                                                                            <label>Add-l</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="addLOg" type="text"
                                                                           placeholder={selectedCorrection.addLOg} disabled/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-2 ">
                                                            <div className="row justify-content-end">
                                                                <label>Près</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="sphOgP" type="text"
                                                                           placeholder={selectedCorrection.sphOgP} disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="cylOgP" type="text"
                                                                           placeholder={selectedCorrection.cylOgP} disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="axOgP" type="text"
                                                                           placeholder={selectedCorrection.axOgP} disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="pdOgP" type="text"
                                                                           placeholder={selectedCorrection.pdOgP} disabled/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                        <label>Commentaire : </label>
                                        <textarea className="form-control" id="correctionCommentaire" type="text"
                                               placeholder={selectedCorrection.commentaire}disabled/>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="card text-white bg-darkSalmon mb-3">
                        <div className="card-Header text-center">
                            <div className="row">
                                <div className="col-md-6">
                                    <h1>Espace verres</h1>
                                </div>
                                <div className="col-md-6">
                                    <h1>Espace monture</h1>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row" id="verres">
                                <div className="col-md-2">
                                    <div className="row">
                                        <label htmlFor="exampleSelect1"><h4>Date Commande</h4></label>
                                        <select className="form-control" id="SelectDateCommandeVerres" onChange={handleChangeVerres}>
                                            {verres.map(verre =>
                                                <option key={verre.id} id={verre.id} value={verre.id}> {dateFormat(verre.date)}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 p-5">
                                            <div className="row p-2">
                                                <a className="btn btn-primary btn-client" href={"/#/client/"+id+"/commandeVerres/"+selectedVerre.id}>Modifier
                                                </a>
                                            </div>
                                            <div className="row p-2">
                                                <a className="btn btn-primary btn-client" href={"/#/client/"+id+"/commandeVerres/new"}>Nouvelle
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-10">
                                <div className="row">
                                    <div className="col-md-5"></div>
                                    <div className="col-md-5"></div>
                                    <div className="col-md-2">
                                        <label>Prix : </label>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="row justify-content-end">
                                            <div className="col-md-4">
                                                <h6 className="text-right">Marque</h6>
                                            </div>
                                            <div className="col-md-8">
                                                <input className="form-control" id="marque" type="text"
                                                       placeholder={selectedVerre.idVerre && selectedVerre.idVerre.marque} disabled/>
                                            </div>
                                        </div>
                                        <div className="row justify-content-end">
                                            <div className="col-md-4">
                                                <h6 className="text-right">Type</h6>
                                            </div>
                                            <div className="col-md-8">
                                                <input className="form-control" id="type" type="text"
                                                       placeholder={selectedVerre.idVerre && selectedVerre.idVerre.type} disabled/>
                                            </div>
                                        </div>
                                        <div className="row justify-content-end">
                                            <div className="col-md-4">
                                                <h6 className="text-right">Sup 1</h6>
                                            </div>
                                        </div>
                                        <div className="row justify-content-end">
                                            <div className="col-md-4">
                                                <h6 className="text-right">Sup 2</h6>
                                            </div>
                                        </div>
                                        <div className="row justify-content-end">
                                            <div className="col-md-4">
                                                <h6 className="text-right">Sup 3</h6>
                                            </div>
                                        </div>
                                        <div className="row justify-content-end">
                                            <div className="col-md-4">
                                                <h6 className="text-right">Sup 4</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row justify-content-end">
                                            <div className="col-md-3">
                                                <h6 className="text-right">D-D</h6>
                                            </div>
                                            <div className="col-md-4">
                                                <input className="form-control" id="DD" type="text"
                                                       placeholder={selectedVerre.diamD} disabled/>
                                            </div>
                                        </div>
                                        <div className="row justify-content-end">
                                            <div className="col-md-3">
                                                <h6 className="text-right">D-G</h6>
                                            </div>
                                            <div className="col-md-4">
                                                <input className="form-control" id="DG" type="text"
                                                       placeholder={selectedVerre.diamG} disabled/>
                                            </div>
                                        </div>
                                        <div className="row justify-content-end">
                                            <div className="col-md-9">
                                                <input className="form-control" id="sup1" type="text"
                                                       placeholder={selectedVerre.supp1} disabled/>
                                            </div>
                                        </div>
                                        <div className="row justify-content-end">
                                            <div className="col-md-3">
                                                <h6 className="text-right">Sup 2</h6>
                                            </div>
                                            <div className="col-md-9">
                                                <input className="form-control" id="sup2" type="text"
                                                       placeholder={selectedVerre.supp2} disabled/>
                                            </div>
                                        </div>
                                        <div className="row justify-content-end">
                                            <div className="col-md-3">
                                                <h6 className="text-right">Sup 3</h6>
                                            </div>
                                            <div className="col-md-9">
                                                <input className="form-control" id="sup3" type="text"
                                                       placeholder={selectedVerre.supp3} disabled/>
                                            </div>
                                        </div>
                                        <div className="row justify-content-end">
                                            <div className="col-md-3">
                                                <h6 className="text-right">Sup 4</h6>
                                            </div>
                                            <div className="col-md-9">
                                                <input className="form-control" id="sup4" type="text"
                                                       placeholder={selectedVerre.supp4} disabled/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <input className="form-control" id="prixDD" type="text"
                                               placeholder={selectedVerre.prixOD+" €"} disabled/>
                                        <input className="form-control" id="prixDG" type="text"
                                               placeholder={selectedVerre.prixOG+" €"} disabled/>
                                        <input className="form-control" id="prixSup1" type="text"
                                               placeholder={selectedVerre.prixSupp1+" €"} disabled/>
                                        <input className="form-control" id="prixSup2" type="text"
                                               placeholder={selectedVerre.prixSupp2+" €"} disabled/>
                                        <input className="form-control" id="prixSup3" type="text"
                                               placeholder={selectedVerre.prixSupp3+" €"} disabled/>
                                        <input className="form-control" id="prixSup4" type="text"
                                               placeholder={selectedVerre.prixSupp4+" €"} disabled/>
                                    </div>
                                    <div className="col-md-2">
                                        <input className="form-control" id="reducPrixDD" type="text"
                                               placeholder={selectedVerre.prixOD+" €"} disabled/>
                                        <input className="form-control" id="reducPrixDG" type="text"
                                               placeholder={selectedVerre.prixOG+" €"} disabled/>
                                        <input className="form-control" id="reducPrixSup1" type="text"
                                               placeholder={selectedVerre.prixSupp1+" €"} disabled/>
                                        <input className="form-control" id="reducPrixSup2" type="text"
                                               placeholder={selectedVerre.prixSupp2+" €"} disabled/>
                                        <input className="form-control" id="reducPrixSup3" type="text"
                                               placeholder={selectedVerre.prixSupp3+" €"} disabled/>
                                        <input className="form-control" id="reducPrixSup4" type="text"
                                               placeholder={selectedVerre.prixSupp4+" €"} disabled/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Commentaire : </label>
                                        <textarea className="form-control" id="verresCommentaire" type="text"
                                                  placeholder={selectedVerre.commentaire} disabled/>
                                    </div>
                                </div>
                            </div>

                            </div>
                            <div className="row align-items-center" id="montures">
                                <div className="col-md-2">
                                    <div className="row">
                                        <label htmlFor="exampleSelect1"><h4>Date Commande</h4></label>
                                        <select className="form-control" id="SelectDateCommandeMonture" onChange={handleChangeMonture}>
                                            {montures.map(monture =>
                                                <option key={monture.id} value={monture.id} id={monture.id}> {dateFormat(monture.date)}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 p-5">
                                            <div className="row p-2">
                                                <a className="btn btn-primary btn-client" href={"/#/client/"+id+"/commandeMonture/"+selectedVerre.id}>Modifier
                                                </a>
                                            </div>
                                            <div className="row p-2">
                                                <a className="btn btn-primary btn-client" href={"/#/client/"+id+"/commandeMonture/new"}>Nouvelle
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-10">
                                    <div className="row">
                                        <div className="col-md-2"><label>Code : </label></div>
                                        <div className="col-md-2"><label>Marque : </label></div>
                                        <div className="col-md-2"><label>Model: </label></div>
                                        <div className="col-md-2"><label>Couleur: </label></div>
                                        <div className="col-md-2"><label>Taille : </label></div>
                                        <div className="col-md-2">
                                            <label>Prix : </label>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <input className="form-control" id="montureCode" type="text"
                                                           placeholder={selectedMonture.idMonture && selectedMonture.idMonture.id} disabled/>
                                                </div>
                                                <div className="col-md-2">
                                                    <input className="form-control" id="montureMarque" type="text"
                                                           placeholder={selectedMonture.idMonture && selectedMonture.idMonture.marque} disabled/>
                                                </div>
                                                <div className="col-md-2">
                                                    <input className="form-control" id="montureModel" type="text"
                                                           placeholder={selectedMonture.idMonture && selectedMonture.idMonture.model} disabled/>
                                                </div>
                                                <div className="col-md-2">
                                                    <input className="form-control" id="montureCouleur" type="text"
                                                           placeholder={selectedMonture.idMonture && selectedMonture.idMonture.couleur} disabled/>
                                                </div>
                                                <div className="col-md-2">
                                                    <input className="form-control" id="montureTaille" type="text"
                                                           placeholder={selectedMonture.idMonture && selectedMonture.idMonture.taille} disabled/>
                                                </div>
                                                <div className="col-md-2">
                                                    <input className="form-control" id="monturePrix" type="text"
                                                           placeholder={selectedMonture.idMonture && selectedMonture.idMonture.prix} disabled/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Commentaire : </label>
                                            <textarea className="form-control" id="montureCommentaire" type="text"
                                                      placeholder={selectedMonture.commentaire} disabled/>
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