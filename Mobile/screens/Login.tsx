import React, {useContext, useEffect, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {formStyles, styles} from "../constants/Styles";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {UserContext} from "../context/UserContext";

export const Login = () => {
    const context = useContext(UserContext);
    const navigator = useNavigation();

    const [state, setState] = useState<LoginState>({loginCredentials: {email: "", password: ""}, isSubmitted: true});

    useEffect(() => {
        if (state.loginCredentials.password !== "" && state.loginCredentials.email !== "") {
            setState(prevState => {
                return {...prevState, isSubmitted: false}
            });
        } else {
            setState(prevState => {
                return {...prevState, isSubmitted: true}
            });
        }
    }, [state.loginCredentials]);

    const onSubmit = () => {
        setState(prevState => {
            return {...prevState, isSubmitted: true}
        });
        context.login(state.loginCredentials.email, state.loginCredentials.password);
    }
    const onForgetPasswordClick = () => {
        console.log("Not yet implemented!");
    }
    const onNoAccountClick = () => {
        // @ts-ignore
        navigator.navigate("Register");
    }
    return (
        <LinearGradient
            colors={[" rgba(45, 49, 146, 1) 100%", "rgba(75, 79, 114, 1) 100%"]}
            start={{
                x: 0,
                y: 0,
            }}
            end={{
                x: 0,
                y: 1,
            }}
            style={styles.container}
        >
            <View style={formStyles.loginBox}>
                <Text style={formStyles.formHeader}>Welcome!</Text>
                <TextInput placeholderTextColor={"#000"} placeholder={"Email address"} style={formStyles.formBox}
                           onChangeText={(text) =>
                               setState(prevState => {
                                   return {
                                       ...prevState,
                                       loginCredentials: {email: text, password: prevState.loginCredentials.password}
                                   }
                               })}/>
                <TextInput placeholderTextColor={"#000"} placeholder={"Password"} style={formStyles.formBox}
                           onChangeText={(text) =>
                               setState(prevState => {
                                   return {
                                       ...prevState,
                                       loginCredentials: {password: text, email: prevState.loginCredentials.email}
                                   }
                               })}/>
                <Text style={formStyles.formRedirectionText} onPress={onForgetPasswordClick}>Forget password?</Text>
                <TouchableOpacity onPress={onSubmit} disabled={state.isSubmitted}
                                  style={!state.isSubmitted ? formStyles.formSubmitButton : formStyles.formSubmitButtonDisabled}><Text
                    style={formStyles.formSubmitButtonText}>Sign in</Text></TouchableOpacity>
                <Text style={formStyles.formRedirectionText} onPress={onNoAccountClick}>Don't have an account?</Text>
            </View>
        </LinearGradient>
    );
}
type loginCredentialsType = {
    email: string;
    password: string;
};
type LoginState = {
    loginCredentials: loginCredentialsType;
    isSubmitted: boolean;
}
