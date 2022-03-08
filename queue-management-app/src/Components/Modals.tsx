import { FC, useContext } from "react";
import { ModalsContext } from "../Context/ModalsContext";
import { AddQueueModal } from "./Modals/AddQueueModal";
import { DeleteQueueModal } from "./Modals/DeleteQueueModal";
import { ViewQueueModal } from "./Modals/ViewQueueModal";

interface ModalsProps {}

export const Modals: FC<ModalsProps> = ({}) => {
  const modalsContext = useContext(ModalsContext);
  return (
    <>
      {(modalsContext.isAddQueueModalOpen ||
        modalsContext.isDeleteQueueModalOpen ||
        modalsContext.isViewQueueModalOpen) && (
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
          {modalsContext.isDeleteQueueModalOpen && (
            <div>
              <DeleteQueueModal
                onClose={() => modalsContext.setIsDeleteQueueModalOpen(false)}
                queue={modalsContext.deletedQueue}
              />
            </div>
          )}
          {modalsContext.isViewQueueModalOpen && (
            <div>
              <ViewQueueModal
                onClose={() => modalsContext.setIsViewQueueModalOpen(false)}
                queue={modalsContext.viewedQueue}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
