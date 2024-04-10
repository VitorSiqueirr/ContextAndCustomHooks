export const entriesStorage = (() => {
  const store = (entries) => {
    const serializedEntries = entries.map((entry) => ({
      ...entry,
      date: entry.date.toISOString(),
    }));

    localStorage.setItem("Entries", JSON.stringify(serializedEntries));
  };

  const retrieve = () => {
    const data = localStorage.getItem("Entries");

    if (!data) {
      return [];
    }

    const serializedEntries = JSON.parse(data);

    return serializedEntries.map((entry) => ({
      ...entry,
      date: new Date(entry.date),
    }));
  };

  return {
    store,
    retrieve,
  };
})();
