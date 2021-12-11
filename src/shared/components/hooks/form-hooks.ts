import { Reducer, useCallback, useReducer } from "react";

interface FormReducerStateTypes {
    inputs: {
        [key: string]: { value: string; isValid: boolean };
    };
    isValid: boolean;
}

enum FormActionType {
    INPUT_CHANGE = "INPUT_CHANGE",
    SET_DATA = "SET_DATA",
}

type FormAction =
    | {
          type: FormActionType.INPUT_CHANGE;
          value: string;
          isValid: boolean;
          inputId: string;
      }
    | {
          type: FormActionType.SET_DATA;
          inputs: { [key: string]: { value: string; isValid: boolean } };
          formIsValid: boolean;
      };

const formReducer: Reducer<FormReducerStateTypes, FormAction> = (
    state,
    action
) => {
    switch (action.type) {
        case FormActionType.INPUT_CHANGE:
            let formIsValid: boolean | undefined = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            if (!action.inputId) {
                return state;
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
        case FormActionType.SET_DATA:
            return { inputs: action.inputs, isValid: action.formIsValid };
        default:
            return state;
    }
};

export const useForm = (
    initialInputs: { [key: string]: { value: string; isValid: boolean } },
    initialFormValidity: boolean
) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity,
    });

    const inputHandler = useCallback(
        (id, value, isValid) => {
            dispatch({
                type: FormActionType.INPUT_CHANGE,
                value,
                isValid,
                inputId: id,
            });
        },
        [dispatch]
    );

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: FormActionType.SET_DATA,
            inputs: inputData,
            formIsValid: formValidity,
        });
    }, []);

    return [formState, inputHandler, setFormData] as const;
};

//  : [
//     FormReducerStateTypes,
//     (id: string, value: string, isValid: boolean) => void
// ]
