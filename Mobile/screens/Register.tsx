import React, {FC, useContext, useEffect, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {formStyles, styles} from "../constants/Styles";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {User} from "../Models/User";
import {useNavigation} from "@react-navigation/native";
import {UserContext} from "../context/UserContext";


export const Register = ({}) => {
    const navigator = useNavigation();
    const context = useContext(UserContext);
    const [user, setUser] = useState<User>({
        email: "",
        firstName: "",
        id: 0,
        imageUrl: "",
        lastName: "",
        queueId: 0,
        queueRole: ""
    });
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = () => {
        setIsSubmitted(true);
        context.register(user, password, confirmPassword);
    }
    const onHaveAccountClick = () => {
        // @ts-ignore
        navigator.navigate("Login");
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
            <View style={formStyles.registerBox}>
                <Text style={formStyles.formHeader}>Welcome!</Text>
                <TextInput placeholderTextColor={"#000"} placeholder={"First Name"} style={formStyles.formBox}
                           onChangeText={(text) => setUser({...user, firstName: text})}/>
                <TextInput placeholderTextColor={"#000"} placeholder={"Last Name"} style={formStyles.formBox}
                           onChangeText={(text) => setUser({...user, lastName: text})}/>
                <TextInput placeholderTextColor={"#000"} placeholder={"Email address"} style={formStyles.formBox}
                           onChangeText={(text) => setUser({...user, email: text})}/>
                <TextInput placeholderTextColor={"#000"} placeholder={"Password"} style={formStyles.formBox}
                           onChangeText={(text) => setPassword(text)}/>
                <TextInput placeholderTextColor={"#000"} placeholder={"Confirm Password"} style={formStyles.formBox}
                           onChangeText={(text) => setConfirmPassword(text)}/>

                <TouchableOpacity onPress={onSubmit} disabled={isSubmitted}
                                  style={!isSubmitted ? formStyles.formSubmitButton : formStyles.formSubmitButtonDisabled}><Text
                    style={formStyles.formSubmitButtonText}>Register</Text></TouchableOpacity>
                <Text style={formStyles.formRedirectionText} onPress={onHaveAccountClick}>Already have an account? Sign
                    in</Text>
            </View>
        </LinearGradient>
    );
}
