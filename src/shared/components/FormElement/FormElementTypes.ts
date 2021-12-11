export interface InputTypes {
    element: "input" | "textarea";
    id: string | undefined;
    type?: string;
    placeholder?: string;
    rows?: number;
    label?: string;
    errorText?: string;
    validators: { type: string }[];
    initialValue?: string;
    initialValid?: boolean;
    onInput: (id: string | undefined, value: string, isValid: boolean) => void;
}
