import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../context/UserContext";
import { QueueListElement } from "../components/QueueListElement";
import { QueueContext } from "../context/QueueContext";
import { styles } from "../constants/Styles";
import { Queue } from "../Models";
import { modalstyles } from "./Queue";

export const Home = () => {
  const userContext = useContext(UserContext);
  const queueContext = useContext(QueueContext);
  const [displayedQueue, setDisplayedQueue] = useState<Queue>({
    name: "",
    description: "",
    createdTime: new Date(),
    id: 0,
    physicalQueues: [],
  });
  const [showModal, setShowModal] = useState(false);
  const displayModal = (item: Queue) => {
    setDisplayedQueue(item);
    setShowModal(true);
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <View style={modalstyles.centeredView}>
          <View style={modalstyles.modalView}>
            <Text style={modalstyles.modalText}>
              <Text style={{ fontWeight: "bold" }}>
                {displayedQueue.name}:{" "}
              </Text>
              <Text>{displayedQueue.description}</Text>
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
                  setShowModal(false);
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
              <View style={styles.queueListBox}>
                <ScrollView style={{ paddingTop: 20 }}>
                  {queueContext.queueList.map((item) => {
                    return (
                      <QueueListElement
                        onClick={() => displayModal(item)}
                        queue={item}
                        key={item.id}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    </>
  );
};
