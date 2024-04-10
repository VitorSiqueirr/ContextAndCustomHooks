import { useState } from "react";
import { EntriesContext } from "../contexts/EntriesContext";
import { entriesStorage } from "../../infrastructure/entriesStorage";

export const EntriesProvider = ({ children }) => {
  const [entries, setEntries] = useState(entriesStorage.retrieve());

  return (
    <EntriesContext.Provider
      value={{
        entries,
        setEntries,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
