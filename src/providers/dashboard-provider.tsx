import { SavingGoal } from "@/types/SavingGoal";
import { User } from "@/types/User";
import { createContext } from "react";

export interface DashboardContextState {
  user: User;
  savingGoals: SavingGoal[];
}

export interface DashboardContextType {
  state: DashboardContextState;
  setState: React.Dispatch<React.SetStateAction<DashboardContextState>>;
  addSavingGoal: (savingGoal: SavingGoal) => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export default DashboardContext;
