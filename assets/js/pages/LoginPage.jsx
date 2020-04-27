import React, {useState} from 'react';
import AuthAPI from "../services/AuthAPI";


const LoginPage = ({onLogin}) => {

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
            onLogin(true);
        }catch (error) {
            setError("Aucun compte ne possède ce nom d'utilsateur ou alors les informations ne correspondent pas !");
        }
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