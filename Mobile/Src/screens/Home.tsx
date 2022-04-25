import React, { useContext } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../context/UserContext";
import { QueueListElement } from "../components/QueueListElement";
import { QueueContext } from "../context/QueueContext";
import { styles } from "../constants/Styles";

export const Home = () => {
  const userContext = useContext(UserContext);
  const queueContext = useContext(QueueContext);

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
      <View style={{ marginTop: 25 }}>
        <TouchableOpacity
          onPress={userContext.logOut}
          style={{
            backgroundColor: "#4d4f80",
            width: 45,
            height: 25,
            borderRadius: 20,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",

            left: (Dimensions.get("window").width * 5) / 6,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Logout</Text>
        </TouchableOpacity>
        {userContext.user.id === 0 ? (
          <ActivityIndicator size="large" color={"#0FF"} />
        ) : (
          <View style={styles.container}>
            <View style={styles.queueListBox}>
              <ScrollView style={{ paddingTop: 20 }}>
                {queueContext.queueList.map((item) => {
                  return <QueueListElement queue={item} key={item.id} />;
                })}
              </ScrollView>
            </View>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};
