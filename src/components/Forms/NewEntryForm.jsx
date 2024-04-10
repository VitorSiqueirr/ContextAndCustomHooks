import { EntryForm } from "./EntryForm";
import { useTranslation } from "../../hooks/useTranslation";
import { useEntries } from "../../hooks/useEntries";

export const NewEntryForm = () => {
  const { createEntry } = useEntries();
  const { t } = useTranslation();

  return <EntryForm title={t("newEntryFormTitle")} onSubmit={createEntry} />;
};
