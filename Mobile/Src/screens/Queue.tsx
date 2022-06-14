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
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  useEffect(() => {
    const fetch = async () => {
      await physicalQueueContext.getPhysicalQueue();
    };
    fetch().then();
    const interval = setInterval(async () => {
      await fetch().then();
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const splitiedEstimatedTime = physicalQueueContext.estimatedTime.split(":");

    const seconds = parseInt(splitiedEstimatedTime[2]);
    const minutes = parseInt(splitiedEstimatedTime[1]);
    const hours = parseInt(splitiedEstimatedTime[0]);
    setSeconds(seconds);
    setMinutes(minutes);
    setHours(hours);
  }, [physicalQueueContext.estimatedTime]);
  useEffect(() => {
    const timerTimeout = setInterval(() => {
      calculateTime();
    }, 1000);
    return () => {
      clearInterval(timerTimeout);
    };
  }, [seconds, minutes, hours]);
  const calculateTime = () => {
    const newTime = { second: seconds, minute: minutes, hour: hours };
    if (hours === 0) {
      if (minutes === 0) {
        if (seconds === 0) {
          return false;
        } else {
          newTime.second--;
        }
      } else {
        if (seconds === 0) {
          newTime.minute--;
          newTime.second = 59;
        } else {
          newTime.second--;
        }
      }
    } else {
      if (minutes === 0) {
        if (seconds === 0) {
          newTime.hour--;
          newTime.minute = 59;
          newTime.second = 59;
        } else {
          newTime.second--;
        }
      } else {
        if (seconds === 0) {
          newTime.minute--;
          newTime.second = 59;
        } else {
          newTime.second--;
        }
      }
    }
    setSeconds(newTime.second);
    setMinutes(newTime.minute);
    setHours(newTime.hour);
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
            width: 65,
            height: 25,
            borderRadius: 20,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            marginTop: 30,
            left: (Dimensions.get("window").width * 4.5) / 6,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Logout</Text>
        </TouchableOpacity>
        {userContext.user.id === 0 ? (
          <ActivityIndicator size="large" color={"#0FF"} />
        ) : (
          <View style={styles.container}>
            <View style={styles.queuePageDetails}>
              <Text>
                <Text style={styles.queueTextTag}>Location: </Text>
                <Text style={styles.queueText}>
                  {physicalQueueContext.physicalQueue?.name}
                </Text>
              </Text>
              <Text>
                <Text style={styles.queueTextTag}>Description: </Text>
                <Text style={styles.queueText}>
                  {physicalQueueContext.physicalQueue?.description}
                </Text>
              </Text>
              <Text>
                <Text style={styles.queueTextTag}>Estimated time: </Text>
                <Text style={styles.queueText}>
                  {hours}:{minutes}:{seconds}
                </Text>
              </Text>
              <Text>
                <Text style={styles.noteTag}>Note:</Text>
                <Text style={styles.noteText}>
                  Be sure to be there 15 minutes earlier! The estimations might
                  not be 100% accurate as the application is still in testing.
                </Text>
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{
                  backgroundColor: "#252540",
                  width: "100%",
                  height: 70,
                  borderRadius: 20,
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  margin: 50,
                  marginLeft: 0,
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

export const modalstyles = StyleSheet.create({
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
