import { createContext, FC, useState } from "react";
import { Queue } from "../Models/Queue";
type ModalsContextType = {
  isAddQueueModalOpen: boolean;
  isDeleteQueueModalOpen: boolean;
  isViewQueueModalOpen: boolean;
  isEditQueueModalOpen: boolean;
  queue: Queue;
  setIsAddQueueModalOpen: any;
  setIsDeleteQueueModalOpen: any;
  setIsViewQueueModalOpen: any;
  setIsEditQueueModalOpen: any;
  setQueue: any;
};
// @ts-ignore
export const ModalsContext = createContext<ModalsContextType>(null);

export const ModalsProvider: FC = ({ children }) => {
  const [isAddQueueModalOpen, setIsAddQueueModalOpen] = useState(false);
  const [isDeleteQueueModalOpen, setIsDeleteQueueModalOpen] = useState(false);
  const [isViewQueueModalOpen, setIsViewQueueModalOpen] = useState(false);
  const [isEditQueueModalOpen, setIsEditQueueModalOpen] = useState(false);
  const [queue, setQueue] = useState<Queue>({
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
    isViewQueueModalOpen: isViewQueueModalOpen,
    isEditQueueModalOpen: isEditQueueModalOpen,
    setIsDeleteQueueModalOpen: setIsDeleteQueueModalOpen,
    setIsViewQueueModalOpen: setIsViewQueueModalOpen,
    setIsEditQueueModalOpen: setIsEditQueueModalOpen,
    queue: queue,
    setQueue: setQueue,
  };
  return (
    <ModalsContext.Provider value={ctx}>{children}</ModalsContext.Provider>
  );
};
