import React, { FormEvent, useEffect, useReducer } from "react";
import { validate } from "../../util/validators";
import { InputTypes } from "./FormElementTypes";
import "./Input.css";

const inputReducer = (
    state: { value: string; isValid: boolean; isTouched?: boolean },
    action: {
        type: string;
        val: string;
        isTouched?: boolean;
        isValid?: boolean;
        validators?: { type: string }[];
    }
) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };
        case "TOUCH":
            return {
                ...state,
                isTouched: true,
            };
        default:
            return state;
    }
};

const Input: React.FC<InputTypes> = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: "",
        isTouched: false,
        isValid: false,
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = (event: FormEvent<EventTarget>) => {
        dispatch({
            type: "CHANGE",
            val: (event.target as HTMLInputElement).value,
            validators: props.validators,
        });
    };

    const element =
        props.element === "input" ? (
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                value={inputState.value}
            />
        ) : (
            <textarea
                id={props.id}
                rows={props.rows || 3}
                onChange={changeHandler}
                value={inputState.value}
            />
        );

    return (
        <div
            className={`form-control ${
                !inputState.isValid &&
                inputState.isTouched &&
                "form-control--invalid"
            }`}
        >
            <label htmlFor="props.id">{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && (
                <p>{props.errorText}</p>
            )}
        </div>
    );
};

export default Input;