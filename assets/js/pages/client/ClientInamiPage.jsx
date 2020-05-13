import React, {useState, useEffect} from 'react';
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

    return(
        <>
            <div className="jumbotron">

                <h1>Document INAMI pour le client : {idClient}</h1>

                <form onSubmit={handleSubmit}>



                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-6">
                                <Select
                                    label="Prescripteur"
                                    name="idPrescripteur"
                                    onChange={handleChange}
                                    error={errors.idPrescripteur}
                                >
                                    <option value={correction.idPrescripteur.id}>{correction.idPrescripteur.nom}</option>
                                    {prescripteurs.map(p => <option key={p.id} value={p.id}>{p.nom}</option>)}
                                </Select>
                            </div>

                            <div className="col-md-6">
                                <Field
                                    label="Date prescription"
                                    name="datePrescription"
                                    placeHolder="datePrescription"
                                    value={dateFormat(correction.datePrescription)}
                                    type="date"
                                    onChange={handleChange}
                                />
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
                                                        <Field
                                                            name="sphOdL"
                                                            value={correction.sphOdL}
                                                            onChange={handleChange}
                                                            error={errors.sphOdL}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="cylOdL"
                                                            value={correction.cylOdL}
                                                            onChange={handleChange}
                                                            error={errors.cylOdL}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="axOdL"
                                                            value={correction.axOdL}
                                                            onChange={handleChange}
                                                            error={errors.axOdL}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="pdOdL"
                                                            value={correction.pdOdL}
                                                            onChange={handleChange}
                                                            error={errors.pdOdL}
                                                        />
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
                                                        <Field
                                                            name="addOd"
                                                            value={correction.addOd}
                                                            onChange={handleChange}
                                                            error={errors.addOd}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="row justify-content-end">
                                                            <div className="col">
                                                                <label>Add-l</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="addLOd"
                                                            value={correction.addLOd}
                                                            onChange={handleChange}
                                                            error={errors.addLOd}
                                                        />
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
                                                        <Field
                                                            name="sphOdP"
                                                            value={correction.sphOdP}
                                                            onChange={handleChange}
                                                            error={errors.sphOdP}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="cylOdP"
                                                            value={correction.cylOdP}
                                                            onChange={handleChange}
                                                            error={errors.cylOdP}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="axOdP"
                                                            value={correction.axOdP}
                                                            onChange={handleChange}
                                                            error={errors.axOdP}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="pdOdP"
                                                            value={correction.pdOdP}
                                                            onChange={handleChange}
                                                            error={errors.pdOdP}
                                                        />
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
                                        <h1>OG</h1>
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
                                                        <Field
                                                            name="sphOgL"
                                                            value={correction.sphOgL}
                                                            onChange={handleChange}
                                                            error={errors.sphOgL}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="cylOgL"
                                                            value={correction.cylOgL}
                                                            onChange={handleChange}
                                                            error={errors.cylOgL}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="axOgL"
                                                            value={correction.axOgL}
                                                            onChange={handleChange}
                                                            error={errors.axOgL}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="pdOgL"
                                                            value={correction.pdOgL}
                                                            onChange={handleChange}
                                                            error={errors.pdOgL}
                                                        />
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
                                                        <Field
                                                            name="addOg"
                                                            value={correction.addOg}
                                                            onChange={handleChange}
                                                            error={errors.addOg}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="row justify-content-end">
                                                            <div className="col">
                                                                <label>Add-l</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="addLOg"
                                                            value={correction.addLOg}
                                                            onChange={handleChange}
                                                            error={errors.addLOg}
                                                        />
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
                                                        <Field
                                                            name="sphOgP"
                                                            value={correction.sphOgP}
                                                            onChange={handleChange}
                                                            error={errors.sphOgP}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="cylOgP"
                                                            value={correction.cylOgP}
                                                            onChange={handleChange}
                                                            error={errors.cylOgP}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="axOgP"
                                                            value={correction.axOgP}
                                                            onChange={handleChange}
                                                            error={errors.axOgP}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="pdOgP"
                                                            value={correction.pdOgP}
                                                            onChange={handleChange}
                                                            error={errors.pdOgP}
                                                        />
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
                                <Textarea
                                    label="Commentaire"
                                    name="commentaire"
                                    placeHolder="Commentaire ..."
                                    type="textArea"
                                    value={correction.commentaire}
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
                <div>
                    <h1>Document</h1>
                    <p>Client :</p>
                    <p>{client.nom +" "+ client.prenom}</p>
                    <p>{dateFormat(client.dateNaissance)}</p>
                    <p>age : {getAge(client.dateNaissance)}</p>
                    <p>{client.rue +","+ client.ville +" "+ client.codePostale+" "+ client.pays}</p>
                    <p>Prescripteur :</p>
                    <p>{correction.idPrescripteur.nom}</p>
                    <p>{dateFormat(correction.datePrescription)}</p>
                </div>
                <div>
                    <p>OD-L</p>
                    <p>OD-P</p>
                </div>
                <div>
                    <p>OG-L</p>
                    <p>OG-P</p>
                </div>
            </div>
        </>
    );
};

export default ClientInamiPage;