import { useNavigation } from "@react-navigation/native";
import { createContext, FC, useState } from "react";
import { PhysicalQueue } from "../Models/PhysicalQueue";
import { PhysicalQueueAPI } from "./API/PhysicalQueueAPI";
type PhysicalQueueContextType = {
  physicalQueue: PhysicalQueue;
  estimatedTime: String;
  getPhysicalQueue: any;
  leaveQueue: any;
};

export const PhysicalQueueContext =
  // @ts-ignore
  createContext<PhysicalQueueContextType>(null);

export const PhysicalQueueProvider: FC = ({ children }) => {
  const physicalQueueAPI = new PhysicalQueueAPI();

  const [physicalQueue, setPhysicalQueue] = useState<PhysicalQueue>({
    name: "",
    description: "",
    id: 0,
  });
  const [estimatedTime, setEstimatedTime] = useState("");
  const navigator = useNavigation();

  const getPhysicalQueue = async () => {
    try {
      const response = await physicalQueueAPI.getPhysicalQueue();
      if (response !== null) {
        setPhysicalQueue(response.physicalQueue);
        setEstimatedTime(response.estimatedTime);
      } else {
        throw "Error";
      }
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
    estimatedTime: estimatedTime,
    getPhysicalQueue: () => getPhysicalQueue(),
    leaveQueue: (userId: number, usersToQueuesId: number) => leaveQueue(userId),
  };
  return (
    <PhysicalQueueContext.Provider value={ctx}>
      {children}
    </PhysicalQueueContext.Provider>
  );
};
