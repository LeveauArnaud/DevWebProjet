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
                   list=""
                }) =>(
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
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