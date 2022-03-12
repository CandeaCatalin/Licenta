import { FC, useContext, useEffect, useState } from "react";
import "./PagesStyle.css";
import { Loading } from "../Components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { PhysicalQueueAPI } from "../Context/API/PhysicalQueueAPI";
import { PhysicalQueue } from "../Models/PhysicalQueue";
import { UserContext } from "../Context/UserContext";

interface OperateQueuePageProps {}

export const OperateQueuePage: FC<OperateQueuePageProps> = () => {
  const params = useParams();
  const physicalQueueAPI = new PhysicalQueueAPI();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [physicalQueue, setPhysicalQueue] = useState<PhysicalQueue>({
    name: "",
    description: "",
    id: 0,
    createdTime: new Date(),
    estimatedTime: new Date(),
    queueId: 0,
    queue: {
      name: "",
      description: "",
      createdTime: new Date(),
      id: 0,
      physicalQueues: [],
    },
  });
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      if (typeof params.id === "string") {
        try {
          const response = await physicalQueueAPI.getPhysicalQueue(
            parseInt(params.id)
          );

          setPhysicalQueue(response);
          await new Promise((res) => setTimeout(res, 1000));
          setIsLoaded(true);
        } catch (error) {
          navigate("ErrorPage");
        }
      }
    };
    fetch().then();
  }, []);
  const buttonPress = () => {};
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: isLoaded ? "space-between" : "flex-end",
          }}
        >
          {isLoaded ? (
            <button
              type="button"
              className="operate-btn button-modal-prim"
              style={{ fontSize: "20px" }}
              onClick={() => navigate("/")}
            >
              <span style={{ fontWeight: "bold" }}>Back</span>
            </button>
          ) : (
            ""
          )}
          <button
            type="button"
            className="operate-btn button-modal-prim"
            style={{ fontSize: "20px" }}
            onClick={() => userContext.logOut()}
          >
            <span style={{ fontWeight: "bold" }}>Logout</span>
          </button>
        </div>
        )
      </div>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoaded ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="physical-queue-description">
                Queue:{physicalQueue.queue?.name}
              </div>
              <div className="physical-queue-description">
                Location:{physicalQueue.name}
              </div>
              <div className="physical-queue-description">
                Description:{physicalQueue.description}
              </div>
              <div className="physical-queue-description">
                Next: Not Available
              </div>
              <button
                type="button"
                className="operate-btn big-btn button-modal-prim"
                onClick={() => buttonPress()}
              >
                <span style={{ fontWeight: "bold" }}>NEXT</span>
              </button>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};
