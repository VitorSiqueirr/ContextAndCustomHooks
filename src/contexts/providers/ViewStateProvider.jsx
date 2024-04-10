import { useState } from "react";
import { ViewStateContext } from "../contexts/ViewStateContext";

export const ViewStateProvider = ({ children }) => {
  const [viewState, setViewState] = useState({
    name: "Dashboard",
  });

  return (
    <ViewStateContext.Provider
      value={{
        viewState,
        setViewState,
      }}
    >
      {children}
    </ViewStateContext.Provider>
  );
};
