import { describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useViewState } from "../../src/hooks/useViewState";
import { ViewStateProvider } from "../../src/contexts/providers/ViewStateProvider";

const Setup = () => {
  const wrapper = ({ children }) => (
    <ViewStateProvider>{children}</ViewStateProvider>
  );
  const { result } = renderHook(() => useViewState(), { wrapper });
  return result;
};

const ViewStates = {
  Dashboard: "Dashboard",
  NewEntry: "New Entry",
  EditEntry: "Edit Entry",
};

describe("useViewState", () => {
  describe("when not use within a ViewStateProvider", () => {
    let originalError;

    beforeEach(() => {
      originalError = console.error;
      console.error = vi.fn();
    });

    afterEach(() => {
      console.error = originalError;
    });

    it("throw an error", () => {
      expect(() => {
        renderHook(() => useViewState());
      }).toThrow("useViewState must be used within a ViewStateProvider");
    });
  });

  it("viewState has a default value of Dashboard", () => {
    const result = Setup();
    expect(result.current.viewState.name).toBe(ViewStates.Dashboard);
  });

  describe("when using goToDashboard", () => {
    it("change de value of viewState to Dashboard", async () => {
      const result = Setup();

      act(() => {
        result.current.goToNewEntry();
      });

      await waitFor(() => {
        expect(result.current.viewState.name).toBe(ViewStates.NewEntry);
      });

      act(() => {
        result.current.goToDashboard();
      });

      await waitFor(() => {
        expect(result.current.viewState.name).toBe(ViewStates.Dashboard);
      });
    });
  });

  describe("when using goToNewEntry", () => {
    it("change de value of viewState to New Entry", async () => {
      const result = Setup();

      expect(result.current.viewState.name).toBe(ViewStates.Dashboard);

      act(() => {
        result.current.goToNewEntry();
      });

      await waitFor(() => {
        expect(result.current.viewState.name).toBe(ViewStates.NewEntry);
      });
    });
  });

  describe("when using goToEditEntry", () => {
    it("change de value of viewState to Edit Entry, and have an ID", async () => {
      const result = Setup();
      const id = 1;

      expect(result.current.viewState.name).toBe(ViewStates.Dashboard);

      act(() => {
        result.current.goToEditEntry(id);
      });

      await waitFor(() => {
        expect(result.current.viewState.name).toBe(ViewStates.EditEntry);
        expect(result.current.viewState.id).toBe(id);
      });
    });
  });
});
