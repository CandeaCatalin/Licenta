import { useNavigation } from "@react-navigation/native";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { Queue } from "../Models/Queue";
import QueueAPI from "./API/QueueAPI";

type QueueContextType = {
  queueList: Queue[];
  getQueues: any;
  addUserInQueue: any;
};

// @ts-ignore
export const QueueContext = createContext<QueueContextType>(null);

export const QueueProvider: FC = ({ children }) => {
  const queueAPI = new QueueAPI();
  const [queueList, setQueueList] = useState<Queue[]>([]);
  useEffect(() => {
    const fetch = async () => {
      await getQueues();
    };
    fetch().then();
  }, []);
  const navigator = useNavigation();
  useEffect(() => {
    const fetch = async () => {
      setInterval(async function () {
        await getQueues();
      }, 60000);
    };
    fetch().then();
  }, []);
  const getQueues = async () => {
    try {
      const response = await queueAPI.getQueue();
      setQueueList(response);
    } catch (error) {
      // @ts-ignore
      navigator.navigate("Login");
    }
  };
  const addUserInQueue = async (userId: number, queueId: number) => {
    try {
      const response = await queueAPI.addUserInQueue(userId, queueId);

      if (response) {
        // @ts-ignore
        navigator.navigate("Queue");
      }
    } catch (error) {
      showMessage({
        message: "An error was encountered!",
        type: "warning",
      });
    }
  };
  const ctx: QueueContextType = {
    queueList: queueList,
    getQueues: () => getQueues(),
    addUserInQueue: (userId: number, queueId: number) =>
      addUserInQueue(userId, queueId),
  };
  return <QueueContext.Provider value={ctx}>{children}</QueueContext.Provider>;
};
