import { act, renderHook, screen, waitFor } from "@testing-library/react";
import { NotificationProvider } from "../../src/contexts/providers/NotificationProvider";
import { useNotification } from "../../src/hooks/useNotification";
import { LanguageProvider } from "../../src/contexts/providers/LanguageProvider";
import { describe, expect, it } from "vitest";

const Setup = () => {
  const wrapper = ({ children }) => (
    <LanguageProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </LanguageProvider>
  );
  const { result } = renderHook(() => useNotification(), { wrapper });
  return result;
};

const notifications = {
  created: "created",
  deleted: "deleted",
  edited: "edited",
};

const NotificationStates = {
  created: "❕ Entry Created!",
  deleted: "❕ Entry Deleted!",
  edited: "❕ Entry edited!",
};

describe("useNotification and Toaster", () => {
  describe("when not use within a NotificationProvider", () => {
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
        <LanguageProvider>{children}</LanguageProvider>
      );
      expect(() => {
        renderHook(() => useNotification(), { wrapper });
      }).toThrow("useNotification must be used within a NotificationProvider");
    });
  });

  describe("when the showNotification is called with created", () => {
    it("shows created notification", async () => {
      const result = Setup();

      act(() => {
        result.current.showNotification(notifications.created);
      });

      const notification = await screen.findByRole("heading", {
        value: NotificationStates.created,
      });

      await waitFor(() => {
        expect(notification).toBeInTheDocument();
      });
    });
  });

  describe("when the showNotification is called with edited", () => {
    it("show edited notification correctly", async () => {
      const result = Setup();

      act(() => {
        result.current.showNotification(notifications.edited);
      });

      const notification = await screen.findByRole("heading", {
        value: NotificationStates.edited,
      });

      await waitFor(() => {
        expect(notification).toBeInTheDocument();
      });
    });
  });

  describe("when the showNotification is called with deleted", () => {
    it("show deleted notification correctly", async () => {
      const result = Setup();

      act(() => {
        result.current.showNotification(notifications.deleted);
      });

      const notification = await screen.findByRole("heading", {
        value: NotificationStates.deleted,
      });

      await waitFor(() => {
        expect(notification).toBeInTheDocument();
      });
    });
  });
});
