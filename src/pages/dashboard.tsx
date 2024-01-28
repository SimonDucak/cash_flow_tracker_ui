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

const userAdapter = new UserAdapter();

const Dashboard = () => {
  const { id } = useParams();

  const [state, setState] = useState<DashboardContextState>({
    user: userAdapter.getEmptyRecord(),
    savingGoals: [],
  });

  const addSavingGoal = (savingGoal: SavingGoal) => {
    setState((prev) => ({
      ...prev,
      savingGoals: [...prev.savingGoals, savingGoal],
    }));
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const idParam = parseNumber(id);
        const foundUser: User | null = await userAdapter.getRecord(idParam);
        if (foundUser) setState((prev) => ({ ...prev, user: foundUser }));
      } catch (err) {
        // handle error
        console.log(err);
      }
    };

    loadUser();
  }, [id]);

  return (
    <DashboardContext.Provider value={{ state, setState, addSavingGoal }}>
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
