import {FC, useContext, useEffect, useState} from "react";
import "./PagesStyle.css";
import {UserContext} from "../Context/UserContext";
import {MainPageButtonsFooter} from "../Components/MainPageButtonsFooter";


interface MainPageProps {

}

export const MainPage: FC<MainPageProps> = () => {
    const userContext = useContext(UserContext);
    const [selectedPage, setSelectedPage] = useState("");
    useEffect(() => {
        if (userContext.user.queueId === null) {
            setSelectedPage("Information");
        } else if (userContext.user.queueRole === "Owner") {
            setSelectedPage("QueueOwner");
        } else if (userContext.user.queueRole === "Member") {
            setSelectedPage("QueueMember");
        }
    }, [userContext.user]);
    const changePage = (newPage: string) => {
        setSelectedPage(newPage);
    };
    const joinQueue = () => {
        changePage("QueueMember");
    }
    const createQueue = () => {
        changePage("QueueOwner");
    }
    return (
        <>
            {selectedPage === "Information" && (
                <div>
                    <h1>{userContext.user.email}</h1>
                    <h1>{userContext.user.firstName}</h1>
                    <h1>{userContext.user.lastName}</h1>
                    <MainPageButtonsFooter joinQueue={joinQueue} createQueue={createQueue}/>
                </div>
            )}
            {selectedPage === "QueueOwner" && (
                <div>
                    QueueOwner
                </div>
            )}{selectedPage === "QueueMember" && (
            <div>
                QueueMember
            </div>
        )}


        </>
    );
}
