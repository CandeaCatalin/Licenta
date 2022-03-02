import {FC, useContext, useEffect, useState} from "react";
import "./PagesStyle.css";
import {UserContext} from "../Context/UserContext";
import {Loading} from "../Components/Loading";
import {QueueContext} from "../Context/QueueContext";
import {Modals} from "../Components/Modals";
import {ModalsContext} from "../Context/ModalsContext";


interface MainPageProps {

}

export const MainPage: FC<MainPageProps> = () => {
    const userContext = useContext(UserContext);
    const queueContext = useContext(QueueContext);
    const modalContext = useContext(ModalsContext);
    const [isLoading, setIsLoading] = useState(true);
    const [areQueues, setAreQueues] = useState(false);
    useEffect(() => {
        if (userContext.user.id === 0) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [userContext.user]);
    useEffect(() => {
        if (queueContext.queueList.length === 0) {
            setAreQueues(false);
        } else {
            setAreQueues(true);
        }
    }, [queueContext.queueList]);
    return (
        <>
            <Modals/>
            <div style={{
                height: "100%", display: "flex", alignItems: "center",
                justifyContent: "center"
            }}>
                {isLoading ?
                    <Loading/> :
                    !areQueues ? <div>
                            <button onClick={()=>modalContext.setIsAddQueueModalOpen(true)}>Add first queue</button>
                        </div> :

                        <div className={"box queue-list-container"}>Welcome {userContext.user.firstName} </div>
                }

            </div>
        </>
    );
}
