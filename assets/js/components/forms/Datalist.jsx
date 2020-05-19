import React from "react";


const Datalist = ({
                    list,
                    error=""
                }) =>(

    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <datalist
            id={list}
        >
            {children}

        </datalist>
        { error && <p className="invalid-feedback">
            {error}
        </p>}
    </div>
);

export default Datalist;