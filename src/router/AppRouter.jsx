import { EditEntryForm } from "../components/Forms/EditEntryForm";
import { NewEntryForm } from "../components/Forms/NewEntryForm";
import { useViewState } from "../hooks/useViewState";
import { Dashboard } from "../components/Dashboard/Dashboard";

export const AppRouter = () => {
  const { viewState } = useViewState();

  const componentMap = {
    Dashboard: Dashboard,
    "New Entry": NewEntryForm,
    "Edit Entry": EditEntryForm,
  };

  const Component = componentMap[viewState.name];

  return (
    <>
      <Component />
    </>
  );
};
