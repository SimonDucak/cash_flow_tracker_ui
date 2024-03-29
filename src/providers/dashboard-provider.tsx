import { Debtor } from "@/types/Debtor";
import { ExpectedIncome } from "@/types/ExpectedIncome";
import { ExpectedOutcome } from "@/types/ExpectedOutcome";
import { PaidDebt } from "@/types/PaidDebt";
import { SavingGoal } from "@/types/SavingGoal";
import { User } from "@/types/User";
import { createContext } from "react";

export interface DashboardContextState {
  user: User;
  savingGoals: SavingGoal[];
  expectedIncomes: ExpectedIncome[];
  expectedOutcomes: ExpectedOutcome[];
  debtors: Debtor[];
  paidDebts: PaidDebt[];
}

export interface DashboardContextType {
  state: DashboardContextState;
  setState: React.Dispatch<React.SetStateAction<DashboardContextState>>;
  addSavingGoal: (savingGoal: SavingGoal) => void;
  addExpectedIncome: (expectedIncome: ExpectedIncome) => void;
  addExpectedOutcome: (expectedOutcome: ExpectedOutcome) => void;
  addDebtor: (debtor: Debtor) => void;
  addPaidDebt: (paidDebt: PaidDebt) => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export default DashboardContext;
