import React, {useState, useEffect} from 'react';
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import axios from "axios";

const ClientInfosPage = (props) => {

    const { id = "new"} = props.match.params;

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

    const fetcgClient = async id =>{
        try{
            //awit permet de attendre afin de ne récuperer que les data
            const data = await axios
                .get("https://127.0.0.1:8000/api/clients/"+id)
                .then(response => response.data);
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
            } = data;

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
            console.log(e.response);
        }

    }


    useEffect(() =>{
        if(id !== "new") {
            setEditing(true);
            fetcgClient(id);

        };
    }, [id]);



    const handleChange = ({currentTarget}) =>{
        const { name, value} = currentTarget;
        if(name ==="codePostale" || name ==="phone" ){
            setClient({...client, [name]: +value});
        }else {
            setClient({...client, [name]: value});
        }


    };

    const handleSubmit = async event =>{
        //eviter de recharger la page
        event.preventDefault();
        try{

            if(editing){
                const response = await axios.put("https://127.0.0.1:8000/api/clients/"+id, client);

            }else {
                const response = await axios.post("https://localhost:8000/api/clients", client);

                props.history.replace("/clients");
            }

            setErrors({});

        }catch (error) {

            if(error.response.data.violations){
                const apiErrors = {};
                error.response.data.violations.forEach( violation =>{
                    apiErrors[violation.propertyPath] = violation.message;
                });
                console.log(apiErrors);
                setErrors(apiErrors);
            }
        }

    };

    return(
        <>
            <div className="jumbotron">

                {!editing && <h1>Création d'un client</h1> || <h1>Modification du client</h1>}

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
                    <Link to="/clients" className="btn btn-link"> Retour à la liste des clients</Link>
                </div>
            </form>
            </div>
        </>
    );
};

export default ClientInfosPage;