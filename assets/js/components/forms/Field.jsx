import React from "react";


const Field = ({
                   name,
                   label,
                   value,
                   onChange,
                   placeHolder,
                   type = "text",
                   error="",
                   step="0.01",
                   list="",
                   disabled
                }) =>(
        <div className="form-group">
            {label && <label htmlFor={name}><h6>{label}</h6></label>}
            <input
                list={list}
                value={value}
                onChange={onChange}
                type={type}
                className={"form-control" + (error && " is-invalid")}
                placeholder={placeHolder}
                name={name}
                id={name}
                step={step}
            />
            { error && <p className="invalid-feedback">
                {error}
            </p>}
        </div>
    );

export default Field;