import Edit from "@mui/icons-material/Edit";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Queue } from "../Models/Queue";
import QueueAPI from "./API/QueueAPI";
import { ModalsContext } from "./ModalsContext";

type QueueContextType = {
  queueList: Queue[];
  getQueues: any;
  addQueue: any;
  deleteQueue: any;
  editQueue: any;
};

// @ts-ignore
export const QueueContext = createContext<QueueContextType>(null);

export const QueueProvider: FC = ({ children }) => {
  const queueAPI = new QueueAPI();
  const [queueList, setQueueList] = useState<Queue[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      getQueues();
    };
    fetch().then();
  }, []);
  const getQueues = async () => {
    try {
      const response = await queueAPI.getQueue();
      setQueueList(response.$values);
    } catch (error) {
      navigate("Login");
    }
  };
  const addQueue = async (queue: Queue) => {
    const response = await queueAPI.addQueue(queue);
    if (response) {
      getQueues();
      return true;
    } else return false;
  };
  const editQueue = async (queue: Queue) => {
    console.log(queue);
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
    getQueues: () => getQueues(),
    editQueue: (queue: Queue) => editQueue(queue),
  };
  return <QueueContext.Provider value={ctx}>{children}</QueueContext.Provider>;
};
