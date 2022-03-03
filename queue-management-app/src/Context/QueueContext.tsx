import { createContext, FC, useContext, useEffect, useState } from "react";
import { QueueManagementAPI } from "./API";
import { Queue } from "../Models/Queue";
import { ModalsContext } from "./ModalsContext";

type QueueContextType = {
  queueList: Queue[];
  addQueue: any;
};

// @ts-ignore
export const QueueContext = createContext<QueueContextType>(null);

export const QueueProvider: FC = ({ children }) => {
  const QueueManagementApi = new QueueManagementAPI();
  const modalsContext = useContext(ModalsContext);
  const [queueList, setQueueList] = useState<Queue[]>([]);

  const addQueue = async (queue: Queue) => {
    const response = await QueueManagementApi.addQueue(queue);
    if (response) {
      return true;
    } else return false;
  };

  const ctx: QueueContextType = {
    queueList: queueList,
    addQueue: (queue: Queue) => addQueue(queue),
  };
  return <QueueContext.Provider value={ctx}>{children}</QueueContext.Provider>;
};
