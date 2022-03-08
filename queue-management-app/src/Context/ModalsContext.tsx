import { createContext, FC, useState } from "react";
import { Queue } from "../Models/Queue";
type ModalsContextType = {
  isAddQueueModalOpen: boolean;
  isDeleteQueueModalOpen: boolean;
  isViewQueueModalOpen: boolean;
  deletedQueue: Queue;
  viewedQueue: Queue;
  setIsAddQueueModalOpen: any;
  setIsDeleteQueueModalOpen: any;
  setIsViewQueueModalOpen: any;
  setDeletedQueue: any;
  setViewedQueue: any;
};
// @ts-ignore
export const ModalsContext = createContext<ModalsContextType>(null);

export const ModalsProvider: FC = ({ children }) => {
  const [isAddQueueModalOpen, setIsAddQueueModalOpen] = useState(false);
  const [isDeleteQueueModalOpen, setIsDeleteQueueModalOpen] = useState(false);
  const [isViewQueueModalOpen, setIsViewQueueModalOpen] = useState(false);
  const [deletedQueue, setDeletedQueue] = useState<Queue>({
    name: "",
    description: "",
    createdTime: new Date(),
    id: 0,
    physicalQueues: [],
  });
  const [viewedQueue, setViewedQueue] = useState<Queue>({
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
    setIsDeleteQueueModalOpen: setIsDeleteQueueModalOpen,
    setIsViewQueueModalOpen: setIsViewQueueModalOpen,
    deletedQueue: deletedQueue,
    setDeletedQueue: setDeletedQueue,
    viewedQueue: viewedQueue,
    setViewedQueue: setViewedQueue,
  };
  return (
    <ModalsContext.Provider value={ctx}>{children}</ModalsContext.Provider>
  );
};
