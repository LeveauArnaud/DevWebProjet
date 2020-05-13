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

    const {id = "new"} = match.params;
    const [editing, setEditing ] = useState(false);

    // Chargement du client si besoin au chargement du composant ou au chargement de l'id ( à chaque changement de l'id)
    useEffect(() =>{
        if(id !== "new") {
            setEditing(true);

        };
    }, [id]);

    return(
        <>
            <div className="jumbotron">

                {!editing && <h1>Création d'un élément dans le stock : </h1> || <h1>Modification de l'élément :  {id}</h1>}


                    <div className="form-group">
                        <Link to={"/stock"} className="btn btn-success"> Enregistrer </Link>
                        <Link to={"/stock"} className="btn btn-link"> Retour au stock</Link>
                    </div>

            </div>
        </>
    );
};

export default ClientCorrectionPage;