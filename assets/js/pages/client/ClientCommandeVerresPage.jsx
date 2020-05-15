import React, {useState, useEffect} from 'react';
import Field from "../../components/forms/Field";
import Select from "../../components/forms/Select";
import { Link } from "react-router-dom";
import moment from 'moment';
import ClientsAPI from "../../services/clientsAPI";
import ClientAPI from "../../services/clientAPI";
import VerresAPI from "../../services/verresAPI";
import {toast} from "react-toastify";
import Textarea from "../../components/forms/Textarea";
import CorrectionAPI from "../../services/correctionAPI";

const ClientCommandeVerresPage = ({match, history}) => {

    const moment = require('moment');
    moment().format();

    function dateFormat(date){
        return moment(date).format('YYYY-MM-DD');
    }

    const { idClient , idCommandeVerres ="new"} = match.params;
    //infos client
    const [client, setClient] = useState([]);
    //infos verres
    const [verres, setVerres] = useState([]);
    const [commandeVerres, setCommandeVerres] = useState([]);
    const [errors, setErrors] = useState([]);

    const [editing, setEditing ] = useState(false);


    // Récupération de la commande en fonction de son id
    const fetchCommandeVerres = async idCommandeVerres =>{
        try{
            //await permet de attendre afin de ne récuperer que les data
            const dataCommandeVerres = await ClientAPI.findCommandeVerres(idCommandeVerres);
            setCommandeVerres(dataCommandeVerres);

        }catch (e) {
            console.log(e);
            toast.error("Impossible de charger la commande");
            history.replace("/client/"+idClient);
        }

    }

    // Chargement du client si besoin au chargement du composant ou au chargement de l'id ( à chaque changement de l'id)
    useEffect(() =>{
        if(idCommandeVerres !== "new") {
            setEditing(true);
            fetchCommandeVerres(idCommandeVerres);

        };
    }, [idCommandeVerres]);


    // Récupération du client en fonction de son id
    const fetchClient = async idClient =>{
        try{
            //awit permet de attendre afin de ne récuperer que les data
            const {
                nCli
            } = await ClientsAPI.findID(idClient);

            setClient({
                nCli
            });
        }catch (e) {
            toast.error("Impossible de charger les informations du client");
            history.replace("/clients");
        }
    }


    // Chargement du client si besoin au chargement du composant ou au chargement de l'id ( à chaque changement de l'id)
    useEffect(() =>{
        fetchClient(idClient);

    }, [idClient]);

    // Récupération liste des verres
    const fetchVerres = async () => {
        try{
            //awit permet de attendre afin de ne récuperer que les data
            const dataVerres = await VerresAPI.findAllVerres();
            setVerres(dataVerres);

        }catch (e) {
            toast.error("Impossible de charger la liste des prescripteurs");
            history.replace("/client/"+idClient);
        }

    }
 console.log(verres);
    // Chargement liste des verres
    useEffect(() =>{
        fetchVerres();

    }, []);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) =>{
        const { name, value} = currentTarget;
        setCommandeVerres({...commandeVerres, [name]: value});
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async event =>{
        //eviter de recharger la page
        event.preventDefault();
        try{
            setErrors({});
            if(editing){
                await ClientsAPI.update(idClient, client);
                toast.success("Client modifié avec succès ");
                history.replace("/client/"+idClient);
            }else {
                await ClientsAPI.create(client);
                toast.success("Client créé avec succès ");
                history.replace("/clients");
            }

            // response === error.response
        }catch ({ response }) {

            const { violations } =response.data;

            if(violations){
                const apiErrors = {};
                //pour chaque vioaltion on utilise les propriétés : propertyPath et message
                violations.forEach( ({ propertyPath, message}) =>{
                    apiErrors[propertyPath] = message;
                });

                setErrors(apiErrors);
                toast.error("Il y a une ou pluslieurs erreur(s) dans le formulaire");
            }
        }

    };

    return(
        <>
            <div className="jumbotron">

                {!editing && <h1>Création d'une commande verres pour le client : {client.nCli}</h1> || <h1>Modification commande verres pour le client : {client.nCli}</h1>}

                <form onSubmit={handleSubmit}>
                    <div className="col-md-12">
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
                                        <h6 className="text-right">Verres</h6>
                                    </div>
                                    <div className="col-md-8">
                                        <Select
                                            value={commandeVerres.idVerre && commandeVerres.idVerre.id}
                                            name="idVerres"
                                            onChange={handleChange}
                                            error={errors.idVerres}
                                        >

                                            {!editing && <option >Selectionner un verres</option>}
                                            {verres.map(v => <option key={v.id} value={v.id}>{v.marque +" - "+v.type}</option>)}
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="row justify-content-end">
                                    <div className="col-md-3">
                                        <h6 className="text-right">D-D</h6>
                                    </div>
                                    <div className="col-md-4">
                                        <Field
                                            name="DD"
                                            placeHolder="DD"
                                            value={commandeVerres.diamD}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col-md-3">
                                        <h6 className="text-right">D-G</h6>
                                    </div>
                                    <div className="col-md-4">
                                        <Field
                                            name="DG"
                                            placeHolder="DG"
                                            value={commandeVerres.diamG}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col-md-3">
                                        <h6 className="text-right">Sup 1</h6>
                                    </div>
                                    <div className="col-md-9">
                                        <Field
                                            name="sup1"
                                            placeHolder="sup1"
                                            value={commandeVerres.supp1}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col-md-3">
                                        <h6 className="text-right">Sup 2</h6>
                                    </div>
                                    <div className="col-md-9">
                                        <Field
                                            name="sup2"
                                            placeHolder="sup2"
                                            value={commandeVerres.supp2}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col-md-3">
                                        <h6 className="text-right">Sup 3</h6>
                                    </div>
                                    <div className="col-md-9">
                                        <Field
                                            name="sup3"
                                            placeHolder="sup3"
                                            value={commandeVerres.supp3}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col-md-3">
                                        <h6 className="text-right">Sup 4</h6>
                                    </div>
                                    <div className="col-md-9">
                                        <Field
                                            name="sup4"
                                            placeHolder="sup4"
                                            value={commandeVerres.supp4}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <Field
                                    name="prixOD"
                                    placeHolder="prixOD"
                                    value={commandeVerres.prixOD}
                                    onChange={handleChange}
                                />
                                <Field
                                    name="prixOG"
                                    placeHolder="prixOG"
                                    value={commandeVerres.prixOG}
                                    onChange={handleChange}
                                />
                                <Field
                                    name="prixSup1"
                                    placeHolder="prixSup1"
                                    value={commandeVerres.prixSupp1}
                                    onChange={handleChange}
                                />
                                <Field
                                    name="prixSup2"
                                    placeHolder="prixSup2"
                                    value={commandeVerres.prixSupp2}
                                    onChange={handleChange}
                                />
                                <Field
                                    name="prixSup3"
                                    placeHolder="prixSup3"
                                    value={commandeVerres.prixSupp3}
                                    onChange={handleChange}
                                />
                                <Field
                                    name="prixSup4"
                                    placeHolder="prixSup4"
                                    value={commandeVerres.prixSupp4}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label>Commentaire : </label>
                                <Textarea
                                    name="verresCommentaire"
                                    placeHolder="Commentaire ..."
                                    type="textArea"
                                    value={commandeVerres.commentaire}
                                    onChange={handleChange}
                                    error={errors.commentaire}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success"> Enregistrer </button>
                        <Link to={"/client/"+idClient} className="btn btn-link"> Retour au client</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ClientCommandeVerresPage;