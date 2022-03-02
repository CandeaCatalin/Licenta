import { createContext, FC, useState } from "react";
type ModalsContextType = {
  isAddQueueModalOpen: boolean;
  setIsAddQueueModalOpen: any;

};
// @ts-ignore
export const ModalsContext = createContext<ModalsContextType>(null);

export const ModalsProvider: FC = ({ children }) => {
  const [isAddQueueModalOpen, setIsAddQueueModalOpen] = useState(false);
  const ctx: ModalsContextType = {
    isAddQueueModalOpen: isAddQueueModalOpen,
    setIsAddQueueModalOpen: setIsAddQueueModalOpen,
  };
  return (
    <ModalsContext.Provider value={ctx}>{children}</ModalsContext.Provider>
  );
};
