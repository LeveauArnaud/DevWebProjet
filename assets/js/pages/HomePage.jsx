import React from 'react';

const HomePage = (props) => {
    return(
        <div className="jumbotron">
            <h1 className="display-3 d-flex justify-content-center">Optical App</h1>
            <div className="col-sm-12 text-center">
                <img src="/img/logo.png" className="imgHome " alt="logo-App"/>
            </div>
            <p className="lead d-flex justify-content-center">Bienvenue sur l'application des opticiens</p>

        </div>
    )
}

export default HomePage;