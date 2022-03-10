import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PhysicalQueue } from "../Models/PhysicalQueue";

interface PhysicalQueueElementProps {
  physicalQueue: PhysicalQueue;
  queueName: string;
}

export const PhysicalQueueElement: FC<PhysicalQueueElementProps> = (props) => {
  const navigate = useNavigate();
  const operateQueue = () => {
    navigate("queue");
  };
  return (
    <tr>
      <td style={{ textAlign: "center" }}>{props.physicalQueue.name}</td>
      <td style={{ textAlign: "center" }}>{props.physicalQueue.description}</td>
      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link
          to={`/queue/${props.physicalQueue.id}-${props.queueName}`}
          key={props.physicalQueue.id}
        >
          <button
            type="button"
            className="btn button-modal-prim"
            onClick={() => operateQueue()}
          >
            <span style={{ fontWeight: "bold" }}>Operate</span>
          </button>
        </Link>
      </td>
    </tr>
  );
};
