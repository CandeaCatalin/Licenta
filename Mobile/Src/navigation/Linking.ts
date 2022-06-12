import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { RootStackParamList } from "../Models/types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Home: "Home",
      Login: "Login",
      Register: "Register",
      Queue: "Queue",
    },
  },
};

export default linking;
