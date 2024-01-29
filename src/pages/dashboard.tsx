import BaseLayout from "@/layouts/base-layout";
import Sidebar from "@/components/dashboard/sidebar";
import { Routes, Route } from "react-router-dom";
import Settings from "./dashboard/settings";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import { UserAdapter } from "@/adapters/UserAdapter";
import { useParams } from "react-router-dom";
import { parseNumber } from "@/utils/parsers";
import DashboardContext, {
  DashboardContextState,
} from "@/providers/dashboard-provider";
import { NavigatorRouteName, getRoute } from "@/hooks/navigator";
import SavingGoals from "./dashboard/saving-goals";
import { SavingGoal } from "@/types/SavingGoal";
import { SavingGoalAdapter } from "@/adapters/SavingGoalAdapter";
import { ExpectedIncome } from "@/types/ExpectedIncome";
import { ExpectedOutcome } from "@/types/ExpectedOutcome";
import ExpectedIncomes from "@/pages/dashboard/expected-incomes";
import ExpectedOutcomes from "@/pages/dashboard/expected-outcomes";
import { ExpectedIncomeAdapter } from "@/adapters/ExpectedIncomeAdapter";
import { ExpectedOutcomeAdapter } from "@/adapters/ExpectedOutcomeAdapter";
import { DebtorAdapter } from "@/adapters/DebtorAdapter";
import { Debtor } from "@/types/Debtor";
import Debtors from "./dashboard/debtors";

const userAdapter = new UserAdapter();

const Dashboard = () => {
  const { id } = useParams();

  const [state, setState] = useState<DashboardContextState>({
    user: userAdapter.getEmptyRecord(),
    savingGoals: [],
    expectedIncomes: [],
    expectedOutcomes: [],
    debtors: [],
  });

  const addSavingGoal = (savingGoal: SavingGoal) => {
    setState((prev) => ({
      ...prev,
      savingGoals: [...prev.savingGoals, savingGoal],
    }));
  };

  const addExpectedIncome = (expectedIncome: ExpectedIncome) => {
    setState((prev) => ({
      ...prev,
      expectedIncomes: [...prev.expectedIncomes, expectedIncome],
    }));
  };

  const addExpectedOutcome = (expectedOutcome: ExpectedOutcome) => {
    setState((prev) => ({
      ...prev,
      expectedOutcomes: [...prev.expectedOutcomes, expectedOutcome],
    }));
  };

  const addDebtor = (debtor: Debtor) => {
    setState((prev) => ({
      ...prev,
      debtors: [...prev.debtors, debtor],
    }));
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const idParam = parseNumber(id);

        const foundUser: User | null = await userAdapter.getRecord(idParam);

        if (!foundUser) return;

        setState((prev) => ({ ...prev, user: foundUser }));

        const savingGoalsAdapter = new SavingGoalAdapter(foundUser.id);

        const incomesAdapter = new ExpectedIncomeAdapter(foundUser.id);

        const outcomesAdapter = new ExpectedOutcomeAdapter(foundUser.id);

        const debtorsAdapter = new DebtorAdapter(foundUser.id);

        const [savingGoals, expectedIncomes, expectedOutcomes, debtors] =
          await Promise.all([
            savingGoalsAdapter.getRecords(),
            incomesAdapter.getRecords(),
            outcomesAdapter.getRecords(),
            debtorsAdapter.getRecords(),
          ]);

        setState((prev) => ({
          ...prev,
          savingGoals,
          expectedIncomes,
          expectedOutcomes,
          debtors,
        }));
      } catch (err) {
        // handle error
        console.log(err);
      }
    };

    loadUser();
  }, [id]);

  return (
    <DashboardContext.Provider
      value={{
        state,
        setState,
        addSavingGoal,
        addExpectedIncome,
        addExpectedOutcome,
        addDebtor,
      }}
    >
      <BaseLayout>
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar />

            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <Routes>
                  <Route
                    path={
                      getRoute(NavigatorRouteName.DASHBOARD_SETTINGS).nestedPath
                    }
                    element={<Settings />}
                  />

                  <Route
                    path={
                      getRoute(NavigatorRouteName.DASHBOARD_SAVING_GOALS)
                        .nestedPath
                    }
                    element={<SavingGoals />}
                  />

                  <Route
                    path={
                      getRoute(NavigatorRouteName.DASHBOARD_EXPECTED_INCOME)
                        .nestedPath
                    }
                    element={<ExpectedIncomes />}
                  />

                  <Route
                    path={
                      getRoute(NavigatorRouteName.DASHBOARD_EXPECTED_OUTCOME)
                        .nestedPath
                    }
                    element={<ExpectedOutcomes />}
                  />

                  <Route
                    path={
                      getRoute(NavigatorRouteName.DASHBOARD_DEBTORS).nestedPath
                    }
                    element={<Debtors />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
