import React, {useState, useEffect} from 'react';
import Field from "../../components/forms/Field";
import Select from "../../components/forms/Select";
import { Link } from "react-router-dom";
import moment from 'moment';
import {toast} from "react-toastify";
import StockAPI from "../../services/stockAPI";
import MonturesAPI from "../../services/monturesAPI";
import ClientAPI from "../../services/clientAPI";

const StockInfosPage = ({match, history}) => {

    const moment = require('moment');
    moment().format();

    function dateFormat(date){
        return moment(date).format('YYYY-MM-DD');
    }

    const {id = "new"} = match.params;
    const [errors, setErrors] = useState([]);

    const [editing, setEditing ] = useState(false);

    const [stockItems, setStockItems] = useState([]);
    const [montureSelected, setMontureSelected] = useState([]);

    // Chargement du client si besoin au chargement du composant ou au chargement de l'id ( à chaque changement de l'id)
    useEffect(() =>{
        if(id !== "new") {
            setEditing(true);
            fetchStockSelected();

        }
    }, [id]);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) =>{
        const { name, value} = currentTarget;
        if(name ==="id" || name ==="prix"|| name ==="reduction"){
            setCommandeMonture({...commandeMonture, [name]: parseFloat(value)});
        }else {
            setCommandeMonture({...commandeMonture, [name]: value});
        }
        if (name ==="idMonture"){
            setMontureSelected(montures.map(m => m).filter(m => m.id === parseInt(value))[0]);
            console.log(montures.map(m => m).filter(m => m.id === parseInt(value)));
        }

    };

    //permet de récupérer la monture dans le stock avec son id
    const fetchStockSelected = async () => {
        try {
            const dataMonture = await StockAPI.get(id)
            setStockItems({...dataMonture, ["idMonture"]: dataMonture.idMonture.id});
            setMontureSelected(dataCommandeMonture.idMonture);

        } catch (error) {
            console.log(error.response);
            toast.error("Impossible de charger le stock");
        }

    }

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

    // Chargement liste des montures
    useEffect(() =>{
        fetchMontures();

    }, []);

    // Gestion de la soumission du formulaire
    const handleSubmit = async event =>{
        //eviter de recharger la page
        event.preventDefault();
        try{
            setErrors({});
            if(editing){
                await CommandeMontureAPI.update(idClient, commandeMonture);
                toast.success("Commande modifiée avec succès ");
                history.replace("/stock");
            }else {
                await CommandeMontureAPI.create(idClient, commandeMonture);
                toast.success("Commande créée avec succès ");
                history.replace("/stock");
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

                {!editing && <h1>Création d'un élément dans le stock : </h1> || <h1>Modification de l'élément :  {id}</h1>}

                <form onSubmit={handleSubmit}>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-6"><label><h6>Selection une monture : </h6></label></div>
                            <div className="col-md-6">
                                <label><h6>Reduction : </h6></label>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <Select
                                            value={""}
                                            name="idMonture"
                                            onChange={handleChange}
                                            error={errors.idMonture}
                                        >

                                            {!editing && <option >Selectionner une monture</option>}

                                        </Select>
                                    </div>
                                    <div className="col-md-6">
                                        <Field
                                            name="quantite"
                                            placeHolder="qunatité"
                                            value={stockItems && stockItems.quantite}
                                            onChange={handleChange}
                                            error={errors.reduction}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
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
                                        <input className="form-control" id="montureMarque" type="text"
                                               placeholder={stockItems && stockItems.idMagasin && stockItems.idMagasin.nom} disabled/>
                                    </div>
                                    <div className="col-md-2">
                                        <input className="form-control" id="montureMarque" type="text"
                                               placeholder={stockItems && stockItems.idMagasin && stockItems.idMonture.marque} disabled/>
                                    </div>
                                    <div className="col-md-2">
                                        <input className="form-control" id="montureModel" type="text"
                                               placeholder={stockItems && stockItems.idMagasin && stockItems.idMonture.model} disabled/>
                                    </div>
                                    <div className="col-md-2">
                                        <input className="form-control" id="montureCouleur" type="text"
                                               placeholder={stockItems && stockItems.idMagasin && stockItems.idMonture.couleur} disabled/>
                                    </div>
                                    <div className="col-md-2">
                                        <input className="form-control" id="montureTaille" type="text"
                                               placeholder={stockItems && stockItems.idMagasin && stockItems.idMonture.taille} disabled/>
                                    </div>
                                    <div className="col-md-2">
                                        <input className="form-control" id="monturePrix" type="text"
                                               placeholder={stockItems && stockItems.idMagasin && stockItems.idMonture.prix} disabled/>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success"> Enregistrer </button>
                        <Link to={"/stock"} className="btn btn-link"> Retour au client</Link>
                    </div>
                </form>

            </div>
        </>
    );
};

export default StockInfosPage;