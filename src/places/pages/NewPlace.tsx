import React, { Reducer, useCallback, useReducer } from "react";
import Button from "../../shared/components/FormElement/Button";
import Input from "../../shared/components/FormElement/Input";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./NewPlace.css";

interface FormReducerTypes {
    inputs: {
        [key: string]: { value: string; isValid: boolean };
    };
    isValid: boolean;
}

const formReducer: Reducer<
    FormReducerTypes,
    { type: string; inputId: string; isValid: boolean; value: string }
> = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid,
                    },
                },
                isValid: formIsValid,
            };
        default:
            return state;
    }
};

const NewPlace = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: { value: "", isValid: false },
            description: { value: "", isValid: false },
        },
        isValid: true,
    });

    const inputHandler = useCallback(
        (id, value, isValid) => {
            dispatch({ type: "INPUT_CHANGE", value, isValid, inputId: id });
        },
        [dispatch]
    );
    return (
        <form className="place-form">
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)"
                onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
                Add Place
            </Button>
        </form>
    );
};

export default NewPlace;
