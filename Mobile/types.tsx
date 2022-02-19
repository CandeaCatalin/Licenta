import { NativeStackScreenProps } from '@react-navigation/native-stack';


export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;
