import React, {useState, useEffect} from 'react';
import Field from "../../components/forms/Field";
import Select from "../../components/forms/Select";
import { Link } from "react-router-dom";
import moment from 'moment';
import ClientsAPI from "../../services/clientsAPI";
import ClientAPI from "../../services/clientAPI";
import {toast} from "react-toastify";

const ClientInfosPage = ({match, history}) => {

    const moment = require('moment');
    moment().format();

    function dateFormat(date){
        return moment(date).format('YYYY-MM-DD');
    }

    const { id = "new"} = match.params;

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
        corrections:[],
        commandeMontures: [],
        commandeVerres: [],



    });
    const [errors, setErrors] = useState({
        nCli:"",
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
        photo:"",

    });

    const [editing, setEditing ] = useState(false);

    // Récupération du client en fonction de son id
    const fetchClient = async id =>{
        try{
            //awit permet de attendre afin de ne récuperer que les data
            const {
                nCli,
                nom,
                prenom,
                sexe="M",
                dateNaissance,
                rue,
                ville,
                codePostale,
                pays,
                email,
                phone,
                photo
            } = await ClientsAPI.findID(id);

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


    // Chargement du client si besoin au chargement du composant ou au chargement de l'id ( à chaque changement de l'id)
    useEffect(() =>{
        if(id !== "new") {
            setEditing(true);
            fetchClient(id);

        };
    }, [id]);


    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) =>{
        const { name, value} = currentTarget;
        if(name ==="codePostale" || name ==="phone" ){
            setClient({...client, [name]: +value});
        }else {
            setClient({...client, [name]: value});
        }


    };
    console.log(client);

    // Gestion de la soumission du formulaire
    const handleSubmit = async event =>{
        //eviter de recharger la page
        event.preventDefault();
        try{
            setErrors({});
            if(editing){
                await ClientsAPI.update(id, client);
                toast.success("Client modifié avec succès ");
                history.replace("/client/"+id);
            }else {
                await ClientAPI.create(client);
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

                {!editing && <h1>Création d'un client</h1> || <h1>Modification du client : {client.nCli}</h1>}

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            label="Nom de famille"
                            name="nom"
                            placeHolder="Nom de famille du client"
                            value={client.nom}
                            onChange={handleChange}
                            error={errors.nom}
                        />
                        <Field
                            label="Prénom du client"
                            name="prenom"
                            placeHolder="Prénom du client"
                            value={client.prenom}
                            onChange={handleChange}
                            error={errors.prenom}
                        />
                        <Select
                            label="Sexe"
                            name="sexe"
                            value={client.sexe }
                            onChange={handleChange}
                            error={errors.sexe}
                        >
                            {!editing && <option >Selectionner le sexe</option>}
                            <option value="M" > M</option>
                            <option value="F"> F</option>
                        </Select>
                        <Field
                            label="Date de naissance"
                            name="dateNaissance"
                            placeHolder="Date de naissance du client"
                            value={dateFormat(client.dateNaissance)}
                            type="date"
                            onChange={handleChange}
                            error={errors.dateNaissance}
                        />
                        <Field
                            label="Téléphone"
                            name="phone"
                            placeHolder="Téléphone du client"
                            value={client.phone}
                            onChange={handleChange}
                            error={errors.phone}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            label="Rue"
                            name="rue"
                            placeHolder="Rue du client"
                            value={client.rue}
                            onChange={handleChange}
                            error={errors.rue}
                        />
                        <Field
                            label="Ville"
                            name="ville"
                            placeHolder="Ville du client"
                            value={client.ville}
                            onChange={handleChange}
                            error={errors.ville}
                        />
                        <Field
                            label="Code Postale"
                            name="codePostale"
                            placeHolder="Code postale du client"
                            value={client.codePostale}
                            onChange={handleChange}
                            error={errors.codePostale}
                        />
                        <Field
                            label="Pays"
                            name="pays"
                            placeHolder="Pays du client"
                            value={client.pays}
                            onChange={handleChange}
                            error={errors.pays}
                        />
                        <Field
                            label="Email"
                            name="email"
                            placeHolder="Email du client"
                            value={client.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success"> Enregistrer </button>
                    {!editing && <Link to="/clients" className="btn btn-link"> Retour à la liste des clients</Link> ||
                    <Link to={"/client/"+id} className="btn btn-link"> Retour au client</Link>}
                </div>
            </form>
            </div>
        </>
    );
};

export default ClientInfosPage;