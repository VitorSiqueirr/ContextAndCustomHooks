import { EntriesContext } from "../contexts/contexts/EntriesContext";
import { entriesStorage } from "../infrastructure/entriesStorage";
import { useNotification } from "./useNotification";
import { useViewState } from "./useViewState";
import { useContext } from "react";

export const useEntries = () => {
  const { showNotification } = useNotification();
  const { goToDashboard } = useViewState();
  const context = useContext(EntriesContext);

  if (context === undefined) {
    throw new Error("useEntries must be used within a EntriesProvider");
  }

  const { entries, setEntries } = context;

  const createEntry = (entryIntent) => {
    setEntries((entries) => {
      const updatedEntries = [
        ...entries,
        {
          id: (Math.random() * 10).toString(),
          ...entryIntent,
        },
      ];

      entriesStorage.store(updatedEntries);
      showNotification("created");

      return updatedEntries;
    });

    goToDashboard();
  };

  const deleteEntry = (id) => {
    setEntries((entries) => {
      const initialLength = entries.length;
      const updatedEntries = entries.filter((entry) => entry.id !== id);

      if (initialLength > updatedEntries.length) {
        entriesStorage.store(updatedEntries);
        showNotification("deleted");
      }

      return updatedEntries;
    });
  };

  const editEntry = (id, entryIntent) => {
    const updatedEntry = {
      id,
      ...entryIntent,
    };

    setEntries((entries) => {
      const updatedEntries = [...entries];
      const updatedEntryIndex = updatedEntries.findIndex(
        (entry) => entry.id === id
      );

      if (updatedEntryIndex !== -1) {
        updatedEntries[updatedEntryIndex] = updatedEntry;
        entriesStorage.store(updatedEntries);
        showNotification("edited");
      }

      return updatedEntries;
    });

    goToDashboard();
  };

  return {
    entries,
    createEntry,
    editEntry,
    deleteEntry,
  };
};
