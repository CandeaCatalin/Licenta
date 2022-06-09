import { FC, useContext, useEffect, useState } from "react";
import "./PagesStyle.css";
import { Loading } from "../Components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { PhysicalQueueAPI } from "../Context/API/PhysicalQueueAPI";
import { PhysicalQueue } from "../Models/PhysicalQueue";
import { UserContext } from "../Context/UserContext";
import { QueueContext } from "../Context/QueueContext";

interface OperateQueuePageProps {}

export const OperateQueuePage: FC<OperateQueuePageProps> = () => {
  const params = useParams();
  const physicalQueueAPI = new PhysicalQueueAPI();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const queueContext = useContext(QueueContext);
  const [nextUsername, setNextUsername] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(true);
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
          await getNextUserName();

          await new Promise((res) => setTimeout(res, 1000));
          setIsLoaded(true);
        } catch (error) {
          navigate("ErrorPage");
        }
      }
    };
    fetch().then();
  }, []);
  useEffect(() => {
    const fetch = async () => {
      setInterval(async function () {
        await getNextUserName();
      }, 10000);
    };
    fetch().then();
  }, []);
  const buttonPress = async () => {
    setIsSubmitted(true);
    await queueContext.passUserInQueue(physicalQueue.id);
    if ((await getNextUserName()) !== 0) {
      setIsSubmitted(false);
    }
  };
  const getNextUserName = async () => {
    if (typeof params.id === "string") {
      const name = await physicalQueueAPI.getNextUser(parseInt(params.id));

      await setNextUsername(name);
      return name.length;
    }
  };
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
                Queue: {physicalQueue.queue?.name}
              </div>
              <div className="physical-queue-description">
                Location: {physicalQueue.name}
              </div>
              <div className="physical-queue-description">
                Description: {physicalQueue.description}
              </div>
              <div className="physical-queue-description">
                Next: {nextUsername}
              </div>
              <button
                type="button"
                className="operate-btn big-btn button-modal-prim"
                onClick={() => buttonPress()}
                disabled={isSubmitted && nextUsername === ""}
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
