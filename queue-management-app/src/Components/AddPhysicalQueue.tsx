import { FC, useEffect, useState } from "react";
import { PhysicalQueue } from "../Models/PhysicalQueue";

interface AddPhysicalQueueProps {
  onNameChange: any;
  onDescriptionChange: any;
  onRemove: any;
  index: number;
  physicalQueue?: PhysicalQueue;
}

export const AddPhysicalQueue: FC<AddPhysicalQueueProps> = ({
  onNameChange,
  onDescriptionChange,
  onRemove,
  index,
  physicalQueue,
}) => {
  const [name, setName] = useState(physicalQueue?.name);
  const [description, setDescription] = useState(physicalQueue?.description);
  const updateName = (value: string) => {
    setName(value);
    onNameChange(index, value);
  };
  const updateDescription = (value: string) => {
    setDescription(value);
    onDescriptionChange(index, value);
  };
  useEffect(() => {
    setName(physicalQueue?.name);
    setDescription(physicalQueue?.description);
  }, [physicalQueue]);
  return (
    <>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div className="form-floating mb-3" style={{ width: "100%" }}>
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            style={{ borderRadius: "10px" }}
            value={name}
            onChange={(event) => {
              updateName(event.target.value);
            }}
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
        <div
          className="form-floating mb-3"
          style={{ marginLeft: "20px", width: "100%" }}
        >
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            style={{ borderRadius: "10px" }}
            value={description}
            onChange={(event) => {
              updateDescription(event.target.value);
            }}
          />
          <label htmlFor="floatingInput">Description</label>
        </div>
        <div
          className="form-floating mb-3"
          style={{ marginLeft: "20px", width: "25%" }}
        >
          <div
            className="delete-physical-queue"
            onClick={() => {
              onRemove(physicalQueue?.id);
            }}
          >
            <div className="delete-logo">-</div>
          </div>
        </div>
      </div>
    </>
  );
};
