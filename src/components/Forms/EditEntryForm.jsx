import { EntryForm } from "./EntryForm";
import { useKeyPress } from "../../hooks/useKeyPress";
import { useTranslation } from "../../hooks/useTranslation";
import { useViewState } from "../../hooks/useViewState";
import { useEntries } from "../../hooks/useEntries";

export const EditEntryForm = () => {
  const { entries, deleteEntry, editEntry } = useEntries();
  const { viewState, goToDashboard } = useViewState();
  const { t } = useTranslation();

  const entry = entries.find((entry) => entry.id === viewState.id);

  useKeyPress((event) => {
    if (event.key === "Delete") {
      deleteEntry(entry.id);
      goToDashboard();
    }
  });

  return (
    <EntryForm
      title={t("editEntryFormTitle")}
      entry={entry}
      onSubmit={(entryIntent) => editEntry(viewState.id, entryIntent)}
    />
  );
};
