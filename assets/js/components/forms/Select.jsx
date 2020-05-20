import React from "react";


const Select = ({
                   name,
                   label,
                   onChange,
                    children,
                    value,
                   error="",
               }) =>(

    <div className="form-group">
        {label && <label htmlFor={name}><h6>{label}</h6></label>}
        <select
            value={value}
            onChange={onChange}
            className={"form-control" + (error && " is-invalid")}
            name={name}
            id={name}
        >
            {children}

        </select>
        { error && <p className="invalid-feedback">
            {error}
        </p>}
    </div>
);

export default Select;