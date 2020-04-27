import React, {useEffect, useState} from 'react';
import axios from "axios";
import moment from 'moment';
import ClientsAPI from "../services/clientsAPI";

const ClientPage = (props) => {

    const moment = require('moment');
    moment().format();

    const { id = "get"} = props.match.params;

    const [client, setClient] = useState([]);

    const [corrections, setCorrections] = useState([]);
    const [verres, setVerres] = useState([]);
    const [montures, setMontures] = useState([]);

    const [selectedCorrection, setselectedCorrection] = useState([]);
    const [selectedVerre, setselectedVerre] = useState([]);
    const [selectedMonture, setselectedMonture] = useState([]);


    //permet de récupérer les clients
    const fetchClient = async () => {
        try {
            const data = await ClientsAPI.findID(id)
            setClient(data);
            setCorrections(data.corrections);
            setMontures(data.commandeMontures);
            setVerres(data.commandeVerres);
            setselectedCorrection(data.corrections[0]);
            setselectedVerre(data.commandeVerres[0]);
            setselectedMonture(data.commandeMontures[0]);
        } catch (error) {
            console.log(error.response);
        }

    }

    //au chargement du composant on va chercher les clients
    useEffect(()=> {
        fetchClient()
    },[])



    function dateFormat(date){
        return moment(date).format('DD/MM/YYYY');
    }


    function handleChangeCorrection(e) {
        let id = e.target.value;
        corrections.forEach(function(correction) {
            if(correction.id == id){
                setselectedCorrection(correction);
                console.log(correction);
            }
        })
    }
    function handleChangeVerres(e) {
        let id = e.target.value;
        verres.forEach(function(verre) {
            if(verre.id == id){
                setselectedVerre(verre);
                console.log(verre);
            }
        })
    }
    function handleChangeMonture(e) {
        let id = e.target.value;
        montures.forEach(function(monture) {
            if(monture.id == id){
                setselectedMonture(monture);
                console.log(monture);
            }
        })
    }


    return(
        <>
            <h1>Infos Client</h1>
            <div className="row full-height">
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
                                    <input className="form-control" id="clientNom" type="text"
                                           placeholder={client.nom} disabled/>
                                    <label>Prenom: </label>
                                    <input className="form-control" id="clientPrenom" type="text"
                                           placeholder={client.prenom} disabled/>
                                    <label>Sexe :</label>
                                    <input className="form-control" id="clientSes" type="text"
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
                                <a className="btn btn-primary btn-client" href={"/#/client/"+id+"/update"}>Modifier
                                </a>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div className="col-sm-9">
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
                                                <a className="btn btn-primary btn-client" type="button" data-toggle="collapse" data-target="#navbarColor01"
                                                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">Modifier
                                                </a>
                                            </div>
                                            <div className="row p-2">
                                                <a className="btn btn-primary btn-client" type="button" data-toggle="collapse" data-target="#navbarColor01"
                                                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">Nouvelle
                                                </a>
                                            </div>
                                            <div className="row p-2">
                                                <a className="btn btn-primary btn-client" type="button" data-toggle="collapse" data-target="#navbarColor01"
                                                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">Doc INAMI
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
                                                   placeholder={selectedCorrection.idPrescripteur} disabled/>
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
                                                                    <input className="form-control" id="lSphOd" type="text"
                                                                           placeholder="" disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="lCylOd" type="text"
                                                                           placeholder="" disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="lAxOd" type="text"
                                                                           placeholder="" disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="lPdOd" type="text"
                                                                           placeholder="" disabled/>
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
                                                                           placeholder="" disabled/>
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
                                                                           placeholder="" disabled/>
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
                                                                    <input className="form-control" id="pSphOd" type="text"
                                                                           placeholder="" disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="pCylOd" type="text"
                                                                           placeholder="" disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="pAxOd" type="text"
                                                                           placeholder="" disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="pPdOd" type="text"
                                                                           placeholder="" disabled/>
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
                                                                    <input className="form-control" id="lSphOg" type="text"
                                                                           placeholder="" disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="lCylOg" type="text"
                                                                           placeholder="" disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="lAxOg" type="text"
                                                                           placeholder="" disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="lPdOg" type="text"
                                                                           placeholder="" disabled/>
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
                                                                           placeholder="" disabled/>
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
                                                                           placeholder="" disabled/>
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
                                                                    <input className="form-control" id="pSphOg" type="text"
                                                                           placeholder="" disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="pCylOg" type="text"
                                                                           placeholder="" disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="pAxOg" type="text"
                                                                           placeholder="" disabled/>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <input className="form-control" id="pPdOg" type="text"
                                                                           placeholder="" disabled/>
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
                                <div className="col-md-5">
                                    <h1>Espace verres</h1>
                                </div>
                                <div className="col-md-2">
                                    <a className="btn btn-warning btn-client" type="button" data-toggle="collapse" data-target="#navbarColor01"
                                       aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">REMISE
                                    </a>
                                </div>
                                <div className="col-md-5">
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
                                                <option key={verre.id} id={verre.id}> {dateFormat(verre.date)}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 p-5">
                                            <div className="row p-2">
                                                <a className="btn btn-primary btn-client" type="button"
                                                   data-toggle="collapse" data-target="#navbarColor01"
                                                   aria-controls="navbarColor01" aria-expanded="false"
                                                   aria-label="Toggle navigation">Modifier
                                                </a>
                                            </div>
                                            <div className="row p-2">
                                                <a className="btn btn-primary btn-client" type="button"
                                                   data-toggle="collapse" data-target="#navbarColor01"
                                                   aria-controls="navbarColor01" aria-expanded="false"
                                                   aria-label="Toggle navigation">Nouvelle Commande
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
                                        <div className="col-md-5">
                                            <div className="row justify-content-end">
                                                <div className="col-md-4">
                                                    <h6 className="text-right">Marque</h6>
                                                </div>
                                                <div className="col-md-8">
                                                    <input className="form-control" id="marque" type="text"
                                                           placeholder={selectedVerre.marque} disabled/>
                                                </div>
                                            </div>
                                            <div className="row justify-content-end">
                                                <div className="col-md-4">
                                                    <h6 className="text-right">Type</h6>
                                                </div>
                                                <div className="col-md-8">
                                                    <input className="form-control" id="type" type="text"
                                                           placeholder={selectedVerre.type} disabled/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
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
                                                <div className="col-md-3">
                                                    <h6 className="text-right">Sup 1</h6>
                                                </div>
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
                                                <option key={monture.id} id={monture.id}> {dateFormat(monture.date)}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 p-5">
                                            <div className="row p-2">
                                                <button className="btn btn-primary btn-client" type="button"
                                                        data-toggle="collapse" data-target="#navbarColor01"
                                                        aria-controls="navbarColor01" aria-expanded="false"
                                                        aria-label="Toggle navigation">Modifier
                                                </button>
                                            </div>
                                            <div className="row p-2">
                                                <button className="btn btn-primary btn-client" type="button"
                                                        data-toggle="collapse" data-target="#navbarColor01"
                                                        aria-controls="navbarColor01" aria-expanded="false"
                                                        aria-label="Toggle navigation">Nouvelle Commande
                                                </button>
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
                                                           placeholder={selectedMonture.idMonture} disabled/>
                                                </div>
                                                <div className="col-md-2">
                                                    <input className="form-control" id="montureMarque" type="text"
                                                           placeholder={selectedMonture.idMonture} disabled/>
                                                </div>
                                                <div className="col-md-2">
                                                    <input className="form-control" id="montureModel" type="text"
                                                           placeholder={selectedMonture.idMonture} disabled/>
                                                </div>
                                                <div className="col-md-2">
                                                    <input className="form-control" id="montureCouleur" type="text"
                                                           placeholder={selectedMonture.idMonture} disabled/>
                                                </div>
                                                <div className="col-md-2">
                                                    <input className="form-control" id="montureTaille" type="text"
                                                           placeholder={selectedMonture.idMonture} disabled/>
                                                </div>
                                                <div className="col-md-2">
                                                    <input className="form-control" id="monturePrix" type="text"
                                                           placeholder={selectedMonture.idMonture} disabled/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Commentaire : </label>
                                            <textarea className="form-control" id="montureCommentaire" type="text"
                                                      placeholder="" disabled/>
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