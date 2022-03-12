import { FC, useContext } from "react";
import { ModalsContext } from "../Context/ModalsContext";
import { AddQueueModal } from "./Modals/AddQueueModal";
import { DeleteQueueModal } from "./Modals/DeleteQueueModal";
import { EditQueueModal } from "./Modals/EditQueueModal";
import { ViewQueueModal } from "./Modals/ViewQueueModal";

interface ModalsProps {}

export const Modals: FC<ModalsProps> = ({}) => {
  const modalsContext = useContext(ModalsContext);
  return (
    <>
      {(modalsContext.isAddQueueModalOpen ||
        modalsContext.isDeleteQueueModalOpen ||
        modalsContext.isViewQueueModalOpen ||
        modalsContext.isEditQueueModalOpen) && (
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
                queue={modalsContext.queue}
              />
            </div>
          )}
          {modalsContext.isViewQueueModalOpen && (
            <div>
              <ViewQueueModal
                onClose={() => modalsContext.setIsViewQueueModalOpen(false)}
                queue={modalsContext.queue}
              />
            </div>
          )}
          {modalsContext.isEditQueueModalOpen && (
            <div>
              <EditQueueModal
                onClose={() => modalsContext.setIsEditQueueModalOpen(false)}
                queue={modalsContext.queue}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
