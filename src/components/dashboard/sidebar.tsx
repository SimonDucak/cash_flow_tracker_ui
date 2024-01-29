import { Button } from "@/components/ui/button";
import {
  IoBarChartOutline,
  IoCogOutline,
  IoLogOutOutline,
  IoTrendingDown,
  IoTrendingUp,
  IoWalletOutline,
} from "react-icons/io5";
import { BsPersonVideo2 } from "react-icons/bs";
import { NavigatorRouteName, useNavigator } from "@/hooks/navigator";
import { useDashboardContext } from "@/hooks/dashboard-context";

const Sidebar = () => {
  const {
    navigateToUsers,
    navigateToDashboardSettings,
    navigateToDashboardSavingGoals,
    IsMatch,
    navigateToDashboard,
    navigateToDashboardExpectedIncome,
    navigateToDashboardExpectedOutcome,
    navigateToDashboardDebtors,
  } = useNavigator();

  const dashboardCtx = useDashboardContext();

  return (
    <div className="pb-12 h-full">
      <div className="space-y-4 py-4 h-full">
        <div className="px-3 py-2 h-full">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            {dashboardCtx.state.user.name}
          </h2>

          <div className="space-y-1">
            <Button
              onClick={() =>
                navigateToDashboard(dashboardCtx.state.user.id.toString())
              }
              variant={
                IsMatch(NavigatorRouteName.DASHBOARD) ? "secondary" : "ghost"
              }
              className="w-full justify-start"
            >
              <IoBarChartOutline className="mr-2 h-4 w-4" />
              Charts
            </Button>

            <Button
              onClick={() =>
                navigateToDashboardSavingGoals(
                  dashboardCtx.state.user.id.toString()
                )
              }
              variant={
                IsMatch(NavigatorRouteName.DASHBOARD_SAVING_GOALS)
                  ? "secondary"
                  : "ghost"
              }
              className="w-full justify-start"
            >
              <IoWalletOutline className="mr-2 h-4 w-4" />
              Saving Goals
            </Button>

            <Button
              onClick={() =>
                navigateToDashboardExpectedIncome(
                  dashboardCtx.state.user.id.toString()
                )
              }
              variant={
                IsMatch(NavigatorRouteName.DASHBOARD_EXPECTED_INCOME)
                  ? "secondary"
                  : "ghost"
              }
              className="w-full justify-start"
            >
              <IoTrendingUp className="mr-2 h-4 w-4" />
              Expected Incomes
            </Button>

            <Button
              onClick={() =>
                navigateToDashboardExpectedOutcome(
                  dashboardCtx.state.user.id.toString()
                )
              }
              variant={
                IsMatch(NavigatorRouteName.DASHBOARD_EXPECTED_OUTCOME)
                  ? "secondary"
                  : "ghost"
              }
              className="w-full justify-start"
            >
              <IoTrendingDown className="mr-2 h-4 w-4" />
              Expected Outcomes
            </Button>

            <Button
              onClick={() =>
                navigateToDashboardDebtors(
                  dashboardCtx.state.user.id.toString()
                )
              }
              variant={
                IsMatch(NavigatorRouteName.DASHBOARD_DEBTORS)
                  ? "secondary"
                  : "ghost"
              }
              className="w-full justify-start"
            >
              <BsPersonVideo2 className="mr-2 h-4 w-4" />
              Debtors
            </Button>

            <Button
              onClick={() =>
                navigateToDashboardSettings(
                  dashboardCtx.state.user.id.toString()
                )
              }
              variant={
                IsMatch(NavigatorRouteName.DASHBOARD_SETTINGS)
                  ? "secondary"
                  : "ghost"
              }
              className="w-full justify-start"
            >
              <IoCogOutline className="mr-2 h-4 w-4" />
              Settings
            </Button>

            <Button
              onClick={() => navigateToUsers()}
              variant="ghost"
              className="w-full justify-start"
            >
              <IoLogOutOutline className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
