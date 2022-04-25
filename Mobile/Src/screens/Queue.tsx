import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../context/UserContext";
import { PhysicalQueueContext } from "../context/PhysicalQueueContext";
import { styles } from "../constants/Styles";
type ParamList = {
  usersToQueuesId: number;
};
export const Queue = () => {
  const userContext = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const physicalQueueContext = useContext(PhysicalQueueContext);

  useEffect(() => {
    const fetch = async () => {
      await physicalQueueContext.getPhysicalQueue();
    };
    fetch().then();
    const interval = setInterval(async () => {
      await fetch().then();
    }, 20000);
    return () => clearInterval(interval);
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modalstyles.centeredView}>
          <View style={modalstyles.modalView}>
            <Text style={modalstyles.modalText}>
              Are you sure you want to leave{" "}
              <Text style={{ fontWeight: "bold" }}>
                {physicalQueueContext.physicalQueue?.queue?.name}
              </Text>
              , by doing this you will lose your place in this queue.
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  physicalQueueContext.leaveQueue(
                    userContext.user.id,
                    userContext.user.usersToQueuesId
                  );
                  setModalVisible(false);
                }}
                style={{
                  backgroundColor: "#252540",
                  width: 100,
                  height: 50,
                  borderRadius: 20,
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  margin: 5,
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 15 }}
                >
                  Confirm{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{
                  backgroundColor: "#252540",
                  width: 100,
                  height: 50,
                  borderRadius: 20,
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  margin: 5,
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 15 }}
                >
                  Cancel{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
              <Text style={styles.queueText}>
                Location: {physicalQueueContext.physicalQueue?.name}
              </Text>
              <Text style={styles.queueText}>
                Description: {physicalQueueContext.physicalQueue?.description}
              </Text>
              <Text style={styles.queueText}>
                Estimated time: {physicalQueueContext.estimatedTime}{" "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{
                  backgroundColor: "#252540",
                  width: 150,
                  height: 70,
                  borderRadius: 20,
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  margin: 50,
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 25 }}
                >
                  Leave queue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const modalstyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
