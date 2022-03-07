import { FC, useContext, useEffect, useState } from "react";
import { AddPhysicalQueue } from "../AddPhysicalQueue";
import { Queue } from "../../Models/Queue";
import { PhysicalQueue } from "../../Models/PhysicalQueue";
import { QueueContext } from "../../Context/QueueContext";

interface DeleteQueueModalProps {
  onClose: any;
  queue: Queue;
}

export const DeleteQueueModal: FC<DeleteQueueModalProps> = ({
  onClose,
  queue,
}) => {
  const queueContext = useContext(QueueContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async () => {
    setIsSubmitted(true);
    queueContext.deleteQueue(queue.id);
    onClose();
    setIsSubmitted(false);
  };
  return (
    <>
      <div
        id="addQueueModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ position: "relative", top: "20vh" }}
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ borderRadius: "20px" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Delete Queue
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              />
            </div>
            <div
              className="modal-body"
              style={{ maxHeight: "50vh", overflow: "auto" }}
            >
              Are you sure you want to delete{" "}
              <span style={{ fontWeight: "bold" }}>{queue.name}</span>?
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  paddingTop: "20px",
                }}
              >
                <button
                  type="button"
                  className="btn button-modal-sec"
                  data-bs-dismiss="modal"
                  onClick={onClose}
                >
                  <span style={{ fontWeight: "bold" }}>Close</span>
                </button>
                <button
                  type="button"
                  className="btn button-modal-prim"
                  onClick={() => onSubmit()}
                  disabled={isSubmitted}
                >
                  <span style={{ fontWeight: "bold" }}>Delete Queue</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
