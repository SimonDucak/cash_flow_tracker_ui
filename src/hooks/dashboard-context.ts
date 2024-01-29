import DashboardContext, { DashboardContextType } from "@/providers/dashboard-provider";
import { useContext } from "react";

export const useDashboardContext = (): DashboardContextType => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardContextProvider"
    );
  }

  return context;
}; 