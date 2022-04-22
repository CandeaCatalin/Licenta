import React, { useContext, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { styles } from "../constants/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../context/UserContext";
import { PhysicalQueueContext } from "../context/PhysicalQueueContext";

export const Queue = () => {
  const userContext = useContext(UserContext);
  const physicalQueueContext = useContext(PhysicalQueueContext);
  useEffect(() => {
    const fetch = async () => {
      //   await physicalQueueContext.getPhysicalQueue();
    };
    fetch().then();
  }, []);

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
            <View style={styles.queuePageDetails}>
              <TouchableOpacity
                onPress={() => {
                  physicalQueueContext.leaveQueue(
                    userContext.user.id,
                    userContext.user.usersToQueuesId
                  );
                }}
                style={{
                  backgroundColor: "#4d4f80",
                  width: 100,
                  height: 25,
                  borderRadius: 20,
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Leave queue
                </Text>
              </TouchableOpacity>
              <Text>Text:{userContext.user.usersToQueuesId}</Text>
            </View>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};
