import { createContext, FC, useState } from "react";
import { Queue } from "../Models/Queue";
type ModalsContextType = {
  isAddQueueModalOpen: boolean;
  isDeleteQueueModalOpen: boolean;
  deletedQueue: Queue;
  setIsAddQueueModalOpen: any;
  setIsDeleteQueueModalOpen: any;
  setDeletedQueue: any;
};
// @ts-ignore
export const ModalsContext = createContext<ModalsContextType>(null);

export const ModalsProvider: FC = ({ children }) => {
  const [isAddQueueModalOpen, setIsAddQueueModalOpen] = useState(false);
  const [isDeleteQueueModalOpen, setIsDeleteQueueModalOpen] = useState(false);
  const [deletedQueue, setDeletedQueue] = useState<Queue>({
    name: "",
    description: "",
    createdTime: new Date(),
    id: 0,
    physicalQueues: [],
  });
  const ctx: ModalsContextType = {
    isAddQueueModalOpen: isAddQueueModalOpen,
    setIsAddQueueModalOpen: setIsAddQueueModalOpen,
    isDeleteQueueModalOpen: isDeleteQueueModalOpen,
    setIsDeleteQueueModalOpen: setIsDeleteQueueModalOpen,
    deletedQueue: deletedQueue,
    setDeletedQueue: setDeletedQueue,
  };
  return (
    <ModalsContext.Provider value={ctx}>{children}</ModalsContext.Provider>
  );
};
