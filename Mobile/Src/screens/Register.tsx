import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import { styles, formStyles } from "../constants/Styles";
import { User } from "../Models";

export const Register = () => {
  const navigator = useNavigation();
  const context = useContext(UserContext);
  const [state, setState] = useState<RegisterState>({
    password: "",
    confirmPassword: "",
    isSubmitted: false,
    user: {
      email: "",
      firstName: "",
      id: 0,
      lastName: "",
      usersToQueuesId: null,
    },
  });

  const onSubmit = () => {
    setState((prevState) => {
      return { ...prevState, isSubmitted: true };
    });
    context.register(state.user, state.password, state.confirmPassword);
  };
  const onHaveAccountClick = () => {
    // @ts-ignore
    navigator.navigate("Login");
  };
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
        <TextInput
          placeholderTextColor={"#000"}
          placeholder={"First Name"}
          style={formStyles.formBox}
          onChangeText={(text) =>
            setState((prevState) => {
              return {
                ...prevState,
                user: {
                  email: prevState.user.email,
                  firstName: text,
                  lastName: prevState.user.lastName,
                  id: prevState.user.id,
                  usersToQueuesId: prevState.user.usersToQueuesId,
                },
              };
            })
          }
        />
        <TextInput
          placeholderTextColor={"#000"}
          placeholder={"Last Name"}
          style={formStyles.formBox}
          onChangeText={(text) =>
            setState((prevState) => {
              return {
                ...prevState,
                user: {
                  email: prevState.user.email,
                  firstName: prevState.user.firstName,
                  lastName: text,
                  id: prevState.user.id,
                  usersToQueuesId: prevState.user.usersToQueuesId,
                },
              };
            })
          }
        />
        <TextInput
          placeholderTextColor={"#000"}
          placeholder={"Email address"}
          style={formStyles.formBox}
          onChangeText={(text) =>
            setState((prevState) => {
              return {
                ...prevState,
                user: {
                  email: text,
                  firstName: prevState.user.firstName,
                  lastName: prevState.user.lastName,
                  id: prevState.user.id,
                  usersToQueuesId: prevState.user.usersToQueuesId,
                },
              };
            })
          }
        />
        <TextInput
          placeholderTextColor={"#000"}
          placeholder={"Password"}
          style={formStyles.formBox}
          onChangeText={(text) =>
            setState((prevState) => {
              return { ...prevState, password: text };
            })
          }
        />
        <TextInput
          placeholderTextColor={"#000"}
          placeholder={"Confirm Password"}
          style={formStyles.formBox}
          onChangeText={(text) =>
            setState((prevState) => {
              return { ...prevState, confirmPassword: text };
            })
          }
        />

        <TouchableOpacity
          onPress={onSubmit}
          disabled={state.isSubmitted}
          style={
            !state.isSubmitted
              ? formStyles.formSubmitButton
              : formStyles.formSubmitButtonDisabled
          }
        >
          <Text style={formStyles.formSubmitButtonText}>Register</Text>
        </TouchableOpacity>
        <Text
          style={formStyles.formRedirectionText}
          onPress={onHaveAccountClick}
        >
          Already have an account? Sign in
        </Text>
      </View>
    </LinearGradient>
  );
};

type RegisterState = {
  user: User;
  password: string;
  confirmPassword: string;
  isSubmitted: boolean;
};
