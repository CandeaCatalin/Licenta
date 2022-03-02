import {FC} from "react";
import Oval from "react-loader-spinner/dist/loader/Oval";


interface LoadingProps {

}

export const Loading: FC<LoadingProps> = ({}) => {
    return (<Oval color="#000000" height={80} width={80} secondaryColor="white"/>);
}
