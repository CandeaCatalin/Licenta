import { FC, useContext, useEffect, useState } from "react";
import "./PagesStyle.css";
import { UserContext } from "../Context/UserContext";
import { Loading } from "../Components/Loading";
import { QueueContext } from "../Context/QueueContext";
import { Modals } from "../Components/Modals";
import { ModalsContext } from "../Context/ModalsContext";
import { QueueListElement } from "../Components/QueueListElement";
import { QueueListHeader } from "../Components/QueueListHeader";

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = () => {
  const userContext = useContext(UserContext);
  const queueContext = useContext(QueueContext);
  const modalContext = useContext(ModalsContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userContext.user.id === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [userContext.user]);

  return (
    <>
      <Modals />
      <div
        style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
      >
        {isLoading ? (
          ""
        ) : (
          <button
            type="button"
            className="operate-btn button-modal-prim"
            style={{ fontSize: "20px" }}
            onClick={() => userContext.logOut()}
          >
            <span style={{ fontWeight: "bold" }}>Logout</span>
          </button>
        )}
      </div>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="box queue-list-box">
              <QueueListHeader />

              <div className={"queue-list-container"}>
                {queueContext.queueList.map((item, index) => {
                  return <QueueListElement queue={item} key={item.id} />;
                })}
              </div>
            </div>
            <div
              className="add-queue-button"
              onClick={() => modalContext.setIsAddQueueModalOpen(true)}
            >
              <div className="addition-logo">+</div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
