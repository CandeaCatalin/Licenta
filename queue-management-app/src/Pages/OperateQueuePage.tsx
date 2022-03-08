import { FC, useContext, useEffect, useState } from "react";
import "./PagesStyle.css";
import { UserContext } from "../Context/UserContext";
import { Loading } from "../Components/Loading";
import { QueueContext } from "../Context/QueueContext";
import { Modals } from "../Components/Modals";
import { ModalsContext } from "../Context/ModalsContext";
import { QueueListElement } from "../Components/QueueListElement";
import { QueueListHeader } from "../Components/QueueListHeader";
import { useParams } from "react-router-dom";

interface OperateQueuePageProps {}

export const OperateQueuePage: FC<OperateQueuePageProps> = () => {
  let params = useParams();
  useEffect(() => {
    console.log(params);
  }, []);
  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Test
        {params.id}
        {params.name}
      </div>
    </>
  );
};
