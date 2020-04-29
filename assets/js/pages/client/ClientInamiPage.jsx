import React, {useState, useEffect} from 'react';
import Field from "../../components/forms/Field";
import Select from "../../components/forms/Select";
import { Link } from "react-router-dom";
import moment from 'moment';
import ClientAPI from "../../services/clientAPI";
import CorrectionAPI from "../../services/correctionAPI";
import {toast} from "react-toastify";
import Textarea from "../../components/forms/Textarea";

const ClientCorrectionPage = ({match, history}) => {

    const moment = require('moment');
    moment().format();

    function dateFormat(date){
        return moment(date).format('YYYY-MM-DD');
    }

    const { idCorrection = "new", idClient} = match.params;

    const [correction, setCorrection] = useState({
        id:"",
        date:"",
        datePrescription:"",
        commentaire:"",
        idPrescripteur:"",



    });
    const [errors, setErrors] = useState({
        id:"",
        date:"",
        datePrescription:"",
        commentaire:"",
        idPrescripteur:"",

    });

    const [editing, setEditing ] = useState(false);
    //liste des prescripteurs
    const [prescripteurs, setPrescripteurs ] = useState([]);

    // Récupération du client en fonction de son id
    const fetchCorrection = async idCorrection => {
        try{
            //awit permet de attendre afin de ne récuperer que les data
            const dataCorrection = await ClientAPI.find(idCorrection);

            setCorrection(dataCorrection);
            console.log(correction);
        }catch (e) {
            toast.error("Impossible de charger la correction du client");
            history.replace("/client/"+idClient);
        }

    }

    // Récupération liste des prescipteurs
    const fetchPrescripteurs = async idCorrection => {
        try{
            //awit permet de attendre afin de ne récuperer que les data
            const dataPrescripteur = await CorrectionAPI.findAllPrescripteur();
            setPrescripteurs(dataPrescripteur);

        }catch (e) {
            toast.error("Impossible de charger la liste des prescripteurs");
            history.replace("/client/"+idClient);
        }

    }

    // Chargement du client si besoin au chargement du composant ou au chargement de l'id ( à chaque changement de l'id)
    useEffect(() =>{
        if(idCorrection !== "new") {
            setEditing(true);
            fetchCorrection(idCorrection);

        };
    }, [idCorrection]);

    // Chargement de la liste des préscripteurs au chargement
    useEffect(() =>{
        fetchPrescripteurs();
    }, []);


    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) =>{
        const { name, value} = currentTarget;
        if(name ==="commentaire" || name ==="date" || name ==="datePrescription"){
            setCorrection({...correction, [name]: value});
        }else {
            setCorrection({...correction, [name]: +value});
        }


    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async event =>{
        //eviter de recharger la page
        event.preventDefault();
        try{
            setErrors({});
            console.log(correction);
            await ClientAPI.update(idCorrection, corection);


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

                <h1>Document INAMI pour le client :  {idClient}</h1>



                    <div className="form-group">
                        <Link to={"/client/"+idClient} className="btn btn-success"> Imprimer </Link>
                        <Link to={"/client/"+idClient} className="btn btn-link"> Retour au client</Link>
                    </div>

            </div>
        </>
    );
};

export default ClientCorrectionPage;