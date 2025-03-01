import { AllRecordsResponse } from "@/types/api.response";
import React, { createContext } from "react";

export const DashboardContext = createContext<
  | {
      status: number;
      result: AllRecordsResponse;
      error: null;
    }
  | {
      status: number;
      result: null;
      error: any;
    }
  | undefined
>(undefined);

export function useDashboardContext() {
  const data = React.useContext(DashboardContext);

  if (data === undefined) {
    throw new Error(
      "useDashboardContext must be used within a DashboardContext.Provider",
    );
  }
  return data;
}
