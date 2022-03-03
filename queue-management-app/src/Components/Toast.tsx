import { FC } from "react";
import { Toaster } from "react-hot-toast";

export const Toast: FC = () => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "white",
            },
          },
          error: {
            duration: 3000,
            theme: {
              primary: "red",
              secondary: "white",
            },
          },
        }}
      />
    </>
  );
};
