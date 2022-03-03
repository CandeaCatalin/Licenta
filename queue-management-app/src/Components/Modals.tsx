import { FC, useContext } from "react";
import { ModalsContext } from "../Context/ModalsContext";
import { AddQueueModal } from "./Modals/AddQueueModal";

interface ModalsProps {}

export const Modals: FC<ModalsProps> = ({}) => {
  const modalsContext = useContext(ModalsContext);
  return (
    <>
      {modalsContext.isAddQueueModalOpen && (
        <div
          style={{
            zIndex: 500,
            position: "absolute",
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0 ,0, 0.3)",
          }}
        >
          {modalsContext.isAddQueueModalOpen && (
            <div>
              <AddQueueModal
                onClose={() => modalsContext.setIsAddQueueModalOpen(false)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
