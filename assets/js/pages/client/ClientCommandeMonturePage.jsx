import React, {useState, useEffect} from 'react';
import Field from "../../components/forms/Field";
import Select from "../../components/forms/Select";
import { Link } from "react-router-dom";
import moment from 'moment';
import ClientsAPI from "../../services/clientsAPI";
import ClientAPI from "../../services/clientAPI";
import {toast} from "react-toastify";
import Textarea from "../../components/forms/Textarea";

const ClientCommandeMonturePage = ({match, history}) => {

    const moment = require('moment');
    moment().format();

    function dateFormat(date){
        return moment(date).format('YYYY-MM-DD');
    }

    const { idClient , idCommandeMonture ="new"} = match.params;

    const [client, setClient] = useState([]);
    const [commandeMonture, setCommandeMonture] = useState([]);
    const [errors, setErrors] = useState([]);

    const [editing, setEditing ] = useState(false);


    // Récupération de la commande en fonction de son id
    const fetchCommandeMonture = async idCommandeMonture =>{
        try{
            //await permet de attendre afin de ne récuperer que les data
            const dataCommandeMonture = await ClientAPI.findCommandeMonture(idCommandeMonture);
            setCommandeMonture(dataCommandeMonture);

        }catch (e) {
            console.log(e);
            toast.error("Impossible de charger la commande");
            history.replace("/client/"+idClient);
        }

    }

    // Chargement du client si besoin au chargement du composant ou au chargement de l'id ( à chaque changement de l'id)
    useEffect(() =>{
        if(idCommandeMonture !== "new") {
            setEditing(true);
            fetchCommandeMonture(idCommandeMonture);
        };
    }, [idCommandeMonture]);


    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) =>{
        const { name, value} = currentTarget;
        if(name ==="codePostale" || name ==="phone" ){
            setClient({...client, [name]: +value});
        }else {
            setClient({...client, [name]: value});
        }


    };
console.log(commandeMonture);
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

                {!editing && <h1>Création d'une commande monture pour le client : {client.nCli}</h1> || <h1>Modification commande monture pour le client : {client.nCli}</h1>}

                <form onSubmit={handleSubmit}>
                    <div className="col-md-12">
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
                                        <Field
                                            name="montureCode"
                                            placeHolder="Code..."
                                            value={commandeMonture.idMonture && commandeMonture.idMonture.id}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <Field
                                            name="montureMarque"
                                            placeHolder="Marque..."
                                            value={commandeMonture.idMonture && commandeMonture.idMonture.marque}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <Field
                                            name="montureModel"
                                            placeHolder="Model..."
                                            value={commandeMonture.idMonture && commandeMonture.idMonture.model}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <Field
                                            name="montureCouleur"
                                            placeHolder="Couleur..."
                                            value={commandeMonture.idMonture && commandeMonture.idMonture.couleur}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <Field
                                            name="montureTaille"
                                            placeHolder="Taille..."
                                            value={commandeMonture.idMonture && commandeMonture.idMonture.taille}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <Field
                                            name="monturePrix"
                                            placeHolder="Prix..."
                                            value={commandeMonture.prix}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label>Commentaire : </label>
                                <Textarea
                                    name="montureCommentaire"
                                    placeHolder="Commentaire ..."
                                    type="textArea"
                                    value={commandeMonture.commentaire}
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

export default ClientCommandeMonturePage;