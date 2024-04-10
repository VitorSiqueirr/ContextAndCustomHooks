import { useContext } from "react";
import { ViewStateContext } from "../contexts/contexts/ViewStateContext";

export const useViewState = () => {
  const context = useContext(ViewStateContext);

  if (context === undefined) {
    throw new Error("useViewState must be used within a ViewStateProvider");
  }

  const { viewState, setViewState } = context;

  const goToDashboard = () =>
    setViewState({
      name: "Dashboard",
    });

  const goToNewEntry = () =>
    setViewState({
      name: "New Entry",
    });

  const goToEditEntry = (id) =>
    setViewState({
      name: "Edit Entry",
      id,
    });

  return { viewState, goToDashboard, goToNewEntry, goToEditEntry };
};
