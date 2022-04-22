import { useNavigation } from "@react-navigation/native";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { PhysicalQueue } from "../Models/PhysicalQueue";
import { Queue } from "../Models/Queue";
import { PhysicalQueueAPI } from "./API/PhysicalQueueAPI";
import { UserContext } from "./UserContext";

type PhysicalQueueContextType = {
  physicalQueue: PhysicalQueue;
  getPhysicalQueue: any;
  leaveQueue: any;
};

export const PhysicalQueueContext =
  // @ts-ignore
  createContext<PhysicalQueueContextType>(null);

export const PhysicalQueueProvider: FC = ({ children }) => {
  const physicalQueueAPI = new PhysicalQueueAPI();

  const userContext = useContext(UserContext);

  const [physicalQueue, setPhysicalQueue] = useState<PhysicalQueue>({
    name: "",
    description: "",
    id: 0,
  });
  const navigator = useNavigation();

  const getPhysicalQueue = async (usersToQueuesId: number | null) => {
    try {
      const response = await physicalQueueAPI.getPhysicalQueue(usersToQueuesId);
      console.log(response);
      setPhysicalQueue(response);
    } catch (error) {
      // @ts-ignore
      navigator.navigate("Home");
    }
  };
  const leaveQueue = async (userId: number) => {
    await physicalQueueAPI.leaveQueue(userId);
    // @ts-ignore
    navigator.navigate("Home");
  };
  const ctx: PhysicalQueueContextType = {
    physicalQueue: physicalQueue,
    getPhysicalQueue: (usersToQueuesId: number | null) =>
      getPhysicalQueue(usersToQueuesId),
    leaveQueue: (userId: number, usersToQueuesId: number) => leaveQueue(userId),
  };
  return (
    <PhysicalQueueContext.Provider value={ctx}>
      {children}
    </PhysicalQueueContext.Provider>
  );
};
