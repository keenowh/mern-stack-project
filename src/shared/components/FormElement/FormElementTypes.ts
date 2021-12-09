export interface InputTypes {
    element: string;
    id: string | undefined;
    type?: string;
    placeholder?: string;
    rows?: number;
    label?: string;
    errorText?: string;
    validators: { type: string }[];
    onInput: (id: string | undefined, value: string, isValid: boolean) => void;
}
