import React, {useState} from 'react';
import axios from "axios";

const LoginPage = (props) => {

    const [credentials, setCredentials] = useState({
        username :"aa",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = event => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({ ...credentials, [name]: value});
    };

    const handleSubmit = async event => {
        event.preventDefault();

        try{
            const token = await axios.post("https://127.0.0.1:8000/api/login_check", credentials)
                .then(response => response.data.token);

            //remise à zéro des erreurs
            setError("");

            //stockage du token dans le localStorage
            window.localStorage.setItem("authToken", token)
            // on prévient axios qu'on a un header par défault pour toutes les futures requêtess http
            axios.defaults.headers["Authorization"]= "Bearer " + token;
        }catch (error) {
            setError("Aucun compte ne possède ce nom d'utilsateur ou alors les informations ne correspondent pas !");
        }

        console.log(credentials);
    }

    return(
        <div className="jumbotron">
            <h1 className="display-3 d-flex justify-content-center">Optical App</h1>
            <div className="col-sm-12 text-center">
                <img src="/img/logo.png" className="imgHome " alt="logo-App"/>
            </div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="username">Uername</label>
                        <input
                            value={credentials.username}
                            onChange={handleChange}
                            type="text"
                            className={"form-control" + (error && " is-invalid")}
                            placeholder="Enter username"
                            name="username"
                            id="username"
                        />
                        { error && <p className="invalid-feedback">
                            {error}
                        </p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            value={credentials.password}
                            onChange={handleChange}
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            name="password"
                            id="password"
                        />
                    </div>
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