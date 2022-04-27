import { FC, useContext, useEffect, useState } from "react";
import { AddPhysicalQueue } from "../AddPhysicalQueue";
import { Queue } from "../../Models/Queue";
import { PhysicalQueue } from "../../Models/PhysicalQueue";
import { QueueContext } from "../../Context/QueueContext";
import { ModalFooter } from "./ModalFooter";

import { toast } from "react-hot-toast";

interface AddQueueModalProps {
  onClose: any;
}

export const AddQueueModal: FC<AddQueueModalProps> = ({ onClose }) => {
  const queueContext = useContext(QueueContext);

  const [addQueue, setAddQueue] = useState<Queue>({
    name: "",
    description: "",
    id: 0,
    physicalQueues: [],
    createdTime: new Date(),
  });
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [physicalQueues, setPhysicalQueues] = useState<PhysicalQueue[]>([]);
  useEffect(() => {
    if (
      addQueue.name === "" ||
      addQueue.description === "" ||
      physicalQueues.length === 0
    ) {
    } else {
      setIsSubmitted(false);
    }
  }, [addQueue, physicalQueues]);

  const checkForm = () => {
    let isFormValid = true;
    if (addQueue.name === "") {
      toast.error("Name must be populated");
      isFormValid = false;
    }
    if (addQueue.description === "") {
      toast.error("Description must be populated");
      isFormValid = false;
    }
    physicalQueues.forEach((pq) => {
      if (pq.name === "") {
        toast.error("Location name must be populated");
        isFormValid = false;
      }
      if (pq.description === "") {
        toast.error("Location description must be populated");
        isFormValid = false;
      }
      if (isFormValid === false) {
        return isFormValid;
      }
    });
    return isFormValid;
  };
  const addNewPhysicalQueue = () => {
    setPhysicalQueues([
      ...physicalQueues,
      {
        name: "",
        description: "",
        id: physicalQueues.length,
        queueId: addQueue.id,
        createdTime: new Date(),
        estimatedTime: new Date(),
      },
    ]);
  };
  const updatePhysicalQueueName = (index: number, newName: string) => {
    const list = physicalQueues;
    list.map((item, i) => {
      if (i === index) {
        item.name = newName;
      }
    });
    setPhysicalQueues(list);
  };
  const updatePhysicalQueueDescription = (
    index: number,
    newDescription: string
  ) => {
    const list = physicalQueues;
    list.map((item, i) => {
      if (i === index) {
        item.description = newDescription;
      }
    });
    setPhysicalQueues(list);
  };
  const removePhysicalQueue = (index: number) => {
    var list = physicalQueues;
    list = list.filter((queue) => queue.id !== index);
    setPhysicalQueues(list);
  };
  const onSubmit = async () => {
    const list = addQueue;
    list.physicalQueues = physicalQueues;

    if (checkForm()) {
      setIsSubmitted(true);
      if (queueContext.addQueue(list)) {
        onClose();
      }
      setIsSubmitted(false);
    }
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
                Add Queue
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
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  style={{ borderRadius: "10px" }}
                  placeholder="Example: Admitere AC"
                  onChange={(e) =>
                    setAddQueue({ ...addQueue, name: e.target.value })
                  }
                />
                <label htmlFor="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  id="floatingInput"
                  style={{ borderRadius: "10px", height: "120px" }}
                  rows={5}
                  maxLength={200}
                  cols={100}
                  onChange={(e) =>
                    setAddQueue({ ...addQueue, description: e.target.value })
                  }
                />
                <label htmlFor="floatingInput">Description</label>
              </div>
              <h5 className="modal-title" id="deleteModalLabel">
                Physical Location
              </h5>
              {physicalQueues.map((item, index) => {
                return (
                  <AddPhysicalQueue
                    key={index}
                    onNameChange={(index: number, text: string) =>
                      updatePhysicalQueueName(index, text)
                    }
                    onDescriptionChange={(index: number, text: string) =>
                      updatePhysicalQueueDescription(index, text)
                    }
                    onRemove={(index: number) => removePhysicalQueue(index)}
                    index={index}
                    physicalQueue={item}
                  />
                );
              })}
              <div>
                <button
                  onClick={() => addNewPhysicalQueue()}
                  className="btn button-modal-prim"
                  style={{ marginTop: "20px" }}
                >
                  <span style={{ fontWeight: "bold" }}>Add new location</span>
                </button>
              </div>
            </div>
            <ModalFooter
              onClose={onClose}
              isSubmitted={isSubmitted}
              onSubmit={onSubmit}
              mainButton={"Add Queue"}
              secondButton={"Cancel"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
