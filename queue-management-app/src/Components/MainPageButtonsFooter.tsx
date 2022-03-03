import { FC } from "react";

interface MainPageButtonsFooterProps {
  joinQueue: any;
  createQueue: any;
}

export const MainPageButtonsFooter: FC<MainPageButtonsFooterProps> = ({
  joinQueue,
  createQueue,
}) => {
  return (
    <div className={"footer-menu"}>
      <button
        className={"footer-button"}
        onClick={() => {
          joinQueue();
        }}
      >
        Join a Queue
      </button>
      <button
        className={"footer-button"}
        onClick={() => {
          createQueue();
        }}
      >
        Create a Queue
      </button>
    </div>
  );
};
