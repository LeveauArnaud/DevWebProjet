import React from "react";


const Textarea = ({
                   name,
                   label,
                   value,
                   onChange,
                   placeHolder,
                   type = "textarea",
                   error=""
               }) =>(
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <textarea
            value={value}
            onChange={onChange}
            type={type}
            className={"form-control" + (error && " is-invalid")}
            placeholder={placeHolder}
            name={name}
            id={name}
        />
        { error && <p className="invalid-feedback">
            {error}
        </p>}
    </div>
);

export default Textarea;