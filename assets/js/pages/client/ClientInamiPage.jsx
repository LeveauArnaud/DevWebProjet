import React, {useState, useEffect, useRef} from 'react';
import Field from "../../components/forms/Field";
import Select from "../../components/forms/Select";
import { Link } from "react-router-dom";
import moment from 'moment';
import ClientAPI from "../../services/clientAPI";
import CorrectionAPI from "../../services/correctionAPI";
import {toast} from "react-toastify";
import Textarea from "../../components/forms/Textarea";
import axios from "axios";
import ClientsAPI from "../../services/clientsAPI";
import ReactToPrint from 'react-to-print';
import Inami from "../../components/Inami";





const ClientInamiPage = ({match, history}) => {

    const moment = require('moment');
    moment().format();

    function dateFormat(date){
        return moment(date).format('DD/MM/YYYY');
    }

    const { idCorrection , idClient} = match.params;

    const [client, setClient] = useState({
        nCli:0,
        nom:"",
        prenom:"",
        sexe:"",
        dateNaissance:"",
        rue:"",
        ville:"",
        codePostale:"",
        pays:"",
        email:"",
        phone:"",
        photo:"https://via.placeholder.com/150",



    });

    const [correction, setCorrection] = useState({
        date:dateFormat(),
        datePrescription:"",
        commentaire:"",
        idPrescripteur:"",
        idClient:""

    });
    const [errors, setErrors] = useState({

    });

    const [editing, setEditing ] = useState(false);

    //liste des prescripteurs
    const [prescripteurs, setPrescripteurs ] = useState([]);


    // Récupération du client en fonction de son id
    const fetchClient = async id =>{
        try{
            //awit permet de attendre afin de ne récuperer que les data
            const {
                nCli,
                nom,
                prenom,
                sexe,
                dateNaissance,
                rue,
                ville,
                codePostale,
                pays,
                email,
                phone,
                photo
            } = await ClientsAPI.findID(idClient);

            setClient({
                nCli,
                nom,
                prenom,
                sexe,
                dateNaissance,
                rue,
                ville,
                codePostale,
                pays,
                email,
                phone,
                photo
            });
        }catch (e) {
            toast.error("Impossible de charger les informations du client");
            history.replace("/clients");
        }
    }

    // Récupération de la correction en fonction de son id
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

    // Chargement correction du client si besoin au chargement du composant ou au chargement de l'id ( à chaque changement de l'id)
    useEffect(() =>{
            fetchCorrection(idCorrection);

    }, [idCorrection]);

    // Chargement du client si besoin au chargement du composant ou au chargement de l'id ( à chaque changement de l'id)
    useEffect(() =>{
        fetchClient(idClient);

    }, [idClient]);

    // Chargement de la liste des préscripteurs au chargement
    useEffect(() =>{
        fetchPrescripteurs();
    }, []);


    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const { name, value } = currentTarget;
        /**if(name ==="commentaire" || name ==="date" || name ==="datePrescription" || name ==="idPrescripteur"){
            setCorrection({...correction, [name]: value});
        }else{
            setCorrection({...correction, [name]: +value});
        }*/
        setCorrection({...correction, [name]: value});
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async event =>{
        //eviter de recharger la page
        event.preventDefault();


        try{
            if(editing){
                const response = await  axios.put("https://127.0.0.1:8000/api/corrections/"+idCorrection, {...correction, idPrescripteur:`/api/prescripteurs/${correction.idPrescripteur}`});
                toast.success("Client modifié avec succès ");
                history.replace("/client/"+idClient);
            }else {
                const response = await  axios.post("https://127.0.0.1:8000/api/corrections", {...correction, idClient:`/api/clients/${idClient}`, idPrescripteur:`/api/prescripteurs/${correction.idPrescripteur}`});
                toast.success("Correction ajoutée avec succès au client "+idClient);
                history.replace("/client/"+idClient);
            }


        }catch ({response}) {

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

    const getAge =(date) => {
        let now = moment();
        return now.diff(moment(date),"years");
    }
    //alert(getAge(new Date(1995, 12, 6))); //Date(année, mois, jour)
    const inamiRemb = [];


    return(
        <>
            <div className="jumbotron">

                <h1>Document INAMI pour le client : {idClient}</h1>
                <div className="col-md-12">
                <Inami
                    nom={client.nom +" "+ client.prenom}
                    adresse={client.rue +","+ client.ville +" "+ client.codePostale+" "+ client.pays}
                    dateNaissance={dateFormat(client.dateNaissance)}
                    prescripteur={correction.idPrescripteur.nom}
                    datePresciption={dateFormat(correction.datePrescription)}
                    idClient={idClient}
                    inamiRem={inamiRemb}
                />
                </div>
            </div>
        </>
    );
};

export default ClientInamiPage;