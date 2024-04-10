import { afterEach, beforeEach, describe, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { EntriesProvider } from "../../src/contexts/providers/EntriesProvider";
import { useEntries } from "../../src/hooks/useEntries";
import { ViewStateProvider } from "../../src/contexts/providers/ViewStateProvider";
import { NotificationProvider } from "../../src/contexts/providers/NotificationProvider";
import { LanguageProvider } from "../../src/contexts/providers/LanguageProvider";
import { useNotification } from "../../src/hooks/useNotification";

const Setup = () => {
  const wrapper = ({ children }) => (
    <ViewStateProvider>
      <EntriesProvider>
        <LanguageProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </LanguageProvider>
      </EntriesProvider>
    </ViewStateProvider>
  );
  const { result } = renderHook(() => useEntries(), { wrapper });
  return result;
};

const NotificationStates = {
  created: "created",
  deleted: "deleted",
  edited: "edited",
};

describe("useEntries", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.mock("../../src/hooks/useNotification");

    useNotification.mockReturnValue({
      showNotification: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("when not use within a EntriesProvider", () => {
    let originalError;

    beforeEach(() => {
      originalError = console.error;
      console.error = vi.fn();
    });

    afterEach(() => {
      console.error = originalError;
    });

    it("throw an error", () => {
      const wrapper = ({ children }) => (
        <ViewStateProvider>
          <LanguageProvider>
            <NotificationProvider>{children}</NotificationProvider>
          </LanguageProvider>
        </ViewStateProvider>
      );
      expect(() => {
        renderHook(() => useEntries(), { wrapper });
      }).toThrow("useEntries must be used within a EntriesProvider");
    });
  });

  it("starting with empty entries", () => {
    const result = Setup();
    expect(result.current.entries).toEqual([]);
  });

  describe("when using createEntry", () => {
    it("create a new entry with random id and correct values and calls showNotification with the created", () => {
      const { showNotification } = useNotification();
      const result = Setup();

      act(() => {
        result.current.createEntry({
          label: "test",
          amount: 100000,
          date: new Date(),
        });
      });

      expect(result.current.entries).toEqual([
        {
          id: expect.any(String),
          label: "test",
          amount: 100000,
          date: expect.any(Date),
        },
      ]);

      expect(showNotification).toHaveBeenCalledWith(NotificationStates.created);
    });
  });

  describe("when using deleteEntry", () => {
    describe("when the ID is not correct", () => {
      it("doesn't not exclude the entry and calls showNotification with created and not deleted", () => {
        const { showNotification } = useNotification();
        const result = Setup();

        act(() => {
          result.current.createEntry({
            label: "testingDelete",
            amount: 1234,
            date: new Date(),
          });
        });

        act(() => {
          result.current.deleteEntry(1);
        });

        expect(result.current.entries).toEqual([
          {
            id: expect.any(String),
            label: "testingDelete",
            amount: 1234,
            date: expect.any(Date),
          },
        ]);

        expect(showNotification).toHaveBeenCalledWith(
          NotificationStates.created
        );
        expect(showNotification).not.toHaveBeenCalledWith(
          NotificationStates.deleted
        );
      });
    });

    describe("when the ID is correct", () => {
      it("exclude the entry and calls showNotification with created and deleted", () => {
        const { showNotification } = useNotification();

        const result = Setup();

        act(() => {
          result.current.createEntry({
            label: "testingDelete",
            amount: 1234,
            date: new Date(),
          });
        });

        act(() => {
          result.current.deleteEntry(result.current.entries[0].id);
        });

        expect(result.current.entries).toEqual([]);

        expect(showNotification).toHaveBeenCalledWith(
          NotificationStates.created
        );
        expect(showNotification).toHaveBeenCalledWith(
          NotificationStates.deleted
        );
      });
    });
  });

  describe("when using editEntry", () => {
    describe("when the id passed is not correct", () => {
      it("doesn't edit the entries and calls showNotification with only the created", () => {
        const { showNotification } = useNotification();

        const result = Setup();
        const initialEntry = {
          label: "testingEdit",
          amount: 1234,
          date: new Date(),
        };

        const updatedEntry = {
          label: "Testing",
          amount: 1222,
          date: new Date(),
        };

        act(() => {
          result.current.createEntry(initialEntry);
        });

        act(() => {
          result.current.editEntry(1, updatedEntry);
        });

        expect(result.current.entries).toEqual([
          { id: expect.any(String), ...initialEntry },
        ]);

        expect(showNotification).toHaveBeenCalledWith(
          NotificationStates.created
        );
        expect(showNotification).not.toHaveBeenCalledWith(
          NotificationStates.edited
        );
      });
    });

    describe("when the id passed correct", () => {
      it("edit the correct entry and calls showNotification with the created and edited", () => {
        const { showNotification } = useNotification();

        const result = Setup();
        const initialEntry = {
          label: "testingEdit",
          amount: 1234,
          date: new Date(),
        };

        const updatedEntry = {
          label: "Testing",
          amount: 1222,
          date: new Date(),
        };

        act(() => {
          result.current.createEntry(initialEntry);
        });

        act(() => {
          result.current.editEntry(result.current.entries[0].id, updatedEntry);
        });

        expect(result.current.entries).toEqual([
          { id: expect.any(String), ...updatedEntry },
        ]);

        expect(showNotification).toHaveBeenCalledWith(
          NotificationStates.created
        );
        expect(showNotification).toHaveBeenCalledWith(
          NotificationStates.edited
        );
      });
    });
  });
});
