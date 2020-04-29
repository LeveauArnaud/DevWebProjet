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
        oD: "",
        oG: ""



    });
    const [errors, setErrors] = useState({
        id:"",
        date:"",
        datePrescription:"",
        commentaire:"",
        idPrescripteur:"",
        oD: "",
        oG: ""

    });

    const [editing, setEditing ] = useState(false);
    //liste des prescripteurs
    const [prescripteurs, setPrescripteurs ] = useState([]);

    // Récupération du client en fonction de son id
    const fetchCorrection = async idCorrection => {
        try{
            //awit permet de attendre afin de ne récuperer que les data
            const {
                id,
                date,
                datePrescription,
                commentaire,
                idPrescripteur,
                oD,
                oG
            } = await ClientAPI.find(idCorrection);

            setCorrection({
                id,
                date,
                datePrescription,
                commentaire,
                idPrescripteur,
                oD,
                oG
            });
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
        if(name ==="codePostale" || name ==="phone" ){
            setCorrection({...correction, [name]: +value});
        }else {
            setCorrection({...correction, [name]: value});
        }


    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async event =>{
        //eviter de recharger la page
        event.preventDefault();
        try{
            setErrors({});
            if(editing){
                await ClientAPI.update(idCorrection, corection);
                toast.success("Client modifié avec succès ");
                history.replace("/client/"+idClient);
            }else {
                await ClientAPI.create(correction);
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

                {!editing && <h1>Création d'une correction pour le client : </h1> || <h1>Modification de la correction du client : {idClient}</h1>}

                <form onSubmit={handleSubmit}>



                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-6">
                                <Select
                                    label="Prescripteur"
                                    name="prescripteur"
                                    onChange={handleChange}
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
                                                            name="LSphOd"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="LCylOd"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="LAxOd"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="LPdOd"
                                                            onChange={handleChange}
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
                                                            onChange={handleChange}
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
                                                            onChange={handleChange}
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
                                                            name="PSphOd"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="PCylOd"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="PAxOd"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="PPdOd"
                                                            onChange={handleChange}
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
                                                            name="LSphOg"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="LCylOg"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="LAxOg"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="LPdOg"
                                                            onChange={handleChange}
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
                                                            onChange={handleChange}
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
                                                            onChange={handleChange}
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
                                                            name="PSphOg"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="PCylOg"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="PAxOg"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Field
                                                            name="PPdOg"
                                                            onChange={handleChange}
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