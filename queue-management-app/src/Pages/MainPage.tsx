import {FC, useContext, useEffect, useState} from "react";
import "./PagesStyle.css";
import {UserContext} from "../Context/UserContext";
import {MainPageButtonsFooter} from "../Components/MainPageButtonsFooter";
import Oval from "react-loader-spinner/dist/loader/Oval";


interface MainPageProps {

}

export const MainPage: FC<MainPageProps> = () => {
    const userContext = useContext(UserContext);

    return (
        <>
            {userContext.user.id === 0 ? <Oval color="#00BFFF" height={80} width={80}/> :
                <div>Welcome {userContext.user.firstName} </div>}
        </>
    );
}
