import React, {useState, useEffect} from 'react';
import Field from "../../components/forms/Field";
import Select from "../../components/forms/Select";
import { Link } from "react-router-dom";
import moment from 'moment';
import ClientsAPI from "../../services/clientsAPI";
import CommandeMontureAPI from "../../services/commandeMonturesAPI";
import ClientAPI from "../../services/clientAPI";
import {toast} from "react-toastify";
import Textarea from "../../components/forms/Textarea";
import MonturesAPI from "../../services/monturesAPI";

const ClientCommandeMonturePage = ({match, history}) => {

    const moment = require('moment');
    moment().format();

    function dateFormat(date){
        return moment(date).format('YYYY-MM-DD');
    }

    const { idClient , idCommandeMonture ="new"} = match.params;

    const [client, setClient] = useState([]);
    const [commandeMonture, setCommandeMonture] = useState({
        date: dateFormat(),
        etat: "/api/etat_commandes/1"
    });
    const [montures, setMontures] = useState([]);
    const [montureSelected, setMontureSelected] = useState([]);
    const [errors, setErrors] = useState([]);

    const [editing, setEditing ] = useState(false);

console.log(commandeMonture);
    // Récupération de la commande en fonction de son id
    const fetchCommandeMonture = async idCommandeMonture =>{
        try{
            //await permet de attendre afin de ne récuperer que les data
            const dataCommandeMonture = await ClientAPI.findCommandeMonture(idCommandeMonture);
            setCommandeMonture({...dataCommandeMonture,["idMonture"]: dataCommandeMonture.idMonture.id });
            setMontureSelected(dataCommandeMonture.idMonture);

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
        if(name ==="id" || name ==="prix"){
            setCommandeMonture({...commandeMonture, [name]: parseFloat(value)});
        }else {
            setCommandeMonture({...commandeMonture, [name]: value});
        }
        if (name ==="idMonture"){
            setMontureSelected(montures.map(m => m).filter(m => m.id === parseInt(value))[0]);
            console.log(montures.map(m => m).filter(m => m.id === parseInt(value)));
        }

    };

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
            history.replace("/client/"+idClient);
        }
    }


    // Chargement du client si besoin au chargement du composant ou au chargement de l'id ( à chaque changement de l'id)
    useEffect(() =>{
        fetchClient(idClient);

    }, [idClient]);

    // Récupération liste des montures
    const fetchMontures = async () => {
        try{
            //awit permet de attendre afin de ne récuperer que les data
            const dataMontures = await MonturesAPI.findAll();
            setMontures(dataMontures);

        }catch (e) {
            toast.error("Impossible de charger la liste des montures");
            history.replace("/client/"+idClient);
        }

    }

    // Chargement liste des verres
    useEffect(() =>{
        fetchMontures();

    }, []);

console.log(commandeMonture);
    // Gestion de la soumission du formulaire
    const handleSubmit = async event =>{
        //eviter de recharger la page
        event.preventDefault();
        try{
            setErrors({});
            if(editing){
                await CommandeMontureAPI.update(idClient, commandeMonture);
                toast.success("Commande modifiée avec succès ");
                history.replace("/client/"+idClient);
            }else {
                await CommandeMontureAPI.create(idClient, commandeMonture);
                toast.success("Commande créée avec succès ");
                history.replace("/client/"+idClient);
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
                            <div className="col-md-2"><label><h6>Code : </h6></label></div>
                            <div className="col-md-2"><label><h6>Marque : </h6></label></div>
                            <div className="col-md-2"><label><h6>Model: </h6></label></div>
                            <div className="col-md-2"><label><h6>Couleur: </h6></label></div>
                            <div className="col-md-2"><label><h6>Taille : </h6></label></div>
                            <div className="col-md-2">
                                <label><h6>Prix : </h6></label>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-2">
                                        <Select
                                        value={commandeMonture.idMonture && commandeMonture.idMonture}
                                        name="idMonture"
                                        onChange={handleChange}
                                        error={errors.idMonture}
                                        >

                                        {!editing && <option >Selectionner une monture</option>}
                                        {montures.map(m => <option key={m.id} value={m.id}>{m.id +" - "+m.marque+" - "+m.model+" - "+m.couleur+" - "+m.taille+" - "+m.prix}</option>)}
                                        </Select>
                                    </div>
                                    <div className="col-md-2">
                                        <input className="form-control" id="montureMarque" type="text"
                                               placeholder={commandeMonture.idMonture && montureSelected.marque} disabled/>
                                    </div>
                                    <div className="col-md-2">
                                        <input className="form-control" id="montureModel" type="text"
                                               placeholder={commandeMonture.idMonture && montureSelected.model} disabled/>
                                    </div>
                                    <div className="col-md-2">
                                        <input className="form-control" id="montureCouleur" type="text"
                                               placeholder={commandeMonture.idMonture && montureSelected.couleur} disabled/>
                                    </div>
                                    <div className="col-md-2">
                                        <input className="form-control" id="montureTaille" type="text"
                                               placeholder={commandeMonture.idMonture && montureSelected.taille} disabled/>
                                    </div>
                                    <div className="col-md-2">
                                        <input className="form-control" id="monturePrix" type="text"
                                               placeholder={commandeMonture.idMonture && montureSelected.prix} disabled/>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Textarea
                                    label="Commentaire : "
                                    name="commentaire"
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