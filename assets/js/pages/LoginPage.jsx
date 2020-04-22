import React from 'react';

const LoginPage = (props) => {
    return(
        <div className="jumbotron">
            <h1 className="display-3 d-flex justify-content-center">Optical App</h1>
            <div className="col-sm-12 text-center">
                <img src="/img/logo.png" className="imgHome " alt="logo-App"/>
            </div>
            <form>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Uername</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Enter username"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Password</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Enter password"
                        />
                    </div>
                    <a  className="btn btn-success" href="#/clients">Connexion</a>
                </fieldset>
            </form>

        </div>
    )
}

export default LoginPage;