import React, {useState, useEffect} from 'react';
import Field from "../../components/forms/Field";
import Select from "../../components/forms/Select";
import { Link } from "react-router-dom";
import moment from 'moment';
import ClientsAPI from "../../services/clientsAPI";
import ClientAPI from "../../services/clientAPI";
import CommandeVerresAPI from "../../services/commandeVerresAPI";
import VerresAPI from "../../services/verresAPI";
import {toast} from "react-toastify";
import Textarea from "../../components/forms/Textarea";
import CorrectionAPI from "../../services/correctionAPI";
import axios from "axios";

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
    const [verre, setVerre] = useState([]);
    //infos commande verres
    const [commandeVerres, setCommandeVerres] = useState({
        date: dateFormat(),
        etat: "/api/etat_commandes/1"
    });
    //erreur liste
    const [errors, setErrors] = useState([]);

    const [editing, setEditing ] = useState(false);


    // Récupération de la commande en fonction de son id
    const fetchCommandeVerres = async () =>{
        try{
            //await permet de attendre afin de ne récuperer que les data
            const dataCommandeVerres = await CommandeVerresAPI.find(idCommandeVerres);
            setCommandeVerres({...dataCommandeVerres, ["idVerre"]: dataCommandeVerres.idVerre.id});
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

    console.log(commandeVerres);
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
            setVerre(dataVerres);

        }catch (e) {
            toast.error("Impossible de charger la liste des prescripteurs");
            history.replace("/client/"+idClient);
        }

    }

    // Chargement liste des verres
    useEffect(() =>{
        fetchVerres();

    }, []);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const { name, value } = currentTarget;
        if(name ==="commentaire" || name ==="supp1" || name ==="supp2" || name ==="supp3" || name ==="supp4"){
            setCommandeVerres({...commandeVerres, [name]: value});
        }else{
            setCommandeVerres({...commandeVerres, [name]: parseFloat(value)});
        }
        console.log({...commandeVerres, [name]: value});

    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async event =>{
        //eviter de recharger la page
        event.preventDefault();
        console.log(commandeVerres);
        try{
            setErrors({});
            if(editing){
                await CommandeVerresAPI.update(idCommandeVerres,idClient, commandeVerres);
                toast.success("Commande modifiée avec succès ");
                history.replace("/client/"+idClient);
            }else {
                await CommandeVerresAPI.create(idClient, commandeVerres);
                toast.success("Commande créée avec succès ");
                history.replace("/clients/"+idClient);
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
                                <label><h6>Prix :</h6></label>
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
                                            value={commandeVerres.idVerre && commandeVerres.idVerre}
                                            name="idVerre"
                                            onChange={handleChange}
                                            error={errors.idVerre}
                                        >

                                            {!editing && <option >Selectionner un verres</option>}
                                            {verre.map(v => <option key={v.id} value={v.id}>{v.marque +" - "+v.type}</option>)}
                                        </Select>
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col-md-4">
                                        <h6 className="text-right">Reduction</h6>
                                    </div>
                                    <div className="col-md-8">
                                        <Field
                                            name="reduction"
                                            placeHolder="reduction en %"
                                            value={commandeVerres.reduction}
                                            onChange={handleChange}
                                            error={errors.reduction}
                                        />
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
                                            name="diamD"
                                            placeHolder="DD"
                                            value={commandeVerres.diamD}
                                            onChange={handleChange}
                                            error={errors.diamD}
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col-md-3">
                                        <h6 className="text-right">D-G</h6>
                                    </div>
                                    <div className="col-md-4">
                                        <Field
                                            name="diamG"
                                            placeHolder="DG"
                                            value={commandeVerres.diamG}
                                            onChange={handleChange}
                                            error={errors.diamG}
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col-md-3">
                                        <h6 className="text-right">Sup 1</h6>
                                    </div>
                                    <div className="col-md-9">
                                        <Field
                                            name="supp1"
                                            placeHolder="sup1"
                                            value={commandeVerres.supp1}
                                            onChange={handleChange}
                                            error={errors.supp1}
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col-md-3">
                                        <h6 className="text-right">Sup 2</h6>
                                    </div>
                                    <div className="col-md-9">
                                        <Field
                                            name="supp2"
                                            placeHolder="sup2"
                                            value={commandeVerres.supp2}
                                            onChange={handleChange}
                                            error={errors.supp2}
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col-md-3">
                                        <h6 className="text-right">Sup 3</h6>
                                    </div>
                                    <div className="col-md-9">
                                        <Field
                                            name="supp3"
                                            placeHolder="sup3"
                                            value={commandeVerres.supp3}
                                            onChange={handleChange}
                                            error={errors.supp3}
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col-md-3">
                                        <h6 className="text-right">Sup 4</h6>
                                    </div>
                                    <div className="col-md-9">
                                        <Field
                                            name="supp4"
                                            placeHolder="sup4"
                                            value={commandeVerres.supp4}
                                            onChange={handleChange}
                                            error={errors.supp4}
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
                                    error={errors.prixOD}
                                />
                                <Field
                                    name="prixOG"
                                    placeHolder="prixOG"
                                    value={commandeVerres.prixOG}
                                    onChange={handleChange}
                                    error={errors.prixOG}
                                />
                                <Field
                                    name="prixSupp1"
                                    placeHolder="prixSupp1"
                                    value={commandeVerres.prixSupp1}
                                    onChange={handleChange}
                                    error={errors.prixSupp1}
                                />
                                <Field
                                    name="prixSupp2"
                                    placeHolder="prixSupp2"
                                    value={commandeVerres.prixSupp2}
                                    onChange={handleChange}
                                    error={errors.prixSupp2}
                                />
                                <Field
                                    name="prixSupp3"
                                    placeHolder="prixSupp3"
                                    value={commandeVerres.prixSupp3}
                                    onChange={handleChange}
                                    error={errors.prixSupp3}
                                />
                                <Field
                                    name="prixSupp4"
                                    placeHolder="prixSupp4"
                                    value={commandeVerres.prixSupp4}
                                    onChange={handleChange}
                                    error={errors.prixSupp4}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label><h6>Commentaire : </h6></label>
                                <Textarea
                                    name="commentaire"
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