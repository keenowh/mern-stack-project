import React, { FormEvent, useContext, useState } from "react";
import Button from "../../shared/components/FormElement/Button";
import Input from "../../shared/components/FormElement/Input";
import { useForm } from "../../shared/components/hooks/form-hooks";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./Auth.css";
const Auth: React.FC = () => {
    const auth = useContext(AuthContext);
    const [isLogin, setIsLoginMode] = useState(true);
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: { value: "", isValid: false },
            password: { value: "", isValid: false },
        },
        false
    );

    const authSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    };

    const switchModeHandler = () => {
        if (!isLogin) {
            setFormData(
                { ...formState.inputs, name: { undefined } },
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,

                    name: { value: "", isValid: false },
                },
                false
            );
        }
        setIsLoginMode((prevMode) => !prevMode);
    };

    return (
        <Card className="authentication">
            <h2>Login Required</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                {!isLogin && (
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a name"
                        onInput={inputHandler}
                    />
                )}
                <Input
                    id="email"
                    element="input"
                    type="email"
                    label="E-mail"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email"
                    onInput={inputHandler}
                />
                <Input
                    id="password"
                    element="input"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
                    errorText="Please enter a valid password (minimum of 8 characters)"
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    {isLogin ? "LOGIN" : "SIGNUP"}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                SWITCH TO {isLogin ? "SIGNUP" : "LOGIN"}
            </Button>
        </Card>
    );
};

export default Auth;
