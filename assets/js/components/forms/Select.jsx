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