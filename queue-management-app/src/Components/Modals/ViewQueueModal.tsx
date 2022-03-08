import { FC, useContext, useEffect, useState } from "react";
import { QueueContext } from "../../Context/QueueContext";
import { Queue } from "../../Models/Queue";
import { PhysicalQueueElement } from "../PhysicalQueueElement";
import { QueueListElement } from "../QueueListElement";

interface ViewQueueModalProps {
  onClose: any;
  queue: any;
}
export const ViewQueueModal: FC<ViewQueueModalProps> = (props) => {
  const [queue, setQueue] = useState<Queue>();
  useEffect(() => {
    const newQueue: Queue = {
      name: props.queue.name,
      description: props.queue.description,
      createdTime: props.queue.createdTime,
      id: props.queue.id,
      physicalQueues: props.queue.physicalQueues.$values,
    };
    setQueue(newQueue);
  }, [props.queue]);
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
                {props.queue.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={props.onClose}
              />
            </div>
            <div
              className="modal-body"
              style={{ maxHeight: "50vh", overflow: "auto" }}
            >
              <h5>Description</h5>
              <hr />
              <span>{props.queue.description}</span>
              <hr />
              <h5>Queue locations</h5>
              <hr />
              {queue?.physicalQueues.length !== 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Name
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Description
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {queue?.physicalQueues.length !== 0
                      ? queue?.physicalQueues.map((item, index) => {
                          return (
                            <PhysicalQueueElement
                              key={index}
                              physicalQueue={item}
                            />
                          );
                        })
                      : ""}
                  </tbody>
                </table>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
