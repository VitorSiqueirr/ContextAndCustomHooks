import { describe, it } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { LanguageProvider } from "../../src/contexts/providers/LanguageProvider";
import { useTranslation } from "../../src/hooks/useTranslation";

const Setup = () => {
  const wrapper = ({ children }) => (
    <LanguageProvider>{children}</LanguageProvider>
  );
  const { result } = renderHook(() => useTranslation(), { wrapper });
  return result;
};

describe("useTranslation", () => {
  it("language has a default value of en", () => {
    const result = Setup();
    expect(result.current.language).toBe("en");
  });

  describe("when use setLanguage", () => {
    it("change the value of language", async () => {
      const result = Setup();

      expect(result.current.language).toBe("en");

      act(() => {
        result.current.setLanguage("pt");
      });

      await waitFor(() => {
        expect(result.current.language).toBe("pt");
      });
    });
  });

  describe("when use t", () => {
    it("returns the correct translation", () => {
      const result = Setup();

      expect(result.current.t("appTitle")).toBe("Finance");

      act(() => {
        result.current.setLanguage("pt");
      });

      expect(result.current.t("appTitle")).toBe("Finanças");
    });
  });

  describe("when use formatNumber", () => {
    it("formats the number correctly", () => {
      const result = Setup();

      expect(result.current.formatNumber(1234.5999)).toBe("1,234.60");

      act(() => {
        result.current.setLanguage("pt");
      });

      expect(result.current.formatNumber(1234.5678)).toBe("1.234,57");
    });
  });

  describe("when use formatDate", () => {
    it("formats the date correctly", () => {
      const result = Setup();
      const date = new Date(2022, 10, 1);

      expect(result.current.formatDate(date)).toBe("11/1/2022");

      act(() => {
        result.current.setLanguage("pt");
      });

      expect(result.current.formatDate(date)).toBe("01/11/2022");
    });
  });
});
