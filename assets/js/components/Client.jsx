import React from 'react';

const Client = (clientInfos) => {
    return(
        <form>
            <fieldset>
                <div className="card-body">
                    <div className="card-Header form-group">

                        <img src={clientInfos.photo} alt="photo du client" className=""/>
                    </div>
                    <div className="card-body form-group">
                        <label>Nom: </label>
                        <input className="form-control" id="disabledInput" type="text"
                               placeholder={clientInfos.nom} disabled/>
                        <label>Prenom: </label>
                        <input className="form-control" id="disabledInput" type="text"
                               placeholder={clientInfos.prenom} disabled/>
                        <label>Sexe :</label>
                        <input className="form-control" id="disabledInput" type="text"
                               placeholder={clientInfos.sexe} disabled/>
                        <label>Date de Naissance:</label>
                        <input className="form-control" id="disabledInput" type="text"
                               placeholder={clientInfos.dateNaissance } disabled/>
                        <label>Rue: </label>
                        <input className="form-control" id="disabledInput" type="text"
                               placeholder={clientInfos.rue} disabled/>
                        <label>Ville :</label>
                        <input className="form-control" id="disabledInput" type="text"
                               placeholder={clientInfos.ville} disabled/>
                        <label>Pays: </label>
                        <input className="form-control" id="disabledInput" type="text"
                               placeholder={clientInfos.pays} disabled/>
                        <label>Email : </label>
                        <input className="form-control" id="disabledInput" type="text"
                               placeholder={clientInfos.email} disabled/>
                        <label>Tel : </label>
                        <input className="form-control" id="disabledInput" type="text"
                               placeholder={clientInfos.phone} disabled/>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <button className="btn btn-primary " type="button" data-toggle="collapse" data-target="#navbarColor01"
                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">Modifier
                </button>
            </fieldset>
        </form>
    )
}

export default Client;