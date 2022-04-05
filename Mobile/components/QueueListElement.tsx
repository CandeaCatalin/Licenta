import React, { FC, useContext } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { QueueContext } from "../context/QueueContext";
import { UserContext } from "../context/UserContext";
import { Queue } from "../Models/Queue";

interface QueueListElementProps {
  queue: Queue;
}
export const QueueListElement: FC<QueueListElementProps> = ({ queue }) => {
  const queueContext = useContext(QueueContext);
  const userContext = useContext(UserContext);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "gainsboro",
        alignContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <View style={{ flex: 3, alignItems: "center" }}>
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 12,
          }}
          numberOfLines={1}
        >
          {queue.name}
        </Text>
      </View>
      <View style={{ flex: 6 }}>
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 12,
            paddingLeft: 5,
          }}
          numberOfLines={1}
        >
          {queue.description}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#4d4f80",
            width: 32,
            height: 20,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            alignItems: "center",
          }}
          onPress={() =>
            queueContext.addUserInQueue(userContext.user.id, queue.id)
          }
        >
          <Text
            style={{ color: "gainsboro", fontWeight: "bold", fontSize: 15 }}
          >
            Join
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
