import React, {useContext} from "react";
import {ActivityIndicator, View, Text, Button} from "react-native";
import {styles} from "../constants/Styles";
import {LinearGradient} from "expo-linear-gradient";
import {UserContext} from "../context/UserContext";

export const Home = () => {
    const context = useContext(UserContext);

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
            {context.user.id === 0 ? <ActivityIndicator size="large" color={"#0FF"}/> :
                <View style={styles.container}>
                    <Button title={"Logout"} onPress={context.logOut}/>
                    <Text>{context.user.firstName}</Text>
                    <Text>{context.user.lastName}</Text>
                    <Text>{context.user.email}</Text>
                    <Text>{context.user.id}</Text>

                </View>}
        </LinearGradient>
    );
}
