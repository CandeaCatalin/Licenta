import { createContext, FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Queue } from "../Models/Queue";
import QueueAPI from "./API/QueueAPI";
import { ModalsContext } from "./ModalsContext";

type QueueContextType = {
  queueList: Queue[];
  addQueue: any;
  deleteQueue: any;
};

// @ts-ignore
export const QueueContext = createContext<QueueContextType>(null);

export const QueueProvider: FC = ({ children }) => {
  const queueAPI = new QueueAPI();
  const modalsContext = useContext(ModalsContext);
  const [queueList, setQueueList] = useState<Queue[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await queueAPI.getQueue();
        setQueueList(response.$values);
      } catch (error) {
        navigate("Login");
      }
    };
    fetch().then();
  }, []);
  const addQueue = async (queue: Queue) => {
    const response = await queueAPI.addQueue(queue);
    if (response) {
      return true;
    } else return false;
  };
  const deleteQueue = async (queueId: number) => {
    const response = await queueAPI.deleteQueue(queueId);

    if (response) {
      const newList = queueList.filter((queue) => queue.id !== queueId);
      setQueueList(newList);
      return true;
    } else return false;
  };
  const ctx: QueueContextType = {
    queueList: queueList,
    addQueue: (queue: Queue) => addQueue(queue),
    deleteQueue: (queueId: number) => deleteQueue(queueId),
  };
  return <QueueContext.Provider value={ctx}>{children}</QueueContext.Provider>;
};
