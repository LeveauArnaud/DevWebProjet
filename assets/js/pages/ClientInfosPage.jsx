import React, {useState} from 'react';
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import axios from "axios";

const ClientInfosPage = (props) => {

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
        phone:0,
        photo:"https://via.placeholder.com/150",
        corrections:[],
        commandeMontures: [],
        commandeVerres: [],



    });
    const [errors, setErrors] = useState({
        lastname:"",
        firstname:"",
        sexe:"",
        birth:"",
        street:"",
        city:"",
        country:"",
        email:"",
        phone:""

    });

    const handleChange = ({currentTarget}) =>{
        const { name, value} = currentTarget;
        if(name ==="codePostale" || name ==="phone" ){
            setClient({...client, [name]: parseInt(value)});
        }else {
            setClient({...client, [name]: value});
        }


    };

    const handleSubmit = async event =>{
        //eviter de recharger la page
        event.preventDefault();
        console.log(client.codePostale);
        try{

            const response = await axios.post("https://localhost:8000/api/clients", client);
            console.log(response.data);
        }catch (error) {
            console.log(error.response);
        }

        console.log(client);
    };

    return(
        <>
            <div className="jumbotron">
            <h1>Création d'un client</h1>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            label="Nom de famille"
                            name="nom"
                            placeHolder="Nom de famille du client"
                            value={client.nom}
                            onChange={handleChange}
                            error={errors.lastname}
                        />
                        <Field
                            label="Prénom du client"
                            name="prenom"
                            placeHolder="Prénom du client"
                            value={client.prenom}
                            onChange={handleChange}
                            error={errors.firstname}
                        />
                        <Field
                            label="Sexe"
                            name="sexe"
                            placeHolder="Sexe du client"
                            value={client.sexe}
                            onChange={handleChange}
                            error={errors.sexe}
                        />
                        <Field
                            label="Date de naissance"
                            name="dateNaissance"
                            placeHolder="Date de naissance du client"
                            value={client.dateNaissance}
                            type="date"
                            onChange={handleChange}
                            error={errors.birth}
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
                            error={errors.street}
                        />
                        <Field
                            label="Ville"
                            name="ville"
                            placeHolder="Ville du client"
                            value={client.ville}
                            onChange={handleChange}
                            error={errors.city}
                        />
                        <Field
                            label="Code Postale"
                            name="codePostale"
                            placeHolder="Code postale du client"
                            value={client.codePostale}
                            onChange={handleChange}
                        />
                        <Field
                            label="Pays"
                            name="pays"
                            placeHolder="Pays du client"
                            value={client.pays}
                            onChange={handleChange}
                            error={errors.country}
                        />
                        <Field
                            label="Email"
                            name="email"
                            placeHolder="Email du client"
                            type="email"
                            value={client.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success"> Enregistrer </button>
                    <Link to="/clients" className="btn btn-link"> Retour à la liste des clients</Link>
                </div>
            </form>
            </div>
        </>
    );
};

export default ClientInfosPage;