import React, {useState, useContext} from 'react';
import AuthAPI from "../services/AuthAPI";
import AuthContext from "../contexts/AuthContexts";
import Field from "../components/forms/Field";
import {toast} from "react-toastify";


const LoginPage = ({ history }) => {

    const { setIsAuthenticated } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username :"",
        password: ""
    });
    const [error, setError] = useState("");

    //gestion des champs
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({ ...credentials, [name]: value});
    };

    //gestion du submit
    const handleSubmit = async event => {
        event.preventDefault();

        try{
            await AuthAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            toast.success("Vous êtes désormais connecté ");
            history.replace("/clients")
        }catch (error) {
            setError("Aucun compte ne possède ce nom d'utilsateur ou alors les informations ne correspondent pas !");
            toast.error("Une erreur est survenue");
        }
    }

    return(
        <div className="jumbotron">
            <h1 className="display-3 d-flex justify-content-center">Optical App</h1>
            <div className="col-sm-12 text-center">
                <img src="/img/logo.png" className="imgHome w-25" alt="logo-App"/>
            </div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <Field
                        label="Utilisateur"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        placeHolder="Enter username"
                        error={error}
                    />
                    <Field
                        label="Mot de passe"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeHolder="Enter password"
                        error={error}
                    />
                    <div className="form-group">
                        <button   type="submit" className="btn btn-success" >
                            Connexion
                        </button>
                    </div>
                </fieldset>
            </form>

        </div>
    )
}

export default LoginPage;