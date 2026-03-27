import { useState, useEffect, useCallback } from "react";
import { PortfolioData, defaultData } from "@/data/defaultData";

const STORAGE_KEY = "guiro_portfolio_data";

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultData, ...JSON.parse(stored) } : defaultData;
    } catch {
      return defaultData;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = useCallback((updater: (prev: PortfolioData) => PortfolioData) => {
    setData(updater);
  }, []);

  const resetData = useCallback(() => {
    setData(defaultData);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { data, updateData, resetData };
}
