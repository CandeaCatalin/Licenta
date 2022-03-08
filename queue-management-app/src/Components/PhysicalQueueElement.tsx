import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { PhysicalQueue } from "../Models/PhysicalQueue";

interface PhysicalQueueElement {
  physicalQueue: PhysicalQueue;
}

export const PhysicalQueueElement: FC<PhysicalQueueElement> = (props) => {
  const navigate = useNavigate();
  const operateQueue = () => {
    navigate("queue");
  };
  return (
    <tr>
      <td style={{ textAlign: "center" }}>{props.physicalQueue.name}</td>
      <td style={{ textAlign: "center" }}>{props.physicalQueue.description}</td>
      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          className="btn button-modal-prim"
          onClick={() => operateQueue()}
        >
          <span style={{ fontWeight: "bold" }}>Operate</span>
        </button>
      </td>
    </tr>
  );
};
