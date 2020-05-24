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

const ClientCorrectionPage = ({match, history}) => {

    const moment = require('moment');
    moment().format();

    function dateFormat(date){
        return moment(date).format('YYYY-MM-DD');
    }

    const { idCorrection = "new", idClient} = match.params;

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
    //infos client
    const [client, setClient] = useState([]);

    // Récupération du client en fonction de son id
    const fetchCorrection = async idCorrection => {
        try{
            //awit permet de attendre afin de ne récuperer que les data
            const dataCorrection = await ClientAPI.find(idCorrection);

            setCorrection({...dataCorrection, ["idPrescripteur"]: dataCorrection.idPrescripteur.id});
            console.log(correction);
        }catch (e) {
            toast.error("Impossible de charger la correction du client");
            history.replace("/client/"+idClient);
        }
    }
    // Récupération liste des prescipteurs
    const fetchPrescripteurs = async () => {
        try{
            //awit permet de attendre afin de ne récuperer que les data
            const dataPrescripteur = await CorrectionAPI.findAllPrescripteur();
            setPrescripteurs(dataPrescripteur);

        }catch (e) {
            toast.error("Impossible de charger la liste des prescripteurs");
            history.replace("/client/"+idClient);
        }

    }

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
    const handleChange = ({currentTarget}) => {
        const { name, value } = currentTarget;
        if(name ==="commentaire" || name ==="date" || name ==="datePrescription" || name ==="idPrescripteur"){
            setCorrection({...correction, [name]: value});
        }else{
            setCorrection({...correction, [name]: parseFloat(value)});
        }
        console.log(correction);

    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async event =>{
        //eviter de recharger la page
        event.preventDefault();



        try{
            if(editing){
                await CorrectionAPI.update(idCorrection,idClient,correction.idPrescripteur, correction);
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
    return(
        <>
            <div className="jumbotron">

                {!editing && <h1>Création d'une correction pour le client : {client.nCli}</h1> || <h1>Modification de la correction du client : {client.nCli}</h1>}

                <form onSubmit={handleSubmit}>



                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-6">
                                <Select
                                    value={correction.idPrescripteur}
                                    label="Prescripteur"
                                    name="idPrescripteur"
                                    onChange={handleChange}
                                    error={errors.idPrescripteur}
                                >

                                    {!editing && <option >Selectionner un ophtalmologue</option>}
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
                                                        <label><h6>Sph:</h6></label>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label><h6>Cyl:</h6></label>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label><h6>Ax:</h6></label>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label><h6>PD:</h6></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2 ">
                                                <div className="row justify-content-end">
                                                    <label><h6>Loin:</h6></label>
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
                                                            type={"number"}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="cylOdL"
                                                            value={correction.cylOdL}
                                                            onChange={handleChange}
                                                            error={errors.cylOdL}
                                                            type={"number"}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="axOdL"
                                                            value={correction.axOdL}
                                                            onChange={handleChange}
                                                            error={errors.axOdL}
                                                            type={"number"}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="pdOdL"
                                                            value={correction.pdOdL}
                                                            onChange={handleChange}
                                                            error={errors.pdOdL}
                                                            type={"number"}
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
                                                                <label><h6>Add</h6></label>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="addOd"
                                                            value={correction.addOd}
                                                            onChange={handleChange}
                                                            error={errors.addOd}
                                                            type={"number"}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="row justify-content-end">
                                                            <div className="col">
                                                                <label><h6>Add-l</h6></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="addLOd"
                                                            value={correction.addLOd}
                                                            onChange={handleChange}
                                                            error={errors.addLOd}
                                                            type={"number"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2 ">
                                                <div className="row justify-content-end">
                                                    <label><h6>Près</h6></label>
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
                                                            type={"number"}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="cylOdP"
                                                            value={correction.cylOdP}
                                                            onChange={handleChange}
                                                            error={errors.cylOdP}
                                                            type={"number"}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="axOdP"
                                                            value={correction.axOdP}
                                                            onChange={handleChange}
                                                            error={errors.axOdP}
                                                            type={"number"}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="pdOdP"
                                                            value={correction.pdOdP}
                                                            onChange={handleChange}
                                                            error={errors.pdOdP}
                                                            type={"number"}
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
                                                        <label><h6>Sph:</h6></label>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label><h6>Cyl:</h6></label>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label><h6>Ax:</h6></label>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label><h6>PD:</h6></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2 ">
                                                <div className="row justify-content-end">
                                                    <label><h6>Loin:</h6></label>
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
                                                            type={"number"}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="cylOgL"
                                                            value={correction.cylOgL}
                                                            onChange={handleChange}
                                                            error={errors.cylOgL}
                                                            type={"number"}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="axOgL"
                                                            value={correction.axOgL}
                                                            onChange={handleChange}
                                                            error={errors.axOgL}
                                                            type={"number"}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="pdOgL"
                                                            value={correction.pdOgL}
                                                            onChange={handleChange}
                                                            error={errors.pdOgL}
                                                            type={"number"}
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
                                                                <label><h6>Add</h6></label>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="addOg"
                                                            value={correction.addOg}
                                                            onChange={handleChange}
                                                            error={errors.addOg}
                                                            type={"number"}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="row justify-content-end">
                                                            <div className="col">
                                                                <label><h6>Add-l</h6></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="addLOg"
                                                            value={correction.addLOg}
                                                            onChange={handleChange}
                                                            error={errors.addLOg}
                                                            type={"number"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2 ">
                                                <div className="row justify-content-end">
                                                    <label><h6>Près</h6></label>
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
                                                            type={"number"}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="cylOgP"
                                                            value={correction.cylOgP}
                                                            onChange={handleChange}
                                                            error={errors.cylOgP}
                                                            type={"number"}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="axOgP"
                                                            value={correction.axOgP}
                                                            onChange={handleChange}
                                                            error={errors.axOgP}
                                                            type={"number"}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="pdOgP"
                                                            value={correction.pdOgP}
                                                            onChange={handleChange}
                                                            error={errors.pdOgP}
                                                            type={"number"}
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
            </div>
        </>
    );
};

export default ClientCorrectionPage;